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
        // Construa o URL da API do GitHub
        const apiUrl = `https://api.github.com/repos/Efraim1011/markmap-anki/contents/${folder}`;
        console.log(`Buscando arquivos em: ${apiUrl}`);
        
        // Fetch os dados do repositório GitHub
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        // Verificação de resposta
        if (!response.ok) {
            throw new Error(`Erro ao buscar arquivos do GitHub: ${response.statusText}`);
        }

        // Parse dos arquivos retornados
        const files = await response.json();
        console.log(`Arquivos encontrados em ${folder}:`, files);
        const list = document.getElementById(elementId);
        list.innerHTML = ''; // Limpa os itens da lista existentes

        // Loop para adicionar links na lista
        files.forEach(file => {
            if (file.type === "file" && file.name.endsWith('.html')) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = file.html_url;
                link.textContent = decodeURIComponent(file.name.replace(/%20/g, ' '));
                link.target = '_blank'; // Abre o link em uma nova aba
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
    fetchFiles('1%C2%BA%20Per%C3%ADodo/Anatomia%20I', 'anatomiaIList');
    fetchFiles('1%C2%BA%20Per%C3%ADodo/Fisiologia%20I', 'fisiologiaIList');
    fetchFiles('2%C2%BA%20Per%C3%ADodo/Anatomia%20II', 'anatomiaIIList');
    fetchFiles('2%C2%BA%20Per%C3%ADodo/Fisiologia%20II', 'fisiologiaIIList');
    fetchFiles('3%C2%BAPer%C3%ADodo/Semiologia', 'semiologiaList');
    fetchFiles('3%C2%BAPer%C3%ADodo/Patologia', 'patologiaList');
    fetchFiles('3%C2%BAPer%C3%ADodo/Parasitologia', 'parasitologiaList');
    fetchFiles('3%C2%BAPer%C3%ADodo/Imunologia', 'imunologiaList');
    fetchFiles('3%C2%BAPer%C3%ADodo/Microbiologia', 'microbiologiaList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/Farmacologia', 'farmacologiaList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/Epidemiologia', 'epidemiologiaList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/Otorrinolaringologia', 'otorrinolaringologiaList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/Oftalmologia', 'oftalmologiaList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/PAPM%20IV', 'papmivList');
    fetchFiles('4%C2%BA%20Per%C3%ADodo/Sa%C3%BAde%20da%20Fam%C3%ADlia%20IV', 'saudefamiliaivList');
}
