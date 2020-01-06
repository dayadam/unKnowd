import React, { Component } from "react";

class Event extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get("/api/events")
      .then(res => this.setState({ events: res.data }))
      .cach(err => console.log(err));
  };

  render() {
    return (
      <div className="events box">
        <h2>{this.props.title}</h2>
        <div className="postPhotos">{this.props.img}</div>
        <p className="description">{this.props.description}</p>
        <span className="dates">
          {this.props.date.start} - {this.props.date.end}
        </span>
        <div className="username">{this.props.creator.firstName}</div>
        <div className="userphoto">{this.props.creator.photo}</div>
      </div>
    );
  }
}

export default Event;