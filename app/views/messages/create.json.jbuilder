json.content @message.content
json.image @message.image
json.url @message.image.url
json.user @message.user
json.name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")


