import pagesJson from '@/pages.json';

/**
 * 解析路由地址
 * @param {object} pagesJson
 * @returns [{"path": "/pages/tab/home/index","needLogin": false},...]
 */
const parseRoutes = (pagesJson = {} as any) => {
  if (!pagesJson.pages) {
    pagesJson.pages = [];
  }
  if (!pagesJson.subPackages) {
    pagesJson.subPackages = [];
  }

  const parsePages = (pages = [] as any, rootPath = '') => {
    const routes = [];
    for (let i = 0; i < pages.length; i++) {
      routes.push({
        path: rootPath ? `/${rootPath}/${pages[i].path}` : `/${pages[i].path}`,
        needLogin: pages[i].needLogin === true,
      });
    }
    return routes;
  };

  const parseSubPackages = (subPackages = [] as any) => {
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

/**
 * 当前路由
 * @returns {string} 当前路由
 */
export const currentRoute = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1] as any;
  return currentPage?.$page?.fullPath || currentPage.route;
};

/**
 * 去除查询字符串
 * @param {string} path
 * @returns {string} 去除查询字符串后的路径
 */
export const removeQueryString = (path = '') => {
  return path.split('?')[0];
};

/**
 * 路径是否存在
 * @param {string} path
 * @returns {boolean} 路径是否存在
 */
export const isPathExists = (path = '') => {
  const cleanPath = removeQueryString(path);
  return routes.some(item => item.path === cleanPath);
};

/**
 * 是否是tabbar页面路径
 * @param {string} path
 * @returns {boolean} 是否是tabbar页面
 */
export const isTabBarPath = (path = '') => {
  const cleanPath = removeQueryString(path);
  return (
    pagesJson.tabBar?.list?.some(
      item => `/${item.pagePath}` === cleanPath,
    ) === true
  );
};
