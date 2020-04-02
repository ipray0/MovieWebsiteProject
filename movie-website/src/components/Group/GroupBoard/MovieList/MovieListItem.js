import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMovieList } from "../../../../actions/movieListActions";

class MovieListItem extends Component {
  onDeleteClick = id => {
    this.props.deleteMovieList(id);
  };

  render() {
    const { movieList } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">ID: {movieList.id}</div>
        <div className="card-body bg-light">
          <h5 className="card-title">Name : {movieList.movieListName}</h5>
          <p className="card-text text-truncate ">{movieList.description}</p>
          <Link
            to={`/groupBoard/movieListBoard/${movieList.id}`}
            className="btn btn-primary"
          >
            View
          </Link>

          <Link
            to={`/groupBoard/updateMovieList/${movieList.id}`}
            className="btn btn-info ml-4"
          >
            Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(this, movieList.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

MovieListItem.protoTypes = {
  deleteMovieList: PropTypes.func.isRequired
};

export default connect(null, { deleteMovieList })(MovieListItem);