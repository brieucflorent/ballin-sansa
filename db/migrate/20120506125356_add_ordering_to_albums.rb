class AddOrderingToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :ordering, :integer

  end
end
