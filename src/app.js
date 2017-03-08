import React from 'react'
import ReactDOM from 'react-dom'
import QuestionsStore from './stores/QuestionsStore'
import CategoryPicker from './components/CategoryPicker'
import CategoryList from './components/CategoryList'
import QuestionFullscreen from './components/QuestionFullscreen'
import AddUsers from './components/AddUsers'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: QuestionsStore.categories,
      selectedCategories: [],
      currentQuestion: null,
      users: null
    }
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

  renderQuestionScreen = () => {
    console.log('currentQuestion', !!this.state.currentQuestion)
    return !!this.state.currentQuestion ? <QuestionFullscreen question={this.state.currentQuestion} onClose={this.onOptionClose} /> : null
  }

  renderUsersForm = () => {
    return !this.state.users ? <AddUsers onSubmit={this.onSubmitUsers} /> : null
  }

  renderCategoryPicker = () => {
    return !this.state.selectedCategories.length && this.state.users ? (
      <CategoryPicker categories={this.state.categories} selected={this.state.selectedCategories} onSaveCategories={this.onSaveCategories} visible={!this.state.selectedCategories.length} />
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

  render() {
    console.log(QuestionsStore);
    return (
      <main>
        {this.renderCategoryPicker()}

        {this.renderSelectedCategories()}

        {this.renderQuestionScreen()}

        {this.renderUsersForm()}
      </main>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))
