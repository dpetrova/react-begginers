import React from 'react'
import PropTypes from 'prop-types'

class Add extends React.Component {
  state = {
    name: '',
    text: '',
    bigText: '',
    agree: false,
  }
  onBtnClickHandler = e => {
    e.preventDefault()
    const { name, text, bigText } = this.state
    this.props.onAddNews({
      id: +new Date(), // в id сохраняется количество миллисекунд прошедших с 1 января 1970 года в часовом поясе UTC
      author: name, // name сохраняем в поле author
      text,
      bigText,
    })
  }
  handleChange = e => {
    const { id, value } = e.currentTarget
    //console.log({ [id]: e.currentTarget.value });
    this.setState({ [id]: value })
  }
  // handleNameChange = e => {
  //   this.setState({ name: e.currentTarget.value });
  // };
  // handleTextChange = e => {
  //   this.setState({ text: e.currentTarget.value });
  // };
  handleCheckboxChange = e => {
    // чтобы установить true/false считываем свойство checked
    this.setState({ agree: e.currentTarget.checked })
  }
  validate = () => {
    const { name, text, agree } = this.state
    if (name.trim() && text.trim() && agree) {
      return true
    }
    return false
  }
  render() {
    const { name, text, bigText } = this.state // вытащили значения из стейта
    return (
      <form className="add">
        <input
          id="name"
          type="text"
          onChange={this.handleChange}
          //onChange={this.handleNameChange}
          className="add__author"
          placeholder="Ваше имя"
          value={name}
        />
        <textarea
          id="text"
          onChange={this.handleChange}
          //onChange={this.handleTextChange}
          className="add__text"
          placeholder="Текст новости"
          value={text}
        />
        <textarea
          id="bigText"
          onChange={this.handleChange}
          className="add__text"
          placeholder="Текст новости подробно"
          value={bigText}
        />
        <label className="add__checkrule">
          <input type="checkbox" onChange={this.handleCheckboxChange} /> Я
          согласен с правилами
        </label>
        <button
          className="add__btn"
          onClick={this.onBtnClickHandler}
          disabled={!this.validate()}
        >
          Add news
        </button>
      </form>
    )
  }
}

Add.propTypes = {
  onAddNews: PropTypes.func.isRequired, // func используется для проверки передачи function
}

export { Add } // именованный экспорт
