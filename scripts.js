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
        const response = await fetch(`https://api.github.com/repos/Efraim1011/markmap-anki/contents/${folder}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const files = await response.json();

        const list = document.getElementById(elementId);
        list.innerHTML = ''; // Clear existing list items

        files.forEach(file => {
            if (file.name.endsWith('.html')) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `${folder}/${file.name}`;
                link.textContent = file.name.replace(/%20/g, ' ');
                listItem.appendChild(link);
                list.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

async function fetchDisciplinas() {
    const repoUrl = 'https://api.github.com/repos/Efraim1011/markmap-anki/contents';
    try {
        const response = await fetch(repoUrl);
        const data = await response.json();

        if (Array.isArray(data)) {
            return data.filter(item => item.type === 'dir').map(item => item.name);
        } else {
            console.error('Erro ao buscar dados do repositório:', data);
        }
    } catch (error) {
        console.error('Erro ao buscar dados do repositório:', error);
    }
    return [];
}

async function createDisciplinasButtons() {
    const disciplinas = await fetchDisciplinas();
    const container = document.getElementById('disciplinas-container');

    disciplinas.forEach(disciplina => {
        const button = document.createElement('button');
        button.textContent = disciplina.replace(/%20/g, ' ');
        button.className = 'toggle-btn';
        button.onclick = () => toggleVisibility(disciplina);

        const contentDiv = document.createElement('div');
        contentDiv.id = disciplina;
        contentDiv.className = 'toggle-content';

        const list = document.createElement('ul');
        list.id = `${disciplina}List`;
        contentDiv.appendChild(list);

        container.appendChild(button);
        container.appendChild(contentDiv);

        fetchFiles(disciplina, `${disciplina}List`);
    });
}

document.addEventListener('DOMContentLoaded', createDisciplinasButtons);
