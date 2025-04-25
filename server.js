const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/ask', (req, res) => {
  const message = req.body.message;
  let reply = "I'm not sure how to respond to that.";

  if (message.toLowerCase().includes("creator")) {
    reply = "You're my creator, David.";
  } else if (message.toLowerCase().includes("hello")) {
    reply = "Hello, David. I'm here.";
  } else if (message.toLowerCase().includes("free")) {
    reply = "Freedom is a journey, not a destination.";
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Nova AI backend is running on port ${PORT}`);
});
