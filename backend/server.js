const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { type } = require('@testing-library/user-event/dist/type');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://**************:******/users.db';

//подключение 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//определение для схемы
 
const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    count: {type: Number, default: 0},
    countTrue:{type: Number,default: 0}
});

const User = mongoose.model('User', userSchema);

//json

app.use(bodyParser.json());

app.post('/save-user', async (req, res) => {
    const { userId, count } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'Telegram ID is required'});
    }

    try {
        let user = await User.findOne({ userId});

        if (!user) {
            user = new User({userId, count });
        } else {
            user.count =count;
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User saved' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error'});
    }
});

cron.schedule('0 0 * * *', async() => {
    try {
        const users = await User.find({});

        for (const user of users) {
            user.countTrue += 1;
            await user.save();
        }

        console.log('CountTrue updated for all users');
    } catch (error) {
        console.error('Error update CounTrue:', error);
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});