import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostsFilter from "./PostsFilter";
import PostsSort from "./PostsSort";
import SearchBar from "./SearchBar";
import { Button } from "semantic-ui-react";

const PostsContainer = styled.div`
  margin: 4rem;
`;
const SearchBarContainer = styled.div`
  margin: 2rem 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export enum SortOptions {
  default = "Default",
  title = "Title",
  id = "Id",
}

interface Props {}

interface State {
  posts: Post[];
  sortOption: SortOptions;
  filter: undefined;
  searchTerm: string;
  userIds: number[];
  selectedUserId?: number;
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default class extends React.Component<Props, State> {
  state: State = {
    posts: [],
    sortOption: SortOptions.default,
    filter: undefined,
    searchTerm: "",
    userIds: [],
    selectedUserId: undefined,
  };

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        this.setState({ posts });
        this.setState({
          userIds: posts
            .map((post: Post) => post.userId)
            .filter(
              (value: number, index: number, self: number[]) =>
                self.indexOf(value) === index
            ),
        });
      });
  }

  filterPosts = (posts: Post[]) =>
    posts.filter((post) => {
      if (this.state.selectedUserId !== undefined)
        return post.userId === this.state.selectedUserId;
      return true;
    });

  changeFilter = (selectedUserId: number) => this.setState({ selectedUserId });

  resetFilter = () => this.setState({ selectedUserId: undefined });
  resetAll = () => {
    this.resetFilter();
    this.setState({ searchTerm: "" });
    this.changeSort(SortOptions.default);
  };

  updateSearchTerm = (searchTerm: string) => this.setState({ searchTerm });

  searchPosts = (posts: Post[]) =>
    posts.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(this.state.searchTerm.toLocaleLowerCase())
    );

  changeSort = (sortOption: SortOptions) => this.setState({ sortOption });

  sortPost = (sortOption: SortOptions, posts: Post[]) => {
    if (sortOption === SortOptions.title)
      return posts.sort((a, b): number => {
        return a.title.localeCompare(b.title);
      });
    if (sortOption === SortOptions.id)
      return posts.sort((a, b): number => {
        return a.id - b.id;
      });
    return posts;
  };

  render() {
    const filteredPosts = this.filterPosts(this.state.posts);
    const searchedPosts = this.searchPosts(filteredPosts);
    const posts = this.sortPost(this.state.sortOption, searchedPosts);

    return (
      <PostsContainer>
        <Title>Posts</Title>
        <div>
          <FilterContainer>
            <div>
              <PostsSort
                changeSort={this.changeSort}
                sortOption={this.state.sortOption}
              />
              <PostsFilter
                changeFilter={this.changeFilter}
                userIds={this.state.userIds}
                selectedUserId={this.state.selectedUserId}
              />
            </div>
            <Button.Group>
              <Button primary onClick={this.resetFilter} type="submit">
                Reset Filter
              </Button>
              <Button secondary onClick={this.resetAll} type="submit">
                Reset All
              </Button>
            </Button.Group>
          </FilterContainer>
          <br />
          <SearchBarContainer>
            <br />
            <SearchBar
              searchTerm={this.state.searchTerm}
              updateSearchTerm={this.updateSearchTerm}
            />
          </SearchBarContainer>
        </div>
        {posts.map((post) => (
          <>
            <div key={post.id}>
              <Link to={`posts/${post.id}`}>
                <span>{post.title}</span>
              </Link>
            </div>
            <br />
          </>
        ))}
      </PostsContainer>
    );
  }
}
