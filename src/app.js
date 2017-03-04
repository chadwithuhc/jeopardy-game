import React from 'react'
import ReactDOM from 'react-dom'
import QuestionsStore from './stores/QuestionsStore'
import CategoryPicker from './components/CategoryPicker'
import CategoryList from './components/CategoryList'
import QuestionFullscreen from './components/QuestionFullscreen'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: QuestionsStore.categories,
      selectedCategories: [],
      currentQuestion: null
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

  render() {
    console.log(QuestionsStore);
    return (
      <main>
        <CategoryPicker categories={this.state.categories} selected={this.state.selectedCategories} onSaveCategories={this.onSaveCategories} visible={!this.state.selectedCategories.length} />

        <div className="container">
          <div className="row">
          {this.state.selectedCategories.map((category) => {
            return <CategoryList category={category} key={category} options={QuestionsStore.getQuestionsForCategory(category)} onOptionOpen={this.onOptionOpen} />
          })}
          </div>
        </div>

        <QuestionFullscreen question={this.state.currentQuestion} visible={!!this.state.currentQuestion} onClose={this.onOptionClose} />

      </main>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('root'))
