const mysql = require('mysql2'); //using mysql2 so the autenthication module works. Didn't work with "normal" mysql
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
const port = 1433;

// Create a MySQL connection, connection string. Using MYsql default port
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'databasetask',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Routes
// Get HTTP Request
 app.get('/users', (req, res) => { // user endpoint
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});


// Get a specific user with HTTP Get
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      throw err;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});


// Create a new user with HTTP Post
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  });
});

// Update a user with HTTP Put
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Delete a user with HTTP Delete
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'User deleted successfully' });
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
  
