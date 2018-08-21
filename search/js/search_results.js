import React from 'react';
import PropTypes from 'prop-types';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_results: [],
      new_search: '',
      searched: false,
    };

    this.getQuery = this.getQuery.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getQuery(url, search) {
    const submitUrl = `${url}?q=${search}`;
    fetch(submitUrl, {
      credentials: 'same-origin',
      method: 'GET',
    }).then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    }).then((data) => {
      console.log(data);
      this.setState({
        search_results: data.Items,
        new_search: '',
        searched: true,
      });
    }).catch(error => console.log(error)); // eslint-disable-line no-console
  }

  handleClick(event) {
    event.preventDefault();
    this.getQuery(this.props.url, this.state.new_search);
    console.log(this.state.search_results);
  }

  handleChangeText(event) {
    this.setState({ new_search: event.target.value });
  }


  render() {

    const num_results = this.state.search_results.length

    return (
      <div className="container">
        <div className="jumbotron text-center"> 
          <h1> 
            <img src="./static/MikerFaceClose.jpg" height="200" width="200" />
            <b>Hunt's Ace Helper:</b> 
            <img src="./static/MickFace.jpg" height="200" width="200" /> 
          </h1>
          <div className="search">
            <form id="search-form" className="form-inline" >
              <input type="text" className="form-control" placeholder="Search" 
              value={this.state.new_search} onChange={this.handleChangeText} />
              <input type="submit" onClick={this.handleClick} />
            </form>
          </div>
        </div>
        <div className="container col-xs-12 text-center">
          {this.state.searched ? 
            <div>
              <h2> Search returned <b>{num_results}</b> results </h2>
            </div>
            :
            <div>
              <h2> Enter a search above </h2>
            </div>
          }
        </div>
        <div className="container col-xs-12">
          {this.state.search_results.map(result => (
            (result != null) ?
              <div className="card col-xs-12 cardStyle" key={result.sku}>
                <div className="card-block">
                  <div className="card-title"> 
                    <h2> <b> {result.sku} </b> </h2> 
                  </div>
                  <div className="card-text">  
                    <h1> {result.descr} </h1> 
                  </div>
                  <h2>
                    <span className="price card-footer" style={{float: "left"}}>  
                      ${result.price}
                    </span>
                    { (result.loc) ? 
                      <span className="card-footer" style={{float: "right"}}>
                        {result.loc}
                      </span>
                      :
                      <span className="card-footer" style={{float: "right"}}>
                        Order From ACENET
                      </span>
                    }
                  </h2>
                </div>
              </div>
              :
              <div> 
                <b>No Results Found</b>
              </div>
          ))}
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SearchBar;
