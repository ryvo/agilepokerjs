import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

function App() {
  return (
    <Container className="w-50 text-center">
      <Row id="header" className="w-50 justify-content-center w-100 p-4">
        <Image src="images/AgilePokerJS.svg" />
      </Row>
      <Row id="content">
        <Provider store={store}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Dashboard />}/>
              <Route path="/register" element={<Registration />}/>
            </Routes>
          </Router>
        </Provider>
      </Row>
    </Container>
  );
}

export default App;
