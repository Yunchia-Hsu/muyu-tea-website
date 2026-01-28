/**
 * Convert text to URL-friendly slug
 * e.g., "Tea Brewing Basics" → "tea-brewing-basics"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single
}

/**
 * Generate course URL slug with ID prefix
 * e.g., (1, "Tea Brewing Basics") → "1-tea-brewing-basics"
 */
export function courseSlug(id: number, title: string): string {
  return `${id}-${slugify(title)}`;
}

/**
 * Extract course ID from slug
 * e.g., "1-tea-brewing-basics" → 1
 */
export function extractIdFromSlug(slug: string): number {
  const id = parseInt(slug.split("-")[0], 10);
  return isNaN(id) ? -1 : id;
}
