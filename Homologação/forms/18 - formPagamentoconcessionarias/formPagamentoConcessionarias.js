$(document).ready(function() {

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

	$("#planilhaModelo").on('click', () => {
		var request_data = {
			url: '/api/public/ecm/document/downloadURL/3010',
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

	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});

	$("#inputProduto").change('change', () => {
		$("#inputCodProduto").val('');
	});

	//carregaAprovadores()
	preencheAcompanhamento();
	determinaDestino();
	
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
	const buscaFornecedores = (valorPesquisado, tipoBusca, idCampo, nr) => {
		console.log(valorPesquisado);
		console.log(tipoBusca);
		console.log(idCampo);
		console.log(nr);
		
		const emissorDiferente = $('input[name=radioPagamento]:checked').val();
		console.log(emissorDiferente);

		let myLoading = FLUIGC.loading(window);
		myLoading.show();

		let urlRest = "";
		console.log(emissorDiferente == "1" && nr == "2");
		console.log(emissorDiferente == "2" && nr == "2");
		console.log(nr == "1");
		if(emissorDiferente == "1" && nr == "2"){
			if(tipoBusca == "cpf" || tipoBusca == "cnpj"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_CGC$"+valorPesquisado+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "codigo"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_COD$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "nome"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_NOME$$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
		}else if(emissorDiferente == "2" && nr == "2"){
			let selectTipoFornecedor = $("#selectTipoFornecedor").val();
			if(tipoBusca == "cpf" || tipoBusca == "cnpj"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_XTPFORN$"+selectTipoFornecedor+"@A2_CGC$"+valorPesquisado+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "codigo"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_XTPFORN$"+selectTipoFornecedor+"@A2_COD$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "nome"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_XTPFORN$"+selectTipoFornecedor+"@A2_NOME$$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
		}else if(nr == "1"){
			if(tipoBusca == "cpf" || tipoBusca == "cnpj"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_CGC$"+valorPesquisado+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "codigo"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_COD$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
			if(tipoBusca == "nome"){
				urlRest = "https://rhmedconsultores119082.protheus.cloudtotvs.com.br:4050/rest/WSCONSULTA?FIL=0101&TABELA=SA2&FILTRO=A2_MSBLQL$2@A2_NOME$$"+valorPesquisado.toUpperCase()+"&COLUNAS=A2_COD|A2_LOJA|A2_NOME|A2_CGC|A2_BANCO|A2_AGENCIA|A2_NUMCON|A2_DVCTA|A2_FORMPAG|A2_TIPCTA|A2_XTPFORN";
			}
		}
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": urlRest,
			"method": "GET",
			"headers": {
				"Accept": "application/json",
				//"Accept-Charset": "utf-8",
				"Authorization": "Basic YWRtaW46cmhtZWQyMDIxMDE="
			},
			"timeout": 6000
		};
		console.log(settings);
		$.ajax(settings).success(function(data){
			console.log(data);
			const erro = data.erro;
			console.log(erro);
			if(erro == null || erro == ""){
				const SA2 = data.SA2;
				console.log(SA2.length);
				if(SA2.length > 0){
					myLoading.hide(); 
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
					});
					setTimeout(() => {
						for(let i = 0; i < SA2.length; i++){
							let fornecedor = SA2[i];
							let agencia = fornecedor.A2_AGENCIA;
							let banco = fornecedor.A2_BANCO;
							let cnpj = fornecedor.A2_CGC;
							let codForn = fornecedor.A2_COD;
							let conta = fornecedor.A2_NUMCON;
							let formaPag = fornecedor.A2_FORMPAG;
							let loja = fornecedor.A2_LOJA;
							let nome = fornecedor.A2_NOME;
							let tipoConta = fornecedor.A2_TIPCTA;
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
						$("#tableModalFornecedor").on('click', 'tr', function(){
							const tableData = $(this).children("td").map(function(){return $(this).text()}).get(); // cria um array que mapeia os dados
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
								if(idCampo == "inputFornecedor" || idCampo == "consultaFornecedor"){
									$("#inputCodFornecedor").val(codForn);
									$("#inputLojFornecedor").val(loja);
									$("#inputFornecedor").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#codBenefPagamento").val(codForn);
									$("#bancoPag").val(banco);
									$("#agenciaPag").val(agencia);
									$("#contaPag").val(conta);
								}
								if(idCampo == "inputEmissorNF" || idCampo == "consultaEmissorNF"){
									$("#inputCodEmissorNF").val(codForn);
									$("#loja").val(loja);
									$("#inputEmissorNF").val("Cód: "+codForn+" | Nome: "+nome+" | CNPJ: "+cnpj);
									$("#codFornecedor").val(codForn);
									$("#cnpj").val(cnpj);
									$("#hiddenEmissorBanco").val(banco);
									$("#hiddenEmissorAgencia").val(agencia);
									$("#hiddenEmissorConta").val(conta);
								}
								$('#modalFornecedores').modal('toggle');
							}
						});
					}, 500);
				}else{
					myLoading.hide(); 
					FLUIGC.toast({title: 'Erro: ',message: 'Não foi possível buscar os dados do fornecedor!',type: 'warning'});
				}
			}else{
				myLoading.hide(); 
				FLUIGC.toast({title: 'Erro: ', message: erro , type: 'warning'});
			}

		}).fail(function(data){
			console.log(data);
			myLoading.hide(); 
			FLUIGC.toast({title: 'Erro: ', message: "Erro ao buscar fornecedor!" , type: 'warning'});
		});
	}
	$("#inputEmissorNF").on('keyup', (event) => {
		if(event.keyCode == 13){
			const idCampo = event.target.id;
			const valorPesquisado = event.target.value;
			const tipoBusca = $("#selectTipoBuscaEmissorNF").val();
			if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
			else buscaFornecedores(valorPesquisado, tipoBusca, idCampo, "1");
		}
	});
	$("#consultaEmissorNF").on('click', (event) => {
		const idCampo = event.currentTarget.id;
		const valorPesquisado = $("#inputEmissorNF").val();
		const tipoBusca = $("#selectTipoBuscaEmissorNF").val();
		if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
		else buscaFornecedores(valorPesquisado, tipoBusca, idCampo, "1");
	});
	$("#inputFornecedor").on('keyup', (event) => {
		if(event.keyCode == 13){
			const idCampo = event.target.id;
			const valorPesquisado = event.target.value;
			const tipoBusca = $("#selectTipoBusca").val();
			if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
			else buscaFornecedores(valorPesquisado, tipoBusca, idCampo, "2");
		}
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Inicio
	$("#consultaFornecedor").on('click', (event) => {
		const idCampo = event.currentTarget.id;
		const valorPesquisado = $("#inputFornecedor").val();
		const tipoBusca = $("#selectTipoBusca").val();
		if(valorPesquisado == "" || tipoBusca == "") FLUIGC.toast({title: 'Atenção: ',message: 'Favor informar o tipo de busca e a pesquisa a ser realizada!',type: 'warning'});
		else buscaFornecedores(valorPesquisado, tipoBusca, idCampo, "2");		
	});
	//Adicionado Botão "Busca" de fornecedores --> 05/07/2021 --> Fim

	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade != 0 && nrAtividade != 2 && nrAtividade != 26){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
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

	$(':radio[name="radioPagamento"]').on('change', (event) => {
		let beneficiarioPagamento = event.target.value;
		if(beneficiarioPagamento == "1"){
			$('#selectTipoBusca').attr('readonly', false);
			$('#inputFornecedor').attr('readonly', false);
			$("#selectTipoFornecedor").val("");
			$("#hiddenBenefPagamento").val("1");
			$("#divButtonPlanilhaModelo").hide();
			$(".tipoFornecedor").hide();

			//Copia valores de campo de Emissor "Dados Fiscais" para Beneficiário "Dados do Pagamento"
			let emissor = $("#inputEmissorNF").val();
			let codEmissor = $("#inputCodEmissorNF").val();
			let bancoEmissor = $("#hiddenEmissorBanco").val();
			let agenciaEmissor = $("#hiddenEmissorAgencia").val();
			let contaEmissor = $("#hiddenEmissorConta").val();
			let loja = $("#loja").val();
			$("#inputFornecedor").val(emissor);
			$("#inputCodFornecedor").val(codEmissor);
			$("#inputLojFornecedor").val(loja);
			$("#bancoPag").val(bancoEmissor);
			$("#agenciaPag").val(agenciaEmissor);
			$("#contaPag").val(contaEmissor);

		}
		if(beneficiarioPagamento == "2"){	
			$('#selectTipoBusca').attr('readonly', true);
			$('#inputFornecedor').attr('readonly', true);
			$("#selectTipoFornecedor").val("");
			$("#hiddenBenefPagamento").val("2");
			$("#divButtonPlanilhaModelo").show();
			$(".tipoFornecedor").show();

			//Limpa Campos de Código de Beneficiário
			$("#inputFornecedor").val('');
			$("#inputCodFornecedor").val('');
			$("#inputLojFornecedor").val('');
		}
	});
	 $("#selectTipoFornecedor").on('change', (event) => {
		let tipoFornecedor = event.target.value;
		if(tipoFornecedor != ""){
			$('#selectTipoBusca').attr('readonly', false);
			$('#inputFornecedor').attr('readonly', false);
		}else{
			$('#selectTipoBusca').attr('readonly', true);
			$('#inputFornecedor').attr('readonly', true);
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

function ocultaDivBoleto(tipo){
	console.log("$$$$$$$$$$ Tipo: "+tipo);
	console.log(tipo.value);
	$("#numBoleto").val('');
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

function determinaDestino(){
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

function calculoValorTotal(){
	let qtd = $("#Quantidade").val();
	let valorUnit = currencyToNumber($("#valorUnit").val());
	let valorTotal = qtd * valorUnit;
	$("#valorTotalDocumento").val(numberToCurrency(valorTotal));
	$("#valorRequisicao").val(numberToCurrency(valorTotal));
	determinaDestino();
}