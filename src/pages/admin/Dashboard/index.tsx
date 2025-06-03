import { useNavigate } from "react-router-dom"
import { Calendar, ImageIcon, Users, LogOut, ArrowRight } from "lucide-react"

import { Button } from "../../../components/Button"
import { useAuth } from "../../../contexts/AuthContext"

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
      <header className="bg-white shadow-sm border-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo-footer.png" alt="Felipe A Maré Vida" className="h-12 w-12" />

              <div>
                <h1 className="text-md font-bold text-gray-900">Painel Administrativo</h1>
                <p className="text-gray-600">Bem-vindo, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200"
              >
                Voltar ao Site
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/admin/events")}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shadow-md">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#63A6DC] group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gerenciar Eventos</h3>
              <p className="text-gray-600 text-sm mb-4">Criar, editar e excluir eventos do projeto</p>
              <div className="bg-blue-50 rounded-lg px-3 py-2">
                <span className="text-blue-700 text-xs font-medium">Eventos Ativos</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate("/admin/gallery")}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 shadow-md">
                  <ImageIcon className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#63A6DC] group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gerenciar Galeria</h3>
              <p className="text-gray-600 text-sm mb-4">Upload e organização de fotos do projeto</p>
              <div className="bg-green-50 rounded-lg px-3 py-2">
                <span className="text-green-700 text-xs font-medium">Fotos Disponíveis</span>
              </div>
            </div>
          </button>

          <div className="bg-white rounded-2xl shadow-lg border-0 overflow-hidden opacity-60 cursor-not-allowed">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl p-3 shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Usuários</h3>
              <p className="text-gray-500 text-sm mb-4">Gerenciar usuários do sistema</p>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <span className="text-gray-600 text-xs font-medium">Em Breve</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
