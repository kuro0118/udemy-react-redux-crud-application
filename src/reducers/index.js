// chips: index.jsでは全てのreducerを1つのreducerに結合する
import { combineReducers } from 'redux';
import events from './events';

// chips: reducerを結合
export default combineReducers({ events })

// chips: 大体のプロジェクトでは多くのreducersを列挙し、結合することが多い
//        状態管理したいものを列挙する
// export default combineReducers({foo, baz, bar})