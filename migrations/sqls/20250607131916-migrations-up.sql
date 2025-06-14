create table users
(
	id serial,
	name varchar(64),
	email varchar,
	password varchar(64),
	role varchar default 'USER',

	primary key(id)
);

create table queries
(
	id serial,
	userid integer not null,
	date date,
	city varchar(64),
	temp float,
	humidity float,
	wind_speed float,

	foreign key(userid) references users(id),
	primary key(id)
);