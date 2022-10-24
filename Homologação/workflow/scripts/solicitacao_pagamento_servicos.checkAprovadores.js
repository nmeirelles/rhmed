function checkAprovadores(){
    var separadorPaiFilho = "___";
    var indicesTabela = hAPI.getChildrenIndexes("tableAprovadores");
    var faltaAprovacao = true;
    var aprovadorSupervisor = "";
    var aprovadorCoordenador = "";
    var aprovadorGerente = "";
    var aprovadorDiretor = "";
    var matriculaAprovador = "";

    for (var i = 0; i <= indicesTabela.length; i++) {
        var linhaTabela = separadorPaiFilho + indicesTabela[i];
        var statusAprovador = hAPI.getCardValue("inputStatus" + linhaTabela);
        var nivelAprovacao = hAPI.getCardValue("inputNivel" + linhaTabela);
        if(statusAprovador == "false"){
            if(matriculaAprovador == ""){
                matriculaAprovador = hAPI.getCardValue("inputMatricula___" + linhaTabela);
                hAPI.setCardValue("matriculaProximoAprovador", matriculaAprovador);
            }
        }else{
            if(nivelAprovacao == "Supervisor") aprovadorSupervisor = true;
            if(nivelAprovacao == "Coordenador") aprovadorCoordenador = true;
            if(nivelAprovacao == "Gerente") aprovadorGerente = true;
            if(nivelAprovacao == "Diretor") aprovadorDiretor = true;
        }
    }

    if(aprovadorSupervisor == true && aprovadorCoordenador == true && aprovadorGerente == true && aprovadorDiretor == true) faltaAprovacao = false;
    return faltaAprovacao;
}