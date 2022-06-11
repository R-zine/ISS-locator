const btns = document.querySelectorAll('.btn');

let pan = true;

btns.forEach((btn) =>
	btn.addEventListener('click', () => {
		btns.forEach((btn) => btn.classList.toggle('active'));
		pan = !pan;
	})
);

const MAP = L.map('map').setView([51.505, -0.09], 3);
var icon = L.icon({
	iconUrl: './ISS.png',
	iconSize: [95, 50],
	iconAnchor: [47, 25],
	shadowUrl: './ISSshadow.png',
	shadowSize: [95, 50],
	shadowAnchor: [47, 25],
});
var marker = L.marker([0, 0], { icon: icon }).addTo(MAP);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution:
		'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(MAP);

var url = 'https://api.wheretheiss.at/v1/satellites/25544';

getLocation = async (url) => {
	const list = await fetch(url);
	const result = await list.json();
	const { latitude, longitude } = result;
	marker.setLatLng([latitude, longitude]);
	pan && MAP.setView([latitude, longitude]);
};

setInterval(() => getLocation(url), 2000);
