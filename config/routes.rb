Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:edit, :upload, :new, :create] do
    resources :messages, only: [:index, :create]
  end
end
