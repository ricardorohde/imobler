var condFechado = false;
var isVertical = false;
var isAtualPosicaoImovelVertical = false;
var b_alterando_tipo_do_imovel = false;
var condObj = {};
var edfObj = {};

$(function () {

    isAtualPosicaoImovelVertical = ParseBool($("#cboTipo").find(':selected').attr('rel'));
    idAtualTipoImovel = $("#cboTipo").val();

    // adiciona a fancy box para os botões que adicionam novo empreendimento
    $("#addCondominioImovel").fancybox({ type: 'iframe' });
    $("#addEdificioImovel").fancybox({ type: 'iframe' });


    $("#txEdificio").change(function () {
        condFechado = ParseBool($("#cboCondominioFechado").val());
        var valorDoCampo = TryParseInt($(this).val(), 0);
        if (valorDoCampo > 0 && TryParseInt($('#hdIdEdificioAlt').val(), 0) != valorDoCampo) {
            LoadFancyBoxUnidades($(this).val());
        }
    });

    // DETALHES DINÂMICO
    $("#cboTipo").change(function () {
        tipoImovel = TryParseInt($(this).val(), 0);
        isVertical = ParseBool($("#cboTipo").find(':selected').attr('rel'));

        // dados principais do imóvel
        GerenciaCamposDadosPrimarios();

        // condominio
        GerenciaApresentacaoCampoCondominioFechado();

        // troca tipo do imovel
        if (b_alterando_tipo_do_imovel) {
            GerenciaCancelarTroca(true);
            ClearTituloSite();
            $(this).attr("disabled", true);
        }
    });

    ///////////////////////// TROCA TIPO DO IMÓVEL

    $('#lnkCancelarTrocaTipo').click(function () {

        $("#cboTipo").select2("val", idAtualTipoImovel).attr('disabled', true);

        GerenciaCancelarTroca(false);
        GerenciaBtnTrocaTipo(true);

        BackEstadoEmpreendimento();
        GerenciaCamposDadosPrimarios(idAtualTipoImovel);

        return (false);
    });

    $('#lnkTrocaTipo').click(function () {
        window.top.bootbox.dialog({
            title: "Alteração do tipo do imóvel",
            message: "<p>Dependendo do novo tipo de imóvel escolhido, alguns detalhes não serão utilizados. Ex: Título do imóvel no site, detalhes, etc.<br><br><p>Deseja continuar?</p>",
            buttons: {
                danger: {
                    label: "<strong>Sim</strong>",
                    className: "btn-danger",
                    callback: function () { habilitaTrocaTipoImovel(); }
                },
                main: {
                    label: "<strong>Não</strong>",
                    className: "btn",
                    callback: function () { }
                }
            }
        });

        return (false);
    });

    var BackEstadoEmpreendimento = function () {

        if (condObj.value > 0) {
            $(".condominio").find("input[id=cboCondominioFechado]").val(condObj.condFechado);
            $(".condominio").find("input[id=hdIdCondominioAlt]").val(condObj.value);
            $(".condominio").find("input[id=cboCondominioStatus]").val(condObj.condStatus);
            $(".condominio").find("input[id=txCondominio]").val(condObj.value);
        }

        if (edfObj.value > 0) {
            $(".edificio").find("label").show();
            $(".edificio").find("select[id=txEdificio]").select2("val", edfObj.value);
            $(".edificio").find("input[id=hdIdEdificioAlt]").val(edfObj.value);
        }

        if (condObj.value > 0 || edfObj.value > 0) AtualizaCondominio(condObj.value, edfObj.value);
    }

    var GerenciaCancelarTroca = function (show) {
        if (show)
            $('#lnkCancelarTrocaTipo').closest('label').show();
        else
            $('#lnkCancelarTrocaTipo').closest('label').hide();
    }

    var GerenciaBtnTrocaTipo = function (show) {
        if (show)
            $('#lnkTrocaTipo').closest('label').show();
        else
            $('#lnkTrocaTipo').closest('label').hide();
    }

    var populaFieldTipos = function (tipos) {

        var tipoAtual = $("#cboTipo").val();
        var itens = '';
        var fl_lst_contains_tipo_atual = false;

        // Verifica se nos tipos retornados existe o tipo atual.
        for (var i = 0; i < tipos.length; i++) if (tipoAtual == tipos[i].id_tipo) fl_lst_contains_tipo_atual = true;

        for (var i = 0; i < tipos.length; i++) {

            if (fl_lst_contains_tipo_atual) {

                if (tipoAtual == tipos[i].id_tipo)
                    itens += "<option value='" + tipos[i].id_tipo + "' selected='selected' rel='" + ((tipos[i].fl_vertical == 1) ? "true" : "false") + "'>" + tipos[i].tx_tipo + "</option>";
                else
                    itens += "<option value='" + tipos[i].id_tipo + "' rel='" + ((tipos[i].fl_vertical == 1) ? "true" : "false") + "'>" + tipos[i].tx_tipo + "</option>";
            } else {

                if (i == 0)
                    itens += "<option value='" + tipos[i].id_tipo + "' selected='selected' rel='" + ((tipos[i].fl_vertical == 1) ? "true" : "false") + "'>" + tipos[i].tx_tipo + "</option>";
                else
                    itens += "<option value='" + tipos[i].id_tipo + "' rel='" + ((tipos[i].fl_vertical == 1) ? "true" : "false") + "'>" + tipos[i].tx_tipo + "</option>";
            }

        }

        $('#cboTipo').attr('disabled', false);
        $('#cboTipo').html(itens);

        // Se não possuir o tipo que estava selecionado, precisamos atualizar o dropdown para listar o tipo correto.
        if (!fl_lst_contains_tipo_atual) {
            $('#cboTipo').change();
            b_exibe_cancelamento_tipo_imovel = false;
        }
    }

    var habilitaTrocaTipoImovel = function () {
        $.ajax({
            type: "POST",
            url: "json/imovel/troca-tipo/get-tipos-troca.ashx?imovel=" + $('#idImovel').val(),
            beforeSend: function () { GerenciaBtnTrocaTipo(false); },
            dataType: 'json',
            success: function (resposta) {
                if (resposta.length > 0) {
                    populaFieldTipos(resposta);
                    GerenciaBtnTrocaTipo(false);

                    b_alterando_tipo_do_imovel = true;
                }
                else {
                    GerenciaBtnTrocaTipo(true);
                    alert("Nenhum tipo encontrado para a finalidade.");
                }
            },
            error: function (msg) {
                GerenciaBtnTrocaTipo(true);
                alert("Falha ao tentar carregar os tipos permitidos.");
            }
        });
    }

    ///////////////////////////////////


    $('#cboFinalidade').change(function () {
        var cboTipoAlterar = $('#cboTipo');
        var valorDoCampo = TryParseInt(cboTipoAlterar.val(), 0);

        var id_condominio = $('#hdCodCondominioNovo').val();
        var id_edificio = $("#txEdificio option:selected").val();

        if (TryParseInt($('#hdIsAlteracao').val(), 0) == 0) {
            if ($('#cboFinalidade').val() > 0) {
                $.ajax({
                    type: 'POST'
                    , url: 'json/jsonTipo.ashx'
                    , data: 'tipo=novo_imovel&finalidade=' + $('#cboFinalidade').val()
                    , dataType: 'json'
                    , beforeSend: function () {
                        $('#cboFinalidade').prop('disabled', true);
                        cboTipoAlterar.empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
                    }
                    , success: function (json) {
                        num = json.properties.length;

                        newHtml = "<option value='0'>Selecione</option>";

                        for (i = 0; i < num; i++)
                            newHtml += "<option rel='" + json.properties[i].rel + "' value='" + json.properties[i].value + "' " + ((valorDoCampo == json.properties[i].value) ? "selected=selected" : "") + " > " + json.properties[i].text + " </option>";

                        cboTipoAlterar.empty().html(newHtml).prop('disabled', false);
                        $('#cboFinalidade').prop('disabled', false);

                        //caso o usuário troque a finalidade repopula o tipo  e select com o que esta no hidden
                        $('#cboTipo').val(valorDoCampo).change();
                    }
                    , error: function () {
                        alert('Falha ao carregar os dados!');
                    }
                });
            }
        } else {
            //caso o usuário troque a finalidade repopula o tipo  e select com o que esta no hidden
            $('#cboTipo').val(valorDoCampo).change();
        }

        if (TryParseInt(id_condominio, 0)) {
            AtualizaCondominio(id_condominio, id_edificio);
        }

        validaCamposObrigatoriosFinalidadeTipo();
        validaCamposObrigatoriosFinalidade($(this).val());
    });
    
    if ($('#cboFinalidade').val() == 5) {
        $("#txAcomodaQtdPessoas").parent().show();
    } else {
        $("#txAcomodaQtdPessoas").parent().hide();
    }
    
    $("#cboFinalidade").select2({ width: '120px' });
    $("#cboTipo").select2({ width: '150px' });
    $('#txEdificio').select2({ width: '240px', placeholder: "Selecione edifício, bloco ou torre" });

    var lblPlaceHolder = "Selecione um empreendimento";
    if (TryParseInt($("#idImovel").val(), 0) > 0 && $('#hdIdCondominioAlt').val() == "0") {
        lblPlaceHolder = "Não está em condomínio";
    }

    $("#txCondominio").select2({
        width: '250px',
        placeholder: lblPlaceHolder,
        allowClear: true,
        minimumInputLength: 3,
        multiple: false,
        quietMillis: 100,
        id: function (codominio) { return { id: codominio.id_empreendimento }; },
        formatResult: formatEmpreendimentoResult, // omitted for brevity, see the source of this page
        formatSelection: formatEmpreendimentoSelected, // omitted for brevity, see the source of this page
        ajax: {
            url: "json/jsonEmpreendimento.ashx",
            dataType: 'json',
            quietMillis: 250,
            data: function (term, page) { // page is the one-based page number tracked by Select2
                return {
                    q: term, //search term
                    page_limit: 20, // page size
                    page: page, // page number
                    vertical: $("#cboTipo").find(':selected').attr('rel')
                };
            },
            results: function (data, page) {
                var more = (page * 20) < data.total; // whether or not there are more results available

                // notice we return the value of more so Select2 knows if more results can be loaded
                return { results: data.condominios, more: more };
            }
        }
    }).on("select2-removed", function (e) {
        LimpaCamposDeCondominio();
    }).on('select2-selecting', function (e) {
        selecaoCondominio(e.object);
    });

    function formatEmpreendimentoResult(codominio) {
        var strHtml = "<div id='id_empredimento_" + codominio.id_empreendimento + "' class='select2-option-empredimento'>"
        strHtml += "<div class='tx_tipo_condominio'>" + codominio.tx_tipo_condominio + "</div>";
        strHtml += "<div class='tx_nome'>" + codominio.tx_nome + "</div>";
        strHtml += "<div class='endereco_1'>" + codominio.tx_bairro + " - " + codominio.tx_cidade + "/" + codominio.tx_uf + "</div>";
        strHtml += "<div class='endereco_2'>" + codominio.tx_logradouro_tipo + " " + codominio.tx_logradouro + ", " + codominio.in_numero + "</div>";
        strHtml += "</div>";

        return strHtml;
    }

    function formatEmpreendimentoSelected(codominio) {
        return codominio.tx_nome;
    }

    function selecaoCondominio(data) {
        condFechado = (data.tx_tipo_condominio == "Condomínio");
        isVertical = ParseBool($("#cboTipo").find(':selected').attr('rel'));

        $("#cboCondominioFechado").val(condFechado);
        $("#hdCodCondominioNovo").val(data.id_empreendimento);
        $("#txEdificio").empty().append('<option value="0">Selecione edifício, bloco ou torre</option>');

        if (condFechado) {
            $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio:");
            $("#txCondominio").parent().next().find('a').text('Adicionar condomínio');
        } else {
            $("#txCondominio").parent().find(".italicRequired").text("Nome do edifício/bloco/torre:");
            $("#txCondominio").parent().next().find('a').text('Adicionar edifício');
        }

        if (isVertical) LoadEndereco(data.id_empreendimento);

        if (condFechado && isVertical) {
            GerenciaFieldEdificio(true);
            GerenciaEmpreendimentoEdf(data.id_empreendimento);
        } else {
            GerenciaFieldEdificio(false);

            $("#txEdificio").empty()
                            .append('<option value="0">Selecione edifício, bloco ou torre</option>');
            $("#txEdificio").append("<option value='" + data.id_empreendimento + "'>" + data.tx_nome + "</option>");
            $("#txEdificio").find("option[value='" + data.id_empreendimento + "']").prop('selected', true).change();
        }

        gerenciaApresentacaoCamposBox();
    }

    //Na edição deve carregar o condominio e o edificio
    if ($('#hdIdCondominioAlt').val() > 0) {
        AtualizaCondominio($('#hdIdCondominioAlt').val(), $("#txEdificio option:selected").val());
    } else {
        $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio/edifício:");
        $("#txCondominio").parent().next().find('a').text('Adicionar condomínio/edifício');
        GerenciaFieldEdificio(false);
    }
});

