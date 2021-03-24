// chips: カウントリデューサー
// chips: リデューサーの役割とはステートの変更を担う。

import { INCREMENT, DECREMENT } from '../actions'

// ステートの初期値を設定
const initialState = { value: 0 }

// chips: リデューサーを関数として定義
// chips: 受け取ったアクションに対して、ステートを変更させる。
//        その結果を返す。
// chips: action.typeでアクションのタイプを取れる
export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { value: state.value + 1 }
        case DECREMENT:
            return { value: state.value - 1 }
        default:
            return state
    }
}