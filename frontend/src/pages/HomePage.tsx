import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Clean white with shadow */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Tecno Hogar Logo"
                className="w-auto h-12 md:h-14 object-contain p-1 border border-gray-200 rounded-lg shadow-sm"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Servicios
              </a>
              <a href="#precios" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Precios
              </a>
              <a href="#nosotros" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Sobre Nosotros
              </a>
              <a href="#contacto" className="text-gray-600 hover:text-cyan-500 transition-colors font-medium">
                Contacto
              </a>
              <Link
                to="/solicitar-servicio"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                Solicitar Servicio
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

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 mt-4 pt-4 pb-2">
              <nav className="flex flex-col space-y-1">
                <a
                  href="#servicios"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Servicios
                </a>
                <a
                  href="#precios"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Precios
                </a>
                <a
                  href="#nosotros"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre Nosotros
                </a>
                <a
                  href="#contacto"
                  className="text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 transition-colors font-medium py-3 px-4 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contacto
                </a>
                <Link
                  to="/solicitar-servicio"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all text-center mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Solicitar Servicio
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Light blue gradient background */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

        <div className="container mx-auto px-6 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                25+ Años de Experiencia
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Reparación de<br />
                Electrodomésticos<br />
                <span className="text-cyan-500">Rápida y Confiable</span>
              </h1>

              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Tu lavadora, refrigerador o secadora descompuesta no tiene que arruinar tu día.
                Obtén servicio técnico profesional en menos de 24 horas con garantía incluida.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Respuesta &lt; 24 Horas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Garantía Incluida</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Precios Transparentes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">Técnicos Certificados</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/solicitar-servicio"
                  className="inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/30"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Agendar Servicio Ahora
                </Link>
                <a
                  href="https://wa.me/5218441234567?text=Hola%2C%20necesito%20solicitar%20un%20servicio%20t%C3%A9cnico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 px-8 py-3.5 rounded-lg font-semibold border-2 border-gray-200 transition-all hover:border-green-500 hover:text-green-600"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Price note */}
              <p className="text-sm text-gray-500">
                <span className="text-cyan-600 font-semibold">$350 diagnóstico</span> • Presupuesto después del diagnóstico
              </p>
            </div>

            {/* Right - Hero Image */}
            <div className="relative lg:scale-110 lg:ml-8">
              <img
                src="/hero.png"
                alt="Técnico reparando electrodomésticos"
                className="rounded-2xl shadow-2xl w-full max-w-xl mx-auto lg:max-w-none lg:min-h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gradient-to-b from-white to-cyan-50/30">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios de Reparación
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reparamos todas las marcas y modelos de electrodomésticos con garantía profesional
            </p>
          </div>

          {/* Service cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Lavadoras */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {/* Icono de lavadora */}
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm0 2h12v3H6V4zm0 5h12v11H6V9zm6 1a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM7 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lavadoras</h3>
              <p className="text-gray-600 mb-6">
                Reparación especializada de lavadoras de carga frontal y superior. Todas las marcas y modelos.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No centrifuga
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No lava o enjuaga
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fugas de agua
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Problemas eléctricos
                </li>
              </ul>
              <a href="#contacto" className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-700 transition-colors">
                Ver detalles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Refrigeradores */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {/* Icono de copo de nieve */}
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a1 1 0 0 1 1 1v3.586l2.293-2.293a1 1 0 1 1 1.414 1.414L14 8.414V11h2.586l2.707-2.707a1 1 0 1 1 1.414 1.414L18.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L16.586 13H14v2.586l2.707 2.707a1 1 0 0 1-1.414 1.414L13 17.414V21a1 1 0 1 1-2 0v-3.586l-2.293 2.293a1 1 0 0 1-1.414-1.414L10 15.586V13H7.414l-2.707 2.707a1 1 0 0 1-1.414-1.414L5.586 12l-2.293-2.293a1 1 0 0 1 1.414-1.414L7.414 11H10V8.414L7.293 5.707a1 1 0 0 1 1.414-1.414L11 6.586V3a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Refrigeradores</h3>
              <p className="text-gray-600 mb-6">
                Servicio técnico profesional para refrigeradores y congeladores con garantía incluida.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No enfría correctamente
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ruidos extraños
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fugas de agua
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Problemas de termostato
                </li>
              </ul>
              <a href="#contacto" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Ver detalles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Secadoras */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {/* Icono de viento/aire caliente */}
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secadoras</h3>
              <p className="text-gray-600 mb-6">
                Reparación y mantenimiento de secadoras de todas las marcas.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No calienta
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No enciende
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tarda mucho en secar
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ruidos anormales
                </li>
              </ul>
              <a href="#contacto" className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                Ver detalles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* View all services button */}
          <div className="text-center">
            <Link
              to="/solicitar-servicio"
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
            >
              Ver Todos los Servicios
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Dark Section */}
      <section id="nosotros" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Por Qué Elegir Tecno Hogar?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              25+ años de experiencia respaldando cada reparación
            </p>
          </div>

          {/* Stats with colored circles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
                <span className="text-2xl font-bold text-white">25+</span>
              </div>
              <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">Años de Experiencia</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal-400/50 transition-all duration-300">
                <span className="text-2xl font-bold text-white">1000+</span>
              </div>
              <p className="text-white font-semibold group-hover:text-teal-400 transition-colors">Clientes Satisfechos</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-400/50 transition-all duration-300">
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <p className="text-white font-semibold group-hover:text-amber-400 transition-colors">Satisfacción</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                <span className="text-xl font-bold text-white">&lt;24h</span>
              </div>
              <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">Tiempo de Respuesta</p>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Negocio Local e Independiente</h3>
                  <p className="text-gray-400 text-sm">Empresa familiar con 25+ años sirviendo a la comunidad de Saltillo, Arteaga y Ramos Arizpe.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Garantía en Reparaciones</h3>
                  <p className="text-gray-400 text-sm">Todos nuestros trabajos incluyen garantía. Tu tranquilidad es nuestra prioridad.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Precios Justos y Transparentes</h3>
                  <p className="text-gray-400 text-sm">Sin costos ocultos. Presupuesto claro después del diagnóstico antes de proceder.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Respuesta Rápida</h3>
                  <p className="text-gray-400 text-sm">Respondemos en menos de 24 horas. Sistema de respuesta automática disponible 24/7.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Todas las Marcas</h3>
                  <p className="text-gray-400 text-sm">Reparamos todas las marcas y modelos de electrodomésticos sin excepción.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Técnicos Certificados</h3>
                  <p className="text-gray-400 text-sm">Personal profesional con años de experiencia y capacitación continua.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Cómo Trabajamos
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Proceso Simple y Transparente
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En Tecno Hogar, hacemos que la reparación de tus electrodomésticos sea fácil y sin sorpresas. Nuestro proceso está diseñado para tu comodidad y tranquilidad.
            </p>
          </div>

          {/* Images Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <img
              src="/proceso-1.png"
              alt="Proceso paso 1"
              className="rounded-xl shadow-lg w-full h-56 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <img
              src="/proceso-2.png"
              alt="Proceso paso 2"
              className="rounded-xl shadow-lg w-full h-56 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <img
              src="/proceso-3.png"
              alt="Proceso paso 3"
              className="rounded-xl shadow-lg w-full h-56 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { num: 1, title: 'Contáctanos', desc: 'Escríbenos por WhatsApp o completa nuestro formulario.' },
              { num: 2, title: 'Agendamos tu Diagnóstico', desc: 'Te contactamos en menos de 24 horas.' },
              { num: 3, title: 'Diagnóstico y Presupuesto', desc: 'Revisamos tu electrodoméstico y te damos presupuesto.' },
              { num: 4, title: 'Reparación con Garantía', desc: 'Realizamos la reparación profesional con garantía.' },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-gray-50 rounded-xl p-6 hover:bg-cyan-50 transition-all duration-300 group cursor-pointer text-center"
              >
                <div className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/solicitar-servicio"
              className="inline-flex items-center bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
            >
              Iniciar Proceso Ahora
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-gradient-to-b from-cyan-50/50 to-white">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Precios Transparentes y Justos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sin costos ocultos. Conoce el precio del diagnóstico desde el principio
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Saltillo - Popular */}
            <div className="bg-white rounded-2xl p-8 border-2 border-cyan-500 relative shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              </div>
              <div className="w-12 h-12 bg-cyan-500 rounded-xl mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Saltillo</h3>
              <p className="text-gray-500 mb-4">Servicio en la ciudad</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$350</span>
                <span className="text-gray-500 ml-2">MXN</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">Diagnóstico profesional</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Diagnóstico completo
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Presupuesto detallado
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin compromiso
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-cyan-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Respuesta en 24 horas
                </li>
              </ul>
              {/* Multiple buttons */}
              <div className="space-y-3">
                <Link
                  to="/solicitar-servicio"
                  className="flex items-center justify-center w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Llenar Formulario
                </Link>
                <a
                  href="https://wa.me/5218441234567?text=Hola%2C%20quiero%20agendar%20un%20diagnóstico%20en%20Saltillo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="tel:+5218441234567"
                  className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar
                </a>
              </div>
            </div>

            {/* Arteaga y Ramos Arizpe */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-12 h-12 bg-teal-400 rounded-xl mb-6"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Arteaga y Ramos Arizpe</h3>
              <p className="text-gray-500 mb-4">Áreas foráneas</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$450</span>
                <span className="text-gray-500 ml-2">MXN</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">Diagnóstico profesional</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-teal-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Diagnóstico completo
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-teal-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Presupuesto detallado
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-teal-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sin compromiso
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-teal-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Respuesta en 24 horas
                </li>
              </ul>
              {/* Multiple buttons */}
              <div className="space-y-3">
                <Link
                  to="/solicitar-servicio"
                  className="flex items-center justify-center w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Llenar Formulario
                </Link>
                <a
                  href="https://wa.me/5218441234567?text=Hola%2C%20quiero%20agendar%20un%20diagnóstico%20en%20Arteaga%2FRamos%20Arizpe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="tel:+5218441234567"
                  className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-all"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar
                </a>
              </div>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-400 rounded-xl flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Qué Incluye el Diagnóstico?</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Inspección completa del electrodoméstico
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Identificación del problema
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Presupuesto detallado de reparación
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-cyan-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tiempo estimado de reparación
                  </div>
                </div>
              </div>
              <a href="#contacto" className="text-cyan-600 font-semibold hover:text-cyan-700 whitespace-nowrap hidden md:block">
                Ver Más Detalles →
              </a>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            <svg className="w-5 h-5 inline mr-2 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            El costo final de reparación se determina después del diagnóstico. Siempre recibirás un presupuesto antes de proceder.
          </p>
        </div>
      </section>

      {/* CTA Section - Cyan gradient */}
      <section id="contacto" className="py-20 bg-gradient-to-r from-cyan-500 to-cyan-600 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Tu Electrodoméstico Necesita Reparación?
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              No esperes más. Agenda tu diagnóstico hoy y recibe atención profesional en menos de 24 horas.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/solicitar-servicio"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-cyan-600 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Solicitar Servicio Ahora
              </Link>
              <a
                href="https://wa.me/5218441234567?text=Hola%2C%20necesito%20solicitar%20un%20servicio%20t%C3%A9cnico"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-cyan-700 hover:bg-cyan-800 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-white/30"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contactar por WhatsApp
              </a>
            </div>

            {/* Contact options */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 max-w-3xl mx-auto mb-10">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                  <p className="text-white/70 text-sm">Respuesta inmediata</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-1">Llamada</h3>
                  <p className="text-white/70 text-sm">Atención directa</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold mb-1">Formulario</h3>
                  <p className="text-white/70 text-sm">Detalla tu solicitud</p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm">
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
              <Link to="/" className="inline-block mb-4">
                <img
                  src="/logo-footer.png"
                  alt="Tecno Hogar Logo"
                  className="w-auto h-16 object-contain p-1 border border-slate-600 rounded-lg"
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
                  href="https://wa.me/5218441234567"
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
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
                <li><a href="#precios" className="hover:text-cyan-400 transition-colors">Precios</a></li>
                <li><a href="#nosotros" className="hover:text-cyan-400 transition-colors">Sobre Nosotros</a></li>
                <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="text-white font-semibold mb-5">Servicios</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Lavadoras</a></li>
                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Refrigeradores</a></li>
                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Reparación de Secadoras</a></li>
                <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
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
        href="https://wa.me/5218441234567?text=Hola%2C%20necesito%20un%20servicio%20t%C3%A9cnico."
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

export default HomePage
