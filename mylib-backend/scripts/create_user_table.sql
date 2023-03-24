CREATE TABLE IF NOT EXISTS users (
    user_id serial NOT NULL PRIMARY KEY,
    social_media_site text NOT NULL,
    social_id text NOT NULL,
    social_token text NOT NULL,
    display_name text,
    email text,
    UNIQUE (social_media_site, social_id)
);
