Movies::Application.routes.draw do

  get "home/index"

  root :to => "home#index"
  #devise_for :users,:controllers => {:registrations => 'registrations' }
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  #match '/auth/:provider/callback', :to => 'authentications#create'  
  
  devise_scope :user do
     get '/users/auth/:provider' => 'users/omniauth_callbacks#passthru'
  end
  

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  
  resources :movies, :id => /\d+(\.\d+)?/, :only => [:index,:show]

  #resources :movies,:only => [:index]
  
  namespace :rss do
     resources :movies, :id => /\d+(\.\d+)?/, :only => [:index,:show] 
  end
  
  
  # resources :albums do
     # resources :photo, :only => [:create, :destroy]
  # end
  

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end
  

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
       # Directs /admin/products/* to Admin::ProductsController
       # (app/controllers/admin/products_controller.rb)
       

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
