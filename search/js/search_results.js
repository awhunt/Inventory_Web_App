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
    var cardStyle = {
      "border": "solid 2px black",
      "border-radius": "5px",
      "padding": "10px",
      "margin": "10px"
    };

    const num_results = this.state.search_results.length

    return (
      <div class="container">
        <div className="jumbotron text-center"> 
          <h1> Hunt's Ace Helper: </h1>
          <div className="search">
            <form id="search-form" class="form-inline" >
              <input type="text" class="form-control" placeholder="Search" 
              value={this.state.new_search} onChange={this.handleChangeText} />
              <input type="submit" onClick={this.handleClick} />
            </form>
          </div>
        </div>
        <div class="container">
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
        <div class="container">
          {this.state.search_results.map(result => (
            (result != null) ?
              <div class="card col-xs-12" 
              style={cardStyle} key={result.sku}>
                <div class="card-block">
                  <div class="card-title"> 
                    <h2> <b> {result.sku} </b> </h2> 
                  </div>
                  <div class="card-text">  
                    <h1> {result.descr} </h1> 
                  </div>
                  <h2>
                    <span class="card-footer" style={{float: "left"}}>  
                      ${result.price}
                    </span>
                    { (result.loc) ? 
                      <span class="card-footer" style={{float: "right"}}>
                        {result.loc}
                      </span>
                      :
                      <span class="card-footer" style={{float: "right"}}>
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
