Rails.application.routes.draw do
  resources :subscribers
  get 'navigator/home', to: 'navigator#home'
  root 'pages#home' 
  devise_for :users
end

