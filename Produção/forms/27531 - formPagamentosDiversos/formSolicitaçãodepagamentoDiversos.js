$(document).ready(function() {
	// $("#apuracaoDARFWEB").on('change', (event) => {
	// 	let data = event.target.value;
	// 	let dia = data.split("-")[2];
	// 	if(dia != "01"){
	// 		FLUIGC.toast({title: 'Atenção: ',message: 'O dia deve ser o primeiro dia (01) do mês de apuração.',type: 'warning'});
	// 		$("#apuracaoDARFWEB").focusout().val("");
	// 	}
	// });
	$("#nrReceitaDARM").on('change', (event) => {
		let nrReceitaDARM = event.target.value;
		var retiraPonto = nrReceitaDARM.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		$("#nrReceitaDARM").val(retiraEspaco);
	});
	$("#codigoReceitaDARF").on('change', (event) => {
		let codigoReceitaDARF = event.target.value;
		var retiraPonto = codigoReceitaDARF.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		$("#codigoReceitaDARF").val(retiraEspaco);
	});

	function f_barra() {
		var antes  = form.barra.value;
		var depois = calcula_barra(form.linha.value);
		form.barra.value=depois;
		antes = antes.replace(/[^0-9]/g,'')
		if ((antes != depois) && antes != '') alert('Código de Barras digitado não conferem:\n'+antes+'\n'+depois);
		f_venc();
		return(false);
	}
	function f_linha() {
		var antes  = form.linha.value.replace(/[^0-9]/g,'');
		var depois = calcula_linha(form.barra.value);
		form.linha.value=depois;
		depois = depois.replace(/[^0-9]/g,'')
		if ((antes != depois) && antes != '') alert('Código de Barras digitado não conferem:\n'+antes+'\n'+depois);
		f_venc();
		return(false);
	}
	function f_venc() {
		if ( form.barra.value.substr(5,4) == 0 )
			form.venc.value='Boleto pode ser pago em qualquer data';
		else
			form.venc.value=fator_vencimento(form.barra.value.substr(5,4));
		form.valor.value=(form.barra.value.substr(9,8)*1)+','+form.barra.value.substr(17,2);
		return(false);
	}
	function recalcula_barra(linha)
	{
		if (document.form.barra.value.length == 0)
		{
			f_barra();
			linha = document.form.barra.value;
		}
		//
		var currentDate, t, d, mes;
		t = new Date();
		currentDate = new Date();
		currentDate.setFullYear(1997,9,7);
		d = (t.getTime()-currentDate.getTime())/1000 / 60 / 60 / 24;
		//
		linha = linha.replace(/[^0-9]/g,'');
		linha = linha.substr(0,4)+modulo11_banco(linha.substr(0,4)+d+linha.substr(9,35))+d+linha.substr(9,35);
		document.getElementById('barras').innerHTML='O <b>código da barra</b> para vencimento hoje: <input size=50 value="'+linha+'">';
	}
	function calcula_barra(linha){
		let barra  = linha.replace(/[^0-9]/g,'');

		// CÁLCULO DO DÍGITO DE AUTOCONFERÊNCIA (DAC)   -   5ª POSIÇÃO
		if(modulo11_banco('34191000000000000001753980229122525005423000') != 1) FLUIGC.toast({title: 'Atenção: ',message: 'Função "modulo11_banco" está com erro!',type: 'warning'});
		
		if(barra.length < 47 ) barra = barra + '00000000000'.substr(0,47-barra.length);

		if(barra.length != 47){
			FLUIGC.toast({title: 'Atenção: ',message: 'A linha do Código de Barras está incompleta!'+barra.length,type: 'warning'});
			return false;
		}
		
		barra  = barra.substr(0,4)
				+barra.substr(32,15)
				+barra.substr(4,5)
				+barra.substr(10,10)
				+barra.substr(21,10)
				;

		if(modulo11_banco(barra.substr(0,4)+barra.substr(5,39)) != barra.substr(4,1)){
			FLUIGC.toast({
				title: 'Atenção: ',
				message: 'Digito verificador '+barra.substr(4,1)+', o correto é '+modulo11_banco(barra.substr(0,4)+barra.substr(5,39))+'\nO sistema não altera automaticamente o dígito correto na quinta casa!',
				type: 'warning'
			});
			return false;
		}

		return true;
	}
	function calcula_linha(barra)
	{
		//var barra = form.barra.value;	// Codigo da Barra
		linha = barra.replace(/[^0-9]/g,'');
		//
		if (modulo10('399903512') != 8) alert('Função "modulo10" está com erro!');
		if (linha.length != 44) alert ('A linha do Código de Barras está incompleta!');
		//
		var campo1 = linha.substr(0,4)+linha.substr(19,1)+'.'+linha.substr(20,4);
		var campo2 = linha.substr(24,5)+'.'+linha.substr(24+5,5);
		var campo3 = linha.substr(34,5)+'.'+linha.substr(34+5,5);
		var campo4 = linha.substr(4,1);		// Digito verificador
		var campo5 = linha.substr(5,14);	// Vencimento + Valor
		//
		if (  modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  ) != campo4 )
			alert('Digito verificador '+campo4+', o correto é '+modulo11_banco(  linha.substr(0,4)+linha.substr(5,99)  )+'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
		//
		if (campo5 == 0) campo5 = '000';
		//
		linha =	 campo1 + modulo10(campo1)
				+' '
				+campo2 + modulo10(campo2)
				+' '
				+campo3 + modulo10(campo3)
				+' '
				+campo4
				+' '
				+campo5
				;
		//if (form.linha.value != form.linha2.value) alert('Linhas diferentes');
		return(linha);
	}
	function fator_vencimento (dias) {
		//Fator contado a partir da data base 07/10/1997
		//*** Ex: 04/07/2000 fator igual a = 1001
		//alert(dias);
		var currentDate, t, d, mes;
		t = new Date();
		currentDate = new Date();
		currentDate.setFullYear(1997,9,7);//alert(currentDate.toLocaleString());
		t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * dias));//alert(t.toLocaleString());
		mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
		dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
		//campo.value = dia +"."+mes+"."+currentDate.getFullYear();campo.select();campo.focus();
		return(t.toLocaleString());
	}
	function modulo10(numero)
	{
		/*
			  select @peso = '121212121212121212121212'
			  select @max  = datalength(@numero)
			  select @peso = right(@peso, @max)
			  set @contador = @max+1
			  set @soma     = 0
			  loop:
					set @contador = @contador-1
					set @valor    = isnull((ascii(substring(@peso, @contador, 1))-48) * 
			(ascii(substring(@numero, @contador, 1))-48), 0)
					set @soma     = isnull((select (case when (@valor<10) then 
			@valor when  (@valor>9) then @valor-10 end)), 0)+@soma
					set @soma     = isnull((select (case when  (@valor<10) then 
			null when  (@valor>9) then 1 end)), 0)+@soma
					if (@contador >1) goto loop
			  select @resto= sum(@soma)%10
			  select @retorno = case @resto when 0 then 0 else 10-@resto end
			  return(Convert(char(1), @retorno))	
		*/
		numero = numero.replace(/[^0-9]/g,'');
		var soma  = 0;
		var peso  = 2;
		var contador = numero.length-1;
		//alert(contador);
		//numero = '00183222173';
		//for (var i=0; i <= contador - 1; i++) {
		//alert(10);
		//for (contador=10; contador >= 10 - 1; contador--) {
		while (contador >= 0) {
			//alert(contador);
			//alert(numero.substr(contador,1));
			multiplicacao = ( numero.substr(contador,1) * peso );
			if (multiplicacao >= 10) {multiplicacao = 1 + (multiplicacao-10);}
			soma = soma + multiplicacao;
			//alert(numero.substr(contador,1)+' * '+peso+' = '+multiplicacao + ' =>' + soma) ;
			//alert(soma);
			if (peso == 2) {
				peso = 1;
			} else {
				peso = 2;
			}
			contador = contador - 1;
		}
		var digito = 10 - (soma % 10);
		//alert(numero + '\n10 - (' + soma + ' % 10) = ' + digito);
		if (digito == 10) digito = 0;
		return digito;
	}
	function modulo11_banco(numero)
	{
		/*
		  SET @SOMA  = 0
		  SET @PESO  = 2
		  SET @BASE  = 9
		  SET @RESTO = 0
		  SET @CONTADOR = Len(@VALOR)

		  LOOP:
			BEGIN
			  SET @SOMA = @SOMA + (Convert(int, SubString(@VALOR, @CONTADOR, 1)) *	@PESO)
			  IF (@PESO < @BASE)
				SET @PESO = @PESO + 1
			  ELSE
				SET @PESO = 2
			  SET @CONTADOR = @CONTADOR-1
			END
		  IF @CONTADOR >= 1 GOTO LOOP

		  IF (@RESTO = 1)
			BEGIN
			  SET @RETORNO = (@SOMA % 11)
			END
		  ELSE
			BEGIN
			  SET @DIGITO = 11 - (@SOMA % 11)
			  IF (@DIGITO > 9) SET @DIGITO = 0
			  SET @RETORNO = @DIGITO
			END
		  -- A UNICA DIFERENCA EH NO RETORNO, SE FOR 0, RETORNA 1
		  IF @RETORNO = '0' SET @RETORNO='1'
		  RETURN @RETORNO
		*/
		numero = numero.replace(/[^0-9]/g,'');
		//debug('Barra: '+numero);
		var soma  = 0;
		var peso  = 2;
		var base  = 9;
		var resto = 0;
		var contador = numero.length - 1;
		//debug('tamanho:'+contador);
		// var numero = "12345678909";
		for (var i=contador; i >= 0; i--) {
			//alert( peso );
			soma = soma + ( numero.substring(i,i+1) * peso);
			//debug( i+': '+numero.substring(i,i+1) + ' * ' + peso + ' = ' +( numero.substring(i,i+1) * peso)+' soma='+ soma);
			if (peso < base) {
				peso++;
			} else {
				peso = 2;
			}
		}
		var digito = 11 - (soma % 11);
		//debug( '11 - ('+soma +'%11='+(soma % 11)+') = '+digito);
		if (digito >  9) digito = 0;
		/* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
		if (digito == 0) digito = 1;
		return digito;
	}
	const trataCódigoBarras = (nomeCampo, codigo) => { // 34191090658629450012851552340005788610000014809
		let retiraPonto = codigo.replace(/\.-\//g,"");
		let retiraLetra = retiraPonto.replace(/\D/g,"");
		let retiraEspaco = retiraLetra.replace(/\s/g,"");
		// let validacao = calcula_barra(retiraEspaco);
		// if(validacao == true) $("#"+nomeCampo).val(retiraEspaco);
		// else $("#"+nomeCampo).focusout().val("");
		$("#"+nomeCampo).val(retiraEspaco);
	}
	$("#numCodigo, #nrCodigoBarrasDARFWEB, #nrCodigoBarrasDAMSP, #nrCodigoBarrasGRF, #nrCodigoBarrasGPS, #nrCodigoBarrasDARM, #nrCodigoBarrasDARF").on('change', (event) => {
		let id = event.target.id;
		let codigoBarras = event.target.value;
		trataCódigoBarras(id, codigoBarras);
	});
	$("#nrCPFCNPJDARF").on('change', (event) => {
		let numeroBoleto = event.target.value;
		console.log("Número Boleto: "+numeroBoleto);
		var retiraPonto = numeroBoleto.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		console.log("Número Boleto: "+retiraEspaco);
		$("#nrCPFCNPJDARF").val(retiraEspaco);
	});
	$("#codReceitaDARF").on('change', (event) => {
		let numeroBoleto = event.target.value;
		console.log("Número Boleto: "+numeroBoleto);
		var retiraPonto = numeroBoleto.replace(/\.-\//g,"");
		var retiraLetra = retiraPonto.replace(/\D/g,"");
		var retiraEspaco = retiraLetra.replace(/\s/g,"");
		console.log("Número Boleto: "+retiraEspaco);
		$("#codReceitaDARF").val(retiraEspaco);
	});
	$("#valorTotalComCodigo").on('change', () => {
		console.log("Mudou");
		determinaDestino();
	});
	if($("#numeroFluxo").val() != '' && $("#numeroFluxo").val() != null){
		$("#idSolicitacao").val('SPD - '+$("#numeroFluxo").val())
	}
	$("#aprovacaoCoordenador").val('');
	$("#inputFornecedor").change('change', () => {
		$("#inputCodFornecedor").val('');
	});
	$(".selectCodBarrasImposto").on('change', (event) => {		
		let codBarras = event.target.value;
		if(codBarras == 'sim'){
			$(".divCodBarrasImposto").css("display","block");
		}else{
			$(".divCodBarrasImposto").css("display","none");
		}
	})
	$("#formaPagamento").on('change', (event) => {		
		$(".formaPagamento").find('input, select').each(function () {
			$(this).val('');
		});
		$(".selectCodBarrasImposto").val('nao');
		$(".divCodBarrasImposto").css("display","none");
		let formaPagamento = event.target.value;
		if(formaPagamento == "semCodigo"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","block");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","block");
		}
		if(formaPagamento == "comCodigo"){
			$("#divComCodigo").css("display","block");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "darf"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","block");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "darm"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","block");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "gps"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","block");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "grf"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","block");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "damsp"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","block");
			$("#divDARFWEB").css("display","none");
			$("#divDadosBancarios").css("display","none");
		}
		if(formaPagamento == "darfWeb"){
			$("#divComCodigo").css("display","none");
			$("#divSemCodigo").css("display","none");
			$("#divDARF").css("display","none");
			$("#divDARM").css("display","none");
			$("#divGPS").css("display","none");
			$("#divGRF").css("display","none");
			$("#divDAMSP").css("display","none");
			$("#divDARFWEB").css("display","block");
			$("#divDadosBancarios").css("display","none");
		}
	});
	//carregaAprovadores()
	preencheAcompanhamento()
	determinaDestino()
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
				console.log("RESULTADO>>>>>>");
				console.log(result);
				if(result.values[0].Error != ""){
					console.log("Entrou no Erro!!!");
					myLoading.hide();
					let erroRetorno = result.values[0].Error;
					let splitError = erroRetorno.split("ERROR : ");
					FLUIGC.toast({title: 'Erro: ', message: splitError[1], type: 'warning'});
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
									$("#nomeFornecedor").val(nome);
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
	let nrAtividade = $("#atividadeAtual").val();
	if(nrAtividade != 0 && nrAtividade != 4 && nrAtividade != 86){
		$($(window.top.document).find("#dLabel")).removeAttr('data-toggle');
		$($(window.top.document).find("button:contains('Carregar arquivos')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Buscar no ECM')")).attr("disabled",true);
		$($(window.top.document).find("button:contains('Remover')")).attr("disabled",true);		
	}else{
		const c1 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
		const c2 = DatasetFactory.createConstraint("contaDebito", "", "", ConstraintType.MUST_NOT);
		const c3 = DatasetFactory.createConstraint("contaCredito", "", "", ConstraintType.MUST_NOT);
		const dataset = DatasetFactory.getDataset("dsNaturezaDiversos", null, [c1,c2,c3], ["natPagas"]);
		console.log(dataset);
		if(dataset != null && dataset.values.length > 0){
			let colabForn = $("#colabForn").val();
			$("#colabForn").empty();
			$("#colabForn").append('<option value=""></option>');
			for(let i = 0; i < dataset.values.length; i++){
				let natPagas = dataset.values[i].natPagas;
				$('#colabForn').append('<option value="' + natPagas + '">' + natPagas + '</option>');
			}
			if(colabForn != "") $("#colabForn").val(colabForn);
		}
		$('#colabForn').on("change", (event) => {
			let natPagas = event.target.value;
			if(natPagas == ""){
				$('#contaDebito').val("");
				$('#contaCredito').val("");
			}else{
				let arrayNatureza = dataset.values;
				let contaDebito = arrayNatureza.find(natureza => natPagas == natureza.natPagas);
				$('#contaDebito').val(contaDebito.contaDebito);
				let contaCredito = arrayNatureza.find(natureza => natPagas == natureza.natPagas);
				$('#contaCredito').val(contaCredito.contaCredito);
			}
		});

		/*=====================================================================================*/
		const c1_2 = DatasetFactory.createConstraint("CCbloqueado", "nao", "nao", ConstraintType.MUST);
		const c2_2 = DatasetFactory.createConstraint("inputChaveProtheus", "", "", ConstraintType.MUST_NOT);
		const c3_2 = DatasetFactory.createConstraint("inputGuiaImposto", "", "", ConstraintType.MUST_NOT);
		const datasetImpostos = DatasetFactory.getDataset("dsGuiaImpostos", null, [c1_2, c2_2, c3_2], null);
		if(datasetImpostos != null && datasetImpostos.values.length > 0){
			let formaPagamento = $("#formaPagamento").val();
			for(let i = 0; i < datasetImpostos.values.length; i++){
				let guiaImposto = datasetImpostos.values[i].inputGuiaImposto;
				if(guiaImposto != "DARF DCTFWEB"){
					$('#formaPagamento').append('<option value="' + guiaImposto.toLowerCase() + '">' + guiaImposto + '</option>');
				}else{
					guiaImpostoValue = "darfWeb";
					$('#formaPagamento').append('<option value="' + guiaImpostoValue + '">' + guiaImposto + '</option>');
				}				
			}
			if(formaPagamento != "") $("#formaPagamento").val(formaPagamento);
		}
		$('#formaPagamento').on("change", (event) => {
			let formaPagamento = event.target[event.target.selectedIndex].text;
			if(formaPagamento == ""){
				$('#hiddenChaveProtheus').val("");
			}else{
				let arrayGuiaImpostos = datasetImpostos.values;
				let chaveProtheus = arrayGuiaImpostos.find(Item => formaPagamento == Item.inputGuiaImposto);
				$('#hiddenChaveProtheus').val(chaveProtheus.inputChaveProtheus);
			}
		});
	}
	$($(window.top.document).find("#observationArea")).css("display","none");
	
	/* $("#dataVencimentoNota").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoNota").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoNota").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoNota").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	/* $("#dataVencimentoDARF").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoDARF").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoDARF").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoDARF").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	/* $("#dataVencimentoDARM").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoDARM").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoDARM").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoDARM").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	/* $("#dataVencimentoDAMSP").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoDAMSP").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoDAMSP").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoDAMSP").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	});*/
	/* $("#dataValidadeGRF").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataValidadeGRF").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataValidadeGRF").focusout().val("");
			}else{
				let dataAtual = $("#dataValidadeGRF").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	/* $("#dataVencimentoDARFWEB").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#dataVencimentoDARFWEB").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimentoDARFWEB").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoDARFWEB").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	$("#dataPagamentoDARFWEB").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataPagamento = $("#dataPagamentoDARFWEB").val();
		let dataVencimentoNota = $("#dataVencimentoDARFWEB").val();
		if(dataPagamento != "" && dataVencimentoNota != ""){
			let comparacao = compararDatas(dataPagamento,dataVencimentoNota);
			let comparacao2 = compararDatas(dataAtual,dataPagamento);
			/* if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser maior que a Data de Vencimento!',type: 'warning'});
				$("#dataPagamentoDARFWEB").focusout().val("");
			} */
			if(comparacao2 == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataPagamentoDARFWEB").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoDARFWEB").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	});
	/* $("#codVencimentoGPS").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataVencimentoNota = $("#codVencimentoGPS").val();
		if(dataVencimentoNota != ""){
			let comparacao = compararDatas(dataAtual,dataVencimentoNota);
			if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#codVencimentoGPS").focusout().val("");
			}else{
				let dataAtual = $("#codVencimentoGPS").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	$("#datapagamentoNota").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		let dataPagamento = $("#datapagamentoNota").val();
		let dataVencimentoNota = $("#dataVencimentoNota").val();
		if(dataPagamento != "" && dataVencimentoNota != ""){
			let comparacao = compararDatas(dataPagamento,dataVencimentoNota);
			let comparacao2 = compararDatas(dataAtual,dataPagamento);
			/* if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser maior que a Data de Vencimento!',type: 'warning'});
				$("#datapagamentoNota").focusout().val("");
			} */
			if(comparacao2 == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser menor que a data atual!',type: 'warning'});
				$("#datapagamentoNota").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimentoNota").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
			}
		}
	});
	/* $("#dataVencimento").on('blur', () => {
		console.log("Entrou");
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
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Vencimento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataVencimento").focusout().val("");
			}else{
				let dataAtual = $("#dataVencimento").val();
				let dateSplit = dataAtual.split('-');
				let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
				$("#hiddenDataVencimento").val(newDate);
				$("#dataVencimentoDiversos").val(newDate);
				$("#mesVencimentoDiversos").val(dateSplit[1]);
				$("#anoVencimentoDiversos").val(dateSplit[0]);
			}
		}
	}); */
	$("#dataPagamento").on('blur', () => {
		let data = new Date();
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        let dataAtual = ano+"-"+mes+"-"+dia;
		
		let dataPagamento = $("#dataPagamento").val();
		let dataVencimentoNota = $("#dataVencimento").val();

		if(dataPagamento != "" && dataVencimentoNota != ""){
			let comparacao = compararDatas(dataPagamento,dataVencimentoNota);
			let comparacao2 = compararDatas(dataAtual,dataPagamento);
			/* if(comparacao == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser maior que a Data de Vencimento!',type: 'warning'});
				$("#dataPagamento").focusout().val("");
			} */
			if(comparacao2 == false){
				FLUIGC.toast({title: 'Atenção: ',message: 'Data de Pagamento não pode ser menor que a data atual!',type: 'warning'});
				$("#dataPagamento").focusout().val("");
			}
		}else{
			let dataAtual = $("#dataVencimento").val();
			let dateSplit = dataAtual.split('-');
			let newDate = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
			$("#hiddenDataVencimento").val(newDate);
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
/*
function ocultaDivBoleto(tipo){
	if(tipo.value != "semCodigo"){
		$("#divNumeroBoleto").css("display","none");
	}else{
		$("#divNumeroBoleto").css("display","block");

	}
}

function ocultaDivCodigoBarras(tipo){
	if(tipo != "comCodigo"){
		$("#divComCodigo").css("display","block");
		$("#divSemCodigo").css("display","none");

	}else{
		$("#divSemCodigo").css("display","block");
		$("#divComCodigo").css("display","none");
	}
}
*/
function valorTotal(){
	let formaPagamento = $('#formaPagamento').val();
	if(formaPagamento == 'semCodigo'){
		let total = currencyToNumber($("#valorPrincipal").val()) + currencyToNumber($("#valorMulta").val()) + currencyToNumber($("#valorJuros").val());
		$("#valorTotalDocumento").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'comCodigo'){
		let total = currencyToNumber($("#valorPrincipalCodBarras").val()) + currencyToNumber($("#valorMultaCodBarras").val()) + currencyToNumber($("#valorJurosCodBarras").val());
		$("#valorTotalComCodigo").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'darf'){
		let total = currencyToNumber($("#valorPrincipalDARF").val()) + currencyToNumber($("#valorMultaDARF").val()) + currencyToNumber($("#valorJurosEncargosDARF").val());
		$("#valorTotalDARF").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'darm'){
		let total = currencyToNumber($("#valorTributoDARM").val()) + currencyToNumber($("#valorMoraDARM").val()) + currencyToNumber($("#valorMultaDARM").val());
		$("#valorTotalDARM").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'gps'){
		let total = currencyToNumber($("#valorInssGPS").val()) + currencyToNumber($("#valorOutrasGPS").val()) + currencyToNumber($("#valorJurosGPS").val());
		$("#valorTotalGPS").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'grf'){
		let total = currencyToNumber($("#valorDepostioGRF").val()) + currencyToNumber($("#valorEncargosGRF").val());
		$("#valorTotalGRF").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'damsp'){
		let total = currencyToNumber($("#valorDAMSP").val()) + currencyToNumber($("#valorMultaDAMSP").val()) + currencyToNumber($("#valorJurosDAMSP").val()) + currencyToNumber($("#valorAtualizaMonetariaDAMSP").val()) + currencyToNumber($("#valorOutrosEncargosDAMSP").val());
		$("#valorTotalDAMSP").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	if(formaPagamento == 'darfWeb'){
		let total = currencyToNumber($("#valorPrincipalDARFWEB").val()) + currencyToNumber($("#valorMultaDARFWEB").val()) + currencyToNumber($("#valorJurosEncargosDARFWEB").val());
		$("#valorTotalDARFWEB").val(numberToCurrency(total))
		$("#valorTotalDocumentoReal").val(numberToCurrency(total))
		$("#valorRequisicao").val(numberToCurrency(total))
	}
	
	

	determinaDestino()
}
/* function valorComCodigo(){
	$("#valorTotalDocumentoReal").val($("#valorTotalComCodigo").val());
	$("#valorRequisicao").val($("#valorTotalComCodigo").val());
	$("#valorTotalDocumento").val($("#valorTotalComCodigo").val());
	determinaDestino();
} */
function determinaDestino(){
	let atividade = $("#atividadeAtual").val()
	if(atividade == 4 || atividade == 0 || atividade == 86){
		if(currencyToNumber($("#valorTotalDocumentoReal").val()) <= currencyToNumber($("#valorSupervisor").val())){
			$("#aprovadorDestino").val("supervisor")
		}
		if(currencyToNumber($("#valorTotalDocumentoReal").val()) > currencyToNumber($("#valorSupervisor").val())){
			if(currencyToNumber($("#valorTotalDocumentoReal").val()) <= currencyToNumber($("#valorCoordenador").val())){
				$("#aprovadorDestino").val("supervisor")
			}
		}
		if(currencyToNumber($("#valorTotalDocumentoReal").val()) > currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador");			
		}	
	}if(atividade == 5){
		if(currencyToNumber($("#valorTotalDocumentoReal").val()) > currencyToNumber($("#valorSupervisor").val()) && currencyToNumber($("#valorTotalDocumentoReal").val()) <= currencyToNumber($("#valorCoordenador").val())){
			$("#aprovadorDestino").val("coordenador")
		}else{
			$("#aprovadorDestino").val("celulaFiscal")
		}
	}if(atividade == 21){
		if(currencyToNumber($("#valorTotalDocumentoReal").val()) > currencyToNumber($("#valorGerente").val())){
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
	if(selectedItem.inputId == 'colabForn'){
		var contaDebito = selectedItem.contaDebito;
		console.log(contaDebito);
		var contaCredito = selectedItem.contaCredito;
		console.log(contaCredito);
		$("#contaDebito").val(contaDebito);
		$("#contaCredito").val(contaCredito);
	}
}
function anexarArquivo(){
	JSInterface.showCamera();
	$(window.top.document).find('#attachmentsStatusTab').trigger('click');  
}