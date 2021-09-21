import Menu from './Menu'
import Header from './Header';
import Footer from './Footer';
import Page from './Page';
import Notifications from './Notifications';
function App() {
  return (
      <div>
        <Header/>
        {console.log(window.location.href)}
        <Menu/>
        <div>
          <Page/>
          {/* <Notifications/> */}
        </div>
        <Footer/>
      </div>
        
  );
}

export default App;
