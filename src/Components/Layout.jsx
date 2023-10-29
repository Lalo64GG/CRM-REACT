import { Outlet, Link, useLocation} from 'react-router-dom'

const Layout = () => {
  
  const location = useLocation()

  return (
    <div className=' md:flex md:min-h-screen ' >
      <aside className=' md:w-1/4 bg-blue-900 px-5 py-10 '>
        <h2 className='text-4xl font-black text-center text-white'>CMR - Clientes</h2>

        <nav className='mt-10' >
          <Link 
          className={`${location.pathname === '/' ? ' text-blue-300 ' : 'text-white' } text-2xl block mt-2 hover:text-blue-300`}
          to="/"> 
            Clientes 
          </Link>
          <Link 
          className={`${location.pathname === '/clientes/nuevo' ? ' text-blue-300 ' : 'text-white' } text-2xl block mt-2 hover:text-blue-300`}
          to='/clientes/nuevo' 
          > 
           Nuevos Clientes 
          </Link>
        </nav>
      </aside>

      <main className=' md:w-3/4 p-10 md:h-screen overflow-scroll'>
      <Outlet /> {/* 
                      //* Este Outlet lo utilizamos para que a todos los hijos del path se imprima lo mismo, sin necesidad de reutilzar componentes   
                   */}
      </main>

    </div>
  )
}

export default Layout