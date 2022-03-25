import './App.css';
import Router from './routes';
import { Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Collab Tasker
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Router />
    </div>
  );
}

export default App;
