import Questions from '../data/PhoneScreenData.json'

class QuestionsStore {

  constructor(questions) {
    if (questions.length) {
      this.load(questions)
    }
  }

  categories = []
  data = []

  load = (questions) => {
    questions.forEach(this.addQuestion)
  }

  addQuestion = (question) => {
    // Add the categories
    if (question.categories && question.categories.length) {
      question.categories.forEach((category) => this.addCategory(category))
    }
    // Add to our internal cache
    this.data.push(question)
  }

  addCategory = (category) => {
    if (this.categories.indexOf(category) === -1) {
      this.categories.push(category)
    }
  }

  getQuestionsForCategory = (category) => {
    return this.data.filter((item) => {
      return item.categories.indexOf(category) > -1
    })
  }

  removeQuestion = (question) => {
    this.data = this.data.filter((item) => {
      return (item.question !== question.question)
    })
  }

}

const questionsStore = new QuestionsStore(Questions)

export default questionsStore
