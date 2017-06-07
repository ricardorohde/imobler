var _currentImovelId = null;

//verifica se a janela atual é um iframe ou não
var isIframe = function () {
  return self == top
}();

var $base = (isIframe ? self.$ : parent.$)

$(function () {

    // Está na ficha digital do imóvel
    if (window.location.pathname != undefined && window.location.pathname != '' && window.location.pathname.toString().search('fichaCompleta') > 0) {
        current_page = "propertyDigitalSheetPage";
        pagePropertyDigitalSheet();
    } else {
        // Está na página de edição/cadastro do imóvel
        current_page = "propertyDetailPage";
        pagePropertyDetail();
    }

    $('#gaiaFlixTicketModal').on('shown.bs.modal', function (e) {
      var $this = $(this);
      var $elPrice = $this.find('.price-cupom');
      if(!$elPrice.text().length > 0)
        getPricePlanSingle($elPrice);
    });

    clickContractGaiaFlix();
    clickRequestVouchersToManager();
});

function pagePropertyDetail() {

    // Está CADASTRANDO imóvel
    if (window.location.hash.toString().search('novo') > 0
        || window.location.hash.toString().search('duplicar') > 0) { // Está CADASTRANDO ou DUPLICANDO imóvel
        $.ajax({
            type: 'GET'
            , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_status.ashx')
            , data: {
                'action': 'new'
            }
            , dataType: 'json'
            , success: function (json) {
                if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea) {
                    // Botão indicar para o proprietário
                    showGaiaFlix();
                    if (json.AutomaticEmailEnabled) {
                        addLink(true, "O inGaia Flix será indicado", "indicate-gaiaflix", false, "btn-success");
                        disableLink();
                        addHiddenField(1);
                    } else {
                        if (json.ProfileCanIndicateGaiaFlix) {
                            addLink(false, "Indicar para o proprietário", "indicate-gaiaflix", false);
                            addHiddenField(0);
                            clickIndicateGaiaFlix();
                        }
                    }
                }
            }
            , error: function (json) {
            }
        });
    } else if (window.location.hash.toString().search('alterar') > 0) { // Está EDITANDO imóvel
        $.ajax({
            type: 'GET'
            , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_status.ashx')
            , data: {
                'id_imovel': getPropertyId(),
                'action': 'edit'
            }
            , dataType: 'json'
            , success: function (json) {
                if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea) {
                    showGaiaFlix();

                    // Verificando voucher
                    if (json.HasVoucher) {
                        // Caso possua voucher, desabilita o botão e mostra como contratado
                        addLink(true, "Contratado", "contract-gaiaflix", false, "btn-success");
                        disableLink();
                    } else {
                        if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea && json.ProfileCanIndicateGaiaFlix) {
                            addLink(false, "Agendar com um fotógrafo profissional", "contract-gaiaflix", true);
                        }
                    }

                    // Verificando LEAD
                    if (json.lead_id > 0) { // Já existe um lead para este imóvel
                        status = getStatusText(json.lead_status);
                        addLink(true, status, "indicate-gaiaflix", false, "btn-success");
                        disableLink();
                    } else { // Este imóvel ainda não possui lead
                        if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea && json.ProfileCanIndicateGaiaFlix) {
                            addLink(false, "Indicar para proprietário", "indicate-gaiaflix", false);
                            clickPostIndicateGaiaFlix();
                        }
                    }
                }


            }
            , error: function (json) {
            }
        });
    }
}

