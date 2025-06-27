create table IF NOT EXISTS users
(
    id       serial,
    name     varchar(64),
    email    varchar,
    password varchar(64),
    role     varchar default 'USER',

    primary key (id)
);

create table IF NOT EXISTS queries
(
    id         serial,
    userid     integer not null,
    date       date,
    city       varchar(64),
    temp       float,
    humidity   float,
    wind_speed float,

    foreign key (userid) references users (id),
    primary key (id)
);


create table IF NOT EXISTS favorite
(
    id     serial,
    userid integer     not null,
    city   varchar(64) not null,


    primary key (id),
    foreign key (userid) references users (id)
);

INSERT INTO favorite (userid, city)
VALUES (15, 'Kyiv'),
       (15, 'Lviv');

