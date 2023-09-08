const { ipcRenderer} = require('electron')
const path = require('path')
const fs = require('fs');

let idEmpresa

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))
    
let {empresa} = datos

ipcRenderer.on('requestEdit',(e,id)=>{

    idEmpresa = id;
    
    document.querySelector('#id').value = idEmpresa
    document.querySelector('#nombre').value = empresa[idEmpresa].nombre
    document.querySelector('#color').value = empresa[idEmpresa].color

    document.querySelector('#imgMuestra').setAttribute('src', empresa[idEmpresa].logo === "false" ? '../../public/images/aliger.png' : empresa[idEmpresa].logo) 

})




const form = document.querySelector('#editar-empresa')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)
    const reader = new FileReader()

    reader.onloadend = () =>{
        formData.delete('imagen')
        formData.append('imagen',reader.result[reader.result.length-1] == ',' ? empresa[idEmpresa].logo : reader.result)
        
        empresa[idEmpresa] = {
            nombre : formData.get('nombre'),
            logo : formData.get('imagen'),
            color : formData.get('color')
        }



        datos["empresa"] = empresa

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')

        ipcRenderer.send('edited',{
            type : 'empresa'
        })
    
    }

    reader.readAsDataURL(formData.get('imagen'))
    
    
  


})


function loadFile(event) {
    var image = document.getElementById("imgMuestra");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        URL.revokeObjectURL(image.src)
    }

};
