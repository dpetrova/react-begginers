import React from 'react'
import PropTypes from 'prop-types'
import { Article } from './Article' // идти в components не нужно, так как мы уже в этой директории

class News extends React.Component {
  state = {
    filteredNews: this.props.data,
  }
  componentWillReceiveProps(nextProps) {
    console.log({ nextProps })
    console.log({ oldProps: this.props })
    let nextFilteredNews = [...nextProps.data] //deep clone
    nextFilteredNews.forEach((item, index) => {
      if (item.bigText.toLowerCase().indexOf('pubg') !== -1) {
        item.bigText = 'СПАМ'
      }
    })
    this.setState({ filteredNews: nextFilteredNews })
  }
  renderNews = () => {
    const { filteredNews } = this.state
    let newsTemplate = null
    if (filteredNews.length) {
      newsTemplate = filteredNews.map(function(item) {
        return <Article key={item.id} data={item} />
      })
    } else {
      newsTemplate = <p>No news yet...</p>
    }
    return newsTemplate
  }
  render() {
    const { filteredNews } = this.state
    return (
      <div className="news">
        {this.renderNews()}
        {filteredNews.length ? (
          <strong className={'news__count'}>
            All news: {filteredNews.length}
          </strong>
        ) : null}
      </div>
    )
  }
}

News.propTypes = {
  data: PropTypes.array.isRequired, // PropTypes (с большой буквы) = библиотека prop-types
}

export { News } // именованный экспорт
