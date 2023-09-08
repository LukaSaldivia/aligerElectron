const path = require('path')
const fs = require('fs');

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {categoria} = datos



const idNuevaCategoria = Math.max(...Object.keys(categoria).map(num => Number(num))) + 1 >= 0 ? Math.max(...Object.keys(categoria).map(num => Number(num))) + 1 : 0 


const form = document.querySelector('#nueva-categoria')
form.addEventListener('submit',(e)=>{

    e.preventDefault()

    const formData = new FormData(form)


        categoria[idNuevaCategoria] = {
            nombre : formData.get('nombre')
        }



        datos["categoria"] = categoria

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')
    


})
