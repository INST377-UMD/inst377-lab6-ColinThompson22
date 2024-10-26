
function getrandominrange(from, to, fixed) {
    return(Math.random() * (to - from) + from).toFixed(fixed) * 1
}

function createmap() {
    const map=L.map("map").setView([39.8, -98.5], 4)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const coord= [];
    const locale= [];
   for(let i=0; i<3; i++) {
    const lat= getrandominrange(30, 35, 3);
    const long= getrandominrange(-90, -100, 3);
    const marker= L.marker([lat, long]).addTo(map)
    coord.push({lat, long})
    locale.push(fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
    .then((res) => res.json())
    .then((resJson) => {
        console.log("Response Json:", resJson)
    return resJson.locality}))
}
   document.getElementById("marker1").innerHTML=`Marker 1: Latitude: ${coord[0].lat} Longitude: ${coord[0].long}`
   document.getElementById("marker2").innerHTML= `Marker 2: Latitude: ${coord[1].lat} Longitude: ${coord[1].long}`
   document.getElementById("marker3").innerHTML= `Marker 3: Latitude: ${coord[2].lat} Longitude: ${coord[2].long}`
   Promise.all(locale).then(locales => {
    document.getElementById("locale1").innerHTML= `Locality: ${locales[0]}`
    document.getElementById("locale2").innerHTML= `Locality: ${locales[1]}`
    document.getElementById("locale3").innerHTML= `Locality: ${locales[2]}`
   })

}
window.onload= createmap;

