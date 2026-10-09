# Project Plan: Category-Based Property Listing System

## Overview
Implement a comprehensive admin panel property listing system with dynamic forms based on property categories. Each category will have unique fields while sharing common fields at the start. Properties can be assigned to multiple categories via checkboxes.

## Project Goals
1. Implement category selection before property creation
2. Create dynamic forms that change based on selected category
3. Remove all required field indicators (*)
4. Support 7 property categories with unique field sets
5. Enable multi-category assignment via checkboxes
6. Maintain backward compatibility with existing properties

---

## Phase 1: Database Schema Design

### 1.1 Update Properties Table
**File**: New SQL migration file or update existing schema

**Changes Required**:
- Add new columns to support all category-specific fields
- Make all fields optional (nullable) to support "no required fields" requirement
- Add JSONB column for flexible category-specific data storage
- Add array column for multiple category assignments

**New Columns to Add**:
```sql
-- Common fields (already exist but may need updates)
header text,
description text,
sub_location text,
city text,
country text,

-- Category-specific fields (all optional)
-- Luxury
view text,
size text,
configuration_type text, -- Simplex, Duplex, Triplex, Bungalow
price text,
is_plot_or_villa boolean,

-- New Project
bhk_options text[], -- Array of selected BHKs
bhk_1_area text,
bhk_2_area text,
bhk_3_area text,
bhk_4_area text,
bhk_5_area text,
towers integer,
units integer,
area text,
possession text,

-- Plots & Lands
state_country text,
plot_size text,
plot_size_unit text, -- sq.ft / sq.m / sq.yd
road_width text,
road_width_unit text, -- feet / meters
frontage text,
sale_price text,
is_sale boolean,
is_jv boolean,
availability_status text, -- Available / On Hold / Sold
zoning_residential boolean,
zoning_commercial boolean,

-- Redevelopment and Joint Venture
society_property_name text,
number_of_wings integer,
number_of_members integer,
existing_structure_details text,
total_permissible_fsi text,
fsi_consumed text,
balance_fsi text,
corpus_amount text,
corpus_amount_type text, -- per member / total
rent text,
rent_tenure text,
extra_amenities text,
stage text, -- Under Discussion / LOI Given / Agreement / Closed

-- Hotels
no_of_rooms integer,
floors integer,
built_up_area text,
monthly_revenue text,
ebitda_yield text,
is_pre_leased boolean,

-- Independent Buildings
usage_type_category text, -- Residential / Commercial
commercial_type text, -- School, College, Hospital, Retail Office, Mall, Warehouse, Clubs, Others
constructed_area text,
floors_g_x text,
transaction_option text, -- Rent / Sale / Pre-Leased
deposit text,
tenure text,
tenure_unit text, -- years / months
escalation text,

-- International
road_street_name text,
property_type_international text, -- Residential / Commercial
property_size text,
configuration_international text, -- Studio / 1BHK / 2BHK / Villa / Office etc.
price_international text,
currency text, -- USD / AED / GBP / EUR etc.
transaction_type_international text, -- Sale / Lease
furnishing_status text,

-- Multi-category assignment
category_assignments text[], -- Array of category slugs

-- Video links
video_links text[], -- Array of video URLs

-- Flexible storage for future fields
category_data jsonb
```

### 1.2 Create Category Configuration Table (Optional)
**Purpose**: Store category definitions and field configurations dynamically

```sql
CREATE TABLE property_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  field_config jsonb NOT NULL, -- Field definitions for this category
  created_at timestamp with time zone DEFAULT now()
);
```

### 1.3 Migration Strategy
- Create migration script to add new columns
- Set default values for existing records
- Ensure backward compatibility

---

## Phase 2: Type Definitions & Configuration

### 2.1 Update Property Interface
**File**: `src/lib/supabase.ts`

**Tasks**:
- Extend Property interface with all new fields
- Make all fields optional (except id and created_at)
- Add category assignment types

### 2.2 Create Category Configuration
**File**: `src/config/propertyCategories.ts` (NEW)

**Purpose**: Centralized configuration for all categories and their fields

**Structure**:
```typescript
export interface CategoryField {
  name: string;
  key: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'checkbox' | 'textarea' | 'date' | 'array';
  options?: string[];
  placeholder?: string;
  unit?: string;
  unitOptions?: string[];
  conditional?: {
    field: string;
    value: any;
  };
}

export interface CategoryConfig {
  slug: string;
  name: string;
  fields: CategoryField[];
}

export const PROPERTY_CATEGORIES: CategoryConfig[] = [
  // Luxury, New Project, Plots & Lands, etc.
];
```

### 2.3 Common Fields Configuration
**File**: `src/config/commonFields.ts` (NEW)

