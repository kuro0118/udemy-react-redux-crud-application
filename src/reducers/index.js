// chips: index.jsでは全てのreducerを1つのreducerに結合する
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import events from './events';

// chips: reducerを結合
// chips: redux-formとストアを結びつけるために、下記の様に、redux-fromのリデューサーを加える必要がある。
export default combineReducers({ events, form })

// chips: 大体のプロジェクトでは多くのreducersを列挙し、結合することが多い
//        状態管理したいものを列挙する
// export default combineReducers({foo, baz, bar})