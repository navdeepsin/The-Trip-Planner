const formClassEle = document.querySelector('.origin-form');
console.log(formClassEle);

const accessToken = 'pk.eyJ1IjoibmF2ZGVlcHNpbjMxIiwiYSI6ImNrYTZ1NDJvbTBjcjcyeW11enZzZDV2aHEifQ.isANPuVW0B-Xg7MYjfZPnw';

formClassEle.onsubmit = e => {
  const input = e.target.querySelector('input');

  if (input.value.length > 0) {
    displayLocations(input.value);
  }

  input.value = "";
  e.preventDefault();
}

// function displayLocations(query) {
//   fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=10&bbox=-97.325875, 49.766204, -96.953987, 49.99275`)
//     .then(resp => resp.json())
//     .then (data => {
//       console.log(data);
//     })
// }
