Rails.application.routes.draw do
  get 'navigator/home', to: 'navigator#home'
  root 'pages#home' 
  devise_for :users
end

