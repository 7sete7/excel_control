var template = template || (function(){
  return {
    aramado: function(partNumber, embalagem, stpk, desc){
      return `
      <table style="width: 570px; height: 136px;" class="table-bordered" id="table-aramado">
        <tbody>
          <tr style="height: 8px;">
            <td style="width: 157px; height: 8px;" class="bold text-center">Part number</td>
            <td style="width: 93px; height: 8px;" class="bold text-center">Min</td>
            <td style="width: 95px; height: 8px;" class="bold text-center">Max</td>
            <td style="width: 36px; height: 128px;" rowspan="4">
              <span class="verticalText" style="height:242px">
                <pre style="font-family: inherit">
                  ${dataAtual()}
                </pre>
              </span>
            </td>
          </tr>
          <tr style="height: 53px;">
            <td style="width:157px;height:53px;font-size:23pt" class="bold text-center">${partNumber}</td>
            <td style="width:93px;height:53px;font-size:18pt" class="bold text-center">1</td>
            <td style="width:95px; height:53px;font-size:18pt" class="bold text-center">2</td>
          </tr>
          <tr style="height: 24px;">
            <td style="width: 157px; height: 24px;" class="bold text-center">Descrição</td>
            <td style="width: 93px; height: 24px;" class="bold text-center">Embalagem</td>
            <td style="width: 95px; height: 24px;" class="bold text-center">STPK</td>
          </tr>
          <tr style="height: 43px;">
            <td style="width:157px;height:43px;font-size:18pt" class="bold text-center">${desc}</td>
            <td style="width: 93px; height: 43px;" class="bold text-center">${embalagem}</td>
            <td style="width: 95px; height: 43px;" class="bold text-center">${stpk}</td>
          </tr>
        </tbody>
      </table>
      `;
    },

    pendant: function(partNumber, desc){
      return `
      <table style="width: 298px; height: 107px;" class="table-bordered" id="table-pendant">
        <tbody>
          <tr style="height: 40px;">
            <td style="width: 166px; height: 40px;" class="bold text-center">${partNumber}</td>
            <td style="width: 131px; height: 40px;" class="bold">Qtd para acionamento</td>
          </tr>
          <tr style="height: 40px;">
            <td style="width: 166px; height: 40px;" class="bold text-center">${desc}</td>
            <td style="width: 131px; height: 78px;" rowspan="2" class="bg-dark">
              <span id="qtdAcionamento" style="color:#fff" class="bold"></span>
            </td>
          </tr>
          <tr style="height: 38px;">
            <td style="width:166px;height:38px;font-size:" class="text-center">
              <pre style="font-family:inherit">${dataAtual()}</pre>
            </td>
          </tr>
        </tbody>
      </table>
      `;
    },

    piso: function(partNumber, embalagem, stpk, desc){
      return `
        <table style="height: 245px; width: 676px;" class="table-bordered" id="table-piso">
          <tbody>
            <tr style="height: 4px;">
              <td style="height: 4px; width: 393px;" class="bold text-center">Part number</td>
              <td style="height: 4px; width: 211px;" class="bold text-center">Embalagem</td>
              <td style="width: 71px;" rowspan="7">
                <span class="verticalText" style="height:242px">
                  <pre style="font-family: inherit">
                    ${dataAtual()}
                  </pre>
                </span>
              </td>
            </tr>
            <tr style="height: 23px;">
              <td style="height: 23px;width: 393px;font-size:46pt" rowspan="4" class="bold text-center">
                ${partNumber}
              </td>
              <td style="height: 23px; width: 211px;">&nbsp;</td>
            </tr>
            <tr style="height: 23px;">
              <td style="height: 23px; width: 211px;" class="bold text-center">${embalagem}</td>
            </tr>
            <tr style="height: 23px;">
              <td style="height: 23px; width: 211px;" class="bold text-center">Stpk</td>
            </tr>
            <tr style="height: 23px;">
              <td style="height: 23px; width: 211px;" class="bold text-center">${stpk}</td>
            </tr>
            <tr style="height: 23px;">
              <td style="height: 23px; width: 393px;" class="bold text-center">Descrição</td>
              <td style="height: 23px; width: 211px;">&nbsp;</td>
            </tr>
            <tr style="height: 23px;">
              <td style="height:60px; width: 604px;font-size:25pt" colspan="2" class="bold text-center">
                ${desc}
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }

  }
})();
