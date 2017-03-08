import React from 'react'
import classnames from 'classnames'

export default class QuestionFullscreen extends React.Component {

  render() {
    let classes = classnames({
      'question-fullscreen': true
    })

    let question = this.props.question ? this.props.question.question : null

    return (
      <div className={classes}>
        <h1>{question}</h1>
        <button className="btn btn-info" onClick={() => this.props.onClose()}>Close</button>
      </div>
    )
  }

}

QuestionFullscreen.defaultProps = {
  onClose: () => {}
}
