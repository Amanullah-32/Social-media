import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import Cards from "./components/Cards";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import PostListProvider from "./store/post-list";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <Header></Header>
      <div className="content">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}></Sidebar>
        {selectedTab === "Home" ? <Cards></Cards> : <CreatePost></CreatePost>}
      </div>
      <Footer></Footer>
      </PostListProvider>
  );
}

export default App;
