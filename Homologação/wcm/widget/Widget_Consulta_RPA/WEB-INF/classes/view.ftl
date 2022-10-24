<div id="WidgetConsultaRPA_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetRPA.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaRPA">
                <input type="hidden" class="form-control" id="paginaRPA" name="paginaRPA">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoRPA" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoRPA" id="inputNumeroFluxoRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusRPA" class="control-label">Status</label>
                        <select name="selectStatusRPA" id="selectStatusRPA" class="form-control clearRPA">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaRPA" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaRPA" id="inputDataEntradaRPA" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaRPA" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaRPA" id="inputMesEntradaRPA" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaRPA" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaRPA" id="inputAnoEntradaRPA" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFilialRPA" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialRPA" id="inputNomeFilialRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFornecedorRPA" class="control-label">Nome Prestador</label>
                        <input type="text" name="inputNomeFornecedorRPA" id="inputNomeFornecedorRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputCNPJFornecedorRPA" class="control-label">CNPJ/CPF Prestador</label>
                        <input type="text" name="inputCNPJFornecedorRPA" id="inputCNPJFornecedorRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataVencimentoRPA" class="control-label">Data Pagamento</label>
                        <input type="date" name="inputDataVencimentoRPA" id="inputDataVencimentoRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesVencimentoRPA" class="control-label">Mês Pagamento</label>
                        <input type="text" name="inputMesVencimentoRPA" id="inputMesVencimentoRPA" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoVencimentoRPA" class="control-label">Ano Pagamento</label>
                        <input type="text" name="inputAnoVencimentoRPA" id="inputAnoVencimentoRPA" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoRPA" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoRPA" id="selectTipoPagamentoRPA" class="form-control clearRPA">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteRPA" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteRPA" id="inputNomeSolicitanteRPA" class="form-control clearRPA">
                        <input type="hidden" name="inputMatriculaSolicitanteRPA" id="inputMatriculaSolicitanteRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeRPA" class="control-label">Localização</label>
                        <select name="selectAtividadeRPA" id="selectAtividadeRPA" class="form-control clearRPA">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="rh">Recursos Humanos</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoRPA" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoRPA" id="inputCentroCustoRPA" class="form-control clearRPA">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="inputFuncaoRPA" class="control-label">Função</label>
                        <input type="text" name="inputFuncaoRPA" id="inputFuncaoRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputClienteRPA" class="control-label">Cliente</label>
                        <input type="text" name="inputClienteRPA" id="inputClienteRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputLocalPrestacaoRPA" class="control-label">Local Prestação</label>
                        <input type="text" name="inputLocalPrestacaoRPA" id="inputLocalPrestacaoRPA" class="form-control clearRPA">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputValorTotalRPA" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalRPA" id="inputValorTotalRPA" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaRPA" 
                            id="switchExportacaoAvancadaRPA"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarRPA" name="btnConsultarRPA" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarRPA" name="btnExportarRPA" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableRPA" name="tableRPA" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Filial</th>
                                    <th>Nome Prestador</th>
                                    <th>CPF Prestador</th>
                                    <th>Data Entrada</th>
                                    <th>Data Pagamento</th>
                                    <th>Valor</th>
                                    <th>Condição</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Centro Custo</th>
                                    <th>Função</th>
                                    <th>Cliente</th>
                                    <th>Local</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorRPA" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoRPA"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoRPA" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>