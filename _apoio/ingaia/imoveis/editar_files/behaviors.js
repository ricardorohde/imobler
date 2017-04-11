var tipoImovel = 0;
var isVertical = false;
var objCamposObrigatorios = null;
var b_exibe_cancelamento_tipo_imovel = true;
//var b_alterando_tipo_do_imovel = false;
var b_permissao_finalidade;

function validaCamposObrigatoriosFinalidadeTipo() {
    $.ajax({
        type: 'POST'
            , url: 'json/jsonValidaCamposObrigatoriosFinalidadeTipo.ashx'
            , data: 'idFinalidade=' + $('#cboFinalidade').val() + '&idTipo=' + $('#cboTipo').val()
            , dataType: 'json'
            , success: function (json) {

                if (objCamposObrigatorios == null)
                    setaCamposObrigatorios(json);
                else
                    atualizaCamposObrigatorios(json);

                objCamposObrigatorios = json;
            }
            , error: function () {
                alert('Falha ao carregar os dados!');
            }
    });
}

// JavaScript Document
function changeType(id) {
    $('#idTipoNumeracao').val(id);
    if (id == 1)
        $('li.stack a').eq(0).html('N&uacute;mero');
    else if (id == 2)
        $('li.stack a').eq(0).html('Lote');
    $('ul#navigation li ul li').hide();
}

