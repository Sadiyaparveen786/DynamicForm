import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    
    current: {}
  };

  onSubmit = model => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter(d => {
        return d.id != model.id;
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }

    this.setState({
      data: [model, ...data],
      current: {} // todo
    });
  };

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id;
    });
    //alert(JSON.stringify(record));
    this.setState({
      current: record
    });
  };

  onNewClick = e => {
    this.setState({
      current: {}
    });
  };

  render() {
    let data = this.state.data.map(d => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.age}</td>
          <td>{d.qualification}</td>
          <td>{d.gender}</td>
          <td>{d.rating}</td>
          <td>{d.city}</td>
          <td>{d.skills && d.skills.join(",")}</td>
          <td>
            <button
              onClick={() => {
                this.onEdit(d.id);
              }}
            >
              edit
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
        <div className="form-actions">
          <button onClick={this.onNewClick} type="submit">
            NEW
          </button>
        </div>
        <DynamicForm
          key={this.state.current.id}
          className="form"
          title="Registration"
          defaultValues={this.state.current}
          model={[
            { key: "Full  name", label: "Name", props: { required: true } },
            { key: "Email", label: "Email", type: "text" },
            {
              key: "Survey Topic",
              label: "Survey Topic",
              type: "select",
              options: [
                { key: "Technology", label: "Technology", value: "Technology" },
                { key: "Health", label: "Health", value: "Health" },
                { key: "Education", label: "Education", value: "Education" }
              ]
            },
            {
              key: "Technology",
              label: "Technology",
              type: "select",
              options: [
                { key: "JavaScript", label: "JavaScript", value: "JavaScipt" },
                { key: "C++", label: "C++", value: "C++" },
                { key: "Python", label: "Python", value: "Python" }
              ]
            },
            {
              key: "Excercise Frequency",
              label: "Excercise Frequency",
              type: "select",
              options: [
                { key: "Daily", label: "Daily", value: "Daily" },
                { key: "weekly", label: "weekly", value: "weekly" },
                { key: "monthly", label: "monthly", value: "monthly" },
                { key: "rarely", label: "rarely", value: "rarely" }
              ] 
            },
            {
              key: "Diet Preference",
              label: "Diet Preference",
              type: "select",
              options: [
                { key: "Vegetarian", label: "Vegetarian", value: "Vegetarian" },
                { key: "Vegan", label: "Vegan", value: "Vegan" },
                { key: "Non-Veg", label: "Non-Veg", value: "Non-Veg" },
                
              ] 
            },
            {
              key: "Highest Qualification",
              label: "High School",
              type: "select",
              options: [
                { key: "High School", label: "High School", value: "High School" },
                { key: "Bachelor's", label: "Bachelor's", value: "Bachelor's" },
                { key: "Master's", label: "Master's", value: "Master's" },
                { key: "PhD", label: "PhD", value: "PhD" },
                
              ] 
            },
            
           
           
          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default App;