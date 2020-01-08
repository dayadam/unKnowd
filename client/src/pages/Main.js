import React from "react";
import axios from "axios";
import Post from "../components/Post";
import Event from "../components/Event";
import Postform from "../components/PostForm";
import authenticatedAxios from "../utils/AuthenticatedAxios";

// import Nav from "../components/Nav";
import socketIOClient from "socket.io-client";

class Mainpage extends React.Component {
  state = {
    posts: [],
    events: [],
    user: "",
    eventShow: false,
    formShow: false
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    this.getPosts();
    this.getEvents();
    const socket = socketIOClient("http://127.0.0.1:3001");
    // socket.on("new post", data => console.log(data));

    socket.on("new post", post => {
      console.log(post);
      this.setState({
        posts: [post, ...this.state.posts]
      });
    });

    const token = localStorage.getItem("token");
    if (token) {
      authenticatedAxios.get("/api/me").then(response => {
        console.log(response.data);
        this.setUser(response.data);
        console.log(this.state.user);
      });
    }

    // this.socket.on("new event", event => {
    //   this.setState({
    //     events: [event, ...this.state.events]
    //   });
    // });

    //
    // this.socket.on("new test", console.log);
  }

  componentWillUnmount() {
    this.socket.close();
  }

  getPosts = () => {
    axios
      .get("/api/posts")
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  };

  getEvents = () => {
    axios
      .get("/api/events")
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  };

  changeView = () => {
    this.setState({ eventShow: !this.state.eventShow });
  };

  viewForm = () => {
    this.setState({ formShow: !this.state.formShow });
  };

  render() {
    return (
      <div className="container main">
        <nav>
          <button
            className="button is-primary is-small"
            id="viewChange"
            onClick={this.changeView}
          >
            {this.state.eventShow ? "View Posts" : "View Events"}
          </button>
          <button
            className="button is-primary is-small"
            id="formButton"
            onClick={this.viewForm}
          >
            {this.state.formShow ? "close" : "Make a Post"}
          </button>
        </nav>
        <div>{this.state.formShow ? <Postform /> : null}</div>
        <div className="columns">
          <div className="column posts">
            {!this.state.eventShow
              ? this.state.posts.map(post => (
                  <Post
                    key={post._id}
                    msg={post.msg}
                    photos={post.photos[0]}
                    firstName={post.creator.firstName}
                    creatorPhoto={post.creator.photo}
                  />
                ))
              : this.state.events.map(event => <Event key={event._id} />)}
          </div>
          <div className="column events"></div>
        </div>
      </div>
    );
  }
}

export default Mainpage;