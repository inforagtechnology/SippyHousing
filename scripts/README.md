# Scripts

## Seed all property types (`seed-all-property-types.ts`)

Adds one sample property for each category so you can test listing, search, and detail pages across all types.

**Categories covered:**

- **Luxury** – view, size, configuration, price
- **New Project** – BHK options, storey, towers, units, area, possession, RERA (per-BHK price columns omitted unless your DB migration has added them)
- **Resale & Rental** – one Resale and one Rental (price, BHK, furnishing, floor, deposit/tenure)
- **Plots & Lands** – plot size, road width, sale/JV, zoning
- **Redevelopment and Joint Venture** – society, plot size, members, FSI, corpus
- **Hotels** – rooms, floors, built-up area, revenue, pre-leased
- **Independent Buildings** – one Residential and one Commercial (usage_type_category, transaction, price/rent)
- **International** – Dubai-style (currency, transaction type, configuration)

**Run:**

```bash
# From project root; ensure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run seed:properties
```

Or with npx (no npm script):

```bash
npx tsx scripts/seed-all-property-types.ts
```

**Requirements:** Node 18+, and project dependencies installed (`npm install`). The script uses `tsx` (devDependency) and reads `.env` from the project root for Supabase credentials.

After running, check the app: home sections, All Properties, Search, and each property’s detail page to verify all types display correctly.

---

## Delete seed properties (`delete-seed-properties`)

If you ran the seed script on your main DB by mistake, this removes **only** the entries created by the seed (identified by the seed description).

**Run (Node):**

```bash
npm run seed:delete
```

**Or run in Supabase:**  
Open **Supabase Dashboard → SQL Editor**, paste and run the contents of `scripts/delete-seed-properties.sql`.
