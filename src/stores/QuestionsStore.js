import PhoneScreenData from '../data/PhoneScreenData.json'
import JavascriptData from '../data/JavascriptData.json'
import BackendData from '../data/BackendData.json'

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
    this.sortQuestions()
    this.sortCategories()
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

  sortQuestions = () => {
    this.data.sort((a, b) => a.points - b.points)
  }

  sortCategories = () => {
    this.categories.sort()
  }

}

const questionsStore = new QuestionsStore(
  PhoneScreenData.concat(JavascriptData).concat(BackendData)
)

export default questionsStore
