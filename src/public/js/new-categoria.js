const { ipcRenderer } = require('electron')

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        let {categoria} = data



const idNuevaCategoria = Math.max(...Object.keys(categoria).map(num => Number(num))) + 1 > 0 ? Math.max(...Object.keys(categoria).map(num => Number(num))) + 1 : 0 


const form = document.querySelector('#nueva-categoria')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)


        categoria[idNuevaCategoria] = {
            nombre : formData.get('nombre')
        }



        data["categoria"] = categoria

        const json_datos = JSON.stringify(data)
        ipcRenderer.send('saveData',json_datos)
    


})

    }else{
        alert('No hay data.json')
    }
})


