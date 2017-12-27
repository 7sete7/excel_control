//Setado no arquivo Tabela.js
const headerColumns = localStorage.getItem('colunas');

var nomeArquivo;
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

    todoXls.SheetNames.forEach(function(sheetName) {
      var s = todoXls.Sheets[sheetName];
      delete(s["!ref"]);
      delete(s["!margins"]);
      delete(s["!merges"]);
      pegarDados(s);
    });
  }

  reader.readAsArrayBuffer(content);
}

//Separa os headers do corpo pegando a primeira linha (ex: A1, B1, C1)
function pegarDados(res) {
  var header = [];
  var corpo = [];

  Object.keys(res).forEach(function(k) {
    if (k.match("^[A-Z]1$"))
      header.push(res[k]);
    else
      corpo.push(res[k]);
  });

  id = gerarTabela();
  adcionarNaTabela(header, corpo, id);
}

//Bota na tabela
function adcionarNaTabela(header, corpo, id) {
  var planilhas = header.length / headerColumns;

  for (var i = 1; i <= planilhas; i++) {

    if (!$(id).has("thead tr").length) {
      $(id + ' thead').html(`
            <tr>
              ${ adcionarHeader(header) }
            </tr>
          `);
    }
    tabela = adcionarRow(corpo, true, id);

  }
}

function adcionarHeader(header) {
  var texto = "";

  for (var i = 0; i < headerColumns; i++) {
    texto += `<td>${ header[i].v }</td>`;
  }
  return texto;
}

function gerarTabela() {
  id = "tabela" + ($("table").length + 1);

  $("#main").append(`
    <div id="div-${id}">
    <button id="linkAdd" class="btn" style="cursor: pointer">Adcionar item</button>
      ${ templateFormulario() }
      <table id="${id}" class="table table-striped table-hover table-bordered display">
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
    <br><br><br>
    `);
  return ("#" + id);
}

function templateFormulario() {
  return `
  <div class="formulario" style="display: none">
    <div class="container my-lg-4 p-2 px-3" >
      <div class="form-control form-row" style="border: none">

        <div class="mx-5 col-5">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-user"></i></span>
              <input id="nome" type="text" placeholder="Nome" class="form-control" />
            </div>
          </div>
        </div>

        <div class="col-5">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
              <input id="email" type="text" placeholder="Email" class="form-control"/>
              <span class="input-group-addon"><i id="envio" class="fa fa-send"></i></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  `;
}
