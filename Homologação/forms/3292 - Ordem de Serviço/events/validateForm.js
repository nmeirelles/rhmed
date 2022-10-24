function validateForm(form){
    let msgErro = "";
    let WKNumState = getValue("WKNumState");
    let WKNextState = getValue("WKNextState");

    if(WKNumState == 0 || WKNumState == 1){
        let zoomCliente = form.getValue("zoomCliente");
        if(zoomCliente == "" || zoomCliente == null) msgErro += "<li>Não foi informado <b>Cliente</b>.</li>";

        let valorOrdemServico = form.getValue("valorOrdemServico");
        if(valorOrdemServico == "" || valorOrdemServico == null) msgErro += "<li>Não foi informado <b>Valor OS</b>.</li>";

        let faturado = form.getValue("faturado");
        if(faturado == "" || faturado == null) msgErro += "<li>Não foi informado <b>Faturado</b>.</li>";

        let descricao = form.getValue("descricao");
        if(descricao == "" || descricao == null) msgErro += "<li>Não foi informado <b>Descrição</b>.</li>";

    }

    if(msgErro != ""){
        msgErro = "<ul>" + msgErro + "</ul>";
        exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
    }
}
function exibirMensagem(form, mensagem){
    let mobile = form.getMobile() != null && form.getMobile();
    if(mobile){
        throw mensagem;
    }else{
        throw   "<div class='alert alert-warning' role='alert'>" +
        "<strong>Atenção:</strong> "+mensagem+
        "</div>"+
        "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI</font></a>.";
    }
}