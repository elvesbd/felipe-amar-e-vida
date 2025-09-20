import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { MapPin, Phone, Mail } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

import { sendMail } from "../../../../lib/api"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import { Textarea } from "../../../../components/TextArea"
import { contactSchema, type ContactFormData } from "./validations/contact-form.validation"


export default function Contact() {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendMail(data)
      toast.success("Mensagem enviada com sucesso!")
      reset()
    } catch (error: any) {
      const apiError = error?.response?.data

      if (apiError?.errors?.length) {
        toast.error(apiError.errors[0].message)
      } else if (apiError?.message) {
        toast.error(apiError.message)
      } else {
        toast.error("Erro ao enviar mensagem. Tente novamente.")
      }
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">


        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="space-y-8 sm:space-y-10">
            <div>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4 p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-100">
                  <MapPin className="h-6 w-6 text-[#63A6DC] mt-1 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                    {t("contact.address")}
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-100">
                  <Phone className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">{t("contact.phone")}</span>
                </div>
                <div className="flex items-center space-x-4 p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-100">
                  <Mail className="h-6 w-6 text-[#63A6DC] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">lgustavim@felipeamarevida.com.br</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 sm:pt-10">
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
                {t("contact.socialTitle")}
              </h4>
              <div className="flex flex-wrap gap-6 sm:gap-8 justify-center sm:justify-start">
                <a
                  href="#"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 hover:opacity-80 transition-all duration-300"
                  title="Facebook"
                >
                  <div className="p-4 sm:p-5 rounded-full bg-white shadow-md group-hover:shadow-lg group-hover:bg-opacity-10 transition-all duration-300 border border-gray-100">
                    <FaFacebook size={24} className="text-[#1877F2] sm:w-7 sm:h-7" />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/felipeamarevida/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 hover:opacity-80 transition-all duration-300"
                  title="Instagram"
                >
                  <div className="p-4 sm:p-5 rounded-full bg-white shadow-md group-hover:shadow-lg group-hover:bg-opacity-10 transition-all duration-300 border border-gray-100">
                    <FaInstagram size={24} className="text-[#E4405F] sm:w-7 sm:h-7" />
                  </div>
                </a>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center space-y-3 hover:opacity-80 transition-all duration-300"
                  title="YouTube"
                >
                  <div className="p-4 sm:p-5 rounded-full bg-white shadow-md group-hover:shadow-lg group-hover:bg-opacity-10 transition-all duration-300 border border-gray-100">
                    <FaYoutube size={24} className="text-[#FF0000] sm:w-7 sm:h-7" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{t("contact.title")}</h3>
              <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                {t("contact.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  {...register("name")}
                  placeholder={t("contact.name")}
                  className="h-12 sm:h-14 text-sm sm:text-base"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>

              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={t("contact.email")}
                  className="h-12 sm:h-14 text-sm sm:text-base"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
              </div>

              <div>
                <Textarea
                  {...register("message")}
                  placeholder={t("contact.message")}
                  rows={5}
                  className="resize-none text-sm sm:text-base"
                />
                {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-14 bg-[#63A6DC] hover:bg-[#4a8bc4] text-white font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}