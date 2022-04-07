import Mock from 'mockjs'
const Random = Mock.Random;

//扩展mock
Mock.Random.extend({
  phone: function () {
    let phonePre = ['182', '155', '168']
    return this.pick(phonePre) + Mock.mock(/\d{8}/);
  }
})

const userList = {
  data: [
    {
      id: 0,
      rid:0,
      state:true,
      username: 'admin',
      password: 'admin',
      date: Random.now('second'),
      mobile: Mock.mock('@phone'),
      email:Random.email(),
      token:'0000000000'
    },
    {
      id: 1,
      rid:1,
      state:true,
      username: 'test',
      password: 'test',
      date: Random.now('second'),
      mobile: Mock.mock('@phone'),
      email:Random.email(),
      token:'1111111111'
    },
  ]
}

//MOck.mock({phone:['@phone']})
//随机生成用户数据并添加到userList
for (let i = 2; i < 20; i++){
  userList.data.push({
    id: i,
    rid:1,
    state:true,
    username: Random.first(),
    password:Random.word(3,5),
    date: Random.now('second'),
    mobile: Mock.mock('@phone'),
    email:Random.email()
  })
}

export default userList