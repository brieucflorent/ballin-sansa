task :checkimdb => :environment do
  require 'rubygems'
  require 'mechanize'
  require 'bigdecimal'

  a = Mechanize.new { |agent|
    agent.user_agent_alias = 'Mac Safari'
  }

  movies=[]
  d = Date.today
  def download(movie,mv_rating,imdblink,d)
    a = Mechanize.new { |agent|
      agent.user_agent_alias = 'Mac Safari'
    }
    page = a.get 'http://isohunt.com/torrents/'+ movie.gsub(/ /,'+') +'?ihs1=1&iho1=d&iht=1'
    newrating=0
    newlink=""
    title=""
    page.links_with(:href => /\/torrent_details\//).each do |link|
      if link.text =~ /\+\d/
        rating=Integer(link.text.gsub(/\+(\d+).*/,'\1'))
        comments=link.text.gsub(/(\+\d+ \d+).*/,'\1')
        if rating >= newrating
          title= link.node.parent.content.gsub(comments,"").gsub(/^\[DL\] /,"").downcase.gsub(/ |\.|-|\//,'')
          if title.downcase.start_with?(movie.downcase.gsub(/ |\.|-|\//,''))
          #puts "title matching for download " + title
          newrating=rating
          newlink = link
          #else
          #puts "no matching for download " + title
          end

        end
      end
    end
    if newlink !=""
      reference = newlink.click.link_with(:href => /\/download\//).href
      downloadf = reference.split('/')[-1]
      puts reference + " movie " + movie
      Movie.find_or_create_by_title(:title => movie,:rating => BigDecimal.new(mv_rating),:reference => reference,:filename => downloadf,:imdblink => imdblink,:release_date => d,:cweek => d.cweek)
    end
  end

  a.get('http://www.imdb.com/sections/dvd/')do |page|
    page.parser.xpath('//div[@class="article"]')[0].xpath('.//a/i').children.each do |child|
      movies.push(child.text)
    end
  end

  movies.uniq.each do |movie|

    if Movie.where(:title => movie).length == 0 then
      page = a.get "http://www.imdb.com/"
      search_form = page.form_with :id => "navbar-form"
      search_form.field_with(:name => "q").value = movie
      search_results = a.submit search_form
      rating="0"
      imdblink = ""
      if search_results.body =~ /Exact Matches|Partial Matches/
        link = search_results.links_with(:href => /title\/tt/)[0]
        imdblink =  "http://www.imdb.com" + link.uri.to_s
        rating = link.click.parser.xpath('//span[@itemprop="ratingValue"]').text
      title = link.text
      elsif search_results.body =~ /Ratings/
        imdblink= search_results.uri.to_s
        title = search_results.parser.xpath('//h1[@itemprop="name"]').text.gsub(/\r\n|\n|\r|\(.*/,'')
        rating = search_results.parser.xpath('//span[@itemprop="ratingValue"]').text
      end
      if BigDecimal.new(rating) > 5.1
        puts movie + " " + rating
        download(movie,rating,imdblink,d)
      else
        puts "bad movie: " + movie + " " + rating
      end
    else
      puts movie
    end
  end

  a.get('http://www.imdb.com/boxoffice/rentals') do |page|
    page.links_with(:href => /title\/tt/).each do |link|
      if Movie.where(:title => link.text).length == 0 then
        imdblink= "http://www.imdb.com" + link.uri.to_s
        rating =link.click.parser.xpath('//span[@itemprop="ratingValue"]').text
        if BigDecimal.new(rating) > 5.1 then
          puts link.text + " " + rating
          download(link.text,rating,imdblink,d)
        end
      else
        puts link.text
      end
    end
  end

end