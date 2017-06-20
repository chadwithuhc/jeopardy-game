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
      <nav className="navbar fixed-tops navbar-inverse bg-inverse navbar-toggleable-md">
        <a className="navbar-brand" href="#">Jeopardy</a>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav">
            {this.props.users.map((user, i) => {
              let active = user.myTurn ? 'active bg-primary' : ''
              return (
                <li className={active + ' nav-item'} key={i}><a href="#" onClick={(event) => this.changeUser(event, user)} className="nav-link">
                  {user.name} <br/><span className="badge">{user.points}</span>
                </a></li>
              )
            })}
          </ul>
        </div>
      </nav>
    )
  }

}
