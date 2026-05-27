async function buscarCEP() {
    const input = document.getElementById('inputCep');
    const box = document.getElementById('resultadoEndereco');

    if (!input || !box) return;

    const cep = input.value.replace(/\D/g, '');
    box.innerHTML = "⌛ Conectando ao servidor..."

    try {

        if (cep.length !== 8) throw new Error("CEP inválido (deve ter 8 números)");

        const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {mode: 'cors'});

        if (!resposta.ok) {
            if (resposta.status === 404) throw new Error("CEP inexistente.");
            if (resposta.status === 504) throw new Error("Servidor lento, tente novamente.");
            throw new Error("Erro desconhecido na API.")
        }

        const dados = await resposta.json();
        box.innerHTML = `<div class="card"><h3>${dados.street}</h3><p>${dados.city} - ${dados.state}</p></div>`;

    } catch (err) {

        if (err.message.includes("fetch")) {
            box.innerHTML = `<div class="erro-box">⚠️ CEP Inválido!</div>`
        } else {
            box.innerHTML = `<div class="erro-box">⚠️ ${err.message}</div>`
        }
    }
}

async function buscarBanco() {
    const codigo = document.getElementById('inputBanco').value;
    const box = document.getElementById('resultadoBanco');

    box.innerHTML = "⏳ Consultando Registro Nacional...";

    try {

        if (!codigo) {
            throw new Error("Por favor, digite um código bancário.");
        }

        const resposta = await fetch(`https://brasilapi.com.br/api/banks/v1/${codigo}`);

        if (!resposta.ok) {
            if (resposta.status === 404) {
                throw new Error("Código bancário não identificado.");
            } else {
                throw new Error("Servidor fora do ar. Tente novamente.");
            }
        }

        const dados = await resposta.json();

        box.innerHTML = `
            <div class="card" style="border-left-color: #2ecc71;">
                <h3>${dados.fullName}</h3>
                <p><strong>Nome Curto:</strong> ${dados.name}</p>
                <p><strong>ISPB:</strong> ${dados.ispb}</p>
                <p><strong>Código COMPE:</strong> ${dados.code || "N/A"}</p>
                <span class="tag-sucesso">✅ Instituição Homologada</span>
            </div>
        `;

    } catch (erro) {
   
        box.innerHTML = `
            <div class="erro-box">
                <strong>⚠️ Falha:</strong> ${erro.message}
            </div>
        `;
    }
}