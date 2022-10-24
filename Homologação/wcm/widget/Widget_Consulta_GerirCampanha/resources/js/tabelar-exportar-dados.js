$(document).ready(function () {

	$('#buscaSolic').click(function () {
        $('#pagina').val('000001');
        $('#tabelaResultado').hide();
        var tamanho = preparaHTML();
        if (tamanho < 100) {
            $('#proxima').prop('disabled', false);
            $('#anterior').prop('disabled', true);
        } else {
            $('#proxima').prop('disabled', false);
            $('#anterior').prop('disabled', true);
            $('#pagina').val('000101');
        }
	});
	$('#proxima').click(function () {
		var page = $('#pagina').val();
		var tamanho = preparaHTML();
		if (page == '000101') {
			$('#anterior').prop('disabled', true);
		}
		if (tamanho > 100) {
			$('#proxima').prop('disabled', true);
			$('#anterior').prop('disabled', false);
		} else {
			page = parseInt(page);
			page = page + 100;
			page = page.toString();

			while (page.length < 6) {
				page = ('0' + page);
			};
			$('#pagina').val(page);
		}
		if (page == '000001') {
			if (tamanho < 100) {
				$('#proxima').prop('disabled', true);
				$('#anterior').prop('disabled', true);
				page = parseInt(page);
				page = page + 100;
				page = page.toString();

				while (page.length < 6) {
					page = ('0' + page);
				};
				$('#pagina').val(page);
			}
		}
	});
	$('#anterior').click(function () {
		var page = $('#pagina').val();
		var tamanho = '';
		if (page == '000101') {
			$('#anterior').prop('disabled', true);
			$('#proxima').prop('disabled', false);
			$('#pagina').val('000001');
			tamanho = preparaHTML();
			if (tamanho < 0) {
				mensagem('NÃ£o existem resultados para essa consulta');
				$('#proxima').prop('disabled', true);
				$('#anterior').prop('disabled', true);
			} else {
				page = parseInt(page);
				page = page - 100;
				page = page.toString();

				while (page.length < 6) {
					page = ('0' + page);
				};
				$('#pagina').val(page);
			}
		} else if (page == '000001') {
			$('#anterior').prop('disabled', true);
			$('#proxima').prop('disabled', false);
		} else {
			tamanho = preparaHTML();
			if (tamanho < 100) {
				$('#proxima').prop('disabled', true);
				$('#anterior').prop('disabled', true);
			} else {
				page = parseInt(page);
				page = page - 100;
				page = page.toString();

				while (page.length < 6) {
					page = ('0' + page);
				};
				$('#pagina').val(page);
			}
		}
	});
	const gerarCSV = (dados) => {
		var csv = "\uFEFF";
	
		csv += "Rateio;";
		csv += "Cod Solicitação;";
		csv += "Competência;";
		csv += "NF;";
		csv += "Serie NF;";
		csv += "Data de Vencimento;";
		csv += "Produto;";
		csv += "Justificativas/Comentários;";
		csv += "Centro de Custo;";
		csv += "Cod Centro de Custo;";
		csv += "Valor Total da Medição;";
	
		csv += "\n";
	
		for (var int = 0; int < dados.length; int++) {
			console.log(int);
			csv += dados[int].rateio + ";";
			csv += dados[int].codSolicitacao + ";";
			csv += dados[int].competencia + ";";
			csv += dados[int].nf + ";";
			csv += dados[int].serieNf + ";";
			csv += dados[int].dataVencimento + ";";
			csv += dados[int].produto + ";";
			var tmp = dados[int].justificativaComentario;
			tmp = tmp.replace(/[\n\r<>*\n?]/g, '');
			csv += tmp + ";";
			csv += dados[int].centroCusto + ";";
			csv += dados[int].codCentroCusto + ";";
			csv += dados[int].valorTotalMedicao + ";";
			csv += "\n";
			console.log(csv);
		}
	
		var downloadLink = document.createElement("a");
		downloadLink.download = "Histórico_Contrato.csv";
		downloadLink.href = window.URL.createObjectURL(new Blob([csv], {type: "text/csv"}));
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
		downloadLink.click();
	};
	$("#exportar").on('click', () => {
		console.log(dados);
		gerarCSV(dados);
	});

});

function preparaHTML() {

	$('#tabConsulta tbody tr').remove()

	var consultaContratos = buscaSolicitacao();
	var consultaProdutos = buscaProdutos(consultaContratos);

	if (consultaContratos == undefined) {
		mensagem('Não existem resultados para essa consulta');
	} else {
		montaHTML(consultaContratos, consultaProdutos);
		$('#tabelaResultado').show();
		return consultaContratos.length && consultaProdutos.length;
	}
}

var dados = [];

