const { ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs');

let editIndex, editProd

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))
    
let {productos, categoria, venta, empresa} = datos

ipcRenderer.on('requestEdit',(e,id)=>{

    let idProducto = id;


    



    
    editIndex = productos.findIndex(prod => prod.id === idProducto)
    
    editProd = productos[editIndex]
    
    document.querySelector('#id').value = idProducto
    document.querySelector('#nombre').value = editProd.nombre
    document.querySelector('#precio').value = editProd.precio

    generateOptions(datos,'categoria',editProd)
    generateOptions(datos,'empresa',editProd)
    generateOptions(datos,'venta',editProd)

    document.querySelector('#imgMuestra').setAttribute('src', editProd.imagen === "false" ? '../../public/images/aliger.png' : editProd.imagen) 


    

})



function generateOptions(datos,objString,editProd) {
    for (const key in datos[objString]) {
        if (editProd[objString] == key) {
            document.querySelector(`#${objString}`).innerHTML+=`
            <option value="${key}" selected>${datos[objString][key].nombre}</option>
            `
        }else{
            document.querySelector(`#${objString}`).innerHTML+=`
            <option value="${key}">${datos[objString][key].nombre}</option>
            `
        }
    }
}


const form = document.querySelector('#editar-producto')
    form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)
    const reader = new FileReader()

    reader.onloadend = () =>{
        formData.delete('imagen')
        formData.append('imagen',reader.result[reader.result.length-1] == ',' ? editProd.imagen : reader.result)
        prod = {
            id : formData.get('id'),
            nombre : formData.get('nombre'),
            empresa : formData.get('empresa'),
            precio : formData.get('precio'),
            venta : formData.get('venta'),
            categoria : formData.get('categoria'),
            imagen : formData.get('imagen')

        }

        Object.assign(editProd,prod)

        datos = {productos, venta, categoria, empresa}

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')
        ipcRenderer.send('edited',{
            type : 'producto'
        })

        
    
    }

    reader.readAsDataURL(formData.get('imagen'))
    // formData.delete('imagen')
    
    
  


})


function loadFile(event) {
    var image = document.getElementById("imgMuestra");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        URL.revokeObjectURL(image.src)
    }

};
