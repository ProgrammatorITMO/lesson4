db = db.getSiblingDB('admin'); // Подключение к административной БД

db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

db = db.getSiblingDB('car_rental'); // Создаем или переключаемся на БД "car_rental"

// Создание коллекции users
db.createCollection("users");
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ phone: 1 }, { unique: true });

// Вставка тестовых пользователей
const users = [
    {
        _id: new ObjectId(),
        role: "user",
        email: "user1@example.com",
        password: "password1",
        phone: "1234567890",
        phone_verification: true,
        email_verification: false,
        news_letter: true,
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        _id: new ObjectId(),
        role: "user",
        email: "user2@example.com",
        password: "password2",
        phone: "0987654321",
        phone_verification: false,
        email_verification: true,
        news_letter: false,
        created_at: new Date(),
        updated_at: new Date()
    }
];

db.users.insertMany(users);

// Создание коллекции cars
db.createCollection("cars");
db.cars.createIndex({ license_plate: 1 }, { unique: true });

// Вставка тестовых машин с уникальными параметрами
const cars = [
    {
        _id: new ObjectId(),
        model: "Toyota Corolla",
        license_plate: "ABC123",
        year: 2020,
        price: 15500.50,
        color: "Blue",
        mileage: 45000,
        fuel_type: "Petrol",
        transmission: "Automatic",
        airbags: 6,
        sunroof: false,
        creator_uuid: users[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        has_images: 3
    },
    {
        _id: new ObjectId(),
        model: "Honda Civic",
        license_plate: "DEF456",
        year: 2019,
        price: 14200.75,
        color: "Red",
        mileage: 32000,
        fuel_type: "Hybrid",
        transmission: "Manual",
        parking_sensors: true,
        lane_assist: true,
        creator_uuid: users[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        has_images: 5
    },
    {
        _id: new ObjectId(),
        model: "Ford Mustang",
        license_plate: "GHI789",
        year: 2022,
        price: 38000.00,
        color: "Black",
        mileage: 5000,
        fuel_type: "Petrol",
        transmission: "Automatic",
        horsepower: 450,
        sport_mode: true,
        creator_uuid: users[0]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        has_images: 8
    },
    {
        _id: new ObjectId(),
        model: "Tesla Model 3",
        license_plate: "JKL012",
        year: 2021,
        price: 45000.00,
        color: "White",
        mileage: 12000,
        fuel_type: "Electric",
        transmission: "Automatic",
        autopilot: true,
        battery_capacity: "75 kWh",
        range_km: 500,
        creator_uuid: users[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        has_images: 10
    },
    {
        _id: new ObjectId(),
        model: "BMW X5",
        license_plate: "MNO345",
        year: 2018,
        price: 32000.00,
        color: "Silver",
        mileage: 70000,
        fuel_type: "Diesel",
        transmission: "Automatic",
        four_wheel_drive: true,
        adaptive_suspension: true,
        creator_uuid: users[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: false,
        has_images: 4
    },
    {
        _id: new ObjectId(),
        model: "Hyundai Elantra",
        license_plate: "PQR678",
        year: 2020,
        price: 17000.00,
        color: "Grey",
        mileage: 38000,
        fuel_type: "Petrol",
        transmission: "CVT",
        eco_mode: true,
        cruise_control: true,
        creator_uuid: users[1]._id,
        created_at: new Date(),
        updated_at: new Date(),
        active: true,
        has_images: 2
    }
];

db.cars.insertMany(cars);

print("MongoDB initialization complete.");
