class AddOrderingToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :ordering, :integer

  end
end
