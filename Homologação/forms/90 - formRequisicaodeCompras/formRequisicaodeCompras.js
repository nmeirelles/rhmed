$(document).ready(function() {
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){

		if($("#tipoRequisicao").val() == "aditivo"){
			$("#idSolicitacao").val('RCA - '+$("#numeroFluxo").val())
		}else if($("#tipoRequisicao").val() == "pleito"){
			$("#idSolicitacao").val('RCP - '+$("#numeroFluxo").val())	
		}else if($("#tipoRequisicao").val() == "padrao"){
			$("#idSolicitacao").val('RCN - '+$("#numeroFluxo").val())	
		}else if($("#tipoRequisicao").val() == "regularizacao"){
			$("#idSolicitacao").val('RCR - '+$("#numeroFluxo").val())
		}
		
	}
	
	//carregaAprovadores();
	preencheAcompanhamento();
	//determinaDestino();
	$("#aprovacaoCoordenador").val("");

	let myLoading = FLUIGC.loading(window);
	const buscaLocalEntrega = (local) => {
		let regexCep = /\d{5}-\d{3}/;
		let cep = '';
		let cidade = '';
		if(local.match(regexCep)) cep = local;
		else cidade = local;
		myLoading.show();
		console.log(`CEP: ${cep}\nCidade: ${cidade}`);
		const contraints = [];
		if(cep != "") {
			const c1 = DatasetFactory.createConstraint("cep", cep, cep, ConstraintType.MUST);
			contraints.push(c1);
		}
		if(cidade != ""){
			const c2 = DatasetFactory.createConstraint("cidade", cidade, cidade, ConstraintType.SHOULD, true);
			contraints.push(c2);
		}
		console.log(contraints);
		DatasetFactory.getDataset("dslocalEntrega", null, contraints, null, {
			success: function(result){
				console.log(result);
				FLUIGC.modal({
					title: 'Local de Entrega',
					content: 
							'<table id="tableModalLocalEntrega" tablename="tableModalLocalEntrega" class="table table-datatable table-bordered table-hover table-responsive">'+
								'<thead>'+
									'<tr>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">CEP</th>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">CIDADE</th>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">ENDEREÇO</th>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">ESTADO</th>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">LOCAL</th>'+
										'<th class="fs-txt-center fs-no-margin fs-no-padding">TELEFONE</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody>'+
								'</tbody>'+
							'</table>',
					id: 'modalLocalEntrega',
					size: 'large'
				}, (error, data) => {
					if(error){
						myLoading.hide(); 
						$('#modalLocalEntrega').modal('toggle');
						FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os locais de entrega!',type: 'warning'});
					}else{
						for(let i = 0; i < result.values.length; i++){
							let item = result.values[i];
							console.log(item);
							let cep = item.cep;
							let cidade = item.cidade;
							let endereco = item.endereco;
							let estado = item.estado;
							let local = item.local;
							let telefone = item.telefone;
							$('#tableModalLocalEntrega tbody').append(
								'<tr class="fs-txt-center">'+
									'<td class="fs-no-margin fs-no-padding">'+cep+'</td>'+
									'<td class="fs-no-margin fs-no-padding">'+cidade+'</td>'+
									'<td class="fs-no-margin fs-no-padding">'+endereco+'</td>'+
									'<td class="fs-no-margin fs-no-padding">'+estado+'</td>'+
									'<td class="fs-no-margin fs-no-padding">'+local+'</td>'+
									'<td class="fs-no-margin fs-no-padding">'+telefone+'</td>'+
								'</tr>'
							);
						}
						myLoading.hide(); 
						$("#tableModalLocalEntrega").on('click', 'tr', function(){
							const tableData = $(this).children("td").map(function(){
								return $(this).text();
							}).get(); // cria um array que mapeia os dados
							let cep = tableData[0];
							let cidade = tableData[1];
							let endereco = tableData[2];
							let estado = tableData[3];
							let local = tableData[4];
							let telefone = tableData[5];
							if(cep != undefined){
								$("#inputLocalEntrega").val(local);
								$("#ruaFornecedor").val(endereco);
								$("#cidadeFornecedor").val(cidade);
								$("#estadoFornecedor").val(estado);
								$("#CEPFornecedor").val(cep);
								$("#telefoneFornecedor").val(telefone);
								$('#modalLocalEntrega').modal('toggle');
							}
						});
					}
				});
			},
			error: function(err){
				myLoading.hide(); 
				$('#modalLocalEntrega').modal('toggle');
				console.log(err);
				FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os locais de entrega!',type: 'warning'});
			}
		});
	};
	$("#inputLocalEntrega").on('keyup', (event) => {if(event.keyCode == 13 && $("#inputLocalEntrega").val() != "") buscaLocalEntrega($("#inputLocalEntrega").val())});
	$("#spanBuscaLocalEntrega").on('click', () => {if($("#inputLocalEntrega").val() == "") buscaLocalEntrega($("#inputLocalEntrega").val())});


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
			}else{
				let dataAtual = $("#dataEmissaoNota").val();
				let dateSplit = dataAtual.split('-');
				$("#mesEmissaoNota").val(dateSplit[1]);
				$("#anoEmissaoNota").val(dateSplit[0]);
			}
		}
	});

	$("#consultaFornecedor").on('click', () => {
		let idPrev = this.prev().attr('id');
		console.log(idPrev);
		buscaFornecedores(idPrev);
	})

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

	var dataset = DatasetFactory.getDataset("dsValoresAtribuicao", null, null, null);
	$("#valorGerente").val(dataset.values[0].gerente);
	$("#valorSupervisor").val(dataset.values[0].supervisor);
	$("#valorCoordenador").val(dataset.values[0].ccusto);
	$("#valorDiretor").val(dataset.values[0].diretor);
	console.log("VALOR DATASET",dataset.values[0].gerente);
}

