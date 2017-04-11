// JavaScript Document


//   *******************   VARIAVEIS   *******************   //
var intervalo1;
var intervalo2;
var mydate = new Date();
var pagina_atual;
data_utc = Date.UTC(mydate.getYear(), mydate.getMonth(), mydate.getDate(), mydate.getHours(), mydate.getMinutes(), mydate.getSeconds(), mydate.getMilliseconds());
//   *******************   VARIAVEIS   *******************   //


//   *******************   PROTOTIPOS   *******************   //
Number.prototype.formatMoney = function (c, d, t) {
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
String.prototype.padLeft = function (n, s) {
	var t = this, L = s.length;
	while (t.length + L <= n) t = s + t;
	if (t.length < n) t = s.substring(0, n - t) + t;
	return t;
}
String.prototype.padRight = function (n, s) {
	var t = this, L = s.length;
	while (t.length + L <= n) t += s;
	if (t.length < n) t += s.substring(0, n - t);
	return t;
}
String.prototype.fullReplace = function (value, replacement) {
	var Val = new String(this);
	i = 0;
	while (Val.search(value) >= 0) {
		Val = Val.replace(value, replacement);
		if (i >= 50)
			break;
		i++;
	}
	return Val;
}

if (typeof String.prototype.startsWith != 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function (str) {
		return this.indexOf(str) == 0;
	};
}
//   *******************   PROTOTIPOS   *******************   //



//   *******************   EVENTOS   *******************   //
// Reposiciona a sidebar do chat ao fechar ou clicar no banner
$(function(){
	$('.header_notification').click(function (){	
		if (window.inGaiaChat_API)
			setTimeout(function(){window.inGaiaChat_API.emit('chatUpdateWidgetPosition');}, 1000);			
	});
});

$("input:disabled").addClass("disabled");
$("input,textarea").keypress(function (e) {
	if (capsLockCheck(e)) {
		jAlert("Por favor, desabilite a tecla <strong>CAPS LOCK</strong> do seu teclado")
		return (false);
	}

	if (backSlashCheck(e)) {
		jAlert("Por favor, utilize <strong>barra</strong> \"<strong>/</strong>\" ao invés da <strong>barra invertida</strong> \"<strong>\\</strong>\".");
		return (false);
	}

	if (e.which == 39) {
		return (false);
	}
});


//   *******************   EVENTOS   *******************   //


//   *******************   FUNCÇÕES   *******************   //
//Formata um valor para apresentar retirando o R$.
function FormataValorMonetario(num) {

	if (typeof (num) == "number") {
		if (num > 0) {
			if (num.indexOf("R$") >= 0) {
				num = num.replace(/[r$]/gi, "");
			}
		}
	} else {
		if (num != "") {
			if (num.indexOf("R$") >= 0) {
				num = num.replace(/[r$]/gi, "");
			}
		}
	}

	return Trim(num);
}
//Retira os espaços do inicio e fim da string
function Trim(str) {
	if (str != "") {
		return str.replace(/^\s+|\s+$/g, "");
	} else {
		return str;
	}
}

// Valida campo hora no evento onkeyup
function checkValidHour(hour) {
	if ((!isNaN(hour)) || (hour.indexOf(":") > -1)) {
		if (hour.length == 1) { if (hour > 2) { hour = '' } }
			if (hour.length == 2) { if (hour > 23) { hour = '2' } }
				if (hour.length == 3) {
					var newHour = hour.split("")
					if (newHour[2] != ":")
						hour = newHour[0] + newHour[1] + ":" + newHour[2];
				}
				if (hour.length == 4) {
					var newHour = hour.split(":")
					if (newHour[1] > 5) { hour = newHour[0] + ":" + '' }
				}
			if (hour.length > 5) {
				var newHour = hour.split("")
				hour = newHour[0] + newHour[1] + newHour[2] + newHour[3] + newHour[4]
			}
			return hour
		} else {
			return ""
		}
	}

//Função para carregar o player dos vídeos da universidade
function PlayerVideo() {
	$(".video").fancybox({
		type: "iframe",
		width: 605,
		height: 530
	});

	return (false);
}
//Formata um valor (R$) para realizar calculos em javascript
function FormataStringValorParaCalcular(obj) {
	var valor = obj;

	if (typeof (obj) != "undefined") {
		if (obj != "") {
			if (obj.indexOf("R$ ") >= 0 || obj.indexOf(",") >= 0) {
				valor = obj.replace("R$ ", "");
				while (valor.indexOf("R$ ") >= 0) valor = valor.replace("R$ ", "");
				valor = valor.replace(/\./g, "");
				valor = valor.replace(/,/g, ".");
			}
		}
	}
	return valor;
}
//Formata uma porcentagem para ralizar calculos em javascript
function FormataStringPorcentagemParaCalcular(obj) {
	var valor = obj;
	if (obj.indexOf(",") >= 0) {
		valor = obj.fullReplace(",", ".");
	}
	return valor;
}
//Formata valor com virgula para ralizar calculos em javascript
function FormataStringVirgulaParaCalcular(obj) {
	var valor = obj;

	if (typeof (valor) == "number" || typeof (valor) == "object") {
		valor = valor.toString();
	}

	if (valor.indexOf(",") >= 0) {
		valor = valor.fullReplace(",", ".");
	}

	return valor;
}
//Formata uma valor para apresentar na tela
function FormataValorParaApresentacao(obj, precisao, decimais, milhar) {
	valor = obj;
	precisao = (typeof (precisao) != 'undefined') ? precisao : 2;
	decimais = (typeof (decimais) != 'undefined') ? decimais : ',';
	milhar = (typeof (milhar) != 'undefined') ? milhar : '.';

	try {
		if (valor.indexOf(",") == -1 || valor.indexOf(".") == -1) {
			switch (typeof (obj)) {
				case 'string':
				case 'object':
				valor = parseFloat(obj);
				valor = valor.formatMoney(precisao, decimais, milhar);
				break;

				case 'number':
				valor = valor.formatMoney(precisao, decimais, milhar);
				break;

				case 'undefined':
				break;
			}
		}
	}
	catch (er) { }

	return valor;
}
//Formata uma porcentagem para apresentar na tela
function FormataPorcentagemParaApresentacao(obj, iPrecisao) {
	var valor = obj;

	if (typeof (valor) != 'undefined') {
		if (typeof (valor) == 'string') {

			if (valor.indexOf(",") >= 0) {
				valor = valor.replace(/,/g, ".");
			}

			valor = parseFloat(valor);
		}
		else if (typeof (valor) == 'object') {
			if (valor.toString().indexOf(",") >= 0) {
				valor = valor.toString().replace(/,/g, ".");
			}

			valor = parseFloat(valor);
		}

		valor = valor.toFixed(iPrecisao);

		if (typeof (valor) != 'string') {
			valor = valor.toString();
		}

		if (valor.indexOf(".") >= 0) {
			valor = valor.fullReplace(".", ",");
		}
	}

	return valor;
}
//Função para verificar se conteudo passado é um número.
function TryParseInt(str, defaultValue) {
	var retValue = defaultValue;
	if (str != null) {
		if (str.length > 0) {
			if (!isNaN(str)) {
				retValue = parseInt(str);
			}
		}
	}
	return retValue;
}
//Função para passar uma string (true, false) para um boolean.
function ParseBool(str) {
	if (typeof (str) == 'string') {
		return (str.toLowerCase() == 'false') ? false : true;
	}
	else if (typeof (str) == 'boolean') {
		return str;
	}
	else if (typeof (str) == 'object') {
		return (str.attr('value').toString().toLowerCase() == 'false') ? false : true;
	}
	else {
		return false;
	}
}
// Alert usando o plugin blockUI
function jAlert(mensagem, callback) {

	if (arguments.length > 3)
		largura = argWidth;
	else
		largura = '30%';
	$.unblockUI();


	html = '<div class="bootstrap_for_gaia">';
	html = html + "<h1>Aviso!</h1>";
	html = html + "<p>" + mensagem + "</p>";
	html = html + "<a id='okAlert' href='javascript:;' class='btn btn-success text-uppercase okAlert'>OK</a>";
	html = html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: largura, cursor: "auto" } });

	if (callback) {
		$("#okAlert").click(function () { callback(); });
	} else {
		$(".okAlert").click(function () { $.unblockUI(); });
	}
	$("#divIdBlockName p a").click(function () {
		$.blockUI();
		jLoading('Por favor, aguarde.');
	});
}
// Alert (BootStrap) usando o plugin blockUI
function jAlertBootStrap(mensagem, callback) {
	if (arguments.length > 3)
		largura = argWidth;
	else
		largura = '30%';
	$.unblockUI();

	html = "<div class='bootstrap_for_gaia'>";
	html = html + "<h1>Aviso!</h1>";
	html = html + "<p>" + mensagem + "</p>";
	html = html + "<p id='okAlert' class='btn btn-success text-uppercase'>OK</p>";
	html = html += "</div>";

	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: largura, cursor: "auto" } });

	if (callback) {
		$("#okAlert").click(function () { callback(); });
	} else {
		$("#okAlert").click(function () { $.unblockUI(); });
	}
}
// Alert usando o plugin blockUI
function jArquivosDuplicata(titulo, mensagem, id_processo, callback) {

	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>" + titulo + "</h1>";
	html += "<p>" + mensagem + "</p>";
	html += html + "<p id='okAlertDuplicata' class='btn btn-success text-uppercase'>FECHAR</p>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	// Atualiza a class do item, para itens com arquivo já gerado.
	$('.lnkGerarArquivoDuplicata').bind('click', function () {
		$('a.gridGerarArquivoDuplicata').each(function () {
			if ($(this).attr('onclick').toString().indexOf('(' + id_processo + ')') != -1) $(this).attr('class', 'gridReGerarArquivoDuplicata');
		});
	});

	if (callback) {
		$("#okAlertDuplicata").click(function () { callback(); });
	} else {
		$("#okAlertDuplicata").click(function () { $.unblockUI(); });
	}
}
function jLoading(message) {
	$.unblockUI();

	html = (message) ? "<h1>Carregando</h1><p>" + message + "</p>" : "<h1>Carregando</h1><p> Por favor, aguarde</p>";
	$.blockUI({
		message: html,
		css: {
			border: 'none',
			padding: '15px',
			backgroundColor: '#000',
			'-webkit-border-radius': '10px',
			'border-radius': '10px',
			'-moz-border-radius': '10px',
			opacity: .5,
			color: '#fff'
		}

	});
}
function jError(mensagem) {
	$.unblockUI

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Erro</h1><p>" + mensagem + "</p>";
	html += "<p id='okAlert' class='btn btn-success text-uppercase'>OK</p>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okAlert").click(function () { $.unblockUI(); return (false); });
}
function jOk() {
	var myArg = arguments;
	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Sucesso</h1><p>" + arguments[0] + "</p>";
	html += "<p id='okAlert' class='btn btn-success text-uppercase'>OK</p>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okAlert").click(function () {
		$.unblockUI();
		if (myArg[1]) {
			newWindow(myArg[1], "");
		}
		return (false);
	});
}
function jConfirmDelete(mensagem, obj) {
	$.unblockUI();

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Aten&ccedil;&atilde;o</h1><p>" + mensagem + "</p>";
	html += "<p><a href='#' id='noAlert' class='btn btn-default text-uppercase'>N&atilde;o</a> <a href='#' id='okAlert' class='btn btn-success text-uppercase'>Sim</a></p>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okAlert").click(function () {
		$.unblockUI();
		var caminho = new Array();
		caminho = obj.attr("href").split("?");
		pastas = caminho[0].replace("-acao", "");
		//alert(pastas);
		$.ajax({
			type: "GET",
			beforeSend: function () {
				jLoading();
			},
			error: function () {
				$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: "erro", css: { width: '30%', cursor: "auto" } });
			},
			url: caminho[0],
			data: caminho[1],
			success: function (msg) {
				$.unblockUI();
				obj.parent().parent().remove();
			}
		});
	});
	$("#noAlert").click(function () { $.unblockUI(); return false; });
	return false;
}
function jConfirmaSimNao(mensagem, onYesAction, onNoAction) {
	$.unblockUI

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Mensagem de confirma&#231;&#227;o</h1>";
	html += "<p>" + mensagem + "</p>";

	html += "<div class='text-center'>";
	html += "<p id=\"noAlert\" class=\"btn btn-default text-uppercase btnCancelar\">N&atilde;o</p>";
	html += "<p id=\"okConfirm\" class=\"btn btn-success text-uppercase btnSim\">Sim</p>";
	html += "</div>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		$.unblockUI();
		onYesAction();
	});

	$("#noAlert").click(function () {
		$.unblockUI();
		onNoAction();
		return false;
	});

	return false;
}
function jConfirmaSimNaoAlwaysClose(mensagem, onYesAction, onNoAction) {
	$.unblockUI

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Mensagem de confirma&#231;&#227;o</h1>";
	html += "<p>" + mensagem + "</p>";

	html += "<div class='text-center'>";
	html += "<p id=\"noAlert\" class=\"btn btn-default text-uppercase btnCancelar\">N&atilde;o</p>";
	html += "<p id=\"okConfirm\" class=\"btn btn-success text-uppercase btnSim\">Sim</p>";
	html += "</div>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		$.unblockUI();
		onYesAction();
		return false;
	});

	$("#noAlert").click(function () {
		$.unblockUI();
		onNoAction();
		return false;
	});

	return false;
}

