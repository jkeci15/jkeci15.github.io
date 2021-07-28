import React, { useRef, useState, useContext, useLayoutEffect } from "react"
import { useHistory } from "react-router-dom";
import './createBook.css'
import AuthContext from "../../store/auth-context";
import FileUploader from "./fileUploader";

const CreateBookForm = () => {
    const [authors, setAuthors] = useState([])
    const [categories, setCategories] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory()
    const authCtx = useContext(AuthContext)
    
    if (!authCtx.isLoggedIn) history.replace("/books")

    const bookInputRef = useRef();
    const descriptionInputRef = useRef();
    const authorSelectRef = useRef()

    useLayoutEffect(() => {
        const getAuthorsList = async () => {
            try {
                const response = await fetch('/authors')
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                const data = await response.json()
                const transformedData = data.map((author) => (
                    {
                        id: author._id,
                        name: author.name,
                        bio: author.bio
                    }))
                setAuthors(transformedData)
            } catch (error) {
                alert(error.message)
            }
        }

        getAuthorsList()
    }, [])

    useLayoutEffect(() => {
        const getCategoriesList = async () => {
            try {
                const response = await fetch('/category')
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                const data = await response.json()
                const transformedData = data.map((category) => (
                    {
                        id: category._id,
                        name: category.name,
                    }))
                setCategories(transformedData)
            } catch (error) {
                alert(error.message)
            }
        }

        getCategoriesList()
    }, [])

    const createBookSubmitHandler = async () => {
        const selectedCategories = []

        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            selectedCategories.push(checkboxes[i].id)
        }
        try {
            // const bookBuffer = fs.readFileSync( selectedFile.name)
            const bookBuffer = Buffer.from(selectedFile.name)
            const response = await fetch('/books', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    name: bookInputRef.current.value,
                    description: descriptionInputRef.current.value,
                    author: authorSelectRef.current.value,
                    categories: selectedCategories,
                    bookCover: bookBuffer
                })
            })
            
            if (response.status <=300) {
                history.replace('/books')
            }
            else {
                throw new Error('Could not add book')
            }
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <section className="auth">
            <h2>Add Book</h2>
            <form encType="multipart/form-data" onSubmit={createBookSubmitHandler}>
                <div className="control" >
                    <label>Book name</label>
                    <input
                        ref={bookInputRef}
                        type="text"
                        required
                    />
                </div>
                <div className="control" >
                    <label>Author</label>
                    <select id="author" name="author" ref={authorSelectRef}>
                        {authors.map(author => (
                            <option
                                key={author.id}
                                value={author.id}
                            >{author.name}</option>
                        ))}
                    </select>

                </div>
                <div className="control" >
                    <label>Description</label>
                    <input
                        ref={descriptionInputRef}
                        type="text"
                        required
                    />
                </div>
                <div className="control checkBoxContainer" >
                    <label>Categories</label>
                    {categories.map(category => (
                        <div className="checkBoxOptionContainer" key={`div${category.id}`}>
                            <input
                                type="checkbox"
                                name={category.id}
                                id={category.id}
                                key={category.id}
                                value={category.name} />
                            <label htmlFor={category.id} key={`label${category.id}`}>{category.name}</label>
                        </div>
                    ))}
                </div>

                <div className="control">
                    <FileUploader
                        onFileSelectSuccess={(file) => setSelectedFile(file)}
                        onFileSelectError={({ error }) => alert(error)}
                    /> 
                </div>

                <div className="actions">
                    <button className="loginFormButton">Add Book</button>

                </div>
            </form>
        </section>
    )
}

export default CreateBookForm