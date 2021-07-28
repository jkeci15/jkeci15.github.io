import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import CategoryContext from '../../store/category-context'
import Card from "../Card"
import CategoryList from "./CategoryList"
import './CategoryWrapper.css'

const CategoryWrapper = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)
    const authCtx = useContext(AuthContext)
    const isLoggedIn = authCtx.isLoggedIn
    const categoryCtx = useContext(CategoryContext)

    const fetchCategoriesHandler = useCallback(async () => {
        setisLoading(true)
        setError(null)
        try {
            const response = await fetch('/category')
            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            const transformedCategory = data.map((category) => {
                return {
                    id: category._id,
                    title: category.name
                }
            })
            setCategories(transformedCategory)
            categoryCtx.setHasChanged(false)
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    }, [categoryCtx])

    useEffect(() => {
        fetchCategoriesHandler()
    }, [fetchCategoriesHandler, categoryCtx.hasChanged])

    const getCategoryContent = useCallback((categories) => {
        if (error) {
            return <p>{error}</p>
        }
        if (isLoading) {
            return <p>Loading....</p>
        }
        if (categories.length > 0) {
            return <CategoryList categories={categories} />
        }
        else {
            return <p>Found no Categories!</p>
        }
    }, [error, isLoading])

    const [categoryContent, setCategoryContent] = useState(getCategoryContent(categories));
    useEffect(() => {
        setCategoryContent(getCategoryContent(categories))
    }, [getCategoryContent, categories])


    return (
        <section>
        <Card className="categories">
            {isLoggedIn ? <Link to='/newCategory' className="createButton">Add Category</Link> : ""}
            {categoryContent}
        </Card>
        </section>
    )
}

export default CategoryWrapper