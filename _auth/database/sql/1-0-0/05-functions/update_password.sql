set search_path = #AUTH_SCHEMA#;

create or replace function update_password(input_username varchar, old_pass varchar, new_pass varchar)
RETURNS #AUTH_SCHEMA#.login_info AS 
$$
DECLARE
  found_id BIGINT;
  success BOOLEAN;
  return_message VARCHAR;
  return_login_info #AUTH_SCHEMA#.login_info;
BEGIN
  set search_path = #AUTH_SCHEMA#, public;

  --find the user based on username/password
  select locate_user_by_password(input_username, old_pass) into found_id;
  IF (found_id IS not NULL) THEN
    --update the password if all is OK
    update logins set provider_token = public.crypt(new_pass::text, public.gen_salt('bf',10)::text)
    where user_id=found_id and provider='local';
  ELSE
    success := FALSE;
    return_message := 'credentials invalid';
    return (null, null, null, null, null, success, return_message)::#AUTH_SCHEMA#.login_info;
  END IF;

  select * from authenticate(input_username, new_pass, 'local') into return_login_info;
  return return_login_info;
END;
$$
language plpgsql;



