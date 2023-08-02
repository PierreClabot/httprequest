import { urlJsonItem } from "../utils/constantes.js";
import { urlVersion } from "../utils/constantes.js";


class Api{
    constructor(){
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', 'https://wakfu.cdn.ankama.com/gamedata/config.json',true); // http://127.0.0.1:3000
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        console.log("A")
        xhr.onload = function() {
            console.log("B")
            if (xhr.status === 200) {
              // La requête a réussi
              console.log(xhr.responseText);
              return;
            } else {
              // La requête a échoué
              console.error("Erreur lors de la requête. Statut :", xhr.status);
            }
          };

          xhr.send();
          console.log("C");
    }
}

export default Api