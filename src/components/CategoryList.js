import React from 'react'
import classnames from 'classnames'

export default class CategoryList extends React.Component {

  openOption(option) {
    console.log('openOption', option, !option.answered)
    if (!option.answered) {
      this.props.onOptionOpen(option)
    }
  }

  render() {
    if (this.props.options.length === 0) {
      return null
    }

    return (
      <section className="col flex-nowrap">
        <h2 className="category-title">{this.props.category}</h2>
        {this.props.options.map((option, i) => {
          let classes = classnames({
            'answered': option.answered,
            'category-question': true
          })
          return <p className={classes} key={i} onClick={() => this.openOption(option)}>{option.points}</p>
        })}
      </section>
    )
  }

}

CategoryList.defaultProps = {
  onOptionOpen: () => {}
}
