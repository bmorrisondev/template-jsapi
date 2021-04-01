// Import express and create a new express app
require('dotenv').config()
const FaunaService = require('@brianmmdev/faunaservice')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

const fauna = new FaunaService(process.env.FAUNA_SECRET)

app.get('/', async (req, res) => {
  const rec = await fauna.listRecords(process.env.COLLECTION_NAME)
  res.json(rec)
});

app.get('/:id', async (req, res) => {
  const rec = await fauna.getRecordById(process.env.COLLECTION_NAME, req.params.id)
  res.json(rec)
});

app.post('/', async (req, res) => {
  const rec = await fauna.createRecord(process.env.COLLECTION_NAME, req.body)
  res.json(rec)
});

app.put('/:id', async (req, res) => {
  const rec = await fauna.updateRecord(process.env.COLLECTION_NAME, req.params.id, req.body)
  res.json(rec)
});

app.delete('/:id', async (req, res) => {
  const rec = await fauna.deleteRecord(process.env.COLLECTION_NAME, req.params.id)
  res.json(rec)
});

// Define the port we're going to listen for requests on
const port = 3000;

// Tell the app to listen on that port, and log out to the console once its listening.
app.listen(port);
console.log(`listening on http://localhost:${port}`);