function AtualizaCondominio(idCondominio, idEdificio) {

    $.ajax({
        type: 'POST'
	        , url: "json/jsonEmpreendimento.ashx"
	        , data: 'idEmpreendimento=' + idCondominio
	        , dataType: 'json'
	        , beforeSend: function () {
	            $('#txCondominio').select2('data', { id_empreendimento: 0, tx_nome: "Carregando..." });
	        }
	        , success: function (data) {
	            if (data.sucesso) {
	                $('#txCondominio').select2('data', data.condominios[0]);
	                isVertical = ParseBool($("#cboTipo").find(':selected').attr('rel'));
	                condFechado = (data.condominios[0].tx_tipo_condominio == "Condomínio");
	                $("#cboCondominioFechado").val(condFechado);
	                $("#hdCodCondominioNovo").val(data.condominios[0].id_empreendimento);

	                if (condFechado) {
	                    $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio:");
	                    $("#txCondominio").parent().next().find('a').text('Adicionar condomínio');
	                } else {
	                    $("#txCondominio").parent().find(".italicRequired").text("Nome do edifício/bloco/torre:");
	                    $("#txCondominio").parent().next().find('a').text('Adicionar edifício');
	                }

	                if (isVertical && condFechado) {
	                    GerenciaFieldEdificio(true);
	                    GerenciaEmpreendimentoEdf(idCondominio);
	                    if (idEdificio !== "0") {
	                        $("#txEdificio").find("option[value='" + idEdificio + "']").prop('selected', true);
	                    }
	                } else {
	                    GerenciaFieldEdificio(false);
	                    $("#txEdificio").empty().append('<option value="0">Selecione edifício, bloco ou torre</option>');
	                    $("#txEdificio").append("<option value='" + data.condominios[0].id_empreendimento + "'>" + data.condominios[0].id_empreendimento + "</option>");
	                    $("#txEdificio").find("option[value='" + data.condominios[0].id_empreendimento + "']").prop('selected', true);//.change();
	                }
	            }
	        }
	        , error: function () {
	            jAlert('Falha ao carregar os dados!');
	        }
    });
}

