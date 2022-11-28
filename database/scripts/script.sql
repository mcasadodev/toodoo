CREATE DATABASE IF NOT EXISTS toodoo

USE toodoo

CREATE TABLE USERS (
	id int NOT NULL auto_increment primary key,
	name nvarchar(50) ,
	email nvarchar(100) ,
	password nvarchar(1000)
);

CREATE TABLE PANELS (
	id int NOT NULL auto_increment primary key,
	name nvarchar(50) NOT NULL,
	owner_id int NOT NULL,
	CONSTRAINT FK_PANELS_owner_id FOREIGN KEY (owner_id) REFERENCES USERS(id)
);

CREATE TABLE TASKS (
	id int NOT NULL auto_increment primary key,
	title nvarchar(50)  NOT NULL,
	description nvarchar(1000)  NULL,
	panel_id int NOT NULL,
	creator_id int NOT NULL,
	CONSTRAINT FK_TASKS_creator_id FOREIGN KEY (creator_id) REFERENCES USERS(id)
);