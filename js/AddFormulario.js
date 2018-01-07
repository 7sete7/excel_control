$(document).ready(function() {
  $(document).on('click', '#envio', enviar);
  $(document).on('click', '#linkAdd', formulario);
});

//Muda o nome do link do formulario
function formulario() {
  var text = $(this).text();
  $(this).next('.formulario').toggle();
  $(this).text(
    text == "Adcionar item" ? "Esconder formulário" : "Adcionar item"
  );
}

//Pega todos os inputs e manda pra tabela
function enviar() {
  var content = [];
  var inputs = $(this).parentsUntil('.formulario').find('input');
  var id = '#' + ($(this).parentsUntil('.formulario').parent().next().children('table').attr('id'));

  for (var i = 0; i < inputs.length; i++) {
    content.push(inputs[i].value);
  };

  for (value of content) {
    if(!value.length)
      return;
  }

  tabela = adcionarRow(content, false, id);
}

//Adciona os headers da tabela
function headers(id, inputs) {
  if (!$(id).has("thead tr").length) {
    $(id + "thead").html(`
        <tr>
          ${ ths(inputs) }
        </tr>
      `);
  }
}

//Adciona os headers da tabela baseado nos inputs
function ths(inputs) {
  var texto = "";

  for (var i = 0; i < inputs.length; i++) {
    texto += `<th>${ inputs[i].placeholder }</th>`;
  }
  return texto;
}
