import React from 'react' // подключение библиотеки React
import logo from './logo.svg'
import './App.css' // подключение файла стилей
import PropTypes from 'prop-types'

const myNews = [
  {
    id: 1,
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText:
      'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.',
  },
  {
    id: 2,
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!',
  },
  {
    id: 3,
    author: 'Max Frontend',
    text: 'Прошло 2 года с прошлых учебников, а $ так и не стоит 35',
    bigText: 'А евро опять выше 70.',
  },
  {
    id: 4,
    author: 'Гость',
    text: 'Бесплатно. Без смс, про реакт, заходи - https://maxpfrontend.ru',
    bigText:
      'Еще есть группа VK, telegram и канал на youtube! Вся инфа на сайте, не реклама!',
  },
]

class Article extends React.Component {
  state = {
    visible: false, // определили начальное состояние
  }
  handleReadMoreClck = e => {
    e.preventDefault()
    //this.setState({ visible: true });
    this.setState({ visible: true }, () => {
      console.log('Состояние изменилось')
    })
  }
  render() {
    const { author, text, bigText } = this.props.data
    const { visible } = this.state // вытащили visible из this.state
    console.log('render', this)
    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        {!visible && (
          <a
            onClick={this.handleReadMoreClck}
            href="#"
            className="news__readmore"
          >
            Подробнее
          </a>
        )}
        {visible && <p className="news__big-text">{bigText}</p>}
      </div>
    )
  }
}

Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string,
  }),
}

class News extends React.Component {
  renderNews = () => {
    const { data } = this.props
    let newsTemplate = null
    if (data.length) {
      newsTemplate = data.map(function(item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }
    return newsTemplate
  }
  render() {
    const { data } = this.props
    return (
      <div className="news">
        {this.renderNews()}
        {data.length ? (
          <strong className={'news__count'}>
            Всего новостей: {data.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired, // PropTypes (с большой буквы) = библиотека prop-types
}

const Comments = () => {
  return <p>Нет comments...</p>
}

//Controlled Component
//   class TestInput extends React.Component {
//     state = {
//       myValue: ""
//     };
//     onChangeHandler = e => {
//       this.setState({ myValue: e.currentTarget.value });
//     };
//     onBtnClickHandler = e => {
//       alert(this.state.myValue);
//     };
//     render() {
//       return (
//         <React.Fragment>
//           <input
//             className="test-input"
//             onChange={this.onChangeHandler}
//             value={this.state.myValue}
//             placeholder="введите значение"
//           />
//           <button onClick={this.onBtnClickHandler}>Показать alert</button>
//         </React.Fragment>
//       );
//     }
//   }

//Uncontrolled Component
class TestInput extends React.Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
  }
  componentDidMount() {
    // ставим фокус в input
    this.input.current.focus()
  }
  onBtnClickHandler = e => {
    alert(this.input.current.value)
  }
  render() {
    return (
      <React.Fragment>
        <input
          className="test-input"
          defaultValue=""
          placeholder="введите значение"
          ref={this.input}
        />
        <button onClick={this.onBtnClickHandler}>Показать alert</button>
      </React.Fragment>
    )
  }
}

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

//   const App = () => {
//     return (
//       <React.Fragment>
//         <h3>Новости</h3>
//         {/*<TestInput /> */}
//         <Add />
//         <News data={myNews} /> {/* добавили свойство data */}
//         <Comments />
//       </React.Fragment>
//     );
//   };

class App extends React.Component {
  state = {
    news: myNews, // в начальное состояние положили значение из переменной
  }
  handleAddNews = data => {
    // сначала мы формируем массив, на основе всего того, что уже было в новостях
    // и кладем это все в новый массив + новую новость кладем в начало массива
    const nextNews = [data, ...this.state.news]
    // затем обновляем новый массив новостей в this.state.news
    this.setState({ news: nextNews })
  }
  render() {
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {/* считали новости из this.state */}
        <News data={this.state.news} />
      </React.Fragment>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App
