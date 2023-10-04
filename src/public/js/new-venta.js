const { ipcRenderer } = require('electron')

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        let {venta} = data



const idNuevaVenta = Math.max(...Object.keys(venta).map(num => Number(num))) + 1 >= 0 ? Math.max(...Object.keys(venta).map(num => Number(num))) + 1 : 0 


const form = document.querySelector('#nueva-venta')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)


        venta[idNuevaVenta] = {
            nombre : formData.get('nombre')
        }



        data["venta"] = venta

        const json_datos = JSON.stringify(data)
        ipcRenderer.send('saveData',json_datos)
    


})

    }else{
        alert('No hay data.json')
    }
})


