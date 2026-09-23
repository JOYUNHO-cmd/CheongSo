type Category = { slug: string; items: { id: string }[] };
type Params = { category?: string | string[]; item?: string | string[] };

export const GALLERY_PAGE_SIZE = 24;

export function galleryPageNumber(value: string | string[] | undefined) {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

export function resolveGallerySelection(categories: Category[], params: Params) {
  const owner = typeof params.item === "string"
    ? categories.find(category => category.items.some(item => item.id === params.item))
    : undefined;
  return {
    category: params.category === "all" ? "all" : owner?.slug ?? (categories.some(category => category.slug === params.category) ? params.category as string : "all"),
    item: owner ? params.item as string : null,
  };
}

export function galleryHref(category: string, item?: string | null, page = 1) {
  const params = new URLSearchParams();
  if (category !== "all" || item) params.set("category", category);
  if (item) params.set("item", item);
  if (page > 1) params.set("page", String(page));
  return `/gallery/${params.size ? `?${params}` : ""}`;
}
