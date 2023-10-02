// codigo da barra de busca

const content = document.querySelector('.content');
const pokemonName = document.querySelector('.name');
const pokemonNumber = document.querySelector('.number');
const pokemonImg = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const typeList = document.querySelector('.types')
const li_type_element = document.querySelector('type');

const btn_back = document.querySelector('.back');
const btn_next = document.querySelector('.next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
      }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        console.log(data);

        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = "#" + data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;

        // mapeia os tipos para um array
        const types = data.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types;
        typeList.innerHTML = '';
        types.forEach(type => {
            const liElement = document.createElement('li');
            liElement.className = 'type';
            liElement.classList.add(`${type}`);
            liElement.textContent = type;
            typeList.appendChild(liElement)
          });

          content.className = 'content';
          content.classList.add(`${type}`);

          const td_height = document.querySelector('#height');
          const height = data['height'];
          td_height.textContent = height;

          const td_weight = document.querySelector('#weight');
          const weight = data['weight'];
          td_weight.textContent = weight;
          
          const td_abilities = document.querySelector('#abilities');
          td_abilities.innerHTML = '';
          const abilities = data.abilities.map((abilitySlot) => abilitySlot.ability.name);

          const [ability] = abilities;

          abilities.forEach( (name, indice) => {
            const span_element = document.createElement('span');
            span_element.classList.add('ability')
            if(indice == abilities.length -1){
                span_element.textContent += name ;
            }else{
                span_element.textContent += name + ", ";
            }
            td_abilities.appendChild(span_element);
          });

    } else {
        pokemonImg.style.display = 'none';
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';

        content.className = 'content';
        typeList.textContent = '';
        td_abilities.innerHTML = '';
        
      }
}

 form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase())
 })

 renderPokemon(searchPokemon);

 btn_back.addEventListener('click', ( ) =>{
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
 })

 
 btn_next.addEventListener('click', ( ) =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon)
 })


const types = document.querySelector('detail');

