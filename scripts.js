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
        const apiUrl = `https://api.github.com/repos/Efraim1011/markmap-anki/contents/${folder}`;
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
        list.innerHTML = '';

        files.forEach(file => {
            if (file.type === "file" && file.name.endsWith('.html')) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `https://efraim1011.github.io/markmap-anki/${folder}/${file.name}`;
                link.textContent = decodeURIComponent(file.name.replace(/%20/g, ' ').replace('.html', ''));
                link.target = '_blank';
                listItem.appendChild(link);
                list.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
    }
}

window.onload = function() {
    console.log("window.onload executado!");
    fetchFiles('1º Período/Anatomia I', 'anatomiaIList');
    fetchFiles('1º Período/Fisiologia I', 'fisiologiaIList');
    fetchFiles('2º Período/Anatomia II', 'anatomiaIIList');
    fetchFiles('2º Período/Fisiologia II', 'fisiologiaIIList');
    fetchFiles('3ºPeríodo/Semiologia', 'semiologiaList');
    fetchFiles('3ºPeríodo/Patologia', 'patologiaList');
    fetchFiles('3ºPeríodo/Parasitologia', 'parasitologiaList');
    fetchFiles('3ºPeríodo/Imunologia', 'imunologiaList');
    fetchFiles('3ºPeríodo/Microbiologia', 'microbiologiaList');
    fetchFiles('4º Período/Farmacologia', 'farmacologiaList');
    fetchFiles('4º Período/Epidemiologia', 'epidemiologiaList');
    fetchFiles('4º Período/Otorrinolaringologia', 'otorrinolaringologiaList');
    fetchFiles('4º Período/Oftalmologia', 'oftalmologiaList');
    fetchFiles('4º Período/PAPM IV', 'papmivList');
    fetchFiles('4º Período/Saúde da Família IV', 'saudefamiliaivList');
}
