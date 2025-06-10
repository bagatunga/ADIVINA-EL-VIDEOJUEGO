function barajarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let intentosDisponibles = 2;
document.getElementById("contador").innerText = "Intentos disponibles: " + intentosDisponibles;

let imgAlea = Math.floor(Math.random() * 10);
let img = "imagenes/" + imgAlea + "b.jpg";
document.getElementById("imgJuego").src = img;

const juegos = [
    "balatro",
    "breath of the wild",
    "god of war",
    "it takes two",
    "metal gear solid",
    "mario kart",
    "outer wilds",
    "red dead redemption 2",
    "skyrim",
    "super smash bros"
];


let opcionesJuego = [];
const juegoCorrecto = juegos[imgAlea];
opcionesJuego.push(juegoCorrecto);
while (opcionesJuego.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * juegos.length);
    const juegoAleatorio = juegos[indiceAleatorio];
    if (!opcionesJuego.includes(juegoAleatorio)) {
        opcionesJuego.push(juegoAleatorio);
    }
}
opcionesJuego = barajarArray(opcionesJuego);

const opcionesElementos = document.querySelectorAll("#entrada li.desmarcado");

opcionesElementos.forEach((li, index) => {
    li.innerText = opcionesJuego[index];
});


let seleccion = null;


opcionesElementos.forEach(li => {
    li.style.cursor = "pointer"; 
    
    li.addEventListener("click", () => {
       
        opcionesElementos.forEach(el => el.classList.remove("selected"));
        
        li.classList.add("selected");
        
        seleccion = li.innerText;
    });
});

function probarSuerte() {
    if (!seleccion) {
        alert("Por favor, selecciona una opción antes de probar suerte.");
        return;
    }

    let resultado = comprobar(seleccion);

    let again = document.createElement("a");
    again.innerHTML = "¡Jugar otra vez!";
    again.classList.add("button");
    again.href = "index.html";

    if (resultado) {
        document.getElementById("akinator").src = "imagenes/aki1.png";

        limpiarOpciones();

        document.getElementById("contJugar").append(again);

        document.getElementById("contador").innerText = "¡Bien hecho!";

        const imgCompleta = "imagenes/" + imgAlea + "a.jpg";
        document.getElementById("imgJuego").src = imgCompleta;
    } else {
        intentosDisponibles--;

        document.getElementById("contador").innerText = "Intentos disponibles: " + intentosDisponibles;

        if (intentosDisponibles > 0) {
            document.getElementById("akinator").src = "imagenes/aki3.png";
        } else {
            document.getElementById("akinator").src = "imagenes/aki4.png";

            limpiarOpciones();

            document.getElementById("contJugar").append(again);

            document.getElementById("contador").innerText = "¡Inténtalo de nuevo!";

            const imgCompleta = "imagenes/" + imgAlea + "a.jpg";
            document.getElementById("imgJuego").src = imgCompleta;
        }
    }
}

function limpiarOpciones() {
    
    const opcionesElementos = document.querySelectorAll("#entrada li.desmarcado");
    opcionesElementos.forEach(li => {
        li.style.pointerEvents = "none";
        li.classList.remove("selected");
        li.style.color = "gray";
        li.style.cursor = "default";
    });
}


function comprobar(intento) {
    return intento.toLowerCase() === juegos[imgAlea].toLowerCase();
}


document.getElementById("boton").addEventListener("click", probarSuerte);

