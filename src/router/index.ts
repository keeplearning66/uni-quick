import pagesJson from '@/pages.json';

function parseRoutes(pagesJson = {} as any) {
  if (!pagesJson.pages) {
    pagesJson.pages = [];
  }
  if (!pagesJson.subPackages) {
    pagesJson.subPackages = [];
  }

  function parsePages(pages = [] as any, rootPath = '') {
    const routes = [];
    for (let i = 0; i < pages.length; i++) {
      routes.push({
        path: rootPath ? `/${rootPath}/${pages[i].path}` : `/${pages[i].path}`,
        needLogin: pages[i].needLogin === true,
      });
    }
    return routes;
  };

  function parseSubPackages(subPackages = [] as any) {
    const routes = [];
    for (let i = 0; i < subPackages.length; i++) {
      routes.push(...parsePages(subPackages[i].pages, subPackages[i].root));
    }
    return routes;
  };

  return [
    ...parsePages(pagesJson.pages),
    ...parseSubPackages(pagesJson.subPackages),
  ];
};

export const routes = parseRoutes(pagesJson);

export function getCurrentRoute() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1] as any;
  return currentPage?.$page?.fullPath || currentPage.route;
};

export function removeQueryString(path = '') {
  return path.split('?')[0];
};

export function isPathExists(path = '') {
  const cleanPath = removeQueryString(path);
  return routes.some(item => item.path === cleanPath);
};

export function isTabBarPath(path = '') {
  const cleanPath = removeQueryString(path);
  return (
    pagesJson.tabBar?.list?.some(
      item => `/${item.pagePath}` === cleanPath,
    ) === true
  );
};
