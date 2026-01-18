import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serviciosApi } from '../services/api'
import { Servicio, EstadoServicio, Urgencia } from '../types'
import { useAuth } from '../contexts/AuthContext'

const AdminPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [servicios, setServicios] = useState<Servicio[]>([])
  const [filtroEstado, setFiltroEstado] = useState<EstadoServicio | 'todos'>('todos')
  const [loading, setLoading] = useState(true)
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Estados para edición
  const [editEstado, setEditEstado] = useState<EstadoServicio>(EstadoServicio.PENDIENTE)
  const [editNotas, setEditNotas] = useState('')
  const [editCostoEstimado, setEditCostoEstimado] = useState('')
  const [editCostoFinal, setEditCostoFinal] = useState('')

  useEffect(() => {
    fetchServicios()
  }, [filtroEstado])

  const fetchServicios = async () => {
    try {
      setLoading(true)
      const params = filtroEstado !== 'todos' ? filtroEstado : undefined
      const data = await serviciosApi.findAll(params)
      setServicios(data)
    } catch (error) {
      console.error('Error al cargar servicios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (servicio: Servicio) => {
    setSelectedServicio(servicio)
    setEditEstado(servicio.estado)
    setEditNotas(servicio.notasTecnico || '')
    setEditCostoEstimado(servicio.costoEstimado?.toString() || '')
    setEditCostoFinal(servicio.costoFinal?.toString() || '')
    setShowModal(true)
  }

  const handleUpdateServicio = async () => {
    if (!selectedServicio) return

    try {
      await serviciosApi.update(selectedServicio.id, {
        estado: editEstado,
        notasTecnico: editNotas || undefined,
        costoEstimado: editCostoEstimado ? parseFloat(editCostoEstimado) : undefined,
        costoFinal: editCostoFinal ? parseFloat(editCostoFinal) : undefined,
      })

      setShowModal(false)
      fetchServicios()
    } catch (error) {
      console.error('Error al actualizar servicio:', error)
      alert('Error al actualizar el servicio')
    }
  }

  // Estadísticas
  const stats = {
    total: servicios.length,
    pendientes: servicios.filter(s => s.estado === EstadoServicio.PENDIENTE).length,
    programados: servicios.filter(s => s.estado === EstadoServicio.PROGRAMADO).length,
    enProceso: servicios.filter(s => s.estado === EstadoServicio.EN_PROCESO).length,
    completados: servicios.filter(s => s.estado === EstadoServicio.COMPLETADO).length,
  }

  const getEstadoBadge = (estado: EstadoServicio) => {
    const badges = {
      [EstadoServicio.PENDIENTE]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      [EstadoServicio.PROGRAMADO]: 'bg-blue-100 text-blue-800 border-blue-300',
      [EstadoServicio.EN_PROCESO]: 'bg-purple-100 text-purple-800 border-purple-300',
      [EstadoServicio.COMPLETADO]: 'bg-green-100 text-green-800 border-green-300',
      [EstadoServicio.CANCELADO]: 'bg-red-100 text-red-800 border-red-300',
    }
    return badges[estado]
  }

  const getUrgenciaBadge = (urgencia: Urgencia) => {
    const badges = {
      [Urgencia.BAJA]: 'bg-gray-100 text-gray-800',
      [Urgencia.MEDIA]: 'bg-orange-100 text-orange-800',
      [Urgencia.ALTA]: 'bg-red-100 text-red-800',
    }
    return badges[urgencia]
  }

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
                <p className="text-cyan-100">Gestión de Servicios Técnicos</p>
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
                onClick={() => {
                  logout()
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

      <div className="container mx-auto px-6 py-10">
        {/* Dashboard - Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 mb-2">
              {stats.total}
            </div>
            <div className="text-gray-600 font-semibold">Total</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-black text-yellow-600 mb-2">
              {stats.pendientes}
            </div>
            <div className="text-gray-600 font-semibold">Pendientes</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-black text-blue-600 mb-2">
              {stats.programados}
            </div>
            <div className="text-gray-600 font-semibold">Programados</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-black text-purple-600 mb-2">
              {stats.enProceso}
            </div>
            <div className="text-gray-600 font-semibold">En Proceso</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="text-3xl font-black text-green-600 mb-2">
              {stats.completados}
            </div>
            <div className="text-gray-600 font-semibold">Completados</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Filtrar por Estado</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFiltroEstado('todos')}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                filtroEstado === 'todos'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroEstado(EstadoServicio.PENDIENTE)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                filtroEstado === EstadoServicio.PENDIENTE
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFiltroEstado(EstadoServicio.PROGRAMADO)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                filtroEstado === EstadoServicio.PROGRAMADO
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Programados
            </button>
            <button
              onClick={() => setFiltroEstado(EstadoServicio.EN_PROCESO)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                filtroEstado === EstadoServicio.EN_PROCESO
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En Proceso
            </button>
            <button
              onClick={() => setFiltroEstado(EstadoServicio.COMPLETADO)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all ${
                filtroEstado === EstadoServicio.COMPLETADO
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completados
            </button>
          </div>
        </div>

        {/* Tabla de Servicios */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">ID</th>
                  <th className="px-6 py-4 text-left font-bold">Cliente</th>
                  <th className="px-6 py-4 text-left font-bold">Teléfono</th>
                  <th className="px-6 py-4 text-left font-bold">Electrodoméstico</th>
                  <th className="px-6 py-4 text-left font-bold">Problema</th>
                  <th className="px-6 py-4 text-left font-bold">Urgencia</th>
                  <th className="px-6 py-4 text-left font-bold">Estado</th>
                  <th className="px-6 py-4 text-left font-bold">Fecha</th>
                  <th className="px-6 py-4 text-left font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin h-8 w-8 text-cyan-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="ml-3">Cargando servicios...</span>
                      </div>
                    </td>
                  </tr>
                ) : servicios.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      No hay servicios registrados
                    </td>
                  </tr>
                ) : (
                  servicios.map((servicio) => (
                    <tr key={servicio.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">#{servicio.id}</td>
                      <td className="px-6 py-4 text-gray-900">{servicio.cliente?.nombre || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-700">{servicio.cliente?.telefono || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-semibold capitalize">{servicio.tipoElectrodomestico}</div>
                        {servicio.marca && <div className="text-sm text-gray-500">{servicio.marca}</div>}
                      </td>
                      <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{servicio.problema}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getUrgenciaBadge(servicio.urgencia)}`}>
                          {servicio.urgencia}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border-2 ${getEstadoBadge(servicio.estado)}`}>
                          {servicio.estado.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(servicio.createdAt).toLocaleDateString('es-MX')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenModal(servicio)}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold text-sm transition-all"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalle/Edición */}
      {showModal && selectedServicio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black">Detalle del Servicio #{selectedServicio.id}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Información del Cliente */}
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border-2 border-cyan-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Cliente
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-bold text-gray-900">{selectedServicio.cliente?.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-bold text-gray-900">{selectedServicio.cliente?.telefono}</p>
                  </div>
                  {selectedServicio.cliente?.email && (
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-bold text-gray-900">{selectedServicio.cliente.email}</p>
                    </div>
                  )}
                  {selectedServicio.cliente?.direccion && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Dirección</p>
                      <p className="font-bold text-gray-900">{selectedServicio.cliente.direccion}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del Electrodoméstico */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Electrodoméstico
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <p className="font-bold text-gray-900 capitalize">{selectedServicio.tipoElectrodomestico}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Marca</p>
                    <p className="font-bold text-gray-900">{selectedServicio.marca || 'No especificada'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Modelo</p>
                    <p className="font-bold text-gray-900">{selectedServicio.modelo || 'No especificado'}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-sm text-gray-600">Problema Reportado</p>
                    <p className="font-bold text-gray-900">{selectedServicio.problema}</p>
                  </div>
                  {selectedServicio.ubicacionServicio && (
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-600">Ubicación del Servicio</p>
                      <p className="font-bold text-gray-900">{selectedServicio.ubicacionServicio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Edición de Estado y Detalles */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Gestión del Servicio
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Estado</label>
                    <select
                      value={editEstado}
                      onChange={(e) => setEditEstado(e.target.value as EstadoServicio)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                    >
                      <option value={EstadoServicio.PENDIENTE}>Pendiente</option>
                      <option value={EstadoServicio.PROGRAMADO}>Programado</option>
                      <option value={EstadoServicio.EN_PROCESO}>En Proceso</option>
                      <option value={EstadoServicio.COMPLETADO}>Completado</option>
                      <option value={EstadoServicio.CANCELADO}>Cancelado</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Costo Estimado ($)</label>
                      <input
                        type="number"
                        value={editCostoEstimado}
                        onChange={(e) => setEditCostoEstimado(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Costo Final ($)</label>
                      <input
                        type="number"
                        value={editCostoFinal}
                        onChange={(e) => setEditCostoFinal(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Notas del Técnico</label>
                    <textarea
                      value={editNotas}
                      onChange={(e) => setEditNotas(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all"
                      placeholder="Escribe notas sobre el diagnóstico, reparación, piezas utilizadas, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-4">
                <button
                  onClick={handleUpdateServicio}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
