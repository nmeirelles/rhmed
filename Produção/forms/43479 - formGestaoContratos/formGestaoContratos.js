$(document).ready(function() {

	$("#inputImpactoAnualReajuste").on("change", (event) => {
		let impactoAnual = event.target.value;
		if(impactoAnual != "") determinaDestino();
	});

	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		if($("#tipoRequisicao").val() == "aditivo"){
			$("#idSolicitacao").val('ACF - '+$("#numeroFluxo").val())
		}else if($("#tipoRequisicao").val() == "pleito"){
			$("#idSolicitacao").val('ACF - '+$("#numeroFluxo").val())	
		}		
	}

	$("#aprovacaoCoordenador").val('');

	$("#valorTotalDocumento").on('change', (event) => {
		let valor = event.target.value;
		if(valor != "") determinaDestino();
	});

	$("#planilhaModelo").on('click', () => {
		var request_data = {
			url: '/api/public/ecm/document/downloadURL/45720',
			method: 'GET',
			data: {}
		}
		$.ajax({
			contentType : "application/json",
			url: request_data.url,
			type: request_data.method,
			data: request_data.data,
		})
		.done(function(data) {
			console.log(data);
			window.open(data.content , '_blank');
		})
	});
	//Change Campo do Tipo de Requisição, para exibição do Painel de Questionário
	$("#tipoRequisicao").on('change', (event) => {
		$("#inputQuestionario2").val('');
		$("#inputQuestionario2_1").val('');
		$("#inputQuestionario1").val('');
		$("#inputQuestionario1_1").val('');
		$("#inputQuestionario5").val('');
		$("#inputQuestionario5_1").val('');
		$("#inputQuestionario6").val('');
		$("#inputQuestionario6_1").val('');
		$("#divJustQualiAtend1").css('display','none');
		$("#divJustQualiAtend2").css('display','none');
		$("#divJustQualiAtend3").css('display','none');
		let valorSelecionado = event.target.value;
		if(valorSelecionado == "pleito" || valorSelecionado == "reajuste"){
			$("#divQuestionario").css('display','block');
		}else{
			$("#divQuestionario").css('display','none');			
		} 
		
		if(valorSelecionado == "aditivo"){
			$("#divReajusteConcedido").css('display','none');
		}else{
			$("#divReajusteConcedido").css('display','block');
		}
	});
	//Change da qualidade de atendimento principal, para exibição da justificativa
	$("#selectQuestionario3").on('change', (event) => {
		let valorSelecionado = event.target.value;
		if(valorSelecionado == "regular" || valorSelecionado == "ruim" || valorSelecionado == "pessimo"){
			$("#divJustQualiAtend").css('display','block');
		}else{
			$("#divJustQualiAtend").css('display','none');
		}
	});
	//Change da qualidade de atendimento do Fornecedor 1, para exibição da justificativa
	$("#inputQuestionario1_1").on('change', (event) => {
		let valorSelecionado = event.target.value;
		if(valorSelecionado == "regular" || valorSelecionado == "ruim" || valorSelecionado == "pessimo"){
			$("#divJustQualiAtend1").css('display','block');
		}else{
			$("#divJustQualiAtend1").css('display','none');
		}
	});
	//Change da qualidade de atendimento do Fornecedor 2, para exibição da justificativa
	$("#inputQuestionario5_1").on('change', (event) => {
		let valorSelecionado = event.target.value;
		if(valorSelecionado == "regular" || valorSelecionado == "ruim" || valorSelecionado == "pessimo"){
			$("#divJustQualiAtend2").css('display','block');
		}else{
			$("#divJustQualiAtend2").css('display','none');
		}
	});
	//Change da qualidade de atendimento do Fornecedor 3, para exibição da justificativa
	$("#inputQuestionario6_1").on('change', (event) => {
		let valorSelecionado = event.target.value;
		if(valorSelecionado == "regular" || valorSelecionado == "ruim" || valorSelecionado == "pessimo"){
			$("#divJustQualiAtend3").css('display','block');
		}else{
			$("#divJustQualiAtend3").css('display','none');
		}
	});
	$("#inputQuestionario4").on('change', (event)=> {
		let valorTotal = event.target.value;
		$("#valorRequisicao").val(valorTotal);
		$("#valorTotalDocumento").val(valorTotal);
		determinaDestino();
	});
	
	preencheAcompanhamento();
	determinaDestino();

	//Busca de Fornecedores
	const buscaFornecedores = (valorPesquisado, tipoBusca) => {
		let myLoading = FLUIGC.loading(window);
		let cnpjFornecedor = '';
		let codigoFornecedor = '';
		let pesq = '';
		if(tipoBusca == "cpf" || tipoBusca == "cnpj") cnpjFornecedor = valorPesquisado;
		if(tipoBusca == "codigo") codigoFornecedor = valorPesquisado.toUpperCase();
		if(tipoBusca == "nome") pesq = valorPesquisado.toUpperCase();
		myLoading.show();
		console.log(`Tipo de Busca: ${tipoBusca}\nCNPJ: ${cnpjFornecedor}\nCódigo: ${codigoFornecedor}\nPesq: ${pesq}`);
		const c1 = DatasetFactory.createConstraint("codforn", codigoFornecedor, "", ConstraintType.MUST);
		const c2 = DatasetFactory.createConstraint("cnpj", cnpjFornecedor, "", ConstraintType.MUST);
		const c3 = DatasetFactory.createConstraint("pesq", pesq, "", ConstraintType.MUST);
		DatasetFactory.getDataset("dsBuscaFornecedores_3", null, [c1,c2,c3], null, {
			success: function(result){
				console.log(result);
					if(result.values[0].Error != ""){
						console.log(result.values[0].Error);
						myLoading.hide(); 
						let erroRetorno = result.values[0].Error;
						if(erroRetorno.indexOf("INTERNAL SERVER ERROR") !== -1){
							FLUIGC.toast({title: 'Erro: ', message: "Problemas de Integração com Protheus, favor acionar a equipe de TI!", type: 'warning'});
						}else{
							let splitError = erroRetorno.split("ERROR : ");
						FLUIGC.toast({title: 'Erro: ', message: splitError[1], type: 'warning'});
						}
				}else{
					FLUIGC.modal({
						title: 'Fornecedores',
						content: 
								'<table id="tableModalFornecedor" tablename="tableModalFornecedor" class="table table-datatable table-bordered table-hover table-responsive">'+
									'<thead>'+
										'<tr>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">AGENCIA</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">BANCO</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">CNPJ</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">CODIGO</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">CONTA</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">FORMA PGTO</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">LOJA</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">NOME</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">TIPO CONTA</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">CIDADE</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">UF</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
									'</tbody>'+
								'</table>',
						id: 'modalFornecedores',
						size: 'large'
					}, (error, data) => {
						if(error){
							myLoading.hide(); 
							$('#modalFornecedores').modal('toggle');
							FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
						}else{
							for(let i = 0; i < result.values.length; i++){
								let item = result.values[i];
								console.log(item);
								let agencia = item.Agencia;
								let banco = item.Banco;
								let cnpj = item.CNPJ;
								let codForn = item.CodForn;
								let conta = item.Conta;
								let formaPag = item.FormaPag;
								let loja = item.LojaForn;
								let nome = item.Nome;
								let tipoConta = item.TipoConta;
								let MUNICIPIO = item.MUNICIPIO;
								let UF = item.UF;
								let error = item.error;
								$('#tableModalFornecedor tbody').append(
									'<tr class="fs-txt-center">'+
										'<td class="fs-no-margin fs-no-padding">'+agencia+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+banco+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+cnpj+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+codForn+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+conta+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+formaPag+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+loja+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+nome+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+tipoConta+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+MUNICIPIO+'</td>'+
										'<td class="fs-no-margin fs-no-padding">'+UF+'</td>'+
									'</tr>'
								);
							}
							myLoading.hide(); 
							$("#tableModalFornecedor").on('click', 'tr', function(){
								const tableData = $(this).children("td").map(function(){
									return $(this).text();
								}).get(); // cria um array que mapeia os dados
								let agencia = tableData[0];
								let banco = tableData[1];
								let cnpj = tableData[2];
								let codForn = tableData[3];
								let conta = tableData[4];
								let formaPag = tableData[5];
								let loja = tableData[6];
								let nome = tableData[7];
								let tipoConta = tableData[8];
								let MUNICIPIO = tableData[9];
								let UF = tableData[10];
								if(codForn != undefined){
									$("#inputCodFornecedor").val(codForn);
									$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#codFornecedor").val(codForn);
									$("#nomeFornecedor").val(nome);
									$("#inputCidade").val(MUNICIPIO);
									$("#inputUF").val(UF);
									$("#cnpj").val(cnpj);
									$("#loja").val(loja);
									$("#bancoPag").val(banco);
									$("#agenciaPag").val(agencia);
									$("#contaPag").val(conta);
									$('#modalFornecedores').modal('toggle');
								}
							});
						}
					});
				}
			},
			error: function(err){
				myLoading.hide(); 
				$('#modalFornecedores').modal('toggle');
				console.log(err);
				FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
			}
		});
	}
	$("#inputFornecedor").on('keyup', (event) => {
		if(event.keyCode == 13){
			const valorPesquisado = event.target.value;
			const tipoBusca = $("#selectTipoBusca").val();
			if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
			else buscaFornecedores(valorPesquisado, tipoBusca);
		}
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Inicio
	$("#consultaFornecedor").on('click', () => {
		const valorPesquisado = $("#inputFornecedor").val();
		const tipoBusca = $("#selectTipoBusca").val();
		if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
		else buscaFornecedores(valorPesquisado, tipoBusca);		
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Fim

	let nrAtividade = $("#nrAtividade").val();

	if(nrAtividade != 0 && nrAtividade != 4 && nrAtividade != 86){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}

	$($(window.top.document).find("#observationArea")).css("display","none");

	$("#dataEmissaoNota").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataEmissaoNota").val();

		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data Sugerida para Entrega não pode ser menor que a data atual!',type: 'warning'});
				$("#dataEmissaoNota").focusout().val("");
			}
		}
	});

	const datasetFiliais = DatasetFactory.getDataset("dsCadastroFiliaisACF", null, null, null);
	console.log("datasetFiliais");
	console.log(datasetFiliais);
	let zoomFilial = $('#zoomFilial').val();
	if(datasetFiliais != null && datasetFiliais.values.length > 0){
		$('#zoomFilial').empty();
		$('#zoomFilial').append('<option value=""></option>');
		for(let i = 0; i < datasetFiliais.values.length; i++){
			let cnpjFilial = datasetFiliais.values[i].cnpjFilial;
			console.log("cnpjFilial: "+cnpjFilial);
			let Filial = datasetFiliais.values[i].Filial;
			if(Filial != ""){
				$('#zoomFilial').append('<option value="' + Filial + '">' + Filial + '</option>');
			}		
		}
		if(zoomFilial != "") $('#zoomFilial').val(zoomFilial);
	}
	/* $('#zoomFilial').on("change", (event) => {
		console.log("Change Filial")
		let selectFilial = event.target.value;
		console.log(selectFilial);
		if (selectFilial != ""){
			const c1_2 = DatasetFactory.createConstraint("cnpjFilial", selectFilial, selectFilial, ConstraintType.MUST);
			const datasetFiliais = DatasetFactory.getDataset("dsCadastroFiliaisACF", null, [c1_2], null);
			console.log(datasetFiliais);
			if(datasetFiliais != null && datasetFiliais.values.length > 0){
				let cnpj = datasetFiliais.values[0].cnpjFilial;
				let filial = datasetFiliais.values[0].Filial;
				$("#cnpjFilial").val(cnpj);
			}
		}else{
			$("#cnpjFilial").val('');
		}
	}); */
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
			determinaDestino();
		},
		error: (error) => {
			console.log(error);
		}
	});

}

