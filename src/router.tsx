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