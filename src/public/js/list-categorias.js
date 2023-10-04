const {ipcRenderer} = require('electron')

ipcRenderer.invoke('requestData').then((data)=>{
    if (data) {

const input = document.querySelector('#search')
const resultadosP = document.querySelector('#resultados')

const busqueda = () => {
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

let {categoria} = data


input.addEventListener('input',busqueda)


    Object.keys(categoria).forEach(id=>{
        document.querySelector('table').innerHTML += `
        
        <tr>


        <td>${categoria[id].nombre}</td>
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
                        type : 'categoria',
                        content : button.getAttribute('data-id') 
                    })
                },
                "delete" : ()=>{
                    ipcRenderer.send('delete',{
                        type : 'categoria',
                        content : button.getAttribute('data-id') 
                    })
                }
            }

            roles[button.getAttribute('data-role')]()
        })
    })

    busqueda()


        
    }else{
        alert('No hay data.json')
    }
})


