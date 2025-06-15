const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// Truy vấn SQL dạng Promise
function queryPromise(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

router.get('/stats', verifyToken, requireAdmin, async (req, res) => {
  try {
    const [p, o, u, r] = await Promise.all([
      queryPromise("SELECT COUNT(*) AS total FROM btl_product"),
      queryPromise("SELECT COUNT(*) AS total FROM btl_order"),
      queryPromise("SELECT COUNT(*) AS total FROM user_table"),
      queryPromise("SELECT SUM(total_price) AS revenue FROM btl_order")
    ]);

    res.json({
      products: p[0].total,
      orders: o[0].total,
      users: u[0].total,
      revenue: r[0].revenue || 0
    });
  } catch (error) {
    console.error('Lỗi khi truy vấn thống kê:', error);
    res.status(500).json({ message: 'Lỗi máy chủ khi lấy thống kê', error });
  }
});

module.exports = router;
