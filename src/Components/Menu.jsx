
const Menu = () => {

    const posts = [
        {
        id:1,
        title: "titles",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sit accusamus harum! Quisquam iusto vel cupiditate maiores corporis officia ducimus, accusamus excepturi praesentium aliquid. Quod nostrum quisquam aliquid placeat nemo.",
        imgsrc : "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id:1,
        title: "titles2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sit accusamus harum! Quisquam iusto vel cupiditate maiores corporis officia ducimus, accusamus excepturi praesentium aliquid. Quod nostrum quisquam aliquid placeat nemo.",
        imgsrc : "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=600"
      
      },
      {
        id:1,
        title: "titles3",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sit accusamus harum! Quisquam iusto vel cupiditate maiores corporis officia ducimus, accusamus excepturi praesentium aliquid. Quod nostrum quisquam aliquid placeat nemo.",
        imgsrc : "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg?auto=compress&cs=tinysrgb&w=600"
      
      },
      
      ]

  return (
    <div className='menu'>


      {
        posts.map((post)=>(
<div className="post">
      <h2>{post.title}</h2>
      <img src={post.imgsrc} alt="" />
      <button>
          Read more...
        </button>
      </div>
        ))
      }
      

    </div>
  )
}

export default Menu
