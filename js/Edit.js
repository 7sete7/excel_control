$(document).ready(function() {
  $(document).one('dblclick', 'tbody', clicar);
  $(document).on("blur", '#inputEdit', voltarNormal);
});

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
  $(document).one('dblclick', 'tbody ', clicar);
}
