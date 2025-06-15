// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// Đăng nhập
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM user_table WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Email không đúng" });
    }

    const user = results[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      }
    });
  });
});

// Đăng ký
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "INSERT INTO user_table (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err) => {
      if (err) return res.status(500).json({ message: "Lỗi khi đăng ký", error: err });
      res.json({ message: "Đăng ký thành công" });
    }
  );
});

module.exports = router;
