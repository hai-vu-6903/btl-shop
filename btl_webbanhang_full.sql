
CREATE DATABASE IF NOT EXISTS btl_webbanhang;
USE btl_webbanhang;

CREATE TABLE user_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE btl_catalog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT
);

CREATE TABLE btl_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200),
    price DECIMAL(10,2),
    image VARCHAR(255),
    description TEXT,
    catalog_id INT,
    sold INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (catalog_id) REFERENCES btl_catalog(id) ON DELETE SET NULL
);

CREATE TABLE btl_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES btl_product(id) ON DELETE CASCADE
);

CREATE TABLE btl_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10,2),
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_table(id) ON DELETE CASCADE
);

CREATE TABLE btl_order_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES btl_order(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES btl_product(id) ON DELETE CASCADE
);

CREATE TABLE btl_comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_table(id),
    FOREIGN KEY (product_id) REFERENCES btl_product(id)
);

-- Dữ liệu mẫu
INSERT INTO user_table (name, email, password, role) VALUES
('Alice Smith', 'alice1@example.com', 'hashedpassword1', 'user'),
('Bob Johnson', 'bob2@example.com', 'hashedpassword2', 'user'),
('Charlie Brown', 'charlie3@example.com', 'hashedpassword3', 'user'),
('Diana Prince', 'diana4@example.com', 'hashedpassword4', 'user'),
('Evan Lee', 'evan5@example.com', 'hashedpassword5', 'user'),
('Fiona White', 'fiona6@example.com', 'hashedpassword6', 'user'),
('George Kim', 'george7@example.com', 'hashedpassword7', 'user'),
('Hannah Wu', 'hannah8@example.com', 'hashedpassword8', 'user'),
('Ivan Novak', 'ivan9@example.com', 'hashedpassword9', 'user'),
('Jenny Tran', 'jenny10@example.com', 'hashedpassword10', 'user'),
('Nguyễn Văn A', 'a@example.com', 'hashedpassword1', 'user'),
('Trần Thị B', 'b@example.com', 'hashedpassword2', 'user'),
('Admin', 'admin@example.com', 'hashedadminpass', 'admin');

INSERT INTO btl_catalog (name, description) VALUES
('Red Wine', 'Rich and bold wines made from dark-colored grapes.'),
('White Wine', 'Light and fruity wines made from green grapes.'),
('Sparkling Wine', 'Effervescent wines for celebrations.'),
('Dessert Wine', 'Sweet wines served after meals.'),
('Rosé Wine', 'Pink wines made from limited skin contact.');

INSERT INTO btl_product (name, price, image, description, catalog_id, sold) VALUES
('Cabernet Sauvignon', 1200000, '/images/product1.jpg', 'A full-bodied red wine.', 1, 25),
('Merlot', 900000, '/images/product2.jpg', 'Soft and approachable red wine.', 1, 15),
('Chardonnay', 1100000, '/images/product3.jpg', 'Popular white wine with oak flavors.', 2, 30),
('Sauvignon Blanc', 950000, '/images/product4.jpg', 'Crisp white wine.', 2, 10),
('Prosecco', 1300000, '/images/product5.jpg', 'Italian sparkling wine.', 3, 40),
('Cava', 1200000, '/images/product6.jpg', 'Spanish sparkling wine.', 3, 35),
('Port Wine', 1500000, '/images/product7.jpg', 'Sweet fortified wine from Portugal.', 4, 20),
('Sherry', 1000000, '/images/product8.jpg', 'Spanish dessert wine.', 4, 12),
('Rosé de Provence', 1000000, '/images/product9.jpg', 'Elegant French rosé.', 5, 18),
('Zinfandel Rosé', 980000, '/images/product10.jpg', 'Sweet and fruity rosé.', 5, 22),
-- (và tiếp tục đến sản phẩm thứ 20)
('Pinot Noir', 1400000, '/images/product11.jpg', 'Light-bodied red wine.', 1, 28),
('Gewürztraminer', 1050000, '/images/product12.jpg', 'Aromatic white wine.', 2, 14),
('Brut Champagne', 1700000, '/images/product13.jpg', 'Dry sparkling wine.', 3, 32),
('Muscat', 1150000, '/images/product14.jpg', 'Fruity dessert wine.', 4, 16),
('Syrah', 1250000, '/images/product15.jpg', 'Spicy and bold red wine.', 1, 27),
('Riesling', 980000, '/images/product16.jpg', 'German white wine.', 2, 11),
('Lambrusco', 990000, '/images/product17.jpg', 'Italian fizzy red wine.', 3, 19),
('Ice Wine', 1550000, '/images/product18.jpg', 'Made from frozen grapes.', 4, 8),
('White Zinfandel', 970000, '/images/product19.jpg', 'Easy-drinking pink wine.', 5, 21),
('Malbec', 1350000, '/images/product20.jpg', 'Argentinian red wine.', 1, 33);

INSERT INTO btl_cart (user_id, product_id, quantity) VALUES
(1, 3, 2),
(2, 5, 1),
(3, 7, 1),
(4, 10, 3),
(5, 12, 2),
(6, 8, 1),
(7, 2, 4),
(8, 15, 2),
(9, 6, 1),
(10, 9, 2),
(1, 18, 1),
(3, 4, 1),
(2, 16, 3),
(7, 13, 2),
(5, 20, 1);

INSERT INTO btl_order (user_id, total_price, status) VALUES
(1, 2300000, 'paid'),
(2, 1500000, 'pending'),
(3, 2800000, 'delivered'),
(4, 1050000, 'shipped'),
(5, 1900000, 'paid'),
(6, 970000, 'cancelled'),
(7, 1200000, 'paid'),
(8, 1980000, 'shipped'),
(9, 880000, 'pending'),
(10, 3100000, 'delivered');

INSERT INTO btl_order_detail (order_id, product_id, quantity, price) VALUES
(1, 3, 2, 1100000),
(2, 5, 1, 1300000),
(3, 1, 2, 1200000),
(3, 2, 1, 900000),
(4, 12, 1, 1050000),
(5, 6, 2, 1200000),
(6, 10, 1, 980000),
(7, 7, 1, 1500000),
(8, 14, 2, 1150000),
(9, 9, 1, 1000000),
(10, 15, 2, 1250000),
(1, 8, 1, 1000000),
(2, 4, 2, 950000),
(5, 11, 1, 1400000),
(6, 16, 1, 980000),
(7, 13, 1, 1700000),
(8, 17, 2, 990000),
(9, 18, 1, 1550000),
(10, 19, 1, 970000),
(10, 20, 1, 1350000);

INSERT INTO btl_comment (user_id, product_id, content) VALUES
(1, 3, 'Excellent wine!'),
(2, 5, 'Very smooth.'),
(3, 7, 'Would buy again.'),
(4, 10, 'Nice packaging.'),
(5, 12, 'Good value.'),
(6, 8, 'Tasted amazing.'),
(7, 2, 'A bit strong for me.'),
(8, 15, 'Perfect for dinner.'),
(9, 6, 'Loved the bubbles!'),
(10, 9, 'Fresh and fruity.'),
(1, 18, 'Unique flavor.'),
(2, 4, 'Great with seafood.'),
(3, 14, 'Sweet and delightful.'),
(4, 1, 'A classic choice.'),
(5, 13, 'Luxurious bottle.'),
(6, 11, 'My favorite!'),
(7, 16, 'A bit too dry.'),
(8, 17, 'Interesting taste.'),
(9, 19, 'Smooth and light.'),
(10, 20, 'Strong finish!');
