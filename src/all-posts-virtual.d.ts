declare module 'virtual:post-lists' {
  export type ListedPost = {
    title: string;
    link: string;
    pubDate: Date;
  };

  export const blogPosts: ListedPost[];
  export const milliblogPosts: ListedPost[];
}
