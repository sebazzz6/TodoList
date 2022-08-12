const tareaInput = document.querySelector("#tareaInput")
const btn = document.querySelector("#agregaTarea")
const table = document.querySelector("#task")
const totalTasks = document.querySelector("#totalTasks")
const taskDone = document.querySelector("#taskDone")


const misTareas = [
    { id: 1, descripcion: "Salir a Comer", completado: false },
    { id: 2, descripcion: "Compras supermercado", completado: false }
]
let idTarea = misTareas.length 


function reNewTask() {
    let html = ""
    for (let tarea of misTareas) {
        if (tarea.completado == false) {
            html += `<tr>
                        <th>${tarea.id}</th>
                        <td>${tarea.descripcion}</td>
                        <td><button type="button" class="btn btn-sm" onclick="cambiaEstado(${tarea.id})"><strong>NO</strong></button></td>
                        <td><button type="button" class="btn btn-sm" onclick="borrar(${tarea.id})"><strong>X</strong></button></td>
                    </tr>`
                    
        } else {
            html += `<tr>
                        <th>${tarea.id}</th>
                        <td style="text-decoration: line-through">${tarea.descripcion}</td>
                        <td><button type="button" class="btn btn-sm" onclick="cambiaEstado(${tarea.id})"><strong>SI</strong></button></td>
                        <td><button type="button" class="btn btn-sm" onclick="borrar(${tarea.id})"><strong>X</strong></button></td>
                    </tr>`       
        }
    }
    table.innerHTML = html 
    totalTasks.innerHTML = misTareas.length
    filtroRealizadas()
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        btn.click()
    }
});



btn.addEventListener("click", () => {
    const nuevaTarea = tareaInput.value 
    if (nuevaTarea == "") { 
        alert("Por favor agregar una tarea")
        return
    }
    idTarea++
    misTareas.push({ id: idTarea, descripcion: nuevaTarea, completado: false }) 
    tareaInput.value = "" 
    reNewTask()
})


function borrar(id) {
    console.log(id)
    const index = misTareas.findIndex(tarea => tarea.id == id)
    misTareas.splice(index, 1)
    reNewTask()
}


function filtroRealizadas() {
    const tareaLista = true
    const tareasFiltradas = misTareas.filter((tarea) => tarea.completado === tareaLista);
    taskDone.innerHTML = tareasFiltradas.length
}


function cambiaEstado(id) { 
    console.log(id)
    const index = misTareas.findIndex(tarea => tarea.id == id) 
    misTareas[index].completado = !misTareas[index].completado 
    reNewTask()
}

reNewTask()