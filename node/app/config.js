const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'your_user',
  password: process.env.MYSQL_PASSWORD || 'your_password',
  database: process.env.MYSQL_DATABASE || 'your_database'
});

// Agregar manejo de reconexión
function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log('Connected to MySQL');
  });

  connection.on('error', function(err) {
    console.error('MySQL connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;