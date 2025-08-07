// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const MAPOTECA_DIR = 'T:\Mapoteca';

app.use(express.static(__dirname));
app.use('/pdfs', express.static(MAPOTECA_DIR));

// API lista arquivos, separando PDFs e DXFs
app.get('/api/lista', (req, res) => {
    fs.readdir(MAPOTECA_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler a pasta' });
        const pdfs = files.filter(f => f.toLowerCase().endsWith('.pdf'));
        const dxfs = files.filter(f => f.toLowerCase().endsWith('.dxf'));
        res.json({ pdfs, dxfs });
    });
});

const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/index.html`);
});
