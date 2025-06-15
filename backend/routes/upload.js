const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const unique = Date.now() + path.extname(file.originalname);
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Route upload ảnh
router.post('/', upload.single('image'), (req, res) => {
  res.json({ filename: req.file.filename });
});

module.exports = router;
