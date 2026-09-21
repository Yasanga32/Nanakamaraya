export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: "architectural-hardware",
    title: "Architectural Hardware",
    description: "Smart and traditional locks, hinges, handles, stoppers, sliding and folding systems",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000",
    itemCount: 245
  },
  {
    id: "bathroom-fittings",
    title: "Bathroom Fittings",
    description: "Shower sets, grab bars, mirrors, racks, mats, floor drains, soap dispensers and essential bathroom accessories",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000",
    itemCount: 180
  },
  {
    id: "decorative",
    title: "Decorative",
    description: "Laminated sheets, boards, panels, and decorative essentials to elevate your furniture, walls, and projects",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    itemCount: 310
  },
  {
    id: "furniture-hardware",
    title: "Furniture Hardware",
    description: "Bed lifts, wardrobes, cabinet fittings, and furniture hardware essentials to transform your home",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1000",
    itemCount: 420
  },
  {
    id: "homeware",
    title: "Homeware",
    description: "Storage baskets, kitchenware, laundry essentials, lighting, and more to organize and enhance your home",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
    itemCount: 290
  },
  {
    id: "household",
    title: "Household",
    description: "All-purpose cleaners, bathroom cleaners, floor cleaners, and more for a sparkling home",
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=1000",
    itemCount: 115
  },
  {
    id: "kitchen-fittings",
    title: "Kitchen Fittings",
    description: "Sinks, taps, storage, appliances, and more to design your dream kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
    itemCount: 230
  },
  {
    id: "kitchenware",
    title: "Kitchenware",
    description: "Cookware, bakeware, knives, storage, and more for all your culinary creations",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000",
    itemCount: 165
  },
  {
    id: "office",
    title: "Office",
    description: "Seating, media mounts, waste bins, and more to space up your workspace",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000",
    itemCount: 140
  },
  {
    id: "smart-living",
    title: "Smart Living",
    description: "Digital door locks & safes for enhanced safety and control in your modern home",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000",
    featured: true,
    itemCount: 95
  }
];
