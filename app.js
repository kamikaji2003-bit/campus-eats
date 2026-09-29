const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');
const indexRoutes = require('./routes/index');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', indexRoutes);
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Database Test Route (uses pg-promise)
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.one('SELECT NOW() AS current_time');
    res.json(result);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Campus Eats running at http://localhost:${PORT}`);
});