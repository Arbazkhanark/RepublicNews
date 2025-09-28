// // "use client"
// import { useState, useEffect } from "react"

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   profileImage?: string
// }

// interface AuthState {
//   user: User | null
//   loading: boolean
//   error: string | null
// }

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     loading: true,
//     error: null,
//   })

//   useEffect(() => {
//     checkAuth()
//   }, [])



//   const checkAuth = async () => {
//   try {
//     const authToken = localStorage.getItem("auth-token")
//     if (!authToken) {
//       setAuthState({ user: null, loading: false, error: null })
//       return
//     }

//     const response = await fetch("/api/auth/me", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//     })

//     if (response.ok) {
//       const data = await response.json()
//       setAuthState({ user: data.user, loading: false, error: null })
//     } else {
//       setAuthState({ user: null, loading: false, error: null })
//     }
//   } catch (error) {
//     setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
//   }
// }


//   const login = async (email: string, password: string) => {
//   try {
//     setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })

//     const data = await response.json()

//     if (response.ok) {
//       const token = data.user?.token
//       if (token) {
//         localStorage.setItem("auth-token", token)
//       }

//       setAuthState({ user: data.user, loading: false, error: null })
//       return { success: true }
//     } else {
//       setAuthState({ user: null, loading: false, error: data.error || "Login failed" })
//       return { success: false, error: data.error || "Login failed" }
//     }
//   } catch (error) {
//     const errorMessage = "Login failed. Please try again."
//     setAuthState({ user: null, loading: false, error: errorMessage })
//     return { success: false, error: errorMessage }
//   }
// }








//   const register = async (name: string, email: string, password: string, role = "writer") => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setAuthState({ user: data.user, loading: false, error: null })
//         return { success: true }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.error || "Registration failed" })
//         return { success: false, error: data.error || "Registration failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Registration failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       return { success: false, error: errorMessage }
//     }
//   }
  



//     const logout = async () => {
//     try {
//       await fetch("/api/auth/logout", { method: "POST" })
//       setAuthState({ user: null, loading: false, error: null })
//     } catch (error) {
//       console.error("Logout error:", error)
//       // Even if logout API fails, clear local state
//       setAuthState({ user: null, loading: false, error: null })
//     }
//   }


//     return {
//     ...authState,
//     login,
//     register,
//     logout,
//     checkAuth,
//   }
// }




















// hooks/use-auth.ts

// "use client"
// import { useState, useEffect } from "react"
// import { toast } from "sonner"

// interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   profileImage?: string
//   token?: string
// }

// interface AuthState {
//   user: User | null
//   loading: boolean
//   error: string | null
// }

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     loading: true,
//     error: null,
//   })

//   useEffect(() => {
//     checkAuth()
//   }, [])

//   const checkAuth = async () => {
//     try {
//       const authToken = localStorage.getItem("auth-token")
//       if (!authToken) {
//         setAuthState({ user: null, loading: false, error: null })
//         return
//       }

//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setAuthState({ user: data.user, loading: false, error: null })
//       } else {
//         localStorage.removeItem("auth-token")
//         setAuthState({ user: null, loading: false, error: null })
//       }
//     } catch (error) {
//       setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
//     }
//   }

//     const checkAdminAuth = async () => {
//     try {
//       const authToken = localStorage.getItem("admin-token");
//       if (!authToken) {
//         setAuthState({ user: null, loading: false, error: null })
//         return
//       }

//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setAuthState({ user: data.user, loading: false, error: null })
//       } else {
//         localStorage.removeItem("admin-token")
//         setAuthState({ user: null, loading: false, error: null })
//       }
//     } catch (error) {
//       setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
//     }
//   }



//   const login = async (email: string, password: string, role: string) => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       })

//       const data = await response.json()

//       console.log(data, "Login response data...")

//       if (response.ok) {
//         const token = data.user?.token
//         if (token) {
//           localStorage.setItem("auth-token", token)
//         }

//         setAuthState({ user: data.user, loading: false, error: null })
//         toast.success(`Welcome back, ${data.user.name}!`)
//         return { success: true }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
//         toast.error(data.message || "Invalid credentials")
//         return { success: false, error: data.message || "Login failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Login failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }


//     const adminLogin = async (email: string, password: string, role: string) => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       })

//       const data = await response.json()

//       console.log(data, "Login response data...")

//       if (response.ok) {
//         const token = data.user?.token
//         if (token) {
//           localStorage.setItem("admin-token", token)
//         }

