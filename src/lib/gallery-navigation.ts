type Category = { slug: string; items: { id: string }[] };
type Params = { category?: string | string[]; item?: string | string[] };

export function resolveGallerySelection(categories: Category[], params: Params) {
  const owner = typeof params.item === "string"
    ? categories.find(category => category.items.some(item => item.id === params.item))
    : undefined;
  return {
    category: params.category === "all" ? "all" : owner?.slug ?? (categories.some(category => category.slug === params.category) ? params.category as string : "all"),
    item: owner ? params.item as string : null,
  };
}

export function galleryHref(category: string, item?: string | null) {
  const params = new URLSearchParams();
  if (category !== "all" || item) params.set("category", category);
  if (item) params.set("item", item);
  return `/gallery/${params.size ? `?${params}` : ""}`;
}
