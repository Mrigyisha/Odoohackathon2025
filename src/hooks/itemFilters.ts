import type { Item } from "@/pages/Browse"; 
interface FilterOptions {
  query: string;
  category: string;
  size: string;
  condition: string;
  sortBy: string;
}

export function filterAndSortItems(items: Item[], options: FilterOptions): Item[] {
  let filtered = [...items];

  // Search
  if (options.query) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(options.query.toLowerCase())
    );
  }

  // Category filter
  if (options.category !== "all") {
    filtered = filtered.filter(item => item.category.toLowerCase() === options.category);
  }

  // Size filter
  if (options.size !== "all") {
    filtered = filtered.filter(item => item.size.toLowerCase() === options.size);
  }

  // Condition filter
  if (options.condition !== "all") {
    filtered = filtered.filter(item => item.condition.toLowerCase() === options.condition);
  }

  // Sorting
  switch (options.sortBy) {
    case "newest":
      filtered.sort((a, b) => (b.uploadDate > a.uploadDate ? 1 : -1));
      break;
    case "oldest":
      filtered.sort((a, b) => (a.uploadDate > b.uploadDate ? 1 : -1));
      break;
    case "price-low":
      filtered.sort((a, b) => a.points - b.points);
      break;
    case "price-high":
      filtered.sort((a, b) => b.points - a.points);
      break;
    case "popular":
      filtered.sort((a, b) => b.likes - a.likes);
      break;
  }

  return filtered;
}
