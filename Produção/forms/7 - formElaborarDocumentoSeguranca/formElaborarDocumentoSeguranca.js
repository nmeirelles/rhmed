var currentIdAnexo = null;

$(document).ready(function() {
	
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
	
	$('#tipoSolicitacao').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#motivoSolicitacao'); // ID do campo 01
		  
		  if ($(this).val() === 'revisao') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	$('#custoCadastrado').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#sistCadastrado'); // ID do campo 01
		  
		  if ($(this).val() === 'sim') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	$('#tipoDemanda').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#spotServico'); // ID do campo 01
		  var campo2 = $('#valorServico'); // ID do campo 01

		  if ($(this).val() === 'spot') {
		    campo1.prop('readonly', false);
		    //campo1.enable();d
		    campo2.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    campo2.prop('readonly', true);		  
		  }
		  console.log($(this).val());
	});
	
	$('#profissionalVistoria').on('change', function () {
		console.log("Executou");
		var campo1 = $('#zoomTecProprio');
		var campo2 = $('#zoomBuscaCredenciado');
		var campo10 = $('#zoomBuscaResponsavelCred');
		var campo3 = $('#nomeRespVistoria');
		var campo4 = $('#cpfRespVistoria');
		var campo5 = $('#regTecRespVistoria');
		var campo6 = $('#telRespConfirVistoria');
		var campo7 = $('#emailRespConfirVistoria');
		var campo8 = $('#zoomTipoServico');
		var campo9 = $('#registroTecProprio');
		

		if ($(this).val() == 'cred') {
			campo1.prop('disabled', true);
			campo2.prop('disabled', false);
			campo10.prop('disabled', false);
			campo3.prop('readonly', false);
			campo4.prop('readonly', false);
			campo5.prop('readonly', false);
			campo6.prop('readonly', false);
			campo7.prop('readonly', false);
			campo8.prop('disabled', false).val('Segurança');
			campo9.prop('readonly', true).val('');
			window["zoomTecProprio"].clear();

		} else if ($(this).val() == 'RHVIDA' || $(this).val() == 'RHMED') {
			campo1.prop('disabled', false);
			campo2.prop('disabled', true);
			campo10.prop('disabled', true);
			campo3.prop('readonly', true).val('');
			campo4.prop('readonly', true).val('');
			campo5.prop('readonly', true).val('');
			campo6.prop('readonly', true).val('');
			campo7.prop('readonly', true).val('');
			campo8.prop('disabled', true).val('');
			window["zoomBuscaCredenciado"].clear();
			window["zoomBuscaResponsavelCred"].clear();
			window["zoomTipoServico"].clear();

		} else {
			campo1.prop('disabled', true).val('');
			campo2.prop('disabled', true).val('');
			campo10.prop('disabled', true).val('');
			campo3.prop('readonly', true).val('');
			campo4.prop('readonly', true).val('');
			campo5.prop('readonly', true).val('');
			campo6.prop('readonly', true).val('');
			campo7.prop('readonly', true).val('');
			campo8.prop('disabled', true).val('');
			campo9.prop('readonly', true).val('');
			window["zoomBuscaCredenciado"].clear();
			window["zoomBuscaResponsavelCred"].clear();
			window["zoomTecProprio"].clear();
			window["zoomTipoServico"].clear();
			}
		
			console.log($(this).val());
			
			reloadZoomFilterValues("zoomTipoServico", "COD_PLATAFORMA," + $("#codPlataforma").val());
	});
	
	$('#docAprov').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#motReprov'); // ID do campo 01
		  
		  if ($(this).val() === 'nao') {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	$('#criterioAtendimento').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#ZoomNumeroSolicitacao'); // ID do campo 01
		  
		  if ($(this).val() === 'atualizacao') {
		    campo1.prop('disabled', false);
		    //campo1.enable();
		 
		  } else if ($(this).val() === 'vistoriaAtual') {
			    campo1.prop('disabled', false);
			    //campo1.enable();
		  
		  } else {
		    campo1.prop('disabled', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	/*
	$('#checkPCMSO').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorPCMSO'); // ID do campo 01
		  
		  if ($(this).val() === "pcmso") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})
	
	
	$('#checkPGR').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorPGR'); // ID do campo 01
		  
		  if ($(this).val() === "pgr") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})
	
	$('#checkAE').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorAE'); // ID do campo 01
		  
		  if ($(this).val() === "ae") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})
	
	$('#checkLTCAT').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorLTCAT'); // ID do campo 01
		  
		  if ($(this).val() === "ltcat") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})
	
	$('#checkLaudoAmb').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorLaudoAmb'); // ID do campo 01
		  
		  if ($(this).val() === "laudoIns") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})
	
	$('#checkRotaFuga').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#valorRotaFuga'); // ID do campo 01
		  
		  if ($(this).val() === "laudoPeric") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	})*/

	$('#checkOutros').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#docOutros'); // ID do campo 01
		  
		  if ($(this).val() === "outros") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	$('#envAtualizacao').on('change', function () {
		console.log("Executou");
		  var campo1 = $('#motReprovCliente'); // ID do campo 01
		  
		  if ($(this).val() === "sim") {
		    campo1.prop('readonly', false);
		    //campo1.enable();
		 
		  } else {
		    campo1.prop('readonly', true).val('');
		    //campo1.disable();
		    		  
		  }
		  console.log($(this).val());
	});
	
	$("#codBuscaUnidade").on("change", (event) => {
		let codigoUnidade = event.target.value;
		if(codigoUnidade != ""){
			preencherVidasAtivas();
		}
	});

	console.log("CURRENT_STATE: "+CURRENT_STATE);
	if(CURRENT_STATE == "21"){
		const codPlataforma = $("#codPlataforma").val();
		setTimeout(() => {
			liberaCamposEmpresa(codPlataforma);
			const criterioAtendimento = $("#criterioAtendimento").val();
			if(criterioAtendimento == "vistDoc" || criterioAtendimento == "doc"){
				$("#ZoomNumeroSolicitacao").prop('disabled', true);
			}else{
				$("#ZoomNumeroSolicitacao").prop('disabled', false);
			}
		}, 1000);
	}

	if(CURRENT_STATE != "0" && CURRENT_STATE != "4"){
		const zoomPlataforma = $("#zoomPlataforma").val();
		console.log("zoomPlataforma: "+zoomPlataforma);
		if(zoomPlataforma == "EVIDAMED" || zoomPlataforma == "SOC"){
			$("#divNomeBuscaUnidade").hide();
		}
		if(zoomPlataforma == "SOC NET"){
			$("#divNomeBuscaUnidade").show();
			$("#divNomeFilial").hide();
		}
	}
}); 

window.onload = function(){
 	myLoading2 = FLUIGC.loading(window);
 	carregarFormulario();
}

function load(obj){
	myLoading2.show();
	setTimeout(function() {
		  //fornecedor(obj);
		  myLoading2.hide();
	}, 500);
}

function carregarFormulario(){
	try{
		var atividade = getWKNumState();
		var modo = getFormMode();
		var esconde1 = false;
		
		if ((atividade == 0) || (atividade == 4) || (atividade == 21) || (atividade == 38) || (atividade == 43)){
			validaZoom();
		}
		
		if (atividade == 21){
			manterRegrasOnchange();
		}
						
		preencheAcompanhamento();
	

		if ($("#documentoAnexo").val() == "" || $("#documentoAnexo").val() == null || $("#documentoAnexo").val() == undefined){
				esconde1 = true;
		} 

		if (esconde1) {
			$("#btnViewer").hide();
			$("#btnDownload").hide();
		}
	} catch (e){
		exibirMensagem("Anexo", "Erro ao anexar", "danger");
	} // try catch
} // carregarFormulario

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
} // exibirMensagem

