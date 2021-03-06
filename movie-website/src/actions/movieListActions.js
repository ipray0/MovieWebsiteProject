import axios from "axios";
import {
  GET_ERRORS,
  GET_MOVIELISTS,
  GET_MOVIELIST,
  DELETE_MOVIELIST,
} from "./types";

export const createMovieList = (id, movieList, history) => async (dispatch) => {
  try {
    await axios.post(`/api/movielist/${id}`, movieList);
    history.push(`/groupBoard/${id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMovieLists = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/movielist/all/${id}`);
    dispatch({
      type: GET_MOVIELISTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMovieList = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/movielist/${id}`);
    dispatch({
      type: GET_MOVIELIST,
      payload: res.data,
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const deleteMovieList = (id) => async (dispatch) => {
  if (window.confirm("Are you sure to delete this movie list?")) {
    await axios.delete(`/api/movielist/${id}`);
    dispatch({
      type: DELETE_MOVIELIST,
      payload: id,
    });
  }
};

export const pullMovieList = (movieList_id, group_id, history) => async (
  dispatch
) => {
  try {
    await axios.post(`/api/movielist/pull/${movieList_id}/${group_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    history.push(`/groupBoard/${group_id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
