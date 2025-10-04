create table user(user_id varchar2(50) primary key, email varchar2(50) not null);
create table car(reg varchar2(50) primary key, model varchar2(50), price number(10));
create table booking(booking_id varchar2(50) primary key, user_id varchar2(50), reg varchar2(50), startDate date, endDate date, constraint fk_user foreign key (user_id) references user(user_id), constraint fk_car foreign key(reg) references car(reg));
create table payment(payment_id varchar2(50) primary key, booking_id varchar2(50), amount number(10), constraint fk_book foreign key(booking_id) references booking(booking_id));
