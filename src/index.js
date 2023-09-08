const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs');
const os = require('os')


let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),'utf-8'))

let { productos , venta , categoria , empresa} = datos


if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname,{
        electron : path.join(__dirname,'../node_modules','.bin','electron')
    })
}

// Products
let index, newProductWindow, listProductsWindow, editProductWindow

// PDF
let workerPDFWindow

// Empresas
let newEmpresaWindow, listEmpresasWindow, editEmpresaWindow

// Categorias
let newCategoriaWindow, listCategoriasWindow, editCategoriaWindow

// Venta
let newVentaWindow, listVentasWindow, editVentaWindow



app.on('ready' ,() =>{
    index = new BrowserWindow({
        title : 'Aliger | Gestión',
        icon : path.join(__dirname,'public','images/aliger.png'),
        show : false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        } ,
        minimizable : false
    })

    index.maximize()
    index.loadURL(url.format({
        pathname : path.join(__dirname,'views/index.html'),
        protocol : 'file',
        slashes : true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)

    index.on('closed', () =>{
        app.quit()
    })

    workerPDFWindow = new BrowserWindow({
        show : false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    workerPDFWindow.loadURL(url.format({
        pathname : path.join(__dirname,'views/worker-PDF.html'),
        protocol : 'file',
        slashes : true
    }))
})





const templateMenu = [
    {
        label : 'Nuevo',
        submenu : [
            {
                label : "Productos",
                submenu : [
                    {
                        label : "Nuevo producto",
                        accelerator : process.platform == 'darwin' ? 'command+N' : 'Ctrl+N',
                        click(){
        
                            createWindow(newProductWindow,{
                                show : true,
                                width : 600,
                                height : 700,
                                title : 'Insertar producto',
                                setMenu : false,
                                fileName : 'productos/new-producto.html',
                                max : false
                            })
        
                        }

                    },
                    {
                        label : "Lista de productos",
                        accelerator : process.platform == 'darwin' ? 'command+T' : 'Ctrl+T',
                        click(){


                            createWindow(listProductsWindow,{
                                max : true,
                                show : false,
                                width : 1,
                                height : 1,
                                fileName : 'productos/list-productos.html',
                                setMenu : true,
                                title : 'Lista de productos'
                            })
                            
                        }                    
                    }
                ]

            },
            {
                label : "Empresas",
                submenu : [
                    {
                        label : "Nueva empresa",
                        click(){
                            createWindow(newEmpresaWindow,{
                                fileName : 'empresas/new-empresa.html',
                                width : 600,
                                height : 700,
                                setMenu : true,
                                title : 'Insertar empresa',
                                show : true
                            })   
                        }

                    },
                    {
                        label : "Lista de empresas",
                        click(){


                            createWindow(listEmpresasWindow,{
                                max : true,
                                show : false,
                                width : 1,
                                height : 1,
                                fileName : 'empresas/list-empresas.html',
                                setMenu : true,
                                title : 'Lista de empresas'
                            })
                            
                        }     
                    }

                ]
            },
            {
                label : "Tipo de ventas",
                submenu : [
                    {
                        label : "Nuevo tipo de venta",
                        click(){
        
                            createWindow(newVentaWindow,{
                                show : true,
                                width : 600,
                                height : 700,
                                title : 'Insertar tipo de venta',
                                setMenu : false,
                                fileName : 'ventas/new-venta.html',
                                max : false
                            })
        
                        }

                    },
                    {
                        label : "Lista de tipo de ventas",
                        click(){


                            createWindow(listVentasWindow,{
                                max : true,
                                show : false,
                                width : 1,
                                height : 1,
                                fileName : 'ventas/list-ventas.html',
                                setMenu : true,
                                title : 'Lista de tipos de ventas'
                            })
                            
                        }   
                    }

                ]
            },
            {
                label : "Categorías",
                submenu : [
                    {
                        label : "Nueva categoría",
                        click(){
        
                            createWindow(newCategoriaWindow,{
                                show : true,
                                width : 600,
                                height : 700,
                                title : 'Insertar categoría',
                                setMenu : false,
                                fileName : 'categorias/new-categoria.html',
                                max : false
                            })
        
                        }

                    },
                    {
                        label : "Lista de categorías",
                        click(){


                            createWindow(listCategoriasWindow,{
                                max : true,
                                show : false,
                                width : 1,
                                height : 1,
                                fileName : 'categorias/list-categorias.html',
                                setMenu : true,
                                title : 'Lista de categorias'
                            })
                            
                        }   
                    }

                ]
            }
        ]
    }

]


// #-------------------- Windows --------------------#

// Products ---------------------------------

    function createEditProductWindow() {
        editProductWindow = new BrowserWindow({
            width : 600,
            height : 700,
            icon : path.join(__dirname,'public','images/aliger.png'),
            title : 'Editar producto',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            } })
            
            
            editProductWindow.setMenu(null)
            
            editProductWindow.loadURL(url.format({
                pathname : path.join(__dirname,'views/productos/edit-producto.html'),
                protocol : 'file',
                slashes : true
            }))
            
            editProductWindow.on('closed', () =>{
                editProductWindow = null
            })
            
}
// Empresas --------------------------------- 
function createEditEmpresaWindow() {
    editEmpresaWindow = new BrowserWindow({
        width : 600,
        height : 700,
        icon : path.join(__dirname,'public','images/aliger.png'),
        title : 'Editar empresa',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        } })
        
        
        // editEmpresaWindow.setMenu(null)
        
        editEmpresaWindow.loadURL(url.format({
            pathname : path.join(__dirname,'views/empresas/edit-empresa.html'),
            protocol : 'file',
            slashes : true
        }))
        
        editEmpresaWindow.on('closed', () =>{
            editEmpresaWindow = null
        })
        
}
// Categorias -------------------------------
function createEditCategoriaWindow() {
    editCategoriaWindow = new BrowserWindow({
        width : 600,
        height : 700,
        icon : path.join(__dirname,'public','images/aliger.png'),
        title : 'Editar categoria',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        } })
        
        
        editCategoriaWindow.setMenu(null)
        
        editCategoriaWindow.loadURL(url.format({
            pathname : path.join(__dirname,'views/categorias/edit-categoria.html'),
            protocol : 'file',
            slashes : true
        }))
        
        editCategoriaWindow.on('closed', () =>{
            editCategoriaWindow = null
        })
        
}

