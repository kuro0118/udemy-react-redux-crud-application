import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'

import { getEvent, deleteEvent, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field
    return (
      <div>
        <input {...input} placeholder={label} type={type}></input>
        {touched && error && <span>{error}</span>}
      </div>)
  }

  async onSubmit(values) {
    console.log(this.props)
    await this.props.putEvent(values);
    this.props.history.push('/')
  }

  // chips: this.props.matchでこの画面に遷移時のパラメータオブジェクトが
  //        参照出来るので便利
  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push('/')
  }

  render() {
    // chips: handliSubmitとは、submitをしたときにinputのvalueを引数で取得できるprops
    //        pristineはフォームに入力されるとfalseを返す(活性)。何も入力がされていない場合はtrueになる(非活性)。
    //        submittingはsubmitボタンの処理中はtrueを返す(活性)。まだ、submitボタンが押されていない、つまり
    //        処理中でない場合はfalseを返す(非活性)。
    //        2重押し対策によく使用されえる。
    //        invalidはvalidate発生中にtrue, 何もない時はfalseになる。
    //        エラーが発生しているときはボタンを押させたくない時とか
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field label="Title" name="title" type="text" component={this.renderField} />
        </div>
        <div>
          <Field label="Body" name="body" type="text" component={this.renderField} />
        </div>
        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick}>Delete</Link>
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

// chips: 第二引数のownPropsは現在のpropsのこと。多分、mapStateToPropsに標準搭載されている機能かと。
//        (適当なところでownPropsを使うとエラーになるので)
// chips: 画面初期表示時、actionのreadEventより、指定したIDのデータが取得され、リデューサーを経由して、stateに設定される。
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}

// chips: this.props.XXXXXとしてアクションをインポートして使いたい場合は、下記の定義を忘れない。
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent });

// chips: enableReInitializeとはinitialValuesのpropsが変更される度にフォームを初期化する。
//        要は遷移時のパラメーターをフォームに設定するには、これをtrueにする必要がある、という解釈でOK
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
);
