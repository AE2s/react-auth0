import React, { Component } from 'react';

export default class Courses extends Component {
  state = {
    courses: [],
    message: '',
  };

  componentDidMount() {
    fetch('/courses', {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response with not ok');
      })
      .then((response) => this.setState({ courses: response.courses }))
      .catch((error) => this.setState({ message: error.message }));
  }
  render() {
    return (
      <ul>
        {this.state.courses.map((x) => (
          <li key={x.id}>{x.title}</li>
        ))}
      </ul>
    );
  }
}
