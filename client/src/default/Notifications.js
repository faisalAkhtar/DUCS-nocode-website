import React from "react";
import axios from "axios";

const baseurl = "http://localhost:5000/";
class Notification extends React.Component {
  state = {
    categories: [
      { name: "student", id: 1 },
      { name: "faculty", id: 2 },
      { name: "Admission", id: 3 },
    ],
    selectedCategory:"",
    notices: [],
  };
  componentDidMount() {
    axios
      .get(baseurl + "api/categories")
      .then((res) => {
        console.log("response categories recieved");
        console.log(res.data);
        this.setState({ categories: res.data });
        console.log(this.state.categories)
        this.fetchNotices(res.data[0].category);
      })
      .catch((err) => console.log(err));
      
      
  }
  fetchNotices = (category) => {
    axios
      .get(baseurl + "api/notifications/"+category)
      .then((res) => {
        console.log("response recieved");
        console.log(res.data);
        this.setState({ notices: res.data,selectedCategory:category });
      })
      .catch((err) => console.log(err));
  };
  displayNew = () => {
    return <img style={ {width:"50px",height:"25px",float:"right"}} src="https://www.insarag.org/wp-content/uploads/2016/06/new-gif-image-6.gif" alt="New"/>;
  };
  getDate=()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  }
  render() {
    return (
      <div className="news-container">
        <div className="latest-news">
          <h2>Latest-News</h2>
        </div>
        <div className="category-container">
          <ul>
            {this.state.categories.map((category) => (
              <li>
                <button
                  className="category"
                  key={category.id}
                  onClick={(e)=>this.fetchNotices(category.category)}
                  style={category.category===this.state.selectedCategory?{backgroundColor:"#e0bcee"}:null}
                >
                  {category.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="news">
          {this.state.notices.map((item, index) => {
            return (
              <div className="news-item">
                <p style={{display:"inline"}}>{item.details}</p>
                {item.links.map((link) => (
                  <a target="_blank" href={link.link}>
                    {link.name}
                  </a>
                ))}
                {item.newDate>this.getDate() ? this.displayNew() : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Notification;

/*
its already sorted
details
links []={name,link}
isnew
*/
/*
[{name,id}]
*/
/*/api/notifications category in body
 */
/* work remaining
  new link addition
  link deletion
  */