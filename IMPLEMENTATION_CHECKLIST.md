# Implementation Checklist: Category-Based Property System

## Quick Reference Checklist

### Phase 1: Database ✅
- [ ] Create migration script for new columns
- [ ] Add all category-specific fields to properties table
- [ ] Make all fields nullable (optional)
- [ ] Add `category_assignments` array column
- [ ] Add `video_links` array column
- [ ] Add indexes for performance
- [ ] Test migration on staging
- [ ] Run migration on production

### Phase 2: Type Definitions ✅
- [ ] Update `Property` interface in `src/lib/supabase.ts`
- [ ] Create `src/config/propertyCategories.ts`
- [ ] Create `src/config/commonFields.ts`
- [ ] Define all 7 category configurations
- [ ] Export category types

### Phase 3: Components ✅
- [ ] Create `CategorySelector.tsx`
- [ ] Create `DynamicFormField.tsx`
- [ ] Create `MultiCategorySelector.tsx`
- [ ] Create `VideoLinksInput.tsx`
- [ ] Create `LuxuryForm.tsx`
- [ ] Create `NewProjectForm.tsx`
- [ ] Create `PlotsLandsForm.tsx`
- [ ] Create `RedevelopmentJVForm.tsx`
- [ ] Create `HotelsForm.tsx`
- [ ] Create `IndependentBuildingsForm.tsx`
- [ ] Create `InternationalForm.tsx`

### Phase 4: AddProperty Page ✅
- [ ] Add category selection step
- [ ] Remove all required field indicators (*)
- [ ] Implement dynamic form rendering
- [ ] Add common fields section
- [ ] Add category-specific fields
- [ ] Add multi-category checkbox section
- [ ] Add video links input
- [ ] Update form validation (all optional)
- [ ] Update submit handler
- [ ] Test all 7 categories

### Phase 5: EditProperty Page ✅
- [ ] Update to use new category system
- [ ] Add category change functionality
- [ ] Handle data migration from old format
- [ ] Pre-populate all new fields
- [ ] Test edit flow

### Phase 6: Service Layer ✅
- [ ] Update `addProperty` method
- [ ] Update `updateProperty` method
- [ ] Add `getPropertiesByCategory` method
- [ ] Add `getPropertiesByCategories` method
- [ ] Handle video links storage
- [ ] Handle category assignments

### Phase 7: Frontend Display ✅
- [ ] Update `LuxuryHomes.tsx` to filter by category
- [ ] Update `Apartments.tsx` to filter by category
- [ ] Update `ResaleRent.tsx` to filter by category
- [ ] Update `PropertyDetails.tsx` to show category fields
- [ ] Update search functionality
- [ ] Display video links on property pages

### Phase 8: Testing ✅
- [ ] Test category selection
- [ ] Test each category form
- [ ] Test multi-category assignment
- [ ] Test video links
- [ ] Test image upload
- [ ] Test property creation
- [ ] Test property editing
- [ ] Test property display
- [ ] Test backward compatibility
- [ ] Test data migration

---

## Category Field Checklist

### Common Fields (All Categories)
- [ ] Header
- [ ] Description
- [ ] Location
- [ ] Sub-Location
- [ ] City
- [ ] Country