function jAlert_v2(title, mensagem, event1, event2) {
	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';

	html = "<h1>" + title + "</h1>";
	html = html + "<p>" + mensagem + "</p>";

	html += "</div>";



	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#btncontinueCadastro").bind("click", function () {
		event1();
		return (false);
	});

	$("#btncancelCadastro").bind("click", function () {
		event2();
		return (false);
	});

	return (false);
}

function isEmpty(str) {
	return (!str || 0 === str.length);
}
function jConfirm(mensagem, link, param, titulo) {
	$.unblockUI();

	if (isEmpty(titulo)) {
		titulo = "Mensagem de confirma&ccedil;&atilde;o";
	}

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>" + titulo + "</h1>";
	html += "<p>" + mensagem + "</p>";

	html += "<div class='text-center'>";
	html += "<a href='#' id=\"noAlert\" class=\"btn btn-default text-uppercase btnCancelar\">N&atilde;o</a>";
	html += "<a href='" + link + "' id=\"okConfirm\" class=\"btn btn-success text-uppercase btnSim\">Sim</a>";
	html += "</div>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		$.unblockUI();
		newWindow(link, param);
		return (false);
	});
	$("#noAlert").click(function () { $.unblockUI(); return false; });
	return false;
}

function jConfirmBootbox(mensagem, link, param, titulo) {
	$.unblockUI();
	if (isEmpty(titulo)) {
		titulo = "Mensagem de confirma&ccedil;&atilde;o";
	}

	bootbox.dialog({
		message: mensagem,
		title: titulo,
		buttons: {
			danger: {
				label: "Não",
				className: "btn-danger",
				callback: function () {
					$.unblockUI();
					bootbox.hideAll();
					return false;
				}
			},
			success: {
				label: "Sim",
				className: "btn-success",
				callback: function () {
					newWindow(link, param);
					bootbox.hideAll();
					return false;
				}
			}
		}
	});
	return false;
}

function jOkConfirm(mensagem, link, param, titulo, linkRedireciona) {
	$.unblockUI();


	if (isEmpty(titulo)) {
		titulo = "Sucesso";
	}

	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>" + titulo + "</h1>";
	html += "<p>" + mensagem + "</p>";
	html += "<p><a href='" + linkRedireciona + "' id='noAlert' class='btn btn-default text-uppercase'>N&atilde;o</a> <a href='" + link + "' id='okConfirm' class='btn btn-success text-uppercase'>Sim</a></p>";

	html += "</div>";


	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		$.unblockUI();
		newWindow(link, param);
		return (false);
	});
	$("#noAlert").click(function () {
		$.unblockUI();
		newWindow(linkRedireciona, param);
		return false;
	});
	return false;
}

function jOkConfirmBootbox(mensagem, link, param, titulo, linkRedireciona) {
	$.unblockUI();
	bootbox.dialog({
		onEscape: function() {
			if(linkRedireciona) {
				newWindow(linkRedireciona, param);
				bootbox.hideAll();
				return false;
			}
		},
		message: mensagem,
		title: titulo,
		buttons: {
			danger: {
				label: "Não",
				className: "btn-danger",
				callback: function () {
					newWindow(linkRedireciona, param);
					bootbox.hideAll();
					return false;
				}
			},
			success: {
				label: "Sim",
				className: "btn-success",
				callback: function () {
					newWindow(link, param);
					bootbox.hideAll();
					return false;
				}
			}
		}
	});
}

function jLoadClienteControleChave(objDadosUsuariosDoCliente, objInput, add) {
	$.unblockUI();

	var html = '<div class="bootstrap_for_gaia">';

	html += "<p><strong>Existe um cliente cadastrado com esse telefone:</strong></p>";
	html += "<ul style='text-align: left;padding-left:50px;'>";
	html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosUsuariosDoCliente.tx_nome_cliente + "</span></li>";
	html += "</ul>";

	html += "<div class='text-right'>";
	html += "<span class='label-action-buttons'>Utilizar dados deste cliente?</span>&nbsp;";
	html += "<p id='noAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p>";
	html += "<p id='okConfirm' class='btn btn-success text-uppercase btnSim'>Sim</p>";
	html += "</div>";

	html += "</div>";


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {

		$("#txProprietario" + add).val(objDadosUsuariosDoCliente.tx_nome_cliente);
		$("#txRg" + add).val(objDadosUsuariosDoCliente.tx_rg);
		$("#txReferenciaCliente" + add).val(objDadosUsuariosDoCliente.tx_referencia);
		$("#hdIdCliente" + add).val(objDadosUsuariosDoCliente.id_cliente);
		$("#hdTelefones" + add).val(objDadosUsuariosDoCliente.evalMultipePhones);

		eval($("#hdTelefones" + add).val().replace("hdTelefones", "txProprietario"));

		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO.
		$("#txProprietario" + add).parent().parent().find("input").not("#txReferenciaCliente").attr("disabled", true);
		//$("#txProprietario" + add).parent().parent().find("input").not("#txReferenciaCliente").attr("readonly", true);
		$("#txProprietario" + add).parent().parent().find("input").not("#txReferenciaCliente").attr("class", "disabled");


		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES.
		$("#txProprietario" + add).parent().parent().find(".multiplePhonesTelOptions").remove();
		$("#txProprietario" + add).parent().parent().find(".addMultiplePhones").remove();

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#noAlert").click(function () {
		objInput.val("");
		$.unblockUI();
		return false;
	});

	return false;
}

function jLoadClienteCadastroProposta(objDadosUsuariosDoCliente, objInput, add) {

	var html = '<div class="bootstrap_for_gaia">';
	html += "<h1>Aviso!</h1>";

	if (objDadosUsuariosDoCliente.fl_permissao_cliente == 'true') {

		html += "<p><strong>Existe um cliente cadastrado com esse telefone:</strong></p>";
		html += "<ul style='text-align: left;padding-left:50px;'>";
		html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosUsuariosDoCliente.tx_nome_cliente + "</span></li>";
		html += "<li>E-mail: <span style='font-weight: bold;'>" + objDadosUsuariosDoCliente.tx_email_cliente + "</span></li>";
		html += "</ul>";

		html += "<div class='text-right'>";
		html += "<span class='label-action-buttons'>Deseja utilizar os dados deste cliente?</span>&nbsp;";
		html += "<p id='okAlert' class='btn btn-default text-uppercase jAlert noAlert'>Não</p>";
		html += "<p id='okConfirm' class='btn btn-success text-uppercase jAlert okConfirm'>Sim</p>";
		html += "</div>";

	} else {
		html += "<p><strong>Atenção</strong></p>";
		html += "<p>Existe um cliente cadastrado com esse telefone, mas você não tem permissão para visualizar esse cliente.</p>";
		html += "<p><a href='#' class='btn btn-success text-uppercase jAlert noAlert'>Fechar</a></p>";
	}


	html += "</div>";


	$.unblockUI();


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		add = "_1";
		$("#txReferenciaCliente" + add).val(objDadosUsuariosDoCliente.tx_referencia)
		$("#txProprietario" + add).val(objDadosUsuariosDoCliente.tx_nome_cliente)
		$("#hdIdtxProprietario" + add).val(objDadosUsuariosDoCliente.id_cliente);
		$("#idCliente" + add).val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail" + add).val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#txCpf" + add).val(objDadosUsuariosDoCliente.tx_cpf);
		$("#cboClienteMidia" + add).val(objDadosUsuariosDoCliente.id_cliente_midia_cliente);
		$("#hdTelefones" + add).val(objDadosUsuariosDoCliente.evalMultipePhones);
		$("#hdEmails").val(objDadosUsuariosDoCliente.evalMultipeEmails);

		//eval($("#hdTelefones" + add).val().replace("hdTelefones", "txProprietario" + add));
		eval($("#hdEmails").val());

		$('.addMultipleEmails').remove();
		//eval($("#hdEmails" + add).val().replace("hdEmails", "idEmails" + add));

		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO.
		$('#txProprietario' + add).parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr("class", "disabled");

		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES.
		$("#txProprietario" + add).parent().parent().find(".multiplePhonesTelOptions").remove();
		$("#txProprietario" + add).parent().parent().find(".addMultiplePhones").remove();
		$("#btnTrocaCliente" + add).parent().parent().show();

		//ESCONDE CAMPOS DO CLIENTE INTERESSADO.
		$("#idDadosAdicionais" + add + " ,#idConjuge" + add + ", #idEndereco" + add + ", .class_textarea_obs, #idUsuarioAtende" + add).hide();

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#okAlert").click(function () {
		objInput.val('');
		$.unblockUI();
		return false;
	});

	return false;

}




