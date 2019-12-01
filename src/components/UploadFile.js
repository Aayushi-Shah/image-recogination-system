import React, { Component } from 'react';
import Dropzone from './DropZone'
import ViewZone from './ViewZone'
import HistroyZone from './HistoryZone'
import axios from 'axios';


export default class UploadFile extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          upload: true,
          upload_response: {},
          history: false,
          history_response: {}
        };
      }

    callAPI = async(data) => {
        try{
            const res = await axios.post(`http://localhost:8000/file/upload/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            let res_data = res.data
            this.setState({upload: false, upload_response: res_data})
        }catch(e){
            console.log(e)
        }
    }

    callHistoryAPI = async() => {
        try{
            const res = await axios.get(`http://localhost:8000/file/history/`)
            let res_data = res.data
            this.setState({history: true, history_response: res_data})
        }catch(e){
            console.log(e)
        }
    }

    resetUpload = () => {
        this.setState({upload: true})
    }

    resetHistory = () => {
        this.setState({history : false})
    }

    render(){
        return <React.Fragment>
            <div className=" d-flex justify-content-center align-items-center top">
                <div className="main-area">
                    {this.state.history?
                        <HistroyZone response={this.state.history_response} resetHistory={this.resetHistory}></HistroyZone>
                    :
                        this.state.upload? 
                        <Dropzone callAPI={this.callAPI} callHistoryAPI={this.callHistoryAPI}></Dropzone>
                        : <ViewZone response={this.state.upload_response} resetUpload={this.resetUpload}></ViewZone>
                    }
                    
                </div>
            </div>
            <div className="bottom">
            </div>
        </React.Fragment>
    }
}
