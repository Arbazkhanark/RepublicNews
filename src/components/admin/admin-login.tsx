// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { useAuth } from "@/hooks/use-auth"

// // export function AdminLoginForm() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// // //   const { login, loading, error } = useAuth()

// //   const login=async (email:string,password:string)=>{
// //     console.log(email,password,"Email and Password in Login Function...");
// //     // Simulate an API call
// //     return new Promise<{success:boolean;message?:string}>(resolve => {
// //       setTimeout(() => {
// //         if (email === "admin123@gmail.com" && password === "admin123") {
// //           resolve({ success: true });
// //         }
// //         else {
// //           resolve({ success: false, message: "Invalid email or password" });
// //         }
// //       }, 1000);
// //     });
// //   }
// //   const loading=false
// //   const error=null
// //   const router = useRouter()
// //   console.log(login,"Login in LoginForm...");
// //   console.log(loading,"Loading in LoginForm...");
// //   console.log(error,"Error in LoginForm...");
// //   // console.log(router,"Router in LoginForm...");

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     const result = await login(email, password)
// //     console.log(result,"Result in LoginForm...");
// //     if (result.success) {
// //       // router.push("/admin")
// //       router.push("/admin")
// //     }
// //   }

// //   return (
// //     <Card className="w-full max-w-md mx-auto">
// //       <CardHeader className="text-center">
// //         <CardTitle className="text-2xl font-bold text-red-600">Republic Mirror</CardTitle>
// //         <CardDescription>Admin Login - Reflection of Truth</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {error && (
// //             <Alert variant="destructive">
// //               <AlertDescription>{error}</AlertDescription>
// //             </Alert>
// //           )}

// //           <div className="space-y-2">
// //             <Label htmlFor="email">Email</Label>
// //             <Input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //               placeholder="Enter your email"
// //             />
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="password">Password</Label>
// //             <Input
// //               id="password"
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               placeholder="Enter your password"
// //             />
// //           </div>

// //           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
// //             {loading ? "Signing in..." : "Sign In"}
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   )
// // }













// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export function AdminLoginForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("admin") // Default role
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const router = useRouter()

//   // Simulated login with role
//   const login = async (email: string, password: string, role: string) => {
//     return new Promise<{ success: boolean; role?: string; message?: string }>((resolve) => {
//       setTimeout(() => {
//         // Simulated users
//         const users = [
//           { email: "admin123@gmail.com", password: "admin123", role: "admin" },
//           { email: "editor456@gmail.com", password: "editor456", role: "editor" },
//           { email: "user789@gmail.com", password: "user789", role: "user" },
//         ]

//         const user = users.find(
//           (u) => u.email === email && u.password === password && u.role === role
//         )

//         if (user) {
//           resolve({ success: true, role: user.role })
//         } else {
//           resolve({ success: false, message: "Invalid credentials or role mismatch" })
//         }
//       }, 1000)
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setLoading(true)

//     const result = await login(email, password, role)

//     setLoading(false)

//     if (result.success && result.role === "admin") {
//       router.push("/admin")
//     } else if (result.success) {
//       setError(`Access denied: You are logged in as "${result.role}", not "admin".`)
//     } else {
//       setError(result.message ?? "Login failed")
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold text-red-600">Republic Mirror</CardTitle>
//         <CardDescription>Admin Login - Reflection of Truth</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="role">Select Role</Label>
//             <Select value={role} onValueChange={(value) => setRole(value)}>
//               <SelectTrigger id="role">
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="admin">Admin</SelectItem>
//                 <SelectItem value="editor">Editor</SelectItem>
//                 <SelectItem value="user">User</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
//             {loading ? "Signing in..." : "Sign In"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }


















// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// export function AdminLoginForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("admin")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setLoading(true)

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, role }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         // Store token in localStorage
//         if (data.user?.token) {
//           localStorage.setItem("auth-token", data.user.token)
//         }
        
//         // Show success toast
//         toast.success(`Welcome back, ${data.user.name}!`)
        
//         // Redirect to admin dashboard
//         router.push("/admin")
//       } else {
//         setError(data.message || "Login failed")
//         toast.error(data.message || "Invalid credentials")
//       }
//     } catch (error) {
//       const errorMessage = "An error occurred during login. Please try again."
//       setError(errorMessage)
//       toast.error(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold text-red-600">Republic Mirror</CardTitle>
//         <CardDescription>Admin Login - Reflection of Truth</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="role">Select Role</Label>
//             <Select value={role} onValueChange={(value) => setRole(value)}>
//               <SelectTrigger id="role">
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="admin">Admin</SelectItem>
//                 <SelectItem value="editor">Editor</SelectItem>
//                 <SelectItem value="user">User</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
//             {loading ? "Signing in..." : "Sign In"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

















"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/hooks/use-auth"


export function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("admin")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
//   const { adminLogin } = useAuth()
    const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await login(email, password, role)

      if (result.success) {
        toast.success(`Welcome back, ${email}!`)
        router.push("/admin")
      } else {
        setError(result.error || "Login failed")
        toast.error(result.error || "Invalid credentials")
      }
    } catch (err) {
      const errorMessage = "An error occurred during login. Please try again."
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-red-600">Republic Mirror</CardTitle>
        <CardDescription>Admin Login - Reflection of Truth</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
