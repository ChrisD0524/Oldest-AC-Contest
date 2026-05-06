const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const DATA_DIR = path.join(__dirname, '.data');
const DB_FILE = path.join(DATA_DIR, 'entries.json');

// Ensure .data dir and file exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

function readEntries() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch { return []; }
}
function writeEntries(entries) {
  fs.writeFileSync(DB_FILE, JSON.stringify(entries, null, 2));
}

// GET all entries
app.get('/api/entries', (req, res) => {
  res.json(readEntries());
});

// POST new entry
app.post('/api/entries', (req, res) => {
  const entry = req.body;
  if (!entry || !entry.customer || !entry.year) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const entries = readEntries();
  entry.id = Date.now();
  entry.submittedAt = new Date().toISOString();
  entries.push(entry);
  writeEntries(entries);
  res.json({ ok: true, entry, entries });
});

// DELETE all entries (admin only — password checked client-side)
app.delete('/api/entries', (req, res) => {
  writeEntries([]);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
