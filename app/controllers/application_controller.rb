class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  before_action :configure_permitted_parameters, if: :devise_controller?
  helper_method :current_user, :signed_in?, :is_admin?

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def signed_in?
    !!current_user
  end

  def is_admin?
    signed_in? ? current_user.admin : false
  end
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :surname,:email,:password] )
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :surname, :email, :password, :password_confirmation] )
  end
end
