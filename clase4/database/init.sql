
CREATE SCHEMA IF NOT EXISTS shopping_carts;


-- Crear enums
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cart_item_status') THEN
        CREATE TYPE shopping_carts.cart_item_status AS ENUM ('active', 'inactive');
    END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cart_status') THEN
        CREATE TYPE shopping_carts.cart_status AS ENUM ('active', 'abandoned');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
        CREATE TYPE shopping_carts.order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');
    END IF;
END$$;

-- Tabla users
CREATE TABLE IF NOT EXISTS shopping_carts.users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla products
CREATE TABLE IF NOT EXISTS shopping_carts.products (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    image_url TEXT
);

-- Tabla carts
CREATE TABLE IF NOT EXISTS shopping_carts.carts (
    cart_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES shopping_carts.users(user_id),
    status shopping_carts.cart_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla cart_items
CREATE TABLE IF NOT EXISTS shopping_carts.cart_items (
    cart_item_id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES shopping_carts.carts(cart_id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES shopping_carts.products(product_id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    status shopping_carts.cart_item_status DEFAULT 'active',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla orders
CREATE TABLE IF NOT EXISTS shopping_carts.orders (
    order_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES shopping_carts.users(user_id),
    cart_id BIGINT REFERENCES shopping_carts.carts(cart_id),
    total DECIMAL(10,2) NOT NULL,
    status shopping_carts.order_status DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuarios de ejemplo
INSERT INTO shopping_carts.users (name, email, password_hash) VALUES
('Juan Perez', 'juan.perez@example.com', '123'),
('Maria Lopez', 'maria.lopez@example.com', '123'),
('Carlos Garcia', 'carlos.garcia@example.com', '123'),
('Ana Torres', 'ana.torres@example.com', '123'),
('Luis Mendoza', 'luis.mendoza@example.com', '123');

-- Insertar productos de ejemplo
INSERT INTO shopping_carts.products (name, description, price, stock, image_url) VALUES
('Ratón Inalámbrico', 'Ratón ergonómico inalámbrico con conectividad 2.4 GHz', 25.99, 50, 'https://example.com/images/mouse.jpg'),
('Teclado Mecánico', 'Teclado mecánico RGB con switches azules', 79.50, 30, 'https://example.com/images/keyboard.jpg'),
('Hub USB-C', 'Hub USB-C multipuerto con HDMI, USB 3.0 y lector de tarjetas SD', 45.00, 20, 'https://example.com/images/usb_hub.jpg'),
('Auriculares Gamer', 'Auriculares over-ear con sonido envolvente para gaming', 59.99, 15, 'https://example.com/images/headset.jpg'),
('Cámara Web 1080p', 'Cámara web HD con micrófono incorporado', 39.99, 25, 'https://example.com/images/webcam.jpg');