$(function () {

    $('input.prettyCheckable').prettyCheckable();

    if ($('#hdIdStatus').val() != '1' && $('#hdIdStatus').val() != '5' && $('#hdIdStatus').val() != '9') {
        $('#cmbEnviar').val('0');
        $('#cmbEnviar').prop('disabled', true);
    }

    if ($('#txProprietario').val() != "" && $('#txCpf').val() == "")
        $('#txCpf').parent().hide();

    if ($('input[id=numero]').length > 0) {
        var texto = $.trim($('input[id=numero]').parent().text());
        var html = $('input[id=numero]').parent().html();
        var dropdownlabel = '<ul id="navigation"><li><a href="#">N&uacute;mero</a><ul><li><a href="#" onclick="javascript:changeType(1);">N&uacute;mero</a></li><li><a href="#" onclick="javascript:changeType(2);">Lote</a></li></ul></li></ul>';
        html = html.replace(texto, dropdownlabel);
        $('input[id=numero]').parent().html(html);
    }

    //funcionalidade de escolher número/lote
    $('#navigation').navPlugin({
        'itemWidth': 75,
        'itemHeight': 20,
        'navEffect': 'slide',
        'speed': 100
    });

    changeType($('#idTipoNumeracao').val());

    //$('input[id=numero]').parent('label').css('width', '55px');

    //variáveis globais
    IdentityImovel = TryParseInt($('#idImovel').val(), 0);
    IsAlteracao = TryParseInt($('#hdIsAlteracao').val(), 0);

    IdentityCondominio = TryParseInt($('#hdIdCondominioAlt').val(), 0);
    IdentityEdificio = TryParseInt($('#hdIdEdificioAlt').val(), 0);
    IdentityConjuntoChave = TryParseInt($("#cboConjuntoChave").val(), 0);

    if (IdentityImovel == 0) {
        $("#cboFinalidade").change();
    }

    if ($('#hdCadastroCpf').val() == 'true') {
        $('#txCpf').validacpf();
        $('#txCpf').validInput({
            url: 'modules/ValidaCpfProprietario.aspx?responseJson=true'
        });
    }

    GerenciaCamposDadosPrimarios();

    //assim que carrega a combo de metragem tem que fazer o cálculo
    /*
    if ($('#cboMetragem').val() == 2)
        $('#Area').val($('#txAreaTotal').val().replace(',', '.') / 24200);
    else if ($('#cboMetragem').val() == 3)
        $('#Area').val($('#txAreaTotal').val().replace(',', '.') / 10000);
    else if ($('#cboMetragem').val() == 4)
        $('#Area').val($('#txAreaTotal').val().replace(',', '.') / 48400);
    else if ($('#cboMetragem').val() == 5)
        $('#Area').val($('#txAreaTotal').val().replace(',', '.') / 48400);
    */

    $("#txProprietario").suggest({
        url: "json/sugests/proprietarios.aspx"
        , withPhone: true
        , fields: [$("#txEmail"), $("#txCpf"), $("#cboClienteMidia"), $("#hdValorAprovado"), $("#hdEmails"), $("#hdTelefones")]
        , lengthIni: 3
        , onChoose: function (resultado) {

            //permissao = resultado[7].replace("id_permissao_dados=", "var id_permissao_dados = ");
            //eval(permissao);

            $('#txProprietario').parent().parent().find('input,select').prop('disabled', true).prop('readonly', true).attr('class', 'disabled');
            $('.SugBoxClass').hide();
            $('.multiplePhonesTelOptions, .addMultiplePhones').remove();
            $('#btnTrocaCliente').parent().parent().show();
            $('#idEmails_btnAdd').hide()
            //if (id_permissao_dados > 0) $('#btnAlteraCliente').parent().show(); else $('#btnAlteraCliente').parent().hide();

            $('#cmbEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');
            $('#inDiasEnviarAtividade').prop('disabled', false).prop('readonly', false).attr('class', 'disabled');


            if ($('#txCpf').val() == "")
                $('#txCpf').parent().hide();

            if ($.browser.msie) {
                $(".select2-container").css("display", "none");
                $(".select2-container").css("display", "block");
            }
        }
    });

    $("#txProprietario").validInputSystemRules({
        ajax: {
            usar: true,
            url: "json/jsonGerenciaRegrasSistema.ashx",
            data: "regra=permissaoCadastroCliente",
            format: "json"
        }
        , executa: function (mensagem) {
            $("#txProprietario").closest("label").before(
                "<div class=\"boxAlertaInFieldSet\">" + mensagem + "</div>"
            );
        }
        , bindEvent: "click"
        , inMaxRequest: 1
    });
    //debugger;
    eval($('#hdTelefones').val());

    eval($('#hdEmails').val());


    function adicionarItem(select, val, tex, cla) {
        $('#' + select).append("<option value=' " + val + " ' class=' " + cla + "'>" + tex + "</option>");
    }

    function moverItem(de, para) {
        $('#' + de).find(':selected').each(function () {
            adicionarItem(para, $(this).val(), $(this).text(), $(this).attr('class'));
            $(this).remove();
        });
    }

    $('#add').click(function () { moverItem('lstPortais', 'lstPortaisT'); });

    $('#remove').click(function () { moverItem('lstPortaisT', 'lstPortais'); });

    // VENDA E LOCAÇÃO
    fnVendaLocacao();

    $("#numero, #complemento").validInput_v2({
        url: 'modules/valida-endereco-imovel.ashx',
        nChars: 1,
        param: [{ key: 'numero', field: $('#numero') }
              , { key: 'idLogradouro', field: $('#idLogradouro') }
              , { key: 'complemento', field: $('#complemento') }
              , { key: 'id', field: $('#idImovel') }
              , { key: 'idEdificio', field: $('#txEdificio') }
              , { key: 'idCondominio', field: $('#hdCodCondominioNovo') }
              , { key: 'p_duplica', field: $('#hdAtividadeDuplicar') }
              , { key: 'txEdificio', field: "parseInt($('#txEdificio').val()) > 0 || parseInt($('#txEdificio').val()) < 0 ? $('#txEdificio').find('option').filter(':selected').text().trim() : ''", value_eval: true }
              , { key: 'idImovelStatus', field: "parseInt($('#idImovel').val()) > 0 ? $('#hdIdStatus').val() : $('#cboStatus').val()", value_eval: true }
              , { key: 'idEmpreendimentoStatus', field: $('#cboCondominioStatus') }
              , { key: 'flVenda', field: $('#chkPretVenda'), check: true }
              , { key: 'flLocacao', field: $('#chkPretLocacao'), check: true }
        ],
        callbackSuccess: function (rspst) {
            if (!jQuery.isEmptyObject(rspst)) {

                var bl_imovel_imobiliaria = ParseBool(rspst[0].fl_imovel_imobiliaria);
                var bl_apresenta_lista = ParseBool(rspst[0].fl_apresenta_lista);
                var fl_exibe_link = ParseBool(rspst[0].fl_exibe_link);
                var id_empreendimento_status_retorno = parseInt(rspst[0].id_empreendimento_status);
                var id_empreendimento_status = parseInt($('#cboCondominioStatus').val());

                if (bl_imovel_imobiliaria) {
                    jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>.<br />' +
                                           'Referência do imóvel <a href=\"#/properties?reference={{tx_referencia}}&scope=AGENCY\">{{tx_referencia}}</a>.', { tx_endereco: rspst[0].tx_endereco, tx_referencia: rspst[0].tx_referencia }));
                }
                else if (!bl_imovel_imobiliaria && !bl_apresenta_lista) {
                    if (fl_exibe_link) {

                        //Cadastrando/Alterando: Terceiro - Imóvel já existente: Terceiro
                        if (id_empreendimento_status == 1 && id_empreendimento_status_retorno == 1) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                              '<strong>(imovel <a href=\"#/properties?reference={{tx_referencia}}-{{tx_sigla}}&scope={{id_rede}}\">{{tx_referencia}}-{{tx_sigla}}</a>)</strong>.', rspst[0]));
                        }
                            //Cadastrando/Alterando: Construtora - Imóvel já existente: Terceiro
                        else if (!(id_empreendimento_status == 1) && id_empreendimento_status_retorno == 1) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                               '<strong>(imovel <a href=\"#/properties?reference={{tx_referencia}}-{{tx_sigla}}&scope={{id_rede}}\">{{tx_referencia}}-{{tx_sigla}}</a>)</strong>.', rspst[0]));
                        }
                            //Cadastrando/Alterando: Terceiro - Imóvel já existente: Construtora
                        else if (id_empreendimento_status == 1 && !(id_empreendimento_status_retorno == 1)) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, como <strong>imóvel de construtora</strong> para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                                '<strong>(imovel <a href=\"#/properties?reference={{tx_referencia}}-{{tx_sigla}}&scope={{id_rede}}\">{{tx_referencia}}-{{tx_sigla}}</a>)</strong>.', rspst[0]));
                        }
                            //Se não cair em nenhum dos casos, apresentar mensagem antiga
                        else {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado neste endereço na' +
                                                ' <strong>{{tx_endereco}}</strong>,' +
                                                ' <strong>{{tx_condominio}}</strong>' +
                                                ' <strong>{{tx_torre}}</strong> para a Imobiliária <strong>{{tx_nome_imobiliaria}}</strong>.' +
                                                ' Referência do imóvel' +
                                                ' <a href=\"#/properties?reference={{tx_referencia}}-{{tx_sigla}}&scope={{id_rede}}\">{{tx_referencia}}-{{tx_sigla}}</a>', rspst[0]));
                        }
                    } else {

                        //Cadastrando/Alterando: Terceiro - Imóvel já existente: Terceiro
                        if (id_empreendimento_status == 1 && id_empreendimento_status_retorno == 1) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                              '<strong>(imovel {{tx_referencia}}-{{tx_sigla}})</strong>.', rspst[0]));
                        }
                            //Cadastrando/Alterando: Construtora - Imóvel já existente: Terceiro
                        else if (!(id_empreendimento_status == 1) && id_empreendimento_status_retorno == 1) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                               '<strong>(imovel {{tx_referencia}}-{{tx_sigla}})</strong>.', rspst[0]));
                        }
                            //Cadastrando/Alterando: Terceiro - Imóvel já existente: Construtora
                        else if (id_empreendimento_status == 1 && !(id_empreendimento_status_retorno == 1)) {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado no endereço <strong>{{tx_endereco}}</strong>, como <strong>imóvel de construtora</strong> para a imobiliária <strong>{{tx_nome_imobiliaria}}</strong> ' +
                                                '<strong>(imovel {{tx_referencia}}-{{tx_sigla}})</strong>.', rspst[0]));
                        }
                            //Se não cair em nenhum dos casos, apresentar mensagem antiga
                        else {
                            jAlert(AppendFormat('Já existe um imóvel cadastrado neste endereço na' +
                                                ' <strong>{{tx_endereco}}</strong>,' +
                                                ' <strong>{{tx_condominio}}</strong>' +
                                                ' <strong>{{tx_torre}}</strong> para a Imobiliária <strong>{{tx_nome_imobiliaria}}</strong>.' +
                                                ' Referência do imóvel {{tx_referencia}}-{{tx_sigla}}', rspst[0]));
                        }
                    }
                }
                else if (!bl_imovel_imobiliaria && bl_apresenta_lista) {
                    var mensagem = '';

                    for (i in rspst) {

                        var item = {
                            tx_tipo: rspst[i].tx_tipo,
                            tx_endereco: rspst[i].tx_endereco,
                            tx_condominio: ((rspst[i].tx_condominio != '') ? rspst[i].tx_condominio + ',' : ''),
                            tx_torre: ((rspst[i].tx_torre != '') ? 'Torre/Bloco: ' + rspst[i].tx_torre + ',' : ''),
                            tx_referencia_sigla: rspst[i].tx_referencia + '-' + rspst[i].tx_sigla,
                            tx_nome_imobiliaria: rspst[i].tx_nome_imobiliaria
                        };

                        if (fl_exibe_link) {
                            mensagem += AppendFormat('{{tx_tipo}}, {{tx_endereco}}, {{tx_condominio}} {{tx_torre}}' +
                                                     ' Ref. <a href=\"#/properties?reference={{tx_referencia_sigla}}\">{{tx_referencia_sigla}}</a>' +
                                                     ' - {{tx_nome_imobiliaria}}. <br />', item);
                        } else {
                            mensagem += AppendFormat('{{tx_tipo}}, {{tx_endereco}}, {{tx_condominio}} {{tx_torre}}' +
                                                     ' Ref. {{tx_referencia_sigla}}' +
                                                     ' - {{tx_nome_imobiliaria}}. <br />', item);
                        }
                    }

                    mensagem += '<p><a href="#" id="btncontinueCadastro">É outro, continuar cadastro</a>' +
                                '   <a href="#" id="btncancelCadastro">É um desses, abandonar</a></p>';

                    jAlert_v2("O imóvel que está sendo cadastrado é algum destes?", mensagem,
                        function () {
                            $("#hdValidaEndereco").val("true");
                        },
                        function () {
                            newWindow("#properties");
                        });
                }
            }
        },
        callbackError: function (rspst) { alert('Falha ao validar endereço do imóvel.'); }
    });
    $('#txPrefeitura').validInput_v2({
        url: 'modules/valida-iptu-imovel.ashx',
        nChars: 1,
        param: [{ key: 'tx_prefeitura', field: $('#txPrefeitura') }, { key: 'id_imovel', field: $('#idImovel') }],
        callbackSuccess: function (rspst) {
            if (!jQuery.isEmptyObject(rspst)) {
                jAlert(AppendFormat('{{tx_informacao}}', rspst));
            }
        },
        callbackError: function (rspst) { alert('Falha ao validar código iptu.'); }
    });

    $('#chkPretVenda, #chkPretLocacao').bind('click', fnVendaLocacao);

    //STATUS DO IMÓVEL
    $('#cboStatus').change(function () {
        if ($(this).val() != '') {
            $('#cmbEnviar').val('0');
            if ($(this).val() == '1' || $(this).val() == '5' || $(this).val() == '9')
                $('#cmbEnviar').removeAttr('disabled');
            else
                $('#cmbEnviar').prop('disabled', true);
        }
    }).change();

    //AVALIAÇÃO DO BANCO
    if ($('#cboBanco').val() == '0') {
        $('#txValorAvaliacaoBanco').parent().hide();
        $('#dtAvaliacaoBanco').parent().hide();
    }

    $('#cboBanco').change(function () {
        if ($(this).val() != '0') {
            $('#txValorAvaliacaoBanco').parent().show();
            $('#dtAvaliacaoBanco').parent().show();
        }
        else {
            $('#txValorAvaliacaoBanco').val('').parent().hide();
            $('#dtAvaliacaoBanco').val('').parent().hide();
        }
    });

    // METRAGENS
    $("#cboMetragem").change(function () {
        Metragens();
    }).change();

    //OCUPAÇÃO
    //campos "ocupado até" e "ocupador" só aparecem quando combo ocupacao vale "ocupado"
    $('#cboOcupacao').change(function () {
        //ocupado
        if ($('#cboOcupacao').val() == '2') {
            $('#txOcupadoAte,#cboOcupador').parent().fadeIn();
            $('#txOcupadoAte').parent().find('.italicTitle').text('Ocupado');
        } else if ($('#cboOcupacao').val() == '3') {
            $('#txOcupadoAte').parent().fadeIn();
            $('#cboOcupador').parent().hide();
            $('#txOcupadoAte').parent().find('.italicTitle').text('Reservado');
        } else {
            $('#txOcupadoAte,#cboOcupador').parent().hide();
        }
    }).change();

    // AUTORIZADO PARA NEGOCIAÇÃO //
    $('#cboExclusividade').parent().hide();
    $('#cboAutVenda').change(function () {
        if ($(this).val() == 'false') {
            $('#cboExclusividade').parent().hide();
            $('#cboExclusividade').val('false');
            fnExclusividade($(this).val());
        } else {
            $('#cboExclusividade').parent().fadeIn();
        }
    }).change();

    if (!$('#hdIdtxProprietario').val() || $('#hdIdtxProprietario').val() == '0') {
        $('#btnTrocaCliente').parent().parent().hide();

        if ($.browser.msie) {
            $(".select2-container").css("display", "none");
            $(".select2-container").css("display", "block");
        }
    }

    $('#btnTrocaCliente').click(function () {
        //debugger;
        $('#txProprietario').parent().parent().find('input,select').val('');
        $('#txProprietario').parent().parent().find('input,select').removeAttr('disabled').removeAttr('readonly').removeAttr('class');
        $('label[rel=MultipleSpansPhones]').remove();
        $('label[rel=MultipleSpansEmails]').remove();
        $(this).parent().parent().hide();
        $('#hdTelefones #idCliente #hdIdtxProprietario').val('');
        $('.addMultiplePhones').remove();
        $('.addMultipleEmails').remove();
        $('#txProprietario').multipePhones({
            action: function (field, redirect) {
                field.validInput({
                    url: 'modules/ValidaTelefoneProprietario.aspx?responseJson=true'
                });
            },
            redirect: false
        });

        $('#hdEmails').val(" $('#idEmails').multipeEmails({types: [{      name: 'Email', id: 1, mask: '', classe: 'EmailItemResidencial'}],action: function (field, redirect) {field.validInput({ url: 'modules/ValidaEmailInteressado.aspx?tipoValidacao=cadastroAlteracaoImovel' }) },redirect: false});");

        eval($('#hdEmails').val());
        $("#txCpf").parent().show();
        $("#txProprietario").focus();

        if ($.browser.msie) {
            $(".select2-container").css("display", "none");
            $(".select2-container").css("display", "block");
        }
    });

    $('#btnAlteraCliente').click(function () {
        //debugger;
        var param = 'acao=alterar&id=' + $('#hdIdtxProprietario').val() + '&idImovel=' + $('#idImovel').val();

        jConfirm(
            'Todos os dados alterados desse imóvel não serão salvos.\nDeseja realmente ir para o cadastro desse cliente?',
            ((window.location.href.indexOf('valuegaia.com.br') != -1) ? '/admin/modules/clientes/cliente-cadastro.aspx' : 'modules/clientes/cliente-cadastro.aspx'),
            param,
            "Aviso!"
            );
    });

    //EXCLUSIVIDADE
    //exclusividade - exibe ou não campos referentes a exclusividade
    $('#cboExclusividade').change(function () {
        fnExclusividade($(this).val());
    }).change();

    //exclusividade - preenche campo data final do contrato
    $('#txExclusividadeInicio,#txExclusividadeValidade').blur(function () {
        tempoExclusividade();
    });
    $('#txExclusividadeValidade').keyup(function () {
        tempoExclusividade();
    });

    //SCRIPT IMOVEL (WESLEY)
    $('#txAreaUtil, #txAreaTotal, #txValorVenda, #txValorLocacao').bind('blur', calculaVenda);
    $('#txValorLocacao, #txValorCondominio, #txValorIptu').bind('keyup', calculaPacoteLocacao);

    $('#in_garagens, #in_garagens_descobertas').bind('keyup', ControlaVagasGaragem);

    $('#cboPagamentosCondicoesIptu').change(calculaPacoteLocacao);

    //PLACAS E FAIXAS
    $('#cboPlaca').change(function () {
        if ($(this).val() == 'true') {
            $('#cboTipoPlaca').parent().fadeIn();
            $('#cboClassificacao').parent().fadeIn();
            $('#dtPedidoColocacao').parent().fadeIn();
            $('#dtColocacao').parent().fadeIn();
            $('#dtPedidoRetirada').parent().fadeIn();
            $('#dtRetirada').parent().fadeIn();
        } else {
            $('#cboTipoPlaca').parent().hide();
            $('#cboClassificacao').parent().hide();
            $('#dtPedidoColocacao').parent().hide();
            $('#dtColocacao').parent().hide();
            $('#dtPedidoRetirada').parent().hide();
            $('#dtRetirada').parent().hide();
        }
    }).change();


    $('#cboSite').change(function () {
        if ($('#cboSite').val() == 'true') {
            $('#cmbEnviar').parent().fadeIn();
            $('#cboAnunciaRede').parent().fadeIn();
            $('#lstPortais').fadeIn();
            $('#cboRede').parent().fadeIn();
            $('#cboValorImovelSite').parent().fadeIn();
            $('#txTituloSite').parent().find('.italicTitle').text('Título');
        }
        else {
            $('#cmbEnviar').parent().fadeOut();
            $('#cboAnunciaRede').parent().fadeOut();
            $('#cboAnunciaRede').val($('#cboSite').val());
            $('#lstPortais').fadeOut();
            $('#cboRede').parent().fadeOut();
            $('#cboRede').val('false');
            $('#cboValorImovelSite').parent().fadeOut();
            $('#txTituloSite').parent().find('.italicTitle').text('Título');
        }
    }).change();

    $("#cmbEnviarAtividade").change(function () {
        if ($(this).val() == "null") {
            $("#inDiasEnviarAtividade").parent().show();
            if ($("#inDiasEnviarAtividade").val() < 1) {
                $("#inDiasEnviarAtividade").val(15);
            }
        }
        else {
            $("#inDiasEnviarAtividade").parent().hide();
            $("#inDiasEnviarAtividade").val($(this).val());
        }
    }).change();

    $('#cboMidiaImpressa').change(function () {
        if ($(this).val() == 'true') {
            $('#lstMidiaImpressa').fadeIn();
        } else {
            $('#lstMidiaImpressa').fadeOut();
        }
    }).change();

    calculaVenda();

    $('#cepCidade').change(function () {

        blBloqueado = ($("#hdBloquearCampos").val() == "1");

        $.ajax({
            url: 'json/pontodereferencia/metros.ashx',
            type: 'POST',
            data: 'idCidade=' + $(this).val() + '&idImovel=' + $('#idImovel').val(),
            dataType: 'json',
            success: function (resp) {
                nMetros = resp.metros.length;
                if (nMetros > 0) {
                    $('#lstMetros span').html('');
                    var strRet = '';
                    for (i = 0; i < nMetros; i++) {
                        var marque = (resp.metros[i].CHK != '') ? "checked=\"checked\"" : "";
                        strRet += "<label for=\"chkMetros" + resp.metros[i].id_ponto_referencia + "\">";
                        strRet += "<input type=\"checkbox\" " + marque + " id=\"chkMetros" + resp.metros[i].id_ponto_referencia + "\" value=\"" + resp.metros[i].id_ponto_referencia + "\" name=\"chkMetros\" " + ((blBloqueado) ? "disabled=\"disabled\"" : "") + "  /> " + resp.metros[i].tx_ponto_referencia + "";
                        strRet += "</label>";
                    }
                    $('#lstMetros').show();
                }
                else {
                    $('#lstMetros span').html('');
                    $('#lstMetros').hide();
                }

                $('#lstMetros span').append(strRet);
            }
        });
    }).change();

    if ($('#idRegiao').val() == '0')
        $('#txRegiao').parent().hide();

    if ($('#hdModuloBasico').val() == '0') {
        $('#txDescricaoMidiaImpressa').parent().append("<div id=\"msgCount\" class=\"msgCount\"></div>");
        $('#txDescricaoMidiaImpressa').keyup(function (event) { $('#msgCount').text($(this).val().length); });
        $('#msgCount').text($('#txDescricaoMidiaImpressa').val().length);
    }

    //NÃO POSSUIR GERENTES, SER DO MODULO BASICO E NÃO SER DA REDE SECOVI
    if ($('#hdGerente').val() == '0' && $('#hdIdModuloBasico').val() == '2')
        jAlert('A imobiliária não possui nenhum gerente cadastrado, <a href="modules/usuarios/usuario.aspx">clique aqui para cadastrar todos os usuários corretamente.</a>');

    //se for true bloqueia os campos
    var blReadOnlyPortais = ParseBool($('#blReadOnlyPortais').val()); // Boolean($('#blReadOnlyPortais').val());

    //ESSA ALTERAÇÃO FICOU PRA TRAZ QUANDO FOI ALTERADO OS USUÁRIOS QUE ATENDEM O IMÓVEL. VER DPOIS

    /// <SUMMARY>
    /// Controla o campo titulo site habilitando ou desabilitando para adicionar texto.
    /// </SUMMARY>
    function GerenciaCampoTituloSite() {
        if ($('#txTituloSite').prop('disabled')) {
            $('#txTituloSite').prop('disabled', false).prop('readonly', false);
        } else {
            $('#txTituloSite').prop('disabled', true).prop('readonly', true);
        }
    }

    /// <SUMMARY>
    /// Monta o conteudo do campo dinamicamente.
    /// </SUMMARY>
    function MontaDescricaoTituloSite() {
        if ($('#cboTipo').val() != '') {
            tipo = $('#cboTipo').find('option').filter(':selected').text();
            finalidade = $('#cboFinalidade').find('option').filter(':selected').text();
            bairro = $('#bairro_comercial').find('option').filter(':selected').text();
            referencia = $('#hdTxReferencia').val();
            cidade = $('#cidade').val();
            idTipo = parseInt($('#cboTipo').val());
            idFinalidade = parseInt($('#cboFinalidade').val());

            arrTipoSemEndereco = new Array();
            arrTipoSemEndereco.push(33);

            arrTiposTrataFinalidade = new Array();
            arrTiposTrataFinalidade.push(6); //Barracão
            arrTiposTrataFinalidade.push(12); //Galpão
            arrTiposTrataFinalidade.push(15); //Ponto
            arrTiposTrataFinalidade.push(16); //Prédio
            arrTiposTrataFinalidade.push(18); //Salão
            arrTiposTrataFinalidade.push(20); //Terreno
            arrTiposTrataFinalidade.push(25); //Sobrado
            arrTiposTrataFinalidade.push(27); //Conjunto
            arrTiposTrataFinalidade.push(31); //Bangalô

            strTmpConteudo = tipo.trim();

            if (finalidade != '') {
                if (idFinalidade == 6 && $.inArray(idTipo, arrTiposTrataFinalidade) >= 0) { // corporativa
                    strTmpConteudo += ' corporativo';
                } else {
                    strTmpConteudo += ' ' + finalidade.toLowerCase();
                }
            }

            if ($('#chkPretVenda').prop('checked') && $('#chkPretLocacao').prop('checked')) {
                strTmpConteudo += ' para venda e locação';
            }
            else if ($('#chkPretLocacao').prop('checked')) {
                strTmpConteudo += ' para locação';
            }
            else {
                strTmpConteudo += ' à venda';
            }

            if (bairro && $.inArray(idTipo, arrTipoSemEndereco) == -1) strTmpConteudo += ', ' + bairro;

            if (cidade) strTmpConteudo += ', ' + cidade;

            if (referencia != '') strTmpConteudo += ' - ' + referencia;

            $('#txTituloSite').val(strTmpConteudo.trim() + '.');
        }
        else {
            alert('É obrigatório a seleção do tipo de imóvel para geração automática do título.');
            $('#txTituloSite').val('');
        }
    }

    $('.classGeraAutomatico').click(function () { MontaDescricaoTituloSite(); });

    //inicia algumas funções
    calculaPacoteLocacao();
    //ControlaVagasGaragem();

    if ($('#hdBloquearCampos').length == 0) {

        $('#divArquivos').gridfile({
            id: $('#idImovel').val(),
            objTotalArquivo: $('#hdTotalArquivo'),
            txUsuarioCadastro: $('#hdTxNomeUsuario').val(),
            tamanhoArquivoImob: $('#hdTamanhoArquivoImob').val(),
            tamanhoArquivoUsado: $('#hdTamanhoTotalArquivo').val(),
            txCarregaPlugIn: 'divArquivos',
            blMultiSelecao: false,
            txMaxTamanhoArquivo: '15mb',
            txURLGerenciaUpload: 'modules/imoveis_beta/imovel-upload-arquivo.ashx',
            txURLFlash: '../admin/swf/plupload.flash.swf',
            objCarregaArquivo: $('#tableArquivos')
        });
    }

});

