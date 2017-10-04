'use strict';

var request = require('request');
var nodemailer = require('nodemailer');

var sites = require('./sites.json');
var cfg = require('./config.json');
var auth = require('./auth.json');

const smtp_pw = auth.gmail;

const INTERVAL_MINUTES = cfg.interval_minutes;
const INTERVAL = INTERVAL_MINUTES * (60 * 1000);

var sender_email = cfg.sender_email.replace('@', '%40');
var mailTransport = nodemailer.createTransport('smtps://' + sender_email + ':' + smtp_pw + '@' + cfg.smtp_host);


function send(options) {
    mailTransport.sendMail(options, function(error, info) {
        if (error) {
            return console.error(error.message);
        }

        console.log('Message sent: ' + info.response);
    });
}

function noPingResponse(name, url) {
    var mailOptions = {
        from: "SITECHECKER <david7789@gmail.com>",
        to: "Me <david7789@gmail.com>",
        subject: "WEBSITE DOWN: " + name,
        text: "Website down: " + url,
        html: "<h1> Website Down: " + url + "</h1><br/><p>The ping checker indicates that " + url + " is down.</p>"
    }
    
    send(mailOptions);
    
    
    console.error('No ping response for url %s!', url);
}

function checker() {
    Object.keys(sites).forEach((sitename) => {
        var site_url = sites[sitename];
        request
            .get(site_url)
            .on('response', function(response) {
                if (response.statusCode === 404) {
                    noPingResponse(sitename, site_url);
                }   // else no action needed
                else {
                    console.log("Site: %s Status: %s", site_url, response.statusCode)
                }
            })
            .on('error', function(error) {
                console.error('[%s] SITE ISSUE:\n%s', sitename, error.message);
                noPingResponse(sitename, site_url);
            });

    });
}

setInterval(checker, INTERVAL);
