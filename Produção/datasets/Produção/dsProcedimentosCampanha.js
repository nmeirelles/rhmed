function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	criarEstrutura(dataset);
	try{
		dataset.addRow(new Array("P0001", "ACETIL COLINESTERASE PLASMATICA"));
		dataset.addRow(new Array("P0002", "ÁCIDO DELTA AMINOLEVULÍNICO"));
		dataset.addRow(new Array("P0003", "ÁCIDO METIL ETIL CETONA"));
		dataset.addRow(new Array("P0004", "ACUIDADE VISUAL"));
		dataset.addRow(new Array("P0005", "ADMISSIONAL"));
		dataset.addRow(new Array("P0006", "ÁLCOOL BAFOMETRO ELEC- HOMOLOGADO DENATRAN"));
		dataset.addRow(new Array("P0007", "ANT HBS"));
		dataset.addRow(new Array("P0008", "ANTI - HCV"));
		dataset.addRow(new Array("P0009", "APLICAÇÃO DE VACINA"));
		dataset.addRow(new Array("P0010", "ARSÊNIO - METABÓLITOS METILADOS URINÁRIOS"));
		dataset.addRow(new Array("P0011", "AUDIOMETRIA"));
		dataset.addRow(new Array("P0012", "AUDIOMETRIA TONAL"));
		dataset.addRow(new Array("P0013", "AUDIOMETRIA VOCAL"));
		dataset.addRow(new Array("P0014", "AVALIAÇÃO MÉDICA"));
		dataset.addRow(new Array("P0015", "AVALIAÇÃO PSICOLÓGICA"));
		dataset.addRow(new Array("P0016", "AVALIAÇÃO PSICOSSOCIAL"));
		dataset.addRow(new Array("P0017", "CARBOXIHEMOGLOBINA"));
		dataset.addRow(new Array("P0018", "CHUMBO SANGUÍNEO"));
		dataset.addRow(new Array("P0019", "COBRE URINÁRIO"));
		dataset.addRow(new Array("P0020", "COLESTEROL LDL"));
		dataset.addRow(new Array("P0021", "COLESTEROL TOTAL"));
		dataset.addRow(new Array("P0022", "COLESTEROL VLDL"));
		dataset.addRow(new Array("P0023", "CREATININA - SANGUE"));
		dataset.addRow(new Array("P0024", "DEMISSIONAL"));
		dataset.addRow(new Array("P0025", "EAS - URINA"));
		dataset.addRow(new Array("P0026", "ELETROCARDIOGRAMA"));
		dataset.addRow(new Array("P0027", "ELETROENCEFALOGRAMA"));
		dataset.addRow(new Array("P0028", "EPILEPSIA - QUESTIONÁRIO OMS"));
		dataset.addRow(new Array("P0029", "ESPIROMETRIA"));
		dataset.addRow(new Array("P0030", "FENOL URINÁRIO"));
		dataset.addRow(new Array("P0031", "FEZES - COPROCULTURA"));
		dataset.addRow(new Array("P0032", "FEZES - PARASITOLÓGICO"));
		dataset.addRow(new Array("P0033", "FOSFATASE ALCALINA"));
		dataset.addRow(new Array("P0034", "FOSFATASE ALCALINA ALP"));
		dataset.addRow(new Array("P0035", "GAMA-GLUTAMIL TRANSFERASE (GAMA-GT)"));
		dataset.addRow(new Array("P0036", "GLICEMIA DE JEJUM"));
		dataset.addRow(new Array("P0037", "GLICOSE"));
		dataset.addRow(new Array("P0038", "HEMOGLOBINA GLICADA"));
		dataset.addRow(new Array("P0039", "HEMOGLOBINA GLICOSILADA"));
		dataset.addRow(new Array("P0040", "HEMOGRAMA"));
		dataset.addRow(new Array("P0041", "HEMOGRAMA COM CONTAGEM DE PLAQUETAS"));
		dataset.addRow(new Array("P0042", "HEMOGRAMA COMPLETO"));
		dataset.addRow(new Array("P0043", "MANGANÊS URINÁRIO"));
		dataset.addRow(new Array("P0044", "METAMOGLOBINA"));
		dataset.addRow(new Array("P0045", "METANOL"));
		dataset.addRow(new Array("P0046", "MUDANÇA DE FUNÇÃO"));
		dataset.addRow(new Array("P0047", "PERIÓDICO"));
		dataset.addRow(new Array("P0048", "PSA"));
		dataset.addRow(new Array("P0049", "RAIO X COLUNA CERVICAL"));
		dataset.addRow(new Array("P0050", "RAIO X COLUNA LOMBOSACRA"));
		dataset.addRow(new Array("P0051", "RAIO X COLUNA TRONCO LOMBAR"));
		dataset.addRow(new Array("P0052", "RAIO X DE TÓRAX (PA E PERFIL)"));
		dataset.addRow(new Array("P0053", "RAIO X DE TÓRAX (PA) - PADRÃO OIT"));
		dataset.addRow(new Array("P0054", "RETORNO AO TRABALHO"));
		dataset.addRow(new Array("P0055", "RT PCR PARA COVID - 19"));
		dataset.addRow(new Array("P0056", "SANGUE - ÁCIDO ÚRICO"));
		dataset.addRow(new Array("P0057", "SANGUE - CARBOXIEMOGLOBINA"));
		dataset.addRow(new Array("P0058", "SANGUE - COLESTEROL HDL"));
		dataset.addRow(new Array("P0059", "SANGUE - CONTAGEM DE RETICULOCITOS"));
		dataset.addRow(new Array("P0060", "SANGUE - TGO"));
		dataset.addRow(new Array("P0061", "SANGUE - TGP"));
		dataset.addRow(new Array("P0062", "SOROLOGIA COVID -19"));
		dataset.addRow(new Array("P0063", "TECNICO DE ENFERMAGEM"));
		dataset.addRow(new Array("P0064", "TESTE DE ÁLCOOL E DROGAS (URINA)"));
		dataset.addRow(new Array("P0065", "TESTE DE ISHIHARA"));
		dataset.addRow(new Array("P0066", "TESTE RAPIDO"));
		dataset.addRow(new Array("P0067", "TESTE ROMGER"));
		dataset.addRow(new Array("P0068", "TESTE SCREENING (DROGAS - PESQUISA)"));
		dataset.addRow(new Array("P0069", "TESTE SHIAHARA"));
		dataset.addRow(new Array("P0070", "TOXINA T3 LIVRE"));
		dataset.addRow(new Array("P0071", "TOXINA T4 LIVRE"));
		dataset.addRow(new Array("P0072", "TRANSAMINASE OXALACÉTICA (AMINO TRANSFERASE ASPARTATO)"));
		dataset.addRow(new Array("P0073", "TRANSAMINASE PIRÚVICA (AMINO TRANSFERASE DE ALANINA)"));
		dataset.addRow(new Array("P0074", "TRIGLICERÍDEOS"));
		dataset.addRow(new Array("P0075", "TSH - HORMÔNIO TIREOESTIMULANTE"));
		dataset.addRow(new Array("P0076", "UREIA - SANGUE"));
		dataset.addRow(new Array("P0077", "URINA - 2,5 HEXANODIONA"));
		dataset.addRow(new Array("P0078", "URINA - ÁCIDO MANDELICO"));
		dataset.addRow(new Array("P0079", "URINA - ÁCIDO TRANS - TRANS - MUCONICO"));
		dataset.addRow(new Array("P0080", "URINA ÁCIDO HIPÚRICO"));
		dataset.addRow(new Array("P0081", "URINA ÁCIDO METIL HIPÚRICO"));
		dataset.addRow(new Array("P0082", "URINA AES"));
		dataset.addRow(new Array("P0083", "VHS"));
		dataset.addRow(new Array("P0084", "HBSAG"));
		dataset.addRow(new Array("P0085", "ANTI HBS"));
		dataset.addRow(new Array("P0086", "ANTI HBC IGG"));
		dataset.addRow(new Array("P0087", "RAIO X DE TORAX PA"));
		dataset.addRow(new Array("P0088", "TIPO SANGUÍNEO + FATOR RH"));
		dataset.addRow(new Array("P0089", "N-METILFORMANIDA"));
		dataset.addRow(new Array("P0090", "TRICLOROCOMPOSTO"));
		dataset.addRow(new Array("P0091", "VDRL"));
		dataset.addRow(new Array("E0089", "ÁCIDO BUTOXI-ACÉTICO"));
		dataset.addRow(new Array("E0133", "ÁCIDO TRICLOROACÉTICO"));
		dataset.addRow(new Array("E0237", "ANTÍGENO ESPECÍFICO PROSTÁTICO LIVRE (PSA LIVRE)"));
		dataset.addRow(new Array("E0238", "ANTÍGENO ESPECÍFICO PROSTÁTICO TOTAL (PSA LIVRE)"));
		dataset.addRow(new Array("E0298", "AVALIAÇÃO DA VISÃO DE CORES"));
		dataset.addRow(new Array("E0299", "AVALIAÇÃO DO CAMPO VISUAL"));
		dataset.addRow(new Array("E0321", "BILIRRUBINA (DIRETA, INDIRETA E TOTAL) - E0321"));
		dataset.addRow(new Array("E0336", "BRUCELA - IgG"));
		dataset.addRow(new Array("E0352", "CÁDMIO URINÁRIO"));
		dataset.addRow(new Array("E0387", "CHUMBO URINÁRIO"));
		dataset.addRow(new Array("E0530", "ECG CONVENCIONAL DE ATÉ 12 DERIRAVÇÕES"));
		dataset.addRow(new Array("E0536", "ELETROENCEFALOGRAMA"));
		dataset.addRow(new Array("E0624", "FLUORETO URINÁRIO"));
		dataset.addRow(new Array("E0699", "HEPATITE A - HAV - IgG"));
		dataset.addRow(new Array("E0701", "HEPATITE B - HBCAC - IgM"));
		dataset.addRow(new Array("E0702", "HEPATITE B - HBCAC - IgG"));
		dataset.addRow(new Array("E0704", "HEPATITE B - HBSAC"));
		dataset.addRow(new Array("E0705", "HEPATITE C - anti-HCV - IgG"));
		dataset.addRow(new Array("E0706", "HEPATITE C - anti-HCV - IgM"));
		dataset.addRow(new Array("E0800", "LEPTOSPIROSE - IgG"));
		dataset.addRow(new Array("E0850", "MERCÚRIO URINÁRIO"));
		dataset.addRow(new Array("E1074", "RADIOGRAFIA DE COLUNA DORSAL (AP+P) - E1074"));
		dataset.addRow(new Array("E1074u", "RADIOGRAFIA DE COLUNA DORSAL (AP)"));
		dataset.addRow(new Array("E1075", "RADIOGRAFIA DE COLUNA LOMBO-SACRA (AP + P)"));
		dataset.addRow(new Array("E1107", "SANGUE OCULTO NAS FEZES"));	
		dataset.addRow(new Array("E1189", "TOLUENO NA URINA"));	
		dataset.addRow(new Array("E1203", "TOXOPLASMOSE IgM"));	
		dataset.addRow(new Array("E1415", "RADIOGRAFIA DE TÓRAX (PA) - PADRÃO OIT"));	
		dataset.addRow(new Array("E3002", "AVALIAÇÃO OFTALMOLÓGICA"));	
		dataset.addRow(new Array("E3007", "TESTE DE EQUILÍBRIO (ROMBERG)"));	
		dataset.addRow(new Array("E4061", "RADIOGRAFIA DE COLUNA DORSAL (AP+P) - E4061"));	
		dataset.addRow(new Array("E5008", "BILIRRUBINA DIRETA - E5008"));
		dataset.addRow(new Array("E5009", "BILIRRUBINA INDIRETA - E5009"));
		dataset.addRow(new Array("radiografiaTorax", "RADIOGRAFIA DE TORAX PA E PERFIL - PADRÃO OIT"));	
		dataset.addRow(new Array("audiometriaTonalVocal", "AUDIOMETRIA TONAL E VOCAL"));
		dataset.addRow(new Array("P0018", "CHUMBO SANGUÍNEO"));

		

		return dataset;
		
		var proced = getParametro(constraints, "PROCEDIMENTO");
		
//		if (proced == null || proced == "") {
//			return dataset;
//		}
		
	} catch(e){
		log.error("dsProcedimentosCampanha.createDataset: " + e);
	}
	return dataset;
}

function criarEstrutura(dataset){
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("PROCEDIMENTO", DatasetFieldType.STRING);
}

function getParametro(constraints, campo) {
	var valor = "";
	if ((constraints != null) && (constraints.length > 0)) {
		for each(con in constraints) {
			if (con.getFieldName().trim().toUpperCase() == campo.trim().toUpperCase()) {
				valor = con.getInitialValue();
				break;
			}
		}
	}
	return valor;
}

function trim(valorStr){
	if ((valorStr == null) || (valorStr == undefined)){
		return "";
	}
	return valorStr.trim();
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		} // if
	} // for
} // function sleep