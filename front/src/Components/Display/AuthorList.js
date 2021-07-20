import Author from "../Author"
import './AuthorList.css'
const AuthorList = (props)=>{

    return(
        <ul className="book-list">
            {props.authors.map((author) =>(
                <Author key={author._id}
                    authorName={author.authorName}
                    bio={author.bio}
                    />
            ))}
        </ul>
    )
}
export default AuthorList