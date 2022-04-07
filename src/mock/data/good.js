import parameter from './parameter'
import param from './parameter'

// good_name: '',
// good_cat: '',
// good_price: '',
// good_number: '',
// good_weight: '',
// good_introduce: '',
// pics: '',
// attrs: ''
const good = [
  {
    cat_id: 111,
    good_id: 1,
    good_name: '商品1',
    good_price:100,
    good_number: 100,
    good_weight: 10,
    good_introduce: '商品1介绍',
    good_pic: [],
    good_s_attr: '',
    good_d_attr: [],
    good_create:'2022/1/1'
  },
  {
    cat_id: 122,
    good_id: 2,
    good_name: '商品2',
    good_price:200,
    good_number: 200,
    good_weight: 20,
    good_introduce: '商品2介绍',
    good_pic: [],
    good_s_attr: '',
    good_d_attr: [],
    good_create:'2022/1/1'
  }
]

for (let i = 0; i < good.length; i++){
  for (let j = 0; j < param.length; j++){
    if (good[i].cat_id == param[j].cat_id) {
      if (Array.isArray(parameter[j].attr_value)) {
        good[i].good_d_attr = parameter[j].attr_value;
      } else {
        good[i].good_s_attr = parameter[j].attr_value;
      }
    }
  }
}


export default good