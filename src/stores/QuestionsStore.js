class QuestionsStore {

  constructor(questions) {
    if (questions && questions.length) {
      this.load(questions)
    }
  }

  categories = []
  data = []

  loadData = () => {
    return fetch('https://api.cosmicjs.com/v1/clowde/object-type/devterms?limit=500')
      .then((res) => res.json())
      .then((data) => {
        const questions = data.objects.map((obj) => {
          return {
            question: obj.title,
            categories: obj.metadata.categories,
            points: obj.metadata.points
          }
        })

        // DEBUG
        // This is the list of categories we have marked as an option on the server, not necessarily the categories we loaded
        console.log('Available Categories:', data.objects[0].metafields[0].options.map((opt) => opt.value))

        this.load(questions)

        return {
          questions: this.data,
          categories: this.categories
        }
      })
  }

  load = (questions) => {
    questions.forEach(this.addQuestion)
    this.reportStats()
    this.sortQuestions()
    this.sortCategories()
  }

  reportStats = () => {
    console.info('Categories Loaded:', this.categories.length, this.categories)
    console.info('Questions Loaded:', this.data.length, this.data)
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

export default (new QuestionsStore())
