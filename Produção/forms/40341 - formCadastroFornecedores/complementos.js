//window.onload = function(){
// 	preencheAcompanhamento();
//}

function alteraMaiusculo(el){
	var campo = el.id;
	document.getElementById(campo).value = document.getElementById(campo).value.replace("|", "-").toUpperCase();
}

function preencheAcompanhamento() {
	data = new Date();
	//dt = data.toLocaleDateString() + " " + data.toLocaleTimeString();
	dt = $("#hora").val();

	if (document.getElementById('origem').value != "") {
		document.getElementById('destino').innerHTML = '<div class="panel panel-default fs-no-margin">' +
			'<div class="panel-body fs-sm-space media clearfix">' +
			'<a class="pull-left" href="#">' +
			'<div>' +
			'<img src="/social/api/rest/social/image/profile/' + $("#loginAprovadorAnterior").val() + '/SMALL_PICTURE" alt="" class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" social="" api="" rest="" image="" profile="" rodrigo="">' +
			'</div>' +
			'</a >' +
			' <div class="media-body">' +
			' <header>' +
			'<h5 class="media-heading">' +
			'<span class="wrap-element-popover"><a href="#" class="link-default">' + $("#nomeAprovadorAnterior").val() + '</a></span>' +
			'<span class="timeline-header-no-link"> compartilhou </span >' +
			'<a href="#" class="link-default">uma observação</a>' +
			'<span class="timeline-header-no-link fs-no-bold"> - </span>' +
			'<a href="#" class="link-reference-time fs-no-bold">' + dt + '</a>' +
			'</h5 >' +
			' </header >' +
			'<p>' + $("#origem").val() + '</p>' +
			'</div>' +
			'</div>' +

			'</div> <br> ' + document.getElementById('destino').innerHTML;
		document.getElementById('origem').value = "";
	}
	document.getElementById('acompanhamento').innerHTML = $("#destino").val();
}