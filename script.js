// Variáveis globais para armazenar os arquivos
let pdfFiles = [], dxfFiles = [], sldprtFiles = [], sldasmFiles = [], slddrwFiles = [];
// Variáveis para os históricos
let historyPDF = [], historyDXF = [], historySLDPRT = [], historySLDASM = [], historySLDDRW = [];

// Carrega TODOS os arquivos de TODAS as pastas na inicialização
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/lista')
        .then(res => res.json())
        .then(files => {
            if (files.error) throw new Error(files.error);

            // Popula os arrays de arquivos com os dados do servidor
            pdfFiles = files.pdfs || [];
            dxfFiles = files.dxfs || [];
            sldprtFiles = files.sldprts || [];
            sldasmFiles = files.sldasms || [];
            slddrwFiles = files.slddrws || [];
            
            console.log(`Arquivos carregados: ${pdfFiles.length} PDFs, ${dxfFiles.length} DXFs, ${sldprtFiles.length} SLDPRTs, etc.`);
        })
        .catch(err => {
            console.error('Falha ao carregar a lista de arquivos:', err);
            alert('Não foi possível carregar os arquivos do servidor. Verifique o console para mais detalhes.');
        });
});

// Função para renderizar os cards de resultado
function renderCards(fileList, containerId, type) {
    const cardsContainer = document.getElementById(containerId);
    cardsContainer.innerHTML = '';
    fileList.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = file;
        card.onclick = () => {
            // CORREÇÃO: Usa a nova rota /openfile, passando o TIPO do arquivo
            window.open(`/openfile?type=${type}&file=${encodeURIComponent(file)}`, '_blank');
            addToHistory(file, type);
        };
        cardsContainer.appendChild(card);
    });
}

// Função para adicionar ao histórico
function addToHistory(file, type) {
    const historyMap = {
        pdf: { list: historyPDF }, dxf: { list: historyDXF },
        sldprt: { list: historySLDPRT }, sldasm: { list: historySLDASM }, slddrw: { list: historySLDDRW }
    };
    const target = historyMap[type];
    if (!target) return;

    target.list = target.list.filter(item => item !== file);
    target.list.unshift(file);
    target.list.splice(5);
    renderHistory(type);
}

// Função para renderizar o histórico
function renderHistory(type) {
    const historyMap = {
        pdf: { list: historyPDF, container: 'historyContainerPDF' },
        dxf: { list: historyDXF, container: 'historyContainerDXF' },
        sldprt: { list: historySLDPRT, container: 'historyContainerSLDPRT' },
        sldasm: { list: historySLDASM, container: 'historyContainerSLDASM' },
        slddrw: { list: historySLDDRW, container: 'historyContainerSLDDRW' }
    };
    const target = historyMap[type];
    if (!target) return;

    const cardsHistory = document.getElementById(target.container);
    cardsHistory.innerHTML = '';
    target.list.forEach(file => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = file;
        // CORREÇÃO: Usa a nova rota /openfile, passando o TIPO do arquivo
        card.onclick = () => window.open(`/openfile?type=${type}&file=${encodeURIComponent(file)}`, '_blank');
        cardsHistory.appendChild(card);
    });
}

// Função genérica para lidar com a busca
function handleSearch(event, fileList, containerId, type) {
    const q = event.target.value.trim().toLowerCase();
    if (q.length === 0) {
        document.getElementById(containerId).innerHTML = '';
        return;
    }
    const filtered = fileList.filter(name => name.toLowerCase().startsWith(q));
    renderCards(filtered, containerId, type);
}

// Adiciona os eventos de busca para cada campo
document.getElementById('searchInputPDF').addEventListener('input', (e) => handleSearch(e, pdfFiles, 'cardsContainerPDF', 'pdf'));
document.getElementById('searchInputDXF').addEventListener('input', (e) => handleSearch(e, dxfFiles, 'cardsContainerDXF', 'dxf'));
document.getElementById('searchInputSLDPRT').addEventListener('input', (e) => handleSearch(e, sldprtFiles, 'cardsContainerSLDPRT', 'sldprt'));
document.getElementById('searchInputSLDASM').addEventListener('input', (e) => handleSearch(e, sldasmFiles, 'cardsContainerSLDASM', 'sldasm'));
document.getElementById('searchInputSLDDRW').addEventListener('input', (e) => handleSearch(e, slddrwFiles, 'cardsContainerSLDDRW', 'slddrw'));