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

window.onload = function() {
    console.log("window.onload executado!");
    fetchFiles('Anatomia1', 'anatomiaIList');
    fetchFiles('Fisiologia1', 'fisiologiaIList');
    fetchFiles('Anatomia2', 'anatomiaIIList');
    fetchFiles('Fisiologia2', 'fisiologiaIIList');
    fetchFiles('Semiologia', 'semiologiaList');
    fetchFiles('Patologia', 'patologiaList');
    fetchFiles('Parasitologia', 'parasitologiaList');
    fetchFiles('Imunologia', 'imunologiaList');
    fetchFiles('Microbiologia', 'microbiologiaList');
}
