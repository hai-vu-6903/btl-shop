const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);


const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads')); // để frontend truy cập ảnh

const catalogRoutes = require('./routes/catalogs');
app.use('/api/catalogs', catalogRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
