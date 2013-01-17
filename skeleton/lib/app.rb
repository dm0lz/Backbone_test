require 'sinatra/base'
require 'pry'
require 'better_errors'
require 'haml'
require 'sass'

class App < Sinatra::Base

	set :views, "views"
	set :public_folder, "public"
	set :haml, :format => :html5, :escape_attrs => false
	set :port, 4567
	enable :sessions
	
	use BetterErrors::Middleware
	BetterErrors.application_root = File.expand_path("..", __FILE__)

	get '/style.css' do
		sass :style
	end

	get '/' do
		haml :index 
	end


end
