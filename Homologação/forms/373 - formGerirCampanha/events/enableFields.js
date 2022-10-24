function enableFields(form){
	var atividadeAtual = parseInt(getValue('WKNumState'));

	/*************************************BLOQUEAR CAMPOS**********************************/
	var atividades = [15,31,33,35,37,39,42,48,50,54,61,69,71,73,78,93];
	if(atividades.indexOf(atividadeAtual) > -1) disableAllFields();
	
	if(atividadeAtual != "71") form.setEnabled("confAtendRealizado", false);
	
	//TABELAS PAI-FILHO
	var tabelaProcedimentos = form.getChildrenIndexes("tabelaProcedimentos");
	var tabelaCredenciado = form.getChildrenIndexes("tabelaCredenciado");
	var tabelaReagendamento = form.getChildrenIndexes("tabelaReagendamento");
		
	if((atividadeAtual != 0) && (atividadeAtual != 4) && (atividadeAtual != 27)){
		for(var i = 0; i < tabelaProcedimentos.length; i++){
			form.setEnabled("zoomProcedimento___" + tabelaProcedimentos[i], false);
			form.setEnabled("qtdSolicitada___" + tabelaProcedimentos[i], false);
			form.setEnabled("precoClienteContrato___" + tabelaProcedimentos[i], false);
		}
	}

	if(atividadeAtual == 15) form.setEnabled("zoomRespAtend", true);

	if(atividadeAtual == 54 || atividadeAtual == 78 || atividadeAtual == 61){
		for(var i = 0; i < tabelaCredenciado.length; i++) {
			// form.setEnabled("selectProcedimento___" + tabelaCredenciado[i], false);
			// form.setEnabled("procedSelecionado___" + tabelaCredenciado[i], false);
			// form.setEnabled("tipoContratacao___" + tabelaCredenciado[i], false);
			// form.setEnabled("cpfCnpjPrestador___" + tabelaCredenciado[i], false);
			// form.setEnabled("nomePrestador___" + tabelaCredenciado[i], false);
			// form.setEnabled("telCredenciado___" + tabelaCredenciado[i], false);
			// form.setEnabled("emailCredenciado___" + tabelaCredenciado[i], false);
			// form.setEnabled("nomeProfissional___" + tabelaCredenciado[i], false);
			// form.setEnabled("regProfissional___" + tabelaCredenciado[i], false);
			// form.setEnabled("telProfissional___" + tabelaCredenciado[i], false);
			// form.setEnabled("emailProfissional___" + tabelaCredenciado[i], false);
			// form.setEnabled("dataAtendAgendada___" + tabelaCredenciado[i], false);
			// form.setEnabled("horaAtendEntrada___" + tabelaCredenciado[i], false);
			// form.setEnabled("inicioPausa___" + tabelaCredenciado[i], false);
			// form.setEnabled("fimPausa___" + tabelaCredenciado[i], false);
			// form.setEnabled("horaAtendSaida___" + tabelaCredenciado[i], false);
			// form.setEnabled("obsAtendimento___" + tabelaCredenciado[i], false);
			// form.setEnabled("tipoNegociacao___" + tabelaCredenciado[i], false);
			// form.setEnabled("valorAcordado___" + tabelaCredenciado[i], false);
			// form.setEnabled("garantia___" + tabelaCredenciado[i], false);
			// form.setEnabled("deslocamento___" + tabelaCredenciado[i], false);
		}
		for(var i = 0; i < tabelaReagendamento.length; i++){
			// form.setEnabled("selectProcedimentoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("procedSelecionadoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("tipoContratacaoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("cpfCnpjPrestadorR___" + tabelaReagendamento[i], false);
			// form.setEnabled("nomePrestadorR___" + tabelaReagendamento[i], false);
			// form.setEnabled("telCredenciadoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("emailCredenciadoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("nomeProfissionalR___" + tabelaReagendamento[i], false);
			// form.setEnabled("regProfissionalR___" + tabelaReagendamento[i], false);
			// form.setEnabled("telProfissionalR___" + tabelaReagendamento[i], false);
			// form.setEnabled("emailProfissionalR___" + tabelaReagendamento[i], false);
			// form.setEnabled("dataAtendAgendadaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("horaAtendEntradaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("inicioPausaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("fimPausaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("horaAtendSaidaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("obsAtendimentoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("selectMotivoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("tipoNegociacaoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("valorAcordadoR___" + tabelaReagendamento[i], false);
			// form.setEnabled("garantiaR___" + tabelaReagendamento[i], false);
			// form.setEnabled("deslocamentoR___" + tabelaReagendamento[i], false);
		}
	}

	if(atividadeAtual == 61){
		form.setEnabled("dataFaturamento", true);
	}

	// if(atividadeAtual == 78){
	// 	for(var i = 0; i < tabelaCredenciado.length; i++) {
	// 		var inputProcedimentoReagendado = form.getValue("inputProcedimentoReagendado___" + tabelaCredenciado[i]);
	// 		log.info("inputProcedimentoReagendado: "+inputProcedimentoReagendado);
	//
	// 		var reagendado = inputProcedimentoReagendado.split("-")[0];
	// 		log.info("reagendado: "+reagendado);
	//
	// 		if(reagendado == "nao"){
	// 			form.setEnabled("NfRpa___" + tabelaCredenciado[i], false);
	// 			form.setEnabled("dataEnvioMalote___" + tabelaCredenciado[i], false);
	// 		}
	//
	// 	}
	// 		for(var j = 0; j < tabelaReagendamento.length; j++){
	// 			var procedimentoReagendamento = form.getValue("procedSelecionadoR___" + tabelaReagendamento[j]);
	// 			if(procedimentoCredenciado == procedimentoReagendamento){
	// 				form.setEnabled("NfRpa___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("dataEnvioMalote___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("NfRpaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("dataEnvioMaloteR___" + tabelaReagendamento[j], true);
	//
	// 			}
	// 		}
	//
	// }
	//
	// if(atividadeAtual != 54){
	// 	for(var i = 0; i < tabelaCredenciado.length; i++){
	// 		form.setEnabled("valorAusencia___" + tabelaCredenciado[i], false);
	// 		form.setEnabled("qtdTotalRealizada___" + tabelaCredenciado[i], false);
	// 		form.setEnabled("qtdMinima___" + tabelaCredenciado[i], false);
	// 		form.setEnabled("taxa___" + tabelaCredenciado[i], false);
	// 	}
	// }else{
	// 	for(var i = 0; i < tabelaCredenciado.length; i++){
	// 		var procedimentoCredenciado = form.getValue("procedSelecionado___" + tabelaCredenciado[i]);
	// 		for(var j = 0; j < tabelaReagendamento.length; j++){
	// 			var procedimentoReagendamento = form.getValue("procedSelecionadoR___" + tabelaReagendamento[j]);
	// 			if(procedimentoCredenciado == procedimentoReagendamento){
	// 				form.setEnabled("valorAusencia___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("qtdTotalRealizada___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("qtdMinima___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("taxa___" + tabelaCredenciado[i], false);
	// 				form.setEnabled("valorAusenciaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("qtdTotalRealizadaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("qtdMinimaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("taxaR___" + tabelaReagendamento[j], true);
	// 			}
	// 		}
	// 	}
	// }
	//
	// if(atividadeAtual == 95 || atividadeAtual == 115 || atividadeAtual == 116){
	// 	for(var i = 0; i < tabelaCredenciado.length; i++){
	// 		var procedimentoCredenciado = form.getValue("procedSelecionado___" + tabelaCredenciado[i]);
	// 		var procedimentoReagendado = false;
	// 		for(var j = tabelaReagendamento.length; j > 0; j--){
	// 			var procedimentoReagendamento = form.getValue("procedSelecionadoR___" + tabelaReagendamento[j]);
	// 			if(procedimentoCredenciado == procedimentoReagendamento){
	// 				procedimentoReagendado = true;
	// 				form.setEnabled("dataAtendAgendadaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("horaAtendEntradaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("inicioPausaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("fimPausaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("horaAtendSaidaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("selectMotivoR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("obsAtendimentoR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("qtdPrevistaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("qtdTotalRealizadaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("qtdMinimaR___" + tabelaReagendamento[j], true);
	// 				form.setEnabled("taxaR___" + tabelaReagendamento[j], true);
	// 				break;
	// 			}
	// 		}
	// 		if(procedimentoReagendado == false){
	// 			form.setEnabled("dataAtendAgendada___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("horaAtendEntrada___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("inicioPausa___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("fimPausa___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("horaAtendSaida___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("selectMotivo___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("obsAtendimento___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("qtdPrevista___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("qtdTotalRealizada___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("qtdMinima___" + tabelaCredenciado[i], true);
	// 			form.setEnabled("taxa___" + tabelaCredenciado[i], true);
	// 		}
	// 	}
	// }
	//
	if(atividadeAtual == 61){
		for(var i = 0; i < tabelaCredenciado.length; i++){
			form.setEnabled("procedSelecionado___" + tabelaCredenciado[i], false);
			form.setEnabled("NfRpa___" + tabelaCredenciado[i], false);
			form.setEnabled("dataEnvioMalote___" + tabelaCredenciado[i], false);
			form.setEnabled("tipoContratacao___" + tabelaCredenciado[i], false);
			form.setEnabled("cpfCnpjPrestador___" + tabelaCredenciado[i], false);
			form.setEnabled("nomePrestador___" + tabelaCredenciado[i], false);
			form.setEnabled("telCredenciado___" + tabelaCredenciado[i], false);
			form.setEnabled("emailCredenciado___" + tabelaCredenciado[i], false);
			form.setEnabled("nomeProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("regProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("telProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("emailProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("dataAtendAgendada___" + tabelaCredenciado[i], false);
			form.setEnabled("horaAtendEntrada___" + tabelaCredenciado[i], false);
			form.setEnabled("inicioPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("fimPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("horaAtendSaida___" + tabelaCredenciado[i], false);
			form.setEnabled("perAlocado___" + tabelaCredenciado[i], false);
			form.setEnabled("perPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("obsAtendimento___" + tabelaCredenciado[i], false);
			form.setEnabled("tipoNegociacao___" + tabelaCredenciado[i], false);
			form.setEnabled("valorAcordado___" + tabelaCredenciado[i], false);
			form.setEnabled("garantia___" + tabelaCredenciado[i], false);
			form.setEnabled("deslocamento___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdPrevista___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdTotalRealizada___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("valorAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdMinima___" + tabelaCredenciado[i], false);
			form.setEnabled("taxa___" + tabelaCredenciado[i], false);
			form.setEnabled("valorTotalAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("valorTotalProcedimento___" + tabelaCredenciado[i], false);
		}

		for(var j = 0; j < tabelaReagendamento.length; j++){
			form.setEnabled("procedSelecionadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("NfRpaR___" + tabelaReagendamento[j], false);
			form.setEnabled("dataEnvioMaloteR___" + tabelaReagendamento[j], false);
			form.setEnabled("tipoContratacaoR___" + tabelaReagendamento[j], false);
			form.setEnabled("cpfCnpjPrestadorR___" + tabelaReagendamento[j], false);
			form.setEnabled("nomePrestadorR___" + tabelaReagendamento[j], false);
			form.setEnabled("telCredenciadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("emailCredenciadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("nomeProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("regProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("telProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("emailProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("dataAtendAgendadaR___" + tabelaReagendamento[j], false);
			form.setEnabled("horaAtendEntradaR___" + tabelaReagendamento[j], false);
			form.setEnabled("inicioPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("fimPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("horaAtendSaidaR___" + tabelaReagendamento[j], false);
			form.setEnabled("perAlocadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("perPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("obsAtendimentoR___" + tabelaReagendamento[j], false);
			form.setEnabled("tipoNegociacaoR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorAcordadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("garantiaR___" + tabelaReagendamento[j], false);
			form.setEnabled("deslocamentoR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdPrevistaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdTotalRealizadaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdMinimaR___" + tabelaReagendamento[j], false);
			form.setEnabled("taxaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorTotalAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorTotalProcedimentoR___" + tabelaReagendamento[j], false);
				
		}
	}

	if(atividadeAtual == 78){
		for(var i = 0; i < tabelaCredenciado.length; i++){
			form.setEnabled("procedSelecionado___" + tabelaCredenciado[i], false);
			// form.setEnabled("NfRpa___" + tabelaCredenciado[i], false);
			// form.setEnabled("dataEnvioMalote___" + tabelaCredenciado[i], false);
			form.setEnabled("tipoContratacao___" + tabelaCredenciado[i], false);
			form.setEnabled("cpfCnpjPrestador___" + tabelaCredenciado[i], false);
			form.setEnabled("nomePrestador___" + tabelaCredenciado[i], false);
			form.setEnabled("telCredenciado___" + tabelaCredenciado[i], false);
			form.setEnabled("emailCredenciado___" + tabelaCredenciado[i], false);
			form.setEnabled("nomeProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("regProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("telProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("emailProfissional___" + tabelaCredenciado[i], false);
			form.setEnabled("dataAtendAgendada___" + tabelaCredenciado[i], false);
			form.setEnabled("horaAtendEntrada___" + tabelaCredenciado[i], false);
			form.setEnabled("inicioPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("fimPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("horaAtendSaida___" + tabelaCredenciado[i], false);
			form.setEnabled("perAlocado___" + tabelaCredenciado[i], false);
			form.setEnabled("perPausa___" + tabelaCredenciado[i], false);
			form.setEnabled("obsAtendimento___" + tabelaCredenciado[i], false);
			form.setEnabled("tipoNegociacao___" + tabelaCredenciado[i], false);
			form.setEnabled("valorAcordado___" + tabelaCredenciado[i], false);
			form.setEnabled("garantia___" + tabelaCredenciado[i], false);
			form.setEnabled("deslocamento___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdPrevista___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdTotalRealizada___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("valorAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("qtdMinima___" + tabelaCredenciado[i], false);
			form.setEnabled("taxa___" + tabelaCredenciado[i], false);
			form.setEnabled("valorTotalAusencia___" + tabelaCredenciado[i], false);
			form.setEnabled("valorTotalProcedimento___" + tabelaCredenciado[i], false);
		}

		for(var j = 0; j < tabelaReagendamento.length; j++){
			form.setEnabled("procedSelecionadoR___" + tabelaReagendamento[j], false);
			// form.setEnabled("NfRpaR___" + tabelaReagendamento[j], false);
			// form.setEnabled("dataEnvioMaloteR___" + tabelaReagendamento[j], false);
			form.setEnabled("tipoContratacaoR___" + tabelaReagendamento[j], false);
			form.setEnabled("cpfCnpjPrestadorR___" + tabelaReagendamento[j], false);
			form.setEnabled("nomePrestadorR___" + tabelaReagendamento[j], false);
			form.setEnabled("telCredenciadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("emailCredenciadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("nomeProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("regProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("telProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("emailProfissionalR___" + tabelaReagendamento[j], false);
			form.setEnabled("dataAtendAgendadaR___" + tabelaReagendamento[j], false);
			form.setEnabled("horaAtendEntradaR___" + tabelaReagendamento[j], false);
			form.setEnabled("inicioPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("fimPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("horaAtendSaidaR___" + tabelaReagendamento[j], false);
			form.setEnabled("perAlocadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("perPausaR___" + tabelaReagendamento[j], false);
			form.setEnabled("obsAtendimentoR___" + tabelaReagendamento[j], false);
			form.setEnabled("tipoNegociacaoR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorAcordadoR___" + tabelaReagendamento[j], false);
			form.setEnabled("garantiaR___" + tabelaReagendamento[j], false);
			form.setEnabled("deslocamentoR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdPrevistaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdTotalRealizadaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("qtdMinimaR___" + tabelaReagendamento[j], false);
			form.setEnabled("taxaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorTotalAusenciaR___" + tabelaReagendamento[j], false);
			form.setEnabled("valorTotalProcedimentoR___" + tabelaReagendamento[j], false);
				
		}
	}
			
	function disableAllFields(){
		form.setEnabled("convocacao", false);
		form.setEnabled("zoomNumeroSolicitacao", false);
		form.setEnabled("tipoContrato", false);
		form.setEnabled("zoomEmpresa", false);
		form.setEnabled("nomeEmpresa", false);
		form.setEnabled("zoomBuscaRegional", false);
		form.setEnabled("nomeFilial", false);
		form.setEnabled("codBuscaUnidade", false);
		form.setEnabled("codNomeBuscaUnidade", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("respCliente", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailCliente", false);
		form.setEnabled("possuiEstacionamento", false);
		form.setEnabled("horaFuncionamentoDe", false);
		form.setEnabled("horaFuncionamentoAte", false);
		form.setEnabled("modeloExame", false);
		form.setEnabled("valorExame", false);
		form.setEnabled("possuiNoShow", false);
		form.setEnabled("zoomPlataforma", false);
		form.setEnabled("checkMaca", false);
		form.setEnabled("checkBalanca", false);
		form.setEnabled("checkPapel", false);
		form.setEnabled("checkEsteto", false);
		form.setEnabled("checkEsfigmo", false);
		form.setEnabled("checkMatEscritorio", false);
		form.setEnabled("checkComputador", false);
		form.setEnabled("checkSala", false);
		form.setEnabled("checkMesaCadeira", false);
		form.setEnabled("checkImpASO", false);
		form.setEnabled("checkImpKit", false);
		form.setEnabled("checkOutros", false);
		form.setEnabled("mesRealizacao", false);
		form.setEnabled("zoomRespAtend", false);
		form.setEnabled("dataFaturamento", false);
	}
}