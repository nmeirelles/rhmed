$(document).ready(function() {
	$("input[name='radioButtonCorreio']").parent().on("change", "input:radio", function(e){
		let statusCorreio = $("input[name='radioButtonCorreio']:checked").val();
		if(statusCorreio == "sim") {
			$("#inputRadioButtonCorreio").val("1");
			$("#divTaxaInlcusa").css('display', 'block'); 
			$("#divValorTaxa").css('display', 'block');
		}else{
			$("#inputRadioButtonCorreio").val("0");
			$("#divTaxaInlcusa").css('display', 'none'); 
			$("#divValorTaxa").css('display', 'none');
		}
	});
	$("input[name='radioTaxaInlcusa']").parent().on("change", "input:radio", function(e){
		let statusTaxa = $("input[name='radioTaxaInlcusa']:checked").val();
		if(statusTaxa == "sim") {
			$("#inputRadioTaxaInlcusa").val("1");			
		}else{
			$("#inputRadioTaxaInlcusa").val("0");
		}
	});
	$("#numBoleto").on('change', (event) => {
		let numeroBoleto = event.target.value;
		console.log("Número Boleto: "+numeroBoleto);
		var retiraPonto = numeroBoleto.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		console.log("Número Boleto: "+retiraEspaco);
		$("#numBoleto").val(retiraEspaco);
	});

	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SPS - '+$("#numeroFluxo").val())
	}

	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});

	$("#inputProduto").change('change', () => {
		$("#inputCodProduto").val('');
	});

	//carregaAprovadores()
	preencheAcompanhamento();
	//determinaDestino();
	
	$("#aprovacaoCoordenador").val('');

	$("#valorUnit").on('change', () => {
		calculoValorTotal();
	});
	$("#Quantidade").on('change', () => {
		calculoValorTotal();
	});

	//Busca de Produto	
	const buscaProduto = (produto) => {
		let myLoading = FLUIGC.loading(window);
		let codprod = '';
		let pesq = '';
		if(!isNaN(produto)) codprod = produto;
		else pesq = produto.toUpperCase();
		myLoading.show();
		console.log(`Código do Produto: ${codprod}\nDescrição do Produto: ${pesq}`);
		const c1 = DatasetFactory.createConstraint("codprod", codprod, "", ConstraintType.MUST);
		const c2 = DatasetFactory.createConstraint("pesq", pesq, "", ConstraintType.MUST);
		DatasetFactory.getDataset("dsBuscaProdutos_2", null, [c1,c2], null, {
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
						title: 'Produtos',
						content: 
								'<table id="tableModalProduto" tablename="tableModalProduto" class="table table-datatable table-bordered table-hover table-responsive">'+
									'<thead>'+
										'<tr>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">CÓDIGO</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">DESCRIÇÃO</th>'+
											'<th class="fs-txt-center fs-no-margin fs-no-padding">UNIDADE DE MEDIDA</th>'+
										'</tr>'+
									'</thead>'+
									'<tbody>'+
									'</tbody>'+
								'</table>',
						id: 'modalProdutos',
						size: 'large'
					});
					for(let i = 0; i < result.values.length; i++){
						let item = result.values[i];
						console.log(item);
						let cODPROD = item.cODPROD;
						let dESCRI = item.dESCRI;
						let uNIMED = item.uNIMED;
						let error = item.error;
						$('#tableModalProduto tbody').append(
							'<tr class="fs-txt-center">'+
								'<td class="fs-no-margin fs-no-padding">'+cODPROD+'</td>'+
								'<td class="fs-no-margin fs-no-padding">'+dESCRI+'</td>'+
								'<td class="fs-no-margin fs-no-padding">'+uNIMED+'</td>'+
							'</tr>'
						);
					}
					myLoading.hide(); 
					$("#tableModalProduto").on('click', 'tr', function(){
						const tableData = $(this).children("td").map(function(){
							return $(this).text();
						}).get(); // cria um array que mapeia os dados
						let cODPROD = tableData[0];
						let dESCRI = tableData[1];
						let uNIMED = tableData[2];
						if(cODPROD != undefined){
							$("#inputCodProduto").val(cODPROD);
							$("#inputProduto").val("Cód: "+cODPROD.trim()+" | Descrição: "+dESCRI);
							$("#CodItem").val(cODPROD.trim());
							$("#itemDescricao").val(dESCRI);
							$("#unidadeMedida").val(uNIMED);
							$('#modalProdutos').modal('toggle');
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
	};
	$("#inputProduto").on('keyup', (event) => {if(event.keyCode == 13 && $("#inputProduto").val() != "") buscaProduto($("#inputProduto").val())});
	$("#spanBuscaProduto").on('click', () => {if($("#inputProduto").val() != "") buscaProduto($("#inputProduto").val())});

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
								if(codForn != undefined){
									$("#inputCodFornecedor").val(codForn);
									$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#codFornecedor").val(codForn);
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

	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade != 0 && nrAtividade != 2 && nrAtividade != 26){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}
	if(nrAtividade == 0 || nrAtividade == 2){
		setTimeout(function() { 
			$("#inputColabForn").val(setZoomData("colabForn", "EXAMES OCUPACIONAIS - CREDENCIADOS"));
		}, 2000);
		
	}

	$($(window.top.document).find("#observationArea")).css("display","none");

	$("#dataEmissaoNota").on('blur', () => {
		let dataEmissaoNota = $("#dataEmissaoNota").val();
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;

		if(dataEmissaoNota != ""){
			let comparacao = compararDatas(dataEmissaoNota,dataAtual);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Emissão da Nota não pode ser maior que a data de hoje!',type: 'warning'});
				$("#dataEmissaoNota").focusout().val("");
			}
		}
		$("#dataVencimentoNota").focusout().val("");
	});
	
	$("#dataVencimentoNota").on('blur', () => {
		let dataEmissaoNota = $("#dataEmissaoNota").val();
		let dataVencimentoNota = $("#dataVencimentoNota").val();

		if(dataEmissaoNota != "" && dataVencimentoNota != ""){
			let comparacao = compararDatas(dataEmissaoNota,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento da Nota não pode ser maior que a data de emissão!',type: 'warning'});
				$("#dataVencimentoNota").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoNota").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimentoNota").val(newDate);
				$("#mesVencimento").val(dateSplit[1]);
				$("#anoVencimento").val(dateSplit[0]);
			}
		}
	});
	
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

function ocultaDivBoleto(tipo){
	console.log("$$$$$$$$$$ Tipo: "+tipo);
	console.log(tipo.value);
	if(tipo.value == "Boleto"){
		$("#divNumeroBoleto").show();
		$("#divNumeroConta").hide();
	}
	if(tipo.value == "Credito em Conta"){
		$("#divNumeroBoleto").hide();
		$("#divNumeroConta").show();
	}
	if(tipo.value == ""){
		$("#divNumeroBoleto").hide();
		$("#divNumeroConta").hide();
	}
}

/* function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 2 || atividade == 0 || atividade == 26){
		if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor")
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val())){
			if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("supervisor")
			}
		}
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador");			
		}
		
	}if(atividade == 26){
		if(currencyToNumber($("#valorTotalDocumento").val()) < currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor")
		}if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}
			
	}if(atividade == 75){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("coordenador")
			}else{
				$("#aprovadorDestino").val("celulaFiscal")
			}
	}if(atividade == 9){
		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
			$("#aprovadorDestino").val("diretor")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}
} */

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
	let inputId = selectedItem.inputId;
	let splitId = inputId.split("___");
	let index = splitId[1];
	if(selectedItem.inputId == "itemNatureza___"+index){
		var contaDebito = selectedItem.contaDebito;
		var contaCredito = selectedItem.contaCredito;
		$("#itemContaDebt___"+index).val(contaDebito);
		$("#itemContaCred___"+index).val(contaCredito);
	}
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
	if(selectedItem.inputId == "colabForn"){
		var contaDebito = selectedItem.contaDebito;
		var contaCredito = selectedItem.contaCredito;
		$("#contaDebito").val(contaDebito);
		$("#contaCredito").val(contaCredito);
	}
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}

