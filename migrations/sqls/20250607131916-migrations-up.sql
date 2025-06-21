create table IF NOT EXISTS users
(
    id serial,
    name varchar(64),
    email varchar,
    password varchar(64),
    role varchar default 'USER',

    primary key(id)
);

INSERT INTO users (name, email, password)
VALUES
    ('Alice', 'alice@example.com', 'alice_pass'),
    ('Bob', 'bob@example.com', 'bob_pass');

create table IF NOT EXISTS queries
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

INSERT INTO queries (userid, date, city, temp, humidity, wind_speed)
VALUES
    (1, '2025-06-20', 'Kyiv', 26.5, 55.0, 3.2),
    (1, '2025-06-21', 'Lviv', 24.3, 60.0, 2.5),
    (2, '2025-06-21', 'Odesa', 28.0, 65.0, 4.0);