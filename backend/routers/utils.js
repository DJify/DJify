const buildSpotifyApiRequest = (url, access_token, extras) => ({
    url,
    headers: { 'Authorization': 'Bearer ' + access_token },
    json: true,
    ...extras,
})

module.exports = {
    buildSpotifyApiRequest
}