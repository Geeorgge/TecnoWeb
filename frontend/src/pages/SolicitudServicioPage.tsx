import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SolicitudServicioForm from '../components/SolicitudServicioForm'

// Contact configuration from environment
const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '5218441972327'
const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '5218444180769'

const SolicitudServicioPage = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Same as HomePage */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - ajustado para logo vertical */}
            <Link to="/" className="flex items-center group overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <img
                src="/logo.png"
                alt="Tecno Hogar Logo"
                className="w-auto h-12 md:h-14 object-cover scale-105"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Inicio
              </Link>
              <Link to="/#servicios" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Servicios
              </Link>
              <Link to="/#precios" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Precios
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu - inside the container */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 mt-4 pt-4 pb-2">
              <nav className="flex flex-col space-y-1">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/#servicios"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  to="/#precios"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Precios
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Light gradient background */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 pt-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-cyan-500 transition-colors mb-6 group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Formulario de Solicitud
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Solicitar Servicio<br />
              <span className="text-cyan-500">Técnico</span>
            </h1>

            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Complete el siguiente formulario y nos pondremos en contacto con usted en menos de 24 horas para agendar su diagnóstico.
            </p>

            {/* Price info - Bigger box */}
            <div className="bg-white border-2 border-cyan-200 rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Costo de Diagnóstico</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-2xl font-bold text-cyan-600">$350</span>
                    <span className="text-gray-400">Saltillo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-teal-600">$450</span>
                    <span className="text-gray-400">Arteaga / Ramos Arizpe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {showSuccess ? (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-12 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-green-700 mb-4">¡Solicitud Enviada!</h3>
                <p className="text-lg text-green-600 mb-2">
                  Gracias por confiar en Tecno Hogar. Nos pondremos en contacto con usted en menos de 24 horas.
                </p>
                <p className="text-sm text-green-500">Redirigiendo a la página principal...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">Complete sus datos</h2>
                  <p className="text-cyan-100">Los campos marcados con * son obligatorios</p>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <SolicitudServicioForm onSuccess={handleSuccess} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Cyan gradient */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              ¿Prefieres contacto directo?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Escríbenos por WhatsApp o llámanos para atención inmediata
            </p>

            {/* Contact options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=Hola%2C%20necesito%20un%20servicio%20t%C3%A9cnico.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-green-600 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:+${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-white/30 hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar Ahora
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm mt-10">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Garantía Incluida
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Respuesta &lt; 24h
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                25+ Años
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                98% Satisfacción
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Logo & Description */}
            <div>
              <Link to="/" className="inline-block mb-4 overflow-hidden rounded-lg border border-slate-600">
                <img
                  src="/logo-footer.png"
                  alt="Tecno Hogar Logo"
                  className="w-auto h-16 object-cover scale-105"
                />
              </Link>
              <p className="text-gray-400 text-sm mb-5">
                Servicio Técnico de Excelencia desde hace más de 25 años. Reparación profesional de electrodomésticos con garantía.
              </p>
              {/* Social icons */}
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/Seervicio.Tecnico.Tecno.Hogar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h4 className="text-white font-semibold mb-5">Enlaces Rápidos</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Inicio</Link></li>
                <li><Link to="/#servicios" className="hover:text-cyan-400 transition-colors">Servicios</Link></li>
                <li><Link to="/#precios" className="hover:text-cyan-400 transition-colors">Precios</Link></li>
                <li><Link to="/#nosotros" className="hover:text-cyan-400 transition-colors">Sobre Nosotros</Link></li>
                <li><Link to="/#contacto" className="hover:text-cyan-400 transition-colors">Contacto</Link></li>
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-white font-semibold mb-5">Servicios</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Lavadoras</Link></li>
                <li><Link to="/#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Refrigeradores</Link></li>
                <li><Link to="/#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Secadoras</Link></li>
                <li><Link to="/#servicios" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</Link></li>
                <li><Link to="/" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-white font-semibold mb-5">Contacto</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Saltillo, Arteaga y Ramos Arizpe, Coahuila</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 mr-2 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lunes a Sábado<br/>9:00 AM - 5:00 PM</span>
                </li>
              </ul>
              <Link
                to="/solicitar-servicio"
                className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium mt-5 transition-all text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Solicitar Servicio
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>© 2026 Tecno Hogar. Todos los derechos reservados. | 25+ Años de Experiencia</p>
              <div className="flex items-center space-x-4 mt-3 md:mt-0">
                <span>Reseñas</span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 text-cyan-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Garantía en Todas las Reparaciones
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button with glow animation */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE}?text=Hola%2C%20necesito%20un%20servicio%20t%C3%A9cnico.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group animate-bounce-slow animate-glow-pulse"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse ring effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></span>
        <svg className="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          ¿Necesitas ayuda?
        </span>
      </a>
    </div>
  )
}

export default SolicitudServicioPage