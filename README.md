# React + TypeScript + Vite

## Despligue
Cuando ejecutamos ``npm run build`` hace lo que la aplicación completa quede un solo archivo, esto al tener varias páginas es un problema porque la página de inicio se volvería pesada, y cargaría contenido innecesario. Para ello podemos divir nuestra página en pequeños archivos de javascript.

Aplicamos lazy a la página y colocamos un Suspense
```ts
import { lazy, Suspense } from 'react'

const IndexPage = lazy(() => import('./pages/IndexPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'))

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback="cargando...">
                            <IndexPage />
                        </Suspense>
                    } index />
                    
                    <Route path="/favorites" element={
                        <Suspense fallback="cargando...">
                            <FavoritesPage />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```



## Rutas
Para indicar las rutas que va a tener nuestro programa utilizamos route junto con path para indicar su ruta, e indicamos cuál es la página principal con IndexPage.
Para tener un contenedor el cual almacene los componentes que queramos reutilizar en las páginas como el header utilizamos un layout y de hijos colocamos las páginas

```ts
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import Layout from './layouts/Layout'
import FavoritesPage from './pages/FavoritesPage'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage />} index />
                    <Route path="/favorites" element={<FavoritesPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```


## Manejo de contenido en el Layout
Para utilizar indicar que parte del contenido será el que cambie utilizamos "Outlet", de esta forma el outle indicará el contenido de nuestras páginas

```ts
export default function Layout() {

    const { loadFromStorage } = useAppStore()

    useEffect(() => loadFromStorage(), [])
    return (
        <>
            <Header />

            <main className="container mx-auto py-16 lg:max-w-[1024px] ">
                <Outlet />
            </main>
            <Modal />
            <Notification />
        </>
    )
}
```