const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });


  })

  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

const User = require('./models/User');
const Contact = require('./models/Contact');
const Message = require('./models/Message');

app.use(express.json()); // Parse JSON request bodies

app.post('/api/register', async (req, res) => {
  const { username, password, displayname } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'username already exists' });
    }

    // Create a new user object
    const newUser = new User({ username, password, displayname });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/contact', async (req, res) => {
  const { username, password, displayname } = req.body;

  try {
    // Check if username already exists
    const existingUser = await Contact.find();
    // Create a new user object

    res.status(200).json(existingUser);
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email } = req.body;

  try {


    // Create a new user object
    const newContact = new Contact({ name, email });
    await newContact.save();

    res.status(200).json({ message: 'Contact Added' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/message', async (req, res) => {
  const { name, sender, message } = req.body;

  try {


    // Create a new user object
    const newMessage = new Message({ name, sender, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message Sent' });
  } catch (error) {
    console.error('Error sending message', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/message', async (req, res) => {
  const { username, password, displayname } = req.body;

  try {
    // Check if username already exists
    const message = await Message.find();
    // Create a new user object

    res.status(200).json(message);
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username exists and password matches
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', data: user });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


