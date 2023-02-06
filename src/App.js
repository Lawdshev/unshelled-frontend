import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home'
import SignIn from './components/signin';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ItemDetailsPage from './pages/Itemdetails';
import Account from './pages/Account';


function App() {
  return (
    <div className='flex flex-col'>
      <Header/>
      <Router>
        <div className='flex'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/item/:order_id' element={<ItemDetailsPage/>}/>
          <Route path='/account' element={<Account/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
