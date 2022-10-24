function validateForm(form){
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";

	if (atividadeAtual == 2 || atividadeAtual == 0 || atividadeAtual == 26){
		let motivoContratacao = form.getValue("selectMotivoContratacao");
		let tipoContratacao = form.getValue("selectTipoContratacao");
		let urgencia = form.getValue("selectUrgencia");
		let fretadoCliente = form.getValue("selectFretadoCliente");
		let vt = form.getValue("selectVt");
		let auxCombustivel = form.getValue("selectAuxCombustivel");
		let vtValorFixo = form.getValue("selectVtFixo");
		let insalubridade = form.getValue("selectInsalubridade");
		let periculosidade = form.getValue("selectPericulosidade");

		// Painel Dados da Vaga
		if(campoVazio(form, "selectAreaRH")){
			msgErro += "<li>Área do RH (Responsável)</li>";
		}
		if(campoVazio(form, "selectMotivoContratacao")){
			msgErro += "<li>Motivo da Contratação</li>";
		}
		if(campoVazio(form, "selectUrgencia")){
			msgErro += "<li>Urgência</li>";
		}
		if(campoVazio(form, "zoomFilial")){
			msgErro += "<li>Filial</li>";
		}
		if(campoVazio(form, "zoomCentroCusto")){
			msgErro += "<li>Centro de Custo</li>";
		}
		if(campoVazio(form, "selectTipoContratacao")){
			msgErro += "<li>Tipo da Contratação</li>";
		}
		if(campoVazio(form, "selectCargo")){
			msgErro += "<li>Cargo do Candidato</li>";
		}
		if(campoVazio(form, "selectFuncao")){
			msgErro += "<li>Função do Candidato</li>";
		}
		if(campoVazio(form, "dataPrevIniProf")){
			msgErro += "<li>Previsão de Início do Profissional</li>";
		}
		if(campoVazio(form, "inputEscala")){
			msgErro += "<li>Escala</li>";
		}
		if(campoVazio(form, "inputHorario")){
			msgErro += "<li>Horário</li>";
		}
		if(campoVazio(form, "inputClienteUnidade")){
			msgErro += "<li>Cliente/Unidade</li>";
		}
		if(campoVazio(form, "inputEnderecoTrabalho")){
			msgErro += "<li>Endereço do Trabalho</li>";
		}
		if(motivoContratacao == "coberturaFalta" || motivoContratacao == "coberturaFerias" || motivoContratacao == "substituicao"){
			if(campoVazio(form, "inputNomeColabSubst")){
				msgErro += "<li>Nome do Colaborador Substituido</li>";
			}
		}
		if(tipoContratacao == "cltDeterminato" || tipoContratacao == "pj" || tipoContratacao == "rpa" || tipoContratacao == "credenciado"){
			if(campoVazio(form, "inputTempoDias")){
				msgErro += "<li>Tempo em Dias</li>";
			}
		}
		if(urgencia == "emergencial"){
			if(campoVazio(form, "obsDadosSolicitacao")){
				msgErro += "<li>Observações</li>";
			}
		}

		// Painel Salário e Benefícios
		if(motivoContratacao == "aumentoQuadro" || motivoContratacao == "implantacao"){
			if(campoVazio(form, "inputSalario")){
				msgErro += "<li>Salário</li>";
			}
			if(campoVazio(form, "selectResponsTecnica")){
				msgErro += "<li>Responsabilidade Técnica</li>";
			}
			if(campoVazio(form, "selectRefeicaoLocal")){
				msgErro += "<li>Refeição Local</li>";
			}
			if(campoVazio(form, "selectPlanoMedico")){
				msgErro += "<li>Plano Médico</li>";
			}
			if(campoVazio(form, "selectPlanoOdonto")){
				msgErro += "<li>Plano Odontológico</li>";
			}
			if(campoVazio(form, "selectVrVa")){
				msgErro += "<li>VR/VA</li>";
			}
			/* if(campoVazio(form, "selectFretadoCliente")){
				msgErro += "<li>Fretado pelo cliente</li>";
			}
			if(campoVazio(form, "selectVt")){
				msgErro += "<li>VT</li>";
			} */
			/* if((campoVazio(form, "selectAuxCombustivel") || campoNegativo(form, "selectAuxCombustivel")) && (campoVazio(form, "selectVtFixo") || campoNegativo(form, "selectVtFixo"))){
				msgErro += "<li>Auxílio Combustível ou VT Valor Fixo</li>";
			} */
			/* if(campoVazio(form, "selectVtFixo")){
				msgErro += "<li>VT Valor Fixo</li>";
			} */
			if(campoVazio(form, "selectInsalubridade")){
				msgErro += "<li>Insalubridade</li>";
			}
			if(campoVazio(form, "selectPericulosidade")){
				msgErro += "<li>Periculosidade</li>";
			}
			if(auxCombustivel == "sim"){
				if(campoVazio(form, "inputValorPrevisto")){
					msgErro += "<li>Valor Previsto Auxílio / VT</li>";
				}
			}
			if(vtValorFixo == "sim"){
				if(campoVazio(form, "inputValorPrevisto")){
					msgErro += "<li>Valor Previsto Auxílio / VT</li>";
				}
			}
			if(insalubridade == "sim"){
				if(campoVazio(form, "inputPorcentInsalub")){
					msgErro += "<li>(%)</li>";
				}
			}
			if(periculosidade == "sim"){
				if(campoVazio(form, "inputPorcentPericulos")){
					msgErro += "<li>(%)</li>";
				}
			}
		}

		// Painel Outras Informações
		if(campoVazio(form, "selectDocSolidaria")){
			msgErro += "<li>Documentação Solidária</li>";
		}
		if(campoVazio(form, "selectIntegracao")){
			msgErro += "<li>Integração</li>";
		}
		if(campoVazio(form, "selectCNH")){
			msgErro += "<li>Carteira de Habilitação</li>";
		}
		if(campoVazio(form, "textAreaDescAtividades")){
			msgErro += "<li>Descrição de Atividades</li>";
		}
		if(campoVazio(form, "textAreaHabilidades")){
			msgErro += "<li>Habilidades</li>";
		}
		if(campoVazio(form, "textAreaCompetencia")){
			msgErro += "<li>Competência</li>";
		}

		// Painel Equipamentos
		if(campoVazio(form, "selectNotebook")){
			msgErro += "<li>Notebook</li>";
		}
		if(campoVazio(form, "selectDesktop")){
			msgErro += "<li>Desktop</li>";
		}
		if(campoVazio(form, "selectCelular")){
			msgErro += "<li>Celular</li>";
		}
		if(campoVazio(form, "selectEPI")){
			msgErro += "<li>EPI</li>";
		}
		if(campoVazio(form, "selectMesa")){
			msgErro += "<li>Mesa</li>";
		}
		if(campoVazio(form, "selectCadeira")){
			msgErro += "<li>Cadeira</li>";
		}
		if(campoVazio(form, "selectRamal")){
			msgErro += "<li>Ramal</li>";
		}
	}

	// Etapa Gerente ou Diretoria
	if(atividadeAtual == 9 || atividadeAtual == 106){
		let aprovacaoSolicitacao = form.getValue("aprovacaoCoordenador");

		if(aprovacaoSolicitacao == "Nao" || aprovacaoSolicitacao == "Cancelado"){
			if(campoVazio(form, "origem")){
				msgErro += "<li>Observações</li>";
			}
		}
	}

	//Etapa Aprovação
	if(atividadeAtual == 12 || atividadeAtual == 121){
		let aprovacaoSolicitacao = form.getValue("aprovacaoCoordenador");

		if(aprovacaoSolicitacao == "Nao" || aprovacaoSolicitacao == "Cancelado"){
			if(campoVazio(form, "origem")){
				msgErro += "<li>Observações</li>";
			}
		}
	}

	// Etapa Contratação
	if(atividadeAtual == 124 || atividadeAtual == 125){
		let statusSolicitacao = form.getValue("aprovacaoAnalistaRH");
		if(campoVazio(form, "aprovacaoAnalistaRH")){
			msgErro += "<li>Status da Solicitação</li>";
		}
		if(statusSolicitacao == "Nao"){
			if(campoVazio(form, "origemRH")){
				msgErro += "<li>Observações</li>";
			}
		}else if (statusSolicitacao == "Sim"){
			if(campoVazio(form, "inputDataInicioColab")){
				msgErro += "<li>Data de Início Acordada</li>";
			}
			if(campoVazio(form, "inputNomeColab")){
				msgErro += "<li>Nome do Colaborador</li>";
			}
			if(campoVazio(form, "inputTelefoneContato")){
				msgErro += "<li>Telefone de Contato</li>";
			}
		}				
	}

	if (msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	}
}
function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
		return true;
	} // if
	return false;
} // campoVazio

function campoNegativo(form, fieldname){
	if ((form.getValue(fieldname) == "nao")){
		return true;
	} // if
	return false;
} // campoVazio

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato conosco através do <a href='https://atendimento-web' target='_blank'><font color='blue' style='font-weight: bold'>atendimento</font></a>.";		
	} // else if
} // exibirMensagem

/* function format2Number(valorStr){
	if (valorStr == null || valorStr == undefined || valorStr == ""){
		return 0;
	} // if
	while (valorStr.indexOf(".") >= 0){
		valorStr = valorStr.replace(".", "");
	} // while
	if (valorStr.indexOf(",") >= 0){
		valorStr = valorStr.replace(",", ".");
	} // if
	var valor = Number(valorStr);
	if (isNaN(valor)){
		valor = 0;
	} // if
	return valor;
} // format2Number

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);
} // obterDataCorrente

function formatarMoney2Str(valor){
	var unusualSymbols = new java.text.DecimalFormatSymbols();
	unusualSymbols.setDecimalSeparator(',');
	unusualSymbols.setGroupingSeparator('.');
	var formato = new java.text.DecimalFormat("#,##0.00000", unusualSymbols).format(valor);
	return formato;
} */