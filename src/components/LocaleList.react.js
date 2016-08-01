import React, { Component } from "react";
import Axios from 'axios';

export default class LocaleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: {}
    };
    this._setStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this._setStateFromProps(nextProps);
  }

  _setStateFromProps(props) {
    const {
      settings,
      dedupe,
    } = props;
    Axios.get("/api/v0/locales/", {params: settings})
      .then((obj) => {
        this.setState({
          response: obj.data.response,
          dedupe,
        });
      }
    );
  }

  render() {
    let flag = false;
    if (Object.keys(this.state.response).length !== 0) {
      Object.keys(this.state.response["fr"]).map((key, index) => {
        if (this.state.response["fr"][key] && key !== "dedupeChecked") {
          flag = true;
        }
      });
    }
    let dupeData = {}
    if (this.state.dedupe === true && Object.keys(this.state.response).length !== 0) {
      Object.keys(this.state.response["fr"]).map((key) => {
        if(key !== "dedupeChecked") {
          dupeData[key] = {}
        }
      })
      Object.keys(this.state.response).map((key) => {
        Object.keys(dupeData).map((property) => {
          if (dupeData[property].hasOwnProperty(this.state.response[key][property])) {
            dupeData[property][this.state.response[key][property]].push(key);
          }
          else {
            dupeData[property][this.state.response[key][property]] = [];
            dupeData[property][this.state.response[key][property]].push(key);
          }
        });
      });
    }

    return (
      <div>
        <h3>Locale List</h3>
        {
          flag && this.state.dedupe === false ?
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
                  return (
                    <tr key={index}>
                      <td>
                        {key}
                      </td>
                      {
                        Object.keys(this.state.response[key]).map((innerKey, innerIndex) => {
                          return (
                            <td key={innerIndex}>
                              {this.state.response[key][innerKey]}
                            </td>
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
        {
          flag && this.state.dedupe ?
              <div>
              {
                Object.keys(dupeData).map((property, outerIndex) => {
                  return (
                    <table
                      key={outerIndex}
                      className="table table-striped table-bordered"
                    >
                      <thead>
                        <tr>
                          <th>{property}</th>
                          <th>Countries</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        Object.keys(dupeData[property]).map((symbol, index) => {
                          return (
                            <tr key={index}>
                              <td>{symbol}</td>
                              <td>
                                {
                                  dupeData[property][symbol].map((country, innerIndex) => {
                                    return (
                                      <text key={innerIndex}>{country}&nbsp;</text>
                                    )
                                  })
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                    </table>
                  )
                })
              }
              </div>
            :
            null
        }
      </div>
    );
  }
}
