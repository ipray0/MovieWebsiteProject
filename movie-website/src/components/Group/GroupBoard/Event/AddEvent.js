import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../../../../actions/eventAction";

class AddEvent extends Component {
  constructor() {
    super();

    this.state = {
      eventName: "",
      description: "",
      eventTime: "",
      voteStartTime: "",
      voteEndTime: "",
      movieListId: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { groupID } = this.props.match.params;
    e.preventDefault();

    const newEvent = {
      eventName: this.state.eventName,
      description: this.state.description,
      eventTime: this.state.eventTime,
      voteStartTime: this.state.voteStartTime,
      voteEndTime: this.state.voteEndTime,
      movieListId: this.state.movieListId,
      eventGroupId: groupID,
    };

    this.props.createEvent(newEvent, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { groupID } = this.props.match.params;

    return (
      <div className="add-Event">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/groupBoard/${groupID}`} className="btn btn-light">
                Back to Group Board
              </Link>
              <h4 className="display-4 text-center">Add a Event</h4>
              <hr />

              <h6>Event Name</h6>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.eventName,
                    })}
                    name="eventName"
                    placeholder="Event Name"
                    value={this.state.eventName}
                    onChange={this.onChange}
                  />
                  {errors.eventName && (
                    <div className="invalid-feedback">{errors.eventName}</div>
                  )}
                </div>

                <h6>Description</h6>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Event Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <h6>
                  Movie List (Please enter the movie list id for people to vote)
                </h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.movieListId,
                    })}
                    placeholder="Movie List ID"
                    name="movieListId"
                    value={this.state.movieListId}
                    onChange={this.onChange}
                  />
                  {errors.movieListId && (
                    <div className="invalid-feedback">{errors.movieListId}</div>
                  )}
                </div>

                <h6>Event Date (Please enter the following format)</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.eventTime,
                    })}
                    placeholder="YYYY-MM-DD HH:MM"
                    name="eventTime"
                    value={this.state.eventTime}
                    onChange={this.onChange}
                  />
                  {errors.eventTime && (
                    <div className="invalid-feedback">{errors.eventTime}</div>
                  )}
                </div>

                <h6>Vote Start Date (Please enter the following format)</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.voteStartTime,
                    })}
                    placeholder="YYYY-MM-DD HH:MM"
                    name="voteStartTime"
                    value={this.state.voteStartTime}
                    onChange={this.onChange}
                  />
                  {errors.voteStartTime && (
                    <div className="invalid-feedback">
                      {errors.voteStartTime}
                    </div>
                  )}
                </div>

                <h6>Vote End Date (Please enter the following format)</h6>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.voteEndTime,
                    })}
                    placeholder="YYYY-MM-DD HH:MM"
                    name="voteEndTime"
                    value={this.state.voteEndTime}
                    onChange={this.onChange}
                  />
                  {errors.voteEndTime && (
                    <div className="invalid-feedback">{errors.voteEndTime}</div>
                  )}
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEvent.protoTypes = {
  errors: PropTypes.object.isRequired,
  createEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { createEvent })(AddEvent);
