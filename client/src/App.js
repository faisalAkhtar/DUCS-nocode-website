import Menu from './default/Menu'
import Header from './default/Header';
import Footer from './default/Footer';
import Page from './default/Page';
//import Notifications from './default/Notifications';
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
