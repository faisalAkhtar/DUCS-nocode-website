import Menu from './default/Menu'
import Header from './default/Header';
import Footer from './default/Footer';
import Page from './default/Page';
import Notifications from './default/Notifications';

function App() {
  return (
      <div>
        <Header/>
        {console.log(window.location.href)}
        <Menu/>
        <div style={{display:"flex",flexWrap:"wrap",padding:"10px",minHeight:"calc(100vh - 150px - 40px - 300px)"}}>
          <div style={{width:"60%"}}><Page/></div>
          <Notifications/>
        </div>
        <Footer/>
      </div>
        
  );
}

export default App;
