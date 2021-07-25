import './CategoryList.css'
import Category from '../Category'

const CategoryList = (props)=>{
    
    return(
        <ul className="category-list">
            {props.categories.map((category) =>(
                <Category key={category.id}
                    title={category.title}
                    />
            ))}
        </ul>
    )
}
export default CategoryList