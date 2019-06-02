import React, { Component } from "react";
import Like_comment from "./like_comment";
import { part_info, add_image } from "../UserFunctions";
class My_images extends Component {
  state = {
    user: {},
    myphotos: [],
    add_image: ""
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
    part_info("*", "image", localStorage.usertoken).then(res => {
      if (res) {
        this.setState({
          myphotos: res
        });
      }
    });
  };

  encodeImageFileAsURL = () => {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    console.log(filesSelected);
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = fileLoadedEvent => {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        srcData = srcData.substring(srcData.indexOf(",") + 1, srcData.length);

        /* const buffer = Buffer.from(srcData, "base64");
        let bufString = buffer.toString("hex");
        bufString = "0x" + bufString;
        console.log(bufString);*/
        this.setState({
          ...this.state,
          add_image: srcData
        });
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };
  get_date = () => {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    return y + "-" + m + "-" + d;
  };
  add = () => {
    let date = this.get_date();
    console.log(date);
    add_image(this.state.user.user_id, this.state.add_image, date);
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
        <input
          id="inputFileToLoad"
          type="file"
          onChange={() => this.encodeImageFileAsURL()}
        />
        <button className="button" onClick={() => this.add()}>
          Add
        </button>
      </div>
    );
  }
}

export default My_images;
