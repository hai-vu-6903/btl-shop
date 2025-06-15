const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// ✅ Xem sản phẩm (không cần phân quyền)
router.get('/', (req, res) => {
  db.query("SELECT * FROM btl_product", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ Thêm sản phẩm (chỉ admin)
router.post('/', verifyToken, requireAdmin, (req, res) => {
  const { name, price, image, description, catalog_id } = req.body;
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
  db.query("DELETE FROM btl_product WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Xóa sản phẩm thành công' });
  });
});

module.exports = router;

// router.get('/:id', (req, res) => {
//   db.query("SELECT * FROM btl_product WHERE id = ?", [req.params.id], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result[0]);
//   });
// });