function jLoadClienteCadastroPropostaEmail(objDadosUsuariosDoCliente, objInput, add) {

	var html = '<div class="bootstrap_for_gaia">';
	html += "<h1>Aviso!</h1>";

	if (objDadosUsuariosDoCliente.fl_permissao_cliente == 'true') {

		html += "<p><strong>Existe um cliente cadastrado com esse e-mail:</strong></p>";
		html += "<ul style='text-align: left;padding-left:50px;'>";
		html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosUsuariosDoCliente.tx_nome_cliente + "</span></li>";
		html += "<li>E-mail: <span style='font-weight: bold;'>" + objDadosUsuariosDoCliente.tx_email_cliente + "</span></li>";
		html += "</ul>";

		html += "<div class='text-right'>";
		html += "<span class='label-action-buttons'>Deseja utilizar os dados deste cliente?</span>&nbsp;";
		html += "<p id='noAlert' class='btn btn-default text-uppercase Alert noAlert btnCancelar'>Não</p>";
		html += "<p id='okConfirm' class='btn btn-success text-uppercase jAlert okConfirm'>Sim</p>";
		html += "</div>";

	} else {
		html += "<p><strong>Atenção</strong></p>";
		html += "<p>Existe um cliente cadastrado com esse e-mail, mas você não tem permissão para visualizar esse cliente.</p>";
		html += "<p><a href='#' id='noAlert' class='btn btn-success text-uppercase jAlert noAlert'>Fechar</a></p>";
	}

	html += "</div>";


	$.unblockUI();


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {
		add = "_1";
		$("#txReferenciaCliente" + add).val(objDadosUsuariosDoCliente.tx_referencia)
		$("#txProprietario" + add).val(objDadosUsuariosDoCliente.tx_nome_cliente)
		$("#hdIdtxProprietario" + add).val(objDadosUsuariosDoCliente.id_cliente);
		$("#idCliente" + add).val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail" + add).val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#txCpf" + add).val(objDadosUsuariosDoCliente.tx_cpf);
		$("#cboClienteMidia" + add).val(objDadosUsuariosDoCliente.id_cliente_midia_cliente);
		$("#hdTelefones" + add).val(objDadosUsuariosDoCliente.evalMultipePhones);
		$("#hdEmails").val(objDadosUsuariosDoCliente.evalMultipeEmails);

		eval($("#hdTelefones" + add).val().replace("hdTelefones", "txProprietario" + add));
		eval($("#hdEmails").val());

		$('.addMultipleEmails').remove();
		//eval($("#hdEmails" + add).val().replace("hdEmails", "idEmails" + add));

		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO.
		$('#txProprietario' + add).parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr("class", "disabled");

		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES.
		$("#txProprietario" + add).parent().parent().find(".multiplePhonesTelOptions").remove();
		$("#txProprietario" + add).parent().parent().find(".addMultiplePhones").remove();
		$("#btnTrocaCliente" + add).parent().parent().show();

		//ESCONDE CAMPOS DO CLIENTE INTERESSADO.
		$("#idDadosAdicionais" + add + " ,#idConjuge" + add + ", #idEndereco" + add + ", .class_textarea_obs").hide();

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#noAlert").click(function () {
		objInput.val('');
		$.unblockUI();
		return false;
	});

	return false;

}
//FUNÇÃO USADA NA TELA DE ATENDENTE, QUANDO É COLOCADO UM TELEFONE
function jLoadUsuariosDoCliente(objDadosUsuariosDoCliente, objInput) {
	$.unblockUI();


	var escondeAtendimento = objDadosUsuariosDoCliente.strfuncionalidade == "cadastroAlteracaoCliente";

	var strFotoMasculino = "http://app.valuegaia.com.br/admin/img/bguser.jpg";
	var strFotoFeminino = "http://app.valuegaia.com.br/admin/img/bguserf.jpg";

	if (objDadosUsuariosDoCliente.id_rede_imobiliaria == 11 && objDadosUsuariosDoCliente.bl_modulo_basico == 1) {
		strFotoMasculino = "http://app.valuegaia.com.br/admin/css/themes/21online/img/bguser.jpg";
		strFotoFeminino = "http://app.valuegaia.com.br/admin/css/themes/21online/img/bguserf.jpg";
	}

	var status = objDadosUsuariosDoCliente.fl_ativo === "True" ? "ativo" : "inativo";
	var strFoto = "";

	var html = '<div class="bootstrap_for_gaia">';
	html += '<h1>Aviso!</h1>';

	if (objDadosUsuariosDoCliente.temAcesso.toLowerCase() == "true")
		html += "<p>O número de telefone <strong>" + objInput.val() + "</strong> está cadastrado para <strong>" + objDadosUsuariosDoCliente.tx_nome_cliente + "</strong> (Cliente " + objDadosUsuariosDoCliente.tipo + " " + status + ").";

	else
		html += "<p>O número de telefone <strong>" + objInput.val() + "</strong> já está cadastrado para um cliente.";

	//html += "Este cliente encontra " + status + " e o último atendimento foi em " + atendimento + ".<br/>";
	html += " Veja quem atende esse cliente:</p>";

	nUsers = objDadosUsuariosDoCliente.usuarios.length;
	for (i = 0; i < nUsers; i++) {
		html += "<div class=\"users \">";

		if (objDadosUsuariosDoCliente.usuarios[i].tx_foto != "") {
			strFoto = objDadosUsuariosDoCliente.usuarios[i].tx_foto
		} else {
			//1 - MASCULINO 2 - FEMININO
			if (objDadosUsuariosDoCliente.usuarios[i].in_sexo_usuario == 1) {
				strFoto = strFotoMasculino;
			} else {
				strFoto = strFotoFeminino;
			}
		}

		var atendimento = objDadosUsuariosDoCliente.usuarios[i].dt_atendimento == '' ? " (Sem atendimento para esse cliente)" : " (Atendeu o cliente em " + objDadosUsuariosDoCliente.usuarios[i].dt_atendimento + ")"
		var telefone = objDadosUsuariosDoCliente.usuarios[i].tx_telefone;

		html += "<div class=\"classImgUsuario\"><img src= " + strFoto + " /></div>";
		html += "<div class=\"classInfoUsuario\">";
		html += "<p><strong>" + objDadosUsuariosDoCliente.usuarios[i].tx_nome_usuario + "</strong>" + atendimento + "<br/>";
		if (telefone != null && telefone != '')
			html += "Contato: " + objDadosUsuariosDoCliente.usuarios[i].tx_telefone + "</p>";
		else
			html += "</p>";
		if (!escondeAtendimento)
			html += "<p><a rel=" + objDadosUsuariosDoCliente.usuarios[i].id_usuario + " href=\"#\">Continuar atendendo com " + objDadosUsuariosDoCliente.usuarios[i].tx_nome_usuario + " </a></p>";
		html += "</div>";
		html += "</div>";
	}

	var link = "";

	if (objDadosUsuariosDoCliente.strfuncionalidade == "cadastroAlteracaoCliente") {

		if (objDadosUsuariosDoCliente.temAcesso.toLowerCase() == "true") {
			link = "modules/clientes/cliente-cadastro.aspx?id=" + objDadosUsuariosDoCliente.id_cliente;
			html += "<div class='text-right'><span class='label-action-buttons'>Deseja ir ao cadastro dele?</span>&nbsp;<p id='okAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p><p id='okAlert' class='btn btn-success text-uppercase btnSim'>Sim</p></div>";
		} else {
			html += "<p id='okAlert' class='btn btn-success text-uppercase btnCancelar'>Ok</p>";
		}

	} else {
		if (objDadosUsuariosDoCliente.id_perfil_usuario == 3 || objDadosUsuariosDoCliente.id_perfil_usuario == 9) {
			html += "<p><a href='#' id='btnCancelar' class='btn btn-success text-uppercase btnCancelar'>Cancelar</a></p>";
		} else {
			html += "<p><a href='#' id='btnEscolherOutroCorretor'>Escolher outro corretor</a> <a href='#' class='btn btn-success text-uppercase btnCancelar'>Cancelar</a></p>";
		}
	}

	html += "</div>";

	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, nameDivId: 'divClientUser', css: {} });


	$(".btnCancelar").click(function () {
		objInput.val('');
		$.unblockUI();
		return (false);
	});

	$(".btnSim").click(function () {
		location.href = link;
	});


	$("#btnEscolherOutroCorretor").click(function () {
		$("#txProprietario").val(objDadosUsuariosDoCliente.tx_nome_cliente);
		$("#hdIdtxProprietario").val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail").val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#hdCorretorEscolhido").val("false");
		$("#hdTelefones").val(objDadosUsuariosDoCliente.evalMultipePhones);
		eval($("#hdTelefones").val().replace("hdTelefones", "txProprietario"));
		$(".multiplePhonesTelOptions, .addMultiplePhones").remove();

		$('#hdEmails').val(objDadosUsuariosDoCliente.evalMultipeEmails);
		eval($('#hdEmails').val().replace("hdEmails", "idEmails"));
		$('.multipleEmailsTelOptions, .addMultipleEmails').remove();
		$("#txProprietario").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");
		$("#btnTrocaCliente").parent().parent().show();
		$.unblockUI();
		return (false);
	});


	$(".users").find("a").bind("click", function () {

		$("#txProprietario").val(objDadosUsuariosDoCliente.tx_nome_cliente);
		$("#hdIdtxProprietario").val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail").val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#cboCorretor").val($(this).attr("rel"));
		$("#hdCorretorEscolhido").val("true");
		$("#hdTelefones").val(objDadosUsuariosDoCliente.evalMultipePhones);
		eval($("#hdTelefones").val().replace("hdTelefones", "txProprietario"));
		$(".multiplePhonesTelOptions, .addMultiplePhones").remove();

		//eval(objDadosUsuariosDoCliente.evalMultipeEmails);
		//var teste = $("#hdEmails").val();
		//var teste2 = $("#idEmails").val();

		//debugger;

		$("#hdEmails").val(objDadosUsuariosDoCliente.evalMultipeEmails);
		var teste = ($("#hdEmails").val().replace("hdEmails", "idEmails"));
		////$("#hdEmails").val(teste);
		//$("#idEmails").val(teste);
		//var outro = $("#hdEmails").val();
		//var outro2 = $("#idEmails").val();

		//var teste = $("#hdEmails").val();
		//var teste2 = $("#idEmails").val();
		eval($("#hdEmails").val());
		//eval($("#idEmails").val());



		$(".multiplePhonesTelOptions, .addMultipleEmails").hide();
		$("#idEmails").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");



		$("#txProprietario").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");
		$("#btnTrocaCliente").parent().parent().show();
		$("#tx_comentario").val("Entre em contato com o cliente.");
		//adicionar emails aqui





		$.unblockUI();
		$("#flsEnd").hide();
		return (false);
	});

	return (false);
}

