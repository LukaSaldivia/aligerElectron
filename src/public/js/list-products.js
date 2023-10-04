const {ipcRenderer} = require('electron')

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {


        let actualPage = 2
        let productsPerPage = 10

        


        const transform = (obj) => {
            for(prop in obj){
                if(prop === "venta" || prop === "empresa" || prop === "categoria"){
                    obj[prop] = data[prop][obj[prop]].nombre
                }
            }
        }
        
const form = document.querySelector('#search-container')
const resultadosP = document.querySelector('#resultados')
const nav = document.querySelector('#pages')
const table = document.querySelector('table')




        let {productos} = data

       





        let productosCopia = JSON.parse(JSON.stringify(productos))

        productosCopia.forEach(producto => {
            transform(producto);
          })


        let pagination = new Pagination({
            arr : productosCopia,
            ePerPage : 12
        })

        let results = pagination.getResults()

        nav.addEventListener('click',({target}) => {
            if(target.nodeName == "BUTTON"){
                nav.querySelectorAll('button').forEach(e=>e.setAttribute('data-selected','false'))
                target.setAttribute('data-selected',"true")
                pagination.setPage(target.getAttribute('data-page'))
                writeTable(pagination.getResults().results)
            }
        })





form.addEventListener('submit',(e)=>{
    e.preventDefault()

    

    let fd = new FormData(form)

    pagination.setQuery(fd.get('search'))
    pagination.setPage(1)

    let results = pagination.getResults()

    writeTable(results.results)
    writeNav(results.pagesCount)
    resultadosP.innerHTML = `Resultados totales: ${results.total}`
})



writeTable(results.results)
writeNav(results.pagesCount)
resultadosP.innerHTML = `Resultados totales: ${results.total}`

table.addEventListener('click',({target})=>{
    if (target.nodeName == "BUTTON") {
        let roles = {
            "edit" : ()=>{
                ipcRenderer.send('requestEdit',{
                    type : 'producto',
                    content : target.getAttribute('data-id') 
                })
            },
            "delete" : ()=>{
                ipcRenderer.send('delete',{
                    type : 'producto',
                    content : target.getAttribute('data-id') 
                })
            }
        }

        roles[target.getAttribute('data-role')]()
    }
})
    }else{
        alert('No hay data.json')
    }
})


function writeTable(arr){
    document.querySelector('table').innerHTML = `
    <tr>
    <th>Producto</th>
    <th>Precio</th>
    <th>Empresa</th>
    <th>Categoria</th>
    <th>Venta</th>
    <th>Imagen</th>
    <th>Acciones</th>
</tr>
    `
    if (arr.length > 0) {
        
    
    arr.forEach(producto=>{
        document.querySelector('table').innerHTML += `

        
        <tr>


        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.empresa}</td>
        <td>${producto.categoria}</td>
        <td>${producto.venta}</td>
        <td><img class="producto" src="${producto.imagen === "false" ? '../../public/images/aliger.png' : producto.imagen}" alt="${producto.nombre}"></td>
        <td> 
           <button style="--own : #44e" data-id="${producto.id}" data-role="edit"/>Editar</button>
           <button style="--own : #900" data-id="${producto.id}" data-role="delete"/>Eliminar</button>
        </td>


    </tr>
        
        `
    })
}else{
    document.querySelector('table').innerHTML += `
    <td colspan = "100%" style="text-align:center;"> No hay registros </td>
    `
}


}

function writeNav(n) {
    let nav = document.querySelector('#pages')
    nav.innerHTML = ''
    Array(n).fill().forEach((_,i)=>{
        nav.innerHTML += `
        <button data-selected="${i+1 == 1}" data-page="${i+1}">${i+1}</button>
        `
    })
}

