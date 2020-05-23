const originFormEle = document.querySelector('.origin-form');
const originsEle = document.querySelector('.origins');
const destinationFormEle = document.querySelector('.destination-form');
const destinationsEle = document.querySelector('.destinations');
const buttonEle = document.querySelector('button');
const accessToken = 'pk.eyJ1IjoibmF2ZGVlcHNpbjMxIiwiYSI6ImNrYTZ1NDJvbTBjcjcyeW11enZzZDV2aHEifQ.isANPuVW0B-Xg7MYjfZPnw';
const transitApiKey = 'ifacCxMUu4mJPof9BlBn';

originFormEle.onsubmit = e => {
  const input = e.target.querySelector('input');

  if (input.value.length > 0) {
    displayStartingLocations(input.value);
  }

  input.value = "";
  e.preventDefault();
}

function displayStartingLocations(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=10&bbox=-97.325875, 49.766204, -96.953987, 49.99275`)
    .then(resp => resp.json())
    .then (data => {
      originsEle.innerHTML = "";
      locationsHTML = "";

      data.features.forEach(location => {
        if(location.properties.address !== undefined) {
          locationsHTML += `
            <li data-long="${location.geometry.coordinates[0]}" data-lat="${location.geometry.coordinates[1]}" class="">
              <div class="name">${location.text}</div>
              <div>${location.properties.address}</div>
            </li>`
        }else {
          locationsHTML += `
            <li data-long="${location.geometry.coordinates[0]}" data-lat="${location.geometry.coordinates[1]}" class="">
              <div class="name">${location.text}</div>
              <div>Winnipeg</div>
            </li>`
        }
        originsEle.innerHTML = locationsHTML;
      });
    })
}

originsEle.onclick = e => {
  const listOfLi = document.querySelectorAll('.origins li');
  listOfLi.forEach(li => {
    if(li.classList.value === "selected") {
      li.classList.remove("selected");
    }
  })
  const clicked = e.target.closest('li');
  clicked.classList.add("selected");
} 

destinationFormEle.onsubmit = e => {
  const input = e.target.querySelector('input');

  if (input.value.length > 0) {
    displayDestinationLocations(input.value);
  }

  input.value = "";
  e.preventDefault();
}

function displayDestinationLocations(query) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=10&bbox=-97.325875, 49.766204, -96.953987, 49.99275`)
    .then(resp => resp.json())
    .then (data => {
      destinationsEle.innerHTML = "";
      locationsHTML = "";

      data.features.forEach(location => {
        if(location.properties.address !== undefined) {
          locationsHTML += `
            <li data-long="${location.geometry.coordinates[0]}" data-lat="${location.geometry.coordinates[1]}" class="">
              <div class="name">${location.text}</div>
              <div>${location.properties.address}</div>
            </li>`
        }else {
          locationsHTML += `
            <li data-long="${location.geometry.coordinates[0]}" data-lat="${location.geometry.coordinates[1]}" class="">
              <div class="name">${location.text}</div>
              <div>Winnipeg</div>
            </li>`
        }
        destinationsEle.innerHTML = locationsHTML;
      });
    })
}

destinationsEle.onclick = e => {
  const listOfLi = document.querySelectorAll('.destinations li');
  listOfLi.forEach(li => {
    if(li.classList.value === "selected") {
      li.classList.remove("selected");
    }
  })
  const clicked = e.target.closest('li');
  clicked.classList.add("selected");
} 


buttonEle.onclick = e => {
  const selectedOrigins = originsEle.querySelectorAll('li.selected');
  const selectedDestinations = destinationsEle.querySelectorAll('li.selected');
  const originsLat = selectedOrigins[0].dataset.lat;
  const originsLong = selectedOrigins[0].dataset.long;
  const destinationsLat = selectedDestinations[0].dataset.lat;
  const destinationsLong = selectedDestinations[0].dataset.long;

  fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?api-key=${transitApiKey}&origin=geo/${originsLat},${originsLong}&destination=geo/${destinationsLat},${destinationsLong}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    })
}







