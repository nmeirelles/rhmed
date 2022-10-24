
var currentIdAnexo = null;
$(document).ready(function() {
	debugger
	var atividade = getWKNumState();
	$("#mesRealizacao").on('change', (e) => {
		let mesRealizacao = e.target.value;
		let dataRealizacao = new Date(mesRealizacao);
		let timeRealizacao = dataRealizacao.getTime();
		let dataAtual = new Date();
		let anoAtual = dataAtual.getFullYear();
		let mesAtual = dataAtual.getMonth() + 1;
		mesAtual = (mesAtual<=9 ? "0"+mesAtual : mesAtual);
		let dataAtualTratada = anoAtual + '-' + mesAtual;
		let dateAtual = new Date(dataAtualTratada);
		let timeAtual = dateAtual.getTime();
		if(timeRealizacao < timeAtual){
			FLUIGC.toast({
				title: "Atenção:",
				message: "Mês de campanha não pode ser retroativo!",
				type: "warning"
			});
			$("#mesRealizacao").val('');
		}
	});
	
	window.parent.$("#ecm-navigation-inputFile-clone").change(function(e){
		var idInput = this.getAttribute("data-file-name-camera");
		var fileName = e.target.files[0].name;
        
        $.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
			var descricao = attachment.description;
	        if(idInput == descricao){
	        	parent.WKFViewAttachment.removeAttach([i]);
				$("#"+idInput).val("");
	        }
	    });
        
        $("#"+idInput).val(fileName);
        
        if( idInput == "documentoAnexo"){
        	$("#btnDownload").fadeIn("slow", function() {
    			// Animation complete
    		});
        } 
    });
	
	$('#convocacao').on('change', function () {
		//console.log("Executou");
		var campo1 = $('#zoomNumeroSolicitacao'); // ID do campo 01
		
		if ($(this).val() === '1a') {
		  campo1.prop('disabled', true);
		  //campo1.disable();
		  exibirMensagem("ATENÇÃO! ", "Na Primeira convocação é necessário guardar o numero da solicitação que será gerada.", "warning");
		
		} else if ($(this).val() === '2a') {
		  campo1.prop('disabled', false).val('');
		  //campo1.enable();
		  
		} else if ($(this).val() === '3a') {
			    campo1.prop('disabled', false).val('');
			    //campo1.enable();
			    
		} else if ($(this).val() === '') {
			    campo1.prop('disabled', true).val('');
			    //campo1.disable();
		}
		//console.log($(this).val());
	});
	
	$('#tipoContrato').on('change', function () {
		var tipoContrato = $('#tipoContrato').val();
		
		//console.log("Executou");
		  var campo1 = $('#descCondicoesInCompany'); // ID do campo 01
		  var campo2 = $('#btnAnexo'); // ID do campo 02
		  var campo3 = $('#documentoAnexo'); // ID do campo 03
		  
		  if ($(this).val() === 'os') {
		    campo1.prop('readonly', true);
		    //campo1.enable();
		    campo2.prop('hidden', false);
		    //campo2.enable();
		    campo3.prop('readonly', true);
		    //campo3.enable();
		    
		  } else if ($(this).val() === 'propCom') {
			  campo1.prop('readonly', true);
			  //campo1.enable();
			  campo2.prop('hidden', false);
			  //campo2.enable();
			  campo3.prop('readonly', true);
			  //campo3.enable();
			   
		  } else if ($(this).val() === 'inCompany') {
			  campo1.prop('readonly', false);
			  //campo1.enable();
			  campo2.prop('hidden', true);
			  //campo2.enable();
			  campo3.prop('readonly', true);
			  //campo3.enable();
			  
		} else { 
			campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    campo2.prop('hidden', true).val('');
		    //campo2.disable();
		    campo3.prop('readonly', true).val('');
		    //campo3.disable();
		  
		  	}
	//console.log($(this).val());
	});
	
	$('#possuiEstacionamento').on('change', function () {
		//console.log("Executou");
		  var campo1 = $('#valorEstacionamento'); // ID do campo 01
		  
		  if ($(this).val() === 'sim') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		  }
	//console.log($(this).val());
	});
	
	$('#modeloExame').on('change', function () {
		//console.log("Executou");
		  var campo1 = $('#valorExame'); // ID do campo 01
		  
		  if ($(this).val() === 'perCapta') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		    
		  } else if ($(this).val() === 'evento') {
			    campo1.prop('readonly', false);
			    //campo1.enable();
			 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		  }
	//console.log($(this).val());
	});
	
	$('#tipoContrato').on('change', function () {
		//console.log("Executou");
		  
		  if ($(this).val() === 'semContrato') {
			  exibirMensagem("ATENÇÃO! ", " Para prosseguir com a solicitação é necessário possuir Contrato In Company, ordem de Serviço ou Proposta Comercial.", "danger");  
		 
		  } else if ($(this).val() === 'os') {
			  exibirMensagem("ATENÇÃO! ", " Para prosseguir é necessário anexar a OS.", "warning");  
			  
		  } else if ($(this).val() === 'propCom') {
			  exibirMensagem("ATENÇÃO! ", " Para prosseguir é necessário anexar a Proposta Comercial.", "warning");
			  
		  } else {
			  return true
		  }
	//console.log($(this).val());
	});
	
	$('#possuiNoShow').on('change', function () {
		//console.log("Executou");
		  var campo1 = $('#qtdNoShow'); // ID do campo 01
		  
		  if ($(this).val() === 'sim') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
	//console.log($(this).val());
	});
	
	$('#checkOutros').on('change', function () {
		//console.log("Executou");
		  var campo1 = $('#matOutros'); // ID do campo 01
		  
		  if ($(this).val() === 'outros') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		  }
	//console.log($(this).val());
	});
	
	$('#confAtendRealizado').on('change', function () {
		//console.log("Executou");
		  var campo1 = $('#descIntercorrencia'); // ID do campo 01
		  
		  if ($(this).val() === 'simInt') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
	//console.log($(this).val());
	});
	
	if(atividade == 31){
		//Campo SelectProcedimento Baseado no Campo zoomProcedimento - #tabelaProcedimentosNew
		var optionsProcedimento = '<option value=""></option>';
		$("input[id^='zoomProcedimento___']").each(function(index, value){
			//console.log(index, value);		
			var nomeObjeto = $(this).attr("id");
			var indice = nomeObjeto.split('___')[1];
			var valorDoCampoZoom = $("#zoomProcedimento___" + indice).val();
			var valorDoCampoQtd = $("#qtdSolicitada___" + indice).val();
			if (valorDoCampoZoom == null || valorDoCampoZoom == undefined){
				// não achou o valor
			} else {
				optionsProcedimento += '<option value="'+valorDoCampoZoom+' -- '+valorDoCampoQtd+'">'+valorDoCampoZoom+'</option>';	
			} // else if
		}); // for each
		$("[id^='selectProcedimentoNew___']").each(function(index, value){
			var nomeObjeto = $(this).attr("id");
			var indice = nomeObjeto.split('___')[1];
			$("#selectProcedimento___"+indice).append(optionsProcedimento);
			$("#selectProcedimentoR___"+indice).append(optionsProcedimento);
		})
		
	}
	
	
	

	$("#codBuscaUnidade").on("change", (event) => {
		let codigoUnidade = event.target.value;
		if(codigoUnidade != ""){
			preencherVidasAtivas();
		}
	});

	console.log("CURRENT_STATE: "+CURRENT_STATE);
	if(CURRENT_STATE == "27"){
		setTimeout(() => {
			const codPlataforma = $("#codPlataforma").val();
			const zoomPlataforma = $("#zoomPlataforma").val();
			if(zoomPlataforma == "SOC NET"){
				$("#codNomeBuscaUnidade").prev().addClass("required");
				$("#nomeFilial").prev().removeClass("required");
			}else{
				$("#codNomeBuscaUnidade").prev().removeClass("required");
				$("#nomeFilial").prev().addClass("required");
			}

			liberaCamposEmpresa(codPlataforma);
		}, 1000);
	}

	if(CURRENT_STATE == "37" || CURRENT_STATE == "48" || CURRENT_STATE == "50" || CURRENT_STATE == "69" || CURRENT_STATE == "95" || CURRENT_STATE == "71" || CURRENT_STATE == "116"){
		let switchReagendamento = $("#switchReagendamento").is(":checked");
		if(switchReagendamento == false){
			$("#panelReagendamento").hide();
		}else{
			$("#panelReagendamento").show();
			FLUIGC.switcher.isReadOnly('#switchReagendamento', true);
		}
		FLUIGC.switcher.onChange("#switchReagendamento", function(event, state){
			if(state == true){
				$("#panelReagendamento").show();
			}else{
				$("#panelReagendamento").hide();
			}
		});
	}else{	
		FLUIGC.switcher.isReadOnly('#switchReagendamento', true);
	}

	if(CURRENT_STATE != "0" && CURRENT_STATE != "4"){
		const zoomPlataforma = $("#zoomPlataforma").val();
		if(zoomPlataforma == "EVIDAMED" || zoomPlataforma == "SOC"){
			$("#divNomeBuscaUnidade").hide();
		}
		if(zoomPlataforma == "SOC NET"){
			$("#divNomeBuscaUnidade").show();
			$("#divNomeFilial").hide();
		}
	}

	//Integração Consulta de CEP
	$("#cep").on('change',function(){
		var cep = $("#cep").val().replace(/\D/g,'');
		if(cep != ''){
			var validaCep = /^[0-9]{8}$/;
			if(validaCep.test(cep)){
				//Endereco
				$("#logradouro").val();
				$("#bairro").val();
				$("#nomeCidade").val();
				$("#nomeUF").val();

				//Consulta o Webservice viacep.com.br
				$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
					if(!("erro" in dados)){
						//Atualiza os campos com os valores da consuta
						//Endereco
						$("#logradouro").val(dados.logradouro);
						$("#bairro").val(dados.bairro);
						$("#nomeCidade").val(dados.localidade);
						$("#nomeUF").val(dados.uf);

					}//end if
					else{
						//CEP pesquisado não foi encontrado						
						FLUIGC.toast({title: 'Atenção: ',message: 'CEP não encontrado!',type: 'warning'});
					}
				});
			} // end if.
			else{
				//CEP é inválido
				FLUIGC.toast({title: 'Atenção: ',message: 'Formato de CEP é inválido!',type: 'warning'});
			}
		}
	});

});
window.onload = function(){
 	myLoading2 = FLUIGC.loading(window);
 	carregarFormulario();
 	FLUIGC.calendar('.data-calendar');
 	
 	
 	FLUIGC.switcher.init('#switchConfirmFaturamento');
 	FLUIGC.switcher.init('#switchConfirmASO');
 	FLUIGC.switcher.init('#switchConfirmLista')
 	FLUIGC.switcher.init('#switchConfirmResult')
 	FLUIGC.switcher.init('#switchReagendamento');
 	FLUIGC.switcher.init('#switchContrataCred');
 	FLUIGC.switcher.init('#switchCredVinc');
 	FLUIGC.switcher.init('#switchKitColab');
 	//FLUIGC.switcher.init('#switchPrepAtend');
	FLUIGC.switcher.init('#switchNecessarioPrecificacao');

	FLUIGC.switcher.onChange(".switchButton", function(event, state){
		if($(this).attr("id") == "switchCredVinc"){
			$("#hiddenSwitchCredVinc").val(state);
		};
		if($(this).attr("id") == "switchKitColab"){
			$("#hiddenSwitchKitColab").val(state);
		};
		if($(this).attr("id") == "switchConfirmASO"){
			$("#hiddenSwitchASO").val(state);
		};
		if($(this).attr("id") == "switchConfirmResult"){
			$("#hiddenSwitchResultExam").val(state);
		};
		if($(this).attr("id") == "switchConfirmLista"){
			$("#hiddenSwitchListaPresenca").val(state);
		};
	});
}
function load(obj){
	myLoading2.show();
	setTimeout(function() {
		  //fornecedor(obj);
		  myLoading2.hide();
	}, 500);
}
function carregarFormulario(){
	
	exibirDataContratoDomiciliar();
	camposOnchangeCredenciado();
	camposOnchangeCredenciadoR();
	bloquearProcedimentoReagendado();
	
	try{
		var atividade = getWKNumState();
		var modo = getFormMode();
		var esconde1 = false;
		
		if ($("#documentoAnexo").val() == "" || $("#documentoAnexo").val() == null || $("#documentoAnexo").val() == undefined){
				esconde1 = true;
		} 

		if (esconde1) {
			$("#btnViewer").hide();
			$("#btnDownload").hide();
		}
		
		preencheAcompanhamento();
	} catch (e){
		exibirMensagem("Anexo", "Erro ao anexar", "danger");
	} // try catch
	
		
	if ((atividade == 0) || (atividade == 4) || (atividade == 27)){
		validaZoom();
		liberaCamposEmpresa(codPlataforma);
		FLUIGC.switcher.isReadOnly('#switchNecessarioPrecificacao', false);
	}else{
		FLUIGC.switcher.isReadOnly('#switchNecessarioPrecificacao', true);
	}
	
	if (atividade == 27){
		manterRegrasOnchange();
	}
	
	if (atividade == 61){
		somaTotalQtdMinima();
		somaQtdTotalAusencia();
		somaValorTotalAusencia();
		somaValorTaxas();
	}
		
	if (atividade != "115"){
		FLUIGC.switcher.isReadOnly('#switchConfirmASO', true);
		FLUIGC.switcher.isReadOnly('#switchConfirmLista', true);
		FLUIGC.switcher.isReadOnly('#switchConfirmResult', true);
	}
	
	if (atividade == "73"){
		setTimeout(function(){ 
			exibirMensagem("ATENÇÃO!", "Antes de prosseguir será necessário anexar a <b>LISTA DE PRESENÇA</b>", "warning");
		}, 4000)
	}
	
	if (atividade != "31"){
		FLUIGC.switcher.isReadOnly('#switchContrataCred', true);
	}
	 
	if (atividade != "69"){
		FLUIGC.switcher.isReadOnly('#switchCredVinc', true);
	}
	
	if (atividade != "69"){
		FLUIGC.switcher.isReadOnly('#switchKitColab', true);
	}
	
	if (atividade != "61"){
		FLUIGC.switcher.isReadOnly('#switchConfirmFaturamento', true);
	}
	/*
	if (atividade != "69"){
		FLUIGC.switcher.isReadOnly('#switchPrepAtend', true);
	}
	*/

/********************ESCONDER BOTOES PAI FILHO**************************/
	// esconder campos ADD e LIXEIRA Pai-filho
	if((atividade != "0") && (atividade != "4") && (atividade != "27")){
		$(".BtnDeleteProcedimento").remove();
		$(".BtnAddProcedimento").remove();
		$(".BtnDeleteProcedimentoR").remove();
		$(".BtnAddProcedimentoR").remove();
	}
	
	if(atividade != "31"){
		$(".btnDeleteCredenciado").remove();
		$(".btnAddCredenciado").remove();
	}

	if(atividade != "37" && atividade != "48" && atividade != "50" && atividade != "69" && atividade != "71"){
		$(".btnAddCredenciadoR").remove();
		$(".btnDeleteCredenciadoR").remove();
	}

	if(atividade == "54"){
		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				$("#qtdPrevista___" + index).prop("readonly", false);
				$("#qtdMinima___" + index).prop("readonly", false);
				$("#qtdTotalRealizada___" + index).prop("readonly", false);
				$("#valorAusencia___" + index).prop("readonly", false);
				$("#taxa___" + index).prop("readonly", false);
			}
		});
		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				$("#qtdPrevistaR___" + index).prop("readonly", false);
				$("#qtdMinimaR___" + index).prop("readonly", false);
				$("#qtdTotalRealizadaR___" + index).prop("readonly", false);
				$("#valorAusenciaR___" + index).prop("readonly", false);
				$("#taxaR___" + index).prop("readonly", false);
			}
		});
	}

	if(atividade == "78"){
		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				$("#NfRpaNew___" + index).prop("readonly", false);
				$("#dataEnvioMaloteNew___" + index).prop("readonly", false);
			}
		});
		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				$("#NfRpaR___" + index).prop("readonly", false);
				$("#dataEnvioMaloteR___" + index).prop("readonly", false);
			}
		});
	}
}
function formatDate(date,dias) {
    var d = new Date(date);
        d.setDate(d.getDate() + Number(dias));
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function exibirMensagem(titulo, mensagem, tipo){
	// tipos:
	//  - danger
	//  - warning
	//  - success
	//  - info
	if ((tipo == null) || (tipo == undefined) || tipo == ""){
		tipo = "info";
	} // if
	FLUIGC.toast({
		title: titulo,
		message: mensagem,
		type: tipo
	}); // toast
}
function setSelectedZoomItem(selectedItem) {	
	
	if ( selectedItem.inputId == "zoomEmpresa" ) {
		$("#codNomeEmpresa").val(selectedItem["NOME"]);
	}
		
	if ( selectedItem.inputId == "zoomPlataforma" ) {
		$("#codPlataforma").val(selectedItem["COD_PLATAFORMA"]);
		liberaCamposEmpresa(selectedItem["COD_PLATAFORMA"]);
		window["nomeEmpresa"].clear();
		window["zoomBuscaRegional"].clear();
		window["nomeFilial"].clear();
		$("#vidasAtivas").val('');
		reloadZoomFilterValues("nomeEmpresa", "COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);
		if(selectedItem["PLATAFORMA"] == "SOC NET"){
			FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar código e nome da unidade',type: 'warning'});
			$("#codNomeBuscaUnidade").parent().show();
			$("#codNomeBuscaUnidade").prev().addClass("required");
			$("#nomeFilial").parent().hide();
			$("#nomeFilial").prev().removeClass("required");
		}else{
			$("#codNomeBuscaUnidade").parent().hide();
			$("#codNomeBuscaUnidade").prev().removeClass("required");
			$("#nomeFilial").parent().show();
			$("#nomeFilial").prev().addClass("required");
		}
	}
	
	if ( selectedItem.inputId == "nomeEmpresa" ) {
		$("#codBuscaEmpresa").val(selectedItem["COD_EMPRESA"]);
		$("#codNomeBuscaEmpresa").val(selectedItem["EMPRESA"]);
		window["zoomBuscaRegional"].clear();
		window["nomeFilial"].clear();
		$("#vidasAtivas").val('');
		reloadZoomFilterValues("zoomBuscaRegional", "COD_EMPRESA," + selectedItem["COD_EMPRESA"]);
		reloadZoomFilterValues("nomeFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);
	}
	
	if ( selectedItem.inputId == "zoomBuscaRegional" ) {
		$("#codBuscaRegional").val(selectedItem["COD_REGIONAL"]);
		$("#codNomeBuscaRegional").val(selectedItem["REGIONAL"]);
		window["nomeFilial"].clear();
		$("#vidasAtivas").val('');
		reloadZoomFilterValues("nomeFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"] + ",COD_REGIONAL," + selectedItem["COD_REGIONAL"]);
	}
	
	if ( selectedItem.inputId == "nomeFilial" ) {
		$("#codBuscaUnidade").val(selectedItem["COD_UNIDADE"]);
		$("#codNomeBuscaUnidade").val(selectedItem["UNIDADE"]);
		preencherVidasAtivas();
	}
	
	if ( selectedItem.inputId == "zoomRespAtend" ) {
		$("#codRespAtend").val(selectedItem["colleagueId"]);
	}
		
    /*EXEMPLO PAI x FILHO*/
	if ( selectedItem.inputId.match(/tes___/) ){
		var id = selectedItem.inputId.split("___")[1];
		$("#codTes___"+id).val(selectedItem["CODIGO"]);
	}

	let tabelaProcedimentosNew = $("input[name^=codProcedimento___]");
	for(var i = 1; i <= tabelaProcedimentosNew.length; i++){
		if(selectedItem.inputId == "zoomProcedimento___"+i){
			$("#codProcedimento___"+i).val(selectedItem["CODIGO"]);
			$("#descProcedimento___"+i).val(selectedItem["PROCEDIMENTO"]);
		}
	}
}
function preencherVidasAtivas() {
	var codPlataf = $("#codPlataforma").val();
	var codEmp = $("#codBuscaEmpresa").val();
	var codUnid = $("#codBuscaUnidade").val();
	
	var c1 = DatasetFactory.createConstraint("COD_PLATAFORMA", codPlataf, codPlataf, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("COD_EMPRESA", codEmp, codEmp, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("COD_UNIDADE", codUnid, codUnid, ConstraintType.MUST);
	var constraints = new Array(c1, c2, c3);
	var dataset = DatasetFactory.getDataset("dsVidasAtivas", null, constraints, null);
	
	if (dataset.values[0].VIDAS == undefined || dataset.values[0].VIDAS == null){
		$("#vidasAtivas").val('N/D');
		return false;
		
	} else if (dataset.values.length > 0){
		$("#vidasAtivas").val(dataset.values[0].VIDAS);
	}
}
function removedZoomItem(removedItem) {		
	if (removedItem.inputId == "colleagueName") {
		$("#codRespAtend").val("");
	}
	
	/*EXEMPLO PAI x FILHO*/
	if ( removedItem.inputId.match(/zoomOC___/)) {
		var id = removedItem.inputId.split("___")[1];
		$("#np___"+id).val("");
	}
}
function alteraMaiusculo(el){
	var campo = el.id;
	document.getElementById(campo).value = document.getElementById(campo).value.replace("|", "-").toUpperCase();
}
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
    
    //aplicar no form onkeypress='mascaraMutuario(this,mtel)'

}
function mascaraMutuario(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmascara()',1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function cpfCnpj(v){
 		
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g,"")
 
    if (v.length < 14) { //CPF
 
        //Coloca um ponto entre o terceiro e o quarto dígitos
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
 
        //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
 
        //Coloca um hífen entre o terceiro e o quarto dígitos
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    } 
    
    else  { //CNPJ
 
        //Coloca ponto entre o segundo e o terceiro dígitos
        v=v.replace(/^(\d{2})(\d)/,"$1.$2")
 
        //Coloca ponto entre o quinto e o sexto dígitos
        v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
 
        //Coloca uma barra entre o oitavo e o nono dígitos
        v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
 
        //Coloca um hífen depois do bloco de quatro dígitos
        v=v.replace(/(\d{4})(\d)/,"$1-$2")
    }
    
    return v
    
    //aplicar no form onkeypress='mascaraMutuario(this,cpfCnpj)'
}
function alerta(mensagem){
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {		
	});
}
function SomenteNumero(e){
	 var tecla=(window.event)?event.keyCode:e.which;
	 if((tecla>47 && tecla<58)) return true;
	 else{
	 if (tecla==8 || tecla==0) return true;
	 else  return false;
	 }
}
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
}
function formatMoney(num) {
	//symbol = symbol !== undefined ? symbol : 'R$';
	//return symbol + numeral(num).format('0,0.00');
	if (num == null || num == undefined || num.toString().trim() == ""){
		num = "0";
	} // formatMoney
	return numeral(num).format('0.0,');
}
function consultarCEP(){
	var cep = $("#cep").val()
	if (cep == ""){
		return false;
	} // if
	
	var c1 = DatasetFactory.createConstraint("CEP", cep, cep, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsConsultarCEP", null, constraints, null);
	
	if (dataset.values[0].CIDADE == "undefined" || dataset.values[0].CIDADE == null){
		// exibirMensagem("Atenção", 'CEP inválido.', 'warning');
		// $("#cep").val('');
		// $("#numEndereco").val('');
		// $("#complementoEnd").val('');
		// $("#logradouro").val('');
		// $("#bairro").val('');
		// $("#nomeCidade").val('');
		// $("#nomeUF").val('');
		// return false;
	
	} else {
		if (dataset.values.length > 0){
			exibirMensagem("", 'CEP Encontrado.', 'success');
			$("#logradouro").val(dataset.values[0].LOGRADOURO);
			$("#bairro").val(dataset.values[0].BAIRRO);
			$("#nomeCidade").val(dataset.values[0].CIDADE);
			$("#nomeUF").val(dataset.values[0].UF);
		} else {
			// exibirMensagem("Atenção", 'CEP não encontrado.', 'warning');
			}
		}// else if
}
function calcularTempo(event) {
	const id = event.target.id.split("___")[0];
	const index = event.target.id.split("___")[1]; // pega o index do campo
	if(id == "horaAtendEntrada" || id == "horaAtendSaida" || id == "inicioPausa" || id == "fimPausa"){
		const entradaTempo = $('#horaAtendEntrada___' + index).val();
		const saidaTempo = $('#horaAtendSaida___' + index).val();
		const pausaTempo = $('#perPausa___' + index).val();
	
		var entrada = moment(
			'01/01/2021 ' + entradaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		var saida = moment(
			'01/01/2021 ' + saidaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		var pausa = moment(
			'01/01/2021 ' + pausaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		
		const validar = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	
		if (validar.test(entradaTempo) && validar.test(saidaTempo)) {
			let horas = saida.diff(entrada, 'hours');
			let minutos = moment.utc(moment(saida, "HH:mm:ss").diff(moment(entrada, "HH:mm:ss"))).format("mm")
			//let diferenca = `${horas}:${minutos}`;
			let diferenca = moment(
				'01/01/2021 ' + `${horas}:${minutos}` + ':00',
				'DD/MM/YYYY HH:mm:ss'
			);
			
			let totalHorasMinutos = moment.utc(moment(diferenca, "HH:mm:ss").diff(moment(pausa, "HH:mm:ss"))).format("HH:mm")
			// Coloca o resultado no campo
			$('#perAlocado___'+ index).val(totalHorasMinutos);
	
		} else {
			$('#perAlocado___' + index).val('00:00');
		}
	}
	if(id == "horaAtendEntradaR" || id == "horaAtendSaidaR"){
		const entradaTempo = $('#horaAtendEntradaR___' + index).val();
		const saidaTempo = $('#horaAtendSaidaR___' + index).val();
	
		var entrada = moment(
			'01/01/2021 ' + entradaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		var saida = moment(
			'01/01/2021 ' + saidaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		
		const validar = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	
		if (validar.test(entradaTempo) && validar.test(saidaTempo)) {
			let horas = saida.diff(entrada, 'hours');
			let minutos = moment.utc(moment(saida, "HH:mm:ss").diff(moment(entrada, "HH:mm:ss"))).format("mm")
			let diferenca = `${horas}:${minutos}`;
			
			// Coloca o resultado no campo
			$('#perAlocadoR___'+ index).val(diferenca);
	
		} else {
			$('#perAlocadoR___' + index).val('00:00');
		}
	}
}
var CurrentDate = moment();
function calcularTempoPausa(event) {
	const id = event.target.id.split("___")[0];
	const index = event.target.id.split("___")[1]; // pega o index do campo
		
	if(id == "inicioPausa" || id == "fimPausa"){
		const entradaTempo = $('#inicioPausa___' + index).val();
		const saidaTempo = $('#fimPausa___' + index).val();
	
		var entrada = moment(
			'01/01/2021 ' + entradaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		var saida = moment(
			'01/01/2021 ' + saidaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		
		const validar = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	
		if (validar.test(entradaTempo) && validar.test(saidaTempo)) {
			let horas = saida.diff(entrada, 'hours');
			let minutos = moment.utc(moment(saida, "HH:mm:ss").diff(moment(entrada, "HH:mm:ss"))).format("mm")
			let diferenca = `${horas}:${minutos}`;
			
			// Coloca o resultado no campo
			$('#perPausa___'+ index).val(diferenca);
	
		} else {
			$('#perPausa___' + index).val('00:00');
		}
	}
	if(id == "inicioPausaR" || id == "fimPausaR"){
		const entradaTempo = $('#inicioPausaR___' + index).val();
		const saidaTempo = $('#fimPausaR___' + index).val();
	
		var entrada = moment(
			'01/01/2021 ' + entradaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		var saida = moment(
			'01/01/2021 ' + saidaTempo + ':00',
			'DD/MM/YYYY HH:mm:ss'
		);
		
		const validar = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
	
		if (validar.test(entradaTempo) && validar.test(saidaTempo)) {
			let horas = saida.diff(entrada, 'hours');
			let minutos = moment.utc(moment(saida, "HH:mm:ss").diff(moment(entrada, "HH:mm:ss"))).format("mm")
			let diferenca = `${horas}:${minutos}`;
			
			// Coloca o resultado no campo
			$('#perPausaR___'+ index).val(diferenca);
	
		} else {
			$('#perPausaR___' + index).val('00:00');
		}
	}
	calcularTempo(event);

}
var CurrentDate = moment();
function getSelectProcedimentoNew(event){
	let inputId = event.target.id.split("___")[0];
	let input = event.target
	let index = event.target.id.split("___")[1];

	if(inputId == "selectProcedimento"){
		let selectValue = document.getElementById("selectProcedimento___"+index).value;
		let selectProcedimentoNew = selectValue.split(" -- ")[0];
		document.getElementById("procedSelecionadoNew___"+index).value = selectProcedimentoNew;
		let selectQtd = selectValue.split(" -- ")[1];
		document.getElementById("qtdPrevista___"+index).value = selectQtd;
	}
	if(inputId == "selectProcedimentoR"){
		let selectValue = document.getElementById("selectProcedimentoR___"+index).value;
		let selectProcedimento = selectValue.split(" -- ")[0];
		document.getElementById("procedSelecionadoR___"+index).value = selectProcedimento;
		let selectQtd = selectValue.split(" -- ")[1];
		document.getElementById("qtdPrevistaR___"+index).value = selectQtd;
	}
	input.value = "";
	//document.getElementById("procedSelecionadoNew___"+index).value = selectValue;
}
function addChildTable(tablename){
	if(tablename == "tabelaCredenciadoNew"){
		//Campo SelectProcedimento Baseado no Campo zoomProcedimento - #tabelaProcedimentosNew
		var index = wdkAddChild(tablename);
		var optionsProcedimento = '<option value=""></option>';
		$("input[id^='zoomProcedimento___']").each(function(index, value){
			//console.log(index, value);		
			var nomeObjeto = $(this).attr("id");
			var indice = nomeObjeto.split('___')[1];
			var valorDoCampoZoom = $("#zoomProcedimento___" + indice).val();
			var valorDoCampoQtd = $("#qtdSolicitada___" + indice).val();
			if (valorDoCampoZoom == null || valorDoCampoZoom == undefined){
				// não achou o valor
			} else {
				optionsProcedimento += '<option value="'+valorDoCampoZoom+' -- '+valorDoCampoQtd+'">'+valorDoCampoZoom+'</option>';	
			} // else if
		}); // for each
		
		$("#selectProcedimento___"+index).append(optionsProcedimento);
		$("#selectProcedimentoR___"+index).append(optionsProcedimento);
		MaskEvent.init(); //Atualiza os campos com 'mask'
	}else if(tablename == "tabelaProcedimentosNew"){
		var index = wdkAddChild(tablename); //Adicionar filhos
		MaskEvent.init(); //Atualiza os campos com 'mask'
		
	}    
	$("#inputProcedimentoReagendado___"+index).val("nao-credenciado-"+index);
}
function fnCustomDelete(oElement){
	console.log(oElement);

	let index = oElement.id.split("___")[1];
	desbloquearAgendamentoAnterior(index);

	fnWdkRemoveChild(oElement);
}
function habilitaDataContratoDomiciliar(){
	let tipoContrato = $("#tipoContrato").val();
	//console.log(tipoContrato);
	const tabelaRow = $("[tablename='tabelaProcedimentosNew'] tbody tr");
	tabelaRow.each(function(index, element) {
		if((index > 0) && (tipoContrato == "domiciliar")){
				//console.log("Executou - Domiciliar")
			// campos
			tabelaRow.eq(index).find("input[id^='dataAtendDomiciliar']").prop("readonly", false);
		
		} else if ((index > 0) && (tipoContrato != "domiciliar")) {
				//console.log("Executou - Nao domiciliar")
			// campos
			tabelaRow.eq(index).find("input[id^='dataAtendDomiciliar']").prop("readonly", true);
			tabelaRow.eq(index).find("[id^='groupDataAtendDomiciliar']").hide();
		}
	});
}
function exibirDataContratoDomiciliar(){
	let tipoContrato = $("#tipoContrato").val();
	//console.log(tipoContrato);
	const tabelaRow = $("[tablename='tabelaProcedimentosNew'] tbody tr");
	tabelaRow.each(function(index, element) {
		if((index > 0) && (tipoContrato == "domiciliar")){
				//console.log("Executou - Domiciliar")
			// campos
			tabelaRow.eq(index).find("input[id^='dataAtendDomiciliar']").prop("readonly", true);
		
		} else if ((index > 0) && (tipoContrato != "domiciliar")) {
				//console.log("Executou - Nao domiciliar")
			// campos
			tabelaRow.eq(index).find("input[id^='dataAtendDomiciliar']").prop("readonly", true);
			tabelaRow.eq(index).find("[id^='groupDataAtendDomiciliar']").hide();
		}
	});
}
function desabilitaPaiFilhoCredenciado(tabela){

	if(tabela == "tabelaCredenciadoNew"){
		const tabelaRow = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaRow.each(function(index, element) {
			if(index > 0){
				// campos
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorNew']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomePrestador']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomeProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='regProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='qtdTotalRealizada']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='NfRpa']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='dataEnvioMalote']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='qtdAusencia']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='valorAusencia']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='qtdMinima']").prop("readonly", true);
				tabelaRow.eq(index).find("input[id^='taxa']").prop("readonly", true);
				//tabelaRow.eq(index).find("input[id^='qtdPrevista']").prop("readonly", true);
				// tabelaRow.eq(index).find("[id^='tipoNegociacao']").prop("readonly", true);
				// tabelaRow.eq(index).find("[id^='valorAcordado']").prop("readonly", true);
				// tabelaRow.eq(index).find("[id^='garantia']").prop("readonly", true);
				// tabelaRow.eq(index).find("[id^='deslocamento']").prop("readonly", true);
			}
		});
	}

}
function desabilitaPaiFilhoCredenciadoR(tabela){

	if(tabela == "tabelaReagendamento"){
		const tabelaRow = $("[tablename='tabelaReagendamento'] tbody tr");
		const tamanho = tabelaRow.length -1;
		if(tamanho > 1){
			tabelaRow.each(function(index, element) {
				if(index > 0 && index < tamanho){
					// campos
					tabelaRow.eq(index).find("[class^='btnDeleteCredenciadoR']").addClass("disabled");
					tabelaRow.eq(index).find("[id^='selectProcedimentoR']").addClass("disabled");
					tabelaRow.eq(index).find("[id^='tipoNegociacaoR']").addClass("disabled");
					tabelaRow.eq(index).find("[id^='tipoContratacaoR']").addClass("disabled");	
					tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='nomePrestadorR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='telCredenciadoR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='emailCredenciadoR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='nomeProfissionalR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='regProfissionalR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='telProfissionalR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='emailProfissionalR']").prop("readonly", true);
	
					tabelaRow.eq(index).find("[id^='dataAtendAgendadaR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='horaAtendEntradaR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='inicioPausaR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='fimPausaR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='horaAtendSaidaR']").prop("readonly", true);
					tabelaRow.eq(index).find("[id^='selectMotivoR']").addClass("disabled");
					tabelaRow.eq(index).find("[id^='obsAtendimentoR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='qtdTotalRealizadaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='NfRpaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='dataEnvioMaloteR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='qtdAusenciaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='valorAusenciaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='taxaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='qtdMinimaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='qtdPrevistaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='valorAcordadoR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='garantiaR']").prop("readonly", true);
					tabelaRow.eq(index).find("input[id^='deslocamentoR']").prop("readonly", true);
				}
			});
		}

	}

}
function anexarArquivo(){
	JSInterface.showCamera();
}
function alterarTipoCredenciado(event,id2 = "",index2 = ""){
	const index = index2 == "" ? getId(event.target.id) : index2;
	const id = id2 == "" ? event.target.id.split("___")[0] : id2;

	if(id == "tipoContratacaoNew"){
		let credenciado = document.getElementById("tipoContratacaoNew___" + index).value;
		
		if (credenciado == "cred") {
			camposOnchangeCredenciado();
			
			document.getElementById("cpfCnpjPrestadorNew___" + index).value = ("");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomePrestadorNew___" + index).value = ("");
			document.getElementById("telCredenciado___" + index).value = ("");
			document.getElementById("emailCredenciado___" + index).value = ("");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomeProfissional___" + index).value = ("");
			document.getElementById("regProfissional___" + index).value = ("");
			document.getElementById("telProfissional___" + index).value = ("");
			document.getElementById("emailProfissional___" + index).value = ("");
	
			
			
		} else if ((credenciado == "medPJ") || (credenciado == "rpa")) {
			camposOnchangeCredenciado();
			
			document.getElementById("cpfCnpjPrestadorNew___" + index).value = ("");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomePrestadorNew___" + index).value = ("N/D");
			document.getElementById("telCredenciado___" + index).value = ("N/D");
			document.getElementById("emailCredenciado___" + index).value = ("N/D");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomeProfissional___" + index).value = ("");
			document.getElementById("regProfissional___" + index).value = ("");
			document.getElementById("telProfissional___" + index).value = ("");
			document.getElementById("emailProfissional___" + index).value = ("");
			
		} else if (credenciado == "") {
			camposOnchangeCredenciado();
			
			document.getElementById("cpfCnpjPrestadorNew___" + index).value = ("");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomePrestadorNew___" + index).value = ("");
			document.getElementById("telCredenciado___" + index).value = ("");
			document.getElementById("emailCredenciado___" + index).value = ("");
			//////////////////////////////////////////////////////////////////////
			document.getElementById("nomeProfissional___" + index).value = ("");
			document.getElementById("regProfissional___" + index).value = ("");
			document.getElementById("telProfissional___" + index).value = ("");
			document.getElementById("emailProfissional___" + index).value = ("");
		}
	}
	if(id == "tipoContratacaoR"){
		let credenciado = document.getElementById("tipoContratacaoR___" + index).value;
		if (credenciado == "cred") {
			camposOnchangeCredenciadoR();
			document.getElementById("cpfCnpjPrestadorR___" + index).value = ("");
			document.getElementById("nomePrestadorR___" + index).value = ("");
			document.getElementById("telCredenciadoR___" + index).value = ("");
			document.getElementById("emailCredenciadoR___" + index).value = ("");
			document.getElementById("nomeProfissionalR___" + index).value = ("");
			document.getElementById("regProfissionalR___" + index).value = ("");
			document.getElementById("telProfissionalR___" + index).value = ("");
			document.getElementById("emailProfissionalR___" + index).value = ("");
		} else if ((credenciado == "medPJ") || (credenciado == "rpa")) {
			camposOnchangeCredenciadoR();
			document.getElementById("cpfCnpjPrestadorR___" + index).value = ("");
			document.getElementById("nomePrestadorR___" + index).value = ("N/D");
			document.getElementById("telCredenciadoR___" + index).value = ("N/D");
			document.getElementById("emailCredenciadoR___" + index).value = ("N/D");
			document.getElementById("nomeProfissionalR___" + index).value = ("");
			document.getElementById("regProfissionalR___" + index).value = ("");
			document.getElementById("telProfissionalR___" + index).value = ("");
			document.getElementById("emailProfissionalR___" + index).value = ("");
		} else if (credenciado == "") {
			camposOnchangeCredenciadoR();
			document.getElementById("cpfCnpjPrestadorR___" + index).value = ("");
			document.getElementById("nomePrestadorR___" + index).value = ("");
			document.getElementById("telCredenciadoR___" + index).value = ("");
			document.getElementById("emailCredenciadoR___" + index).value = ("");
			document.getElementById("nomeProfissionalR___" + index).value = ("");
			document.getElementById("regProfissionalR___" + index).value = ("");
			document.getElementById("telProfissionalR___" + index).value = ("");
			document.getElementById("emailProfissionalR___" + index).value = ("");
		}
	}
}
function camposOnchangeCredenciado(){
	
	const tabelaRow = $("[tablename='tabelaCredenciadoNew'] tbody tr");
	
	tabelaRow.each(function(index, element) {
		if(index > 0){
			let credenciado = tabelaRow.eq(index).find("[id^='tipoContratacaoNew']").val();
			
			if (credenciado == "cred") {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorNew']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomePrestador']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telCredenciado']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailCredenciado']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomeProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='regProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailProfissional']").prop("readonly", false);
			}
			else if ((credenciado == "medPJ") || (credenciado == "rpa")) {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorNew']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomePrestador']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomeProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='regProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telProfissional']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailProfissional']").prop("readonly", false);
			}
			else if (credenciado == "") {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorNew']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomePrestador']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailCredenciado']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomeProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='regProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telProfissional']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailProfissional']").prop("readonly", true);
			}
			
			console.log("Tipo credenciado: "+ credenciado + " index: " + index);
		}
	});
}
function camposOnchangeCredenciadoR(){
	
	const tabelaRow = $("[tablename='tabelaReagendamento'] tbody tr");
	
	tabelaRow.each(function(index, element) {
		if(index > 0){
			let credenciado = tabelaRow.eq(index).find("[id^='tipoContratacaoR']").val();
			
			if (credenciado == "cred") {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomePrestadorR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telCredenciadoR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailCredenciadoR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomeProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='regProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailProfissionalR']").prop("readonly", false);
			}
			else if ((credenciado == "medPJ") || (credenciado == "rpa")) {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='nomePrestadorR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telCredenciadoR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailCredenciadoR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomeProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='regProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='telProfissionalR']").prop("readonly", false);
				tabelaRow.eq(index).find("[id^='emailProfissionalR']").prop("readonly", false);
			}
			else if (credenciado == "") {
				tabelaRow.eq(index).find("[id^='cpfCnpjPrestadorR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomePrestadorR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telCredenciadoR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailCredenciadoR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='nomeProfissionalR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='regProfissionalR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='telProfissionalR']").prop("readonly", true);
				tabelaRow.eq(index).find("[id^='emailProfissionalR']").prop("readonly", true);
			}
			
		}
	});
}
function validaZoom(){
	$(document).on('select2:opening', function (e) {
		let campo = "";
		var id = e.target.id;		
		$("#alert_template").remove();
		
		if(id == "zoomNumeroSolicitacao" && ($("#convocacao").val() == null || $("#convocacao").val().length == 0)){
			campo = "Convocação";
		}
		
		if(id == "nomeEmpresa" && ($("#zoomPlataforma").val() == null || $("#zoomPlataforma").val().length == 0)){
			campo = "Plataforma";
		}

		if(id == "zoomBuscaRegional" && ($("#nomeEmpresa").val() == null || $("#nomeEmpresa").val().length == 0)){
			campo = "Empresa";
		}
		
		if(id == "nomeFilial" && ($("#nomeEmpresa").val() == null || $("#nomeEmpresa").val().length == 0)){
			campo = "Empresa e/ou Regional";
		}
		
		if(id == "nomeFilial" && ($("#codPlataforma").val() == "evidamed") && ($("#zoomBuscaRegional").val() == null || $("#zoomBuscaRegional").val().length == 0)){
			campo = "Regional";
		}
		

		if(campo != ""){
			e.preventDefault();
			$(e.target).parent().append(Mustache.render($(".alerta-zoom").html(), { campo : campo }));
			setTimeout(function() { 
				$("#alert_template").remove();
			}, 3500);
		}
	});
}
function liberaCamposEmpresa(codPlataforma){
	//console.log(codPlataforma);
	var campo1 = $('#zoomBuscaRegional'); // ID do campo 01

		if (codPlataforma == 'evidamed') {
			campo1.prop('disabled', false);
		
		} else if(codPlataforma == 'soc'){
			campo1.prop('disabled', true).val('');
	  
		} else if(codPlataforma == ''){
			campo1.prop('disabled', false).val('');
		}
}
function getId(id) {
	const inputIdSplit = id.split('___').pop();
	return inputIdSplit !== '' ? inputIdSplit : id;
}
function manterRegrasOnchange() {
	
	//valores dos campos
	var campoConvocacao = $('#convocacao').val();
	var campoTipoContrato = $('#tipoContrato').val();
	var campoPlataforma = $('#codPlataforma').val();
	var campoPossuiEstacionamento = $('#possuiEstacionamento').val();
	var campoModeloExame = $('#modeloExame').val();
	var campoPossuiNoShow = $('#possuiNoShow').val();
	var campoOutros = $('#checkOutros').val();
	
	//CamposOnChange
	if (campoConvocacao == "1a") {
		console.log("executou campoConvocacao");
		$('#zoomNumeroSolicitacao').prop('disabled', true);
	}
	
	if (campoTipoContrato == "inCompany") {
		$('#descCondicoesInCompany').prop('readonly', false);
	}
	
	if (campoPossuiEstacionamento == "sim") {
		$('#valorEstacionamento').prop('readonly', false);
	}
	
	if (campoModeloExame == "perCapta" || campoModeloExame == "evento") {
		$('#valorExame').prop('readonly', false);
	}
	
	if (campoPossuiNoShow == "sim") {
		$('#qtdNoShow').prop('readonly', false);
	}
	
	if (campoOutros == "outros") {
		$('#matOutros').prop('readonly', false);
	}
}
function mesmoCredenciado(e){
	let id = e.id.split("___")[0];
	let index = e.id.split("___")[1];
	if(index > 1){
		let idLength = id.length;
		let reagendamento = id.substring(idLength -1, idLength);

		if(reagendamento == "R") camposOnchangeCredenciadoR();
		else camposOnchangeCredenciado();
		alterarTipoCredenciado("", id, index);

		let indexAnterior = index - 1;

		if(reagendamento == "R"){
			let tipoContratacao = document.getElementById("tipoContratacaoR___"+indexAnterior).value;
			let cpfCnpjPrestador = document.getElementById("cpfCnpjPrestadorR___"+indexAnterior).value;
			let nomePrestador = document.getElementById("nomePrestadorR___"+indexAnterior).value;
			let telCredenciado = document.getElementById("telCredenciadoR___"+indexAnterior).value;
			let emailCredenciado = document.getElementById("emailCredenciadoR___"+indexAnterior).value;
			let nomeProfissional = document.getElementById("nomeProfissionalR___"+indexAnterior).value;
			let regProfissional = document.getElementById("regProfissionalR___"+indexAnterior).value;
			let telProfissional = document.getElementById("telProfissionalR___"+indexAnterior).value;
			let emailProfissional = document.getElementById("emailProfissionalR___"+indexAnterior).value;
	
			document.getElementById("tipoContratacaoR___"+index).value = tipoContratacao;
			document.getElementById("cpfCnpjPrestadorR___"+index).value = cpfCnpjPrestador;
			document.getElementById("nomePrestadorR___"+index).value = nomePrestador;
			document.getElementById("telCredenciadoR___"+index).value = telCredenciado;
			document.getElementById("emailCredenciadoR___"+index).value = emailCredenciado;
			document.getElementById("nomeProfissionalR___"+index).value = nomeProfissional;
			document.getElementById("regProfissionalR___"+index).value = regProfissional;
			document.getElementById("telProfissionalR___"+index).value = telProfissional;
			document.getElementById("emailProfissionalR___"+index).value = emailProfissional;

		}else{
			let tipoContratacao = document.getElementById("tipoContratacaoNew___"+indexAnterior).value;
			let cpfCnpjPrestador = document.getElementById("cpfCnpjPrestadorNew___"+indexAnterior).value;
			let nomePrestador = document.getElementById("nomePrestadorNew___"+indexAnterior).value;
			let telCredenciado = document.getElementById("telCredenciado___"+indexAnterior).value;
			let emailCredenciado = document.getElementById("emailCredenciado___"+indexAnterior).value;
			let nomeProfissional = document.getElementById("nomeProfissional___"+indexAnterior).value;
			let regProfissional = document.getElementById("regProfissional___"+indexAnterior).value;
			let telProfissional = document.getElementById("telProfissional___"+indexAnterior).value;
			let emailProfissional = document.getElementById("emailProfissional___"+indexAnterior).value;
	
			document.getElementById("tipoContratacaoNew___"+index).value = tipoContratacao;
			document.getElementById("cpfCnpjPrestadorNew___"+index).value = cpfCnpjPrestador;
			document.getElementById("nomePrestadorNew___"+index).value = nomePrestador;
			document.getElementById("telCredenciado___"+index).value = telCredenciado;
			document.getElementById("emailCredenciado___"+index).value = emailCredenciado;
			document.getElementById("nomeProfissional___"+index).value = nomeProfissional;
			document.getElementById("regProfissional___"+index).value = regProfissional;
			document.getElementById("telProfissional___"+index).value = telProfissional;
			document.getElementById("emailProfissional___"+index).value = emailProfissional;

		}

	}
}
function convertFloat(valor){
	let valorFloat = parseFloat(valor.replace(".","").replace(",","."));
	return valorFloat;
}
// Soma Quantidade Mínima
function somaTotalQtdMinima(){
	console.log("somaTotalQtdMinima!");
	setTimeout(function(){
		var totalQtdMinima = 0;

		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				let qtdMinima = Number($("#qtdMinima___" + index).val());
				totalQtdMinima += qtdMinima;
			}
		});

		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				let qtdMinimaR = Number($("#qtdMinimaR___" + index).val());
				totalQtdMinima += qtdMinimaR;
			}
		});

		console.log("Total Quantidade Mínima: "+totalQtdMinima);

		document.querySelector('#qtdMinimaTotal').value = totalQtdMinima;

	}, 500);
}
// Soma Quantidade Ausencia
function somaQtdAusencia(event){
	console.log("somaQtdAusencia!");
	let zoomEmpresa = $("#zoomEmpresa").val();
	console.log("Empresa: "+zoomEmpresa);
	let id = event.target.id.split("___")[0];
	let index = event.target.id.split("___")[1]; // pega o index do campo
	let totalAusencias = 0;
	if(id == "qtdMinima" || id == "qtdTotalRealizada"){
		let qtdMinima = $('#qtdMinima___' + index).val();
		let qtdPrevista = $('#qtdPrevista___' + index).val();
		let qtdTotalRealizada = $('#qtdTotalRealizada___' + index).val();
		if(zoomEmpresa == "RHMED") totalAusencias = (qtdMinima - qtdTotalRealizada) < 0 ? 0 : (qtdMinima - qtdTotalRealizada);
		if(zoomEmpresa == "RHVIDA") totalAusencias = (qtdPrevista - qtdTotalRealizada) < 0 ? 0 : (qtdPrevista - qtdTotalRealizada);
		$('#qtdAusencia___'+ index).val(totalAusencias);
	}
	if(id == "qtdMinimaR" || id == "qtdTotalRealizadaR"){
		let qtdMinimaR = $('#qtdMinimaR___' + index).val();
		let qtdPrevistaR = $('#qtdPrevistaR___' + index).val();
		let qtdTotalRealizadaR = $('#qtdTotalRealizadaR___' + index).val();
		if(zoomEmpresa == "RHMED") totalAusencias = (qtdMinimaR - qtdTotalRealizadaR) < 0 ? 0 : (qtdMinimaR - qtdTotalRealizadaR);
		if(zoomEmpresa == "RHVIDA") totalAusencias = (qtdPrevistaR - qtdTotalRealizadaR) < 0 ? 0 : (qtdPrevistaR - qtdTotalRealizadaR);
		$('#qtdAusenciaR___'+ index).val(totalAusencias);
	}
	console.log("Quantidade Ausência: "+totalAusencias);
}
function somaQtdTotalAusencia(){
	console.log("somaQtdTotalAusencia!");
	setTimeout(function(){
		var totalAusencias = 0;

		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				let ausencias = Number($("#qtdAusencia___" + index).val());
				totalAusencias += ausencias;
			}
		});

		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				let ausencias = Number($("#qtdAusenciaR___" + index).val());
				totalAusencias += ausencias;
			}
		});

		console.log("Quantidade Total Ausencia: "+totalAusencias);

		document.querySelector('#qtdTotalAusencias').value = totalAusencias;
		document.querySelector('#qtdAusenciaTotal').value = totalAusencias;

	}, 500);
}
// Soma Valor Ausencia
function somaValorAusencia(event){
	console.log("somaValorAusencia");
	const id = event.target.id.split("___")[0];
	const index = event.target.id.split("___")[1]; // pega o index do campo

	let totalAusencias = 0;

	if(id == "qtdMinima" || id == "qtdTotalRealizada" || id == "valorAusencia"){
		const qtdAusencias = Number($('#qtdAusencia___' + index).val());
		const valorAusencias = format2Number($('#valorAusencia___' + index).val());
		totalAusencias = formatMoney(qtdAusencias * valorAusencias);
		$('#valorTotalAusencia___'+ index).val(totalAusencias);
	}
	if(id == "qtdMinimaR" || id == "qtdTotalRealizadaR" || id == "valorAusenciaR"){
		const qtdAusencias = Number($('#qtdAusenciaR___' + index).val());
		const valorAusencias = format2Number($('#valorAusenciaR___' + index).val());
		totalAusencias = formatMoney(qtdAusencias * valorAusencias);
		$('#valorTotalAusenciaR___'+ index).val(totalAusencias);
	}
	console.log("Valor Ausencia: "+totalAusencias);
}
function somaValorTotalAusencia(){
	console.log("somaValorTotalAusencia!");
	setTimeout(function(){
		var valorTotalAusencias = 0;

		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				let tmp = $("#valorTotalAusencia___" + index).val();
				console.log(tmp);
				let valorCredenciado = 0;
				if(tmp != "" && tmp != null && tmp != undefined && tmp != "0,00") valorCredenciado = convertFloat(tmp);
				console.log("#valorCredenciado" + index+": "+valorCredenciado);
				valorTotalAusencias += valorCredenciado;
			}
		});

		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				let tmp = $("#valorTotalAusenciaR___" + index).val();
				console.log(tmp);
				let valorCredenciadoR = 0;
				if(tmp != "" && tmp != null && tmp != undefined && tmp != "0,00") valorCredenciadoR = convertFloat(tmp);
				console.log("#valorCredenciadoR" + index+": "+valorCredenciadoR);
				valorTotalAusencias += valorCredenciadoR;
			}
		});

		console.log("Valor Total Ausencia: "+valorTotalAusencias);
		document.querySelector('#valorTotalAusencias').value = formatMoney(valorTotalAusencias);
	}, 500)
}
// Soma Valor Taxa
function somaValorTaxas(){
	setTimeout(function(){
		let vltotalTaxas = 0;

		let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
		tabelaCredenciado.each(function(index, element){
			let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
			if(inputProcedimentoReagendado == "nao"){
				let tmp = $("#taxa___" + index).val();
				console.log("#taxa___" + index+": "+tmp);
				let valorTaxa = 0;
				if(tmp != "" && tmp != null && tmp != undefined && tmp != "0,00") valorTaxa = convertFloat(tmp);
				vltotalTaxas += valorTaxa;
				console.log("valorTaxa: "+valorTaxa);
			}
		});

		let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
		tabelaReagendamento.each(function(index, element){
			let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
			if(inputProcedimentoReagendadoR == "nao"){
				let tmp = $("#taxaR___" + index).val();
				console.log("#taxaR___" + index+": "+tmp);
				let valorTaxaR = 0;
				if(tmp != "" && tmp != null && tmp != undefined && tmp != "0,00") valorTaxaR = convertFloat(tmp);
				vltotalTaxas += valorTaxaR;
				console.log("valorTaxaR: "+valorTaxaR);
			}
		});

		console.log("vltotalTaxas: "+vltotalTaxas);

		if(vltotalTaxas > 0) document.querySelector('#possuiTaxa').value = "S";
		document.querySelector('#valorTotalTaxas').value = formatMoney(vltotalTaxas);

	}, 300);
}
// Soma Valor Procedimento
function somaValorProcedimento(event){
	const index = event.target.id.split("___")[1]; // pega o index do campo
	const id = event.target.id.split("___")[0];

	if(id == "tipoNegociacao" || id == "valorAcordado" || id == "qtdTotalRealizada"){
		const tipoNegociacao = $("#tipoNegociacao___"+index).val();
		const valorAcordado = $("#valorAcordado___"+index).val() == "" ? 0 : format2Number($("#valorAcordado___"+index).val());
		let valorTotalProcedimento = 0;
		if(tipoNegociacao == "hora"){
			const perAlocado = $("#perAlocado___"+index).val() == "" ? 0 : $("#perAlocado___"+index).val();
			const perPausa = $("#perPausa___"+index).val() == "" ? 0 : $("#perPausa___"+index).val();
			const minutosPausa = (parseInt(perPausa.split(":")[0]) * 60) + (parseInt(perPausa.split(":")[1]));
			const minutos = (parseInt(perAlocado.split(":")[0]) * 60) + (parseInt(perAlocado.split(":")[1])) - minutosPausa;
			const valorMinuto = valorAcordado / 60;
			valorTotalProcedimento = valorMinuto * minutos;
		}
		if(tipoNegociacao == "exame"){
			const qtdTotalRealizada = $("#qtdTotalRealizada___"+index).val() == "" ? 0 : parseInt($("#qtdTotalRealizada___"+index).val());
			valorTotalProcedimento = qtdTotalRealizada * valorAcordado;
		}
		$('#valorTotalProcedimento___'+ index).val(formatMoney(valorTotalProcedimento));
	}
	if(id == "tipoNegociacaoR" || id == "valorAcordadoR" || id == "qtdTotalRealizadaR"){
		const tipoNegociacao = $("#tipoNegociacaoR___"+index).val();
		const valorAcordado = $("#valorAcordadoR___"+index).val() == "" ? 0 : format2Number($("#valorAcordadoR___"+index).val());
		let valorTotalProcedimento = 0;
		if(tipoNegociacao == "hora"){
			const perAlocado = $("#perAlocadoR___"+index).val() == "" ? 0 : $("#perAlocadoR___"+index).val();
			const perPausa = $("#perPausaR___"+index).val() == "" ? 0 : $("#perPausaR___"+index).val();
			const minutosPausa = (parseInt(perPausa.split(":")[0]) * 60) + (parseInt(perPausa.split(":")[1]));
			const minutos = (parseInt(perAlocado.split(":")[0]) * 60) + (parseInt(perAlocado.split(":")[1])) - minutosPausa;
			const valorMinuto = valorAcordado / 60;
			valorTotalProcedimento = valorMinuto * minutos;
		}
		if(tipoNegociacao == "exame"){
			const qtdTotalRealizada = $("#qtdTotalRealizadaR___"+index).val() == "" ? 0 : parseInt($("#qtdTotalRealizadaR___"+index).val());
			valorTotalProcedimento = qtdTotalRealizada * valorAcordado;
		}
		$('#valorTotalProcedimentoR___'+ index).val(formatMoney(valorTotalProcedimento));
	}

}
// Reagendamento
function desbloquearAgendamentoAnterior(index){
	let inputProcedimentoReagendadoR = $("#inputProcedimentoReagendadoR___"+index).val();
	console.log(inputProcedimentoReagendadoR);
	let tabela = inputProcedimentoReagendadoR.split("-")[1];
	console.log(tabela);
	let indexTabela = inputProcedimentoReagendadoR.split("-")[2];
	console.log(indexTabela);

	if(tabela == "credenciado") desbloquearProcedimentoCredenciado(indexTabela);
	if(tabela == "reagendamento") desbloquearProcedimentoReagendamento(indexTabela);
}
function desbloquearProcedimentoCredenciado(index){
	$("#selectProcedimentoNew___" + index).removeClass("disabled");
	$("#tipoContratacaoNew___" + index).removeClass("disabled");
	$("#cpfCnpjPrestadorNew___" + index).prop("readonly", false);
	$("#nomePrestadorNew___" + index).prop("readonly", false);
	$("#telCredenciado___" + index).prop("readonly", false);
	$("#emailCredenciado___" + index).prop("readonly", false);
	$("#nomeProfissional___" + index).prop("readonly", false);
	$("#regProfissional___" + index).prop("readonly", false);
	$("#telProfissional___" + index).prop("readonly", false);
	$("#emailProfissional___" + index).prop("readonly", false);
	$("#dataAtendAgendada___" + index).prop("readonly", false);
	$("#horaAtendEntrada___" + index).prop("readonly", false);
	$("#inicioPausa___" + index).prop("readonly", false);
	$("#fimPausa___" + index).prop("readonly", false);
	$("#horaAtendSaida___" + index).prop("readonly", false);
	$("#selectMotivo___" + index).removeClass("disabled");
	$("#obsAtendimento___" + index).removeClass("disabled");
	$("#tipoNegociacao___" + index).removeClass("disabled");
	$("#valorAcordado___" + index).prop("readonly", false);
	$("#garantia___" + index).prop("readonly", false);
	$("#deslocamento___" + index).prop("readonly", false);
	$("#qtdPrevista___" + index).prop("readonly", false);
	$("#inputProcedimentoReagendado___"+index).val("nao-credenciado-"+index);
}
function desbloquearProcedimentoReagendamento(index){
	$("#selectProcedimentoR___" + index).removeClass("disabled");
	$("#tipoContratacaoR___" + index).removeClass("disabled");
	$("#cpfCnpjPrestadorR___" + index).prop("readonly", false);
	$("#nomePrestadorR___" + index).prop("readonly", false);
	$("#telCredenciadoR___" + index).prop("readonly", false);
	$("#emailCredenciadoR___" + index).prop("readonly", false);
	$("#nomeProfissionalR___" + index).prop("readonly", false);
	$("#regProfissionalR___" + index).prop("readonly", false);
	$("#telProfissionalR___" + index).prop("readonly", false);
	$("#emailProfissionalR___" + index).prop("readonly", false);
	$("#dataAtendAgendadaR___" + index).prop("readonly", false);
	$("#horaAtendEntradaR___" + index).prop("readonly", false);
	$("#inicioPausaR___" + index).prop("readonly", false);
	$("#fimPausaR___" + index).prop("readonly", false);
	$("#horaAtendSaidaR___" + index).prop("readonly", false);
	$("#selectMotivoR___" + index).removeClass("disabled");
	$("#obsAtendimentoR___" + index).removeClass("disabled");
	$("#tipoNegociacaoR___" + index).removeClass("disabled");
	$("#valorAcordadoR___" + index).prop("readonly", false);
	$("#garantiaR___" + index).prop("readonly", false);
	$("#deslocamentoR___" + index).prop("readonly", false);
	$("#qtdPrevistaR___" + index).prop("readonly", false);
	$("#inputProcedimentoReagendadoR___"+index).val("nao-reagendamento-"+index);
}
function reagendarProcedimento(event) {
	console.log(event);

	let id = event.target.id;
	console.log("id: "+id);

	let reagendado = "";
	let index = "";

	console.log(id == "reagendar" || id == "reagendarR");
	if(id == "reagendar" || id == "reagendarR"){
		index = event.path[2].children[0].children[1].children[0].id.split("___")[1];
	}else{
		index = event.target.id.split("___")[1];
	}
	console.log("index: "+index);

	if(id == "reagendar") reagendado = $("#inputProcedimentoReagendado___" + index).val().split("-")[0];
	else reagendado = $("#inputProcedimentoReagendadoR___" + index).val().split("-")[0];

	console.log("reagendado: " + reagendado);

	if(reagendado == "nao"){

		if(CURRENT_STATE == "37" || CURRENT_STATE == "48" || CURRENT_STATE == "50" || CURRENT_STATE == "69" || CURRENT_STATE == "71"){
			let newRow = wdkAddChild("tabelaReagendamento"); //Adicionar filhos
			MaskEvent.init(); //Atualiza os campos com 'mask'

			if(id == "reagendar"){
				$("#selectProcedimentoNew___" + index).addClass("disabled");
				$("#tipoContratacaoNew___" + index).addClass("disabled");
				$("#cpfCnpjPrestadorNew___" + index).prop("readonly", true);
				$("#nomePrestadorNew___" + index).prop("readonly", true);
				$("#telCredenciado___" + index).prop("readonly", true);
				$("#emailCredenciado___" + index).prop("readonly", true);
				$("#nomeProfissional___" + index).prop("readonly", true);
				$("#regProfissional___" + index).prop("readonly", true);
				$("#telProfissional___" + index).prop("readonly", true);
				$("#emailProfissional___" + index).prop("readonly", true);
				$("#dataAtendAgendada___" + index).prop("readonly", true);
				$("#horaAtendEntrada___" + index).prop("readonly", true);
				$("#inicioPausa___" + index).prop("readonly", true);
				$("#fimPausa___" + index).prop("readonly", true);
				$("#horaAtendSaida___" + index).prop("readonly", true);
				$("#selectMotivo___" + index).addClass("disabled");
				$("#obsAtendimento___" + index).addClass("disabled");
				$("#tipoNegociacao___" + index).addClass("disabled");
				$("#valorAcordado___" + index).prop("readonly", true);
				$("#garantia___" + index).prop("readonly", true);
				$("#deslocamento___" + index).prop("readonly", true);
				$("#qtdPrevista___" + index).prop("readonly", true);

				$("#selectProcedimentoR___"+newRow).addClass("disabled");
				$("#procedSelecionadoR___"+newRow).val($("#procedSelecionadoNew___"+index).val());
				$("#qtdPrevistaR___"+newRow).val($("#qtdPrevista___"+index).val());

				$("#inputProcedimentoReagendado___"+index).val("sim-credenciado-"+index);
				$("#inputProcedimentoReagendadoR___"+newRow).val("nao-credenciado-"+index);
			}else{
				$("#selectProcedimentoR___" + index).addClass("disabled");
				$("#tipoContratacaoR___" + index).addClass("disabled");
				$("#cpfCnpjPrestadorR___" + index).prop("readonly", true);
				$("#nomePrestadorR___" + index).prop("readonly", true);
				$("#telCredenciadoR___" + index).prop("readonly", true);
				$("#emailCredenciadoR___" + index).prop("readonly", true);
				$("#nomeProfissionalR___" + index).prop("readonly", true);
				$("#regProfissionalR___" + index).prop("readonly", true);
				$("#telProfissionalR___" + index).prop("readonly", true);
				$("#emailProfissionalR___" + index).prop("readonly", true);
				$("#dataAtendAgendadaR___" + index).prop("readonly", true);
				$("#horaAtendEntradaR___" + index).prop("readonly", true);
				$("#inicioPausaR___" + index).prop("readonly", true);
				$("#fimPausaR___" + index).prop("readonly", true);
				$("#horaAtendSaidaR___" + index).prop("readonly", true);
				$("#selectMotivoR___" + index).addClass("disabled");
				$("#obsAtendimentoR___" + index).addClass("disabled");
				$("#tipoNegociacaoR___" + index).addClass("disabled");
				$("#valorAcordadoR___" + index).prop("readonly", true);
				$("#garantiaR___" + index).prop("readonly", true);
				$("#deslocamentoR___" + index).prop("readonly", true);
				$("#qtdPrevistaR___" + index).prop("readonly", true);

				$("#selectProcedimentoR___"+newRow).addClass("disabled");
				$("#procedSelecionadoR___"+newRow).val($("#procedSelecionadoR___"+index).val());
				$("#qtdPrevistaR___"+newRow).val($("#qtdPrevistaR___"+index).val());

				$("#inputProcedimentoReagendadoR___"+index).val("sim-reagendamento-"+index);
				$("#inputProcedimentoReagendadoR___"+newRow).val("nao-reagendamento-"+index);
			}
		}
	}
}
function bloquearProcedimentoReagendado(){
	let tabelaCredenciado = $("[tablename='tabelaCredenciadoNew'] tbody tr");
	tabelaCredenciado.each(function(index, element){
		let inputProcedimentoReagendado = tabelaCredenciado.eq(index).find("[id^='inputProcedimentoReagendado']").val().split("-")[0];
		console.log("inputProcedimentoReagendado: "+inputProcedimentoReagendado);
		if(inputProcedimentoReagendado == "sim"){
			$("#selectProcedimentoNew___" + index).addClass("disabled");
			$("#tipoContratacaoNew___" + index).addClass("disabled");
			$("#cpfCnpjPrestadorNew___" + index).prop("readonly", true);
			$("#nomePrestadorNew___" + index).prop("readonly", true);
			$("#telCredenciado___" + index).prop("readonly", true);
			$("#emailCredenciado___" + index).prop("readonly", true);
			$("#nomeProfissional___" + index).prop("readonly", true);
			$("#regProfissional___" + index).prop("readonly", true);
			$("#telProfissional___" + index).prop("readonly", true);
			$("#emailProfissional___" + index).prop("readonly", true);
			$("#dataAtendAgendada___" + index).prop("readonly", true);
			$("#horaAtendEntrada___" + index).prop("readonly", true);
			$("#inicioPausa___" + index).prop("readonly", true);
			$("#fimPausa___" + index).prop("readonly", true);
			$("#horaAtendSaida___" + index).prop("readonly", true);
			$("#selectMotivo___" + index).addClass("disabled");
			$("#obsAtendimento___" + index).addClass("disabled");
			$("#tipoNegociacao___" + index).addClass("disabled");
			$("#valorAcordado___" + index).prop("readonly", true);
			$("#garantia___" + index).prop("readonly", true);
			$("#deslocamento___" + index).prop("readonly", true);
			$("#qtdPrevista___" + index).prop("readonly", true);
		}
	});

	let tabelaReagendamento = $("[tablename='tabelaReagendamento'] tbody tr");
	tabelaReagendamento.each(function(index, element){
		let inputProcedimentoReagendadoR = tabelaReagendamento.eq(index).find("[id^='inputProcedimentoReagendadoR']").val().split("-")[0];
		console.log("inputProcedimentoReagendadoR: "+inputProcedimentoReagendadoR);
		if(inputProcedimentoReagendadoR == "sim"){
			$("#selectProcedimentoR___" + index).addClass("disabled");
			$("#tipoContratacaoR___" + index).addClass("disabled");
			$("#cpfCnpjPrestadorR___" + index).prop("readonly", true);
			$("#nomePrestadorR___" + index).prop("readonly", true);
			$("#telCredenciadoR___" + index).prop("readonly", true);
			$("#emailCredenciadoR___" + index).prop("readonly", true);
			$("#nomeProfissionalR___" + index).prop("readonly", true);
			$("#regProfissionalR___" + index).prop("readonly", true);
			$("#telProfissionalR___" + index).prop("readonly", true);
			$("#emailProfissionalR___" + index).prop("readonly", true);
			$("#dataAtendAgendadaR___" + index).prop("readonly", true);
			$("#horaAtendEntradaR___" + index).prop("readonly", true);
			$("#inicioPausaR___" + index).prop("readonly", true);
			$("#fimPausaR___" + index).prop("readonly", true);
			$("#horaAtendSaidaR___" + index).prop("readonly", true);
			$("#selectMotivoR___" + index).addClass("disabled");
			$("#obsAtendimentoR___" + index).addClass("disabled");
			$("#tipoNegociacaoR___" + index).addClass("disabled");
			$("#valorAcordadoR___" + index).prop("readonly", true);
			$("#garantiaR___" + index).prop("readonly", true);
			$("#deslocamentoR___" + index).prop("readonly", true);
			$("#qtdPrevistaR___" + index).prop("readonly", true);
		}
	});
}