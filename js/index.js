const id = document.getElementById('id');
const nombre = document.getElementById('nombre');
const candidatoId = document.getElementById('candidatoId');
const registrarBtn = document.getElementById('registrarBtn');
const votarBtn = document.getElementById('votarBtn');

var database = firebase.database();

registrar = () => {

    let n = nombre.value;
    let i = id.value;
    let c = candidatoId.value;

    if(i !== c){

    }

    let objetoCandidato = {
        nombre: n,
        id: i
    };

let json = JSON.stringify(objetoCandidato);

console.log(objetoCandidato);
console.log(json)

database.ref('users/'+objetoCandidato.nombre).set(objetoCandidato);

}

registrarBtn.addEventListener('click', registrar);