var template = template || (function(){
  return {
    aramado: function(){
      return ``;
    },

    pendant: function(){
      return ``;
    },

    piso: function(partNumber, embalagem, stpk, desc){
      let data = new Date();
      return `
        <table style="height: 245px; width: 676px;" class="table-bordered">
          <tbody>
            <tr style="height: 4px;">
              <td style="height: 4px; width: 393px;" class="bold text-center">Part number</td>
              <td style="height: 4px; width: 211px;" class="bold text-center">Embalagem</td>
              <td style="width: 71px;" rowspan="7">
                <span class="verticalText" style="height:242px">
                  <pre style="font-family: inherit">
                    ${data.toLocaleDateString() +'  '+ data.getHours() + ':' + data.getMinutes()}
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
