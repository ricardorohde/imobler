// JavaScript Document
$('#tabsUnidades').tabs();

function changeType(id) {
    $('#idTipoNumeracao').val(id);
    if (id == 1)
        $('li.stack a').eq(0).html('N&uacute;mero');
    else if (id == 2)
        $('li.stack a').eq(0).html('Lote');
    $('ul#navigation li ul li').hide();
}

$(document).ready(function () {

    $("#cboStatus").blur(function () {
        ShowDocumentacaoStatus();
    });

    $("#cboStatusComercial").change(function () {
        if ($(this).val() == 0) {
            $("#cboStatus").parent().hide();
            $("#cboStatus1").parent().hide();
        } else if ($(this).val() == 1) {
            $("#cboStatus").parent().hide();
            $("#cboStatus1").parent().hide();
            $("#cboStatus1").html('<option value="1" selected="selected">Padrão</option>');
            $("select[name=cboStatus1]").attr('id', 'cboStatus');
            $("select[name=cboStatus]").attr('id', 'cboStatus1');
        } else {
            $("select[name=cboStatus]").attr('id', 'cboStatus');
            $("select[name=cboStatus1]").attr('id', 'cboStatus1');
            $("#cboStatus1").parent().hide();
            $("#cboStatus").parent().show();
            $("#cboStatus").val(2);
        }
    });

    if ($("#cboStatusComercial").val() == 1 || $("#cboStatusComercial").val() == 0) {
        $("#cboStatus").parent().hide();
        $("#cboStatus1").parent().hide();
    } else {
        $("#cboStatus1").parent().hide();
        $("#cboStatus").parent().show();
    }

    var texto = $.trim($('input[id=numero]').parent().text());
    var html = $('input[id=numero]').parent().html();
    var dropdownlabel = '<ul id="navigation"><li><a href="#">N&uacute;mero</a><ul><li><a href="#" onclick="javascript:changeType(1);">N&uacute;mero</a></li><li><a href="#" onclick="javascript:changeType(2);">Lote</a></li></ul></li></ul>';
    html = html.replace(texto, dropdownlabel);
    $('input[id=numero]').parent().html(html);

    $("#navigation").navPlugin({
        'itemWidth': 75,
        'itemHeight': 20,
        'navEffect': "slide",
        'speed': 100
    });

    changeType($('#idTipoNumeracao').val());
    //$('input[id=numero]').parent('label').css('width', '55px');

    PopulaAbas();
    AtualizaIndicesTorres();
    excluirUnidades();
    addEvento();
    Fancybox();
    regrasTorre();
    ShowHideDetalhes();
    $("#detalhe_199").click(function () {
        ShowHideDetalhes();
    });

    $("#lknTrocaTipoEmpreendimento").click(function () {
        gerenciaTrocaCondominio();
        return (false);
    });


    var gerenciaTrocaCondominio = function () {

        var isEdificio = ParseBool($("#cboTipoC").val());
        var isUnidadeHorizontal = ParseBool($("#hdUnidadesInconsistenteTroca").val());

        var messagem = "Deseja realmente alterar este " + ((isEdificio) ? "Edifício" : "Condomínio") + " para <strong>" + ((isEdificio) ? "Condomínio" : "Edifício") + "</strong>?";

        if (!isEdificio && isUnidadeHorizontal) {
            messagem += "<p>Neste " + ((isEdificio) ? "Edifício" : "condomínio") + " há unidades incompatíveis com " + ((isEdificio) ? "condomínio" : "edifício") + " que não serão migradas.</p>";
        }

        window.top.bootbox.dialog({
            title: "Alteração para " + ((isEdificio) ? "condomínio" : "edifício") + "",
            message: messagem,
            buttons: {
                danger: {
                    label: "<strong>Sim</strong>",
                    className: "btn-danger",
                    callback: function () {
                        var parameter = "empreendimentoId=" + $("#hdIdEmpreendimento").val();

                        $.post("modules/empreendimentos/empreendimento-troca-tipo.ashx?MS=" + fnNoCache(), parameter, function (rspst, status, jdXHR) { }, "json")
                             .done(function (rspst) {
                                 if (rspst.sucesso) {
                                     window.top.bootbox.dialog({
                                         title: "Alteração de tipo de empreendimento",
                                         message: "A troca está sendo realizada e será concluída em instantes. Você será direcionado para a consulta de empreendimentos.",
                                         buttons: { main: { label: "<strong>Ok</strong>", className: "btn", callback: function () { newWindow("modules/empreendimentos/empreendimento.aspx"); } } }
                                     });
                                 } else {
                                     window.top.bootbox.dialog({
                                         title: "Alteração de tipo de empreendimento",
                                         message: rspst.erro[0].mensagem,
                                         buttons: { main: { label: "<strong>Ok</strong>", className: "btn", callback: function () { } } }
                                     });
                                 }
                             })
                             .fail(function () {
                                 window.top.bootbox.dialog({
                                     title: "Alteração de tipo de empreendimento",
                                     message: "Falha ao tentar configurar troca do tipo do empreendimento. Tente mais tarde.",
                                     buttons: { main: { label: "<strong>Ok</strong>", className: "btn", callback: function () { } } }
                                 });
                             });
                    }
                },
                main: {
                    label: "<strong>Não</strong>",
                    className: "btn",
                    callback: function () { }
                }
            }
        });
    }

});

$('select#cboFases').change(function () {
    if ($('#cboTipoC').val() == 'true')
        $('.edificios').find('input[name^="cboFase_"]').val($(this).val());
});

function PopulaAbas() {
    if ($('#tabsUnidades li[id|="teste"]').length == 1)
        $('#tabsUnidades').tabs('remove', 0);

    $("input[id^='chkTipoCond']").each(function () {
        //return false;
        if ($(this).prop('checked')) {
            var textBotaoAddTorre = '';
            //Verifica qual Aba deve criar
            switch ($(this).val()) {
                case '2':
                    classAba = 'casas';
                    //textBotaoAddTorre = 'Adicionar um novo residencial';
                    break;
                case '3':
                    classAba = 'predios';
                    textBotaoAddTorre = 'Adicionar uma nova torre, bloco ou edif&iacute;cio nesse condom&iacute;nio';
                    break;
                case '4':
                    classAba = 'predios';
                    textBotaoAddTorre = 'Adicionar uma nova torre, bloco ou edif&iacute;cio nesse condom&iacute;nio';
                    break;
                case '5':
                    classAba = 'terrenos';
                    break;
                case '6':
                    classAba = 'terrenos';
                    break;
                case '7':
                    classAba = 'terrenos';
                    break;
                case '8':
                    classAba = 'edificios';
                    break;
                case '9':
                    classAba = 'edificios';
                    break;
                case '11':
                    classAba = 'galpao';
                    //textBotaoAddTorre = 'Adicionar um novo bloco';
                    break;
                case '12':
                    classAba = 'industriais';
                    //textBotaoAddTorre = 'Adicionar um novo bloco';
                    break;
                default:
                    return;
            }

            if ($('#tabsUnidades').find('#' + classAba).length == 0) {
                $('#tabsUnidades').append('<div id="' + classAba + '"></div>');
                $('#tabsUnidades').tabs('add', '#' + classAba, $(this).parent().text(), $('#tabsUnidades div').length);

                if ($('#unidades').children('.' + classAba).length > 0) {
                    $('#unidades').children('.' + classAba).show().prependTo('#' + classAba);
                    $('#' + classAba + ' .' + classAba).find('select[name^="cboFase_"]').change(function () {
                        if ($(this).val() == '1')
                            $(this).parent().next().hide();
                        else
                            $(this).parent().next().show();
                    });
                    $('#' + classAba + ' .' + classAba).find('select[name^="cboFase_"]').change();

                } else
                    addNovaTorre($('.' + classAba + ':eq(0)'), $('#' + classAba), textBotaoAddTorre);
            } else {
                $('#tabsUnidades ul li').find('a[href|="#' + classAba + '"]').find('span').html(labelAbas(classAba));
            }
            $('#tabsUnidades').find('div.' + classAba).find('input[id^="dtPrevisaoEntrega"]').mask('99/9999');

            $('#tabsUnidades').find('div.' + classAba).each(function () {
                var valor = getTipoCond(classAba);
                var indice = $(this).find('input[name^="txNome_"]').attr('id').split('_')[1];

                if ($(this).find('input[name^="txNome_"]').eq(0).parent().find('input[name^="hdTipoCond_"]').length == 0) {
                    $(this).find('input[name^="txNome_"]').eq(0).after('<input type="hidden" id="hdTipoCond_' + indice + '" name="hdTipoCond_' + indice + '" value="' + valor + '" />');
                }
                $(this).find('input[name^="hdUnidades"]').val($(this).find('.edfTable tr').length - 3);
            });
            //Adiciona link de nova torre
            if ($('#' + classAba).find('.linkAddTorre').length == 0) {
                var btnAddTorre = $('#fldTorres .linkAdd').eq($('#fldTorres .linkAdd').length - 1).clone();
                btnAddTorre.find('#linkAddTorre').html(textBotaoAddTorre);
                //Não exibe o botão de add Torre
                if (textBotaoAddTorre != "")
                    btnAddTorre.removeAttr("style");

                $('#' + classAba).append(btnAddTorre);
            }
            linkAddTorre();
        }
    });

    $('#hdTorres').val($('#tabsUnidades .edf').length);
}

