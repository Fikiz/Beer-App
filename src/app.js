// const
const randomBeerWraper = document.querySelector('.wrapper');
const buyBtn = document.querySelector('#btn-buy');
const fetchBtn = document.querySelector('#btn-fetch-again');
const popUpLoader = document.querySelector('#popup-loader')
const closePopup = document.querySelector('#close-popup');
const overlay = document.querySelector('.overlay');



 fetchRandomBeer(); // Call the function to fetch and display random beer

// Events 
 buyBtn.addEventListener('click',()=>{
     popUpLoader.classList.add('open-popup');
     overlay.style.display = "block"
    
 });
closePopup.addEventListener('click',()=>{
    popUpLoader.classList.remove('open-popup');
    fetchRandomBeer()
    overlay.style.display = "none"
 });

 fetchBtn.addEventListener('click', ()=>{
      fetchRandomBeer()
 });

 // ======Functions======
async function fetchRandomBeer() {
    try {
        const response = await fetch('https://api.punkapi.com/v2/beers/random');
        const data = await response.json();
        
        const beer = data[0]; // Get the first beer from the response array
    
        // DOM elements 
       document.querySelector('.left-side').innerHTML = `<img src="${beer.image_url}" alt="beer-img" class="beer-img-api">`;
       document.querySelector('#beer-name').innerHTML = `<span class="strong">Name:</span> <span class=" name">${beer.name}</span> `;
       document.querySelector('#beer-desc').innerHTML = `<span class="strong">Description:</span  <span class="strong-2">${beer.description}</span  `;
       document.querySelector('#beer-food-paring').innerHTML = `<span class="strong">Food Pairing:</span> <span class="strong-2"> ${beer.food_pairing.join(', ')} </span> `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
