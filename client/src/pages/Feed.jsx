import { useEffect, useState } from "react";
import { getFeedPosts } from "../lib/api.js";
import CreatePost from "../components/feed/CreatePost.jsx";
import PostCard from "../components/feed/PostCard.jsx";

export default function Feed() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getFeedPosts().then(p => { if(mounted){ setPosts(p); setLoading(false); } });
    return () => { mounted = false; };
  }, []);

  function onCreated(newPost){
    setPosts(p => [{ 
      id: newPost.id, name: "Ti", title: "Anëtar", time: "tani",
      text: newPost.text, likes: 0, comments: 0
    }, ...p]);
  }

  return (
    <div className="container" style={{marginTop: 24, display:"grid", gridTemplateColumns:"1fr", gap:16, maxWidth: 760}}>
      <CreatePost onCreated={onCreated} />
      {loading ? (
        <>
          <div className="card"><div className="skeleton shine" style={{height:18, width:"60%", marginBottom:10}}></div><div className="skeleton shine" style={{height:12, width:"95%"}}></div></div>
          <div className="card"><div className="skeleton shine" style={{height:18, width:"55%", marginBottom:10}}></div><div className="skeleton shine" style={{height:12, width:"90%"}}></div></div>
        </>
      ) : posts.length ? (
        posts.map(p => <PostCard key={p.id} post={p} />)
      ) : (
        <div className="card">Ende s’ka postime. Bëj postimin tënd të parë!</div>
      )}
    </div>
  );
}
