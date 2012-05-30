guard 'coffeescript', :output => 'build/src' do
  watch(/^src\/(.*)\.coffee/)
end

guard 'coffeescript', :output => 'build/spec' do
  watch(/^spec\/(.*)\.coffee/)
end

guard 'livereload' do
  watch(/^build\/spec\/.+\.js$/)
  watch(/^build\/src\/.+\.js$/)
end

guard 'sprockets', :destination => "build", :asset_paths => ['build/src'] do
  watch (/^build\/src\/.+\.js$/){ |m| "build/wishbone.js" }
end
