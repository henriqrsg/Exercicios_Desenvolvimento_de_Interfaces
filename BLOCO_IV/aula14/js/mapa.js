const URL_MOCK = "https://6a1f5aa0b79eec0d6cf0ac7f.mockapi.io/locais";

const mapa = L.map('map').setView([-15.7941, -47.8825], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

async function carregarPontos() {
    try {
        const resposta = await fetch(URL_MOCK);
        const locais = await resposta.json();

        locais.forEach(local => {
            const marcador = L.marker([local.lat, local.lng]).addTo(mapa);

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