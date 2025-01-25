// Diccionario de IDs por defecto
const diccionarioPorDefecto = {
    "version": "Beta .0.0.11",
};

if (!localStorage.getItem('diccionarioIds')) {
    localStorage.setItem('diccionarioIds', JSON.stringify(diccionarioPorDefecto));
    console.log('Diccionario inicial guardado en localStorage.');
}


function reemplazarIds() {
    const diccionarioIds = JSON.parse(localStorage.getItem('diccionarioIds')) || {};
    const elementos = document.querySelectorAll('.id');

    elementos.forEach(elemento => {
        const id = elemento.innerText.trim();
        if (diccionarioIds[id]) {
            elemento.innerText = diccionarioIds[id];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    reemplazarIds();
    cargarColoresGuardados();
});

// Función para actualizar el diccionario
function actualizarDiccionario(nuevoDiccionario) {
    localStorage.setItem('diccionarioIds', JSON.stringify(nuevoDiccionario));
    console.log('Diccionario actualizado en localStorage.');
}

// Actualiza el diccionario con una nueva versión
const nuevoDiccionario = {
    "version": "Version 1.1",
};
actualizarDiccionario(nuevoDiccionario);

// Cargar los colores guardados al cargar la página
function cargarColoresGuardados() {
    const savedBackground = localStorage.getItem('backgroundColor');
    const savedText = localStorage.getItem('textColor');
    const savedSvg = localStorage.getItem('svgColor');
    

    if (savedBackground) document.body.style.backgroundColor = savedBackground;
    if (savedText) document.body.style.color = savedText;
    if (savedSvg) actualizarColoresSvg(savedSvg);

    // Restaura los valores de los selectores (opcional)
    if (savedBackground) document.getElementById('backgroundSelector').value = savedBackground;
    if (savedText) document.getElementById('textSelector').value = savedText;
    if (savedSvg) document.getElementById('svgSelector').value = savedSvg;
}

// Cambiar colores y guardar en localStorage
function changeColors() {
    const backgroundValue = document.getElementById('backgroundSelector').value;
    const textValue = document.getElementById('textSelector').value;
    const svgValue = document.getElementById('svgSelector').value;

    document.body.style.backgroundColor = backgroundValue;
    document.body.style.color = textValue;

    actualizarColoresSvg(svgValue);

    localStorage.setItem('backgroundColor', backgroundValue);
    localStorage.setItem('textColor', textValue);
    localStorage.setItem('svgColor', svgValue);
}

// Aplicar colores a todos los elementos dentro de los SVG
function actualizarColoresSvg(color) {
    const svgs = document.querySelectorAll('svg');
    svgs.forEach(svg => {
        svg.querySelectorAll('*').forEach(element => {
            element.setAttribute('fill', color); // Aplica fill
            element.setAttribute('stroke', color); // Aplica stroke
        });
    });
}

// Aplicar colores predefinidos
function applyPresetColor() {
    const presetColor = document.getElementById('presetColors').value;
    if (presetColor) {
        const [backgroundKey, backgroundValue, textKey, textValue, svgKey, svgValue] = presetColor.split('-');
        if (backgroundKey === 'background' && textKey === 'text' && svgKey === 'svg') {
            document.body.style.backgroundColor = backgroundValue;
            document.body.style.color = textValue;

            actualizarColoresSvg(svgValue);

            document.getElementById('backgroundSelector').value = backgroundValue;
            document.getElementById('textSelector').value = textValue;
            document.getElementById('svgSelector').value = svgValue;

            localStorage.setItem('backgroundColor', backgroundValue);
            localStorage.setItem('textColor', textValue);
            localStorage.setItem('svgColor', svgValue);
        }
    }
}

// Carga de imagen
document.getElementById('imageUploader').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            localStorage.setItem('uploadedImage', imageData);
            displayImage(imageData);
        };
        reader.readAsDataURL(file);
    }
});

function displayImage(imageData) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = `<img src="${imageData}" alt="Imagen subida" style="max-width: 100%; height: auto;">`;
}

