const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(error => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

    const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

app.get('/test', (req, res) => {
    res.json('test ok');
});

dotenv.config();


app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
      const createdUser = await User.create({
        username:username,
        password:hashedPassword,
      });
      jwt.sign({userId:createdUser._id,username}, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {sameSite:'none', secure:true}).status(201).json({
          id: createdUser._id,
        });
      });
    } catch(err) {
      if (err) throw err;
      res.status(500).json('error');
    }
  });


app.listen(4040, () => {
    console.log('Server is running on port 4040');
});
