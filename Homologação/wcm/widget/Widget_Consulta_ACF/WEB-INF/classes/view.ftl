<div id="WidgetConsultaACF_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="MyWidgetACF.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaACF">
                <input type="hidden" class="form-control" id="paginaACF" name="paginaACF">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoACF" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoACF" id="inputNumeroFluxoACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusACF" class="control-label">Status</label>
                        <select name="selectStatusACF" id="selectStatusACF" class="form-control clearACF">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataEntradaACF" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaACF" id="inputDataEntradaACF" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaACF" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaACF" id="inputMesEntradaACF" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaACF" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaACF" id="inputAnoEntradaACF" class="form-control" mask="0000" placeholder="2021">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="selectTipoRequisicaoACF" class="control-label">Tipo da Requisição</label>
                        <select class="form-control" name="selectTipoRequisicaoACF" id="selectTipoRequisicaoACF">
                            <option value=""></option>
                            <option value="aditivo">Aditivo Contratual</option>
                            <option value="pleito">Pleito</option>
                            <option value="reajuste">Reajuste</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectTipoPagamentoACF" class="control-label">Tipo Pagamento</label>
                        <select name="selectTipoPagamentoACF" id="selectTipoPagamentoACF" class="form-control clearACF">
                            <option value=""></option>
                            <option value="normal">Normal</option>
                            <option value="emergencial">Emergencial</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputNomeFilialACF" class="control-label">Filial</label>
                        <input type="text" name="inputNomeFilialACF" id="inputNomeFilialACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="selectQualidadeAtendimentoACF" class="control-label">Qualidade Atendimento</label>
                        <select name="selectQualidadeAtendimentoACF" id="selectQualidadeAtendimentoACF" class="form-control clearACF">
                            <option value=""></option>
                            <option value="otimo">Ótimo</option>
                            <option value="bom">Bom</option>
                            <option value="regular">Regular</option>
                            <option value="ruim">Ruim</option>
                            <option value="pessimo">Péssimo</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataInicialAcordoACF" class="control-label">Data Inicial Acordo</label>
                        <input type="date" name="inputDataInicialAcordoACF" id="inputDataInicialAcordoACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputDataFinalAcordoACF" class="control-label">Data Final</label>
                        <input type="date" name="inputDataFinalAcordoACF" id="inputDataFinalAcordoACF" class="form-control clearACF">  
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFornecedorACF" class="control-label">Nome Fornecedor</label>
                        <input type="text" name="inputNomeFornecedorACF" id="inputNomeFornecedorACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCNPJFornecedorACF" class="control-label">CNPJ/CPF Fornecedor</label>
                        <input type="text" name="inputCNPJFornecedorACF" id="inputCNPJFornecedorACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCidadeACF" class="control-label">Cidade</label>
                        <input type="text" name="inputCidadeACF" id="inputCidadeACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectEstadoACF" class="control-label">Estado</label>
                        <select name="selectEstadoACF" id="selectEstadoACF" class="form-control clearACF">
                            <option value=""></option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                            <option value="EX">Estrangeiro</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNomeSolicitanteACF" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteACF" id="inputNomeSolicitanteACF" class="form-control clearACF">
                        <input type="hidden" name="inputMatriculaSolicitanteACF" id="inputMatriculaSolicitanteACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeACF" class="control-label">Localização</label>
                        <select name="selectAtividadeACF" id="selectAtividadeACF" class="form-control clearACF">
                            <option value=""></option>
                            <option value="supervisor">Supervisor</option>
                            <option value="coordenador">Coordenador</option>
                            <option value="correcao">Correção</option>
                            <option value="gerente">Gerente</option>
                            <option value="diretor">Diretor</option>
                            <option value="suprimentos">Suprimentos</option>
                            <option value="diretoriaFinanceira">Diretoria Financeira</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCentroCustoACF" class="control-label">Centro de Custo</label>
                        <input type="text" name="inputCentroCustoACF" id="inputCentroCustoACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputValorTotalACF" class="control-label">Spend Total do Contrato</label>
                        <input type="text" name="inputValorTotalACF" id="inputValorTotalACF" class="form-control clearRC" maxlength="14">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="selectReajusteACF" class="control-label">Reajuste Concedido?</label>
                        <select class="form-control" name="selectReajusteACF" id="selectReajusteACF">
                            <option value=""></option>
                            <option value="Sim">Sim</option>
                            <option value="Nao">Não</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputImpactoAnualReajusteACF" class="control-label">Impacto Anual do Reajuste</label>
                        <input type="text" name="inputImpactoAnualReajusteACF" id="inputImpactoAnualReajusteACF" class="form-control"/>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputPercentualImpactoAnualACF" class="control-label">Porcentagem impacto anual</label>
                        <input type="text" class="form-control" id="inputPercentualImpactoAnualACF" name="inputPercentualImpactoAnualACF"/>
                    </div>
                    <div class="form-group col-sm-3 custom-checkbox custom-checkbox-inline custom-checkbox-primary" style="margin-top: 30px;">
                        <input type="checkbox" id="checkboxFiltrarAprovadorACF" name="checkboxFiltrarAprovadorACF">
                        <label for="checkboxFiltrarAprovadorACF">Filtrar Aprovador</label>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3" style="display: none;" id="divSupervisorACF" name="divSupervisorACF">
                        <label for="inputNomeSupervisorACF" class="control-label">Supervisor</label>
                        <input type="text" name="inputNomeSupervisorACF" id="inputNomeSupervisorACF" class="form-control clearACF aprovador">
                        <input type="hidden" name="inputMatriculaSupervisorACF" id="inputMatriculaSupervisorACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divCoordenadorACF" name="divCoordenadorACF">
                        <label for="inputNomeCoordenadorACF" class="control-label">Coordenador</label>
                        <input type="text" name="inputNomeCoordenadorACF" id="inputNomeCoordenadorACF" class="form-control clearACF aprovador">
                        <input type="hidden" name="inputMatriculaCoordenadorACF" id="inputMatriculaCoordenadorACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divGerenteACF" name="divGerenteACF">
                        <label for="inputNomeGerenteACF" class="control-label">Gerente</label>
                        <input type="text" name="inputNomeGerenteACF" id="inputNomeGerenteACF" class="form-control clearACF aprovador">
                        <input type="hidden" name="inputMatriculaGerenteACF" id="inputMatriculaGerenteACF" class="form-control clearACF">
                    </div>
                    <div class="form-group col-sm-3" style="display: none;" id="divDiretorACF" name="divDiretorACF">
                        <label for="inputNomeDiretorACF" class="control-label">Diretor</label>
                        <input type="text" name="inputNomeDiretorACF" id="inputNomeDiretorACF" class="form-control clearACF aprovador">
                        <input type="hidden" name="inputMatriculaDiretorACF" id="inputMatriculaDiretorACF" class="form-control clearACF">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaACF" 
                            id="switchExportacaoAvancadaACF"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarACF" name="btnConsultarACF" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarACF" name="btnExportarACF" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableACF" name="tableACF" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Filial</th>
                                    <th>Nome Fornecedor</th>
                                    <th>CPF/CNPJ Fornecedor</th>
                                    <th>Cidade Fornecedor</th>
                                    <th>UF Fornecedor</th>
                                    <th>Data Entrada</th>
                                    <th>Data Inicial Acordo</th>
                                    <th>Data Final Acordo</th>
                                    <th>Spend Total Contrato</th>
                                    <th>Tipo Requisição</th>
                                    <th>Tipo Pagamento</th>
                                    <th>Requisitante</th>
                                    <th>Localização</th>
                                    <th>Centro Custo</th>
                                    <th>Qualidade Atendimento</th>
                                    <th>Reajuste Concedido</th>
                                    <th>Impacto Anual $</th>
                                    <th>Impacto Anual %</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorACF" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracaoACF"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoACF" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>