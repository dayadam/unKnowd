import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import Auth from "../utils/Auth";
import axios from "axios";
import socketIOClient from "socket.io-client";

class PostForm extends Component {
  //settting compoent forms initial structure
  state = {
    msg: "",
    creator: "5e13e9c75293fcd9f353d106",
    dateCreated: "",
    photos: ""
  };

  componentDidMount() {}
  // socket = socketIOClient();

  //this gets the value and name of the inputs that triggered the change
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  //want to prevent the default of form submit which is to just refresh the page
  submitHandler = e => {
    e.preventDefault();
    // console.log(Auth.getToken());
    let currentDate = new Date();
    let postData = {
      msg: this.state.msg,
      creator: this.state.creator,
      dateCreated: currentDate
    };
    this.savePost(postData);
  };

  savePost = postData => {
    console.log(postData);
    axios
      .post("/api/post", postData)
      .then(returnedData => {
        // console.log(returnedData);
        // this.socket.emit("new post", {
        //   returnedData
        // });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="postform">
        <form className="event" onSubmit={this.submitHandler}>
          <div className="field">
            <label className="label" htmlFor="msg">
              Message
            </label>
            <input
              type="text"
              name="msg"
              value={this.state.msg}
              onChange={this.changeHandler}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="photo">
              Photo
            </label>
            <div className="control">
              <span id="imageRemove">X</span>
              <input
                className="input"
                name="photo"
                type="file"
                value={this.state.photos}
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <button className="button is-primary is-small" type="submit">
            Post!
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
