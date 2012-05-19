class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model
    omniauth=request.env["omniauth.auth"]

    authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    if authentication
      flash[:notice] = "Signed in successfully."
      sign_in_and_redirect(:user, authentication.user)
    else
      @user = User.find_for_facebook_oauth(omniauth, current_user)

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Facebook"

        #render :text => omniauth.extra.raw_info.email +  "first: " + omniauth.extra.raw_info.first_name.to_s + " last: " + omniauth.extra.raw_info.last_name.to_s + " uid " + omniauth["uid"]

        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.facebook_data"] = request.env["omniauth.auth"]
        render :text => omniauth.extra.raw_info.email + " " + omniauth.info.raw_info.nickname + " " + omniauth.info.raw_info.first_name + " " + omniauth.info.raw_info.last_name

      #redirect_to new_user_registration_url
      end
    end
  end

  def google
    omniauth=request.env["omniauth.auth"]

    authentication = Authentication.find_by_provider_and_uid(omniauth['provider'], omniauth['uid'])
    if authentication
      flash[:notice] = "Signed in successfully."
      sign_in_and_redirect(:user, authentication.user)
    else
      @user = User.find_for_open_id(request.env["omniauth.auth"], current_user)

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"

        #render :text => omniauth.info.last_name + omniauth.info.first_name + " uid " + omniauth["uid"]
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
    end
  end

  def google_apps
    omniauth=request.env["omniauth.auth"]
    @user = User.find_for_googleapps_oauth(request.env["omniauth.auth"], current_user)

    if @user.persisted?
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
      render :text => omniauth.inspect

    #sign_in_and_redirect @user, :event => :authentication
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def passthru
    render :file => "#{Rails.root}/public/404.html", :status => 404, :layout => false
  # Or alternatively,
  # raise ActionController::RoutingError.new('Not Found')
  end

  #application_controller
  def after_sign_in_path_for(resource)
    #session_return_to = session[:return_to]
    #session[:return_to] = nil
    #stored_location_for(resource) || session_return_to || root_path
    if request.env['omniauth.origin']
      request.env['omniauth.origin']
    end
  end
  
end