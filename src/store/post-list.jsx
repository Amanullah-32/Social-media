import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  fetching : false,
  deletePost: () => {},
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "ADD_Initial_POST") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
  );

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_Initial_POST",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
  }, []);

  return (
    <PostList.Provider
      value={{ postList, addPost, fetching, deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

// const DEFAULT_POST_LIST = [
//   {
//     id: "1",
//     title: "Going to mumbai",
//     body: "Hi Friend, I am going to mumbai",
//     reaction: "2",
//     userId: "user-9",
//     tags: ["hi", "mb"],
//   },
//   {
//     id: "2",
//     title: "Going to Bhopal",
//     body: "Hi Friend, I am going to Bhopal",
//     reaction: "10",
//     userId: "user-7",
//     tags: ["Bhopal", "Collage", "ride"],
//   },
// ];

export default PostListProvider;
