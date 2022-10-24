function resolve(process, colleague) {
	var userList = new java.util.ArrayList();
	var constraints = new Array();
	constraints.push(DatasetFactory.createConstraint("ccusto", "N.03.04 - SEGURANÃ?A DO TRABALHO", "N.03.04 - SEGURANÃ?A DO TRABALHO", ConstraintType.MUST));
	var dataset = DatasetFactory.getDataset("dsCadastroCentrodeCusto", null, constraints, null);
	if (dataset)
		userList.add(dataset.getValue(0,"gerente"));
	else
		userList.add('Pool:Group:SEGURANCA_GESTAO');
	return userList;
}