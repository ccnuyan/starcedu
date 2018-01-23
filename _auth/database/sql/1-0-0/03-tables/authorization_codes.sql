set search_path = #AUTH_SCHEMA#;

create table authorization_codes(
  code varchar  primary key default #AUTH_SCHEMA#.random_string(16) not null,
  created_at timestamptz default now(),
  tenant varchar(64) not null,
  state varchar(128) not null,
  user_id bigint not null
);