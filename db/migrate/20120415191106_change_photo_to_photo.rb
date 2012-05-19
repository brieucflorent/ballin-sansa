class ChangePhotoToPhoto < ActiveRecord::Migration
  def up  
    rename_column Photo,:photo,:imagefile
  end

  def down
    rename_column Photo,:imagefile,:photo
  end
end
