<div id="WidgetConsultaSPA_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetSPA.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSPA">
                <input type="hidden" class="form-control" id="paginaSPA" name="paginaSPA">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSPA" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSPA" id="inputNumeroFluxoSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSPA" class="control-label">Status</label>
                        <select name="selectStatusSPA" id="selectStatusSPA" class="form-control clearSPA">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialSPA" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialSPA" id="inputNomeFilialSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoSPA" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoSPA" id="selectTipoPagamentoSPA" class="form-control clearSPA">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaSPA" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSPA" id="inputDataEntradaSPA" class="form-control">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesEntradaSPA" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSPA" id="inputMesEntradaSPA" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoEntradaSPA" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSPA" id="inputAnoEntradaSPA" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectNaturezaSPA" class="control-label">Natureza</label>
                        <select name="selectNaturezaSPA" id="selectNaturezaSPA" class="form-control clearSPA">
                            <option value=""></option>
                            <option value="Colaborador">Colaborador</option>
                            <option value="Fornecedor">Fornecedor</option>
                            <option value="Constituição de Fundo Fixo">Constituição de Fundo Fixo</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataVencimentoSPA" class="control-label">Data Vencimento</label>
                        <input type="date" name="inputDataVencimentoSPA" id="inputDataVencimentoSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesVencimentoSPA" class="control-label">Mês Vencimento</label>
                        <input type="text" name="inputMesVencimentoSPA" id="inputMesVencimentoSPA" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoVencimentoSPA" class="control-label">Ano Vencimento</label>
                        <input type="text" name="inputAnoVencimentoSPA" id="inputAnoVencimentoSPA" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeSPA" class="control-label">Localização</label>
                        <select name="selectAtividadeSPA" id="selectAtividadeSPA" class="form-control clearSPA">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="fiscal">Célula Fiscal</option>
                            <option value="contasPagar">Contas a Pagar</option>
                            <option value="ti">T.I.</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFornecedorSPA" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorSPA" id="inputNomeFornecedorSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCNPJFornecedorSPA" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorSPA" id="inputCNPJFornecedorSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteSPA" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSPA" id="inputNomeSolicitanteSPA" class="form-control clearSPA">
                        <input type="hidden" name="inputMatriculaSolicitanteSPA" id="inputMatriculaSolicitanteSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectFormaPagamentoSPA" class="control-label">Forma Pagamento</label>
                        <select name="selectFormaPagamentoSPA" id="selectFormaPagamentoSPA" class="form-control clearSPA">
                            <option value=""></option>
                            <option value="Credito em Conta">Crédito em Conta</option>
                            <option value="Boleto">Boleto</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoSPA" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoSPA" id="inputCentroCustoSPA" class="form-control clearRC">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputValorTotalSPA" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalSPA" id="inputValorTotalSPA" class="form-control clearRC" maxlength="14">
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorSPA" name="checkboxFiltrarAprovadorSPA">
                        <label for="checkboxFiltrarAprovadorSPA">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorSPA" name="divSupervisorSPA">
                        <label for="inputNomeSupervisorSPA" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorSPA" id="inputNomeSupervisorSPA" class="form-control clearSPA aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorSPA" id="inputMatriculaSupervisorSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorSPA" name="divCoordenadorSPA">
                        <label for="inputNomeCoordenadorSPA" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorSPA" id="inputNomeCoordenadorSPA" class="form-control clearSPA aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorSPA" id="inputMatriculaCoordenadorSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteSPA" name="divGerenteSPA">
                        <label for="inputNomeGerenteSPA" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteSPA" id="inputNomeGerenteSPA" class="form-control clearSPA aprovador">
                        <input type="hidden" name="inputMatriculaGerenteSPA" id="inputMatriculaGerenteSPA" class="form-control clearSPA">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorSPA" name="divDiretorSPA">
                        <label for="inputNomeDiretorSPA" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorSPA" id="inputNomeDiretorSPA" class="form-control clearSPA aprovador">
                        <input type="hidden" name="inputMatriculaDiretorSPA" id="inputMatriculaDiretorSPA" class="form-control clearSPA">
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaSPA" 
                            id="switchExportacaoAvancadaSPA"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSPA" name="btnConsultarSPA" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSPA" name="btnExportarSPA" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSPA" name="tableSPA" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Tipo Solicitação</th>
                                    <th>Filial</th>
                                    <th>Código Fornecedor</th>
                                    <th>Nome Fornecedor</th>
                                    <th>CNPJ Fornecedor</th>
                                    <th>Natureza</th>
                                    <th>Data Entrada</th>
                                    <th>Data Vencimento</th>
                                    <th>Valor</th>
                                    <th>Condição Pagamento</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Forma Pagamento</th>
                                    <th>Centro de Custo</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSPA" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoSPA"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSPA" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>