$("#cepCidade").change(function () {

    blBloqueado = ($("#hdBloquearCampos").val() == "1");

    $.ajax({
        url: "json/pontodereferencia/metrosEmpreendimentos.ashx",
        type: "POST",
        data: "idCidade=" + $(this).val() + "&idEmpreendimento=" + $('#hdIdEmpreendimento').val(),
        dataType: "json",
        success: function (resp) {
            nMetros = resp.metros.length;
            if (nMetros > 0) {
                $("#lstMetros span").html("");
                var strRet = "";
                for (i = 0; i < nMetros; i++) {
                    var marque = (resp.metros[i].CHK != "") ? "checked=\"checked\"" : "";
                    strRet += "<label for=\"chkMetros" + resp.metros[i].id_ponto_referencia + "\">";
                    strRet += "<input type=\"checkbox\" " + marque + " id=\"chkMetros" + resp.metros[i].id_ponto_referencia + "\" value=\"" + resp.metros[i].id_ponto_referencia + "\" name=\"chkMetros\" " + ((blBloqueado) ? "disabled=\"disabled\"" : "") + " /> " + resp.metros[i].tx_ponto_referencia + "";
                    strRet += "</label>";
                }
                $("#lstMetros").show();
            }
            else {
                $("#lstMetros span").html("");
                $("#lstMetros").hide();
            }

            $("#lstMetros span").append(strRet);
        }
    });
}).change();

