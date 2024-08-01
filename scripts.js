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
                // Adicione um token de autenticação se necessário
                // 'Authorization': 'Bearer <your-token>'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar arquivos do GitHub: ${response.statusText}`);
        }

        const files = await response.json();
        console.log(`Arquivos encontrados em ${folder}:`, files); // Log dos arquivos encontrados
        const list = document.getElementById(elementId);
        list.innerHTML = ''; // Limpa os itens da lista existentes

        files.forEach(file => {
            if (file.type === "file" && file.name.endsWith('.html')) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `${folder}/${file.name}`;
                link.textContent = file.name.replace(/%20/g, ' ');
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
    fetchFiles('4º%20Período/Epidemiologia', 'epidemiologiaList');
    fetchFiles('4º%20Período/Otorrinolaringologia', 'otorrinolaringologiaList');
    fetchFiles('4º%20Período/Oftalmologia', 'oftalmologiaList');
    fetchFiles('4º%20Período/PAPM%20IV', 'papmivList');
    fetchFiles('4º%20Período/Saúde%20da%20Família%20IV', 'saudefamiliaivList');
    
}

// Função para iniciar o movimento do botão
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (element) {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // Posição inicial do cursor
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // Calcula a nova posição do cursor
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Define a nova posição do botão
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Para o movimento quando o mouse é solto
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Ativa a função de arrastar e soltar para todos os botões com a classe "draggable"
document.querySelectorAll('.draggable').forEach(button => {
    dragElement(button);
});

// Função para mostrar/esconder conteúdo toggle
function toggleVisibility(id) {
    var content = document.getElementById(id);
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}
