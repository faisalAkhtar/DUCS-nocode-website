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
    notices: [
      {
        details:
          "Interview for Appointment of Assistant Professor on Guest basis in the Department of Computer Science, University of Delhi, Delhi (Dated: August 31,2021)",
        isNew: true,
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
        isNew: true,
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
        isNew: true,
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
        isNew: false,
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
  };
  componentDidMount() {
    axios
      .get(baseurl + "api/categories")
      .then((res) => {
        console.log("response categories recieved");
        console.log(res.data);
        this.setState({ categories: res.data });
      })
      .catch((err) => console.log(err));
    if (this.state.categories.length > 0)
      this.fetchNotices(this.state.categories[0].id);
  }
  fetchNotices = (category) => {
    axios
      .get(baseurl + "api/notification", { category })
      .then((res) => {
        console.log("response recieved");
        console.log(res.data);
        this.setState({ notices: res.data,selectedCategory:category });
      })
      .catch((err) => console.log(err));
  };
  displayNew = () => {
    return null;
  };
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
                  onClick={(e)=>this.fetchNotices(category.id)}
                  style={category.id===this.state.selectedCategory?{backgroundColor:"lightpink"}:null}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="news">
          {this.state.notices.map((item, index) => {
            return (
              <div className="news-item">
                <p>{item.details}</p>
                {item.links.map((link) => (
                  <a target="_blank" href={link.link}>
                    {link.name}
                  </a>
                ))}
                {item.isNew ? this.displayNew() : null}
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