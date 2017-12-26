$(document).ready(function() {
  $(document).on('click', '#envio', enviar);
  $(document).on('click', '#linkAdd', formulario);
});

function formulario() {
  var text = $(this).text();
  $(".formulario").toggle();
  $(this).text(
    text == "Adcionar item" ? "Esconder formulário" : "Adcionar item"
  );
}

function enviar() {
  var content = [];
  var inputs = document.getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type != "file" && inputs[i].type != "search")
      content.push(inputs[i].value);
  };
  headers();
  tabela = adcionarRow(content, false);
}

function headers() {
  if (!$("#tabela").has("thead tr").length) {
    $("#tabela thead").html(`
        <tr>
          ${ ths() }
        </tr>
      `);
  }
}

function ths() {
  var inputs = $('input');
  var texto = "";

  for (var input of inputs) {
    if(input.type != 'search' && input.type != 'file')
      texto += `<th>${ input.placeholder }</th>`;
  }
  return texto;
}
