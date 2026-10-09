import { useFieldArray, Control, Controller, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnitVariant } from "@/lib/supabase";
import { Plus, Trash2 } from "lucide-react";

import { UNIT_VARIANT_TYPES } from "@/config/configurations";

const UNIT_TYPES = UNIT_VARIANT_TYPES;

type UnitVariantsInputProps<T extends FieldValues> = {
  control: Control<T>;
  name?: Path<T>;
};

export function UnitVariantsInput<T extends FieldValues>({
  control,
  name = "unit_variants" as Path<T>,
}: UnitVariantsInputProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as Path<T>,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Unit variants (multiple sizes/prices per type)</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append(
              { type: "1BHK", area: "", price: "", label: "" } as UnitVariant
            )
          }
        >
          <Plus className="h-4 w-4 mr-1" />
          Add variant
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Use this when you have multiple variants per unit type (e.g. 2BHK Type A, Type B). Leave empty to use single area/price fields above.
      </p>
      {fields.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed rounded-md p-4">
          No variants added. Click &quot;Add variant&quot; to add rows, or use the single BHK area/price fields above.
        </p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 items-end p-3 border rounded-md bg-muted/30"
            >
              <div className="md:col-span-2">
                <Label className="text-xs">Type</Label>
                <Controller
                  control={control}
                  name={`${name}.${index}.type` as Path<T>}
                  defaultValue={(field as { type?: string }).type || "1BHK"}
                  render={({ field: f }) => (
                    <Select
                      value={f.value as string}
                      onValueChange={f.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {UNIT_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Label (e.g. Type A)</Label>
                <Input
                  placeholder="Optional"
                  {...control.register(`${name}.${index}.label` as Path<T>)}
                />
              </div>
              <div className="md:col-span-3">
                <Label className="text-xs">Area</Label>
                <Input
                  placeholder="e.g. 800 sq.ft"
                  {...control.register(`${name}.${index}.area` as Path<T>)}
                />
              </div>
              <div className="md:col-span-3">
                <Label className="text-xs">Price</Label>
                <Input
                  placeholder="e.g. ₹80 L"
                  {...control.register(`${name}.${index}.price` as Path<T>)}
                />
              </div>
              <div className="md:col-span-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
