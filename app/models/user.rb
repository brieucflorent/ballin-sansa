class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,:omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :first_name, :last_name

  
  # Setup accessible (or protected) attributes for your model
  has_many :authentications
  #attr_accessible :email
  def apply_omniauth(omniauth)
    #self.email = omniauth['user_info']['email'] if email.blank?
    #self.email = omniauth['uid'] if email.blank?
    authentications.create!(:provider => omniauth['provider'], :uid => omniauth['uid'])
  end

  def password_required?
    (authentications.empty? || !password.blank?) && super
  end

  def self.find_for_facebook_oauth(access_token, signed_in_resource=nil)
    data = access_token.extra.raw_info
    #if user = self.find_by_first_name_and_last_name(data.first_name,data.last_name)
    if user = self.find(:first,:conditions => [ "lower(first_name) = ? and lower(last_name)=?", data.first_name.downcase,data.last_name.downcase])
       user
    else # Create a user with a stub password.
      user=self.create!(:email => data.email, :first_name => data.first_name, :last_name => data.last_name,:password => Devise.friendly_token[0,20])
    end
    
    user.apply_omniauth(access_token)
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"]
      end
      if data = session['devise.googleapps_data'] && session['devise.googleapps_data']['user_info']
        user.email = data['email']
      end
      if data = session['devise.google_data'] && session['devise.google_data']['user_info']
        user.email = data['email']
      end
    end
  end

  def self.find_for_googleapps_oauth(access_token, signed_in_resource=nil)
    data = access_token['info']
    if user = User.where(:email => data['email']).first
      user
    else #create a user with stub pwd
      user=User.create!(:email => data['email'], :first_name => data['first_name'],:last_name => data['last_name'], :password => Devise.friendly_token[0,20])
    end
    user.apply_omniauth(access_token)
    user
  end

  def self.find_for_open_id(access_token, signed_in_resource=nil)
    data = access_token.info
    if user = self.find(:first,:conditions => [ "lower(first_name) = ? and lower(last_name)=?", data.first_name.downcase,data.last_name.downcase])
      user
    else
      user=User.create!(:email => data["email"], :first_name => data.first_name, :last_name => data.last_name, :password => Devise.friendly_token[0,20])
    end
    user.apply_omniauth(access_token)
    user
  end
end
