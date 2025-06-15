const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// ✅ Xem tất cả sản phẩm (không cần đăng nhập)
router.get('/', (req, res) => {
  db.query("SELECT * FROM btl_product", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ Xem chi tiết 1 sản phẩm
router.get('/:id', (req, res) => {
  db.query("SELECT * FROM btl_product WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json(result[0]);
  });
});

// ✅ Thêm sản phẩm (chỉ admin)
router.post('/', verifyToken, requireAdmin, (req, res) => {
  const { name, price, image, description, catalog_id } = req.body;

  if (!name || !price || !image || !description || !catalog_id) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin sản phẩm' });
  }

  db.query(
    "INSERT INTO btl_product (name, price, image, description, catalog_id) VALUES (?, ?, ?, ?, ?)",
    [name, price, image, description, catalog_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Thêm sản phẩm thành công' });
    });
});

// ✅ Xóa sản phẩm (chỉ admin)
router.delete('/:id', verifyToken, requireAdmin, (req, res) => {
  db.query("DELETE FROM btl_product WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json({ message: 'Xóa sản phẩm thành công' });
  });
});

module.exports = router;
