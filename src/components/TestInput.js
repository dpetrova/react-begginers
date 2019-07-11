import React from 'react'

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

export { TestInput } // именованный экспорт
