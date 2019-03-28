import React from 'react'

export default class AddUsers extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();

    let users = this.refs.users.value.split(',').map((user, i) => {
      return { name: user.trim(), points: 0, myTurn: i === 0 }
    });

    this.props.onSubmit(users)
  };

  render() {
    return (
      <section className="jumbotron mb-0 text-center">
        <form onSubmit={this.onSubmit}>
          <h1 className="mb-5">Who is playing?</h1>
          <input ref="users" type="text" placeholder="Comma separated list: Bob, Todd, Mary" required className="form-control" />
          <button type="submit" className="btn btn-success mt-5">Let's Go!</button>
        </form>
      </section>
    )
  }

}

AddUsers.defaultProps = {
  onSubmit() {}
};
