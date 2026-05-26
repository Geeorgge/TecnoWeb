import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { logContact } from '../services/contactLogger'

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '5218441972327'
const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '5218444180769'
const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://docs.google.com/spreadsheets'

const AdminPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black">Panel de Administración</h1>
                <p className="text-cyan-100">Tecno Hogar</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 transition-all font-bold"
              >
                ← Inicio
              </Link>
              <button
                onClick={async () => {
                  await logout()
                  navigate('/admin-login')
                }}
                className="px-6 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 border border-red-400 transition-all font-bold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-2xl">

        {/* Google Sheets Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.9 3H4.1C3.5 3 3 3.5 3 4.1v15.8C3 20.5 3.5 21 4.1 21h15.8c.6 0 1.1-.5 1.1-1.1V4.1C21 3.5 20.5 3 19.9 3zm-9.4 14H7v-2.5h3.5V17zm0-4H7v-2.5h3.5V13zm0-4H7V6.5h3.5V9zm6.5 8H12v-2.5H17V17zm0-4H12v-2.5H17V13zm0-4H12V6.5H17V9z"/>
              </svg>
              Solicitudes en Google Sheets
            </h2>
            <p className="text-green-100 mt-1">Todas las solicitudes de servicio se registran aquí</p>
          </div>
          <div className="p-8 space-y-4">
            <p className="text-gray-600">
              El historial completo de solicitudes, incluyendo datos del cliente, electrodoméstico y estado, está disponible en Google Sheets.
            </p>
            <a
              href={GOOGLE_SHEETS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.9 3H4.1C3.5 3 3 3.5 3 4.1v15.8C3 20.5 3.5 21 4.1 21h15.8c.6 0 1.1-.5 1.1-1.1V4.1C21 3.5 20.5 3 19.9 3zm-9.4 14H7v-2.5h3.5V17zm0-4H7v-2.5h3.5V13zm0-4H7V6.5h3.5V9zm6.5 8H12v-2.5H17V17zm0-4H12v-2.5H17V13zm0-4H12V6.5H17V9z"/>
              </svg>
              Abrir Google Sheets
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logContact('WhatsApp', 'Admin')}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-3 hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800">WhatsApp</p>
              <p className="text-sm text-gray-500">Ver conversaciones</p>
            </div>
          </a>

          <a
            href={`tel:+${PHONE_NUMBER}`}
            onClick={() => logContact('Llamar', 'Admin')}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-3 hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-800">Teléfono</p>
              <p className="text-sm text-gray-500">Llamar al negocio</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}

export default AdminPage
