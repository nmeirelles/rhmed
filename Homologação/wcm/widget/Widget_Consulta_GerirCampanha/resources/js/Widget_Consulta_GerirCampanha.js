var WidgetConsultaGerirCampanha = SuperWidget.extend({
    init: () => {

        let inputNumeroRequisicao = $("#inputNumeroRequisicao");
        let inputResponsavelRequisicao = $("#inputResponsavelRequisicao");
        let selectSituacaoRequisicao = $("#selectSituacaoRequisicao");
        let inputCidade = $("#inputCidade");
        let selectUF = $("#selectUF");
        let selectStatus = $("#selectStatus");
        let selectExamesCancelados = $("#selectExamesCancelados");
        let inputQtdNoShow = $("#inputQtdNoShow");
        let inputMesPlanejamentoCampanha = $("#inputMesPlanejamentoCampanha");
        let btnConsultar = $("#btnConsultar");
        let btnExportar = $("#btnExportar");
        let tableGerirCampanha = $("#tableGerirCampanha");

        let dados = [];

        btnExportar.off('click');
        
        FLUIGC.filter("#inputResponsavelRequisicao",{
            source:{
                url:  '/api/public/ecm/dataset/search?datasetId=colleague&searchField=colleagueName&',
                contentType: 'application/json',
                root: 'content',
                pattern: '',
                limit: 10,
                offset: 0,
                patternKey: 'pattern',
                patternKey: 'searchValue',
                limitkey: 'limit',
                offsetKey: 'offset'
            },
            displayKey: 'login',
            multiSelect: true,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Nome', 'size':'col-sm-6', 'dataorder':'colleagueName', 'standard':true},
                    {'title':'Matrícula', 'size':'col-sm-6', 'dataorder':'login'}
                ],
                renderContent: ['colleagueName','login']
            }
        });

        inputMesPlanejamentoCampanha.on("change", (event) => {
            const mesPlanejamento = event.target.value;
            if(!mesPlanejamento.match(/\d{4}-\d{2}/)){
                inputMesPlanejamentoCampanha.val("");
                FLUIGC.toast({title: 'Atenção: ',message: 'Gentileza informar conforme orientação AAAA-MM',type: 'warning'});
            }
        });

        // Função para criar todas as constraints
        const criarConstraints = () => {
            const constraints = [];
            if(inputNumeroRequisicao.val() != ""){
                constraints.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroRequisicao.val(), inputNumeroRequisicao.val(), ConstraintType.MUST));
                return constraints;
            }

            if(inputResponsavelRequisicao.val() != ""){
                if(inputResponsavelRequisicao.val().match(",")){
                    const solicitantes = inputResponsavelRequisicao.val().split(",");
                    for(let i = 0; i < solicitantes.length; i++){
                        // let c = DatasetFactory.createConstraint("login", solicitantes[i], solicitantes[i], ConstraintType.MUST);
                        // let ds = DatasetFactory.getDataset("colleague", null, [c], null);
                        // let matricula = ds.values[0]["colleaguePK.colleagueId"];
                        let matricula = colleagueDataset.values.find(colleague => colleague.login == solicitantes[i])['colleaguePK.colleagueId'];
                        constraints.push(DatasetFactory.createConstraint("solicitanteMatricula", matricula, matricula, ConstraintType.SHOULD));  
                    }
                }else{
                    // let c = DatasetFactory.createConstraint("login", inputResponsavelRequisicao.val(), inputResponsavelRequisicao.val(), ConstraintType.MUST);
                    // let ds = DatasetFactory.getDataset("colleague", null, [c], null);
                    // let matricula = ds.values[0]["colleaguePK.colleagueId"];
                    let matricula = colleagueDataset.values.find(colleague => colleague.login == inputResponsavelRequisicao.val())['colleaguePK.colleagueId'];
                    constraints.push(DatasetFactory.createConstraint("solicitanteMatricula", matricula, matricula, ConstraintType.MUST));
                }
            }

            if(selectSituacaoRequisicao.val() != ""){
                const c1 = DatasetFactory.createConstraint("processId", "procGerirCampanha", "procGerirCampanha", ConstraintType.MUST);
                const c2 = DatasetFactory.createConstraint("status", selectSituacaoRequisicao.val(), selectSituacaoRequisicao.val(), ConstraintType.MUST);
                const workflowProcessDS = DatasetFactory.getDataset("workflowProcess", null, [c1,c2], null);
                if(workflowProcessDS != null){
                    for(let i = 0; i < workflowProcessDS.values.length; i++){
                        const numeroFluxo = workflowProcessDS.values[i]["workflowProcessPK.processInstanceId"];
                        constraints.push(DatasetFactory.createConstraint("numeroFluxo", numeroFluxo, numeroFluxo, ConstraintType.SHOULD));
                    }
                }
            }

            if(inputCidade.val() != ""){
                constraints.push(DatasetFactory.createConstraint("nomeCidade", inputCidade.val(), inputCidade.val(), ConstraintType.SHOULD, true));
            }

            if(selectUF.val() != ""){
                constraints.push(DatasetFactory.createConstraint("nomeUF", selectUF.val(), selectUF.val(), ConstraintType.MUST));
            }
            
            if(selectStatus.val() != ""){
                if(selectStatus.val() == "Fim"){
                    const c1 = DatasetFactory.createConstraint("processId", "procGerirCampanha", "procGerirCampanha", ConstraintType.MUST);
                    const c2 = DatasetFactory.createConstraint("status", "2", "2", ConstraintType.MUST);
                    const workflowProcessDS = DatasetFactory.getDataset("workflowProcess", null, [c1,c2], null);
                    if(workflowProcessDS != null){
                        for(let i = 0; i < workflowProcessDS.values.length; i++){
                            const numeroFluxo = workflowProcessDS.values[i]["workflowProcessPK.processInstanceId"];
                            constraints.push(DatasetFactory.createConstraint("numeroFluxo", numeroFluxo, numeroFluxo, ConstraintType.SHOULD));
                        }
                    }
                }else{
                    constraints.push(DatasetFactory.createConstraint("atividadeAtual", selectStatus.val(), selectStatus.val(), ConstraintType.MUST));
                }
            }

            if(selectExamesCancelados.val() != ""){
                let exameCancelado = selectExamesCancelados.val();
                if(exameCancelado == "sim") constraints.push(DatasetFactory.createConstraint("situacao", "Cancelado", "Cancelado", ConstraintType.MUST));
                if(exameCancelado == "nao") constraints.push(DatasetFactory.createConstraint("situacao", "Novo", "Novo", ConstraintType.MUST));
            }

            if(inputQtdNoShow.val() != ""){
                constraints.push(DatasetFactory.createConstraint("qtdNoShow", inputQtdNoShow.val(), inputQtdNoShow.val(), ConstraintType.MUST));
            }

            if(inputMesPlanejamentoCampanha.val() != ""){
                constraints.push(DatasetFactory.createConstraint("mesRealizacao", inputMesPlanejamentoCampanha.val(), inputMesPlanejamentoCampanha.val(), ConstraintType.MUST));
            }

            return constraints;
        }

        const createTable = (dados) => {
            console.log("Dados CreateTable!");
            console.log(dados);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableGerirCampanha > tbody > tr').remove();
                let tr = "";
                for(let i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td>'+ dados[i]["requisicao"] +'</td>'+
                                '<td>'+ dados[i]["dataCriacao"] +'</td>'+
                                '<td>'+ dados[i]["responsavel"] +'</td>'+
                                '<td>'+ dados[i]["responsavelAtividade"] +'</td>'+
                                '<td>'+ dados[i]["situacao"] +'</td>'+
                                '<td>'+ dados[i]["codigoEmpresa"] +'</td>'+
                                '<td>'+ dados[i]["nomeEmpresa"] +'</td>'+
                                '<td>'+ dados[i]["codigoFilial"] +'</td>'+
                                '<td>'+ dados[i]["nomeFilial"] +'</td>'+
                                '<td>'+ dados[i]["cidade"] +'</td>'+
                                '<td>'+ dados[i]["UF"] +'</td>'+
                                '<td>'+ dados[i]["status"] +'</td>';

                    let examesRequisitados = dados[i]["examesRequisitados"];
                    if(examesRequisitados.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesRequisitados.length; k++){
                            let procedimento = examesRequisitados[k].procedimento;
                            let quantidade = examesRequisitados[k].quantidade;
                            tr += "<li>"+procedimento+": "+quantidade+"</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    let examesCovid = dados[i]["examesCovid"];
                    if(examesCovid.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesCovid.length; k++){
                            let procedimento = examesCovid[k].procedimento;
                            let quantidade = examesCovid[k].quantidade;
                            tr += "<li>"+procedimento+": "+quantidade+"</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    let examesAgendados = dados[i]["examesAgendados"];
                    if(examesAgendados.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesAgendados.length; k++){
                            let procedSelecionado = examesAgendados[k].procedSelecionado;
                            let dataAgendada = examesAgendados[k].dataAgendada;
                            tr += "<li>" + procedSelecionado + " - " + dataAgendada + "</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    let examesReagendados = dados[i]["examesReagendados"];
                    if(examesReagendados.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesReagendados.length; k++){
                            let procedSelecionadoR = examesReagendados[k].procedSelecionadoR;
                            let dataAgendadaR = examesReagendados[k].dataAgendadaR;
                            let selectMotivoR = examesReagendados[k].selectMotivoR;
                            tr += "<li>" + procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + "</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    let examesRealizados = dados[i]["examesRealizados"];
                    if(examesRealizados.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesRealizados.length; k++){
                            let procedSelecionado = examesRealizados[k].procedSelecionado;
                            let quantidade = examesRealizados[k].quantidade;
                            tr += "<li>"+procedSelecionado+": "+quantidade+"</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    tr += '<td>'+ dados[i]["examesCancelados"] +'</td>';

                    let examesAusencia = dados[i]["quantidadeAusencias"];
                    if(examesAusencia.length > 0){
                        tr += "<td><ol>";
                        for(let k = 0; k < examesAusencia.length; k++){
                            let procedSelecionado = examesAusencia[k].procedSelecionado;
                            let qtdAusencia = examesAusencia[k].qtdAusencia;
                            tr += "<li>"+qtdAusencia+"</li>";
                        }
                        tr += "</ol></td>";
                    }else{
                        tr += "<td></td>";
                    }

                    tr += ""+
                            '<td>'+ dados[i]["mesRealizacao"] +'</td>'+
                            '<td>'+ dados[i]["mesPlanejamento"] +'</td>'+
                            '<td>'+ dados[i]["dataListaPresenca"] +'</td>'+
                            '<td>'+ dados[i]["quantidadeNoShow"] +'</td>'+
                        "</tr>";
                }
                tableGerirCampanha.append(tr);
                $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dados.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximo').prop('disabled', dados.length <= tamanhoPagina || pagina > dados.length / tamanhoPagina - 1);
                $('#anterior').prop('disabled', dados.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximo').click(()=>{
                if(pagina < dados.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anterior').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const convertDate = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";
        
        const gerarCSV = (dados) => {
            let csv = "\uFEFF";
        
            csv += "Requisição;";
            csv += "Data Criação;";
            csv += "Responsável Solicitação;";
            csv += "Responsável Atividade;";
            csv += "Situação;";
            csv += "Código Empresa;";
            csv += "Nome Empresa;";
            csv += "Código Filial;";
            csv += "Nome Filial;";
            csv += "Cidade;";
            csv += "UF;";
            csv += "Status;";
            csv += "Mês Realização;";
            csv += "Mês Planejamento;";
            csv += "Data Lista Presença;";
            csv += "Exames Requisitados;";
            csv += "Quantidade Requisitada;";
            csv += "Exames Covid;";
            csv += "Quantidade Prevista Covid;";
            csv += "Exames Agendados;";
            csv += "Exames Reagendados;";
            csv += "Exames Realizados;";
            csv += "Quantidade Realizada;";
            csv += "Exames Cancelados;";
            csv += "Quantidade Ausências;";
            csv += "Quantidade No-Show;";
        
            csv += "\n";
        
            for(let int = 0; int < dados.length; int++){
                csv += dados[int]["requisicao"].toString() + ";";
                csv += dados[int]["dataCriacao"].toString() + ";";
                csv += dados[int]["responsavel"].toString() + ";";
                csv += dados[int]["responsavelAtividade"].toString() + ";";
                csv += dados[int]["situacao"].toString() + ";";
                csv += dados[int]["codigoEmpresa"].toString() + ";";
                csv += dados[int]["nomeEmpresa"].toString() + ";";
                csv += dados[int]["codigoFilial"].toString() + ";";
                csv += dados[int]["nomeFilial"].toString() + ";";
                csv += dados[int]["cidade"].toString() + ";";
                csv += dados[int]["UF"].toString() + ";";
                csv += dados[int]["status"].toString() + ";";
                csv += dados[int]["mesRealizacao"].toString() + ";";
                csv += dados[int]["mesPlanejamento"].toString() + ";";
                csv += dados[int]["dataListaPresenca"].toString() + ";";
                
                
                let arrayExamesRequisitados = dados[int]["examesRequisitados"];
                for(let i = 0; i < arrayExamesRequisitados.length; i++){
                    let procedimento = arrayExamesRequisitados[i]['procedimento'];
                    let quantidade = arrayExamesRequisitados[i]['quantidade'];
                    
                    if(i+1 != arrayExamesRequisitados.length){
                        csv += procedimento + ";";
                        csv += quantidade + ";";
                        
                        let arrayExamesCovid = dados[int]["examesCovid"];
                        let tmpCovid = false;
                        if(arrayExamesCovid.length > 0){
                            for(let k = 0; k < arrayExamesCovid.length; k++){
                                let procedimentoCovid = arrayExamesCovid[k]['procedimento'];
                                let quantidadeCovid = arrayExamesCovid[k]['quantidade'];
                                if(procedimento == procedimentoCovid){
                                    csv += procedimentoCovid + ";";
                                    csv += quantidadeCovid + ";";
                                    tmpCovid = true;
                                    break;
                                }
                            }
                            if(tmpCovid == false){
                                csv += " " + ";";
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                            csv += " " + ";";
                        }
                        
                        let arrayExamesAgendados = dados[int]["examesAgendados"];
                        let tmpAgendados = false;
                        if(arrayExamesAgendados.length > 0){
                            for(let j = 0; j < arrayExamesAgendados.length; j++){
                                let procedSelecionado = arrayExamesAgendados[j]['procedSelecionado'];
                                let dataAgendada = arrayExamesAgendados[j]['dataAgendada'];
                                if(procedimento == procedSelecionado){
                                    csv += procedSelecionado + " - " + dataAgendada + ";";
                                    tmpAgendados = true;
                                    break;
                                }
                            }
                            if(tmpAgendados == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }

                        let arrayExamesReagendados = dados[int]["examesReagendados"];
                        let tmpReagendados = false;
                        if(arrayExamesReagendados.length > 0){
                            for(let j = 0; j < arrayExamesReagendados.length; j++){
                                let procedSelecionadoR = arrayExamesReagendados[j]['procedSelecionadoR'];
                                let dataAgendadaR = arrayExamesReagendados[j]['dataAgendadaR'];
                                let selectMotivoR = arrayExamesReagendados[j]['selectMotivoR'];
                                if(procedimento == procedSelecionadoR){
                                    csv += procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + ";";
                                    tmpReagendados = true;
                                    break;
                                }
                            }
                            if(tmpReagendados == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }
                        
                        let arrayExamesRealizados = dados[int]["examesRealizados"];
                        let tmpRealizados = false;
                        if(arrayExamesRealizados.length > 0){
                            for(let l = 0; l < arrayExamesRealizados.length; l++){
                                let quantidadeRealizada = arrayExamesRealizados[l]['quantidade'];
                                let procedSelecionado = arrayExamesRealizados[l]['procedSelecionado'];
                                if(procedimento == procedSelecionado){
                                    csv += procedSelecionado + ";";
                                    csv += quantidadeRealizada + ";";
                                    tmpRealizados = true;
                                    break;
                                }
                            }
                            if(tmpRealizados == false){
                                csv += " " + ";";
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                            csv += " " + ";";
                        }

                        csv += dados[int]["examesCancelados"].toString() + ";";

                        let arrayExamesAusencia = dados[int]["quantidadeAusencias"];
                        let tmpAusencia = false;
                        if(arrayExamesAusencia.length > 0){
                            for(let l = 0; l < arrayExamesAusencia.length; l++){
                                let procedSelecionado = arrayExamesAusencia[l]['procedSelecionado'];
                                let qtdAusencia = arrayExamesAusencia[l]['qtdAusencia'];
                                if(procedimento == procedSelecionado){
                                    csv += qtdAusencia + ";";
                                    tmpAusencia = true;
                                    break;
                                }
                            }
                            if(tmpAusencia == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }

                        csv += dados[int]["quantidadeNoShow"].toString() + ";";
                        
                        csv += "\n";
                        csv += dados[int]["requisicao"].toString() + ";";
                        csv += dados[int]["dataCriacao"].toString() + ";";
                        csv += dados[int]["responsavel"].toString() + ";";
                        csv += dados[int]["responsavelAtividade"].toString() + ";";
                        csv += dados[int]["situacao"].toString() + ";";
                        csv += dados[int]["codigoEmpresa"].toString() + ";";
                        csv += dados[int]["nomeEmpresa"].toString() + ";";
                        csv += dados[int]["codigoFilial"].toString() + ";";
                        csv += dados[int]["nomeFilial"].toString() + ";";
                        csv += dados[int]["cidade"].toString() + ";";
                        csv += dados[int]["UF"].toString() + ";";
                        csv += dados[int]["status"].toString() + ";";
                        csv += dados[int]["mesRealizacao"].toString() + ";";
                        csv += dados[int]["mesPlanejamento"].toString() + ";";
                        csv += dados[int]["dataListaPresenca"].toString() + ";";
                    }else{ // Último registro
                        csv += procedimento + ";";
                        csv += quantidade + ";";
                        
                        let arrayExamesCovid = dados[int]["examesCovid"];
                        let tmpCovid = false;
                        if(arrayExamesCovid.length > 0){
                            for(let k = 0; k < arrayExamesCovid.length; k++){
                                let procedimentoCovid = arrayExamesCovid[k]['procedimento'];
                                let quantidadeCovid = arrayExamesCovid[k]['quantidade'];
                                if(procedimento == procedimentoCovid){
                                    csv += procedimentoCovid + ";";
                                    csv += quantidadeCovid + ";";
                                    tmpCovid = true;
                                    break;
                                }
                            }
                            if(tmpCovid == false){
                                csv += " " + ";";
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                            csv += " " + ";";
                        }
                        
                        let arrayExamesAgendados = dados[int]["examesAgendados"];
                        let tmpAgendados = false;
                        if(arrayExamesAgendados.length > 0){
                            for(let j = 0; j < arrayExamesAgendados.length; j++){
                                let procedSelecionado = arrayExamesAgendados[j]['procedSelecionado'];
                                let dataAgendada = arrayExamesAgendados[j]['dataAgendada'];
                                if(procedimento == procedSelecionado){
                                    csv += procedSelecionado + " - " + dataAgendada + ";";
                                    tmpAgendados = true;
                                    break;
                                }
                            }
                            if(tmpAgendados == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }

                        let arrayExamesReagendados = dados[int]["examesReagendados"];
                        let tmpReagendados = false;
                        if(arrayExamesReagendados.length > 0){
                            for(let j = 0; j < arrayExamesReagendados.length; j++){
                                let procedSelecionadoR = arrayExamesReagendados[j]['procedSelecionadoR'];
                                let dataAgendadaR = arrayExamesReagendados[j]['dataAgendadaR'];
                                let selectMotivoR = arrayExamesReagendados[j]['selectMotivoR'];
                                if(procedimento == procedSelecionadoR){
                                    csv += procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + ";";
                                    tmpReagendados = true;
                                    break;
                                }
                            }
                            if(tmpReagendados == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }
                        
                        let arrayExamesRealizados = dados[int]["examesRealizados"];
                        let tmpRealizados = false;
                        if(arrayExamesRealizados.length > 0){
                            for(let l = 0; l < arrayExamesRealizados.length; l++){
                                let quantidadeRealizada = arrayExamesRealizados[l]['quantidade'];
                                let procedSelecionado = arrayExamesRealizados[l]['procedSelecionado'];
                                if(procedimento == procedSelecionado){
                                    csv += procedSelecionado + ";";
                                    csv += quantidadeRealizada + ";";
                                    tmpRealizados = true;
                                    break;
                                }
                            }
                            if(tmpRealizados == false){
                                csv += " " + ";";
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                            csv += " " + ";";
                        }

                        csv += dados[int]["examesCancelados"].toString() + ";";

                        let arrayExamesAusencia = dados[int]["quantidadeAusencias"];
                        let tmpAusencia = false;
                        if(arrayExamesAusencia.length > 0){
                            for(let l = 0; l < arrayExamesAusencia.length; l++){
                                let procedSelecionado = arrayExamesAusencia[l]['procedSelecionado'];
                                let qtdAusencia = arrayExamesAusencia[l]['qtdAusencia'];
                                if(procedimento == procedSelecionado){
                                    csv += qtdAusencia + ";";
                                    tmpAusencia = true;
                                    break;
                                }
                            }
                            if(tmpAusencia == false){
                                csv += " " + ";";
                            }
                        }else{
                            csv += " " + ";";
                        }

                        csv += dados[int]["quantidadeNoShow"].toString() + ";";
                    }
                }
                csv += "\n";
            }
            console.log(csv);
            let downloadLink = document.createElement("a");
            downloadLink.download = "GerirContrato.csv";
            downloadLink.href = window.URL.createObjectURL(new Blob([csv], {type: "text/csv"}));
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        };

        btnConsultar.on('click', () => {
            let myLoading = FLUIGC.loading(window,{
                textMessage: 'Aguarde, buscando informações',
            });
            myLoading.show();
            setTimeout(() => {
                const constraints = criarConstraints();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                let datasetGerirCampanha = DatasetFactory.getDataset("dsGerirCampanha", null, constraints, null);
                if(datasetGerirCampanha != null){
                    $("#tableGerirCampanha tbody").html("");
                    dados = [];
                    let usuarioComPermissao = true;
                    let solicitacoesGerirCampanha = datasetGerirCampanha.values;
                    for(let i = 0; i < solicitacoesGerirCampanha.length; i++){
                        const solicitacao = solicitacoesGerirCampanha[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoading.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let numeroFluxo = solicitacao["numeroFluxo"];
                        if(numeroFluxo == null) numeroFluxo = "";

                        let dataCriacao = solicitacao["dataCriacao"];
                        if(dataCriacao == null) dataCriacao = "";
                        else dataCriacao = dataCriacao.split(" ")[0];
                        
                        let solicitanteMatricula = solicitacao["solicitanteMatricula"];
                        if(solicitanteMatricula == null) solicitanteMatricula = "";
                        // else solicitanteMatricula = datasetColleague.values.find(solicitante => solicitante['colleaguePK.colleagueId'] == solicitanteMatricula)['colleagueName'];
                        else solicitanteMatricula = colleagueDataset.values.find(colleague => colleague["colleaguePK.colleagueId"] == solicitanteMatricula)['colleagueName'];

                        let responsavelAtividade = solicitacao["currentNome"];
                        if(responsavelAtividade == null) responsavelAtividade = "";
                        
                        let situacao = solicitacao["situacao"];
                        if(situacao == null) situacao = "";
                        
                        let codBuscaEmpresa = solicitacao["codBuscaEmpresa"];
                        if(codBuscaEmpresa == null) codBuscaEmpresa = "";
                        
                        let nomeempresa = "";
                        let nomeempresa1 = solicitacao["nomeEmpresa"];
                        let nomeempresa2 = solicitacao["codNomeBuscaEmpresa"];
                        let nomeempresa3 = solicitacao["zoomBuscaEmpresa"];
                        if(nomeempresa1 != null && nomeempresa1 != "") nomeempresa = nomeempresa1;
                        if(nomeempresa2 != null && nomeempresa2 != "") nomeempresa = nomeempresa2;
                        if(nomeempresa3 != null && nomeempresa3 != "") nomeempresa = nomeempresa3;
                        
                        let codBuscaUnidade = solicitacao["codBuscaUnidade"];
                        if(codBuscaUnidade == null) codBuscaUnidade = "";

                        let nomefilial = "";
                        let nomefilial1 = solicitacao["codNomeBuscaUnidade"];
                        let nomefilial2 = solicitacao["nomeFilial"];
                        let nomefilial3 = solicitacao["zoomBuscaUnidade"];
                        if(nomefilial1 != null && nomefilial1 != "") nomefilial = nomefilial1;
                        if(nomefilial2 != null && nomefilial2 != "") nomefilial = nomefilial2;
                        if(nomefilial3 != null && nomefilial3 != "") nomefilial = nomefilial3;
                        
                        let nomeCidade = solicitacao["nomeCidade"];
                        if(nomeCidade == null || nomeCidade == "undefined") nomeCidade = "";
                        
                        let nomeUF = solicitacao["nomeUF"];
                        if(nomeUF == null || nomeUF == "undefined") nomeUF = "";
                        
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == null) atividadeAtual = "";

                        let qtdTotalAusencias = solicitacao["qtdTotalAusencias"];
                        if(qtdTotalAusencias == null) qtdTotalAusencias = "";
                        
                        let qtdNoShow = solicitacao["qtdNoShow"];
                        if(qtdNoShow == null) qtdNoShow = "";
                        
                        let dataAtendRealizado = solicitacao["dataAtendRealizado"];
                        if(dataAtendRealizado == null) dataAtendRealizado = "";
                        
                        let mesRealizacao = solicitacao["mesRealizacao"];
                        if(mesRealizacao == null || mesRealizacao == "") mesRealizacao = "";
                        else mesRealizacao = mesRealizacao.split("-")[1] + "/" + mesRealizacao.split("-")[0];
    
                        let status = "";
                        if(atividadeAtual == "15") status = "Analisar Requisição";
                        if(atividadeAtual == "27") status = "Atualizar / Corrigir Informações";
                        if(atividadeAtual == "31") status = "Verificar disponibilidade e Alocar Credenciado Contratado";
                        if(atividadeAtual == "33") status = "Avaliar Extensão de Prazo";
                        if(atividadeAtual == "39") status = "Contratar Credenciado";
                        if(atividadeAtual == "42") status = "Cancelar Atendimento";
                        if(atividadeAtual == "110") status = "Atualizar Informações";
                        if(atividadeAtual == "35") status = "Confirmar alocação de Credenciados na Agenda";
                        if(atividadeAtual == "37") status = "Aguardar Aprovação da Agenda";
                        if(atividadeAtual == "48") status = "Vincular Credenciado ao Cliente";
                        if(atividadeAtual == "50") status = "Gerar Kit do Colaborador";
                        if(atividadeAtual == "69") status = "Monitorar: Preparar Atendimento";
                        if(atividadeAtual == "95") status = "Resolver Problema: Preparar Atendimento";
                        if(atividadeAtual == "71") status = "Monitorar: Realizar Atendimento";
                        if(atividadeAtual == "116") status = "Resolver Problema: Realizar Atendimento";
                        if(atividadeAtual == "73") status = "Monitorar: Enviar Lista de Presença e ASOs";
                        if(atividadeAtual == "115") status = "Resolver Problema: Enviar Lista de Presença e ASOs";
                        if(atividadeAtual == "54") status = "Atualizar Sistema";
                        if(atividadeAtual == "78") status = "Monitorar: Enviar Malote";
                        if(atividadeAtual == "61") status = "Realizar Faturamento de Ausências";

                        let dataListaPresenca = "";
                        if(atividadeAtual == "54" || atividadeAtual == "78" || atividadeAtual == "61"){
                            let c01 = DatasetFactory.createConstraint("processHistoryPK.processInstanceId", numeroFluxo, numeroFluxo, ConstraintType.MUST);
                            let c02 = DatasetFactory.createConstraint("stateSequence", "75", "75", ConstraintType.MUST);
                            let c03 = DatasetFactory.createConstraint("active", false, false, ConstraintType.MUST);
                            let dsProcessHistory = DatasetFactory.getDataset("processHistory", ["movementDate"], [c01,c02,c03], null);
                            if(dsProcessHistory != null && dsProcessHistory.values.length > 0){
                                let timestamp = dsProcessHistory.values[0].movementDate;
                                let data = new Date(timestamp);
                                let dia  = data.getDate();
                                let mes  = data.getMonth() + 1;
                                const ano  = data.getFullYear();
                                dia = (dia<=9 ? "0"+dia : dia);
                                mes = (mes<=9 ? "0"+mes : mes);
                                const dataLocal = dia+"/"+mes+"/"+ano;
                                dataListaPresenca = dataLocal;
                            }
                        }

                        let examesCancelados = ""; 
                        if(situacao == "Cancelado") examesCancelados = "Sim";
    
                        const documentId = solicitacao["metadata#id"];
                        const documentVersion = solicitacao["metadata#version"];
                        const c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                        const c2 = DatasetFactory.createConstraint("tablename", "tabelaProcedimentos", "tabelaProcedimentos", ConstraintType.MUST);
                        const c3 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
                        const c4 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
                        const tabelaProcedimentos = DatasetFactory.getDataset("dsGerirCampanha", null, [c1,c2,c3,c4], null);
    
                        let examesRequisitados = [];
                        let examesCovid = [];
                        if(tabelaProcedimentos != ""){
                            for(var k = 0; k < tabelaProcedimentos.values.length; k++){
                                const procedimento = tabelaProcedimentos.values[k]['zoomProcedimento'];
                                const quantidade = tabelaProcedimentos.values[k]['qtdSolicitada'];
                                const valor = tabelaProcedimentos.values[k]['valorTotal'];
                                examesRequisitados.push({
                                    'procedimento':procedimento,
                                    'quantidade':quantidade,
                                    'valor':valor
                                });
                                if(procedimento.toLowerCase().match("covid")){
                                    examesCovid.push({
                                        'procedimento':procedimento,
                                        'quantidade':quantidade,
                                        'valor':valor
                                    });
                                }
                            }
                        }

                        let examesAgendados = [];
                        let examesReagendados = [];
                        let examesRealizados = [];
                        let examesAusencia = [];
                        const c5 = DatasetFactory.createConstraint("tablename", "tabelaCredenciado", "tabelaCredenciado", ConstraintType.MUST);
                        const tabelaCredenciado = DatasetFactory.getDataset("dsGerirCampanha", null, [c1,c5,c3,c4], null);
                        if(tabelaCredenciado != ""){
                            for(var k = 0; k < tabelaCredenciado.values.length; k++){
                                let procedSelecionado = tabelaCredenciado.values[k]['procedSelecionado'];
                                let dataAtendAgendada = tabelaCredenciado.values[k]['dataAtendAgendada'];
                                let qtdTotalRealizada = tabelaCredenciado.values[k]['qtdTotalRealizada'];
                                let qtdAusencia = tabelaCredenciado.values[k]['qtdAusencia']; 
                                if(dataAtendAgendada != null){
                                    examesAgendados.push({
                                        'procedSelecionado': procedSelecionado,
                                        'dataAgendada':convertDate(dataAtendAgendada)
                                    });
                                }
                                const c6 = DatasetFactory.createConstraint("tablename", "tabelaReagendamento", "tabelaReagendamento", ConstraintType.MUST);
                                const tabelaReagendamento = DatasetFactory.getDataset("dsGerirCampanha", null, [c1,c6,c3,c4], null);
                                if(tabelaReagendamento.values.length > 0){
                                    for(var r = 0; r < tabelaReagendamento.values.length; r++){
                                        let procedSelecionadoR = tabelaReagendamento.values[r]['procedSelecionadoR']; 
                                        let dataAtendAgendadaR = tabelaReagendamento.values[r]['dataAtendAgendadaR'];
                                        let qtdTotalRealizadaR = tabelaReagendamento.values[r]['qtdTotalRealizadaR'];
                                        let qtdAusenciaR = tabelaReagendamento.values[r]['qtdAusenciaR']; 
                                        let selectMotivoR = tabelaReagendamento.values[r]['selectMotivoR']; 
                                        if(procedSelecionado == procedSelecionadoR){
                                            examesReagendados.push({
                                                'procedSelecionadoR':procedSelecionadoR,
                                                'dataAtendAgendadaR':dataAtendAgendadaR,
                                                'selectMotivoR': selectMotivoR
                                            });
                                            if(qtdTotalRealizadaR != null && qtdTotalRealizadaR != ""){
                                                examesRealizados.push({
                                                    'procedSelecionado':procedSelecionadoR,
                                                    'quantidade':qtdTotalRealizadaR
                                                });
                                            }
                                            examesAusencia.push({
                                                'procedSelecionado': procedSelecionadoR,
                                                'qtdAusencia': qtdAusenciaR
                                            });
                                        }
                                    }
                                }else{
                                    if(qtdTotalRealizada != null && qtdTotalRealizada != ""){
                                        examesRealizados.push({
                                            'procedSelecionado':procedSelecionado,
                                            'quantidade':qtdTotalRealizada
                                        });
                                    }
                                    examesAusencia.push({
                                        'procedSelecionado': procedSelecionado,
                                        'qtdAusencia': qtdAusencia
                                    });
                                }
                            }
                        }

                        dados.push({
                            "requisicao" : numeroFluxo,
                            "dataCriacao" : dataCriacao,
                            "responsavel" : solicitanteMatricula,
                            "responsavelAtividade" : responsavelAtividade,
                            "situacao" : situacao,
                            "codigoEmpresa" : codBuscaEmpresa,
                            "nomeEmpresa" : nomeempresa,
                            "codigoFilial" : codBuscaUnidade,
                            "nomeFilial" : nomefilial,
                            "cidade" : nomeCidade,
                            "UF" : nomeUF,
                            "status" : status,
                            "examesRequisitados" : examesRequisitados,
                            "examesCovid" : examesCovid,
                            "examesAgendados" : examesAgendados,
                            "examesReagendados" : examesReagendados,
                            "examesRealizados" : examesRealizados,
                            "examesCancelados" : examesCancelados,
                            "quantidadeAusencias" : examesAusencia,
                            "mesRealizacao" : dataAtendRealizado,
                            "mesPlanejamento" : mesRealizacao,
                            "dataListaPresenca" : dataListaPresenca,
                            "quantidadeNoShow" : qtdNoShow
                        });
                    }
                    if(usuarioComPermissao == true){
                        createTable(dados);
                        myLoading.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesGerirCampanha.length} registros!`,type: 'success'});
                        btnExportar.on('click', () => {
                            console.log(dados);
                            gerarCSV(dados);
                        });
                    }
                }
            }, 1000);
        });
    }
});