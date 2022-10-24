function beforeTaskSave(colleagueId,nextSequenceId,userList){
    hAPI.setCardValue("numeroAtividadeAtual", nextSequenceId);

    if(nextSequenceId == 3) hAPI.setCardValue("status", "Realizado");
}