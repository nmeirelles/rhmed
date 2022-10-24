function resolve(process,colleague){
	/*
	 * Configura Etapas de Alçada
	 */
	var INICIO = 0;
	var SUPERVISOR = 3;
	var COORDENADOR = 5;
	var GERENTE = 9;
	var DIRETOR = 10;
	var CORRECAO = 26;
	
	
	/*
	 * Variaveis com atividade alimentada no campo do formulario
	 */
	var atividade = hAPI.getCardValue("atividadeAtual");
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>ATIVIDADE ATUAL<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(atividade);
	var userList = new java.util.ArrayList();
	
	
	/*
	 * Consulta Dataset 'dsCadastroCentrodeCusto' para pegar os aprovadores mediante ao centro de custo selecionado
	 */
	var centroCusto = hAPI.getCardValue("zoomCentroCusto");
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>CENTRO DE CUSTO<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(centroCusto);
	var c1 = DatasetFactory.createConstraint("ccusto", centroCusto, centroCusto, ConstraintType.MUST);
	var constraints = new Array(c1);
	var dataset = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, constraints, null);
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>DATASET CENTRO DE CUSTO<<<<<<<<<<<<<<<<<<<<<<<<");
	log.dir(dataset);
	
	/*
	 * Retorno da consulta ao Dataset 'dsCadastroCentrodeCusto'
	 */
	var aprovadorSupervisor = dataset.getValue(0, 'supervisor');
	var aprovadorCoordenador = dataset.getValue(0, 'coordenador');
	var aprovadorGerente = dataset.getValue(0, 'gerente');
	var aprovadorDiretor = dataset.getValue(0, 'diretor');

	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>APROVADOR SUPERVISOR<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(aprovadorSupervisor);
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>APROVADOR COORDENADOR<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(aprovadorCoordenador);
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>APROVADOR GERENTE<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(aprovadorGerente);
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>APROVADOR DIRETOR<<<<<<<<<<<<<<<<<<<<<<<<");
	log.info(aprovadorDiretor);
	
	/*
	 * Seta campos do formulário com aprovadores
	 */
	hAPI.setCardValue("aprovadorSupervisor", aprovadorSupervisor);
	hAPI.setCardValue("aprovadorCoordenador", aprovadorCoordenador);
	hAPI.setCardValue("aprovadorGerente", aprovadorGerente);
	hAPI.setCardValue("aprovadorDiretor", aprovadorDiretor);
	
	
	/*
	 * Condicoes de tratativas
	 */
	//if(atividade == SUPERVISOR){
		userList.add(aprovadorSupervisor);
	//}
	/*
	if(atividade == COORDENADOR){
		userList.add(aprovadorCoordenador);
	}
	
	if(atividade == GERENTE){
		userList.add(aprovadorGerente);
	}
	
	if(atividade == DIRETOR){
		userList.add(aprovadorDiretor);
	}
	*/
	log.info(">>>>>>>>>>>>>>>>>>>>>>>>>USER LIST<<<<<<<<<<<<<<<<<<<<<<<<");
	log.dir(userList);
	return userList;

}