import './App.css';
import BookWrapper from './Components/Display/BooksWrapper';
import AuthorList from './Components/Display/AuthorList';
import CategoryList from './Components/Display/CategoryList';
import LoginForm from './Components/Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar';


function App() {
  return (
    <>
    <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={BookWrapper} />
        <Route path='/about' component={AuthorList} />
        <Route path='/newshop' component={CategoryList} />
        <Route path='/signin' component={LoginForm} />
      </Switch>
    </Router>
    </div>
    </>
  );
}

export default App;
