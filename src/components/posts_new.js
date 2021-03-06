import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){
      return(
        <div className="form-group">
          <label>{field.label}</label>
          <input
            className="form-control"
            type="text"
            {...field.input}
          />
          <div className="text-danger">
            {field.meta.touched ? field.meta.error : ''}
          </div>
        </div>
      );
  }

  onSubmit(values){
    this.props.createPost(values, () => {
        this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Content"
          name="content"
          component={this.renderField}
        />
        <button className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
          Never mind
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors={};

  //validating inputs//
  if(!values.title){
    errors.title='*Please enter a title';
  }
  if(!values.categories){
    errors.categories='*Please enter a category';
  }
  if(!values.content){
    errors.content='*Please enter some content';
  }

  //if errors is empty then form is fine to submit//
  return errors;
}
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
