


async function getAllPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error("Error fetching Pokemon list:", err);
        return [];
    }
}

// Function to set up autocomplete
async function setupAutocomplete() {
    const pokemonList = await getAllPokemon();
    const input = document.getElementById("pokeName");
    const datalist = document.createElement("datalist");
    datalist.id = "pokemon-list";
    
    pokemonList.forEach(pokemon => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        datalist.appendChild(option);
    });
    
    document.body.appendChild(datalist);
    input.setAttribute("list", "pokemon-list");
}

setupAutocomplete();

async function fetching(){
    try {
        const pokemonName = document.getElementById("pokeName").value.toLowerCase().trim();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        const image = document.getElementById("pokeImage");
        image.src = data.sprites.front_default;
        image.style.display = "block";

        // Update info div with Pokemon details
        const infoDiv = document.querySelector(".info");
        infoDiv.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <p>Height: ${data.height / 10}m</p>
            <p>Weight: ${data.weight / 10}kg</p>
            <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
            <div class="stats">
                <p>HP: ${data.stats[0].base_stat}</p>
                <p>Attack: ${data.stats[1].base_stat}</p>
                <p>Defense: ${data.stats[2].base_stat}</p>
            </div>
        `;
 
        infoDiv.style.display = "block";
    } 
    catch(err) {
        console.error("Error fetching Pokémon data:", err);
    
        const infoDiv = document.querySelector(".info");
        infoDiv.innerHTML = `<p class="error">Pokemon not found! Try another name.</p>`;
        infoDiv.style.display = "block";
        

        const image = document.getElementById("pokeImage");
        image.style.display = "none";
    }
}