const { ipcRenderer } = require('electron')

let idCategoria

    

ipcRenderer.on('requestEdit',(e,id)=>{

    idCategoria = id;


})

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {

    let {categoria} = data

    document.querySelector('#id').value = idCategoria
    document.querySelector('#nombre').value = categoria[idCategoria].nombre

    
const form = document.querySelector('#editar-categoria')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)

        
        categoria[idCategoria] = {
            nombre : formData.get('nombre'),

        }



        data["categoria"] = categoria

        const json_datos = JSON.stringify(data)
        ipcRenderer.send('saveData',json_datos)

        ipcRenderer.send('edited',{
            type : 'categoria'
        })
    

    
    
  


})


    }else{
        alert('No hay data.json')
    }
})




