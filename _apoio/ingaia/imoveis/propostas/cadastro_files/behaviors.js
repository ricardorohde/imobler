// JavaScript Document

function changeType(id) {
    $('#idTipoNumeracao').val(id);

    if (id == 1) $('li.stack a').eq(0).html('N&uacute;mero');
    else if (id == 2) $('li.stack a').eq(0).html('Lote');

    $('ul#navigation li ul li').hide();
}

function abreBoleto(html) {
    w = window.open('', 'myconsole', 'width=' + Math.round($(window).width() / 2) + ',height=' + Math.round($(window).height() * 0.85));
    w.document.write(html);
    w.document.close();
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$(function () {

    var valorAtual = 0;
    var qtdadeAtual = 0;
    var dataAtual = '';
    var forcaVendas;

    function bloqueiaCamposProposta() {
        $('.gotoClienteAlterar').hide();
        $('#cboPretensao').prop('disabled', true);
        $('#txValorUtilizado').prop('disabled', true);
        $('#cboBanco').prop('disabled', true);
        $('#txValorSubsidio').prop('disabled', true);
        $('#txFgts').prop('disabled', true);
        $('select[id^="cboTipoParcela_"]').prop('disabled', true);
        $('select[id^="cboTipoParcelaIntermediaria_"]').prop('disabled', true);
        $('input[id^="txQtdade_"]').prop('disabled', true);
        $('input[id^="txValorParcela_"]').prop('disabled', true);
        $('select[id^="cboFormaPagto_"]').prop('disabled', true);
        $('input[id^="dtDeVencimento_"]').prop('disabled', true);
        $('select[id^="cboDestinatario_"]').prop('disabled', true);
        $('.lnkExcluirParcela').hide();
        $('.lnkDetalhesParcelas').hide();
        $('#btnAddParcela').hide();
        $('#dtExpiracao').prop('disabled', true);
        $('#cboComunicaProprietario').prop('disabled', true);
        $('#cboComunicaCaptador').prop('disabled', true);
        $('select[id ^= "cboCorretor_"]').prop('disabled', true);
        $('.classBtnExcluirCorretorCombo').hide();
        $('#btnAddCorretor').hide();
        $('#txCondicoes').prop('disabled', true);
        $("div[id^='divParcelasDetalhes_']").show();
    }

    function ativaCamposProposta() {
        $('.gotoClienteAlterar').show();
        $('#cboPretensao').removeAttr('disabled');
        $('#txValorUtilizado').removeAttr('disabled');
        $('#cboBanco').removeAttr('disabled');
        $('#txValorSubsidio').removeAttr('disabled');
        $('#txFgts').removeAttr('disabled');
        $('select[id^="cboTipoParcela_"]').removeAttr('disabled');
        $('select[id^="cboTipoParcelaIntermediaria_"]').removeAttr('disabled');
        $('input[id^="txQtdade_"]').removeAttr('disabled');
        $('input[id^="txValorParcela_"]').removeAttr('disabled');
        $('select[id^="cboFormaPagto_"]').removeAttr('disabled');
        $('input[id^="dtDeVencimento_"]').removeAttr('disabled');
        $('select[id^="cboDestinatario_"]').removeAttr('disabled');
        $('.lnkExcluirParcela').show();
        $('.lnkDetalhesParcelas').each(function () {
            if ($(this).parent().parent().find('select[id^="cboTipoParcela_"]').val() == "2") // Mensais
                $(this).show();
        });
        $('#btnAddParcela').show();
        $('#dtExpiracao').removeAttr('disabled');
        $('#cboComunicaProprietario').removeAttr('disabled');
        $('#cboComunicaCaptador').removeAttr('disabled');
        $('select[id ^= "cboCorretor_"]').removeAttr('disabled');
        $('.classBtnExcluirCorretorCombo').show();
        $('#btnAddCorretor').show();
        $('#txCondicoes').removeAttr('disabled');
        $("div[id^='divParcelasDetalhes_']").hide();
    }

    if ($('#hdEtapaProcessoVenda').val() == "1") { // Contraproposta
        bloqueiaCamposProposta();
        $('#btnSubmit').hide();
    }

    if ($('#hdEtapaProcessoVenda').val() >= "3") { // Depois que já foi aprovada
        bloqueiaCamposProposta();
        $('#btnSubmit').hide();
    }

    $('.lnkImprimirBoleto').click(function (e) {

        //e.preventDefault();
        //e.returnValue = false;

        subparcela = false;

        var _tipo_parcela = $(this).closest('.classParcelaFechamento').find("select[id^='cboTipoParcela_']").val();
        var _forma_pagto = $(this).closest('.classParcelaFechamento').find("select[id^='cboFormaPagto_']").val();
        var _destinatario = $(this).closest('.classParcelaFechamento').find("select[id^='cboDestinatario_']").val();
        var _recalc = (_tipo_parcela == '2' && _forma_pagto == '1' && _destinatario == '3') ? '1' : '0';


        if ($(this).parent().parent().attr('id') !== undefined && $(this).parent().parent().attr('id').indexOf("divParcelasDetalhes_") == 0)
            subparcela = true;

        if (subparcela) {
            parcela = $(this).parent().find("input[id^='hdIdParcela_']").val();
            valor = $(this).parent().find("input[id^='txValorParcela_']").val();
            vcto = $(this).parent().find("input[id^='dtDeVencimento_']").val();
            destinatario = $(this).parent().parent().parent().find("select[id^='cboDestinatario_']").val();
        }
        else {
            parcela = $(this).parent().parent().find("input[id^='hdIdParcela_']").val();
            valor = $(this).parent().parent().find("input[id^='txValorParcela_']").val();
            vcto = $(this).parent().parent().find("input[id^='dtDeVencimento_']").val();
            destinatario = $(this).parent().parent().find("select[id^='cboDestinatario_']").val();
        }

        cpf = $("#txCpf_1").val();
        nome = $("#txProprietario_1").val();
        logradouro = $("#hdLogradouro").val();
        bairro = $("#hdBairro").val();
        cidade = $("#hdCidade").val();
        cep = $("#hdCep").val();
        estado = $("#hdUf").val();
        id_proposta = $("#idProposta").val();

        $.ajax({
            type: "POST",
            url: "modules/imoveis_beta/proposta/boleto.ashx",
            data: "valor=" + valor
                + "&vcto=" + vcto
                + "&destinatario=" + destinatario
                + "&cpf=" + cpf
                + "&nome=" + nome
                + "&logradouro=" + logradouro
                + "&bairro=" + bairro
                + "&cidade=" + cidade
                + "&cep=" + cep
                + "&estado=" + estado
                + "&documento=" + id_proposta
                + "&parcela=" + parcela
                + "&recalc=" + _recalc,
            dataType: "json",
            beforeSend: function () {
                jLoading();
            },
            success: function (data, textStatus, jqXHR) {
                abreBoleto(data);
                $.unblockUI();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.unblockUI();
            }
        });
    });

    $('#chkAlterarContraproposta').change(function () {
        if (confirm('Alterar os dados da contraproposta?') == true) {
            $('#chkAlterarContraproposta').prop('disabled', true);
            ativaCamposProposta();
            $('#btnEnviarAnalise').show();
            $('#btnAprovarContraproposta').hide();
        } else {
            $('#chkAlterarContraproposta').prop('checked', false);
        }
    });

    $('#chkSegundoComprador').change(function () {
        if ($(this).prop('checked'))
            $('#divSegundoComprador').show();
        else
            $('#divSegundoComprador').hide();
    }).change();

    if ($('#txProprietario_1').val() != "") { // Alteração
        $('#chkSegundoComprador').prop('disabled', true);
        if ($('#txProprietario_2').val() != "") {
            $('#chkSegundoComprador').prop('checked', true);
            $('#divSegundoComprador').show();
        }
        else {
            $('#chkSegundoComprador').removeAttr('checked');
            $('#divSegundoComprador').hide();
        }
    }

    if ($('#hdForcaVendas').val() == 'true') forcaVendas = true; else forcaVendas = false;

    if (forcaVendas) {
        if ($('#cboBanco').val() == '') // Se não existe nenhum banco definido
            $('#cboBanco').val('2'); // Define CEF como banco padrão Força de Vendas

        if ($('#txValorAvaliacao').val() == "" && ($('#txValorAprovado').val() != "" || $("#hdIdImovelProposta").val() == "0"))
            jAlert('Importante: O valor de avaliação do banco não foi definido para este imóvel');
        else if ($('#txValorAvaliacao').val() != "" && $('#txValorAprovado').val() == "" && $("#hdIdImovelProposta").val() != "0")
            jAlert('Importante: O valor aprovado de financiamento para este cliente não foi definido');
        else if ($('#txValorAvaliacao').val() == "" && $('#txValorAprovado').val() == "" && $("#hdIdImovelProposta").val() != "0")
            jAlert('Importante: O valor de avaliação do banco para este imóvel e o valor aprovado de financiamento para este cliente não foram definidos');

        var p = $('.classAreaParcelas');
        AdicionaEventosElementos(p);

        $('input[id^=txValorParcela_]').maskMoney();
        $('input[id^=dtDeVencimento_]').datepicker();
        $('input[id^=txNumeroParcela]').parent().hide();
        $('div.classParcelaFechamento').each(function () {
            if ($(this).find('select[id^=cboTipoParcela_]').val() != "2") // Mensais
                $(this).find('a.lnkDetalhesParcelas').hide();
        });

        $('div[id^=divParcelasDetalhes_] input[id^=txValorParcela_]').blur(function () {
            TestaConsistenciaParcelas($(this));
        });

        CalculaTotaisParcelas();
    }

    function CarregaFormasPagamento(id_tipo_parcela, linha) {
        $.ajax({
            type: 'POST',
            beforeSend: function () {
                $("#cboFormaPagto_" + linha).empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
            },
            url: "json/jsonFormaPagamentoParcela.ashx",
            data: "id_tipo_parcela=" + id_tipo_parcela,
            success: function (msg) {
                eval('var obj = ' + msg);

                var strOptions = ''
                strOptions += "<option value=''>Selecione</option>"

                for (i in obj) {
                    strOptions += '<option value=\"' + obj[i].id + '\" ' + (('id do corretor atual' == obj[i].id) ? 'selected="selected"' : '') + ' >' + obj[i].texto + '</option>';
                }

                $("#cboFormaPagto_" + linha).empty();
                $("#cboFormaPagto_" + linha).append(strOptions);
                $("#cboFormaPagto_" + linha).prop('disabled', false);
            }
        });
    }

    function TestaConsistenciaParcelas(obj) { CalculaTotaisParcelas(); }

    function PreencheValorProposto() {
        if ($("#hdIdImovelProposta").val() == "0") { // Nova proposta
            if ($('#cboPretensao').val() != "2") {
                $('#txValorProposto').val($('#txValorVenda').val());
            } else {
                $('#txValorProposto').val($('#txValorLocacao').val());
            }
            CalculaTotaisParcelas();
        }
    }

    function PreencheValorAvaliadoBanco() {
        var valor = parseFloat($('#hdValorAprovado').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        $('#txValorAprovado').val(valor.formatMoney(2, ',', '.'));
        CalculaTotaisParcelas();
    }

    function ExistemParcelas(i) {
        if ($('input[id^=txValorParcela_' + i + '_]').length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function CriaParcelasMensais(parcela) {
        var qtdade = $('#txQtdade_' + parcela);
        var valorParcela = $('#txValorParcela_' + parcela);
        var tipo = $('#cboTipoParcela_' + parcela);
        var data = $('#dtDeVencimento_' + parcela);

        if (tipo.val() == "2") { // Mensal

            $('#divParcelasDetalhes_' + parcela).remove();

            var valor = parseFloat(FormataStringValorParaCalcular(valorParcela.val()));
            var qtdade_parcelas = TryParseInt(qtdade.val(), 0);
            var data_vencimento = data.val();
            var m = moment(data_vencimento, "DD/MM/YYYY");
            var valor_parcela;

            if (qtdade_parcelas <= 0 || valor <= 0 || isNaN(qtdade_parcelas) || isNaN(valor))
                valor_parcela = 0;
            else
                valor_parcela = valor;

            var html = "<div id='divParcelasDetalhes_" + parcela + "' style='display: none; margin-left: 20px; margin-bottom: 25px;'>";

            for (var i = 1; i <= TryParseInt($(qtdade).val(), 0) ; i++) {
                if (i > 1) m.add('months', 1);
                html += "<div style='margin-bottom: 4px;'>";
                html += "Valor: <input id='txValorParcela_" + parcela + "_" + i + "' name='txValorParcela_" + parcela + "_" + i + "' type='text' size='15' maxlength='15' value='" + parseFloat(valor_parcela).formatMoney(2, ',', '.') + "' />";
                html += "&nbsp;&nbsp;&nbsp;&nbsp;";
                html += "Data: <input id='dtDeVencimento_" + parcela + "_" + i + "' name='dtDeVencimento_" + parcela + "_" + i + "' type='text' class='datepickerInput' size='14' maxlength='14' value='" + m.format("DD/MM/YYYY") + "' />";
                html += "</div>";
            }

            html += "</div>";

            $('#hdIdParcela_' + parcela).parent().append(html);
            $('#hdIdParcela_' + parcela).parent().find('input[id^=txValorParcela_' + parcela + '_]').blur(function () {
                TestaConsistenciaParcelas($(this));
            });

            $('#divParcelasDetalhes_' + parcela + ' input[id^=txValorParcela_]').maskMoney();
            $('#divParcelasDetalhes_' + parcela + ' input[id^=dtDeVencimento_]').datepicker();
        }
    }

    function SalvaValoresAtuais(i) {
        valorAtual = parseFloat(FormataStringValorParaCalcular($('#txValorParcela_' + i).val()));
        qtdadeAtual = $('#txQtdade_' + i).val();
        dataAtual = $('#dtDeVencimento_' + i).val();
    }

    function CalculaTotaisParcelas() {
        var totalParcelas = 0;

        $('select[id^=cboTipoParcela_]:visible').each(function () {
            var tipo = $(this).val();
            var linha = $(this).attr('id').replace('cboTipoParcela_', '');
            var qtdade = $('#txQtdade_' + linha);
            var valor = $('#txValorParcela_' + linha);
            if ($(valor).val() != '')
                if (tipo == "2") {
                    $(this).parent().parent().find('div[id^=divParcelasDetalhes_] input[id^=txValorParcela_]').each(function () {
                        totalParcelas += parseFloat($(this).val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
                    });
                }
                else {
                    totalParcelas += TryParseInt($(qtdade).val(), 0) * parseFloat($(valor).val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
                }
        });

        var valorImovel = parseFloat($('#txValorProposto').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorAprovado = parseFloat($('#txValorAprovado').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorSubsidio = parseFloat($('#txValorSubsidio').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorFGTS = parseFloat($('#txFgts').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorAvaliacao = parseFloat($('#txValorAvaliacao').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorUtilizado = parseFloat($('#txValorUtilizado').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));

        if (isNaN(valorAprovado)) valorAprovado = 0;
        if (isNaN(valorSubsidio)) valorSubsidio = 0;
        if (isNaN(valorFGTS)) valorFGTS = 0;
        if (isNaN(valorAvaliacao)) valorAvaliacao = 0;
        if (isNaN(valorUtilizado)) valorUtilizado = 0;

        var valorTotalFinanciamento = valorUtilizado + valorSubsidio + valorFGTS;
        if (valorTotalFinanciamento > valorAvaliacao)
            valorTotalFinanciamento = valorAvaliacao;

        var saldoPagar = valorImovel - valorTotalFinanciamento;
        if (saldoPagar < 0) saldoPagar = 0;

        $('#totalSinal').text('R$ ' + totalParcelas.formatMoney(2, ',', '.'));
        $('#totalFinanciamento').text('R$ ' + valorTotalFinanciamento.formatMoney(2, ',', '.'));

        var restante = saldoPagar - totalParcelas;

        if (restante > 0) {
            $('#saldoZero').text('');
            $('#falta').html('R$ ' + restante.formatMoney(2, ',', '.'));
            $('#sobra').text('');
        }
        else if (restante < 0) {
            $('#saldoZero').text('R$ 0,00');
            $('#falta').text('');
            $('#sobra').html('&nbsp;&nbsp;(Sobra R$ ' + (restante * -1).formatMoney(2, ',', '.') + ')');
        }
        else {
            $('#saldoZero').text('R$ 0,00');
            $('#falta').text('');
            $('#sobra').text('');
        }
    }

    var ObtemClienteByIdReferencia = function (object, cliente) {
        var stringRef = trim(object.val());
        var data = "referenciaId=" + stringRef + "&valid=true";

        if (stringRef != "") {
            $.post("json/jsonCliente.ashx", data, function (rspst, status, jdXHR) {

                var strJson = {};
                try { eval("strJson = " + rspst + ";"); } catch (e) { }

                if (strJson.idCliente > 0) {
                    if (ParseBool(strJson.flPermissao)) {
                        //debugger;
                        // POPULA CAMPOS NA TELA
                        $("#hdIdtxProprietario_" + cliente).val(strJson.idCliente);
                        $("#txProprietario_" + cliente).val(strJson.nomeCliente);
                        $("#txEmail_" + cliente).val(strJson.emailCliente);
                        $("#txObservacoes_" + cliente).parent().hide();
                        $("#hdTelefones_" + cliente).val(strJson.evalMultipePhones);
                        $('#hdEmails').val(strJson.evalMultipeEmails);
                        $("#cboClienteMidia_" + cliente).val(strJson.idMidia);
                        $("#txCpf_" + cliente).val(strJson.cpfCliente);
                        $('#cboClienteMidia_' + cliente).prop('disabled', 'disabled');

                        eval($("#hdTelefones_" + cliente).val().replace("hdTelefones", "txProprietario_" + cliente));
                        eval($('#hdEmails').val().replace('hdEmails', 'idEmails'));

                        // DESABILITA O CAMPO NOME DO PROPRIETARIO PARA DIGITACAO.
                        $("#txProprietario_" + cliente).parent().parent().find("input").attr("disabled", true)
                        $("#txProprietario_" + cliente).parent().parent().find("input").attr("class", "disabled");

                        // REMOVE O BOTAO PARA ADICIONAR MAIS TELEFONES.
                        $("#txProprietario_" + cliente).parent().parent().find(".multiplePhonesTelOptions").remove();
                        $("#txProprietario_" + cliente).parent().parent().find(".addMultiplePhones").remove();
                        $("#txProprietario_" + cliente).parent().parent().find(".addMultipleEmails").remove();

                        $("#btnTrocaCliente_" + cliente).parent().parent().show();

                        $("#idDadosAdicionais_" + cliente).hide();
                        $("#idConjuge_" + cliente).hide();
                        $("#idEndereco_" + cliente).hide();
                        $("#idUsuarioAtende_" + cliente).hide();
                    }
                    else {

                        var html = '';
                        html += "<p><strong>Atenção</strong></p>";
                        html += "<p>Existe um cliente cadastrado com essa referência, mas você não tem permissão para visualizá-lo.</p>";
                        html += "<p><a href='#' class='jAlert noAlert'>Fechar</a></p>";

                        $.blockUI({ message: html, css: { background: '#ffff99 url(http://app.valuegaia.com.br/img/alert.jpg) no-repeat 10px center', 'padding-left': '35px', cursor: "auto" } });

                        $(".jAlert.noAlert").click(function (event) {
                            event.preventDefault();
                            $.unblockUI();
                            return (false);
                        });
                    }
                }
                else {
                    alert("Não existe nenhum cliente com a referência " + stringRef);
                }
            });
        }
    }

    $("#txReferenciaCliente_1").blur(function () {
        ObtemClienteByIdReferencia($(this), 1);
    });

    $("#txReferenciaCliente_2").blur(function () {
        ObtemClienteByIdReferencia($(this), 2);
    });

    $('#txCpf').validacpf();

    $('#txValorSubsidio').blur(function () {
        CalculaTotaisParcelas();
    });

    $('#txFgts').blur(function () { CalculaTotaisParcelas() });

    $('#txValorUtilizado').blur(function () {
        var valorAprovado = parseFloat($('#txValorAprovado').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorUtilizado = parseFloat($('#txValorUtilizado').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));
        var valorAvaliacao = parseFloat($('#txValorAvaliacao').val().replace('R$ ', '').replace('.', '').replace('.', '').replace(',', '.'));

        if (valorUtilizado > valorAvaliacao || (isNaN(valorAvaliacao) && valorUtilizado > 0)) {
            alert("O valor utilizado para financiamento não pode ser maior que o valor da avaliação");
            $('#txValorUtilizado').val('');
            $('#txValorUtilizado').focus();
        }
        else if (valorUtilizado > valorAprovado || (isNaN(valorAprovado) && valorUtilizado > 0)) {
            alert("O valor utilizado para financiamento não pode ser maior que o valor aprovado");
            $('#txValorUtilizado').val('');
            $('#txValorUtilizado').focus();
        }

        CalculaTotaisParcelas();

    });

    if ($('#hdCadastroCpf').val() == "true") {
        $('#txCpf_1').validInput({
            message: "",
            url: "modules/ValidaCpfInteressado.aspx?responseJson=true",
            link: ((window.location.href.indexOf('valuegaia.com.br') != -1) ? '/admin/modules/clientes/cliente-cadastro.aspx' : 'modules/clientes/cliente-cadastro.aspx'),
            data: "&id=",
            nChars: 1,
            cssClass: "fieldsErro",
            tipo: 2
        });

        $('#txCpf_2').validInput({
            message: "",
            url: "modules/ValidaCpfInteressado.aspx?responseJson=true",
            link: ((window.location.href.indexOf('valuegaia.com.br') != -1) ? '/admin/modules/clientes/cliente-cadastro.aspx' : 'modules/clientes/cliente-cadastro.aspx'),
            data: "&id=",
            nChars: 1,
            cssClass: "fieldsErro",
            tipo: 2
        });
    }

    var texto = $.trim($('input[id=numero]').parent().text());
    var html = $('input[id=numero]').parent().html();
    if (html != null) {
        var dropdownlabel = '<ul id="navigation"><li><a href="#">N&uacute;mero</a><ul><li><a href="#" onclick="javascript:changeType(1);">N&uacute;mero</a></li><li><a href="#" onclick="javascript:changeType(2);">Lote</a></li></ul></li></ul>';
        html = html.replace(texto, dropdownlabel);
        $('input[id=numero]').parent().html(html);

        $("#navigation").navPlugin({
            'itemWidth': 65,
            'itemHeight': 14,
            'navEffect': "slide",
            'speed': 100
        });

        changeType($('#idTipoNumeracao').val());
        $('input[id=numero]').parent('label').css('width', '55px');
    }

    eval($("#hdTelefones_1").val());
    eval($("#hdTelefones_2").val());

    eval($("#hdEmails").val());
    eval($("#hdEmailsProprietario").val());
    var alterar = $("#hdIdImovelProposta").val() > "0";

    eval($("#idEmails2_btnAdd").remove());
    eval($("input[name*='idEmails2_email']").prop('disabled', true));



    function addValidInput(field, redirect) {
        objValida = {
            message: "Ja existe um cliente com o telefone XXX cadastrado. \n Deseja ir ao cadastro dele?",
            url: "modules/ValidaTelefoneInteressado.aspx",
            link: ((window.location.href.indexOf('valuegaia.com.br') != -1) ? '/admin/modules/clientes/cliente-cadastro.aspx' : 'modules/clientes/cliente-cadastro.aspx'),
            data: "acao=alterar&id=",
            nChars: 14,
            cssClass: "fieldsErro",
            redirect: redirect,
            identify: $("#hdIdtxProprietario")
        }
        field.validInput(objValida);
    }

    $("#cboEstadoCivil_1").change(function () {
        if ($(this).val() == "2" || $(this).val() == "7")
            $("#idConjuge_1").show();
        else
            $("#idConjuge_1").hide();
    }).change();

    $("#cboEstadoCivil_2").change(function () {
        if ($(this).val() == "2" || $(this).val() == "7")
            $("#idConjuge_2").show();
        else
            $("#idConjuge_2").hide();
    }).change();


    ///////////////
    var handlerFieldsetNegociacao = function (show) {
        if (show) $("#fieldsetNegociacao").show();
        else $("#fieldsetNegociacao").hide();
    }

    var handlerEtapasNegociacao = function (isSale) {
        $("input[name=chkEtapaNegociacao]").each(
            function () {
                ParseBool($(this).attr("rel")) === isSale ?
                    $(this).parent().show() :
                    $(this).prop("checked", false).parent().hide();
            });
    }

    var handlerFinalidadePrazo = function (value) {
        if (value == 2) {
            $("#dtPrazoFim").parent().show();
            $("#cboFinalidade").parent().show();
        } else {
            $("#dtPrazoFim").parent().hide();
            $("#cboFinalidade").parent().hide();
        }
    }

    $("#cboPretensao").change(function () {
        var value = parseInt($(this).val());
        var iSale = value == 1 ? true : false;

        handlerFinalidadePrazo(value);
        handlerEtapasNegociacao(iSale);

        if (forcaVendas) PreencheValorProposto();
    }).change();

    var handlerChangeNameOption = function (element, who, text) {
        if (element == null)
            return;

        $(element).find("option[value=" + who + "]").text(text);
    }

    var handlerStatusImovel = function (value) {

        if (value == 4 || value == 6 || value == 5) $("#cboStatusImovel").parent().hide();
        else $("#cboStatusImovel").parent().show();

        $("#cboStatusImovel").find("option[value=1]").hide();
        $("#cboStatusImovel").find("option[value=2]").hide();
        $("#cboStatusImovel").find("option[value=3]").hide();
        $("#cboStatusImovel").find("option[value=7]").hide();
        $("#cboStatusImovel").find("option[value=8]").hide();

        if (value == 2) {
            $("#cboStatusImovel").find("option[value=1]").prop("selected", true).show();
            $("#cboStatusImovel").find("option[value=2]").show();
            $("#cboStatusImovel").find("option[value=7]").show();

            handlerChangeNameOption($("#cboStatusImovel"), 1, "Permanecer com o status atual (Ativo)");
        }

        if (value == 3) {
            $("#cboStatusImovel").find("option[value=1]").prop("selected", true).show();
            $("#cboStatusImovel").find("option[value=2]").show();
            $("#cboStatusImovel").find("option[value=7]").show();

            handlerChangeNameOption($("#cboStatusImovel"), 1, "Permanecer com o status atual (Ativo)");
        }

        if (value == "1") {
            $("#cboStatusImovel").find("option[value=1]").prop("selected", true).show();
            $("#cboStatusImovel").find("option[value=3]").show();
            $("#cboStatusImovel").find("option[value=8]").show();

            handlerChangeNameOption($("#cboStatusImovel"), 1, "Manter ativo e iniciar negociação");
        }
    }

    var handlerStatusNegociacao = function (value) {

        if (value == 1) { $("#cboStatusNegociacao").parent().hide(); }
        else { $("#cboStatusNegociacao").parent().show(); }

        $("#cboStatusNegociacao").find("option[value=1]").hide();
        $("#cboStatusNegociacao").find("option[value=3]").hide();
        $("#cboStatusNegociacao").find("option[value=7]").hide();
        $("#cboStatusNegociacao").find("option[value=8]").hide();

        if (value == 2 || value == 3 || value == 4) {
            $("#cboStatusNegociacao").find("option[value=1]").prop("selected", true).show();
            $("#cboStatusNegociacao").find("option[value=7]").show();
            handlerChangeNameOption($("#cboStatusNegociacao"), 1, "Permanecer com o status atual (Ativo)");
        }

        if (value == 5) {
            $("#cboStatusNegociacao").find("option[value=3]").prop("selected", true).show();
            $("#cboStatusNegociacao").find("option[value=8]").show();
        }
    }

    $("#cboStatusProposta").change(function () {
        handlerStatusImovel(parseInt($(this).val()));

        $("#cboStatusImovel").change();
    }).change();

    $("#cboStatusImovel").change(function () {
        var statusImovel = parseInt($(this).val());
        var statusProposta = parseInt($("#cboStatusProposta").val());

        if (statusImovel == 1 && statusProposta == 1) handlerFieldsetNegociacao(true);
        else handlerFieldsetNegociacao(false);
    }).change();

    $("#cboTerminarNegociacao").change(function () {
        handlerStatusNegociacao(parseInt($(this).val()))
    }).change();

    if ($("#hdStatusAtualDaProposta").val() == "6") {
        $("#cboStatusProposta, #cboStatusImovel").prop('disabled', true);
    }



    $('#fieldFollowNegociacao').datagrid2({
        id: '.gridFollowNegociacao',
        source: 'json/negotiation/negotiationHistory.ashx',
        obj: $('#gridFollowNegociacao'),
        label: ['negociação', 'negociações'],
        bOcultarExibirColunas: true,
        resize: false,
        sortBy: "a.dt_cadastro",
        order: "desc",
        scrollOnFilter: false,
        auto: true,
        title: false,
        config: { height: "100%" },
        actions: [],
        actionsWidth: "20px",
        sortByExcel: $('#hdTxSortBy'),
        orderExcel: $('#hdTxOrdemBy'),

        menubar: [{
            label: "Exportar para Excel",
            description: "Salve a busca atual em planilha de Excel",
            id: "btnExportExcel",
            classe: "btnExcel",
            action: function () {

                if ($("#divDataGridform1").text() != "Nenhum registro foi encontrado") { location.href = "modules/Excel/Excel.aspx?tipo=negociacao&" + $("#form1").serialize(); }
                else { alert("Nenhum registro para gerar o arquivo"); }

                return (false);
            }
        }],

        //menubar: [],
        headers: [
            { id: "a.dt_cadastro", label: "Data", width: "90px", height: "auto", enabled: true, enableReadOnly: false },
            { id: "b.tx_nome", label: "Usuário", width: "200px", height: "auto", enabled: true, enableReadOnly: false },
            { id: "a.tx_descricao", label: "Observação", width: "900px", height: "auto", enabled: true, enableReadOnly: false }
        ]
    });



    /////////////////////////////////

    var addClienteAdicional = function () {
        var _url = "modules/clientes/cliente-cadastro-proposta.aspx";

        $.fancybox({
            //type: "iframe",
            width: "80%",
            height: "80%",
            transitionIn: 'none',
            modal: false,
            href: _url
        });
    };

    $("#btnAddClienteAdicional").click(function () {
        addClienteAdicional();
        return (false);
    });


    $("#txProprietario_1").suggest({
        url: "json/sugests/cliente-proposta.aspx"
        , withPhone: true
        , fields: [$("#txReferenciaCliente_1"), $("#txEmail_1"), $("#txCpf_1"), $("#cboClienteMidia_1"), $("#hdValorAprovado"), $("#idEmails"), $("#hdTelefones_1")]
        , lengthIni: 3
        , objNumber: 1
        , onChoose: function (resultado) {

            permissao = resultado[9].replace("id_permissao_dados=", "var id_permissao_dados = ");
            var x = $("#idEmails").val().replace("#idEmails", "#hdEmails");

            eval(permissao);

            $('#txProprietario_1').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');
            $("#txProprietario_1").parent().parent().find(".SugBoxClass").hide();
            //$('.SugBoxClass').hide();
            $("#txProprietario_1").parent().parent().find(".multiplePhonesTelOptions").remove();
            $("#txProprietario_1").parent().parent().find(".addMultiplePhones").remove();
            $("#txProprietario_1").parent().parent().find(".addMultipleEmails").remove();
            //$('.multiplePhonesTelOptions, .addMultiplePhones').remove();
            $('#btnTrocaCliente_1').parent().parent().show();
            //ESCONDE CAMPOS DO CLIENTE INTERESSADO.
            $("#idDadosAdicionais_1, #idConjuge_1, #idEndereco_1, #idUsuarioAtende_1, .class_textarea_obs").hide();


            if (id_permissao_dados > 0) $('#btnAlteraCliente_1').parent().show(); else $('#btnAlteraCliente_1').parent().hide();
            if (forcaVendas) PreencheValorAvaliadoBanco();
        }
    });

    $("#txProprietario_2").suggest({
        url: "json/sugests/cliente-proposta.aspx"
        , withPhone: true
        , fields: [$("#txReferenciaCliente_2"), $("#txEmail_2"), $("#txCpf_2"), $("#cboClienteMidia_2"), $("#hdValorAprovado"), $("#hdTelefones_2")]
        , lengthIni: 3
        , objNumber: 2
        , onChoose: function (resultado) {
            permissao = resultado[8].replace("id_permissao_dados=", "var id_permissao_dados = ");
            eval(permissao);

            $('#txProprietario_2').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');
            $("#txProprietario_2").parent().parent().find(".SugBoxClass").hide();

            $("#txProprietario_2").parent().parent().find(".multiplePhonesTelOptions").remove();
            $("#txProprietario_2").parent().parent().find(".addMultiplePhones").remove();
            $("#txProprietario_2").parent().parent().find(".addMultipleEmails").remove();

            $('#btnTrocaCliente_2').parent().parent().show();
            //ESCONDE CAMPOS DO CLIENTE INTERESSADO.
            $("#idDadosAdicionais_2, #idConjuge_2, #idEndereco_2, .class_textarea_obs").hide();

            if (id_permissao_dados > 0) $('#btnAlteraCliente_2').parent().show(); else $('#btnAlteraCliente_2').parent().hide();

        }
    });


    if ($("#hdIdtxProprietario_1").val() <= "0") {
        $("#btnAlteraCliente_1").parent().parent().hide();
    } else {
        $("#btnTrocaCliente_1").parent().hide();
    }

    if ($("#hdIdtxProprietario_2").val() <= "0") {
        $("#btnAlteraCliente_2").parent().parent().hide();
    } else {
        $("#btnTrocaCliente_2").parent().hide();
    }

    $("#btnTrocaCliente_1").click(function () {
        $('#txValorAprovado_1').val('');
        $('#txValorUtilizado_1').val('');
        if (forcaVendas) CalculaTotaisParcelas();
        $("#txProprietario_1").parent().parent().find("input, select").val("");
        $("#txObservacoes_1").val("");
        $("#idDadosAdicionais_1").find("input, select").val("");
        $("#idConjuge_1").find("input, select").val("");
        $("#idEndereco_1").find("input, select").val("");
        $("#txProprietario_1").parent().parent().find("input, select, textarea").removeAttr("disabled").removeAttr("readonly").removeAttr("class");
        $("#cboCorretorResponsavel_1").removeAttr("disabled").removeAttr("readonly").removeAttr("class");
        $("#txProprietario_1").parent().parent().find("label[rel=MultipleSpansPhones]").remove();

        $('label[rel=idEmails_emailId]').remove();
        $('.addMultipleEmails').remove();

        $(this).parent().parent().hide();
        $("#hdTelefones_1 #idCliente_1 #hdIdtxProprietario_1").val("");
        $("#txProprietario_1").parent().parent().find(".addMultiplePhones").remove();

        $("#txProprietario_1").multipePhones({
            action: function (field, redirect) {
                field.validInput({
                    url: 'modules/ValidaTelefoneInteressado.aspx?tipoValidacao=cadastroProposta',
                    objNumber: 1
                });
            },
            redirect: false
        });

        $('#idEmails').multipeEmails({
            action: function (field, redirect) {
                field.validInput({
                    url: 'modules/ValidaEmailInteressado.aspx?tipoValidacao=cadastroProposta'
                });
            },
            redirect: false
        });

        //apresenta os campos
        $(".class_textarea_obs, #idDadosAdicionais_1, #idConjuge_1, #idEndereco_1, #idUsuarioAtende_1").show();

        $("#cboClienteMidia_1 option").eq(0).prop("selected", true);
        $("#cboEstadoCivil_1 option").eq(0).prop("selected", true);
        $("#cboFaixaRenda_1 option").eq(0).prop("selected", true);
        $("#cboNivelCultural_1 option").eq(0).prop("selected", true);
        $("#cboSexo_1 option").eq(0).prop("selected", true);
    });

    $("#btnAlteraCliente_1").click(function () {
        if (confirm("Todos os dados alterados dessa proposta não serão salvos.\nDeseja realmente ir para o cadastro desse cliente?"))
            newWindow("modules/clientes/cliente-cadastro.aspx?acao=alterar&id=" + $("#hdIdtxProprietario_1").val(), "");
    });

    $("#btnTrocaCliente_2").click(function () {
        $('#txValorAprovado_2').val('');
        $('#txValorUtilizado_2').val('');
        //debugger;
        $("#txProprietario_2").parent().parent().find("input, select").val("");
        $("#txObservacoes_2").val("");
        $("#idDadosAdicionais_2").find("input, select").val("");
        $("#idConjuge_2").find("input, select").val("");
        $("#idEndereco_2").find("input, select").val("");
        $("#txProprietario_2").parent().parent().find("input, select, textarea").removeAttr("disabled").removeAttr("readonly").removeAttr("class");
        $("#cboCorretorResponsavel_2").removeAttr("disabled").removeAttr("readonly").removeAttr("class");
        $("#txProprietario_2").parent().parent().find("label[rel=MultipleSpansPhones]").remove();

        $('label[rel=MultipleSpansEmails]').remove();
        $('.addMultipleEmails').remove();

        $(this).parent().parent().hide();
        $("#hdTelefones_2 #idCliente_2 #hdIdtxProprietario_2").val("");
        $("#txProprietario_2").parent().parent().find(".addMultiplePhones").remove();

        $("#txProprietario_2").multipePhones({
            action: function (field, redirect) {
                field.validInput({
                    url: 'modules/ValidaTelefoneInteressado.aspx?tipoValidacao=cadastroProposta',
                    objNumber: 2
                });
            },
            redirect: false
        });

        $('#idEmails').multipeEmails({
            action: function (field, redirect) {
                field.validInput({
                    url: 'modules/ValidaEmailInteressado.aspx?tipoValidacao=cadastroProposta'
                });
            },
            redirect: false
        });

        //apresenta os campos
        $(".class_textarea_obs, #idDadosAdicionais_2, #idConjuge_2, #idEndereco_2").show();
    });

    $("#btnAlteraCliente_2").click(function () {
        if (confirm("Todos os dados alterados dessa proposta não serão salvos.\nDeseja realmente ir para o cadastro desse cliente?"))
            newWindow("modules/clientes/cliente-cadastro.aspx?acao=alterar&id=" + $("#hdIdtxProprietario_2").val(), "");
    });

    /*SCRIPT PARA O CAMPO TEXTAREA OBSERVAÇÕES*/

    $("#txObservacoes").focus(function () {
        $(this).removeClass("textarea_label_blur");
        $(this).addClass("textarea_label_focus");
    });

    $("#txObservacoes").blur(function () {
        $(this).removeClass("textarea_label_focus");
        $(this).addClass("textarea_label_blur");
    });


    /*********************************----------ÁREA CORRETOR RESPONSÁVEL-------------************************************************/

    var iTotalCorretor = parseInt($("#hdTotalCorretor").val());

    $("#btnAddCorretor").click(
        function () {
            adicionaCorretor($(this));
        });

    if (iTotalCorretor <= 0) {
        //$("#btnAddCorretor").trigger("click");
        angular.element("#btnAddCorretor").triggerHandler('click');
        if (forcaVendas)
            $('#cboCorretor_0').val($('#hdUsuarioAtual').val());
    }

    function RemoverUsuarioFechamento(obj) {
        valor = parseInt(obj.parent().find("input[name=cboCorretorAtual]").val());

        if (valor > 0) {
            obj.parent().find("input[name=hdCorretorAcao]").val(0);
            obj.parent().hide();
        } else {
            obj.parent().remove();

            //DECREMENTA UM DO CONTADOR.
            iTotalCorretor--;

            //ATUALIZA CAMPO ESCONDIDO.
            $("#hdTotalCorretor").val(iTotalCorretor);
        }
    }

    function adicionaCorretor(obj) {
        var cloneCorretor = $($(".classResponsavel").clone()[0]);

        cloneCorretor.find("select, input").each(function () {
            $(this).attr("id", $(this).attr("id").replace("_default", "_" + iTotalCorretor));
            $(this).attr("name", $(this).attr("name").replace("_name", ""));
        });

        $(cloneCorretor).find("a[class=classBtnExcluirCorretorCombo]").click(function () {
            RemoverUsuarioFechamento($(this));
            return (false);
        });

        //ADICIONA NA TELA.
        $(obj).parent().before(cloneCorretor.removeAttr("style"));

        //ACRESCENTA MAIS UM AO CONTADOR.
        iTotalCorretor++;

        //ATUALIZA CAMPO ESCONDIDO.
        $("#hdTotalCorretor").val(iTotalCorretor);
    }

    if (alterar) {
        $(".classResponsavel").find("a[class=classBtnExcluirCorretorCombo]").each(function () {
            $(this).bind("click", function () {
                RemoverUsuarioFechamento($(this));
                return (false);
            });
        });
    }

    /**stefz**/

    var iTotalParcela = $(".classParcelaFechamento").length - 1;
    var totalParcelas = parseInt($("#hdCountParcela").val());
    var iNumeroParcelaShow = iTotalParcela;
    var idImovelProposta = TryParseInt($("#idProposta").val(), 0);
    var alterar = (idImovelProposta > 0) ? true : false;

    $("#btnAddParcela").click(function () {
        //verifica qual caminho seguir
        //id fechamento maior que zero alteração
        if (idImovelProposta > 0 || idImovelProposta == 0) AdicionarParcela();

    });

    function CopiaParcela() {
        AdicionarParcela();
        parcelas = ObtemArrayInfoParcela();

        tab_title = "Parcela " + parcelas[parcelas.length - 1].hdNumeroParcela_;
        $tabCreate.tabs("add", "#parcela-" + (parcelas[parcelas.length - 1].hdNumeroParcela_), tab_title);
        $tabCreate.tabs("option", "selected", indexCreate);

        $("#divRateioFechamento").show();
    }

    function AdicionarParcela() {
        var fullDate = new Date();
        var twoDigitMonth = (fullDate.getMonth() + 1) + ""; if (twoDigitMonth.length == 1) twoDigitMonth = "0" + twoDigitMonth;
        var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
        var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

        iTotalParcela++;
        iNumeroParcelaShow++;
        qtdadeAtual = 1;
        valorAtual = 0;
        dataAtual = currentDate;
        $("#hdQtdeParcelas").val(iTotalParcela);

        var clone = $($(".classParcelaFechamento").clone()[0]);

        clone.removeAttr("style");
        $(clone).find("input,select").each(function () {
            $(this).attr("id", $(this).attr("id") + "_" + iTotalParcela);
            $(this).attr("name", $(this).attr("name").replace("_default", "_" + iTotalParcela));
        });

        $(".btnAddParcela").before(clone);

        //NÚMERO DA PARCELA
        $("#txNumeroParcela_" + iTotalParcela).val(iNumeroParcelaShow);
        $("#hdNumeroParcela_" + iTotalParcela).val(iTotalParcela);

        //ADICIONA MASCARA
        $("#dtDeVencimento_" + iTotalParcela).datepicker();
        $("#dtDePagamento_" + iTotalParcela).datepicker();
        $("#txValorParcela_" + iTotalParcela).maskMoney();
        $("#txValorPorcentagemParcela_" + iTotalParcela).maskNumber();

        $(clone).find("input[id^=txValorParcela_]").focus().select();

        AdicionaEventosElementos(clone);
    }

    function AdicionaEventosElementos(objeto) {
        //ADICIONA EVENTO PARA ELEMENTOS
        $(objeto).find("a[class=lnkExcluirParcela]").click(function () {
            RemoverParcela($(this));
            return (false);
        });

        $(objeto).find("select[id^=cboTipoParcela_]").change(function () {
            var linha = $(this).attr('id').replace('cboTipoParcela_', '');
            var qtdade = $('#txQtdade_' + linha);
            var valor = $('#txValorParcela_' + linha);
            var intermediaria = $('#cboTipoParcelaIntermediaria_' + linha);

            if ($(this).val() == "2") {
                qtdade.removeAttr('readonly').removeAttr('disabled').removeClass('disabled');
                intermediaria.prop('readonly', true).prop('disabled', true).addClass('disabled').val('0');
                $(objeto).find('a.lnkDetalhesParcelas').show();
                qtdade.focus().select();
            }
            else if ($(this).val() == "3") {
                qtdade.prop('readonly', true).prop('disabled', true).addClass('disabled').val('1');
                intermediaria.removeAttr('readonly').removeAttr('disabled').removeClass('disabled');
                $(objeto).find('a.lnkDetalhesParcelas').hide();
                intermediaria.focus();
            }
            else {
                qtdade.prop('readonly', true).prop('disabled', true).addClass('disabled').val('1');
                intermediaria.prop('readonly', true).prop('disabled', true).addClass('disabled').val('0');
                $(objeto).find('a.lnkDetalhesParcelas').hide();
                valor.focus().select();
            }
            CalculaTotaisParcelas();

            CarregaFormasPagamento($(this).val(), linha);
        });

        $(objeto).find("input[id^=txValorParcela_],input[id^=txQtdade_],input[id^=dtDeVencimento_]").focus(function () {
            var linha;
            if ($(this).attr('id').indexOf('txValorParcela_') >= 0) linha = $(this).attr('id').replace('txValorParcela_', '');
            if ($(this).attr('id').indexOf('txQtdade_') >= 0) linha = $(this).attr('id').replace('txQtdade_', '');
            if ($(this).attr('id').indexOf('dtDeVencimento_') >= 0) linha = $(this).attr('id').replace('dtDeVencimento_', '');
            SalvaValoresAtuais(linha);
        });

        $(objeto).find("input[id^=txValorParcela_],input[id^=txQtdade_]").blur(function () {
            var linha;
            if ($(this).attr('id').indexOf('txValorParcela_') >= 0) linha = $(this).attr('id').replace('txValorParcela_', '');
            if ($(this).attr('id').indexOf('txQtdade_') >= 0) linha = $(this).attr('id').replace('txQtdade_', '');
            GerenciaModificacaoParcelas(linha);
        });

        $(objeto).find("input[id^=dtDeVencimento_]").change(function () {
            var linha = $(this).attr('id').replace('dtDeVencimento_', '');
            GerenciaModificacaoParcelas(linha);
        });

        $(objeto).find("a[class=lnkDetalhesParcelas]").click(function () {
            var parcelas = ($(this).parent().next('div[id^=divParcelasDetalhes_]'));
            if (parcelas.length == 0) {
                alert('As parcelas ainda não foram geradas');
                return false;
            }

            if (parcelas.is(":visible")) {
                parcelas.hide();
                $(this).text("Mostrar parcelas");
            }
            else {
                parcelas.show();
                $(this).text("Ocultar parcelas");
            }
            return false;
        });
    }

    function GerenciaModificacaoParcelas(linha) {
        var valor;
        if ($('#txValorParcela_' + linha).val() == "")
            valor = 0;
        else
            valor = parseFloat(FormataStringValorParaCalcular($('#txValorParcela_' + linha).val()));

        if (isNaN(valorAtual))
            valorAtual = 0;

        var parcelamentoModificado = false;
        var dataModificada = false;

        if (FormataStringValorParaCalcular($('#txValorParcela_' + linha).val()) != valorAtual
                    || $('#txQtdade_' + linha).val() != qtdadeAtual)
            parcelamentoModificado = true;
        else if ($('#dtDeVencimento_' + linha).val() != dataAtual)
            dataModificada = true;

        if (parcelamentoModificado || dataModificada)
            if (ExistemParcelas(linha) && valorAtual != 0) {
                var mensagem = "";
                if (dataModificada) mensagem = "A data de vencimento foi modificada. Deseja recriar as parcelas?";
                else mensagem = "O parcelamento foi modificado. Deseja recriar as parcelas?";

                if ($('#cboTipoParcela_' + linha).val() == "2")
                    if (confirm(mensagem)) {
                        $('#txQtdade_' + linha).focus();
                        var mostrando_parcelas = $('input#hdIdParcela_' + linha).parent().find('div#divParcelasDetalhes_' + linha).is(":visible");
                        CriaParcelasMensais(linha);
                        if (mostrando_parcelas) $('input#hdIdParcela_' + linha).parent().find('a.lnkDetalhesParcelas').click();
                        CalculaTotaisParcelas();
                    }
                    else {
                        $('#txValorParcela_' + linha).unmaskMoney();
                        $('#txValorParcela_' + linha).val(valorAtual.formatMoney(2, ',', '.'));
                        $('#txQtdade_' + linha).val(qtdadeAtual);
                        $('#dtDeVencimento_' + linha).val(dataAtual);
                        $('#txQtdade_' + linha).focus();
                        $('#txValorParcela_' + linha).maskMoney();
                        return false;
                    }
            } else {
                var mostrando_parcelas = $('input#hdIdParcela_' + linha).parent().find('div#divParcelasDetalhes_' + linha).is(":visible");
                CriaParcelasMensais(linha);
                if (mostrando_parcelas) $('input#hdIdParcela_' + linha).parent().find('a.lnkDetalhesParcelas').click();
                CalculaTotaisParcelas();
            }
    }

    /// <SUMMARY>
    /// OBTEM INFORMAÇÕES DAS PARCELAS ATIVAS
    /// </SUMMARY>
    function ObtemArrayInfoParcela() {
        parcelas = new Array();
        $(".classAreaParcelasRateio").find(".classParcelaFechamento").each(function () {
            if ($(this).find("input[id^=hdAcaoParcela_]").length > 0 && parseInt($(this).find("input[id^=hdAcaoParcela_]").val()) != 0) {
                obj = {
                    "hdNumeroParcela_": $(this).find("input[id^=hdNumeroParcela_]").val()
                    , "hdIdParcela_": $(this).find("input[id^=hdIdParcela_]").val()
                };
                parcelas.push(obj);
            }
        });

        return parcelas;
    }

    function RemoverParcela(prm_objeto) {
        //CRIA VARIÁVEIS TUNADAS
        var iPercorre = 0;
        var blControle = false;
        var elementoPai = prm_objeto.closest(".classParcelaFechamento");
        var inNumeroParcela = parseInt(elementoPai.find("input[id^=hdNumeroParcela_]").val());

        if (confirm("Deseja excluir essa parcela?")) {
            //REMOVE LOGICAMENTE O ITEM.
            elementoPai.hide();
            elementoPai.find("input[id^=hdAcaoParcela_]").val("0");
            $("#divRateioFechamento").tabs("hideTab", inNumeroParcela, "parcela-{0}");

            $("#id_rateio_" + inNumeroParcela).find("tr[class^=class_index_linha_]").each(function () {
                $(this).find("input[name^=hdAcao_]").val("0");
            });

            info = ObtemArrayInfoParcela();
            //CASO NÃO TENHA PARCELA OCULTA OS MODELOS.
            if (info.length <= 0) {
                $(".classAreaModelos").hide();
                $(".classAreaRateio").hide();
                $("#divRateioFechamento").hide();
            }
            CalculaTotaisParcelas();
        }
    }

    $('#btnEnviarAnalise').click(function () {
        $('#hdNaoRedirecionar').val('true');
        $('#hdContinuarProcesso').val('true');
        $('#hdSolicitarAprovacao').val('true');
        $('#form1').submit();

        if ($('#errorsFound').val() != 'true') {
            var _url = 'modules/financiamento/processos_financiamento/encaminhar-processo.aspx?id=' + $('#idProposta').val() + '&p=' + $('#perfilContinuar').val() + '&e=' + $('#especialidadeContinuar').val() + '&d=1';

            $.fancybox({
                width: '55%'
                , height: 300
                , showNavArrows: false
                , transitionIn: 'none'
                , modal: false
                , href: _url
                , onCleanup: function () { }
                , onClosed: function () {
                    $('#hdSolicitarAprovacao').val('false');
                    if ($('#hdEncaminhouProcesso').val() == 'false')
                        newWindow('modules/imoveis_beta/proposta/propostas.aspx', '');
                    $('#hdEncaminhouProcesso').val('false');
                }
            });
        }
        $('#errorsFound').val('false');
        $('#hdNaoRedirecionar').val('false');
        $('#hdContinuarProcesso').val('false');

        return false;
    });

    $('#btnContinuarProcesso').click(function () {
        $('#hdNaoRedirecionar').val('true');
        $('#hdContinuarProcesso').val('true');

        $('#form1').submit();

        if ($('#errorsFound').val() != 'true') {
            if ($('#perfilContinuar').val() == 0) {
                var params = "id_processo=" + idImovelProposta + "&acao=1";

                $.ajax({
                    type: "POST",
                    url: "modules/financiamento/processos_financiamento/continuar_processo.ashx",
                    data: params,
                    dataType: "json",
                    beforeSend: function () {
                        jLoading();
                    },
                    success: function (data, textStatus, jqXHR) {
                        iTotal = data.configuracao.length;
                        if (iTotal > 0) {
                            strMensagem = "";
                            blSuccess = data.configuracao[0].success;

                            for (i = 0; i < iTotal; i++)
                                strMensagem += data.configuracao[i].str_mensagem + "<br />";

                            if (blSuccess) {
                                $.blockUI();
                                jOk(strMensagem);
                                $("#okAlert").click(function () {
                                    $.unblockUI();
                                    if ($('#origem').val() == '2') {
                                        window.onbeforeunload = null;
                                        window.location.href = '#modules/financiamento/processos_financiamento/processos_financiamento.aspx';
                                        window.location.reload();
                                    }
                                });
                            }

                            else {
                                jAlert(strMensagem);
                            }

                        } else {
                            jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.unblockUI();
                        jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
                    }
                });
            }
            else {
                var _url = 'modules/financiamento/processos_financiamento/encaminhar-processo.aspx?id=' + idImovelProposta + '&p=' + $('#perfilContinuar').val() + '&e=' + $('#especialidadeContinuar').val() + '&d=1';

                $.fancybox({
                    width: '55%'
                    , height: 300
                    , showNavArrows: false
                    , transitionIn: 'none'
                    , modal: false
                    , href: _url
                    , onCleanup: function () { }
                    , onClosed: function () {
                        if ($('#hdEncaminhouProcesso').val() == 'false')
                            newWindow('modules/imoveis_beta/proposta/propostas.aspx', '');
                        $('#hdEncaminhouProcesso').val('false');
                    }
                });
            }
        }
        $('#errorsFound').val('false');
        $('#hdNaoRedirecionar').val('false');
        $('#hdContinuarProcesso').val('false');
        return false;
    });

    $('#btnRetrocederProcesso').click(function () {
        $('#hdNaoRedirecionar').val('true');
        $('#hdRetrocederProcesso').val('true');

        $('#form1').submit();

        if ($('#errorsFound').val() != 'true') {
            if ($('#perfilContinuar').val() == 0) {
                var params = "id_processo=" + idImovelProposta + "&acao=2";

                $.ajax({
                    type: "POST",
                    url: "modules/financiamento/processos_financiamento/continuar_processo.ashx",
                    data: params,
                    dataType: "json",
                    beforeSend: function () {
                        jLoading();
                    },
                    success: function (data, textStatus, jqXHR) {
                        iTotal = data.configuracao.length;
                        if (iTotal > 0) {
                            strMensagem = "";
                            blSuccess = data.configuracao[0].success;

                            for (i = 0; i < iTotal; i++)
                                strMensagem += data.configuracao[i].str_mensagem + "<br />";

                            if (blSuccess) {
                                $.blockUI();
                                jOk(strMensagem);
                                $("#okAlert").click(function () {
                                    $.unblockUI();
                                    if ($('#origem').val() == '2') {
                                        window.onbeforeunload = null;
                                        window.location.href = '#modules/financiamento/processos_financiamento/processos_financiamento.aspx';
                                        window.location.reload();
                                    }
                                });
                            }

                            else {
                                jAlert(strMensagem);
                            }

                        } else {
                            jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $.unblockUI();
                        jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
                    }
                });
            }
            else {
                var _url = 'modules/financiamento/processos_financiamento/encaminhar-processo.aspx?id=' + idImovelProposta + '&p=' + $('#perfilContinuar').val() + '&e=' + $('#especialidadeContinuar').val() + '&d=1';

                $.fancybox({
                    width: '55%'
                    , height: 300
                    , showNavArrows: false
                    , transitionIn: 'none'
                    , modal: false
                    , href: _url
                    , onCleanup: function () { }
                    , onClosed: function () {
                        if ($('#hdEncaminhouProcesso').val() == 'false')
                            newWindow('modules/imoveis_beta/proposta/propostas.aspx', '');
                        $('#hdEncaminhouProcesso').val('false');
                    }
                });
            }
        }
        $('#errorsFound').val('false');
        $('#hdNaoRedirecionar').val('false');
        $('#hdRetrocederProcesso').val('true');
        return false;
    });

    $('#btnAprovarContraproposta').click(function () {
        $('#hdNaoRedirecionar').val('true');
        $('#hdContinuarProcesso').val('true');

        var params = "id_processo=" + idImovelProposta + "&acao=4";

        $.ajax({
            type: "POST",
            url: "modules/financiamento/processos_financiamento/continuar_processo.ashx",
            data: params,
            dataType: "json",
            beforeSend: function () {
                jLoading();
            },
            success: function (data, textStatus, jqXHR) {
                iTotal = data.configuracao.length;
                if (iTotal > 0) {
                    strMensagem = "";
                    blSuccess = data.configuracao[0].success;

                    for (i = 0; i < iTotal; i++)
                        strMensagem += data.configuracao[i].str_mensagem + "<br />";

                    if (blSuccess) {
                        $.blockUI();
                        jOk(strMensagem);
                        $("#okAlert").click(function () {
                            $.unblockUI();
                            if ($('#origem').val() == '2') {
                                window.onbeforeunload = null;
                                window.location.href = '#modules/financiamento/processos_financiamento/processos_financiamento.aspx';
                                window.location.reload();
                            }
                        });
                    }

                    else {
                        jAlert(strMensagem);
                    }

                } else {
                    jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.unblockUI();
                jAlert('Falha ao enviar os dados para o servidor. Tente mais tarde.');
            }
        });
        $('#hdNaoRedirecionar').val('false');
        $('#hdContinuarProcesso').val('false');
        return false;
    });

}); // ready
