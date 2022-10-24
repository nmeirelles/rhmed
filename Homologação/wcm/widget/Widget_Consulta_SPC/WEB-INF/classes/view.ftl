<div id="MyWidgetSPC_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetSPC.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSPC">
                <input type="hidden" class="form-control" id="paginaSPC" name="paginaSPC">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSPC" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSPC" id="inputNumeroFluxoSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSPC" class="control-label">Status</label>
                        <select name="selectStatusSPC" id="selectStatusSPC" class="form-control clearSPC">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialSPC" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialSPC" id="inputNomeFilialSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoSPC" class="control-label">Tipo</label>
                        <select name="selectTipoPagamentoSPC" id="selectTipoPagamentoSPC" class="form-control clearSPC">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaSPC" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSPC" id="inputDataEntradaSPC" class="form-control">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesEntradaSPC" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSPC" id="inputMesEntradaSPC" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoEntradaSPC" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSPC" id="inputAnoEntradaSPC" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectNaturezaSPC" class="control-label">Colaborador ou Fundo Fixo</label>
                        <select name="selectNaturezaSPC" id="selectNaturezaSPC" class="form-control clearSPC">
                            <option value=""></option>
                            <option value="reembolsoDespesasColaboradores">Reembolso de Despesas - Colaboradores</option>
                            <option value="reembolsoDespesasFornecedores">Reembolso de Despesas - Fornecedores</option>
                            <option value="prestacaoContasFundoFixo">Prestação de Contas - Fundo Fixo</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataVencimentoSPC" class="control-label">Data Sugerida Pagamento</label>
                        <input type="date" name="inputDataVencimentoSPC" id="inputDataVencimentoSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesVencimentoSPC" class="control-label">Mês Sugerida Pagamento</label>
                        <input type="text" name="inputMesVencimentoSPC" id="inputMesVencimentoSPC" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoVencimentoSPC" class="control-label">Ano Sugerida Pagamento</label>
                        <input type="text" name="inputAnoVencimentoSPC" id="inputAnoVencimentoSPC" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeSPC" class="control-label">Localização</label>
                        <select name="selectAtividadeSPC" id="selectAtividadeSPC" class="form-control clearSPC">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="contaSPCgar">Contas a Pagar</option>
                            <option value="ti">T.I.</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFornecedorSPC" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorSPC" id="inputNomeFornecedorSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCNPJFornecedorSPC" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorSPC" id="inputCNPJFornecedorSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteSPC" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSPC" id="inputNomeSolicitanteSPC" class="form-control clearSPC">
                        <input type="hidden" name="inputMatriculaSolicitanteSPC" id="inputMatriculaSolicitanteSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNaturezaSPC" class="control-label">Natureza</label>
                        <input type="text" name="inputNaturezaSPC" id="inputNaturezaSPC" class="form-control clearSPC">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="selectCondicaoSPC" class="control-label">Condição da Prestação de Contas</label>
                        <select name="selectCondicaoSPC" id="selectCondicaoSPC" class="form-control clearRC">
                            <option value=""></option>
                            <option value="semAdiantamento">Prestação de Conta Sem Adiantamento</option>
                            <option value="comAdiantamento">Prestação de Conta Com Adiantamento</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoSPC" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoSPC" id="inputCentroCustoSPC" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputValorTotalSPC" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalSPC" id="inputValorTotalSPC" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary">
                        <input type="checkbox" id="checkboxFiltrarAprovadorSPC" name="checkboxFiltrarAprovadorSPC">
                        <label for="checkboxFiltrarAprovadorSPC">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorSPC" name="divSupervisorSPC">
                        <label for="inputNomeSupervisorSPC" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorSPC" id="inputNomeSupervisorSPC" class="form-control clearSPC aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorSPC" id="inputMatriculaSupervisorSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorSPC" name="divCoordenadorSPC">
                        <label for="inputNomeCoordenadorSPC" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorSPC" id="inputNomeCoordenadorSPC" class="form-control clearSPC aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorSPC" id="inputMatriculaCoordenadorSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteSPC" name="divGerenteSPC">
                        <label for="inputNomeGerenteSPC" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteSPC" id="inputNomeGerenteSPC" class="form-control clearSPC aprovador">
                        <input type="hidden" name="inputMatriculaGerenteSPC" id="inputMatriculaGerenteSPC" class="form-control clearSPC">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorSPC" name="divDiretorSPC">
                        <label for="inputNomeDiretorSPC" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorSPC" id="inputNomeDiretorSPC" class="form-control clearSPC aprovador">
                        <input type="hidden" name="inputMatriculaDiretorSPC" id="inputMatriculaDiretorSPC" class="form-control clearSPC">
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input type="checkbox" name="switchExportacaoAvancadaSPC" id="switchExportacaoAvancadaSPC" data-on-text="Sim" data-off-text="Não" data-on-color="warning" data-off-color="default" size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSPC" name="btnConsultarSPC" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSPC" name="btnExportarSPC" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSPC" name="tableSPC" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Requisitante</th>
                                    <th>Status</th>
                                    <th>Colaborador ou Fundo Fixo</th>
                                    <th>Centro de Custo</th>
                                    <th>Tipo</th>
                                    <th>Filial</th>
                                    <th>Código Fornecedor</th>
                                    <th>Nome Fornecedor</th>
                                    <th>CNPJ Fornecedor</th>
                                    <th>Condição</th>
                                    <th>Data Entrada</th>
                                    <th>Data Sugerida Pagamento</th>
                                    <th>Valor</th>
                                    <th>Localização</th>
                                    <th>Natureza</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSPC" disabled="" class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <spcn id="numeracaoSPC"></spcn>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSPC" disabled="" class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>