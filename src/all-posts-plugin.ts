import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";
import type { Plugin } from "vite";

const VIRTUAL_MODULE_ID = "virtual:post-lists";
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

type PostMetadata = {
  title: string;
  link: string;
  date: string;
};

function getExportedString(frontmatter: string, filePath: string, exportName: string) {
  const sourceFile = ts.createSourceFile(
    filePath,
    frontmatter,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    if (!statement.modifiers?.some((m) => m.kind == ts.SyntaxKind.ExportKeyword)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text != exportName) continue;
      if (!declaration.initializer) break;

      if (
        ts.isStringLiteral(declaration.initializer) ||
        ts.isNoSubstitutionTemplateLiteral(declaration.initializer)
      ) {
        return declaration.initializer.text;
      }

      throw new Error(
        `Expected ${exportName} in ${filePath} to be a static string or template literal`,
      );
    }
  }

  throw new Error(`Missing exported const ${exportName} in ${filePath}`);
}

function parseFrontmatter(filePath: string, source: string) {
  const match = FRONTMATTER_PATTERN.exec(source);
  if (!match) throw new Error(`Missing frontmatter in ${filePath}`);
  return match[1];
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getChildDirectories(parentPath: string) {
  const entries = await fs.readdir(parentPath, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function parseAstroPost(filePath: string, link: string) {
  const source = await fs.readFile(filePath, "utf-8");
  const frontmatter = parseFrontmatter(filePath, source);
  return {
    title: getExportedString(frontmatter, filePath, "title"),
    date: getExportedString(frontmatter, filePath, "date"),
    link,
  };
}

async function readAstroPosts(parentPath: string, linkPrefix: string) {
  const posts: PostMetadata[] = [];
  const dirs = await getChildDirectories(parentPath);
  await Promise.all(
    dirs.map(async (dir) => {
      const filePath = path.join(parentPath, dir, "index.astro");
      if (await fileExists(filePath))
        posts.push(await parseAstroPost(filePath, `/${linkPrefix}/${dir}/`));
    }),
  );
  return posts;
}

async function readBlogJsonPosts(parentPath: string) {
  const posts: PostMetadata[] = [];
  const dirs = await getChildDirectories(parentPath);
  await Promise.all(
    dirs.map(async (dir) => {
      const filePath = path.join(parentPath, dir, "meta.json");
      if (!(await fileExists(filePath))) return;

      const parsed = JSON.parse(await fs.readFile(filePath, "utf-8")) as Partial<{
        title: string;
        date: string;
        url: string;
      }>;

      if (typeof parsed.title != "string") throw new Error(`Missing string "title" in ${filePath}`);
      if (typeof parsed.date != "string") throw new Error(`Missing string "date" in ${filePath}`);
      if (typeof parsed.url != "string") throw new Error(`Missing string "url" in ${filePath}`);

      posts.push({ title: parsed.title, date: parsed.date, link: parsed.url });
    }),
  );
  return posts;
}

function serializePostArray(posts: PostMetadata[]) {
  if (posts.length == 0) return "[]";
  const lines = posts.map(
    ({ title, link, date }) =>
      `{ title: ${JSON.stringify(title)}, link: ${JSON.stringify(link)}, pubDate: new Date(${JSON.stringify(date)}) }`,
  );
  return `[${lines.join(",")}]`;
}

async function buildVirtualModuleSource(root: string) {
  const blogDirectory = path.join(root, "src/pages/blog");
  const milliblogDirectory = path.join(root, "src/pages/milliblog");

  const [blogAstroPosts, blogJsonPosts, milliblogAstroPosts] = await Promise.all([
    readAstroPosts(blogDirectory, "blog"),
    readBlogJsonPosts(blogDirectory),
    readAstroPosts(milliblogDirectory, "milliblog"),
  ]);

  const byDate = (posts: PostMetadata[]) =>
    posts.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const blogPosts = byDate([...blogAstroPosts, ...blogJsonPosts]);
  const milliblogPosts = byDate(milliblogAstroPosts);

  return `export const blogPosts = ${serializePostArray(blogPosts)};
export const milliblogPosts = ${serializePostArray(milliblogPosts)};`;
}

export function allPostsPlugin(): Plugin {
  let rootDirectory = process.cwd();
  let moduleSource = "";

  return {
    name: "all-posts-plugin",
    configResolved(config) {
      rootDirectory = config.root;
    },
    async buildStart() {
      moduleSource = await buildVirtualModuleSource(rootDirectory);
    },
    resolveId(id) {
      return id == VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : null;
    },
    async load(id) {
      if (id != RESOLVED_VIRTUAL_MODULE_ID) return null;
      return (moduleSource ||= await buildVirtualModuleSource(rootDirectory));
    },
  };
}
