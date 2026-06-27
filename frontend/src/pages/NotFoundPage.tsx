import { Link } from 'react-router-dom'

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '5218441972327'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-cyan-500 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Página no encontrada</h1>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg"
          >
            Ir al inicio
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hola, necesito ayuda con mi electrodoméstico')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
