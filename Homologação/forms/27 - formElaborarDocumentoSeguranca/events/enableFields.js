function enableFields(form){
	
	var atividadeAtual = getValue('WKNumState');
	
	if (atividadeAtual != '0'){   
		form.setEnabled("zoomEmpresa", false);
	}
	
	
	if (atividadeAtual == 0 || atividadeAtual == 4 || atividadeAtual == 21){ //start e revisao
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", true);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", true);
		form.setEnabled("tipoSolicitacao", true);
		form.setEnabled("checkboxDocumentos", true);
		form.setEnabled("solicEmpresaCNPJ", true);
		form.setEnabled("solicRazaoSocialEmp", true);
		form.setEnabled("nomeUnidFilial", true);
		form.setEnabled("setorEmpresa", true);
		form.setEnabled("postoTrabEmpresa", true);
		form.setEnabled("custoCadastrado", true);
		form.setEnabled("numeroOrdemServ", true);
		form.setEnabled("criterioAtendimento", true);
		form.setEnabled("dataDocumentoBase", true);
		form.setEnabled("emissaoART", true);
		form.setEnabled("cep", true);
		form.setEnabled("logradouro", true);
		form.setEnabled("numEndereco", true);
		form.setEnabled("complementoEnd", true);
		form.setEnabled("bairro", true);
		form.setEnabled("nomeCidade", true);
		form.setEnabled("nomeUF", true);
		form.setEnabled("plataforma", true);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", true);
		form.setEnabled("cargoRespImplementacao", true);
		form.setEnabled("telRespImplementacao", true);
		form.setEnabled("emailRespImplementacao", true);
		form.setEnabled("destinatarioDoc", true);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);	
	}
	
	if (atividadeAtual == 181 || atividadeAtual == 45 || atividadeAtual == 124 || atividadeAtual == 101 || atividadeAtual == 90 || atividadeAtual == 81 || atividadeAtual == 66 || atividadeAtual == 67 || atividadeAtual == 64 || atividadeAtual == 124 || atividadeAtual == 62 || atividadeAtual == 66 || atividadeAtual == 40 || atividadeAtual == 115 || atividadeAtual == 84 || atividadeAtual == 95 || atividadeAtual == 51){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 29){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", true);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", true);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}

	/*if (atividadeAtual == 49){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		//form.setEnabled("cnpjCred", false);			
		form.setEnabled("cpfRespVistoria", true);			
		form.setEnabled("regTecRespVistoria", true);			
		form.setEnabled("telRespConfirVistoria", true);			
		form.setEnabled("emailRespConfirVistoria", true);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", true);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 60){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", true);			
		form.setEnabled("cpfRespVistoria", true);			
		form.setEnabled("regTecRespVistoria", true);			
		form.setEnabled("telRespConfirVistoria", true);			
		form.setEnabled("emailRespConfirVistoria", true);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", true);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}*/
	
	if (atividadeAtual == 79){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", true);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 31){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", true);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", true);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 92){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", true);			
		//form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", true);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 144){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", true)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 99){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", true);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual == 122){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", false);			
		form.setEnabled("cnpjCred", false);			
		form.setEnabled("razaoSocialCred", false);			
		form.setEnabled("nomeRespVistoria", false);			
		form.setEnabled("cpfRespVistoria", false);			
		form.setEnabled("regTecRespVistoria", false);			
		form.setEnabled("telRespConfirVistoria", false);			
		form.setEnabled("emailRespConfirVistoria", false);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", false);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", true);			
		form.setEnabled("dataFaturamento", true);			
	}
	
		if (atividadeAtual == 38){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", true);			
		form.setEnabled("cnpjCred", true);			
		form.setEnabled("razaoSocialCred", true);			
		form.setEnabled("nomeRespVistoria", true);			
		form.setEnabled("cpfRespVistoria", true);			
		form.setEnabled("regTecRespVistoria", true);			
		form.setEnabled("telRespConfirVistoria", true);			
		form.setEnabled("emailRespConfirVistoria", true);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", true);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
			
	if (atividadeAtual == 43){   
		//TODOS OS CAMPOS FORMULARIO
		//panel Solicitante
		form.setEnabled("zoomEmpresa", false);
		//panel Solicitacao
		form.setEnabled("tipoDemanda", false);
		form.setEnabled("tipoSolicitacao", false);
		form.setEnabled("checkPPRA", false);			
		form.setEnabled("checkAE", false);			
		form.setEnabled("checkLTCAT", false);			
		form.setEnabled("checkPGR", false);			
		form.setEnabled("checkRVT", false);			
		form.setEnabled("checkCovid", false);			
		form.setEnabled("checkLaudoAmb", false);			
		form.setEnabled("checkRotaFuga", false);			
		form.setEnabled("checkOutros", false);			
		form.setEnabled("docOutros", false);
		form.setEnabled("solicEmpresaCNPJ", false);
		form.setEnabled("solicRazaoSocialEmp", false);
		form.setEnabled("solicRegional", false);
		form.setEnabled("nomeUnidFilial", false);
		form.setEnabled("setorEmpresa", false);
		form.setEnabled("postoTrabEmpresa", false);
		form.setEnabled("custoCadastrado", false);
		form.setEnabled("numeroOrdemServ", false);
		form.setEnabled("criterioAtendimento", false);
		form.setEnabled("dataDocumentoBase", false);
		form.setEnabled("emissaoART", false);
		form.setEnabled("cep", false);
		form.setEnabled("logradouro", false);
		form.setEnabled("numEndereco", false);
		form.setEnabled("complementoEnd", false);
		form.setEnabled("bairro", false);
		form.setEnabled("nomeCidade", false);
		form.setEnabled("nomeUF", false);
		form.setEnabled("plataforma", false);
		form.setEnabled("solDocumentacao", false);
		form.setEnabled("nomeRespImplementacao", false);
		form.setEnabled("cargoRespImplementacao", false);
		form.setEnabled("telRespImplementacao", false);
		form.setEnabled("emailRespImplementacao", false);
		form.setEnabled("destinatarioDoc", false);
		//panel dados vistoria			
		form.setEnabled("profissionalVistoria", true);			
		form.setEnabled("cnpjCred", true);			
		form.setEnabled("razaoSocialCred", true);			
		form.setEnabled("nomeRespVistoria", true);			
		form.setEnabled("cpfRespVistoria", true);			
		form.setEnabled("regTecRespVistoria", true);			
		form.setEnabled("telRespConfirVistoria", true);			
		form.setEnabled("emailRespConfirVistoria", true);			
		form.setEnabled("zoomTST", false);			
		form.setEnabled("zoomADM", false);			
		form.setEnabled("dataVistoria", true);			
		form.setEnabled("dataEntregaDocumento", false);			
		form.setEnabled("docAprov", false);			
		form.setEnabled("motReprov", false);			
		form.setEnabled("notifSaude", false);
		form.setEnabled("envAtualizacao", false)
		//panel financeiro
		form.setEnabled("infPagamento", false);			
		form.setEnabled("infFaturamento", false);			
		form.setEnabled("dataFaturamento", false);			
	}
	
	if (atividadeAtual != 67){   
		form.setEnabled("servExecutados", false);			
	}
	
	

}

//disableAllFields(form);
/*EXEMPLO Desabilita campo de uma Pai x Filho*/
//var indexes = form.getChildrenIndexes("pedido");
//for (var i = 0; i < indexes.length; i++) {
//    form.setEnabled("zoomOC___" + indexes[i], false);
//}

/*campos readonly
form.setEnabled("motivoSolicitacao", false);
form.setEnabled("spotServico", false);
form.setEnabled("valorServico", false);
form.setEnabled("nomeUnidFilial", false);
form.setEnabled("sistCadastrado", false);
 */

function disableAllFields(form) {
	var fields = form.getCardData();
	var iterare = fields.keySet().iterator();
	while (iterare.hasNext()) {
		var key = iterare.next();
		form.setEnabled(key, false);
	}
} // disableAllFields

