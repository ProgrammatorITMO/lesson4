CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    uuid               UUID PRIMARY KEY      DEFAULT uuid_generate_v4(),
    role               VARCHAR(40)  NOT NULL DEFAULT 'user',
    email              VARCHAR(255) NOT NULL UNIQUE,
    password           VARCHAR(255) NOT NULL,
    created_at         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    phone              VARCHAR(20)  NOT NULL UNIQUE,
    phone_verification BOOLEAN               DEFAULT FALSE,
    email_verification BOOLEAN               DEFAULT FALSE,
    news_letter        BOOLEAN      NOT NULL DEFAULT TRUE
);

CREATE TABLE car
(
    uuid         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model        VARCHAR(255) NOT NULL,
    license_plate VARCHAR(20)  NOT NULL UNIQUE,
    year         INTEGER       NOT NULL,
    price        DECIMAL(10, 2) NOT NULL,
    created_at   TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    creator_uuid UUID    NOT NULL,
    FOREIGN KEY (creator_uuid) REFERENCES users (uuid) ON DELETE CASCADE,
    active       BOOLEAN NOT NULL DEFAULT TRUE,
    has_images   INTEGER          DEFAULT 0
);

-- Insert sample users
INSERT INTO users (uuid, role, email, password, phone)
VALUES
    (uuid_generate_v4(), 'user', 'user1@example.com', 'password1', '1234567890'),
    (uuid_generate_v4(), 'user', 'user2@example.com', 'password2', '0987654321');

    -- Insert sample cars for each user
    INSERT INTO car (uuid, model, license_plate, year, price, creator_uuid)
    VALUES
        (uuid_generate_v4(), 'Toyota Corolla', 'ABC123', 2020, 15000.00, (SELECT uuid FROM users WHERE email = 'user1@example.com')),
        (uuid_generate_v4(), 'Honda Civic', 'DEF456', 2019, 14000.00, (SELECT uuid FROM users WHERE email = 'user1@example.com')),
        (uuid_generate_v4(), 'Ford Focus', 'GHI789', 2021, 16000.00, (SELECT uuid FROM users WHERE email = 'user1@example.com')),
        (uuid_generate_v4(), 'Chevrolet Malibu', 'JKL012', 2018, 13000.00, (SELECT uuid FROM users WHERE email = 'user2@example.com')),
        (uuid_generate_v4(), 'Nissan Altima', 'MNO345', 2020, 15500.00, (SELECT uuid FROM users WHERE email = 'user2@example.com')),
        (uuid_generate_v4(), 'Hyundai Elantra', 'PQR678', 2021, 16500.00, (SELECT uuid FROM users WHERE email = 'user2@example.com'));