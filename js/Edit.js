$(document).ready(function() {
  $(document).one('dblclick', '#tabela tbody', clicar);
  $(document).on("blur", '#inputEdit', voltarNormal);
});

function voltarNormal() {
  var val = $("#inputEdit").val();
  $("#inputEdit").parent().text(val);
  $("#inputEdit").remove();
  $(document).one('dblclick', '#tabela tbody', clicar);
}

function clicar(e) {
  var td = $(e.target);
  var texto = td.text();
  td.html(`<input type="${$.isNumeric(texto) ? "number" : "text"}" id="inputEdit" />`);
  $("#inputEdit").val(texto);
  $(this).off('click');
}
