export type BlogPost = {
  title: string;
  link: string;
  pubDate: Date;
};

const astroModules = import.meta.glob<{
  title: string;
  date: string;
  url: string;
}>("./*/index.astro", { eager: true });

const jsonModules = import.meta.glob<{
  title: string;
  date: string;
  url: string;
}>("./*/meta.json", { eager: true });

const astroPosts = Object.values(astroModules).map((mod) => ({
  title: mod.title,
  link: mod.url,
  pubDate: new Date(mod.date),
}));

const jsonPosts = Object.values(jsonModules).map((mod) => ({
  title: mod.title,
  link: mod.url,
  pubDate: new Date(mod.date),
}));

export default [...astroPosts, ...jsonPosts].sort(
  (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
);
