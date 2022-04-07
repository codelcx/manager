//将树形结构转换为列表
function tree2List(tree) {
  return tree.reduce((accu, item) => {
    if (!item.children) {
      accu.push(item);
    } else {
      const subList = tree2List(item.children);
      accu.push(item, ...subList);
    }
    return accu;
  },[])
}


export default tree2List