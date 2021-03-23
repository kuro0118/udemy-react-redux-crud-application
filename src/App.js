//chips: JSXとしてコンパイルする場合、import Reactは必要
import React from 'react';

// chips: Userコンポーネントに対し、"name"という名前のprops(属性)を与えている
const App = () => {

  // chips2: これは多分標準のJavaScriptのコード
  // chips3: NaNaeさんは年齢のpropsが存在しないため、
  //         defaultPropsで定義した値が設定される。
  const profiles = [
    {
      name: "Taro", age: 10
    },
    {
      name: "Hanako", age: 5
    },
    {
      name: "NaNae"
    }
  ]

  // chips3: {}内にJavaScriptコーディングが出来る??
  // chips4: 下記、key属性を指定しなくても問題ないが、ワーニングが出る。
  //         これはユニークでないDOMツリーが出来てしまうため。
  //         それを防ぐために、key属性でそれぞれ別のものだよ、っていうのをブラウザに教えることが出来る
  return (
    <div>
      {
        profiles.map((el, index) => {
          return <User name={el.name} age={el.age} key={index}/>
        })
      }
    </div>
  )
}

// chips: 下記の形を関数コンポーネントという。
const User = (props) => {
  return <div>Hi! I am {props.name}, and {props.age} years old! </div>
}

// chips5: コンポーネントのpropが不定である場合に、デフォルト値で以下を設定する..という意味
User.defaultProps = {
  age: 1
}

export default App;
