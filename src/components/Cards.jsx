import { useContext } from "react";
import Card from "./Card";
import { PostList } from "../store/post-list";
import Welcome from "./Welcome";
import Loding from "./Loding";

const Cards = () => {
  const { postList, fetching } = useContext(PostList);

  return (
    <div className="cards">
      {fetching && <Loding />}
      {!fetching && postList.length === 0 && <Welcome />}
      {!fetching && postList.map((post) => <Card key={post.id} post={post} />)}
    </div>
  );
};

export default Cards;
