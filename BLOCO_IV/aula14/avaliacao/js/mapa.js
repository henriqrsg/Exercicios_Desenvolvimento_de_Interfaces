const URL_MOCK = "https://6a1f5aa0b79eec0d6cf0ac7f.mockapi.io/locais";

const mapa = L.map('map').setView([-15.7941, -47.8825], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

mapa.on('click', function(e) {
    const lat = e.latlng.lat.toFixed(4);
    const lng = e.latlng.lng.toFixed(4);
    
    alert(`📍 Nova Coordenada Detectada:\nLatitude: ${lat}\nLongitude: ${lng}`);
});

async function carregarPontos() {
    try {
        const resposta = await fetch(URL_MOCK);
        const locais = await resposta.json();

        locais.forEach(local => {
            let classeCor = 'icon-azul';
            
            if (local.tipo === 'Fábrica') {
                classeCor = 'icon-vermelho';
            } else if (local.tipo === 'Loja') {
                classeCor = 'icon-verde';
            }

            const iconeCustomizado = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
                className: classeCor
            });

            const marcador = L.marker([local.lat, local.lng], { icon: iconeCustomizado }).addTo(mapa);

            marcador.bindPopup(`
                <strong>${local.nome}</strong><br>
                Tipo: ${local.tipo}<br>
                <small>Coord: ${local.lat}, ${local.lng}</small>
            `);
        });
    } catch (erro) {
        console.error("Erro ao carregar dados geográficos:", erro);
    }
}

carregarPontos();