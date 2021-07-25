import './Book.css'
import Card from './Card'
const Book = (props) => {
    return (

        <Card className="wrapper">
            <div className="book-item" >
                <div className="text-block">
                    <h2>{props.title}</h2>
                    <h3>By: {props.author}</h3>
                    <p><em> {props.description}</em></p>
                    <p>{props.image}</p>
                </div>
                <div className="image-div book-item">
                    <img className="image-tab" src={`data:image/png;base64,${props.bookCover}`} alt={props.title} />
                </div>
            </div>
        </Card>

    )
}

export default Book