CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS addresses (
  	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  	postal_code VARCHAR(155) NOT NULL,
  	street VARCHAR(155) NOT NULL,
  	district VARCHAR(155) NOT NULL,
  	city VARCHAR(155) NOT NULL,
  	state VARCHAR(155) NOT NULL,
  	country VARCHAR(155) NOT NULL
);

CREATE TABLE IF NOT EXISTS data_persons (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  	full_name VARCHAR(155) NOT NULL,
  	birthdate VARCHAR(10) NOT NULL,
  	cpf VARCHAR(11) NOT NULL,
  	address UUID,
  	FOREIGN KEY (address) REFERENCES addresses (id) ON DELETE CASCADE
); 


CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  	username VARCHAR(55) NOT NULL,
  	email VARCHAR(155) NOT NULL,
  	password VARCHAR(255) NOT NULL,
  	data_person UUID,
	create_at VARCHAR(21) NOT NULL,
  	update_at VARCHAR(21),
  	FOREIGN KEY (data_person) REFERENCES data_persons (id) ON DELETE CASCADE
); 


CREATE TABLE IF NOT EXISTS memes (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  	name VARCHAR(155) NOT NULL,
  	video_url VARCHAR(255) NOT NULL,
  	owner UUID NOT NULL,
  	FOREIGN KEY (owner) REFERENCES users (id)
); 

CREATE TABLE IF NOT EXISTS tags (
	id BIGSERIAL PRIMARY KEY,
  	name VARCHAR(155) NOT NULL
); 

CREATE TABLE IF NOT EXISTS memes_tags (
	id BIGSERIAL PRIMARY KEY,
  	meme_id UUID NOT NULL,
  	tag_id INTEGER NOT NULL,
    FOREIGN KEY (meme_id) REFERENCES memes (id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
); 
