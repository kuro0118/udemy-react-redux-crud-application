//chips: クラスコンポーネントを使用する場合は、{Component}を書くこと
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
//chips: 各コンポーネントでは使いたいUIを適宜importして使うような形になる
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import { readEvents } from "../actions";

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
  // chips: 初期表示処理とかしたいときに使う
  componentDidMount() {
    //chips: リデューサーへのトリガー
    //chips: 外部のAPIサーバーに対してリクエストを送信する
    //chips: リクエスト送信処理の中身はここには書かず、アクションクリエーター内で書くのがお作法
    this.props.readEvents();
  }

  renderEvents() {
    return _.map(this.props.events, (event) => (
      //chips: keyを指定しないと、DOMが重複してまっせ！って起こられるので、
      //       keyを指定することで、各DOMをユニークだよ、とブラウザさんに教えてあげる
      //chips: Linkコンポーネントでラップすることで、文字列をリンクに出来る。
      //       ラップ中にタグがあるとエラーになるので、タグは外だしすること。
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ));
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
    //chips: displaySelectAll属性はtrueにすると、全選択チェックボックスを表示する
    //chips: adjustForCheckBox属性はtrueにすると、チェックボックス分のマージンをカラム幅に取る。
    //chips: displayRowCheckBox属性はtrueにすると、明細毎のチェックボックスを表示する。
    //chips: floatingActionButtonコンポーネントのコンテナーとして、リンクコンポーネントを指定する。
    //chips: contentAdd = ラベルが"+"文字のボタン
    console.log("onload");
    const style = {
      position: "fixed",
      right: 12,
      bottom: 0
    }
    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/events_new" />}>
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Body</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderEvents()}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

// chips: 左辺のstateはProviderを使用して、コンポーネントへ流れてきたストアの上位のステート
// chips: 左辺のstate.count.valueはストア(リデューサー)で定義した、initialStateが実態であり、
//        その値をvalueというpropsに設定している
const mapStateToProps = (state) => {
  console.log("App-state");
  return { events: state.events };
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

const mapDispatchToProps = { readEvents };

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
