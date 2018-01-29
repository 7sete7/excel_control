$(document).ready(function() {
  $(document).on('click', '#linkPrint', abreModalPrint);
  $(document).on('keypress', '#searchPrint', gerarNegocio);
  $(document).on('click', '#imprimir', criarIframe);
});

// Mostra a modal de imprimir quando clicado no link
function abreModalPrint() {
  if($(this).hasClass('disabled')) return;
  $('#printModal').modal();
}

//Pega os dados em geral
function gerarNegocio(e) {
  if(e.keyCode != 13) return;

  let content = $(this).val();
  if(!content.length) return;

  let data = procurarNaTabela(content, 0, true)[0];
  if(!data) return;
  gerarTemplatesImpressao(data);
}

//Gera o iframe
function criarIframe() {
  let selecionados = $('#containerPrint input:checked');

  var iframe = iframe || $(`<iframe id="printFrame" name="printFrame" style="display: none;"></iframe>`)
    .appendTo('body');

  iframe.contents().find('body').html(' ');
  iframe.contents().find('head')
    .html(`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="css/css.css" /><link rel="stylesheet" type="text/css" href="css/PrintCss.css"/>`);

  for(c of selecionados){
    let [tabela,] = $(c).parent().parent().children('table');
    iframe.contents().find('body').append($(tabela).clone());
  }

  iframe.ready(() => setTimeout(imprimir, 250));
}

//Imprime
function imprimir() {
  window.frames["printFrame"].focus();
  window.frames["printFrame"].print();
}

//Cria os templates de impressão
function gerarTemplatesImpressao(data) {
  $('#containerPrint').html('');
  $('#containerPrint').append(`
    <div id="printAramado">
      <label class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">Aramado</span>
      </label>
      ${template.aramado()}
    </div>
  `);

  $('#containerPrint').append(`
    <div id="printPendant">
      <label class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input">
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">Pendant</span>
      </label>
      ${template.pendant()}
    </div>
  `);

  $('#containerPrint').append(`
    <div id="printPiso">
      <label class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" checked>
        <span class="custom-control-indicator"></span>
        <span class="custom-control-description">Piso</span>
      </label>
      ${template.piso(data[1], 0, data[3], data[2])}
    </div>
  `);

}
