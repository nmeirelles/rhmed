// Declaração das atividades do processo
let INICIO = 0;
let INICIO2 = 4;
let CORRIGIR_SOLICITACAO = 10;
let REALIZAR_ATENDIMENTO = 8;
let ANALISAR_SOLICITACAO_ACIMA_ORCADO = 28;
let FIM = 20;
let todasUnidades = false;

$(document).ready(()=>{
    preencheAcompanhamento();

    //campoDescritor
    if (WKNumState == CORRIGIR_SOLICITACAO){
    	definirCampoDescritor();
    }
    
    
    // Declaração dos campos do formulário
    FLUIGC.switcher.init('#switchTodasUnidadesFiliais');
    FLUIGC.switcher.init('#switchNecessarioProspeccao');
    let anexarGradeExames = $("#anexarGradeExames");
    let anexarCotacoes = $("#anexarCotacoes");
    let listaServico = $("#servico");
    let cnpjCredenciado = $("#cnpjCredenciado");
    let inputUnidadeFilial = $("#inputUnidadeFilial");

    // Campos obrigatórios para cada serviço
    const servicos = {
        "link": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": true,
            "tipoExame": false,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "prospeccao": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": false,
            "nomeCredenciado": false,
            "cnpjCredenciado": false,
            "tipoSolicitacao": false,
            "tipoExame": true,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "extensao": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": true,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": false
        },
        "orientacaoRede": {
            "zoomOrientacao": true,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "atualizacaoDadosCadastrais": {
            "zoomOrientacao": false,
            "zoomAtualizacao": true,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "pga": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": false,
            "detalhamentoSolicitacao": true
        },
        "fiscalZero": {
            "zoomOrientacao": false,
            "zoomAtualizacao": false,
            "codigoCredenciado": true,
            "nomeCredenciado": true,
            "cnpjCredenciado": true,
            "tipoSolicitacao": false,
            "tipoExame": false,
            "anexarGradeExames": true,
            "detalhamentoSolicitacao": true
        }
    };

    // Declaração das funções do formulário
    const uploadGradeExames = () => {
        if(WKNumState == INICIO || WKNumState == INICIO2 || WKNumState == CORRIGIR_SOLICITACAO){
            JSInterface.showCamera();
        }
    }
    
    const uploadCotacoes = () => {
        if(WKNumState == REALIZAR_ATENDIMENTO){
            JSInterface.showCamera();
        }
    }
    
    const definirPrazo = (servico) => {
        if(servico == "") $("#prazo").val("");
        if(servico == "link") $("#prazo").val("008:00");
        if(servico == "prospeccao") $("#prazo").val("056:00");
        if(servico == "extensao") $("#prazo").val("024:00");
        if(servico == "orientacaoRede") $("#prazo").val("024:00");
        if(servico == "atualizacaoDadosCadastrais") $("#prazo").val("016:00");
        if(servico == "pga") $("#prazo").val("072:00");
        if(servico == "fiscalZero") $("#prazo").val("056:00");

        // 999:99
        // LINK	1 = 8
        // PROSPECÇÃO 7 = 56
        // EXTENSÃO	3 = 24
        // ORIENTAÇÃO DA REDE 3 = 24
        // ATUALIZAÇÃO DE DADOS CADASTRAIS 2 = 16
        // CUSTO DE PROCEDIMENTO JÁ ACORDADO (PRECIFICAÇÃO OU PGA) 9 = 72
        // FISCAL ZERO (RHVIDA)	7 = 56
    }
    
    const limparCamposServico = () => {
        window["zoomOrientacao"].clear();
        window["zoomAtualizacao"].clear();
        $("#codigoCredenciado").val("");
        $("#nomeCredenciado").val("");
        $("#cnpjCredenciado").val("");
        $("#detalhamentoSolicitacao").val("");
        $("#tipoSolicitacao").val("");
        $("#exameClinico").prop("checked", false);
        $("#exameComplementar").prop("checked", false);
    }
    
    const desabilitarCamposServico = () => {
        $("#anexarGradeExames").off("click");
        window["zoomOrientacao"].disable(true);
        window["zoomAtualizacao"].disable(true);
        $("#codigoCredenciado").prop("readonly", true);
        $("#nomeCredenciado").prop("readonly", true);
        $("#cnpjCredenciado").prop("readonly", true);
        $("#detalhamentoSolicitacao").prop("readonly", true);
        $("#tipoSolicitacao").prop("disabled", true);
        $("#exameClinico").prop("disabled", true);
        $("#exameComplementar").prop("disabled", true);
    }
    
    const habilitarCamposServico = (servicoSelecionado) => {
        let servico = servicos[servicoSelecionado];

        if(servico["anexarGradeExames"] == false) $("#anexarGradeExames").off("click");

        if(servico["zoomOrientacao"] == false) window["zoomOrientacao"].disable(true);

        if(servico["zoomAtualizacao"] == false) window["zoomAtualizacao"].disable(true);

        if(servico["codigoCredenciado"] == false) $("#codigoCredenciado").prop("readonly", true);

        if(servico["nomeCredenciado"] == false) $("#nomeCredenciado").prop("readonly", true);

        if(servico["cnpjCredenciado"] == false) $("#cnpjCredenciado").prop("readonly", true);

        if(servico["detalhamentoSolicitacao"] == false) $("#detalhamentoSolicitacao").prop("readonly", true);

        if(servico["tipoSolicitacao"] == false) $("#tipoSolicitacao").prop("disabled", true);

        if(servico["tipoExame"] == false){
            $("#exameClinico").prop("disabled", true);
            $("#exameComplementar").prop("disabled", true);
        }
    }
    
    const validaCPF = (nrCPF) => {
        var exp = /\.|\-/g;
        
        var cpf = nrCPF.replace(exp,'').toString();
        
        if(cpf.length == 11 ){
            var v = [];
            //Calcula o primeiro dígito de verificação.
            v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
            v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
            v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;
            //Calcula o segundo dígito de verificação.
            v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
            v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
            v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;
            //Retorna Verdadeiro se os dígitos de verificação são os esperados.				
            if ((v[0] != cpf[9]) || (v[1] != cpf[10])){
                return false;
            }else if (cpf[0] == cpf[1] && cpf[1] == cpf[2] && cpf[2] == cpf[3] && cpf[3] == cpf[4] && cpf[4] == cpf[5] && cpf[5] == cpf[6] && cpf[6] == cpf[7] && cpf[7] == cpf[8] && cpf[8] == cpf[9] && cpf[9] == cpf[10]){
                return false;
            }else{
                return true
            }
        }else{
            return true
        }
    }
    
    const validaCNPJ = (nrCNPJ) => {
        cnpj = nrCNPJ.replace(/[^\d]+/g,''); 
        if(cnpj == '') return false;     
        if (cnpj.length != 14) return false; 
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
             
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
             
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
               
        return true;
    }
    
    const aplicarMascara = (v) => {
        v = v.replace(/\D/g,"");
 
        if (v.length < 14) { //CPF
            //Coloca um ponto entre o terceiro e o quarto dígitos
            v=v.replace(/(\d{3})(\d)/,"$1.$2");
        
            //Coloca um ponto entre o terceiro e o quarto dígitos
            //de novo (para o segundo bloco de números)
            v=v.replace(/(\d{3})(\d)/,"$1.$2");
    
            //Coloca um hífen entre o terceiro e o quarto dígitos
            v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        }else{ //CNPJ
            //Coloca ponto entre o segundo e o terceiro dígitos
            v=v.replace(/^(\d{2})(\d)/,"$1.$2");
        
            //Coloca ponto entre o quinto e o sexto dígitos
            v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
        
            //Coloca uma barra entre o oitavo e o nono dígitos
            v=v.replace(/\.(\d{3})(\d)/,".$1/$2");
        
            //Coloca um hífen depois do bloco de quatro dígitos
            v=v.replace(/(\d{4})(\d)/,"$1-$2");
        }
        return v;
    };

    // Declaração dos eventos de exibição do formulário
    setTimeout(()=>{
        let zoomPlataforma = $("#zoomPlataforma").val();
        if(zoomPlataforma == "SOC NET"){
            $("#divInputUnidadeFilial").show();
            $("#divZoomUnidadeFilial").hide();
        }else{
            $("#divInputUnidadeFilial").hide();
            $("#divZoomUnidadeFilial").show();
        }
    },1500);
    if(WKNumState != INICIO && WKNumState != INICIO2 && WKNumState != CORRIGIR_SOLICITACAO) FLUIGC.switcher.isReadOnly('#switchTodasUnidadesFiliais', true);
    if(WKNumState != REALIZAR_ATENDIMENTO) FLUIGC.switcher.isReadOnly('#switchNecessarioProspeccao', true);
    if(WKNumState == INICIO) setTimeout(()=>{desabilitarCamposServico()},300);
    if(WKNumState == CORRIGIR_SOLICITACAO) setTimeout(()=>{habilitarCamposServico(listaServico.val())},300);

    // Declaração dos eventos dos campos do formulário
    anexarGradeExames.on("click", () => uploadGradeExames());
    anexarCotacoes.on("click", () => uploadCotacoes());
    listaServico.on("change", (event) => {

        FLUIGC.switcher.isReadOnly('#switchNecessarioProspeccao', false);
        FLUIGC.switcher.setFalse('#switchNecessarioProspeccao');
        FLUIGC.switcher.isReadOnly('#switchNecessarioProspeccao', true);

        limparCamposServico();

        desabilitarCamposServico();

        let servicoSelecionado = event.target.value;

        if(servicoSelecionado != ""){

           let servico = servicos[servicoSelecionado];

           if(servico["anexarGradeExames"] == true) anexarGradeExames.on("click", () => uploadGradeExames());

           if(servico["zoomOrientacao"] == true) window["zoomOrientacao"].disable(false);

           if(servico["zoomAtualizacao"] == true) window["zoomAtualizacao"].disable(false);

           if(servico["codigoCredenciado"] == true) $("#codigoCredenciado").prop("readonly", false);

           if(servico["nomeCredenciado"] == true) $("#nomeCredenciado").prop("readonly", false);

           if(servico["cnpjCredenciado"] == true) $("#cnpjCredenciado").prop("readonly", false);

           if(servico["detalhamentoSolicitacao"] == true) $("#detalhamentoSolicitacao").prop("readonly", false);

           if(servico["tipoSolicitacao"] == true) $("#tipoSolicitacao").prop("disabled", false);

           if(servico["tipoExame"] == true){
               $("#exameClinico").prop("disabled", false);
               $("#exameComplementar").prop("disabled", false);
           }

        }

        definirPrazo(servicoSelecionado);
        definirGrupoExecutor();

    });
    cnpjCredenciado.on("keypress", (event)=>{
        let v = event.target.value;
        let mascara = aplicarMascara(v);
        cnpjCredenciado.val(mascara);
    });
    cnpjCredenciado.on("change", (event)=>{
        let cnpj = event.target.value;
        cnpj = cnpj.replace(/\D/g,"");
        let validacao = false;
        if(cnpj.length == 11) validacao = validaCPF(cnpj);
        if(cnpj.length == 14) validacao = validaCNPJ(cnpj);
        if(validacao == false){
            cnpjCredenciado.val("");
            FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar CPF/CNPJ válido!',type: 'warning'});
        }else{
            let mascara = aplicarMascara(cnpj);
            cnpjCredenciado.val(mascara);
        }
    });
    FLUIGC.switcher.onChange('#switchTodasUnidadesFiliais', function(event, state){
        window["zoomUnidadeFilial"].clear();
        $("#codigoUnidadeFilial").val("");
        $("#inputUnidadeFilial").val("");

        if(state == true){
            todasUnidades = true;
            window["zoomUnidadeFilial"].disable(true);
            $("#inputUnidadeFilial").prop("readonly", true);
        }else{
            todasUnidades = false;
            window["zoomUnidadeFilial"].disable(false);
            $("#inputUnidadeFilial").prop("readonly", false);
        }

        definirCampoDescritor();
    });
    inputUnidadeFilial.on("change",()=>{definirCampoDescritor()});
});