function GerenciaFildPadrao(show) {
    if (show) {
        $("#cboPadrao").parent().show();
    }
    else {
        $("#cboPadrao").parent().hide();
        $("#cboPadrao").val(6);
    }
}


function VoltaConsultaLogradouroEstadoOriginal() {
    $(".buscaCEPbox, .boxFields").show();
    $("#cboPraia, #endereco, #bairro, #bairro_comercial, #cidade, #cep, #estado, #numero, #complemento, #idLogradouro, #ponto_referencia").parent().hide();
    $("#idRegiao, #hdCoordenadas, #idLogradouro, #complemento, #numero").val("");
    $("#endereco, #numero, #bairro, #cidade, #estado, #cep").prop('disabled', false);
}

function VoltaLogradouroEstadoParcial() {
    $(".changeAddress").parent().show();
    $("#numero").prop('disabled', false);
}

function requestFeedbackGaiaLite() {

    var _msg_success = "Foi enviada uma mensagem para a equipe de atendimento do <strong>Gaia Lite</strong>, em breve entraremos em contato.";
    var _msg_error = "Ocorreu um erro ao fazer a solicitação de retorno,<br /><strong>a equipe de atendimento do Gaia Lite não pode ser informada</strong>.<br />Por favor tente novamente mais tarde.";

    $.ajax({
        type: 'POST',
        url: 'json/feedbackGaiaLite.ashx',
        success: function (msg) {

            eval('var _retorno = ' + msg);

            if (_retorno.status == "OK")
                jAlert(_msg_success);
            else
                jAlert(_msg_error);

            return (false);

        },
        error: function (msg) {

            jAlert(_msg_error);
            return (false);

        }
    });
}

