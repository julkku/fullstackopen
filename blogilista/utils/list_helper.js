const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
      const likes = blogs.map(blog => blog.likes)
      return likes.reduce((a,b) => a + b, 0)
  }

  const favouriteBlog = (blogs) => {
    let favourite = blogs[0]  
    blogs.forEach(blog => {if(blog.likes > favourite.likes) favourite = blog})
    return favourite
}
  
  module.exports = {
    dummy, totalLikes, favouriteBlog
  }
  