function setSelectedZoomItem(selectedItem){ 

    if(selectedItem.inputId == "zoomPlataforma"){

        $("#codigoPlataforma").val(selectedItem["COD_PLATAFORMA"]);

        window["zoomEmpresa"].clear();
        $("#codigoEmpresa").val("");
        window["zoomRegional"].clear();
        $("#codigoRegional").val("");

        reloadZoomFilterValues("zoomEmpresa", "COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);

        if(todasUnidades == false){

            window["zoomUnidadeFilial"].clear();
            $("#codigoUnidadeFilial").val("");
            $("#inputUnidadeFilial").val("");

            if(selectedItem["PLATAFORMA"] == "SOC NET"){
                FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar código e nome da unidade',type: 'warning'});
                $("#divInputUnidadeFilial").show();
                $("#divZoomUnidadeFilial").hide();
            }else{
                $("#divInputUnidadeFilial").hide();
                $("#divZoomUnidadeFilial").show();
            }
        }

        if(selectedItem["PLATAFORMA"] == "EVIDAMED") window["zoomRegional"].disable(false);
        else window["zoomRegional"].disable(true);

        definirCampoDescritor();
    }

    if(selectedItem.inputId == "zoomEmpresa"){

        $("#codigoEmpresa").val(selectedItem["COD_EMPRESA"]);

        window["zoomRegional"].clear();
        $("#codigoRegional").val("");

        if(todasUnidades == false){
            window["zoomUnidadeFilial"].clear();
            $("#codigoUnidadeFilial").val("");
            $("#inputUnidadeFilial").val("");
            reloadZoomFilterValues("zoomUnidadeFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);
        }

        let zoomPlataforma = $("#zoomPlataforma").val();
        if(zoomPlataforma == "EVIDAMED") reloadZoomFilterValues("zoomRegional", "COD_EMPRESA," + selectedItem["COD_EMPRESA"]);
    
        definirGrupoExecutor();
        definirCampoDescritor();
    }

    if(selectedItem.inputId == "zoomRegional"){
        $("#codigoRegional").val(selectedItem["COD_REGIONAL"]);

        if(todasUnidades == false){
            window["zoomUnidadeFilial"].clear();
            $("#codigoUnidadeFilial").val("");
    
            reloadZoomFilterValues("zoomUnidadeFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"] + ",COD_REGIONAL," + selectedItem["COD_REGIONAL"]);
        }
    }

    if(selectedItem.inputId == "zoomUnidadeFilial"){
        $("#codigoUnidadeFilial").val(selectedItem["COD_UNIDADE"]);
        definirCampoDescritor();
    }

    if(selectedItem.inputId == "zoomCidade"){
        $("#estado").val(selectedItem["CC2_EST"]);
        $("#codigoCidade").val(selectedItem["CC2_CODMUN"]);
        $("#cidade").val(selectedItem["CC2_MUN"]);

        definirGrupoExecutor();
    }

    if(selectedItem.inputId == "zoomOrientacao"){
        definirGrupoExecutor();
    }
}

function regiao(estado){
    var nordeste = ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"];
    if(nordeste.includes(estado)) return "nordeste";

    var norteCentroOeste = ["AC", "AM", "AP", "DF", "GO", "MS", "MT", "PA", "RO", "RR", "TO"];
    if(norteCentroOeste.includes(estado)) return "norteCentroOeste";

    var sulSudeste1 = ["ES", "MG", "PR"];
    if(sulSudeste1.includes(estado)) return "sulSudeste1";
    
    var sulSudeste2 = ["RJ", "RS", "SC"];
    if(sulSudeste2.includes(estado)) return "sulSudeste2";
}

function campoVazio(campo){
	if( (campo == null) || (campo == undefined) || (campo.trim() == "") ) return true;
	return false;
}

function definirGrupoExecutor(){
    var estado = $("#estado").val();
    var cidade = $("#codigoCidade").val();
    var empresa = $("#zoomEmpresa").val().length == 0 ? "" : $("#zoomEmpresa").val().toString();
    var servico = $("#servico").val();
    var orientacao = $("#zoomOrientacao").val().length == 0 ? "" : $("#zoomOrientacao").val().toString();

    var grupo = "Pool:Group:";

    if(empresa.match("INTERFILE") || empresa.match("ATENTO")) grupo+= "Proc_ServicosCredenciamento_Atento_Interfile";
    
    // else if(servico == "orientacaoRede" && (orientacao == "FATURAMENTO" || orientacao == "NEGATIVA DE ATENDIMENTO" || orientacao == "RETENÇÃO DE DOCUMENTAÇÃO")){
    //     if(regiao(estado) == "nordeste" || estado == "SP") grupo+= "Proc_ServicosCredenciamento_NRC_SP_Nordeste";
    //     if(regiao(estado) == "norteCentroOeste") grupo+= "Proc_ServicosCredenciamento_NRC_CentroOeste_Norte";
    //     if(regiao(estado) == "sulSudeste1" || regiao(estado) == "sulSudeste2") grupo+= "Proc_ServicosCredenciamento_NRC_Sul_Suldeste";
    // }
    
    else{
        if(regiao(estado) == "nordeste") grupo+= "Proc_ServicosCredenciamento_Nordeste";
        if(regiao(estado) == "norteCentroOeste") grupo+= "Proc_ServicosCredenciamento_Norte_CentroOeste";
        if(regiao(estado) == "sulSudeste1") grupo+= "Proc_ServicosCredenciamento_Sul_Sudeste_1";
        if(regiao(estado) == "sulSudeste2") grupo+= "Proc_ServicosCredenciamento_Sul_Sudeste_2";
        if(estado == "SP"){
            if(cidade == "50308") grupo+= "Proc_ServicosCredenciamento_SP_Capital"; // São Paulo
            var litoralSP = ["06359", "10500", "13504", "18701", "20400", "22109", "31100", "37602", "41000", "48500", "50704", "51009", "55406"];
            if(litoralSP.includes(cidade)) grupo+= "Proc_ServicosCredenciamento_SP_Litoral";
            var grandeSP = ["03901", "05708", "09007", "09205", "10609", "13009", "13801", "15103", "15707", "16408", "18305", "18800", "22208", "22505",
                    "23107", "25003", "28502", "29401", "30607", "34401", "39806", "43303", "46801", "47304", "47809", "48708", "48807", "52502", "52809"];
            if(grandeSP.includes(cidade)) grupo+= "Proc_ServicosCredenciamento_SP_GrandeSP";
            if(grupo == "Pool:Group:") grupo+= "Proc_ServicosCredenciamento_SP_Interior";
        }
    }

    $("#grupoExecutor").val(grupo);
}

function removedZoomItem(removedItem){
    if(removedItem.inputId == "zoomPlataforma"){
        $("#codigoPlataforma").val("");
        window["zoomEmpresa"].clear();
        $("#codigoEmpresa").val("");
        window["zoomRegional"].clear();
        $("#codigoRegional").val("");
        window["zoomUnidadeFilial"].clear();
        $("#codigoUnidadeFilial").val("");
        $("#inputUnidadeFilial").val("");
    }
    if(removedItem.inputId == "zoomEmpresa"){
        $("#codigoEmpresa").val("");
        window["zoomRegional"].clear();
        $("#codigoRegional").val("");
        window["zoomUnidadeFilial"].clear();
        $("#codigoUnidadeFilial").val("");
        $("#inputUnidadeFilial").val("");
        $("#grupoExecutor").val("");
    }
    if(removedItem.inputId == "zoomRegional"){
        $("#codigoRegional").val("");
        window["zoomUnidadeFilial"].clear();
        $("#codigoUnidadeFilial").val("");
    }
    if(removedItem.inputId == "zoomUnidadeFilial"){
        $("#codigoUnidadeFilial").val("");
    }
    if(removedItem.inputId == "zoomCidade"){
        $("#estado").val("");
        $("#codigoCidade").val("");
        $("#cidade").val("");
        $("#grupoExecutor").val("");
    }
}

function definirCampoDescritor(){
	console.log("RUN definirCampoDescritor()");
	
    var zoomPlataforma = $("#zoomPlataforma").val();//[0];
    var zoomEmpresa = $("#zoomEmpresa").val();//[0];
    var zoomUnidadeFilial = $("#zoomUnidadeFilial").val();//[0];
    var inputUnidadeFilial = $("#inputUnidadeFilial").val();
    var todasFiliais = $("#switchTodasUnidadesFiliais").prop("checked");
    
    console.log(todasFiliais);
    console.log(zoomPlataforma)

    var campoDescritor = "";
    
    if(todasFiliais == true){
    	campoDescritor = zoomEmpresa + " | Todas Unidades/Filiais"; 
    }
    else if(zoomPlataforma == "EVIDAMED" || zoomPlataforma == "SOC"){
    	campoDescritor = zoomEmpresa + " | " + zoomUnidadeFilial; 
    }
    else if(zoomPlataforma == "SOC NET"){
    	campoDescritor = zoomEmpresa + " | " + inputUnidadeFilial; 
    }
    
    $("#campoDescritor").val(campoDescritor);
    
    console.log($("#campoDescritor").val());
}