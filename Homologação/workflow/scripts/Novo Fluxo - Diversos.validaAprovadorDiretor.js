function validaAprovadorDiretor(){
    var separadorPaiFilho = "___";
    var indicesTabela = hAPI.getChildrenIndexes("tableAprovadores");
    var aprovadorLiberado = false;

    for (var i = 0; i <= indicesTabela.length; i++) {
        var statusTabela = separadorPaiFilho + indicesTabela[i];
        var statusAprovador = hAPI.getCardValue("inputStatusDiretor" + statusTabela);
        if(statusAprovador == "true"){
            aprovadorLiberado = true;
        }
    }
    return aprovadorLiberado;
}