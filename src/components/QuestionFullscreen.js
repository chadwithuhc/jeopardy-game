import React from 'react'
import classnames from 'classnames'

export default class QuestionFullscreen extends React.Component {

  submitAnswer = (answeredUser) => {
    let currentIndex
    let users = this.props.users.map((user, i) => {
      if (user.myTurn) {
        currentIndex = i
      }
      if (answeredUser.name === user.name) {
        user.points += this.props.question.points
      }
      user.myTurn = false
      return user
    })

    if (currentIndex + 1 === users.length) {
      users[0].myTurn = true
    }
    else {
      users[currentIndex+1].myTurn = true
    }

    this.props.onUpdateScores(users)
  }

  renderUserButtons = () => {
    let currentUser
    let users = this.props.users.filter((user) => {
      if (user.myTurn) {
        currentUser = user
        return false
      }
      return true
    })

    return (
      <div className="user-answerblock">
        <p><button className="btn btn-success btn-lg" onClick={() => this.submitAnswer(currentUser)}>{currentUser.name}</button></p>
        <p>
        {users.map((user, i) => {
          return <button key={i} className="btn btn-primary" onClick={() => this.submitAnswer(user)}>{user.name}</button>
        })}
        </p>
      </div>
    )
  }

  render() {
    let classes = classnames({
      'question-fullscreen': true
    })

    let question = this.props.question ? this.props.question.question : null

    return (
      <div className={classes}>
        <h1>{question}</h1>
        {this.renderUserButtons()}
        <button className="btn btn-info" onClick={() => this.submitAnswer({})}>Close</button>
      </div>
    )
  }

}

QuestionFullscreen.defaultProps = {
  onClose() {},
  users: []
}
