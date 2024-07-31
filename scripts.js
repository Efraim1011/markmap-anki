console.log("Script carregado com sucesso!");

function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

async function fetchFiles(folder, elementId) {
    try {
        const apiUrl = `https://api.github.com/repos/Efraim1011/markmap-anki/contents/${encodeURIComponent(folder)}`;
        console.log(`Buscando arquivos em: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar arquivos do GitHub: ${response.statusText}`);
        }

        const files = await response.json();
        console.log(`Arquivos encontrados em ${folder}:`, files);

        const list = document.getElementById(elementId);
        if (!list) {
            console.error(`Elemento com ID ${elementId} não encontrado.`);
            return;
        }

        list.innerHTML = '';

        const htmlFiles = files.filter(file => file.type === "file" && file.name.endsWith('.html'));

        if (htmlFiles.length === 0) {
            console.log(`Nenhum arquivo HTML encontrado em ${folder}`);
            list.innerHTML = '<li>Nenhum mapa mental disponível</li>';
            return;
        }

        htmlFiles.forEach(file => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `https://efraim1011.github.io/markmap-anki/${encodeURIComponent(folder)}/${encodeURIComponent(file.name)}`;
            link.textContent = decodeURIComponent(file.name.replace(/%20/g, ' ').replace('.html', ''));
            link.target = '_blank';
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
        const list = document.getElementById(elementId);
        if (list) {
            list.innerHTML = '<li>Erro ao carregar mapas mentais</li>';
        }
    }
}

window.onload = function() {
    console.log("window.onload executado!");
    const folders = [
        { path: '1º Período/Anatomia I', id: 'anatomiaIList' },
        { path: '1º Período/Fisiologia I', id: 'fisiologiaIList' },
        { path: '2º Período/Anatomia II', id: 'anatomiaIIList' },
        { path: '2º Período/Fisiologia II', id: 'fisiologiaIIList' },
        { path: '3ºPeríodo/Semiologia', id: 'semiologiaList' },
        { path: '3ºPeríodo/Patologia', id: 'patologiaList' },
        { path: '3ºPeríodo/Parasitologia', id: 'parasitologiaList' },
        { path: '3ºPeríodo/Imunologia', id: 'imunologiaList' },
        { path: '3ºPeríodo/Microbiologia', id: 'microbiologiaList' },
        { path: '4º Período/Farmacologia', id: 'farmacologiaList' },
        { path: '4º Período/Epidemiologia', id: 'epidemiologiaList' },
        { path: '4º Período/Otorrinolaringologia', id: 'otorrinolaringologiaList' },
        { path: '4º Período/Oftalmologia', id: 'oftalmologiaList' },
        { path: '4º Período/PAPM IV', id: 'papmivList' },
        { path: '4º Período/Saúde da Família IV', id: 'saudefamiliaivList' }
    ];

    folders.forEach(folder => fetchFiles(folder.path, folder.id));
}
