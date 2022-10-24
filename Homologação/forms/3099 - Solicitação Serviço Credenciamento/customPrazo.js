var beforeSendValidate = function(numState, nextState){
    // Atualiza o prazo fora da atividade inicial
    if(numState != 0 && numState != 4){
        var regexPrazo = /\d{3}:\d{2}/;

        var numeroSolicitacao = $("#numeroSolicitacao").val();
        console.log(numeroSolicitacao);

        // Verifica se o executor solicitou prospecção
        var selectAnaliseExecucao = $("#selectAnaliseExecucao").val();
        console.log(selectAnaliseExecucao);
        var alteracaoPrazo = $("#alteracaoPrazo").val();
        console.log(alteracaoPrazo);
        console.log(nextState);


        // Se solicitou prospecção, seta o novo prazo no campo do formulário
        console.log(selectAnaliseExecucao == "confirmarProspeccao" && nextState == 35 && alteracaoPrazo != "sim");
        if(selectAnaliseExecucao == "confirmarProspeccao" && nextState == 35 && alteracaoPrazo != "sim"){

            console.log("Se solicitou prospecção, seta o novo prazo no campo do formulário");

            var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
            var dsProcessTask = DatasetFactory.getDataset("processTask", null, [c1], null);
            console.log(dsProcessTask);
            var totalMovimentacao = dsProcessTask.values.length - 1;
            console.log(totalMovimentacao);
            var ultimaAtividade = dsProcessTask.values[totalMovimentacao]["processTaskPK.movementSequence"] + 2;
            console.log(ultimaAtividade);
            $("#ultimaAtividadePrazo").val(ultimaAtividade);
            $("#prazo").val("056:00");
            $("#alteracaoPrazo").val("sim");
        }

        // Caso não precise de prospecção
        else{

            var prazo = $("#prazo").val();
            console.log(prazo);
            var servico = $("#servico").val();
            console.log(servico);

            var c1 = DatasetFactory.createConstraint("numeroSolicitacao", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
            var constraints = [c1, c2];
            console.log(constraints);
            var dsForm = DatasetFactory.getDataset("ds_form_servico_credenciamento", null, constraints, null);
            console.log(dsForm);
            var servicoEscolhido = dsForm.values[0]["servico"];
            console.log(servicoEscolhido);


            if(prazo.match(regexPrazo) && (servico == servicoEscolhido) && alteracaoPrazo != "sim"){

                console.log("Quando não há alteração de prazo");

                var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
                var c2 = DatasetFactory.createConstraint("processTaskPK.movementSequence", 2, 2, ConstraintType.MUST);
                var constraints = [c1, c2];
                console.log(constraints);
                var dsProcessTask = DatasetFactory.getDataset("processTask", null, constraints, null);
                console.log(dsProcessTask);
                var prazo = dsProcessTask.values[0]["deadline"];
                console.log(prazo);
                var newDate = new Date (prazo);
                console.log(newDate);
                var oldPrazo = newDate.toLocaleString().substring(0,16);
                console.log(oldPrazo);
                $("#prazo").val(oldPrazo);
            }

            // Quando não é alterado o serviço, busca a última atualização
            else if(prazo.match(regexPrazo) && (servico == servicoEscolhido)){

                console.log("Quando não é alterado o serviço, busca a última atualização");

                var ultimaAtividadePrazo = $("#ultimaAtividadePrazo").val();
                var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
                var c2 = DatasetFactory.createConstraint("processTaskPK.movementSequence", ultimaAtividadePrazo, ultimaAtividadePrazo, ConstraintType.MUST);
                var constraints = [c1, c2];
                console.log(constraints);
                var dsProcessTask = DatasetFactory.getDataset("processTask", null, constraints, null);
                console.log(dsProcessTask);
                var prazo = dsProcessTask.values[0]["deadline"];
                console.log(prazo);
                var newDate = new Date (prazo);
                console.log(newDate);
                var oldPrazo = newDate.toLocaleString().substring(0,16);
                console.log(oldPrazo);
                $("#prazo").val(oldPrazo);
            }

            // Quando é alterado o serviço atualiza o prazo e a última atividade do prazo
            else if(prazo.match(regexPrazo) && (servico != servicoEscolhido)){

                console.log("Quando é alterado o serviço atualiza o prazo e a última atividade do prazo");

                $("#prazo").val(prazo);
                var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", numeroSolicitacao, numeroSolicitacao, ConstraintType.MUST);
                var dsProcessTask = DatasetFactory.getDataset("processTask", null, [c1], null);
                console.log(dsProcessTask);
                var totalMovimentacao = dsProcessTask.values.length - 1;
                console.log(totalMovimentacao);
                var ultimaAtividade = dsProcessTask.values[totalMovimentacao]["processTaskPK.movementSequence"] + 1;
                console.log(ultimaAtividade);
                $("#ultimaAtividadePrazo").val(ultimaAtividade);
            }
            
        }
    }
}