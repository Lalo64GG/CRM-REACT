import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../Components/Formulario"
import { Error } from "../Components/Error";
import { agregarCliente } from "../data/clientes";

//* Función de acción para ejecutar en el envío del formulario
export async function action({ request }){ //? Con react-router no es necesario hacer lo estandarizado, crear una funcion para que el formulario se ejecute, solo declaramos la funcion action y al momento de hacer Submit se ejecutara todo lo que este dentro de action.

   //* Obtener los datos del formulario utilizando el método formData() del objeto de respuesta
   const formData = await request.formData();

   //* Convertir los datos del formulario a un objeto utilizando Object.fromEntries
   const datos = Object.fromEntries(formData)

   const email = formData.get('email')

   //? Validacion
   const errores = []
   if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son Obligatorios')
   }

   //* Aqui validaremos el email con expresiones regulares, se utiliza una negacion para que el if pueda ejecutarse de manera correcta.
   let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

   if(!regex.test(email)){
    errores.push('El email no es valido')
   }

   //* Retornar daso si hay errores
   if (Object.keys(errores).length) {
    return errores
   }

   await agregarCliente(datos)

   return redirect('/')


}

export const NuevoCliente = () => {

  //* Hook de react-router para la navegación
  const navigate = useNavigate()
  const errores = useActionData() //? Obtencion de los datos proporcionados por action.

  return (
    <>
        <h1 className=' font-black text-4xl text-blue-900 '>Nuevo Cliente</h1>
        <p className=' mt-3 ' > Llena todos los campos para registrar un nuevo cliente </p>
        
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
            <Formulario/>
            <input
            type="submit"
            className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer "
            value = 'Registrar Cliente'
          />
          </Form>
        

          

        </div>
    </>
  )
}
