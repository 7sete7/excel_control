$(document).ready(function() {
  $(document).one('dblclick', 'td', clicar);
  $(document).on("blur", '#inputEdit', voltarNormal);
  $(document).on('click', 'tr', seleciona);
  $(document).on('click', '#remove', remove);
  $(document).on('click', '.close', fecha);
});

function fecha(){
  $(this).parent().fadeOut();
}

//Adciona o input no local do clique
function clicar(e) {
  var td = $(e.target);
  var texto = td.text();
  td.html(`<input type="${$.isNumeric(texto) ? "number" : "text"}" id="inputEdit"/>`);
  $("#inputEdit").val(texto);
}

//Bota o valor do input no td da tabela
function voltarNormal() {
  var val = $("#inputEdit").val();
  $("#inputEdit").parent().text(val);
  $("#inputEdit").remove();
  $(document).one('dblclick', 'td ', clicar);
}

function seleciona(){
  if($(this).hasClass('selected'))
    $(this).removeClass('selected');
  else{
    $(this).parent().children('tr.selected').removeClass('selected');
    $(this).addClass('selected');
  }
}

function remove(){
  if(!getTabela()['#tabela1'].row('.selected').length) return;
  if(!confirm('Deseja mesmo excluir a linha selecionada?')) return;

  getTabela()['#tabela1'].row('.selected').remove().draw(false);
}
