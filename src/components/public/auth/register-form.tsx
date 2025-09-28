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
// // import { useAuth } from "@/hooks/use-auth"

// export function RegisterForm() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [role, setRole] = useState("writer")
//   // const { register, loading, error } = useAuth()
//   const register=async (name:string,email:string,password:string,role:string)=>{
//     console.log(name,email,password,role,"Data in Register Function...");
//     // Simulate an API call
//     return new Promise<{success:boolean;message?:string}>(resolve => {
//       setTimeout(() => {
//         if (email && password && name) {
//           resolve({ success: true });
//         }
//         else {
//           resolve({ success: false, message: "Invalid data" });
//         }
//       }, 1000);
//     });
//   }

//   const loading=false
//   const error=null
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const result = await register(name, email, password, role)
//     if (result.success) {
//       router.push("/")
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl font-bold text-red-600">Republic Mirror</CardTitle>
//         <CardDescription>Create Writer Account</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Enter your full name"
//             />
//           </div>

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
//               minLength={6}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="role">Role</Label>
//             <Select value={role} onValueChange={setRole}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="writer">Writer</SelectItem>
//                 <SelectItem value="editor">Editor</SelectItem>
//                 <SelectItem value="admin">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
//             {loading ? "Creating account..." : "Create Account"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }




















// "use client"

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { toast } from "sonner";

// export function RegisterForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter(); // Changed from useNavigate to useRouter for Next.js

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ 
//           name, 
//           email, 
//           password, 
//           role: "user" // Hardcoded as "user"
//         }),
//       });

//       const data = await response.json();
//       console.log(data, "Registration response...");

//       if (response.ok) {
//         toast.success("Registration successful! You can now login.");
//         return { success: true };
//       } else {
//         toast.error(data.message || "Registration failed");
//         return { success: false, message: data.message || "Registration failed" };
//       }
//     } catch (error) {
//       console.log(error, "Error in Registration Function...");
//       toast.error("Registration failed. Please try again.");
//       return { success: false, message: "Registration failed. Please try again." };
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     const result = await register(name, email, password);
//     console.log(result, "Registration result...");
    
//     if (result.success) {
//       router.push("/login");
//     } else {
//       setError(result.message || "Registration failed");
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
//       <Card className="w-full max-w-md mx-auto shadow-elegant">
//         <CardHeader className="text-center space-y-3">
//           <CardTitle className="text-3xl font-bold text-primary">Republic Mirror</CardTitle>
//           <CardDescription className="text-base text-muted-foreground">
//             Join Us - Your Voice Matters
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 placeholder="Enter your full name"
//                 className="transition-smooth"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-sm font-medium">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Enter your email"
//                 className="transition-smooth"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-sm font-medium">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="Enter your password (min 6 characters)"
//                 className="transition-smooth"
//                 minLength={6}
//               />
//             </div>

//             <Button 
//               type="submit" 
//               className="w-full bg-primary hover:bg-brand-dark transition-smooth shadow-brand" 
//               disabled={loading}
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </Button>

//             <div className="text-center">
//               <p className="text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => router.push("/login")}
//                   className="text-primary hover:text-brand-dark font-medium transition-smooth"
//                 >
//                   Sign in here
//                 </button>
//               </p>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }








"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/hooks/use-auth";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(name, email, password, "user");

    if (result.success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border border-red-200 rounded-2xl bg-white">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-bold text-red-600">
            Republic Mirror
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Join Us - Your Voice Matters
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="focus:ring-2 focus:ring-red-400 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="focus:ring-2 focus:ring-red-400 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password (min 6 characters)"
                className="focus:ring-2 focus:ring-red-400 rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-red-600 hover:text-red-700 font-medium transition-all duration-300"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