function ocultaDivBoleto(tipo){
	if(tipo.value != "Boleto"){
		$("#divNumeroBoleto").addClass('hide');
	}else{
		$("#divNumeroBoleto").removeClass('hide');

	}
}

// function determinaDestino(){
// 	let atividade = $("#atividadeAtual").val()
// 	if(atividade == 4 || atividade == 0){
// 		if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
// 			$("#aprovadorDestino").val("supervisor");
// 		}else{
// 			$("#aprovadorDestino").val("coordenador");
// 		}
// 	}
// 	if(atividade == 86){
// 		if(currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
// 			$("#aprovadorDestino").val("supervisor");
// 		}else{
// 			$("#aprovadorDestino").val("coordenador");
// 		}	
// 	}
// 	if(atividade == 5){
// 		if(	currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorSupervisor").val()) && 
// 			currencyToNumber($("#valorTotalDocumento").val()) <= currencyToNumber($("#valorCoordenador").val())){
// 			$("#aprovadorDestino").val("coordenador");
// 		}else{
// 			$("#aprovadorDestino").val("celulaFiscal");
// 		}
// 	}
// 	if(atividade == 21){
// 		if(currencyToNumber($("#valorTotalDocumento").val()) > currencyToNumber($("#valorGerente").val())){
// 			$("#aprovadorDestino").val("diretor");
// 		}else{
// 			$("#aprovadorDestino").val("celulaFiscal");
// 		}
// 	}
// }

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

function calculoValorTotal(idCampo){
	let nrLine = idCampo.split("___")[1];
	console.log("Nr Line: "+nrLine);
	let qtd = $("#itemQuantidade___"+nrLine).val();
	console.log("Quantidade: "+qtd);
	let valorUnit = currencyToNumber($("#itempreco___"+nrLine).val());
	console.log("Valor Unitário: "+valorUnit);

	let valorTotal = qtd * valorUnit;
	$("#itemVlrOrcado___"+nrLine).val(numberToCurrency(valorTotal));
	console.log("Valor Total: "+valorTotal);
	
	// let valorTotalGeral = 0;
	// let tableIndexItens = $("#tabelaItens >tbody >tr").length;
	// for(i=1;i<tableIndexItens;i++){
	// 	var itemValorUnit = $("#itemVlrOrcado___"+i).val();
	// 	valorTotalGeral = Number(valorTotalGeral) + Number(currencyToNumber(itemValorUnit));
	// }
	// $("#valorTotalDocumento").val(numberToCurrency(valorTotalGeral));
	// $("#valorRequisicao").val(numberToCurrency(valorTotalGeral));
}

function fnCustomDelete(oElement){
	let id = oElement.id.split("___")[0];
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 4 || atividade == 86){
		if(id == "spanRemover") fnWdkRemoveChild(oElement);
		if(id == "spanRemoverFornecedores") fnWdkRemoveChild(oElement);
	}
}

function addChild(oElement){
	let id = oElement.id;
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 4 || atividade == 86){
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

function buscaFornecedores(idCampo){
	console.log("Id Campo: "+idCampo);
	let nrLine = idCampo.split("___")[1];
	console.log("Nr Line: "+nrLine);
	let tipoBusca = document.getElementById("selectTipoBusca___"+nrLine).value;
	console.log("Tipo de Busca: "+tipoBusca);
	let myLoading = FLUIGC.loading(window);
	let valorPesquisado = $("#inputFornecedor___"+nrLine).val();
	const fornecedor = (fornecedor) => {
		let cnpjFornecedor = '';
		let codigoFornecedor = '';
		let pesq = '';
		if(tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca a ser realizado!',type: 'warning'});
		else{
			if(tipoBusca == "cpf" || tipoBusca == "cnpj") cnpjFornecedor = fornecedor;
			if(tipoBusca == "codigo") codigoFornecedor = fornecedor.toUpperCase();
			if(tipoBusca == "nome") pesq = fornecedor.toUpperCase();
			myLoading.show();
			console.log(`CNPJ: ${cnpjFornecedor}\nCódigo: ${codigoFornecedor}\nPesq: ${pesq}`);
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
										$("#inputFornecedor___"+nrLine).val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
										//$("#cnpj").val(cnpj);
										//$("#loja").val(loja);
										//$("#bancoPag").val(banco);
										//$("#agenciaPag").val(agencia);
										//$("#contaPag").val(conta);
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
	};
	fornecedor(valorPesquisado);
}

function changeTabelaItem(codProduto){
	let indexItens = codProduto.slice(-1);
	$("#inputCodProduto___"+indexItens).val('');
}

// function calculaValorTotal(){
// 	let valorTotal = 0;
// 	let tableIndexItens = $("#tabelaItens >tbody >tr").length;
// 	console.log(tableIndexItens);
// 	for(let i = 0; i < tableIndexItens; i++){
// 		console.log(tableIndexItens[i]);
// 		var itemValorUnit = $("#itemVlrOrcado___"+i+"___"+i).val();
// 		console.log(itemValorUnit);
// 		valorTotal = Number(valorTotal) + Number(currencyToNumber(itemValorUnit));
// 		console.log(valorTotal);
// 	}
// 	$("#valorTotalDocumento").val(numberToCurrency(valorTotal));
// 	$("#valorRequisicao").val(numberToCurrency(valorTotal));
// 	determinaDestino();
// }