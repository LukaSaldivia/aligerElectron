const { ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs');

let idCategoria

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))
    
let {categoria} = datos

ipcRenderer.on('requestEdit',(e,id)=>{

    idCategoria = id;

    document.querySelector('#id').value = idCategoria
    document.querySelector('#nombre').value = categoria[idCategoria].nombre

})




const form = document.querySelector('#editar-categoria')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)

        
        categoria[idCategoria] = {
            nombre : formData.get('nombre'),

        }



        datos["categoria"] = categoria

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')

        ipcRenderer.send('edited',{
            type : 'categoria'
        })
    

    
    
  


})
