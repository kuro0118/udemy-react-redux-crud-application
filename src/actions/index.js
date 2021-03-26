//chips: アクションを定義、アクションをリターンする (=アクションクリエーターの定義)
import axios from 'axios'

export const READ_EVENTS = 'READ_EVENTS';
export const CREATE_EVENTS = 'CREATE_EVENTS';

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1/';
const QUERYSTRING = '?token=token123';

//chips: 外部APIサーバーに対してリクエストを送信する
//chips: readEventsはピュアなオブジェクトを基本的には返さないと駄目。
//       ..が、redux-thunkを使用することにより、アクションの代わりに関数を返すことが出来る様になる。
//chips: また、関数の引数としてdispatchとgetStateを受け取ることが出来る。
//chips: redexu-thunkやアクション関係ないけど、[何かしら項目] => {} っていうのは"[何かしら項目]を引数としている関数"っていう意味かな??
export const readEvents = () => async dispatch => {
    //chips: 非同期処理でリクエスト送信 
    //       戻り値がPromise。Node.jsの時の様にasync, awaitが使える！)
    const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
    console.log(response);
    dispatch({type: READ_EVENTS, response})
}

// chips: 外部APIサーバーに対して、新規作成のAPIの実行をリクエストする。
// chips: valuesにはEventsNewコンポーネントで入力したtitle, bodyの値が格納されている。
export const postEvents = values => async dispatch => {
    const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
    console.log(response);
    dispatch({type: CREATE_EVENTS, response})
}
