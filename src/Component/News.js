import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'

class NewsComponent extends Component {
  static defaultProps=
  {
    country:'us',
    category:"general"
  }
  static propTypes=
  {
    country:PropTypes.string,
    category:PropTypes.string,
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: false,
      page: 1 // Initialize page number
    };
  }

  Previous = async () => {
    this.setState({loading:true});
    // Decrement page number
    let newPage = this.state.page - 1;

    // Fetch data for the previous page
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d542a80b32cf4d2a949879f21bf28653&page=${newPage}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // Update state with new articles and page number
    this.setState({
      articles: parsedData.articles,
      page: newPage,
      loading:false
    });
  };
  
  Next = async () => {
    this.setState({loading:true})
    // Increment page number
    let newPage = this.state.page + 1;

    // Fetch data for the next page
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d542a80b32cf4d2a949879f21bf28653&page=${newPage}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    // Update state with new articles and page number
    this.setState({
      articles: parsedData.articles,
      page: newPage,
      loading:false
    });
  };

  async componentDidMount(){
    this.setState({loading:true})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d542a80b32cf4d2a949879f21bf28653`
    let data = await fetch(url);
    let parsedData = await data.json();
   
    this.setState({ articles: parsedData.articles,loading:false});
  }

  render() {
    const { articles, page,loading } = this.state;
    const isPreviousDisabled = page <= 1;
    const isNextDisabled = articles.length === 0 || articles.length < 20; // Assuming each page shows 20 articles

    return (
      <div className='container my-3'>
       <div className='text-center'> {loading&&<Spinner></Spinner>}</div>
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
