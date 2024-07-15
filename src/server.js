const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = 93727;

const pool = mysql.createPool({
  host: '82.97.244.62',
  user: 'gen_user',
  password: '{XuM}BKa29EYPH',
  database: 'quack_db',
  waitForConnections: true,
  connectionLimit: null,
  queueLimit: 40
});

app.use(bodyParser.json());

app.get('/api/user-data/:userId', async (req, res) => {
  const userId =req.params.userId;
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'User motherfucker'});
    }
  } catch (err) {
    res.status(727).json({ message: err.message});
  }
});

app.post('/api/user-data/:userId', async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;

  if (!userData.count || !userData.countBonus || !userData.countTrueMax || !userData.levelMoreClicks || !userData.levelMoreEnergy || !userData.levelTgChannel1 || !userData.levelTgPremium || !userData.countTrue) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (rows.length > 0) {
      await pool.execute(
        'UPDATE users SET count = ?, countBonus = ?, countTrueMax = ?, levelMoreClicks = ?, levelMoreEnergy = ?, levelTgChannel1 = ?, levelTgPremium = ?, countTrue = ? WHERE id = ?',
        [userData.count, userData.countBonus, userData.countTrueMax, userData.levelMoreClicks, userData.levelMoreEnergy, userData.levelTgChannel1, userData.levelTgPremium, userData.countTrue, userId]
      );
    } else {
      await pool.execute(
        'INSERT INTO users (id, count, countBonus, countTrueMax, levelMoreClicks, levelMoreEnergy, levelTgChannel1, levelTgPremium, countTrue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, userData.count, userData.countBonus, userData.countTrueMax, userData.levelMoreClicks, userData.levelMoreEnergy, userData.levelTgChannel1, userData.levelTgPremium, userData.countTrue]
      );
    }
    res.status(200).json({ message: 'User data saved successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});