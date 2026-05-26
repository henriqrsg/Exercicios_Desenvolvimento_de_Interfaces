const executar = () => {
    const estufas = document.querySelectorAll('.estufa-item');
    
    for (let i = 0; i < estufas.length; i++){
        let elemento = estufas[i];
        let conteudo = elemento.innerText;

        if (conteudo.includes("Baixa")) {
            elemento.classList.add('perigo');
            console.log("Aviso aplicado ao Servidor " + (i + 1));
        }
    }

    let c = 0;

    while (c < estufas.length) {
        let status = estufas[c].innerText;

        if (status.includes("Sensor Inoperante")) {
            estufas[c].classList.add('bloqueado');
            alert("Encontrado Sensor Inoperante: " + (c + 1));
            break;
        }
        c++;
    }
}