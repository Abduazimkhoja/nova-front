export const menu = [
  {
    id: 1,
    route: "/",
    title: "menu.home",
  },
  {
    id: 2,
    route: "/about",
    title: "menu.about",
  },
  {
    id: 3,
    route: "/category",
    title: "menu.products",
  },
  {
    id: 4,
    route: "/media",
    title: "menu.media",
  },
  {
    id: 5,
    route: "/news",
    title: "menu.news",
  },
  {
    id: 6,
    route: "/contact",
    title: "menu.contacts",
  },
].sort((a, b) => a.id - b.id);
