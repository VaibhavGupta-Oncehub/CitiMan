class User < ApplicationRecord
  # Include default devise modules. Others available are:
  #  :omniauthable
  

  validates_presence_of  :name
  validates_presence_of  :surname
  validates_presence_of :email, unique: true

  validates_length_of :name, :minimum => 1, :maximum => 10 
  validates_length_of :surname, :minimum => 1, :maximum => 10 
  
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,:confirmable, :lockable, :timeoutable, :trackable

  


end
