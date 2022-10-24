<div id="WidgetRelatorioGerirCampanha${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="WidgetRelatorioGerirCampanha.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body">
                <input type="hidden" class="form-control" id="pagina" name="pagina">
                <div class="row">
                    <div class="form-group col-sm-2">
                        <label for="numeroFluxo" class="control-label">Solicitação</label>
                        <input type="number" name="numeroFluxo" id="numeroFluxo" class="form-control">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="situacao" class="control-label">Situação</label>
                        <select name="situacao" id="situacao" class="form-control">
                            <option value=""></option>
                            <option value="Novo">Novo</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="atividadeAtual" class="control-label">Localização</label>
                        <select name="atividadeAtual" id="atividadeAtual" class="form-control clearGerirCampanha">
                            <option value=""></option>
                            <option value="15">Analisar Requisição</option>
                            <option value="27">Atualizar / Corrigir Informações</option>
                            <option value="31">Verificar disponibilidade e Alocar Credenciado Contratado</option>
                            <option value="33">Avaliar Extensão de Prazo</option>
                            <option value="39">Contratar Credenciado</option>
                            <option value="42">Cancelar Atendimento</option>
                            <option value="110">Atualizar Informações</option>
                            <option value="35">Confirmar alocação de Credenciados na Agenda</option>
                            <option value="37">Aguardar Aprovação da Agenda</option>
                            <option value="48">Vincular Credenciado ao Cliente</option>
                            <option value="50">Gerar Kit do Colaborador</option>
                            <option value="69">Monitorar: Preparar Atendimento</option>
                            <option value="95">Resolver Problema: Preparar Atendimento</option>
                            <option value="71">Monitorar: Realizar Atendimento</option>
                            <option value="116">Resolver Problema: Realizar Atendimento</option>
                            <option value="73">Monitorar: Enviar Lista de Presença e ASOs</option>
                            <option value="115">Resolver Problema: Enviar Lista de Presença e ASOs</option>
                            <option value="54">Atualizar Sistema</option>
                            <option value="78">Monitorar: Enviar Malote</option>
                            <option value="61">Realizar Faturamento de Ausências</option>
                            <option value="Fim">Fim</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="mesRealizacao" class="control-label">Mês Realização</label>
                        <input type="text" id="mesRealizacao" name="mesRealizacao" class="form-control" placeholder="2021-04" mask="0000-00" maxlength="7">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="nomeCidade" class="control-label">Cidade</label>
                        <input type="text" id="nomeCidade" name="nomeCidade" class="form-control">
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="nomeUF" class="control-label">UF</label>
                        <select name="nomeUF" id="nomeUF" class="form-control">
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
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="qtdNoShow" class="control-label">Qtd No Show</label>
                        <input type="number" id="qtdNoShow" name="qtdNoShow" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultar" name="btnConsultar" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportar" name="btnExportar" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableGerirCampanha" name="tableGerirCampanha" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Solicitação</th> <!-- numeroFluxo -->
                                    <th>Situação</th> <!-- situacao -->
                                    <th>Localização</th> <!-- atividadeAtual/motivoCancelamento -->
                                    <th>Responsável</th> <!--  -->
                                    <th>Início</th> <!--  -->
                                    <th>Fim</th> <!--  -->
                                    <th>Mês Realização</th> <!-- mesRealizacao -->
                                    <th>Modelo Exame</th> <!-- modeloExame -->
                                    <th>Motivo Cancelamento</th> <!-- motivoCancelamento -->
                                    <th>Cidade</th> <!-- nomeCidade -->
                                    <th>Empresa</th> <!-- nomeEmpresa -->
                                    <th>Filial</th> <!-- nomeFilial/codNomeBuscaUnidade -->
                                    <th>UF</th> <!-- nomeUF -->
                                    <th>No Show</th> <!-- possuiNoShow -->
                                    <th>Taxa</th> <!-- possuiTaxa -->
                                    <th>Qtd Ausência</th> <!-- qtdAusenciaTotal -->
                                    <th>Qtd Mínima</th> <!-- qtdMinimaTotal -->
                                    <th>Qtd No Show</th> <!-- qtdNoShow -->
                                    <th>Qtd Total Ausência</th> <!-- qtdTotalAusencias -->
                                    <th>Valor Exame</th> <!-- valorExame -->
                                    <th>Valor Total Ausência</th> <!-- valorTotalAusencias -->
                                    <th>Valor Total Taxa</th> <!-- valorTotalTaxas -->
                                    <th>Alocar Credenciado - Responsável</th> <!--  -->
                                    <th>Alocar Credenciado - Conclusão</th> <!--  -->
                                    <th>Procedimento Selecionado</th> <!-- tabelaCredenciado.procedSelecionado -->
                                    <th>Qtd Contratada</th> <!-- tabelaCredenciado.qtdContratada -->
                                    <th>Tipo Contratação</th> <!-- tabelaCredenciado.tipoContratacao -->
                                    <th>Prestador</th> <!-- tabelaCredenciado.nomePrestador -->
                                    <th>Data Agendada</th> <!-- tabelaCredenciado.dataAtendAgendada -->
                                    <th>Período</th> <!-- tabelaCredenciado.perAlocado -->
                                    <th>Qtd Prevista</th> <!-- tabelaCredenciado.qtdPrevista -->
                                    <th>Qtd Ausência</th> <!-- tabelaCredenciado.qtdAusencia -->
                                    <th>Valor Ausência</th> <!-- tabelaCredenciado.valorAusencia -->
                                    <th>Valor Taxa</th> <!-- tabelaCredenciado.taxa -->
                                    <th>Valor Total Ausência</th> <!-- tabelaCredenciado.valorTotalAusencia -->
                                    <th>Tipo Negociação</th> <!-- tabelaCredenciado.tipoNegociacao -->
                                    <th>Valor Acordado</th> <!-- tabelaCredenciado.valorAcordado -->
                                    <th>Garantia</th> <!-- tabelaCredenciado.garantia -->
                                    <th>Deslocamento</th> <!-- tabelaCredenciado.deslocamento -->
                                    <th>Valor Total Procedimento</th> <!-- tabelaCredenciado.valorTotalProcedimento -->
                                    <th>Qtd Mínima</th> <!-- tabelaCredenciado.qtdMinima -->
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anterior" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <span id="numeracao"></span>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximo" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>