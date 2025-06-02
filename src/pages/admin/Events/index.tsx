"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "../../../components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/Card"


interface EventsProps {
  readonly language: "pt" | "en"
  readonly setLanguage: (lang: "pt" | "en") => void
}

export default function AdminEvents({ language }: EventsProps) {
  const navigate = useNavigate()
  const [events] = useState([
    {
      id: 1,
      title: "Aula Especial de Surfe Adaptado",
      date: "2024-01-15",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Workshop de Conscientização Ambiental",
      date: "2024-01-22",
      status: "upcoming",
    },
  ])

  const content = {
    pt: {
      title: "Gerenciar Eventos",
      backToDashboard: "Voltar ao Dashboard",
      addEvent: "Novo Evento",
      noEvents: "Nenhum evento cadastrado",
      edit: "Editar",
      delete: "Excluir",
    },
    en: {
      title: "Manage Events",
      backToDashboard: "Back to Dashboard",
      addEvent: "New Event",
      noEvents: "No events registered",
      edit: "Edit",
      delete: "Delete",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToDashboard}
              </Button>
              <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
            </div>
            <Button className="bg-[#63A6DC] hover:bg-[#4a8bc4]">
              <Plus className="h-4 w-4 mr-2" />
              {t.addEvent}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">{t.noEvents}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{event.title}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        {t.edit}
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t.delete}
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Data: {event.date}</p>
                  <p className="text-gray-600">Status: {event.status}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
