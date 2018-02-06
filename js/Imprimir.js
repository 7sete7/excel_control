let data;

$(document).ready(function() {
  $(document).on('click', '#linkPrint', abreModalPrint);
  $(document).on('keypress', '#searchPrint', gerarNegocio);
  $(document).on('click', '#searchPrintButton', gerarNegocio);
  $(document).on('click', '#imprimir', criarIframe);
  $(document).on('change', '#containerPrint input[type="checkbox"]', checagem);
  $(document).on('click', '.editPrint', editPrint);
});

// Mostra a modal de imprimir quando clicado no link
function abreModalPrint() {
  if($(this).hasClass('disabled')) return;
  $('#printModal').modal();
}

//Pega os dados em geral
function gerarNegocio(e) {
  data = null;
  if(e.type == 'keypress' && e.keyCode != 13) return;

  let content = $('#searchPrint').val();
  if(!content.length) { $('#imprimir').addClass('disabled'); return; }

  $('#imprimir').removeClass('disabled');
  [data,] = procurarNaTabela(content, 0, true);
  if(!data) return;

  gerarTemplatesImpressao(data);
}

//Gera o iframe
function criarIframe() {
  if($(this).hasClass('disabled')) return;
  let selecionados = $('#containerPrint input:checked');

  let iframe = $('#printFrame');
  iframe.contents().find('body').html(' ');
  iframe.contents().find('head')
    .html(`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="css/PrintCss.css"/>`);

  for(c of selecionados){
    let [tabela,] = $(c).parent().parent().parent().children('.t').children('table');
    iframe.contents().find('body').append($(tabela).clone());
  }

  iframe.ready(() => setTimeout(imprimir, 250));
}

//Imprime
function imprimir() {
  window.frames["printFrame"].focus();
  window.frames["printFrame"].print();
  $(window.frames["printFrame"]).remove();
}

//Cria os templates de impressão
function gerarTemplatesImpressao(data) {
  $('#containerPrint').html('');
  $('#containerPrint').append(`
    <div id="printAramado" class="mt-3">
      <div class="nav nav-tabs">
        <div class="nav-item">
          <div class="nav-link active">
            <span class="fa fa-pencil-square-o fa-lg float-right pointer editPrint" style="margin-top:9px;"></span>
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Aramado</span>
            </label>
          </div>
          <div class="t">
            ${template.aramado(data[1], data[4], data[3], data[2])}
          </div>
        </div>
      </div>
    </div>
  `);

  $('#containerPrint').append(`
    <div id="printPendant" class="mt-3">
      <div class="nav nav-tabs">
        <div class="nav-item">
          <div class="nav-link active">
            <span class="fa fa-pencil-square-o fa-lg float-right pointer editPrint" style="margin-top:9px;"></span>
            <label class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">Pendant</span>
            </label>
          </div>
          <div class="t">
            ${template.pendant(data[1], data[2])}
          </div>
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
          <div class="t">
            ${template.piso(data[1], data[4], data[3], data[2])}
          </div>
        </div>
      </div>
    </div>
  `);

}

//Desabilita o botão de imprimir se não houver nada marcado.
function checagem() {
  let selecionados = $('#containerPrint input:checked');
  if(!selecionados.length){ $('#imprimir').addClass('disabled'); return; }
  $('#imprimir').removeClass('disabled');
}

function editPrint(){
  let table = $(this).parent().next().children('table');
  let butao = $(this);
  let botoes = $(`<button class="btn btn-success btn-sm mx-1 float-right" style="padding:4px;width:25px;height25px;line-height:1.2;padding-left:5.4px!important" id='savePrint'><span class="fa fa-check"></span></button>`);
  $(this).hide('fast');
  butao.parent().append(botoes).fadeIn('fast');

  if($(table).prop('id') == 'table-aramado'){
    $('#min').html(`<input type='number' style='width:${$('#min').parent().width() - 5}px' id='${$('#min').prop('id') + 'Input'}'>`);
    $('#max').html(`<input type='number' style='width:${$('#max').parent().width() - 5}px' id='${$('#max').prop('id') + 'Input'}'>`);
    $('#savePrint').one('click', () => {savePrint($(table).prop('id'), $('#minInput ,#maxInput')) });
  }
  else{
    $('#qtdAcionamento').html(`<input type='number' style='width:${$('#qtdAcionamento').parent().width() - 5}px' id='${$('#qtdAcionamento').prop('id') + 'Input'}'>`);
    $('#savePrint').one('click', () => {savePrint($(table).prop('id'), $('#qtdAcionamentoInput')) });
  }

}

function savePrint(idDaTabela, input){
  let table = $('#'+ idDaTabela);
  let val = [];
  for(i of input){
    val.push($(i).val());
    $(i).remove();
  }

  if(idDaTabela == 'table-aramado'){
    table.parent().html(template.aramado(data[1], data[4], data[3], data[2], val[0], val[1]));
  }
  else{
    table.parent().html(template.pendant(data[1], data[2], val[0]));
  }
  $('#savePrint').remove();
  $('.editPrint').show();
}
