class Rss::MoviesController < ApplicationController
  layout "rss"

  def show

    id = params[:id] # retrieve movie ID from URI route
    #@movie = Movie.find(id) # look up movie by unique ID
    # will render app/views/movies/show.<extension> by default

    if params[:weekday] == 'now'
      @movies = Movie.where("rating >=? and cweek = ?",id,Date.today.cweek).order("release_date DESC, title ASC")
    elsif params[:weekday] =~ /\d+/
      @movies = Movie.where("rating >=? and cweek = ?",id,params[:weekday]).order("release_date DESC, title ASC")
    else
      @movies = Movie.where("rating >=?",id).order("release_date DESC, title ASC")
    end

  end

  def index
    if params[:weekday] == 'now'
      @movies = Movie.where("cweek = ?",Date.today.cweek).order("release_date DESC, title ASC")
    elsif params[:weekday] =~ /\d+/
      @movies = Movie.where("cweek = ?",params[:weekday]).order("release_date DESC, title ASC")
    else
      @movies = Movie.find(:all,:order => "release_date DESC, title ASC")
    end
  end

end
