import { Control, Controller, FieldValues, Path, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoryField } from "@/config/commonFields";
import { X, MessageSquarePlus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getPriceInWords } from "@/lib/utils";

interface DynamicFormFieldProps<T extends FieldValues> {
  field: CategoryField;
  control: Control<T>;
  value?: string | number | undefined;
}

/**
 * Small "+ Remark" box shown under every field so extra details can be typed
 * for ANY field. Stored in `field_remarks.<fieldKey>`.
 */
function FieldRemark<T extends FieldValues>({ field, control }: { field: CategoryField; control: Control<T> }) {
  const remarkName = `field_remarks.${field.key}` as Path<T>;
  const existing = useWatch({ control, name: remarkName }) as string | undefined;
  const [open, setOpen] = useState(false);
  const visible = open || !!existing;

  if (field.remark === false || field.type === 'checkbox') return null;

  return (
    <div className="mt-1">
      {!visible ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
        >
          <MessageSquarePlus className="h-3 w-3" /> Add remark
        </button>
      ) : (
        <Controller
          name={remarkName}
          control={control}
          render={({ field: c }) => (
            <Input
              {...c}
              value={(c.value as string) || ''}
              placeholder={`Remark for ${field.name} (optional)`}
              className="h-8 text-xs"
            />
          )}
        />
      )}
    </div>
  );
}

export function DynamicFormField<T extends FieldValues>(props: DynamicFormFieldProps<T>) {
  const { field, control } = props;
  const hasUnit = !!(field.unit && field.unitOptions && field.type === 'text');
  const body = hasUnit ? <FieldWithUnit field={field} control={control} /> : <DynamicFormFieldBody {...props} />;
  // The body returns null for hidden conditional fields; the wrapper must too.
  const conditionalFieldName = (field.conditional?.field ?? field.key) as Path<T>;
  const conditionalValue = useWatch({ control, name: conditionalFieldName });
  if (field.conditional) {
    const { value: condValue, values: condValues } = field.conditional;
    const showWhenValues = condValues && Array.isArray(condValues) && condValues.includes(conditionalValue);
    const showWhenValue = condValue !== undefined && conditionalValue === condValue;
    if (!showWhenValues && !showWhenValue) return null;
  }
  return (
    <div>
      {body}
      <FieldRemark field={field} control={control} />
    </div>
  );
}

