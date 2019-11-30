import React, { Component, Fragment } from "react";
import axios from 'axios';
import Dropzone from "react-dropzone";
import classNames from 'classnames'

export default class MyDropzone extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          files: [],
          disabled: false
        };
      }

      handleSubmit = async () =>{
      this.setState({disabled: true})
      let file = this.state.files[0];
      let data = new FormData();
      data.append('document', file);
      try{
        const respone = await axios.post(`http://localhost:8000/file/upload/`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      catch(e){
        console.log("$$$$$$$$$$$$$$$$$$$$", e)
      }
      this.setState({disabled: false})
    }

      onPreviewDrop = (files) => {
        files.map(file => {
          file.preview = URL.createObjectURL(file)
          this.setState({files : this.state.files.concat(file)})
        })
      }
    
      render() {
        const previewStyle = {
            display: 'inline',
            width: 100,
            height: 100,
          };

        return (
          <div className="mt-4">
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
              <button disabled={this.state.disabled} type="submit" onClick={this.handleSubmit} className={!this.state.disabled? "proceed-button d-flex justify-content-center align-items-center": "btn-disabled d-flex justify-content-center align-items-center"} ><i className={this.state.disabled? "fa fa-spinner fa-spin mr-2": ""}></i><b>Proceed</b></button>
            </div>
          </Fragment>
        }
          </div>
        );
      }
}