/// <SUMMARY>
/// VALIDA O CAMPO SUITE QUE ESTA NA PARTE DE DETALHES DO IMÓVEL
/// </SUMMARY>
function CriaCampoSuite(valor) {

    var qtdDorm = $("#in_dorm").val();
    var html = "<label><i class=\"italicRequired\"></i>Suites<br /><select id='in_suites' name='in_suites'><option value='0'>Nenhuma</option></select></label>";
    var blTodosCamposDetalhe = ($('#hsTodosCamposDetalhe').val() == "True");

    if (typeof (valor) != "undefined") valorSuite = valor; else valorSuite = $("#in_suites").val();

    $("#in_suites").parent().remove();
    $("#in_dorm").parent().after(html);

    for (i = 1; i <= qtdDorm; i++) {
        srt = "<option value='" + i + "'>" + i + "</option>";
        $(srt).appendTo("#in_suites");
    }

    if (valorSuite > 0) $("#in_suites").val(valorSuite);

    if (qtdDorm <= 0) $('#in_suites').parent().hide();

    if (blTodosCamposDetalhe)
        $("#in_suites").prop('disabled', true).attr("class", "disabled");
    else
        $("#in_suites").prop('disabled', false);
}

// Caso a imobiliária esteja com o limite de imoveis cadastrados exibe link para usuário enviar email para a equipe do Gaia Lite
$('#lnkMailToGaiaLite').click(function () { window.location.href = 'mailto:gaialite@i-value.com.br&subject=Contato%20usuário%20Gaia%20Lite%20(' + $('#usuario_nome').text().trim() + ')'; });

function GerenciaDetalhes(tipoImovel) {

    if (tipoImovel > 0)
        $("#divDetalhesImovel").parent().fadeIn();
    else
        $("#divDetalhesImovel").parent().hide();

    if (tipoImovel > 0) {
        $.ajax({
            beforeSend: function () { $('#divDetalhesImovel').html(''); }
          , url: 'modules/imoveis_beta/imovel-detalhes.aspx'
          , data: 'codTipo=' + tipoImovel + '&id_imovel=' + $('#idImovel').val()
          , success: function (msg) {
              $('#divDetalhesImovel').html(msg);
              //correção valor m2
              calculaVenda();

              $('#txAreaUtil, #txAreaTotal, #txValorVenda, #txValorLocacao').bind('blur', calculaVenda);

              $('#fl_litoraneo').bind('click', ControleCamposImovelLitoral);

              $('#in_garagens, #in_garagens_descobertas').bind('keyup', ControlaVagasGaragem);

              $('#fl_divisoria').bind('click', ControleCampoNumeroDivisoria);
              $('#fl_trifasico').bind('click', ControleCampoKvaTrifasico);
              $('#fl_ponte_rolante').bind('click', ControleCampoAreaPonteRolante);
              $('#fl_mezanino').bind('click', ControleCampoAreaMezanino);
              $('#fl_cabine_primaria').bind('click', ControleCampoKvaCabinePrimaria);
              $('#fl_pavimentacao').bind('click', ControleCampoPavimentacaoTipo);

              $('#Area').bind('keyup', function () { Metragens(); calculaVenda(); });
              $('#txAreaUtil').bind('keyup', function () { calculaVenda(); }); //correção: atualiza valor m2 dinamicamente
              $('#cboMetragem').change(function () { Metragens(); });
              $("#in_vagas_tipo").change(function () { ExibeCaracteristicaVaga($(this)); });
              $("#fl_beira_mar").change(function () { ExibeMetroPraia($(this)); });
              $("#in_dorm").keyup(function () { GerenciaCampoSuite($(this)); });

              CriaCampoSuite();
              ControlaVagasGaragem();
              ControleCamposImovelLitoral();
              ControleCampoNumeroDivisoria();
              ControleCampoKvaTrifasico();
              ControleCampoAreaPonteRolante();
              ControleCampoAreaMezanino();
              ControleCampoKvaCabinePrimaria();
              validaCamposObrigatoriosFinalidadeTipo();
              GerenciaApresentacaoCamposTopografia();
              ControleCampoPavimentacaoTipo();
              gerenciaApresentacaoCamposBox();

              popoverHint('.alq-paulista', '1 Alqueire Paulista = 24.200m²', '');
              popoverHint('.alq-goiano', '1 Alqueire Goiano = 48.400m²', '');
              popoverHint('.alq-mineiro', '1 Alqueire Mineiro = 48.400m²', '');
              popoverHint('.alq-norte', '1 Alqueire do Norte =  27.225m²', '');
              popoverHint('.alq-baiano', '1 Alqueire Baiano = 96.800m²', '');
              popoverHint('.hectar', '1 Hectare = 10.000m²', '');

              Metragens();

          }
        });
    }
}