function setSelectedZoomItem(selectedItem) {
	
	if ( selectedItem.inputId == "zoomPlataforma" ) {
		$("#codPlataforma").val(selectedItem["COD_PLATAFORMA"]);
		liberaCamposEmpresa(selectedItem["COD_PLATAFORMA"]);
		window["solicRazaoSocialEmp"].clear();
		window["solicRegional"].clear();
		window["nomeUnidFilial"].clear();
		reloadZoomFilterValues("solicRazaoSocialEmp", "COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);

		if(selectedItem["PLATAFORMA"] == "SOC NET"){
			FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar código e nome da unidade',type: 'warning'});
			$("#codNomeBuscaUnidade").parent().show();
			$("#codNomeBuscaUnidade").prev().addClass("required");
			$("#nomeUnidFilial").parent().hide();
			$("#nomeUnidFilial").prev().removeClass("required");
		}else{
			$("#codNomeBuscaUnidade").parent().hide();
			$("#codNomeBuscaUnidade").prev().removeClass("required");
			$("#nomeUnidFilial").parent().show();
			$("#nomeUnidFilial").prev().addClass("required");
		}

	}
	
	if ( selectedItem.inputId == "solicRazaoSocialEmp" ) {
		$("#codBuscaEmpresa").val(selectedItem["COD_EMPRESA"]);
		console.log(selectedItem);
		window["solicRegional"].clear();
		window["nomeUnidFilial"].clear();
		reloadZoomFilterValues("solicRegional", "COD_EMPRESA," + selectedItem["COD_EMPRESA"]);
		reloadZoomFilterValues("nomeUnidFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"]);
	}
	
	if ( selectedItem.inputId == "solicRegional" ) {
		$("#codBuscaRegional").val(selectedItem["COD_REGIONAL"]);
		console.log(selectedItem)
		window["nomeUnidFilial"].clear();
		reloadZoomFilterValues("nomeUnidFilial", "COD_EMPRESA," + selectedItem["COD_EMPRESA"] + ",COD_PLATAFORMA," + selectedItem["COD_PLATAFORMA"] + ",COD_REGIONAL," + selectedItem["COD_REGIONAL"]);
	}
	
	if ( selectedItem.inputId == "zoomTipoServico" ) {
		$("#codTipoServico").val(selectedItem["COD_SERVICO"]);
		console.log(selectedItem);
		window["zoomBuscaCredenciado"].clear();
		reloadZoomFilterValues("zoomBuscaCredenciado", "COD_SERVICO," + selectedItem["COD_SERVICO"] + ",COD_PLATAFORMA," + $("#codPlataforma").val());
	}
	
	if ( selectedItem.inputId == "zoomBuscaCredenciado" ) {
		$("#codBuscaCredenciado").val(selectedItem["COD_CREDENCIADO"]);
		console.log(selectedItem);
		window["zoomBuscaResponsavelCred"].clear();
		reloadZoomFilterValues("zoomBuscaResponsavelCred", "COD_CREDENCIADO," + selectedItem["COD_CREDENCIADO"]);
	}
	
	if ( selectedItem.inputId == "zoomBuscaResponsavelCred" ) {
		$("#nomeRespVistoria").val(selectedItem["RESPONSAVEL"]);
		$("#cpfRespVistoria").val(selectedItem["CPF"]);
		$("#regTecRespVistoria").val(selectedItem["REG"]);
		$("#telRespConfirVistoria").val("(" + selectedItem["DDD"] + ")" + selectedItem["CELULAR"]);
		$("#emailRespConfirVistoria").val(selectedItem["EMAIL"]);
	}
	
	
	if ( selectedItem.inputId == "zoomADM" ) {
		$("#codADM").val(selectedItem["MATRICULA"]);
	}
	
	if ( selectedItem.inputId == "zoomTST" ) {
		$("#codTST").val(selectedItem["MATRICULA"]);
	}
	
	if ( selectedItem.inputId == "zoomTecProprio" ) {
		$("#codTecProprio").val(selectedItem["colleagueId"]);
		$("#registroTecProprio").val(selectedItem["especializationArea"]);
	}
	

	
    /*EXEMPLO PAI x FILHO*/
	if ( selectedItem.inputId.match(/tes___/) ){
		var id = selectedItem.inputId.split("___")[1];
		$("#codTes___"+id).val(selectedItem["CODIGO"]);
	}
}
function removedZoomItem(removedItem) {		
	if (removedItem.inputId == "zoomADM") {
		$("#codADM").val("");
	}
	
	if (removedItem.inputId == "zoomTST") {
		$("#codTST").val("");
	}
	
	if (removedItem.inputId == "zoomTecProprio") {
		$("#registroTecProprio").val("");
		$("#codTecProprio").val("");
	}
	
	if (removedItem.inputId == "solicRazaoSocialEmp") {
		$("#codBuscaEmpresa").val("");
		$("#solicRegional").val("");
		$("#codBuscaRegional").val("");
		$("#nomeUnidFilial").val("");
		$("#codBuscaUnidade").val("");
		$("#setorEmpresa").val("");
		$("#postoTrabEmpresa").val("");
	}
	
	if (removedItem.inputId == "solicRegional") {
		$("#codBuscaRegional").val("");
		$("#nomeUnidFilial").val("");
		$("#codBuscaUnidade").val("");
		$("#setorEmpresa").val("");
		$("#postoTrabEmpresa").val("");
	}
	
	if (removedItem.inputId == "nomeUnidFilial") {
		$("#codBuscaUnidade").val("");
		$("#setorEmpresa").val("");
		$("#postoTrabEmpresa").val("");
	}
	
	if (removedItem.inputId == "zoomTipoServico") {
		window["zoomBuscaCredenciado"].clear();
		window["zoomBuscaResponsavelCred"].clear();
		$("#nomeRespVistoria").val("");
		$("#cpfRespVistoria").val("");
		$("#regTecRespVistoria").val("");
		$("#telRespConfirVistoria").val("");
		$("#emailRespConfirVistoria").val("");
		exibirMensagem("",'Limpando dados do credenciado...');
	}
	
	if (removedItem.inputId == "zoomBuscaCredenciado") {
		window["zoomTipoServico"].clear();
		window["zoomBuscaResponsavelCred"].clear();
		$("#nomeRespVistoria").val("");
		$("#cpfRespVistoria").val("");
		$("#regTecRespVistoria").val("");
		$("#telRespConfirVistoria").val("");
		$("#emailRespConfirVistoria").val("");
		exibirMensagem("",'Limpando dados do credenciado...');
	}
	
	if (removedItem.inputId == "zoomBuscaResponsavelCred") {
		window["zoomTipoServico"].clear();
		window["zoomBuscaCredenciado"].clear();
		$("#nomeRespVistoria").val("");
		$("#cpfRespVistoria").val("");
		$("#regTecRespVistoria").val("");
		$("#telRespConfirVistoria").val("");
		$("#emailRespConfirVistoria").val("");
		exibirMensagem("",'Limpando dados do credenciado...');
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
/* Máscaras ER */
function mascaraMutuario(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmascara()',1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}
function cpfCnpj(v){
 
    //Remove tudo o que não é dígito
    v=v.replace(/\D/g,"")
 
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
function aplicaMask(){
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);
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
} // consultarCEP()
function validaZoom(){
	$(document).on('select2:opening', function (e) {
		let campo = "";
		var id = e.target.id;		
		$("#alert_template").remove();
		
		if(id == "solicRazaoSocialEmp" && ($("#zoomPlataforma").val() == null || $("#zoomPlataforma").val().length == 0)){
			campo = "Plataforma";
		}

		if(id == "solicRegional" && ($("#solicRazaoSocialEmp").val() == null || $("#solicRazaoSocialEmp").val().length == 0)){
			campo = "Empresa";
		}
		
		if(id == "nomeUnidFilial" && ($("#solicRazaoSocialEmp").val() == null || $("#solicRazaoSocialEmp").val().length == 0)){
			campo = "Empresa e/ou Regional";
		}
		
		if((id == "nomeUnidFilial") && ($("#plataforma").val() == "evidamed") && ($("#solicRegional").val() == null || $("#solicRegional").val().length == 0)){
			campo = "Regional";
		}
				
		if((id == "nomeUnidFilial") && ($("#plataforma").val() == "soc") && ($("#solicRazaoSocialEmp").val() == null || $("#solicRazaoSocialEmp").val().length == 0)){
			campo = "Empresa";
		}
		
		if((id == "ZoomNumeroSolicitacao") && ($("#criterioAtendimento").val() == null || $("#criterioAtendimento").val().length == 0)){
			campo = "Critério de Atendimento";
		}
		
		//credenciado & tec Proprio
		if(id == "zoomTecProprio" && ($("#profissionalVistoria").val() == null || $("#profissionalVistoria").val().length == 0)){
			campo = "Profissional Vistoria";
		}
		
		if(id == "zoomTipoServico" && ($("#profissionalVistoria").val() == null || $("#profissionalVistoria").val().length == 0)){
			campo = "Profissional Vistoria";
		}
		
		if((id == "zoomBuscaCredenciado") && ($("#zoomTipoServico").val() == null || $("#zoomTipoServico").val().length == 0)){
			campo = "Tipo de Serviço";
		}
		
		if((id == "zoomBuscaResponsavelCred") && ($("#zoomBuscaCredenciado").val() == null || $("#zoomBuscaCredenciado").val().length == 0)){
			campo = "Credenciado";
		}
		
		if(campo != ""){
			e.preventDefault();
			$(e.target).parent().append(Mustache.render($(".alerta-zoom").html(), { campo : campo }));
			setTimeout(function() { 
				$("#alert_template").remove();
			}, 2000);
		}
	});
}
function liberaCamposEmpresa(codPlataforma){
console.log(codPlataforma);
var campo1 = $('#solicRegional'); // ID do campo 01
var campo2 = $('#postoTrabEmpresa'); // ID do campo 02

	if (codPlataforma == 'evidamed') {
		campo1.prop('disabled', false);
		campo2.prop('readonly', false);
	
	} else if(codPlataforma == 'soc'){
		campo1.prop('disabled', true).val('');
		campo2.prop('readonly', true).val('');
  
	} else {
		campo1.prop('disabled', false).val('');
		campo2.prop('readonly', false).val('');  
	}
}
function manterRegrasOnchange() {
	console.log("RUN manterRegrasOnchange()");
	
	//valores dos campos
	var campoTipoDemanda = $('#tipoDemanda').val();
	var campoTipoSolicitacao = $('#tipoSolicitacao').val();
	var campoOutros = $('#checkOutros').val();
	var campoCriterioAtendimento = $('#criterioAtendimento').val();
	var campoZoomNumeroSolicitacao = $('#ZoomNumeroSolicitacao');
	
	//CamposOnChange
	if (campoTipoDemanda == "spot") {
		$('#valorServico').prop('readonly', false);
	}
	
	if (campoTipoSolicitacao == "revisao") {
		$('#motivoSolicitacao').prop('readonly', false);
	}
	
	if (campoOutros == "outros") {
		$('#matOutros').prop('readonly', false);
	}
	
	if (campoCriterioAtendimento != "vistoriaAtual") {
		campoZoomNumeroSolicitacao.attr('disabled', true);
	}
}