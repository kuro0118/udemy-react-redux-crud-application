// chips: カウントリデューサー
// chips: リデューサーの役割とはステートの変更を担う。
import { READ_EVENTS } from '../actions'
import _ from 'lodash'

// chips: リデューサーを関数として定義
// chips: 受け取ったアクションに対して、ステートを変更させる。
//        その結果を返す。
// chips: action.typeでアクションのタイプを取れる
// chips: 詳細を話すと、ここのactionに該当するものが、コンポーネントから送信された
//        dispatch()で飛ばされた、アクションクリエーターのアクションタイプ。dispatch()の引数。
const events = (events = {}, action) => {
    console.log("reducer");
    switch (action.type) {
        case READ_EVENTS:
            console.log(action.response.data);
            // chips: 第二引数に指定した、オブジェクトのプロパティをkeyとして、第一引数の対象のオブジェクト配列の要素をマッピングする
            // 　　　　イメージ：[{id:1, name:'nanae'}, {id:2, name:'haruo'}]
            //                  ⇒ 1:{id:1, name:'nanae'}, 2:{id:2, name:'haruo'} ※key×valueのmapオブジェクトにしてくれる
            // console.log(_.mapKeys(action.response.data, 'id'));
            return _.mapKeys(action.response.data, 'id');
        default:
            return events
    }
}

export default events;