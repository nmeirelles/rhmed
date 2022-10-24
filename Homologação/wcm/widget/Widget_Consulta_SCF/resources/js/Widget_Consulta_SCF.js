var WidgetConsultaSCF = SuperWidget.extend({
    init: () => {
        let divConsultaSCF = $("#divConsultaSCF");
        let inputNumeroFluxoSCF = $("#inputNumeroFluxoSCF");
        let selectStatusSCF = $("#selectStatusSCF");
        let inputCPFCNPJSCF = $("#inputCPFCNPJSCF");
        let selectAtividadeSCF = $("#selectAtividadeSCF");
        let inputDataEntradaSCF = $("#inputDataEntradaSCF");
        let inputMesEntradaSCF = $("#inputMesEntradaSCF");
        let inputAnoEntradaSCF = $("#inputAnoEntradaSCF");
        let selectFormaPagamentoSCF = $("#selectFormaPagamentoSCF");
        let inputContaSCF = $("#inputContaSCF");
        let selectTipoFornecedorSCF = $("#selectTipoFornecedorSCF");
        let inputRazaoSocialSCF = $("#inputRazaoSocialSCF");
        let inputNomeFantasiaSCF = $("#inputNomeFantasiaSCF");
        let inputEmailContatoSCF = $("#inputEmailContatoSCF");
        let inputCEPSCF = $("#inputCEPSCF");
        let inputEnderecoSCF = $("#inputEnderecoSCF");
        let inputCidadeSCF = $("#inputCidadeSCF");
        let selectUFSCF = $("#selectUFSCF");
        let inputNomeSolicitanteSCF = $("#inputNomeSolicitanteSCF");
        let inputMatriculaSolicitanteSCF = $("#inputMatriculaSolicitanteSCF");
        let switchExportacaoAvancadaSCF = $("#switchExportacaoAvancadaSCF");
        let btnConsultarSCF = $("#btnConsultarSCF");
        let btnExportarSCF = $("#btnExportarSCF");
        let tableSCF = $("#tableSCF");
        let anteriorSCF = $("#anteriorSCF");
        let numeracaoSCF = $("#numeracaoSCF");
        let proximoSCF = $("#proximoSCF");
        let dadosSCF = [];

        btnExportarSCF.off('click');

        FLUIGC.switcher.init('#switchExportacaoAvancadaSCF');
        FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSCF', true);

        setTimeout(() => {
            const login = $("#inputUserLogin").val();
            const matricula = colleagueDataset.values.find(colleague => colleague.login == login)['colleaguePK.colleagueId'];
            const groupConstraint = [DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", matricula, matricula, ConstraintType.MUST)];
            const groupDataset = DatasetFactory.getDataset("colleagueGroup", null, groupConstraint, null);
            if(groupDataset != null){
                for(let i = 0; i < groupDataset.values.length; i++){
                    const grupoId = groupDataset.values[i]["colleagueGroupPK.groupId"];
                    if(grupoId == "RELATORIO_EXPORTACAO_AVANCADA") FLUIGC.switcher.isReadOnly('#switchExportacaoAvancadaSCF', false);
                }
            }
            FLUIGC.filter("#inputNomeSolicitanteSCF",{
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
            inputNomeSolicitanteSCF.on("change", (event) => {
                const solicitante = event.target.value;
                if(solicitante != ""){
                    let matricula = colleagueDataset.values.find(colleague => colleague.colleagueName == solicitante)['colleaguePK.colleagueId'];
                    inputMatriculaSolicitanteSCF.val(matricula);
                }
            });
        }, 3000);

        const convertDateTimeSCF = (data) => data != "" && data != null && data != undefined && data != "undefined" ? data.split(" ")[0].split("-")[2]+"/"+data.split(" ")[0].split("-")[1]+"/"+data.split(" ")[0].split("-")[0]+" "+data.split(" ")[1].split(":")[0]+":"+data.split(" ")[1].split(":")[1]+":"+data.split(" ")[1].split(":")[2].split(".")[0] : "";
        
        const convertDateSCF = (data) => data != "" || data != null ? data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0] : "";

        const convertDate2 = (data) => {
            const dia = data.split(" ")[2];
            const mes = data.split(" ")[1];
            const ano = data.split(" ")[5];
            const hora = data.split(" ")[3];
            const dateTime = ano + "-" + mes + "-" + dia + " " + hora;
            const date = new Date(dateTime);
            return date.toLocaleString();
        }

        const criarConstraintsSCF = () => {
            const constraintsSCF = [];
            if(inputNumeroFluxoSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("numeroFluxo", inputNumeroFluxoSCF.val(), inputNumeroFluxoSCF.val(), ConstraintType.MUST));
                return constraintsSCF;
            }
            if(selectStatusSCF.val() != ""){
                if(selectStatusSCF.val() == "aberto"){
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Em Aprovação", "Em Aprovação", ConstraintType.SHOULD));
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Encaminhado para Célula de Cadastro", "Encaminhado para Célula de Cadastro", ConstraintType.SHOULD));
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Encaminhado para Controladoria", "Encaminhado para Controladoria", ConstraintType.SHOULD));
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Encaminhado para TI", "Encaminhado para TI", ConstraintType.SHOULD));
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Solicitação Reprovada", "Solicitação Reprovada", ConstraintType.SHOULD));
                }
                if(selectStatusSCF.val() == "cancelado"){
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Cancelado", "Cancelado", ConstraintType.MUST));
                }
                if(selectStatusSCF.val() == "finalizado"){
                    constraintsSCF.push(DatasetFactory.createConstraint("Status", "Fornecedor Cadastrado", "Fornecedor Cadastrado", ConstraintType.MUST));
                }
            }
            if(inputCPFCNPJSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputCNPJ", inputCPFCNPJSCF.val(), inputCPFCNPJSCF.val(), ConstraintType.MUST));
            }
            if(selectAtividadeSCF.val() != ""){
                if(selectAtividadeSCF.val() == "analise") constraintsSCF.push(DatasetFactory.createConstraint("atividadeAtual", "5", "5", ConstraintType.MUST));
                if(selectAtividadeSCF.val() == "fiscalContabil") constraintsSCF.push(DatasetFactory.createConstraint("atividadeAtual", "107", "107", ConstraintType.MUST));
                if(selectAtividadeSCF.val() == "ti") constraintsSCF.push(DatasetFactory.createConstraint("atividadeAtual", "99", "99", ConstraintType.MUST));
            }
            if(inputDataEntradaSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("dataEntrada", convertDateSCF(inputDataEntradaSCF.val()), convertDateSCF(inputDataEntradaSCF.val()), ConstraintType.MUST));
            }
            if(inputMesEntradaSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("mesEntrada", inputMesEntradaSCF.val(), inputMesEntradaSCF.val(), ConstraintType.MUST));
            }
            if(inputAnoEntradaSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("anoEntrada", inputAnoEntradaSCF.val(), inputAnoEntradaSCF.val(), ConstraintType.MUST));
            }
            if(selectFormaPagamentoSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("selectformaPagamento", selectFormaPagamentoSCF.val(), selectFormaPagamentoSCF.val(), ConstraintType.MUST));
            }
            if(inputContaSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputConta", inputContaSCF.val(), inputContaSCF.val(), ConstraintType.MUST));
            }
            if(selectTipoFornecedorSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("selectTipoFornec", selectTipoFornecedorSCF.val(), selectTipoFornecedorSCF.val(), ConstraintType.MUST));
            }
            if(inputRazaoSocialSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputRazaoSocial", inputRazaoSocialSCF.val(), inputRazaoSocialSCF.val(), ConstraintType.MUST, true));
            }
            if(inputNomeFantasiaSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputFantasia", inputNomeFantasiaSCF.val(), inputNomeFantasiaSCF.val(), ConstraintType.MUST, true));
            }
            if(inputEmailContatoSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputEmailContato", inputEmailContatoSCF.val(), inputEmailContatoSCF.val(), ConstraintType.MUST, true));
            }
            if(inputCEPSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputCEP", inputCEPSCF.val(), inputCEPSCF.val(), ConstraintType.MUST));
            }
            if(inputEnderecoSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputLogradouro", inputEnderecoSCF.val(), inputEnderecoSCF.val(), ConstraintType.MUST, true));
            }
            if(inputCidadeSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputMunicipio", inputCidadeSCF.val(), inputCidadeSCF.val(), ConstraintType.MUST, true));
            }
            if(selectUFSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("inputEstado", selectUFSCF.val(), selectUFSCF.val(), ConstraintType.MUST));
            }
            if(inputMatriculaSolicitanteSCF.val() != ""){
                constraintsSCF.push(DatasetFactory.createConstraint("solicitanteMatricula", inputMatriculaSolicitanteSCF.val(), inputMatriculaSolicitanteSCF.val(), ConstraintType.MUST));
            }
            return constraintsSCF;
        }

        const createTableSCF = (dadosTableSCF) => {
            console.log("Dados CreateTable!");
            console.log(dadosTableSCF);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableSCF > tbody > tr').remove();
                let tr = "";
                let url = "";
                const url_atual = window.location.href.toString();
                if(url_atual.match("rhmedconsultores114678")){
                    url = "rhmedconsultores114678"; // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    url = "rhmedconsultores114677";  // Produção
                }
                for(let i = pagina * tamanhoPagina; i < dadosTableSCF.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td>'+
                                    '<a style="color:darkblue;" href="https://'+url+'.fluig.cloudtotvs.com.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dadosTableSCF[i]["codigoFluig"]+'#attachments" data-attachment-open target="_blank">'+
                                        dadosTableSCF[i]["codigoFluig"]+
                                    '</a>'+
                                '</td>'+
                                '<td>'+ dadosTableSCF[i]["status"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["dataEntrada"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["cpfCNPJ"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["localizacao"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["requisitante"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["razaoSocial"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["nomeFantasia"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["nomeContato"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["emailContato"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["cep"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["endereco"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["cidade"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["estado"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["tipoFornecedor"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["tipoConta"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["formaPagamento"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["contaBancaria"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["contaContabil"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["naturezaFinanceira"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["irrf"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["iss"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["pis"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["cofins"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["csll"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["simplesNacional"] +'</td>'+
                                '<td>'+ dadosTableSCF[i]["inss"] +'</td>'+
                            "</tr>";
                }
                tableSCF.append(tr);
                $('#numeracaoSCF').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(dadosTableSCF.length / tamanhoPagina));
            }
            const ajustarBotoes = () => {
                $('#proximoSCF').prop('disabled', dadosTableSCF.length <= tamanhoPagina || pagina > dadosTableSCF.length / tamanhoPagina - 1);
                $('#anteriorSCF').prop('disabled', dadosTableSCF.length <= tamanhoPagina || pagina == 0);
            }
            $('#proximoSCF').click(()=>{
                if(pagina < dadosTableSCF.length / tamanhoPagina - 1){
                    pagina++;
                    paginar();
                    ajustarBotoes();
                }
            });
            $('#anteriorSCF').click(()=>{
                if(pagina > 0){
                    pagina--;
                    paginar();
                    ajustarBotoes();
                }
            });
            paginar();
            ajustarBotoes();
        }

        const gerarCSVSCF = (dadosCSVSCF) => {
            let csvSCF = "\uFEFF";
        
            csvSCF += "Código Fluig;";
            csvSCF += "Status;";
            csvSCF += "Data Entrada;";
            csvSCF += "CPF/CNPJ;";
            csvSCF += "Localização;";
            csvSCF += "Requisitante;";
            csvSCF += "Razão Social;";
            csvSCF += "Nome Fantasia;";
            csvSCF += "Nome Contato;";
            csvSCF += "Email Contato;";
            csvSCF += "CEP;";
            csvSCF += "Endereço;";
            csvSCF += "Cidade;";
            csvSCF += "Estado;";
            csvSCF += "Tipo de Fornecedor;";
            csvSCF += "Tipo de Conta;";
            csvSCF += "Forma de Pagamento;";
            csvSCF += "Conta Bancária;";
            csvSCF += "Conta Contábil;";
            csvSCF += "Natureza Financeira;";
            csvSCF += "IRRF;";
            csvSCF += "ISS;";
            csvSCF += "PIS;";
            csvSCF += "COFINS;";
            csvSCF += "CSLL;";
            csvSCF += "Simples Nacional;";
            csvSCF += "INSS;";

            csvSCF += "\n";
        
            for(let int = 0; int < dadosCSVSCF.length; int++){
                csvSCF += dadosCSVSCF[int]["codigoFluig"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["status"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["dataEntrada"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cpfCNPJ"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["localizacao"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["requisitante"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["razaoSocial"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["nomeFantasia"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["nomeContato"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["emailContato"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cep"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["endereco"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cidade"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["estado"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["tipoFornecedor"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["tipoConta"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["formaPagamento"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["contaBancaria"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["contaContabil"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["naturezaFinanceira"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["irrf"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["iss"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["pis"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cofins"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["csll"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["simplesNacional"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["inss"].toString() + ";";
                csvSCF += "\n";
            }
            console.log(csvSCF);
            let downloadLinkSCF = document.createElement("a");
            downloadLinkSCF.download = "SCF.csv";
            downloadLinkSCF.href = window.URL.createObjectURL(new Blob([csvSCF], {type: "text/csv"}));
            downloadLinkSCF.style.display = "none";
            document.body.appendChild(downloadLinkSCF);
            downloadLinkSCF.click();
        };

        const gerarCSVAvancadoSCF = (dadosCSVSCF) => {
            let csvSCF = "\uFEFF";
        
            csvSCF += "Código Fluig;";
            csvSCF += "Status;";
            csvSCF += "Data Entrada;";
            csvSCF += "CPF/CNPJ;";
            csvSCF += "Localização;";
            csvSCF += "Requisitante;";
            csvSCF += "Razão Social;";
            csvSCF += "Nome Fantasia;";
            csvSCF += "Nome Contato;";
            csvSCF += "Email Contato;";
            csvSCF += "CEP;";
            csvSCF += "Endereço;";
            csvSCF += "Cidade;";
            csvSCF += "Estado;";
            csvSCF += "Tipo de Fornecedor;";
            csvSCF += "Tipo de Conta;";
            csvSCF += "Forma de Pagamento;";
            csvSCF += "Conta Bancária;";
            csvSCF += "Conta Contábil;";
            csvSCF += "Natureza Financeira;";
            csvSCF += "IRRF;";
            csvSCF += "ISS;";
            csvSCF += "PIS;";
            csvSCF += "COFINS;";
            csvSCF += "CSLL;";
            csvSCF += "Simples Nacional;";
            csvSCF += "INSS;";
            csvSCF += "Data/Hora Disponibilidade Célula Cadastro;";
            csvSCF += "Data/Hora Ínicio Atividade;";
            csvSCF += "Data/Hora Fim Atividade;";
            csvSCF += "Usuário Célula Cadastro;";
            csvSCF += "Data/Hora Disponibilidade Controladoria;";
            csvSCF += "Data/Hora Ínicio Atividade;";
            csvSCF += "Data/Hora Fim Atividade;";
            csvSCF += "Usuário Controladoria;";
        
            csvSCF += "\n";
        
            for(let int = 0; int < dadosCSVSCF.length; int++){
                csvSCF += dadosCSVSCF[int]["codigoFluig"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["status"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["dataEntrada"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cpfCNPJ"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["localizacao"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["requisitante"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["razaoSocial"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["nomeFantasia"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["nomeContato"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["emailContato"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cep"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["endereco"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cidade"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["estado"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["tipoFornecedor"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["tipoConta"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["formaPagamento"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["contaBancaria"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["contaContabil"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["naturezaFinanceira"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["irrf"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["iss"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["pis"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["cofins"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["csll"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["simplesNacional"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["inss"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["dataDisponibilidadeCC"] + ";";
                csvSCF += dadosCSVSCF[int]["dataAssumiuCC"] + ";";
                csvSCF += dadosCSVSCF[int]["dataFinalizouCC"] + ";";
                csvSCF += dadosCSVSCF[int]["usuarioCC"].toString() + ";";
                csvSCF += dadosCSVSCF[int]["dataDisponibilidadeC"] + ";";
                csvSCF += dadosCSVSCF[int]["dataAssumiuC"] + ";";
                csvSCF += dadosCSVSCF[int]["dataFinalizouC"] + ";";
                csvSCF += dadosCSVSCF[int]["usuarioC"].toString() + ";";
                csvSCF += "\n";
            }
            console.log(csvSCF);
            let downloadLinkSCF = document.createElement("a");
            downloadLinkSCF.download = "SCF.csv";
            downloadLinkSCF.href = window.URL.createObjectURL(new Blob([csvSCF], {type: "text/csv"}));
            downloadLinkSCF.style.display = "none";
            document.body.appendChild(downloadLinkSCF);
            downloadLinkSCF.click();
        };

        btnConsultarSCF.on('click', () => {
            let myLoadingSCF = FLUIGC.loading(window,{textMessage: 'Aguarde, buscando informações',});
            myLoadingSCF.show();
            setTimeout(() => {
                const url_atual = window.location.href.toString();
                console.log("url_atual: "+url_atual);
                const constraints = criarConstraintsSCF();
                const formularioAtivo = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                constraints.push(formularioAtivo);
                console.log("constraints");
                console.log(constraints);
                let datasetSCF;
                if(url_atual.match("rhmedconsultores114678")){
                    datasetSCF = DatasetFactory.getDataset("ds_CadastroFornecedores", null, constraints, null); // Homologação
                }
                if(url_atual.match("rhmedconsultores114677")){
                    datasetSCF = DatasetFactory.getDataset("ds_CadastroFornecedores", null, constraints, null); // Produção
                }
                console.log("datasetSCF");
                console.log(datasetSCF);
                if(datasetSCF.length > 0 || datasetSCF.values){
                    $("#tableSCF tbody").html("");
                    dadosSCF = [];
                    let usuarioComPermissao = true;
                    let solicitacoesSCF = datasetSCF.values;
                    for(let i = 0; i < solicitacoesSCF.length; i++){
                        const solicitacao = solicitacoesSCF[i];

                        const Mensagem = solicitacao["Mensagem"];
                        if(Mensagem != null){
                            usuarioComPermissao = false;
                            myLoadingSCF.hide();
                            FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                            break;
                        }

                        let codigoFluig = solicitacao["numeroFluxo"] == null ? "" : solicitacao["numeroFluxo"];
                        let status = solicitacao["Status"] == null ? "" : solicitacao["Status"];
                        if(status == "Em Aprovação") status = "Aberto";
                        if(status == "Em Analise pela Célula Fiscal") status = "Aberto";
                        if(status == "SP Reprovada") status = "Aberto";
                        if(status == "SP Encaminhada Para Pagamento") status = "Aberto";
                        if(status == "Em análise TI") status = "Aberto";
                        if(status == "Cancelado") status = "Cancelado";
                        if(status == "Cancelada") status = "Cancelado";
                        if(status == "SP - Pagamento Programado") status = "Finalizado";

                        let dataEntrada = solicitacao["dataEntrada"] == null ? "" : solicitacao["dataEntrada"];
                        let cpfCNPJ = solicitacao["inputCNPJ"] == null ? "" : solicitacao["inputCNPJ"]
                        let localizacao = "";
                        let atividadeAtual = solicitacao["atividadeAtual"];
                        if(atividadeAtual == "5") localizacao = "Análise de Documentação e Formulário";
                        if(atividadeAtual == "11") localizacao = "Correção";
                        if(atividadeAtual == "107") localizacao = "Dados Fiscais e Contábeis";
                        if(atividadeAtual == "99") localizacao = "TI";
                        if(atividadeAtual == "14") localizacao = "Fim";

                        let requisitante = solicitacao["solicitanteNome"] == null ? "" : solicitacao["solicitanteNome"];
                        let razaoSocial = solicitacao["inputRazaoSocial"] == null ? "" : solicitacao["inputRazaoSocial"];
                        let nomeFantasia = solicitacao["inputFantasia"] == null ? "" : solicitacao["inputFantasia"];
                        let nomeContato = solicitacao["inputNomeContato"] == null ? "" : solicitacao["inputNomeContato"];
                        let emailContato = solicitacao["inputEmailContato"] == null ? "" : solicitacao["inputEmailContato"];
                        let cep = solicitacao["inputCEP"] == null ? "" : solicitacao["inputCEP"];
                        let endereco = solicitacao["inputLogradouro"] == null ? "" : solicitacao["inputLogradouro"];
                        let cidade = solicitacao["inputMunicipio"] == null ? "" : solicitacao["inputMunicipio"];
                        let estado = solicitacao["inputEstado"] == null ? "" : solicitacao["inputEstado"];
                        let tipoFornecedor = solicitacao["selectTipoFornec"] == null ? "" : solicitacao["selectTipoFornec"];
                        if(tipoFornecedor == "J") tipoFornecedor = "J - Pessoa Jurídica";
                        if(tipoFornecedor == "F") tipoFornecedor = "F - Pessoa Física";
                        if(tipoFornecedor == "X") tipoFornecedor = "X - Importação";

                        let tipoConta = solicitacao["selectTipoConta"] == null ? "" : solicitacao["selectTipoConta"];
                        if(tipoConta == "1") tipoConta = "Conta Corrente";
                        if(tipoConta == "2") tipoConta = "Conta Poupança";

                        let formaPagamento = solicitacao["selectformaPagamento"] == null ? "" : solicitacao["selectformaPagamento"];
  

                        let contaBancaria = solicitacao["inputConta"] == null ? "" : solicitacao["inputConta"];
                        let contaContabil = solicitacao["zoomContaContabil"] == null ? "" : solicitacao["zoomContaContabil"];
                        let naturezaFinanceira = solicitacao["zoomNatFinanc"] == null ? "" : solicitacao["zoomNatFinanc"];
                        let irrf = solicitacao["selectCalcIRRF"] == null ? "" : solicitacao["selectCalcIRRF"];
                        if(irrf == "1") irrf = "Normal";
                        if(irrf == "2") irrf = "IRRF Baixa";
                        if(irrf == "3") irrf = "Simples";
                        if(irrf == "4") irrf = "Empresa Individual";

                        let iss = solicitacao["selectRecISS"] == null ? "" : solicitacao["selectRecISS"];
                        if(iss == "S") iss = "Sim";
                        if(iss == "N") iss = "Não";

                        let pis = solicitacao["selectRecPIS"] == null ? "" : solicitacao["selectRecPIS"];
                        if(pis == "1") pis = "Sim";
                        if(pis == "2") pis = "Não";

                        let cofins = solicitacao["selectRecCOFINS"] == null ? "" : solicitacao["selectRecCOFINS"];
                        if(cofins == "1") cofins = "Sim";
                        if(cofins == "2") cofins = "Não";

                        let csll = solicitacao["selectRecCSLL"] == null ? "" : solicitacao["selectRecCSLL"];
                        if(csll == "1") csll = "Sim";
                        if(csll == "2") csll = "Não";

                        let simplesNacional = solicitacao["selectSimplesNacional"] == null ? "" : solicitacao["selectSimplesNacional"];
                        if(simplesNacional == "1") simplesNacional = "Sim";
                        if(simplesNacional == "2") simplesNacional = "Não";

                        let inss = solicitacao["selectCalcINSS"] == null ? "" : solicitacao["selectCalcINSS"];
                        if(inss == "S") inss = "Sim";
                        if(inss == "N") inss = "Não";

                        let dataDisponibilidadeCC = solicitacao["dataDisponibilidadeCC"];
                        if(dataDisponibilidadeCC == null) dataDisponibilidadeCC = "";
                        if(dataDisponibilidadeCC != null && dataDisponibilidadeCC != "") dataDisponibilidadeCC = convertDateTimeSCF(dataDisponibilidadeCC);

                        let dataAssumiuCC = solicitacao["dataAssumiuCC"];
                        if(dataAssumiuCC == null) dataAssumiuCC = "";
                        if(dataAssumiuCC != null && dataAssumiuCC != "") dataAssumiuCC = convertDateTimeSCF(dataAssumiuCC);

                        let dataFinalizouCC = solicitacao["dataFinalizouCC"];
                        if(dataFinalizouCC == null) dataFinalizouCC = "";
                        if(dataFinalizouCC != null && dataFinalizouCC != "") dataFinalizouCC = convertDateTimeSCF(dataFinalizouCC);

                        let usuarioCC = solicitacao["usuarioCC"] == null ? "" : solicitacao["usuarioCC"];

                        let dataDisponibilidadeC = solicitacao["dataDisponibilidadeC"];
                        if(dataDisponibilidadeC == null) dataDisponibilidadeC = "";
                        if(dataDisponibilidadeC != null && dataDisponibilidadeC != "") dataDisponibilidadeC = convertDateTimeSCF(dataDisponibilidadeC);

                        let dataAssumiuC = solicitacao["dataAssumiuC"];
                        if(dataAssumiuC == null) dataAssumiuC = "";
                        if(dataAssumiuC != null && dataAssumiuC != "") dataAssumiuC = convertDateTimeSCF(dataAssumiuC);

                        let dataFinalizouC = solicitacao["dataFinalizouC"];
                        if(dataFinalizouC == null) dataFinalizouC = "";
                        if(dataFinalizouC != null && dataFinalizouC != "") dataFinalizouC = convertDateTimeSCF(dataFinalizouC);

                        let usuarioC = solicitacao["usuarioC"] == null ? "" : solicitacao["usuarioC"];

                        dadosSCF.push({
                            "codigoFluig" : codigoFluig,
                            "status" : status,
                            "dataEntrada" : dataEntrada,
                            "cpfCNPJ" : cpfCNPJ,
                            "localizacao" : localizacao,
                            "requisitante" : requisitante,
                            "razaoSocial" : razaoSocial,
                            "nomeFantasia" : nomeFantasia,
                            "nomeContato" : nomeContato,
                            "emailContato" : emailContato,
                            "cep" : cep,
                            "endereco" : endereco,
                            "cidade" : cidade,
                            "estado" : estado,
                            "tipoFornecedor" : tipoFornecedor,
                            "tipoConta" : tipoConta,
                            "formaPagamento" : formaPagamento,
                            "contaBancaria" : contaBancaria,
                            "contaContabil" : contaContabil,
                            "naturezaFinanceira" : naturezaFinanceira,
                            "irrf" : irrf,
                            "iss" : iss,
                            "pis" : pis,
                            "cofins" : cofins,
                            "csll" : csll,
                            "simplesNacional" : simplesNacional,
                            "inss" : inss,
                            "dataDisponibilidadeCC" : dataDisponibilidadeCC,
                            "dataAssumiuCC" : dataAssumiuCC,
                            "dataFinalizouCC" : dataFinalizouCC,
                            "usuarioCC" : usuarioCC,
                            "dataDisponibilidadeC" : dataDisponibilidadeC,
                            "dataAssumiuC" : dataAssumiuC,
                            "dataFinalizouC" : dataFinalizouC,
                            "usuarioC" : usuarioC
                        });
                    }
                    if(usuarioComPermissao == true){
                        createTableSCF(dadosSCF);
                        myLoadingSCF.hide();
                        FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Foram carregados ${solicitacoesSCF.length} registros!`,type: 'success'});
                        btnExportarSCF.on('click', () => {
                            let switchExportacaoAvancadaSCF = $("#switchExportacaoAvancadaSCF");
                            console.log(switchExportacaoAvancadaSCF);
                            console.log(switchExportacaoAvancadaSCF.is(":checked"));
                            if(switchExportacaoAvancadaSCF.is(":checked")){
                                gerarCSVAvancadoSCF(dadosSCF);
                            }else{
                                gerarCSVSCF(dadosSCF);
                            }
                        });
                    }
                }else{
                    myLoadingSCF.hide();
                    FLUIGC.toast({title: 'Obrigado por aguardar!',message: `Não há registros para os filtros selecionados!`,type: 'warning'});
                }
            }, 1000);
        });
    }
});