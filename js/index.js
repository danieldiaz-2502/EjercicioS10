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

}

var votos = [];

database.ref('users').on('value',function(data){
    data.forEach(
        function(a){
            votos[a] = 0;
            }
    )
});

votar = () => {

    let ci = candidatoId.value;

    database.ref('users').on('value',function(data){
        

        data.forEach(
            function(a){
                let clave = a.key;
                let nombreCandidato = a.val().nombre;
                let valor = a.val().id;

                console.log(clave);
                console.log(valor);
                if(ci == valor){
                    alert(nombreCandidato+" "+valor);
                    
                    votos[a] = votos[a] + 1;
                }
            }
        )
    });
}

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
    database.ref('users').on('value',function(data){
        
        data.forEach(
            function(a){
                let nombreCandidato = a.val().nombre;
                alert(nombreCandidato + ': ' + votos[a]+' votos');
            }
        )
    });
} 
    

registrarBtn.addEventListener('click', registrar);
votarBtn.addEventListener('click', votar);
verCandidatosBtn.addEventListener('click', verCandidatos);
verVotacionesBtn.addEventListener('click', verVotaciones);