### Luxury Category
- [ ] View
- [ ] Size
- [ ] Configuration Type (Simplex, Duplex, Triplex, Bungalow)
- [ ] Price
- [ ] Is Plot or Villa (checkbox)
- [ ] Additional Information/Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### New Project Category
- [ ] BHK (Multi-select: 1BHK, 2BHK, 3BHK, 4BHK, 5BHK)
- [ ] 1BHK Area (sq.ft)
- [ ] 2BHK Area (sq.ft)
- [ ] 3BHK Area (sq.ft)
- [ ] 4BHK Area (sq.ft)
- [ ] 5BHK Area (sq.ft)
- [ ] Towers
- [ ] Units
- [ ] Area
- [ ] Possession
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### Plots & Lands Category
- [ ] State/Country
- [ ] Plot Size (with unit: sq.ft / sq.m / sq.yd)
- [ ] Road Width (with unit: feet / meters)
- [ ] Frontage
- [ ] Sale Price
- [ ] Sale/JV (Joint Venture) checkboxes
- [ ] Availability Status (Available / On Hold / Sold)
- [ ] Zoning (Residential / Commercial checkboxes)
- [ ] Additional Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### Redevelopment and Joint Venture Category
- [ ] Society / Property Name
- [ ] Plot Size
- [ ] Number of Wings
- [ ] Number of Members
- [ ] Road Width
- [ ] Existing Structure Details
- [ ] Total Permissible FSI
- [ ] FSI Consumed
- [ ] Balance FSI (auto-calculated)
- [ ] Corpus Amount (per member / total)
- [ ] Rent
- [ ] Rent Tenure (months)
- [ ] Extra Amenities Offered
- [ ] Stage (Under Discussion / LOI Given / Agreement / Closed)
- [ ] Additional Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### Hotels Category
- [ ] Society / Property Name
- [ ] No of Rooms
- [ ] Floors
- [ ] Built up Area
- [ ] Plot size
- [ ] Sale Price
- [ ] Monthly Revenue
- [ ] EBITDA / Yield
- [ ] Pre-Leased? (Yes / No)
- [ ] Additional Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### Independent Buildings Category
- [ ] Society / Property Name
- [ ] Usage type (Residential / Commercial)
- [ ] Commercial type (if Commercial: School, College, Hospital, Retail Office, Mall, Warehouse, Clubs, Others)
- [ ] Plot Size
- [ ] Constructed Area
- [ ] Floors (G + X)
- [ ] Road Width
- [ ] Transaction Option (Rent / Sale / Pre-Leased)
- [ ] Price / Rent
- [ ] Deposit
- [ ] Tenure (years / months)
- [ ] Escalation (%)
- [ ] Additional Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

### International Category
- [ ] Society / Property Name
- [ ] Road / Street Name
- [ ] Property Type (Residential / Commercial)
- [ ] Property Size (sq.ft)
- [ ] Configuration (Studio / 1BHK / 2BHK / Villa / Office etc.)
- [ ] Price
- [ ] Currency (USD / AED / GBP / EUR etc.)
- [ ] Transaction (Sale / Lease)
- [ ] Furnishing Status
- [ ] Additional Notes
- [ ] Video Links
- [ ] Images
- [ ] Multi-category checkboxes

---

## Critical Requirements Verification

- [ ] ✅ Category selection is FIRST step
- [ ] ✅ Forms change dynamically based on category
- [ ] ✅ NO required field indicators (*) anywhere
- [ ] ✅ Common fields at start of all forms
- [ ] ✅ Multi-category checkboxes at end of all forms
- [ ] ✅ All 7 categories implemented
- [ ] ✅ All category-specific fields present
- [ ] ✅ Video links support multiple URLs
- [ ] ✅ Image upload still works
- [ ] ✅ Backward compatibility maintained

---

## Testing Scenarios

### Scenario 1: Create Luxury Property
1. [ ] Select "Luxury" category
2. [ ] Fill common fields (all optional)
3. [ ] Fill luxury-specific fields
4. [ ] Select additional categories in checkboxes
5. [ ] Add video links
6. [ ] Upload images
7. [ ] Submit form
8. [ ] Verify property saved correctly
9. [ ] Verify property appears in selected categories

### Scenario 2: Create New Project Property
1. [ ] Select "New Project" category
2. [ ] Fill common fields
3. [ ] Select multiple BHK options
4. [ ] Fill area for each selected BHK
5. [ ] Fill other new project fields
6. [ ] Select additional categories
7. [ ] Submit and verify

### Scenario 3: Multi-Category Assignment
1. [ ] Create property with primary category "Luxury"
2. [ ] Check "New Project" and "Plots & Lands" checkboxes
3. [ ] Submit property
4. [ ] Verify property appears in Luxury section
5. [ ] Verify property appears in New Project section
6. [ ] Verify property appears in Plots & Lands section

### Scenario 4: Edit Existing Property
1. [ ] Open existing property
2. [ ] Change category
3. [ ] Update fields
4. [ ] Save changes
5. [ ] Verify updates persisted

### Scenario 5: Backward Compatibility
1. [ ] Load old property format
2. [ ] Verify it displays correctly
3. [ ] Edit old property
4. [ ] Verify migration works
5. [ ] Verify no data loss

---

## Deployment Checklist

- [ ] Database migration tested on staging
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Backup created
- [ ] Migration script ready
- [ ] Rollback plan prepared
- [ ] Deploy to staging
- [ ] Test on staging
- [ ] Deploy to production
- [ ] Monitor for errors
- [ ] Verify data integrity
