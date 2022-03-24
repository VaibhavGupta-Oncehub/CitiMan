Rails.application.routes.draw do
  
  
  root 'pages#home' 
  
  get '/login', to: 'sessions#new'

end