function PopulaTiposUnidades(IdTipo, obj) {
    var finalidade;
    if (IdTipo == "3" || IdTipo == "8")
        finalidade = "residencial";
    else if (IdTipo == "4" || IdTipo == "9")
        finalidade = "comercial";

    switch (finalidade) {
        case 'comercial':
            $(obj).append('<option value="15">Ponto</option><option value="17">Sala</option><option value="18">Sal&atilde;o</option><option value="26">Loja</option><option value="27">Conjunto</option><option value="29">Laje</option>');
            break;
        case 'residencial':
            $(obj).append('<option value="2">Apartamento</option><option value="22">Kitnet</option><option value="23">Flat</option><option value="24">Cobertura</option>');
            break;
    }
}
var changeCboTipoC = false;
var valTipoCond = $("#cboTipoC").val();
$(function () {
    $("#cboTipoC").change(function () {
        if (valTipoCond != '0') {
            if (confirm(unescape('A altera%E7%E3o desse campo pode resultar na exclus%E3o de torres e unidades.'))) {
                cond_edificio(this);
            } else {
                if ($('#cboTipoC').val() == 'true')
                    $('#cboTipoC').val('false');
                else
                    $('#cboTipoC').val('true');
            }
        } else {
            cond_edificio(this);
        }
        valTipoCond = $(this).val();
    });
    cond_edificio(false);
    $("#cboStatus").change(plantao).change();
    $("#cboFases").change(fase_construcao).change();
    excluirUnidades();
    addEvento();
    Fancybox();
    regrasTorre();
    changeCboTipoC = true;
});
function linkAddTorre() {
    $(".linkAddTorre").unbind().click(function () {
        var id = $(this).parent().parent().parent().attr('id');
        var obj = $('.' + id).eq(0);
        addNovaTorre($('.' + id).eq(0), $(this).parent().parent().parent(), '');
        return false;
    });
}
function addNovaTorre(o, obj, textBotaoAddTorre) {

    //Adiciona link de nova torre
    if (obj.find('.edf').length == 0 && obj.find('.linkAddTorre').length == 0) {
        var btnAddTorre = $('#fldTorres .linkAdd').eq($('#fldTorres .linkAdd').length - 1).clone();
        btnAddTorre.find('#linkAddTorre').html(textBotaoAddTorre);
        //Não exibe o botão de add Torre
        if (textBotaoAddTorre != "")
            btnAddTorre.removeAttr("style");

        obj.append(btnAddTorre);
    }

    var a = o.clone();
    a.removeAttr("style");

    var numeroTorres = $("#tabsUnidades .edf").length;
    $(a).find("input, select, .linkAddUnidade").each(function () {
        if ($(this).attr("class") == "linkAddUnidade") {
            $(this).attr('href', $(this).attr('href').split('=')[0] + '=' + numeroTorres);
        } else {
            $(this).attr("id", $(this).attr("id") + "_" + numeroTorres);
            $(this).attr("name", $(this).attr("id"));
        }
    });

    if (a.attr('class').indexOf('edificios') >= 0)
        a.find('input[name^="cboFase_"]').val($('#cboFases').val());

    obj.find('.linkAdd').before(a);
    obj.find("#txAndares_" + numeroTorres).maskNumber();
    obj.find("#txUnidadesAndar_" + numeroTorres).maskNumber();

    obj.find("#dtPrevisaoEntrega_" + numeroTorres).mask("99/9999");
    obj.find("#dtPrevisaoEntrega_" + numeroTorres).parent().hide();
    obj.find('#cboFase_' + numeroTorres).change(function () {
        if ($(this).val() == '1')
            $(this).parent().next().hide();
        else
            $(this).parent().next().show();
    });
    $("#hdTorres").val($("#tabsUnidades .edf").length);

    if ($(obj).find('.edf').length > 1) {
        if (confirm('Incluir os mesmos dados da torre anterior?')) {
            //Descobre o indice
            var indiceDuplica = validaTorreInformada(obj);
            //Duplica as informações
            if (indiceDuplica >= 0)
                duplicaInformacoesTorre(indiceDuplica);
        }
    }

    Fancybox();
    addEvento();
    regrasTorre();
    regrasTiposUnidades();
    //var indice = obj.find('.edf').length - 1;
    var valor = getTipoCond($('#tabsUnidades').find('#txNome_' + numeroTorres).parent().parent().parent().attr('id'));
    if ($('#tabsUnidades').find('#txNome_' + numeroTorres).eq(0).parent().find('input[name^="hdTipoCond_"]').length == 0)
        $('#tabsUnidades').find('#txNome_' + numeroTorres).eq(0).after('<input type="hidden" id="hdTipoCond_' + numeroTorres + '" name="hdTipoCond_' + numeroTorres + '" value="' + valor + '" />');
}
function getTipoCond(classAba) {
    var array = new Array('3/predios', '4/predios', '2/casas', '5/terrenos', '6/terrenos', '7/terrenos', '8/edificios', '9/edificios', '11/galpao', '12/industriais');
    for (x in array) {
        var split = array[x].split('/');
        if (classAba == split[1])
            return split[0];
    }

    return '';
}
function validaTorreInformada(obj) {
    var indice = -1;
    indice = parseInt($(obj).find('.edf').eq($(obj).find('.edf').length - 2).find('input[id^="txNome"]').attr('name').split('_')[1]);
    return indice;
}
$("input[id^='chkTipoCond']").unbind().change(function () {

    var criaAba = false;
    var classAba = '';
    var textBotaoAddTorre = '';
    if ($('#tabsUnidades li[id|="teste"]').length == 1)
        $('#tabsUnidades').tabs('remove', 0);

    //Verifica qual Aba deve criar
    switch ($(this).val()) {
        case '3':
            classAba = 'predios';
            textBotaoAddTorre = 'Adicionar uma nova torre, bloco ou edif&iacute;cio nesse condom&iacute;nio';
            break;
        case '4':
            classAba = 'predios';
            textBotaoAddTorre = 'Adicionar uma nova torre, bloco ou edif&iacute;cio nesse condom&iacute;nio';
            break;
        case '2':
            classAba = 'casas';
            //textBotaoAddTorre = 'Adicionar um novo residencial';
            break;
        case '7':
            classAba = 'terrenos';
            break;
        case '6':
            classAba = 'terrenos';
            break;
        case '5':
            classAba = 'terrenos';
            break;
        case '8':
            classAba = 'edificios';
            break;
        case '9':
            classAba = 'edificios';
            break;
        case '11':
            classAba = 'galpao';
            break;
        case '12':
            classAba = 'industriais';
            break;
        default:
            return;
    }

    if ($(this).prop('checked')) {
        regrasTipos($(this));

        if ($('#' + classAba).length == 0) {
            //Adiciona na Aba
            $('#tabsUnidades').tabs('add', '#' + classAba, $(this).parent().text(), $('#tabsUnidades div').length);
        } else {
            $('#tabsUnidades ul li').find('a[href|="#' + classAba + '"]').find('span').html(labelAbas(classAba));
        }

        if ($('#tabsUnidades .' + classAba).length == 0) {
            //Insere nova Torre
            addNovaTorre($('.' + classAba + ':eq(0)'), $('#' + classAba), textBotaoAddTorre);
            linkAddTorre();
        }
    } else {
        //Remove Aba
        if (VerificaRemocaoAba(classAba)) {
            //Verifica se tem algum vinculo
            var objRetorno = checkLinkUnits(classAba);
            if (objRetorno == '') {
                $('#tabsUnidades ul li').children('a').each(function (index) {
                    if ($(this).attr('href').indexOf(classAba) > 0) {
                        $('#tabsUnidades').tabs('remove', index);
                        AtualizaIndicesTorres();
                    }
                });
            } else {
                $(this).prop('checked', true);
                alert('Esse tipo tem ' + objRetorno + ' dependentes, remova para desvincular.');
            }
        } else {
            $('#tabsUnidades ul li').find('a[href|="#' + classAba + '"]').find('span').html(labelAbas(classAba));
        }
    }

    torres();
});
$("#numero").validInput_v2({
    url: "modules/valida-endereco-empreendimento.ashx",
    nChars: 1,
    param: [{ key: 'idLogradouro', field: $('#idLogradouro') }, { key: 'numero', field: $("#numero") }, { key: 'id', field: $("#idEmpreendimento") }],
    callbackSuccess: function (rspst) {
        if (!jQuery.isEmptyObject(rspst)) {

            var mensagem = "";
            if (rspst.tx_tipo_duplicidade == "empreendimento") {
                mensagem = AppendFormat("Já existe um empreendimento cadastrado no endereço. Nome do empreendimento (<a href='#modules/empreendimentos/empreendimento.aspx?txNome={{tx_informacao}}'>{{tx_informacao}}</a>).", rspst);
                console.log(rspst);
            }
            else if (rspst.tx_tipo_duplicidade == "imovel") {
                mensagem = AppendFormat("Já existe um imóvel cadastrado no endereço. Referência do imóvel (<a href=\'#properties?reference={{tx_informacao}}\'>{{tx_informacao}}</a>).", rspst);
            }

            jAlert(mensagem);
        }
    },
    callbackError: function (rspst) { alert('Falha ao validar endereço do empreendimento.'); }
});
function checkLinkUnits(classAba) {
    var objReturn = '';

    if (classAba != "") {
        $('#tabsUnidades .' + classAba).each(function () {
            $(this).find('input[name^="hdUnidade_"]').each(function () {
                if ($(this).val() != '' && $(this).val() != undefined && $(this).val() != '0') {
                    objReturn = 'unidade(s)';
                }
            });

            if (objReturn && $(this).find('input[name^="hdTorre"]').val() != '' && $(this).find('input[name^="hdTorre"]').val() != 'undefined' && $(this).find('input[name^="hdTorre"]').val() != '0' && $(this).find('input[name^="txNome"]').prop('type') == 'text')
                objReturn = 'torre(s)';
        });
    }

    return objReturn;
}
function labelAbas(classAba) {
    var array = new Array('3/predios', '4/predios', '2/casas', '5/terrenos', '6/terrenos', '7/terrenos', '8/edificios', '9/edificios', '11/galpao');
    var labelAba = '';
    for (x in array) {
        //Caso o elemento do array tenha a mesma classe do item a ser excluído
        if (array[x].indexOf(classAba) > 0) {
            var split = array[x].split('/');
            var idObj = '#chkTipoCond' + split[0];

            if ($(idObj).prop('checked'))
                labelAba = labelAba + (labelAba == '' ? $(idObj).parent().text() : ' / ' + $(idObj).parent().text().split(' ')[$(idObj).parent().text().split(' ').length - 1]);
        }
    }
    return labelAba;
}
function VerificaRemocaoAba(classAba) {
    //Verifica se existe outros tipos com a mesma aba antes de remover ela
    var array = new Array('3/predios', '4/predios', '2/casas', '5/terrenos', '6/terrenos', '7/terrenos', '8/edificios', '9/edificios', '11/galpao');
    //Percorre o Array acima
    for (x in array) {
        //Caso o elemento do array tenha a mesma classe do item a ser excluído
        if (array[x].indexOf(classAba) > 0) {
            var split = array[x].split('/');
            var idObj = '#chkTipoCond' + split[0];
            //Se o elemento está selecionado
            if ($(idObj).prop('checked')) return false;
        }
    }
    return true;
}
function trim(str) {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
function regrasTiposUnidades() { linkAddTorre(); }

function regrasTipos(obj) {
    if ($(obj).parent().parent().parent().attr('id') == 'lstTiposCond') {
        $('#lstTiposEd').find('input').prop('checked', false).trigger('change');
    } else if ($(obj).parent().parent().parent().attr('id') == 'lstTiposEd') {
        $('#lstTiposCond').find('input').prop('checked', false).trigger('change');
    }
}
function torres() {

    if ($('input[id^="chkTipoCond"]:checked').length) {
        $("#fldTorres").show();

        regrasTiposUnidades();

    } else {
        $("#fldTorres").hide();
        $("#fldTorres input").val("");
    }

    if ($('#tabsUnidades').children('ul').children().length == 0) {
        $('#fldTorres').hide();
    }
}
function cond_edificio(onLoad) {
    if (changeCboTipoC)
        LimpaInformacoesCond();

    if ($('#cboTipoC').val() == 'true')
        $('#fldTorres legend').html('Quadro de unidades do edif&#237;cio');
    else
        $('#fldTorres legend').html('Quadro de unidades do condom&#237;nio');

    var filter = {
        "lstTiposCond": { "tipo": "false" },
        "lstTiposEd": { "tipo": "true" },
        "txAndares": { "tipo": "true" },
        "txUnidadesAndar": { "tipo": "true" },
        "fldTorres": { "tipo": "false" }
    }

    for (field in filter) {
        if ($("#cboTipoC").val() == filter[field].tipo) {
            if ($("#" + field).prop("type") == "text")
                $("#" + field).parent().show();
            $("#" + field).show();
        } else {
            if ($("#" + field).prop("type") == "text") {
                $("#" + field).parent().hide();
                $("#" + field).val("");
            }
            $("#" + field).hide();
        }
    }

    //Caso escolha o tipo torres e bloco, desativas as opções de edifício
    if ($('#cboTipoC').val() == 'false')
        $('#lstTiposEd').find('input').prop('checked', false);
    else {
        $('#txSite').parent().next().hide().next().hide();
    }

    $(".trUnidades").parent().find('tr').each(function () {
        if ($(this).attr('class') != 'trUnidades') {
            $(this).find('input[name^="txVagas_"]').prop('disabled', true);
        }
    });

    if (onLoad) {
        $("#lstTiposCond input").prop('checked', false);
    }

    torres();
}

function LimpaInformacoesCond() {
    var valorTipoCond = $('#cboTipoC').val();
    var divTiposCond;
    switch (valorTipoCond) {
        case 'false':
            divTiposCond = 'lstTiposEd';
            break;
        case 'true':
            divTiposCond = 'lstTiposCond';
            break;
    }

    $('#' + divTiposCond).find('input').each(function () {
        var valorInput = GetClassTabs($(this).val());

        $('#tabsUnidades .' + valorInput).find('input[id^="hdTorre"]').each(function () {
            //Exclui torres e Unidades
            $(this).parent().find('a.excluirTorre').each(function () {
                ExcluiTorre(this, false);
                $(this).remove();
            });
        });
    });
}
function GetClassTabs(valor) {
    var classAba;
    switch (valor) {
        case '3':
            classAba = 'predios';
            break;
        case '4':
            classAba = 'predios';
            break;
        case '2':
            classAba = 'casas';
            break;
        case '7':
            classAba = 'terrenos';
            break;
        case '6':
            classAba = 'terrenos';
            break;
        case '5':
            classAba = 'terrenos';
            break;
        case '8':
            classAba = 'edificios';
            break;
        case '9':
            classAba = 'edificios';
            break;
        case '11':
            classAba = 'galpao';
            break;
        case '12':
            classAba = 'industriais';
            break;
        default:
            if ($('#cboTipoC').val() == "false") classAba = "";
            break;
    }

    return classAba;
}

var valorTipos;
function MontaCamposIndustriais(obj) {
    var valor = $(obj).val();
    if ((valor == '2' || valor == '14') && (valorTipos != '2' && valorTipos != '14')) {
        $(obj).parent().parent().find('input[id^="txAptoFinal"]').parent().find('i').html('N&uacute;mero lote(s) (ex.: 15,35,56):');
        $(obj).parent().parent().find('input.campoTerreno, select.campoTerreno').parent().show();
        $(obj).parent().parent().find('input.camposGalpao, select.camposGalpao').val('').parent().hide();
    } else if ((valor == '3' || valor == '7') && (valorTipos != '3' && valorTipos != '7')) {
        $(obj).parent().parent().find('input[id^="txAptoFinal"]').parent().find('i').html('Com final (ex.: 1,2,3):');
        $(obj).parent().parent().find('input.campoTerreno, select.campoTerreno').val('').parent().hide();
        $(obj).parent().parent().find('input.camposGalpao, select.camposGalpao').parent().show();
    }
    valorTipos = valor;
}
function MontaCamposBoxGaragem(obj) {

    var valor = $(obj).val();

    if (parseInt(valor) == 38) {
        $(obj).parent().parent().find("input[id^=txEscritorios]").parent().hide();
        $(obj).parent().parent().find("input[id^=txBanheiros]").parent().hide();
        $(obj).parent().parent().find("input[id^=txAlturaPeDireito]").parent().hide();
        $(obj).parent().parent().find("input[id^=txVaoLivre]").parent().hide();
        $(obj).parent().parent().find("input[id^=txDoca]").parent().hide();

        $(obj).parent().parent().find("input[id^=txDorm]").parent().hide();
        $(obj).parent().parent().find("input[id^=txSalas]").parent().hide();
        $(obj).parent().parent().find("input[id^=txDepositos]").parent().hide();
        $(obj).parent().parent().find("input[id^=txAreaGaragem]").parent().hide();
        $(obj).parent().parent().find("input[id^=txAreaComum]").parent().hide();
        $(obj).parent().parent().find("input[id^=txAreaDeposito]").parent().hide();
        $(obj).parent().parent().find("input[id^=txSuites]").parent().hide();
    }
    else {
        $(obj).parent().parent().find("input[id^=txEscritorios]").parent().show();
        $(obj).parent().parent().find("input[id^=txBanheiros]").parent().show();
        $(obj).parent().parent().find("input[id^=txAlturaPeDireito]").parent().show();
        $(obj).parent().parent().find("input[id^=txVaoLivre]").parent().show();
        $(obj).parent().parent().find("input[id^=txDoca]").parent().show();

        $(obj).parent().parent().find("input[id^=txDorm]").parent().show();
        $(obj).parent().parent().find("input[id^=txSalas]").parent().show();
        $(obj).parent().parent().find("input[id^=txDepositos]").parent().show();
        $(obj).parent().parent().find("input[id^=txAreaGaragem]").parent().show();
        $(obj).parent().parent().find("input[id^=txAreaComum]").parent().show();
        $(obj).parent().parent().find("input[id^=txAreaDeposito]").parent().show();
        $(obj).parent().parent().find("input[id^=txSuites]").parent().show();
    }
}
function plantao() {
    // o status comercial foi diferente de padrão, pode ter plantão no local
    if ($("#cboStatus").val() != "1") {
        $("#flPlantaoLocal").parent().show();
    } else {
        $("#flPlantaoLocal").parent().hide();
    }
}
function fase_construcao() {
    // o status comercial foi diferente de padrão, pode ter plantão no local
    if ($("#cboFases").val() == "1") {
        $("#dtAnoConstrucao").parent().show();
        $("#dtPrevisao").parent().hide();
        $("#dtPrevisao").val("");
    } else {
        $("#dtPrevisao").parent().show();
        $("#dtAnoConstrucao").parent().hide();
        $("#dtAnoConstrucao").val("");
    }
}
function ExcluiUnidade(elemento) {
    var idUnidade = "";
    idUnidade = $(elemento).parent().parent().find("input[name^='hdUnidade']").val();
    if (idUnidade != "" && idUnidade != undefined && idUnidade != '0') {
        $.ajax({
            beforeSend: function () {
                jLoading();
            },
            url: 'modules/empreendimentos/empreendimento-exclui-unidade.ashx',
            data: 'idEmpreendimentoUnidade=' + idUnidade,
            dataType: 'json',
            success: function (json) {
                $.unblockUI();
                if (json.status == 'OK') {
                    var indiceTorre = '';
                    $(elemento).parent().parent().find('input').each(function () {
                        var array = $(this).attr("name").split('_');
                        indiceTorre = array[1];
                    });
                    var count = ($(elemento).parent().parent().parent().children('tr').length - 4);

                    $(elemento).parent().parent().remove();
                    AtualizaIndices(indiceTorre);
                    $("#hdUnidades_" + indiceTorre).val(count);
                } else {
                    setTimeout(function () {
                        alert(json.mensagem);
                    }, 300);
                }
            },
            erro: function () {
                $.unblockUI();
            }
        });
    } else {
        var indiceTorre = '';
        $(elemento).parent().parent().find('input').each(function () {
            var array = $(this).attr("id").split('_');
            indiceTorre = array[1];
        });
        var count = ($(elemento).parent().parent().parent().children('tr').length - 4);
        $(elemento).parent().parent().remove();
        AtualizaIndices(indiceTorre);
        $("#hdUnidades_" + indiceTorre).val(count);
    }
}

function CalculoSuites() {
    $("input[id^='txDorm']").blur(function () {
        var valor = $(this).val();
        var ultimoValor = ($('#txSuites option').length);
        if (valor != "" && valor != '0') {
            $(this).parent().next().find('select[id^="txSuites"]').empty();
            for (x = 0; x <= parseInt(valor) ; x++) {
                $(this).parent().next().find('select[id^="txSuites"]').append('<option value="' + x + '">' + x + '</option>');
            }
            $(this).parent().next().show();
        } else if (valor == "" || valor == '0') {
            $(this).parent().parent().find('select[id^="txSuites"]').parent().hide();
        }
    });
}

function excluirUnidades() {
    $('select[name^="cboAndarDe"]').each(function () {
        var array = $(this).attr('id').split('_');

        var valorAtualAte = $(this).parent().parent().find('select[name^="cboAndarAte"]').val();
        var valorAtualDe = parseInt($(this).val());
        var valorAndares = parseInt($('#txAndares_' + array[1]).val());
        $(this).parent().parent().find('select[name^="cboAndarAte"]').empty();
        for (var x = valorAtualDe; x <= valorAndares; x++) {
            $(this).parent().parent().find('select[name^="cboAndarAte"]').append('<option value="' + x + '">' + x + '</option>');
        }
        $(this).parent().parent().find('select[name^="cboAndarAte"]').val(valorAtualAte);

    });

    $("select[name^='cboTipoUnidade']").change(function () {

        if ($(this).val() == '20' || $(this).val() == '22' || $(this).val() == '11' || $(this).val() == '38') {
            $(this).parent().parent().find("select[name^='txSuites'], input[name^='txDorm']").parent().hide();
        } else {
            $(this).parent().parent().find("input[name^='txDorm']").parent().show();
            if ($(this).parent().parent().find("input[name^='txDorm']").eq(0).val() != "" && $(this).parent().parent().find("input[name^='txDorm']").eq(0).val() != "0") {
                $(this).parent().parent().find("select[name^='txSuites']").parent().show();
            } else {
                $(this).parent().parent().find("select[name^='txSuites']").parent().hide();
            }
        }
    });

    $(".unidadeExcluir").unbind().click(function () {
        if (confirm('Deseja excluir a unidade?')) {
            ExcluiUnidade($(this));
        }
        return false;
    });

    $(".unidadeEditar").fancybox({
        width: '70%',
        height: '70%',
        hideOnOverlayClick: false,
        onComplete: function () {
            CalculoSuites();

            $('#fancybox-inner').append('<div id="botao"><input type="button" id="btnSubmitSolicitacao" class="btn btn-primary" value="Salvar"><span></span></div>');

            $('#btnSubmitSolicitacao').unbind().click(function () {
                $('#fancybox-close').trigger('click');
            });

            $('#fancybox-inner').find('.fieldset-edit').before('<h1>Editar tipo de unidade</h1>');
            $('#fancybox-inner').find('select[name^="cboTipoUnidade"]').unbind().change(function () {

                var aux = $(this).val();
                $(this).find('option').removeAttr("selected");
                $(this).val(aux);

                MontaCamposIndustriais($(this));
                MontaCamposBoxGaragem($(this));
            });

            $('#fancybox-inner').find('select[name^="cboTipoUnidade"]').change();

            $('#fancybox-inner').find('input[name^="txSalas"], input[name^="txBanheiros"], input[name^="txVagasCobertas"], input[name^="txVagasDescobertas"], input[name^="txDepositos"]').unbind().maskNumber();
            $('#fancybox-inner').find('input[name^="txArea"], input[name^="txVaoLivre"], input[name^="txAlturaPeDireito"]').unbind().maskDecimal();
            $('#fancybox-inner').find('input[name^="txValorUnidade"]').unbind().maskMoney();

            $('#fancybox-inner').find('input[name^="txVagas"]').blur(function () {
                var vagas = 0;
                $('#fancybox-inner').find('input[name^="txVagas"]').each(function () {
                    if ($(this).val() != '' && $(this).attr('id').indexOf('txVagas_') == -1) {
                        vagas = vagas + parseInt($(this).val());
                    }
                });
                $('#fancybox-inner').find('input[name^="txVagas_"]').eq(0).val(vagas);
            });

            $('#fancybox-inner').find('input[name^="txArea"], input[name^="txVaoLivre"], input[name^="txAlturaPeDireito"], input[name^="txAreaFracaoIdeal"]').blur(function () {
                if ($(this).val() != '') {
                    var valor = parseFloat($(this).val().replace(',', '.'));
                    if ($(this).attr("id").replace(/_\w_\w/, "") == "txAreaFracaoIdeal") {
                        valor = valor.toFixed($("#hdQtdCasasDecimaisFracaoIdeal").val());
                    } else {
                        valor = valor.toFixed($("#hdQtdCasasDecimaisAreas").val());
                    }
                    $(this).val(valor.replace('.', ','));
                }
            }).blur();

            //Tipos que não devem bloaquear o campo área total
            var arrImoveis = [2, 3, 4, 5, 6, 7, 8, 10, 13, 14, 18, 21, 23, 29, 30, 31, 33, 35];

            if ($.inArray(parseInt($('#fancybox-inner').find('select[name^="cboTipoUnidade_"]').val(), 0), arrImoveis, 0) > -1) {
                $('input[name^="txAreaTotal_"]').prop('disabled', false);
                $('input[name^="txAreaTotal_"]').prop('class', 'fields');
            }
            else {
                $('input[name^="txAreaTotal_"]').prop('disabled', true);
                $('input[name^="txAreaTotal_"]').prop('class', 'disabled');
            }

            $('#fancybox-inner').find('select[name^="cboAndarDe"]').unbind().change(function () {
                var array = $(this).attr('id').split('_');

                var valorAtualAte = $('#fancybox-inner').find('select[name^="cboAndarAte"]').eq(0).val();
                var valorAtualDe = parseInt($(this).val());
                var valorAndares = parseInt($('#txAndares_' + array[1]).val());
                $('#fancybox-inner').find('select[name^="cboAndarAte"]').empty();
                for (var x = valorAtualDe; x <= valorAndares; x++) {
                    $('#fancybox-inner').find('select[name^="cboAndarAte"]').append('<option value="' + x + '">' + x + '</option>');
                }

                $('#fancybox-inner').find('select[name^="cboAndarAte"]').eq(0).val(valorAtualAte);
            });

            $('#fancybox-inner').find('input[name^="txAreaComum_"],input[name^="txAreaUtil_"]').blur(function () {
                var areaTotal = 0;
                $('#fancybox-inner').find('input[name^="txAreaTotal_"]').eq(0).val(0);

                //Tipos que não devem receber o cálculo de área total
                var arr = [14, 4, 29, 30, 31, 35, 18, 21];

                if ($('#fancybox-inner').find('input[name^="txAreaComum_"]').length > 0) {
                    if ($('#fancybox-inner').find('input[name^="txAreaComum_"]').val() != "") {
                        areaTotal = parseFloat(areaTotal) + parseFloat($('#fancybox-inner').find('input[name^="txAreaComum_"]').val().replace(',', '.'));
                    }
                }

                if ($('#fancybox-inner').find('input[name^="txAreaUtil_"]').length > 0) {
                    if ($('#fancybox-inner').find('input[name^="txAreaUtil_"]').val() != "") {
                        areaTotal = parseFloat(areaTotal) + parseFloat($('#fancybox-inner').find('input[name^="txAreaUtil_"]').val().replace(',', '.'));
                    }
                }

                if ($.inArray(parseInt($('#cboTipoUnidade').val(), 0), arr) > -1) {
                    if ($('#fancybox-inner').find('input[name^="txAreaTotal_"]').length > 0) {
                        if ($('#fancybox-inner').find('input[name^="txAreaTotal_"]').val() != "") {
                            areaTotal = parseFloat(areaTotal) + parseFloat($('#fancybox-inner').find('input[name^="txAreaTotal_"]').val().replace(',', '.'));
                        }
                    }
                }

                areaTotal = areaTotal.toFixed($("#hdQtdCasasDecimaisAreas").val());
                $('#fancybox-inner').find('input[name^="txAreaTotal_"]').eq(0).val(areaTotal.replace('.', ','));
            });
        },
        onCleanup: function () {
            var listCampos = new Array();

            if (!$('#fancybox-inner').find('input[name^="chkPretVenda_"]').prop('checked') && !$('#fancybox-inner').find('input[name^="chkPretLocacao_"]').prop('checked')) {
                alert('Informe a pretensão do tipo da unidade.');
                return false;
            } else {
                var array = $('#fancybox-inner').find('input').eq(0).attr('id').split('_');

                //Insere a informação escolhida de pretensão para exibir na grid
                $('#hdUnidades_' + array[1]).parent().find('.Titulo').parent().find('tr').eq(parseInt(array[2]) + 2).find('td.chkPret').html($('#fancybox-inner').find('input[name^="chkPretVenda_"]').prop('checked') && $('#fancybox-inner').find('input[name^="chkPretLocacao_"]').prop('checked') ? "Venda/Loc." : ($('#fancybox-inner').find('input[name^="chkPretVenda_"]').prop('checked') ? "Venda" : "Loca&ccedil;&atilde;o"));
                //Monta Grid
                var unidades = $('#hdUnidades_' + array[1]).parent().find('.Titulo').parent().find('tr').eq(parseInt(array[2]) + 2).find('td')

                unidades.each(function (index) {

                    var objClass = $(this).attr('class');

                    if (objClass != '' && objClass != 'chkPret' && objClass != undefined) {
                        var valor = $('#fancybox-inner').find('input[name^="' + objClass + '_"], select[name^="' + objClass + '_"]').eq(0).val();

                        if (objClass == 'andares') {
                            //Trata a exibição de andares na Grid
                            var campoTipoUnidade = $('#fancybox-inner').find('select[name^="cboTipoUnidade_"]');
                            if ($(campoTipoUnidade).val() == '17' || $(campoTipoUnidade).val() == '26' || $(campoTipoUnidade).val() == '27') {
                                if ($(campoTipoUnidade).val() == '26' || $(campoTipoUnidade).val() == '27') {
                                    $(this).html($(campoTipoUnidade).val());
                                } else {
                                    $(this).html($('#fancybox-inner').find('input[name^="hdfAndares_"]').val());
                                }
                            } else {
                                $(this).html($('#fancybox-inner').find('select[name^="cboAndarDe_"]').val() + " ao " + $('#fancybox-inner').find('select[name^="cboAndarAte_"]').val());
                            }
                        } else {
                            //Caso seja um DropDown
                            if ($('#fancybox-inner').find('select[name^="' + objClass + '_"]').prop('type') == 'select-one') {
                                if (valor != null) {
                                    valor = $('#fancybox-inner').find('select[name^="' + objClass + '_"] option:selected').text();
                                    valor = trim(valor);
                                    $(this).html((valor == undefined || valor == "" ? "-" : valor));
                                } else
                                    $(this).html("-");

                            } else if ($('#fancybox-inner').find('input[name^="' + objClass + '_"]').prop('type') == 'checkbox') {
                                $(this).html(($('#fancybox-inner').find('input[name^="' + objClass + '_"]').prop('checked') ? "Sim" : "-"));
                            } else {
                                $(this).html((valor == undefined || valor == "" ? "-" : valor));
                            }
                        }
                    }

                    var aux = array[1] + '_' + array[2];
                    var tipo = $('#cboTipoUnidade_' + aux).val();
                    if ($.browser.msie)
                        $("#cboTipoUnidade_" + aux).val(tipo);
                    else
                        $("#cboTipoUnidade_" + aux + " option[value=" + tipo + "]").attr('selected', 'selected');

                    $('#chkPretVenda_' + aux).attr('checked', $('#chkPretVenda_' + aux).is(":checked"));
                    $('#chkPretLocacao_' + aux).attr('checked', $('#chkPretLocacao_' + aux).is(":checked"));

                    if ($.inArray("txAndares_" + array[1], listCampos) == -1 && $('#txAndares_' + array[1])) {

                        var andarDe = parseInt($('#cboAndarDe_' + aux).val());
                        var valorAndares = parseInt($('#txAndares_' + array[1]).val());
                        $('#cboAndarDe_' + aux).empty();
                        for (var x = -5; x <= valorAndares; x++) {
                            $('#cboAndarDe_' + aux).append('<option value="' + x + '">' + x + '</option>');
                        }
                        if ($.browser.msie)
                            $("#cboAndarDe_" + aux).val(andarDe);
                        else
                            $("#cboAndarDe_" + aux + " option[value=" + andarDe + "]").attr('selected', 'selected');

                        var andarAte = $('#cboAndarAte_' + aux).val();

                        if ($.browser.msie)
                            $("#cboAndarAte_" + aux).val(andarAte);
                        else
                            $("#cboAndarAte_" + aux + " option[value=" + andarAte + "]").attr('selected', 'selected');
                    }

                    if ($.inArray("txDorm_" + aux, listCampos) == -1 && $('#txDorm_' + aux)) {
                        $('#txDorm_' + aux).attr('value', $('#txDorm_' + aux).val());
                        listCampos.push("txDorm_" + aux);
                    }

                    if (objClass == 'txSuites') {
                        if ($.inArray("txSuites_" + aux, listCampos) == -1 && $('#txSuites_' + aux)) {
                            var suite = $('#txSuites_' + aux).val();

                            if (suite > 0) {

                                $('#txSuites_' + aux + ' option').each(function () {
                                    $(this).removeAttr('selected');
                                });

                                if ($.browser.msie)
                                    $("#txSuites_" + aux).val(suite);
                                else
                                    $("#txSuites_" + aux + " option[value=" + suite + "]").attr('selected', 'selected');
                            }

                            listCampos.push("txSuites_" + aux);
                        }
                    }

                    if ($.inArray("txSalas_" + aux, listCampos) == -1 && $('#txSalas_' + aux)) {
                        $('#txSalas_' + aux).attr('value', $('#txSalas_' + aux).val());
                        listCampos.push("txSalas_" + aux);
                    }

                    if ($.inArray("txBanheiros_" + aux, listCampos) == -1 && $('#txBanheiros_' + aux)) {
                        $('#txBanheiros_' + aux).attr('value', $('#txBanheiros_' + aux).val());
                        listCampos.push("txBanheiros_" + aux);
                    }

                    if ($.inArray("txVagasCobertas_" + aux, listCampos) == -1 && $('#txVagasCobertas_' + aux)) {
                        $('#txVagasCobertas_' + aux).attr('value', $('#txVagasCobertas_' + aux).val());
                        listCampos.push("txVagasCobertas_" + aux);
                    }

                    if ($.inArray("txVagasDescobertas_" + aux, listCampos) == -1 && $('#txVagasDescobertas_' + aux)) {
                        $('#txVagasDescobertas_' + aux).attr('value', $('#txVagasDescobertas_' + aux).val());
                        listCampos.push("txVagasDescobertas_" + aux);
                    }

                    if ($.inArray("txVagas_" + aux, listCampos) == -1 && $('#txVagas_' + aux)) {
                        $('#txVagas_' + aux).attr('value', $('#txVagas_' + aux).val());
                        listCampos.push("txVagas_" + aux);
                    }

                    if ($.inArray("txDepositos_" + aux, listCampos) == -1 && $('#txDepositos_' + aux)) {
                        $('#txDepositos_' + aux).attr('value', $('#txDepositos_' + aux).val());
                        listCampos.push("txDepositos_" + aux);
                    }

                    if ($.inArray("txAreaUtil_" + aux, listCampos) == -1 && $('#txAreaUtil_' + aux)) {
                        $('#txAreaUtil_' + aux).attr('value', $('#txAreaUtil_' + aux).val());
                        listCampos.push("txAreaUtil_" + aux);
                    }

                    if ($.inArray("txAreaGaragem_" + aux, listCampos) == -1 && $('#txAreaGaragem_' + aux)) {
                        $('#txAreaGaragem_' + aux).attr('value', $('#txAreaGaragem_' + aux).val());
                        listCampos.push("txAreaGaragem_" + aux);
                    }

                    if ($.inArray("txAreaComum_" + aux, listCampos) == -1 && $('#txAreaComum_' + aux)) {
                        $('#txAreaComum_' + aux).attr('value', $('#txAreaComum_' + aux).val());
                        listCampos.push("txAreaComum_" + aux);
                    }

                    if ($.inArray("txAreaFracaoIdeal_" + aux, listCampos) == -1 && $('#txAreaFracaoIdeal_' + aux)) {
                        $('#txAreaFracaoIdeal_' + aux).attr('value', $('#txAreaFracaoIdeal_' + aux).val());
                        listCampos.push("txAreaFracaoIdeal_" + aux);
                    }

                    if ($.inArray("txAreaDeposito_" + aux, listCampos) == -1 && $('#txAreaDeposito_' + aux)) {
                        $('#txAreaDeposito_' + aux).attr('value', $('#txAreaDeposito_' + aux).val());
                        listCampos.push("txAreaDeposito_" + aux);
                    }

                    if ($.inArray("txAreaTotal_" + aux, listCampos) == -1 && $('#txAreaTotal_' + aux)) {
                        $('#txAreaTotal_' + aux).attr('value', $('#txAreaTotal_' + aux).val());
                        listCampos.push("txAreaTotal_" + aux);
                    }

                    if ($.inArray("txAptoFinal_" + aux, listCampos) == -1 && $('#txAptoFinal_' + aux)) {
                        $('#txAptoFinal_' + aux).attr('value', $('#txAptoFinal_' + aux).val());
                        listCampos.push("txAptoFinal_" + aux);
                    }

                    if ($.inArray("txDescricao_" + aux, listCampos) == -1) {
                        $('#txDescricao_' + aux).html($('#txDescricao_' + aux).val());
                        listCampos.push("txDescricao_" + aux);
                    }

                    if ($.inArray("txDimensaoTerreno_" + aux, listCampos) == -1 && $('#txDimensaoTerreno_' + aux)) {
                        $('#txDimensaoTerreno_' + aux).attr('value', $('#txDimensaoTerreno_' + aux).val());
                        listCampos.push("txDimensaoTerreno_" + aux);
                    }

                    if ($.inArray("chkPiscina_" + aux, listCampos) == -1 && $('#chkPiscina_' + aux)) {
                        $('#chkPiscina_' + aux).attr('checked', $('#chkPiscina_' + aux).is(":checked"));
                        listCampos.push("chkPiscina_" + aux);
                    }

                    if ($.inArray("cboTopografia_" + aux, listCampos) == -1 && $('#cboTopografia_' + aux)) {
                        var suite = $('#cboTopografia_' + aux).val();
                        if ($.browser.msie)
                            $("#cboTopografia_" + aux).val(suite);
                        else
                            $("#cboTopografia_" + aux + " option[value=" + suite + "]").attr('selected', 'selected');
                        listCampos.push("cboTopografia_" + aux);
                    }
                });

                $('#fancybox-inner').find('#botao').remove();
                $('#fancybox-inner').find('h1').remove();

                $('#hdUnidades_' + array[1]).parent().find('.Titulo').parent().find('tr').eq(parseInt(array[2]) + 2).find('td:eq(1)').html($('#fieldset_' + array[1] + '_' + array[2]).parent().html());
            }
        }
    });
}
function AtualizaIndices(indiceTorre) {
    var count = 0;
    $('#hdUnidades_' + indiceTorre).next().find('tr').each(function () {
        if ($(this).attr('class') == '' || $(this).attr('class') == undefined) {
            $(this).find('fieldset, input, select, .unidadeEditar, textarea').each(function () {
                if ($(this).attr('class') == 'unidadeEditar') {
                    var idAtual = $(this).attr('href');
                    var array = idAtual.split('_');
                    var idNovo = array[0] + '_' + indiceTorre + '_' + count;

                    $(this).attr('href', idNovo);
                } else {
                    var idAtual = $(this).attr('id');
                    var array = idAtual.split('_');
                    var idNovo = array[0] + '_' + indiceTorre + '_' + count;

                    $(this).attr('id', idNovo);
                    $(this).attr('name', idNovo);
                }

            });
            count++;
        }
    });
}
function Fancybox() {
    $(".linkAddUnidade").fancybox({
        type: 'iframe',
        //width: '80%',
        //height: '80%',
        hideOnOverlayClick: false,
        onStart: function () {
            var array = $(this).attr('href').split('=');
            var indice = array[1];
            var indiceUnidade;

            parent.$("#tabsUnidades .edf").each(function (index) {
                if (index == parseInt(indice)) {
                    indiceUnidade = $(this).children("div").children("table").children("tbody").children("tr").length;
                    indiceUnidade = (indiceUnidade - 3);
                }
            });

            if (parent.$('#hdUnidades_' + array[1]).parent().find('#txAndares_' + array[1]).val() != "" && parent.$('#hdUnidades_' + array[1]).parent().find('#txAndares_' + array[1]).val() != "0") {
                if (parent.$('#hdUnidades_' + array[1]).parent().find('#txNome_' + array[1]).val() != "" || parent.$('#hdUnidades_' + array[1]).parent().find('#txNome_' + array[1]).prop('type') == 'hidden') {
                    var multipleValues = "";

                    var itemsarray = [];
                    $("input[name|='chkTipoCond']:checked").each(function () {
                        var items = $(this).attr('value');
                        itemsarray.push(items);
                    });
                    multipleValues = itemsarray.join(",");
                    $(this).attr("href", $(this).attr("href") + '&inAndares=' + parent.$("#txAndares_" + indice).val() + "&tipos=" + multipleValues + "&indiceUnidade=" + indiceUnidade + '&tipoEmpreendimento=' + parent.$('#hdUnidades_' + array[1]).parent().attr('class').replace('edf ', ''));
                } else {
                    alert('Informe o ' + trim(parent.$('#hdUnidades_' + array[1]).parent().find('#txNome_' + array[1]).parent().text().replace('*', '').replace(':', '.')));
                    return false;
                }
            }
            else {
                alert('Informe a quantidade de andares.');
                return false;
            }
        }
    });
}
function atualizaUnidades(indice, count) {
    $("#hdUnidades_" + indice).val(count);
}
function addEvento() {
    $("input[name^='txAndares']").unbind().maskNumber().blur(function () {
        if ($(this).parent().parent().find('.edfTable tr').length > 3)
            alert(unescape('Esta altera%E7%E3o afetar%E1 as informa%E7%F5es cadastradas nos campos andar de/at%E9 das unidades j%E1 cadastradas.'))

        var inAndares = $(this).val();
        $(this).parent().parent().find('select[name^="cboAndarAte"]').each(function () {
            var valorAtualAte = $(this).val();
            $(this).empty();
            for (var x = -5; x <= parseInt(inAndares) ; x++) {
                $(this).append('<option value="' + x + '">' + x + '</option>');
            }
            if (inAndares > valorAtualAte) {
                $(this).val(valorAtualAte);
            } else {
                $(this).val(inAndares);
            }
        });

        $(this).parent().parent().find('select[name^="cboAndarDe"]').each(function () {
            var valorAtualDe = $(this).val();
            $(this).empty();
            for (var x = -5; x <= parseInt(inAndares) ; x++) {
                $(this).append('<option value="' + x + '">' + x + '</option>');
            }
            if (inAndares > valorAtualDe) {
                $(this).val(valorAtualDe);
            } else {
                $(this).val(inAndares);
            }
            var valorDe = $(this).val();
            var valorAte = $(this).parent().parent().find('select[name^="cboAndarAte"]').eq(0).val();

            $(this).parent().parent().parent().parent().find('.andares').html((valorDe == null ? '0' : valorDe) + ' ao ' + (valorAte == null ? '0' : valorAte));
        });
    });
}
function duplicaInformacoesTorre(indice) {

    //Insere os valores da torre anterior na nova torre
    $('#tabsUnidades .edf').eq(indice).find('input[name!="txNome"], select').each(function () {
        var name = $(this).attr('id').split('_')[0];
        name = name + '_' + ($('#tabsUnidades .edf').length - 1);
        $('#' + name).val($(this).val());
    });

    //Caso a torre nova tenha o status de construção não terminado, habilita o campo de previsão de entrega
    if ($('#tabsUnidades .edf').find('#cboFase_' + ($('#tabsUnidades .edf').length - 1)).val() != '1') {
        $('#tabsUnidades .edf').find('#cboFase_' + ($('#tabsUnidades .edf').length - 1)).parent().next().show();
    }

    //Apaga o campos nome
    $('#tabsUnidades .edf').find('#txNome_' + ($('#tabsUnidades .edf').length - 1)).val('');
    //Clona os dados da Unidade
    var dados = $('#tabsUnidades .edf').eq(indice).find('.trUnidades').parent().clone();
    //Altera o name e id dos campos
    $(dados).find('input, select, fieldset, textarea').each(function () {
        var name = $(this).attr('id');
        var array = name.split('_');
        name = array[0];
        name = name + '_' + ($('#tabsUnidades .edf').length - 1) + '_' + array[2];
        $(this).attr('id', name);
        $(this).attr('name', name);
    });
    //Altera o link do botao Editar das unidades, altera o indice
    $(dados).find('.unidadeEditar').each(function () {
        var name = $(this).attr('href');
        var array = name.split('_');
        name = array[0];
        name = name + '_' + ($('#tabsUnidades .edf').length - 1) + '_' + array[2];
        $(this).attr('href', name);
    });
    //Inclui os unidades na torre nova
    $('#tabsUnidades .edf').find('#txNome_' + ($('#tabsUnidades .edf').length - 1)).parent().parent().find('.trUnidades').parent().html($(dados).html());
    //Altera o indice no link de adicionar uma nova unidade
    $('#tabsUnidades .edf').find('#txNome_' + ($('#tabsUnidades .edf').length - 1)).parent().parent().find('.linkAddUnidade').attr('href', 'modules/empreendimentos/ficha-nova-unidade.aspx?indiceTorre=' + ($('#tabsUnidades .edf').length - 1))
    excluirUnidades();
    //Inclui os valores nos campos de unidade
    $('.trUnidades').eq(indice).parent().find('input, select, textarea').each(function () {
        var name = $(this).attr('id');
        var array = name.split('_');
        name = array[0];
        name = name + '_' + ($('#tabsUnidades .edf').length - 1) + '_' + array[2];
        if ($(this).attr('id').indexOf('hdUnidade') < 0) {
            if ($(this).prop('type') == 'checkbox') {
                $('#' + name).prop('checked', $(this).prop('checked'));
            } else {
                $('#' + name).val($(this).val());
            }
        } else {
            $('#' + name).val('');
        }
    });
    //Limpa o campo com o ID da unidade
    $('#tabsUnidades .edf').eq($('#tabsUnidades .edf').length - 1).find('input[id^="hdUnidade_"]').val('');

    //Copia os valores dos campos
    var count = $('#tabsUnidades .edf').find('#hdUnidades_' + indice).val();
    for (var i = 0; i < count ; i++) {
        $('#tabsUnidades .edf').find('#chkPretVenda_' + (indice + 1) + '_' + i).prop('checked', $('#tabsUnidades .edf').find('#chkPretVenda_' + (indice) + '_' + i).prop('checked'));
        $('#tabsUnidades .edf').find('#chkPretLocacao_' + (indice + 1) + '_' + i).prop('checked', $('#tabsUnidades .edf').find('#chkPretLocacao_' + (indice) + '_' + i).prop('checked'));
        $('#tabsUnidades .edf').find('#cboTipoUnidade_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#cboTipoUnidade_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#cboAndarDe_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#cboAndarDe_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#cboAndarAte_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#cboAndarAte_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txDorm_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txDorm_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txSuites_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txSuites_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txSalas_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txSalas_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txBanheiros_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txBanheiros_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txVagasCobertas_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txVagasCobertas_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txVagasDescobertas_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txVagasDescobertas_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txVagas_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txVagas_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txDepositos_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txDepositos_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaUtil_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaUtil_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaGaragem_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaGaragem_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaComum_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaComum_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaFracaoIdeal_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaFracaoIdeal_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaDeposito_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaDeposito_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAreaTotal_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAreaTotal_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txAptoFinal_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txAptoFinal_' + (indice) + '_' + i).val());
        $('#tabsUnidades .edf').find('#txDescricao_' + (indice + 1) + '_' + i).val($('#tabsUnidades .edf').find('#txDescricao_' + (indice) + '_' + i).val());
    }

    alteraNames();
}
function Ordena() {
    $('select[id^="cboTipoUnidade"]').each(function () {
        var arrayOptions = [];
        $(this).find('option').each(function () {
            var valor = $(this).text() + '/' + $(this).val();
            arrayOptions.push(valor);
        });
        arrayOptions = arrayOptions.sort();
        $(this).empty();
        for (x = 0; x < arrayOptions.length; x++) {
            var valor = arrayOptions[x];
            var array = valor.split('/');
            $(this).append('<option value="' + array[1] + '">' + array[0] + '</option>');
        }
    });
}
function regrasTorre() {
    $('input[name^="txNome_"]').blur(function () {
        var name = $(this).attr('name');
        var valor = $(this).val();
        var bool = false;
        $('input[name^="txNome_"]').each(function () {
            if ($(this).attr('name') != name) {
                if ($(this).val() == valor && $(this).val() != '') {
                    bool = true;
                }
            }
        });
        if (bool == true) {
            $(this).val('');
            alert('Existe outra torre com o mesmo nome.');
        }
    });

    $('.excluirTorre').unbind().click(function () {
        if (confirm('Deseja excluir a torre?')) {
            ExcluiTorre(this, true);
        }
        return false;
    });
}

