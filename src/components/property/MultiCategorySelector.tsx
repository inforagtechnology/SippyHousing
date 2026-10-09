import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategoryNames } from "@/config/propertyCategories";

interface MultiCategorySelectorProps<T extends FieldValues> {
  control: Control<T>;
  primaryCategory?: string;
}

export function MultiCategorySelector<T extends FieldValues>({
  control,
  primaryCategory
}: MultiCategorySelectorProps<T>) {
  const categories = getAllCategoryNames();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Category Visibility</CardTitle>
        <CardDescription>
          Select additional categories where this property should be visible. The property will appear in all selected category sections.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Controller
          name={'category_assignments' as Path<T>}
          control={control}
          render={({ field }) => {
            const selectedCategories = (field.value as string[]) || [];

            const handleCategoryToggle = (slug: string) => {
              if (selectedCategories.includes(slug)) {
                field.onChange(selectedCategories.filter((s) => s !== slug));
              } else {
                field.onChange([...selectedCategories, slug]);
              }
            };

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const isPrimary = category.slug === primaryCategory;
                  const isSelected = selectedCategories.includes(category.slug) || isPrimary;

                  return (
                    <div
                      key={category.slug}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg border
                        ${
                          isPrimary
                            ? 'bg-primary/5 border-primary'
                            : isSelected
                            ? 'bg-accent border-accent'
                            : 'border-input'
                        }
                      `}
                    >
                      <Checkbox
                        id={`category-${category.slug}`}
                        checked={isSelected}
                        disabled={isPrimary}
                        onCheckedChange={() => handleCategoryToggle(category.slug)}
                      />
                      <Label
                        htmlFor={`category-${category.slug}`}
                        className="flex-1 cursor-pointer font-normal"
                      >
                        <div>
                          <span className="font-medium">{category.name}</span>
                          {isPrimary && (
                            <span className="ml-2 text-xs text-primary">(Primary)</span>
                          )}
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        <p className="text-sm text-muted-foreground mt-4">
          The primary category is automatically included and cannot be deselected.
        </p>
      </CardContent>
    </Card>
  );
}
