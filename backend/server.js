import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import  User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully');
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
        res.status(500).json({ error: 'Registration failed' + err.message});
    }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.resolve(__dirname, '..', 'frontend', 'build');
    console.log('Frontend build path:', frontendPath);
    app.use(express.static(frontendPath));
    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });



    // app.use(express.static(path.join(__dirname, '../frontend/build')));
    // app.get(/(.*)/, (req, res) => {
    //   res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    // });
  }
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));