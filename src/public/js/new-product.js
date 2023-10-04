const { ipcRenderer } = require('electron')
const { v4: uuidv4 } = require('uuid');


ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        let {productos} = data

let prod = {}







const form = document.querySelector('#nuevo-producto')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)
    formData.append('id', uuidv4())
    const reader = new FileReader()

    reader.onloadend = () =>{
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
        data["productos"] = productos

        const json_datos = JSON.stringify(data)
        
        ipcRenderer.send('saveData',json_datos)
    }

    reader.readAsDataURL(formData.get('imagen'))
    
    
  


})

    document.querySelectorAll('select').forEach(select => {
        for (const key in data[select.id]) {
            select.innerHTML += `
            <option value="${key}">${data[select.id][key].nombre}</option>
            `
        }
        if (select.querySelectorAll('option').length <= 0) {
            document.querySelector('#submit').disabled = true
        }
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