const protocol = window.location.protocol + "//"
const config = {
    development: {
        domain: {
            sms: protocol + '',
            service: protocol + ''
        }
    },
    test: {
        domain: {
            sms: protocol + '',
            service: protocol + ''
        }
    },
    production: {
        domain: {
            sms: protocol + '',
            service: protocol + ''
        }
    }
}
const env = process.env.NODE_ENV || 'production'
export default config[env]