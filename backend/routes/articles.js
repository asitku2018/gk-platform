const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get Articles with filters
router.get('/', async (req, res) => {
  const { lang = 'en', category, limit = 10 } = req.query;
  
  let query = supabase.from('articles').select('*').eq('language', lang).limit(limit);
  if (category) query = query.eq('category', category);

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

module.exports = router;
