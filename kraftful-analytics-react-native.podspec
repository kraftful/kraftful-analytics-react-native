require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "kraftful-analytics-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11" }
  s.source       = { :git => "https://github.com/kraftful/kraftful-analytics-react-native.git", :tag => "#{s.version}" }

  
  s.static_framework = true

  s.dependency "React-Core"
  s.dependency "segment-analytics-react-native"
  s.dependency "sovran-react-native"
end