import React from 'react';
import propTypes from 'prop-types';

const App = () => {

  const profiles = [
    {
      name: "Taro", age: 10
    },
    {
      name: "Hanako", age: 5
    },
    {
      name: "NaNae", age: 3
    }
  ]

  //chips: コンポーネントのpropsの定義(nameとかageとか..)はこちらで行う
  return (
    <div>
      {
        profiles.map((el, index) => {
          return <User name={el.name} age={el.age} key={index} />
        })
      }
    </div>
  )
}

//chips: ファンクションコンポーネントの定義
const User = (props) => {
  return <div>Hi! I am {props.name}, and {props.age} years old! </div>
}

//chips XXXX.propTypes ～ と記載することで型定義を行うことが出来る。
//chips 更に.isRequiredと記載すると、Userコンポーネントを使う場合は、
//      指定した属性への引数は省略できないよ、と定義することが出来る。
User.propTypes = {
  name: propTypes.string,
  age: propTypes.number.isRequired
}

export default App;
