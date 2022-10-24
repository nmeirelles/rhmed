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
	})
	
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
	})
	
	$('#plataforma').on('change', function () {
		  var campo1 = $('#solicRegional'); // ID do campo 01
		  var campo2 = $('#postoTrabEmpresa'); // ID do campo 01
	
		  if ($(this).val() === 'evidamed') {
		    campo1.prop('readonly', false);
		    campo2.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		    campo2.prop('readonly', true).val('');
		  }
	})
	
	$('#tipoDemanda').on('change', function () {
		  var campo1 = $('#spotServico'); // ID do campo 01
		  var campo2 = $('#valorServico'); // ID do campo 01

		  if ($(this).val() === 'spot') {
		    campo1.prop('readonly', false);
		    campo2.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		    campo2.prop('readonly', true);		  
		  }
	})
	
	$('#profissionalVistoria').on('change', function () {
		  var campo1 = $('#razaoSocialCred'); // ID do campo 01
		  var campo2 = $('#cnpjCred'); // ID do campo 01

		  if ($(this).val() == 'cred') {
		    campo1.prop('readonly', false);
		    campo2.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		    campo2.prop('readonly', true).val('');		  
		  }
	})
	
	$('#docAprov').on('change', function () {
		  var campo1 = $('#motReprov'); // ID do campo 01
		  
		  if ($(this).val() === 'nao') {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#criterioAtendimento').on('change', function () {
		  var campo1 = $('#numeroSolicitacao'); // ID do campo 01
		  
		  if ($(this).val() === 'atualizacao') {
		    campo1.prop('readonly', false);
		  } else if ($(this).val() === 'vistoriaAtual') {
			campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#checkPPRA').on('change', function () {
		var campo1 = $('#valorPPRA'); // ID do campo 01
		  
		if ($(this).val() === "ppra") {
			campo1.prop('readonly', false);
		} else {
		    campo1.prop('readonly', true).val('');
		}
	})
	
	
	$('#checkPGR').on('change', function () {
		  var campo1 = $('#valorPGR'); // ID do campo 01
		  
		  if ($(this).val() === "pgr") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#checkAE').on('change', function () {
		  var campo1 = $('#valorAE'); // ID do campo 01
		  
		  if ($(this).val() === "ae") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#checkLTCAT').on('change', function () {
		  var campo1 = $('#valorLTCAT'); // ID do campo 01
		  
		  if ($(this).val() === "ltcat") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#checkLaudoAmb').on('change', function () {
		  var campo1 = $('#valorLaudoAmb'); // ID do campo 01
		  
		  if ($(this).val() === "laudoIns") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#checkRotaFuga').on('change', function () {
		  var campo1 = $('#valorRotaFuga'); // ID do campo 01
		  
		  if ($(this).val() === "laudoPeric") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})

	$('#checkOutros').on('change', function () {
		  var campo1 = $('#docOutros'); // ID do campo 01
		  
		  if ($(this).val() === "outros") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	$('#envAtualizacao').on('change', function () {
		  var campo1 = $('#motReprovCliente'); // ID do campo 01
		  
		  if ($(this).val() === "sim") {
		    campo1.prop('readonly', false);
		  } else {
		    campo1.prop('readonly', true).val('');
		  }
	})
	
	/*$('#plataforma').on('change', function () {
		var value = $(this).val();
	    if (value != "") {
		//alert("EXECUTAR FUNÇÃO")
	    	reloadZoomFilterValues("solicRazaoSocialEmp", "PLATAFORMA", $(this).val());
	    	var e1 = DatasetFactory.createConstraint("PLATAFORMA", value, value, ConstraintType.MUST);
	    	var constraints = new Array(e1);
	    	var dataset = DatasetFactory.getDataset("dsEvidamedSocEmpresa", null, constraints, null);
	    	console.log(dataset);
		}
	})*/
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
	if ( selectedItem.inputId == "zoomADM" ) {
		$("#codADM").val(selectedItem["colleagueId"]);
	}
	
	if ( selectedItem.inputId == "zoomTST" ) {
		$("#codTST").val(selectedItem["colleagueId"]);
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
	
	if (dataset == undefined || dataset.values == undefined){
		exibirMensagem("Atenção", 'CEP não encontrado.', 'warning');
		return false;
	//} // if
	//if(dataset.values.length > 0 && dataset.columns[0] == "ERROR"){
	//	var mensagemErro = dataset.values[0].MESSAGE_ERROR;
	//	exibirMensagem("Atenção", mensagemErro, 'warning');
	} else {
		if (dataset.values.length > 0){
			exibirMensagem("", 'Bucando o Endereço...', 'info');
			$("#logradouro").val(dataset.values[0].LOGRADOURO);
			$("#bairro").val(dataset.values[0].BAIRRO);
			$("#nomeCidade").val(dataset.values[0].CIDADE);
			$("#nomeUF").val(dataset.values[0].UF);
		} else {
			exibirMensagem("Atenção", 'CEP não encontrado.', 'warning');
			}
		}// else if
} // consultarCEP()

function habilitaCamposCredenciado(event){
	
	if (input.value == "cred"){
		document.getElementById("").removeAttribute("readonly", true);
	} 
	else if (input.value == "rhmed" || input.value == "rhvida") {
		document.getElementById("").setAttribute("readonly", true);
	}
}