function pagePropertyDigitalSheet() {
    var btnContratar = '#opcoes_fichas .tbGaiaFlix a#contract-gaiaflix';
    var $btnContratar = $(btnContratar);


    $('#contract-gaiaflix').click(function(e){
      e.preventDefault();
      //if(isIframe)
      $base('#gaiaFlixTicketModal').modal('show');
    });

    $.ajax({
        type: 'GET'
        , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_status.ashx')
        , data: {
            'id_imovel': getPropertyId(),
            'action': 'edit'
        }
        , dataType: 'json'
        , success: function (json) {
            if (json.lead_id > 0) { // Já existe um lead para este imóvel
                status = getStatusText(json.lead_status);
                createSuccessButton("#content #opcoes_fichas .tbGaiaFlix a#indicate-gaiaflix", status, function(el){
                    el.attr("href", null);
                });
            } else { // Este imóvel ainda não possui lead
                if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea && json.ProfileCanIndicateGaiaFlix) {
                    clickPostIndicateGaiaFlix();
                }
            }
            // Verificando voucher
            if (json.HasVoucher) {
                // Caso possua voucher, desabilita o botão e mostra como contratado
                createSuccessButton(btnContratar,'O serviço foi contratado',function(el){
                    el.attr("href", null);
                });
            }
            else {
                if (json.GaiaFlixEnabled && json.AgencyBranchInCoveredArea) {
                    $btnContratar.text("Agendar com fotógrafo profissional");

                    $btnContratar.click(function (e) {
                        e.preventDefault();
                        fancyboxZIndex('bottom', true);

                        parent.gfImovelId = $btnContratar.data('imovel-id');
                        console.log('imóvel selecionado: ' + parent.gfImovelId);

                        $base('#gaiaFlixTicketModal').on('hide.bs.modal', function (e) {
                            fancyboxZIndex('top', true);
                        });

                        $base('#gaiaFlixTicketModal').modal('show');
                    });
                }
            }
        }
        , error: function (json) {
        }
    });
}

/*
  Funcao que resgata preço do plano single para exibir na modal de contratação
*/
function getPricePlanSingle($el){
  $.ajax({
    type: 'GET',
    url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_vouchers.ashx?method=get_single_plan'),
    dataType: 'json',
    success: function (json) {
      var json = json.data;
      var valorInstalment = parseFloat(json.plan.price / json.plan.max_instalments).toFixed(2);
      $el.text(json.plan.max_instalments + 'x de R$ ' + valorInstalment.replace('.',','));
    },
    error: function (json) {
      $el.parent('p').hide();
    }
  });
}

// Param isTop define se a modal será chamada de outra modal
function showModalPagamentoGaiaflix(){

  $.ajax({
      type: 'GET',
      url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_vouchers.ashx?method=get_payment_url&paymentType=broker'),
      dataType: 'json',
      success: function (json) {
          iframe_url = json.URL + 'package_slug=single'
          $base('#gaiaFlixModalPagamento').find('iframe').attr('src', iframe_url);

          fancyboxZIndex('bottom');
          $base('#gaiaFlixModalPagamento').on('hide.bs.modal', function (e) {
              fancyboxZIndex('top');
          });

          $base('#gaiaFlixModalPagamento').modal('show');

      },
      error: function (json) {

      }
  });

}


function clickRequestVouchersToManager() {
    var id = '#gaiaflix-solicitar-cupom';
    var $this = $base(id);

    $this.click(function (e) {
      e.preventDefault();

      if($this.prop('disabled'))
        return
      else{
        $.ajax({
          type: 'GET',
          url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_vouchers.ashx?method=request_vouchers_to_my_manager'),
          data: {
            'imovelId': parent.gfImovelId
          },
          dataType: 'json',
          beforeSend: function () {
            // Desabilita para evitar duplo clique no botão
            $this.prop('disabled', true);
          },
          success: function (json) {
            $this.html('Cupons solicitados ao Diretor!');
            $this.prop('disabled', true);
            $this.css('cursor','default');
          },
          error: function (json) {
            $this.prop('disabled', false);
          }
      });
    }
  });

}

/* Faz com que o Fancybox não suma mas esteja abaixo da modal de contratacao do Gaiaflix
Parametro opt recebe top ou bottom - bottom: o fancybox fica abaixo da modal de contratacao, top: volta ao estado normal
*/
function fancyboxZIndex(opt){
  if(opt == 'top'){
      $base('#fancybox-wrap').attr('style', function(i,s) { return s + 'z-index: 1130 !important;' });
      $base('#fancybox-overlay').css('z-index',1100);
  }else if(opt == 'bottom'){
      $base('#fancybox-wrap').attr('style', function(i,s) { return s + 'z-index: 0 !important;' });
      $base('#fancybox-overlay').css('z-index',1);
  }
}

