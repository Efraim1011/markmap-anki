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
        const response = await fetch(`https://api.github.com/repos/Efraim1011/markmap-anki/contents/${folder}`, {
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
                link.href = `${folder}/${file.name}`;
                link.textContent = file.name.replace(/%20/g, ' ');
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
    fetchFiles('1º%20Período/Anatomia%20I', 'anatomiaIList');
    fetchFiles('1º%20Período/Fisiologia%20I', 'fisiologiaIList');
    fetchFiles('2º%20Período/Anatomia%20II', 'anatomiaIIList');
    fetchFiles('2º%20Período/Fisiologia%20II', 'fisiologiaIIList');
    fetchFiles('3ºPeríodo/Semiologia', 'semiologiaList');
    fetchFiles('3ºPeríodo/Patologia', 'patologiaList');
    fetchFiles('3ºPeríodo/Parasitologia', 'parasitologiaList');
    fetchFiles('3ºPeríodo/Imunologia', 'imunologiaList');
    fetchFiles('3ºPeríodo/Microbiologia', 'microbiologiaList');
    fetchFiles('4º%20Período/Farmacologia', 'farmacologiaList');
    // Removidas as chamadas para Epidemiologia e Saúde da Família IV
    fetchFiles('4º%20Período/Otorrinolaringologia', 'otorrinolaringologiaList');
    fetchFiles('4º%20Período/Oftalmologia', 'oftalmologiaList');
    fetchFiles('4º%20Período/PAPM%20IV', 'papmivList');
    fetchFiles('4º%20Período/Fundamentos%20da%20cirurgia', 'fundamentosCirurgiaList');
    fetchFiles('5º%20Período/Diagnóstico%20por%20imagem', 'diagnosticoImagemList');
    fetchFiles('5º%20Período/Farmacologia', 'farmacologia5List');
    fetchFiles('5º%20Período/Fundamentos%20do%20diagnóstico%20médico', 'fundamentosDiagnosticoList');
    fetchFiles('5º%20Período/Neurologia', 'neurologiaList');
    fetchFiles('5º%20Período/PAPM%20V', 'papmvList');
    fetchFiles('5º%20Período/Saúde%20mental', 'saudeMentalList');
}