//FUNÇÃO USADA NA TELA DE ATENDENTE, QUANDO É COLOCADO UM EMAIL
function jLoadUsuariosDoClienteEmail(objDadosUsuariosDoCliente, objInput) {
	$.unblockUI();


	var escondeAtendimento = objDadosUsuariosDoCliente.strfuncionalidade == "cadastroAlteracaoCliente";

	var strFotoMasculino = "http://app.valuegaia.com.br/admin/img/bguser.jpg";
	var strFotoFeminino = "http://app.valuegaia.com.br/admin/img/bguserf.jpg";

	if (objDadosUsuariosDoCliente.id_rede_imobiliaria == 11 && objDadosUsuariosDoCliente.bl_modulo_basico == 1) {
		strFotoMasculino = "http://app.valuegaia.com.br/admin/css/themes/21online/img/bguser.jpg";
		strFotoFeminino = "http://app.valuegaia.com.br/admin/css/themes/21online/img/bguserf.jpg";
	}

	var status = objDadosUsuariosDoCliente.fl_ativo === "True" ? "ativo" : "inativo";

	var strFoto = "";

	var html = '<div class="bootstrap_for_gaia">';
	html += '<h1>Aviso!</h1>';


	if (objDadosUsuariosDoCliente.temAcesso.toLowerCase() == "true")
		html += "<p>O e-mail <strong>" + objInput.val() + "</strong> está cadastrado para <strong>" + objDadosUsuariosDoCliente.tx_nome_cliente + "</strong> (Cliente " + objDadosUsuariosDoCliente.tipo + " " + status + ").<br/>";
	else
		html += "<p>O e-mail <strong>" + objInput.val() + "</strong> já está cadastrado para um cliente. <br/>";
	//html += "Este cliente encontra " + status + " e o último atendimento foi em " + atendimento + ".<br/>";
	html += "Veja quem atende esse cliente:</p>";

	nUsers = objDadosUsuariosDoCliente.usuarios.length;
	for (i = 0; i < nUsers; i++) {
		html += "<div class=\"users \">";

		if (objDadosUsuariosDoCliente.usuarios[i].tx_foto != "") {
			strFoto = objDadosUsuariosDoCliente.usuarios[i].tx_foto
		} else {
			//1 - MASCULINO 2 - FEMININO
			if (objDadosUsuariosDoCliente.usuarios[i].in_sexo_usuario == 1) {
				strFoto = strFotoMasculino;
			} else {
				strFoto = strFotoFeminino;
			}
		}

		var atendimento = objDadosUsuariosDoCliente.usuarios[i].dt_atendimento == '' ? " (Sem atendimento para esse cliente)" : " (Atendeu o cliente em " + objDadosUsuariosDoCliente.usuarios[i].dt_atendimento + ")"
		var telefone = objDadosUsuariosDoCliente.usuarios[i].tx_telefone;

		html += "<div class=\"classImgUsuario\"><img src= " + strFoto + " /></div>";
		html += "<div class=\"classInfoUsuario\">";
		html += "<p><strong>" + objDadosUsuariosDoCliente.usuarios[i].tx_nome_usuario + "</strong>" + atendimento + "<br/>";
		if (telefone != null && telefone != '')
			html += "Contato: " + objDadosUsuariosDoCliente.usuarios[i].tx_telefone + "</p>";
		else
			html += "</p>";
		if (!escondeAtendimento)
			html += "<p><a rel=" + objDadosUsuariosDoCliente.usuarios[i].id_usuario + " href=\"#\">Continuar atendendo com " + objDadosUsuariosDoCliente.usuarios[i].tx_nome_usuario + " </a></p>";
		html += "</div>";
		html += "</div>";
	}

	var link = "";

	if (objDadosUsuariosDoCliente.strfuncionalidade == "cadastroAlteracaoCliente") {

		if (objDadosUsuariosDoCliente.temAcesso.toLowerCase() == "true") {
			link = "modules/clientes/cliente-cadastro.aspx?id=" + objDadosUsuariosDoCliente.id_cliente;
			html += "<div class='text-right'><span class='label-action-buttons'>Deseja ir ao cadastro dele?</span>&nbsp;<p id='okAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p><p id='okAlert' class='btn btn-success text-uppercase btnSim'>Sim</p></div>";
		} else {
			html += "<p id='okAlert' class='btn btn-success text-uppercase btnCancelar' style='display:inline-block'>Ok</p>";
		}

	} else {
		if (objDadosUsuariosDoCliente.id_perfil_usuario == 3 || objDadosUsuariosDoCliente.id_perfil_usuario == 9) {
			html += "<div class='text-center'><a href='#' id='btnCancelar' class='btn btn-success text-uppercase btnCancelar'>Ok</a></div>";
		} else {
			html += "<div class='text-right'><a href='#' class='btn btn-default text-uppercase btnCancelar'>Cancelar</a> <a href='#' id='btnEscolherOutroCorretor' class='btn btn-success text-uppercase'>Escolher outro corretor</a></div>";
		}
	}

	html += "</div>";

	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, nameDivId: 'divClientUser', css: { width: '30%', cursor: "auto" } });

	$(".btnCancelar").click(function () {
		objInput.val('');
		$.unblockUI();
		return (false);
	});

	$(".btnSim").click(function () {
		location.href = link;
	});


	$("#btnEscolherOutroCorretor").click(function () {

		$("#txProprietario").val(objDadosUsuariosDoCliente.tx_nome_cliente);
		$("#hdIdtxProprietario").val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail").val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#hdCorretorEscolhido").val("false");
		$("#hdTelefones").val(objDadosUsuariosDoCliente.evalMultipePhones);
		eval($("#hdTelefones").val().replace("hdTelefones", "txProprietario"));
		$(".multiplePhonesTelOptions, .addMultiplePhones").remove();

		$('#hdEmails').val(objDadosUsuariosDoCliente.evalMultipeEmails);
		eval($('#hdEmails').val().replace("hdEmails", "idEmails"));
		$('.multipleEmailsTelOptions, .addMultipleEmails').remove();
		$("#txProprietario").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");
		$("#btnTrocaCliente").parent().parent().show();
		$.unblockUI();
		return (false);
	});


	$(".users").find("a").bind("click", function () {

		$("#txProprietario").val(objDadosUsuariosDoCliente.tx_nome_cliente);
		$("#hdIdtxProprietario").val(objDadosUsuariosDoCliente.id_cliente);
		$("#txEmail").val(objDadosUsuariosDoCliente.tx_email_cliente);
		$("#cboCorretor").val($(this).attr("rel"));
		$("#hdCorretorEscolhido").val("true");
		$("#hdTelefones").val(objDadosUsuariosDoCliente.evalMultipePhones);
		eval($("#hdTelefones").val().replace("hdTelefones", "txProprietario"));
		$(".multiplePhonesTelOptions, .addMultiplePhones").remove();

		//eval(objDadosUsuariosDoCliente.evalMultipeEmails);
		//var teste = $("#hdEmails").val();
		//var teste2 = $("#idEmails").val();

		//debugger;

		$("#hdEmails").val(objDadosUsuariosDoCliente.evalMultipeEmails);
		var teste = ($("#hdEmails").val().replace("hdEmails", "idEmails"));
		////$("#hdEmails").val(teste);
		//$("#idEmails").val(teste);
		//var outro = $("#hdEmails").val();
		//var outro2 = $("#idEmails").val();

		//var teste = $("#hdEmails").val();
		//var teste2 = $("#idEmails").val();
		eval($("#hdEmails").val());
		//eval($("#idEmails").val());



		$(".multiplePhonesTelOptions, .addMultipleEmails").hide();
		$("#idEmails").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");



		$("#txProprietario").parent().parent().find("input, select").prop('disabled', true).prop('readonly', true).attr("class", "disabled");
		$("#btnTrocaCliente").parent().parent().show();
		$("#tx_comentario").val("Entre em contato com o cliente.");
		//adicionar emails aqui





		$.unblockUI();
		$("#flsEnd").hide();
		return (false);
	});

	return (false);
}


