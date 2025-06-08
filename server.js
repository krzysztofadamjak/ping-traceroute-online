const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/network', (req, res) => {
  const { host, type } = req.body;

  if (!host || !/^[\w\.\-]+$/.test(host)) {
    return res.json({ result: 'Nieprawidłowy host.' });
  }

  const cmd = type === 'traceroute' ? `traceroute ${host}` : `ping -c 4 ${host}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      return res.json({ result: `Błąd: ${stderr || error.message}` });
    }
    res.json({ result: stdout });
  });
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});