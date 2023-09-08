const {ipcRenderer} = require('electron')

const path = require('path')
const fs = require('fs');



let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'../../data.json')))

let {empresa} = datos

const input = document.querySelector('#search')
const resultadosP = document.querySelector('#resultados')

input.addEventListener('input',busqueda)
document.addEventListener('DOMContentLoaded',()=>{


    Object.keys(empresa).forEach(id=>{
        document.querySelector('table').innerHTML += `
        
        <tr>


        <td>${empresa[id].nombre}</td>
        <td><img src="${empresa[id].logo === "false" ? '../../public/images/aliger.png' : empresa[id].logo}" alt="${empresa[id].nombre}"></td>
        <td style="background-color : ${empresa[id].color} ;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>
        <td> 
           <button style="--own : #44e" data-id="${id}" data-role="edit"/>Editar</button>
           <button style="--own : #900" data-id="${id}" data-role="delete"/>Eliminar</button>
        </td>


    </tr>
        
        `
    })

    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click',()=>{
            let roles = {
                "edit" : ()=>{
                    ipcRenderer.send('requestEdit',{
                        type : 'empresa',
                        content : button.getAttribute('data-id') 
                    })
                },
                "delete" : ()=>{
                    ipcRenderer.send('delete',{
                        type : 'empresa',
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