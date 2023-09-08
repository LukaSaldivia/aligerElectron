const {ipcRenderer} = require('electron')

const path = require('path')
const fs = require('fs');



let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {productos, venta, categoria, empresa} = datos

const input = document.querySelector('#search')
const resultadosP = document.querySelector('#resultados')

input.addEventListener('input',busqueda)
document.addEventListener('DOMContentLoaded',()=>{


    productos.forEach(producto=>{
        document.querySelector('table').innerHTML += `
        
        <tr>


        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td style="color : ${empresa[producto.empresa].color}; font-weight: bolder;">${empresa[producto.empresa].nombre}</td>
        <td>${categoria[producto.categoria].nombre}</td>
        <td>${venta[producto.venta].nombre}</td>
        <td><img class="producto" src="${producto.imagen === "false" ? '../../public/images/aliger.png' : producto.imagen}" alt="${producto.nombre}"></td>
        <td> 
           <button style="--own : #44e" data-id="${producto.id}" data-role="edit"/>Editar</button>
           <button style="--own : #900" data-id="${producto.id}" data-role="delete"/>Eliminar</button>
        </td>


    </tr>
        
        `
    })

    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click',()=>{
            let roles = {
                "edit" : ()=>{
                    ipcRenderer.send('requestEdit',{
                        type : 'producto',
                        content : button.getAttribute('data-id') 
                    })
                },
                "delete" : ()=>{
                    ipcRenderer.send('delete',{
                        type : 'producto',
                        content : button.getAttribute('data-id') 
                    })
                }
            }

            roles[button.getAttribute('data-role')]()
        })
    })

    busqueda()
})

function busqueda() {
    let resultados = 0
    document.querySelectorAll('tr:not(:has(th))').forEach(tr=>{
        if (Object.values(tr.children).some(td => td.innerText.toLowerCase().includes(input.value.toLowerCase()))) {
            tr.style.display = 'table-row'
            resultados++
        }else{
            tr.style.display = 'none'
        }
    })
    resultadosP.innerHTML = `Resultados totales: ${resultados}`;
}