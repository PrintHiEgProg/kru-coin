const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyParser.json());


const users = {};

// GET /api/user-data/:userId
app.get('/api/user-data/:userId', (req, res) => {
  const userId = req.params.userId;
  if (users[userId]) {
    res.json(users[userId]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});


app.post('/api/user-data/:userId', (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;


  if (!userData.count || !userData.countBonus || !userData.countTrueMax || !userData.levelMoreClicks || !userData.levelMoreEnergy || !userData.levelTgChannel1 || !userData.levelTgPremium || !userData.countTrue) {
    return res.status(400).json({ message: 'Missing required fields' });
  }


  users[userId] = userData;
  res.status(200).json({ message: 'User data saved successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});