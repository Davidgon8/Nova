
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(bodyParser.json());

app.post('/ask', async (req, res) => {
  const userMessage = req.body.message;
  console.log("Received user message:", userMessage);

  if (!userMessage) {
    console.error("No user message received");
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
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

    console.log("Received reply from OpenAI:", response.data);
    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("OpenAI request failed:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'OpenAI error', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Nova debug server running on port ${PORT}`);
});
