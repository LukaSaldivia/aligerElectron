const { ipcRenderer } = require('electron')


let idVenta

ipcRenderer.on('requestEdit',(e,id)=>{

    idVenta = id;

    document.querySelector('#id').value = idVenta
    
})

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {
        
        
        
        let {venta} = data
        
        document.querySelector('#nombre').value = venta[idVenta].nombre





const form = document.querySelector('#editar-venta')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)

        
        venta[idVenta] = {
            nombre : formData.get('nombre'),

        }



        data["venta"] = venta

        const json_datos = JSON.stringify(data)
        ipcRenderer.send('saveData',json_datos)

        ipcRenderer.send('edited',{
            type : 'venta'
        })
    

    
    
  


})

    }else{
        alert('No hay data.json')
    }
})


