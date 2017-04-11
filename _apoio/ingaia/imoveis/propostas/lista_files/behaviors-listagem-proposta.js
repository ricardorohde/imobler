// JScript File
/***************************************************************/
//SCRIPTS USADOS NA LISTAGEM DE PROPOSTA

$(document).ready(function(){
    $('input.prettyCheckable').prettyCheckable();
});

function ApresentaCamposPeriodo(obj) {
    value = $(obj).val();
    switch (value) {
        case "1":
        case "2":
        case "3":
            $("#dtPeriodoI, #dtPeriodoF").parent().show();
            break;

        default:
            $("#dtPeriodoI, #dtPeriodoF").parent().hide();
            break;
    }
}

$("#cboPeriodo").change(function () {
    ApresentaCamposPeriodo($(this));
}).change();

//Evento da COMBO corretores
$("#cboCorretor").change(function () {
    CarregaCorretores($(this).val());
}).change();

$("#cboPretensao").change(function() {
    if ($("#chkEmNegociacao").is(':checked')) {
        if ($("#cboPretensao").val() != "") {
            CarregaEtapas($(this).val());
            $("#cboEtapa").parent().show();
        } else {
            $("#cboEtapa").parent().show();
            $("#cboEtapa").attr('disabled', 'disabled');
            $("#cboEtapa").val("");
        }
    } else {
        $("#cboEtapa").parent().hide();
        $("#cboEtapa").val("");
    }
    enableHintNegociation();
});

$("#cboEtapa").parent().hide();

$(".wrapperChkEmNegociacao .prettycheckbox").click(function () {
    if ($("#chkEmNegociacao:checked").length > 0) {
        if ($("#cboPretensao").val() != "") {
            $("#cboEtapa").parent().show();
            CarregaEtapas($("#cboPretensao").val());
        } else {
            $("#cboEtapa").parent().show();
            $("#cboEtapa").attr('disabled', 'disabled');
        }
    } else {
        $("#cboEtapa").parent().hide();
        $("#cboEtapa").val("");
    }
    enableHintNegociation();
});

$(".buttonOnFieldClear").click(function () {
    $("#chkEmNegociacao").next().attr('class', '');
    $("#chkComFechamento").next().attr('class', '');
});

//$("#chkComFechamento").click(function () {
//    $(this).attr('value', true);
//});
//
//$("#chkEmNegociacao").click(function () {
//    $(this).attr('value', true);
//});

popoverHint('.hint');

function enableHintNegociation() {
    if ($("#chkEmNegociacao").is(':checked') && $("#cboPretensao").val() == "") {
        $(".hint-negociation").show();
    } else {
        $(".hint-negociation").hide();
    }
}

//Preenche também os corretores INATIVOS
function CarregaCorretores(valor) {
    if (valor == "#" || valor == "") {
        $.ajax(
        {
            type: "POST",
            beforeSend: function () {
                $("#cboCorretor").empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
            },
            url: "json/jsonCorretores.aspx",
            data: "idCorretor=" + valor,
            success: function (msg) {
                eval('var obj = ' + msg);
                $('#cboCorretor').empty();
                var strOptions = '';
                strOptions += '<option value=\"0\">Todos</option>'

                //Define como padrão inicial
                var strAtivo = '9';

                //Percorre JSON
                for (i in obj) {
                    //Verifica se o corretor está no grupo de Ativos
                    if (obj[i].ativo == "True") //A comparação precisar ser com uma STRING mesmo
                    {
                        //Verifica se ja foi criado o OPTION GROUP ATIVOS
                        if (strAtivo == '9') {
                            //Adiciona OPTION GROUP ATIVOS
                            strOptions += '<optgroup label=\"Ativos\">';
                            strAtivo = '1';
                        }

                        //Adicona demais itens ATIVOS
                        strOptions += '<option value=\"' + obj[i].id + '\">' + obj[i].texto + '</option>'
                    }
                    else {
                        //Verifica se é o primeiro INATIVO
                        if (strAtivo == '1') {
                            //Adiciona OPTION GROUP INATIVO
                            strOptions += '</optgroup>';
                            strOptions += '<optgroup label=\"Inativos\">';
                            strAtivo = '0';
                        }

                        //Adicona demais itens INVATIVOS
                        strOptions += '<option value=\"' + obj[i].id + '\">' + obj[i].texto + '</option>'

                    }
                }

                strOptions += '</optgroup>';

                $("#cboCorretor").append(strOptions).prop('disabled', false).trigger("change");
            }
        });
    }
}

function CarregaEtapas(value) {
    $.ajax(
        {
            type: "GET",
            dataType: "json",
            beforeSend: function () {
                $("#cboEtapa").empty().prop('disabled', true).append("<option value='0'>Carregando...</option>");
            },
            url: "json/configuracoes/Negotiation/stage.ashx",
            data: "method=GetStageAll&is_sale=" + value,
            success: function (t) {
                $("#cboEtapa").empty();
                $("#cboEtapa").append("<option value=''>Selecione</option>");

                for (i = 0; i < t.data.length; i++) {
                    if (t.data[i].is_active) {
                        $("#cboEtapa").append("<option value=" + t.data[i].stage_id + ">" + t.data[i].name + "</option>");
                    }
                }

                $("#cboEtapa").prop('disabled', false).trigger("change");
            },
            error: function(error) {

            }
        });
}