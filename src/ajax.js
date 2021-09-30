const baseUrl = 'https://server.sortinghat.cn'
var Ajax = {
  get: function(url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl+url, true);
    xhr.onreadystatechange = function() {
      if ((xhr.readyState == 4 && xhr.status == 200) || xhr.status == 304) {
        fn.call(this, JSON.parse(xhr.responseText).data);
      }
    };
    xhr.send();
  },
  post: function(url, data, fn) {
    console.log('jinru',url);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl+url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, JSON.parse(xhr.responseText).data);
      }
    };
    xhr.send(JSON.stringify(data));
  },
};

export default Ajax;
