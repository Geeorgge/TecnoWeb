import axios from 'axios'
import { Cliente, Servicio, CreateClienteDto, CreateServicioDto } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Clientes
export const clientesApi = {
  create: async (data: CreateClienteDto): Promise<Cliente> => {
    const response = await api.post<Cliente>('/clientes', data)
    return response.data
  },

  getAll: async (search?: string): Promise<Cliente[]> => {
    const response = await api.get<Cliente[]>('/clientes', {
      params: { search },
    })
    return response.data
  },

  getById: async (id: number): Promise<Cliente> => {
    const response = await api.get<Cliente>(`/clientes/${id}`)
    return response.data
  },
}

// Servicios
export const serviciosApi = {
  create: async (data: CreateServicioDto): Promise<Servicio> => {
    const response = await api.post<Servicio>('/servicios', data)
    return response.data
  },

  findAll: async (estado?: string): Promise<Servicio[]> => {
    const response = await api.get<Servicio[]>('/servicios', {
      params: { estado },
    })
    return response.data
  },

  getById: async (id: number): Promise<Servicio> => {
    const response = await api.get<Servicio>(`/servicios/${id}`)
    return response.data
  },

  update: async (id: number, data: Partial<Servicio>): Promise<Servicio> => {
    const response = await api.patch<Servicio>(`/servicios/${id}`, data)
    return response.data
  },

  getByCliente: async (clienteId: number): Promise<Servicio[]> => {
    const response = await api.get<Servicio[]>(`/servicios/cliente/${clienteId}`)
    return response.data
  },
}

export default api
