Rails.application.routes.draw do
  root 'pages#home' 
  get 'navigator/home', to: 'navigator#home'
  devise_for :users
  resources :subscribers
  get '/smart_mobility/dashboard', to: 'smart_mobility#mobility_dashboard'
  get '/smart_mobility/ilocator', to: 'smart_mobility#iLocator'
  get '/smart_mobility/iroutor', to: 'smart_mobility#iRoutor'
  get '/smart_mobility/iplacepolygon', to: 'smart_mobility#iPlacePolygon'
  get '/smart_mobility/ifinder', to: 'smart_mobility#iFinder'
  get '/smart_mobility/alongroutor', to: 'smart_mobility#AlongRoutor'
end

