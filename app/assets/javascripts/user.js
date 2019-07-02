$(function() {
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  };

  function appendErrMsgToHTML(msg){
    var html = `${ msg }`
    search_list.append(html);
  };

  function appendUser2(name, id){
    var html2 = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>`
    $("#chat-group-users").append(html2);
  };

  var names = []
  var user_ids = []
  var preinput = "";

  $(".chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field").val();
    if(preinput !== input){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {  keyword: input ,keyword2: names },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
          appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するメンバーはいません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    }
  });
  
  $('#user-search-result').on('click', '.user-search-add', function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    var input = $("#user-search-field").val();
    
    names.push(name);
    user_ids.push(id);
    appendUser2(name, id, user_ids);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input ,keyword2: names },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
        appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });    
  });

  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");

    idx = names.indexOf(name);
    names.splice(idx, 1);
    idx = user_ids.indexOf(id);
    user_ids.splice(idx, 1);

    var input = $("#user-search-field").val();
    if(preinput !== input){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {  keyword: input ,keyword2: names },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
          appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するメンバーはいません");
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    }
  });
});