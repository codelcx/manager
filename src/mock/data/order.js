import Mock from 'mockjs'
const Random = Mock.Random;

const order = []

for (let i = 0; i < 20; i++){
  order.push({
    ordr_id: i,
    order_number: Random.email(),
    order_price: Random.natural(50, 200),
    order_create: Random.now('second'),
    order_play: Random.boolean(),
    order_good:Random.boolean(),
  })
}

export default order