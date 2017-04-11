// JScript File
// JavaScript Document

$(function () {
    calculaLabelAreaUtil($("#txAreaUtil").parent());
    calculaLabelAreaTotal($("#txAreaTotal").parent());

    $("#txAndarDe").keypress(verificaNumero);
    $("#txAndarAte").keypress(verificaNumero);

    $("#btnFiltro").unbind("click");
    $("#btnFiltro").click(function () {
        ocultaExibeFiltroUnidade();
    });

    var _status_todosSelecionados = true;
    var _status_todosSelecionadosComercial = true;
    var _status_IE_unchecking = false;

    $(".cboTipoEmpreendimento").dropdownchecklist({
        icon: {
            placement: 'right', toOpen: 'ui-arrow'
            , toClose: 'ui-arrow'
        }
		, emptyText: "Selecione"
        , maxDropHeight: 100, width: 200
    });

    var _status_IE_inlinestyle = 'display: inline-block; cursor: default;';

    $('#ddcl-cboTipoEmpreendimento').attr('style', _status_IE_inlinestyle);

    $('#ddcl-cboStatus').attr('style', _status_IE_inlinestyle);



    $("input[id^='ddcl-cboTipoEmpreendimento']").bind($.browser.msie ? 'propertychange' : 'change', function (e) {
        VerificaSelecao(e, $(this));
    });

    $("input[id^='ddcl-cboStatus']").bind($.browser.msie ? 'propertychange' : 'change', function (e) {
        VerificaSelecaoStatus(e, $(this));
    });

    $(".cboTipoEmpreendimento").dropdownchecklist("refresh");


    $("#cboHorizontalVertical").change(function () {
        if ($(".cboTipoEmpreendimento").data("ui-dropdownchecklist"))
            $(".cboTipoEmpreendimento").dropdownchecklist("destroy");
        CarregaTipoEmpreendimento($(this).val());
    }).change();

    //CarregaStatusComercial();

    $("#txAreaUtil").unbind().keyup(function () {
        calculaLabelAreaUtil($(this).parent());
    });

    $("#cboDeltaAreaUtil").unbind().change(function () {
        calculaLabelAreaUtil($("#txAreaUtil").parent());
    });

    $("#txAreaTotal").unbind().keyup(function () {
        calculaLabelAreaTotal($(this).parent());
    });

    $("#cboDeltaAreaTotal").unbind().change(function () {
        calculaLabelAreaTotal($("#txAreaTotal").parent());
    });

    $("#cboStatusComercial1").change(function () {

        if ($(".cboStatus").data("ui-dropdownchecklist"))
            $(".cboStatus").dropdownchecklist("destroy");
        CarregaStatusComercial($(this).val());
        if ($(this).val() == 1) {
            $(".cboStatus").parent().hide();
        }
        else
            $(".cboStatus").parent().show();
    }).change();

    $("#cboEstado").change(function() {
        CarregaCidade($(this).val());
    });

    ocultaExibeFiltroUnidade();

    function uncheckAll() {
        $('select.cboTipoEmpreendimento option').prop('selected', false);
        $(".cboTipoEmpreendimento").dropdownchecklist("refresh");
    }

    function checkAll() {
        $('select.cboTipoEmpreendimento option').prop('selected', true);
        $(".cboTipoEmpreendimento").dropdownchecklist("refresh");
    }

    function uncheckAllStatus() {
        $('select.cboStatus option').prop('selected', false);
        $(".cboStatus").dropdownchecklist("refresh");
    }

    function checkAllStatus() {
        $('select.cboStatus option').prop('selected', true);
        $(".cboStatus").dropdownchecklist("refresh");
    }

    function VerificaSelecao(e, element) {
        if (e.type == "change" || (e.type == "propertychange" && window.event.propertyName == "checked")) {
            if (element.attr('id') == 'ddcl-cboTipoEmpreendimento-i0' && element.is(':checked')) {
                checkAll();
                _status_todosSelecionados = true;
                $('#cboTipoEmpreendimento span.ui-dropdownchecklist-text').text('Todos');
            }

            if (element.attr('id') == 'ddcl-cboTipoEmpreendimento-i0' && element.is(':checked') == false) {
                if (!_status_IE_unchecking) {
                    uncheckAll();
                    _status_todosSelecionados = false;
                }
                _status_IE_unchecking = false;
            }

            if (element.attr('id') != 'ddcl-cboTipoEmpreendimento-i0' && element.is(':checked') == false && _status_todosSelecionados) {
                if ($.browser.msie) _status_IE_unchecking = true;
                _status_todosSelecionados = false;
                $('select.cboTipoEmpreendimento option[value="0"]').prop('selected', false);
                if ($.browser.msie)
                    $('select.cboTipoEmpreendimento option[value="' + element.val() + '"]').prop('selected', false);
                $(".cboTipoEmpreendimento").dropdownchecklist("refresh");
            }
        }
    }

    function VerificaSelecaoStatus(e, element) {
        if (e.type == "change" || (e.type == "propertychange" && window.event.propertyName == "checked")) {
            if (element.attr('id') == 'ddcl-cboStatus-i0' && element.is(':checked')) {
                checkAllStatus();
                _status_todosSelecionadosComercial = true;
                $('#cboStatus span.ui-dropdownchecklist-text').text('Todos');
            }

            if (element.attr('id') == 'ddcl-cboStatus-i0' && element.is(':checked') == false) {
                if (!_status_IE_unchecking) {
                    uncheckAllStatus();
                    _status_todosSelecionadosComercial = false;
                }
                _status_IE_unchecking = false;
            }

            if (element.attr('id') != 'ddcl-cboStatus-i0' && element.is(':checked') == false && _status_todosSelecionadosComercial) {
                if ($.browser.msie) _status_IE_unchecking = true;
                _status_todosSelecionadosComercial = false;
                $('select.cboStatus option[value="0"]').prop('selected', false);
                if ($.browser.msie)
                    $('select.cboStatus option[value="' + element.val() + '"]').prop('selected', false);
                $(".cboStatus").dropdownchecklist("refresh");
            }
        }
    }

    function CarregaStatusComercial(param) {
        $.ajax({
            type: "POST",
            global: false,
            beforeSend: function () {
                $("#cboStatus").empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
            },
            url: "json/jsonStatusComercial.ashx",
            data: "id_com=" + param,
            dataType: "json",
            success: function (msg) {
                tam = msg.data.length;
                var strOptions = '';
                $("#cboStatus").empty();
                strOptions += '<option value=\"0\">Todos</option>';
                for (i = 0; i < tam; i++)
                    strOptions += '<option value=\"' + msg.data[i].id + '\">' + msg.data[i].name + '</option>';

                $("#cboStatus").append(strOptions).prop('disabled', false);

                $(".cboStatus").dropdownchecklist({
                    icon: {
                        placement: 'right', toOpen: 'ui-arrow'
                        , toClose: 'ui-arrow'
                    }
                  , emptyText: "Selecione"
                        , maxDropHeight: 100, width: 190
                });

                $("input[id^='ddcl-cboStatus']").bind($.browser.msie ? 'propertychange' : 'change', function (e) {
                    VerificaSelecaoStatus(e, $(this));
                });

                checkAllStatus();
                _status_todosSelecionadosComercial = true;
            }
        });


    }

    function CarregaTipoEmpreendimento(valor) {
        if (valor != "0") {
            $.ajax({
                type: "POST",
                beforeSend: function () {
                    $("#cboTipoEmpreendimento").empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
                },
                url: "json/jsonEmpreendimentoTipo.ashx",
                data: "flVertical=" + valor,
                dataType: "json",
                success: function (msg) {
                    tam = msg.tipos.length;
                    var strOptions = '';
                    $("#cboTipoEmpreendimento").empty();
                    strOptions += '<option value=\"0\">Todos</option>'
                    for (i = 0; i < tam; i++)
                        strOptions += '<option value=\"' + msg.tipos[i].tipo.id_empreendimento_tipo + '\">' + msg.tipos[i].tipo.tx_empreendimento_tipo + '</option>'

                    $("#cboTipoEmpreendimento").append(strOptions).prop('disabled', false);

                    $(".cboTipoEmpreendimento").dropdownchecklist({
                        icon: {
                            placement: 'right', toOpen: 'ui-arrow'
                            , toClose: 'ui-arrow'
                        }
                      , emptyText: "Selecione"
                            , maxDropHeight: 100, width: 190
                    });

                    $("input[id^='ddcl-cboTipoEmpreendimento']").bind($.browser.msie ? 'propertychange' : 'change', function (e) {
                        VerificaSelecao(e, $(this));
                    });

                    checkAll();
                    _status_todosSelecionados = true;
                }
            });
        }
    }

    function calculaLabelAreaUtil(obj) {
        var aux = parseInt($("#" + obj.find("input").attr("id").replace("txAreaUtil", "cboDeltaAreaUtil")).val());
        var max = (100 + aux) / 100;
        var min = (100 - aux) / 100;
        var val = parseFloat(obj.find("input").val());

        if (val > 0)
            obj.find("i.fosco").text((val * min).formatMoney(0, ",", ".") + " - " + (val * max).formatMoney(0, ",", "."));
        else
            obj.find("i.fosco").text("");
    }

    function calculaLabelAreaTotal(obj) {
        var aux = parseInt($("#" + obj.find("input").attr("id").replace("txAreaTotal", "cboDeltaAreaTotal")).val());
        var max = (100 + aux) / 100;
        var min = (100 - aux) / 100;
        var val = parseFloat(obj.find("input").val());

        if (val > 0)
            obj.find("i.fosco").text((val * min).formatMoney(0, ",", ".") + " - " + (val * max).formatMoney(0, ",", "."));
        else
            obj.find("i.fosco").text("");
    }

    function verificaNumero(e) {
        if (e.which != 8 && e.which != 45 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    }

    function ocultaExibeFiltroUnidade() {
        if ($('#filtroUnidades').is(':visible')) {
            $("#filtroUnidades").hide(400);
            $("#btnFiltro").attr('class', 'filtro-down');
        } else {
            $("#filtroUnidades").show(400);
            $("#btnFiltro").attr('class', 'filtro-up');
        }
    }

    $("#cboGaiaInc").change(function () {
        if ($(this).val() == 'true') {
            $("#cboIncorporadora").parent().show();
        }
        else {
            $("#cboIncorporadora").parent().hide();
            $("#cboIncorporadora").val(0);
        }
    }).change();

});

// Fução utilizada pela ficha digital
function gridReload() {
    $(".grid-reload").trigger("mouseover").trigger("click");
}

function CarregaCidade(value) {
    if (value != "0") {
        $.ajax({
            type: "POST",
            beforeSend: function () {
                $("#cboCidade").empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
            },
            url: "json/jsonEmpreendimentoCidade.ashx",
            data: "inUF=" + value,
            dataType: "json",
            success: function (msg) {
                tam = msg.cidades.length;
                var strOptions = '';
                $("#cboCidade").empty();
                strOptions += '<option value=\"0\">Todos</option>';
                for (i = 0; i < tam; i++)
                    strOptions += '<option value=\"' + msg.cidades[i].cidade.id_item + '\">' + msg.cidades[i].cidade.tx_item + '</option>';

                $("#cboCidade").append(strOptions).prop('disabled', false);
            }
        });
    }
}