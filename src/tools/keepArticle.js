let keepArticle = {}
let article = JSON.parse(window.sessionStorage.getItem('article') || '{}')

// 添加文章
keepArticle.addArticle = function (data) {
  if (data.title) {
    article['title'] = data.title
  }
  if (data.content) {
    article['content'] = data.content
  }
  this.saveArticle(article)
}

//获取文章
keepArticle.getArticle = function (data) {
  return JSON.parse(window.sessionStorage.getItem('article') || '{}')
}

//保存文章
keepArticle.saveArticle = function (article) {
  window.sessionStorage.setItem('article',JSON.stringify(article))
}

//删除文章
keepArticle.delArticle = function () {
  delete article['title']
  delete article['content']
  this.saveArticle(article)
}

export default keepArticle