function calculoValorTotal(idCampo){
	let nrLine = idCampo.split("___")[1];
	let qtd = $("#itemQuantidade___"+nrLine).val();
	let valorUnit = currencyToNumber($("#itempreco___"+nrLine).val());

	let valorTotal = qtd * valorUnit;
	$("#itemVlrOrcado___"+nrLine).val(numberToCurrency(valorTotal));
	/* let qtd = $("#Quantidade").val();
	let valorUnit = currencyToNumber($("#valorUnit").val());
	let valorTotal = qtd * valorUnit;
	$("#valorTotalDocumento").val(numberToCurrency(valorTotal));
	$("#valorRequisicao").val(numberToCurrency(valorTotal));
	determinaDestino(); */
	calculaParcialItem();
}

function calculaParcialItem(){
	let index = $('[name^="inputProduto___"');
	let totalParcial = 0;
	for(var i = 0; i <= index.length; i++){
		let valorItem = currencyToNumber($("#itemVlrOrcado___"+i).val());
		totalParcial = totalParcial + valorItem;
	}
	
	$("#inputValorTotalItens").val(numberToCurrency(totalParcial));
}

function addChild(oElement){
	let id = oElement.id;
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 2 || atividade == 4 || atividade == 26){
		if (id == "btnAddChildFornecedores") wdkAddChild('tabelaFornecedores');
		if (id == "btnAddChild") {
			var index = wdkAddChild('tabelaItens');
			MaskEvent.init(); //Atualiza os campos com 'mask' }
			let myLoading = FLUIGC.loading(window);
			const buscaProduto = (produto) => {
				let codprod = '';
				let pesq = '';
				if(!isNaN(produto)) codprod = produto;
				else pesq = produto.toUpperCase();
				myLoading.show();
				console.log(`Código do Produto: ${codprod}\nDescrição do Produto: ${pesq}`);
				const c1 = DatasetFactory.createConstraint("codprod", codprod, "", ConstraintType.MUST);
				const c2 = DatasetFactory.createConstraint("pesq", pesq, "", ConstraintType.MUST);
				DatasetFactory.getDataset("dsBuscaProdutos_2", null, [c1,c2], null, {
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
								title: 'Produtos',
								content: 
										'<table id="tableModalProduto" tablename="tableModalProduto" class="table table-datatable table-bordered table-hover table-responsive">'+
											'<thead>'+
												'<tr>'+
													'<th class="fs-txt-center fs-no-margin fs-no-padding">CÓDIGO</th>'+
													'<th class="fs-txt-center fs-no-margin fs-no-padding">DESCRIÇÃO</th>'+
													'<th class="fs-txt-center fs-no-margin fs-no-padding">UNIDADE DE MEDIDA</th>'+
												'</tr>'+
											'</thead>'+
											'<tbody>'+
											'</tbody>'+
										'</table>',
								id: 'modalProdutos',
								size: 'large'
							}, (error, data) => {
								if(error){
									myLoading.hide(); 
									$('#modalProdutos').modal('toggle');
									FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os produtos!',type: 'warning'});
								}else{
									for(let i = 0; i < result.values.length; i++){
										let item = result.values[i];
										console.log(item);
										let cODPROD = item.cODPROD;
										let dESCRI = item.dESCRI;
										let uNIMED = item.uNIMED;
										let error = item.error;
										$('#tableModalProduto tbody').append(
											'<tr class="fs-txt-center">'+
												'<td class="fs-no-margin fs-no-padding">'+cODPROD+'</td>'+
												'<td class="fs-no-margin fs-no-padding">'+dESCRI+'</td>'+
												'<td class="fs-no-margin fs-no-padding">'+uNIMED+'</td>'+
											'</tr>'
										);
									}
									myLoading.hide(); 
									$("#tableModalProduto").on('click', 'tr', function(){
										const tableData = $(this).children("td").map(function(){
											return $(this).text();
										}).get(); // cria um array que mapeia os dados
										let cODPROD = tableData[0];
										let dESCRI = tableData[1];
										let uNIMED = tableData[2];
										if(cODPROD != undefined){
											$("#inputCodProduto___"+index).val(cODPROD.trim());
											$("#inputProduto___"+index).val(cODPROD.trim());
											$("#CodItem___"+index).val(cODPROD.trim());
											$("#itemDescricao___"+index).val(dESCRI);
											$("#unidadeMedida___"+index).val(uNIMED);
											$('#modalProdutos').modal('toggle');
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
			};
			$("#inputProduto___"+index).on('keyup', (event) => {if(event.keyCode == 13 && $("#inputProduto___"+index).val() != "") buscaProduto($("#inputProduto___"+index).val())});
			$("#spanBuscaProduto___"+index).on('click', () => {if($("#inputProduto___"+index).val() != "") buscaProduto($("#inputProduto___"+index).val())});
		}
	}
}

function changeTabelaItem(codProduto){
	let indexItens = codProduto.slice(-1);
	$("#inputCodProduto___"+indexItens).val('');
}
function fnCustomDelete(oElement){
	let id = oElement.id.split("___")[0];
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 2 || atividade == 4 || atividade == 26){
		if(id == "spanRemover") fnWdkRemoveChild(oElement);
		if(id == "spanRemoverFornecedores") fnWdkRemoveChild(oElement);
	}
	calculaParcialItem();
}
function setZoomData(instance, value){
    window[instance].setValue(value);
}