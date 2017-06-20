/**
 * DEBUGGING
 * =========
 *
 * To added debugging for a feature, include a property and state (optional) for it below
 */

 import PhoneScreenData from './data/PhoneScreenData.json'
 import JavascriptData from './data/JavascriptData.json'
 import BackendData from './data/BackendData.json'

export default {

  // Mock all question data
  mockQuestions: true,
  mockQuestionsState: PhoneScreenData.concat(JavascriptData).concat(BackendData),

  // Auto-filled users
  mockUsers: false,
  mockUsersState: [
    { name: 'Lisa', points: 0, myTurn: 1 },
    { name: 'Bart', points: 0 },
    { name: 'Marge', points: 0 }
  ],

  // Automatically selected categories
  mockCategories: false,
  mockCategoriesState: [ // CASE-SENSITIVE
    'Front end', 'Back end', 'DOM', 'Phone Screen',
    'APIs', 'Async', 'Concepts', 'Node.js', 'OOP',
    'ES6', 'Open-ended', 'Scope', 'Security'
  ]

}
