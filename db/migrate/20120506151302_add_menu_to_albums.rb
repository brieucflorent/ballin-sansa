class AddMenuToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :menu, :string

  end
end
