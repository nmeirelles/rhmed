function afterTaskSave(colleagueId,nextSequenceId,userList){
    var atividade = getValue("WKNumState");
	var processo = getValue("WKNumProces");
	var usuarioSubstituto = getValue("WKReplacement");
	var matriculaAlcadaSupervisor = hAPI.getCardValue("aprovadorSupervisor");
	var matriculaAlcadaCoordenador = hAPI.getCardValue("aprovadorCoordenador");
	var matriculaAlcadaGerente = hAPI.getCardValue("aprovadorGerente");
	var matriculaAlcadaDiretor = hAPI.getCardValue("aprovadorDiretor");
	var matriculaAprovador = hAPI.getCardValue("matriculaAprovador");
	var supervisor = 3;
	var coordenador = 5;
	var coordenador2 = 7;
	var gerente = 9;
	var diretor = 10;
	var celulaFiscal = 12;
	var contasPagar = 28;

    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Alcada Supervisor");
    log.info(matriculaAlcadaSupervisor);
    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Alcada Coordenador");
    log.info(matriculaAlcadaCoordenador);
    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Alcada Gerente");
    log.info(matriculaAlcadaGerente);
    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Alcada Diretor");
    log.info(matriculaAlcadaDiretor);
    log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Aprovador");
    log.info(matriculaAprovador);
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Matricula Substituto");
    log.info(usuarioSubstituto);

	if (atividade == supervisor){
		if (matriculaAlcadaSupervisor != matriculaAprovador){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' '+ statusAprovacao +' a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo,  0, obs);
		}
	}
    if (atividade == coordenador || atividade == coordenador2){        
		if (matriculaAlcadaCoordenador != matriculaAprovador){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' '+ statusAprovacao +' a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo,  0, obs);
		}
	}
    if (atividade == gerente){		
		if (matriculaAlcadaGerente != matriculaAprovador){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' '+ statusAprovacao +' a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo,  0, obs);
		}
	}
    if (atividade == diretor){		
		if (matriculaAlcadaDiretor != matriculaAprovador){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' '+ statusAprovacao +' a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo,  0, obs);
		}
	}
	if (atividade == celulaFiscal){
		if (usuarioSubstituto != "" || usuarioSubstituto != null){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' '+ statusAprovacao +' a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo, 0, obs);
		}
	}
	if (atividade == contasPagar){
		if (usuarioSubstituto != "" || usuarioSubstituto != null){
			var userSubstituto = hAPI.getCardValue("nomeAprovador");
			var aprovacaoCoord = hAPI.getCardValue("aprovacaoCoordenador");
			var statusAprovacao = "";
			if (aprovacaoCoord == "Sim"){
				var statusAprovacao = "aprovou";
			}else if (aprovacaoCoord == "Nao"){
				var statusAprovacao = "reprovou";
			}else if (aprovacaoCoord == "Cancelado"){
				var statusAprovacao = "cancelou";
			}
            var obs = '<p><u><span style="color:#e74c3c;">'+ userSubstituto +' movimentou a solicitação como substituto.</span></u></p>';
			hAPI.setTaskComments("admin", processo, 2, obs);
		}
	}
}