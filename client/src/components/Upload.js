import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", image.data);
    await fetch("https://dndpal.herokuapp.com/image", {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((parse) =>
        localStorage.setItem("avatar", JSON.stringify(parse.filename))
      );
    document.location.reload();
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
    notify();
  };
  const notify = () => toast("Hero avatar selected, please submit to upload!");

  const avatar = JSON.parse(localStorage.getItem("avatar"));
  return (
    <div className="App">
      <h4>Hero avatar</h4>

      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>

      <div>
        <ToastContainer />
        {avatar !== null ? (
          <img
            style={{ width: "400px", height: "400px" }}
            src={`https://dndpal.herokuapp.com/image/${avatar}`}
            alt="Sadly HEROKU doesn't allow filesystem write so images don't show up, however the code itself is sound"
          />
        ) : (
          <p>No avatar image</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
