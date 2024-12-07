import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const { pathname } = useLocation();

    const isHome = useMemo(() => pathname === '/', [pathname]);

    const { fetchCategories, categories, searchRecipies } = useAppStore()

    const [searchFilter, setSearchFilter] = useState({ ingredient: '', category: '' })

    useEffect(() => { fetchCategories() }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //TODO: Validar
        if(Object.values(searchFilter).includes('')){
            console.log('Todos los campos son obligatorios')
            return
        }

        //Consulatar API recetas
        searchRecipies(searchFilter)

    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16 lg:max-w-[1024px]">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logo" />
                    </div>

                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold"'}

                        >
                            Incio
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold"'}
                        >
                            Favoritos
                        </NavLink>
                    </nav>

                </div>

                {isHome && (
                    <form action=""
                        className="md:w-1/2 2xl:2-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Nombre o Ingredientes
                            </label>

                            <input
                                id="ingredient"
                                name="ingredient"
                                type="text"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                placeholder="Nombre o Ingredientes. Ej Vodka, Tequila, Café"
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                            />
                        </div>

                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >
                                Categoria
                            </label>

                            <select
                                id="category"
                                name="category"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                onChange={handleChange}
                                value={searchFilter.category}
                            >
                                <option disabled defaultValue={'--Seleccionar Categoria--'} value="">-- Seleccione --</option>
                                {categories.drinks.map((category) => (
                                    <option
                                        key={category.strCategory}
                                        value={category.strCategory}
                                    >
                                        {category.strCategory}
                                    </option>
                                ))}

                            </select>

                            <input
                                type="submit"
                                value="Buscar"
                                className="cursor pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                        </div>
                    </form>
                )}
            </div>
        </header>
    )
}