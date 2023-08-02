const express = require('express');
const app = express();
const port = 3000;
// const http = require('http'); // requête http chatGPT suppression
const fs = require('fs'); // lecture/ecriture fichier
app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    

    const fetch = require('node-fetch');
    fetch('https://wakfu.cdn.ankama.com/gamedata/config.json')
    .then(response=>{
        if (!response.ok) {
            throw new Error('Erreur de requête: ' + response.status);
          }
          return response.json();
    })
    .then(data => {
        fs.readFile('../../data/version.json','utf8',(error,dataFile)=>{ // lecture du fichier json
            if (error) { // en cas d'erreur
                console.error(error);
                return;
              }

              const objDataLocal = JSON.parse(dataFile); // Convertir un fichier json en objet js

              if(data.version != objDataLocal.version){// version différente, on met à jour la version
                console.log("DATA DEJA CONNU");
                  fetch('https://wakfu.cdn.ankama.com/gamedata/'+data.version+'/items.json') // https://wakfu.cdn.ankama.com/gamedata/'+data.version+'/items.json
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Erreur de requête: ' + response.status);
                    }
                    return response.json();
                  })
                  .then(data => {
                      //res.send(data);
                      fs.writeFile('../../data/items.json',JSON.stringify(data),'utf8',(error)=>{
                        if(error){
                          console.error(error);
                          return
                        }
                      })
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }

              fs.readFile('../../data/items.json','utf8',(error,dataFile)=>{
                if (error) { // en cas d'erreur
                  console.error(error);
                  return;
                }
                console.log(dataFile)
                res.send(dataFile)

              })

              

              


        })



    })
    .catch(error => {
      console.error(error);
    });


    
      

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




