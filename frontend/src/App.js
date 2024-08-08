import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />}/>
          <Route path="/register" element={<Registration />}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
