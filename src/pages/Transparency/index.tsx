import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Eye, FileX } from "lucide-react"

import Header from "../../components/Header"
import { Card } from "../../components/Card"
import Footer from "../Home/components/Footer"
import { Button } from "../../components/Button"

export default function TransparencyPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 text-[#63A6DC] hover:text-[#4a8bc4]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("eventsPage.backToHome")}
            </Button>
          </div>

          {/* Main Content */}
          <main className="container mx-auto px-2 sm:px-4 lg:px-6 py-8 sm:py-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12 text-justify">
                {t("transparencyPage.description")}
              </p>

              <div className="grid gap-4 sm:gap-6">
                {/* Empty State Card */}
                <Card className="p-6 sm:p-8 lg:p-10 text-center border-2 border-dashed border-gray-200 bg-gray-50/50">
                  <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 sm:mb-8">
                    <FileX className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                    {t("transparencyPage.noAmendments")}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-justify">
                    {t("transparencyPage.noAmendmentsDescription")}
                  </p>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{t("transparencyPage.followUpdates")}</span>
                  </div>
                </Card>

                {/* Info Cards */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <Card className="p-3 sm:p-4 bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">
                      📋 {t("transparencyPage.whatAreAmendments")}
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-700 text-justify">
                      {t("transparencyPage.amendmentsDescription")}
                    </p>
                  </Card>

                  <Card className="p-3 sm:p-4 bg-green-50 border-green-200">
                    <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">
                      ✅ {t("transparencyPage.ourCommitment")}
                    </h4>
                    <p className="text-xs sm:text-sm text-green-700 text-justify">
                      {t("transparencyPage.commitmentDescription")}
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
