const { ipcRenderer } = require('electron')


let idEmpresa

ipcRenderer.on('requestEdit',(e,id)=>{

    idEmpresa = id;
    
})

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        let {empresa} = data
        document.querySelector('#id').value = idEmpresa
        document.querySelector('#nombre').value = empresa[idEmpresa].nombre
        document.querySelector('#color').value = empresa[idEmpresa].color
    
        document.querySelector('#imgMuestra').setAttribute('src', empresa[idEmpresa].logo === "false" ? '../../public/images/aliger.png' : empresa[idEmpresa].logo) 
        
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



        data["empresa"] = empresa

        const json_datos = JSON.stringify(data)
        ipcRenderer.send('saveData',json_datos)

        ipcRenderer.send('edited',{
            type : 'empresa'
        })
    
    }

    reader.readAsDataURL(formData.get('imagen'))
    
    
  


})

    }else{
        alert('No hay data.json')
    }
})







function loadFile(event) {
    var image = document.getElementById("imgMuestra");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        URL.revokeObjectURL(image.src)
    }

};