function LimpaCamposDeCondominio() {
    condFechado = false;

    $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio/edifício:");
    $("#txCondominio").parent().next().find('a').text('Adicionar condomínio/edifício');

    $("#cboCondominioFechado").val(condFechado);
    $("#hdCodCondominioNovo").val("");
    $("#txEdificio").empty().append('<option value="0">Selecione edifício, bloco ou torre</option>');

    GerenciaFieldEdificio(false);
    gerenciaApresentacaoCamposBox();

    if (IdentityImovel == 0)
        VoltaConsultaLogradouroEstadoOriginal();
}

function GerenciaValorCondominio() {

    if ($("#txCondominio").parent().is(":visible") || $("#txEdificio").parent().is(":visible"))
        $("#txValorCondominio").parent().show();
    else
        $("#txValorCondominio").parent().hide();
}

function GerenciaFieldEdificio(apresenta) {

    $('#txEdificio').val("0").change();
    if (apresenta) {
        $('#txEdificio').parent().show();
        $('#addEdificioImovel').show();
    } else {
        $('#txEdificio').parent().hide();
        $('#addEdificioImovel').hide();
    }
    GerenciaValorCondominio();
}

function ObtemEmpreendimentoParaCarregarEndereco() {
    if (isVertical) {
        if (condFechado)
            return $("#txCondominio");
        else
            return $("#txEdificio");
    } else {
        return $("#txCondominio");
    }
}

