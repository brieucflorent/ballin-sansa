task :checkimdb => :environment do
  require 'rubygems'
  require 'mechanize'
  require 'bigdecimal'

  a = Mechanize.new { |agent|
    agent.user_agent_alias = 'Mac Safari'
  }

  movies=[]
  d = Date.today
  
  def download(movie,mv_rating,imdblink,d,year)
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
      Movie.find_or_create_by_title(:title => movie,:rating => BigDecimal.new(mv_rating),:reference => reference,:filename => downloadf,:imdblink => imdblink,:release_date => d,:cweek => d.cweek,:year => Integer(year))
    end
  end

  a.get('http://www.imdb.com/sections/dvd/')do |page|
    #page.parser.xpath('//div[@class="article"]')[0].xpath('.//a/i').children.each do |child|
    page.parser.xpath('//div[@class="info"]').each_with_index do |child,i|
      movie= child.xpath(".//b/a").text
    
      imdblink= "http://www.imdb.com" + child.xpath(".//b/a").attribute("href").text
      rating= child.xpath("//span[@class='rating-rating']/span[@class='value']").children[i].text
      year= child.xpath("//span[@class='year_type']").children[i].text.gsub(/\(|\)/,"")[0..3]
  
      #movies.push(child.text)
      if BigDecimal.new(rating) > 5.1
        puts movie + " " + year + " " + rating 
        download(movie,rating,imdblink,d,year)
      else
        puts "bad movie: " + movie + " " + rating
      end
    end
  end
  

end