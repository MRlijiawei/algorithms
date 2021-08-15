function getUrlParam(sUrl, sKey) {
    const urlMap = {}
    try {
        let urlMapAr = sUrl.split("?")[1].split("#")[0].split("&")
        urlMapAr.forEach(e => {
            let er = e.split("=")
            if (urlMap[er[0]] === undefined) {
                urlMap[er[0]] = er[1]
            } else {
                if (Array.isArray(urlMap[er[0]])) {
                    urlMap[er[0]].push(er[1])
                } else {
                    urlMap[er[0]] = [urlMap[er[0]], er[1]]
                }
            }
        })
    } catch(e) {}
    return sKey ? (urlMap[sKey] || "") : urlMap
}