export type Billboard = {
  id: string;
  title: string;
  location: string;
  city: string;
  type: "Static" | "Digital LED" | "Wallscape";
  size: string;
  width: number;
  height: number;
  price: number;
  availability: string;
  image: string;
  featured?: boolean;
};

export const BILLBOARDS: Billboard[] = [
  {
    id: "bole-ring-road-premium",
    title: "Bole Ring Road Premium Static",
    location: "Bole, Addis Ababa",
    city: "Bole",
    type: "Static",
    size: "12m × 5m",
    width: 12,
    height: 5,
    price: 15000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },

  {
    id: "piassa-intersection-led",
    title: "Piassa Intersection LED",
    location: "Piassa, Addis Ababa",
    city: "Piassa",
    type: "Digital LED",
    size: "8m × 4m",
    width: 8,
    height: 4,
    price: 25000,
    availability: "Available in 2 Weeks",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },

  {
    id: "kazanchis-business-display",
    title: "Kazanchis Business Display",
    location: "Kazanchis, Addis Ababa",
    city: "Kazanchis",
    type: "Digital LED",
    size: "10m × 4m",
    width: 10,
    height: 4,
    price: 32000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "mexico-main-road",
    title: "Mexico Main Road Billboard",
    location: "Mexico, Addis Ababa",
    city: "Mexico",
    type: "Static",
    size: "10m × 5m",
    width: 10,
    height: 5,
    price: 18000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "bole-airport-digital",
    title: "Bole Airport Road Digital",
    location: "Bole Airport Road, Addis Ababa",
    city: "Bole",
    type: "Digital LED",
    size: "14m × 6m",
    width: 14,
    height: 6,
    price: 45000,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },

  {
    id: "megenagna-wallscape",
    title: "Megenagna Premium Wallscape",
    location: "Megenagna, Addis Ababa",
    city: "Megenagna",
    type: "Wallscape",
    size: "18m × 8m",
    width: 18,
    height: 8,
    price: 55000,
    availability: "Available in 1 Month",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  },
];