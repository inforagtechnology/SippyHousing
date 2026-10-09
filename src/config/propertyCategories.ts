import { CategoryField } from './commonFields';
import { BHK_OPTIONS } from './configurations';

export interface CategoryConfig {
  slug: string;
  name: string;
  fields: CategoryField[];
}

export const PROPERTY_CATEGORIES: CategoryConfig[] = [
  {
    slug: 'luxury',
    name: 'Luxury',
    fields: [
      {
        name: 'View',
        key: 'view',
        type: 'text',
        placeholder: 'Enter view details (e.g., Sea View, Garden View)'
      },
      {
        name: 'Size',
        key: 'size',
        type: 'text',
        placeholder: 'Enter size (e.g., 5000 sq.ft)'
      },
      {
        name: 'Configuration Type',
        key: 'configuration_type',
        type: 'select',
        placeholder: 'Select configuration type',
        options: ['Simplex', 'Duplex', 'Triplex', 'Bungalow', 'Penthouse']
      },
      {
        name: 'Price',
        key: 'price',
        type: 'text',
        placeholder: 'Enter price (e.g., ₹15 Cr)'
      },
    ]
  },
 
  {
    slug: 'new-project',
    name: 'New Project',
    fields: [
      {
        name: 'Configuration (BHK / Jodi)',
        key: 'bhk_options',
        type: 'multiselect',
        placeholder: 'Select BHK options',
        options: BHK_OPTIONS,
        allowCustom: true
      },
      {
        name: '1BHK Area',
        key: 'bhk_1_area',
        type: 'text',
        placeholder: 'Enter area in sq.ft for 1BHK'
      },
      {
        name: '1BHK Price',
        key: 'price_1bhk',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹50 L)'
      },
      {
        name: '2BHK Area',
        key: 'bhk_2_area',
        type: 'text',
        placeholder: 'Enter area in sq.ft for 2BHK'
      },
      {
        name: '2BHK Price',
        key: 'price_2bhk',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹80 L)'
      },
      {
        name: '3BHK Area',
        key: 'bhk_3_area',
        type: 'text',
        placeholder: 'Enter area in sq.ft for 3BHK'
      },
      {
        name: '3BHK Price',
        key: 'price_3bhk',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹1.2 Cr)'
      },
      {
        name: '4BHK Area',
        key: 'bhk_4_area',
        type: 'text',
        placeholder: 'Enter area in sq.ft for 4BHK'
      },
      {
        name: '4BHK Price',
        key: 'price_4bhk',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹1.8 Cr)'
      },
      {
        name: '5BHK Area',
        key: 'bhk_5_area',
        type: 'text',
        placeholder: 'Enter area in sq.ft for 5BHK'
      },
      {
        name: '5BHK Price',
        key: 'price_5bhk',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹2.5 Cr)'
      },
      {
        name: 'Storey',
        key: 'storey',
        type: 'text',
        placeholder: 'Enter storey details (e.g. G+20 or number of storeys)'
      },
      {
        name: 'Towers',
        key: 'towers',
        type: 'number',
        placeholder: 'Enter number of towers'
      },
      {
        name: 'Units',
        key: 'units',
        type: 'number',
        placeholder: 'Enter total number of units'
      },
      {
        name: 'Area',
        key: 'area',
        type: 'text',
        placeholder: 'Enter total area'
      },
      {
        name: 'Possession',
        key: 'possession',
        type: 'text',
        placeholder: 'Enter possession details'
      },
      {
        name: 'RERA Number',
        key: 'rera_number',
        type: 'text',
        placeholder: 'Enter RERA registration number (e.g. MahaRERA/A51234)'
      },
      {
        name: 'Penthouse Area',
        key: 'penthouse_area',
        type: 'text',
        placeholder: 'Enter penthouse area in sq.ft'
      },
      {
        name: 'Penthouse Price',
        key: 'price_penthouse',
        type: 'text',
        placeholder: 'Enter price (e.g. ₹3 Cr)'
      },
      {
        name: 'Duplex Area',
        key: 'duplex_area',
        type: 'text',
        placeholder: 'Enter duplex area in sq.ft'
      }
    ]
  },
  {
    slug: 'resale-rental',
    name: 'Resale & Rental',
    fields: [
      {
        name: 'Listing Type',
        key: 'property_type',
        type: 'select',
        placeholder: 'Select listing type',
        options: ['Resale', 'Rental']
      },
      {
        name: 'Price (Resale) / Monthly Rent (Rental)',
        key: 'price',
        type: 'text',
        placeholder: 'Enter sale price (e.g. ₹1.5 Cr) or monthly rent (e.g. ₹50,000)'
      },
      {
        name: 'Configuration (BHK / Jodi)',
        key: 'bhk_options',
        type: 'multiselect',
        placeholder: 'Select BHK options',
        options: BHK_OPTIONS,
        allowCustom: true
      },
      {
        name: 'Area (sq.ft)',
        key: 'area',
        type: 'text',
        placeholder: 'Enter carpet/super area in sq.ft'
      },
      {
        name: 'Furnishing',
        key: 'furnishing_status',
        type: 'select',
        placeholder: 'Select furnishing status',
        options: ['Fully Furnished', 'Semi-Furnished', 'Unfurnished']
      },
      {
        name: 'Possession / Available From',
        key: 'possession',
        type: 'text',
        placeholder: 'e.g. Immediate, Ready to move, or date'
      },
      {
        name: 'Floor',
        key: 'floor_number',
        type: 'text',
        placeholder: 'Enter floor number (e.g. 5, G+3)'
      },
      {
        name: 'Parking',
        key: 'parking',
        type: 'text',
        placeholder: 'e.g. 2 Covered, 1 Open'
      },
      {
        name: 'Bathrooms',
        key: 'bathrooms',
        type: 'number',
        placeholder: 'Number of bathrooms'
      },
      {
        name: 'Age of Property',
        key: 'age_of_property',
        type: 'text',
        placeholder: 'e.g. 5 years (Resale)',
        conditional: {
          field: 'property_type',
          value: 'Resale'
        }
      },
      {
        name: 'Security Deposit',
        key: 'deposit',
        type: 'text',
        placeholder: 'Enter security deposit (Rental)',
        conditional: {
          field: 'property_type',
          value: 'Rental'
        }
      },
      {
        name: 'Lease Duration',
        key: 'tenure',
        type: 'text',
        placeholder: 'e.g. 11 months, 1 year (Rental)',
        unit: 'tenure_unit',
        unitOptions: ['months', 'years'],
        conditional: {
          field: 'property_type',
          value: 'Rental'
        }
      },
      {
        name: 'Maintenance (monthly)',
        key: 'maintenance',
        type: 'text',
        placeholder: 'e.g. ₹5,000/month (Rental)',
        conditional: {
          field: 'property_type',
          value: 'Rental'
        }
      },
      {
        name: 'RERA Number',
        key: 'rera_number',
        type: 'text',
        placeholder: 'Enter RERA number (if applicable)'
      },
      {
        name: 'Contact Number',
        key: 'contact_number',
        type: 'text',
        placeholder: 'Enter contact number'
      }
    ]
  },
  {
    slug: 'plots-lands',
    name: 'Plots & Lands',
    fields: [
      {
        name: 'State',
        key: 'state_country',
        type: 'text',
        placeholder: 'Enter state'
      },
      {
        name: 'Plot Size',
        key: 'plot_size',
        type: 'text',
        placeholder: 'Enter plot size',
        unit: 'plot_size_unit',
        unitOptions: ['sq.ft', 'sq.m', 'sq.yd']
      },
      {
        name: 'Road Width',
        key: 'road_width',
        type: 'text',
        placeholder: 'Enter road width',
        unit: 'road_width_unit',
        unitOptions: ['feet', 'meters']
      },
      {
        name: 'Frontage',
        key: 'frontage',
        type: 'text',
        placeholder: 'Enter frontage (optional but recommended)'
      },
      {
        name: 'Sale Price',
        key: 'sale_price',
        type: 'text',
        placeholder: 'Enter sale price'
      },
      {
        name: 'Sale',
        key: 'is_sale',
        type: 'checkbox'
      },
      {
        name: 'Joint Venture (JV)',
        key: 'is_jv',
        type: 'checkbox'
      },
      {
        name: 'JV Terms – 1',
        key: 'jv_terms_1',
        type: 'textarea',
        placeholder: 'Type JV terms manually (e.g. revenue / area sharing)',
        rows: 3,
        conditional: { field: 'is_jv', value: true }
      },
      {
        name: 'JV Terms – 2',
        key: 'jv_terms_2',
        type: 'textarea',
        placeholder: 'Type additional JV terms manually (e.g. deposit, timelines, approvals)',
        rows: 3,
        conditional: { field: 'is_jv', value: true }
      },
      {
        name: 'Availability Status',
        key: 'availability_status',
        type: 'select',
        placeholder: 'Select availability status',
        options: ['Available', 'On Hold', 'Sold']
      },
      {
        name: 'Zoning - Residential',
        key: 'zoning_residential',
        type: 'checkbox'
      },
      {
        name: 'Zoning - Commercial',
        key: 'zoning_commercial',
        type: 'checkbox'
      }
    ]
  },
  {
    slug: 'redevelopment-jv',
    name: 'Redevelopment and Joint Venture',
    fields: [
      {
        name: 'Society / Property Name',
        key: 'society_property_name',
        type: 'text',
        placeholder: 'Enter society or property name'
      },
      {
        name: 'Plot Size',
        key: 'plot_size',
        type: 'text',
        placeholder: 'Enter plot size'
      },
      {
        name: 'Number of Wings',
        key: 'number_of_wings',
        type: 'number',
        placeholder: 'Enter number of wings'
      },
      {
        name: 'Number of Members',
        key: 'number_of_members',
        type: 'number',
        placeholder: 'Enter number of existing residents'
      },
      {
        name: 'Road Width',
        key: 'road_width',
        type: 'text',
        placeholder: 'Enter road width'
      },
      {
        name: 'Existing Structure Details',
        key: 'existing_structure_details',
        type: 'textarea',
        placeholder: 'Enter existing structure details (optional)',
        rows: 3
      },
      {
        name: 'Total Permissible FSI',
        key: 'total_permissible_fsi',
        type: 'text',
        placeholder: 'Enter total permissible FSI'
      },
      {
        name: 'FSI Consumed',
        key: 'fsi_consumed',
        type: 'text',
        placeholder: 'Enter FSI consumed'
      },
      {
        name: 'Balance FSI',
        key: 'balance_fsi',
        type: 'text',
        placeholder: 'Balance FSI (auto-calculated - optional enhancement)'
      },
      {
        name: 'Corpus Amount',
        key: 'corpus_amount',
        type: 'text',
        placeholder: 'Enter corpus amount',
        unit: 'corpus_amount_type',
        unitOptions: ['per member', 'total']
      },
      {
        name: 'Rent',
        key: 'rent',
        type: 'text',
        placeholder: 'Enter rent'
      },
      {
        name: 'Commercial Terms',
        key: 'commercial_terms',
        type: 'textarea',
        placeholder: 'Enter commercial terms',
        rows: 3
      },
    ]
  },
  {
    slug: 'hotels',
    name: 'Hotels',
    fields: [
      {
        name: 'Society / Property Name',
        key: 'society_property_name',
        type: 'text',
        placeholder: 'Enter society or property name'
      },
      {
        name: 'No of Rooms',
        key: 'no_of_rooms',
        type: 'number',
        placeholder: 'Enter number of rooms'
      },
      {
        name: 'Floors',
        key: 'floors',
        type: 'number',
        placeholder: 'Enter number of floors'
      },
      {
        name: 'Built up Area',
        key: 'built_up_area',
        type: 'text',
        placeholder: 'Enter built up area'
      },
      {
        name: 'Plot Size',
        key: 'plot_size',
        type: 'text',
        placeholder: 'Enter plot size'
      },
      {
        name: 'Transaction Option',
        key: 'transaction_option',
        type: 'select',
        placeholder: 'Select Sale / Rent / Operating Basis / Pre-Leased',
        options: ['Sale', 'Rent', 'Operating Basis', 'Pre-Leased']
      },
      {
        name: 'Sale Price',
        key: 'sale_price',
        type: 'text',
        placeholder: 'Enter sale price',
        conditional: { field: 'transaction_option', value: 'Sale' }
      },
      {
        name: 'Monthly Rent',
        key: 'rent',
        type: 'text',
        placeholder: 'Enter monthly rent',
        conditional: { field: 'transaction_option', value: 'Rent' }
      },
      {
        name: 'Security Deposit',
        key: 'deposit',
        type: 'text',
        placeholder: 'Enter deposit amount',
        conditional: { field: 'transaction_option', values: ['Rent', 'Pre-Leased'] }
      },
      {
        name: 'Tenure',
        key: 'tenure',
        type: 'text',
        placeholder: 'Enter lease tenure',
        unit: 'tenure_unit',
        unitOptions: ['years', 'months'],
        conditional: { field: 'transaction_option', values: ['Rent', 'Operating Basis', 'Pre-Leased'] }
      },
      {
        name: 'Operator / Brand',
        key: 'operator_brand',
        type: 'text',
        placeholder: 'e.g. Bloom, JW Marriott',
        conditional: { field: 'transaction_option', values: ['Operating Basis', 'Pre-Leased'] }
      },
      {
        name: 'Operating Terms',
        key: 'operating_terms',
        type: 'textarea',
        placeholder: 'Operating basis terms (management fee, revenue share, minimum guarantee, etc.)',
        rows: 3,
        conditional: { field: 'transaction_option', value: 'Operating Basis' }
      },
      {
        name: 'Operating Price / Fee',
        key: 'operating_price',
        type: 'text',
        placeholder: 'Enter price / fee for operating basis',
        conditional: { field: 'transaction_option', value: 'Operating Basis' }
      },
      {
        name: 'Sale Price (Pre-Leased)',
        key: 'pre_leased_sale_price',
        type: 'text',
        placeholder: 'Enter sale price (when Pre-Leased)',
        conditional: { field: 'transaction_option', value: 'Pre-Leased' }
      },
      {
        name: 'Rent Price (Pre-Leased)',
        key: 'pre_leased_rent_price',
        type: 'text',
        placeholder: 'Enter existing rent / lease amount (when Pre-Leased)',
        conditional: { field: 'transaction_option', value: 'Pre-Leased' }
      },
      {
        name: 'Monthly Revenue',
        key: 'monthly_revenue',
        type: 'text',
        placeholder: 'Enter monthly revenue (₹)'
      },
      {
        name: 'EBITDA / Yield',
        key: 'ebitda_yield',
        type: 'text',
        placeholder: 'Enter EBITDA / Yield (optional)'
      },
      {
        name: 'Pre-Leased?',
        key: 'is_pre_leased',
        type: 'select',
        placeholder: 'Select pre-leased status',
        options: ['Yes', 'No']
      }
    ]
  },
  {
    slug: 'independent-buildings',
    name: 'Independent Buildings',
    fields: [
      {
        name: 'Society / Property Name',
        key: 'society_property_name',
        type: 'text',
        placeholder: 'Enter society or property name'
      },
      {
        name: 'Usage Type',
        key: 'usage_type_category',
        type: 'select',
        placeholder: 'Select usage type',
        options: ['Residential', 'Commercial']
      },
      {
        name: 'Commercial Type',
        key: 'commercial_type',
        type: 'select',
        placeholder: 'Select commercial type (if Commercial selected)',
        options: ['School', 'College', 'Hospital', 'Retail Office', 'Mall', 'Warehouse', 'Clubs', 'Others'],
        conditional: {
          field: 'usage_type_category',
          value: 'Commercial'
        }
      },
      {
        name: 'Plot Size',
        key: 'plot_size',
        type: 'text',
        placeholder: 'Enter plot size'
      },
      {
        name: 'Constructed Area',
        key: 'constructed_area',
        type: 'text',
        placeholder: 'Enter constructed area'
      },
      {
        name: 'Floors (G + X)',
        key: 'floors_g_x',
        type: 'text',
        placeholder: 'Enter floors (e.g., G+3)'
      },
      {
        name: 'Road Width',
        key: 'road_width',
        type: 'text',
        placeholder: 'Enter road width'
      },
      {
        name: 'Transaction Option',
        key: 'transaction_option',
        type: 'select',
        placeholder: 'Select transaction option',
        options: ['Rent', 'Sale', 'Pre-Leased']
      },
      {
        name: 'Price / Rent',
        key: 'price',
        type: 'text',
        placeholder: 'Enter price or rent',
        conditional: { field: 'transaction_option', values: ['Rent', 'Sale'] }
      },
      {
        name: 'Deposit',
        key: 'deposit',
        type: 'text',
        placeholder: 'Enter deposit amount',
        conditional: { field: 'transaction_option', value: 'Rent' }
      },
      {
        name: 'Tenure',
        key: 'tenure',
        type: 'text',
        placeholder: 'Enter tenure',
        unit: 'tenure_unit',
        unitOptions: ['years', 'months'],
        conditional: { field: 'transaction_option', value: 'Rent' }
      },
      {
        name: 'Escalation',
        key: 'escalation',
        type: 'text',
        placeholder: 'Enter escalation percentage (%)',
        conditional: { field: 'transaction_option', value: 'Rent' }
      },
      {
        name: 'Sale Price (Pre-Leased)',
        key: 'pre_leased_sale_price',
        type: 'text',
        placeholder: 'Enter sale price (when Pre-Leased)',
        conditional: { field: 'transaction_option', value: 'Pre-Leased' }
      },
      {
        name: 'Rent Price (Pre-Leased)',
        key: 'pre_leased_rent_price',
        type: 'text',
        placeholder: 'Enter rent / lease amount (when Pre-Leased)',
        conditional: { field: 'transaction_option', value: 'Pre-Leased' }
      }
    ]
  },
  {
    slug: 'international',
    name: 'International',
    fields: [
      {
        name: 'Society / Property Name',
        key: 'society_property_name',
        type: 'text',
        placeholder: 'Enter society or property name'
      },
      {
        name: 'Road / Street Name',
        key: 'road_street_name',
        type: 'text',
        placeholder: 'Enter road or street name'
      },
      {
        name: 'Property Type',
        key: 'property_type_international',
        type: 'select',
        placeholder: 'Select property type',
        options: ['Residential', 'Commercial']
      },
      {
        name: 'Property Size',
        key: 'property_size',
        type: 'text',
        placeholder: 'Enter property size (sq.ft)'
      },
      {
        name: 'Configuration',
        key: 'configuration_international',
        type: 'select',
        placeholder: 'Select configuration',
        options: ['Studio', '1BHK', '2BHK', '3BHK', '4BHK', 'Villa', 'Office', 'Others']
      },
      {
        name: 'Price',
        key: 'price_international',
        type: 'text',
        placeholder: 'Enter price'
      },
      {
        name: 'Currency',
        key: 'currency',
        type: 'select',
        placeholder: 'Select currency',
        options: ['USD', 'AED', 'GBP', 'EUR', 'Other']
      },
      {
        name: 'Transaction',
        key: 'transaction_type_international',
        type: 'select',
        placeholder: 'Select transaction type',
        options: ['Sale', 'Lease']
      },
      {
        name: 'Furnishing Status',
        key: 'furnishing_status',
        type: 'text',
        placeholder: 'Enter furnishing status (optional)'
      }
    ]
  }
  , //commercial Update
  {
  slug: 'commercial',
  name: 'Commercial',
  fields: [
    {
      name: 'Commercial Type',
      key: 'commercial_type',
      type: 'select',
      placeholder: 'Select commercial type',
      options: [
        'Office',
        'Shop',
        'Showroom',
        'Warehouse',
        'Retail',
        'Industrial'
      ]
    },
    {
      name: 'Area',
      key: 'area',
      type: 'text',
      placeholder: 'Enter area in sq.ft'
    },
    {
      name: 'Listing Type',
      key: 'property_type',
      type: 'select',
      placeholder: 'Select Resale (outright) or Rental',
      options: ['Resale', 'Rental']
    },
    {
      name: 'Price',
      key: 'price',
      type: 'text',
      placeholder: 'Enter property price',
      conditional: { field: 'property_type', value: 'Resale' }
    },
    {
      name: 'Monthly Rent',
      key: 'rent',
      type: 'text',
      placeholder: 'Enter monthly rent',
      conditional: { field: 'property_type', value: 'Rental' }
    },
    {
      name: 'Security Deposit',
      key: 'deposit',
      type: 'text',
      placeholder: 'Enter security deposit',
      conditional: { field: 'property_type', value: 'Rental' }
    },
    {
      name: 'Parking',
      key: 'parking',
      type: 'text',
      placeholder: 'Enter parking details'
    }
  ]
}
];

export const getCategoryBySlug = (slug: string): CategoryConfig | undefined => {
  return PROPERTY_CATEGORIES.find(cat => cat.slug === slug);
};

export const getAllCategorySlugs = (): string[] => {
  return PROPERTY_CATEGORIES.map(cat => cat.slug);
};

export const getAllCategoryNames = (): { slug: string; name: string }[] => {
  return PROPERTY_CATEGORIES.map(cat => ({ slug: cat.slug, name: cat.name }));
};
