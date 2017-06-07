<div id="page-wrapper">
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="page-header"><?php echo $section['title']; ?></h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div id="page-content">
          <form method="post" action="<?php echo base_url($form_action); ?>" role="form">

            <h3>Localização do imóvel</h3>

            <div class="form-group">
              <label>CEP</label>
              <input class="form-control cep-mask" name="cep">
              <p class="help-block"><small>Não sabe o CEP? <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Clique aqui</a>!</small></p>
            </div>

            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label>Endereço</label>
                  <input class="form-control" placeholder="Enter text">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group">
                  <label>Número</label>
                  <input class="form-control" placeholder="Enter text">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label>Bairro</label>
                  <input class="form-control" placeholder="Enter text">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group">
                  <label>Cidade</label>
                  <input class="form-control" placeholder="Enter text">
                </div>
              </div>

              <div class="col-sm-4">
                <div class="form-group">
                  <label>Estado</label>
                  <input class="form-control" placeholder="Enter text">
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>MOSTRAR ENDEREÇO:</label><br>

              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked>Completo
              </label>
              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">Somente rua
              </label>
              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">Não mostrar
              </label>
            </div>

            <hr>

            <h3>Características do imóvel</h3>

            <?php
            $caracteristicas = array(
              'dormitorios' => 'Dormitórios',
              'salas' => 'Salas',
              'banheiros' => 'Banheiros',
              'suites' => 'Suítes',
              'garagens' => 'Garagens'
            );
            ?>
            <div class="row">
              <?php
              foreach ($caracteristicas as $caracteristica_slug => $caracteristica_nome) {
                ?>
                <div class="col-sm-2">
                  <div class="form-group">
                    <label><?php echo $caracteristica_nome; ?></label>
                    <select name="<?php echo $caracteristica_slug; ?>" class="form-control">
                      <option value="0"></option>
                      <?php
                      for($item = 1 ; $item <= 20 ; $item++){
                        ?>
                        <option <?php echo isset($post[$caracteristica_slug]) && $post[$caracteristica_slug] == $item ? 'selected="true"' : ''; ?> value="<?php echo $item; ?>"><?php echo $item; ?></option>
                        <?php
                      }
                      ?>
                    </select>
                  </div>
                </div>
                <?php
              }
              ?>
            </div>


            <button type="submit" class="btn btn-default">Submit Button</button>
            <button type="reset" class="btn btn-default">Reset Button</button>

            <div class="form-group">
              <label>Static Control</label>
              <p class="form-control-static">email@example.com</p>
            </div>
            <div class="form-group">
              <label>File input</label>
              <input type="file">
            </div>
            <div class="form-group">
              <label>Text area</label>
              <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label>Checkboxes</label>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="">Checkbox 1
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="">Checkbox 2
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox" value="">Checkbox 3
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Inline Checkboxes</label>
              <label class="checkbox-inline">
                <input type="checkbox">1
              </label>
              <label class="checkbox-inline">
                <input type="checkbox">2
              </label>
              <label class="checkbox-inline">
                <input type="checkbox">3
              </label>
            </div>
            <div class="form-group">
              <label>Radio Buttons</label>
              <div class="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>Radio 1
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Radio 2
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">Radio 3
                </label>
              </div>
            </div>
            <div class="form-group">
              <label>Inline Radio Buttons</label>
              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline1" value="option1" checked>1
              </label>
              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline2" value="option2">2
              </label>
              <label class="radio-inline">
                <input type="radio" name="optionsRadiosInline" id="optionsRadiosInline3" value="option3">3
              </label>
            </div>
            <div class="form-group">
              <label>Selects</label>
              <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label>Multiple Selects</label>
              <select multiple class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <button type="submit" class="btn btn-default">Submit Button</button>
            <button type="reset" class="btn btn-default">Reset Button</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
