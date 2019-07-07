class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])   
    if params[:last_message_id].present?
      @messages = @group.messages.where( "id > #{params[:last_message_id]}" )
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      end
    end
  end
end