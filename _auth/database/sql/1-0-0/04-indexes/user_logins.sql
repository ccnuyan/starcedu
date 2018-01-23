set search_path = #AUTH_SCHEMA#;

ALTER TABLE logins
ADD CONSTRAINT user_logins
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;