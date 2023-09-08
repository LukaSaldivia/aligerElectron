const { ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs');



// multer no



let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../data.json')))

let {productos, venta, categoria, empresa} = datos

let productosCopia = JSON.parse(JSON.stringify(productos))
let keys = Object.keys(empresa)

let filtered = {}

keys.forEach( key => {

    let filter = productosCopia.filter( obj => obj.empresa === key)

    filtered[[key]] = [...filter]

  
})


for(prop in filtered){
    if(filtered[prop].length === 0){
        delete filtered[prop]
    }else{
      filtered[prop].forEach(producto => {
          transform(producto)
  })
    }
  }




let empresasDOM = []



document.addEventListener('DOMContentLoaded',()=>{

    
    for (const key in filtered) {

        let productsCards = ''

        filtered[key].forEach((producto)=>{
            productsCards += `
            
            <div class="card">
            <div class="card-img">
                <img src="${producto.imagen === "false" ? '../public/images/aliger.png' : producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="card-info">
                <p class="detail">${producto.empresa}</p>
                <p class="text-name">${producto.nombre}</p>
                <p class="detail">${producto.categoria}</p>
            </div>
            <footer>
            <p class="price">$${producto.precio} <span class="venta">${producto.venta}</span></p>
            
          
          </footer></div>
            
            `
        })

        document.querySelector('menu').innerHTML += `
        <div class="option">
        <label for="${empresa[key].nombre}">${empresa[key].nombre}</label>
        <input type="checkbox" id="${empresa[key].nombre}" checked onchange="updateSection(${key},this)" data-prop="${key}">
    </div>
        `
        document.querySelector('#pdfView').innerHTML += `
        <section data-empresa="${key}">
                <header class="i-header">
                <div class="logo-container">
                    <img src="${empresa[key].logo === "false" ? '../public/images/aliger.png' : empresa[key].logo}" alt="${empresa[key].nombre}">
                </div>

                <h2 style="background-color: ${empresa[key].color};"> ${empresa[key].nombre} </h2>
            </header>

                <div class="products-container">
                    ${productsCards}
                </div>
                
        `


    }

    document.querySelectorAll('input').forEach(input => {
        empresasDOM.push(input.getAttribute('data-prop'))
    })
    empresasDOM = empresasDOM.map(el => Number(el))

})




function updateSection(value,obj) {
    if (!obj.checked) {
        empresasDOM = empresasDOM.filter(e => e != value)
    }else{
        empresasDOM.push(value)
    }

    document.querySelectorAll('section').forEach(section => {
        section.style.display = empresasDOM.includes(Number(section.getAttribute('data-empresa'))) ? 'revert' : 'none'
    })

}

function transform(obj){
    for(prop in obj){
        if(prop === "venta" || prop === "empresa" || prop === "categoria"){
            obj[prop] = datos[prop][obj[prop]].nombre
        }
    }
}

const pdfView = document.querySelector('#pdfView')
document.querySelector('#pdf').addEventListener('click',()=>{

    ipcRenderer.send('worker:printPDF',pdfView.innerHTML)

})