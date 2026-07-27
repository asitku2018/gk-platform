require('dotenv').config();
const express = require('express');
const cors = require('cors');

const articleRoutes = require('./routes/articles');
const quizRoutes = require('./routes/quizzes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/quizzes', quizRoutes);

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
