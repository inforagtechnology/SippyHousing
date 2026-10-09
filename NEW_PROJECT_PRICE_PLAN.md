# Plan: Price per Unit Type under New Project

## Goal
A **New Project** listing can offer multiple unit types: **1BHK, 2BHK, 3BHK, 4BHK, 5BHK, and/or Penthouse**. Each type can have its own **price** (and we already have **area** per type). We need to add price fields per unit type and keep using the **same `properties` table**.

---

## 1. Unit types we support

| Unit type   | Area field (existing) | Price field (to add) |
|------------|------------------------|----------------------|
| 1BHK       | `bhk_1_area`           | `price_1bhk`         |
| 2BHK       | `bhk_2_area`           | `price_2bhk`         |
| 3BHK       | `bhk_3_area`           | `price_3bhk`         |
| 4BHK       | `bhk_4_area`           | `price_4bhk`         |
| 5BHK       | `bhk_5_area`           | `price_5bhk`         |
| Penthouse  | `penthouse_area`       | `price_penthouse`    |

All price fields: **optional string** (e.g. `"₹50 L"`, `"₹1.2 Cr"`). Admin fills only the types that exist in the project.

---

## 2. Same table – new columns

Add these **optional** columns to the `properties` table (and to the `Property` type):

| Column          | Type   | Example      |
|-----------------|--------|--------------|
| `price_1bhk`    | string | "₹50 L"      |
| `price_2bhk`    | string | "₹80 L"      |
| `price_3bhk`    | string | "₹1.2 Cr"    |
| `price_4bhk`    | string | "₹1.8 Cr"    |
| `price_5bhk`    | string | "₹2.5 Cr"     |
| `price_penthouse` | string | "₹3 Cr"   |

- No new table; same `properties` row per listing.
- Other categories leave these columns null.
- Existing `price` / `price_range` can still be used for a single “from” price if you want; per-type prices take precedence for New Project when present.

---

## 3. Form (Add / Edit Property – New Project, Step 3)

**Option A – Show all six price fields**  
- Always show: 1BHK Price, 2BHK Price, 3BHK Price, 4BHK Price, 5BHK Price, Penthouse Price.  
- Admin fills only the unit types the project has.  
- Easiest to implement; no conditional logic.

**Option B – Show price only for selected unit types (recommended)**  
- Keep existing **BHK** multiselect: `1BHK, 2BHK, 3BHK, 4BHK, 5BHK`.  
- Add **Penthouse** to the multiselect (or a separate checkbox “Has Penthouse”).  
- For each selected option, show the matching **Area** (already there) and **Price** (new).  
  - e.g. if user selects 1BHK, 2BHK, Penthouse → show 1BHK Area + 1BHK Price, 2BHK Area + 2BHK Price, Penthouse Area + Penthouse Price.  
- Uses **conditional fields** in config: e.g. “1BHK Price” visible when `bhk_options` contains `"1BHK"`.  
- Penthouse: either include in `bhk_options` as `"Penthouse"` or use a separate `has_penthouse` and condition Penthouse Area + Penthouse Price on that.

**Recommendation:** Option B for cleaner UX; Option A if you want the fastest implementation.

---

## 4. Config and schema changes

1. **`Property` type (`lib/supabase.ts`)**  
   Add:
   - `price_1bhk?`, `price_2bhk?`, `price_3bhk?`, `price_4bhk?`, `price_5bhk?`, `price_penthouse?` (all optional string).

2. **New Project category (`config/propertyCategories.ts`)**  
   - Add six price fields (and, if using Option B, set `conditional` so each price is shown only when the corresponding unit type is selected).  
   - If Penthouse is not in `bhk_options`, add either:
     - `Penthouse` to BHK multiselect `options`, or  
     - a checkbox `has_penthouse` and condition Penthouse Area + Penthouse Price on it.

3. **Add/Edit schema**  
   - Add the six new keys to the dynamic schema (all optional string). No change to submit logic except that these keys are included in the payload.

4. **Database migration (optional)**  
   - Add columns `price_1bhk`, `price_2bhk`, `price_3bhk`, `price_4bhk`, `price_5bhk`, `price_penthouse` to `properties` (e.g. in Supabase SQL editor). Same table, no new table.

---

## 5. Display (cards and property details)

- **Listing cards (New Project)**  
  - **Option 1:** “From ₹X” using the minimum of all filled per-type prices (if you have a small helper to parse “₹50 L” / “₹1.2 Cr” to a number for comparison).  
  - **Option 2:** Show a short summary, e.g. “1BHK, 2BHK, 3BHK” and one “From ₹X” if you store a single `price` / `price_range` as fallback.  
  - **Option 3:** Show each type with price when present, e.g. “1BHK: ₹50 L | 2BHK: ₹80 L | 3BHK: ₹1.2 Cr”.

