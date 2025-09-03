import Home from '../pages/Home'
import Roommates from '../pages/Roommates'
import Pets from '../pages/Pets'
import Furniture from '../pages/Furniture'
import NewListing from '../pages/NewListing'

export const routes = [
  { path: '/', element: Home },
  { path: '/roommates', element: Roommates },
  { path: '/pets', element: Pets },
  { path: '/furniture', element: Furniture },
  { path: '/listing/new', element: NewListing },
]
