$(document).ready(function() {
  $(document).on('click', '#envio', enviar);
  $(document).on('click', '#linkAdd', formulario);
});

//Muda o nome do link do formulario
function formulario() {
  var text = $(this).text();
  $(".formulario").toggle();
  $(this).text(
    text == "Adcionar item" ? "Esconder formulário" : "Adcionar item"
  );
}

//Pega todos os inputs e manda pra tabela
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

//Adciona os headers da tabela
function headers() {
  if (!$("#tabela").has("thead tr").length) {
    $("#tabela thead").html(`
        <tr>
          ${ ths() }
        </tr>
      `);
  }
}

//Adciona os headers da tabela baseado nos inputs
function ths() {
  var inputs = $('input');
  var texto = "";

  for (var input of inputs) {
    if(input.type != 'search' && input.type != 'file')
      texto += `<th>${ input.placeholder }</th>`;
  }
  return texto;
}
