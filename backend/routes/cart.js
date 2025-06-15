const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

// Middleware xác thực token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
}

// Lấy giỏ hàng của user
router.get('/', authMiddleware, (req, res) => {
  db.query(`
    SELECT c.id, p.id as product_id, p.name, p.price, c.quantity 
    FROM btl_cart c 
    JOIN btl_product p ON c.product_id = p.id 
    WHERE c.user_id = ?`,
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

// Thêm sản phẩm vào giỏ
router.post('/', authMiddleware, (req, res) => {
  const { product_id, quantity } = req.body;
  db.query(`
    INSERT INTO btl_cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `, [req.user.id, product_id, quantity], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Thêm vào giỏ hàng thành công' });
  });
});

module.exports = router;
