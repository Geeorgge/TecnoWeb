import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { clientesApi, serviciosApi } from '../services/api'
import { SolicitudServicioForm as FormData, TipoElectrodomestico, Urgencia } from '../types'

interface Props {
  onSuccess: () => void
}

const SolicitudServicioForm = ({ onSuccess }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<number>(1)

  const [showValidationAlert, setShowValidationAlert] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      urgencia: Urgencia.MEDIA,
      tipoElectrodomestico: TipoElectrodomestico.LAVADORA,
    },
  })

  const watchedFields = watch()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)
    setShowValidationAlert(false)

    try {
      // 1. Crear cliente
      const cliente = await clientesApi.create({
        nombre: data.nombreCliente,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
      })

      // 2. Crear servicio asociado al cliente
      await serviciosApi.create({
        clienteId: cliente.id,
        tipoElectrodomestico: data.tipoElectrodomestico,
        marca: data.marca,
        modelo: data.modelo,
        problema: data.problema,
        fechaPreferida: data.fechaPreferida,
        ubicacionServicio: data.ubicacionServicio,
        urgencia: data.urgencia,
      })

      onSuccess()
    } catch (err: any) {
      console.error('Error al enviar solicitud:', err)
      setError(
        err.response?.data?.message ||
          'Ocurrió un error al enviar la solicitud. Por favor, intente nuevamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSectionStatus = (sectionNum: number) => {
    if (sectionNum === 1) {
      return watchedFields.nombreCliente && watchedFields.telefono ? 'complete' : 'incomplete'
    }
    if (sectionNum === 2) {
      return watchedFields.tipoElectrodomestico && watchedFields.problema ? 'complete' : 'incomplete'
    }
    return 'incomplete'
  }

  const onError = () => {
    setShowValidationAlert(true)
    // Scroll to the top of the form to show the alert
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const getValidationErrors = () => {
    const errorMessages: string[] = []
    if (errors.nombreCliente) errorMessages.push(`Nombre: ${errors.nombreCliente.message}`)
    if (errors.telefono) errorMessages.push(`Teléfono: ${errors.telefono.message}`)
    if (errors.email) errorMessages.push(`Email: ${errors.email.message}`)
    if (errors.tipoElectrodomestico) errorMessages.push(`Electrodoméstico: ${errors.tipoElectrodomestico.message}`)
    if (errors.problema) errorMessages.push(`Problema: ${errors.problema.message}`)
    return errorMessages
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      {/* Validation Alert */}
      {showValidationAlert && Object.keys(errors).length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4 animate-shake">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-700">Por favor corrija los siguientes errores:</p>
              <ul className="mt-2 text-amber-600 text-sm list-disc list-inside space-y-1">
                {getValidationErrors().map((errorMsg, index) => (
                  <li key={index}>{errorMsg}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setShowValidationAlert(false)}
              className="text-amber-500 hover:text-amber-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error global */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 animate-shake">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-red-700">Error al enviar</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveSection(step)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                activeSection === step
                  ? 'bg-cyan-500 text-white scale-110 shadow-lg shadow-cyan-500/30'
                  : getSectionStatus(step) === 'complete'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {getSectionStatus(step) === 'complete' && activeSection !== step ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step
              )}
            </button>
            {step < 3 && (
              <div className={`w-16 sm:w-24 h-1 mx-2 rounded transition-colors duration-300 ${
                getSectionStatus(step) === 'complete' ? 'bg-green-500' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Sección 1: Datos del Cliente */}
      <div
        className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
          activeSection === 1
            ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveSection(1)}
          className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
            activeSection === 1 ? 'bg-cyan-50' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeSection === 1 ? 'bg-cyan-500' : 'bg-gray-300'
            }`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className={`font-bold ${activeSection === 1 ? 'text-cyan-700' : 'text-gray-700'}`}>
                Datos del Cliente
              </h3>
              <p className="text-sm text-gray-500">Información de contacto</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              activeSection === 1 ? 'rotate-180 text-cyan-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`transition-all duration-300 overflow-hidden ${
          activeSection === 1 ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-6 space-y-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-gray-700 font-medium mb-2">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('nombreCliente', {
                    required: 'El nombre es obligatorio',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="Juan Pérez"
                />
                {errors.nombreCliente && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.nombreCliente.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('telefono', {
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^[0-9]{10,}$/,
                      message: 'Ingrese un teléfono válido (mínimo 10 dígitos)',
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="8441234567"
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.telefono.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido',
                    },
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Dirección</label>
                <input
                  type="text"
                  {...register('direccion')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="Calle y número, colonia"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSection(2)}
              className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 hover:shadow-lg"
            >
              <span>Continuar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sección 2: Datos del Electrodoméstico */}
      <div
        className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
          activeSection === 2
            ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveSection(2)}
          className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
            activeSection === 2 ? 'bg-cyan-50' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeSection === 2 ? 'bg-cyan-500' : 'bg-gray-300'
            }`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className={`font-bold ${activeSection === 2 ? 'text-cyan-700' : 'text-gray-700'}`}>
                Datos del Electrodoméstico
              </h3>
              <p className="text-sm text-gray-500">Información del aparato a reparar</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              activeSection === 2 ? 'rotate-180 text-cyan-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`transition-all duration-300 overflow-hidden ${
          activeSection === 2 ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-6 space-y-4 bg-white">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Tipo de Electrodoméstico <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('tipoElectrodomestico', {
                    required: 'Seleccione un tipo de electrodoméstico',
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                >
                  <option value={TipoElectrodomestico.LAVADORA}>Lavadora</option>
                  <option value={TipoElectrodomestico.SECADORA}>Secadora</option>
                  <option value={TipoElectrodomestico.REFRIGERADOR}>Refrigerador</option>
                  <option value={TipoElectrodomestico.CONGELADOR}>Congelador</option>
                  <option value={TipoElectrodomestico.OTRO}>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Marca</label>
                <input
                  type="text"
                  {...register('marca')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="LG, Samsung, Whirlpool..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Modelo</label>
                <input
                  type="text"
                  {...register('modelo')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                  placeholder="Modelo del aparato"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Descripción del Problema <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('problema', {
                  required: 'Describa el problema',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres' },
                })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
                placeholder="Describa detalladamente el problema que presenta el electrodoméstico..."
              />
              {errors.problema && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.problema.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveSection(3)}
              className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 hover:shadow-lg"
            >
              <span>Continuar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sección 3: Preferencias de Servicio */}
      <div
        className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
          activeSection === 3
            ? 'border-cyan-500 shadow-lg shadow-cyan-500/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveSection(3)}
          className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
            activeSection === 3 ? 'bg-cyan-50' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeSection === 3 ? 'bg-cyan-500' : 'bg-gray-300'
            }`}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className={`font-bold ${activeSection === 3 ? 'text-cyan-700' : 'text-gray-700'}`}>
                Preferencias de Servicio
              </h3>
              <p className="text-sm text-gray-500">Cuándo y dónde prefiere el servicio</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              activeSection === 3 ? 'rotate-180 text-cyan-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`transition-all duration-300 overflow-hidden ${
          activeSection === 3 ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-6 space-y-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Fecha y Hora Preferida
                </label>
                <input
                  type="datetime-local"
                  {...register('fechaPreferida')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Urgencia</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: Urgencia.BAJA, label: 'Baja', color: 'green' },
                    { value: Urgencia.MEDIA, label: 'Media', color: 'yellow' },
                    { value: Urgencia.ALTA, label: 'Alta', color: 'red' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                        watchedFields.urgencia === option.value
                          ? option.color === 'green'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : option.color === 'yellow'
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        {...register('urgencia')}
                        value={option.value}
                        className="sr-only"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ubicación del Servicio
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['Saltillo', 'Arteaga', 'Ramos Arizpe'].map((ciudad) => (
                  <button
                    key={ciudad}
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('input[name="ubicacionServicio"]') as HTMLInputElement
                      if (input) input.value = ciudad
                    }}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all text-sm font-medium text-gray-600 hover:text-cyan-600"
                  >
                    {ciudad}
                  </button>
                ))}
              </div>
              <input
                type="text"
                {...register('ubicacionServicio')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-cyan-100 focus:border-cyan-500 transition-all duration-200 bg-white hover:border-gray-300"
                placeholder="Escriba la ubicación o seleccione arriba"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-3">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando Solicitud...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Enviar Solicitud</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>
              <p className="mt-4 text-center text-gray-500 text-sm">
                Responderemos en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SolicitudServicioForm