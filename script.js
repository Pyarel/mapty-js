'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

/**
 * LECTURE: Using Geolocation api
 */
// Takes two callback fn as parameters : Success callback and error callback
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //Acessing coords property which has position coordinates
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      //   Install leaflet library and copy the code from leaflet overview page
      //L is a namespace by leaflet which provides methods for us to use
      const map = L.map('map').setView(coords, 13); //Create a map and set the view(lat,lng) on the map
      //   console.log(map);

      // Load and display tile layer on the map
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Display clickable icons on the map
      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup(); //bind a popup to marker click and then open it

      // Add a click event listener on map
      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        //Display clickable icons on the map and bind a popup to marker click
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250, //Max width of the popup, in pixels.
              minWidth: 300, //Min width of the popup, in pixels.
              autoClose: false, //override the default behavior of the popup closing when another popup is opened.
              closeOnClick: false, // override the default behavior of the popup closing when user clicks on the map
              className: 'running-popup', //A custom CSS class name to assign to the popup.
            })
          )
          .setPopupContent('Workout') //Sets the content of the popup bound to this layer.
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}
