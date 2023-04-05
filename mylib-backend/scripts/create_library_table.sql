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
    CONSTRAINT user_book_constraint UNIQUE(user_id, book_title) 
);