import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import file_image from '../images/file.svg'


export default class MyDropzone extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          files: [],
          disabled: false
        };
      }

      handleSubmit = async() =>{
        this.setState({disabled: true})
        let file = this.state.files[0];
        let data = new FormData();
        data.append('document', file);
        await this.props.callAPI(data)
        this.setState({disabled: false})
      }

      handleCancel = async() =>{
        this.setState({files: []})
      }

      history = async() => {
        await this.props.callHistoryAPI()
      }

      onPreviewDrop = (files) => {
        files.map(file => {
          file.preview = URL.createObjectURL(file)
          this.setState({files : [file]})
        })
      }
    
      render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
            marginLeft: 40,
            marginBottom: 15
          };

        return (
          <Fragment>
            <div className="top-header d-flex justify-content-end align-items-center">
              <span className="history-content" onClick={this.history}><b>Display Previous Results</b></span>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center main-text">
                <b>Upload Your Image Here</b>
                <span className="subscript-font">We will read the text for you</span>
            </div>
            <div className="d-flex justify-content-center">
                <img src={file_image} alt="Upload File" className="file-image"/>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Dropzone 
              onDrop={this.onPreviewDrop.bind(this)}
              accept="image/*"
              multiple={false}
              >
                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                    <div {...getRootProps({className:"dropzone d-flex justify-content-center align-items-center"})}>
                      <input {...getInputProps()} />
                      {!isDragActive ? <span className="drag-content">Drag a file here or <span className="browse">browse</span> for a file to upload</span>: <span className="drag-content">Drop Your File here</span>}
                      {isDragReject && "File type not accepted, sorry!"}
                    </div>
                  )}
              </Dropzone>
              </div>
              {this.state.files.length > 0 &&
            <Fragment>
              <h5 className="ml-5">Preview</h5>
              {this.state.files.map((file) => (
                <img
                  alt="Preview"
                  key={file.preview}
                  src={file.preview}
                  style={previewStyle}
                />
              ))}
              <div className="cancel-button-position"> 
                <button disabled={this.state.disabled} type="submit" onClick={this.handleCancel} className={`d-flex justify-content-center align-items-center ${!this.state.disabled ? "cancel-button": "cancel-button button-click-disabled"}`} ><b>Cancel</b></button>
              </div>
              <div className="proceed-button-position"> 
                <button disabled={this.state.disabled} type="submit" onClick={this.handleSubmit} className={`d-flex justify-content-center align-items-center ${!this.state.disabled ? 'proceed-button' : 'btn-disabled'}`} ><i className={this.state.disabled? "fa fa-spinner fa-spin mr-2": ""}></i><b>Proceed</b></button>
              </div>
            </Fragment>
          }
        </Fragment>
        );
      }
}
