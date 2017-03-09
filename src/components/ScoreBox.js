import React from 'react'

export default class ScoreBox extends React.Component {

  changeUser = (e, changedUser) => {
    e.preventDefault()

    let users = this.props.users.map((user) => {
      user.myTurn = changedUser.name === user.name
      return user
    })

    this.props.onSwitchUser(users)
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Jeopardy</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {this.props.users.map((user, i) => {
                let active = user.myTurn ? 'active' : ''
                return (
                  <li className={active} key={i}><a href="#" onClick={(event) => this.changeUser(event, user)}>
                    {user.name} <span className="badge">{user.points}</span>
                  </a></li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    )
  }

}
