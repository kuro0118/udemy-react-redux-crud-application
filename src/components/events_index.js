//chips: クラスコンポーネントを使用する場合は、{Component}を書くこと
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { readEvents } from '../actions';

//chips: クラスコンポーネントが呼ばれる
//chips: ファンクションコンポーネント内ではステートが使えないので注意
// const App = () => (<Counter></Counter>)

//chips: クラスコンポーネントの定義
//chips: Componentを継承(extends)することで定義出来る
//chips: クラスコンポーネント内を記述する際はrender(){…}の中括弧内に書く。
//chips: this.stateで、現在のステートを確認できる。まだ、何もない場合はnull。
//chips: 継承クラスの場合はsuper()で親クラスで初期化を行わせる。 (C#とかJavaでよくあるやつ)
//chips: クラスコンポーネントがインスタンス ⇒ constructor内で初期化が起こる
//       ⇒ ステートにオブジェクトが設定される ⇒ render()によって、DOMを作成。(設定されたステートが出力される)
//chips: 複数のDOMをレンダリングする場合は、React.Fragmentタグで囲む。(復習)
class EventsIndex extends Component {

  // chips: コンポーネントがマウント時(実行された時)に呼ばれるコールバック
  componentDidMount() {
    //chips: リデューサーへのトリガー
    //chips: 外部のAPIサーバーに対してリクエストを送信する
    //chips: リクエスト送信処理の中身はここには書かず、アクションクリエーター内で書くのがお作法
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      //chips: keyを指定しないと、DOMが重複してまっせ！って起こられるので、
      //       keyを指定することで、各DOMをユニークだよ、とブラウザさんに教えてあげる
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  //chips: ステートに対し、設定値を変更する場合はsetState()を使うのが習わし。
  //chips: setState()をすると、画面のレンダリングが再度行われる。(コールバックでレンダリングが行われる)
  //       試しに、render(){…}の中でconsole.logで出力すると、ボタンが押される度に出力される。
  //     　そのため、setStatus()なしでダイレクト設定しても、レンダリングがされないので、
  //       何も画面上は変わらない。
  //chips: connect()による、ストアとコンポーネントの相互処理。ざっくり以下がフローかと。。
  //       ➀ ボタンが押下されると、mapDispatchToPropsのdispatch処理が動く
  //       ➁ dipatch処理を受けたリデューサー(count.js)がアクションタイプからステートを変更
  //       ➂ 変更されたステートがストアからコンポーネントへ。mapStateToPropsで変更後のステートをpropsに設定
  //       ➃ ステートが変更されたので、再レンダリング。render()で、props.valueが画面に反映。
  render() {
    // このthis.propsの実態はconnect()の引数コンポーネント内のpropsのこと。(value, increment, decrement)
    //chips: JSXのテンプレートは{}で囲むみたい？？ 
    /* <div>value: {props.value}</div> */
    /* ここのprops.incrementというのは下記のmapDispatchToPropsで定義したincrementのprops */
    /* そのpropsに紐づく、dispatch(…)がキックされて、リデューサーにアクションタイプが送信されるというわけ */
    /* <button onClick={props.increment}>+1</button> */
    /* ここのprops.incrementというのは下記のmapDispatchToPropsで定義したdecrementのprops */
    /* <button onClick={props.decrement}>-1</button> */

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {this.renderEvents()}
          </tbody>
        </table>
        <Link to="/events_new">New Events</Link>
      </React.Fragment>
    )
  }
}

// chips: 左辺のstateはProviderを使用して、コンポーネントへ流れてきたストアの上位のステート
// chips: 左辺のstate.count.valueはストア(リデューサー)で定義した、initialStateが実態であり、
//        その値をvalueというpropsに設定している
const mapStateToProps = state => {
  console.log("App-state");
  return { events: state.events }
};
// const mapDispatchToProps = dispatch => ({
// // chips: アクションクリエーターで定義したアクションをdispatchの引数として設定し、
// //        リデューサーに送信する。こうすることでリデューサーが検知し、ステートを変更出来る。
// //        この各dispatch関数をincrementのprops、decrementのpropsとして設定している。
//   increment: () => {
//     console.log("App-dispatch")
//     dispatch(increment())},
//   decrement: () => {
//     console.log("App-dispatch")
//     dispatch(decrement())}
// })

const mapDispatchToProps = ({ readEvents });

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
