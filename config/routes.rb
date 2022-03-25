Rails.application.routes.draw do
  
  devise_for :migrations
  root 'pages#home' 
  devise_for :users
  

end
