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
        const encodedFolder = encodeURIComponent(folder);
        const apiUrl = `https://api.github.com/repos/Efraim1011/markmap-anki/contents/${encodedFolder}`;
        console.log(`Buscando arquivos em: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
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
            link.href = file.html_url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');
            link.textContent = file.name.replace('.html', '');
            link.target = '_blank';
            listItem.appendChild(link);
            list.appendChild(listItem);
        });
    } catch (error) {
        console.error(`Erro ao buscar arquivos para ${folder}:`, error);
        const list = document.getElementById(elementId);
        if (list) {
            list.innerHTML = `<li>Erro ao carregar mapas mentais: ${error.message}</li>`;
        }
    }
}

window.onload = function() {
    console.log("window.onload executado!");
    const folders = [
        { path: '1o_Periodo/Anatomia_I', id: 'anatomiaIList' },
        { path: '1o_Periodo/Fisiologia_I', id: 'fisiologiaIList' },
        { path: '2o_Periodo/Anatomia_II', id: 'anatomiaIIList' },
        { path: '2o_Periodo/Fisiologia_II', id: 'fisiologiaIIList' },
        { path: '3o_Periodo/Semiologia', id: 'semiologiaList' },
        { path: '3o_Periodo/Patologia', id: 'patologiaList' },
        { path: '3o_Periodo/Parasitologia', id: 'parasitologiaList' },
        { path: '3o_Periodo/Imunologia', id: 'imunologiaList' },
        { path: '3o_Periodo/Microbiologia', id: 'microbiologiaList' },
        { path: '4o_Periodo/Farmacologia', id: 'farmacologiaList' },
        { path: '4o_Periodo/Epidemiologia', id: 'epidemiologiaList' },
        { path: '4o_Periodo/Otorrinolaringologia', id: 'otorrinolaringologiaList' },
        { path: '4o_Periodo/Oftalmologia', id: 'oftalmologiaList' },
        { path: '4o_Periodo/PAPM_IV', id: 'papmivList' },
        { path: '4o_Periodo/Saude_da_Familia_IV', id: 'saudefamiliaivList' }
    ];
    
    folders.forEach(folder => fetchFiles(folder.path, folder.id));
}
