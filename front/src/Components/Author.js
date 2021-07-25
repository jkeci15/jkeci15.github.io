import Card from './Card'
import './Author.css'
const Author = (props) => {
    return(
    <Card className="wrapper">
        <h2>{props.name}</h2>
        <p><em> {props.bio}</em></p>
        
    </Card>
    )
}

export default Author