const env = process.env.NODE_ENV;

if ( env === 'develop' ) {
    module.exports = require( "./config.dev" );
} else if ( env === 'production' ) {
    module.exports = require( "./config.pro" );
} else {
    module.exports = require( "./config.dev" );
}
