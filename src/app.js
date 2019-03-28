import React from 'react'
import ReactDOM from 'react-dom'
import QuestionsStore from './stores/QuestionsStore'
import CategoryPicker from './components/CategoryPicker'
import CategoryList from './components/CategoryList'
import QuestionFullscreen from './components/QuestionFullscreen'
import AddUsers from './components/AddUsers'
import ScoreBox from './components/ScoreBox'
import Debugging from './debugging'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: QuestionsStore.categories,
            selectedCategories: [],
            currentQuestion: null,
            users: null
        };

        // DEBUG
        if (Debugging.mockUsers) {
            this.state.users = Debugging.mockUsersState
        }
        if (Debugging.mockCategories) {
            this.state.selectedCategories = Debugging.mockCategoriesState
        }
    }

    componentDidMount() {
        // DEBUG
        if (Debugging.mockQuestions) {
            QuestionsStore.load(Debugging.mockQuestionsState);
            this.forceUpdate();
            return // END
        }

        QuestionsStore.loadData().then(({categories}) => {
            this.setState({categories})
        })
    }

    onSaveCategories = (selectedCategories) => {
        this.setState({selectedCategories});
        console.log('Categories', selectedCategories)
    };

    onOptionOpen = (currentQuestion) => {
        this.setState({currentQuestion});
        console.log('Current Question', currentQuestion)
    };

    onOptionClose = () => {
        QuestionsStore.removeQuestion(this.state.currentQuestion);
        this.setState({currentQuestion: null});
        console.log('Answered Question')
    };

    onSubmitUsers = (users) => {
        this.setState({users});
        console.log(users);
    };

    // Auto increase scores and switch to user that answer correctly
    onUpdateScores = (answeredUser, correctness, points) => {
        this.state.users.map((user, i) => {
            if(correctness){
                this.state.users[i].myTurn = false;
            }
            if(answeredUser === user){
                if(!answeredUser.myTurn && correctness){
                    this.state.users[i].myTurn = true;
                }

                if(correctness){
                    this.state.users[i].points += points;
                }else{
                    this.state.users[i].points -= points;
                }
            }
        });
        if(correctness){
            this.onOptionClose()
        }
    };

    renderQuestionScreen = () => {
        return !!this.state.currentQuestion ?
            <QuestionFullscreen
                question={this.state.currentQuestion}
                users={this.state.users}
                onWindowClose={this.onOptionClose}
                onUpdateScores={this.onUpdateScores}/> : null
    };

    renderUsersForm = () => {
        return !this.state.users ? <AddUsers onSubmit={this.onSubmitUsers}/> : null
    };

    renderCategoryPicker = () => {
        return !this.state.selectedCategories.length && this.state.users ? (
            <CategoryPicker categories={this.state.categories} selected={this.state.selectedCategories}
                            onSaveCategories={this.onSaveCategories}/>
        ) : null
    };

    renderSelectedCategories = () => {
        return this.state.selectedCategories.length && this.state.users ? (
            <div className="container">
                <div className="row">
                    {this.state.selectedCategories.map((category) => {
                        return <CategoryList category={category} key={category}
                                             options={QuestionsStore.getQuestionsForCategory(category)}
                                             onOptionOpen={this.onOptionOpen}/>
                    })}
                </div>
            </div>
        ) : null
    };

    renderScoreBox = () => {
        return this.state.selectedCategories.length && this.state.users ? (
            <ScoreBox users={this.state.users} onSwitchUser={this.onSubmitUsers}/>
        ) : null
    };

    render() {
        return (
            <main>
                {this.renderScoreBox()}

                {this.renderCategoryPicker()}

                {this.renderSelectedCategories()}

                {this.renderQuestionScreen()}

                {this.renderUsersForm()}
            </main>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById('container'));
