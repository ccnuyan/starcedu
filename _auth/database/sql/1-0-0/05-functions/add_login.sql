-- logins intruduction

-- for local user
  -- provider is 'local'
  -- provider_key is username
  -- provider_token is password

-- for token user
  -- provider is 'token'
  -- provider_key is 'token'
  -- provider_token is jwttoken
  
-- for oauth2 user
  -- provider is 'qq'
  -- provider_key is 'token'
  -- provider_token is jwttoken
set search_path = #AUTH_SCHEMA#;

create or replace function add_login(
  input_user_id bigint, 
  input_key varchar(50), 
  input_token varchar(4096), 
  input_new_provider varchar(50))
returns TABLE(
  message varchar(255),
  success boolean
) as
$$
DECLARE
  success boolean :=false;
  message varchar(255) := 'user with this username not found';
  data_result json;
BEGIN
  set search_path = #AUTH_SCHEMA#;
  
  if input_user_id is not null then
  
    -- replace the provider for this user completely
    delete from logins where 
      logins.user_id = input_user_id AND 
      logins.provider = input_new_provider;

    -- add the login
    insert into logins(user_id, provider_key, provider_token, provider)
    values (input_user_id, input_key, input_token, input_new_provider);

    -- add log entry
    -- insert into logs(subject, entry, user_id, created_at)
    -- values('Authentication','Added ' || new_provider || ' login',userid,now());

    success := true;
    message :=  'add login successfully';
  end if;

  return query
  select message, success;

END;
$$
language plpgsql;

