<div id="WidgetConsultaAFP_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetAFP.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaAFP">
                <input type="hidden" class="form-control" id="paginaAFP" name="paginaAFP">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoAFP" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoAFP" id="inputNumeroFluxoAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusAFP" class="control-label">Status</label>
                        <select name="selectStatusAFP" id="selectStatusAFP" class="form-control clearAFP">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFilialAFP" class="control-label">Nome Filial</label>
                        <input type="text" name="inputNomeFilialAFP" id="inputNomeFilialAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectTipoPagamentoAFP" class="control-label">Condição</label>
                        <select name="selectTipoPagamentoAFP" id="selectTipoPagamentoAFP" class="form-control clearAFP">
                            <option value=""></option>
                            <option value="Normal">Normal</option>
                            <option value="Emergencial">Emergencial</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaAFP" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaAFP" id="inputDataEntradaAFP" class="form-control">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputMesEntradaAFP" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaAFP" id="inputMesEntradaAFP" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputAnoEntradaAFP" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaAFP" id="inputAnoEntradaAFP" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectNaturezaAFP" class="control-label">Espécie de Pagamento</label>
                        <select name="selectNaturezaAFP" id="selectNaturezaAFP" class="form-control clearAFP">
                            <option value=""></option>
                            <option value="folhaPagamento">Folha de Pagamento</option>
                            <option value="folhaPagamento13">Folha de Pagamento - 13º Salário</option>
                            <option value="adiantamento">Adiantamento Quinzenal</option>
                            <option value="ferias">Férias</option>
                            <option value="recisao">Rescisão</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteAFP" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteAFP" id="inputNomeSolicitanteAFP" class="form-control clearAFP">
                        <input type="hidden" name="inputMatriculaSolicitanteAFP" id="inputMatriculaSolicitanteAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataVencimentoAFP" class="control-label">Data Pagamento</label>
                        <input type="date" name="inputDataVencimentoAFP" id="inputDataVencimentoAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesVencimentoAFP" class="control-label">Mês Pagamento</label>
                        <input type="text" name="inputMesVencimentoAFP" id="inputMesVencimentoAFP" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoVencimentoAFP" class="control-label">Ano Pagamento</label>
                        <input type="text" name="inputAnoVencimentoAFP" id="inputAnoVencimentoAFP" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeAFP" class="control-label">Localização</label>
                        <select name="selectAtividadeAFP" id="selectAtividadeAFP" class="form-control clearAFP">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="rh">Recursos Humanos</option>
                            <option value="contasPagar">Contas a Pagar</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoAFP" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoAFP" id="inputCentroCustoAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputValorTotalAFP" class="control-label">Valor Total</label>
                        <input type="text" name="inputValorTotalAFP" id="inputValorTotalAFP" class="form-control clearAFP" maxlength="14">
                    </div>
                    <div class="form-group col-sm-6 custom-checkbox custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorAFP" name="checkboxFiltrarAprovadorAFP">
                        <label for="checkboxFiltrarAprovadorAFP">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorAFP" name="divSupervisorAFP">
                        <label for="inputNomeSupervisorAFP" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorAFP" id="inputNomeSupervisorAFP" class="form-control clearAFP aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorAFP" id="inputMatriculaSupervisorAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorAFP" name="divCoordenadorAFP">
                        <label for="inputNomeCoordenadorAFP" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorAFP" id="inputNomeCoordenadorAFP" class="form-control clearAFP aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorAFP" id="inputMatriculaCoordenadorAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteAFP" name="divGerenteAFP">
                        <label for="inputNomeGerenteAFP" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteAFP" id="inputNomeGerenteAFP" class="form-control clearAFP aprovador">
                        <input type="hidden" name="inputMatriculaGerenteAFP" id="inputMatriculaGerenteAFP" class="form-control clearAFP">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorAFP" name="divDiretorAFP">
                        <label for="inputNomeDiretorAFP" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorAFP" id="inputNomeDiretorAFP" class="form-control clearAFP aprovador">
                        <input type="hidden" name="inputMatriculaDiretorAFP" id="inputMatriculaDiretorAFP" class="form-control clearAFP">
                    </div>
                </div>
                <div class="row" id="exportacaoAvancada" name="exportacaoAvancada">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaAFP" 
                            id="switchExportacaoAvancadaAFP"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row" id="botoes" name="botoes">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarAFP" name="btnConsultarAFP" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarAFP" name="btnExportarAFP" class="btn btn-success">
                    </div>
                </div>
                <div class="row" id="tabela" name="tabela">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableAFP" name="tableAFP" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Filial</th>
                                    <th>Condição</th>
                                    <th>Data Entrada</th>
                                    <th>Espécie Pagamento</th>
                                    <th>Data Pagamento</th>
                                    <th>Localização</th>
                                    <th>Requisitante</th>
                                    <th>Centro de Custo</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorAFP" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <AFPn id="numeracaoAFP"></AFPn>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoAFP" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>