$(function(){
  function buildHTML(message){
    if(message.content !== null && message.image.url !== null){
      var html = `<div class="message" data-id=${message.id}>
                  <div class="message__upper-box">
                    <p class="message__upper-box__talker">
                      ${message.user.name}
                    </p>
                    <p class="message__upper-box__date">
                      ${message.time}
                    </p>
                  </div>
                  <div class="message__lower-box">
                    <p class="message__lower-box__text">
                      ${message.content}
                    </p>                    
                    <img src="${message.image.url}", class='lower-message__image'>
                  </div>
                </div>`
      return html;
    }
    if(message.content !== null && message.image.url == null){
      var html = `<div class="message" data-id=${message.id}>
                    <div class="message__upper-box">
                      <p class="message__upper-box__talker">
                        ${message.user.name}
                      </p>
                      <p class="message__upper-box__date">
                        ${message.time}
                      </p>
                    </div>
                    <div class="message__lower-box">
                      <p class="message__lower-box__text">
                        ${message.content}
                      </p>                    
                    </div>
                  </div>`
      return html;
    }
    if(message.content == null && message.image.url !== null){
      var html = `<div class="message" data-id=${message.id}>
                    <div class="message__upper-box">
                      <p class="message__upper-box__talker">
                        ${message.user.name}
                      </p>
                      <p class="message__upper-box__date">
                        ${message.time}
                      </p>
                    </div>
                    <div class="message__lower-box">                   
                      <img src="${message.image.url}", class='lower-message__image'>
                    </div>
                  </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.input-box__text').val('');
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })

  var reloadMessages = function() {
    last_message_id = $(".message:last").data("id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      messages.forEach(function(message){
        if(message !== null){
          var html = buildHTML(message);
          $('.messages').append(html);
          console.log('success');
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        };
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  if(window.location.href.match("messages")){
    setInterval(reloadMessages, 5000);
  };
});