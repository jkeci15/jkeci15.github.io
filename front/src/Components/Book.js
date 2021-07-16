import './Book.css'
const Book = (props) => {
    return (

        <div className="wrapper">
            <h2>{props.title}</h2>
            <h3>Author: {props.author}</h3>
            <p>Description: {props.description}</p>
            <img className="image-tab" src={props.image} alt={props.title} />
        </div>

    )
}

export default Book