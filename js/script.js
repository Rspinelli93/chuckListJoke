
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
   console.log(localStorage)
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
    
     localStorage.setItem(id, chisteItem) 

}


// Evento para el boton eliminar
listaChistes.addEventListener('click', (event) => {

        //Saca la caja
        const chisteItem = event.target.closest('.cajaChiste');
        chisteItem.remove();

        // Saca del localStorage
        const id = event.target.id;
        localStorage.removeItem(`${id}`)

        console.log(localStorage)
});
 


