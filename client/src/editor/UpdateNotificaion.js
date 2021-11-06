import React from "react";
import "./UpdateMenu.css";
import axios from "axios";
// import AddPop from "./Popup"
import "./updateUser.css";

const baseurl = process.env.REACT_BASEURL;
class UpdateNotification extends React.Component {
  constructor(props) {
    super(props);
    // this.state={
    //     categories:[],
    //     notices:[],
    // }
    this.state = {
      categories: [
        { name: "student", id: 1 },
        { name: "faculty", id: 2 },
        { name: "Admission", id: 3 },
      ],
      selectedCategory:"",
      notices: [
        {
          details:
            "Interview for Appointment of Assistant Professor on Guest basis in the Department of Computer Science, University of Delhi, Delhi (Dated: August 31,2021)",
          ExpiryDate:"20-10-2021",
          newDate:"20-10-2021",
          links: [
            {
              name: "Notice",
              link: "http://cs.du.ac.in/uploads/student/Notice-fee-waiver-Covid-19.jpg",
            },
            {
              name: "Schedule",
              link: "http://cs.du.ac.in/uploads/guest-appointments/Schedule.pdf",
            },
          ],
        },
        {
          details:
            "Interview for Appointment of Assistant Professor on Guest basis in the Department of Computer Science, University of Delhi, Delhi (Dated: August 31,2021)",
            ExpiryDate:"20-10-2021",
            newDate:"20-10-2021",
          links: [
            {
              name: "Notice",
              link: "http://cs.du.ac.in/uploads/student/Notice-fee-waiver-Covid-19.jpg",
            },
            {
              name: "Schedule",
              link: "http://cs.du.ac.in/uploads/guest-appointments/Schedule.pdf",
            },
          ],
        },
        {
          details:
            "Extension of last date of the filling the form for Pre-admission preparation classes for candidates, from lesser privileged sections of the society, applying for Ph.D. (Computer Science) program for the academic year 2021-22 in the Department of Computer Science (Dated: August 24, 2021): ",
            ExpiryDate:"20-10-2021",
            newDate:"20-10-2021",
          links: [
            {
              name: "abendum",
              link: "http://cs.du.ac.in/uploads/admissions/2021-22/PhD/Pre-admission%20preparation%20classes-Call%20for%20Applications-Addendum.pdf",
            },
          ],
        },
        {
          details:
            "Revised Notice for Appointment of Assistant Professor on Guest basis in the Department of Computer Science, University of Delhi, Delhi (Dated: August 17, 2021)",
            ExpiryDate:"20-10-2021",
            newDate:"20-10-2021",
          links: [
            {
              name: "Notice",
              link: "http://cs.du.ac.in/uploads/guest-appointments/Revised-Notice-Guest-Faculty.pdf",
            },
            {
              name: "Link to apply",
              link: "https://docs.google.com/forms/d/e/1FAIpQLSdGby5rdD7yPFEiSISCcxHk9mutN5hTELneIO4wQJs8E0iP3g/viewform",
            },
          ],
        },
      ],
      modifiableNews:{
        id:"",
        links:[],
        detail:"",
        ExpiryDate:"",
        newDate:"",
      }
    };
  }
  fetchNotices = (category) => {
    axios
      .get(baseurl + "api/notification", { category })
      .then((res) => {
        console.log("response recieved");
        console.log(res.data);
        this.setState({ notices: res.data , selectedCategory:category });
        this.reset();
      })
      .catch((err) => console.log("error occurred"));
      
  };
  deleteNotice = (event, id) => {
    event.stopPropagation();
    axios
      .delete(baseurl + "notifications/notification", {
        headers: { authorization: "Bearer " + this.props.authToken },
         data:{ id }})
      .then((res) => {
        alert("notice deleted successfully");
        //   this.fetchNotices()
      })
      .catch((err) => console.log(err));
  };
  addCategory=()=>{
    var category=prompt("Enter name for new category:","New Category");
    axios.post(baseurl+"notifications/category",
      {category},
      { headers: { authorization: "Bearer " + this.props.authToken } }).then(
        (res)=>{
          var categories=this.state.categories;
          categories.push({name:category,id:res.data.id});
          this.setState(categories);
        }
      ).catch((err)=>{
        alert("Can't save");
      })
  }
  deleteCategory=(id)=>{
    axios.delete(baseurl+"notifications/notification",{ headers: { authorization: "Bearer " + this.props.authToken },data:{id}}).then(
      (res)=>{
        var categories=this.state.categories;
        categories=categories.filter((cat)=>cat.id!==id);
        this.setState(categories);
        this.reset();
      }
    )
  }
  selectNews=(event,newsItem)=>{
    event.stopPropagation();
    console.log(newsItem)
    var modifiableNews={};
    modifiableNews.id=newsItem.id;
    modifiableNews.links=JSON.parse(JSON.stringify(newsItem.links));
    modifiableNews.ExpiryDate=newsItem.ExpiryDate;
    modifiableNews.newDate=newsItem.newDate;
    modifiableNews.details=newsItem.details;
    this.setState({modifiableNews});
    console.log(newsItem)
  }
  reset=()=>{
    var modifiableNews={
      id:"",
      links:[],
      details:"",
      ExpiryDate:"",
      newDate:"",
    }
    this.setState({modifiableNews});
  }
  save=()=>{
    if(this.state.modifiableNews.id===""){
      var newNews=this.state.modifiableNews;
      newNews.category=this.state.selectedCategory;
      axios.post(baseurl+"notifications/notification",newNews,
            { headers: { authorization: "Bearer " + this.props.authToken } }).then(
              (res)=>{
                this.fetchNotices(this.state.selectedCategory);
              }
            ).catch(
              (err)=>{
                alert("error occurred");
              }
            )
    }
    else{
      axios.put(baseurl+"notifications/notification",this.state.modifiableNews,
            { headers: { authorization: "Bearer " + this.props.authToken } }).then(
              (res)=>{
                this.fetchNotices(this.state.selectedCategory);
              }
            ).catch(
              (err)=>{
                alert("error occurred");
              }
            )
    }
    
  }
  /*ComponentDidMount(){
        axios.get(baseurl).then(
            res=>{
                this.setState({oldMenu:res.data.Menu}); //change name of data object as provided in response
                this.setState({newMenu:oldMenu});
            }
        )
    }*/
    valueChanged=(event)=>{
      var modifiableNews=this.state.modifiableNews;
      modifiableNews[event.target.name]=event.target.value;
      this.setState({modifiableNews});
    }
    linkChanged=(event,link)=>{
      console.log(link);
      link[event.target.name]=event.target.value;
      this.setState({});
    }
  newLink=()=>{
    var modifiableNews=this.state.modifiableNews;
    modifiableNews.links.push({name:"",link:""});
    this.setState({modifiableNews});
  }
  deleteLink=(index)=>{
    var modifiableNews=this.state.modifiableNews;
    modifiableNews.links.splice(index,1);
    this.setState({modifiableNews});
  }
  render() {
    return (
      <div className="Latest-news-modifier">
        <h1>Latest News Modifier</h1>
        <div className="category-container">
          <ul>
            {this.state.categories.map((category) => (
              <li className="category-list-item">
                <button
                  className="category"
                  key={category.id}
                  onClick={(e)=>this.fetchNotices(category.id)}
                  style={category.id===this.state.selectedCategory?{backgroundColor:"lightpink"}:null}
                >
                  {category.name}
                </button>
                <button
                    className="delete-category"
                    onClick={(e) => this.deleteCategory(category.id)}
                  >
                    <img
                      src="https://toppng.com/uploads/preview/free-recycle-bin-icon-vector-recycle-bin-icon-115534132079jvhnualpn.png"
                      alt="delete"
                    />
                  </button>
              </li>
            ))}
            <li>
              <button className="add-new" onClick={(e)=>this.addCategory()}>&#43;</button>
            </li>
          </ul>
        </div>
        <div className="news">
          <div className="editor-news-item">
            <div className="news-detail"><label>Detail</label></div>
            <div className="news-links"><label>Links</label></div>
            <div className="news-dates"><label>New Date</label></div>
            <div className="news-dates"><label>Expiry Date</label></div>
            <div></div>
          </div>
          {this.state.notices.map((item, index) => {
            return (
              <div className="news-item editor-news-item" onClick={(e)=>this.selectNews(e,item)}>
                <div className="news-detail">
                  <p>{item.details}</p>
                </div>
                <div className="news-links">
                  <ul>
                  {item.links.map((link) => (
                    <li><a target="_blank" href={link.link}>
                      {link.name}
                    </a></li>
                  ))}</ul>
                </div>
                <div className="news-dates">{item.newDate}</div>
                <div className="news-dates">{item.ExpiryDate}</div>
                <div className="news-delete">
                  <button
                    className="delete-news"
                    onClick={(e) => this.deleteNotice(e, item.id)}
                  >
                    <img
                      src="https://toppng.com/uploads/preview/free-recycle-bin-icon-vector-recycle-bin-icon-115534132079jvhnualpn.png"
                      alt="delete"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="modifiable-news">
          <h2>Add or edit news</h2>
          <div>
            <label>Detail
            <input type="text" name="details" value={this.state.modifiableNews.details} onChange={(e)=>this.valueChanged(e)}/>
            </label>
            
            <label>Expiry Date
            <input type="date" name="ExpiryDate" value={this.state.modifiableNews.ExpiryDate} onChange={(e)=>this.valueChanged(e)}/>
            </label>
            
            <label>New Date
            <input type="date" name="newDate" value={this.state.modifiableNews.newDate} onChange={(e)=>this.valueChanged(e)}/>
            </label>
            
            <label>Links
            <button className="add-new" onClick={(e)=>this.newLink()}>&#43;</button>
            </label>
            <div >
              <input value="Name" style={{border:"none"}}/>
              <input value="Link" style={{border:"none"}}/>
            </div>
            {
              this.state.modifiableNews.links.map((link,index)=>{return <div className="links-display">
                <input type="text" name="name" value={link.name} onChange={(e)=>this.linkChanged(e,link)}/>
                <input type="text" name="link" value={link.link} onChange={(e)=>this.linkChanged(e,link)}/>
                <div className="delete-links">
                  <button
                    className="delete-news"
                    onClick={(e) => this.deleteLink(index)}
                  >
                    <img
                      src="https://toppng.com/uploads/preview/free-recycle-bin-icon-vector-recycle-bin-icon-115534132079jvhnualpn.png"
                      alt="delete"
                    />
                  </button>
                </div>
              </div>})
            }
          </div>
          <button onClick={(e)=>this.reset()}>Reset</button>
          <button onClick={(e)=>this.save()}>Save</button>
        </div>
      </div>
    );
  }
}

export default UpdateNotification;
