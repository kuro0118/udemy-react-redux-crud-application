import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'

import { postEvents } from '../actions';

// chips: placeholderとは、入力欄に初期値を出すための属性。(css同様)
// chips: fieldの実態が何なん？と思うけど、イメージ的には...Fieldコンポーネントの
//        component属性から渡されるevent?みたいなもの。
//        Fieldコンポーネントの属性としてlabel,name,typeが指定されており、
//        それらが下記のconstで宣言したオブジェクトの各プロパティに設定されるイメージ。(Fieldによって各属性を吸い上げている)
//        (実際にFieldコンポーネントからlabelを削除すると、"Title"って文言が入力フォームにでなくなるため。)
//        入力フォームに指定したい属性や振舞いをオブジェクトに格納している、というイメージがしっくりくるか
// chips: あいまいだけど、touched&&errorは入力時のエラーアクションを定義。(validate)
//        入力してエラーがあった場合は<span>...</span>というDOMを付与するよってこと。
// chips: input...というのはスプレッド構文。スプレッド構文にすることで、title, body両方に対して1行で定義できるため。(実際はname属性が含まれている。)
//        逆に使用しないと、renderFieldを別個で用意する必要がある。
// chips: 因みにJSX界隈だと、return(...)という形で、()の中にDOMを書くのが慣例なのだと。
// chips: bind(…)の行に対しては、こうしないとonSubmit関数にてthisを使う時に予期しないところを参照してしまうのを防ぐため。
class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    return (
      <div>
        <input {...input} placeholder={label} type={type}></input>
        {touched && error && <span>{error}</span>}
      </div>)
  }

  // chips: valuesの実態はrender()で定義した、ラベル別のFieldコンポーネントの入力値(value)が設定されている。
  async onSubmit(values) {
    // chips: connectで紐づけしたmapDispatchToPropsのpostEventsのprops
    // chips: historyは...多分仕様上デフォルトで入っているpropsかと。
    console.log(this.props)
    await this.props.postEvents(values);
    this.props.history.push('/')
  }

  render() {
    // chips: this.propsはオブジェクト構造になっており、その中で"handleSubmit"のプロパティだけ取り出して、設定するため
    //        波括弧にしている。
    // chips: handliSubmitとは、submitをしたときにinputのvalueを引数で取得できるprops
    //        pristineはフォームに入力されるとfalseを返す(活性)。何も入力がされていない場合はtrueになる(非活性)。
    //        submittingはsubmitボタンの処理中はtrueを返す(活性)。まだ、submitボタンが押されていない、つまり
    //        処理中でない場合はfalseを返す(非活性)。
    //        2重押し対策によく使用されえる。
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="Title" name="title" type="text" component={this.renderField} />
        </div>
        <div>
          <Field label="Body" name="body" type="text" component={this.renderField} />
        </div>
        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting} />
          <Link to="/">Cancel</Link>
        </div>
      </form>
    )
  }
}

// chips: valuesの実態はrender()で定義した、ラベル別のFieldコンポーネントの入力値(value)が設定されている。
const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "enter a tile, please."
  if (!values.body) errors.body = "enter a body, please."

  return errors
}
// chips: EventsNewのPropsとしてconnect時に追加する
const mapDispatchToProps = ({ postEvents });
// chips: EventsNewとReduxFormを紐づける必要がある。
//        reduxFrom()の戻り値の関数に対して、EventNewを引数で渡す。
// chips: reduxFrom()の関数自体はフォームの仕様、設定を決める関数である。(どういうフォームを作るの？)
//        なので、その設定値を引数として渡してあげる。
// chips: 下記の様にすることで、入力フォーム(=EventsNew)の変更時にvalidateが実行され、Storeに通知される。
// chips: reduxForm({form:'XXXXX'})(hoge)と書くことにより、redux-formが提供するpropsを受け取れる様になる。
//        reduxFormのpropsはhandleSubmit, pristine, submitting, invalidがある。
//        今回はhandliSumbitを使うよって訳。
// chips: というか悩んだら、EventsNewの頭についているconnect(mapStateToProps, mapDispacthToPropsの定義)やら、reduxFormで定義したPropsを、
//        EventsNew内で、this.props.hogehogeみたいな形で使えるよって憶えておこう
export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
);
