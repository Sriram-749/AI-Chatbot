import React from "react";
import Navbar from "../Dashboard/Navbar";

import "./css/CreateBot.css";

const CreateBot = () => {
  const handleCreate = () => {};
  return (
    <div>
      <Navbar />
      <div className="create-bot">
        <form onSubmit={handleCreate}>
          <div>
            <input type="text" placeholder="Enter your bot name" required />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your bot personalities"
              required
            />
          </div>
          <div>
            <div style={{ margin: "50px" }}>
              <label htmlFor="bot-image">Upload your bot image</label>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              alt="Bot Image"
              id="bot-image"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBot;