- **Property details page (New Project)**  
  - For each unit type that has either area or price (or both), show one row, e.g.  
    - 1BHK: Area 500 sq.ft, Price ₹50 L  
    - 2BHK: Area 800 sq.ft, Price ₹80 L  
    - Penthouse: Area 2000 sq.ft, Price ₹3 Cr  

Use the same table and the new price fields; no new table is required.

---

## 6. Implementation checklist

1. Add to **Property type**: `price_1bhk`, `price_2bhk`, `price_3bhk`, `price_4bhk`, `price_5bhk`, `price_penthouse`.
2. Add **New Project** form fields for these six prices (with optional conditional display based on BHK/Penthouse selection).
3. Optionally add **Penthouse** to BHK multiselect (or a “Has Penthouse” checkbox) and condition Penthouse Area + Penthouse Price.
4. **Add/Edit** submit: include the new price keys in the payload (same table).
5. **Property details** (New Project): show a “Unit-wise pricing” section (area + price per type).
6. **Listing cards** (New Project): show “From ₹X” and/or unit-wise summary using the new price fields.
7. **DB migration**: add the six columns to `properties` when ready.

---

## 7. Summary

- **Same table:** one `properties` row per New Project; new columns only.
- **Multiple unit types:** 1BHK, 2BHK, 3BHK, 4BHK, 5BHK, Penthouse; each can have its own price (and area).
- **Form:** either show all six price fields (Option A) or only for selected types (Option B with conditionals).
- **Display:** use the new price fields on details page and, optionally, “From ₹X” or unit-wise summary on cards.

This plan gives you a clear way to add price under New Property for 1BHK, 2, 3, 4, 5 and Penthouse without changing the “one table per listing” approach.

---

## 8. Handling multiple sizes and multiple prices per unit type

**Scenario:** A project can have **multiple variants of the same unit type**. For example:
- **2BHK** – Type A: 800 sq.ft, ₹80 L | Type B: 850 sq.ft, ₹85 L | Type C: 900 sq.ft, ₹90 L
- **3BHK** – 1200 sq.ft, ₹1.2 Cr | 1350 sq.ft, ₹1.35 Cr

So we need to support **multiple (type, area, price) rows per listing**, not just one area and one price per BHK.

### 8.1 Options (same table preferred)

| Approach | How it works | Pros | Cons |
|----------|--------------|------|------|
| **A. Fixed extra columns** | e.g. price_2bhk_2, area_2bhk_2 | Simple queries | Doesn't scale; many columns |
| **B. One JSON/JSONB column** | One column unit_variants: array of { type, area, price, label? } | Flexible; any number of variants; same table | Form is "add row" UI |
| **C. Hybrid** | Keep single price/area per type AND add optional unit_variants JSONB. If set, use it; else use single columns | Backward compatible; simple vs complex | Two ways to store; display prefers variants when present |
| **D. Separate table** | property_unit_variants table | Normalized; easy to query | New table and joins |

**Recommendation:** Option B or C (same table). Prefer C (Hybrid) to keep existing single-area fields and add variants only when needed.

### 8.2 Variant structure (Option B or C)

One array of variants. Each: **type**, **area**, **price**, optional **label** (e.g. Type A).

Example: [ { "type": "2BHK", "area": "800 sq.ft", "price": "₹80 L", "label": "Type A" }, { "type": "2BHK", "area": "850 sq.ft", "price": "₹85 L", "label": "Type B" }, ... ]

Same table: add column **unit_variants** (JSONB).

### 8.3 Form when multiple sizes/prices allowed

**Unit variants section** in Step 3 (New Project): Repeating block – Unit type (dropdown) + Area (text) + Price (text) + optional Label. Buttons: Add variant, Remove per row. Submit as array to unit_variants.

**Hybrid:** Simple mode = existing BHK + single area/price. Variants mode = when unit_variants has data, use it for display; else use single columns.

### 8.4 Display

**Details page:** If unit_variants has length, show table (Type | Variant | Area | Price). Else fall back to single area/price per type.

**Cards:** "From ₹X" from minimum of variant prices (or single price when no variants).

### 8.5 Backward compatibility

Existing rows: no unit_variants; keep using single columns. New/edited with variants: save to unit_variants; optionally fill single columns for "from" price.

### 8.6 Implementation checklist (multiple sizes/prices)

1. Add unit_variants to Property type and properties table (JSONB).
2. Form: Unit variants repeatable section; submit as array.
3. Display details: if unit_variants, render table; else single fields.
4. Display cards: "From ₹X" from variants or single prices.
5. Edit: load unit_variants into repeatable rows; save back.