function DynamicFormFieldBody<T extends FieldValues>({
  field,
  control,
  value
}: DynamicFormFieldProps<T>) {
  const fieldName = field.key as Path<T>;
  const isPriceField = ['price', 'price_range', 'sale_price', 'price_international', 'pre_leased_sale_price', 'pre_leased_rent_price', 'rent', 'operating_price'].includes(field.key);
  const watchedValue = useWatch({ control, name: fieldName });
  const priceInWords = isPriceField ? getPriceInWords(watchedValue) : '';

  // Handle conditional fields (call useWatch unconditionally)
  const conditionalFieldName = (field.conditional?.field ?? fieldName) as Path<T>;
  const conditionalValue = useWatch({ control, name: conditionalFieldName });
//
//
  if (field.conditional) {
    const { value: condValue, values: condValues } = field.conditional;
    const showWhenValues = condValues && Array.isArray(condValues) && condValues.includes(conditionalValue);
    const showWhenValue = condValue !== undefined && conditionalValue === condValue;
    if (!showWhenValues && !showWhenValue) return null;
  }

  switch (field.type) {
    case 'text':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <>
                <Input
                  id={field.key}
                  {...controllerField}
                  placeholder={field.placeholder}
                  value={controllerField.value || ''}
                />
                {priceInWords && <p className="text-sm text-gray-600 mt-1">In words: {priceInWords}</p>}
              </>
            )}
          />
        </div>
      );

    case 'number':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                id={field.key}
                type="number"
                {...controllerField}
                placeholder={field.placeholder}
                value={controllerField.value || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  controllerField.onChange(val === '' ? undefined : Number(val));
                }}
              />
            )}
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Textarea
                id={field.key}
                {...controllerField}
                placeholder={field.placeholder}
                rows={field.rows || 4}
                value={controllerField.value || ''}
              />
            )}
          />
        </div>
      );

    case 'select':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                value={controllerField.value || ''}
                onValueChange={controllerField.onChange}
              >
                <SelectTrigger id={field.key}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      );

    case 'multiselect':
      return (
        <div className="space-y-2">
          <Label>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => {
              const selectedValues = (controllerField.value as string[]) || [];
              
              return (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((option) => {
                      const isSelected = selectedValues.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              controllerField.onChange(
                                selectedValues.filter((v) => v !== option)
                              );
                            } else {
                              controllerField.onChange([...selectedValues, option]);
                            }
                          }}
                          className={`
                            px-3 py-1.5 rounded-md text-sm border transition-colors
                            ${
                              isSelected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background border-input hover:bg-accent'
                            }
                          `}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {/* Selected values that are not in the standard list (custom additions) */}
                  {selectedValues.filter(v => !(field.options || []).includes(v)).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedValues.filter(v => !(field.options || []).includes(v)).map(v => (
                        <span key={v} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm bg-primary text-primary-foreground">
                          {v}
                          <button type="button" onClick={() => controllerField.onChange(selectedValues.filter(x => x !== v))}>
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {field.allowCustom && (
                    <CustomOptionAdder
                      onAdd={(v) => {
                        if (!selectedValues.includes(v)) controllerField.onChange([...selectedValues, v]);
                      }}
                    />
                  )}
                  {selectedValues.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedValues.join(', ')}
                    </p>
                  )}
                </div>
              );
            }}
          />
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Checkbox
                id={field.key}
                checked={controllerField.value || false}
                onCheckedChange={controllerField.onChange}
              />
            )}
          />
          <Label htmlFor={field.key} className="font-normal cursor-pointer">
            {field.name}
          </Label>
        </div>
      );

    case 'url':
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                id={field.key}
                type="url"
                {...controllerField}
                placeholder={field.placeholder || 'https://...'}
                value={controllerField.value || ''}
              />
            )}
          />
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <Label htmlFor={field.key}>{field.name}</Label>
          <Input
            id={field.key}
            placeholder={field.placeholder}
            value={value || ''}
            readOnly
          />
        </div>
      );
  }
}

/** Input to add a configuration that isn't in the list (e.g. "Jodi", "10BHK"). */
function CustomOptionAdder({ onAdd }: { onAdd: (value: string) => void }) {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (!v || /^0+\s*(bhk)?$/i.test(v)) return; // never allow "0 BHK"
    onAdd(v);
    setText('');
  };
  return (
    <div className="flex gap-2 max-w-sm">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        placeholder="Add other configuration (e.g. Jodi, 12BHK)"
        className="h-9"
      />
      <Button type="button" variant="outline" size="sm" onClick={add} disabled={!text.trim()}>
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  );
}

// Component for fields with unit selectors
interface FieldWithUnitProps<T extends FieldValues> {
  field: CategoryField;
  control: Control<T>;
}

export function FieldWithUnit<T extends FieldValues>({
  field,
  control
}: FieldWithUnitProps<T>) {
  const fieldName = field.key as Path<T>;
  const unitFieldName = (field.unit || '') as Path<T>;

  if (!field.unit || !field.unitOptions) {
    return <DynamicFormFieldBody field={field} control={control} />;
  }

  return (
    <div className="space-y-2">
      <Label>{field.name}</Label>
      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            name={fieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                {...controllerField}
                placeholder={field.placeholder}
                value={controllerField.value || ''}
              />
            )}
          />
        </div>
        <div className="w-32">
          <Controller
            name={unitFieldName}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                value={controllerField.value || ''}
                onValueChange={controllerField.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  {field.unitOptions.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}
