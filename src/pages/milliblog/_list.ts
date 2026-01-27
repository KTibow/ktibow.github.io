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

const astroPosts = Object.values(astroModules).map((mod) => ({
  title: mod.title,
  link: mod.url,
  pubDate: new Date(mod.date),
}));

export default astroPosts.toSorted((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
