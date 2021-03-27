// chips: importの後の中括弧無しはファイルから全体importしている
//        中括弧付きは特定のオブジェクトのみをimportしている
// chips: export defaultされたものを使いたい時、importする側は任意の名前を付けることが可能

import React from 'react';
import ReactDOM from 'react-dom';
// chips: redux-thunkはミドルウェアであるため、
//        アプリでミドルウェアを使える様にするために、reduxからインポートしておく。
// chips: redux-thunkを使う事で、actionに非同期処理の関数を変えさせることが出来る、
//        入れていない場合はピュアな単一オブジェクトのみしか返せない
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import reducer from './reducers'
import EventsIndex from './components/events_index';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk'
// chips: Routerの外でLinkメソッドを使える様にするため、以下をインポートしている。
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

// chips: ここで作成されるストアはアプリケーションでユニークのものになる
//        アプリケーション内のステートは全て、このストアーに集約されている
// chips: crateStoreの第二引数にapplyMiddleware関数、その引数にthunkを渡すことによって、
//        storeの中に組み込まれる。
// chips: デバックモードか否かを判定し、デバックモードである場合はcomposeWithDevTools関数でラップする
const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)

const store = createStore(reducer, enhancer);

ReactDOM.render(
  // chips: React.StrictModeとは、何かアプリの潜在的な問題を検出するために追加された、コンポーネント。
  //        イメージ的にはtry-catchのfatalなエラー検知版？？
  //         >> EventsNewにreduxForm辺りを実装すると、ブラウザでエラーが出てしまう？
  //            (調査したところ、redux-Form側のアップグレードを待つ必要がありそう。)
  // chips: プロバイダーでラップし、定時したストアーを渡すことで、アプリケーション内のどのコンポーネントからでも
  //        ストアーのステートを受け取ることが出来る。
  // chips: Appコンポーネント内でdispatchされた場合、リデューサーに送信される。(今回だとcreateState()に設定したcount.js)
  // chips: ルーティングにはBrowserRouter、Switch、それらにラップされたRouteコンポーネントを使う。
  //        Routerコンポーネントの第一引数が遷移先、第二引数が遷移処理を行いたい関数コンポーネント。
  // chips: Routerの第一引数のexactがないと、"前方一致"しているコンポーネントを全てルーティングする。
  //        それを防ぐために、exactを指定している。exactを指定していると、完全一致したコンポーネントのみルーティング
  //        してくれる様になる。
  // chips: 今回の場合だとLint to XXXX の XXXXに当たる部分をpathで指定することによって、そのリンクに対してのルーティングが出来る。
  //        因みに指定するpath≠アプリの階層パスではないため、注意。
  //        コンポーネント内でLink to = "hamachi"にして、Routeのpathを"hamachi"にしていてもリンク遷移出来る。(その場合、URLには"hamachi"と表示されるが)
  // chips: ルーティング時のパラメータ文字列は:XXという形にすることのを注意。(XXの文字列自体は何でもいい。)
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/events_new' component={EventsNew} />
        <Route path='/events/:id' component={EventsShow} />
        <Route exact path='/events' component={EventsIndex} />
        <Route exact path='/' component={EventsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