//USADO QUANDO O ESTÁ NO CADASTRO DE CLIENTE E O TELEFONE INFORMADO JÁ EXISTE.
function jValidaCliente(objDadosCliente, objInput) {
	var message = "Já existe um cliente com esse telefone " + objInput.val() + ".\n Deseja ir ao cadastro dele?";
	var link = "modules/clientes/cliente-cadastro.aspx?id=" + objDadosCliente.id_cliente;
	var blMsgError = false;

	/*VERIFICA SE O USUARIO LOCAGO JÁ ATENDE CLIENTE ||
	 SE O USUARIO LOGADO NÃO É CORRETOR OU GERENTE DE EQUIPE NESSE CASO TEM DIREITO DE IR PARA O CADASTRO ||
	 SE O USUARIO LOGADO É GERENTE E ALGUM DOS CORRETORES QUE ATENDE O CLIENTE É DA SUA EQUIPE*/
	 if (objDadosCliente.bl_usuario_logado_atende_cliente ||
	 	(objDadosCliente.in_usuario_logado_nivel != 3 && objDadosCliente.in_usuario_logado_nivel != 9) ||
	 	(objDadosCliente.bl_usuario_logado_pertence_equipe && objDadosCliente.in_usuario_logado_nivel == 9)) {
	 	blMsgError = false;
	} else {
		/*VERIFICA SE USUARIO LOGADO É CORRETOR*/
		if (objDadosCliente.in_usuario_logado_nivel == 3) {
			/*VERIFICA SE USUARIO LOGADO TEM PERMISSAO PARA INTERESSADO E SE EXISTE INTERESSADO NO CLIENTE ||
			VERIFICA SE USUARIO LOGADO TEM PERMISSAO PARA PROPRIETARIO E SE EXISTE PROPRIETARIO NO CLIENTE*/
			if ((objDadosCliente.id_permissao_interessado > 0 && objDadosCliente.in_qtde_interessado > 0) || (objDadosCliente.id_permissao_proprietario > 0 && objDadosCliente.in_qtde_proprietario > 0)) {
				blMsgError = false;
			}
			/*VERIFICA SE A IMOBILIARIA TRABALHA COM A PERMISSÃO DE 1 PROPRIETARIO E 1 INTERESSADO*/
			else if (objDadosCliente.in_imobiliaria_permissao_cliente == 3) {
				/*SE EXISTIR MAIS QUE 1 PROPRIETARIO E INTERESSADO NÃO PODE ACESSAR CLIENTE*/
				if (objDadosCliente.in_qtde_proprietario > 0 && objDadosCliente.in_qtde_interessado > 0) {
					blMsgError = true;
				} else {
					blMsgError = false;
				}
			}
			else {
				blMsgError = true;
			}
		}
		else {
			blMsgError = true;
		}
	}

	if (blMsgError) {
		alert("Já existe um cliente com esse telefone " + objInput.val() + " e esta sendo atendido por outro(s) corretor(es). \n Entre em contato com sua gerência."); objInput.val('');
	} else {
		if (confirm(message)) { newWindow(link, ''); } else { objInput.val(''); }
	}
}
//USADO QUANDO O ESTÁ NO CADASTRO DE CLIENTE E O CPF INFORMADO JÁ EXISTE.
function jValidaCpf(objDadosCliente, objInput) {
	$.unblockUI();

	var html = "<p><strong>Já existe um cliente cadastrado com este CPF:</strong></p>";
	html += "<ul style='text-align: left;padding-left:50px;'>";
	html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosCliente.nome + "</span></li>";
	html += "<li>CPF: <span style='font-weight: bold;'>" + objInput.val() + "</span></li>";
	html += "</ul>";

	var html_anchor = "<p>Ir para o cadastro deste cliente?</p>";
	html_anchor += "<p><a href='#' id='okConfirm'>Sim</a> <a href='#' id='noAlert'>N&atilde;o</a></p>";

	var html_noanchor = "<p><a href='#' id='okConfirm'>Ok</a></p>";

	var link = "modules/clientes/cliente-cadastro.aspx?id=" + objDadosCliente.id;
	var blMsgError = false;

	/*VERIFICA SE O USUARIO LOCAGO JÁ ATENDE CLIENTE ||
	 SE O USUARIO LOGADO NÃO É CORRETOR OU GERENTE DE EQUIPE NESSE CASO TEM DIREITO DE IR PARA O CADASTRO ||
	 SE O USUARIO LOGADO É GERENTE E ALGUM DOS CORRETORES QUE ATENDE O CLIENTE É DA SUA EQUIPE*/
	 if (objDadosCliente.bl_usuario_logado_atende_cliente ||
	 	(objDadosCliente.in_usuario_logado_nivel != 3 && objDadosCliente.in_usuario_logado_nivel != 9) ||
	 	(objDadosCliente.bl_usuario_logado_pertence_equipe && objDadosCliente.in_usuario_logado_nivel == 9)) {
	 	blMsgError = false;
	} else {
		/*VERIFICA SE USUARIO LOGADO É CORRETOR*/
		if (objDadosCliente.in_usuario_logado_nivel == 3) {
			/*VERIFICA SE USUARIO LOGADO TEM PERMISSAO PARA INTERESSADO E SE EXISTE INTERESSADO NO CLIENTE ||
			VERIFICA SE USUARIO LOGADO TEM PERMISSAO PARA PROPRIETARIO E SE EXISTE PROPRIETARIO NO CLIENTE*/
			if ((objDadosCliente.id_permissao_interessado > 0 && objDadosCliente.in_qtde_interessado > 0) || (objDadosCliente.id_permissao_proprietario > 0 && objDadosCliente.in_qtde_proprietario > 0)) {
				blMsgError = false;
			}
			/*VERIFICA SE A IMOBILIARIA TRABALHA COM A PERMISSÃO DE 1 PROPRIETARIO E 1 INTERESSADO*/
			else if (objDadosCliente.in_imobiliaria_permissao_cliente == 3) {
				/*SE EXISTIR MAIS QUE 1 PROPRIETARIO E INTERESSADO NÃO PODE ACESSAR CLIENTE*/
				if (objDadosCliente.in_qtde_proprietario > 0 && objDadosCliente.in_qtde_interessado > 0) {
					blMsgError = true;
				} else {
					blMsgError = false;
				}
			}
			else {
				blMsgError = true;
			}
		}
		else {
			blMsgError = true;
		}
	}

	if (blMsgError) {
		$.blockUI({ message: html + html_noanchor, blockMsgClass: 'DefaultModalBlockUI', css: { width: '30%', cursor: "auto" } });
		$("#okConfirm").click(function () {
			objInput.val("");
			$.unblockUI();
			objInput.focus();
			return false;
		});
	} else {
		$.blockUI({ message: html + html_anchor, blockMsgClass: 'DefaultModalBlockUI', css: { width: '30%', cursor: "auto" } });
		$("#okConfirm").click(function () {
			objInput.val("");
			$.unblockUI();
			newWindow(link, '');
			return false;
		});
		$("#noAlert").click(function () {
			objInput.val("");
			$.unblockUI();
			objInput.focus();
			return false;
		});
	}
}
function jValidaCpfNoLink(objDadosCliente, objInput) {
	$.unblockUI();

	var html = "<p>Já existe um cliente cadastrado com este CPF</p>";
	var html_noanchor = "<p><a href='#' id='okConfirm'>Ok</a></p>";

	$.blockUI({ message: html + html_noanchor, blockMsgClass: 'DefaultModalBlockUI', css: { width: '30%', cursor: "auto" } });
	$("#okConfirm").click(function () {
		objInput.val("");
		$.unblockUI();
		objInput.focus();
		return false;
	});
}
//USADO NO CADASTRO DE IMÓVEL E O CLIENTE JÁ EXISTE.
function jConfirmIncluirProprietarioPeloTelefone(objDadosDoProprietario, objInput) {
	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';
	html += "<h1>Aviso!</h1>";

	html += "<p><strong>Existe um cliente cadastrado com esse telefone:</strong></p>";
	html += "<ul style='text-align: left;padding-left:50px;'>";
	html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosDoProprietario.nome + "</span></li>";
	html += "<li>E-mail: <span style='font-weight: bold;'>" + objDadosDoProprietario.email + "</span></li>";
	html += "</ul>";

	html += "<div class='text-right'>";
	html += "<span class='label-action-buttons'>Utilizar dados deste cliente?</span>&nbsp;";
	html += "<p id='noAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p>";
	html += "<p id='okConfirm' class='btn btn-success text-uppercase btnSim'>Sim</p>";
	html += "</div>";
	html += "</div>";


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {

		$('#txProprietario').val(objDadosDoProprietario.nome)
		$('#hdIdtxProprietario').val(objDadosDoProprietario.id);
		$("#idCliente").val(objDadosDoProprietario.id);
		$('#txEmail').val(objDadosDoProprietario.email);
		$('#cboClienteMidia').val(objDadosDoProprietario.midia);
		$('#hdTelefones').val(objDadosDoProprietario.evalMultipePhones);
		$('#hdEmails').val(objDadosDoProprietario.evalMultipeEmails);

		eval($('#hdTelefones').val().replace('hdTelefones', 'txProprietario'));
		eval($('#hdEmails').val().replace('hdEmails', 'idEmails'));
		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO
		$('#txProprietario').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');

		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES
		$('.multiplePhonesTelOptions, .addMultiplePhones').remove();
		$('.multipleEmailsTelOptions, .addMultipleEmails').remove();
		$('#btnTrocaCliente').parent().parent().show();

		if ($("#cmbEnviarAtividade").length)
			$('#cmbEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');

		if ($("#inDiasEnviarAtividade").length)
			$('#inDiasEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#noAlert").click(function () {
		objInput.val("");
		$.unblockUI();
		return false;
	});

	return false;
}

//USADO NO CADASTRO DE IMÓVEL E O CLIENTE JÁ EXISTE.
function jConfirmIncluirProprietarioPeloEmail(objDadosDoProprietario, objInput) {
	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Aviso!</h1>";

	html += "<p><strong>Existe um cliente cadastrado com esse e-mail:</strong></p>";
	html += "<ul style='text-align: left;padding-left:50px;'>";
	html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosDoProprietario.nome + "</span></li>";
	html += "<li>E-mail: <span style='font-weight: bold;'>" + objDadosDoProprietario.email + "</span></li>";
	html += "</ul>";

	html += "<div class='text-right'>";
	html += "<span class='label-action-buttons'>Utilizar dados deste cliente?</span>&nbsp;";
	html += "<p id='noAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p>";
	html += "<p id='okConfirm' class='btn btn-success text-uppercase btnSim'>Sim</p>";
	html += "</div>";

	html += "</div>";


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {

		$('#txProprietario').val(objDadosDoProprietario.nome)
		$('#hdIdtxProprietario').val(objDadosDoProprietario.id);
		$("#idCliente").val(objDadosDoProprietario.id);
		$('#txEmail').val(objDadosDoProprietario.email);
		$('#cboClienteMidia').val(objDadosDoProprietario.midia);
		$('#hdTelefones').val(objDadosDoProprietario.evalMultipePhones);
		$('#hdEmails').val(objDadosDoProprietario.evalMultipeEmails);

		eval($('#hdTelefones').val().replace('hdTelefones', 'txProprietario'));
		eval($('#hdEmails').val().replace('hdEmails', 'idEmails'));
		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO
		$('#txProprietario').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');

		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES
		$('.multiplePhonesTelOptions, .addMultiplePhones').remove();
		$('.multipleEmailsTelOptions, .addMultipleEmails').remove();
		$('#btnTrocaCliente').parent().parent().show();

		if ($("#cmbEnviarAtividade").length)
			$('#cmbEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');

		if ($("#inDiasEnviarAtividade").length)
			$('#inDiasEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#noAlert").click(function () {
		objInput.val("");
		$.unblockUI();
		return false;
	});

	return false;
}

