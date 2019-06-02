import axios from "axios";

export const login = user => {
  return axios
    .post("http://localhost:5000/login", user)
    .then(res => {
      if (res.data !== "incorrect username or password") {
        localStorage.setItem("usertoken", res.data[0].user_id);

        return res.data[0].user_id;
      } else {
        return res;
      }
    })
    .catch(err => {
      return err;
    });
};

export const register = newuser => {
  return axios.post("http://localhost:5000/user/add", newuser).then(res => {
    console.log("Registered");
    return res;
  });
};

export const user_info = id => {
  return axios
    .get("http://localhost:5000/user_info", {
      params: { user_id: id }
    })
    .then(res => {
      return res.data[0];
    });
};

export const part_info = (info, table, id) => {
  return axios
    .get("http://localhost:5000/part_info", {
      params: {
        info: info,
        table: table,
        id: id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const check_follow_db = (user1, user2) => {
  return axios
    .get("http://localhost:5000/check_follow", {
      params: {
        user1: user1,
        user2: user2
      }
    })
    .then(res => {
      return res.data;
    });
};

export const follow = (user1, user2) => {
  return axios
    .get("http://localhost:5000/follow", {
      params: {
        user1: user1,
        user2: user2
      }
    })
    .then(res => {
      console.log(res);
      return res.data;
    });
};

export const unfollow = (user1, user2) => {
  return axios
    .delete("http://localhost:5000/unfollow", {
      params: {
        user1: user1,
        user2: user2
      }
    })
    .then(res => {
      console.log(res);
      return res.data;
    });
};

export const getusers = () => {
  return axios.get("http://localhost:5000/get_users").then(res => {
    return res.data;
  });
};

export const all_images = id => {
  return axios
    .get("http://localhost:5000/all_images", {
      params: {
        id: id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const check_like = (user_id, image_id) => {
  return axios
    .get("http://localhost:5000/check_like", {
      params: {
        user_id: user_id,
        image_id: image_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const count_like = image_id => {
  return axios
    .get("http://localhost:5000/count_like", {
      params: {
        image_id: image_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const add_like = (image_id, user_id) => {
  console.log(image_id, user_id);
  return axios
    .get("http://localhost:5000/add_like", {
      params: {
        image_id: image_id,
        user_id: user_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const remove_like = (image_id, user_id) => {
  return axios
    .delete("http://localhost:5000/remove_like", {
      params: {
        image_id: image_id,
        user_id: user_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const add_comment = (comm, image_id, user_id) => {
  return axios
    .get("http://localhost:5000/add_comment", {
      params: {
        comm: comm,
        image_id: image_id,
        user_id: user_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const count_comment = image_id => {
  return axios
    .get("http://localhost:5000/count_comment", {
      params: {
        image_id: image_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const get_comments = image_id => {
  return axios
    .get("http://localhost:5000/get_comments", {
      params: {
        image_id: image_id
      }
    })
    .then(res => {
      return res.data;
    });
};

export const add_image = (user_id, image, date) => {
  return axios
    .post("http://localhost:5000/image", {
      id: user_id,
      image: image,
      date: date
    })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};
