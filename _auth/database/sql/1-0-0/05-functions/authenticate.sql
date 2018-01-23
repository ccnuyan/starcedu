set search_path = #AUTH_SCHEMA#;

CREATE or REPLACE FUNCTION authenticate(
  -- Three modes authentication      mode1    / mode2   / mode3
  input_username VARCHAR,               -- username / 'token' / 'token'
  input_password VARCHAR,               -- password / token   / token 
  input_provider VARCHAR DEFAULT 'local',   -- 'local'  / 'token' / 'qq'
  input_oauth_user_id BIGINT DEFAULT NULL -- if provided, use a oauth binding mode
)
RETURNS #AUTH_SCHEMA#.login_info AS $$
DECLARE
  oauth_user #AUTH_SCHEMA#.oauth2Users;
  found_user #AUTH_SCHEMA#.users;
  return_message VARCHAR(50);
  success BOOLEAN := FALSE;
  found_id BIGINT;
BEGIN
  set search_path = #AUTH_SCHEMA#;
  --find the user by token/provider and username

  IF (input_provider = 'local') THEN
    SELECT locate_user_by_password(input_username, input_password) INTO found_id;
  ELSE
    SELECT user_id FROM logins WHERE
    provider = input_provider AND
    provider_token = input_password INTO found_id;
  end IF;
  
  IF(found_id IS NOT NULL) THEN
    SELECT * FROM users WHERE users.id = found_id INTO found_user;
    --set a last_login
    UPDATE users SET last_login = now(), login_count=login_count + 1
    WHERE users.id = found_id;

    -- binding check
    IF input_oauth_user_id IS NOT NULL THEN
      -- get the oauth2 user to bind
      SELECT * INTO oauth_user FROM oauth2Users WHERE oauth2Users.id = input_oauth_user_id;
      IF NOT FOUND THEN
        success := FALSE;
        return_message := 'oauth user not found', input_oauth_user_id;
      ELSE
        UPDATE oauth2Users SET user_id = found_id WHERE oauth2Users.id = input_oauth_user_id;
        success := TRUE;
        return_message := 'authenticate and bind successfully';
      END IF;
      -- bind operation
    ELSE
      success := TRUE;
      return_message := 'authenticate successfully';
    END IF;
  ELSE
    success := FALSE;
    return_message := 'credentials invalid';
  end IF;
  
  return (found_user.id, 
    found_user.username, 
    found_user.nickname,
    found_user.gender, 
    found_user.role,  
    success, 
    return_message)::#AUTH_SCHEMA#.login_info;
END;
$$
language plpgsql;

-- authentication in provider callback
CREATE or REPLACE FUNCTION oauth_authenticate(
  input_provider_id VARCHAR,
  input_provider VARCHAR
)
RETURNS #AUTH_SCHEMA#.login_info AS $$
DECLARE
  return_message VARCHAR(50);
  success BOOLEAN := FALSE;
  found_user #AUTH_SCHEMA#.users;
  found_id BIGINT;
BEGIN
  set search_path = #AUTH_SCHEMA#;
  --find the user by token/provider and un

  SELECT user_id FROM oauth2Users WHERE
  provider = input_provider AND
  unique_provider_id = input_provider_id INTO found_id;

  IF(found_id IS NOT NULL) THEN
    SELECT * FROM users WHERE users.id = found_id INTO found_user;
    --set a last_login
    UPDATE users SET last_login = now(), login_count=login_count+1
    WHERE users.id = found_id;

    success := TRUE;
    return_message := '3rd party authenticate successfully';
  ELSE
    success := FALSE;
    return_message := '3rd party authenticate failed';
  end IF;
  
  return (found_user.id, 
    found_user.username, 
    found_user.nickname,
    found_user.gender, 
    found_user.role,  
    success, 
    return_message)::#AUTH_SCHEMA#.login_info;
END;
$$
LANGUAGE PLPGSQL;