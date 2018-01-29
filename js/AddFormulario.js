$(document).ready(function() {
  $(document).on('click', '#linkAdd', formulario);
  $(document).on('click', '#envio', enviar);
});

//Muda o nome do link do formulario
function formulario() {
  if($(this).hasClass('disabled')) return;

  $(this).next('.formulario').toggle();

  $('#addModal .modal-body').html( () => botarDivs(getHeaders()) );
  $('#addModal').modal();
}

//Pega todos os inputs e manda pra tabela
function enviar() {
  var content = [];
  var inputs = $('#addModal .modal-body').find('input');
  var id = '#tabela1';
  var desc;
  let idLinha;

  for (var i = 0; i < inputs.length; i++) {
    content.push(inputs[i].value);
    if(inputs[i].placeholder == "Descrição")
      desc = inputs[i].value;
  };

  for(valor of content){
    if(!valor.length)
      return;
  }

  for(item in corpo){
    if(content[0].value == item[0]){
      if(confirm("ID já existe.\nDeseja substituílo?\nIsso irá apagar a linha!"))
      { delete item; break; }
      else return;
    }
  }

  for(inp of inputs)
	  inp.value = '';

  let {tabela, node} = adcionarRow(content, id);
  adcionarLinha(node);

  $('#addModal').modal('hide');
  alerta(`<strong>${ desc }</strong> adcionado com sucesso!`, 'success', '#con');
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


//Bota umas divs pra estilização
function botarDivs(header) {
  return `
  <div class="formulario">
    <div class="container my-lg-4 p-2 px-3" >
      <div class="form-control form-row" style="border: none">
        ${ inputs(header) }
      </div>
    </div>
  </div>
  `;
}

//Adciona os inputs baseado nos headers
function inputs(header) {
  var texto = "";

  header.forEach(function(th, i){
    texto += `
      <div class="mx-4 col-11">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
            <input id="${ th.v }" type="text" placeholder="${ th.v }" class="form-control" />
          </div>
        </div>
      </div>`
  });
  return texto;
}
