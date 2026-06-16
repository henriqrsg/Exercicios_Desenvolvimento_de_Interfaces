const API_URL = "https://6a1f5aa0b79eec0d6cf0ac7f.mockapi.io/produto";

async function initDashboard() {
    const status = document.getElementById('status-api');
    try {
        status.innerText = "Sincronizando dados com a nuvem...";
        const res = await fetch(API_URL);
        const dados = await res.json();

        const totalItens = dados.reduce((acc, curr) => acc + curr.quantidade, 0);
        const valorTotal = dados.reduce((acc, curr) => acc + (curr.quantidade * curr.valor), 0);

        renderizarTabela(dados);
        renderizarGraficos(dados);
        status.innerText = "Sincronizado: " + new Date().toLocaleTimeString();
    } catch (erro) {
        status.innerText = "Erro de conexão com o banco de dados.";
    }
}

function renderizarTabela(dados) {
    const corpo = document.getElementById('corpo-tabela');
    corpo.innerHTML = dados.map(p => `
        <tr>
            <td>#${p.id}</td>
            <td>${p.nome}</td>
            <td>${p.quantidade} un.</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td><strong>R$ ${(p.quantidade * p.valor).toFixed(2)}</strong></td>
        </tr>
    `).join('');
}

function renderizarGraficos(dados) {
    // Preparar dados
    const nomes = dados.map(p => p.nome);
    const quantidades = dados.map(p => p.quantidade);
    const valores = dados.map(p => ({ value: (p.quantidade * p.valor).toFixed(2), name: p.nome }));

    const chartBarras = echarts.init(document.getElementById('grafico-barras'));
    chartBarras.setOption({
        title: { text: 'Quantidade em Estoque por Produto' },
        tooltip: {},
        xAxis: { data: nomes },
        yAxis: {},
        series: [{ type: 'bar', data: quantidades, color: '#3498db' }]
    });

    const chartPizza = echarts.init(document.getElementById('grafico-pizza'));
    chartPizza.setOption({
        title: { text: 'Distribuição do Capital Investido', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
            type: 'pie',
            radius: '50%',
            data: valores,
            emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        }]
    });
}

window.onload = initDashboard;