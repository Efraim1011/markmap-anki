function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

async function fetchFiles(folder, elementId) {
    const response = await fetch(`https://api.github.com/repos/Efraim1011/markmap-anki/contents/${folder}`);
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
}

window.onload = function() {
    fetchFiles('Fisiologia/Fisiologia%20I', 'fisiologiaIList');
    fetchFiles('Fisiologia/Fisiologia%20II', 'fisiologiaIIList');
    fetchFiles('Anatomia/Anatomia%20I', 'anatomiaIList');
    fetchFiles('Anatomia/Anatomia%20II', 'anatomiaIIList');
    fetchFiles('Semiologia', 'semiologiaList');
}
