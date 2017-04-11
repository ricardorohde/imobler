// JScript File
(function ($) {
    $.fn.gridfile = function (setting) {
        var defaults = {
            id: 0
           , tamanhoArquivoImob: 5242880
           , tamanhoArquivoUsado: 0
           , objTotalArquivo: $("#hdTotalArquivo")
           , objCarregaArquivo: $("#tableArquivos")
           , txUsuarioCadastro: ""
           , txCarregaPlugIn: ""
           , txMaxTamanhoArquivo: "5mb"
           , txURLGerenciaUpload: "modules/imoveis_beta/imovel-upload-arquivo.ashx"
           , txURLFlash: "../admin/swf/plupload.flash.swf"
           , blMultiSelecao: false
           , txFuncionalidade: 'imóvel'
           , listMensagem: {
               MaximoTamanhoArquivoExcedido: "Excedido o tamanho de [MAXTAMANHOARQUIVO]MB em arquivo(s) neste [MODULO]."
               , ConfirmacaoExclusao: "Deseja mesmo excluir esse arquivo?"
           }
           , listPermisao: [
                { "id_permissao": 1, "tx_permissao": "Apenas p/ a direção" }
               , { "id_permissao": 2, "tx_permissao": "Todos" }
           ]
        };

        var setting = $.extend(defaults, setting);

        return this.each(function () {
            ////////////
            //variáveis de controle
            var alterar = (setting.id > 0);
            var totalArquivo = setting.objTotalArquivo.val();
            var totalKB = 0;

            var bytes = 1;              // byte
            var kBytes = bytes * 1024; // kilobyte
            var mBytes = kBytes * 1024; // megabyte
            var gBytes = mBytes * 1024; // gigabyte
            var tBytes = gBytes * 1024; // terabyte
            var listUnidadesValores = { "BYTES": bytes, "KB": kBytes, "MB": mBytes, "GB": gBytes, "TB": tBytes }

            //na alteração já carrega os bytes de arquivos carregados anteriormente
            ControlaTotalBytesPublicados(setting.tamanhoArquivoUsado, "INCLUIR");

            //formatação de alguma das informações (setting)
            setting.tamanhoArquivoImob = FormataStringVirgulaParaCalcular(setting.tamanhoArquivoImob);

            if ($("#pickfiles").length) {
                //instância plupload
                var uploader = new plupload.Uploader({
                    runtimes: 'gears,html5,flash,silverlight,browserplus'
                    , multi_selection: setting.blMultiSelecao
                    , max_file_size: setting.txMaxTamanhoArquivo
                    , unique_names: true
                    , container: setting.txCarregaPlugIn
                    , url: setting.txURLGerenciaUpload
                    , browse_button: 'pickfiles'
                    , flash_swf_url: setting.txURLFlash
                    , multipart_params: { 'id': setting.id }
                });


                /*uploader.bind('Init', function(up, params) {
                    alert(params.runtime);
                });*/

                uploader.init();

                uploader.bind('FilesAdded', function (up, files) {
                    $.each(files, function (i, file) {
                        ControlaTotalBytesPublicados(file.size, "INCLUIR");

                        if (totalKB > setting.tamanhoArquivoImob) {
                            alert(MontaMensagemMaxTamanhoExcedido(
                                    FormataPorcentagemParaApresentacao(FormataTamanhoArquivo(setting.tamanhoArquivoImob, "MB"), 2)
                                    , setting.txFuncionalidade
                                  ));

                            uploader.removeFile(file);
                            ControlaTotalBytesPublicados(file.size, "EXCLUIR");
                        }
                        else if (file.status == 1) {

                            var html = MontaLinhaArquivo(
                                               file.id                        // alfanumerico aleatório
                                             , file.name                      // nome do arquivo
                                             , plupload.formatSize(file.size) // tamanho do arquivo
                                             , setting.txUsuarioCadastro      // nome do usuário logado
                                             , setting.txUsuarioCadastro);    // nome do usuário logado

                            //adiciona conteúdo html ao html existente na página.
                            setting.objCarregaArquivo.append(html);

                            //Atocha uma função para o botão excluir arquivo.
                            $("tr[id=" + file.id + "]").find("a[class=classRemoveArquivo]").bind("click",
                                function () {
                                    removeArquivo($(this), file.size);
                                    return (false);
                                });

                            SetaHiddenPermissao(file.id);
                        }
                    });

                    //Inicia o carregamento do arquivo
                    uploader.start();
                });

                uploader.bind('FileUploaded', function (up, file, info) {
                    //chamado quando um arquivo finalizou o upload
                    try { eval('var resposta = ' + info.response); } catch (e) { }
                    var htmlAppend = $("tr[id=" + file.id + "]").find("td[class=classDadosArquivo]");

                    if (resposta.sucesso) {
                        htmlAppend.append(MontaDadosHiddenArquivo(
                                                         file.id                          // número aleatório
                                                       , file.name                        // nome arquivo
                                                       , resposta.arquivos[0].nomeHash    // nome arquivo hash
                                                       , file.size                        // tamanho arquivo bytes
                                                       , resposta.arquivos[0].imobiliaria // id imobiliaria
                                                       , resposta.arquivos[0].filial));   // id filial

                        totalArquivo++;
                        setting.objTotalArquivo.val(totalArquivo);
                    }
                    else {
                        var html = "O arquivo não pode ser salvo.\n\n";
                        for (er in resposta.erro) {
                            try { html += "[" + resposta.erro[er].mensagem + "]" + '\n'; }
                            catch (err) { }
                        }

                        alert(html);
                        uploader.removeFile(file);
                        $("tr[id=" + file.id + "]").remove();
                    }
                });

                uploader.bind('UploadProgress', function (up, file) {
                    MontaLoadArquivo(file);
                });

                uploader.bind('Error', function (up, args) {
                    alert(args.message);
                });

            }


            /////////FUNÇÕES

            if (alterar) {
                setting.objCarregaArquivo.find("a[class=classRemoveArquivo]").each(
                    function () {
                        tamanho = $(this).parent().parent().find("input[name=hdTamanhoArquivo]").val();
                        $(this).bind("click", function () {
                            removeArquivo($(this), tamanho);
                            return (false);
                        });
                    });

                setting.objCarregaArquivo.find("select[id^=cboPermissaoArquivo_]").each(
                    function () {
                        var obj = $(this).attr("id").replace("cboPermissaoArquivo_", "");
                        SetaHiddenPermissao(obj);
                    });
            }

            function MontaLoadArquivo(arquivo) {
                if (arquivo.percent >= 100) {
                    $("tr[id=" + arquivo.id + "]").find("div[class=classLoad]").html('').hide();
                } else {
                    $("tr[id=" + arquivo.id + "]").find("div[class=classLoad]").html('').append(arquivo.percent + "%");
                }
            }

            function MontaMensagemMaxTamanhoExcedido(maxtamanhoarquivo, modulo) {
                return setting.listMensagem.MaximoTamanhoArquivoExcedido.fullReplace("[MAXTAMANHOARQUIVO]", maxtamanhoarquivo)
                                                                        .fullReplace("[MODULO]", modulo);
            }

            function MontaLinhaArquivo(id, nome, tamanho, usuario, usuarioAlteracao) {
                var retorno = "";
                var dataApresentacao = ObtemDataAtual();
                var classArquivo = ObtemClassByExtensao(ObtemExtensaoArquivo(nome));

                retorno += "<tr id='" + id + "'>";
                retorno += "   <td class='classDadosArquivo' style='display:none'></td>";
                retorno += "   <td>";
                retorno += "   <a target='_blank' title='Baixar' href='modules/imoveis_beta/download-arquivos.ashx?idArquivo=0' class='classDownloadArquivo' id='download_" + id + "' >download</a>";
                retorno += "   <a title='Excluir' href='#' class='classRemoveArquivo' id='remove_" + id + "' >excluir</a>";
                retorno += "</td>";


                retorno += "   <td class='" + classArquivo + "'>" + nome + ' ' + tamanho + "<div class='classLoad'></div></td>";
                retorno += "   <td>" + usuario + "</td>";
                retorno += "   <td>" + dataApresentacao + "</td>";

                retorno += "   <td>";
                retorno += "      <select id='cboPermissaoArquivo_" + id + "' name='cboPermissaoArquivo'>"

                for (a = 0; a < setting.listPermisao.length; a++)
                    try {
                        retorno += "  <option value='" + setting.listPermisao[a].id_permissao + "'>" + setting.listPermisao[a].tx_permissao + "</option>"
                    } catch (e) { }

                retorno += "      </select>"
                retorno += "   </td>";
                retorno += "</tr>";

                return retorno;
            }

            function MontaDadosHiddenArquivo(id, nome, nomeHash, tamanho, imobiliaria, filial) {
                var retorno = "";
                var linkDownload = "";

                //monta link de download do arquivo quando não tem o id do arquivo
                linkDownload = $("tr[id=" + id + "]").find("a[class=classDownloadArquivo]").attr("href");
                linkDownload = linkDownload + "&filial=" + filial;
                linkDownload = linkDownload + "&fileHash=" + nomeHash;
                linkDownload = linkDownload + "&file=" + nome;

                $("tr[id=" + id + "]").find("a[class=classDownloadArquivo]").attr("href", linkDownload);

                //html para atachar na td do arquivo corrente.
                retorno += "<input type='hidden' name='hdNomeArquivo'        id='hdNomeArquivo_" + id + "' value='" + nome + "'>";
                retorno += "<input type='hidden' name='hdNomeHashArquivo'    id='hdNomeHashArquivo_" + id + "' value='" + nomeHash + "'>";
                retorno += "<input type='hidden' name='hdTamanhoArquivo'     id='hdTamanhoArquivo_" + id + "' value='" + tamanho + "'>";
                retorno += "<input type='hidden' name='hdImobiliariaArquivo' id='hdImobiliariaArquivo_" + id + "' value='" + imobiliaria + "'>";
                retorno += "<input type='hidden' name='hdFilialArquivo'      id='hdFilialArquivo_" + id + "' value='" + filial + "'>";
                retorno += "<input type='hidden' name='hdAcaoArquivo'        id='hdAcaoArquivo_" + id + "' value='1'>";
                retorno += "<input type='hidden' name='hdIdArquivo'          id='hdIdArquivo_" + id + "' value='0'>";
                retorno += "<input type='hidden' name='hdIdPermissao'          id='hdIdPermissao_" + id + "' value='1'>";

                return retorno;
            }


            function removeArquivo(elemento, tamanho) {

                if (confirm(setting.listMensagem.ConfirmacaoExclusao)) {
                    var dados = elemento.parent().parent().find("td[class=classDadosArquivo]");
                    dados.find("input[id^=hdAcaoArquivo_]").val("0");
                    dados.parent().hide();

                    ControlaTotalBytesPublicados(tamanho, "EXCLUIR");

                }
                return (false);
            }

            function ControlaTotalBytesPublicados(tamanho, acao) {
                if (tamanho <= 0) {
                    return (false);
                }

                tamanho = FormataStringVirgulaParaCalcular(tamanho);

                if (typeof (tamanho) == "object" || typeof (tamanho) == "string") {
                    tamanho = parseInt(tamanho);
                }

                if (acao === "INCLUIR") {
                    totalKB = totalKB + tamanho;
                    return (true);
                } else if (acao === "EXCLUIR") {
                    totalKB = totalKB - tamanho;
                    return (true);
                }
            }

            //Obtem a class para apresentação do arquivo.
            function ObtemClassByExtensao(extensao) {
                if (extensao != "") {
                    return "classExtensao" + extensao.toUpperCase();
                } else {
                    return "classExtensao";
                }
            }

            //Obtem a data atual. No formato dia/mês/ano. dd/mm/yyyy
            function ObtemDataAtual() {
                var data = new Date();
                return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
            }

            //Obtem a extensão do arquivo. Seguindo o nome do arquivo passado no parametro
            function ObtemExtensaoArquivo(nome) {
                return nome.split('.')[nome.split('.').length - 1];
            }

            //Formata uma unidade computacional para outra.
            //Exemplos: de KB para MB
            //          de MB para GB
            //          de KB para GB
            function FormataTamanhoArquivo(tamanho, UNIDADE) {
                var arrResult = new Array();
                tamanho = FormataStringVirgulaParaCalcular(tamanho);
                tamanho = tamanho / listUnidadesValores[UNIDADE];

                arrResult.push(tamanho);  // alterado: tamanho
                arrResult.push(UNIDADE);  // alterado: unidade

                return arrResult;
            }

            function SetaHiddenPermissao(id) {
                $('#cboPermissaoArquivo_' + id).change(function () {
                    $("#hdIdPermissao_" + id).val($('#cboPermissaoArquivo_' + id).val());
                }).change();
            }

        });
    }
})(jQuery);