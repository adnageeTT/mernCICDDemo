import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import  User from './user.model.js';

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
    suseNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));





app.post('/register', async(req, res) => {
    try{
        const { username, password, firstname, lastname } = req.body;
        const newUser = new User({username, password, firstname, lastname});
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on part ${PORT}`));
