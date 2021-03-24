//chips: クラスコンポーネントを使用する場合は、{Component}を書くこと
import React, { Component } from 'react';

//chips: クラスコンポーネントが呼ばれる
//chips: ファンクションコンポーネント内ではステートが使えないので注意
const App = () => (<Counter></Counter>)

//chips: クラスコンポーネントの定義
//chips: Componentを継承(extends)することで定義出来る
//chips: クラスコンポーネント内を記述する際はrender(){…}の中括弧内に書く。
//chips: this.stateで、現在のステートを確認できる。まだ、何もない場合はnull。
//chips: 継承クラスの場合はsuper()で親クラスで初期化を行わせる。 (C#とかJavaでよくあるやつ)
//chips: クラスコンポーネントがインスタンス ⇒ constructor内で初期化が起こる
//       ⇒ ステートにオブジェクトが設定される ⇒ render()によって、DOMを作成。(設定されたステートが出力される)
//chips: 複数のDOMをレンダリングする場合は、React.Fragmentタグで囲む。(復習)
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  //chips: ステートに対し、設定値を変更する場合はsetState()を使うのが習わし。
  //chips: setState()をすると、画面のレンダリングが再度行われる。(コールバックでレンダリングが行われる)
  //       試しに、render(){…}の中でconsole.logで出力すると、ボタンが押される度に出力される。
  //     　そのため、setStatus()なしでダイレクト設定しても、レンダリングがされないので、
  //       何も画面上は変わらない。
  handlePlusButton = () =>{
    console.log("you plus pushed!!");
    this.setState({count: this.state.count + 1});
    //chips: このようなダイレクトな設定は出来ない。setState()を使うべし！とワーニングが出る。
    // this.state.count = this.state.count + 1;  
  }

  handleMinusButton = () =>{
    console.log("you minus pushed!!");
    this.setState({count: this.state.count - 1});
    //chips: このようなダイレクトな設定は出来ない。setState()を使うべし！とワーニングが出る。
    // this.state.count = this.state.count + 1;  
  }

  render() {
    return (
      <React.Fragment>
        <div>count: {this.state.count}</div>
        <button onClick={this.handlePlusButton}>+1</button>
        <button onClick={this.handleMinusButton}>-1</button>
      </React.Fragment>
    )
  }
}
export default App;
