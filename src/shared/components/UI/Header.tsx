import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Language } from "../../../redux/comments/types";
import { setLanguage } from "../../../redux/language";
import { fetchComments } from "../../../redux/comments";
import Watch from "./Watch";

interface HeaderProps {
  setLanguage: (language: Language) => void;
  fetchComments: () => void;
}

class Header extends React.Component<HeaderProps> {
  handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value as Language;
    this.props.setLanguage(language);
    this.props.fetchComments();
  };

  render() {
    return (
      <div className="header">
        <div>
          <img className="logo" src="/assets/images/logo.png" alt="logo" />
          <img className="logo2" src="/assets/images/logo2.png" alt="logo2" />
        </div>
        <div className="navbar">
          <Link to={"/"}>Главная</Link>
          <Link to={"/about"}>О сайте</Link>
        </div>

        <div className="container">
          <select className="select" onChange={this.handleLanguageChange}>
            <option value={Language.RU}>Русский</option>
            <option value={Language.EN}>English</option>
          </select>
          <Watch />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchComments,
  setLanguage,
};

export default connect(null, mapDispatchToProps)(Header);
