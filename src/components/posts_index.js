import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PostsIndex extends Component{
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post =>{
      return(
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      );
    })
  }

  render() {
    return(
      <div>
        <h3 className="text-center">Posts</h3>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <ul>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return  { posts : state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex) ;
