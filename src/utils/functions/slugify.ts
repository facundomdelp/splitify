export function slugify(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse consecutive hyphens
}
