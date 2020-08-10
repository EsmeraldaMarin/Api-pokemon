//VARIABLES

let btn = document.querySelector("button");
let form = document.querySelector("form");

const url = "https://pokeapi.co/api/v2/pokemon/";

let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");

let pokemons_ctn = document.getElementById("pokemons_ctn");



//evento


btn.addEventListener("click", formTransition)

function formTransition(e) {
    e.preventDefault();

    if (input1.value === "" || input2.value === "" || input3.value === "") {
        return alert("Por favor, complete todos los campos")
    }

    form.className = "formTransition";
    //fetch

    let fetch1 = fetch(url + input1.value).then(res => res.json());
    let fetch2 = fetch(url + input2.value).then(res => res.json());
    let fetch3 = fetch(url + input3.value).then(res => res.json());

    //promesas

    Promise.all([fetch1, fetch2, fetch3])
        .then(data => {
            for (let i = 0; i < data.length; i++) {

                createElements(data[i])

            }
        })
        .catch(err =>{
            alert("El numero que ingresó no corresponde a ningun Pokemon")
            let btnVolver = document.createElement("button");
            btnVolver.textContent = "REGRESAR"
            pokemons_ctn.appendChild(btnVolver);
            btnVolver.onclick = ()=>{
                location.reload();
            }
            btn.removeEventListener("click", formTransition);

        })
}

function createElements(info) {

    btn.textContent = "VOLVER";


    let card = document.createElement("div");
    let name = document.createElement("h3");
    let img = document.createElement("img");
    name.textContent = info.name;
    img.src = info.sprites.front_default;

    card.appendChild(name);
    card.appendChild(img);
    pokemons_ctn.appendChild(card);

    btn.removeEventListener("click", formTransition);
}