function ExcluiTorre(elemento, flClick) {
    var array = $(elemento).parent().parent().find('input[name^="txNome_"]').attr('id').split('_');
    var indiceTorre = array[1];
    var idTorre;
    if ($("#hdTorre_" + indiceTorre).val() != undefined && $("#hdTorre_" + indiceTorre).val() != "") {
        var mydate = new Date();
        var data_utc = Date.UTC(mydate.getYear(), mydate.getMonth(), mydate.getDate(), mydate.getHours(), mydate.getMinutes(), mydate.getSeconds(), mydate.getMilliseconds());

        $.ajax({
            beforeSend: function () {
                jLoading();
            },
            url: 'modules/empreendimentos/empreendimento-exclui-torre.ashx',
            cache: false,
            data: 'idTorre=' + $("#hdTorre_" + indiceTorre).val() + "&MS=" + data_utc,
            dataType: 'json',
            success: function (json) {
                $.unblockUI();
                if (json.status == "OK") {
                    $('#hdTorre_' + indiceTorre).parent().remove();
                    AtualizaIndicesTorres();
                    regrasTiposUnidades();
                }
                if (flClick) {
                    setTimeout(function () {
                        alert(json.mensagem);
                    }, 400);
                }
            },
            error: function () {
                $.unblockUI();
            }
        });
    } else {
        $(elemento).parent().parent().remove();
        AtualizaIndicesTorres();
        regrasTiposUnidades();
    }
}