function createSuccessButton(selector, text, after){
    $(selector).attr("class", "btn btn-success disable");
    $(selector).html("<span class='action-label'><i class='fa fa-check-circle'></i>"+text+"</span>");
    if(after != undefined)
        after($(selector));
}

function clickPostIndicateGaiaFlix() {
    $("#indicate-gaiaflix:not('.disabled')").click(function (e) {
        e.preventDefault();
        var $this = $(this);

        $this.addClass('disabled');
        $this.html('<i class="fa fa-spinner fa-spin"></i>' + $this.text() + '...');
        $.ajax({
            type: 'GET'
            , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_create_lead.ashx')
            , data: {
                'id_imovel': $('#indicate-gaiaflix').data('imovel-id')
            }
            , dataType: 'json'
            , beforeSend: function () {
                // Desabilita para evitar duplo clique no botão
                $this.attr("href", null);
                $this.addClass('disable');
            }
            , success: function (json) {
                createSuccessButton("#"+$this.attr('id'), "O inGaia Flix será indicado");
            }
            , error: function (json) {
                $this.attr("href", "#");
                $this.removeClass('disable');
            }
        });
    });
}

function clickIndicateGaiaFlix() {
    $("#GaiaFlix #indicate-gaiaflix").click(function (event) {
        event.preventDefault();

        indicateGaiaFlix = $("#GaiaFlix input[id='hdIndicateGaiaFlix']");
        if (indicateGaiaFlix.val() == 0) { // Não está indicando o GaiaFlix
            indicateGaiaFlix.val('1');

            createSuccessButton("#GaiaFlix a","O inGaia Flix será indicado",function(el){
                el.attr("href", null);
                el.removeAttr("onclick");
            });

        }
    });
}

function contractErrorMessage(errorMessage) {
    $("#gaiaflix-error-message", window.parent.document).html(errorMessage);
}

function compraSucesso(url){
  var redirect_url = url;

  var target1, target2;

  if(current_page == "propertyDetailPage"){
      target1 = $('#gaiaFlixTicketModal');
      target2 = $('#gaiaFlixDirecionarAgendamento');
  }else{
      target1 = parent.$('#gaiaFlixTicketModal');
      target2 = parent.$('#gaiaFlixDirecionarAgendamento');
  }

  target2.find('#lnkRedirectGaiaflixAgendamento').attr('href', url);

  target2.on('hidden.bs.modal', function (e) {
      fancyboxZIndex('top');
      target1.off('hidden.bs.modal');
  });

  target1.on('hidden.bs.modal', function (e) {
      fancyboxZIndex('bottom');

      var thisIframe = $('iframe[src*="fichaCompleta.aspx"]');

      $base("#contract-gaiaflix").attr("class", "btn btn-success disable").prop('disabled');
      $base("#contract-gaiaflix").text('O serviço foi contratado').prepend("<i class='fa fa-check-circle'></i>");
      $base("#contract-gaiaflix").prop('onclick', null).off('click');

      // Desabilita, troca texto e retira click para modal do botão Contratar
      $base("#contract-gaiaflix").removeAttr("data-toggle");
      $base("#contract-gaiaflix").removeAttr("data-target");
      disableLink();

      target2.modal();
      window.open(redirect_url, '_blank');

      setTimeout(function () {
          target2.modal('hide');
      }, 5000);
  });

  $('#lnkRedirectGaiaflixAgendamento').click(function(e){
    target2.modal('hide');
  });

  target1.modal('hide');
}