function montaHTML(consultaContratos, consultaProdutos) {
	var conteudoTbody = '';

	// $.each(consultaContratos, function (i, el) {
	for (var i = 0; i < consultaContratos.values.length; i++) {
		var conteudo = '';

		var rateio = "";
		var centroCusto = "";
		var codigoCentroCusto = "";

		// if(consultaCentroCusto.values == "null"){
		// 	consultaCentroCusto.values == ""
		// }
		conteudo += '<tr>';
		if (buscaRateio(consultaContratos.values[i].documentid) != undefined) {
			conteudo += '<td><button class="form-control btn btn-default" onclick="populaModal(this)" id="botaoRateio" name="botaoRateio">Rateio</button></td>';
			rateio = "Tem Rateio";
		} else {
			conteudo += '<td><button class="form-control btn btn-default"  id="botaoRateio" name="botaoRateio" disabled>Rateio</button></td>';
			rateio = "Não Tem Rateio";
		}
		conteudo += '<td><input type="text" class="form-control" readonly id="codSolici" name="codSolici" value="' + consultaContratos.values[i]["codSolicitacao"] + '">';
		conteudo += '<input type="hidden" class="form-control" readonly id="documentId" name="documentId" value="' + consultaContratos.values[i].documentid + '"></td>'
		conteudo += '<td><input type="text" class="form-control" readonly id="competencia" name="competencia" value="' + consultaContratos.values[i]["competencia"] + '"></td>';
		conteudo += '<td><input type="text" class="form-control" readonly id="NF" name="NF" value="' + consultaContratos.values[i]["notaFiscal"] + '"></td>';
		conteudo += '<td><input type="text" class="form-control" readonly id="serieNF" name="serieNF" value="' + consultaContratos.values[i]["serieNF"] + '"></td>';
		conteudo += '<td><input type="text" class="form-control" readonly id="dtVencimento" name="dtVencimento" value="' + consultaContratos.values[i]["dataVencimento"] + '"></td>';
		// conteudo += '<td><input type="text" class="form-control" readonly id="centroCustoAprov___' + consultaContratos[i] + '" name="centroCustoAprov___' + consultaContratos[i] + '" value="' + consultaContratos.values[i]["zmCentroCustosAprov"] + '"></td>';
		conteudo += '<td><input type="text" class="form-control" readonly id="produto" name="produto"  value="' + consultaProdutos.values[i]["descProduto"] + '"></td>';
		conteudo += '<td><input type="text" class="form-control" readonly id="justificativa" name="justificativa" value="' + consultaContratos.values[i]["justCentral"] + '"></td>';

		if (consultaContratos.values[i]["codCentroCusto"] == '' || consultaContratos.values[i]["codCentroCusto"] == null) {
			conteudo += '<td><input type="text" class="form-control" readonly id="codCentroCusto" name="codCentroCusto" value="' + consultaContratos.values[i]["zmCentroCustosAprov"].split('-')[1] + '"></td>';
			conteudo += '<td><input type="text" class="form-control" readonly id="centroCusto" name="centroCusto"  value="' + consultaContratos.values[i]["zmCentroCustosAprov"].split('-')[0] + '"></td>';
			centroCusto = consultaContratos.values[i]["zmCentroCustosAprov"].split('-')[1];
			codigoCentroCusto = consultaContratos.values[i]["zmCentroCustosAprov"].split('-')[0];
		} else {
			conteudo += '<td><input type="text" class="form-control" readonly id="codCentroCusto" name="codCentroCusto" value="' + consultaContratos.values[i]["centroCusto"] + '"></td>';
			conteudo += '<td><input type="text" class="form-control" readonly id="centroCusto" name="centroCusto"  value="' + consultaContratos.values[i]["codCentroCusto"] + '"></td>';
			centroCusto = consultaContratos.values[i]["centroCusto"];
			codigoCentroCusto = consultaContratos.values[i]["codCentroCusto"];
		}

		conteudo += '<td><input type="text" class="form-control" readonly id="valorTotalMedicao___' + consultaContratos[i] + '" name="valorTotalMedicao___' + consultaContratos[i] + '" value="' + consultaContratos.values[i]["valorTotalMedicao"] + '"></td>';
		conteudo += '<td>';
		conteudo += '</tr>';

		conteudoTbody += conteudo;

		dados.push({
			rateio : rateio,
			codSolicitacao : consultaContratos.values[i]["codSolicitacao"],
			competencia : consultaContratos.values[i]["competencia"],
			nf : consultaContratos.values[i]["notaFiscal"],
			serieNf : consultaContratos.values[i]["serieNF"],
			dataVencimento : consultaContratos.values[i]["dataVencimento"],
			produto : consultaProdutos.values[i]["descProduto"],
			justificativaComentario : consultaContratos.values[i]["justCentral"],
			centroCusto : centroCusto,
			codCentroCusto : codigoCentroCusto,
			valorTotalMedicao : consultaContratos.values[i]["valorTotalMedicao"]
		});
	}
	// });

	$('#tabConsulta tbody').append(conteudoTbody);

}