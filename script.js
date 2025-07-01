let pdfFiles = [];
let dxfFiles = [];
let historyPDF = [];
let historyDXF = [];

fetch('/api/lista')
    .then(res => res.json())
    .then(files => {
        pdfFiles = files.pdfs;
        dxfFiles = files.dxfs;
        renderCards(pdfFiles, 'cardsContainerPDF', 'pdf');
        renderCards(dxfFiles, 'cardsContainerDXF', 'dxf');
    });

function renderCards(fileList, containerId, type) {
    const cardsContainer = document.getElementById(containerId);
    cardsContainer.innerHTML = '';
    fileList.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = file;
        if (type === 'pdf') {
            card.onclick = () => {
                window.open('/pdfs/' + encodeURIComponent(file), '_blank');
                addToHistory(file, 'pdf');
            };
        } else {
            card.onclick = () => {
                window.open('/pdfs/' + encodeURIComponent(file), '_blank');
                addToHistory(file, 'dxf');
            };
        }
        cardsContainer.appendChild(card);
    });
}

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

// Busca por início (começa com)
document.getElementById('searchInputPDF').addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const filtered = pdfFiles.filter(name => name.toLowerCase().startsWith(q));
    renderCards(filtered, 'cardsContainerPDF', 'pdf');
});
document.getElementById('searchInputDXF').addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    const filtered = dxfFiles.filter(name => name.toLowerCase().startsWith(q));
    renderCards(filtered, 'cardsContainerDXF', 'dxf');
});
