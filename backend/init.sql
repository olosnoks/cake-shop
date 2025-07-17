-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    image_url VARCHAR(500),
    cake_size VARCHAR(50),
    message TEXT,
    delivery_date DATE,
    status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (email, password, role) VALUES 
('admin@cake.com', '$2a$10$OXuGIJR5yd1IxJ.FnHcO.ud80jLuT9Gu09RDW2vOTTEdcesztRjXG', 'admin')
ON CONFLICT (email) DO NOTHING;
