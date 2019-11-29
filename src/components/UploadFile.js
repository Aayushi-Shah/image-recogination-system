import React, { Component } from 'react';
import file from '../images/file.svg'
// import Dropzone from 'react-dropzone'
import MyDropzone from './DropZone'

export default class UploadFile extends Component{
    render(){
        return <React.Fragment>
            <div className=" d-flex justify-content-center align-items-center top">
                <div className="file-area">
                    <div className="d-flex justify-content-center main-text">
                        <b>Add Your File Here</b>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src={file} alt="Upload File" className="file-image"/>
                    </div>
                    <MyDropzone></MyDropzone>
                </div>
            </div>
            <div className="bottom">
            </div>
        </React.Fragment>
    }
}
