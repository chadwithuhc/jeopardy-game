import React from 'react'
import classnames from 'classnames'

export default class CategoryPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    }
  }

  toggleSelected(category) {
    let index = this.state.selected.indexOf(category);
    let selected = this.state.selected;
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

  onSubmit = (e) => {
    e.preventDefault();

    this.props.onSaveCategories(this.state.selected);
  };

  render() {
    let classes = classnames({
      'category-picker': true
    });
    return (
      <section className="jumbotron mb-0 text-center">
        <form onSubmit={this.onSubmit} className={classes}>
          <h1 className="mb-5">Pick Categories</h1>
          <div className="container">
            <div className="row">
                {this.props.categories.map((category) => {
                  let active = this.state.selected.indexOf(category) > -1 ? "btn-primary" : "btn-outline-primary";
                  return <div className="col-md-auto mb-3" key={category}>
                    <li className={'btn btn-lg btn-block ' + active}  onClick={this.toggleSelected.bind(this, category)}>{category}</li>
                  </div>
                })}
            </div>
          </div>
          <button type="submit" className="btn btn-success mt-2">Add Categories</button>
        </form>
      </section>
    )
  }

}

CategoryPicker.defaultProps = {
  categories: []
};
