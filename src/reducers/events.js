// chips: カウントリデューサー
// chips: リデューサーの役割とはステートの変更を担う。
// chips: リデューサー = アクションによってステートを変更するコンポーネント
import {
    READ_EVENTS,
    READ_EVENT,
    CREATE_EVENTS,
    UPDATE_EVENT,
    DELETE_EVENTS
} from '../actions'
import _ from 'lodash'

// chips: リデューサーを関数として定義
// chips: 受け取ったアクションに対して、ステートを変更させる。
//        その結果を返す。
// chips: action.typeでアクションのタイプを取れる
// chips: 詳細を話すと、ここのactionに該当するものが、コンポーネントから送信された
//        dispatch()で飛ばされた、アクションクリエーターのアクションタイプ。dispatch()の引数。
// chips: 引数のeventsにステートが入ってくるイメージ。
//        例えば、READ_EVENTSを一度呼び出すと、action.response.dataのオブジェクトが格納される。
const events = (events = {}, action) => {
    console.log("reducer");
    switch (action.type) {
        case READ_EVENT:
        case CREATE_EVENTS:
        case UPDATE_EVENT:
            console.log(events);
            const data = action.response.data;
            // chips: eventsオブジェクト(...events)を全展開し、その中で、対象のID([data.id])をKeyに持つ、データを
            //        今回レスポンスしたデータ(右辺のdata)で更新したい！
            return { ...events, [data.id]: data };
        case READ_EVENTS:
            console.log(events);
            // chips: 第二引数に指定した、オブジェクトのプロパティをkeyとして、第一引数の対象のオブジェクト配列の要素をマッピングする
            // 　　　　イメージ：[{id:1, name:'nanae'}, {id:2, name:'haruo'}]
            //                  ⇒ 1:{id:1, name:'nanae'}, 2:{id:2, name:'haruo'} ※key×valueのmapオブジェクトにしてくれる
            // console.log(_.mapKeys(action.response.data, 'id'));
            return _.mapKeys(action.response.data, 'id');
        case DELETE_EVENTS:
            // chips: イベント情報から該当のIDを探して削除する
            // chips: javascript準拠の説明だと、オブジェクトから指定のプロパティを削除する。
            delete events[action.id];
            // chips: スプレッド構文で書くことで、リデューサーが『新しいメモリ上に』更新後のevent情報を返してくれる。
            // chips: Reduxの変更検知自体がステート同士の『参照比較』であるため、プロパティの値のみ変更されるパターン等は
            //        Reduxで検知してくれないため、レンダリングされないなどの現象になるので注意。
            //        state.hoge = action.hoge ×設定しても、変更前のステート、変更後のステートの参照が同じであるため、検知されない。
            // chips: ...XXXという設定以外にも、return Object.assign({}, events)という方法でも可能
            return { ...events }
        default:
            return events
    }
}

export default events;