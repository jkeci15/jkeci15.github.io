import './App.css';
import BookWrapper from './Components/Display/BooksWrapper';
import AuthorWrapper from './Components/Display/AuthorWrapper';
import LoginForm from './Components/Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar';
import CategoryWrapper from './Components/Display/CategoryWrapper';
import CreateBookForm from './Components/Create/createBook';
import CreateAuthorForm from './Components/Create/createAuthor';
import CreateCategoryForm from './Components/Create/createCategory';

function App() {
  return (
    <>
    <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/books' component={BookWrapper} />
        <Route path='/' exact component={BookWrapper} />
        <Route path='/newBook' component={CreateBookForm} />
        <Route path='/authors' component={AuthorWrapper} />
        <Route path='/newAuthor' component={CreateAuthorForm} />
        <Route path='/categories' component={CategoryWrapper} />
        <Route path='/newCategory' component={CreateCategoryForm} />
        <Route path='/signin' component={LoginForm} />
      </Switch>
    </Router>
    </div>
    </>
  );
}

export default App;
