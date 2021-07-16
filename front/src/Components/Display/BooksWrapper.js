import BookList from "./BookList"

const BookWrapper = () => {

    const BOOKS = [
        {   id: 1,
            title: 'Old man and the sea',
            author: 'Hemingway',
            description: 'A book about human vs nature',
            categories: 'fan-fiction',
            image: '../public/Images/davinci_code.jpg'
        },
        {
            id:2,
            title: 'DaVinci Code',
            author: 'Dan Brown',
            description: 'Mystery Holy grail',
            categories: 'fan-fiction',
            image: './public/Images/davinci_code.jpg'
        }
    ];
    return (
        <BookList books={BOOKS}/>
    )
}

export default BookWrapper