import React from 'react' // подключение библиотеки React
import { Add } from './components/Add' // ./ = текущая директория,
import { News } from './components/News'
import './App.css' // подключение файла стилей

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }
  handleAddNews = data => {
    // сначала мы формируем массив, на основе всего того, что уже было в новостях
    // и кладем это все в новый массив + новую новость кладем в начало массива
    const nextNews = [data, ...this.state.news]
    // затем обновляем новый массив новостей в this.state.news
    this.setState({ news: nextNews })
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('http://localhost:3000/data/news.json')
      .then(response => {
        return response.json()
      })
      .then(newsData => {
        console.log(this) //что так как мы используем стрелочные функции - мы не потеряли this
        console.log('приехали данные ', newsData)
        // this.setState({ isLoading: false, news: newsData.data })
        // добавили задержку в три секунды
        setTimeout(() => {
          this.setState({ isLoading: false, news: newsData.data })
        }, 3000)
      })
  }
  render() {
    const { news, isLoading } = this.state // все необходимое взяли из state
    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>News</h3>
        {isLoading && <p>Loading...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App
