import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { actualizarCLiente, obtenerCliente } from "../data/clientes";
import Formulario from "../Components/Formulario";
import { Error } from "../Components/Error";

export async function loader({ params }){
    console.log(params);
    const cliente = await obtenerCliente(params.cliente_id)
    if(Object.values(cliente).length === 0){
        throw new Response('',{
            status: 404,
            statusText: 'Cliente no encontrado'
        })
    }
    console.log(cliente);

    return cliente
}

export async function action({request, params}){
   const formData = await request.formData();
   const datos = Object.fromEntries(formData)
   const email = formData.get('email')

   //? Validacion
   const errores = []
   if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son Obligatorios')
   }

   let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

   if(!regex.test(email)){
    errores.push('El email no es valido')
   }

   if (Object.keys(errores).length) {
    return errores
   }

   //? Actualizar cliente
   await actualizarCLiente(params.cliente_id, datos)

   return redirect('/')
}

export const EditarClientes = () => {

    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

  return (
    <>
    <h1 className=' font-black text-4xl text-blue-900 '>Editar Cliente</h1>
    <p className=' mt-3 ' > A continuación podras modificar los datos de un cliente </p>
    
    <div>
      <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase' onClick={()=> navigate(-1) }>
        Volver
      </button>
    </div>

    <div className="bg- hite shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

     {errores?.length && errores.map( (error, i) => <Error key={i}>{ error }</Error> ) //? Podemos utilizar este operador de Corto Circuito 
      }  
      {
        /*
            ? Componente Formulario que contiene los campos del formulario   
        */
      }
      <Form
        method="POST" //? Es importamte declarar el metodo POST
        noValidate   //? Desactivamos las validaciones de html5 para que la nuestra se pueda ejecutar
      >
        <Formulario
            cliente = { cliente }
        />
        <input
        type="submit"
        className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer "
        value = 'GUARDAR CAMBIOS    '
      />
      </Form>
    

      

    </div>
</>
  )
}
