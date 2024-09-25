import { useContext, useRef } from "react";
import { PostList } from "../store/post-list";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userIds = useRef();
  const postTitles = useRef();
  const postBodys = useRef();
  const tagss = useRef();
  const reactions = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userIds.current.value;
    const postTitle = postTitles.current.value;
    const postBody = postBodys.current.value;
    const tags = tagss.current.value.split(" ");
    const reaction = reactions.current.value;

    userIds.current.value = "";
    postTitles.current.value = "";
    postBodys.current.value = "";
    tagss.current.value = "";
    reactions.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        title: postTitle,
        body: postBody,
        reactions: {
          likes: reaction,
          dislikes: reaction,
        },
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="htmlForm-label">
          User Id
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="userId"
          ref={userIds}
          placeholder="Enter number 1-20"
        />{" "}
      </div>
      <div className="mb-3">
        <label htmlFor="Title" className="htmlForm-label">
          Title
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="title"
          ref={postTitles}
          placeholder="Title Name"
        />{" "}
      </div>
      <div className="mb-3">
        <label htmlFor="Body" className="htmlForm-label">
          Body
        </label>
        <textarea
          rows={"3"}
          cols={"35"}
          className="htmlForm-control"
          id="body"
          ref={postBodys}
          placeholder="Enter Body Content"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Reaction" className="htmlForm-label">
          Reaction
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="reaction"
          ref={reactions}
          placeholder="Reaction"
        />{" "}
      </div>
      <div className="mb-3">
        <label htmlFor="Tags" className="htmlForm-label">
          Tags
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="tags"
          ref={tagss}
          placeholder="Tag Name with Space"
        />{" "}
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
