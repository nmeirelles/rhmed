<div id="WidgetConsultaSCF_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" data-params="WidgetConsultaSCF.instance()">
    <head>
        <script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
    </head>
    <body>
        <div class="fluig-style-guide">
            <div class="panel-body" id="divConsultaSCF">
                <input type="hidden" class="form-control" id="paginaSCF" name="paginaSCF">
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputNumeroFluxoSCF" class="control-label">Código Fluig</label>
                        <input type="text" name="inputNumeroFluxoSCF" id="inputNumeroFluxoSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectStatusSCF" class="control-label">Status</label>
                        <select name="selectStatusSCF" id="selectStatusSCF" class="form-control clearSCF">
                            <option value=""></option>
                            <option value="aberto">Aberto</option>
                            <option value="cancelado">Cancelado</option>
                            <option value="finalizado">Finalizado</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCPFCNPJSCF" class="control-label">CPF/CNPJ</label>
                        <input type="text" name="inputCPFCNPJSCF" id="inputCPFCNPJSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectAtividadeSCF" class="control-label">Localização</label>
                        <select name="selectAtividadeSCF" id="selectAtividadeSCF" class="form-control clearSCF">
                            <option value=""></option>
                            <option value="analise">Análise de Documentação e Formulário</option>
                            <option value="fiscalContabil">Dados Fiscais e Contábeis</option>
                            <option value="ti">T.I.</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputDataEntradaSCF" class="control-label">Data Entrada</label>
                        <input type="date" name="inputDataEntradaSCF" id="inputDataEntradaSCF" class="form-control">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputMesEntradaSCF" class="control-label">Mês Entrada</label>
                        <input type="text" name="inputMesEntradaSCF" id="inputMesEntradaSCF" class="form-control" mask="00" placeholder="07">  
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputAnoEntradaSCF" class="control-label">Ano Entrada</label>
                        <input type="text" name="inputAnoEntradaSCF" id="inputAnoEntradaSCF" class="form-control" mask="0000" placeholder="2021">  
                    </div>                    
                    <div class="form-group col-sm-3">
                        <label for="selectFormaPagamentoSCF" class="control-label">Forma de Pagamento</label>
                        <select name="selectFormaPagamentoSCF" id="selectFormaPagamentoSCF" class="form-control clearSCF">
                            <option value=""></option>
                            <option value="03">DOC</option>
                            <option value="41">TED - Outro Titular</option>
                            <option value="43">TED - Mesmo Titular</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <label for="inputContaSCF" class="control-label">Conta Bancária</label>
                        <input type="text" name="inputContaSCF" id="inputContaSCF" class="form-control clearSCF">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="selectTipoFornecedorSCF" class="control-label">Tipo de Fornecedor</label>
                        <select name="selectTipoFornecedorSCF" id="selectTipoFornecedorSCF" class="form-control clearSCF">
                            <option value=""></option>
                            <option value="F">Pessoa Física</option>
                            <option value="J">Pessoa Jurídica</option>
                            <option value="X">Importação</option>
                        </select>
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputRazaoSocialSCF" class="control-label">Razão Social</label>
                        <input type="text" name="inputRazaoSocialSCF" id="inputRazaoSocialSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputNomeFantasiaSCF" class="control-label">Nome Fantasia</label>
                        <input type="text" name="inputNomeFantasiaSCF" id="inputNomeFantasiaSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputEmailContatoSCF" class="control-label">Email Contato</label>
                        <input type="text" name="inputEmailContatoSCF" id="inputEmailContatoSCF" class="form-control clearSCF">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-3">
                        <label for="inputCEPSCF" class="control-label">CEP</label>
                        <input type="text" name="inputCEPSCF" id="inputCEPSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputEnderecoSCF" class="control-label">Endereço</label>
                        <input type="text" name="inputEnderecoSCF" id="inputEnderecoSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="inputCidadeSCF" class="control-label">Cidade</label>
                        <input type="text" name="inputCidadeSCF" id="inputCidadeSCF" class="form-control clearSCF">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="selectUFSCF" class="control-label">Estado</label>
                        <select name="selectUFSCF" id="selectUFSCF" class="form-control clearSCF">
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
                    <div class="form-group col-sm-4">
                        <label for="inputNomeSolicitanteSCF" class="control-label">Solicitante</label>
                        <input type="text" name="inputNomeSolicitanteSCF" id="inputNomeSolicitanteSCF" class="form-control">
                        <input type="hidden" name="inputMatriculaSolicitanteSCF" id="inputMatriculaSolicitanteSCF" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label class="control-label">Exportação Avançada</label>
                        <input 
                            type="checkbox" 
                            name="switchExportacaoAvancadaSCF" 
                            id="switchExportacaoAvancadaSCF"
                            data-on-text="Sim" 
                            data-off-text="Não" 
                            data-on-color="warning" 
                            data-off-color="default" 
                            size="small">                                            
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 fs-txt-left">
                        <input type="button" value="CONSULTAR" id="btnConsultarSCF" name="btnConsultarSCF" class="btn btn-info">
                        <input type="button" value="EXPORTAR" id="btnExportarSCF" name="btnExportarSCF" class="btn btn-success">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 table-responsive">
                         <table id="tableSCF" name="tableSCF" class="table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Código Fluig</th>
                                    <th>Status</th>
                                    <th>Data Entrada</th>
                                    <th>CPF/CNPJ</th>
                                    <th>Localização</th>
                                    <th>Requisitante</th>
                                    <th>Razão Social</th>
                                    <th>Nome Fantasia</th>
                                    <th>Nome Contato</th>
                                    <th>Email Contato</th>
                                    <th>CEP</th>
                                    <th>Endereço</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th>Tipo de Fornecedor</th>
                                    <th>Tipo de Conta</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Conta Bancária</th>
                                    <th>Conta Contábil</th>
                                    <th>Natureza Financeira</th>
                                    <th>IRRF</th>
                                    <th>ISS</th>
                                    <th>PIS</th>
                                    <th>COFINS</th>
                                    <th>CSLL</th>
                                    <th>Simples Nacional</th>
                                    <th>INSS</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                         </table>
                         <div class="row fs-no-margin">
                            <div class="col-sm-4 fs-txt-center">
                               <button id="anteriorSCF" disabled class="btn btn-default">&lsaquo; Anterior</button>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <SCFn id="numeracaoSCF"></SCFn>
                            </div>
                            <div class="col-sm-4 fs-txt-center">
                               <button id="proximoSCF" disabled class="btn btn-default">Próximo &rsaquo;</button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</div>