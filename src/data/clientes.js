//? GET
export async function obtenerClientes () {

    //? Creamos una API falsa con json-server
    //* Lo que hacemos aqui es una peticion get, para obtener los datos de dicha API
    
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()

    return resultado
}

//? GET
export async function obtenerCliente (id) {

    //? Creamos una API falsa con json-server
    //* Lo que hacemos aqui es una peticion get, para obtener los datos de dicha API
    
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
    const resultado = await respuesta.json()

    return resultado
}

//? POST
export async function agregarCliente(datos) {
    try{
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await  respuesta.json()
    }catch(err){
        console.log(err);
    }

}

//? PUT

export async function actualizarCLiente(id, datos){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await  respuesta.json()
    }catch(err){
        console.log(err);
    }

}

//? DELETE

export async function eliminarCliente(id){
    try{
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        })
        return await  respuesta.json()
    }catch(err){
        console.log(err);
    }
}

