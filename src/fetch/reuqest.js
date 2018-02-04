import 'whatwg-fetch'

export function get(url) {
    var result = fetch(url, {
        // headers: {
        //     authority: 'zhihu-daily.leanapp.cn',
        //     method: 'OPTIONS',
        //     path: '/api/v1/last-stories',
        //     scheme: 'https',
        //     accept: '*/*',
        //     'accept-encoding': 'gzip, deflate, br',
        //     'accept-language': 'zh-CN,zh;q=0.9',
        //     'access-control-request-headers': 'authority',
        //     'access-control-request-method': 'GET',
        //     origin: 'http://localhost:3000',
        //     referer: 'http://localhost:3000/',
        // }
    })
    return result
}