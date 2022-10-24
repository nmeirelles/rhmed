function afterTaskComplete(colleagueId,nextSequenceId,userList){
	var atividade = getValue("WKNumState");
	var dataJs = new Date();
	hAPI.setCardValue("atividadeAtual",nextSequenceId);
	if ((atividade == 0 || atividade == 4) && nextSequenceId == 15){
        hAPI.setCardValue("dataInicioProcesso", toDateString(dataJs));
    }
	
	if (atividade == 61 && nextSequenceId == 63){
        hAPI.setCardValue("dataFinalProcesso", toDateString(dataJs));
    }
}

function toDateString(dateJs){
    var dia = dateJs.getDate();
    var mes = dateJs.getMonth() + 1;
    var ano = dateJs.getFullYear();
    return ((dia < 10 ? "0" + dia : dia) + '/' + (mes < 10 ? "0" + mes : mes) + '/' + ano)
}