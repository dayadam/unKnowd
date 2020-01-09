import React, { Component } from "react";

class Event extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    console.log(this.props.eventData);
  }

  //   getPosts = () => {
  //     axios
  //       .get("/api/events")
  //       .then(res => this.setState({ events: res.data }))
  //       .cach(err => console.log(err));
  //   };

  render() {
    const { title, img, description, date, creator } = this.props.eventData;
    return (
      <div className="events box">
        <h2>{title}</h2>
        <div className="postPhotos">{img}</div>
        <p className="description">{description}</p>
        <span className="dates">
          {date.start} - {date.end}
        </span>
        <div className="username">{creator.firstName}</div>
        <div className="userphoto">photo</div>
      </div>
    );
  }
}

export default Event;
