class MoviesController < ApplicationController
  # layout :resolve_layout
  # def resolve_layout
  # case action_name
  # when "show"
  # "rss"
  # else
  # "application"
  # end
  # end
  def show

    id = params[:id] # retrieve movie ID from URI route
    #@movie = Movie.find(id) # look up movie by unique ID
    # will render app/views/movies/show.<extension> by default

    if params[:weekday] == 'now'
      @movies = Movie.where("rating >=? and cweek = ?",id,Date.today.cweek).order("year DESC,release_date DESC, title ASC")
    elsif params[:weekday] =~ /\d+/
      @movies = Movie.where("rating >=? and cweek = ?",id,params[:weekday]).order("year DESC,release_date DESC, title ASC")
    else
      @movies = Movie.where("rating >=?",id).order("year DESC,release_date DESC, title ASC")
    end

  end

  def index
    if params[:weekday] == 'now'
      @movies = Movie.where("cweek = ?",Date.today.cweek).order("year DESC,release_date DESC, title ASC")
    elsif params[:weekday] =~ /\d+/
      @movies = Movie.where("cweek = ?",params[:weekday]).order("year DESC,release_date DESC, title ASC")
    else
      @movies = Movie.find(:all,:order => "year DESC,release_date DESC, title ASC")
    end
  end

end
