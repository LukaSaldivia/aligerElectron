const path = require('path')
const fs = require('fs');

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {venta} = datos



const idNuevaVenta = Math.max(...Object.keys(venta).map(num => Number(num))) + 1 >= 0 ? Math.max(...Object.keys(venta).map(num => Number(num))) + 1 : 0 


const form = document.querySelector('#nueva-venta')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)


        venta[idNuevaVenta] = {
            nombre : formData.get('nombre')
        }



        datos["venta"] = venta

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')
    


})
