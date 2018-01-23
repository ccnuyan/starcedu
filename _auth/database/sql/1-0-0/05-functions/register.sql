SET search_path = #AUTH_SCHEMA#;

CREATE OR REPLACE FUNCTION register(
  un VARCHAR, 
  password VARCHAR, 
  oauth_user_id BIGINT DEFAULT NULL)
RETURNS #AUTH_SCHEMA#.login_info
as $$
DECLARE
  oauth_user #AUTH_SCHEMA#.oauth2Users;
  new_user #AUTH_SCHEMA#.users;
  token VARCHAR(64);
  success BOOLEAN DEFAULT FALSE;
  return_message VARCHAR(64);
BEGIN
  set search_path = #AUTH_SCHEMA#, public;
    
  IF NOT EXISTS (SELECT username FROM users WHERE username = un)
  THEN
    -- add them, get new id

    INSERT INTO users(username, role)
    VALUES (un, -1) -- normal user role is 10
    RETURNING * INTO new_user;

    -- add login for local
    -- username as provider_key
    INSERT INTO logins(user_id, provider_key, provider_token)
    VALUES(new_user.id, new_user.username, public.crypt(password::text, public.gen_salt('bf', 10)::text));

    -- binding check
    IF oauth_user_id IS NOT NULL THEN
      -- get the oauth2 user to bind
      SELECT * INTO oauth_user FROM oauth2Users WHERE oauth2Users.id = oauth_user_id;
      IF NOT FOUND THEN
        success := FALSE;
        return_message := 'oauth user not found', oauth_user_id;
      ELSE
        UPDATE oauth2Users SET user_id = new_user.id WHERE oauth2Users.id = oauth_user_id;
        success := TRUE;
      END IF;
      -- bind operation
    ELSE
      success := TRUE;
      return_message := 'register and bind successfully';
    END IF;
      
    success := TRUE;
    return_message := 'register successfully';
  ELSE
    success := FALSE;
    select 'user with this username already existed' INTO return_message;
  END IF;

  -- return the goods
  return (new_user.id, 
    new_user.username, 
    new_user.gender, 
    new_user.nickname, 
    new_user.role, 
    success,
    return_message)::#AUTH_SCHEMA#.login_info;
END;
$$
LANGUAGE PLPGSQL;