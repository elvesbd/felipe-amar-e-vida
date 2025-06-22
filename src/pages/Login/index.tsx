import { useState } from "react"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"

import { useAuth } from "../../hooks/useAuth"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { loginSchema, type LoginFormData } from "./validation/login.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (credentials: LoginFormData) => {
    setIsLoading(true)

    try {
      await signIn(credentials)
      window.location.href = "/admin"
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      toast.error('Credenciais inválidas!');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 p-0 h-auto font-normal"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>

        <div className="bg-gray-50 shadow-lg rounded-2xl p-8 border-0">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-full p-4 shadow-md">
                <img src="/logo-oficial.png" alt="Felipe A Maré Vida" className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Área Administrativa</h2>
            <p className="text-gray-600">Faça login para acessar o painel administrativo</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com" {...field}
                        className="bg-white border-0 shadow-sm focus:ring-2 focus:ring-[#63A6DC] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••" {...field}
                          className="bg-white border-0 shadow-sm focus:ring-2 focus:ring-[#63A6DC] focus:border-transparent transition-all duration-200"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#63A6DC] hover:bg-[#4a8bc4] text-white py-3 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

