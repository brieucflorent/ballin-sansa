class Photo < ActiveRecord::Base
  attr_accessible :imagefile,:title,:ordering
  belongs_to :album
  mount_uploader :imagefile, PhotoUploader
  
  after_initialize :default_values

  private
    def default_values
      self.ordering ||= Photo.maximum(:ordering) + 1
    end
end
