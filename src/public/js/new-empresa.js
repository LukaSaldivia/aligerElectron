const path = require('path')
const fs = require('fs');

let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {empresa} = datos



const idNuevaEmpresa = Math.max(...Object.keys(empresa).map(num => Number(num))) + 1 >= 0 ? Math.max(...Object.keys(empresa).map(num => Number(num))) + 1 : 0 







function loadFile(event) {
    var image = document.getElementById("imgMuestra");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = function() {
        URL.revokeObjectURL(image.src)
    }

}

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



        datos["empresa"] = empresa

        const json_datos = JSON.stringify(datos)
        fs.writeFileSync(path.join(__dirname,'../../data.json'), json_datos, 'utf-8')
    
    }

    reader.readAsDataURL(formData.get('imagen'))
    
    
  


})