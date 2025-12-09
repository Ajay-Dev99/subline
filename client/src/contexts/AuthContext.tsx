import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

interface Admin {
  _id: string
  username: string
  email: string
}

interface AuthContextType {
  admin: Admin | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  )
  const [loading, setLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("admin_token")
      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })

        const data = await response.json()

        if (data.success) {
          setAdmin(data.data.admin)
          setToken(storedToken)
        } else {
          localStorage.removeItem("admin_token")
          setToken(null)
          setAdmin(null)
        }
      } catch (error) {
        console.error("Token verification failed:", error)
        localStorage.removeItem("admin_token")
        setToken(null)
        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Login failed")
      }

      setAdmin(data.data.admin)
      setToken(data.data.token)
      localStorage.setItem("admin_token", data.data.token)
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setAdmin(null)
    setToken(null)
    localStorage.removeItem("admin_token")
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAuthenticated: !!admin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
