$(function(){
  function buildHTML(message){
    var html = `.message
                  .message__upper-box
                    %p.message__upper-box__talker
                      = ${message.user.name}
                    %p.message__upper-box__date
                      = ${message.created_at.strftime("%Y/%m/%d %H:%M")}
                  .message__lower-box
                    - if ${message.content}.present?
                      %p.message__lower-box__text
                        = ${message.content}
                    = image_tag ${message.image.url}, class: 'lower-message__image' if ${message.image}.present?`
    return html;
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.input-box__text').val('')
    })
    .fail(function{
      alert('error');
    })
  })
})