//documentação
function GerenciaDocumentacao() {
    $.ajax({
        url: 'modules/imoveis_beta/imovel-carregar-lista-documentos.ashx',
        type: 'POST',
        data: 'id_tipo=' + $('#cboTipo').val() + '&id_imovel=' + $('#idImovel').val(),
        dataType: 'json',
        success: function (resp, textStatus, jqXHR) {
            $('#lstDocumentos').html(resp.documentos[0].message);
        }
    });
}

function LoadBairroComercial(bairroSet, bairros) {
    var html = "";
    for (i in bairros)
        try {
            if (bairroSet == bairros[i].id)
                html += "<option value='" + bairros[i].id + "' selected='selected'>" + bairros[i].label + "</option>";
            else
                html += "<option value='" + bairros[i].id + "'>" + bairros[i].label + "</option>";
        } catch (e) { }

    return html;
}

function LoadRodoviaKm(rodovias) {
    var html = "";
    for (i in rodovias)
        try {
            html += "<option value='" + rodovias[i].id + "'>" + rodovias[i].label + "</option>";
        } catch (e) { }

    return html;
}

function LoadPraia(praias) {
    var html = "";
    for (i in praias)
        try {
            html += "<option value='" + praias[i].id + "'>" + praias[i].label + "</option>";
        } catch (e) { }

    return html;
}

function GerenciaNomeCampoImovelRural(tipoImovel) {

    //NOME DA FAZENDA
    if (tipoImovel == 11 || tipoImovel == 8 || tipoImovel == 19 || tipoImovel == 14 || tipoImovel == 38) {
        if (tipoImovel == 11)
            $('#txNomeFaz').parent().find('.italicTitle').text('Nome da fazenda:');
        else if (tipoImovel == 8)
            $('#txNomeFaz').parent().find('.italicTitle').text('Nome da chácara:');
        else if (tipoImovel == 19)
            $('#txNomeFaz').parent().find('.italicTitle').text('Nome do sítio:');
        else if (tipoImovel == 14)
            $('#txNomeFaz').parent().find('.italicTitle').text('Nome do haras:');
        else if (tipoImovel == 38)
            $('#txNomeFaz').parent().find('.italicTitle').text('Nome do rancho:');

        $('#txNomeFaz').parent().fadeIn('fast');
    } else {
        $('#txNomeFaz').parent().hide();
    }
}

function GerenciaApresentacaoNomeIlha(tipoImovel) {

    if (tipoImovel == 33)
        $('#txNomeIlha').parent().fadeIn('fast');
    else
        $('#txNomeIlha').parent().hide();
}

function GerenciaNomeCampoPrefeitura(tipoImovel) {
    if (tipoImovel == 11 || tipoImovel == 8 || tipoImovel == 14 || tipoImovel == 19 || tipoImovel == 38)
        $("#txPrefeitura").parent().find(".italicTitle").text("ITR:");
    else
        $("#txPrefeitura").parent().find(".italicTitle").text("Código IPTU:");
}

function calculaValorFianca() {
    var dlValorParaCalculo = parseFloat(FormataStringValorParaCalcular($("#txValorLocacao").val()));
    var dlValorBaseCalculo = parseFloat(FormataStringPorcentagemParaCalcular($("#txPorcentagemFiancaEmpresarial").val()));
    $("#txValorFiancaEmpresarial").val(((dlValorParaCalculo / 100) * dlValorBaseCalculo).formatMoney(2, ",", "."))
}

function calculaVenda() {

    var pretensao = 2;
    var tipoArea = 1;

    //2 - Apartamento
    //6 - Barracão
    //7 - Casa
    //12 - Galpão
    //15 - Ponto
    //16 - Prédio
    //17 - Sala
    //18 - Salão
    //22 - Kitnet
    //23 - Flat
    //24 - Cobertura
    //25 - Sobrado
    //26 - Loja
    //27 - Conjunto
    //28 - Village
    //29 - Laje
    //30 - Pousada
    //31 - Bangalô
    //32 - Loft
    //33 - Ilha
    //34 - Penthouse
    //35 - Apartamento Duplex
    //36 - Resort
    //37 - Hotel
    //39 - Studio
    //40 - Apartamento Triplex
    //43 - Pavilhão
    //44 - Andar Corporativo
    //45 - Apartamento Garden
    //Não incluir: Fazenda, Sítio, Chácara, Área, Terreno, Haras, Rancho (m² é calculado na classe para estes tipos)
    var tiposExcessao = new Array(2, 6, 7, 12, 15, 16, 17, 18, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 43, 44, 45);

    //Edícula - 41
    //Box/Garagem - 42
    var tiposAreaTotal = new Array(41, 42);

    if ($('#cboTipo').find(':selected').attr('rel') == 'True' || $.inArray(parseInt($('#cboTipo').val()), tiposExcessao) >= 0) {
        tipoArea = 0;
    }
    if ($.inArray(parseInt($('#cboTipo').val()), tiposAreaTotal) >= 0) //Tipos que utilizam Area Total para calculo de m²
        tipoArea = 1;

    var valores = new Array(
        $('#txAreaUtil').val(),
        $('#txAreaTotal').val(),
        $('#txValorVenda').val(),
        $('#txValorLocacao').val()
    );

    var camposRes = new Array(
        $('#txValorm2Venda'),
        $('#txValorm2Locacao'),
        $('#txValorm2TotalVenda'),
        $('#txValorm2TotalLocacao')
    );

    for (i = 0; i < valores.length; i++) {

        if (valores[i] == undefined) valores[i] = '';

        valores[i] = valores[i].replace('R$', '');
        valores[i] = valores[i].replace('.', '');
        valores[i] = valores[i].replace('.', '');
        valores[i] = valores[i].replace(',', '.');
    }

    for (i = 0; i < valores.length; i++) {

        var resultado = '';

        resultado = valores[pretensao] / valores[tipoArea];
 
        if (isFinite(resultado) && !isNaN(resultado)) {
            camposRes[i].val(resultado.formatMoney(2, ',', '.'));
        }
        else {
            camposRes[i].val('');
        }

        if (pretensao == 2)
            pretensao = 3;
        else
            pretensao = 2;
    }

    MostraAreas();
    calculaValorFianca();

};


function MostraAreas() {

    var areasm2 = new Array(
        $('#txValorm2Venda'),
        $('#txValorm2Locacao'),
        $('#txValorm2TotalLocacao'),
        $('#txValorm2TotalVenda')
    );

    for (i = 0; i < areasm2.length; i++) {
        if (areasm2[i].val() == '0.00' || areasm2[i].val() == '' || areasm2[i].val() == 'NaN.00' || areasm2[i].val() == '0' || areasm2[i].val() == '0,00') {
            areasm2[i].val('0');
        }
        else {
            areasm2[i].parent().show();
        }
        areasm2[i].attr('class', 'disabled')
    }

}

function toFix(valor_num, fix) {

    var valor = valor_num.toString();
    var divisao = valor.split('.');
    var reais = divisao[0];
    var centavos = divisao[1];
    if (centavos != null) {
        centavos = centavos.substring(0, fix);
    } else {
        centavos = '00';
    }
    var result = reais + ',' + centavos;
    return (result);
}

// LOCADO SÓ SE O IMÓVEL ESTÁ À VENDA
function fnLocado(valor) {
    if (valor > 0) {
        $('#cboLocado').parent().show();

    } else {
        $('#cboLocado').parent().hide();
        $('#cboLocado').val(0)
    }
}

