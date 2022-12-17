import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Navigation from './Components/Navigation';
import MainMenu from './Components/Menu';
import Login from './Components/components/Login'
import AgentRegister from './Components/components/AgentRegister'
import PayeeRegister from './Components/components/PayeeRegister'
import Checkout from './Components/components/Checkout'
import CheckoutPage from './Components/CheckoutPage'
import Dashboard from './Components/Dashboard';
import PayeeTable from './Components/PayeeTable';
import PaymentsTable from './Components/PaymentsTable';
import AgentTable from './Components/AgentTable';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="App">
      <div id="outer-container">
        <MainMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
        <main id="page-wrap">
            <Navigation/>
            <Routes>
            < Route exact path='/' element={<Login />} />
            < Route exact path='/agent-register' element={<AgentRegister />} />
            < Route exact path='/payee-register' element={<PayeeRegister />} />
            < Route exact path='/checkout' element={<Checkout />} />
            < Route exact path='/paygate' element={<CheckoutPage />} />
            < Route exact path='/dashboard' element={<Dashboard />} />
            < Route exact path='/payee-table' element={<PayeeTable />} />
            < Route exact path='/payment-table' element={<PaymentsTable />} />
            < Route exact path='/agent-table' element={<AgentTable />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
