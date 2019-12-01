import React, { Component } from "react";

export default class MyViewZone extends Component{
      render(){
          return(
              <React.Fragment>
                  <div className="top-header d-flex justify-content-center align-items-center">
                        <span className="back-font" onClick={this.props.resetUpload}>Back</span>
                        <span className="top-font"><b>Image Recoginzation Result</b></span>
                  </div>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                        <img src={this.props.response.url} alt="image" className="uploaded-image"></img>
                        <div className="text-data d-flex justify-content-center align-items-center"><span className="drag-content">{this.props.response.text?this.props.response.text: "No Text Found" }</span></div>
                  </div>
              </React.Fragment>
          )
      }

}