/// <SUMMARY>
/// Somatória dos valores: valor do aluguel, valor do condomínio e valor do IPTU.
/// </SUMMARY>
function calculaPacoteLocacao() {
    dlTotal = 0;
    dlIPTU = 0;
    dlTaxas = 0;

    if ($('#cboPagamentosCondicoesIptu').val() == 1) {
        dlIPTU = parseFloat(FormataStringValorParaCalcular($('#txValorIptu').val()));
        dlIPTU = dlIPTU / 12;
    } else {
        dlIPTU = parseFloat(FormataStringValorParaCalcular($('#txValorIptu').val()));
    }

    var objPacoteLocacao = {
        dlPrecoAluguel: $('#txValorLocacao')
        , dlPrecoCondominio: $('#txValorCondominio')
    }

    for (obj in objPacoteLocacao) {
        dlValorCorrent = parseFloat(FormataStringValorParaCalcular(objPacoteLocacao[obj].val()));
        if (!isNaN(dlValorCorrent)) {
            dlTotal = dlTotal + dlValorCorrent;
        }
    }

    dlTotal = dlTotal + dlIPTU;

    //Taxas
    if ($("#hdTotalTaxas").length) {

        //Percorre os dropdowns de taxas
        $(".classTaxaValor").each(function () {

            //Não percorrer o dropdown default
            if ($(this).attr("name") != "txTaxa_Default") {
                var selectValue = $(this).val();

                var index = $(this).attr("id").replace("txTaxa_", "");

                //Tipo laudêmio ou sem preencher, não entra no cálculo do pacote
                if ($("#cboTaxaTipo_" + index).val() != 3 && $("#cboTaxaTipo_" + index).val() != 0)
                    dlTaxas = dlTaxas + (FormataStringValorParaCalcular($(this).val()) / $("#cboTaxaPeriodicidade_" + index).find('option:selected').attr('rel'));
            }
        });

        dlTotal = dlTotal + dlTaxas;
    }

    if (!isNaN(dlTotal)) {
        $('#txPacoteLocacao').val(dlTotal.formatMoney(2, ',', '.'));
    }
}

/// <SUMMARY>
/// Faz a soma das vagas cobertas e descobertas nos detalhes do imóvel.
/// </SUMMARY>
function ControlaVagasGaragem() {
    total = 0;
    vagas = TryParseInt($('#in_garagens').val(), 0);
    vagas_descobertas = TryParseInt($('#in_garagens_descobertas').val(), 0);

    if (!isNaN(vagas)) {
        total = total + vagas;
    }

    if (!isNaN(vagas_descobertas)) {
        total = total + vagas_descobertas;
    }

    $('#in_vagas').val(total);
    garagensDetalhes();

}

// Exibe os campos de detalhes das vagas caso haja alguma vaga no imóvel.
function garagensDetalhes() {
    var _vagas = TryParseInt($('#in_vagas').val(), 0);

    if (_vagas > 0)
        $('#in_vagas_tipo').parent().fadeIn().change();
    else
        $('#in_vagas_tipo,#in_vagas_caracteristica').val(0).parent().fadeOut();
}

// Exibe os campos de detalhes das vagas caso haja alguma vaga no imóvel.
function ExibeCaracteristicaVaga(obj) {
    if ($(obj).val() > 0)
        $("#in_vagas_caracteristica").parent().fadeIn();
    else
        $("#in_vagas_caracteristica").val(0).parent().fadeOut();
}

function ExibeMetroPraia(obj) {
    if ($("#fl_beira_mar:checked").length > 0) {
        $("#in_metros_praia").parent().fadeIn();
    } else {
        $("#in_metros_praia").parent().hide();
        $("#in_metros_praia").val('');
    }
}

/// <SUMMARY>
/// VALIDA O CAMPO IMÓVEL NO LITORAL QUE APRESENTA OU OCUTA ALGUNS CAMPOS QUE ESTÃO NOS DESTALHES DO IMÓVEL.
/// </SUMMARY>
function ControleCamposImovelLitoral() {
    if ($('#fl_litoraneo').prop('checked') == true) {
        $('#fl_vista_mar, #fl_pe_areia, #fl_beira_mar, #tx_nome_praia').parent().fadeIn();
    }
    else {
        $('#fl_vista_mar, #fl_pe_areia, #fl_beira_mar').prop('checked', false).parent().fadeOut();
        $('#tx_nome_praia').val('').parent().fadeOut();
    }

    ExibeMetroPraia($("#fl_beira_mar"));
}

function ControleCampoNumeroDivisoria() {
    if ($('#fl_divisoria').prop('checked') == true) {
        $('#in_divisoria').parent().fadeIn();
    }
    else {
        $('#in_divisoria').val('').parent().fadeOut();
    }
}

function ControleCampoKvaTrifasico() {
    if ($('#fl_trifasico').prop('checked') == true) {
        $('#in_kva_trifasico').parent().fadeIn();
    }
    else {
        $('#in_kva_trifasico').val('').parent().fadeOut();
    }
}

function ControleCampoAreaMezanino() {
    if ($('#fl_mezanino').prop('checked') == true) {
        $('#dl_area_mezanino').parent().fadeIn();
    }
    else {
        $('#dl_area_mezanino').val('').parent().fadeOut();
    }
}

function ControleCampoAreaPonteRolante() {
    if ($('#fl_ponte_rolante').prop('checked') == true) {
        $('#dl_ponte_rolante').parent().fadeIn();
    }
    else {
        $('#dl_ponte_rolante').val('').parent().fadeOut();
    }
}

function ControleCampoKvaCabinePrimaria() {
    if ($('#fl_cabine_primaria').prop('checked') == true) {
        $('#in_kva_cabine_primaria').parent().fadeIn();
    }
    else {
        $('#in_kva_cabine_primaria').val('').parent().fadeOut();
    }
}

function ControleCampoPavimentacaoTipo() {
    if ($('#fl_pavimentacao').prop('checked') == true) {
        $('#in_pavimentacao_tipo').parent().fadeIn();
    }
    else {
        $('#in_pavimentacao_tipo').val(0).parent().fadeOut();
    }
}

function GerenciaCampoSuite(obj) {
    if ($("#in_dorm").val() != '' && $("#in_dorm").val() > 0) {
        $("#in_suites option").remove();
        $('<option value="">Selecione</option>').appendTo('#in_suites');

        for (i = 1; i <= $("#in_dorm").val() ; i++) {
            $('<option value="' + i + '">' + i + '</option>').appendTo('#in_suites');
        }

        $('#in_suites').parent().show();
    } else {
        $('#in_suites').parent().hide();
        $('#in_suites').val('');
    }
}


/*OCUPADO / LOCADO
SE ESTIVER OCUPADO PELO PROPRIETARIO NÃO É LOCADO
SE ESTIVER OCUPADO PELO INQUILINO ESTA LOCADO*/
//$("#cboOcupacao").change(function(){ocupadoLocado();}).change();
//$("#cboOcupador").change(function(){ocupadoLocado();}).change();
function ocupadoLocado() {
    if ($('#cboOcupacao').val() == '2') {
        //mostra proprietario
        $('#cboLocado').parent().show();
        if ($('#cboOcupador').val() == 1) $('#cboLocado').val('false');
        else $('#cboLocado').val('true');
    } else {
        $('#cboLocado').val('false');
        $('#cboLocado').parent().hide();
    }
    $('#cboLocado').prop('disabled', true);
}

function setaCamposObrigatorios(obj) {
    for (var i = 0; i < obj.lstCampos.length; i++) $('#' + obj.lstCampos[i]).parent().find('.italicRequired').text('*');

    return (false);
}

function atualizaCamposObrigatorios(obj) {
    //Limpa os campos requeridos da lista anterior e depois atualiza com a nova lista.
    for (var i = 0; i < objCamposObrigatorios.lstCampos.length; i++) $('#' + objCamposObrigatorios.lstCampos[i]).parent().find('.italicRequired').text('');

    for (var i = 0; i < obj.lstCampos.length; i++) $('#' + obj.lstCampos[i]).parent().find('.italicRequired').text('*');

    return (false);
}


function GerenciaEscolhaUnidade(obj) {
    $.ajax({
        url: 'json/dadosEmpreendimentoUnidade.ashx',
        data: 'idUnidade=' + obj,
        dataType: 'json',
        type: 'POST',
        beforeSend: function () { },
        success: function (json) {
            // Dorm.
            $("#in_dorm").val(json.in_dorm);

            // Suite
            CriaCampoSuite(json.in_suite);

            // salas
            $("#in_salas").val(json.in_salas);

            // banheiros
            $("#in_banheiros").val(json.in_banheiros);

            // vagas cobertas
            $("#in_garagens").val(json.in_vagas_cobertas);

            // vagas descobertas
            $("#in_garagens_descobertas").val(json.in_vagas_descobertas);

            // área util / área comum
            $("#txAreaUtil").val(json.dl_area_util);

            // área comum
            $("#txAreaComum").val(json.dl_area_comum);

            // área total
            $("#txAreaTotal").val(json.dl_area_total);

            // área total para imóvel rural
            $("#Area").val(json.dl_area_total);

            //events
            $("#in_garagens_descobertas").trigger("keyup");
        },
        error: function (json, e) { }
    });
}


