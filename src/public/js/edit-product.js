const { ipcRenderer } = require('electron')

let idProducto


ipcRenderer.on('requestEdit',(e,id)=>{
    idProducto = id;
})



ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {

            
    let {productos} = data

        let editIndex, editProd

        editIndex = productos.findIndex(prod => prod.id === idProducto)
    
        editProd = productos[editIndex]
        
        document.querySelector('#id').value = idProducto
        document.querySelector('#nombre').value = editProd.nombre
        document.querySelector('#precio').value = editProd.precio
        
        const generateOptions = (objString) => {
            for (const key in data[objString]) {
                if (editProd[objString] == key) {
                    document.querySelector(`#${objString}`).innerHTML+=`
                    <option value="${key}" selected>${data[objString][key].nombre}</option>
                    `
                }else{
                    document.querySelector(`#${objString}`).innerHTML+=`
                    <option value="${key}">${data[objString][key].nombre}</option>
                    `
                }
            }
        }

        generateOptions('categoria')
        generateOptions('empresa')
        generateOptions('venta')
    
        document.querySelector('#imgMuestra').setAttribute('src', editProd.imagen === "false" ? '../../public/images/aliger.png' : editProd.imagen) 
        
        

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

    data['productos'] = productos

    const json_datos = JSON.stringify(data)
    ipcRenderer.send('saveData',json_datos)
    ipcRenderer.send('edited',{
        type : 'producto'
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
