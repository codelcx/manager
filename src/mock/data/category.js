//商品分类
const category = [
  {
    cat_id: 1,
    cat_name:"商品一级1",
    cat_level: "0",
    children: [
      {
        cat_id: 11,
        cat_name: "商品二级1",
        cat_level: "1",
        children: [
          {
            cat_id: 111,
            cat_name: "商品三级1",
            cat_level:"2"
          },
          {
            cat_id: 112,
            cat_name: "商品三级2",
            cat_level:"2"
          }
        ]
      },
      {
        cat_id: 12,
        cat_name: "商品二级2",
        cat_level: "1",
        children: [
          {
            cat_id: 121,
            cat_name: "商品三级1",
            cat_level:"2"
          },
          {
            cat_id: 122,
            cat_name: "商品三级2",
            cat_level:"2"
          }
        ]
      }
    ]
  }
]



export default category