function AtualizaIndicesTorres() {
    $('#tabsUnidades .edf').each(function (indice) {
        var idhdUnidades = $(this).find('input[name^="hdUnidades_"]').attr('id').split('_');
        $(this).find('input[name^="hdTorre_"]').attr('name', 'hdTorre_' + indice);
        $(this).find('input[name^="hdTorre_"]').attr('id', 'hdTorre_' + indice);
        if (idhdUnidades.length > 0) {
            $(this).find('input[name^="hdUnidades_"]').attr('id', idhdUnidades[0] + '_' + indice)
            $(this).find('input[name^="hdUnidades_"]').attr('name', idhdUnidades[0] + '_' + indice)
        }
        $(this).children('label').children('input, select').each(function () {
            var array = $(this).attr('id').split('_');
            if (array.length == 2) {
                $(this).attr('id', array[0] + '_' + indice);
                $(this).attr('name', array[0] + '_' + indice);
            }
        });
        $(this).find('.linkAddUnidade').eq(0).attr('href', 'modules/empreendimentos/ficha-nova-unidade.aspx?indiceTorre=' + indice);
        AtualizaIndices(indice);
    });
    alteraNames();
}

function alteraNames() {
    $('.edfTable').find('select, input, textarea').each(function () {
        $(this).attr('name', $(this).attr('id'));
    });
    return false;
}

