import React from 'react'
import classnames from 'classnames'

export default class CategoryPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected
    }
  }

  toggleSelected(category) {
    let index = this.state.selected.indexOf(category)
    let selected = this.state.selected
    if (index > -1) {
      selected.splice(index, 1)
    }
    else {
      selected.push(category)
    }

    this.setState({
      selected: selected
    })
  }

  render() {
    let classes = classnames({
      'category-picker': true
    })
    return (
      <section className={classes}>
        <h2>Pick Categories</h2>
        <ul className="list-group">
          {this.props.categories.map((category) => {
            let classes = classnames({
              'list-group-item': true,
              'bg-success': this.state.selected.indexOf(category) > -1
            })
            return <li className={classes} key={category}  onClick={this.toggleSelected.bind(this, category)}>{category}</li>
          })}
        </ul>
        <button className="btn btn-success" onClick={() => this.props.onSaveCategories(this.state.selected)}>Add Categories</button>
      </section>
    )
  }

}

CategoryPicker.defaultProps = {
  categories: []
}
