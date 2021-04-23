const id = document.getElementById('id');
const nombre = document.getElementById('nombre');
const candidatoId = document.getElementById('candidatoId');
const registrarBtn = document.getElementById('registrarBtn');
const votarBtn = document.getElementById('votarBtn');
const verVotacionesBtn = document.getElementById('verVotacionesBtn');
const verCandidatosBtn = document.getElementById('verCandidatosBtn');

var database = firebase.database();

registrar = () => {

    let n = nombre.value;
    let i = id.value;

    let objetoCandidato = {
        nombre: n,
        id: i
    };

let json = JSON.stringify(objetoCandidato);

console.log(objetoCandidato);
console.log(json)

database.ref('users/'+objetoCandidato.nombre).set(objetoCandidato);
database.ref('votos/'+objetoCandidato.nombre).set(objetoCandidato.nombre);

}

const alfa = ()=>{
    
    database.ref('votos').on('value', (data)=>{
        
        var output = "";    
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            let numVotos = Object.entries(child.val()).length;
            console.log(numVotos);
            output += child.key+": "+numVotos+"\n";
        });
        console.log(output);

    });

}
alfa();

const beta = ()=>{

    var output = "";
    database.ref('cadidatos').once('value', (data)=>{
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            database.ref('votos/'+child.key).once('value', (votos)=>{
                votos.forEach(voto=>{
                    console.log(child.key+"=>"+voto.val());
                    output += child.key+"=>"+voto.val();
                });
                
            });

    
        });
        console.log(output);
    });
}

beta();



const verCandidatos = () => {

    var output = "";
    database.ref('users/').once('value', (data)=>{
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            database.ref('users/'+child.key).once('value', (users)=>{
                users.forEach(user=>{
                    console.log(child.key+"=>"+users.val());
                    output += users.val().nombre+"=>"+users.val().id+"\n";
                });
                
            });

    
        });
        console.log(output);
        alert(output);
    });
}

verVotaciones = () => {
    
}

registrarBtn.addEventListener('click', registrar);
votarBtn.addEventListener('click', alfa,beta);
verCandidatosBtn.addEventListener('click', verCandidatos);
verVotacionesBtn.addEventListener('click', verVotaciones);