const { ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs');

let idVenta

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))
    
let {venta} = datos

ipcRenderer.on('requestEdit',(e,id)=>{

    idVenta = id;

    document.querySelector('#id').value = idVenta
    document.querySelector('#nombre').value = venta[idVenta].nombre

})




const form = document.querySelector('#editar-venta')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)

        
        venta[idVenta] = {
            nombre : formData.get('nombre'),

        }



        datos["venta"] = venta

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')

        ipcRenderer.send('edited',{
            type : 'venta'
        })
    

    
    
  


})
