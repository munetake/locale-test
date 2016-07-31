import React, { Component } from "react";
import LocaleList from "./LocaleList.react"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotationStart: false,
      quotationEnd: false,
      alternateQuotationStart: false,
      alternateQuotationEnd: false,
      dedupeChecked: false,
    };
    this._handleChange = this._handleChange.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
  }

  _handleChange(event) {
    this.setState({ propertyValue: event.target.value });
  }

  _handleCheck(event) {
    let obj = {}
    obj[event.target.name] = event.target.checked;
    this.setState(obj)
  }

  render() {
    const {
      quotationStart,
      quotationEnd,
      alternateQuotationStart,
      alternateQuotationEnd,
      dedupeChecked,
    } = this.state;
    return (
      <div className="container">
        <h2>Property Locale Test</h2>
          <div className="form-group property-form">
            <h4>Select Properties</h4>
            <label className="checkbox-inline"><input type="checkbox" name="quotationStart" checked={quotationStart} onClick={this._handleCheck} />quotationStart</label>
            <label className="checkbox-inline"><input type="checkbox" name="quotationEnd" checked={quotationEnd} onClick={this._handleCheck}  />quotationEnd</label>
            <label className="checkbox-inline"><input type="checkbox" name="alternateQuotationStart" checked={alternateQuotationStart} onClick={this._handleCheck}  />alternateQuotationStart</label>
            <label className="checkbox-inline"><input type="checkbox" name="alternateQuotationEnd" checked={alternateQuotationEnd} onClick={this._handleCheck}  />alternateQuotationEnd</label>
            <h4>Dedupe Data:</h4>
            <label className="checkbox-inline"><input type="checkbox" name="dedupeChecked" checked={dedupeChecked} onClick={this._handleCheck}  />Dedupe Data?</label>
          </div>
        <LocaleList settings={this.state} dedupe={dedupeChecked}/>
      </div>
    );
  }
}
