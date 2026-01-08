import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900">
      {/* Header con gradiente turquesa moderno */}
      <header className={`sticky top-0 z-50 text-white overflow-hidden backdrop-blur-lg transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-cyan-600/80 via-teal-600/80 to-blue-600/80'
          : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600'
      }`} style={{boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)'}}>
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Icono 3D moderno - Rayo eléctrico */}
              <div className="relative w-16 h-16 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white to-cyan-100 rounded-2xl shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                  <svg className="w-10 h-10 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight drop-shadow-lg">Techno Hogar</h1>
                <p className="text-cyan-100 mt-1 font-black text-base tracking-wide bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Servicio Técnico de Excelencia</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-3">
              <a href="#servicios" className="px-6 py-2.5 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transform">
                Servicios
              </a>
              <a href="#contacto" className="px-6 py-2.5 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 hover:bg-white hover:text-cyan-600 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 transform">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section con diseño moderno */}
      <section className="relative py-24 overflow-hidden">
        {/* Elementos decorativos flotantes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fadeIn">
            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 mb-8 leading-tight" style={{letterSpacing: '-0.02em'}}>
              Reparación de<br />Electrodomésticos
            </h2>
            <p className="text-2xl md:text-3xl text-gray-100 max-w-4xl mx-auto font-light leading-relaxed">
              Más de <span className="font-bold text-cyan-300">20 años de experiencia</span> brindando servicio de calidad en<br />
              Saltillo, Arteaga y Ramos Arizpe
            </p>
            {/* Información de precios */}
            <div className="mt-10 inline-block bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-400 rounded-3xl px-10 py-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 transform">
              <p className="text-xl font-bold text-gray-800">
                💰 Diagnóstico: <span className="text-orange-600 text-2xl">$350</span> en Saltillo | <span className="text-orange-600 text-2xl">$450</span> fuera
              </p>
              <p className="text-base text-gray-700 mt-2 font-medium">Ramos Arizpe y Arteaga</p>
            </div>
          </div>

          {/* Botones CTA mejorados */}
          <div className="text-center mb-20 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* Botón WhatsApp */}
              <a
                href="https://wa.me/5218441234567?text=Hola%2C%20necesito%20solicitar%20un%20servicio%20t%C3%A9cnico%20para%20mi%20electrodom%C3%A9stico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/50"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Agendar por WhatsApp</span>
              </a>

              {/* Botón Llamada */}
              <a
                href="tel:+5218441234567"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Llamar Ahora</span>
              </a>

              {/* Botón Formulario */}
              <Link
                to="/solicitar-servicio"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-cyan-500/50"
              >
                <span>Solicitar por Formulario</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <p className="mt-6 text-gray-300 text-sm">Respuesta en menos de 24 horas • Bot automático 24/7</p>
          </div>

        {/* Tarjetas de servicios con diseño moderno */}
        <div id="servicios" className="grid md:grid-cols-3 gap-10 mb-24">
          {/* Lavadoras */}
          <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 animate-fadeIn" style={{animationDelay: '0.3s', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=400&fit=crop"
                alt="Reparación de Lavadoras Domésticas"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
                  <h3 className="text-2xl font-black text-gray-800">
                    Lavadoras
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Reparación y mantenimiento especializado de lavadoras de todas las marcas y modelos
              </p>
              <div className="flex items-center text-cyan-600 font-bold group-hover:translate-x-2 transition-transform text-lg">
                <span>Ver más</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Refrigeradores */}
          <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 animate-fadeIn" style={{animationDelay: '0.4s', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&h=400&fit=crop"
                alt="Reparación de Refrigeradores Modernos"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
                  <h3 className="text-2xl font-black text-gray-800">
                    Refrigeradores
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Servicio técnico especializado para refrigeradores y congeladores con garantía
              </p>
              <div className="flex items-center text-cyan-600 font-bold group-hover:translate-x-2 transition-transform text-lg">
                <span>Ver más</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Secadoras */}
          <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 animate-fadeIn" style={{animationDelay: '0.5s', boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="h-56 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&h=400&fit=crop"
                alt="Reparación de Secadoras"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 inline-block">
                  <h3 className="text-2xl font-black text-gray-800">
                    Secadoras
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Mantenimiento y reparación de secadoras industriales y domésticas
              </p>
              <div className="flex items-center text-teal-600 font-bold group-hover:translate-x-2 transition-transform text-lg">
                <span>Ver más</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-24 animate-fadeIn" style={{animationDelay: '0.6s'}}>
          <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-3">
              25+
            </div>
            <div className="text-gray-700 font-semibold text-lg">Años de Experiencia</div>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-3">
              500+
            </div>
            <div className="text-gray-700 font-semibold text-lg">Clientes Satisfechos</div>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 mb-3">
              98%
            </div>
            <div className="text-gray-700 font-semibold text-lg">Satisfacción</div>
          </div>
          <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'}}>
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600 mb-3">
              24h
            </div>
            <div className="text-gray-700 font-semibold text-lg">Tiempo de Respuesta</div>
          </div>
        </div>

        {/* Sección Acerca de */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl p-16 mb-24 animate-fadeIn" style={{animationDelay: '0.7s', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)'}}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-5xl font-black text-gray-800 mb-10 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600">
                Acerca de Nosotros
              </span>
            </h3>
            <p className="text-2xl text-gray-700 leading-relaxed text-center mb-12 font-light">
              Somos un negocio independiente especializado en el servicio de reparación y mantenimiento
              de electrodomésticos. Con más de <span className="font-bold text-cyan-600">25 años de experiencia</span>,
              hemos brindado un trabajo de calidad a cientos de clientes en las ciudades de
              <span className="font-bold"> Saltillo, Arteaga y Ramos Arizpe</span>.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'}}>
                <div className="text-5xl mb-4">⚡</div>
                <div className="font-bold text-gray-800 text-xl mb-2">Servicio Rápido</div>
                <div className="text-gray-600 text-base">Atención inmediata</div>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'}}>
                <div className="text-5xl mb-4">✓</div>
                <div className="font-bold text-gray-800 text-xl mb-2">Garantía</div>
                <div className="text-gray-600 text-base">En todas las reparaciones</div>
              </div>
              <div className="text-center p-8 bg-white rounded-3xl transform hover:scale-105 transition-all" style={{boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'}}>
                <div className="text-5xl mb-4">💰</div>
                <div className="font-bold text-gray-800 text-xl mb-2">Precios Justos</div>
                <div className="text-gray-600 text-base">Sin costos ocultos</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de contacto */}
        <div id="contacto" className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 rounded-3xl p-16 text-white text-center animate-fadeIn" style={{animationDelay: '0.8s', boxShadow: '0 20px 60px rgba(6, 182, 212, 0.4)'}}>
          <h3 className="text-5xl font-black mb-8 drop-shadow-lg">¿Listo para reparar tu electrodoméstico?</h3>
          <p className="text-2xl mb-12 text-white-300 font-bold">Contáctanos ahora y recibe atención personalizada</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/5218441234567?text=Hola%2C%20necesito%20solicitar%20un%20servicio%20t%C3%A9cnico%20para%20mi%20electrodom%C3%A9stico"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
            {/* Llamada */}
            <a
              href="tel:+5218441234567"
              className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Llamar</span>
            </a>
            {/* Formulario */}
            <Link
              to="/solicitar-servicio"
              className="flex items-center space-x-3 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <span>Formulario</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Footer moderno */}
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-3xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Techno Hogar</h4>
              <p className="text-gray-300 text-lg leading-relaxed">Servicio técnico de excelencia</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-200">Servicios</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">→ Reparación de Lavadoras</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">→ Reparación de Refrigeradores</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">→ Reparación de Secadoras</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">→ Mantenimiento Preventivo</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-200">Contacto</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center"><span className="text-2xl mr-3">📍</span> Saltillo, Coahuila</li>
                <li className="flex items-center"><span className="text-2xl mr-3">⏰</span> Lun - Sáb: 9:00 AM - 5:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400 text-lg">&copy; 2026 Techno Hogar. Todos los derechos reservados.</p>

              {/* Redes Sociales */}
              <div className="flex items-center space-x-5">
                <span className="text-gray-300 font-semibold">Síguenos:</span>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg hover:shadow-blue-600/50"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg hover:shadow-pink-600/50"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 hover:bg-black rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg hover:shadow-gray-900/50"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg hover:shadow-red-600/50"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
