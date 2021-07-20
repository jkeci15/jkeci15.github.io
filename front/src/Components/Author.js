
import Card from './Card'

const Author = (props) => {
    return(
    <Card className="wrapper">
        <h2>{props.authorName}</h2>
        <p><em> {props.bio}</em></p>
    </Card>
    )
}

export default Author