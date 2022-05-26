class SmartEnvironmentController < ApplicationController
  before_action :authenticate_user!  
  

  def environment_dashboard
  end

  def iweather
    redirect_to "https://www.ventusky.com/", layout: false
  end
  
end