function ObtemIdCondominioParaCarregarEdificio() {
    var condDeEdf = ParseBool($("#cboCondominioFechado").val());

    if (isVertical && condDeEdf && ($("#txCondominio").select2("data") != null)) {
        return $("#txCondominio").select2("data").id_empreendimento;
    }

    return null;
}

function GerenciaFieldCondominio(apresenta) {
    if ($("#hdCodCondominioNovo").val() != "") {
        if (condFechado) {
            $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio:");
            $("#txCondominio").parent().next().find('a').text('Adicionar condomínio');
        } else {
            $("#txCondominio").parent().find(".italicRequired").text("Nome do edifício/bloco/torre:");
            $("#txCondominio").parent().next().find('a').text('Adicionar edifício');
        }
    } else {
        $("#txCondominio").parent().find(".italicRequired").text("Nome do condomínio/edifício:");
        $("#txCondominio").parent().next().find('a').text('Adicionar condomínio/edifício');
    }

    $('#txCondominio').select2("val", "").trigger("change");

    if (apresenta) {
        $('#txCondominio').parent().show();
        $('#addCondominioImovel').show();
    } else {
        $('#txCondominio').parent().hide();
        $('#addCondominioImovel').hide();
    }

    GerenciaValorCondominio();
}

//carregar edificio quando:
//    selecionar um condomínio.
//    seleciona um tipo de imóvel vertical sem condomínio de edificio
function GerenciaEmpreendimentoEdf(IdCondominio) {
    var obj = $("#txEdificio");
    var htmlOption = "<option value='0'>Selecione edifício, bloco ou torre</option>";
    var isBlock = true;

    if ($('#txEdificio').is('[disabled]'))
        isBlock = false;

    // realizar ajax quando: condomínio maior que zero e imovel vertical ou imovel vertical e não ser cond. fechado
    if ((IdCondominio > 0 && isVertical) || (isVertical && !condFechado)) {
        $.ajax({
            url: 'json/jsonEdificio.ashx',
            type: 'POST',
            async: false,
            data: 'idEmpreendimentoPai=' + IdCondominio,
            beforeSend: function () {
                obj.empty().append("<option value='0'>carregando...</option>");
                obj.select2("readonly", true);
                obj.trigger('change');
            },
            dataType: 'json',
            async: false,
            success: function (resp, textStatus, jqXHR) {
                // quando o campo é bloqueado para o usuário o mesmo não poderá ser habilitado para edição
                if (isBlock)
                    obj.select2("readonly", false);

                for (i = 0; i < resp.length; i++) {
                    if (TryParseInt($('#hdIdEdificioAlt').val(), 0) == resp[i].id)
                        htmlOption += "<option value='" + resp[i].id + "' selected='selected'> " + resp[i].texto + " </option>";
                    else
                        htmlOption += "<option value='" + resp[i].id + "'> " + resp[i].texto + " </option>";
                }

                obj.empty().append(htmlOption);
                obj.trigger('change');
            },
            error: function (a, c, b) {
                console.log('Erro ao carregar edificios.');
            }
        });
    } else {
        obj.empty().append(htmlOption);
        obj.trigger('change');
    }
}

