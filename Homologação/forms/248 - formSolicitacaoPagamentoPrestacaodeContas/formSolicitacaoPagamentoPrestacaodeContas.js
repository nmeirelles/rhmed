$(document).ready(function() {
	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade == 26){
		//carregaAprovadores()
		preencheAcompanhamento()
		determinaDestino()
	}else{
		preencheAcompanhamento()
		determinaDestino()
	}
	
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SPC - '+$("#numeroFluxo").val())
	}
	
	$("#aprovacaoCoordenador").val('')

	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});

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
								if(codForn == undefined || codForn == "undefined"){
									$("#inputFornecedor").val("");
									$("#nomeFornecedor").val("");
									$("#codFornecedor").val("");
									$("#cnpj").val("");
									$("#loja").val("");
									$("#banco").val("");
									$("#agencia").val("");
									$("#conta").val("");
									$('#modalFornecedores').modal('toggle');
								}else{
									$("#inputCodFornecedor").val(codForn);
									$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#nomeFornecedor").val(nome);
									$("#codFornecedor").val(codForn);
									$("#cnpj").val(cnpj);
									$("#loja").val(loja);
									$("#banco").val(banco);
									$("#agencia").val(agencia);
									$("#conta").val(conta);
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

	if(nrAtividade != 0 && nrAtividade != 2 && nrAtividade != 26){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}

	$($(window.top.document).find("#observationArea")).css("display","none");

	$("#dataVencimento").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimento").val();

		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data Sugerida para Entrega não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimento").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimento").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
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
			determinaDestino();
		},
		error: (error) => {
			console.log(error);
		}
	});
}

function numSolicitacao(){
	if($("#atividadeAtual").val() == 5){
		$("#idSolicitacao").val('SPC '+$("#numeroFluxo").val())
	}
}

function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 0 || atividade == 2 || atividade == 26){
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
	}if(atividade == 3){
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

function setSelectedZoomItem(selectedItem){
    if(selectedItem.inputId == 'zoomFilial'){
        $("#cnpjFilial").val(selectedItem.cnpjFilial);
        $("#empresaCod").val(selectedItem.Empresa);
		$("#codFilial").val(selectedItem.codFilial);
	}
	if(selectedItem.inputId == 'zoomCentroCusto'){
		var centroCusto = selectedItem.ccusto.replace(/\./g,"");
		var id = centroCusto.split(" ")[0];
		$("#idCentroCusto").val(id);
		carregaAprovadores(selectedItem.ccusto);
	}
	if(selectedItem.inputId.indexOf("zoomItens") != -1){
		var index = selectedItem.inputId.split("___")[1];
		var contaCredito = selectedItem['contaCredito'];
		var contaDebito = selectedItem['contaDebito'];
		$("#contaCredito___"+index).val(contaCredito);
		$("#contaDebito___"+index).val(contaDebito);
	}
}

function aplicaMask(){
	var inputs = $("[mask]");
	MaskEvent.initMask(inputs);
}

function somaProdutos(){
    var valorTot = 0;
    $("input[id^='valorTotalItem___']").each(function(index, value){
        valorTot = valorTot + currencyToNumber($(this).val());
    });
    $("#valorRequisicao").val(numberToCurrency(valorTot));
	$("#valorTotalDocumento").val(numberToCurrency(valorTot));
	determinaDestino();
}

function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}

function fnCustomDelete(oElement){
	let id = oElement.id.split("___")[0];
	let atividade = $("#atividadeAtual").val()
	if (atividade == 0 || atividade == 2 || atividade == 26){
		if(id == "spanRemoverItens"){
			fnWdkRemoveChild(oElement);
			somaProdutos();
		}
	}
}

function addChild(oElement){
	let id = oElement.id;
	let atividade = $("#atividadeAtual").val();
	if (atividade == 0 || atividade == 2 || atividade == 26){
		if (id == "btnAddChildItens") {
			let index = wdkAddChild('tabelaItens');
			MaskEvent.init();

			let c1 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
			let c2 = DatasetFactory.createConstraint("contaDebito", "", "", ConstraintType.MUST_NOT);
			let c3 = DatasetFactory.createConstraint("contaCredito", "", "", ConstraintType.MUST_NOT);
			let dataset = DatasetFactory.getDataset("dsNaturezaPrestacaoContas", null, [c1,c2,c3], ["natPagas"]);
			console.log(dataset);
			if(dataset != null && dataset.values.length > 0){
				for(let i = 0; i < dataset.values.length; i++){
					let natPagas = dataset.values[i].natPagas;
					let contaDebito = dataset.values[i].contaDebito;
					let contaCredito = dataset.values[i].contaCredito;
					$('#zoomItens___'+index).append('<option value="' + natPagas + '">' + natPagas + '</option>');
				}
			}
			
			$('#zoomItens___'+index).on("change", (event) => {
				let natPagas = event.target.value;

				let arrayNatureza = dataset.values;

				let contaDebito = arrayNatureza.find(natureza => natPagas == natureza.natPagas);
				$('#contaDebito___'+index).val(contaDebito.contaDebito);

				let contaCredito = arrayNatureza.find(natureza => natPagas == natureza.natPagas);
				$('#contaCredito___'+index).val(contaCredito.contaCredito);
			});

			let myLoading = FLUIGC.loading(window);
			//Busca Produto
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
											$("#itemDescricao___"+index).val("Código: "+cODPROD.trim()+" | Descrição: "+dESCRI.trim());
											//$("#CodItem___"+index).val(cODPROD.trim());
											//$("#itemDescricao___"+index).val(dESCRI);
											//$("#unidadeMedida___"+index).val(uNIMED);
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
			$("#itemDescricao___"+index).on('keyup', (event) => {if(event.keyCode == 13 && $("#itemDescricao___"+index).val() != "") buscaProduto($("#itemDescricao___"+index).val())});
		}
	}
}