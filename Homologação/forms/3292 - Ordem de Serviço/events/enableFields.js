function enableFields(form){
    let WKNumState = getValue("WKNumState");

    if(WKNumState != 0 && WKNumState != 1){
        form.setEnabled("zoomCliente", false);
        form.setEnabled("valorOrdemServico", false);
        form.setEnabled("faturado", false);
        form.setEnabled("descricao", false);
    }

}