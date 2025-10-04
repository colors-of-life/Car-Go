-- User table
CREATE TABLE app_user (
    user_id VARCHAR2(50) PRIMARY KEY,
    email   VARCHAR2(50) NOT NULL
);

-- Car table
CREATE TABLE car (
    reg    VARCHAR2(50) PRIMARY KEY,
    model  VARCHAR2(50),
    price  NUMBER(10)
);

-- Booking table with ON DELETE CASCADE for user and car
CREATE TABLE booking (
    booking_id VARCHAR2(50) PRIMARY KEY,
    user_id    VARCHAR2(50),
    reg        VARCHAR2(50),
    startDate  DATE,
    endDate    DATE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_car  FOREIGN KEY (reg) REFERENCES car(reg) ON DELETE CASCADE
);

-- Payment table with ON DELETE CASCADE for booking
CREATE TABLE payment (
    payment_id VARCHAR2(50) PRIMARY KEY,
    booking_id VARCHAR2(50),
    amount     NUMBER(10),
    CONSTRAINT fk_book FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);
