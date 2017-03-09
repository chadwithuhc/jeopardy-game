import React from 'react'
import ReactDOM from 'react-dom'
import QuestionsStore from './stores/QuestionsStore'
import CategoryPicker from './components/CategoryPicker'
import CategoryList from './components/CategoryList'
import QuestionFullscreen from './components/QuestionFullscreen'
import AddUsers from './components/AddUsers'
import ScoreBox from './components/ScoreBox'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: QuestionsStore.categories,
      selectedCategories: [],
      currentQuestion: null,
      users: null
    }

    // DEBUG
    // this.state.users = [
    //   { name: 'Lisa', points: 0, myTurn: 1 },
    //   { name: 'Bart', points: 0 },
    //   { name: 'Marge', points: 0 }
    // ]
    // this.state.selectedCategories = [
    //   'Front End', 'Back End', 'DOM'
    // ]
  }

  onSaveCategories = (selectedCategories) => {
    this.setState({ selectedCategories })
    console.log('Categories', selectedCategories)
  }

  onOptionOpen = (currentQuestion) => {
    this.setState({ currentQuestion })
    console.log('Current Question', currentQuestion)
  }

  onOptionClose = () => {
    this.setState({ currentQuestion: null })
    console.log('Answered Question')
  }

  onSubmitUsers = (users) => {
    this.setState({ users })
    console.log(users);
  }

  // Auto increase scores and switch to next user
  onUpdateScores = (users) => {
    console.log(this.state)
    //this.state.currentQuestion.answered = true
    this.setState({ users })
    this.onOptionClose()
  }

  renderQuestionScreen = () => {
    console.log('currentQuestion', !!this.state.currentQuestion)
    return !!this.state.currentQuestion ? <QuestionFullscreen question={this.state.currentQuestion} onClose={this.onOptionClose} users={this.state.users} onUpdateScores={this.onUpdateScores} /> : null
  }

  renderUsersForm = () => {
    return !this.state.users ? <AddUsers onSubmit={this.onSubmitUsers} /> : null
  }

  renderCategoryPicker = () => {
    return !this.state.selectedCategories.length && this.state.users ? (
      <CategoryPicker categories={this.state.categories} selected={this.state.selectedCategories} onSaveCategories={this.onSaveCategories} />
    ) : null
  }

  renderSelectedCategories = () => {
    return this.state.selectedCategories.length && this.state.users ? (
      <div className="container">
        <div className="row">
        {this.state.selectedCategories.map((category) => {
          return <CategoryList category={category} key={category} options={QuestionsStore.getQuestionsForCategory(category)} onOptionOpen={this.onOptionOpen} />
        })}
        </div>
      </div>
    ) : null
  }

  renderScoreBox = () => {
    return this.state.selectedCategories.length && this.state.users ? (
      <ScoreBox users={this.state.users} onSwitchUser={this.onSubmitUsers} />
    ) : null
  }

  render() {
    console.log(QuestionsStore);
    return (
      <main>
        {this.renderCategoryPicker()}

        {this.renderScoreBox()}

        {this.renderSelectedCategories()}

        {this.renderQuestionScreen()}

        {this.renderUsersForm()}
      </main>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))
