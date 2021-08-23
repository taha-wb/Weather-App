const card = document.querySelector('.card');
const button = document.querySelector('.search-button');
const input = document.querySelector('.input')
const name = document.querySelector('.current-city');
const time = document.querySelector('.time');
const deg = document.querySelector('.deg');
const desc = document.querySelector('.desc');
const addButton = document.querySelector('.add-button');
const list = document.querySelector('.list');
const cities = list.querySelectorAll('div');


desc.textContent = "Search for a city" ;


/* adding functionalities to the search button */

button.addEventListener('click', () => {
  fetch('http://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
  .then(response => response.json())
  
  .then(data => {
    console.log(data);
    name.textContent = data['name'];
    let tempKelvin =  data['main']['temp'] ;
    let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
    deg.textContent = tempCelsius;
    deg.textContent += '°';
    desc.textContent = data['weather'][0]['description'];
    addButton.style.display = 'block';
  
    /* checking if the savewd list already includes the new searched city */

    if( Array.from(cities).some(city => city.textContent == name.textContent) ){
      addButton.style.backgroundColor = 'rgb(74, 91, 245)';
      addButton.textContent = 'remove from list';
     }
     else{
      addButton.style.backgroundColor = 'white';
      addButton.textContent = 'add to list';
     }
  
  })
  

  .catch(err => alert('invalid city'));
});



/* adding functionalities to the add to list button */

addButton.addEventListener('click' , (e) => {

  if(e.target.textContent == 'remove from list'){
   
    const removedCity = Array.from(cities).find(city => city.textContent == name.textContent);
    list.removeChild(removedCity);
    addButton.style.backgroundColor = 'white';
    addButton.textContent = 'add to list';
   
   }

  else{
     
    /* creating new city into the list  */

  const newCity = document.createElement('div');
  newCity.classList.add("city");

  const newText = document.createElement("p"); 
  newText.classList.add("city-name");

  newText.textContent = name.textContent ;

  newCity.appendChild(newText);
  list.appendChild(newCity);

  addButton.style.backgroundColor = 'rgb(74, 91, 245)';
  addButton.textContent = 'remove from list';
  


  /* adding click event to the new added city */

  newCity.addEventListener('click', (e) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q='+newText.textContent+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      name.textContent = data['name'];
      let tempKelvin =  data['main']['temp'] ;
      let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
      deg.textContent = tempCelsius;
      deg.textContent += '°';
      desc.textContent = data['weather'][0]['description'];
      
     addButton.style.display = 'block';
     addButton.style.backgroundColor = 'rgb(74, 91, 245)';
     addButton.textContent = 'remove from list';

   
    

     
      
    })
  
    })
  } 
    })


  
 
  
   
   
 
 
 

  
/* adding click event to all cities in list */

  Array.from(cities).forEach(city => {
    city.addEventListener("click" , (e) => {
      fetch('http://api.openweathermap.org/data/2.5/weather?q='+city.textContent+'&appid=4e4edf736ed67c868cfd39a9c336d3f3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      name.textContent = data['name'];
      let tempKelvin =  data['main']['temp'] ;
      let tempCelsius = Math.floor((tempKelvin - 273.15))  ;
      deg.textContent = tempCelsius;
      deg.textContent += '°';
      desc.textContent = data['weather'][0]['description'];
     addButton.style.display = 'block';
    
      if( Array.from(cities).some(city => city.textContent == name.textContent) ){
        addButton.style.backgroundColor = 'rgb(74, 91, 245)';
        addButton.textContent = 'remove from list';
       }
       else{
        addButton.style.backgroundColor = 'white';
        addButton.textContent = 'add to list';
       }
    })
  
    })
      
    })



