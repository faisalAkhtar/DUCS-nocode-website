import React from "react";
import "./UpdateMenu.css";
import axios from "axios";
// import AddPop from "./Popup"
import "./updateUser.css";

const baseurl = "http://localhost:5000/";
class UpdateNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory:"",
      notices: [],
      modifiableNews:{
        id:"",
        links:[],
        detail:"",
        expiryDate:"",
        newDate:"",
      }
    };
  }
  fetchNotices = (category) => {
    axios
      .get(baseurl + "api/notifications/"+category)
      .then((res) => {
        this.setState({ notices: res.data , selectedCategory:category });
        this.reset();
      })
      .catch((err) => {
        console.log("error occurred");
      alert("some error occured please reload !!!");
    });  
  };
  deleteNotice = (event, id) => {
    event.stopPropagation();
    axios
      .delete(baseurl + "notifications/notification", {
        headers: { authorization: "Bearer " + this.props.authToken },
         data:{ id ,category:this.state.selectedCategory}})
      .then((res) => {
        alert("notice deleted successfully");
        this.fetchNotices(this.state.selectedCategory);
      })
      .catch((err) => console.log(err.response.data));
  };
  addCategory=()=>{
    var category=prompt("Enter name for new category:","New Category");
    axios.post(baseurl+"notifications/category",
      {category},
      { headers: { authorization: "Bearer " + this.props.authToken } }).then(
        (res)=>{
          var categories=this.state.categories;
          categories.push(res.data);
          this.setState(categories);
          alert("Category added successfully")
        }
      ).catch((err)=>{
        alert("Can't save");
      })
  }
  deleteCategory=(id)=>{
    axios.delete(baseurl+"notifications/category/"+id,{ headers: { authorization: "Bearer " + this.props.authToken }}).then(
      (res)=>{
        var categories=this.state.categories;
        categories=categories.filter((cat)=>cat.id!==id);
        this.setState({categories},()=>{console.log(this.state.categories);this.render();});
        this.reset();
        alert("Delete Success");
      }
    ).catch(
      (err)=>console.log(err.response.data)
    )
  }
  selectNews=(event,newsItem)=>{
    event.stopPropagation();
    //console.log(newsItem)
    var modifiableNews={};
    modifiableNews.id=newsItem.id;
    modifiableNews.links=JSON.parse(JSON.stringify(newsItem.links));
    modifiableNews.expiryDate=newsItem.expiryDate;
    modifiableNews.newDate=newsItem.newDate;
    modifiableNews.details=newsItem.details;
    this.setState({modifiableNews});
    //console.log(newsItem)
  }
  reset=()=>{
    var modifiableNews={
      id:"",
      links:[],
      details:"",
      expiryDate:"",
      newDate:"",
    }
    this.setState({modifiableNews});
  }
  save=()=>{
    var newNews=this.state.modifiableNews;
      newNews.category=this.state.selectedCategory;
    if(this.state.modifiableNews.id===""){
      axios.post(baseurl+"notifications/notification",newNews,
            { headers: { authorization: "Bearer " + this.props.authToken } }).then(
              (res)=>{
                this.fetchNotices(this.state.selectedCategory);
                alert("Saved")
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
                console.log(err.response.data)
                alert("error occurred");
              }
            )
    }
    
  }
  componentDidMount(){
        axios.get(baseurl+"api/categories").then(
            res=>{
                this.setState({categories:res.data,selectedCategory:res.data[0]}); 
                this.fetchNotices(res.data[0].category);
            }
        ).catch(
          (err)=>console.log(err.response.data)
        )
    }
    valueChanged=(event)=>{
      var modifiableNews=this.state.modifiableNews;
      modifiableNews[event.target.name]=event.target.value;
      this.setState({modifiableNews});
    }
    linkChanged=(event,link)=>{
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
                  onClick={(e)=>this.fetchNotices(category.category)}
                  style={category.id===this.state.selectedCategory?{backgroundColor:"lightpink"}:null}
                >
                  {category.category}
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
                <div className="news-dates">{item.expiryDate}</div>
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
            <input type="date" name="expiryDate" value={this.state.modifiableNews.expiryDate} onChange={(e)=>this.valueChanged(e)}/>
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
