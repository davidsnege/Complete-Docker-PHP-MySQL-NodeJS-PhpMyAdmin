const express = require('express');
const router = express.Router();
const connection = require('./config');

router.put('/update', (req, res) => {
  const { id, name, email } = req.body;
  const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  
  connection.query(sql, [name, email, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
});

module.exports = router;