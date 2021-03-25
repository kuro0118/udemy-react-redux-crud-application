// chips: importの後の中括弧無しはファイルから全体importしている
//        中括弧付きは特定のオブジェクトのみをimportしている
// chips: export defaultされたものを使いたい時、importする側は任意の名前を付けることが可能

import React from 'react';
import ReactDOM from 'react-dom';
// chips: redux-thunkはミドルウェアであるため、
//        アプリでミドルウェアを使える様にするために、reduxからインポートしておく。
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk'

// chips: ここで作成されるストアはアプリケーションでユニークのものになる
//        アプリケーション内のステートは全て、このストアーに集約されている
// chips: crateStoreの第二引数にapplyMiddleware関数、その引数にthunkを渡すことによって、
//        storeの中に組み込まれる。
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  // chips: React.StrictModeとは、何かアプリの潜在的な問題を検出するために追加された、コンポーネント。
  //        イメージ的にはtry-catchのfatalなエラー検知版？？
  // chips: プロバイダーでラップし、定時したストアーを渡すことで、アプリケーション内のどのコンポーネントからでも
  //        ストアーのステートを受け取ることが出来る。
  // chips: Appコンポーネント内でdispatchされた場合、リデューサーに送信される。(今回だとcreateState()に設定したcount.js)
  <React.StrictMode>
    <Provider store={store}>
      <EventsIndex />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
