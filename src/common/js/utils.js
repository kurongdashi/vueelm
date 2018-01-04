/**
 * Created by Administrator on 2017/12/26.
 */
/**
 * @example ?id=123&a=b
 * @return {id:123,a:b}
 */
export default function urlParse() {
  let url = window.location.search;
  url=url==''?'?id=123&a=b':url;
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  let obj = {};
  // [?id=123,&a=b]
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    })
  }
  return obj;
}
