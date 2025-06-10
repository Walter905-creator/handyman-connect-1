const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/ask', async (req, res) => {
  const { message } = req.body;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: chat.choices[0].message.content });
  } catch (err) {
    console.error('AI error:', err.message);
    res.status(500).json({ error: 'AI assistant failed' });
  }
});

module.exports = router;