function EscolheUnidadeCondominio(valor) {

    if (valor > 0) {
        $.fancybox({
            type: 'iframe'
          //, width: '80%'
          //, height: '50%'
          , href: 'modules/imoveis_beta/empreendimento-escolhe-unidade.aspx?idEmpreendimento=' + valor + '&tipoImovel=' + $('#cboTipo').val()
          , showCloseButton: false
        });
    }
    return (false);
}

function EscolheUnidadeEdificio(valor) {
    if (valor > 0) {
        $.fancybox({
            type: 'iframe'
          //, width: '60%'
          //, height: '50%'
          , href: 'modules/imoveis_beta/empreendimento-escolhe-unidade.aspx?idEmpreendimento=' + valor + '&tipoImovel=' + $('#cboTipo').val()
          , showCloseButton: true
        });
    }
    return (false);
}

function LoadEndereco(valor) {
    if (valor > 0) {
        $.ajax({
            url: 'json/dadosEmpreendimentoEndereco.ashx',
            data: 'idEmpreendimento=' + valor,
            dataType: 'json',
            type: 'POST',
            beforeSend: function () { },
            success: function (json) {

                if (json.address[0].id_logradouro > 0 && json.address[0].id_bairro_comercial > 0) {
                    $("#endereco").val(json.address[0].tx_logradouro_tipo + " " + json.address[0].tx_logradouro);
                    $("#bairro").val(json.address[0].tx_bairro);
                    $("#cidade").val(json.address[0].tx_cidade);
                    $("#cep").val(json.address[0].in_cep);
                    $("#estado").val(json.address[0].tx_estado);
                    $("#numero").val(json.address[0].in_numero);
                    $("#idLogradouro").val(json.address[0].id_logradouro);
                    $("#hdCoordenadas").val(json.address[0].dl_latitude.replace(",", ".") + "," + json.address[0].dl_longitude.replace(",", "."));

                    $("#endereco, #bairro, #bairro_comercial, #cidade, #cep, #estado, #numero, #complemento, #idLogradouro, #ponto_referencia").parent().show();
                    if (json.praias.length > 0) $("#cboPraia").parent().show();
                    $(".boxFields").parent().show();

                    $("#endereco, #bairro, #cidade, #cep, #estado").prop('disabled', true);

                    $(".buscaCEPbox, #lstMetros").hide();

                    $("#bairro_comercial").append(LoadBairroComercial(json.address[0].id_bairro_comercial, json.bairros));
                    $("#cboQuilometro").append(LoadRodoviaKm(json.quilometros));
                    $("#cboPraia").append(LoadPraia(json.praias));

                    if (isVertical) {
                        if (!condFechado) {
                            $(".changeAddress").parent().hide();
                            $("#numero").prop('disabled', true);
                        } else {
                            $(".changeAddress").parent().show();
                            $("#numero").prop('disabled', false);
                        }
                    } else {
                        $(".changeAddress").parent().show();
                        $("#numero").prop('disabled', false);
                    }
                }
                else {
                    VoltaConsultaLogradouroEstadoOriginal();
                }
            },
            error: function (json, e) {
                VoltaConsultaLogradouroEstadoOriginal();
            }
        });
    }
}

