var MyWidgetRP = SuperWidget.extend({
    init: () => {
        let inputNumeroFluxoRP = $("#inputNumeroFluxoRP");
        let inputNomeFilialRP = $("#inputNomeFilialRP");
        let selectUrgenciaRP = $("#selectUrgenciaRP");
        let selectAreaRHRP = $("#selectAreaRHRP");
        let inputDataEntradaRP = $("#inputDataEntradaRP");
        let inputMesEntradaRP = $("#inputMesEntradaRP");
        let inputAnoEntradaRP = $("#inputAnoEntradaRP");
        let inputCentroCustoRP = $("#inputCentroCustoRP");
        let selectMotivoContratacaoRP = $("#selectMotivoContratacaoRP");
        let selectTipoContratacaoRP = $("#selectTipoContratacaoRP");
        let selectCargoRP = $("#selectCargoRP");
        let inputFuncaoRP = $("#inputFuncaoRP");
        let selectAtividadeRP = $("#selectAtividadeRP");
        let inputNomeSolicitanteRP = $("#inputNomeSolicitanteRP");
        let inputMatriculaSolicitanteRP = $("#inputMatriculaSolicitanteRP");
        let inputNomeGerenteRP = $("#inputNomeGerenteRP");
        let inputMatriculaGerenteRP = $("#inputMatriculaGerenteRP");
        let inputNomeDiretorRP = $("#inputNomeDiretorRP");
        let inputMatriculaDiretorRP = $("#inputMatriculaDiretorRP");
        let btnConsultarRP = $("#btnConsultarRP");
        let btnExportarRP = $("#btnExportarRP");
        let tableRP = $("#tableRP");
        let dadosRP = [];

        const funcaoRP = () => {
            const datasetFuncao = DatasetFactory.getDataset('ds_SuporteSpcFuncoes');
            const result = datasetFuncao.values;
            return result;
        }

        FLUIGC.filter("#inputFuncaoRP",{
            source: funcaoRP(),
            displayKey: 'inputFuncao',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Função', 'size':'col-sm-12', 'dataorder':'inputFuncao', 'standard':true}
                ],
                renderContent: ['inputFuncao']
            }
        });

        const centroCustoRP = () => {
            const datasetCentroCusto = DatasetFactory.getDataset('dsCadastroCentrodeCusto');
            const result = datasetCentroCusto.values;
            return result;
        }

        FLUIGC.filter("#inputCentroCustoRP",{
            source: centroCustoRP(),
            displayKey: 'ccusto',
            multiSelect: false,
            style: {
                autocompleteTagClass: 'tag-gray',
                tableSelectedLineClass: 'info'
            },
            table: {
                header: [
                    {'title':'Centro de Custo', 'size':'col-sm-12', 'dataorder':'ccusto', 'standard':true}
                ],
                renderContent: ['ccusto']
            }
        });

        btnExportarRP.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaRP');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRP', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaRP', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteRP",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
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
            FLUIGC.filter("#inputNomeGerenteRP",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
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
            FLUIGC.filter("#inputNomeDiretorRP",{
                source: colleagueDataset.values,
                displayKey: 'colleagueName',
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
            inputNomeSolicitanteRP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteRP.val(matricula);
                }
            });
            inputNomeGerenteRP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaGerenteRP.val(matricula);
                }
            });
            inputNomeDiretorRP.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaDiretorRP.val(matricula);
                }
            });
        }, 3000);

        $('input[type=checkbox][name=checkboxFiltrarAprovadorRP]').on("change", () => {
            let filtrar = $("#checkboxFiltrarAprovadorRP").is(":checked");
            console.log(filtrar);
            if(filtrar == true){
                $("#divGerenteRP").show();
                $("#divDiretorRP").show();
            }
            if(filtrar == false){
                $("#divGerenteRP").hide();
                $("#divDiretorRP").hide();
            }
        });

        const convertDateTimeRP = (data) => {
            if(data != "" && data != null){
                try {
                    var dataTratada = data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0];
                    var horaTratada = data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].replace(".0","");
                    return dataTratada + " " + horaTratada;
                } catch (error) {
                    return convertDate2(data);
                }
            }else{
                return data;
            }
        }

        const convertDateRP = (data) => data != "" && data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsRP = () => {
            const constraintsRP = [];
            if(inputNumeroFluxoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoRP.val(), inputNumeroFluxoRP.val(), ConstraintType.MUST));
                return constraintsRP;
            }
            if(inputNomeFilialRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("zoomFilial", inputNomeFilialRP.val(), inputNomeFilialRP.val(), ConstraintType.MUST, true));
            }
            if(selectUrgenciaRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectUrgencia", selectUrgenciaRP.val(), selectUrgenciaRP.val(), ConstraintType.MUST));
            }
            if(selectAreaRHRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectAreaRH", selectAreaRHRP.val(), selectAreaRHRP.val(), ConstraintType.MUST));
            }
            if(inputDataEntradaRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("dataEntrada", convertDateRP(inputDataEntradaRP.val()), convertDateRP(inputDataEntradaRP.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaRP.val(), inputMesEntradaRP.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaRP.val(), inputAnoEntradaRP.val(), ConstraintType.MUST));
            }
            if(inputCentroCustoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("zoomCentroCusto", inputCentroCustoRP.val(), inputCentroCustoRP.val(), ConstraintType.MUST));
            }
            if(selectMotivoContratacaoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectMotivoContratacao", selectMotivoContratacaoRP.val(), selectMotivoContratacaoRP.val(), ConstraintType.MUST));
            }
            if(selectTipoContratacaoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectTipoContratacao", selectTipoContratacaoRP.val(), selectTipoContratacaoRP.val(), ConstraintType.MUST));
            }
            if(selectCargoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectCargo", selectCargoRP.val(), selectCargoRP.val(), ConstraintType.MUST));
            }
            if(inputFuncaoRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("selectFuncao", inputFuncaoRP.val(), inputFuncaoRP.val(), ConstraintType.MUST));
            }
            if(selectAtividadeRP.val() != ""){
                if(selectAtividadeRP.val() == "correcao") constraintsRP.push(DatasetFactory.createConstraint("atividadeAtual", "26", "26", ConstraintType.MUST));
                if(selectAtividadeRP.val() == "gerente") constraintsRP.push(DatasetFactory.createConstraint("atividadeAtual", "9", "9", ConstraintType.MUST));
                if(selectAtividadeRP.val() == "diretor") constraintsRP.push(DatasetFactory.createConstraint("atividadeAtual", "106", "106", ConstraintType.MUST));
                if(selectAtividadeRP.val() == "rhcorporativo") constraintsRP.push(DatasetFactory.createConstraint("atividadeAtual", "121", "121", ConstraintType.MUST));
                if(selectAtividadeRP.val() == "rhexterno") constraintsRP.push(DatasetFactory.createConstraint("atividadeAtual", "12", "12", ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteRP.val(), inputMatriculaSolicitanteRP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaGerenteRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("aprovadorGerente", inputMatriculaGerenteRP.val(), inputMatriculaGerenteRP.val(), ConstraintType.MUST));
            }
            if(inputMatriculaDiretorRP.val() != ""){
                constraintsRP.push(DatasetFactory.createConstraint("aprovadorDiretor", inputMatriculaDiretorRP.val(), inputMatriculaDiretorRP.val(), ConstraintType.MUST));
            }
            return constraintsRP;
        }

        const createTableRP = (dadosTableRP) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableRP);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableRP > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableRP.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td><a href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableRP[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+dadosTableRP[i]["codigoFluig"]+'</a></td>'+
                                '<td>'+ dadosTableRP[i]["filial"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["urgencia"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["areaRH"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["centroCusto"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["motivo"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["tipo"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["cargo"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["funcao"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableRP[i]["solicitante"] +'</td>'+
                            "</tr>";
                }
                tableRP.append(tr);
                $('#numeracaoRP').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableRP.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoRP').prop('disabled', dadosTableRP.length <= tamanhoPagina || pagina > dadosTableRP.length / tamanhoPagina - 1);
                $('#anteriorRP').prop('disabled', dadosTableRP.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoRP').click(()=>{
                if(pagina < dadosTableRP.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorRP').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVRP = (dadosCSVRP) => {
            let csvRP = "\uFEFF";
        
            csvRP += "Código Fluig;";
            csvRP += "Filial;";
            csvRP += "Urgência;";
            csvRP += "Área RH;";
            csvRP += "Data Entrada;";
            csvRP += "Centro de Custo;";
            csvRP += "Motivo;";
            csvRP += "Tipo;";
            csvRP += "Cargo;";
            csvRP += "Função;";
            csvRP += "Localização;";
            csvRP += "Solicitante;";
        
            csvRP += "\n";
        
            for(let int = 0; int < dadosCSVRP.length; int++){
                csvRP += dadosCSVRP[int]["codigoFluig"].toString() + ";";
                csvRP += dadosCSVRP[int]["filial"].toString() + ";";
                csvRP += dadosCSVRP[int]["urgencia"].toString() + ";";
                csvRP += dadosCSVRP[int]["areaRH"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataEntrada"].toString() + ";";
                csvRP += dadosCSVRP[int]["centroCusto"].toString() + ";";
                csvRP += dadosCSVRP[int]["motivo"].toString() + ";";
                csvRP += dadosCSVRP[int]["tipo"].toString() + ";";
                csvRP += dadosCSVRP[int]["cargo"].toString() + ";";
                csvRP += dadosCSVRP[int]["funcao"].toString() + ";";
                csvRP += dadosCSVRP[int]["localizacao"].toString() + ";";
                csvRP += dadosCSVRP[int]["solicitante"].toString() + ";";
                csvRP += "\n";
            }
            console.log(csvRP);
            let downloadLinkRP = document.createElement("a");
            downloadLinkRP.download = "RP.csv";
            downloadLinkRP.href = window.URL.createObjectURL(new Blob([csvRP], {type: "text/csv"}));
            downloadLinkRP.style.display = "none";
            document.body.appendChild(downloadLinkRP);
            downloadLinkRP.click();
        };

        const gerarCSVAvancadoRP = (dadosCSVRP) => {
            let csvRP = "\uFEFF";
        
            csvRP += "Código Fluig;";
            csvRP += "Filial;";
            csvRP += "Urgência;";
            csvRP += "Área RH;";
            csvRP += "Data Entrada;";
            csvRP += "Centro de Custo;";
            csvRP += "Motivo;";
            csvRP += "Tipo;";
            csvRP += "Cargo;";
            csvRP += "Função;";
            csvRP += "Localização;";
            csvRP += "Solicitante;";
            csvRP += "Gerente;";
            csvRP += "Diretor;";
            csvRP += "Data/Hora Disponibilidade RH Corporativo;";
            csvRP += "Data/Hora Ínicio Atividade;";
            csvRP += "Data/Hora Fim Atividade;";
            csvRP += "Usuário RH Corporativo;";
            csvRP += "Data/Hora Disponibilidade RH Externo;";
            csvRP += "Data/Hora Ínicio Atividade;";
            csvRP += "Data/Hora Fim Atividade;";
            csvRP += "Usuário RH Externo;";
            csvRP += "Data/Hora Disponibilidade Gerente;";
            csvRP += "Data/Hora Fim Gerente;";
            csvRP += "Usuário Gerente;";
            csvRP += "Data/Hora Disponibilidade Diretor;";
            csvRP += "Data/Hora Fim Diretor;";
            csvRP += "Usuário Diretor;";
        
            csvRP += "\n";
        
            for(let int = 0; int < dadosCSVRP.length; int++){
                csvRP += dadosCSVRP[int]["codigoFluig"].toString() + ";";
                csvRP += dadosCSVRP[int]["filial"].toString() + ";";
                csvRP += dadosCSVRP[int]["urgencia"].toString() + ";";
                csvRP += dadosCSVRP[int]["areaRH"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataEntrada"].toString() + ";";
                csvRP += dadosCSVRP[int]["centroCusto"].toString() + ";";
                csvRP += dadosCSVRP[int]["motivo"].toString() + ";";
                csvRP += dadosCSVRP[int]["tipo"].toString() + ";";
                csvRP += dadosCSVRP[int]["cargo"].toString() + ";";
                csvRP += dadosCSVRP[int]["funcao"].toString() + ";";
                csvRP += dadosCSVRP[int]["localizacao"].toString() + ";";
                csvRP += dadosCSVRP[int]["solicitante"].toString() + ";";
                csvRP += dadosCSVRP[int]["gerente"].toString() + ";";
                csvRP += dadosCSVRP[int]["diretor"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataDisponibilidadeRHC"] + ";";
                csvRP += dadosCSVRP[int]["dataAssumiuRHC"] + ";";
                csvRP += dadosCSVRP[int]["dataFinalizouRHC"] + ";";
                csvRP += dadosCSVRP[int]["usuarioRHC"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataDisponibilidadeRHE"] + ";";
                csvRP += dadosCSVRP[int]["dataAssumiuRHE"] + ";";
                csvRP += dadosCSVRP[int]["dataFinalizouRHE"] + ";";
                csvRP += dadosCSVRP[int]["usuarioRHE"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataDisponibilidadeG"] + ";";
                csvRP += dadosCSVRP[int]["dataFinalizouG"] + ";";
                csvRP += dadosCSVRP[int]["usuarioG"].toString() + ";";
                csvRP += dadosCSVRP[int]["dataDisponibilidadeD"] + ";";
                csvRP += dadosCSVRP[int]["dataFinalizouD"] + ";";
                csvRP += dadosCSVRP[int]["usuarioD"].toString() + ";";
                csvRP += "\n";
            }
            console.log(csvRP);
            let downloadLinkRP = document.createElement("a");
            downloadLinkRP.download = "RP.csv";
            downloadLinkRP.href = window.URL.createObjectURL(new Blob([csvRP], {type: "text/csv"}));
            downloadLinkRP.style.display = "none";
            document.body.appendChild(downloadLinkRP);
            downloadLinkRP.click();
        };

        btnConsultarRP.on('click', () => {
            let myLoadingRP = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingRP.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsRP();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetRP;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetRP = DatasetFactory.getDataset("ds_SolicContratPessoal", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetRP = DatasetFactory.getDataset("ds_RequisicaoPessoal", null, constraints, null); // Produção
                }
                console.log("datasetRP");
                console.log(datasetRP);
                if(datasetRP.length > 0 || datasetRP.values){
                    $("#tableRP tbody").html("");
                    dadosRP = [];
                    let usuarioComPermissao = true;
                    let solicitacoesRP = datasetRP.values;
                    for(let i = 0; i < solicitacoesRP.length; i++){
                        const solicitacao = solicitacoesRP[i];
                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingRP.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }
                        let codigoFluig = solicitacao["numeroFluxo"] == "" || solicitacao["numeroFluxo"] == null ? "" : solicitacao["numeroFluxo"];
                        let filial = solicitacao["zoomFilial"] == "" || solicitacao["zoomFilial"] == null ? "" : solicitacao["zoomFilial"];
                        let urgencia = solicitacao["selectUrgencia"] == "" || solicitacao["selectUrgencia"] == null ? "" : solicitacao["selectUrgencia"];
                        if(urgencia == "normal") urgencia = "Normal";
                        if(urgencia == "emergencial") urgencia = "Emergencial";
                        let areaRH = solicitacao["selectAreaRH"] == "" || solicitacao["selectAreaRH"] == null ? "" : solicitacao["selectAreaRH"];
                        if(areaRH == "rhExterno") areaRH = "RH Externo";
                        if(areaRH == "rhInterno") areaRH = "RH Corporativo";
                        let dataEntrada = solicitacao["dataEntrada"] == "" || solicitacao["dataEntrada"] == null ? "" : solicitacao["dataEntrada"];
                        let centroCusto = solicitacao["zoomCentroCusto"] == "" || solicitacao["zoomCentroCusto"] == null ? "" : solicitacao["zoomCentroCusto"];
                        let motivo = solicitacao["selectMotivoContratacao"] == "" || solicitacao["selectMotivoContratacao"] == null ? "" : solicitacao["selectMotivoContratacao"];
                        if(motivo == "aumentoQuadro") motivo = "Aumento de Quadro";
                        if(motivo == "coberturaFalta") motivo = "Cobertura - Falta";
                        if(motivo == "coberturaFerias") motivo = "Cobertura - Férias";
                        if(motivo == "implantacao") motivo = "Implantação";
                        if(motivo == "substituicao") motivo = "Substituição";
                        let tipo = solicitacao["selectTipoContratacao"] == "" || solicitacao["selectTipoContratacao"] == null ? "" : solicitacao["selectTipoContratacao"];
                        if(tipo == "cltIndeterminato") tipo = "CLT (Tempo Indeterminado)";
                        if(tipo == "cltDeterminato") tipo = "CLT (Tempo Determinado)";
                        if(tipo == "pj") tipo = "PJ";
                        if(tipo == "rpa") tipo = "RPA";
                        if(tipo == "credenciado") tipo = "Credenciado";
                        let funcao = solicitacao["selectFuncao"] == "" || solicitacao["selectFuncao"] == null ? "" : solicitacao["selectFuncao"];
                        let cargo = solicitacao["selectCargo"] == "" || solicitacao["selectCargo"] == null ? "" : solicitacao["selectCargo"];
                        if(cargo == "staff") cargo = "Staff";
                        if(cargo == "supervisor") cargo = "Supervisor";
                        if(cargo == "coordenador") cargo = "Coordenador";
                        if(cargo == "gerente") cargo = "Gerente";
                        let localizacao = solicitacao["atividadeAtual"] == "" || solicitacao["atividadeAtual"] == null ? "" : solicitacao["atividadeAtual"];
                        if(localizacao == "26") localizacao = "Correção";
                        if(localizacao == "9") localizacao = "Gerente";
                        if(localizacao == "106") localizacao = "Diretor";
                        if(localizacao == "121") localizacao = "Recursos Humanos Corporativo";
                        if(localizacao == "12") localizacao = "Recursos Humanos Externo";
                        if(localizacao == "15") localizacao = "Finalizado";
                        if(localizacao == "25") localizacao = "Cancelado";
                        let solicitante = solicitacao["solicitanteMatricula"] == "" || solicitacao["solicitanteMatricula"] == null ? "" : colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == solicitacao["solicitanteMatricula"])['colleagueName'];
                        let gerente = solicitacao["aprovadorGerente"] == "" || solicitacao["aprovadorGerente"] == null ? "" : colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == solicitacao["aprovadorGerente"])['colleagueName'];
                        let diretor = solicitacao["aprovadorDiretor"] == "" || solicitacao["aprovadorDiretor"] == null ? "" : colleagueDataset.values.find(colleague => colleague['colleaguePK.colleagueId'] == solicitacao["aprovadorDiretor"])['colleagueName'];
                        

                        
                        let dataDisponibilidadeRHC = solicitacao["dataDisponibilidadeRHC"] == "" || solicitacao["dataDisponibilidadeRHC"] == null ? "" : convertDateTimeRP(solicitacao["dataDisponibilidadeRHC"]);
                        let dataAssumiuRHC = solicitacao["dataAssumiuRHC"] == "" || solicitacao["dataAssumiuRHC"] == null ? "" : convertDateTimeRP(solicitacao["dataAssumiuRHC"]);
                        let dataFinalizouRHC = solicitacao["dataFinalizouRHC"] == "" || solicitacao["dataFinalizouRHC"] == null ? "" : convertDateTimeRP(solicitacao["dataFinalizouRHC"]);
                        let usuarioRHC = solicitacao["usuarioRHC"] == "" || solicitacao["usuarioRHC"] == null ? "" : solicitacao["usuarioRHC"];
                        

                        let dataDisponibilidadeRHE = solicitacao["dataDisponibilidadeRHE"] == "" || solicitacao["dataDisponibilidadeRHE"] == null ? "" : convertDateTimeRP(solicitacao["dataDisponibilidadeRHE"]);
                        let dataAssumiuRHE = solicitacao["dataAssumiuRHE"] == "" || solicitacao["dataAssumiuRHE"] == null ? "" : convertDateTimeRP(solicitacao["dataAssumiuRHE"]);
                        let dataFinalizouRHE = solicitacao["dataFinalizouRHE"] == "" || solicitacao["dataFinalizouRHE"] == null ? "" : convertDateTimeRP(solicitacao["dataFinalizouRHE"]);
                        let usuarioRHE = solicitacao["usuarioRHE"] == "" || solicitacao["usuarioRHE"] == null ? "" : solicitacao["usuarioRHE"];
                        

                        let dataDisponibilidadeG = solicitacao["dataDisponibilidadeG"] == "" || solicitacao["dataDisponibilidadeG"] == null ? "" : convertDateTimeRP(solicitacao["dataDisponibilidadeG"]);
                        let dataFinalizouG = solicitacao["dataFinalizouG"] == "" || solicitacao["dataFinalizouG"] == null ? "" : convertDateTimeRP(solicitacao["dataFinalizouG"]);
                        let usuarioG = solicitacao["usuarioG"] == "" || solicitacao["usuarioG"] == null ? "" : solicitacao["usuarioG"];
                        

                        let dataDisponibilidadeD = solicitacao["dataDisponibilidadeD"] == "" || solicitacao["dataDisponibilidadeD"] == null ? "" : convertDateTimeRP(solicitacao["dataDisponibilidadeD"]);
                        let dataFinalizouD = solicitacao["dataFinalizouD"] == "" || solicitacao["dataFinalizouD"] == null ? "" : convertDateTimeRP(solicitacao["dataFinalizouD"]);
                        let usuarioD = solicitacao["usuarioD"] == "" || solicitacao["usuarioD"] == null ? "" : solicitacao["usuarioD"];
                        
                        
                        
                        dadosRP.push({
                            "codigoFluig" : codigoFluig,
                            "filial" : filial,
                            "urgencia" : urgencia,
                            "areaRH" : areaRH,
                            "dataEntrada" : dataEntrada,
                            "centroCusto" : centroCusto,
                            "motivo" : motivo,
                            "tipo" : tipo,
                            "cargo" : cargo,
                            "funcao" : funcao,
                            "localizacao" : localizacao,
                            "solicitante" : solicitante,
                            "gerente" : gerente,
                            "diretor" : diretor,
                            "dataDisponibilidadeRHC" : dataDisponibilidadeRHC,
                            "dataAssumiuRHC" : dataAssumiuRHC,
                            "dataFinalizouRHC" : dataFinalizouRHC,
                            "usuarioRHC" : usuarioRHC,
                            "dataDisponibilidadeRHE" : dataDisponibilidadeRHE,
                            "dataAssumiuRHE" : dataAssumiuRHE,
                            "dataFinalizouRHE" : dataFinalizouRHE,
                            "usuarioRHE" : usuarioRHE,
                            "dataDisponibilidadeG" : dataDisponibilidadeG,
                            "dataFinalizouG" : dataFinalizouG,
                            "usuarioG" : usuarioG,
                            "dataDisponibilidadeD" : dataDisponibilidadeD,
                            "dataFinalizouD" : dataFinalizouD,
                            "usuarioD" : usuarioD,
                        });
                    }
                    if(usuarioComPermissao == true){
                        createTableRP(dadosRP);
                        myLoadingRP.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesRP.length} registros!`,type: 'success'});
                        btnExportarRP.on('click', () => {
                            let switchExportacaoAvancadaRP = $("#switchExportacaoAvancadaRP");
                            console.log(switchExportacaoAvancadaRP);
                            console.log(switchExportacaoAvancadaRP.is(":checked"));
                            if(switchExportacaoAvancadaRP.is(":checked")){
                                gerarCSVAvancadoRP(dadosRP);
                            }else{
                                gerarCSVRP(dadosRP);
                            }
                        });
                    }
                }else{
                    myLoadingRP.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});