//CONTATO TERCEIROS
function addNovoTerceiro() {
    var count = $('.contatosTerceiros').length;
    var temp = $('.contatosTerceiros').eq(0).clone();

    var indice = count - 1;
    //Coloca Indice
    $(temp).find('input, select').each(function () {
        $(this).attr('id', $(this).attr('id') + '_' + indice);
        $(this).attr('name', $(this).attr('name') + '_' + indice);
    });
    $(temp).css('display', 'block');
    $('#linkIncluiTerceiros').parent().parent().before(temp);
    eventoExcluirContato();
    return indice;
}

function eventoExcluirContato() {
    $('.lnkExcluirTerceiro').unbind('click');
    $('.lnkExcluirTerceiro').click(function () {
        if (confirm("Tem certeza que deseja excluir esse contato?")) {
            var id = $(this).parent().parent().find('input[id^="hdfIdProfissional_"]').eq(0).val();
            if (id != '' && id != '0' && id != undefined) {
                var array = $(this).parent().parent().find('input[id^="hdfIdProfissional_"]').eq(0).attr('id').split('_');
                var indice = array[1];
                $.ajax({
                    beforeSend: function () {
                        //jLoading();
                    },
                    url: 'modules/empreendimentos/empreendimento-exclui-terceiro.ashx',
                    cache: false,
                    data: 'idEmpreendimento=' + $("#hdIdEmpreendimento").val() + "&idProfissional=" + id + "&MS=" + data_utc,
                    dataType: 'json',
                    success: function (json) {
                        //$.unblockUI();
                        if (json.status == "OK") {
                            $('#hdfIdProfissional_' + indice).parent().remove();
                            alteraIndices();
                        }
                        setTimeout(function () {
                            alert(json.mensagem);
                        }, 400);
                    },
                    error: function () {
                        //$.unblockUI();
                    }
                });
            } else {
                $(this).parent().parent().remove();
                alteraIndices();
            }
        }
        return false;
    });
}

