var WidgetRelatorioGerirCampanha = SuperWidget.extend({
    init: () => {

        let numeroFluxo = $("#numeroFluxo");
        let situacao = $("#situacao");
        let atividadeAtual = $("#atividadeAtual");
        let mesRealizacao = $("#mesRealizacao");
        let nomeCidade = $("#nomeCidade");
        let nomeUF = $("#nomeUF");
        let qtdNoShow = $("#qtdNoShow");
        let tableGerirCampanha = $("#tableGerirCampanha");
        let btnConsultar = $("#btnConsultar");
        let dados = [];

        mesRealizacao.on("change", (event) => {
            const mesPlanejamento = event.target.value;
            if(!mesPlanejamento.match(/\d{4}-\d{2}/)){
                mesRealizacao.val("");
                FLUIGC.toast({title: 'Atenção: ',message: 'Gentileza informar conforme orientação AAAA-MM',type: 'warning'});
            }
        });

        const createTable = (dados) => {
            console.log("Dados CreateTable!");
            console.log(dados);
            let tamanhoPagina = 10;
            let pagina = 0;
            const paginar = () => {
                $('#tableGerirCampanha > tbody > tr').remove();
                let tr = "";

                // "vnumeroFluxo" : vnumeroFluxo,
                // "vsituacao" : vsituacao,
                // "vatividadeAtual" : vatividadeAtual,
                // "vresponsavel" : vresponsavel,
                // "vinicio" : vinicio,
                // "vfim" : vfim,
                // "vmesRealizacao" : vmesRealizacao,
                // "vmodeloExame" : vmodeloExame,
                // "vmotivoCancelamento" : vmotivoCancelamento,
                // "vnomeCidade" : vnomeCidade,
                // "vnomeEmpresa" : vnomeEmpresa,
                // "vnomeFilial" : vnomeFilial,
                // "vnomeUF" : vnomeUF,
                // "vpossuiNoShow" : vpossuiNoShow,
                // "vpossuiTaxa" : vpossuiTaxa,
                // "vqtdAusenciaTotal" : vqtdAusenciaTotal,
                // "vqtdMinimaTotal" : vqtdMinimaTotal,
                // "vqtdNoShow" : vqtdNoShow,
                // "vqtdTotalAusencias" : vqtdTotalAusencias,
                // "vvalorExame" : vvalorExame,
                // "vvalorTotalAusencias" : vvalorTotalAusencias,
                // "vvalorTotalTaxas" : vvalorTotalTaxas,
                // "vresponsavelAlocarCredenciado" : vresponsavelAlocarCredenciado,
                // "vconclusaoAlocarCredenciado" : vconclusaoAlocarCredenciado,
                // "vtabelaCredenciado" : {}

                for(let i = pagina * tamanhoPagina; i < dados.length && i < (pagina + 1) * tamanhoPagina; i++){
                    tr +=   "<tr>"+
                                '<td>'+ dados[i]["vnumeroFluxo"] +'</td>'+
                                '<td>'+ dados[i]["vsituacao"] +'</td>'+
                                '<td>'+ dados[i]["vatividadeAtual"] +'</td>'+
                                '<td>'+ dados[i]["vresponsavel"] +'</td>'+
                                '<td>'+ dados[i]["vinicio"] +'</td>'+
                                '<td>'+ dados[i]["vfim"] +'</td>'+
                                '<td>'+ dados[i]["vmesRealizacao"] +'</td>'+
                                '<td>'+ dados[i]["vmodeloExame"] +'</td>'+
                                '<td>'+ dados[i]["vmotivoCancelamento"] +'</td>'+
                                '<td>'+ dados[i]["vnomeCidade"] +'</td>'+
                                '<td>'+ dados[i]["vnomeEmpresa"] +'</td>'+
                                '<td>'+ dados[i]["vnomeFilial"] +'</td>';
                                '<td>'+ dados[i]["vnomeUF"] +'</td>';
                                '<td>'+ dados[i]["vpossuiNoShow"] +'</td>';
                                '<td>'+ dados[i]["vpossuiTaxa"] +'</td>';
                                '<td>'+ dados[i]["vqtdAusenciaTotal"] +'</td>';
                                '<td>'+ dados[i]["vqtdMinimaTotal"] +'</td>';
                                '<td>'+ dados[i]["vqtdNoShow"] +'</td>';
                                '<td>'+ dados[i]["vqtdTotalAusencias"] +'</td>';
                                '<td>'+ dados[i]["vvalorExame"] +'</td>';
                                '<td>'+ dados[i]["vvalorTotalAusencias"] +'</td>';
                                '<td>'+ dados[i]["vvalorTotalTaxas"] +'</td>';
                                '<td>'+ dados[i]["vresponsavelAlocarCredenciado"] +'</td>';
                                '<td>'+ dados[i]["vconclusaoAlocarCredenciado"] +'</td>';
                                '<td>'+ dados[i]["vtabelaCredenciado"] +'</td>';

                    // let examesRequisitados = dados[i]["examesRequisitados"];
                    // if(examesRequisitados.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesRequisitados.length; k++){
                    //         let procedimento = examesRequisitados[k].procedimento;
                    //         let quantidade = examesRequisitados[k].quantidade;
                    //         tr += "<li>"+procedimento+": "+quantidade+"</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    // let examesCovid = dados[i]["examesCovid"];
                    // if(examesCovid.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesCovid.length; k++){
                    //         let procedimento = examesCovid[k].procedimento;
                    //         let quantidade = examesCovid[k].quantidade;
                    //         tr += "<li>"+procedimento+": "+quantidade+"</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    // let examesAgendados = dados[i]["examesAgendados"];
                    // if(examesAgendados.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesAgendados.length; k++){
                    //         let procedSelecionado = examesAgendados[k].procedSelecionado;
                    //         let dataAgendada = examesAgendados[k].dataAgendada;
                    //         tr += "<li>" + procedSelecionado + " - " + dataAgendada + "</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    // let examesReagendados = dados[i]["examesReagendados"];
                    // if(examesReagendados.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesReagendados.length; k++){
                    //         let procedSelecionadoR = examesReagendados[k].procedSelecionadoR;
                    //         let dataAgendadaR = examesReagendados[k].dataAgendadaR;
                    //         let selectMotivoR = examesReagendados[k].selectMotivoR;
                    //         tr += "<li>" + procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + "</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    // let examesRealizados = dados[i]["examesRealizados"];
                    // if(examesRealizados.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesRealizados.length; k++){
                    //         let procedSelecionado = examesRealizados[k].procedSelecionado;
                    //         let quantidade = examesRealizados[k].quantidade;
                    //         tr += "<li>"+procedSelecionado+": "+quantidade+"</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    // tr += '<td>'+ dados[i]["examesCancelados"] +'</td>';

                    // let examesAusencia = dados[i]["quantidadeAusencias"];
                    // if(examesAusencia.length > 0){
                    //     tr += "<td><ol>";
                    //     for(let k = 0; k < examesAusencia.length; k++){
                    //         let procedSelecionado = examesAusencia[k].procedSelecionado;
                    //         let qtdAusencia = examesAusencia[k].qtdAusencia;
                    //         tr += "<li>"+qtdAusencia+"</li>";
                    //     }
                    //     tr += "</ol></td>";
                    // }else{
                    //     tr += "<td></td>";
                    // }

                    tr += ""+
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
            // csv += "Exames Requisitados;";
            // csv += "Quantidade Requisitada;";
            // csv += "Exames Covid;";
            // csv += "Quantidade Prevista Covid;";
            // csv += "Exames Agendados;";
            // csv += "Exames Reagendados;";
            // csv += "Exames Realizados;";
            // csv += "Quantidade Realizada;";
            // csv += "Exames Cancelados;";
            // csv += "Quantidade Ausências;";
            // csv += "Quantidade No-Show;";
        
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
                
                
                // let arrayExamesRequisitados = dados[int]["examesRequisitados"];
                // for(let i = 0; i < arrayExamesRequisitados.length; i++){
                //     let procedimento = arrayExamesRequisitados[i]['procedimento'];
                //     let quantidade = arrayExamesRequisitados[i]['quantidade'];
                    
                //     if(i+1 != arrayExamesRequisitados.length){
                //         csv += procedimento + ";";
                //         csv += quantidade + ";";
                        
                //         let arrayExamesCovid = dados[int]["examesCovid"];
                //         let tmpCovid = false;
                //         if(arrayExamesCovid.length > 0){
                //             for(let k = 0; k < arrayExamesCovid.length; k++){
                //                 let procedimentoCovid = arrayExamesCovid[k]['procedimento'];
                //                 let quantidadeCovid = arrayExamesCovid[k]['quantidade'];
                //                 if(procedimento == procedimentoCovid){
                //                     csv += procedimentoCovid + ";";
                //                     csv += quantidadeCovid + ";";
                //                     tmpCovid = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpCovid == false){
                //                 csv += " " + ";";
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //             csv += " " + ";";
                //         }
                        
                //         let arrayExamesAgendados = dados[int]["examesAgendados"];
                //         let tmpAgendados = false;
                //         if(arrayExamesAgendados.length > 0){
                //             for(let j = 0; j < arrayExamesAgendados.length; j++){
                //                 let procedSelecionado = arrayExamesAgendados[j]['procedSelecionado'];
                //                 let dataAgendada = arrayExamesAgendados[j]['dataAgendada'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += procedSelecionado + " - " + dataAgendada + ";";
                //                     tmpAgendados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpAgendados == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }

                //         let arrayExamesReagendados = dados[int]["examesReagendados"];
                //         let tmpReagendados = false;
                //         if(arrayExamesReagendados.length > 0){
                //             for(let j = 0; j < arrayExamesReagendados.length; j++){
                //                 let procedSelecionadoR = arrayExamesReagendados[j]['procedSelecionadoR'];
                //                 let dataAgendadaR = arrayExamesReagendados[j]['dataAgendadaR'];
                //                 let selectMotivoR = arrayExamesReagendados[j]['selectMotivoR'];
                //                 if(procedimento == procedSelecionadoR){
                //                     csv += procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + ";";
                //                     tmpReagendados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpReagendados == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }
                        
                //         let arrayExamesRealizados = dados[int]["examesRealizados"];
                //         let tmpRealizados = false;
                //         if(arrayExamesRealizados.length > 0){
                //             for(let l = 0; l < arrayExamesRealizados.length; l++){
                //                 let quantidadeRealizada = arrayExamesRealizados[l]['quantidade'];
                //                 let procedSelecionado = arrayExamesRealizados[l]['procedSelecionado'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += procedSelecionado + ";";
                //                     csv += quantidadeRealizada + ";";
                //                     tmpRealizados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpRealizados == false){
                //                 csv += " " + ";";
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //             csv += " " + ";";
                //         }

                //         csv += dados[int]["examesCancelados"].toString() + ";";

                //         let arrayExamesAusencia = dados[int]["quantidadeAusencias"];
                //         let tmpAusencia = false;
                //         if(arrayExamesAusencia.length > 0){
                //             for(let l = 0; l < arrayExamesAusencia.length; l++){
                //                 let procedSelecionado = arrayExamesAusencia[l]['procedSelecionado'];
                //                 let qtdAusencia = arrayExamesAusencia[l]['qtdAusencia'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += qtdAusencia + ";";
                //                     tmpAusencia = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpAusencia == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }

                //         csv += dados[int]["quantidadeNoShow"].toString() + ";";
                        
                //         csv += "\n";
                //         csv += dados[int]["requisicao"].toString() + ";";
                //         csv += dados[int]["dataCriacao"].toString() + ";";
                //         csv += dados[int]["responsavel"].toString() + ";";
                //         csv += dados[int]["responsavelAtividade"].toString() + ";";
                //         csv += dados[int]["situacao"].toString() + ";";
                //         csv += dados[int]["codigoEmpresa"].toString() + ";";
                //         csv += dados[int]["nomeEmpresa"].toString() + ";";
                //         csv += dados[int]["codigoFilial"].toString() + ";";
                //         csv += dados[int]["nomeFilial"].toString() + ";";
                //         csv += dados[int]["cidade"].toString() + ";";
                //         csv += dados[int]["UF"].toString() + ";";
                //         csv += dados[int]["status"].toString() + ";";
                //         csv += dados[int]["mesRealizacao"].toString() + ";";
                //         csv += dados[int]["mesPlanejamento"].toString() + ";";
                //         csv += dados[int]["dataListaPresenca"].toString() + ";";
                //     }else{ // Último registro
                //         csv += procedimento + ";";
                //         csv += quantidade + ";";
                        
                //         let arrayExamesCovid = dados[int]["examesCovid"];
                //         let tmpCovid = false;
                //         if(arrayExamesCovid.length > 0){
                //             for(let k = 0; k < arrayExamesCovid.length; k++){
                //                 let procedimentoCovid = arrayExamesCovid[k]['procedimento'];
                //                 let quantidadeCovid = arrayExamesCovid[k]['quantidade'];
                //                 if(procedimento == procedimentoCovid){
                //                     csv += procedimentoCovid + ";";
                //                     csv += quantidadeCovid + ";";
                //                     tmpCovid = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpCovid == false){
                //                 csv += " " + ";";
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //             csv += " " + ";";
                //         }
                        
                //         let arrayExamesAgendados = dados[int]["examesAgendados"];
                //         let tmpAgendados = false;
                //         if(arrayExamesAgendados.length > 0){
                //             for(let j = 0; j < arrayExamesAgendados.length; j++){
                //                 let procedSelecionado = arrayExamesAgendados[j]['procedSelecionado'];
                //                 let dataAgendada = arrayExamesAgendados[j]['dataAgendada'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += procedSelecionado + " - " + dataAgendada + ";";
                //                     tmpAgendados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpAgendados == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }

                //         let arrayExamesReagendados = dados[int]["examesReagendados"];
                //         let tmpReagendados = false;
                //         if(arrayExamesReagendados.length > 0){
                //             for(let j = 0; j < arrayExamesReagendados.length; j++){
                //                 let procedSelecionadoR = arrayExamesReagendados[j]['procedSelecionadoR'];
                //                 let dataAgendadaR = arrayExamesReagendados[j]['dataAgendadaR'];
                //                 let selectMotivoR = arrayExamesReagendados[j]['selectMotivoR'];
                //                 if(procedimento == procedSelecionadoR){
                //                     csv += procedSelecionadoR + " - " + dataAgendadaR + " - " + selectMotivoR + ";";
                //                     tmpReagendados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpReagendados == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }
                        
                //         let arrayExamesRealizados = dados[int]["examesRealizados"];
                //         let tmpRealizados = false;
                //         if(arrayExamesRealizados.length > 0){
                //             for(let l = 0; l < arrayExamesRealizados.length; l++){
                //                 let quantidadeRealizada = arrayExamesRealizados[l]['quantidade'];
                //                 let procedSelecionado = arrayExamesRealizados[l]['procedSelecionado'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += procedSelecionado + ";";
                //                     csv += quantidadeRealizada + ";";
                //                     tmpRealizados = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpRealizados == false){
                //                 csv += " " + ";";
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //             csv += " " + ";";
                //         }

                //         csv += dados[int]["examesCancelados"].toString() + ";";

                //         let arrayExamesAusencia = dados[int]["quantidadeAusencias"];
                //         let tmpAusencia = false;
                //         if(arrayExamesAusencia.length > 0){
                //             for(let l = 0; l < arrayExamesAusencia.length; l++){
                //                 let procedSelecionado = arrayExamesAusencia[l]['procedSelecionado'];
                //                 let qtdAusencia = arrayExamesAusencia[l]['qtdAusencia'];
                //                 if(procedimento == procedSelecionado){
                //                     csv += qtdAusencia + ";";
                //                     tmpAusencia = true;
                //                     break;
                //                 }
                //             }
                //             if(tmpAusencia == false){
                //                 csv += " " + ";";
                //             }
                //         }else{
                //             csv += " " + ";";
                //         }

                //         csv += dados[int]["quantidadeNoShow"].toString() + ";";
                //     }
                // }
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
            dados = [];
            if(numeroFluxo.val() != ""){
                let filtro = dsGerirCampanha.values.filter((el)=>{
                    if(el.numeroFluxo){
                        if(el.numeroFluxo == "72269") return el;
                    }
                });
                dados = filtro;
            }
            if(situacao.val() != ""){
                if(dados.length == 0){
                    let filtro = dsGerirCampanha.values.filter((el)=>{
                        if(el.situacao){
                            if(el.situacao == "Novo") return el;
                        }
                    });
                    dados = filtro;
                }else{
                    let filtro = dados.filter((el)=>{
                        if(el.situacao){
                            if(el.situacao == "Novo") return el;
                        }
                    });
                    dados = filtro;
                }
            }
            $("#tableGerirCampanha tbody").html("");
            let usuarioComPermissao = true;
            console.log(dados);
            for(let i = 0; i < dados.length; i++){
                const solicitacao = dados[i];
                const Mensagem = solicitacao["Mensagem"];
                if(Mensagem != null){
                    usuarioComPermissao = false;
                    myLoading.hide();
                    FLUIGC.toast({title: 'Atenção!', message: Mensagem, type: 'warning'});
                    break;
                }
                let vnumeroFluxo = solicitacao["numeroFluxo"] == null || solicitacao["numeroFluxo"] == undefined ? "" : solicitacao["numeroFluxo"];
                let vsituacao = solicitacao["situacao"] == null || solicitacao["situacao"] == undefined ? "" : solicitacao["situacao"];
                let catividadeAtual = solicitacao["atividadeAtual"] == null || solicitacao["atividadeAtual"] == undefined ? "" : solicitacao["atividadeAtual"];
                let vatividadeAtual = "";
                if(catividadeAtual == "15") vatividadeAtual = "Analisar Requisição";
                else if(catividadeAtual == "27") vatividadeAtual = "Atualizar / Corrigir Informações";
                else if(catividadeAtual == "31") vatividadeAtual = "Verificar disponibilidade e Alocar Credenciado Contratado";
                else if(catividadeAtual == "33") vatividadeAtual = "Avaliar Extensão de Prazo";
                else if(catividadeAtual == "39") vatividadeAtual = "Contratar Credenciado";
                else if(catividadeAtual == "42") vatividadeAtual = "Cancelar Atendimento";
                else if(catividadeAtual == "110") vatividadeAtual = "Atualizar Informações";
                else if(catividadeAtual == "35") vatividadeAtual = "Confirmar alocação de Credenciados na Agenda";
                else if(catividadeAtual == "37") vatividadeAtual = "Aguardar Aprovação da Agenda";
                else if(catividadeAtual == "48") vatividadeAtual = "Vincular Credenciado ao Cliente";
                else if(catividadeAtual == "50") vatividadeAtual = "Gerar Kit do Colaborador";
                else if(catividadeAtual == "69") vatividadeAtual = "Monitorar: Preparar Atendimento";
                else if(catividadeAtual == "95") vatividadeAtual = "Resolver Problema: Preparar Atendimento";
                else if(catividadeAtual == "71") vatividadeAtual = "Monitorar: Realizar Atendimento";
                else if(catividadeAtual == "116") vatividadeAtual = "Resolver Problema: Realizar Atendimento";
                else if(catividadeAtual == "73") vatividadeAtual = "Monitorar: Enviar Lista de Presença e ASOs";
                else if(catividadeAtual == "115") vatividadeAtual = "Resolver Problema: Enviar Lista de Presença e ASOs";
                else if(catividadeAtual == "54") vatividadeAtual = "Atualizar Sistema";
                else if(catividadeAtual == "78") vatividadeAtual = "Monitorar: Enviar Malote";
                else if(catividadeAtual == "61") vatividadeAtual = "Realizar Faturamento de Ausências";
                else vatividadeAtual = catividadeAtual;
                let vresponsavel = "";
                let vinicio = "";
                let vfim = "";
                let vmesRealizacao = solicitacao["mesRealizacao"] == null || solicitacao["mesRealizacao"] == undefined ? "" : solicitacao["mesRealizacao"];
                let vmodeloExame = solicitacao["modeloExame"] == null || solicitacao["modeloExame"] == undefined ? "" : solicitacao["modeloExame"];
                let vmotivoCancelamento = solicitacao["motivoCancelamento"] == null || solicitacao["motivoCancelamento"] == undefined ? "" : solicitacao["motivoCancelamento"];
                let vnomeCidade = solicitacao["nomeCidade"] == null || solicitacao["nomeCidade"] == undefined ? "" : solicitacao["nomeCidade"];
                let vnomeEmpresa = solicitacao["nomeEmpresa"] == null || solicitacao["nomeEmpresa"] == undefined ? "" : solicitacao["nomeEmpresa"];
                let vnomeFilial = solicitacao["nomeFilial"] == null || solicitacao["nomeFilial"] == undefined ? "" : solicitacao["nomeFilial"];
                let vnomeUF = solicitacao["nomeUF"] == null || solicitacao["nomeUF"] == undefined ? "" : solicitacao["nomeUF"];
                let vpossuiNoShow = solicitacao["possuiNoShow"] == null || solicitacao["possuiNoShow"] == undefined ? "" : solicitacao["possuiNoShow"];
                let vpossuiTaxa = solicitacao["possuiTaxa"] == null || solicitacao["possuiTaxa"] == undefined ? "" : solicitacao["possuiTaxa"];
                let vqtdAusenciaTotal = solicitacao["qtdAusenciaTotal"] == null || solicitacao["qtdAusenciaTotal"] == undefined ? "" : solicitacao["qtdAusenciaTotal"];
                let vqtdMinimaTotal = solicitacao["qtdMinimaTotal"] == null || solicitacao["qtdMinimaTotal"] == undefined ? "" : solicitacao["qtdMinimaTotal"];
                let vqtdNoShow = solicitacao["qtdNoShow"] == null || solicitacao["qtdNoShow"] == undefined ? "" : solicitacao["qtdNoShow"];
                let vqtdTotalAusencias = solicitacao["qtdTotalAusencias"] == null || solicitacao["qtdTotalAusencias"] == undefined ? "" : solicitacao["qtdTotalAusencias"];
                let vvalorExame = solicitacao["valorExame"] == null || solicitacao["valorExame"] == undefined ? "" : solicitacao["valorExame"];
                let vvalorTotalAusencias = solicitacao["valorTotalAusencias"] == null || solicitacao["valorTotalAusencias"] == undefined ? "" : solicitacao["valorTotalAusencias"];
                let vvalorTotalTaxas = solicitacao["valorTotalTaxas"] == null || solicitacao["valorTotalTaxas"] == undefined ? "" : solicitacao["valorTotalTaxas"];
                let vresponsavelAlocarCredenciado = "";
                let vconclusaoAlocarCredenciado = "";
            
                // let documentId = solicitacao["metadata#id"];
                // let documentVersion = solicitacao["metadata#version"];
                // let c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
                // let c2 = DatasetFactory.createConstraint("tablename", "tabelaProcedimentos", "tabelaProcedimentos", ConstraintType.MUST);
                // let c3 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
                // let c4 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
                // let tabelaProcedimentos = DatasetFactory.getDataset("dsGerirCampanha", null, [c1,c2,c3,c4], null);

                dados.push({
                    "vnumeroFluxo" : vnumeroFluxo,
                    "vsituacao" : vsituacao,
                    "vatividadeAtual" : vatividadeAtual,
                    "vresponsavel" : vresponsavel,
                    "vinicio" : vinicio,
                    "vfim" : vfim,
                    "vmesRealizacao" : vmesRealizacao,
                    "vmodeloExame" : vmodeloExame,
                    "vmotivoCancelamento" : vmotivoCancelamento,
                    "vnomeCidade" : vnomeCidade,
                    "vnomeEmpresa" : vnomeEmpresa,
                    "vnomeFilial" : vnomeFilial,
                    "vnomeUF" : vnomeUF,
                    "vpossuiNoShow" : vpossuiNoShow,
                    "vpossuiTaxa" : vpossuiTaxa,
                    "vqtdAusenciaTotal" : vqtdAusenciaTotal,
                    "vqtdMinimaTotal" : vqtdMinimaTotal,
                    "vqtdNoShow" : vqtdNoShow,
                    "vqtdTotalAusencias" : vqtdTotalAusencias,
                    "vvalorExame" : vvalorExame,
                    "vvalorTotalAusencias" : vvalorTotalAusencias,
                    "vvalorTotalTaxas" : vvalorTotalTaxas,
                    "vresponsavelAlocarCredenciado" : vresponsavelAlocarCredenciado,
                    "vconclusaoAlocarCredenciado" : vconclusaoAlocarCredenciado,
                    "vtabelaCredenciado" : {}
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
            
        });
    }
});