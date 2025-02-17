const express = require('express');
const router = express.Router();
const connection = require('./config');

router.post('/create', (req, res) => {
  const { name, email, pwd } = req.body;
  const sql = `INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)`;
  
  connection.query(sql, [name, email, pwd], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User created successfully', id: result.insertId });
  });
});

module.exports = router;