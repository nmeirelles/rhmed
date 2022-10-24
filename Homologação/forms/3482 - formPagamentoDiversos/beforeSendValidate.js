var beforeSendValidate = function(numState, nextState) {
    let  msgErro = "";

    if (numState == 0 || numState == 1 || numState == 3){
        //Tratativa Aprovadores Tabela - Inicio
        let matriculaProximoAprovador = "";
        let indexTable = $('[name^="inputNivel___"').length;
        let matricula = $("#currentMatricula").val();
        let matriculaSubstituto = $("#matriculaAprovadorSubst").val();
        let matriculaAprovador = $("#matriculaProximoAprovador").val();
        for(var i = 1; i <= indexTable; i++){
            let rowMatricula = $("input[name='inputMatricula___" + i + "']").val();
            if(matriculaSubstituto == "" || matriculaSubstituto == null){
                if(matricula == rowMatricula){
                    $("input[name='inputStatus___" + i + "']").val("true");
                }else{
                    $("input[name='inputStatus___" + i + "']").val("false");
                }
            }else{
                if(matriculaAprovador == rowMatricula){
                    $("input[name='inputStatus___" + i + "']").val("true");
                }else{
                    $("input[name='inputStatus___" + i + "']").val("false");
                }
            }

        }
        for(var i = 1; i <= indexTable; i++){
            let statusAprovação = $("input[name='inputStatus___" + i + "']").val();
            if(statusAprovação == "false"){
                if(matriculaProximoAprovador == ""){
                    matriculaProximoAprovador = $("input[name='inputMatricula___" + i + "']").val();
                }
            }
        }
        $("#matriculaProximoAprovador").val(matriculaProximoAprovador);
        //Tratativa Aprovadores Tabela - Fim

        let tipoPagamento = $("#tipoPagamento").val();
        let obsSolicitacao = $("#obsDadosSolicitacao").val();
        let formaPagamento = $("#formaPagamento").val();
        let valorTotal = $("#valorTotalDocumentoReal").val();
        let nrBanco = $("#banco").val();
        let nrAgencia = $("#agencia").val();
        let nrConta = $("#conta").val();

        if(campoVazio("colabForn")){
            msgErro += "<li>Natureza do Pagamento</li>";
        }
        if(campoVazio("contaDebito")){
            msgErro += "<li>Conta Débito</li>";
        }
        if(campoVazio("contaCredito")){
            msgErro += "<li>Conta Crédito</li>";
        }
        if(campoVazio("tipoPagamento")){
            msgErro += "<li>Tipo</li>";
        }
        if(campoVazio("zoomFilial")){
            msgErro += "<li>Filial</li>";
        }
        if(campoVazio("zoomCentroCusto")){
            msgErro += "<li>Centro de Custo</li>";
        }
        if(campoVazio("formaPagamento")){
            msgErro += "<li>Forma de Pagamento</li>";
        }
        if (campoVazio("inputCodFornecedor")){
            msgErro += "<li>Nome do Fornecedor</li>";
        }
        if (format2Number(valorTotal) <= 0){
            msgErro += "<li>Valor Total deve ser maior que zero.</li>";
        }
        if(formaPagamento == "semCodigo"){
            if(campoVazio("valorPrincipal")){
                msgErro += "<li>Valor Principal</li>";
            }
            if(campoVazio("dataVencimentoNota")){
                msgErro += "<li>Data de Vencimento</li>";
            }
            if(campoVazio("datapagamentoNota")){
                msgErro += "<li>Data de Pagamento</li>";
            }
            if (nrBanco == "" || nrAgencia == "" || nrConta == "" || nrConta == 0 || nrAgencia == 0 || nrBanco == 0){
                msgErro += "<li>Favor adicionar dados bancários ao cadastro do fornecedor no Protheus.</li>";
            }
        }
        if(formaPagamento == "comCodigo"){
            if(campoVazio("numCodigo")){
                msgErro += "<li>Número do Código de Barras</li>";
            }
            if(campoVazio("valorTotalComCodigo")){
                msgErro += "<li>Valor Total</li>";
            }
            if(campoVazio("dataVencimento")){
                msgErro += "<li>Data do Vencimento</li>";
            }
            if(campoVazio("dataPagamento")){
                msgErro += "<li>Data do Pagamento</li>";
            }
        }
        if(formaPagamento == "darf"){
            let codBarrasDarf = $("#codBarrasDARF").val();
            if(codBarrasDarf == "sim"){
                if(campoVazio("nrCodigoBarrasDARF")){
                    msgErro += "<li>Código de Barras</li>";
                }
            }
            if(campoVazio("periodoApuracaoDARF")){
                msgErro += "<li>02 - Período de Apuração</li>";
            }
            if(campoVazio("nrCPFCNPJDARF")){
                msgErro += "<li>03 - Número CPF/CNPJ</li>";
            }
            if(campoVazio("codigoReceitaDARF")){
                msgErro += "<li>04 - Código da Receita</li>";
            }
            /*if(campoVazio("nrReferenciaDARF")){
                msgErro += "<li>05 - Número Referência</li>";
            } */
            if(campoVazio("dataVencimentoDARF")){
                msgErro += "<li>06 - Data de Vencimento</li>";
            }
            if(campoVazio("valorPrincipalDARF")){
                msgErro += "<li>07 - Valor do Principal</li>";
            }
        }
        if(formaPagamento == "darm"){
            if(campoVazio("nrCodigoBarrasDARM")){
                msgErro += "<li>Código de Barras</li>";
            }
            /* if(campoVazio("nrReceitaDARM")){
                msgErro += "<li>01 - Receita</li>";
            }
            if(campoVazio("nrContribuinteDARM")){
                msgErro += "<li>02 - Número do Contribuinte</li>";
            } */
            if(campoVazio("dataVencimentoDARM")){
                msgErro += "<li>03 - Data Vencimento</li>";
            }/*
				if(campoVazio("nrCompetenciaDARM")){
					msgErro += "<li>04 - Competência</li>";
				}
				if(campoVazio("nrGuiaDARM")){
					msgErro += "<li>05 - Guia (Uso da Repartição)</li>";
				} */
            if(campoVazio("valorTributoDARM")){
                msgErro += "<li>06 - Valor do Tributo</li>";
            }
        }
        if(formaPagamento == "gps"){
            let codBarrasDarf = $("#codBarrasGPS").val();
            if(codBarrasDarf == "sim"){
                if(campoVazio("nrCodigoBarrasGPS")){
                    msgErro += "<li>Código de Barras</li>";
                }
            }
            if(campoVazio("codVencimentoGPS")){
                msgErro += "<li>02 - Vencimento</li>";
            }

            if(campoVazio("codPagamentoGPS")){
                msgErro += "<li>03 - Código Pagamento</li>";
            }
            if(campoVazio("nrCompetenciaGPS")){
                msgErro += "<li>04 - Competência</li>";
            }
            if(campoVazio("nrIdentificadorGPS")){
                msgErro += "<li>05 - Identificador</li>";
            }
            if(campoVazio("valorInssGPS")){
                msgErro += "<li>06 - Valor do INSS</li>";
            }
        }
        if(formaPagamento == "grf"){
            let codBarrasDarf = $("#codBarrasGRF").val();
            if(codBarrasDarf == "sim"){
                if(campoVazio("nrCodigoBarrasGRF")){
                    msgErro += "<li>Código de Barras</li>";
                }
            }
            if(campoVazio("dataValidadeGRF")){
                msgErro += "<li>12 - Data Validade</li>";
            }
            if(campoVazio("valorDepostioGRF")){
                msgErro += "<li>13 - Depósito + Contrib. Social</li>";
            }
        }
        if(formaPagamento == "damsp"){
            if(campoVazio("nrCodigoBarrasDAMSP")){
                msgErro += "<li>Código de Barras</li>";
            }
            if(campoVazio("nrCPFCNPJDAMSP")){
                msgErro += "<li>CPF/CNPJ</li>";
            }
            if(campoVazio("dataVencimentoDAMSP")){
                msgErro += "<li>Vencimento</li>";
            }
            if(campoVazio("valorDAMSP")){
                msgErro += "<li>Valor (R$)</li>";
            }
        }
        if(formaPagamento == "darfWeb"){
            let codBarrasDarf = $("#codBarrasDARFWEB").val();
            if(codBarrasDarf == "sim"){
                if(campoVazio("nrCodigoBarrasDARFWEB")){
                    msgErro += "<li>Código de Barras</li>";
                }
            }
            if(campoVazio("cnpjDARFWEB")){
                msgErro += "<li>CNPJ</li>";
            }
            if(campoVazio("dataVencimentoDARFWEB")){
                msgErro += "<li>Data Vencimento</li>";
            }
            if(campoVazio("dataPagamentoDARFWEB")){
                msgErro += "<li>Data Pagamento</li>";
            }
            if(campoVazio("valorPrincipalDARFWEB")){
                msgErro += "<li>Valor do Principal</li>";
            }
        }
        if((tipoPagamento == "Emergencial") && (obsSolicitacao == "" || obsSolicitacao == null)){
            msgErro += "<li>Caso a contratação seja Emergencial, o campo Observações deverá ser preenchido</li>";
        }
    }

    if (numState == 2){
        let statusAprovacao = $("#aprovacaoCoordenador").val();
        if(statusAprovacao == ""){
            msgErro += `O campo "Aprovação da Solicitação" não pode ser vazio! <br>`;
        }else if(statusAprovacao == "Sim"){
            let matriculaProximoAprovador = "";
            let indexTable = $('[name^="inputNivel___"').length;
            let matricula = $("#currentMatricula").val();
            let matriculaSubstituto = $("#matriculaAprovadorSubst").val();
            let matriculaAprovador = $("#matriculaProximoAprovador").val();
            for(var i = 1; i <= indexTable; i++){
                let rowMatricula = $("input[name='inputMatricula___" + i + "']").val();
                if(matriculaSubstituto == "" || matriculaSubstituto == null){
                    if(matricula == rowMatricula){
                        $("input[name='inputStatus___" + i + "']").val("true");
                    }else{
                        $("input[name='inputStatus___" + i + "']").val("false");
                    }
                }else{
                    if(matriculaAprovador == rowMatricula){
                        $("input[name='inputStatus___" + i + "']").val("true");
                    }else{
                        $("input[name='inputStatus___" + i + "']").val("false");
                    }
                }
            }
            for(var i = 1; i <= indexTable; i++){
                let statusAprovação = $("input[name='inputStatus___" + i + "']").val();
                if(statusAprovação == "false"){
                    if(matriculaProximoAprovador == ""){
                        matriculaProximoAprovador = $("input[name='inputMatricula___" + i + "']").val();
                    }
                }
            }
        }
    }

    if (atividadeAtual == 2 || atividadeAtual == 4 || atividadeAtual == 19){
        let aprovacao = $("#aprovacaoCoordenador").val();
        if(aprovacao == "" || aprovacao == null){
            msgErro += "<li>Favor selecionar uma opção de Aprovação.</li>";
        }
        if (aprovacao == "Cancelado" || aprovacao == "Nao"){
            let observacao = $("#origem").val();
            if (observacao == "" || observacao == null){
                msgErro += "<li>Obrigatório Campo Observação ser preenchido</li>";
            }
        }
    }

    if (msgErro != ""){
        msgErro = "<ul>" + msgErro + "</ul>";
        exibirMensagem("Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
    }

}

function campoVazio(fieldname){
    if (($("#"+fieldname).val() == null) || ($("#"+fieldname).val() == undefined) || ($("#"+fieldname).val() == "")){
        return true;
    } // if
    return false;
} // campoVazio

function exibirMensagem(mensagem){
    throw "<div class='alert alert-warning' role='alert'>" +
    "<strong>Atenção:</strong> "+mensagem+
    "</div>"+
    "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato conosco através do <a href='https://atendimento-web' target='_blank'><font color='blue' style='font-weight: bold'>atendimento</font></a>.";
} // exibirMensagem

function format2Number(valorStr){
    if (valorStr == null || valorStr == undefined || valorStr == ""){
        return 0;
    } // if
    while (valorStr.indexOf(".") >= 0){
        valorStr = valorStr.replace(".", "");
    } // while
    if (valorStr.indexOf(",") >= 0){
        valorStr = valorStr.replace(",", ".");
    } // if
    var valor = Number(valorStr);
    if (isNaN(valor)){
        valor = 0;
    } // if
    return valor;
} // format2Number

function obterDataCorrente(){
    var dateCorrente = new Date();
    var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
    return formatoData.format(dateCorrente);
} // obterDataCorrente

function formatarMoney2Str(valor){
    var unusualSymbols = new java.text.DecimalFormatSymbols();
    unusualSymbols.setDecimalSeparator(',');
    unusualSymbols.setGroupingSeparator('.');
    var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols).format(valor);
    return formato;
}