function LoadFancyBoxUnidades(valor) {
    
    $.ajax({
        url: 'json/jsonVerificaUnidadeEmpreendimento.ashx',
        data: 'idEmpreendimento=' + valor + '&tipo=' + $('#cboTipo').val(),
        dataType: 'json',
        type: 'POST',
        beforeSend: function () {
            jLoading();
        },
        success: function (json) {

            $.unblockUI();

            if (json.in_unidade > 0) {
                if (isVertical) {
                    EscolheUnidadeEdificio(valor);
                }
                else {
                    EscolheUnidadeCondominio(valor);
                }
            }
            else {
                if (json.show_message == 1) {
                    if (isVertical) {
                        jAlert('Nenhuma unidade cadastrada para este Nome do edifício/bloco/torre.');
                    } else {
                        jAlert('Nenhuma unidade cadastrada para este Nome do condomínio/edifício.');
                    }
                }
            }
        },
        error: function () {
            $.unblockUI();
        }
    });
}

function saveDataEmpreendimento() {
    condObj = {
        condFechado: $("#cboCondominioFechado").val(),
        value: $("#hdIdCondominioAlt").val(),
        condStatus: $("#cboCondominioStatus").val()
    }

    edfObj = {
        name: $("#hdNomeEdificio").val(),
        value: $("#hdIdEdificioAlt").val()
    }
}