function fnVendaLocacao() {
    var b = (($('#chkPretVenda:checked').length > 0) || ($('#chkPretLocacao:checked').length > 0));

    if ($('#chkPretVenda:checked').length > 0) {
        $('#txValorVenda, #txValorm2Venda').parent().fadeIn();
    } else {
        $('#txValorVenda, #txValorm2Venda').parent().hide();
    }

    if ($('#chkPretLocacao:checked').length > 0) {
        $('#txValorLocacao, #txValorm2Locacao, #cboTipoLocacao, #txPacoteLocacao, #txTaxaIntermediacao').parent().fadeIn();
        calculaPacoteLocacao();
        gerenciaApresentacaoTipoGarantiaLocacao(true);
    } else {
        $('#txValorLocacao, #txValorm2Locacao, #cboTipoLocacao, #txPacoteLocacao, #txTaxaIntermediacao').parent().hide();
        gerenciaApresentacaoTipoGarantiaLocacao(false);
    }

    if (b)
        $('#dtAvaliacao').parent().show();
    else
        $('#dtAvaliacao').parent().hide();

    habilitaDisabilitaPublicarValorSite();

    if ($('#hdRegraValidaEndereco').val() == "3" || $('#hdRegraValidaEndereco').val() == "4") {
        $('#numero').blur();
    }
}

function gerenciaApresentacaoTipoGarantiaLocacao(show) {
    if (show) { $("#lstTipoGarantiaLocacao").show(); }
    else { $("#lstTipoGarantiaLocacao").hide(); }
}

function GerenciaApresentacaoCamposTopografia() {
    if (isVertical) {
        $("#cboTopografia").parent().hide();
    }
    else {
        $("#cboTopografia").parent().show();
    }
}

function Metragens() {
    if ($('#cboMetragem').val() != '' && $('#cboMetragem').val() != undefined) {
        var txTot = $("#Area").val().replace(',', '.');
        var txAreaTotal = 0,
            txAreaAlq = 0,
            txAreaHectar = 0,
            result = 0,
            txAreaAlqGoiano = 0,
            txAreaAlqMineiro = 0,
            txAreaAlqNorte = 0,
            txAreaAlqBaiano = 0;

        var dlAlqueirePaulista = $("#dlAlqueirePaulistaReadOnly").val().replace(',', '.'),
            dlAlqueireMineiro = $("#dlAlqueireMineiroReadOnly").val().replace(',', '.'),
            dlAlqueireGoiano = $("#dlAlqueireGoianoReadOnly").val().replace(',', '.'),
            dlHequitare = $("#dlAlqueireHectareReadOnly").val().replace(',', '.'),
            dlAlqueireNorte = $("#dlAlqueireNorteReadOnly").val().replace(',', '.'),
            dlAlqueireBaiano = $("#dlAlqueireBaianoReadOnly").val().replace(',', '.');

        switch ($('#cboMetragem').val()) {
            case '1': // M²
                txAreaTotal = txTot;
                txAreaAlq = txTot / dlAlqueirePaulista;
                txAreaHectar = txTot / dlHequitare;
                txAreaAlqGoiano = txTot / dlAlqueireGoiano;
                txAreaAlqMineiro = txTot / dlAlqueireMineiro;
                txAreaAlqNorte = txTot / dlAlqueireNorte;
                txAreaAlqBaiano = txTot / dlAlqueireBaiano;
                break;

            case '2': // alqueire paulista
                result = txTot * dlAlqueirePaulista;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaAlq = txTot;

                    txAreaTotal = result;
                    txAreaHectar = result / dlHequitare;
                    txAreaAlqGoiano = result / dlAlqueireGoiano;
                    txAreaAlqMineiro = result / dlAlqueireMineiro;
                    txAreaAlqNorte = result / dlAlqueireNorte;
                    txAreaAlqBaiano = result / dlAlqueireBaiano;
                }
                break;

            case '3': // hequitare
                result = txTot * dlHequitare;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaHectar = txTot;

                    txAreaTotal = result;
                    txAreaAlq = result / dlAlqueirePaulista;
                    txAreaAlqGoiano = result / dlAlqueireGoiano;
                    txAreaAlqMineiro = result / dlAlqueireMineiro;
                    txAreaAlqNorte = result / dlAlqueireNorte;
                    txAreaAlqBaiano = result / dlAlqueireBaiano;
                }
                break;

            case '4': // Alqueires goiano
                result = txTot * dlAlqueireGoiano;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaAlqGoiano = txTot;

                    txAreaTotal = result;
                    txAreaAlq = result / dlAlqueirePaulista;
                    txAreaHectar = result / dlHequitare;
                    txAreaAlqMineiro = result / dlAlqueireMineiro;
                    txAreaAlqNorte = result / dlAlqueireNorte;
                    txAreaAlqBaiano = result / dlAlqueireBaiano;
                }
                break;

            case '5': // Alqueires mineiro
                result = txTot * dlAlqueireMineiro;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaAlqMineiro = txTot;

                    txAreaTotal = result;
                    txAreaAlq = result / dlAlqueirePaulista;
                    txAreaHectar = result / dlHequitare;
                    txAreaAlqGoiano = result / dlAlqueireGoiano;
                    txAreaAlqNorte = result / dlAlqueireNorte;
                    txAreaAlqBaiano = result / dlAlqueireBaiano;
                }
                break;

            case '6': // Alqueire do Norte
                result = txTot * dlAlqueireNorte;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaAlqNorte = txTot;

                    txAreaTotal = result;
                    txAreaAlq = result / dlAlqueirePaulista;
                    txAreaHectar = result / dlHequitare;
                    txAreaAlqGoiano = result / dlAlqueireGoiano;
                    txAreaAlqMineiro = result / dlAlqueireMineiro;
                    txAreaAlqBaiano = result / dlAlqueireBaiano;
                }
                break;

            case '7': // Alqueire Baiano
                result = txTot * dlAlqueireBaiano;
                if (isFinite(result) && !isNaN(result)) {
                    txAreaAlqBaiano = txTot;

                    txAreaTotal = result;
                    txAreaAlq = result / dlAlqueirePaulista;
                    txAreaHectar = result / dlHequitare;
                    txAreaAlqGoiano = result / dlAlqueireGoiano;
                    txAreaAlqMineiro = result / dlAlqueireMineiro;
                    txAreaAlqNorte = result / dlAlqueireNorte;
                }
                break;
        }
        $('#txAreaTotal').val(toFix(txAreaTotal, 2).replace('.', ','));
        $('#txAreaHectar').val(toFix(txAreaHectar, 2).replace('.', ','));
        $('#txAreaAlq').val(toFix(txAreaAlq, 2).replace('.', ','));

        $('#txAreaAlqGoiano').val(toFix(txAreaAlqGoiano, 2).replace('.', ','));
        $('#txAreaAlqMineiro').val(toFix(txAreaAlqMineiro, 2).replace('.', ','));
        $('#txAreaAlqNorte').val(toFix(txAreaAlqNorte, 2).replace('.', ','));
        $('#txAreaAlqBaiano').val(toFix(txAreaAlqBaiano, 2).replace('.', ','));

    }
}

function fnExclusividade(valor) {
    if (valor == 'false') {
        $('#txExclusividadeInicio').parent().hide();
        $('#txExclusividadeValidade').parent().hide();
        $('#txExclusividadeFim').parent().hide();
        $('#txExclusividadeInicio').val('');
        $('#txExclusividadeValidade').val('');
        $('#txExclusividadeFim').val('');
    }
    else {
        $('#txExclusividadeInicio').parent().fadeIn();
        $('#txExclusividadeValidade').parent().fadeIn();
        $('#txExclusividadeFim').parent().fadeIn();
    }
}

function tempoExclusividade() {
    if ($('#txExclusividadeInicio').val() != '' && $('#txExclusividadeValidade').val() != '') {
        var datafinal = dateDif($('#txExclusividadeInicio').val(), $('#txExclusividadeValidade').val());
        $('#txExclusividadeFim').val(datafinal);
    }
}

