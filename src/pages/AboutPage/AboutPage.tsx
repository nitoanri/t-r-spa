import React from "react";
import "./AboutPage.scss";

class AboutPage extends React.Component {
  render() {
    return (
      <div
        className="about"
        style={{
          backgroundImage: `url(/assets/images/bg-about.jpg)`,
        }}
      ></div>
    );
  }
}

export default AboutPage;
