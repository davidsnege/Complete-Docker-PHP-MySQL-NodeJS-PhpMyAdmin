const express = require('express');
const router = express.Router();
const connection = require('./config');

router.delete('/delete', (req, res) => {
  const { id, name, email } = req.body;
  let sql = '';
  let params = [];

  // Construir la consulta según los parámetros proporcionados
  if (id) {
    sql = 'DELETE FROM users WHERE id = ?';
    params = [id];
  } else if (name) {
    sql = 'DELETE FROM users WHERE name = ?';
    params = [name];
  } else if (email) {
    sql = 'DELETE FROM users WHERE email = ?';
    params = [email];
  } else {
    return res.status(400).json({ error: 'Debe proporcionar id, name o email' });
  }
  
  connection.query(sql, params, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'No se encontró el usuario' });
      return;
    }
    res.json({ 
      message: 'User deleted successfully',
      affectedRows: result.affectedRows
    });
  });
});

module.exports = router;