var template = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
     <head>
        <title>WEB1 - ${title}</title>
       <meta charset="utf-8">
     </head>
     <body>
       <h1><a href="/">HOME</a></h1>


        <a href= "join">회원가입</a>
        <a href= "login>로그인</a>
        
        <a href ="/author">저자</a>
        ${list}
        ${control}
        ${body}
      </body>
    </html>
    `;
  },
  HTML2: function (title, list, body) {
    return `
    <!doctype html>
    <html>
     <head>
        <title>WEB1 - ${title}</title>
       <meta charset="utf-8">
     </head>
     <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${title}
        ${body}
      </body>
    </html>
    `;
  },
  list: function (topics) {
    var list = "<ul>";
    var i = 0;
    while (i < topics.length) {
      list =
        list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
  authorTable: function (authors) {
    var tag = "<table>";
    var i = 0;
    while (i < authors.length) {
      tag += `
              <tr>
                  <td>${authors[i].name}</td>
                  <td>${authors[i].profile}</td>
                  <td>
                    <a href="/author/update?id=${authors[i].id}">update</a>
                  </td>
                  <td>
                    <form action="/author/delete_process" method ="post">
                      <input type="hidden" name ="id" value="${authors[i].id}">
                      <input type="submit" value="delete">
                    </form>
              </tr>`;
      i++;
    }
    tag += `</table>`;
    return tag;
  },
  joinhtml: function (title, body) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
          <!-- Bootstrap CSS -->
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body>
          <div class="container mt-5">
              ${body}
          </div>
          <!-- Bootstrap JS 및 Popper.js -->
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
      </html>
  `;
  },
};

module.exports = template;
