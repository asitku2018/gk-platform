require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import route files (Make sure these files exist in your /routes folder)
const articleRoutes = require('./routes/articles');
const quizRoutes = require('./routes/quizzes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// NEW: Root route to fix "Cannot GET /"
// ==========================================
app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
      <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8fafc;">
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <h1 style="color: #4f46e5;">🚀 OmniKnowledge API</h1>
          <p style="color: #64748b;">The backend server is successfully running!</p>
        </div>
      </body>
    </html>
  `);
});

// Mount API Routes
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/quizzes', quizRoutes);

// Health Check route for server monitoring
app.get('/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date() }));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
