set search_path = #AUTH_SCHEMA#;

create or replace function get_oauth_users(bind_user_id bigint)
returns oauth2Users
as $$
DECLARE
  result oauth2Users;
BEGIN
  set search_path = #AUTH_SCHEMA#;
  select * from oauth2Users where oauth2Users.user_id = bind_user_id into result;
  return result;
END;
$$
language plpgsql;

create or replace function unlink_oauth_user(oauth_user_id bigint, bind_user_id bigint)
returns oauth2Users
as $$
DECLARE
  found_id bigint;
  result oauth2Users;
BEGIN
  set search_path = #AUTH_SCHEMA#;
  --find the user based on username/password
  select id from oauth2Users where oauth2Users.id=oauth_user_id and oauth2Users.user_id=bind_user_id into found_id;
  if found_id is not null then
    --change the password if all is OK
    update oauth2Users set user_id = null where oauth2Users.id=found_id;
  end if;
  select * from get_oauth_users(bind_user_id) into result;
  return result;
END;
$$
language plpgsql;

