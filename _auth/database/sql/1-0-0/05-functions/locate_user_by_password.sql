set search_path = #AUTH_SCHEMA#;

create or replace function locate_user_by_password(username varchar, pass varchar)
returns bigint
as $$
  set search_path = #AUTH_SCHEMA#, public;

  select user_id from logins where
  provider_key = username and
  provider_token = public.crypt(pass::text, provider_token::text);
$$
language sql;
