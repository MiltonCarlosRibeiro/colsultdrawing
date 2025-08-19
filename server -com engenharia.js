// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// --- CONFIGURAÇÃO DE CAMINHOS FIXOS (VERSÃO DE TESTE) ---
const PATHS = {
    pdf: 'T:\\Mapoteca',
    dxf: 'T:\\Mapoteca',
    sldprt: '\\\\PKM-DC1\\Engenharia\\Desenhos SW',
    sldasm: '\\\\PKM-DC1\\Engenharia\\Desenhos SW',
    slddrw: '\\\\PKM-DC1\\Engenharia\\Desenhos SW'
};
// -------------------------------------------------------------

app.use(express.static(__dirname));

// Rota para abrir arquivos, com lógica condicional para PDF
app.get('/openfile', (req, res) => {
    const { type, file } = req.query;
    const basePath = PATHS[type];

    if (!basePath || !file) {
        return res.status(400).send('Parâmetros inválidos (tipo ou arquivo faltando).');
    }

    const filePath = path.join(basePath, file);
    
    if (type === 'pdf') {
        // --- ALTERAÇÃO APLICADA AQUI ---
        // Adicionamos este cabeçalho para instruir explicitamente o navegador a ABRIR o PDF.
        res.setHeader('Content-Disposition', `inline; filename="${file}"`);

        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`Erro ao enviar arquivo: ${filePath}`, err);
                if (!res.headersSent) {
                    res.status(404).send('Arquivo não encontrado ou acesso negado.');
                }
            }
        });
    } else {
        // Para todos os outros tipos (DXF, SLDPRT, etc.), força o download.
        res.download(filePath, file, (err) => {
            if (err) {
                console.error(`Erro no download do arquivo: ${filePath}`, err);
                if (!res.headersSent) {
                    res.status(404).send('Arquivo não encontrado ou acesso negado.');
                }
            }
        });
    }
});


// API para listar todos os arquivos de todas as pastas configuradas
app.get('/api/lista', async (req, res) => {
    try {
        const mapotecaFiles = await fs.readdir(PATHS.pdf).catch(e => { console.error(`Erro ao ler ${PATHS.pdf}:`, e); return []; });
        const desenhosSwFiles = await fs.readdir(PATHS.sldprt).catch(e => { console.error(`Erro ao ler ${PATHS.sldprt}:`, e); return []; });

        const pdfs = mapotecaFiles.filter(f => f.toLowerCase().endsWith('.pdf'));
        const dxfs = mapotecaFiles.filter(f => f.toLowerCase().endsWith('.dxf'));
        
        const sldprts = desenhosSwFiles.filter(f => f.toLowerCase().endsWith('.sldprt'));
        const sldasms = desenhosSwFiles.filter(f => f.toLowerCase().endsWith('.sldasm'));
        const slddrws = desenhosSwFiles.filter(f => f.toLowerCase().endsWith('.slddrw'));

        res.json({ pdfs, dxfs, sldprts, sldasms, slddrws });

    } catch (error) {
        console.error("Erro geral na API /api/lista:", error);
        res.status(500).json({ error: 'Ocorreu um erro no servidor ao buscar os arquivos.' });
    }
});


const PORT = 8090;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/index.html`);
});