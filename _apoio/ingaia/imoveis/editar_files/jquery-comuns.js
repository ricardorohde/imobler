// JScript File
(function($){
    /// <SUMMARY>
    /// CALCULA A PORCENTAGEM COM BASE EM UM VALOR (R$ 100,00) PASSADO
    /// </SUMMARY>
	$.fn.calculaPorcentagemDeValor = function(settings) {
		var defaults = {
			 objValorBaseCalculo: $("#txValor")
			,objResultado: $("#resultado")
			,objResultadoHidden: $("#resultado")
			,blValidaValor: false
			,txCalculoEvent: "keyup"
			,objControleEntrada: $("#campo")
			,blControlaEntradaValor: false
		};
		
		var settings = $.extend(defaults, settings);
		
		return this.each(function(){
		    $(this).bind(settings.txCalculoEvent, function(){
		        
		        objCorrent = $(this);
		        dlValorParaCalculo = parseFloat(FormataStringValorParaCalcular(objCorrent.val()));
		        dlValorBaseCalculo = parseFloat(FormataStringValorParaCalcular(settings.objValorBaseCalculo.val()));
		        
		        if(settings.blValidaValor){
		            
		            if(dlValorParaCalculo <= dlValorBaseCalculo){
		                dlPorcentagemCalculadoFinal = (dlValorParaCalculo / dlValorBaseCalculo) * 100;

                        settings.objResultado.val(FormataPorcentagemParaApresentacao(dlPorcentagemCalculadoFinal, 2));
                        
                        //VERIFICA SE O ELEMENTO EXISTE
                        if(settings.objResultadoHidden.length > 0){
                            settings.objResultadoHidden.val(FormataPorcentagemParaApresentacao(dlPorcentagemCalculadoFinal, 5));
                        }
                        
                        if(settings.blControlaEntradaValor){
                            settings.objControleEntrada.val("V");
                        }
		            }
		            else{
		                settings.objResultado.val(0);
		                objCorrent.val(0);
		            }
		        }else{
		            dlPorcentagemCalculadoFinal = (dlValorParaCalculo / dlValorBaseCalculo) * 100;
		            
                    if(settings.blFormataPorcentagem)
		                dlPorcentagemCalculadoFinal = dlPorcentagemCalculadoFinal.formatMoney(2, ",", ".");

                        settings.objResultado.val(dlPorcentagemCalculadoFinal);
                        
                        if(settings.blControlaEntradaValor){
                            settings.objControleEntrada.val("V");
                        }
		        }
		    });
		});
	}
	
	
	/// <SUMMARY>
    /// CALCULA O VALOR COM BASE NA PORCENTAGEM PASSADA
    /// </SUMMARY>
	$.fn.calculaValorDePorcentagem = function(settings) {
		var defaults = {
			 objValorBaseCalculo: $("#txValor")
			,objResultado: $("#resultado")
			,objResultadoHidden: $("#resultado")
			,blValidaValor: false
			,txCalculoEvent: "keyup"
		    ,txMaxPorcentagem: 100
		    ,objControleEntrada: $("#campo")
			,blControlaEntradaValor: false
		};
		
		var settings = $.extend(defaults, settings);
		
		return this.each(function(){
		    $(this).bind(settings.txCalculoEvent, function(){
		        
		        objCorrent = $(this);
		        
		        dlValorParaCalculo = parseFloat(FormataStringPorcentagemParaCalcular(objCorrent.val()));
		        dlValorBaseCalculo = parseFloat(FormataStringValorParaCalcular(settings.objValorBaseCalculo.val()));
		        
		        if(settings.blValidaValor){
		            if(dlValorParaCalculo <= settings.txMaxPorcentagem){
		                dlValorCalculadoFinal = (dlValorParaCalculo / 100) * dlValorBaseCalculo;
                        settings.objResultado.val(dlValorCalculadoFinal.formatMoney(2, ",", "."));
                        
                        if(settings.objResultadoHidden.length > 0){
                            settings.objResultadoHidden.val(objCorrent.val());
                        }
                        
                        if(settings.blControlaEntradaValor){
                            settings.objControleEntrada.val("P");
                        }
		            }
		            else{
		                settings.objResultado.val(0);
		                objCorrent.val(0);
		            }
		        }else{
		            dlValorCalculadoFinal = (dlValorParaCalculo / 100) * dlValorBaseCalculo;
                    settings.objResultado.val(dlValorCalculadoFinal.formatMoney(2, ",", "."));
                    
                    if(settings.blControlaEntradaValor){
                        settings.objControleEntrada.val("P");
                    }
		        }
		        
		    });
		});
	}
})(jQuery);