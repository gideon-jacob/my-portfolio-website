export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'gideon-jacob';
export const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || 'gideonjacob';
export const CODECHEF_USERNAME = import.meta.env.VITE_CODECHEF_USERNAME || 'gideonjacob';

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  leetcode: `https://leetcode.com/u/${LEETCODE_USERNAME}`,
  codechef: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
  linkedin: 'https://linkedin.com/in/gideonjacob',
  twitter: 'https://x.com/gideonjacob_in',
} as const;

export const PINNED_REPOS: string[] = [];

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Lua: '#000080',
  R: '#198CE7',
  Scala: '#c22d40',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Jupyter: '#F37626',
  'Jupyter Notebook': '#DA5B0B',
  HCL: '#844FBA',
  Dockerfile: '#384d54',
  Makefile: '#427819',
  Nix: '#7e7eff',
  Zig: '#ec915c',
  OCaml: '#3be133',
};

export const SECTION_IDS = {
  home: 'home',
  leetcode: 'leetcode',
  codechef: 'codechef',
  github: 'github',
  linkedin: 'linkedin',
  twitter: 'twitter',
} as const;