**Purpose**: Define common fields shared across all categories

```typescript
export const COMMON_FIELDS: CategoryField[] = [
  { name: 'Header', key: 'header', type: 'text' },
  { name: 'Description', key: 'description', type: 'textarea' },
  { name: 'Location', key: 'location', type: 'text' },
  { name: 'Sub-Location', key: 'sub_location', type: 'text' },
  { name: 'City', key: 'city', type: 'text' },
  { name: 'Country', key: 'country', type: 'text' },
];
```

---

## Phase 3: Dynamic Form Components

### 3.1 Category Selection Component
**File**: `src/components/property/CategorySelector.tsx` (NEW)

**Features**:
- Display all available categories
- Allow admin to select primary category
- Show category description/icon
- Store selected category in state

### 3.2 Dynamic Form Field Renderer
**File**: `src/components/property/DynamicFormField.tsx` (NEW)

**Features**:
- Render fields based on type (text, select, checkbox, etc.)
- Handle conditional field display
- Support unit selectors (sq.ft/sq.m/sq.yd)
- No required field indicators
- Proper validation (optional but helpful)

### 3.3 Category-Specific Form Sections
**File**: `src/components/property/categoryForms/` (NEW DIRECTORY)

**Files**:
- `LuxuryForm.tsx`
- `NewProjectForm.tsx`
- `PlotsLandsForm.tsx`
- `RedevelopmentJVForm.tsx`
- `HotelsForm.tsx`
- `IndependentBuildingsForm.tsx`
- `InternationalForm.tsx`

**Purpose**: Category-specific form logic and field rendering

### 3.4 Multi-Category Checkbox Component
**File**: `src/components/property/MultiCategorySelector.tsx` (NEW)

**Features**:
- Display all categories as checkboxes
- Allow selection of multiple categories
- Show selected categories
- Store in `category_assignments` array

### 3.5 Video Links Component
**File**: `src/components/property/VideoLinksInput.tsx` (NEW)

**Features**:
- Add/remove multiple video URLs
- Validate URL format
- Display list of added videos

---

## Phase 4: Update AddProperty Page

### 4.1 Refactor AddProperty Component
**File**: `src/pages/AddProperty.tsx`

**Changes**:
1. **Step 1**: Category Selection
   - Show category selector first
   - Hide form until category selected
   - Store selected category

2. **Step 2**: Dynamic Form
   - Render common fields
   - Render category-specific fields based on selection
   - Use DynamicFormField component
   - Remove all required field indicators (*)

3. **Step 3**: Multi-Category Assignment
   - Show checkbox list at the end
   - Include all categories
   - Allow multiple selections

4. **Step 4**: Media Upload
   - Image upload (existing)
   - Video links input (new)

5. **Form Validation**:
   - Update Zod schema to make all fields optional
   - Remove `.min()` requirements
   - Keep basic format validation (email, URL, etc.)

### 4.2 Form State Management
- Use React Hook Form with dynamic schema
- Handle conditional field visibility
- Manage array fields (BHK options, video links, etc.)
- Store category assignments

---

## Phase 5: Update EditProperty Page

### 5.1 Refactor EditProperty Component
**File**: `src/pages/EditProperty.tsx`

**Changes**:
- Similar structure to AddProperty
- Pre-populate form with existing data
- Allow category change (with warning if data loss)
- Handle migration of old property format to new format

### 5.2 Data Migration Logic
- Detect old property format
- Map old fields to new structure
- Preserve existing data
- Show migration notice to admin

---

## Phase 6: Service Layer Updates

### 6.1 Update Property Service
**File**: `src/services/propertyService.ts`

**Changes**:
- Update `addProperty` to handle new field structure
- Update `updateProperty` to handle category-specific updates
- Add method to get properties by category assignment
- Add method to get category configurations
- Handle video links storage
- Handle category assignments array

### 6.2 New Service Methods
```typescript
// Get properties by category
async getPropertiesByCategory(categorySlug: string): Promise<Property[]>

// Get properties with multiple category assignments
async getPropertiesByCategories(categorySlugs: string[]): Promise<Property[]>

// Get category configuration
async getCategoryConfig(categorySlug: string): Promise<CategoryConfig>
```

---

## Phase 7: Database Migration Script

### 7.1 Create Migration File
**File**: `migrations/add_category_based_fields.sql` (NEW)

**Tasks**:
- Add all new columns to properties table
- Set appropriate data types
- Add indexes for performance
- Create migration for existing data
- Add constraints if needed

### 7.2 Data Migration
- Map existing properties to new structure
- Set default category assignments
- Preserve all existing data
- Test migration on staging first

---

## Phase 8: Frontend Display Updates

