import axios from "axios";

let URL;
if (process.env.NODE_ENV === "production") {
  URL = "https://contest-track.herokuapp.com/api/";
} else {
  URL = "http://localhost:5000/api/";
}

export default axios.create({
  baseURL: URL,
});
