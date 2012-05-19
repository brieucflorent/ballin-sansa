class Album < ActiveRecord::Base
  attr_accessible :imagefile,:name,:description,:ordering,:menu
  has_many :photos,  :dependent => :destroy
  def photos=(attrs)
    attrs.each { |attr| self.photos.build(:imagefile => attr) }
  end
end
