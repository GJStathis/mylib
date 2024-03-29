-- Create user table
CREATE TABLE IF NOT EXISTS users (
    user_id serial NOT NULL PRIMARY KEY,
    social_media_site text NOT NULL,
    social_id text NOT NULL,
    social_token text NOT NULL,
    display_name text,
    email text,
    UNIQUE (social_media_site, social_id)
);

-- Create library table
CREATE TABLE IF NOT EXISTS library (
    book_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ,
    book_title text NOT NULL,
    reading_status text NOT NULL,
    added_date TIMESTAMP,
    completed_date TIMESTAMP,
    notes text[],
    cover_image_path text,
    author text NOT NULL
);

ALTER TABLE library ADD CONSTRAINT user_book_unique UNIQUE (user_id,book_title);

-- Friends table
CREATE TABLE IF NOT EXISTS friends (
  user_id INT NOT NULL REFERENCES users(user_id),
  friend_id INT NOT NULL REFERENCES users(user_id)
  UNIQUE (user_id, friend_id)
);

-- Stored procedure to add a new friend
CREATE PROCEDURE create_friend_connection(user_id integer, friend_id integer)
LANGUAGE SQL
BEGIN ATOMIC
  insert into friends values (user_id, friend_id);
  insert into friends values (friend_id , user_id);
END;

-- Stroed procedure to remove a friend
CREATE PROCEDURE remove_friend(user_id integer, friend_id integer)
LANGUAGE SQL
BEGIN atomic
  delete from friends where user_id = user_id and friend_id = friend_id;
  delete from friends where user_id = friend_id and friend_id = user_id;
END;

-- Friend alerts Table
CREATE TABLE IF NOT EXISTS friend_alerts (
  alert_id serial NOT NULL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  requesting_user_id INT NOT NULL REFERENCES users(user_id),
  message_str text NOT NULL,
  read_alert boolean DEFAULT FALSE
  alert_type text DEFAULT 'friend'
  UNIQUE (user_id, requesting_user_id)
);

-- Create session table
CREATE TABLE "user_sessions" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");