//USADO NO CADASTRO DE IMÓVEL E O CLIENTE JÁ EXISTE (CPF)
function jConfirmIncluirProprietarioPeloCpf(objDadosDoProprietario, objInput) {
	$.unblockUI();


	var html = '<div class="bootstrap_for_gaia">';
	html += "<h1>Aviso!</h1>";

	html = "<p><strong>Existe um cliente cadastrado com este CPF:</strong></p>";
	html += "<ul style='text-align: left;padding-left:50px;'>";
	html += "<li>Nome: <span style='font-weight: bold;'>" + objDadosDoProprietario.nome + "</span></li>";
	html += "<li>E-mail: <span style='font-weight: bold;'>" + objDadosDoProprietario.email + "</span></li>";
	html += "<li>CPF: <span style='font-weight: bold;'>" + objDadosDoProprietario.cpf + "</span></li>";
	html += "</ul>";

	html += "<div class='text-right'>";
	html += "<span class='label-action-buttons'>Utilizar dados deste cliente?</span>&nbsp;";
	html += "<p id='noAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p>";
	html += "<p id='okConfirm' class='btn btn-success text-uppercase btnSim'>Sim</p>";
	html += "</div>";

	html += "</div>";


	// APRESENTA A MENSAGEM
	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	$("#okConfirm").click(function () {

		$('#txProprietario').val(objDadosDoProprietario.nome)
		$('#hdIdtxProprietario').val(objDadosDoProprietario.id);
		$("#idCliente").val(objDadosDoProprietario.id);
		$('#txEmail').val(objDadosDoProprietario.email);
		$('#txCpf').val(objDadosDoProprietario.cpf);
		$('#cboClienteMidia').val(objDadosDoProprietario.midia);
		$('#hdTelefones').val(objDadosDoProprietario.evalMultipePhones);

		eval($('#hdTelefones').val().replace('hdTelefones', 'txProprietario'));

		// DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO
		$('#txProprietario').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');

		// REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES
		$('.multiplePhonesTelOptions, .addMultiplePhones').remove();
		$('#btnTrocaCliente').parent().parent().show();

		// DESBLOQUEIA A INTERFACE
		$.unblockUI();
		return false;
	});

	$("#noAlert").click(function () {
		objInput.val("");
		$.unblockUI();
		return false;
	});

	return false;
}
function setLinkinSamePage() {
	$("#content a").click(function (e) {
		if ($(this).attr("href") == "#") {
			e.preventDefault();
		} else if ($(this).attr("class") == "lkExcluir") {
			jConfirmDelete("Deseja realmente excluir esse registro?", $(this));
		} else if ($(this).attr("target") == "_blank") {
			return (true);
		} else if ($(this).attr("class") == "window") {
			$(this).Window();
			//return(false);
		} else if ($(this).attr("rel") == "noaction") {
			//return(false);
		}
		else if ($(this).attr("rel") == "loadbypostaaa") {
			$.post('modules/site/estatisticas/acessos_mes/acessos_mes_grafico.aspx', function (data) {
				$('#estatisticas_conteudo').html(data);
			});
		} else {
			//debugger;

			//$(this).attr("href", "#/" + $(this).attr("href"));
			//return (true);

			newValue = "#/" + $(this).attr("href");
			carc = newValue.substr(newValue, 3);

			/* se for igual #/# indica que estou clicando em uma tab ou que estou utilizando ancoras */
			if (carc != "#/#") {
				$(this).attr("href", newValue);
				return (true);
			} else { return (false); }


			/*if(actualValue != undefined){
			 pos = actualValue.indexOf("#");
			 carc = actualValue.substr(pos, 1);
			 if (carc != "#") {
			 actualValue = actualValue.split("?");
			 file = actualValue[0];
			 parametrow = actualValue[1];
			 newWindow(file, parametrow);
			 }
			}*/
		}

		$(".FotoSlide").slideshow();
		e.preventDefault();
	});

	if ($.browser.msie) {
		$("input[type=text], input[type=password],select, textarea").addClass("fields");
		$("input[type=text], input[type=password],select, textarea").focus(function () {
			$(this).addClass("fieldsFocus");
		});
		$("input[type=text], input[type=password],select, textarea").blur(function () {
			$(this).removeClass("fieldsFocus");
			$(this).addClass("fields");
		});
	}
	$("input:disabled").addClass("disabled");
	$("#Reset").click(function () {
		way = $(this).attr("paginavoltar");
		if (way != "") { newWindow(way, ""); }
		return (false);
	});

	$("input,textarea").keypress(function (e) {
		if (capsLockCheck(e)) {
			jAlert("Por favor, desabilite a tecla <strong>CAPS LOCK</strong> do seu teclado")
			return (false);
		}

		if (backSlashCheck(e)) {
			jAlert("Por favor, utilize <strong>barra</strong> \"<strong>/</strong>\" ao invés da <strong>barra invertida</strong> \"<strong>\\</strong>\".");
			return (false);
		}

		if (e.which == 39) {
			return (false);
		}
	});
}
function atualizaData(dataParam) {

	data = dataParam.split("/");
	//var mesArr = Array("jan", "fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez");
	var semana = data[0]
	var ano = data[1];
	var mes = data[2];
	var dia = data[3];
	var hora = data[4];
	var minuto = data[5];
	var segundos = data[6];

	var formatSem = semana.substr(-3, 1);
	formatSem = formatSem.toUpperCase() + semana.substr(1, 2);
	strData = formatSem + ", " + dia + "/" + mes + "/" + ano + " - " + hora + ":" + showFilled(minuto) + ":" + showFilled(segundos);
	$("#relogio").html(strData);

	segundos = parseInt(segundos);
	minuto = parseInt(minuto);
	//hora = parseInt(hora);
	if (segundos < 59) segundos = parseInt(segundos) + 1;
	else {
		segundos = 0;
		if (minuto < 59) minuto = parseInt(minuto) + 1;
		else {
			minuto = 0;
			hora = parseInt(hora) + 1;
		}
	}
	str = semana + "/" + ano + "/" + mes + "/" + dia + "/" + hora + "/" + minuto + "/" + segundos;
	intervalo2 = setTimeout("atualizaData('" + str + "')", 1000);
}
function showFilled(Value) {
	Value = parseInt(Value);
	return (Value > 9) ? "" + Value : "0" + Value;
}
function getData() {
	clearInterval(intervalo2);
	clearInterval(intervalo1);
	$.ajax({
		url: "relogio.aspx",
		data: "MS=" + data_utc,
		success: function (hour) {
			atualizaData(hour);
		}
	});
	intervalo1 = setInterval("getData()", 100000);
}
function hideFieldSets() {
	for (i = 0; i < arguments.length; i++) {
		$("fieldset > legend:eq(" + arguments[i] + ")").parent().find(" > div").hide();
		$("fieldset > legend:eq(" + arguments[i] + ")").parent().toggleClass("legendoff");
		$("fieldset > legend:eq(" + arguments[i] + ")").click(function () {
			$(this).parent().toggleClass("legendoff");
			if ($(this).parent().attr("class") != "legendoff") {
				$(this).parent().find(" > div").show();
			} else {
				$(this).parent().find(" > div").hide();
			}

		});

	}
}
function cadastraNovo() {
	$("a[@title='Cadastrar_novo']").each(function () {
		rel = $(this).attr("rel").split(",");
		novos = new Array();
		antigo = $("#" + rel[rel.length - 1]);

		for (i = 0; i < rel.length - 1; i++) {
			novos.push($("#" + rel[i]));
			$("#" + rel[i]).parent().hide();
		}
		$(this).click(function () {
			rel = $(this).attr("rel").split(",");
			novos = new Array();
			antigo = $("#" + rel[rel.length - 1]);

			for (i = 0; i < rel.length - 1; i++) {
				novos.push($("#" + rel[i]));
				$("#" + rel[i]).parent().hide();
			}
			if ($(this).attr("class") == "changeField") {
				antigo.prop('disabled', true);
				antigo.val("");
				for (i = 0; i < (rel.length - 1) ; i++) {
					novos[i].parent().fadeIn();
				}
				$(this).find("img").attr("src", "img/bg-subtrair.jpg")
			} else {
				antigo.removeAttr("disabled");
				for (i = 0; i < (rel.length - 1) ; i++) {
					novos[i].val("");
					novos[i].parent().hide();
					$(this).find("img").attr("src", "img/bg-adicionar.jpg")
				}

			}
			$(this).toggleClass("changeFieldOFF");
			return false;
		});
	});
}
function dateDif(strData, nDias) {
	//var dif = Date.UTC(data1.getYear(),data1.getMonth(),data1.getDate(),0,0,0) - dia;
	//return Math.abs((dif / 1000 / 60 / 60 / 24));
	strDs = strData.split("/");
	var dataAtual = new Date(strDs[2], (strDs[1] - 1), strDs[0]);
	var segDia = 86400000; //24 * 60 * 60 * 1000
	var a = dataAtual.getTime();
	var b = a + ((nDias - 1) * segDia);
	var c = new Date(b);
	return (showFilled(c.getDate()) + "/" + showFilled(c.getMonth() + 1) + "/" + showFilled(c.getFullYear()));
}
// HISTORY
function newWindow(page, param, method, direct) {
	pageload(page /*+ ((direct != undefined) ? direct : "")*/, method, param);
	// var mydate = new Date();
	// if (method == undefined) method = "GET";
	// data_utc = Date.UTC(mydate.getYear(), mydate.getMonth(), mydate.getDate(), mydate.getHours(), mydate.getMinutes(), mydate.getSeconds(), mydate.getMilliseconds());

	// if (data_utc < 0) {
	//     data_utc = data_utc * (-1);
	// }

	// if (typeof (param) == "undefined") {
	//     param = "";
	// }

	// if (page.indexOf("?") > 0) {
	//     var arr = page.split("?");
	//     page = arr[0];
	//     if (param == "") {
	//         param = arr[1]
	//     } else {
	//         param = param + "&" + arr[1]
	//     }
	// }

	// if (typeof direct == "undefined" || direct == false) {

	//     if (!page.startsWith("#")) {
	//         page = "#" + page;
	//     }

	//     pageload(page + "?MS=" + data_utc + "&" + param, method);

	// }
	// else {
	//     window.location.hash = page + "?MS=" + data_utc + "&" + param;

	// }

	return false;
}
function obtemPureURL(url) {
	return url.split("?")[0];
}
function obtemArrayParametros(url, params) {
	//debugger;
	var listParam = Array();
	var pathParam = url.split("?")[1];

	if (typeof (pathParam) != "undefined")
		listParam = pathParam.split("&");

	if (params != "" && typeof (params) != "undefined") {
		var aux = params.split("&")
		for (var p in aux)
			listParam.push(aux[p]);
	}

	return listParam;
}
function pageload(hash, method, params) {

	var pathURL = obtemPureURL(hash);
	var parametro = obtemArrayParametros(hash, params);
    //debugger;
    var e = document.getElementsByTagName('html');
    var $injector = angular.element(e).injector();
    var $location = $injector.get('$location');
    var $scope = $scope || angular.element(document).scope();

    $location.$$search = {};
    $location.path("/" + pathURL);
    if(pathURL != 'properties') {
    	$location.search("MS", fnNoCache());
    }

    for (var p in parametro) { $location.search(parametro[p].split("=")[0], parametro[p].split("=")[1]); }

	//$scope.$apply();

if (!$scope.$$phase) { $scope.$apply(); }


$.unblockUI();

	//debugger;
	// hash doesn't contain the first # character.^
	// var vHash = new Array();
	// if  (hash) {
	//     vHash = hash.split("?");
	// }
	// else {
	//     vHash[0] = "inicio.aspx";
	//     vHash[1] = "inicio.aspx";
	// }
	// pagina_atual = vHash[0];



	// $.ajax({
	//     type: (method) ? method : "GET",
	//     beforeSend: function () {
	//         jLoading();
	//     },
	//     error: function (a, b, c) {
	//         switch (a.status) {
	//             default:
	//             case 500: jConfirm("Sua conex&atilde;o com a internet est&aacute; inst&aacute;vel. <br />Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
	//             case 404: jConfirm("A p&aacute;gina que esta requisitando n&atilde;o existe. <br /> Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
	//             case 408: jConfirm("O servidor demorou para responder. <br /> Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
	//         }
	//     },
	//     cache: false,
	//     url: vHash[0],
	//     data: vHash[1],
	//     success: function (msg) {
	//         if (msg.indexOf("<!--pagina500error-->") > -1) {
	//             jConfirm("Sua conex&atilde;o com a internet est&aacute; inst&aacute;vel. <br />Tentar acessar novamente?", vHash[0], vHash[1]);
	//             msg = null;
	//             return (true);
	//         }

	//         if (msg.indexOf("nothing:") > -1) {
	//             msg = null;
	//             $.unblockUI();
	//             return (false);
	//         }

	//         if (msg.indexOf("txLogin") < 0) {
	//             if (msg.indexOf("@[Alerta]:") >= 0) {
	//                 jAlert(msg.substr(msg.indexOf("@[Alerta]:") + 10, msg.length));
	//                 return (false);
	//             } else {
	//                 $.unblockUI();
	//                 $("#content").html(msg);

	//                 //ANGULAR JS
	//                 if(msg.indexOf("<!-- ANGULAR MODE -->") > -1){
	//                     $("#system").removeClass("system").addClass("bootstrap_for_gaia");
	//                     var scope = angular.element(document.getElementById("system")).scope();
	//                     scope.$apply(function() {
	//                         scope.refresh();
	//                     });
	//                 }else{
	//                     $("#system").removeClass("bootstrap_for_gaia").addClass("system");
	//                 }



	//                 setLinkinSamePage();
	//             }
	//         } else {
	//             location.href = "../login.aspx?idImobiliaria=" + $("#hdidImobiliaria").val();
	//         }
	//         msg = null;
	//     }
	/*, error: function (a, b, c) {
	 //debugger;
	 console.debug(a);
	 console.debug(b);
	 console.debug(c);
	}*/
	// });
}
function newWindow2(page, param, method, direct) {
	var mydate = new Date();
	data_utc = Date.UTC(mydate.getYear(), mydate.getMonth(), mydate.getDate(), mydate.getHours(), mydate.getMinutes(), mydate.getSeconds(), mydate.getMilliseconds());
	if (data_utc < 0) {
		data_utc = data_utc * (-1);
	}

	if (typeof (param) == "undefined") {
		param = "";
	}

	if (page.indexOf("?") > 0) {
		var arr = page.split("?");
		page = arr[0];
		if (param == "") {
			param = arr[1]
		} else {
			param = param + "&" + arr[1]
		}
	}

	if (typeof direct == "undefined" || direct == false) {

		if (!page.startsWith("#")) {
			page = "#" + page;
		}

		window.location.hash = page + "?MS=" + data_utc + "&" + param;
	}
	else {
		pageload2(page + "?MS=" + data_utc + "&" + param, method);
	}

	return false;
}
function pageload2(hash, method) {
	// hash doesn't contain the first # character.^
	var vHash = new Array();
	if (hash) {
		vHash = hash.split("?");
	}
	else {
		vHash[0] = "inicio.aspx"; vHash[1] = "inicio.aspx";
	}
	pagina_atual = vHash[0];

	$.ajax({
		type: (method) ? method : "GET",
		beforeSend: function () {
			jLoading();
		},
		error: function (a, b, c) {
			switch (a.status) {
				default:
				case 500: jConfirm("Sua conex&atilde;o com a internet est&aacute; inst&aacute;vel. <br />Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
				case 404: jConfirm("A p&aacute;gina que esta requisitando n&atilde;o existe. <br /> Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
				case 408: jConfirm("O servidor demorou para responder. <br /> Tentar acessar novamente?", vHash[0], vHash[1], "Aviso!"); break;
			}
		},
		cache: false,
		url: vHash[0],
		data: vHash[1],
		success: function (msg) {
			if (msg.indexOf("<!--pagina500error-->") > -1) {
				jConfirm("Sua conex&atilde;o com a internet est&aacute; inst&aacute;vel. <br />Tentar acessar novamente?", vHash[0], vHash[1]);
				msg = null;
				return (true);
			}

			if (msg.indexOf("nothing:") > -1) {
				msg = null;
				$.unblockUI();
				return (false);
			}

			if (msg.indexOf("txLogin") < 0) {
				if (msg.indexOf("@[Alerta]:") >= 0) {
					jAlert(msg.substr(msg.indexOf("@[Alerta]:") + 10, msg.length));
					return (false);
				} else {
					$.unblockUI();
					$("#content").html(msg);
					setLinkinSamePage();
				}
			} else {
				location.href = "../login.aspx?idImobiliaria=" + $("#hdidImobiliaria").val();
			}
			msg = null;
		}
	});
}
function validateBrowser() {

	if ($.browser.msie) {
		if (parseInt($.browser.version) >= 7) {
			return (true);
		}
	} else {
		return (true);
	}
	return (false);
}

function backSlashCheck(ev) {

	var e = ev || window.event;
	codigo_tecla = e.keyCode ? e.keyCode : e.which;

	return codigo_tecla == 92;

}

// VALIDA SE O CAPS LOCK ESTÁ ATIVADO
function capsLockCheck(ev) {
	var e = ev || window.event;
	codigo_tecla = e.keyCode ? e.keyCode : e.which;
	tecla_shift = e.shiftKey ? e.shiftKey : ((codigo_tecla == 16) ? true : false);
	if (((codigo_tecla >= 65 && codigo_tecla <= 90) && !tecla_shift) || ((codigo_tecla >= 97 && codigo_tecla <= 122) && tecla_shift)) {
		if (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPad') != -1 || navigator.userAgent.indexOf('Blackberry') != -1 || navigator.userAgent.indexOf('Android') != -1) {
			return (false);
		}
		else {
			return (true);
		}
	}
	else {

		return (false);
	}
}
function aspasSimples() {
	var e = ev || window.event;
	codigo_tecla = e.keyCode ? e.keyCode : e.which;
	tecla_shift = e.shiftKey ? e.shiftKey : ((codigo_tecla == 16) ? true : false);
}
function serializeAll(val) {
	text = "";
	tempChar = "";

	$(val + ' *').each(function () {
		if ($(this).attr('name') != undefined) {
			text += tempChar + $(this).attr('name') + '=' + $(this).val();
			tempChar = "&";
		}
	});

	return text;
}
function trim(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

/****
 * Verson: 1.01
 * Created: 2009-0930
 * Author: Joe Negron
 * Client: MixTapeMonster.com
 * Abstract: Are you outa'yo HEAD? Sometimes you need to load a js or css script
 *      from somewhere else within a doc other than HEAD. That's cool.. Sh!t Happens..
 *      After the DOM loads you can't modify the HEAD, but you can still modify the DOM.
 *      This allows us to load additional functionality outside of
 * Usage:
 * function addDynamicScript(filename, filetype)
 *      where filename is the explicit url path
 *        and filetype is either "js" for scripts or "css" for stylesheets.
 *
 <code>
 * addDynamicScript("myscript.js", "js");    //dynamically load and add this .js file
 * addDynamicScript("phpscript.php", "js");  //dynamically load "phpscript.php" as a JavaScript file
 * addDynamicScript("mystyle.css", "css");   //dynamically load and add this .css file
 </code>
 *
 *****/
// Dynamically adds Javascript &amp;amp;amp;amp;amp;amp; CSS files from anywhere within the DOM
function addDynamicScript(filename, filetype) {
	// This allows us to load additional functionality outside of HEAD&gt;
	if (filetype == "js") { //if filename is a external JavaScript file
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
		fileref.setAttribute("charset", "iso-8859-1");
	}
	else if (filetype == "css") { //if filename is an external CSS file
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref != "undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref);
}

/**
 PARAMETROS:
 'parametrosSerializados' = string contendo os parametros serializados.
 'htmlBody' = HTML inserido no corpo do documento
 'url' = Optional. Specifies the URL of the page to open. If no URL is specified, a new window with about:blank is opened.
 'name' = Optional. Specifies the target attribute or the name of the window.
 'specs' = Optional. A comma-separated list of items.
 'replace' = Optional.Specifies whether the URL creates a new entry or replaces the current entry in the history list.

 REFERENCIAS EXTERNAS
 http://www.w3schools.com/jsref/met_win_open.asp
 */
 function openWindowWithPost(parametrosSerializados, htmlBody, url, name, specs, replace) {
 	var newWindow = window.open('', name, specs, replace);
 	if (!newWindow) return false;

 	if (htmlBody == null) {
 		htmlBody = '';
 	}

 	var html = "";
 	html += "<html><head></head><body>" + htmlBody + "<form name='formParametersPost' method='post' action='" + url + "'>";

 	var arrParams = parametrosSerializados.split('&');
 	for (var i = 0; i < arrParams.length; i++) {
		//-------------------------------
		// arrKeyValue[0] contem a chave
		// arrKeyValue[1] contem o valor
		//-------------------------------
		var arrKeyValue = arrParams[i].split('=');
		html += "<input type='hidden' name='" + arrKeyValue[0] + "' value='" + arrKeyValue[1] + "'/>";
	}

	html += "</form><script type='text/javascript'>document.formParametersPost.submit();</script></body></html>";
	newWindow.document.write(html);
	return newWindow;
}
function validaDigitosTelefonePorDDD(obj) {
	$(obj).blur(function () {

		var strDDDInformado = $(this).val().substring(1, 3);

		var arDDDsComNonoDigito = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21',
		'21','22', '24', '27', '28',
		'31', '32', '33', '34', '35', '37', '38',
        '41', '42', '43', '44', '45', '46', '47', '48', '49',
        '51','53','54', '55',
		'61', '62', '63', '64', '65', '66', '67', '68', '69',
		'71', '73', '74', '75', '77', '79',
		'81', '82', '83', '84', '85', '86', '87', '88', '89',
		'91', '92', '93', '94', '95', '96', '97', '98', '99'];

		// Verifica se o DDD informado NÃO tem o nono digito liberado e remove.
		if ($.inArray(strDDDInformado, arDDDsComNonoDigito) == -1) $(this).val($(this).val().substring(0, 14));

	});
}
function isDate(txtDate) {
	var currVal = txtDate;
	if (currVal == '')
		return false;

	//Declare Regex
	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
	var dtArray = currVal.match(rxDatePattern); // is format OK?

	if (dtArray == null)
		return false;

	//Checks for dd/mm/yyyy format.
	dtDay = dtArray[1];
	dtMonth = dtArray[3];
	dtYear = dtArray[5];

	if (dtMonth < 1 || dtMonth > 12)
		return false;
	else if (dtDay < 1 || dtDay > 31)
		return false;
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
		return false;
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap))
			return false;
	}
	return true;
}

