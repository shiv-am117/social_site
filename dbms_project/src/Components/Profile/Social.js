import React, { Component } from "react";
import Like_comment from "./like_comment";
import { all_images } from "../UserFunctions";

class My_images extends Component {
  state = {
    user: {},
    myphotos: []
  };

  show_image = buf => {
    var binstr = Array.prototype.map
      .call(buf, function(ch) {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  };
  getimages = () => {
    all_images(localStorage.usertoken).then(res => {
      if (res) {
        this.setState({
          myphotos: res
        });
      }
    });
  };
  componentDidMount() {
    if (localStorage.usertoken === undefined) {
      this.props.history.push("/");
    } else {
      this.setState(
        {
          user: { user_id: localStorage.usertoken }
        },
        function() {
          this.getimages();
        }
      );
    }
  }

  render() {
    return (
      <div className="img-wrapper">
        {this.state.myphotos.length >= 1
          ? this.state.myphotos.map(each => (
              <div key={each.image_id}>
                <div className="image">
                  {each.username}
                  <br />
                  <br />
                  <div className="image-cont">
                    <img
                      width="300"
                      height="300"
                      src={`data:image/jpeg;base64,${this.show_image(
                        each.images.data
                      )}`}
                      alt=""
                    />
                  </div>
                  <br />
                  <Like_comment
                    image_id={each.image_id}
                    user_id={this.state.user.user_id}
                  />
                </div>
                <br />
              </div>
            ))
          : "No Photos"}
        <br />
      </div>
    );
  }
}

export default My_images;