function alteraIndices() {
    $('.contatosTerceiros').each(function (count) {
        if (count > 0) {
            $(this).find('input,select').each(function () {
                var indice = count - 1;
                var arrayId = $(this).attr('id').split('_');
                var arrayName = $(this).attr('name').split('_');

                $(this).attr('id', arrayId[0] + '_' + indice);
                $(this).attr('name', arrayName[0] + '_' + indice);
            });
        }
    });
    EventosTelefone();
}

$('#linkIncluiTerceiros').click(function () {
    var count = addNovoTerceiro();
    personalizaTelefone(count);
    EventosTelefone();
    return false;
});

function personalizaTelefone(indice) {

    if ($("#hdContatoTerceiros_" + indice).val() == 4) {
        $('#txContatoTerceiros_' + indice).unmask().before('<span class=' + ValidarTipoTelefone($("#hdContatoTerceiros_" + indice).val()) + ' id="Span_txProprietario_menu_' + indice + '">(<)</span><span class="multiplePhonesTelOptions" id="Span_txTelefoneTerceiros_telefone_' + indice + '" style="display: none;"><span "="" rel="1" class="PhoneItemResidencial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Residencial</span><span "="" rel="2" class="PhoneItemComercial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Comercial</span><span "="" rel="3" class="PhoneItemCelular" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Celular</span><span "="" rel="4" class="PhoneItemRadio" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">R&aacute;dio</span></span>');
    }
    else {
        $('#txContatoTerceiros_' + indice).mask('(99) 9999-9999?9').before('<span class=' + ValidarTipoTelefone($("#hdContatoTerceiros_" + indice).val()) + ' id="Span_txProprietario_menu_' + indice + '">(<)</span><span class="multiplePhonesTelOptions" id="Span_txTelefoneTerceiros_telefone_' + indice + '" style="display: none;"><span "="" rel="1" class="PhoneItemResidencial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Residencial</span><span "="" rel="2" class="PhoneItemComercial" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Tel. Comercial</span><span "="" rel="3" class="PhoneItemCelular" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">Celular</span><span "="" rel="4" class="PhoneItemRadio" id="Sel_txTelefoneTerceiros_telefone_' + indice + '">R&aacute;dio</span></span>');
    }
    validaDigitosTelefonePorDDD($('#txContatoTerceiros_' + indice));
    var i = $("#txContatoTerceiros_" + indice).parent().find("i");
    $(i).html(NomeTipoTelefone($("#hdContatoTerceiros_" + indice).val()));
}

