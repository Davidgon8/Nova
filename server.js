
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// === PASTE YOUR OPENAI API KEY HERE ===
const OPENAI_API_KEY = 'PASTE-YOUR-API-KEY-HERE';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error('OpenAI error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to get response from Nova brain." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Nova GPT-4o brain is running on port ${PORT}`);
});
