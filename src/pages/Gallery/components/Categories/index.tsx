import { useTranslation } from "react-i18next"
import { Badge } from "../../../../components/Badge"

interface CategorySelectorProps {
  readonly selectedCategory: string
  readonly onSelectCategory: (key: string) => void
}

export default function CategorySelector({
  selectedCategory,
  onSelectCategory,
}: CategorySelectorProps) {
  const { t } = useTranslation()

  const categories = [
    { key: "all", label: t("gallery.categories.all") },
    { key: "Aulas", label: t("gallery.categories.aulas") },
    { key: "Eventos", label: t("gallery.categories.eventos") },
    { key: "Equipamentos", label: t("gallery.categories.equipamentos") },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category.key}
          variant={selectedCategory === category.key ? "default" : "secondary"}
          className={`cursor-pointer px-4 py-2 text-sm ${selectedCategory === category.key
              ? "bg-[#63A6DC] hover:bg-[#4a8bc4]"
              : "hover:bg-gray-200"
            }`}
          onClick={() => onSelectCategory(category.key)}
        >
          {category.label}
        </Badge>
      ))}
    </div>
  )
}
