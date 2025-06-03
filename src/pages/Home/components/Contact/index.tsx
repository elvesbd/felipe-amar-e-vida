import { useTranslation } from "react-i18next"
import { MapPin, Phone, Mail } from "lucide-react"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import { Textarea } from "../../../../components/TextArea"

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-[#63A6DC] mt-1 flex-shrink-0" />
                <span className="text-gray-600 leading-relaxed">{t("contact.address")}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                <span className="text-gray-600">{t("contact.phone")}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                <span className="text-gray-600">lgustavim@felipeamarevida.com.br</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{t("contact.socialTitle")}</h3>
              <div className="flex space-x-6">
                <a href="#" className="hover:opacity-80 transition-opacity" title="Facebook">
                  <FaFacebook size={36} className="text-[#1877F2]" />
                </a>
                <a
                  href="https://www.instagram.com/felipeamarevida/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="Instagram"
                >
                  <FaInstagram size={36} className="text-[#E4405F]" />
                </a>

                <a href="#" className="hover:opacity-80 transition-opacity" title="YouTube">
                  <FaYoutube size={36} className="text-[#FF0000]" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("contact.title")}</h3>
              <p className="text-gray-600">{t("contact.subtitle")}</p>
            </div>
            <div className="space-y-4">
              <Input placeholder={t("contact.name")} />
              <Input type="email" placeholder={t("contact.email")} />
              <Textarea placeholder={t("contact.message")} rows={4} />
              <Button className="w-full bg-[#63A6DC] hover:bg-[#4a8bc4] text-white">{t("contact.send")}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}