function jConfirmacaoGenerica(titulo, mensagem, botoes) {
	$.unblockUI
	var html = '<div class="bootstrap_for_gaia">';

	html += "<h1>Mensagem</h1>";

	html += "<div class='text-center'>";
	html += "<span class='label-action-buttons'>" + mensagem + "</span><br /><br />";
	if (botoes !== undefined) {
		for (var i = botoes.length - 1; i >= 0; i--) {
			html += "<a href=\"#\" id=\"" + botoes[i].id + "_confirma\" class=\"btn "+ (botoes[i].id == 'nao' ? 'btn-default' : 'btn-success' ) +" text-uppercase\">" + botoes[i].label + "</a>";
		}
	}

	html += "</div>";

	// html += "<p id='okAlert' class='btn btn-default text-uppercase btnCancelar'>Não</p>";
	// html += "<p id='okAlert' class='btn btn-success text-uppercase btnSim'>Sim</p>";

	$.blockUI({ blockMsgClass: 'DefaultModalBlockUI', message: html, css: { width: '30%', cursor: "auto" } });

	if (botoes !== undefined) {
		for (var i = 0; i < botoes.length; i++) {
			$('#' + botoes[i].id + '_confirma').click(botoes[i].click);
		}
	}

	html += "</div>";


	return false;
}

//   *******************   FUNCÇÕES   *******************   //

