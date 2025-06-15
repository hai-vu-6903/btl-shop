const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { verifyToken, requireAdmin } = require('../middleware/auth');

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

// Tạo đơn hàng mới
router.post('/', verifyToken, requireAdmin, authMiddleware, (req, res) => {
  const { items, total_price } = req.body;

  // 1. Tạo đơn hàng chính
  db.query("INSERT INTO btl_order (user_id, total_price) VALUES (?, ?)",
    [req.user.id, total_price],
    (err, result) => {
      if (err) return res.status(500).json(err);
      const orderId = result.insertId;

      // 2. Tạo chi tiết đơn hàng
      const values = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
      db.query("INSERT INTO btl_order_detail (order_id, product_id, quantity, price) VALUES ?", [values], (err2) => {
        if (err2) return res.status(500).json(err2);

        // 3. Xóa giỏ hàng
        db.query("DELETE FROM btl_cart WHERE user_id = ?", [req.user.id]);
        res.json({ message: "Đặt hàng thành công", order_id: orderId });
      });
    });
});

// Lấy danh sách đơn hàng (admin)
router.get('/', (req, res) => {
  db.query("SELECT * FROM btl_order", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Cập nhật trạng thái đơn hàng
router.put('/:id', verifyToken, requireAdmin, (req, res) => {
  const { status } = req.body;
  db.query("UPDATE btl_order SET status = ? WHERE id = ?", [status, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cập nhật thành công" });
  });
});

module.exports = router;
