import React from 'react'
import classnames from 'classnames'

export default class CategoryList extends React.Component {

  openOption(option) {
    console.log('openOption', option, !option.answered);
    if (!option.answered) {
      this.props.onOptionOpen(option)
    }
  }

  render() {
    if (this.props.options.length === 0) {
      return null
    }

    return (
      <section className="category-list col pt-5 pb-5 flex-nowrap">
        <h2 className="category-title mb-5">{this.props.category}</h2>
        {this.props.options.map((option, i) => {
          let classes = classnames({
            'answered': option.answered,
            'category-question': true
          });
          return <div className="text-center mb-2" key={i}>
            <div className="btn btn-lg btn-primary" onClick={() => this.openOption(option)}>{option.points}</div>
          </div>
        })}
      </section>
    )
  }

}

CategoryList.defaultProps = {
  onOptionOpen: () => {}
};
