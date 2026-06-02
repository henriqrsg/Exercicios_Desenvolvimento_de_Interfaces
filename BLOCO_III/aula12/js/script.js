const URL_BASE = "https://6a1f5aa0b79eec0d6cf0ac7f.mockapi.io/produto";

function navegar(tela) {
    document.getElementById('tela-incluir').style.display = tela === 'incluir' ? 'block' : 'none';
    document.getElementById('tela-listar').style.display = tela === 'listar' ? 'block' : 'none';

    if(tela === 'listar') {
        limparFormulario();
        listar();
    }
}

async function listar() {
    const grid = document.getElementById('grid-produtos');
    const status = document.getElementById('status-api');

    try {
        status.innerText = "⏳ Sincronizando com a nuvem...";
        const res = await fetch(URL_BASE);
        const produtos = await res.json();

        grid.innerHTML = "";
        produtos.forEach(p => {
            grid.innerHTML += `
                <div class="card">
                    <h3>${p.nome}</h3>
                    <p><strong>Estoque:</strong> ${p.quantidade}</p>
                    <p><strong>Valor:</strong> R$ ${p.valor}</p>
                    <hr>
                    <button class="btn-excluir" onclick="excluir('${p.id}')">Excluir</button>
                    <button class="btn-alterar" onclick="prepararEdicao('${p.id}')">Alterar</button>
                </div>
            `;
        });
        status.innerText = "";
    } catch (err) { status.innerText = "❌ Erro ao carregar dados."; }
}

async function salvar() {
    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;

    const produto = { nome, quantidade: Number(quantidade), valor: Number(valor) };

    try {
        if (!id) {
            await fetch(URL_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        } else {
            await fetch(`${URL_BASE}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        }
        navegar('listar'); 
    } catch (err) {
        alert("! Erro na comunicação com o servidor.");
    }
}

async function excluir(id) {
    if (confirm("Deseja apagar este produto?")) {
        await fetch(`${URL_BASE}/${id}`, { method: 'DELETE' });
        listar();
    }
}

async function prepararEdicao(id) {
    try {

        const res = await fetch(`${URL_BASE}/${id}`);
        const produto = await res.json();

        document.getElementById('nome').value = produto.nome;
        document.getElementById('quantidade').value = produto.quantidade;
        document.getElementById('valor').value = produto.valor;

        document.getElementById('produto-id').value = produto.id;

        document.getElementById('titulo-form').innerText = "Editando Produto";
        navegar('incluir');
    } catch (err) {
        alert("Erro ao buscar os dados do produto.");
    }
}

function limparFormulario() {
    document.getElementById('produto-id').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('titulo-form').innerText = "Cadastrar Novo Produto";
}

window.onload = () => navegar('listar');