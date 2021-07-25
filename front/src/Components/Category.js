import Card from './Card'
import './Category.css'
const Category = (props) => {
    return(
    <Card className="wrapper">
        <h2>{props.title}</h2>
    </Card>
    )
}

export default Category