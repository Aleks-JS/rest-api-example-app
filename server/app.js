const express = require('express');
const path = require('path');
const app = express();

const CONTACTS = [{ id: 1, name: 'Alex', value: '234-456-567', marked: false }];

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));