function GerenciaApresentacaoCampoCondominioFechado() {

    saveDataEmpreendimento();

    if (!b_alterando_tipo_do_imovel) LimpaCamposDeCondominio();

    if (tipoImovel == 0) {
        $("#cboCondominioFechado").val("false");
        GerenciaFieldCondominio(false);
    }
        // ilha, Fazenda, Ponto /////////////////////// validar
    else if (tipoImovel == 33 || tipoImovel == 11 || tipoImovel == 15) {
        $("#cboCondominioFechado").val("false");
        GerenciaFieldCondominio(false);
    }
    else {
        if (!b_alterando_tipo_do_imovel) GerenciaFieldCondominio(true);
    }

    // trocando tipo do imóvel
    if (b_alterando_tipo_do_imovel) {

        if (isAtualPosicaoImovelVertical && isVertical == false && ParseBool($("#cboCondominioFechado").val()) == false) {
            LimpaCamposDeCondominio();
            GerenciaFieldCondominio(true);
        } else if (isAtualPosicaoImovelVertical && isVertical == false && ParseBool($("#cboCondominioFechado").val()) == true) {
            $(".edificio").find("label").hide();
            $(".edificio").find("input[id=hdNomeEdificio]").val("");
            $(".edificio").find("input[id=hdIdEdificioAlt]").val(0);
        }
    }
}

function gerenciaApresentacaoCamposBox() {

    tipo = TryParseInt($("#cboTipo").val(), 0);
    IdentityCondominio = TryParseInt($('#hdIdCondominioAlt').val(), 0);
    IdentityEdificio = TryParseInt($('#hdIdEdificioAlt').val(), 0);
    IdentityCondominioNovo = TryParseInt($('#hdCodCondominioNovo').val(), 0);
    show = (tipo == 42 && (IdentityCondominio > 0 || IdentityEdificio > 0 || IdentityCondominioNovo > 0)) || tipo != 42;

    if (show) {
        $("#fl_elevador").parent().show();
        $("#in_andares").parent().show();
        $("#in_andar").parent().show();
    }
    else {
        $("#fl_elevador").parent().hide();
        $("#in_andares").parent().hide();
        $("#in_andar").parent().hide();
    }
}

function GerenciaCamposDadosPrimarios() {

    tipo = TryParseInt($("#cboTipo").val(), 0);

    // monta detalhes e gerencia campos base
    GerenciaDetalhes(tipo);

    // documentação no imóvel
    GerenciaDocumentacao();

    // nome campo rural
    GerenciaNomeCampoImovelRural(tipo);

    // ilha
    GerenciaApresentacaoNomeIlha(tipo);

    // prefeitura
    GerenciaNomeCampoPrefeitura(tipo);

    if (tipo == 0 || tipo == 33 || tipo == 11 || tipo == 15) {
        $("#cboCondominioFechado").val("false");
        GerenciaFieldCondominio(false);
    }

    if (tipo == 42) GerenciaFildPadrao(false); else GerenciaFildPadrao(true);
}