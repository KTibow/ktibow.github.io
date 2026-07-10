declare module 'virtual:post-lists' {
  export type ListedPost = {
    title: string;
    link: string;
    pubDate: Date;
    length: number;
  };

  export const blogPosts: ListedPost[];
  export const milliblogPosts: ListedPost[];
}
