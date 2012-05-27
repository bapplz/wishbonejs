guard 'coffeescript', :output => 'src/javascripts' do
  watch(/^src\/coffeescripts\/(.*)\.coffee/)
end

guard 'coffeescript', :output => 'spec/javascripts' do
  watch(/^spec\/coffeescripts\/(.*)\.coffee/)
end

guard 'livereload' do
  watch(/^spec\/javascripts\/.+\.js$/)
  watch(/^src\/javascripts\/.+\.js$/)
end

guard 'sprockets', :destination => "build", :minify => true, :asset_paths => ['src/javascripts'] do
  watch (/^src\/javascripts\/.+\.js$/){ |m| "build/wishbone.js" }
end
