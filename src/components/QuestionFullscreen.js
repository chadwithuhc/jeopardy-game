import React from 'react'
import classnames from 'classnames'

export default class QuestionFullscreen extends React.Component {

    submitAnswer = (answeredUser, correctness) => {
        this.props.onUpdateScores(answeredUser, correctness, this.props.question.points)
    };

    closeWindow = () => {
        this.props.onWindowClose()
    };

    renderUserButtons = () => {
        let currentUser;
        let users = this.props.users.filter((user) => {
            if (user.myTurn) {
                currentUser = user;
                return false
            }
            return true
        });

        return (
            <div className="user-answerblock">
                <div className="row mb-4">
                    <label className="col col-form-label"><h2>{currentUser.name}:</h2></label>
                    <div className="col col-md-auto">
                        <button type="button" className="btn btn-success btn-lg mr-2"
                                onClick={() => this.submitAnswer(currentUser, true)}>💪
                        </button>
                        <button type="button" className="btn btn-danger btn-lg"
                                onClick={() => this.submitAnswer(currentUser, false)}>🤦‍♀️
                        </button>
                    </div>
                </div>
                {users.map((user, i) => {
                    return <div className="row mb-2" key={i}>
                        <label className="col col-form-label">{user.name}:</label>
                        <div className="col col-md-auto">
                            <button type="button" className="btn btn-success mr-2"
                                    onClick={() => this.submitAnswer(user, true)}>💪
                            </button>
                            <button type="button" className="btn btn-danger"
                                    onClick={() => this.submitAnswer(user, false)}>🤦‍♀️
                            </button>
                        </div>
                    </div>
                })}
            </div>
        )
    };

    render() {
        let classes = classnames({
            'question-fullscreen': true
        });

        let question = this.props.question ? this.props.question.question : null;
        let code = this.props.question.html !== undefined ? this.props.question.html : null;
        let codeBlock = <div className="mt-5" dangerouslySetInnerHTML={{__html: code}}/>;

        return (
            <div className={classes}>
                <div className="question-fullscreen-inner-vertical">
                    <div className="question-fullscreen-inner-content">
                        <h1>{question}</h1>
                        {code ? codeBlock : ""}
                        {this.renderUserButtons()}
                        <div className="user-answerblock-close mt-4">
                            <button className="btn btn-info" onClick={() => this.closeWindow()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

QuestionFullscreen.defaultProps = {
    users: []
};