### 8.1 Update Property Display Components
**Files**: 
- `src/components/sections/LuxuryHomes.tsx`
- `src/components/sections/Apartments.tsx`
- `src/components/sections/ResaleRent.tsx`
- `src/pages/PropertyDetails.tsx`

**Changes**:
- Filter properties by category assignments
- Display category-specific fields
- Show video links if available
- Handle multiple category display

### 8.2 Category Filtering
- Update property listing pages to filter by category
- Support multi-category filtering
- Update search functionality

---

## Phase 9: Testing & Validation

### 9.1 Unit Tests
**Files**: `src/__tests__/` (NEW)

**Test Cases**:
- Category selection logic
- Dynamic form field rendering
- Form validation (all optional)
- Multi-category assignment
- Data submission and retrieval

### 9.2 Integration Tests
- End-to-end property creation flow
- Category switching
- Data persistence
- Image/video upload

### 9.3 Manual Testing Checklist
- [ ] All 7 categories can be selected
- [ ] Forms render correctly for each category
- [ ] No required field indicators shown
- [ ] Multi-category assignment works
- [ ] Video links can be added/removed
- [ ] Images upload correctly
- [ ] Properties save to database
- [ ] Properties display correctly on frontend
- [ ] Edit functionality works
- [ ] Backward compatibility maintained

---

## Phase 10: Documentation & Cleanup

### 10.1 Update Documentation
**Files**:
- `README.md` - Update with new category system
- `SUPABASE_SETUP.md` - Update schema documentation
- Create `CATEGORY_SYSTEM.md` - New documentation

### 10.2 Code Cleanup
- Remove old category logic
- Clean up unused imports
- Update type definitions
- Remove hardcoded category lists

---

## Implementation Timeline

### Week 1: Foundation
- **Days 1-2**: Database schema design and migration script
- **Days 3-4**: Type definitions and category configuration
- **Day 5**: Common fields and base components

### Week 2: Dynamic Forms
- **Days 1-2**: Category selector and dynamic field renderer
- **Days 3-4**: Category-specific form components (Luxury, New Project)
- **Day 5**: Remaining category forms (Plots, Redevelopment, Hotels, Independent, International)

### Week 3: Integration
- **Days 1-2**: Update AddProperty page with new flow
- **Days 3-4**: Update EditProperty page
- **Day 5**: Service layer updates and testing

### Week 4: Polish & Testing
- **Days 1-2**: Frontend display updates
- **Days 3-4**: Testing and bug fixes
- **Day 5**: Documentation and deployment

---

## Technical Considerations

### 1. Backward Compatibility
- Existing properties should still work
- Migration script to convert old format
- Fallback logic for missing fields

### 2. Performance
- Index category_assignments array column
- Optimize queries for multi-category filtering
- Lazy load category-specific forms

### 3. User Experience
- Clear category selection UI
- Progressive form disclosure
- Save draft functionality (future enhancement)
- Form validation feedback (optional but helpful)

### 4. Data Integrity
- Validate category assignments
- Ensure at least one category selected
- Validate field formats (URLs, numbers, etc.)

### 5. Scalability
- JSONB column for future flexibility
- Category configuration can be database-driven
- Easy to add new categories

---

## Risk Mitigation

### Risk 1: Data Loss During Migration
**Mitigation**: 
- Create backup before migration
- Test migration on staging
- Rollback plan ready

### Risk 2: Breaking Existing Functionality
**Mitigation**:
- Maintain backward compatibility
- Gradual rollout
- Feature flag for new system

### Risk 3: Complex Form Logic
**Mitigation**:
- Modular component structure
- Clear separation of concerns
- Comprehensive testing

### Risk 4: Performance Issues
**Mitigation**:
- Database indexing
- Query optimization
- Lazy loading where possible

---

## Success Criteria

1. ✅ Admin can select category before adding property
2. ✅ Forms dynamically change based on category
3. ✅ No required field indicators (*) shown
4. ✅ All 7 categories have correct fields
5. ✅ Multi-category assignment works
6. ✅ Properties save and retrieve correctly
7. ✅ Frontend displays properties by category
8. ✅ Existing properties still work
9. ✅ Video links functionality works
10. ✅ Image upload still works

---

## Future Enhancements (Out of Scope)

1. Form templates/saved drafts
2. Bulk category assignment
3. Category-based analytics
4. Dynamic category creation (admin UI)
5. Form field customization per category
6. Advanced search with category filters
7. Category-based pricing rules
8. Export/import by category

---

## Notes

- All fields are optional as per requirements
- Category selection is the first step
- Multi-category assignment allows properties in multiple sections
- Video links support multiple URLs
- Image upload remains unchanged
- Backward compatibility is critical
