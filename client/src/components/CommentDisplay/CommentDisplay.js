import React, { Component } from "react";
import UserDisplay from "../UserDisplay/UserDisplay";
import "./commentDisplay.scss";
class CommentDisplay extends Component {
  componentDidMount = () => {
    // setTimeout(() => console.log("display", this.props.comments), 500);
  };

  render() {
    const { _id, creator, photos, msg } = this.props.comments;
    return (
      <div className="post comments box clearfix" data-id={_id}>
        <UserDisplay
          firstName={creator.firstName}
          creatorPhoto={creator.photo}
        />
        {photos ? <img alt="" className="postPhotos" src={photos} /> : null}
        <p className={!photos == "" ? "clearRight description" : "description"}>
          {msg}
        </p>
      </div>
    );
  }
}
export default CommentDisplay;
