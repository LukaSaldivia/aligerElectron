const { ipcRenderer } = require('electron');

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        let {empresa} = data
        console.log(empresa);
        const idNuevaEmpresa = Math.max(...Object.keys(empresa).map(num => Number(num))) + 1 > 0 ? Math.max(...Object.keys(empresa).map(num => Number(num))) + 1 : 0 
        const form = document.querySelector('#nueva-empresa')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)
    const reader = new FileReader()

    reader.onloadend = () =>{
        formData.delete('imagen')
        formData.append('imagen',reader.result[reader.result.length-1] == ',' ? false : reader.result)
        
        empresa[idNuevaEmpresa] = {
            nombre : formData.get('nombre'),
            logo : formData.get('imagen'),
            color : formData.get('color')
        }



        data["empresa"] = empresa

        const json_datos = JSON.stringify(data)
        
        ipcRenderer.send('saveData',json_datos)
    
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

}