function ValidarTipoTelefone(id) {

    switch (id) {
        case "1":
            return "aPhoneItemResidencial";
            break;
        case "2":
            return "aPhoneItemComercial";
            break;
        case "3":
            return "aPhoneItemCelular";
            break;
        case "4":
            return "aPhoneItemRadio";
            break;
        default:
            return "aPhoneItemResidencial";
            break;
    }
}

function NomeTipoTelefone(id) {
    switch (id) {
        case "1":
            return "Tel. Residencial";
            break;
        case "2":
            return "Tel. Comercial";
            break;
        case "3":
            return "Celular";
            break;
        case "4":
            return "R&#225;dio";
            break;
        default:
            return "Tel. Residencial";
            break;
    }
}

function EventosTelefone() {
    $('span[id^="Span_txProprietario_menu"]').unbind('click');
    $('span[id^="Span_txProprietario_menu"]').click(function () {
        var menu = $(this).next();
        if ($(menu).css('display') == 'none') {
            $(this).next().show('fast');
        } else {
            $(this).next().hide('fast');
        }
        return false;
    });

    $('span[id^="Sel_txTelefoneTerceiros_telefone"]').unbind('click');
    $('span[id^="Sel_txTelefoneTerceiros_telefone"]').click(function () {
        $(this).parent().hide('fast');
        return false;
    });

    $('input[id^="txContatoTerceiros"]').blur(function () {
        $(this).prev().hide('fast');
    });
    $('input[id^="txContatoTerceiros"]').prev().find('span[class^="PhoneItem"]').click(function () {
        $(this).parent().parent().find('i').html($(this).html());
        if ($(this).parent().parent().find('span[id^="Span_txProprietario_menu"]').attr('class') == 'aPhoneItemRadio' && $(this).attr('class') != 'PhoneItemRadio') {
            $(this).parent().parent().find('input').unbind().mask('(99) 9999-9999?9');
            validaDigitosTelefonePorDDD($(this).parent().parent().find('input'));
        } else if ($(this).attr('class') == 'PhoneItemRadio') {
            $(this).parent().parent().find('input').unmask();
        }
        $(this).parent().parent().find('span[id^="Span_txProprietario_menu"]').attr('class', 'a' + $(this).attr('class'));

        document.getElementById('hdContatoTerceiros_' + $(this).attr('id').replace("Sel_txTelefoneTerceiros_telefone_", "")).value = $(this).attr('rel');
    });
}

function ShowHideDetalhes() {
    if ($('#detalhe_199').prop('checked')) {
        $('#detalhe_163, #detalhe_200').parent().fadeIn();
    }
    else {
        $('#detalhe_163, #detalhe_200').prop('checked', false).parent().fadeOut();
    }
}

function ShowDocumentacaoStatus() {

    if ($('#cboFaseDocumentacao').length) {
        if ($("#cboStatus").val() == 2) {
            $('#cboFaseDocumentacao').val(2);
        }
    }
}