import React, { Component } from "react";
import {
  check_like,
  add_like,
  count_like,
  remove_like,
  add_comment,
  count_comment,
  get_comments
} from "../UserFunctions";
class Like_comment extends Component {
  state = {
    user_id: "",
    image_id: "",
    liked: false,
    comment: "",
    likes: "",
    comments: "",
    all_comments: []
  };
  add_like = (image_id, user_id) => {
    add_like(image_id, user_id).then(res => {
      if (res === true) {
        this.setState({
          ...this.state,
          liked: true,
          likes: this.state.likes + 1
        });
      }
    });
  };
  remove_like = (image_id, user_id) => {
    remove_like(image_id, user_id).then(res => {
      if (res) {
        this.setState({
          ...this.state,
          likes: this.state.likes - 1,
          liked: false
        });
      }
    });
  };
  editComment = e => {
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  };
  Comment = (comm, user_id, image_id) => {
    add_comment(comm, image_id, user_id).then(res => {
      console.log(res);

      this.setState({
        ...this.state,
        comments: this.state.comments + 1,
        comment: ""
      });
    });
  };

  componentDidMount() {
    this.setState(
      {
        image_id: this.props.image_id,
        user_id: this.props.user_id
      },
      function() {
        check_like(this.state.user_id, this.state.image_id).then(res => {
          if (res == true) {
            this.setState({
              ...this.state,
              liked: true
            });
          } else {
            this.setState({
              ...this.state,
              liked: false
            });
          }
        });
        count_like(this.state.image_id).then(res => {
          let likes = res.length ? res[0].c : 0;
          this.setState({
            likes: likes
          });
        });

        count_comment(this.state.image_id).then(res => {
          let comments = res.length ? res[0].c : 0;
          this.setState({
            comments: comments
          });
        });

        get_comments(this.state.image_id).then(res => {
          this.setState({
            all_comments: res
          });
        });
      }
    );
  }
  render() {
    return (
      <div>
        {this.state.likes} likes
        {"  |  "}
        {this.state.comments} comments
        <br />
        {this.state.liked ? (
          <button
            className="button"
            onClick={() =>
              this.remove_like(this.state.image_id, this.state.user_id)
            }
          >
            Remove Like
          </button>
        ) : (
          <button
            className="button"
            onClick={() =>
              this.add_like(this.state.image_id, this.state.user_id)
            }
          >
            Like
          </button>
        )}
        <input
          placeholder="write comment ..."
          value={this.state.comment}
          onChange={e => this.editComment(e)}
        />
        <button
          className="button"
          onClick={() =>
            this.Comment(
              this.state.comment,
              this.state.user_id,
              this.state.image_id
            )
          }
        >
          Comment
        </button>
        <br />
        <u>Comments</u>
        <br />
        {this.state.all_comments.length > 0
          ? this.state.all_comments.map(comm => (
              <div key={comm.comment_id}>
                {comm.username + " : "} {comm.comment}
                <br />
              </div>
            ))
          : ""}
      </div>
    );
  }
}

export default Like_comment;
