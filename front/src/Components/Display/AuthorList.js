import Author from "../Author"
import './AuthorList.css'
const AuthorList = (props)=>{

    return(
        <ul className="author-list">
            {props.authors.map((author) =>(
                <Author key={author.name}
                    id={author.id}
                    name={author.name}
                    bio={author.bio}
                    />
            ))}
        </ul>
    )
}
export default AuthorList