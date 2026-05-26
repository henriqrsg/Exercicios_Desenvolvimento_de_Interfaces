const executar = () => {
    const servidores = document.querySelectorAll('.item');
    
    for (let i = 0; i < servidores.length; i++){
        let elemento = servidores[i];
        let conteudo = elemento.innerText;

        if (conteudo.includes("Offline")) {
            elemento.classList.add('alerta');
            console.log("Aviso aplicado ao Servidor " + (i + 1));
        }
    }

    let c = 0;

    while (c < servidores.length) {
        let status = servidores[c].innerText;

        if (status.includes("Erro Crítico")) {
            servidores[c].classList.add('critico');
            alert("SISTEMA BLOQUEADO: Falha grave no Servidor " + (c + 1));
            break;
        }
        c++;
    }
}