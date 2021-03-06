set search_path = #AUTH_SCHEMA#;

create sequence id_sequence;

create or replace function id_generator(out new_id bigint)
as $$
DECLARE
  our_epoch bigint := 1483200000000; -- 2017/05/01
  seq_id bigint;
  now_ms bigint;
  shard_id int := 1;
BEGIN
  SET search_path = #AUTH_SCHEMA#;
  SELECT nextval('id_sequence') %1024 INTO seq_id;
  SELECT FLOOR(EXTRACT(EPOCH FROM now()) * 1000) INTO now_ms;
  new_id := (now_ms - our_epoch) << 23;
  new_id := new_id | (shard_id << 10);
  new_id := new_id | (seq_id);
END;
$$
LANGUAGE PLPGSQL;

