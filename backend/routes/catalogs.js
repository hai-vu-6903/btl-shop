const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// Lấy danh mục
router.get('/', (req, res) => {
  db.query("SELECT * FROM btl_catalog", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Thêm danh mục
router.post('/', verifyToken, requireAdmin, (req, res) => {
  const { name, description } = req.body;
  db.query("INSERT INTO btl_catalog (name, description) VALUES (?, ?)", [name, description], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Đã thêm danh mục" });
  });
});

// Xóa danh mục
router.delete('/:id', verifyToken, requireAdmin, (req, res) => {
  db.query("DELETE FROM btl_catalog WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Đã xóa" });
  });
});

module.exports = router;
