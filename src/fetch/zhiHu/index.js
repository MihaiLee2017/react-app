import { get } from '../reuqest'
import * as URL from './url'

function setReplaceUrl(url, rep) {
    return url.replace(/\{([^)]*)\}/, rep)
}

//获取知乎日报
export function getZhiHuLastDaily(date) {
    let url = date ? URL.BEFORE_STORIES : URL.LAST_STORIES
    if (date) {
        url = setReplaceUrl(url, date)
    }
    console.log(url)
    return get(url)
}