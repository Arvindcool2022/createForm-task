import './app.scss';
import Body from './components/Body';
import Header from './components/Header';

function App() {
  console.log("didn't use [screen-1.0]. created offcanvas manually");
  return (
    <main>
      {/* header
    body
    absolute side nav
    inside that a option comp with dropdown
    */}
      <Header />
      <Body />
    </main>
  );
}

export default App;