///Monta mensagem de falha para apresentação em alert().
var fnMontaMensagemFalha = function (erros, TIPO_APRESENTACAO) {
	var mensagemCliente = "";
	var separador = "";

	if (TIPO_APRESENTACAO == "alert" || typeof (TIPO_APRESENTACAO) == "undefined")
		separador = "\n";
	else
		separador = "<br />";

	for (err in erros) { mensagemCliente += " - " + erros[err].mensagem + separador; }
		return mensagemCliente;
}

var fnStringFormat = function (prm_texto, prm_args) {
	for (var i = 0; i < prm_args.length; i++) {
		var regexp = new RegExp("\\{" + i + "\\}", 'gi');
		prm_texto = prm_texto.replace(regexp, prm_args[i]);
	}
	return prm_texto;
}

var fnSerializeParamForm = function (form) {
	var stringparans = "";

	$(form).find("input, select, textarea").each(function () {
		if ($(this).attr("type") == "checkbox") {
			if ($(this).attr("checked")) {
				stringparans += $(this).attr("name") + "=";
				stringparans += $(this).val() + "&";
			}
		}
		else {
			stringparans += $(this).attr("id") + "=";
			stringparans += $(this).val() + "&";
		}
	});

	return stringparans;
};

var SerializeValoresForm = function (object) {
	realizeDisables = "";
	object.find("input, select, textarea").each(function () {
		if ($(this).attr("type") == "checkbox") {
			if ($(this).attr("checked")) {
				realizeDisables += decodeURIComponent($(this).attr("name")) + "=";
				realizeDisables += decodeURIComponent($(this).val()) + "&";
			}
		}
		else if ($(this).is('option')) {
			realizeDisables += decodeURIComponent($(this).closest('select').attr("id")) + "=";
			realizeDisables += decodeURIComponent($(this).val()) + "&";
		}
		else {
			realizeDisables += decodeURIComponent($(this).attr("id")) + "=";
			realizeDisables += decodeURIComponent($(this).val()) + "&";
		}
	});

	return realizeDisables;
}

var SerializeValoresDisabledForm = function (object) {
	realizeDisables = "";
	object.find("input:disabled, select[rel=noDisabled]:disabled option:selected, select option:selected:disabled, select:disabled option:selected, select option:selected:disabled, textarea:disabled").each(function () {

		if ($(this).attr("type") == "checkbox") {
			if ($(this).attr("checked")) {
				realizeDisables += $(this).attr("name") + "=";
				realizeDisables += $(this).val() + "&";
			}
		}
		else if ($(this).is('option')) {
			realizeDisables += $(this).closest('select').attr("id") + "=";
			realizeDisables += $(this).val() + "&";
		}
		else {
			realizeDisables += $(this).attr("id") + "=";
			realizeDisables += $(this).val() + "&";
		}
	});

	return realizeDisables;
}

var fnNoCache = function () {
	var mydate = new Date();
	var data_utc = Date.UTC(mydate.getYear(), mydate.getMonth(), mydate.getDate(), mydate.getHours(), mydate.getMinutes(), mydate.getSeconds(), mydate.getMilliseconds());

	if (data_utc < 0) { data_utc = data_utc * (-1); }

	return data_utc;
}

var fnMascaraMoeda = function (objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	var k = e.charCode || e.keyCode || e.which;

	if (k == 8) return true;
	if ((k < 48 || k > 57 || k == 116)) return false;

	key = String.fromCharCode(whichCode); // Valor para o código da Chave

	len = objTextBox.value.length;

	for (i = 0; i < len; i++)
		if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal))
			break;

		aux = '';

		for (; i < len; i++)
			if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1)
				aux += objTextBox.value.charAt(i);

			aux += key;
			len = aux.length;

			if (len == 0) objTextBox.value = '';
			if (len == 1) objTextBox.value = '0' + SeparadorDecimal + '0' + aux;
			if (len == 2) objTextBox.value = '0' + SeparadorDecimal + aux;

			if (len > 2) {
				aux2 = '';

				for (j = 0, i = len - 3; i >= 0; i--) {
					if (j == 3) {
						aux2 += SeparadorMilesimo;
						j = 0;
					}

					aux2 += aux.charAt(i);
					j++;
				}

				objTextBox.value = '';
				len2 = aux2.length;

				for (i = len2 - 1; i >= 0; i--)
					objTextBox.value += aux2.charAt(i);

				objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
			}

			if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
			return (true);
			else
				return (false);
		}


///Rotacionar Imagem [imovel] [empreendimento/Midea] [Usuario]
function RotacionarImagem(imgObj, codigo, angulo, typeFoto, retIMG, pathImg, idImovel, imgidx) {
	//debugger;
	$.ajax({
		type: "POST",
		url: "json/rotacionar_imagem.ashx",
		data: { 'idFoto': codigo, 'angulo': angulo, 'retIMG': retIMG, 'typeFoto': typeFoto, 'pathImg': pathImg, 'idImovel': idImovel },
		beforeSend: function () {
			$(imgObj).css('opacity', '0.2');
		},
		success: function (data) {

			if (data.pathImageSmall != '') {
				$('#foto' + imgidx).val(data.pathImageSmall);
				$('#fotoURL' + imgidx).val(data.pathImageSmall);
				$(imgObj).attr('src', data.pathImageSmall);
			}
			if (data.pathImageBig != '') {
				$('#fotoURLBIG' + imgidx).val(data.pathImageBig);
			}

			if (data.FlUrlGoogle != '') {
				$('#FlUrlGoogle' + imgidx).val(data.FlUrlGoogle);
			}

			if (data.Mimetype != '') {
				$('#Mimetype' + imgidx).val(data.Mimetype);
			}

			if (data.UrlKey != '') {
				$('#UrlKey' + imgidx).val(data.UrlKey);
			}

			if (data.UrlQuery != '') {
				$('#UrlQuery' + imgidx).val(data.UrlQuery);
			}

			if (data.UrlServing != '') {
				$('#UrlServing' + imgidx).val(data.UrlServing);
			}




			$(imgObj).css('opacity', '1.0');

		},
		error: function (msg) {
			alert(msg);
		}
	});
}

function fnObtemIdade(nascimento) {
	if (nascimento != undefined) {

		nascimento = nascimento.split("/");
		var hoje = new Date();
		var idade = new Date(nascimento[2], (nascimento[1] - 1), nascimento[0], 0, 0, 0, 0);
		var ajuste = 0;

		/*
		 * se o mês for maior ou igual terá que reduzir um da diferênça do ano
		 * se o dia for maior que o dia atual reduzir um da diferênça do ano
		 */
		 if ((idade.getMonth() + 1) >= (hoje.getMonth() + 1)) {
		 	ajuste = 1;
		 	if (idade.getDate() > hoje.getDate()) ajuste = 1; else ajuste = 0;
		 }

		 return ((hoje.getFullYear() - idade.getFullYear()) - ajuste);
		}
		else
			return 0;
	}

/*
 * description   - Realiza replace de um texto deixando em um formato para apresentação.
 * param @texto  - Texto com as tags para replace. Exemplo: {{tx_name}} é {{fl_ativo}} e têm um total de {{dl_total}}.
 * param @object - Objeto com os dados para o replace. Exemplo: { 'fl_ativo' : true, 'tx_name' : 'Tonhão', 'dl_total' : '2.654' }
 * return        - O texto já no formato final para apresentação
 */
 function AppendFormat(texto, object) {
 	$.each(object, function (index, value) {
 		texto = texto.replace(new RegExp("{{" + index + "}}", "g"), value);
 	});
 	return texto;
 }

 function obtemParamURL(urlTx, key) {
 	var url = "";
 	var items = "";
 	var retObj = "";

 	url = urlTx.split("?");

 	items = (url[1] != undefined) ? url[1].split("&") : [];
 	for (i in items) {
 		keyVal = items[i].split("=");
 		if (keyVal[0] == key) {
 			retObj = keyVal[1];
 			break;
 		}
 	}
 	return retObj;
 }

// Custom Popover
function popoverHint(elem, title, content, placement) {
	var options = {
		template: '<div class="popover popover-hint" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
		title: title,
		placement: (placement) ? placement : 'auto',
		trigger: 'hover',
		html: true,
		content: content
	};
	$(elem).popover(options);
}

// Submit button fixed bottom
$(window).scroll(function () {
	var target = $('#navbar-submit'),
	winHeight = $(window).height(),
	docHeight = $(document).height(),
	scrollHeight = $(document).scrollTop(),
	submitHeight = target.height();

	(scrollHeight + winHeight + (submitHeight * 2)) < docHeight ? target.addClass('navbar-sticky fadeInUpBig animated') : target.removeClass('navbar-sticky fadeInUpBig animated');
});


/**
 * Remove accents function
 * @param  {String} stringwithAccent [string with accents]
 * @return {String}                 [string clean]
 */
 function formatClassCharacters( stringwithAccent ) {
 	var r = stringwithAccent;
 	r = r.replace(new RegExp(/\s/g),"");
 	r = r.replace(new RegExp(/[àáâãäå]/g),"a");
 	r = r.replace(new RegExp(/æ/g),"ae");
 	r = r.replace(new RegExp(/ç/g),"c");
 	r = r.replace(new RegExp(/[èéêë]/g),"e");
 	r = r.replace(new RegExp(/[ìíîï]/g),"i");
 	r = r.replace(new RegExp(/ñ/g),"n");
 	r = r.replace(new RegExp(/[òóôõö]/g),"o");
 	r = r.replace(new RegExp(/œ/g),"oe");
 	r = r.replace(new RegExp(/[ùúûü]/g),"u");
 	r = r.replace(new RegExp(/[ýÿ]/g),"y");
 	r = r.replace(new RegExp(/\W/g),"");
 	return r;
 }

/**
 * Slugfy function
 * @param  {String} stringwithAccent [string with accents]
 * @return {String}                 [string clean]
 */
 var toSlug = function (str) {
 	if (str != null) {
 		str = str.replace(/^\s+|\s+$/g, '');
 		str = str.toLowerCase();
 		str = str.replace(/[á|ã|â|à]/gi, "a");
 		str = str.replace(/[é|ê|è]/gi, "e");
 		str = str.replace(/[í|ì|î]/gi, "i");
 		str = str.replace(/[õ|ò|ó|ô]/gi, "o");
 		str = str.replace(/[ú|ù|û]/gi, "u");
 		str = str.replace(/[ç]/gi, "c");
 		str = str.replace(/[ñ]/gi, "n");
 		str = str.replace(/[á|ã|â]/gi, "a");
 		str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
 	}
 	return str;
 }

//Fix error between jQuery 1.11.x and jQuery UI 1.7
// Sortable fix
jQuery.curCSS = jQuery.css;

// INPUT MASK
$.fn.phoneMask = function() {
	$(this).mask("(99) 9999-9999?9");
};

window.addEventListener("message", receiveMessage, '');

function receiveMessage(event)
{
	if (event.origin == 'http://192.168.99.100:3000' || event.origin == 'http://staging.gaiainc.com.br' || event.origin == 'http://www.gaiainc.com.br')
	{
		var data = event.data;
		if (data.user)
			window.inGaiaChat_API.inviteToChat(data.user, data.property);
	}
}