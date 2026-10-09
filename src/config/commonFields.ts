export type FieldType = 
  | 'text' 
  | 'number' 
  | 'select' 
  | 'multiselect' 
  | 'checkbox' 
  | 'textarea' 
  | 'date' 
  | 'array'
  | 'url';

export interface CategoryField {
  name: string;
  key: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  unit?: string;
  unitOptions?: string[];
  conditional?: {
    field: string;
    value?: any;
    /** When set, show when watched value is in this array (e.g. ['Rent', 'Sale']) */
    values?: string[];
  };
  rows?: number; // For textarea
  /** multiselect only: lets the admin type & add a configuration that is not in the list (e.g. "Jodi", "10BHK") */
  allowCustom?: boolean;
  /** Set false to hide the per-field "+ Remark" box (default: every field gets one) */
  remark?: boolean;
}

export const COMMON_FIELDS: CategoryField[] = [
  {
    name: 'Header',
    key: 'header',
    type: 'text',
    placeholder: 'Enter property header/title'
  },
  {
    name: 'Description',
    key: 'description',
    type: 'textarea',
    placeholder: 'Enter property description',
    rows: 4
  },
  {
    name: 'Location',
    key: 'location',
    type: 'text',
    placeholder: 'Enter location'
  },
  {
    name: 'Sub-Location',
    key: 'sub_location',
    type: 'text',
    placeholder: 'Enter sub-location'
  },
  {
    name: 'City',
    key: 'city',
    type: 'text',
    placeholder: 'Enter city'
  },
  {
    name: 'Country',
    key: 'country',
    type: 'text',
    placeholder: 'Enter country'
  },
  {
  key: 'property_code',
  name: 'Property Code',
  type: 'text',
  placeholder: 'LUX-001'
},
{
  key: 'real_property_name',
  name: 'Real Property Name',
  type: 'text',
  placeholder: 'Burj Khalifa'
},
{
  key: 'remarks',
  name: 'Remarks / Additional Details',
  type: 'textarea',
  placeholder: 'Any extra details for this property (internal notes or points to highlight)',
  rows: 3,
  remark: false
},
{
  key: 'deal_highlight',
  name: 'Homepage Deal Banner',
  type: 'select',
  placeholder: 'Flash on homepage banner?',
  options: ['None', 'Deal of the Month', 'Deal of the Year'],
  remark: false
},
{
  key: 'lead_numbers',
  name: 'Lead Numbers (optional)',
  type: 'text',
  placeholder: 'Comma separated, e.g. 9820053962, 7777030607 – leads for this property go to all of them',
  remark: false
}
];

/** Common fields in the order shown for a given category (International shows Country first). */
export const getCommonFieldsForCategory = (slug?: string): CategoryField[] => {
  if (slug === 'international') {
    const country = COMMON_FIELDS.find(f => f.key === 'country');
    const rest = COMMON_FIELDS.filter(f => f.key !== 'country');
    return country ? [country, ...rest] : COMMON_FIELDS;
  }
  return COMMON_FIELDS;
};
