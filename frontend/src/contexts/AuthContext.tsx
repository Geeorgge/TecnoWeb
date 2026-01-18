import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const savedAuth = localStorage.getItem('techno_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    // Credenciales hardcodeadas (puedes cambiarlas)
    // En producción, esto debería verificarse contra el backend
    if (username === 'admin' && password === 'techno2024') {
      setIsAuthenticated(true)
      localStorage.setItem('techno_admin_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('techno_admin_auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
