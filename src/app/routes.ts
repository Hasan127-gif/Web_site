import { Home } from '../pages/Home';
import { Roommates } from '../pages/Roommates';
import { Pets } from '../pages/Pets';
import { Furniture } from '../pages/Furniture';
import { NewListing } from '../pages/NewListing';

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title?: string;
  description?: string;
  protected?: boolean;
  roles?: string[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    title: 'Ana Sayfa',
    description: 'Ev arkadaşı, hayvan sahiplendirme ve ev eşyası — tek yerde',
  },
  {
    path: '/roommates',
    element: Roommates,
    title: 'Ev Arkadaşı Bul',
    description: 'Güvenilir ev arkadaşı arama ve filtreleme',
  },
  {
    path: '/pets',
    element: Pets,
    title: 'Hayvan Sahiplendirme',
    description: 'Sevimli dostlarınız için yeni yuva bulun',
  },
  {
    path: '/furniture',
    element: Furniture,
    title: 'Ev Eşyaları',
    description: 'İkinci el mobilya alım-satımı',
  },
  {
    path: '/new-listing',
    element: NewListing,
    title: 'Yeni İlan',
    description: 'İlanınızı oluşturun ve yayınlayın',
    protected: true,
  },
];

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.protected);
};

export const getPublicRoutes = (): RouteConfig[] => {
  return routes.filter(route => !route.protected);
};
