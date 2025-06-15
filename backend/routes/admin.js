const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken, requireAdmin } = require('../middleware/auth');

router.get('/stats', verifyToken, requireAdmin, (req, res) => {
  const stats = {};

  db.query("SELECT COUNT(*) AS total FROM btl_product", (err, p) => {
    stats.products = p[0].total;

    db.query("SELECT COUNT(*) AS total FROM btl_order", (err2, o) => {
      stats.orders = o[0].total;

      db.query("SELECT COUNT(*) AS total FROM user_table", (err3, u) => {
        stats.users = u[0].total;

        db.query("SELECT SUM(total_price) AS revenue FROM btl_order", (err4, r) => {
          stats.revenue = r[0].revenue || 0;
          res.json(stats);
        });
      });
    });
  });
});

module.exports = router;
