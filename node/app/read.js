const express = require('express');
const router = express.Router();
const connection = require('./config');

router.get('/read', (req, res) => {
  const sql = 'SELECT id, name, email FROM users';
  
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

module.exports = router;