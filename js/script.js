
/*

localStorage.clear()

*/

const botonChiste = document.getElementById('fetchJoke');
const listaChistes = document.getElementById('jokeList');

// Contador de numero para generar la id de cada chiste
let contador = 0; 

const generadorDeNumero = () => {
    return contador++;
};


// Funcion con el fetch a la api
const llamadaChiste = () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then((respone) => {
       return respone.json()
    })
    .then((data) => {
        const id = generadorDeNumero();
        mostrarChistes(data.value, id);
        guardarChiste(data.value, id);
    })
    .catch((error) => {
        console.error(error)
    })
}

//Agregamos la accion al boton principal
botonChiste.addEventListener('click', () => {
   llamadaChiste()
   /* console.log(localStorage) */
})


// Funcion para generar el cuadro con el chiste y el boton eliminar
let mostrarChistes = (chiste, id) => {
    listaChistes.innerHTML += `
    <li class='cajaChiste'>
      <p>${chiste}</p>
      <button id=${id}>Eliminar</button>
    </li>
    `
}

// Funcion que guarda chiste en el LocalStorage
const guardarChiste = (chisteItem, id) => {

    // Obtiene chistes guardados o crea array nuevo vacio
    const chistesGuardados = JSON.parse(localStorage.getItem('chistes')) || [];
    
    // Agrega el nuevo chiste al array
    chistesGuardados.push({ id, chiste: chisteItem });

    // Guarda el array actualizado en localStorage
    localStorage.setItem('chistes', JSON.stringify(chistesGuardados));
}


// Evento para el boton eliminar
listaChistes.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const chisteItem = event.target.closest('.cajaChiste');
        chisteItem.remove();

        const id = event.target.id;
        const chistesGuardados = JSON.parse(localStorage.getItem('chistes')) || [];
        const nuevosChistes = chistesGuardados.filter((chiste) => chiste.id != id);
        localStorage.setItem('chistes', JSON.stringify(nuevosChistes));
    }  

});


window.addEventListener('DOMContentLoaded', () => {
    // Recupera el array de chistes
    const chistesGuardados = JSON.parse(localStorage.getItem('chistes')) || [];

    // Muestra cada chiste en la lista
    chistesGuardados.forEach((chiste) => {
        mostrarChistes(chiste.chiste, chiste.id);
    });    
});

borrarLista.addEventListener('click', () => {
    listaChistes.innerHTML = '';
    localStorage.clear();
});
 


