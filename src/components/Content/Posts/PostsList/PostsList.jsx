import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../../../features/posts/postsSlice";
import { CircularProgress } from '@mui/material'

import SinglePost from "./SinglePost/SinglePost";

import "./PostsList.css";

const PostsList = () => {
  const { posts } = useSelector((store) => store.posts);
  const { status } = useSelector((store) => store.posts);
  const { error } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'succeesed') {
    return (
      <div className="posts_list">
        {posts.map((post) => {
          return (
            <SinglePost
              key={post.id + post.name}
              color={post.color}
              name={post.name}
              pantone={post.pantone_value}
              year={post.year}
            />
          );
        })}
      </div>
    )
  } else {
    return (
      <CircularProgress className="posts_loader"/>
    )
  }

};

export default PostsList;

