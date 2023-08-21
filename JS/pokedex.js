//How many pokemons that should be rendered in the pokedex list
const pokemonCount = 151;
//Storage for each pokemon. Name , image,  type, description.
let pokeDex = {};

//Runs the getPokemon function as soon as all elements are loaded
window.onload = async function () {
  getPokemon(1);

  //
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);

    //Creates a div to place and render the list of pokemons
    const pokemon = document.createElement("div");
    //Sets the pokemon id to i. Function updatePokemon uses this id to render the new chosen pokemon
    pokemon.id = i;
    //Renders the pokemon name and makes it to Uppercase
    pokemon.innerText = i.toString() + ". " + pokeDex[i]["name"].toUpperCase();
    //Creates a class for styling the pokemon-name in CSS
    pokemon.classList.add("pokemon-name");

    //Makes the list clickable so user can choose a pokemon
    pokemon.addEventListener("click", updatePokemon);
    //Gets the element with id pokemon-list and appends the pokemon variable into it.
    document.querySelector("#pokemon-list").append(pokemon);
  }

  //Shows the description of the first pokemon in the pokeDex list. Bulbasaur. This is to make the text show when the page is loaded even if the user have not chosen a pokemon yet
  document.querySelector("#pokemon-description").innerText =
    pokeDex[1]["description"];
};

//Grabs the informaton from the pokemon API
async function getPokemon(number) {
  //Pokemon API
  let pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/" + number.toString();

  //Requests data from the API and converts the result into json format. Stores it into the pokemon variable
  let result = await fetch(pokeApiUrl);
  let pokemon = await result.json();

  //Various information of the pokemons
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  //Image of the pokemon
  let pokemonImg = pokemon["sprites"]["front_default"];

  //Gets the information from the API for flavour text of the pokemon
  respond = await fetch(pokemon["species"]["url"]);
  let pokemonDescription = await respond.json();

  //Gets the 9th flavor text from the Pokemon API
  pokemonDescription =
    pokemonDescription["flavor_text_entries"][9]["flavor_text"];

  //Create a object to be placed in the pokeDex array
  pokeDex[number] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    description: pokemonDescription,
  };
}

//When user clicks on a pokemon from the pokemon list it will update the pokemon display to render the new chosen pokemon image
function updatePokemon() {
  document.querySelector("#pokemon-img").src = pokeDex[this.id]["img"];

  //Clears the previous type category
  //This removes all the children elements of the element with the ID "pokemon-types
  let typesDiv = document.querySelector("#pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  //Updates to the new type category
  let types = pokeDex[this.id]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    //Adds two CSS classes to be styled with color and font in CSS. Let for more dynamic coloration on the type categories
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]);

    typesDiv.append(type);

    //Updates the description of the chosen pokemon
    document.querySelector("#pokemon-description").innerText =
      pokeDex[this.id]["description"];
  }
}
