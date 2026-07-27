const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get Quizzes by Category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase
    .from('quizzes')
    .select('*, questions(*)')
    .eq('category', category);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

// Submit Quiz Score
router.post('/progress', async (req, res) => {
  const { user_id, quiz_id, score } = req.body;
  const { data, error } = await supabase
    .from('user_progress')
    .insert([{ user_id, quiz_id, score }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, message: 'Progress saved successfully' });
});

module.exports = router;
