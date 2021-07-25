import React, { useCallback, useEffect, useState } from 'react'
import Card from "../Card"
import CategoryList from "./CategoryList"
import './CategoryWrapper.css'

const CategoryWrapper = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)

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
        } catch (error) {
            setError(error.message)
        }
        setisLoading(false)
    },[])

    useEffect(()=>{
        fetchCategoriesHandler()
    },[fetchCategoriesHandler])

    let catContent = <p>No categories found!</p>

    if(categories.length > 0) {
        catContent = <Card className="categories">
            <CategoryList categories={categories}/>
        </Card>
    }
    if (error) {
        catContent = <p>Loading....</p>
    }
    if (isLoading) {
        catContent = <p>Loading....</p>
    }
    return(
        <div>
            <section>
                {catContent}
            </section>
        </div>
    )
}

export default CategoryWrapper