import React from "react";
import Navbar from "../Dashboard/Navbar";

const CreateBot = () => {
  return (
    <div>
      <Navbar />
      <div className="createBot">
        <form>
          <div>
            <input type="text" placeholder="Enter your bot name" />
          </div>
          <div>
            <input type="text" placeholder="Enter your bot personalities" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBot;
