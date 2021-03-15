const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    env: {
        contentApi: 'eu-sfcc-ps-demo.cdn.content.amplience.net'
    },
    poweredByHeader: false
}