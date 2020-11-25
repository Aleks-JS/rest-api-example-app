const express = require('express');
const { request } = require('http');
const path = require('path');
const app = express();
const { v4 } = require('uuid');

let CONTACTS = [
  { id: v4(), name: 'Alex', value: '234-456-567', marked: false },
];

app.use(express.json());

// GET
app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);
});

// POST
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter((el) => el.id !== req.params.id);
  res.status(200).json({ message: 'contact delete' });
});

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));
