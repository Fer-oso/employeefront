import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ListEmployees from './components/ListEmployees';
import Index from './components/Index';
import AddEmployee from './components/AddEmployee';
import Image from './components/Image';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
   <div>
    <Router>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element = {<Index/>}></Route>
          <Route path='/employees' element = {<ListEmployees/>}></Route>
          <Route path='/add-employee' element ={<AddEmployee/>}></Route>
          <Route path='/edit-employee/:id' element={<UpdateEmployee/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </Router>
   </div>
  );
}

export default App;
