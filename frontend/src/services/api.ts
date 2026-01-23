import axios from 'axios'
import { Cliente, Servicio, CreateClienteDto, CreateServicioDto } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('techno_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('techno_admin_token')
      localStorage.removeItem('techno_admin_auth')
      // Only redirect if we're on an admin page (not during initial load)
      if (window.location.pathname.startsWith('/admin-main')) {
        window.location.href = '/admin-login'
      }
    }
    return Promise.reject(error)
  }
)

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

// Auth API
export const authApi = {
  login: async (username: string, password: string): Promise<{ access_token: string; user: { username: string; role: string } }> => {
    const response = await api.post('/auth/login', { username, password })
    return response.data
  },

  verifyToken: async (): Promise<{ valid: boolean }> => {
    const response = await api.get('/auth/verify')
    return response.data
  },

  getProfile: async (): Promise<{ userId: string; username: string; role: string }> => {
    const response = await api.get('/auth/profile')
    return response.data
  },
}

export default api
