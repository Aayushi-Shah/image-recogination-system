import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Dropzone from "react-dropzone";
import request from "superagent";

export default class MyDropzone extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          files: [],
        };
      }

      onPreviewDrop = (files) => {
        this.setState({
          files: this.state.files.concat(files),
         });
      }
    
      render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
          };

        return (
          <div className="text-center mt-5">
            <Dropzone onDrop={this.onPreviewDrop} accept="image/*">
              {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <div {...getRootProps({className:"dropzone d-flex justify-content-center align-items-center"})}>
                  <input {...getInputProps()} />
                  {!isDragActive ? <span className="drag-content">Drag a file here or <span className="browse">browse</span> for a file to upload</span>: <span className="drag-content">Drop Your File here</span>}
                  {isDragReject && "File type not accepted, sorry!"}
                </div>
              )}
            </Dropzone>
            {this.state.files.length > 0 &&
          <Fragment>
            <h5>Previews</h5>
            {this.state.files.map((file) => (
              <img
                alt="Preview"
                key={file.preview}
                src={file.preview}
                style={previewStyle}
              />
            ))}
            <div className="button-position"> 
                        <div className="proceed-button d-flex justify-content-center align-items-center"><b>Proceed</b></div>
                    </div>
          </Fragment>
        }
          </div>
        );
      }
}
