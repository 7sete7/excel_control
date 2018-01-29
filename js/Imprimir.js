$(document).ready(function() {
  $(document).on('click', '#linkPrint', abreModalPrint);
  $(document).on('keypress', '#searchPrint', gerarNegocio);
  $(document).on('click', '#imprimir', imprimir);
});

function abreModalPrint() {
  if($(this).hasClass('disabled')) return;
  $('#printModal').modal();
}

function gerarNegocio(e) {
  if(e.keyCode != 13) return;

  let content = $(this).val();
  if(!content.length) return;

  let data = procurarNaTabela(content, 0, true)[0];
  $('#containerPrint').html('');
  checks();
}

function criarIframe() {

}

function imprimir() {

}

function checks() {
  $('#containerPrint').html(`
  <label class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input">
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Aramado</span>
  </label>
  ${template.aramado()}

  <label class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input">
    <span class="custom-control-indicator"></span>
    <span class="custom-control-description">Pendant</span>
  </label>
  ${template.pendant()}

  <label class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input">
  <span class="custom-control-indicator"></span>
  <span class="custom-control-description">Piso</span>
  </label>
  ${template.piso(1234, 0, 80, 'Gravata')}
  `);

}
