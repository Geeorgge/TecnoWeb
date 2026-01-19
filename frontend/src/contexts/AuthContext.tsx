import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '../services/api'

interface User {
  username: string
  role: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verify token on load
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('techno_admin_token')

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await authApi.verifyToken()
        if (response.valid) {
          const profile = await authApi.getProfile()
          setUser({ username: profile.username, role: profile.role })
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('techno_admin_token')
          localStorage.removeItem('techno_admin_auth')
        }
      } catch {
        localStorage.removeItem('techno_admin_token')
        localStorage.removeItem('techno_admin_auth')
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(username, password)

      // Store token
      localStorage.setItem('techno_admin_token', response.access_token)
      localStorage.setItem('techno_admin_auth', 'true')

      // Update state
      setUser(response.user)
      setIsAuthenticated(true)

      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('techno_admin_token')
    localStorage.removeItem('techno_admin_auth')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
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