function clickContractGaiaFlix() {
    var $el = $base('#gaiaflix-cupom');

    $el.click(function(e){
        e.preventDefault();
        var voucher_number = getVoucherNumber();

        if (voucher_number == "" || typeof voucher_number == 'undefined') {
            contractErrorMessage("Por favor, informe o cupom.");
        } else {
            contractErrorMessage("");

            $.ajax({
                type: 'GET'
                , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_vouchers.ashx?method=check_voucher')
                , data: {
                    'voucher': voucher_number
                }
                , dataType: 'json'
                , beforeSend: function () {
                    // Desabilita para evitar duplo clique no botão
                    $el.prop('disabled', true);
                }
                , success: function (json) {
                    if (json.data.status == "NOT_USED") {
                        $.ajax({
                            type: 'GET'
                            , url: getHandlerUrl('/admin/modules/GaiaFlix/gaiaflix_vouchers.ashx?method=create_lead_voucher')
                            , data: {
                                'id_imovel': parent.gfImovelId != undefined ? parent.gfImovelId : $("#idImovel").val(),
                                'voucher_number': voucher_number
                            }
                            , dataType: 'json'
                            , success: function (json) {
                                compraSucesso(json.RedirectUrl);
                            }
                            , error: function (json) {
                                contractErrorMessage("Já existe um cupom utilizado neste imóvel.");
                                // reabilita o botão
                                $el.prop('disabled', false);
                            }
                        });
                    } else if (json.data.status == "USED") {
                        contractErrorMessage("Este cupom já foi utilizado.");
                        // reabilita o botão
                        $el.prop('disabled', false);
                    } else if (json.data.status == "NOT_FOUND") {
                        contractErrorMessage("Este cupom não foi encontrado. Por favor, tente outro número.");
                        // reabilita o botão
                        $el.prop('disabled', false);
                    }
                }
                , error: function (json) {
                    contractErrorMessage("Não foi possível completar a operação. Tente novamente mais tarde.");
                    $el.prop('disabled', false);
                }
            });

        }
    });

    $base('#gaiaflix-comprar-cupom').click(function(e){
      e.preventDefault();

        $base("#gaiaFlixTicketModal").modal('hide');
        showModalPagamentoGaiaflix();
    });
}

function getStatusText(lead_status) {
    switch (lead_status) {
        case 'PENDING':
            return "O inGaia Flix será indicado";
        case 'SENT':
        case 'READ':
        case 'CLICKED':
            return "O inGaia Flix foi indicado";
        case 'CONVERTED':
            return "inGaia Flix contratado";
        default:
            return "";
    }
}

// Gets the voucher number from textbox
function getVoucherNumber() {
    return $base(".form-inline #insertCupomControl").val().trim();
}

function getPropertyId() {
    return _currentImovelId || $base("#idImovel").val();
}

// Gets the key from querystring
function getKey(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

// Adds a hidden field which indicates that wether the user wants to indicate GaiaFlix or not
function addHiddenField(value) {
    $("#GaiaFlix").append("<input type='hidden' id='hdIndicateGaiaFlix' name='hdIndicateGaiaFlix' value='" + value + "'></input>");
}

function disableLink() {
    $("#GaiaFlix a").attr("href", null);
}

function showGaiaFlix() {
    $("#GaiaFlix").attr("style", "display:block;");

    var htmlAppend = '<img src="../admin/modules/GaiaFlix/img/logo-normal.png" alt="Gaiaflix" class="logo" />'+
    '<strong class="chamadaTitulo">Fotos e vídeos profissionais</strong>';

    $("#GaiaFlix").append(htmlAppend);
}

function changeText(id, text) {
    $("#GaiaFlix a#" + id + " > span").text(" " + text);
}

function addLink(disable, text, id, modal, _class) {

    var _class = _class || 'btn-primary';
    var htmlAppend = "<a href='#' id='" + id + "' class='btn "+ _class + "'";

    if (modal) {
        htmlAppend += "data-toggle='modal' data-target='#gaiaFlixTicketModal'";
    }

    htmlAppend += ">";

    if(_class == "btn-success"){
        htmlAppend += "<i class='fa fa-check-circle'></i>";
    }

    htmlAppend += "<span class='action-label'></span></a>";

    if (modal) {
        $("#GaiaFlix").append(htmlAppend).bind('click', function(e){
            e.preventDefault();
            contractErrorMessage("");
        });

    } else {
        $("#GaiaFlix").append(htmlAppend);
    }

    changeText(id, text);

    if (disable) {
        $("#GaiaFlix a#" + id).addClass('disable');
    }
}

function getHandlerUrl(url) {
    if (window.location.pathname != undefined && window.location.pathname != ''
        && window.location.pathname.toString().search('homologacao') > 0) {
        // homologacaoXX/<path>
        return "/" + window.location.pathname.split('/')[1] + url;
    }
    return url;
}
