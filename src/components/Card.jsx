import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
const Card = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "20rem" }}>
      <div className="card-body btm">
        <h5 className="card-title title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger delete"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p className="card-text text">{post.body}</p>
        <div className="card-footer">
          {post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-secondary tag">
              {tag}
            </span>
          ))}
          {<div className="alert alert-success react" role="alert">
            This Post is liked by <BiSolidLike /> {post.reactions.likes} people And dislkied by <BiSolidDislike /> {post.reactions.dislikes} people.
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Card;
