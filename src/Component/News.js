import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

class NewsComponent extends Component {
  static defaultProps = {
    country: 'us',
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
  }

  fetchNews = async (page) => {
    this.setState({ loading: true });
    const { country, category } = this.props;

    let url = `http://localhost:5000/news?country=${country}&category=${category}&page=${page}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      page,
      loading: false
    });
  };

  Previous = () => {
    let newPage = this.state.page - 1;
    this.fetchNews(newPage);
  };

  Next = () => {
    let newPage = this.state.page + 1;
    this.fetchNews(newPage);
  };

  componentDidMount() {
    this.fetchNews(this.state.page);
  }

  render() {
    const { articles, page, loading } = this.state;
    const isPreviousDisabled = page <= 1;
    const isNextDisabled = articles.length === 0 || articles.length < 20;

    return (
      <div className='container my-3'>
        <div className='text-center'>{loading && <Spinner />}</div>
        <div className='row'>
          {articles.map((element, index) => (
            <div className='col-md-4' key={index}>
              <Newsitem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={isPreviousDisabled} type="button" className="btn btn-dark" onClick={this.Previous}>Previous</button>
          <button disabled={isNextDisabled} type="button" className="btn btn-dark" onClick={this.Next}>Next</button>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
