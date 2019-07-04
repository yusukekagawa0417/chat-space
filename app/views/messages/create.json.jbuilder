json.content @message.content
json.image @message.image
json.user @message.user
json.name @message.user.name
json.created_at @message.created_at
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
json.group_id @message.group_id



