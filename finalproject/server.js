// https://cookbook.openai.com/examples/how_to_build_an_agent_with_the_node_sdk
// https://platform.openai.com/docs/api-reference/
// https://github.com/openai/openai-node/discussions/217

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/openai', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: req.body.prompt }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', error.status, error.message, error.code, error.type);
    } else {
      console.error('Other Error:', error);
    }
    res.status(500).send('Error occurred while processing your request.');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


