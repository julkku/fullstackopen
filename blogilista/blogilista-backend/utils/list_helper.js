const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce((a, b) => a + b, 0)
}

const favouriteBlog = (blogs) => {
    let favourite = blogs[0]
    blogs.forEach(blog => { if (blog.likes > favourite.likes) favourite = blog })
    return favourite
}


const mostBlogs = blogs => {
    let authorList = []
    blogs.forEach(blog => {
        if (blog.author in authorList) authorList[blog.author].blogs++
        else authorList[blog.author] = {blogs : 1, author: blog.author}
    })
    const most = _.maxBy(Object.values(authorList), 'blogs')
    return most
}

const mostLikes = blogs => {
    let authorList = []
    blogs.forEach(blog => {
        if (blog.author in authorList) authorList[blog.author].likes += blog.likes
        else authorList[blog.author] = {likes : blog.likes, author: blog.author}
    })
    const most = _.maxBy(Object.values(authorList), 'likes')
    return most
}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}
