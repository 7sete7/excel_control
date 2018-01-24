$(document).ready(function() {
  $('#salvar').on('click', salvar);
});

//Pega as tabelas e chama a função gerar excel
function salvar() {
  var tabelas = $('#tabela1');
  if (tabelas.length == 0) {
    alert("Sem tabelas");
    return;
  }

  gerarExcel(tabelas);
}

//Gera o arquivo excel
function gerarExcel(tabelas) {
  var wb = editarCelulas();
  var blob = new Blob(
  [preProcesso(XLSX.write(wb, {bookType: 'xlsx', type: 'binary'}))],
  { type: "application/octet-stream" });
  saveAs(blob, document.title + '.xlsm');
}

//Pré-processa o arquivo antes de criar -- Não sei o que faz
function preProcesso(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

//O corpo tem como key o numero de linhas, para cada editado eu pego o endereço via id da linha
function editarCelulas() {
  let corpo = getCorpo();
  let wb = getXls();
  let editados = getEditados();
  let addr;
  if(editados.length){
  	for(k in corpo){
  	  for(e of editados){
    		if(e.id == corpo[k][0]) wb = mudaOuApaga(e, wb, k);
    	}
  	}
  }
  return wb;
}

function pegaColuna(s){
  switch (s) {
    case 0:
      return 'B';
    case 1:
      return 'C';
    case 2:
      return 'D';
    case 3:
      return 'E';
    case 4:
      return 'K';
    default:
      console.error(`Coluna incorreta: ${s}`);
  }
}

function mudaOuApaga(e, wb, k){
  let addr;
  if(e.del)
    wb = apagarLinha(wb.Sheets["DADOS - PENDANT_KANBAN_PPS"], k);
  else{
    addr = pegaColuna(e.col) + k;
    wb.Sheets["DADOS - PENDANT_KANBAN_PPS"][addr] = e.data;
  }
  return wb;
}
