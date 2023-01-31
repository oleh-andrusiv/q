import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../../../features/posts/postsSlice";
import { CircularProgress } from '@mui/material'

import SinglePost from "./SinglePost/SinglePost";

import "./PostsList.css";

const PostsList = () => {
  const { posts, status, error } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  const [ordersPortion, setOrdersPortion] = useState([]);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [prevBtnActive, setPrevBtnActive] = useState('disabled');
  const [nextBtnActive, setNextBtnActive] = useState('');
  const [curentPage, setCurentPage] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
    if (status === "succeesed") {
      setCurentPage(1)
    }
  }, [status, dispatch]);

  const definePageQuantity = (quantity) => (Math.ceil(quantity/3));

  useEffect(() => {
      const startIndex = (+curentPage - 1) * 3;
      const endIndex = startIndex + 3;

      setPageQuantity(definePageQuantity(posts.length));

      const newOrdersPortion = posts.slice(startIndex, endIndex)

      if (curentPage === pageQuantity) {
          setNextBtnActive('disabled')
      }
      if (curentPage < pageQuantity) {
          setNextBtnActive('')
      }
      if (curentPage === 1) {
          setPrevBtnActive('disabled')
          setNextBtnActive('')
      }
      if (curentPage >= 2) {
          setPrevBtnActive('')
      }

      setOrdersPortion(newOrdersPortion)
  },[curentPage, pageQuantity, posts])

  const changePage = (event) => {
    event.preventDefault();

    const clickedElem = event.target.getAttribute('btntype');

    if (clickedElem === 'prev-page') {
        setCurentPage(curentPage-1)
    }

    if (clickedElem === 'next-page') {
        setCurentPage(curentPage+1)
    }
  } 

  if (ordersPortion !== []) {
    return (
      <div className="posts">
        <ul className="posts_list">
          {ordersPortion.map((post, index) => {
            return (
              <SinglePost
                key={index + post.name}
                color={post.color}
                name={post.name}
                pantone={post.pantone_value}
                year={post.year}
              />
            );
          })}
        </ul>
        <div className='posts_navigation' onClick={changePage}>
          <button btntype='prev-page' className={`btn posts_btn prev-page ${prevBtnActive}`}>Prev</button>
          <div className='posts_navigation_legend'>
              <span>{curentPage}</span>
              <span>of</span>
              <span>{pageQuantity}</span>
          </div>
          <button btntype='next-page' className={`btn posts_btn next-page ${nextBtnActive}`}>Next</button>
        </div>
      </div> 
    )
  } 
  if (ordersPortion === []  && error === null) {
    return (
      <CircularProgress className="posts_loader"/>
    )
  }
  if (ordersPortion === []  && error !== null) {
    return (
      <div className="posts">
        <h5>{error}</h5>
      </div>
    )
  }

};

export default PostsList;

