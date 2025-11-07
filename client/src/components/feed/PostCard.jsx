export default function PostCard({ post }) {
  return (
    <article className="card" style={{display:"grid", gap:10}}>
      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        <div style={{
          width:42, height:42, borderRadius:"50%", background:"#ddd",
          display:"grid", placeItems:"center", fontWeight:700, color:"#666"
        }}>
          {post.name?.[0] || "U"}
        </div>
        <div>
          <div style={{fontWeight:600}}>{post.name}</div>
          <div style={{fontSize:13, color:"var(--text-light)"}}>
            {post.title} • {post.time}
          </div>
        </div>
      </div>
      <div style={{whiteSpace:"pre-wrap"}}>{post.text}</div>
      <div style={{display:"flex", gap:16, fontSize:14, color:"var(--text-light)"}}>
        <span>👍 {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span style={{marginLeft:"auto", cursor:"pointer"}}>Shpërndaj</span>
      </div>
    </article>
  );
}
