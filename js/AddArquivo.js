
var nomePlanilhas = [];
var reader = new FileReader();
var tabela;

$(document).ready(function() {
  $("#inputFile").change(lerArquivo);
});

//Pega o arquivo xlsx
function lerArquivo() {
  var todoXls;
  var gal = {};
  var content = document.getElementById('inputFile').files[0];
  reader.onload = function(e) {

    var binary = "";
    var bytes = new Uint8Array(e.target.result);
    var length = bytes.byteLength;
    for (var i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    todoXls = XLSX.read(binary, {
      type: 'binary'
    });

    //todoXls.SheetNames.forEach(function(sheetName) {
    sheetName = "DADOS - PENDANT_KANBAN_PPS";
    nomePlanilhas.push(sheetName);
    var s = todoXls.Sheets[sheetName];
    delete(s["!ref"]);
    //  delete(s["!margins"]);
    //  delete(s["!merges"]);
    pegarDados(s);
    //});
  }

  reader.readAsArrayBuffer(content);
}

//Separa os headers do corpo pegando a primeira linha (ex: A1, B1, C1)
function pegarDados(res) {
  var header = [];
  var corpo = [];

  Object.keys(res).forEach(function(k) {
    if (k.match("^[A-Z]16$"))
      header.push(res[k]);
    else if(k.match("^[A-Z](1[7-9]|[2-9][0-9])$"))
      corpo.push(res[k].v);
  });

  id = gerarTabela(header);
  adcionarNaTabela(header, corpo, id);
}

//Bota na tabela
function adcionarNaTabela(header, corpo, id) {
    if (!$(id).has("thead tr").length) {
      $(id + ' thead').html(`
            <tr>
              ${ adcionarHeader(header) }
            </tr>
          `);
    }
    tabela = adcionarRow(corpo, id);
}

function adcionarHeader(header) {
  var texto = "";

  for (var i = 0; i < header.length; i++) {
    texto += `<td>${ header[i].v }</td>`;
  }
  return texto;
}

function gerarTabela(header) {
  id = "tabela" + ($("table").length + 1);

  $("#main").append(`
    <br><br><br>
    <div id="div-${id}">
      <button id="remove" class="close" title="Remover tabela">&times;</button>
      <button id="linkAdd" class="btn" style="cursor: pointer">Adcionar item</button>
      ${ template(header) }
      <table id="${id}" class="table table-striped table-hover table-bordered display">
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
    `);
  return ("#" + id);
}

//Bota umas divs pra estilização
function template(header) {
  return `
  <div class="formulario" style="display: none">
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
      <div class="mx-4 col-5">
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
            <input id="${ th.v }" type="text" placeholder="${ th.v }" class="form-control" />
            ${ !(i == header.length - 1) ? "" :
            `<span class="input-group-addon" id="envio"><i class="fa fa-send"></i></span>`
            }
          </div>
        </div>
      </div>`
  });
  return texto;
}


function getNomePlanilhas() {
  return nomePlanilhas;
}
