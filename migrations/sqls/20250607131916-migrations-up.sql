create table users
(
	id serial,
	name varchar(64),
	email varchar,
	password varchar(64),
	role varchar default 'USER',

	primary key(id)
);

create table query
(
	id serial,
	userid integer not null,
	query text not null,
	foreign key (userid) references users(id)

	primary key(id)
);