set search_path = #AUTH_SCHEMA#;

ALTER TABLE oauth2Users
ADD CONSTRAINT user_oauth2Users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;