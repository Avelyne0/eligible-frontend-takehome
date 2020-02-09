import React from "react"
import { Link } from "react-router-dom"

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

interface Props {}

interface State {
  posts: Post[]
}

export default class extends React.Component<Props, State> {
  state: State = {
    posts: []
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts })
      })
  }

  render() {
    const { posts } = this.state

    return (
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <Link to={`posts/${post.id}`}>
              <span>{post.title}</span>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
