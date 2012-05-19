class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title
      t.string :mainfile
      t.string :thumbfile
      t.timestamps
    end
  end
end
