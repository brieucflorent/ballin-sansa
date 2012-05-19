class CreateMovies < ActiveRecord::Migration
  def up
    create_table :movies do |t|
      t.string :title
      t.decimal :rating
      t.text :description
      t.string :reference
      t.string :filename
      t.string :imdblink
      t.datetime :release_date
      t.integer :cweek
      # Add fields that let Rails automatically keep track
      # of when movies are added or modified:
      t.timestamps
    end
  end

  def down
    drop_table :movies
  end
end
