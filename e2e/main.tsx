import '../src/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { a11yRoutes } from './a11y/routes'
import { CarouselImplementation } from './components/carousel'
import { ComboboxWithinDialog } from './components/combobox-within-dialog'
import { DropdownWithAdjacentButtons } from './components/dropdown-with-adjacent-buttons'
import { DropdownWithinDialog } from './components/dropdown-within-dialog'
import { DialogForm, DrawerForm } from './components/form'
import { ScrollingListImplementation } from './components/scrolling-list'

const router = createBrowserRouter([
  ...a11yRoutes,
  {
    path: 'combobox-within-dialog',
    Component: ComboboxWithinDialog,
  },
  {
    path: 'dropdown-within-dialog',
    Component: DropdownWithinDialog,
  },
  {
    path: 'dropdown-with-adjacent-buttons',
    Component: DropdownWithAdjacentButtons,
  },
  {
    path: 'spark-form-within-dialog',
    Component: DialogForm,
  },
  {
    path: 'spark-form-within-drawer',
    Component: DrawerForm,
  },
  {
    path: 'carousel',
    Component: CarouselImplementation,
  },
  {
    path: 'scrolling-list',
    Component: ScrollingListImplementation,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
