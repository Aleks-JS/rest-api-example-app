const express = require('express');
const { request } = require('http');
const path = require('path');
const app = express();
const { v4 } = require('uuid');

const CONTACTS = [
  { id: v4(), name: 'Alex', value: '234-456-567', marked: false },
];

// GET
app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);
});

// POST
app.post('/api/contacts', (req, res) => {});

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));