// Ventas -----------------------------------
function createEditVentaWindow() {
    editVentaWindow = new BrowserWindow({
        width : 600,
        height : 700,
        icon : path.join(__dirname,'public','images/aliger.png'),
        title : 'Editar tipo de venta',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        } })
        
        
        editVentaWindow.setMenu(null)
        
        editVentaWindow.loadURL(url.format({
            pathname : path.join(__dirname,'views/ventas/edit-venta.html'),
            protocol : 'file',
            slashes : true
        }))
        
        editVentaWindow.on('closed', () =>{
            editVentaWindow = null
        })
        
}

// General ----------------------------------

function createWindow(global, attr = {
    show : true,
    width : 500,
    height : 500,
    title : 'Titulo',
    setMenu : false,
    fileName : '',
    max : false
}) {


    global = new BrowserWindow({
        show : attr.show,
        width : attr.width,
        height : attr.height,
        icon : path.join(__dirname,'public','images/aliger.png'),
        title : attr.title,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    })

    if (attr.max) {
        global.maximize()
    }

    
    if (!attr.setMenu) {
        global.setMenu(null)
    }

    global.loadURL(url.format({
        pathname : path.join(__dirname,`views/${attr.fileName}`),
        protocol : 'file',
        slashes : true
    }))

    global.on('closed', ()=>{
        global = null
    })
}
//  --------------------------------------------------------------------------------

// If's de una ejecución

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label : app.getName()
    })
}


if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label : 'DevTool',
        submenu : [
            {
            label : 'Show/Hide',
            accelerator : 'Ctrl+Shift+I',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role : 'reload'
        }
    ]
    })
}


// Data-transfers handler

ipcMain.on('requestEdit',(e,res)=>{
    let window
    const cases = {
        'producto' : ()=>{
            createEditProductWindow()
            window = editProductWindow
        },
        'empresa' : ()=>{
            createEditEmpresaWindow()
            window = editEmpresaWindow
        },
        'categoria' : ()=>{
            createEditCategoriaWindow()
            window = editCategoriaWindow
        },
        'venta' : ()=>{
            createEditVentaWindow()
            window = editVentaWindow
        }
    }

    cases[res.type]()


    window.webContents.send('requestEdit',res.content)

})


ipcMain.on('edited',(e,res)=>{

    let window
    const cases = {
        'producto' : ()=>{
            window = editProductWindow
        },
        'empresa' : ()=>{
            window = editEmpresaWindow
        },
        'categoria' : ()=>{
            window = editCategoriaWindow
        },
        'venta' : ()=>{
            window = editVentaWindow
        }
    }

    cases[res.type]()
    window.close()

})



ipcMain.on('delete',(e,res)=>{
    let datos = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),'utf-8'))
    let { productos , empresa , venta , categoria } = datos

    const cases = {
        'producto' : ()=>{
            productos = productos.filter(producto => producto.id != res.content)
            datos['productos'] = productos
        },
        'empresa' : ()=>{

            productos = productos.filter(producto => producto.empresa != res.content)
            delete empresa[res.content]

            datos['productos'] = productos
            datos['empresa'] = empresa
        },
        'categoria' : ()=>{

            productos = productos.filter(producto => producto.categoria != res.content)
            delete categoria[res.content]

            datos['productos'] = productos
            datos['categoria'] = categoria

        },
        'venta' : ()=>{

            productos = productos.filter(producto => producto.venta != res.content)
            delete venta[res.content]

            datos['productos'] = productos
            datos['venta'] = venta

        }
    }

    cases[res.type]()

    const json_datos = JSON.stringify(datos)
    fs.writeFileSync(path.join(__dirname,'data.json'), json_datos, 'utf-8')


})

ipcMain.on("worker:printPDF", (event, content) => {
    workerPDFWindow.webContents.send("worker:printPDF", content);
});
ipcMain.on("worker:ready", (event,content) => {
    const pdfPath = path.join(__dirname, 'ALIGER_CATALOGO.pdf');
    workerPDFWindow.webContents.printToPDF({
        printBackground: true,
        margins : {
            top : 0,
            bottom : 0,
            left : 0,
            right : 0
        }
    }).then((data) => {
        fs.writeFile(pdfPath, data,function (error) {
            if (error) {
                throw error
            }
            shell.openPath(pdfPath)
            event.sender.send('wrote-pdf', pdfPath)
        })
    }).catch((error) => {
       throw error;
    })
});