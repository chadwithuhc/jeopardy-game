import React from 'react'

export default class AddUsers extends React.Component {

  onSubmit = (e) => {
    e.preventDefault()

    let users = this.refs.users.value.split(',').map((user, i) => {
      return { name: user.trim(), points: 0, myTurn: i === 0 }
    })

    this.props.onSubmit(users)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Who is playing?</h1>
        <input ref="users" type="text" placeholder="Comma separated list: Bob, Todd, Mary" required className="form-control" />
        <button className="btn btn-success">Let's Go!</button>
      </form>
    )
  }

}

AddUsers.defaultProps = {
  onSubmit() {}
}
