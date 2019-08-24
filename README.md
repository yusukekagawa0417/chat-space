# アプリの名前

 chat-space  

## 簡単な説明
 
 グループチャットアプリ  

 
## 機能
 
 1) ユーザー登録機能  
 2) ユーザー編集機能  
 3) グループ作成機能  
 4) グループ編集機能  
 5) メッセージ一覧表示機能（自動更新処理）  
 6) メッセージ投稿機能（非同期処理）　


## 使い方
 
 1) ページの参照にログインは不要です  
 2) グループ作成、メッセージ投稿にはログインが必要です  
 3) パソコンの画面を最大にしてお使いください  
 
## デプロイ
 AWS  
 http://52.193.246.52/  
 
 
## DB設計

### users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

#### Association
- belongs_to :group
- belongs_to :user


### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|text|null: false|

#### Association
- has_many :groups, through: :users_groups
- has_many :users_groups
- has_many :comments


### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

#### Association
- has_many :users, through: :users_groups
- has_many :users_groups
- has_many :comments


### commentsテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

#### Association
- belongs_to :user
- belongs_to :group
