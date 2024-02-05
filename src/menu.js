const beerList = document.querySelector('#beerList');
const perPageSelect = document.querySelector('#perPageSelect');
const greaterBtn = document.querySelector('#greater');
const lessBtn = document.querySelector('#less');
const beforeYearBtn = document.querySelector('#before-year');
const greaterCont = document.querySelector('#greater-container');
const lessCont = document.querySelector('#less-container');
const beforeCont = document.querySelector('#before-container');
const allBtn = document.querySelector('#all-beers');
const searchInput = document.querySelector('.search-input');
const optionsCont = document.querySelector('#options-container');

// ==Events

// pagination default 25
perPageSelect.addEventListener('change', () => {
    const perPage = perPageSelect.value;
    fetchBeerData(perPage);
});
// show beer abv greater  6
greaterBtn.addEventListener('click',()=>{
    beerList.style.display = "none";
    lessCont.style.display = "none";
    beforeCont.style.display = "none";
    optionsCont.style.display = "none";

    allBtn.style.display = "block"
    greaterCont.classList.add('item-container')
    greaterCont.style.display = "flex"
    showGreaterBeer()
});
// show beers abv less 6
lessBtn.addEventListener('click', ()=>{
    beerList.style.display = "none";
    greaterCont.style.display = "none";
    beforeCont.style.display = "none";
    optionsCont.style.display = "none";

    allBtn.style.display = "block"
    lessCont.classList.add('item-container');
    lessCont.style.display = "flex";
    showLessBeer()   
});
// show beers before 
beforeYearBtn.addEventListener('click', ()=>{
    beerList.style.display = "none";
    greaterCont.style.display = "none";
    lessCont.style.display = "none";
    optionsCont.style.display = "none";

    allBtn.style.display = "block"
    beforeCont.classList.add('item-container');
    beforeCont.style.display = "flex"
    brewedBeforeBeer()
});
// Show all beers
allBtn.addEventListener('click', ()=>{
    greaterCont.style.display = "none";
    lessCont.style.display = "none";
    beforeCont.style.display = "none";
    allBtn.style.display = "none";

    optionsCont.style.display = "block "
    beerList.style.display = "flex";
    fetchBeerData(25);
    
})
// Search input
searchInput.addEventListener('input', () => {
    searchData()
 });





// ==Functions

// Function to fetch beer data from the API
function fetchBeerData(perPage) {
    const apiUrl = `https://api.punkapi.com/v2/beers?page=2&per_page=${perPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           beerList.innerHTML = '';
           data.forEach(beer => {
                renderBeer(beer);
            });
        })
        .catch(error => console.error('Error fetching beers:', error));
}

// Function to render a single beer item
function renderBeer(beer) {
    const beerItem = document.createElement('div');
    beerItem.classList.add('item');
    

    beerItem.innerHTML = `
        <img src="${beer.image_url}" alt="Beer Image" class="beer-img-api-menu">
        <div class="item-css">
        <div class="content-item"> <span class="name">Name:   </span>  <span class="strong-2">${beer.name}</span></div>
        <div class="content-item"> <span class="strong">ABV:  </span> <span class="strong-2"> ${beer.abv}</span></div>
        <div class="content-item"> <span class="strong">Food: </span <span class="strong-2"> ${beer.food_pairing.join(', ')}</span></div>
        </div
    `;
    beerList.appendChild(beerItem);
}
// display 25 beers
fetchBeerData(25);

// Show beers AVB > 6%
function showGreaterBeer(){
   fetch(`https://api.punkapi.com/v2/beers?abv_gt=6`)
   .then(response => response.json())
   .then(data => {
    greaterCont.innerHTML = '';
    data.forEach(beer =>{
        const greatItem = document.createElement('div');
        greatItem.classList.add('item')
        greatItem.innerHTML = `
        <img src="${beer.image_url}" alt="Beer Image" class="beer-img-api-menu">
        <div class="item-css">
        <div class="content-item"> <span class="name">Name:   </span>  <span class="strong-2">${beer.name}</span></div>
        <div class="content-item"> <span class="strong">ABV:  </span> <span class="strong-2"> ${beer.abv}</span></div>
        <div class="content-item"> <span class="strong">Food: </span <span class="strong-2"> ${beer.food_pairing.join(', ')}</span></div>
        </div
        `;
        greaterCont.appendChild(greatItem);
    });
  }).catch(error => console.error('Error fetching data:',error))
};

// Show beers ABV< 6%
function showLessBeer(){
    fetch(`https://api.punkapi.com/v2/beers?abv_lt=6`)
    .then(response => response.json())
    .then(data => {
     greaterCont.innerHTML = '';
     data.forEach(beer =>{
         const lessItem = document.createElement('div');
         lessItem.classList.add('item')
         lessItem.innerHTML = `
         <img src="${beer.image_url}" alt="Beer Image" class="beer-img-api-menu">
         <div class="item-css">
         <div class="content-item"> <span class="name">Name:   </span>  <span class="strong-2">${beer.name}</span></div>
         <div class="content-item"> <span class="strong">ABV:  </span> <span class="strong-2"> ${beer.abv}</span></div>
         <div class="content-item"> <span class="strong">Food: </span <span class="strong-2"> ${beer.food_pairing.join(', ')}</span></div>
         </div
         `;
         lessCont.appendChild(lessItem);
     });
   }).catch(error => console.error('Error fetching data:',error))
 };

//  Show beers Brewed before 11-2012
function brewedBeforeBeer(){
    fetch(`https://api.punkapi.com/v2/beers?brewed_before=11-2012`)
    .then(response => response.json())
    .then(data => {
     greaterCont.innerHTML = '';
     data.forEach(beer =>{
         const brewedItem = document.createElement('div');
         brewedItem.classList.add('item')
         brewedItem.innerHTML = `
         <img src="${beer.image_url}" alt="Beer Image" class="beer-img-api-menu">
         <div class="item-css">
         <div class="content-item"> <span class="name">Name:   </span>  <span class="strong-2">${beer.name}</span></div>
         <div class="content-item"> <span class="strong">Year:  </span> <span class="strong-2"> ${beer.first_brewed}</span></div>
         <div class="content-item"> <span class="strong">Food: </span <span class="strong-2"> ${beer.food_pairing.join(', ')}</span></div>
         </div
         `;
         beforeCont.appendChild(brewedItem);
     });
   }).catch(error => console.error('Error fetching data:',error))
 };
 
 
// Search data input
function searchData(){
    const searchQuery = searchInput.value.toLowerCase(); 

    // Fetch beer data from the API with the current page size
    const perPage = perPageSelect.value;
    const apiUrl = `https://api.punkapi.com/v2/beers?page=2&per_page=${perPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(beer => beer.name.toLowerCase().includes(searchQuery));
            beerList.innerHTML = '';
        
            filteredData.forEach(beer => {
                renderBeer(beer);
            });
        })
        .catch(error => console.error('Error fetching beers:', error));
}

