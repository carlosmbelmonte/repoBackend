const nroRandoms = (cant) => {
    const arr = []
    const obj = {}

    for (let i = 0; i <= cant-1; i++){
        arr[i] = Math.floor(Math.random() * (1000 - 1) + 1)
    }
   
    arr.forEach(num => obj[num] = obj[num] ? ++obj[num] : 1)
    return obj
}

process.on('exit', () => {
    console.log(`worker #${process.pid} cerrado`)
})

process.on('message', cantidad => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const obj = nroRandoms(cantidad)
    process.send(obj)
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})