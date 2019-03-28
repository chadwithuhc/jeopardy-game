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
            <nav className="navbar navbar-dark bg-dark">
                <span className="navbar-brand mb-0 h1">Jeopardy</span>
                <div className="form-inline">
                    {this.props.users.map((user, i) => {
                        let active = user.myTurn ? 'btn-success' : 'btn-outline-success';
                        return (
                            <a href="#" onClick={(event) => this.changeUser(event, user)} className={'btn ml-1 ' + active}  key={i}>
                                {user.name} <span className="badge badge-light">{user.points}</span>
                            </a>
                        )
                    })}
                </div>
            </nav>
        )
    }

}