function ocultaDivBoleto(tipo){
	if(tipo.value != "Boleto"){
		$("#divNumeroBoleto").addClass('hide');
	}else{
		$("#divNumeroBoleto").removeClass('hide');

	}
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

function setSelectedZoomItem(selectedItem) {
    let nrLine = (selectedItem.inputId).split("___")[1];
    // if(selectedItem.inputId == 'zoomCodItem___'+nrLine){
    //     $("#itemDescricao___"+nrLine).val(selectedItem.dESCRI);
	// 	$("#unidadeMedida___"+nrLine).val(selectedItem.uNIMED);
	// 	$("#CodItem___"+nrLine).val(selectedItem.cODPROD);
    // }
    if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
		$("#empresaCod").val(selectedItem.Empresa);
		$("#codFilial").val(selectedItem.codFilial);
	}
	if(selectedItem.inputId == 'zoomCentroCusto'){
		var ccusto = selectedItem.ccusto;
		var id = ccusto.split(" - ")[0].replace(/\./g,"");
		$("#idCentroCusto").val(id);
		carregaAprovadores(selectedItem.ccusto);
	}
	if(selectedItem.inputId == 'zoomLocalEntrega'){
		$("#ruaFornecedor").val(selectedItem.endereco);
		$("#cidadeFornecedor").val(selectedItem.cidade);
		$("#estadoFornecedor").val(selectedItem.estado);
		$("#CEPFornecedor").val(selectedItem.cep);
		$("#telefoneFornecedor").val(selectedItem.telefone);
	}
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');
}

