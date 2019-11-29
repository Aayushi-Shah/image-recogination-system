import React, { Component } from 'react';
import file from './images/file.svg'

class UploadFile extends Component{
    render(){
        return <React.Fragment>
            <div className=" d-flex justify-content-center align-items-center top">
                <div className="file-area">
                    <div className="file-area-header d-flex justify-content-end align-items-center">
                        <p className="button"><b>Proceed</b></p>
                    </div>
                    <div className="d-flex justify-content-center main-text">
                        <b>Add Your File Here</b>
                    </div>
                    <div>
                        <img src={file} alt="Upload File"/>
                    </div>
                </div>
            </div>
            <div className="bottom">

            </div>
        </React.Fragment>
    }
}

export default UploadFile