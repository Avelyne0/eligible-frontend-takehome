import React from "react";
import { RouteComponentProps } from "react-router";
import { Card, Icon } from "semantic-ui-react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface Props extends RouteComponentProps<{ id?: string }> {}

interface State {
  post?: Post;
}

export default class extends React.Component<Props, State> {
  state: State = {
    post: undefined,
  };

  componentDidMount(): void {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        this.setState({ post });
      });
  }

  render() {
    const { post } = this.state;

    if (!post) {
      return <div />;
    }

    return (
      <>
        <Card>
          <Card.Content>
            <Card.Header>{post.title}</Card.Header>
            <Card.Description>{post.body}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <>
              <Icon name="user" />
              by: {post.userId}
            </>
          </Card.Content>
        </Card>
      </>
    );
  }
}
