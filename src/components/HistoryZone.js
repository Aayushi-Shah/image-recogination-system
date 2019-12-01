import React, { Component } from "react";

export default class MyHistoryZone extends Component{
    render(){
        const history_data = this.props.response
        return(
            <React.Fragment>
                  <div className="top-header d-flex justify-content-center align-items-center">
                        <span className="back-font" onClick={this.props.resetHistory}>Back</span>
                        <span className="top-font"><b>Previous Results</b></span>
                  </div>
                  <div className="scroll-bar">
                      {history_data.map(res => (
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <img src={res.url} alt="image" className="uploaded-image"></img>
                            <div className="text-data d-flex justify-content-center align-items-center"><span className="drag-content">{res.data?res.data: "No Text Found" }</span></div>
                        </div>
                     ))} 
                  
                  </div>
            </React.Fragment>
        )
    }
}