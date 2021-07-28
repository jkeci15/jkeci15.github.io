import Book from '../Book'
import './BookList.css'
const BookList = (props) => {

    return (
        <ul className="book-list">
            {props.books.map((book) => (
                <Book key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    description={book.description}
                    bookCover={book.bookCover}
                />
            ))}
        </ul>
    )
}
export default BookList