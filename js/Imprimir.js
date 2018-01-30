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

  let [data,] = procurarNaTabela(content, 0, true);
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
    .html(`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="css/PrintCss.css"/>`);

  for(c of selecionados){
    let [tabela,] = $(c).parent().parent().parent().children('table');
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
    <div id="printAramado" class="mt-3">
      <div class="nav nav-tabs">
        <div class="nav-item">
          <div class="nav-link active">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Aramado</span>
            </label>
          </div>
          ${template.aramado(data[1], data[4], data[3], data[2])}
        </div>
      </div>
    </div>
  `);

  $('#containerPrint').append(`
    <div id="printPendant" class="mt-3">
      <div class="nav nav-tabs">
        <div class="nav-item">
          <div class="nav-link active">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Pendant</span>
            </label>
          </div>
          ${template.pendant(data[1], data[2])}
        </div>
      </div>
    </div>
  `);

  $('#containerPrint').append(`
    <div id="printPiso" class="mt-3">
      <div class="nav nav-tabs">
        <div class="nav-item">
          <div class="nav-link active">
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" checked>
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Piso</span>
            </label>
          </div>
          ${template.piso(data[1], data[4], data[3], data[2])}
        </div>
      </div>
    </div>
  `);

}
