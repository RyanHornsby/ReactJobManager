import {React} from 'react';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import JobsBody from './components/JobsBody';


const App = () => {
  return (
    <div className="App">
      <Header />
      <JobsBody />
      <Footer />
    </div>
  );
};

export default App;