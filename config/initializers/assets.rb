# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )

Rails.application.config.assets.precompile += %w( custom.js custom.scss )
Rails.application.config.assets.precompile += %w( noframework.waypoints.min.js mobile-or-tablet.js dom-helpers.js foldable.js info-hint.js formatters.js results-manager.js guidance-panel.js searchbox-enter-submit.js layer-manager.js buttons-group.js buttons-group.js search-results-parser.js side-panel.js tail-selector.js side-panel.js search-marker.js search-markers-manager.js tail.select.min.js tabs.js)

