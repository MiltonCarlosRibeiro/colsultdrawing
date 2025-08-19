let pdfFiles = [];
let dxfFiles = [];
let historyPDF = [];
let historyDXF = [];

// Carrega os arquivos do servidor
fetch('/api/lista')
    .then(res => res.json())
    .then(files => {
        pdfFiles = files.pdfs;
        dxfFiles = files.dxfs;
        // Não renderiza os cards completos na inicialização!
        renderHistory('pdf');
        renderHistory('dxf');
    });

// Renderiza cards dos resultados da busca
function renderCards(fileList, containerId, type) {
    const cardsContainer = document.getElementById(containerId);
    cardsContainer.innerHTML = '';
    fileList.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = file;
        card.onclick = () => {
            window.open('/pdfs/' + encodeURIComponent(file), '_blank');
            addToHistory(file, type);
        };
        cardsContainer.appendChild(card);
    });
}

// Adiciona ao histórico
function addToHistory(file, type) {
    if (type === 'pdf') {
        historyPDF = historyPDF.filter(item => item !== file);
        historyPDF.unshift(file);
        historyPDF = historyPDF.slice(0, 5);
        renderHistory('pdf');
    } else {
        historyDXF = historyDXF.filter(item => item !== file);
        historyDXF.unshift(file);
        historyDXF = historyDXF.slice(0, 5);
        renderHistory('dxf');
    }
}

// Renderiza cards do histórico
function renderHistory(type) {
    const containerId = type === 'pdf' ? 'historyContainerPDF' : 'historyContainerDXF';
    const history = type === 'pdf' ? historyPDF : historyDXF;
    const cardsHistory = document.getElementById(containerId);
    cardsHistory.innerHTML = '';
    history.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = file;
        card.onclick = () => window.open('/pdfs/' + encodeURIComponent(file), '_blank');
        cardsHistory.appendChild(card);
    });
}

// Busca por início
document.getElementById('searchInputPDF').addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const containerId = 'cardsContainerPDF';
    if (q.length === 0) {
        document.getElementById(containerId).innerHTML = '';
        return;
    }
    const filtered = pdfFiles.filter(name => name.toLowerCase().startsWith(q));
    renderCards(filtered, containerId, 'pdf');
});
document.getElementById('searchInputDXF').addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const containerId = 'cardsContainerDXF';
    if (q.length === 0) {
        document.getElementById(containerId).innerHTML = '';
        return;
    }
    const filtered = dxfFiles.filter(name => name.toLowerCase().startsWith(q));
    renderCards(filtered, containerId, 'dxf');
});
