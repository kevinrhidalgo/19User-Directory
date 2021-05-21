import React, { Component } from "react";
import Form from "./Form";
import EmployeeList from "./EmployeeList";
import API from "../utils/API";


const styles = {

  heading: {
    background: "#3f51b5",
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: "1.2rem",
    color: "white"
  },

 listName: {
   background: "lightblue",
},

headerList: {
display: "flex",
justifycontent: "center"
} 

};


class Container extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: ""

  };


  componentDidMount() {
    API.search()
      .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.age,
            key: i
          }))

        })
     
      })
      .catch(err => console.log(err));
  }

  filterEmployees = (searchkey) => {
    console.log("***in Filter*******");
    console.log(searchkey);
    console.log(this.state.result);
  
    var filterResult = this.state.result.filter(person => person.firstName === searchkey)

    this.setState({
      result:filterResult    
    })
  }


  handleFormSubmit = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);
    this.filterEmployees(value);
    this.setState({

      [name]: value

    });
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);

  };


  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);
   
    this.setState({

      [name]: value

    });
        
  };

  render() {

    
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div style={styles.heading}> <h2>Employee Directory</h2> </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Form
              value={this.state.search}
               handleInputChange={this.handleInputChange}
               handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>

        <div className="row" >
        
          <table className="table">
          <div style = {styles.headerList}>  
            <tr>
              <th scope="col">Photo</th>
              <th>First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
            </div>

   
   

            <div style = {styles.listName}>  
            {[...this.state.result].map((item) =>
              <EmployeeList
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                key={item.key}
              />
            )}
            </div>

          </table>
        </div>


      </div>
    );
  }
}

export default Container;