import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import  User from './user.model.js';

const app = express();
app.use(cors());
app.use(express.json());


const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};
connectDB();



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
