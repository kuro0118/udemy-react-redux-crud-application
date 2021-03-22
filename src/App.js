//chips: JSXとしてコンパイルする場合、import Reactは必要
import React, { Component } from 'react';
class App extends Component {
  render() {
    //chips: DOMを格納する場合はクォーテーションなし、そのまま設定
    // const greeting = "Hello, world!!";

    //chips1: {変数}で変数の値をDOMに埋め込める
    //chips2: クラス定義はclassNameを使用する (classでないことに注意)
    // const dom = <h1 className="foo">{greeting}</h1>;

    //chips:　onイベントを付与したDOM
    // const dom = <input type="text" onChange={() => {console.log('I am clicked!!')}}/>

    // chips1: labelタグのfor属性はhtmlForとしないと駄目。
    // chips2: return (…)内は1つのタグ構造のみしか指定出来ないので注意。
    //         大枠を<div>、もしくは<React.Fragment>で囲むなどの工夫が必要。(後者の方が無駄なdivタグが減るのでオススメ)
    return (
      <React.Fragment>
        <label htmlFor="bar">
          bar
        </label>
        <input type="text" onChange={() => {console.log('I am clicked!!')}}/>
      </React.Fragment>
    )
  }
}

export default App;
