import React from "react";
import { connect } from "react-redux";
import { Language, UserComment } from "../../redux/comments/types";
import { Dispatch } from "redux";
import { RootState } from "../../redux/store";
import { fetchComments } from "../../redux/comments";
import { setLanguage } from "../../redux/language";
import Pagination from "../../shared/components/Pagination";

interface MainPageProps {
  data: {
    ru: { [key: string]: UserComment };
    en: { [key: string]: UserComment };
  };
  language: Language;
  setLanguage: (language: Language) => void;
  fetchComments: () => void;
}

interface MainPageState {
  currentPage: number;
  reviewsPerPage: number;
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      currentPage: 1,
      reviewsPerPage: this.getReviewsPerPage(),
    };
    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateReviewsPerPage = this.updateReviewsPerPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments();
    window.addEventListener("resize", this.updateReviewsPerPage);
  }

  componentDidUpdate(prevProps: MainPageProps) {
    if (prevProps.language !== this.props.language) {
      this.props.fetchComments();
      this.setState({ currentPage: 1 });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateReviewsPerPage);
  }

  getReviewsPerPage() {
    if (window.innerWidth > 1200) {
      return 10;
    } else if (window.innerWidth > 768) {
      return 5;
    } else {
      return 3;
    }
  }

  updateReviewsPerPage() {
    this.setState({ reviewsPerPage: this.getReviewsPerPage() });
  }

  handlePrevPage(): void {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));
  }
  handleNextPage(): void {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  }

  handlePageChange(page: number): void {
    this.setState({ currentPage: page });
  }

  handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const language = event.target.value as Language;
    this.props.setLanguage(language);
  }

  formatName(name: string) {
    const nameParts = name.split(" ");
    const firstName = nameParts[0] || "";
    const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
    return `${firstName} ${lastNameInitial}.`.trim();
  }

  render() {
    const { data, language } = this.props;
    const { currentPage, reviewsPerPage } = this.state;

    const currentLanguageData = data[language];

    const totalReviews = Object.keys(currentLanguageData).length;

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

    const currentReviews = Object.values(currentLanguageData).slice(
      indexOfFirstReview,
      indexOfLastReview
    );
    const totalPages = Math.ceil(totalReviews / reviewsPerPage);

    return (
      <div className="main">
        <div className="container">
          {currentReviews.map((review: UserComment, index) => (
            <div className="post" key={index}>
              <h3>{this.formatName(review.name)}</h3>
              <p>{review.review}</p>
              <small>{review.date}</small>
            </div>
          ))}
        </div>

        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.comments.data,
  language: state.language.language,
});

const mapDispatchToProps = {
  fetchComments,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
