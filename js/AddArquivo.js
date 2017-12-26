const headerColumns = localStorage.getItem('colunas');

var nomeArquivo;
var reader = new FileReader();
var tabela;

$(document).ready(function() {
  $("#inputFile").change(lerArquivo);
});

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
      type: 'binary',
      cellDates: true,
      cellStyles: true
    });
    todoXls.SheetNames.forEach(function(sheetName) {
      var s = todoXls.Sheets[sheetName];
      delete(s["!cols"]);
      delete(s["!ref"]);
      pegarDados(s);
    });
  }
  reader.readAsArrayBuffer(content);
}

function pegarDados(res) {
  var arr = [];

  Object.keys(res).forEach(function(k) {
    arr.push(res[k]);
  })
  nomeArquivo = arr.shift();
  adcionarNaTabela(arr);
  tabela = tabelar();
}

function adcionarNaTabela(arquivoArray) {
  var header = [];
  for (var i = 0; i < headerColumns; i++)
    header.push(arquivoArray.shift());

  if (!$("#tabela").has("thead tr").length) {
    $('#tabela thead').html(`
        <tr>
          ${header.map((coisa) => `<th>${coisa.v}</th>`)}
        </tr>
      `);
  }
  tabela = adcionarRow(arquivoArray, true);
}
