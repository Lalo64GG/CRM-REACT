import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Components/Layout';
import { NuevoCliente, action as nuevoClienteAction } from './pages/NuevoCliente';
import Index, { loader as clientesLoader } from './pages/Index';
import { ErrorPage } from './Components/ErrorPage';
import { EditarClientes, loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarClientes';
import { action as eliminarClienteAction } from './Components/Cliente'

//? Creamos el objeto de las rutas utilizando createBrowserRouter de react-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage/>,
    children: [
      //? Todo lo que esté dentro de este "children" compartirá el mismo diseño (Layout)
      {
        index: true, //* Marca esta ruta como la ruta principal
        element: <Index />, //* Componente a renderizar para la ruta principal
        loader: clientesLoader, //* Cargador de datos para la ruta principal

      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />, //* Componente a renderizar para la ruta '/clientes/nuevo'
        action: nuevoClienteAction, //? Acción a ejecutar al acceder a la ruta '/clientes/nuevo'
      },
      {
        path: '/clientes',
        element: <h1>asdasd</h1>, //* Ejemplo de componente para la ruta '/clientes'
      },
      {
        path: '/clientes/:cliente_id/editar',
        element: <EditarClientes/>,
        loader: editarClienteLoader,
        action: editarClienteAction
      },
      {
        path: '/clientes/:cliente_id/eliminar',
        action: eliminarClienteAction
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* //? Provider de react-router-dom que utiliza el router creado */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
