import './Book.css'
import Card from './Card'
const Book = (props) => {
    
    const imgsrc = "data:image/jpg;base64," + props.bookCover
    
    return (

        <Card className="wrapper">
            <h2>{props.title}</h2>
            <h3>By: {props.author}</h3>
            <p><em> {props.description}</em></p>
            <p>{props.image}</p>
            <div className="image-div">
                <img className="image-tab" src={imgsrc} alt={props.title} />
            </div>
        </Card>

    )
}

export default Book