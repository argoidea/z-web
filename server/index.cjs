const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

const aboutPath = path.join(DATA_DIR, 'about.json');
const collectionsPath = path.join(DATA_DIR, 'collections.json');
const drawingsPath = path.join(DATA_DIR, 'drawings.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
ensureDir(DATA_DIR);
ensureDir(UPLOADS_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureDir(UPLOADS_DIR);
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

function readJson(filePath, defaultValue) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// About
app.get('/api/about', (req, res) => {
  const data = readJson(aboutPath, null);
  res.json(data || {});
});

app.put('/api/about', (req, res) => {
  writeJson(aboutPath, req.body);
  res.json(req.body);
});

// Collections
app.get('/api/collections', (req, res) => {
  const data = readJson(collectionsPath, []);
  res.json(Array.isArray(data) ? data : []);
});

app.put('/api/collections', (req, res) => {
  writeJson(collectionsPath, req.body);
  res.json(req.body);
});

// Drawings
app.get('/api/drawings', (req, res) => {
  const data = readJson(drawingsPath, []);
  res.json(Array.isArray(data) ? data : []);
});

app.put('/api/drawings', (req, res) => {
  writeJson(drawingsPath, req.body);
  res.json(req.body);
});

// Upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
