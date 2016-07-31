import React, { Component } from "react";
import Axios from 'axios';

export default class LocaleList extends Component {

  constructor(props) {
    super(props);
    this.state = {response: {}};
    this._setStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this._setStateFromProps(nextProps);
  }

  _setStateFromProps(props) {
    // console.log(props.settings);
    // let queryString = "?";
    // Object.keys(props.settings).forEach((key) => {
    //   if (props.settings[key]) {
    //     queryString += key + "=" + props.settings[key] + "&"
    //   }
    // });
    // queryString = queryString.substring(0, queryString.length-1);
    Axios.get("/api/v0/locales/", {params: props.settings})
      .then((obj) => {
        this.setState({
          response: obj.data.response
        });
      });
  }

  render() {
    let flag = false;
    if (Object.keys(this.state.response).length !== 0) {
      Object.keys(this.state.response["fr"]).map((key, index) => {
        if (this.state.response["fr"][key]) {
          flag = true;
        }
      });
    }
    return (
      <div>
        <h3>Locale List</h3>
        {
          flag ?
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Locale</th>
                  {
                    Object.keys(this.state.response["fr"]).map((name, outerIndex) => {
                      return (
                        <th key={outerIndex}>{name}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
              {
                Object.keys(this.state.response).map((key, index) => {
                  console.log("HERE")
                  return (
                    <tr key={index}>
                    <td>{key}</td>
                    {
                      Object.keys(this.state.response[key]).map((innerKey, innerIndex) => {
                        return (
                          <td key={innerIndex}>{this.state.response[key][innerKey]}</td>
                        )
                      })
                    }
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          :
          null
        }
      </div>
    );
  }
}
