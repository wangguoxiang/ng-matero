const apiBase = 'api'
const apiVersion = 'v1'
const ApiVersion2 = 'v2'

export const ApiAddress = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    PASSWORD: 'password',
    CAPTCHA: 'captcha',
    RESETPASSWORD: 'reset/password',
    PROFILE_EMAIL: 'profile/email',
    WS_PUSH: 'wspush',
    AVATAR: 'avatar',
    PROFILE: 'profile',
    SSLINFO: 'sslinfo',
    SSLALL: 'sslall',
    SSLALLINFO: 'sslallinfo',
    DNSCHECKER: 'dnschecker',
}

export const ApiV2Address = {
    REGISTER: 'register',
    PROFILE: 'profile',
}

Object.keys(ApiAddress).forEach((key) => {
    ApiAddress[key] = `${apiBase}/${apiVersion}/${ApiAddress[key]}`
})

Object.keys(ApiV2Address).forEach((key) => {
    ApiV2Address[key] = `${apiBase}/${ApiVersion2}/${ApiV2Address[key]}`
})
