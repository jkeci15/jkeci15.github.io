import './App.css';
import BookWrapper from './Components/Display/BooksWrapper';
import AuthorWrapper from './Components/Display/AuthorWrapper';
import LoginForm from './Components/Login/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar';
import CategoryWrapper from './Components/Display/CategoryWrapper';


function App() {
  return (
    <>
    <div>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/authors' component={AuthorWrapper} />
        <Route path='/categories' component={CategoryWrapper} />
        <Route path='/' exact component={BookWrapper} />
        <Route path='/signin' component={LoginForm} />
      </Switch>
    </Router>
    </div>
    </>
  );
}

export default App;
