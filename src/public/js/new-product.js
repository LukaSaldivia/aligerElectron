const { v4: uuidv4 } = require('uuid');
const {ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs');



let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {productos} = datos

let prod = {}


function loadFile(event) {
    var image = document.getElementById("imgMuestra");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        URL.revokeObjectURL(image.src)
    }

};




const form = document.querySelector('#nuevo-producto')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)
    formData.append('id', uuidv4())
    const reader = new FileReader()

    reader.onloadend = () =>{
        console.log();
        formData.delete('imagen')
        formData.append('imagen',reader.result[reader.result.length-1] == ',' ? false : reader.result)
        prod = {
            id : formData.get('id'),
            nombre : formData.get('nombre'),
            empresa : formData.get('empresa'),
            precio : formData.get('precio'),
            venta : formData.get('venta'),
            categoria : formData.get('categoria'),
            imagen : formData.get('imagen')

        }
        productos.push(prod)
        datos["productos"] = productos

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')
    
    }

    reader.readAsDataURL(formData.get('imagen'))
    
    
  


})

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('select').forEach(select => {
        for (const key in datos[select.id]) {
            select.innerHTML += `
            <option value="${key}">${datos[select.id][key].nombre}</option>
            `
        }
        if (select.querySelectorAll('option').length <= 0) {
            document.querySelector('#submit').disabled = true
        }
    })


})
