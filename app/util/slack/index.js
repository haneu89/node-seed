const request = require('request');

const WEBHOOK_URL = 'https://hooks.slack.com/services/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'
const WEBHOOK_CHANNEL = '#artism_database'
const WEBHOOK_NAME = 'Scrapper'
const WEBHOOK_EMOJI = ':ghost:'

function sendMessage(msg) {
    payload = {
        channel: WEBHOOK_CHANNEL,
        username: WEBHOOK_NAME,
        text: msg,
        icon_emoji: WEBHOOK_EMOJI
    }

    request.post(WEBHOOK_URL, {body: JSON.stringify(payload)})
}

exports.sendMessage = sendMessage

// curl -X POST --data-urlencode 'payload={"channel": "#proj-notification", "username": "webhookbot", "text": "This is posted to #proj-notification and comes from a bot named webhookbot.", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/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
