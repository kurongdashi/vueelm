/**
 * Created by Administrator on 2017/12/26.
 */
export function saveToLocal(id,key,val) {
  let seller={}
  seller[id]={};
  seller[id][key]=val;
  let str=JSON.stringify(seller);
  window.localStorage.setItem('seller',str);

}
export function getLocal(id,key,def) {
  let seller=window.localStorage.getItem('seller');
  if(!seller){
    return def;
  }else{
    let obj=JSON.parse(seller);
    return obj[id][key];
  }
}
