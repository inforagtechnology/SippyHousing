import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategoryNames } from "@/config/propertyCategories";
import { Building2, Home, MapPin, Hotel, Globe, Landmark, Building } from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (slug: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  luxury: <Building2 className="h-6 w-6" />,
  'new-project': <Home className="h-6 w-6" />,
  'resale-rental': <Home className="h-6 w-6" />,
  'plots-lands': <MapPin className="h-6 w-6" />,
  'redevelopment-jv': <Landmark className="h-6 w-6" />,
  hotels: <Hotel className="h-6 w-6" />,
  'independent-buildings': <Building className="h-6 w-6" />,
  international: <Globe className="h-6 w-6" />,
  commercial: <Building2 className="h-6 w-6" />
};

export const CategorySelector = ({ selectedCategory, onCategorySelect }: CategorySelectorProps) => {
  const categories = getAllCategoryNames();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Property Category</CardTitle>
        <CardDescription>
          Choose the primary category for this property. You can add it to additional categories later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => onCategorySelect(category.slug)}
              className={`
                p-4 rounded-lg border-2 transition-all text-left
                ${
                  selectedCategory === category.slug
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={selectedCategory === category.slug ? 'text-primary' : 'text-gray-400'}>
                  {categoryIcons[category.slug] || <Building2 className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedCategory === category.slug ? 'Selected' : 'Click to select'}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