function fnCustomDelete(oElement){
	let id = oElement.id.split("___")[0];
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 4 || atividade == 86){
		if(id == "spanRemover") fnWdkRemoveChild(oElement);
		if(id == "spanRemoverFornecedores") fnWdkRemoveChild(oElement);
	}
}

function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 0 || atividade == 4 || atividade == 86){
		if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor")
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val())){
			if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("supervisor")
			}
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador");			
		}
	}
	if(atividade == 5){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
	if(atividade == 21){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
	if(atividade == 110){
		let dsFormSuporteAlcada = DatasetFactory.getDataset("ds_form_suporte_acf_alcadareajuste", null, null, null);
		let centroCusto = dsFormSuporteAlcada.values[0].centroCusto;
		let cCentroCusto = DatasetFactory.createConstraint("ccusto", centroCusto, centroCusto, ConstraintType.MUST);
		let dsCentroCusto = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, [cCentroCusto], null);
		let loginCoordenador = dsCentroCusto.values[0].coordenador;
		let loginGerente = dsCentroCusto.values[0].gerente;
		let loginDiretor = dsCentroCusto.values[0].diretor;
		let valorCoordenador = currencyToNumber(dsFormSuporteAlcada.values[0].coordenador);
		let valorGerente = currencyToNumber(dsFormSuporteAlcada.values[0].gerente);
		let valorDiretor = currencyToNumber(dsFormSuporteAlcada.values[0].diretor);
		let impactoAnual = currencyToNumber($("#inputImpactoAnualReajuste").val());
		if(impactoAnual <= valorCoordenador) $("#aprovadorDestino").val(loginCoordenador);
		else if(impactoAnual <= valorGerente) $("#aprovadorDestino").val(loginGerente);
		else if(impactoAnual <= valorDiretor) $("#aprovadorDestino").val(loginDiretor);
	}
}