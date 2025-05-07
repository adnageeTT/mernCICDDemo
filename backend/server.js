import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import  User from './models/User.js';

const allowedOrigins = [process.env.CLIENT_URL];

// setup middleware
const app = express();
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// connect to the database
const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
    }
};
connectDB();

// A sample endpoint
app.post('/register', async(req, res) => {
    try{
        const { username, password, firstname, lastname } = req.body;
        
        const newUser = new User({username, password, firstname, lastname});
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: `Registration failed ${ err }` });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));