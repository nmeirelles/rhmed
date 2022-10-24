$(document).ready(function() {
	let nrAtividade = $("#atividadeAtual").val();

	// $("#inputDataInicio").on('change', (e) => {
	// 	if(e.target.value != ""){
	// 		var mes = e.target.value.split("-")[1];
	// 		var ano = e.target.value.split("-")[0];
	// 		$("#inputMesInicio").val(mes);
	// 		$("#inputAnoInicio").val(ano);
	// 	}
	// });

	$("#aprovacaoCoordenador").val("");
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SCP - '+$("#numeroFluxo").val())
	}

	//Caso atividades sejam diferente de Inicio e Correção, desativa todos os recursos de anexar documentos padrões.
	if(nrAtividade != 0 && nrAtividade != 2 && nrAtividade != 26){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}

	//Oculta campos do painel de aprovações caso etapa não seja do RH	
	if(nrAtividade != 0 || nrAtividade != 2){
		let estudaAtual = $("#selectEstudaAtual").val();
		if(estudaAtual == "sim"){
			$(".qualCurso").show();
		}else{
			$(".qualCurso").hide();
		}
	}

	//Ocultar Complementos para não preencherem.
	$($(window.top.document).find("#observationArea")).css("display","none");

	//Preenche Div de Acompanhamento
	preencheAcompanhamento();

	//Carrega campos de Data e Hora
	var onlyDate = FLUIGC.calendar('.setData', {
		pickDate: true,
		pickTime: false
	});
	var onlyTime = FLUIGC.calendar('.setHora', {
		pickDate: false,
		pickTime: true
	});

	//Evento Change para todos os Selects
	$(".selectChange").on('change', (e) => {
		let valName = $(e.target).attr('name');

		//Ao selectionar o se estuda atualmente
		if(valName == "selectEstudaAtual"){
			let valSelected = $(e.target).val();
			let textSelected = $(e.target).find("option:selected").text();
			if(valSelected == "sim"){
				$(".qualCurso").show();
			}else{
				$(".qualCurso").hide();
			}
		}		
	})

	//Pega valores adicionados no formulário de Suporte - SPC Funcões para criar as options do select	
	const c1 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
	const dataset = DatasetFactory.getDataset("ds_SuporteSpcFuncoes", null, [c1], null);
	console.log(dataset);
	if(dataset != null && dataset.values.length > 0){
		for(let i = 0; i < dataset.values.length; i++){
			let funcao = dataset.values[i].inputFuncao;
			let funcaoSelecionada = $("#hiddenSelectFuncao").val();
			if(nrAtividade == 0 || nrAtividade == 2 || nrAtividade == 26){
				if(funcaoSelecionada != "" && funcaoSelecionada == funcao){
					$('#selectFuncao').append('<option value="' + funcao + '" selected>' + funcao + '</option>');
				}else{
					$('#selectFuncao').append('<option value="' + funcao + '">' + funcao + '</option>');
				}
			}else{
				if(funcaoSelecionada != "" && funcaoSelecionada == funcao){
					$('#_selectFuncao').append('<option value="' + funcao + '" selected>' + funcao + '</option>');
				}else{
					$('#_selectFuncao').append('<option value="' + funcao + '">' + funcao + '</option>');
				}
			}
		}
	}
});

function compararDatas(data1, data2){
	console.log("Data1: "+data1+"\nData2: "+data2);
	var date1 = new Date(data1);
	var date2 = new Date(data2);

	if(date1 < date2) return true;
	if(date1 > date2) return false;
}

function carregaAprovadores(selectedItem){
	let centroCusto = selectedItem;
	let c1 = DatasetFactory.createConstraint("ccusto", centroCusto, centroCusto, ConstraintType.MUST);
	let constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, constraints, null);
	$("#aprovadorGerente").val(dataset.values[0].gerente);
	$("#aprovadorSupervisor").val(dataset.values[0].supervisor);
	$("#aprovadorCoordenador").val(dataset.values[0].coordenador);
	$("#aprovadorDiretor").val(dataset.values[0].diretor);

	DatasetFactory.getDataset("dsValoresAtribuicao", null, null, null,{
		success: (result) => {
			$("#valorGerente").val(result.values[0].gerente);
			$("#valorSupervisor").val(result.values[0].supervisor);
			$("#valorCoordenador").val(result.values[0].ccusto);
			$("#valorDiretor").val(result.values[0].diretor);			
			//determinaDestino();
		},
		error: (error) => {
			console.log(error);
		}
	});
}

function currencyToNumber(numero) {
	if(numero!=null && numero!=undefined && numero!=''){
		numero = numero.split(',');
		numero[0] = numero[0].split('.').join('');
		return parseFloat(numero.join('.'))
	}else{
		return 0
	}
}

function numberToCurrency(numero) {
    var numero = parseFloat(numero).toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}

function setZoomData(instance, value){
    window[instance].setValue(value);
}

function setSelectedZoomItem(selectedItem) {
	let inputId = selectedItem.inputId;
	if(selectedItem.inputId == 'zoomCentroCusto'){
		var ccusto = selectedItem.ccusto;
		var id = ccusto.split(" - ")[0].replace(/\./g,"");
		$("#idCentroCusto").val(id);
		carregaAprovadores(selectedItem.ccusto);
	}
	if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
        $("#empresaCod").val(selectedItem.Empresa);
		$("#codFilial").val(selectedItem.codFilial);
	}
}