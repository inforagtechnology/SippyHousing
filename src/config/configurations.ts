/**
 * Central list of unit configurations used across the admin forms.
 * Add new entries here (or type a custom one in the admin form) – e.g. "Jodi", "10BHK".
 * NOTE: there is intentionally NO "0 BHK" option.
 */
export const BHK_OPTIONS: string[] = [
  '1BHK',
  '1.5BHK',
  '2BHK',
  '2.5BHK',
  '3BHK',
  '3.5BHK',
  '4BHK',
  '5BHK',
  '6BHK',
  '7BHK',
  '8BHK',
  '9BHK',
  '10BHK',
  'Jodi',
  'Studio',
  'Duplex',
  'Penthouse',
];

/** Options used by the "Unit variants" rows of a New Project. */
export const UNIT_VARIANT_TYPES: string[] = BHK_OPTIONS;
