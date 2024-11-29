import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Content from './components/Content';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router';
import { ThemeProvider } from 'react-bootstrap';

function App() {
  return (
    <ThemeProvider
      breakpoints={['xl','lg','md','sm']}
      minBreakpoint="sm"
    >
      <Container className="w-80 text-center">
        <Row id="header" className="w-50 justify-content-center w-100 p-4">
          {/*<Image src="images/AgilePokerJS.svg" />*/}
        </Row>
        <Row id="content">
          <Provider store={store}>
            <Router>
              <Routes>
                <Route path='/registration' element={<Registration />}/>
                <Route exact path='/' element={<Content />}>
                  <Route index element={<Navigate to='dashboard' replace />} />
                  <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Route>
              </Routes>
            </Router>
          </Provider>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
