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
    if(k.match("^[A-Z]1$"))
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

  for (var i = 1; i <= planilhas; i++){

    if(i == 1){
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
}

function adcionarHeader(header) {
  var texto = "";

  for (var i = 0; i < headerColumns; i++) {
    texto += `<td>${ header[i].v }</td>`;
  }
  return texto;
}

function gerarTabela(){
  id = "tabela" + ($("table").length + 1);

  $("#main").append(`
    <div id="div-${id}">
      <table id="${id}" class="table table-striped table-hover table-bordered display">
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
    `);
    return ("#" + id);
}