//         setAuthState({ user: data.user, loading: false, error: null })
//         console.log(data.user, "Admin user data after login...")
//         console.log(authState.user, "Auth state user after admin login...")
//         toast.success(`Welcome back, ${data.user.name}!`)
//         return { success: true }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
//         toast.error(data.message || "Invalid credentials")
//         return { success: false, error: data.message || "Login failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Login failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const register = async (name: string, email: string, password: string, role = "writer") => {
//     try {
//       setAuthState((prev) => ({ ...prev, loading: true, error: null }))

//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setAuthState({ user: data.user, loading: false, error: null })
//         toast.success(`Welcome, ${data.user.name}!`)
//         return { success: true }
//       } else {
//         setAuthState({ user: null, loading: false, error: data.message || "Registration failed" })
//         toast.error(data.message || "Registration failed")
//         return { success: false, error: data.message || "Registration failed" }
//       }
//     } catch (error) {
//       const errorMessage = "Registration failed. Please try again."
//       setAuthState({ user: null, loading: false, error: errorMessage })
//       toast.error(errorMessage)
//       return { success: false, error: errorMessage }
//     }
//   }

//   const logout = async () => {
//     try {
//       const authToken = localStorage.getItem("auth-token")
      
//       if (authToken) {
//         await fetch("/api/auth/logout", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         })
//       }
      
//       localStorage.removeItem("auth-token")
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     } catch (error) {
//       console.error("Logout error:", error)
//       // Even if logout API fails, clear local state
//       localStorage.removeItem("auth-token")
//       setAuthState({ user: null, loading: false, error: null })
//       toast.success("You have been successfully logged out.")
//     }
//   }

//   return {
//     ...authState,
//     login,
//     adminLogin,
//     register,
//     logout,
//     checkAuth,
//     checkAdminAuth
//   }
// }























"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: string
  profileImage?: string
  token?: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const authToken = localStorage.getItem("auth-token")
      const adminToken = localStorage.getItem("admin-token")
      
      if (!authToken && !adminToken) {
        setAuthState({ user: null, loading: false, error: null })
        return
      }

      const token = adminToken || authToken
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAuthState({ user: data.user, loading: false, error: null })
      } else {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("admin-token")
        setAuthState({ user: null, loading: false, error: null })
      }
    } catch (error) {
      setAuthState({ user: null, loading: false, error: "Failed to check authentication" })
    }
  }

  const login = async (email: string, password: string, role: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        const token = data.user?.token
        if (token) {
          if (role === "admin") {
            localStorage.setItem("admin-token", token)
          } else {
            localStorage.setItem("auth-token", token)
          }
        }

        setAuthState({ user: data.user, loading: false, error: null })
        toast.success(`Welcome back, ${data.user.name}!`)
        return { success: true }
      } else {
        setAuthState({ user: null, loading: false, error: data.message || "Login failed" })
        toast.error(data.message || "Invalid credentials")
        return { success: false, error: data.message || "Login failed" }
      }
    } catch (error) {
      const errorMessage = "Login failed. Please try again."
      setAuthState({ user: null, loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // Remove the separate adminLogin function and use the unified login function
  const register = async (name: string, email: string, password: string, role = "writer") => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()

      if (response.ok) {
        setAuthState({ user: data.user, loading: false, error: null })
        toast.success(`Welcome, ${data.user.name}!`)
        return { success: true }
      } else {
        setAuthState({ user: null, loading: false, error: data.message || "Registration failed" })
        toast.error(data.message || "Registration failed")
        return { success: false, error: data.message || "Registration failed" }
      }
    } catch (error) {
      const errorMessage = "Registration failed. Please try again."
      setAuthState({ user: null, loading: false, error: errorMessage })
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      const authToken = localStorage.getItem("auth-token")
      const adminToken = localStorage.getItem("admin-token")
      
      if (authToken || adminToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken || authToken}`,
          },
        })
      }
      
      localStorage.removeItem("auth-token")
      localStorage.removeItem("admin-token")
      setAuthState({ user: null, loading: false, error: null })
      toast.success("You have been successfully logged out.")
    } catch (error) {
      console.error("Logout error:", error)
      // Even if logout API fails, clear local state
      localStorage.removeItem("auth-token")
      localStorage.removeItem("admin-token")
      setAuthState({ user: null, loading: false, error: null })
      toast.success("You have been successfully logged out.")
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    checkAuth,
  }
}