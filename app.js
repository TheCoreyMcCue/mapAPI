import mapboxgl from 'mapbox-gl';

const searchLocation = document.querySelector('#searchLocation');
const searchRequest = document.querySelector('#searchBox');
const lat = document.querySelector('#lat');
const long = document.querySelector('#long');

searchLocation.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log(searchRequest.value);
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchRequest.value}.json?access_token=pk.eyJ1IjoidGhlY29yZXltY2N1ZSIsImEiOiJja2tzYnRobnUxMXU0Mm9xbnFvNHkwbXVqIn0.qWWSsCZufFF1eBUzhcEKnw`)
    .then(response => response.json())
    .then((data) => {
      console.log(data.features[0].center);
      lat.innerHTML = `${data.features[0].center[1]}˚`;
      long.innerHTML = `${data.features[0].center[0]}˚`;
      mapboxgl.accessToken = '';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [data.features[0].center[0], data.features[0].center[1]],
        zoom: 12
      });
      new mapboxgl.Marker()
        .setLngLat([data.features[0].center[0], data.features[0].center[1]])
        .addTo(map);
    });
});