//Jeferson 02/05/11 18:17: alterações Jessé
//FUNÇÃO - HABILITA DESABILITA PUBLICAÇÃO VALOR SITE
function habilitaDisabilitaPublicarValorSite() {

    var flagLocacao = document.getElementById('chkPretLocacao').checked;
    var flagVenda = document.getElementById('chkPretVenda').checked;

    $('#cboValorImovelSite').find('option').each(function () {
        $(this).prop('disabled', true);
    });

    // TUDO HABILITADO
    if (flagLocacao == true && flagVenda == true) {
        $('#cboValorImovelSite').find('option').each(function (index, element) { element.disabled = false; });
    }
        // TUDO DESABILITADO
    else if (flagLocacao == false && flagVenda == false) {
        $('#cboValorImovelSite').find('option').each(function (index, element) {
            if (element.value == 4) { element.disabled = false; }
            else { element.disabled = true; }
        });
    }
        // SOMENTE VENDA
    else if (flagLocacao == false && flagVenda == true) {
        $('#cboValorImovelSite').find('option').each(function (index, element) {
            if (element.value == 2 || element.value == 4) { element.disabled = false; }
            else { element.disabled = true; }
        });
    }
        // SOMENTE LOCACAO
    else if (flagLocacao == true && flagVenda == false) {
        $('#cboValorImovelSite').find('option').each(function (index, element) {
            if (element.value == 3 || element.value == 4) { element.disabled = false; }
            else { element.disabled = true; }
        });
    }
}

/// <SUMMARY>
/// Controla o campo titulo site habilitando ou desabilitando para adicionar texto.
/// </SUMMARY>
function GerenciaCampoTituloSite() {
    if ($('#txTituloSite').prop('disabled')) {
        $('#txTituloSite').prop('disabled', false).prop('readonly', false);
    } else {
        $('#txTituloSite').prop('disabled', true).prop('readonly', true);
    }
}

/// <SUMMARY>
/// Limpa descrição do titulo caso esteja trocando tipo do imóvel
/// </SUMMARY>
function ClearTituloSite() {
    $('#txTituloSite').val("");
}

/// <SUMMARY>
/// Monta o conteudo do campo dinamicamente.
/// </SUMMARY>
function MontaDescricaoTituloSite() {
    if ($('#cboTipo').val() != '') {
        tipo = $('#cboTipo').find('option').filter(':selected').text();
        finalidade = $('#cboFinalidade').find('option').filter(':selected').text();
        bairro = $('#bairro_comercial').find('option').filter(':selected').text();
        referencia = $('#hdTxReferencia').val();
        cidade = $('#cidade').val();
        idTipo = parseInt($('#cboTipo').val());
        idFinalidade = parseInt($('#cboFinalidade').val());

        arrTipoSemEndereco = new Array();
        arrTipoSemEndereco.push(33);

        arrTiposTrataFinalidade = new Array();
        arrTiposTrataFinalidade.push(6); //Barracão
        arrTiposTrataFinalidade.push(12); //Galpão
        arrTiposTrataFinalidade.push(15); //Ponto
        arrTiposTrataFinalidade.push(16); //Prédio
        arrTiposTrataFinalidade.push(18); //Salão
        arrTiposTrataFinalidade.push(20); //Terreno
        arrTiposTrataFinalidade.push(25); //Sobrado
        arrTiposTrataFinalidade.push(27); //Conjunto
        arrTiposTrataFinalidade.push(31); //Bangalô
        arrTiposTrataFinalidade.push(43); //Pavilhão

        strTmpConteudo = tipo;

        if (finalidade != '') {
            if (idFinalidade == 6 && $.inArray(idTipo, arrTiposTrataFinalidade) >= 0) { // corporativa
                strTmpConteudo += ' corporativo';
            } else {
                strTmpConteudo += ' ' + finalidade.toLowerCase();
            }
        }

        if ($('#chkPretVenda').prop('checked') && $('#chkPretLocacao').prop('checked')) {
            strTmpConteudo += ' para venda e locação';
        }
        else if ($('#chkPretLocacao').prop('checked')) {
            strTmpConteudo += ' para locação';
        }
        else {
            strTmpConteudo += ' à venda';
        }

        if (bairro && $.inArray(idTipo, arrTipoSemEndereco) == -1) strTmpConteudo += ', ' + bairro;

        if (cidade) strTmpConteudo += ', ' + cidade;

        if (referencia != '') strTmpConteudo += ' - ' + referencia;

        $('#txTituloSite').val(strTmpConteudo + '.');
    }
    else {
        alert('É obrigatório a seleção do tipo de imóvel para geração automática do título.');
        $('#txTituloSite').val('');
    }
}


// controle chave cadastro/alteração imóvel
function GerenciaApresentacaoCampos(obj) {
    var escolhido = parseInt(obj.val());

    switch (escolhido) {
        case 1: // não informado
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave, #tx_local_chave").parent().hide();
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave, #tx_local_chave").val("");
            break;

        case 3: // corretor
            $("#cboConjuntoChave, #txCodigoChave, #tx_local_chave").parent().hide();
            $("#cboConjuntoChave, #txCodigoChave, #tx_local_chave").val("");
            $("#cboCorretorChave").parent().show();
            break;

        case 2: // imob
            $("#cboCorretorChave, #tx_local_chave").parent().hide();
            $("#cboCorretorChave, #tx_local_chave").val("");
            $("#cboConjuntoChave, #txCodigoChave").parent().show();
            break;

        case 4: // prop
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave, #tx_local_chave").parent().hide();
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave, #tx_local_chave").val("");
            break;

        case 5: // outro
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave").parent().hide();
            $("#cboCorretorChave, #cboConjuntoChave, #txCodigoChave").val("");
            $("#tx_local_chave").parent().show();
            break;
    }
}

function GerenciaConjuntoChave() {
    if (IdentityImovel > 0) {
        var inConjuntoChave = $("#cboConjuntoChave").val();
        var cboLocalChave = $("#cboLocalChave").val();
        var data = "inConjuntoChave=" + inConjuntoChave + "&idImovel=" + IdentityImovel + "&cboLocalChave=" + cboLocalChave;

        $.ajax({
            type: "POST", url: "modules/imoveis_beta/controle_chave/gerencia-numero-conjunto-chave.ashx", data: data, dataType: "json"
            , success: function (rspst) { if (!rspst.sucesso) { alert(fnMontaMensagemFalha(rspst.erro)); } }
            , error: function () { alert("Não foi possível salvar as informações. Tente mais tarde."); }
        });
    }
}

function GerenciaApresentacaoCodigoChave(object) {
    var valor = TryParseInt(object.val(), 0);

    if (valor > 0)
        $("#txCodigoChave").parent().show();
    else
        $("#txCodigoChave").parent().hide();
}

function validaCamposObrigatoriosFinalidade(id_finalidade) {
    if (id_finalidade == 5) {
        $("#txAcomodaQtdPessoas").parent().show();
    } else {
        $("#txAcomodaQtdPessoas").parent().hide();
    }

}

function popoverHint(elem, title, content, placement) {
    var options = {
        template: '<div class="popover popover-hint" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
        title: title,
        placement: (placement) ? placement : 'auto',
        trigger: 'hover',
        html: true,
        content: content
    };

    $(document).ready(function () {
        $(elem).popover(options);
    })
}

function CalculaFiancaEmpresarial() {

    $("#txValorFiancaEmpresarial").calculaPorcentagemDeValor({
        objValorBaseCalculo: $("#txValorLocacao")
        , objResultado: $("#txPorcentagemFiancaEmpresarial")
        , blValidaValor: true
        , objControleEntrada: $("#hdControleEntradaValor")
        , blControlaEntradaValor: true
    });

    $("#txPorcentagemFiancaEmpresarial").calculaValorDePorcentagem({
        objValorBaseCalculo: $("#txValorLocacao")
        , objResultado: $("#txValorFiancaEmpresarial")
        , blValidaValor: true
        , objControleEntrada: $("#hdControleEntradaValor")
        , blControlaEntradaValor: true
    });

}

CalculaFiancaEmpresarial();
ApresentaCamposFiancaEmpresarial();

$("#chkGarantia7").on('change', function () {
    ApresentaCamposFiancaEmpresarial();
});

function ApresentaCamposFiancaEmpresarial() {
    if ($("#chkGarantia7:checked").length > 0) {
        $("#txValorFiancaEmpresarial, #txPorcentagemFiancaEmpresarial, #txtotalFiancaEmpresarial").parent().show();
        $("#hdControleCkdFianca").val(true);
    } else {
        $("#txValorFiancaEmpresarial, #txPorcentagemFiancaEmpresarial, #txtotalFiancaEmpresarial").parent().hide();
        $("#hdControleCkdFianca").val(false);
    }
}

$("#txTaxaIntermediacao").change(function () {
    if (parseFloat(String($(this).val().replace(",", "."))) > 100.0) {
        $(this).val(100);
    }
}).change();
