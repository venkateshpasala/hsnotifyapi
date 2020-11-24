"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var download = require("download");
var dotenv = require("dotenv");
//import * as http from 'http';
var Request = require("request");
var fs = require("fs");
var Bandwidth = require("node-bandwidth");
var Multer = require("multer");
var AWS = require("aws-sdk");
var MulterS3 = require("multer-s3");
var uuid = require("uuid/v4");
var moment = require("moment-timezone");
var elasticsearch = require("elasticsearch");
var d3 = require("d3");
var d3c = require("d3-collection");
var log4js_1 = require("log4js");
log4js_1.configure("./log4js.config");
var log4jslogger = log4js_1.getLogger();
var esClient = new elasticsearch.Client({
    host: 'https://elastic:XOwFQQx983a77XW5p5RoNo6h@6c572ba545cc45609161790ba6dbc7d8.us-west-1.aws.found.io:9243/',
    log: 'error'
});
//Elastic Search - Search Function
var search = function search(index, body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, esClient.search({ index: index, body: body })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var nodemailer = require('nodemailer');
var BandwidthMessaging = require('@bandwidth/messaging');
dotenv.config();
var Mixpanel = require('mixpanel');
var mixpanel = Mixpanel.init("666282ccb892339b12298ffaf5bf5059");
var app = express();
var nano = require('nano')(process.env.COUCHBASE_DB);
var storage = Multer.memoryStorage();
var upload = Multer({ storage: storage });
AWS.config.loadFromPath('./aws_config.json');
var s3 = new AWS.S3({});
var cron = require('node-cron');
var s3_storage = {
    storage: MulterS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'spoke-mms',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, uuid() + "." + file.originalname.split('.').pop());
        }
    })
};
var notificationdata = {
    data: [
        {
            "didnumber": "5656558558",
            "propertyid": "13610b8c468fc2557f1a7d40d33c4a42",
            "type": "notify",
            "data": {
                "escalation": [
                    {
                        "name": "Mr Bossman",
                        "waittime": 1000,
                        "callingnumber": "+15024663992",
                        "type": "sms"
                    }
                ],
                "notify": [
                    {
                        "name": "ScottGoogle",
                        "data": [
                            {
                                "callingnumber": "+15028226244",
                                "type": "sms",
                                "pin": 1234,
                                "waittime": 30
                            },
                            {
                                "callingnumber": "+15028226244",
                                "type": "phone",
                                "pin": 1234,
                                "waittime": 45
                            }
                        ]
                    },
                    {
                        "name": "CallHippo",
                        "data": [
                            {
                                "callingnumber": "+16502739177",
                                "type": "sms",
                                "pin": 1234,
                                "waittime": 30
                            },
                            {
                                "callingnumber": "+16502739177",
                                "type": "phone",
                                "pin": 1234,
                                "waittime": 45
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
var livereplydata = {
    data: [
        {
            "didnumber": "5656558558",
            "propertyid": "13610b8c468fc2557f1a7d40d33c4a42",
            "type": "live",
            "maxonholdtime": 60,
            "data": [
                {
                    "name": "ScottGoogle",
                    "pin": 1234,
                    "phones": [
                        {
                            "callingnumber": "+15028226244",
                            "ring": 30
                        }
                    ]
                },
                {
                    "name": "CallHippo",
                    "pin": 1234,
                    "phones": [
                        {
                            "callingnumber": "+16502739177",
                            "ring": 30
                        }
                    ]
                }
            ]
        }
    ]
};
var s3_upload = Multer(s3_storage);
// const avatar_upload = Multer({ avatarStorage });
var https = require('https');
var http = require("http");
// const fs = require('fs');
var privateKey = fs.readFileSync('./certs/key.key', 'utf8');
var certificate = fs.readFileSync('./certs/cert.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app);
app.use(logger("dev"));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true,
    parameterLimit: 1000000,
    limit: '50mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());
app.set('superSecret', 'SuperDuperSecretDoNotTellAnyone');
app.use(function (req, res, next) {
    res.on('finish', function () {
        // Do whatever based on status code
        if (res.statusCode === 500) {
            console.error("Error at: " + req.url, req.body);
        }
    });
    next();
});
// Lifted from the index_sms.js on Teamwork
var client = new Bandwidth({
    userId: "u-enlczxkbnudy7tclkqsnyea",
    apiToken: "t-2uakaqql6gmln5c5k2pnboa",
    apiSecret: "7grhxwroryz2s4wnuggjm7jidpa4icrenrz5vuq"
});
var serverlog = function (level, message, methodname) {
    console.log('serverlog');
    console.log(process.env.ELASTIC_SEARCH_SERVER);
    ;
    var now = moment().utc().format();
    var payload = {
        "timestamp": now,
        "level": level,
        "message": message,
        "servernode": "node server",
        "methodname": methodname
    };
    var options = {
        method: 'POST',
        url: process.env.ELASTIC_SEARCH_SERVER + "/hpsapperrorlog/_doc",
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload,
        json: true
    };
    Request(options, function (error, response, body) {
        if (error) {
            console.log(error + '//' + 'error');
        }
        else {
            console.log("log sucuessfully inserted");
            //console.log (body)
        }
    });
};
var debugMessage = function (message, type) {
    if (type === void 0) { type = 'debug'; }
    var log_message = "could not be assigned " + typeof message;
    if (typeof message === 'string') {
        log_message = message;
    }
    else if (typeof message === 'object') {
        log_message = JSON.stringify(message);
    }
    console.log(process.env.LOCAL_DEBUGING);
    if (process.env.LOCAL_DEBUGING === "true") {
        console.log(message);
    }
    else {
        log4jslogger.level = type;
        log4jslogger.debug(message);
    }
};
debugMessage("server started");
var getkazooaccountinfo = function (req, accountid) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var apiKey, accountpromiss, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = null;
                if (!(req === null)) return [3 /*break*/, 2];
                return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                _a.label = 2;
            case 2:
                accountpromiss = new Promise(function (resolve, reject) {
                    getKazooRequest(req, apiKey)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountid, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        var account;
                        return __generator(this, function (_a) {
                            if (err) {
                                debugMessage(err, "error");
                                resolve(err);
                                return [2 /*return*/];
                            }
                            account = JSON.parse(body);
                            //  console.log("\n\n\n accounts\n", account);
                            resolve(account);
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, accountpromiss];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var sendemail = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var smtpConfig, transporter, accountname, mailOptions;
    return __generator(this, function (_a) {
        smtpConfig = {
            host: process.env.SMTP_MAIL_SERVER,
            port: 25,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL_SERVER_USERNAME,
                pass: process.env.SMTP_MAIL_SERVER_PASSWORD
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        };
        transporter = nodemailer.createTransport(smtpConfig);
        accountname = payload.data.primarykazooaccount.name;
        debugMessage("accountname  " + accountname, "info");
        mailOptions = {
            from: process.env.SMTP_MAIL_SERVER_FROM,
            to: payload.data.username,
            subject: ' NOTIFY Account activation ',
            text: 'This is the email regarding NOTIFY account activation.',
            html: "<!DOCTYPE html>\n          <html>\n          \n          <head>\n              <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n              <style>\n                  table { \n                      border-collapse: collapse; \n                      width: 100%; \n                  } \n                    \n                  th, td { \n                      text-align: left; \n                     \n                  } \n                    \n                  tr:nth-child(odd) { \n                      background-color: #F8F8F8; \n                  } \n\t\t\t\t.info{\n\t\t\t\tcolor:#003a5d;\n\t\t\t\t}\n                  .login { fill: #ffffff;  } \n                  .head1\n                  {\n                     \n                      width: 117px;\n                      height: 46px;   \n                      background-position: center;\n                      background-repeat: no-repeat;\n                  }\n                  .loginimg\n                  {                     \n                      height: 31px;   \n                      background-position: center;\n                      background-repeat: no-repeat;\n                      width:138px;\n                  }\n                  .heading\n                  {\n                      width: 226px;\n                      height:55px;\n                  }\n                  .no-margin\n                  {\n                      margin-left:0px;\n                      margin-right:0px;\n                  }\n              </style>\n          </head>\n          \n          <body>\n              <div style=\" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px\">\n                  <div style=\"height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;\">\n                    \n                      <div class=\"row no-margin\" >\n                            <div><img src=\"" + process.env.WEB_SERVER + "img/HelloSpoke_logo.png\" class=\"head1\"/></div>\n                      </div>\n                      <div class=\"row heading no-margin\" style=\"margin-top:20px;\">\n                          <p style=\"font-size: 14px;  color:#003A5D \">Welcome to Notify!</p>\n                          <p style=\"font-size: 14px; color:#003A5D \"> Below are your user profile details.</p>\n                      </div>\n                     \n                      <div style=\"padding-top: 29px; \"> \n                        <div class=\"row info no-margin\"> \n                            <a target=\"_blank\" href=" + process.env.WEB_SERVER + ">                        \n                            <div class=\"loginimg\"><img src=\"" + process.env.WEB_SERVER + "img/login.png\"/></div>\n                            </div>\n                              <!-- <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"138\" height=\"31\" viewBox=\"0 0 138 31\"><defs><style></style></defs><g transform=\"translate(-596 -522)\"><path class=\"a\" d=\"M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z\" transform=\"translate(596 522)\"/><text class=\"login\" transform=\"translate(664 544)\"><tspan x=\"-54.062\" y=\"0\" style=\"cursor: pointer;\">LOG IN NOW</tspan></text></g></svg> -->\n                      <div class=\"row info no-margin\">\n                          <p style=\"font-size: 10px;width:500px;height:14px;color:#003A5D \">Or copy and paste this link into your browser:<a style=\"text-decoration:underline;color:#4BBBFF\" target=\"_blank\" href=" + process.env.WEB_SERVER + ">" + process.env.WEB_SERVER + "</a></p></div>\n                      </div>\n                      <div class=\"row info no-margin\">\n                          <p style=\"font-size: 14px;color:#003A5D ;   margin-top:25px;width:603px;\">You will be asked to change your password and set up your user profile when you first log in.</p>\n                      </div>\n                      <div class=\"row no-margin\" style=\"padding-top:21px\">\n                          <table class=\"table\" style=\"font-size: 13px;   width: 386px;\">\n                              <tbody>\n                                  <tr class=\"active\">\n                                      <td\n                                          style=\"background-color: #F8F8F8; color: #95989A; padding: 10px;  border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;\">\n                                          First Name</td>\n                                      <td\n                                          style=\" background-color: #F8F8F8; text-align: left ;color:#003A5D ;  border: 1px solid #f4f4f4; padding: 10px;     font-size: 14px;   height: 29px; \">\n                                          " + payload.data.first_name + "</td>\n                                  </tr>\n                                  <tr class=\"active\">\n                                      <td\n                                          style=\"color: #95989A; padding: 10px;border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;\">\n                                          Last Name</td>\n                                      <td\n                                          style=\"text-align: left ; padding: 10px; border: 1px solid #f4f4f4; color:#003A5D ;    font-size: 14px;   height: 29px;  \">\n                                          " + payload.data.last_name + "</td>\n                                  </tr>\n                                  <tr class=\"active\">\n                                      <td\n                                          style=\" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4; width: 115px;     font-size: 14px;   height: 29px;\">\n                                          User Name</td>\n                                      <td\n                                          style=\" background-color: #F8F8F8 ;text-align: left ;color:#003A5D ;padding: 10px;  border: 1px solid #f4f4f4;     font-size: 14px;   height: 29px;  \">\n                                          " + payload.data.username + "</td>\n                                  </tr>\n                                  <tr class=\"active\">\n                                      <td\n                                          style=\"color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;   font-size: 14px;   height: 29px;\">\n                                          Password</td>\n                                      <td\n                                          style=\"text-align: left ;  border: 1px solid #f4f4f4;  color:#003A5D ; padding: 10px;   font-size: 14px;   height: 29px;  \">\n                                          " + payload.data.password + "</td>\n                                  </tr>\n                                  <tr class=\"active\">\n                                      <td\n                                          style=\" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;    font-size: 14px;   height: 29px;   \">\n                                          Account Name</td>\n                                      <td\n                                          style=\" background-color: #F8F8F8; border: 1px solid #f4f4f4;  padding: 10px;    font-size: 14px;   height: 29px;color:#003A5D  \">\n                                          " + accountname + "</td>\n                                  </tr>\n                              </tbody>\n                          </table>\n                      </div>\n                      <div class=\"row info no-margin\">\n                         <p style=\"font-size: 14px;  width:363px;height:19px;color:#003A5D\">If you have any questions, please contact " + payload.data.masteruser_name + ".</p>\n                      </div>\n              </div>\n              </div>\n          </body>\n          \n          </html>"
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            else {
                console.log("scucess ");
                // delete message
                // console.log(`Deleting SQS Message with ReceiptHandle: `);
            }
            console.log('Message sent: %s', info.messageId);
        });
        return [2 /*return*/];
    });
}); };
var validateJWT = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token.replace('Bearer ', ''), app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, message: 'Failed to authenticate token.', err: err });
            }
            else {
                var newToken = jwt.sign({
                    'kazoo_api_key': decoded.kazoo_api_key,
                    'logged_in': true,
                    'user_id': decoded.user_id,
                    'timezone': decoded.timezone,
                    'account_id': decoded.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                });
                // if everything is good, save to request for use in other routes
                res.append('token', newToken);
                res.append('Access-Control-Expose-Headers', 'token');
                req.decoded = decoded;
                req.headers['X-AUTH-TOKEN'] = jwt.decode(decoded.kazoo_api_key);
                next();
            }
        });
    }
    else {
        // if there is no token
        //console.log("logout");
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};
var getKazooRequest = function (req, apiKey) {
    if (apiKey === void 0) { apiKey = null; }
    return Request.defaults({
        headers: {
            'X-AUTH-TOKEN': (apiKey || req['decoded'] && req['decoded'].kazoo_api_key) || null
        }
    });
};
var getFreeSwitchRequest = function (token) {
    return Request.defaults({
        headers: {
            'Token': token
        }
    });
};
function parseAccountToDatabaseName(accountName) {
    var notifytext = process.env.ISPRODUCTION === "true" ? "nt_" : "";
    return [notifytext + "account", accountName.substr(0, 2), accountName.substr(2, 2), accountName.substr(4)].join('/');
}
function getDabaseNameRegx() {
    return process.env.ISPRODUCTION === "true" ? "nt_account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$" : "account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$";
}
function parseDatabaseNameToAccount(dbnmae) {
    var arr = dbnmae.split("/");
    arr = arr.splice(1, arr.length - 1);
    return arr.join('');
}
/**
 * Call Reports API Routes
 */
var doCdrSearch = function (accountName, my, bookmark, req, cdrLimit) {
    if (bookmark === void 0) { bookmark = null; }
    var accountDb = nano.use(accountName + "-" + my);
    // Build Lucene Query
    var query = [];
    if (req.query.startTime && req.query.endTime) {
        var uToG = function (u) {
            return (+u / 1000) + 62167219200;
        };
        var startTime = uToG(req.query.startTime);
        var endDate = new Date(+req.query.endTime);
        endDate.setDate(endDate.getDate() + 1);
        var endTime = uToG(endDate.getTime());
        query.push("timestamp:[" + startTime + " TO " + endTime + "]");
    }
    if (req.query.call_direction) {
        switch (req.query.call_direction) {
            case ('inbound'):
                query.push("call_direction:inbound");
                break;
            case ('outbound'):
                query.push("call_direction:outbound");
                break;
            case ('both'):
                query.push("(call_direction:inbound OR call_direction:outbound)");
                break;
        }
    }
    if (req.query.answered) {
        switch (req.query.answered) {
            case ('yes'):
                query.push("hangup_cause:normal_clearing");
                break;
            case ('no'):
                query.push("(hangup_cause:NO_ANSWER OR hangup_cause:ORIGINATOR_CANCEL)");
                break;
        }
    }
    if (req.query.answered === undefined) {
        query.push("(hangup_cause:normal_clearing OR hangup_cause:NO_ANSWER OR hangup_cause:ORIGINATOR_CANCEL)");
    }
    if (req.query.owner_id) {
        query.push("owner_id:" + req.query.owner_id);
    }
    else if (req.query.extensions) {
        var extensions = req.query.extensions.split(',')
            .map(function (e) { return "owner_id:\"" + e + "\""; })
            .join(' OR ');
        query.push("(" + extensions + ")");
    }
    else {
        query.push("owner_id:__no_owner_id");
    }
    if (req.query.search) {
        query.push("(" + [
            "callee_id_number:" + req.query.search + "*",
            "callee_id_number:1" + req.query.search + "*",
            "caller_id_number:" + req.query.search + "*",
            "caller_id_number:1" + req.query.search + "*",
            "to:" + req.query.search + "*",
            // `caller_id_number:+1${req.query.search}*`,
            // `to:+1${req.query.search}*`,
            "to:1" + req.query.search + "*",
            "callee_id_name:" + req.query.search + "*",
            "caller_id_name:" + req.query.search + "*"
        ].join(' OR ') + ")");
    }
    var params = {
        q: query.join(" AND "),
        include_docs: true,
        limit: cdrLimit,
        sort: '-timestamp'
    };
    if (bookmark) {
        params['bookmark'] = bookmark;
    }
    // Execute db Query
    return new Promise(function (resolve, reject) {
        function cdr_post_search(callback) {
            nano.request({ db: accountName + "-" + my, path: '_design/search/_search/cdrs', method: 'POST', body: params }, callback);
        }
        var callReports = [];
        cdr_post_search(cdr_post_search_callback);
        function cdr_post_search_callback(err, result) {
            if (err) {
                resolve({
                    callReports: [],
                    bookmark: '',
                    my: my,
                    totalRecords: 0
                });
            }
            if (result && result.rows) {
                var callReport = result.rows.map(function (r) { return r.doc; }).map(cdrMapping);
                callReports.push.apply(callReports, callReport);
                params['bookmark'] = result.bookmark;
                if (result.rows.length < cdrLimit || !req.query.download) {
                    resolve({
                        callReports: callReports,
                        bookmark: result.bookmark,
                        my: my,
                        totalRecords: result.total_rows
                    });
                }
                else {
                    cdr_post_search(cdr_post_search_callback);
                }
            }
        }
    });
};
var getNumber = function (cdrTo) {
    return cdrTo ? cdrTo.indexOf('@') > 0 ? cdrTo.split('@')[0] : cdrTo : cdrTo;
};
var calldirection = function (direction) {
    if (direction === "outbound") {
        return "inbound";
    }
    ;
    if (direction === "inbound") {
        return "outbound";
    }
    ;
};
var callrecording = function (direction, account_id, call_id) {
    if (direction === "outbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + "..mp3";
    }
    ;
    if (direction === "inbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + ".mp3";
    }
    ;
};
var to_num = function (direction, num, to) {
    if (direction === "outbound") {
        return getNumber(num);
    }
    ;
    if ((direction === "inbound") && (num === getNumber(to))) {
        return " ";
    }
    else {
        return getNumber(num);
    }
};
var cdrMapping = function (cdr) {
    var resultdata = [];
    //Sample data for "cdr.custom_channel_vars.media_names" need to work
    var media_nameslist = {
        "media_name": "7ad1c467369388de6e0be4536125595a.mp3",
        "media_names": [
            "7ad1c467369388de6e0be4536125595a.mp3",
            "7a17b50e1aa4ceb84a1076aeb15d81e0.mp3",
            "7f36ddcdeacb58578629fecee03d0289.mp3"
        ]
    };
    if (media_nameslist.media_names.length > 0) {
        for (var i = 0; i < media_nameslist.media_names.length; i++) {
            resultdata.push({
                media: callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id),
                Id: 0
            });
        }
    }
    ;
    return {
        id: cdr._id,
        from_number: cdr.caller_id_number.split("+1").pop(),
        to_number: getNumber(cdr.to).split("+1").pop(),
        duration: cdr.duration_seconds,
        timestamp: (cdr.timestamp - 62167219200) * 1000,
        dialed_number: cdr.custom_channel_vars.inception ? to_num(cdr.call_direction, cdr.custom_channel_vars.inception, cdr.to).split("+1").pop() : null || cdr.callee_id_number ? to_num(cdr.call_direction, cdr.callee_id_number, cdr.to).split("+1").pop() : null,
        to_name: cdr.callee_id_name ? to_num(cdr.call_direction, cdr.callee_id_name, cdr.to) : null,
        from_name: cdr.caller_id_name || '',
        call_recording: cdr.custom_channel_vars.media_name ? callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id) : null,
        call_recording_medias: cdr.custom_channel_vars.media_names ? resultdata : '',
        call_direction: calldirection(cdr.call_direction)
    };
};
var maybePad = function (month) {
    return "" + (month.toString().length === 1 ? "0" + month : month);
};
// This is similiar but not *quite* identical.
// For starters this doesn't send back a response,
// It also has a different rv/send value. This returns
// an array rather than an object.
var getExtensions = function (req) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        var accountDb, findAssignedUsers, userIds, e_1, userRequests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
                    findAssignedUsers = function (userIds, level) {
                        if (level === void 0) { level = 0; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var currentUserSelector, usersPromise, userDocs, descendants, nextChildren;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        currentUserSelector = {
                                            'selector': {
                                                '_id': {
                                                    '$in': userIds
                                                },
                                                'pvt_type': 'user'
                                            }
                                        };
                                        usersPromise = new Promise(function (resolve, reject) {
                                            // console.log(currentUserSelector);
                                            accountDb.find(currentUserSelector, function (err, result) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                try {
                                                    // console.log(`Found ${result.docs.length} docs for these users`);
                                                    resolve(result.docs);
                                                }
                                                catch (e) {
                                                    // console.error(`Couldn't fetch users (${userIds}) from the database`);
                                                    resolve([]);
                                                }
                                            });
                                        });
                                        return [4 /*yield*/, usersPromise];
                                    case 1:
                                        userDocs = _a.sent();
                                        descendants = [];
                                        userDocs.forEach(function (doc) {
                                            // console.log(`${doc._id} has ${doc['assigned_users'].length} assigned users`);
                                            if (doc['assigned_users'].length > 0) {
                                                // console.log(doc['assigned_users']);
                                                descendants.push.apply(descendants, doc['assigned_users'].filter(function (uid) { return uid !== doc._id; }));
                                            }
                                        });
                                        if (!(descendants.length > 0)) return [3 /*break*/, 3];
                                        return [4 /*yield*/, findAssignedUsers(descendants, ++level)];
                                    case 2:
                                        nextChildren = _a.sent();
                                        userIds.push.apply(userIds, nextChildren);
                                        _a.label = 3;
                                    case 3: return [2 /*return*/, userIds];
                                }
                            });
                        });
                    };
                    userIds = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, findAssignedUsers([req['decoded'].user_id])];
                case 2:
                    userIds = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4:
                    userRequests = [];
                    userIds.forEach(function (userId) {
                        userRequests.push(new Promise(function (resolve, reject) {
                            // console.log(`Starting Kazoo request for user: ${userId}`);
                            getKazooRequest(req)
                                .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + userId, function (err, response, body) {
                                body = JSON.parse(body);
                                if (body.error && body.error == "401") {
                                    reject(err);
                                }
                                var extension = body.data && body.data.caller_id && body.data.caller_id.internal && body.data.caller_id.internal.number;
                                var externalExtension = body.data && body.data.caller_id && body.data.caller_id.external && body.data.caller_id.external.number;
                                var userId = body.data && body.data.id;
                                if (extension !== undefined) {
                                    // console.log(`Body for ${extension}`, body);
                                    resolve([extension, externalExtension, userId]);
                                }
                                else {
                                    resolve(null);
                                }
                            });
                        }));
                    });
                    Promise.all(userRequests).then(function (results) {
                        // console.log(`Finished Kazoo Requests`);
                        results = results.filter(function (r) { return r !== null; });
                        results = results.reduce(function (p, c) {
                            p.push(c[0]);
                            return p;
                        }, []);
                        resolve(results);
                    })["catch"](function (err) {
                        reject(err);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
var getLastMonthCDRs = function (req, res, accountName, cdrLimit) {
    var today = new Date();
    var startMonth = today.getMonth() + 1;
    var endMonth = today.getMonth() + 1;
    var startYear = today.getFullYear();
    var endYear = today.getFullYear();
    var my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
    var mys = [];
    if (req.query.startTime) {
        var startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();
    }
    if (req.query.endTime) {
        var endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();
    }
    if (startMonth === endMonth) {
        my = "" + startYear + maybePad(startMonth);
        mys.push(my);
    }
    else {
        var workingDate = new Date(startMonth + "/1/" + startYear);
        while ((workingDate.getMonth() + 1) <= endMonth || workingDate.getFullYear() < endYear) {
            if (endMonth == 12 && workingDate.getMonth() + 1 == 1)
                break;
            var my_1 = "" + workingDate.getFullYear() + maybePad(workingDate.getMonth() + 1);
            mys.push(my_1);
            workingDate.setMonth(workingDate.getMonth() + 1);
        }
    }
    // console.log('and here are the mys', mys);
    var myrs = mys.reverse();
    // Do Nano queries
    Promise.all(mys.map(function (my) {
        if (req.query.bookmarks) {
            var bookmarks = JSON.parse(req.query.bookmarks);
            if (Object.keys(bookmarks).indexOf(my) >= 0) {
                if (bookmarks[my] !== true) {
                    return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
                }
                else {
                    return doCdrSearch(accountName, my, null, req, cdrLimit);
                }
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            return doCdrSearch(accountName, my, null, req, cdrLimit);
        }
    }))
        .then(function (cdrGroups) {
        var allCdrs = [];
        var bookmarks = {};
        var recordCount = 0;
        cdrGroups.forEach(function (cdrGroup) {
            // console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
            if (cdrGroup['callReports']) {
                // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                var recordsToGet = cdrLimit - recordCount;
                // console.log(`Getting ${recordsToGet} records`);
                if (recordsToGet === 0) {
                    bookmarks[cdrGroup['my']] = true;
                }
                else {
                    var recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
                    recordCount += recordsForThisMonth.length;
                    allCdrs.push.apply(allCdrs, recordsForThisMonth);
                    // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                    bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
                }
            }
        });
        res.statusCode = 200;
        res.send(JSON.stringify({
            cdrs: allCdrs,
            bookmarks: bookmarks,
            mys: mys
        }));
    });
};
app.get('/verifyJWT', validateJWT, function (req, res) {
    var u_id = req['decoded'].user_id;
    var a_id = req['decoded'].account_id;
    getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + a_id + "/users/" + u_id, function (err, resp3, body) {
        if (err) {
            //    console.log("token error ", err);
            res.send(err);
            return;
        }
        // console.log("\n user\n",body);
        res.send(body);
    });
});
app.get("/reportdocs/search", function (req, res) {
    console.log("reportdocs");
    var body = {
        size: 20,
        from: 0,
        query: {
            "match_all": {}
        }
    };
    search('reportdocs', body)
        .then(function (results) {
        var hits = results.hits.hits;
        var result1 = hits.map(function (a) { return a._source; });
        res.send({
            "Status": "200",
            reportdocs: result1
        });
    });
});
app.get('/callHistory', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var owner_id, cdrLimit, end_time, start_time, accountName;
    return __generator(this, function (_a) {
        owner_id = req['decoded'].user_id;
        cdrLimit = 150;
        // req.query.extensions = extensions;
        req.query.owner_id = owner_id;
        end_time = new Date().getTime();
        start_time = new Date(+new Date().getTime() - 31 * 24 * 60 * 60 * 1000).getTime();
        req.query.startTime = start_time;
        req.query.endTime = end_time;
        accountName = "" + parseAccountToDatabaseName(req['decoded'].account_id);
        getLastMonthCDRs(req, res, accountName, cdrLimit);
        return [2 /*return*/];
    });
}); });
app.get('/myCallHistory/:start_time?/:end_time?', validateJWT, function (req, res) {
    var owner_id = req['decoded'] && req['decoded'].user_id;
    getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + req['decoded'].user_id, function (err, response, body) {
        body = JSON.parse(body);
        // console.log('this is the extension I am looking for', extension);
        var cdrLimit = 150;
        req.query.owner_id = owner_id;
        var end_time = new Date().getTime();
        var start_time = new Date(+new Date().getTime() - 31 * 24 * 60 * 60 * 1000).getTime();
        if (req.params.start_time) {
            start_time = req.params.start_time;
        }
        if (req.params.end_time) {
            end_time = req.params.end_time;
        }
        req.query.startTime = start_time;
        req.query.endTime = end_time;
        var accountName = "" + parseAccountToDatabaseName(req['decoded'].account_id);
        getLastMonthCDRs(req, res, accountName, cdrLimit);
    });
});
app.get('/getCallReports', validateJWT, function (req, res) {
    var cdrLimit = 150;
    var accountName = "" + parseAccountToDatabaseName(req['decoded'].account_id);
    var today = new Date();
    var startMonth = today.getMonth() + 1;
    var endMonth = today.getMonth() + 1;
    var startYear = today.getFullYear();
    var endYear = today.getFullYear();
    var my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
    // let pageno=0;
    //let monthindex=0;
    //let monthlist=[];
    var mys = [];
    //if (req.query.Page)
    // pageno=req.query.Page;
    // if (req.query.Monthindex)
    //   monthindex=req.query.Monthindex;
    if (req.query.startTime) {
        var startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();
    }
    if (req.query.endTime) {
        var endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();
    }
    if (startMonth === endMonth) {
        my = "" + startYear + maybePad(startMonth);
        mys.push(my);
        /* monthlist.push ({month: startMonth,
                         year: startYear});*/
    }
    else {
        var workingDate = new Date(startMonth + "/1/" + startYear);
        var tmpindex = 0;
        while ((workingDate.getMonth() + 1) <= endMonth || workingDate.getFullYear() < endYear) {
            if (endMonth == 12 && workingDate.getMonth() + 1 == 1)
                break;
            var my_2 = "" + workingDate.getFullYear() + maybePad(workingDate.getMonth() + 1);
            mys.push(my_2);
            tmpindex++;
            workingDate.setMonth(workingDate.getMonth() + 1);
        }
    }
    var myrs = mys.reverse(); //latest month should come first
    Promise.all(myrs.map(function (my) {
        if (req.query.bookmarks) {
            var bookmarks = JSON.parse(req.query.bookmarks);
            if (Object.keys(bookmarks).indexOf(my) >= 0) {
                if (bookmarks[my] !== true) {
                    return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
                }
                else {
                    return doCdrSearch(accountName, my, null, req, cdrLimit);
                }
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            return doCdrSearch(accountName, my, null, req, cdrLimit);
        }
    }))
        .then(function (cdrGroups) {
        var allCdrs = [];
        var bookmarks = {};
        var recordCount = 0;
        cdrGroups.forEach(function (cdrGroup) {
            // console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
            if (cdrGroup['callReports']) {
                // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                var recordsToGet = cdrLimit - recordCount;
                // console.log(`Getting ${recordsToGet} records`);
                if (req.query.download) {
                    allCdrs.push.apply(allCdrs, cdrGroup['callReports']);
                }
                else if (recordsToGet === 0) {
                    bookmarks[cdrGroup['my']] = true;
                }
                else {
                    var recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
                    recordCount += recordsForThisMonth.length;
                    allCdrs.push.apply(allCdrs, recordsForThisMonth);
                    bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
                }
            }
        });
        res.statusCode = 200;
        res.send(JSON.stringify({
            cdrs: allCdrs,
            bookmarks: bookmarks
        }));
    });
});
app.get('/scheduledCallReports', function (req, res) {
    var cdrLimit = 200;
    var accountName = "" + parseAccountToDatabaseName(req.query.account_id);
    var today = new Date();
    var startMonth = today.getMonth() + 1;
    var endMonth = today.getMonth() + 1;
    var startYear = today.getFullYear();
    var endYear = today.getFullYear();
    var my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
    var mys = [];
    if (req.query.startTime) {
        var startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();
    }
    if (req.query.endTime) {
        var endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();
    }
    if (startMonth === endMonth) {
        my = "" + startYear + maybePad(startMonth);
        mys.push(my);
    }
    else {
        var workingDate = new Date(startMonth + "/1/" + startYear);
        while ((workingDate.getMonth() + 1) <= endMonth && workingDate.getFullYear() <= endYear) {
            var my_3 = "" + workingDate.getFullYear() + maybePad(workingDate.getMonth() + 1);
            mys.push(my_3);
            workingDate.setMonth(workingDate.getMonth() + 1);
        }
    }
    // Do Nano queries
    Promise.all(mys.map(function (my) {
        if (req.query.bookmarks) {
            var bookmarks = JSON.parse(req.query.bookmarks);
            if (Object.keys(bookmarks).indexOf(my) >= 0) {
                if (bookmarks[my] !== true) {
                    return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
                }
                else {
                    return doCdrSearch(accountName, my, null, req, cdrLimit);
                }
            }
            else {
                return Promise.resolve([]);
            }
        }
        else {
            return doCdrSearch(accountName, my, null, req, cdrLimit);
        }
    }))
        .then(function (cdrGroups) {
        var allCdrs = [];
        var bookmarks = {};
        var recordCount = 0;
        cdrGroups.forEach(function (cdrGroup) {
            // console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
            if (cdrGroup['callReports']) {
                // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                var recordsToGet = cdrLimit - recordCount;
                // console.log(`Getting ${recordsToGet} records`);
                if (recordsToGet === 0) {
                    bookmarks[cdrGroup['my']] = true;
                }
                else {
                    var recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
                    recordCount += recordsForThisMonth.length;
                    allCdrs.push.apply(allCdrs, recordsForThisMonth);
                    // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                    bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
                }
            }
        });
        res.statusCode = 200;
        res.send(JSON.stringify({
            cdrs: allCdrs,
            bookmarks: bookmarks
        }));
    });
});
app.get('/extensions', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountDb, findAssignedUsers, userIds, e_2, userRequests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
                findAssignedUsers = function (userIds, level) {
                    if (level === void 0) { level = 0; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var currentUserSelector, usersPromise, userDocs, descendants, nextChildren;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    currentUserSelector = {
                                        'selector': {
                                            '_id': {
                                                '$in': userIds
                                            },
                                            'pvt_type': 'user'
                                        }
                                    };
                                    usersPromise = new Promise(function (resolve, reject) {
                                        // console.log(currentUserSelector);
                                        accountDb.find(currentUserSelector, function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            try {
                                                // console.log(`Found ${result.docs.length} docs for these users`);
                                                resolve(result.docs);
                                            }
                                            catch (e) {
                                                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                                                resolve([]);
                                            }
                                        });
                                    });
                                    return [4 /*yield*/, usersPromise];
                                case 1:
                                    userDocs = _a.sent();
                                    descendants = [];
                                    userDocs.forEach(function (doc) {
                                        // console.log(`${doc._id} has ${doc['assigned_users'].length} assigned users`);
                                        if (doc.hasOwnProperty("assigned_users") && doc['assigned_users'].length > 0) {
                                            // console.log(doc['assigned_users']);
                                            descendants.push.apply(descendants, doc['assigned_users'].filter(function (uid) { return uid !== doc._id; }));
                                        }
                                        else {
                                            console.log("NOTHING");
                                            descendants.push.apply(descendants, null);
                                        }
                                    });
                                    if (!(descendants.length > 0)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, findAssignedUsers(descendants, ++level)];
                                case 2:
                                    nextChildren = _a.sent();
                                    userIds.push.apply(userIds, nextChildren);
                                    _a.label = 3;
                                case 3: return [2 /*return*/, userIds];
                            }
                        });
                    });
                };
                userIds = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, findAssignedUsers([req['decoded'].user_id])];
            case 2:
                userIds = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                return [3 /*break*/, 4];
            case 4:
                userRequests = [];
                userIds.forEach(function (userId) {
                    userRequests.push(new Promise(function (resolve, reject) {
                        // console.log(`Starting Kazoo request for user: ${userId}`);
                        getKazooRequest(req)
                            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + userId, function (err, response, body) {
                            body = JSON.parse(body);
                            if (body.error && body.error == "401") {
                                reject(err);
                            }
                            var extension = body.data && body.data.caller_id && body.data.caller_id.internal && body.data.caller_id.internal.name;
                            var externalExtension = body.data && body.data.id;
                            var userId = body.data && body.data.id;
                            if (extension !== undefined) {
                                // console.log(`Body for ${extension}`, body);
                                resolve([extension, externalExtension, userId]);
                            }
                            else {
                                resolve(null);
                            }
                        });
                    }));
                });
                Promise.all(userRequests).then(function (results) {
                    // console.log(`Finished Kazoo Requests`);
                    results = results.filter(function (r) { return r !== null; });
                    results = results.reduce(function (p, c) {
                        p[c[0]] = {
                            external: c[1] || null,
                            selected: false,
                            userId: c[2] || null
                        };
                        return p;
                    }, {});
                    var results_ordered = {};
                    Object.keys(results).sort().forEach(function (key) {
                        results_ordered[key] = results[key];
                    });
                    res.send(results);
                })["catch"](function (err) {
                    res.statusCode = 403;
                    res.send(JSON.stringify(err));
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/updateDeliveryStatus', validateJWT, function (req, res) {
    try {
        var payload = JSON.parse(req.body.payload);
        var today = new Date(payload.time);
        var my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
        var accountDb = parseAccountToDatabaseName(req['decoded'].account_id);
        var db_name = accountDb + "-" + my + "_sms";
        var sms_accountdb = nano.use(db_name);
        console.log("get text db name ", db_name);
        sms_accountdb.insert(payload, function (err, body) {
            if (err) {
                console.log(err);
                res.statusCode = 500;
                res.send(JSON.stringify(err));
            }
            else {
                res.statusCode = 200;
                res.send(body);
            }
        });
    }
    catch (e) {
        //console.log(e);
        res.statusCode = 400;
        res.send("Invalid request");
    }
});
app.patch('/updateContact', validateJWT, function (req, res) {
    try {
        var payload = JSON.parse(req.body.payload);
        var id = payload._id;
        var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
        accountDb.insert(payload, function (err, body) {
            if (err) {
                //console.log(err);
                res.statusCode = 500;
                res.send(JSON.stringify(err));
            }
            else {
                res.statusCode = 200;
                res.send(body);
            }
        });
    }
    catch (e) {
        //console.log(e);
        res.statusCode = 400;
        res.send("Invalid request");
    }
});
app.get('/privilege', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(req['decoded'].user_id, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /contacts");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            res.send(JSON.stringify(result.priv_level));
        }
    });
});
app.get('/contacts', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    'pvt_type': 'contact'
                },
                {
                    '$or': [
                        {
                            'private': false //010024e2b336aa195b79833330f13bf6
                        },
                        {
                            'owner_id': req['decoded'].user_id
                        }
                    ]
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /contacts");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            result.docs = result.docs.filter(function (e) {
                return !e.hasOwnProperty("pvt_deleted") || e.pvt_deleted != true;
            });
            result.docs.forEach(function (rec) {
                rec.updatePublic = rec.owner_id === req['decoded'].user_id;
            });
            res.send(JSON.stringify(result));
        }
    });
});
app.post('/outbound_sms', validateJWT, function (req, res, next) {
    var payload = JSON.parse(req.body.payload);
    client.Message.send({
        from: payload.from,
        to: payload.to,
        text: payload.content,
        callbackUrl: "" + process.env.BANDWIDTH_MESSAGE_SERVER,
        receiptRequested: 'all',
        // These are being added to the tag so that we can find the db
        // in the webhook as well as record the user ID that sent the text
        tag: req['decoded'].account_id + " " + req['decoded'].user_id
    })
        .then(function (message) {
        res.send(JSON.stringify(message));
    })["catch"](function (err) {
        res.statusCode = 500;
        res.send(JSON.stringify(err));
    });
});
app.get('/textPermissions', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(req['decoded'].user_id, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /contacts");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            res.send(JSON.stringify(result.text_permissions));
        }
    });
});
app.get('/messageInfo/:id', validateJWT, function (req, res) {
    client.Message.get(req.params.id)
        .then(function (message) {
        res.statusCode = 200;
        res.send(message);
    })["catch"](function (err) {
        res.statusCode = 403;
        res.send(err);
    });
});
// This is the webhook for outbound messages
app.post('/messageURL', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var today, my, _a, account_id, user_id, account_name, accountDb, doc;
    return __generator(this, function (_b) {
        today = new Date();
        my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
        _a = req.body.tag.split(' '), account_id = _a[0], user_id = _a[1];
        account_name = parseAccountToDatabaseName(account_id);
        accountDb = nano.use(account_name + "-" + my + "_sms");
        doc = __assign({}, req.body);
        doc.account_id = account_id;
        doc.user_id = user_id;
        accountDb.insert(doc, function (err, body) {
            if (err) {
                res.statusCode = 500;
                res.send(JSON.stringify(err));
            }
            else {
                res.statusCode = 200;
                doc._rev = body.rev;
                Request.post("" + process.env.WEBSOCKET_SERVER, {
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(doc)
                });
                res.send();
            }
        });
        return [2 /*return*/];
    });
}); });
app.post('/incomingMessage', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var putData;
    return __generator(this, function (_a) {
        putData = {
            data: {
                credentials: "" + process.env.KAZOO_CREDENTIAL_HASH,
                account_name: "" + process.env.KAZOO_ACCOUNT_NAME
            },
            verb: "PUT"
        };
        Request.put(process.env.KAZOO_SERVER + "/v2/user_auth", {
            body: JSON.stringify(putData)
        }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var auth_token, today, my_4, hs_api_path, options;
            return __generator(this, function (_a) {
                if (err) {
                    res.statusCode = 200;
                    res.send();
                    return [2 /*return*/];
                }
                if (response && response.statusCode === 201) {
                    body = JSON.parse(body);
                    auth_token = body.auth_token;
                    today = new Date();
                    my_4 = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
                    hs_api_path = process.env.KAZOO_SERVER + "/v2/accounts/" + process.env.KAZOO_ACCOUNT_ROOT + "/phone_numbers/" + req.body.to + "/identify";
                    options = {
                        url: hs_api_path,
                        json: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'X-AUTH-TOKEN': auth_token
                        }
                    };
                    Request.get(options, function (error, response, kazoo_body) { return __awaiter(_this, void 0, void 0, function () {
                        var db_name, smsDB, inbound_SMS_1;
                        return __generator(this, function (_a) {
                            if (error) {
                                res.statusCode = 200;
                                res.send();
                                return [2 /*return*/];
                            }
                            else {
                                if (kazoo_body.data.account_id) {
                                    db_name = "account/" + kazoo_body.data.account_id.substr(0, 2) + "/" + kazoo_body.data.account_id.charAt(2) + kazoo_body.data.account_id.charAt(3) + "/" + kazoo_body.data.account_id.substring(4) + "-" + my_4 + "_sms";
                                    smsDB = nano.use(db_name);
                                    inbound_SMS_1 = req.body;
                                    inbound_SMS_1.carrier = "bandwidth";
                                    inbound_SMS_1._id = req.body.messageId;
                                    inbound_SMS_1.read = false;
                                    smsDB.insert(inbound_SMS_1, function (err, body) {
                                        if (!err) {
                                            inbound_SMS_1._rev = body.rev;
                                            inbound_SMS_1.account_id = kazoo_body.data.account_id;
                                            Request.post("" + process.env.WEBSOCKET_SERVER, {
                                                headers: { 'content-type': 'application/json' },
                                                body: JSON.stringify(inbound_SMS_1)
                                            });
                                        }
                                    });
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                else {
                    res.statusCode = 200;
                    res.send();
                }
                return [2 /*return*/];
            });
        }); });
        return [2 /*return*/];
    });
}); });
app.post('/messageHistory', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, num1, num2, selector, docs, d, year, month, _loop_1, state_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = JSON.parse(req.body.payload);
                num1 = payload.num1, num2 = payload.num2;
                selector = {
                    'selector': {
                        '$and': [
                            {
                                '$or': [
                                    {
                                        'to': num1,
                                        'from': num2
                                    },
                                    {
                                        'to': num2,
                                        'from': num1
                                    }
                                ]
                            },
                            {
                                '$or': [
                                    {
                                        '$not': {
                                            '$and': [
                                                {
                                                    'deliveryState': {
                                                        '$eq': 'not-delivered1'
                                                    }
                                                },
                                                {
                                                    'deliveryState': {
                                                        '$exists': true
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        'direction': 'in'
                                    }
                                ]
                            }
                        ]
                    },
                    limit: 200,
                    'sort': [{
                            'time': 'desc'
                        }]
                };
                docs = [];
                d = new Date();
                year = d.getUTCFullYear();
                month = d.getUTCMonth() + 1;
                _loop_1 = function () {
                    var month_string, db_name, last_month, db_1, new_docs, e_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                month_string = month.toString();
                                if (month_string.length === 1) {
                                    month_string = "0" + month_string;
                                }
                                db_name = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year + month_string + "_sms";
                                last_month = month - 1;
                                if (month === 1) {
                                    last_month = 12;
                                    year--;
                                }
                                month = last_month;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                db_1 = nano.use(db_name);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        db_1.find(selector, function (err, body) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(body.docs);
                                            }
                                        });
                                    })];
                            case 2:
                                new_docs = _a.sent();
                                docs = docs.concat(new_docs);
                                return [3 /*break*/, 4];
                            case 3:
                                e_3 = _a.sent();
                                if (month != d.getUTCMonth())
                                    return [2 /*return*/, "break"];
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _a.label = 1;
            case 1:
                if (!(docs.length < 25)) return [3 /*break*/, 3];
                return [5 /*yield**/, _loop_1()];
            case 2:
                state_1 = _a.sent();
                if (state_1 === "break")
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                res.send(docs);
                return [2 /*return*/];
        }
    });
}); });
app.post('/newMessages', function (req, res) {
    var payload = JSON.parse(req.body.payload);
    var rv = {
        success: false,
        call1: null,
        call2: null
    };
    var promise1 = client.Message.list({
        to: payload.num1,
        from: payload.num2,
        size: 1000,
        fromDateTime: payload.timestamp,
        sortOrder: "desc"
    });
    var promise2 = client.Message.list({
        to: payload.num2,
        from: payload.num1,
        size: 1000,
        fromDateTime: payload.timestamp,
        sortOrder: "desc"
    });
    Promise.all([promise1, promise2]).then(function (values) {
        rv.call1 = values[0];
        rv.call2 = values[1];
        rv.success = true;
        res.statusCode = 200;
        res.send(rv);
    })["catch"](function (r) {
        res.statusCode = 403;
        res.send(JSON.stringify(r));
    });
});
app.post('/old_loadMoreTexts', validateJWT, function (req, res) {
    var payload = JSON.parse(req.body.payload);
    // Typescript doesn't like object destructuring
    var timestamp = payload.timestamp;
    var d = new Date(timestamp);
    var year1 = d.getUTCFullYear();
    var year2 = year1;
    var this_month = d.getUTCMonth() + 1;
    var last_month = this_month - 1;
    if (this_month === 1) {
        last_month = 12;
        year2--;
    }
    this_month = this_month.toString();
    last_month = last_month.toString();
    if (this_month.length === 1) {
        this_month = "0" + this_month;
    }
    if (last_month.length === 1) {
        last_month = "0" + last_month;
    }
    var num1 = payload.num1, num2 = payload.num2;
    var db1 = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year1 + this_month + "_sms";
    var db2 = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year2 + last_month + "_sms";
    var textDB = nano.use(db1);
    var selector = {
        'selector': {
            '$and': [
                {
                    '$or': [
                        {
                            'to': num1,
                            'from': num2
                        },
                        {
                            'to': num2,
                            'from': num1
                        }
                    ]
                },
                {
                    'time': {
                        '$lte': d.toISOString()
                    }
                },
                {
                    '$or': [
                        {
                            '$not': {
                                '$and': [
                                    {
                                        'deliveryState': {
                                            '$eq': 'not-delivered'
                                        }
                                    },
                                    {
                                        'deliveryState': {
                                            '$exists': true
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            'direction': 'in'
                        }
                    ]
                }
            ]
        },
        'fields': [
            '_id',
            'to',
            'from',
            'time',
            'text',
            'direction'
        ],
        'sort': [{
                'time': 'desc'
            }]
    };
    textDB.find(selector, function (err, body) {
        if (err) {
            res.send(err);
        }
        else {
            if (body.docs.length < 25) {
                var prevDB = nano.use(db2);
                prevDB.find(selector, function (err2, body2) {
                    if (err2) {
                        res.send(body);
                    }
                    else {
                        body.docs = body.docs.concat(body2.docs);
                        res.send(body);
                    }
                });
            }
            else {
                res.send(body);
            }
        }
    });
});
app.post('/loadMoreTexts', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, timestamp, num1, num2, d, selector, docs, year, month, _loop_2, state_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = JSON.parse(req.body.payload);
                timestamp = payload.timestamp;
                num1 = payload.num1, num2 = payload.num2;
                d = new Date(timestamp);
                selector = {
                    'selector': {
                        '$and': [
                            {
                                '$or': [
                                    {
                                        'to': num1,
                                        'from': num2
                                    },
                                    {
                                        'to': num2,
                                        'from': num1
                                    }
                                ]
                            },
                            {
                                'time': {
                                    '$lte': d.toISOString()
                                }
                            },
                            {
                                '$or': [
                                    {
                                        '$not': {
                                            '$and': [
                                                {
                                                    'deliveryState': {
                                                        '$eq': 'not-delivered'
                                                    }
                                                },
                                                {
                                                    'deliveryState': {
                                                        '$exists': true
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        'direction': 'in'
                                    }
                                ]
                            }
                        ]
                    },
                    'fields': [
                        '_id',
                        'to',
                        'from',
                        'time',
                        'text',
                        'direction'
                    ],
                    'sort': [{
                            'time': 'desc'
                        }]
                };
                docs = [];
                year = d.getUTCFullYear();
                month = d.getUTCMonth() + 1;
                _loop_2 = function () {
                    var month_string, db_name, db_2, new_docs, last_month, e_4;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                month_string = month.toString();
                                if (month_string.length === 1) {
                                    month_string = "0" + month_string;
                                }
                                db_name = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year + month_string + "_sms";
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                db_2 = nano.use(db_name);
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        db_2.find(selector, function (err, body) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(body.docs);
                                            }
                                        });
                                    })];
                            case 2:
                                new_docs = _a.sent();
                                docs = docs.concat(new_docs);
                                last_month = month - 1;
                                if (month === 1) {
                                    last_month = 12;
                                    year--;
                                }
                                month = last_month;
                                return [3 /*break*/, 4];
                            case 3:
                                e_4 = _a.sent();
                                return [2 /*return*/, "break"];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _a.label = 1;
            case 1:
                if (!(docs.length < 25)) return [3 /*break*/, 3];
                return [5 /*yield**/, _loop_2()];
            case 2:
                state_2 = _a.sent();
                if (state_2 === "break")
                    return [3 /*break*/, 3];
                return [3 /*break*/, 1];
            case 3:
                res.send(docs);
                return [2 /*return*/];
        }
    });
}); });
app.get('/settings', validateJWT, function (req, res) {
    // 56c01cc1cbc62ea1f4de11c8608d8f3d
    var payload = {
        data: {
            notify_email_addresses: ["manish@gmail.com", "manishbill@gmail.com"]
        }
    };
    var kRequest2 = getKazooRequest(req)
        .patch({
        url: process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/56c01cc1cbc62ea1f4de11c8608d8f3d",
        body: payload,
        json: true
    }, function (e, r, b) {
        if (e) {
            console.log("\n\n\nerror \n\n\n\n");
            // res.send(JSON.stringify(e));
            //return;
        }
        else {
            console.log("\n\n\n\sucess\n\n\n\n", b);
        }
    });
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + req['decoded'].user_id, function (err, response, body) {
        res.send(body);
    });
});
app.post('/updateSettings', validateJWT, function (req, res) {
    var payload = __assign({}, req.body);
    var body = {
        data: {
            vm_to_email_enabled: payload.vm_to_email_enabled,
            call_forward: {
                enabled: payload.enable_call_forward
            }
        }
    };
    if (body.data.vm_to_email_enabled) {
        body.data.email = payload.email;
    }
    if (body.data.call_forward.enabled) {
        body.data.call_forward.number = payload.phone_number;
        body.data.call_forward.substitute = payload.ring_voip_phone;
        body.data.call_forward.keep_caller_id = payload.keep_caller_id;
    }
    var kRequest = getKazooRequest(req)
        .patch({
        url: process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + req['decoded'].user_id,
        body: body,
        json: true
    }, function (err, response, body) {
        //   console.log(response);
        if (err) {
            console.log(err);
        }
        res.send(body);
    });
});
app.post('/uploadAvatar', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var payload = __assign({}, req.body);
    accountDb.attachment.insert(payload.id, payload.fd.file.filename, new Buffer(payload.fd.file.filename, "binary"), payload.fd.file.mimetype, { rev: payload.rev }, function (err, body) {
        if (err) {
            res.send(err);
        }
        else {
            accountDb.attachment.get(payload.id, payload.fd.file.filename).then(function (body) {
                res.send(body);
            });
        }
    });
});
app.post("/mixpanel/:type", validateJWT, function (req, res) {
    var type = req.params.type;
    var body = { type: type, distinct_id: Math.floor(Date.now() / 1000), username: req.body.data.username ? req.body.data.username : '', email: req.body.data.email ? req.body.data.email : '', url: req.body.config.url ? req.body.config.url : '', first_name: req.body.data.first_name ? req.body.data.first_name : '', last_name: req.body.data.last_name ? req.body.data.last_name : '', timestamp: moment().toISOString() };
    mixpanel.track(type, body, function (err) { if (err) {
        console.log("mixpanel error");
        console.log(err);
    } });
    res.send('success');
});
app.post('/quickCall/:device_id/:phone_number', validateJWT, function (req, res) {
    getKazooRequest(req).
        get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/devices/" + req.params.device_id + "/quickcall/" + req.params.phone_number, function (err, response, body) {
        res.send(response);
    });
});
app.get('/devices', validateJWT, function (req, res) {
    var promise1 = new Promise(function (resolve, reject) {
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/devices/status", function (err, response, body) {
            resolve(body);
        });
    });
    var promise2 = new Promise(function (resolve, reject) {
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + req['decoded'].user_id + "/devices", function (err, response, body) {
            resolve(body);
        });
    });
    var promise3 = new Promise(function (resolve, reject) {
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/devices/fc5ae4217d1e71b63f3da8125143a14e", function (err, response, body) {
            resolve(body);
        });
    });
    Promise.all([promise1, promise2, promise3]).then(function (_a) {
        var device_status = _a[0], devices = _a[1], tmp = _a[2];
        var rv = {
            device_status: device_status,
            devices: devices,
            tmp: tmp
        };
        res.send(rv);
    });
});
app.get('/voicemailaudio/:dbname/:media_id/:attachment', function (req, res) {
    var encodeddb = encodeURIComponent(req.params.dbname);
    // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
    var attachementurl = "" + process.env.COUCHBASE_DB + encodeddb + "/" + req.params.media_id + "/" + req.params.attachment;
    download(attachementurl)
        .then(function (data) {
        res.statusCode = 200;
        res.send(data);
    })["catch"](function (error) {
        console.log("Something happened: " + error);
    });
});
app.post('/downloadfile/', function (req, res) {
    console.log('downloadfile');
    console.log(req.body);
    var fileurl = req.body.fileurl;
    //  const fileurl=  encodeURIComponent('http://www.africau.edu/images/default/sample.pdf');
    // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
    console.log(fileurl);
    download(fileurl)
        .then(function (data) {
        res.statusCode = 200;
        res.send(data);
    });
});
app.get('/voicemailaudioattachment/:id/:my', validateJWT, function (req, res) {
    var encodeddb = encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id));
    var reqUrl = process.env.COUCHBASE_DB + "/" + encodeddb + "-" + req.params.my + "/" + req.params.id;
    // console.log(reqUrl);
    var couchbaseRequest = Request.get(reqUrl, function (error, response, body) {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = response.statusCode;
        var resp = JSON.parse(body);
        resp.COUCHBASE_DB = process.env.COUCHBASE_DB;
        resp.dbname = encodeddb + "-" + req.params.my;
        res.statusCode = 200;
        res.send(resp);
    });
});
app.get('/voicemails', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes", function (err, response, body) {
        var rv = {
            vm_id: '',
            body: []
        };
        var tmp = JSON.parse(body);
        var data = tmp.data;
        if (data && Array.isArray(data)) {
            var vm_id = data.find(function (e) {
                return e.owner_id === req['decoded'].user_id;
            }).id;
            rv.vm_id = vm_id;
            var kRequest2 = getKazooRequest(req)
                .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/" + vm_id + "/messages", function (err, response, body) {
                rv.body = body;
                res.send(rv);
            });
        }
        else {
            res.send("oh no");
        }
    });
});
app["delete"]('/voicemail/:vm_id/:media_id', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .del(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/" + req.params.vm_id + "/messages/" + req.params.media_id, function (err, response, body) {
        res.send(response);
    });
});
app.get('/voicemailAudio/:vm_id/:media_id', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/" + req.params.vm_id + "/messages/" + req.params.media_id + "/raw", function (err, response, body) {
        res.send(response);
    });
});
app.post('/markVoicemailAsRead/:vm_id/:media_id', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .post(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/" + req.params.vm_id + "/messages/" + req.params.media_id + "?folder=saved", function (err, response, body) {
        res.send(response);
    });
});
app.get('/getTemplate', function (req, res) {
    res.download(__dirname + '/hellospoke_contact_import.csv');
});
app.post('/sendMMSFile', validateJWT, s3_upload.single('file'), function (req, res) {
    client.Message.send({
        from: req.body.from,
        to: req.body.to,
        text: '',
        callbackUrl: "" + process.env.BANDWIDTH_MESSAGE_SERVER,
        media: ["https://s3-us-west-2.amazonaws.com/spoke-mms/" + req['file'].key],
        tag: req['decoded'].account_id + " " + req['decoded'].user_id
    })
        .then(function (resp) {
        res.send(resp);
    })["catch"](function (err) {
        res.send(err);
    });
});
app.post('/uploadContactImage', validateJWT, s3_upload.single('file'), function (req, res) {
    var resposne = {
        imageurl: "https://s3-us-west-2.amazonaws.com/spoke-mms/" + req['file'].key
    };
    res.statusCode = 200;
    res.send(JSON.stringify(resposne));
});
app.post('/importContacts', validateJWT, upload.single('file'), function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var contents = req['file']['buffer'].toString();
    var lines = contents.split(/[\r\n]+/);
    var len = lines.length;
    //  console.log('po0p',len)
    var contacts = [];
    for (var i = 1; i < len; i++) {
        var fields = lines[i].split(',');
        //   console.log(fields)
        // console.log(JSON.stringify(fields))
        if (fields.length === 1) {
            continue;
        }
        if (fields.length !== 14) {
            res.statusCode = 406;
            res.send('Invalid CSV format.');
            return;
        }
        if (fields[0] === '' || fields[1] === '') {
            res.statusCode = 406;
            res.send('Both a first name and last name are required');
            return;
        }
        if (fields[2] === '' && fields[3] === '') {
            res.statusCode = 406;
            res.send('A contact must have a main or a mobile number');
            return;
        }
        if (fields[0] === '' && fields[1] === '' && fields[2] === '' && fields[3] === '') {
            res.statusCode = 406;
            res.send('Please fill required field');
            return;
        }
        var contact = {
            first_name: fields[0],
            last_name: fields[1],
            numbers: {
                main: [
                    fields[2]
                ],
                mobile: {
                    number: fields[3],
                    sms_enabled: true
                },
                ext: fields[4]
            },
            address: {
                line1: fields[5],
                line2: fields[6],
                city: fields[7],
                state: fields[8],
                zip: fields[9],
                country: fields[10]
            },
            email: [
                fields[11]
            ],
            allows_texts: fields[12] === 'yes',
            notes: [],
            pvt_type: "contact",
            private: fields[13] === 'yes',
            owner_id: req['decoded'].user_id
        };
        contacts.push(contact);
    }
    Promise.all(contacts.map(function (contact) {
        return new Promise(function (resolve, reject) {
            accountDb.insert(contact, function (err, body) {
                if (err) {
                    // console.log(err);
                    reject('Could not insert');
                }
                else {
                    resolve();
                }
            });
        });
    })).then(function () {
        res.send(JSON.stringify(contacts));
    })["catch"](function (r) {
        res.send("Could not insert contacts");
    });
});
"";
app.post('/addCallerToContacts', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var payload = JSON.parse(req.body.payload);
    //  console.log('addCallerToContacts   ',payload.number);
    var contact = {
        first_name: payload.fname,
        last_name: payload.lname,
        custermerid: payload.custermerid,
        extension: payload.extension,
        compny_name: payload.coyname,
        numbers: {
            main: [
                payload.number
            ],
            mobile: {
                number: payload.mobile || '',
                sms_enabled: payload.mobile ? true : false
            },
            ext: ''
        },
        address: {
            line1: payload.line1,
            line2: payload.line2,
            city: payload.city,
            state: payload.state,
            zip: payload.zip,
            country: ''
        },
        email: [
            payload.email,
        ],
        allows_texts: true,
        notes: [],
        pvt_type: "contact",
        private: payload.private,
        owner_id: req['decoded'].user_id
    };
    accountDb.insert(contact, function (err, body) {
        if (err) {
            res.send(err);
        }
        else {
            contact._id = body.id;
            contact._rev = body.rev;
            res.send(contact);
        }
    });
});
app.post('/createContactFromNumber', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var payload = JSON.parse(req.body.payload);
    var contact = {
        first_name: payload,
        last_name: '',
        numbers: {
            main: [
                payload
            ],
            mobile: {
                number: payload,
                sms_enabled: payload
            },
            ext: ''
        },
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        },
        email: [
            '',
        ],
        allows_texts: true,
        notes: [],
        pvt_type: "contact",
        private: false,
        owner_id: req['decoded'].user_id
    };
    accountDb.insert(contact, function (err, body) {
        if (err) {
            res.send(err);
        }
        else {
            contact._id = body.id;
            contact._rev = body.rev;
            res.send(contact);
        }
    });
});
app.put('/updateUsers', validateJWT, function (req, res) {
    //console.log("here is the user object 11111111111");
    var payload = req.body.payload;
    var accountDb = nano.use(parseAccountToDatabaseName(payload.account_id));
    var response_data = [];
    //  console.log("here is the user object", payload);
    var count = payload.users.length;
    var _loop_3 = function (user) {
        //  console.log("user  "  +JSON.stringify(user));
        //  console.log("here is the user object", user);
        Object.keys(user.text_permissions).forEach(function (key) {
            var phonenumber = user.text_permissions[key].phone_number;
            // console.log(phonenumber);
            var options = { method: 'GET',
                url: 'https://api.catapult.inetwork.com/v1/users/u-enlczxkbnudy7tclkqsnyea/phoneNumbers/' + phonenumber,
                headers: { 'cache-control': 'no-cache',
                    'Content-Type': 'application/json',
                    Authorization: 'Basic dC0ydWFrYXFxbDZnbWxuNWM1azJwbmJvYTo3Z3JoeHdyb3J5ejJzNHdudWdnam03amlkcGE0aWNyZW5yejV2dXE=' } };
            Request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                    // console.log('body  ' + body);
                    // console.log(response.statusCode);
                    if (response.statusCode === 404) {
                        console.log(" Number lookup failed " + phonenumber);
                        var options_1 = { method: 'POST',
                            url: 'https://api.catapult.inetwork.com/v1/users/u-enlczxkbnudy7tclkqsnyea/phoneNumbers',
                            headers: { 'cache-control': 'no-cache',
                                'Content-Type': 'application/json',
                                Authorization: 'Basic dC0ydWFrYXFxbDZnbWxuNWM1azJwbmJvYTo3Z3JoeHdyb3J5ejJzNHdudWdnam03amlkcGE0aWNyZW5yejV2dXE=' },
                            body: { number: phonenumber,
                                applicationId: 'a-leuyl4wkaxyvktoaynmgepy',
                                name: 'SMS_in',
                                provider: { providerName: 'bandwidth-dashboard',
                                    properties: { accountId: '5000040',
                                        userName: 'mrice',
                                        password: 'bandwidthV0itr3ss1' } } },
                            json: true };
                        Request(options_1, function (error, response, body) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log(body);
                            }
                        });
                    }
                }
            });
        });
        accountDb.insert(user, function (err, body) {
            if (err) {
                console.log("Could not insert " + err);
                res.send("Error, could not insert " + user._id);
                return;
            }
            else {
                var payload_1 = {
                    data: {
                        priv_level: user.priv_level,
                        "call_recording": {
                            "inbound": {
                                "offnet": {
                                    enabled: user.callrecord_external
                                },
                                "onnet": {
                                    enabled: user.callrecord_internal
                                }
                            },
                            "outbound": {
                                "offnet": {
                                    enabled: user.callrecord_external
                                },
                                "onnet": {
                                    enabled: user.callrecord_internal
                                }
                            }
                        }
                    }
                };
                var kRequest = getKazooRequest(req)
                    .patch({
                    url: process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + user._id,
                    body: payload_1,
                    json: true
                }, function (e, r, b) {
                    if (e) {
                        console.log(e);
                        res.send(JSON.stringify(e));
                        return;
                    }
                    else {
                        //console.log(JSON.stringify(r.body));
                        user._rev = body.rev;
                        response_data.push(user);
                        if (response_data.length === count) {
                            res.send(response_data);
                        }
                    }
                });
            }
        });
    };
    for (var _i = 0, _a = payload.users; _i < _a.length; _i++) {
        var user = _a[_i];
        _loop_3(user);
    }
});
app.post('/updateMasterUser/:id', validateJWT, function (req, res) {
    var payload = req.body.payload;
    console.log(payload);
    var id = req.params.id;
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(id, function (err, _userobj) {
        if (err) {
            res.send(err);
        }
        else {
            _userobj.first_name = payload.first_name;
            _userobj.last_name = payload.last_name;
            _userobj.email = payload.email;
            accountDb.insert(_userobj, function (update_err, update_body) {
                if (update_err) {
                    res.send(update_err);
                    console.log(update_err);
                }
                else {
                    res.send("sucsess");
                }
            });
        }
    });
});
app.get('/presence11:username', validateJWT, function (req, res) {
    //console.log("here is the user object 11111111111");
    var payload = req.body.payload;
});
app.get('/tmp_users', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users", function (err, response, body) {
        res.send(body);
    });
});
app.get('/notes/:contact_id', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var notes = [];
    accountDb.get(req.params.contact_id, function (err, result) {
        //console.log(result.notes.length);
        if (err) {
            res.send(err);
            return;
        }
        if (result.notes.length == 0) {
            res.send(err);
            return;
        }
        else {
            if (typeof result.notes === "undefined") {
                res.send(notes);
                return;
            }
            var ids = result.notes.filter(function (el) {
                return typeof el == "string";
            });
            var len_1 = ids.length;
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var id = ids_1[_i];
                accountDb.get(id, function (note_err, note) {
                    if (note_err) {
                        res.send(note_err);
                    }
                    else {
                        notes.push(note);
                        if (notes.length === len_1) {
                            res.send(notes);
                        }
                    }
                });
            }
        }
    });
});
app.post('/saveNote', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var note = req.body.note;
    accountDb.insert(note, function (err, result) {
        if (err) {
            res.send(err);
            return;
        }
        else {
            var id_1 = result.id;
            accountDb.get(note.contact_id, function (contact_err, contact) {
                if (contact_err) {
                    res.send(contact_err);
                    return;
                }
                else {
                    // This is a new note, we need to add the note
                    // to the contact's notes array and then get the note
                    if (typeof contact.notes === "undefined") {
                        contact.notes = [];
                    }
                    if (typeof contact.notes.find(function (e) { return e === id_1; }) === "undefined") {
                        contact.notes.push(id_1);
                        accountDb.insert(contact, function (update_body_err, updated_contact_body) {
                            if (update_body_err) {
                                res.send(update_body_err);
                                return;
                            }
                            else {
                                accountDb.get(updated_contact_body.id, function (update_err, updated_contact) {
                                    var len = updated_contact.notes.length;
                                    var rv = {
                                        notes: [],
                                        rev: updated_contact._rev
                                    };
                                    accountDb.fetch({ keys: updated_contact.notes }, function (e, n) {
                                        if (e) {
                                            res.send(e);
                                            return;
                                        }
                                        else {
                                            n = n.rows.map(function (e) {
                                                return e = e.doc;
                                            });
                                            rv.notes = n;
                                            res.send(JSON.stringify(rv));
                                            return;
                                        }
                                    });
                                });
                            }
                        });
                    }
                    else {
                        var len = contact.notes.length;
                        var rv_1 = {
                            rev: null,
                            notes: []
                        };
                        accountDb.fetch({ keys: contact.notes }, function (e, n) {
                            if (e) {
                                res.send(e);
                            }
                            else {
                                n = n.rows.map(function (e) {
                                    return e = e.doc;
                                });
                                rv_1.notes = n;
                                res.send(JSON.stringify(rv_1));
                                return;
                            }
                        });
                    }
                }
            });
        }
    });
});
app["delete"]('/deleteNote/:note_id/:note_rev/:contact_id', validateJWT, function (req, res) {
    var id = req.params.note_id;
    var rev = req.params.note_rev;
    var contact_id = req.params.contact_id;
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var rv = {
        rev: null,
        notes: []
    };
    accountDb.get(contact_id, function (err, contact) {
        if (err) {
            res.send(err);
        }
        else {
            contact.notes = contact.notes.filter(function (e) {
                return e !== id;
            });
            accountDb.insert(contact, function (update_err, updated_contact_body) {
                if (update_err) {
                    res.send(update_err);
                }
                else {
                    accountDb.destroy(id, rev, function (delete_err, delete_body) {
                        if (delete_err) {
                            res.send(delete_err);
                        }
                        else {
                            accountDb.get(updated_contact_body.id, function (contact_err, updated_contact) {
                                if (contact_err) {
                                    res.send(contact_err);
                                }
                                else {
                                    rv.rev = updated_contact._rev;
                                    var len = updated_contact.notes.length;
                                    accountDb.fetch({ keys: updated_contact.notes }, function (e, n) {
                                        if (e) {
                                            res.send(e);
                                        }
                                        else {
                                            n = n.rows.map(function (e) {
                                                return e = e.doc;
                                            });
                                            rv.notes = n;
                                            res.send(JSON.stringify(rv));
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
//Delete contact by _id
app["delete"]('/deleteContact/:contact_id/:contact_rev/', validateJWT, function (req, res) {
    var rev = req.params.contact_rev;
    var contact_id = req.params.contact_id;
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(contact_id, function (err, contact) {
        if (err) {
            res.send(err);
        }
        else {
            accountDb.destroy(contact_id, rev, function (delete_err, delete_body) {
                if (delete_err) {
                    res.send(delete_err);
                }
                else {
                    res.send({ message: "deleted " });
                }
            });
        }
    });
});
app.get('/scheduledReports', validateJWT, function (req, res) {
    // Get the real scheduled reports for this user
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    var scheduledReportSelector = {
        'selector': {
            'user_id': req['decoded'].user_id,
            'pvt_type': 'scheduled_report'
        }
    };
    // note `find` needs https://github.com/apache/couchdb-nano/pull/50 to be merged
    accountDb.find(scheduledReportSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /scheduledReports");
                res.send(err);
            }
        }
        res.statusCode = 200;
        // Can remove this once we have an endpoint that filters by the user
        res.send(JSON.stringify(result));
    });
});
app.get('/scheduledReports/:id', validateJWT, function (req, res) {
    var reqUrl = process.env.COUCHBASE_DB + "/" + encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id)) + "/" + req.params.id;
    // console.log(reqUrl);
    var couchbaseRequest = Request.get(reqUrl, function (error, response, body) {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = 200;
        res.send(body);
    });
});
app["delete"]('/scheduledReports/:id/:rev', validateJWT, function (req, res) {
    // Actually delete the scheduled report from the database
    var couchbaseRequest = Request.del(process.env.COUCHBASE_DB + "/" + encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id)) + "/" + req.params.id + "?rev=" + req.params.rev, function (error, response, body) {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = 200;
        res.send(body);
    });
});
app.get('/getUser/:id', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/users/" + req.params.id, function (err, response, body) {
        res.send(body);
    });
});
app.post('/login', function (req, res) {
    var _a = req.body, creds = _a.creds, account_name = _a.account_name;
    var responseData = {
        success: false
    };
    ///console.log(creds);
    //  creds 36b9c8368832d97173a6bb9911dc951f
    //creaccount_nameds morit
    var putData = {
        data: {
            credentials: creds,
            account_name: account_name
        },
        verb: "PUT"
    };
    var kRequest = Request.put(process.env.KAZOO_SERVER + "/v2/user_auth", {
        body: JSON.stringify(putData)
    }, function (err, response, body) {
        if (err) {
            console.error(err);
            serverlog("warning", err, "login");
        }
        if (response && response.statusCode === 201) {
            // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
            body = JSON.parse(body);
            var accountRequest = getKazooRequest(req, body.auth_token).get(process.env.KAZOO_SERVER + "/v2/accounts/" + body.data.account_id + "/", function (err2, response2, body2) {
                body2 = JSON.parse(body2);
                var token = jwt.sign({
                    'kazoo_api_key': body.auth_token,
                    'logged_in': true,
                    'user_id': body.data.owner_id,
                    'timezone': body2.data.timezone,
                    'account_id': body.data.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                });
                responseData.success = true;
                responseData.token = token;
                responseData.account_id = body.data.account_id;
                res.send(responseData);
            });
        }
        else {
            serverlog("warning", "login fail", "login");
            res.send(responseData);
        }
    });
});
app.post('/saveScheduledReport', validateJWT, function (req, res) {
    if (!req.body.account_id && !req.body.user_id) {
        req.body.account_id = req['decoded'].account_id;
        req.body.user_id = req['decoded'].user_id;
    }
    var couchRequest = Request.post({
        json: true,
        url: process.env.COUCHBASE_DB + "/" + encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id)) + "/",
        body: req.body
    }, function (err, response, body) {
        if (response.statusCode === 201) {
            res.statusCode = 201;
            res.send();
        }
    }).on('error', function (e) {
        console.error(e);
    });
});
app.get('/socketInfo', validateJWT, function (req, res) {
    res.send({
        account_id: req['decoded'].account_id,
        user_id: req['decoded'].user_id,
        token: req['decoded'].kazoo_api_key
    });
});
app.post('/checkNotifications', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var kRequest;
    return __generator(this, function (_a) {
        kRequest = getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes", function (err, response, body) {
            var vms = {
                vm_id: '',
                body: []
            };
            var tmp = JSON.parse(body);
            var data = tmp.data;
            if (data && Array.isArray(data)) {
                var vm_id = data.find(function (e) {
                    return e.owner_id === req['decoded'].user_id;
                }).id;
                vms.vm_id = vm_id;
                var kRequest2 = getKazooRequest(req)
                    .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req['decoded'].account_id + "/vmboxes/" + vm_id + "/messages", function (err, response, body) {
                    vms.body = body;
                    var vmarr = [];
                    JSON.parse(body).data.forEach(function (element) {
                        if (element.folder && (element.folder === 'new' || element.folder === 'saved')) {
                            var mapobj = {
                                eventType: "vm",
                                from: element.caller_id_number,
                                messageId: element.media_id,
                                id: element.media_id,
                                _id: element.media_id,
                                timestamp: element.timestamp,
                                read: element.folder != 'new'
                            };
                            vmarr.push(mapobj);
                        }
                    });
                    var rv = vmarr;
                    var numbers = req.body.numbers;
                    var d = new Date();
                    var year1 = d.getUTCFullYear();
                    var year2 = year1;
                    var this_month = d.getUTCMonth() + 1;
                    var last_month = this_month - 1;
                    if (this_month === 1) {
                        last_month = 12;
                        year2--;
                    }
                    this_month = this_month.toString();
                    last_month = last_month.toString();
                    if (this_month.length === 1) {
                        this_month = "0" + this_month;
                    }
                    if (last_month.length === 1) {
                        last_month = "0" + last_month;
                    }
                    var selector = {
                        'selector': {
                            'to': { '$in': numbers },
                            'direction': 'in'
                        },
                        limit: 100,
                        'sort': [{
                                'time': 'desc'
                            }]
                    };
                    var db1 = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year1 + this_month + "_sms";
                    var db2 = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + year2 + last_month + "_sms";
                    var textDB = nano.use(db1);
                    textDB.find(selector, function (err, body) {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            rv = rv.concat(body.docs);
                            var recivedlenghth = body.docs.length;
                            console.log("recivedlenghth : ", recivedlenghth);
                            if (recivedlenghth < 100) {
                                selector.limit = 100 - recivedlenghth;
                                textDB = nano.use(db2);
                                textDB.find(selector, function (err2, body2) {
                                    if (err2) {
                                        res.send(err2);
                                    }
                                    else {
                                        rv = rv.concat(body2.docs);
                                        res.send(rv);
                                    }
                                });
                            }
                            else {
                                res.send(rv);
                            }
                        }
                    });
                });
            }
        });
        return [2 /*return*/];
    });
}); });
app.post('/markNotificationAsRead', validateJWT, function (req, res) {
    var d = new Date(req.body.timestamp);
    var month = (d.getUTCMonth() + 1).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    var db_name = parseAccountToDatabaseName(req['decoded'].account_id) + "-" + d.getUTCFullYear() + month + "_sms";
    var db = nano.use(db_name);
    db.get(req.body.id, function (err, body) {
        if (err) {
            res.send(err);
        }
        else {
            var doc = body;
            doc.read = true;
            db.insert(doc, function (err2, body2) {
                if (err2) {
                    res.send(err2);
                }
                else {
                    res.send(req.body.id);
                }
            });
        }
    });
});
app.get('/error', function (req, res) {
    res.status(500);
    res.send("test");
});
app.get('/status', function (req, res) {
    res.status(200);
    res.send("ok");
});
function getHelloSpokeDbName() {
    return process.env.COUCHBASE_DB_ADMIN; // 'http://internal-hs-dashboard-db-1088269106.us-west-2.elb.amazonaws.com:5984';
}
function getAdminNano() {
    var adminNano = require('nano')(getHelloSpokeDbName());
    //https://github.com/apache/nano#using-cookie-authentication
    return adminNano;
}
function getAccountNameFromId(account_id) {
    return "account/" + account_id[0] + account_id[1] + "/" + account_id[2] + account_id[3] + "/" + account_id.substring(4);
}
function markDocAsKazooDeleted(accountDb, selector) {
    return new Promise(function (resolve, reject) {
        accountDb.find(selector, function (err, body) {
            if (err) {
                console.error(err);
                resolve(500);
            }
            else if (body.docs.length > 0) {
                var user = body.docs[0];
                // console.log(`Found this doc`, user);
                user.kazoo_deleted = new Date();
                user.pvt_deleted = true;
                accountDb.insert(user, function (updateErr, updated) {
                    if (updateErr) {
                        console.error(updateErr);
                        resolve(500);
                    }
                    else {
                        // console.log(updated);
                        resolve(200);
                    }
                });
            }
            else {
                console.error("Couldn't find any docs for selector: ", selector);
                resolve(500);
            }
        });
    });
}
/**
 * Call Dashboard API Routes
 */
app.get('/admin/accounts', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var promise1 = new Promise(function (resolve, reject) {
        getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/", function (e, r, b1) {
            if (e) {
                reject(e);
                "";
            }
            b1 = JSON.parse(b1);
            var self = {
                id: accountId,
                name: b1.data.name,
                realm: b1.data.realm,
                timezone: b1.timezone,
                tree: []
            };
            resolve(self);
        });
    });
    var promise2 = new Promise(function (resolve, reject) {
        getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/descendants?paginate=false", function (err, response, body) {
            if (err) {
                // res.statusCode = 500;
                // res.send(err);
                // reject(err);
                reject(err);
                return;
            }
            else {
                // console.log("\n\naccounts: ",body )
                var b = JSON.parse(body);
                if (b.error === "401") {
                    reject(b);
                    return;
                }
                var data = b.data;
                resolve(data);
                return;
            }
        });
    });
    Promise.all([promise1, promise2]).then(function (values) {
        if (values[1] === 'invalid creds') {
            res.send('oh no!');
        }
        var data = [values[0]];
        data = data.concat(values[1]);
        // This is dumb, but the store.ts file expects a response.data.data
        var body = { data: null };
        body.data = data;
        res.send(body);
    })["catch"](function (e) {
        res.send(e);
    });
});
//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/conferences?filter_owner_id=937adb7fb12cd203171a9d105fd9b43b&paginate=false&_=1553246578342
app.get('/conferences', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var owner_id = req['decoded'].user_id;
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences?filter_owner_id=" + owner_id + "&paginate=false", function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
        //   console.log('conferences body  ' + JSON.stringify(body));
        res.send(body);
    });
});
app.get('/callflows', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/callflows?filter_type=conference&paginate=false", function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        res.send(body);
    });
});
app.post('/conferenceaction/:conferenceid/:action?/:membeid?', validateJWT, function (req, res) {
    var memberid = req.params.membeid;
    var action = req.params.action;
    var conferenceid = req.params.conferenceid;
    var accountId = req['decoded'].account_id;
    var owner_id = req['decoded'].user_id;
    var responseData = {
        success: false
    };
    var putData = {
        data: {
            action: action,
            ui_metadata: {
                version: "4.2-50",
                ui: "monster-ui",
                origin: "common"
            }
        }
    };
    var url = process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + conferenceid + "/participants/" + memberid;
    if (memberid == 0) {
        url = process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + conferenceid + "/participants";
    }
    if (action === 'lock') {
        url = process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + conferenceid;
    }
    // console.log('conferenceaction:- ', url);
    //console.log('data:- ', JSON.stringify(putData));
    var kRequest = getKazooRequest(req).put(url, {
        body: JSON.stringify(putData)
    }, function (err, response, body) {
        if (err) {
            console.error(err);
        }
        if (response && response.statusCode === 201) {
            // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
            body = JSON.parse(body);
            // console.error('succ  ' +body);
            res.send(response);
        }
        else {
            console.error('err  ' + JSON.stringify(response));
            console.error('err  body' + JSON.stringify(body));
            res.send(response);
        }
    });
});
app.put('/conferences/:id', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var owner_id = req['decoded'].user_id;
    //console.log(" put owner_id " + owner_id);
    var id = req.params.id;
    // console.log("conferencesInfo put  id " + id);
    var data = req.body.data;
    //  console.log("conferencesInfo put  data " + data);
    var kRequest = getKazooRequest(req)
        .put({
        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + id,
        body: data,
        json: true
    }, function (err, response, body) {
        //   console.log(response);
        if (err) {
            console.log(err);
        }
        res.send(body);
    });
});
//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/users?paginate=false
app.get('/conferenceusers', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/users?paginate=false", function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
        // console.log('conferences user body  ' + JSON.stringify(body));
        res.send(body);
    });
});
//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/devices?_=1553516827536
app.get('/conferencedevices', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/devices?paginate=false", function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
        // console.log('conferences device body  ' + JSON.stringify(body));
        res.send(body);
    });
});
app.get('/channels', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/channels", function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
        // console.log('conferences device body  ' + JSON.stringify(body));
        res.send(body);
    });
});
app.get('/conferencesInfo/:id', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var owner_id = req['decoded'].user_id;
    //console.log("conferencesInfo owner_id " + owner_id);
    var id = req.params.id;
    // console.log("conferencesInfo id " + id);
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + id, function (err, response, body) {
        if (err) {
            res.send(err);
        }
        body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
        //   console.log('conferences info body  ' + JSON.stringify(body));
        res.send(body);
    });
});
app.post('/conferencesInfo/:id', validateJWT, function (req, res) {
    var accountId = req['decoded'].account_id;
    var owner_id = req['decoded'].user_id;
    console.log(" post owner_id " + owner_id);
    var id = req.params.id;
    console.log("conferencesInfo post  id " + id);
    var data = req.body.data;
    console.log("conferencesInfo post  data " + data);
    var kRequest = getKazooRequest(req)
        .post({
        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/conferences/" + id,
        body: data,
        json: true
    }, function (err, response, body) {
        //   console.log(response);
        if (err) {
            console.log(err);
        }
        res.send(body);
    });
});
app.get('/admin/accounts/:accountId/users', validateJWT, function (req, res) {
    // const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    // This is correct, but the database isn't whole right now.
    var accountDb = nano.use(parseAccountToDatabaseName(req.params.accountId));
    var selector = {
        'selector': {
            'pvt_deleted': {
                '$exists': false
            },
            'pvt_type': 'user'
        },
        'limit': 999
    };
    accountDb.find(selector, function (err, result) {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        }
        else {
            var promise1 = new Promise(function (resolve, reject) {
                getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + req.params.accountId + "/callflows?paginate=false", function (err2, resp, body) {
                    if (err2) {
                        reject(err2);
                    }
                    resolve(body);
                });
            });
            var promise2 = new Promise(function (resolve, reject) {
                getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + req.params.accountId + "/phone_numbers?paginate=false", function (err3, resp2, body2) {
                    if (err3) {
                        reject(err3);
                    }
                    resolve(body2);
                });
            });
            var promise3 = new Promise(function (resolve, reject) {
                getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + req.params.accountId + "/users", function (err4, resp3, body3) {
                    if (err4) {
                        reject(err4);
                    }
                    resolve(body3);
                });
            });
            Promise.all([promise1, promise2, promise3]).then(function (values) {
                result.callflows = JSON.parse(values[0]);
                result.phone_numbers = JSON.parse(values[1]);
                result.users = JSON.parse(values[2]);
                result.docs = result.docs.map(function (user) {
                    if (!user.hasOwnProperty('assigned_managers')) {
                        user.assigned_managers = [];
                    }
                    return user;
                });
                res.statusCode = 200;
                res.send(result);
            })["catch"](function (r) {
                res.send(r);
            });
        }
    });
});
/**
 * Webhooks
 */
app.post('/webhooks/accountCreated', function (req, res) {
    if (req.body.type !== 'account') {
        res.statusCode = 403;
        res.send();
    }
    else {
        // console.log(req.body);
        var adminNano_1 = getAdminNano();
        // Format account DB name
        var account_db_name_1 = getAccountNameFromId(req.body.account_id);
        // console.log(`New account database name: ${account_db_name}`);
        var account_template_db_1 = getHelloSpokeDbName() + "/account_template";
        // Create DB
        adminNano_1.db.create(account_db_name_1, function (err, body) {
            if (err) {
                if (err.statusCode === 412) {
                    // console.log("Account DB already exits with name " + account_db_name);
                }
                else {
                    // console.log(err);
                    // throw err;
                }
            }
            else {
                // console.log('database', account_db_name, 'successfully created');
                // Setup replication between the hellospoke Account Template DB and the new account DB.
                // This will ensure the account DB always has the up-to-date design documents
                var account_db = getHelloSpokeDbName() + "/" + encodeURIComponent(account_db_name_1);
                adminNano_1.db.replication.enable(account_template_db_1, account_db, { create_target: false }, function (err, body) {
                    if (err) {
                        // console.log(err);
                        // throw err;
                    }
                    else {
                        // Check on the state of the replication
                        adminNano_1.db.replication.query(body.id, function (error, reply) {
                            if (!error) {
                                if (reply.hasOwnProperty('_replication_state') && reply['_replication_state'] === 'error') {
                                    // console.log("Failed to replicate between the account DB " + account_db_name + " and the Account Template DB");
                                }
                                else {
                                    // console.log("Successfully REQUESTED replicated between the account DB " + account_db_name + " and the Account Template DB");
                                    // console.log(reply);
                                    var accountDb = adminNano_1.use(account_db_name_1);
                                    accountDb.insert({
                                        'email': '',
                                        'password': '',
                                        'outgoing_mail_server': '',
                                        'kazoo_deleted': false,
                                        'pvt_type': 'account'
                                    }, function (accountDocErr, accountDocBody) {
                                        if (accountDocErr) {
                                            console.error(accountDocErr);
                                        }
                                        else {
                                            // console.log(`Created new account doc`, accountDocBody);
                                            res.statusCode = 200;
                                            res.send();
                                        }
                                    });
                                }
                            }
                            else {
                                console.error(error);
                                res.statusCode = 500;
                                res.send();
                                // throw error;
                            }
                        });
                    }
                });
            }
        });
    }
});
app.post('/webhooks/accountDeleted', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var adminNano, accountDb, accountDocQuery, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                adminNano = getAdminNano();
                accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
                accountDocQuery = {
                    'selector': {
                        'pvt_type': 'account'
                    }
                };
                _a = res;
                return [4 /*yield*/, markDocAsKazooDeleted(accountDb, accountDocQuery)];
            case 1:
                _a.statusCode = _b.sent();
                res.send();
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhooks/userCreated', function (req, res) {
    // console.log(req.body);
    var adminNano = getAdminNano();
    var accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
    accountDb.insert({
        _id: req.body.id,
        user_id: req.body.id,
        account_id: req.body.account_id,
        privilege_level: "user",
        kazoo_deleted: false,
        pvt_deleted: false,
        assigned_users: [],
        pvt_type: "user"
    }, function (err, body) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send();
        }
        else {
            // console.log(body);
            res.statusCode = 200;
            res.send();
        }
    });
});
app.post('/webhooks/userDeleted', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var adminNano, accountDb, userSelector, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                adminNano = getAdminNano();
                accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
                userSelector = {
                    'selector': {
                        'pvt_type': 'user',
                        '_id': {
                            "$eq": req.body.id
                        }
                    }
                };
                _a = res;
                return [4 /*yield*/, markDocAsKazooDeleted(accountDb, userSelector)];
            case 1:
                _a.statusCode = _b.sent();
                res.send();
                return [2 /*return*/];
        }
    });
}); });
//notify code start from here
//functions
var companyIdSelector = {
    "selector": {
        "$or": [
            {
                "pvt_type": "company",
                "companyname": "Company A (Notify Only)",
                "enabled": true
            },
            {
                "pvt_type": "property",
                "kazoopropertyname": "Company A (Notify Only)",
                "enabled": true
            }
        ]
    },
    "fields": [
        "_id",
        "companyid",
        "propertyname",
        "companyname",
        "propertyid"
    ]
};
var userSelector = {
    "selector": {
        "username": "testpass@facileconsulting.com",
        "notify_enabled": true
    },
    "fields": [
        "_id",
        "username",
        "id",
        "first_name"
    ]
};
var optinPropertyIdSelector = {
    "selector": {
        "pvt_type": "property",
        "enabled": true
    },
    "fields": [
        "_id",
        "companyid",
        "propertyname",
        "companyname",
        "propertyid"
    ]
};
var optinUserIdSelector = {
    "selector": {
        "pvt_type": "user",
        "smssettings.settings": {
            "$elemMatch": { "$or": [{
                        "number": "5023520197"
                    },
                    {
                        "number": "5023520197"
                    }
                ] }
        }
    }
};
var getMasterUsers = function (account_id, companyid) {
    var accountDb = nano.use(account_id);
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    'pvt_type': 'user'
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                return { statusCode: result.statusCode,
                    err: err };
            }
            catch (e) {
                return { statusCode: 401,
                    err: err };
            }
        }
        else {
            return { statusCode: 200,
                result: result
            };
        }
    });
};
var getAddedProperty = function (account_id, companyid) {
    var accountDb = nano.use(account_id);
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    'pvt_type': 'property'
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            console.log('error:--', err);
            try {
                return { statusCode: 500,
                    err: err };
            }
            catch (e) {
                return { statusCode: 401,
                    err: err };
            }
        }
        else {
            console.log('result');
            return { statusCode: 200,
                result: result
            };
        }
    });
};
var insertUser = function (usr, accountdbname) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountDb, insertuserpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\naccountdbname ", accountdbname);
                accountDb = nano.use(accountdbname);
                insertuserpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        usr.pvt_type = "user";
                        accountDb.insert(usr, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log("inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, insertuserpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getCallReportData = function (companydbname) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var companydb, userdocspromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\getComapnyUsers ", companydbname);
                companydb = nano.use(companydbname);
                userdocspromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var contactsSelector, userdocs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                contactsSelector = {
                                    "selector": {
                                        "pvt_type": "user",
                                        "notify_enabled": true,
                                        "scheduleemailreport": {
                                            "$exists": true
                                        },
                                        "$or": [
                                            {
                                                "scheduleemailreport.daily.is_active": true
                                            },
                                            {
                                                "scheduleemailreport.weekely.is_active": true
                                            },
                                            {
                                                "scheduleemailreport.monthaly.is_active": true
                                            }
                                        ]
                                    },
                                    "limit": 30000,
                                    "fields": [
                                        "_id",
                                        "id",
                                        "first_name",
                                        "last_name",
                                        "propertylist",
                                        "scheduleemailreport",
                                        "msteruser",
                                        "user_type",
                                        "timezone"
                                    ]
                                };
                                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
                            case 1:
                                userdocs = _a.sent();
                                resolve(userdocs);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, userdocspromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getCallActivityReportData = function (companydbname) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var companydb, callActivityReportDataPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\getCallActivityReportData1 ", companydbname);
                companydb = nano.use(companydbname);
                callActivityReportDataPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var contactsSelector, userdocs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                contactsSelector = {
                                    "selector": {
                                        "pvt_type": "callactivityreport",
                                        "enabled": true,
                                        "$or": [
                                            {
                                                "daily.is_active": true
                                            },
                                            {
                                                "weekely.is_active": true
                                            },
                                            {
                                                "monthaly.is_active": true
                                            }
                                        ]
                                    },
                                    "limit": 30000
                                };
                                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
                            case 1:
                                userdocs = _a.sent();
                                resolve(userdocs);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, callActivityReportDataPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getComapnyUsers = function (companydbname) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var companydb, userdocspromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\getComapnyUsers ", companydbname);
                companydb = nano.use(companydbname);
                userdocspromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var contactsSelector, userdocs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                contactsSelector = {
                                    "selector": {
                                        "pvt_type": "user",
                                        "notify_enabled": true,
                                        "scheduleemailreport": {
                                            "$exists": true
                                        },
                                        "$or": [
                                            {
                                                "scheduleemailreport.daily.is_active": true
                                            },
                                            {
                                                "scheduleemailreport.weekely.is_active": true
                                            },
                                            {
                                                "scheduleemailreport.monthaly.is_active": true
                                            }
                                        ]
                                    },
                                    "limit": 30000,
                                    "fields": [
                                        "_id",
                                        "id",
                                        "first_name",
                                        "last_name",
                                        "propertylist",
                                        "scheduleemailreport",
                                        "msteruser",
                                        "user_type",
                                        "email",
                                        "timezone"
                                    ]
                                };
                                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
                            case 1:
                                userdocs = _a.sent();
                                resolve(userdocs);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, userdocspromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertusersettings = function (usrsettings, accountdbname) {
    console.log("\naccountdbname ", accountdbname);
    var accountDb = nano.use(accountdbname);
    usrsettings.pvt_type = "usersetting";
    accountDb.insert(usrsettings, function (err, body) {
        if (err) {
            console.log("err ", err);
            return err;
            ;
        }
        else {
            console.log("usersetting inserted succefully");
            return body;
        }
    });
};
var getemrtdata = function () { return __awaiter(_this, void 0, void 0, function () {
    var globaldb, contactsSelector, emrtdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                globaldb = nano.use("globaldb");
                contactsSelector = {
                    'selector': {
                        "pvt_type": "emrtavg"
                    }
                };
                return [4 /*yield*/, getdocumentbyproperty(globaldb, contactsSelector)];
            case 1:
                emrtdata = _a.sent();
                return [2 /*return*/, emrtdata];
        }
    });
}); };
var getcallsummerydata = function (companydbname) { return __awaiter(_this, void 0, void 0, function () {
    var companydb, contactsSelector, callsummeryforcompany;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companydb = nano.use(companydbname);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "callsummery"
                    }
                };
                return [4 /*yield*/, getdocumentbyproperty(companydb, contactsSelector)];
            case 1:
                callsummeryforcompany = _a.sent();
                return [2 /*return*/, callsummeryforcompany];
        }
    });
}); };
var get_call_activity_data = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var start_date_local, start_date_utc, start_date_utc_unix, end_date_local, end_date_utc, end_date_utc_unix, querystring, payload, callActivityData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start_date_local = moment().add(-30, "days").startOf('day');
                start_date_utc = moment(start_date_local.clone()).utc();
                start_date_utc_unix = start_date_utc.unix();
                end_date_local = moment().endOf('day');
                end_date_utc = moment(end_date_local.clone()).utc();
                end_date_utc_unix = end_date_utc.unix();
                querystring = "(companyid:" + companyid + ")";
                payload = {
                    querystring: querystring,
                    starttime: start_date_utc_unix,
                    endtime: end_date_utc_unix
                };
                return [4 /*yield*/, getelasticsearchdata(payload)];
            case 1:
                callActivityData = _a.sent();
                return [2 /*return*/, callActivityData];
        }
    });
}); };
var send_callactivity_report = function () { return __awaiter(_this, void 0, void 0, function () {
    var account_db_pattern, dbnames, dbindex, dbname, companyid, company, scheduleemailreport, emails, callActivityData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                dbindex = 0;
                _a.label = 2;
            case 2:
                if (!(dbindex < dbnames.length)) return [3 /*break*/, 8];
                dbname = dbnames[dbindex];
                companyid = parseDatabaseNameToAccount(dbname);
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 3:
                company = _a.sent();
                console.log(dbname);
                if (!company) return [3 /*break*/, 7];
                return [4 /*yield*/, getSechdulereportData(dbname, "callactivitydailyreport")];
            case 4:
                scheduleemailreport = _a.sent();
                if (!(scheduleemailreport && scheduleemailreport.length > 0 && scheduleemailreport[0].data && scheduleemailreport[0].data.length)) return [3 /*break*/, 7];
                emails = scheduleemailreport[0].data.join();
                return [4 /*yield*/, get_call_activity_data(companyid)];
            case 5:
                callActivityData = _a.sent();
                sendCallActivityScheduleReport(callActivityData, emails);
                scheduleemailreport[0].processed = true;
                return [4 /*yield*/, insert_dailyemaillist(dbname, scheduleemailreport[0])];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                dbindex++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/];
        }
    });
}); };
var callactivity_report = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var account_db_pattern, dbnames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                dbnames.forEach(function (dbname) { return __awaiter(_this, void 0, void 0, function () {
                    var companyid, company, reportrunningUTCTime, callActivityScheduleData, companyschedulereportinfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                companyid = parseDatabaseNameToAccount(dbname);
                                return [4 /*yield*/, getcompanyInfo(companyid)];
                            case 1:
                                company = _a.sent();
                                reportrunningUTCTime = moment().utc();
                                if (!company) return [3 /*break*/, 3];
                                return [4 /*yield*/, getCallActivityReportData(dbname)];
                            case 2:
                                callActivityScheduleData = _a.sent();
                                if (callActivityScheduleData && Array.isArray(callActivityScheduleData) && callActivityScheduleData.length > 0) {
                                    companyschedulereportinfo = {
                                        companyid: companyid,
                                        companydbname: dbname,
                                        callActivityScheduleData: callActivityScheduleData,
                                        reportrunningUTCTime: reportrunningUTCTime
                                    };
                                    build_callactivity_report(companyschedulereportinfo);
                                }
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var send_callsummery_report = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var account_db_pattern, dbnames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                dbnames.forEach(function (dbname) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var companyid, company, schedulereportdatalist, callsummeryData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                companyid = parseDatabaseNameToAccount(dbname);
                                return [4 /*yield*/, getcompanyInfo(companyid)];
                            case 1:
                                company = _a.sent();
                                console.log(dbname);
                                if (!company) return [3 /*break*/, 4];
                                return [4 /*yield*/, getSechdulereportData(dbname, "dailyreport")];
                            case 2:
                                schedulereportdatalist = _a.sent();
                                if (!(schedulereportdatalist && Array.isArray(schedulereportdatalist) && schedulereportdatalist.length > 0)) return [3 /*break*/, 4];
                                return [4 /*yield*/, getcallsummerydata(dbname)];
                            case 3:
                                callsummeryData = _a.sent();
                                schedulereportdatalist.forEach(function (schedulereportdata) { return __awaiter(_this, void 0, void 0, function () {
                                    var emails;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(schedulereportdata.data && schedulereportdata.data.length)) return [3 /*break*/, 2];
                                                emails = schedulereportdata.data.join();
                                                console.log(emails);
                                                return [4 /*yield*/, sendScheduleReport(callsummeryData, emails)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                schedulereportdata.processed = true;
                                                return [4 /*yield*/, insert_dailyemaillist(dbname, schedulereportdata)];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var callsummery_report = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var account_db_pattern, dbnames, reportrunningUTCTime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                reportrunningUTCTime = moment().utc();
                dbnames.forEach(function (dbname) { return __awaiter(_this, void 0, void 0, function () {
                    var companyid, company, companyuserlist, companyschedulereportinfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                companyid = parseDatabaseNameToAccount(dbname);
                                return [4 /*yield*/, getcompanyInfo(companyid)];
                            case 1:
                                company = _a.sent();
                                if (!company) return [3 /*break*/, 3];
                                return [4 /*yield*/, getComapnyUsers(dbname)];
                            case 2:
                                companyuserlist = _a.sent();
                                if (companyuserlist && Array.isArray(companyuserlist) && companyuserlist.length > 0) {
                                    companyschedulereportinfo = {
                                        companyid: companyid,
                                        companydbname: dbname,
                                        users: companyuserlist,
                                        reportrunningUTCTime: reportrunningUTCTime
                                    };
                                    send_callsumery_report(companyschedulereportinfo);
                                }
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var send_callsumery_report = function (companyScheduleReportInfo) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, companydbname, users, reportrunningUTCTime, dailyemaillist, weeklyemaillist, monthlyeamillist, userindex, user, timezone, now_date_time, next_run_report_time, user_schedule_report_time_string, scheduleemailreport, dayname, monthday, endOfMonth, timing, daily, weekely, monthaly, reporttype, hh, user_schedule_report_Date_time, emaillist, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = companyScheduleReportInfo.companyid;
                companydbname = companyScheduleReportInfo.companydbname;
                users = companyScheduleReportInfo.users;
                reportrunningUTCTime = companyScheduleReportInfo.reportrunningUTCTime;
                dailyemaillist = [];
                weeklyemaillist = [];
                monthlyeamillist = [];
                for (userindex = 0; userindex < users.length; userindex++) {
                    try {
                        user = users[userindex];
                        timezone = user.timezone ? user.timezone : "America/New_York";
                        now_date_time = reportrunningUTCTime.tz(timezone);
                        next_run_report_time = now_date_time.clone().add(30, 'minutes');
                        scheduleemailreport = user.scheduleemailreport;
                        dayname = now_date_time.format('dddd');
                        monthday = now_date_time.format('DD');
                        endOfMonth = moment().endOf('month').format('DD');
                        if (scheduleemailreport.daily.is_active) {
                            daily = scheduleemailreport.daily;
                            timing = daily.timing;
                            //   user_schedule_report_time_string= `${dailytiming.hh}:${dailytiming.mm} ${dailytiming.a}`;
                            //user_schedule_report_time=  moment(from_time_1 ,"hh:mm a");
                        }
                        else if (scheduleemailreport.weekely.is_active && scheduleemailreport.days[dayname]) {
                            weekely = scheduleemailreport.weekely;
                            timing = weekely.timing;
                            // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
                        }
                        else if (scheduleemailreport.monthaly.is_active) {
                            monthaly = scheduleemailreport.monthaly;
                            reporttype = parseInt(monthaly.report_type);
                            if ((reporttype === 0 && monthday === 1) || (reporttype === 2 && monthday === 15)
                                || (endOfMonth === monthday)) {
                                timing = monthaly.timing;
                                //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                            }
                        }
                        //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
                        {
                            hh = parseInt(timing.hh);
                            if (timing.a === "pm" && hh != 12)
                                timing.hh = hh + 12;
                            else if (hh === 12 && timing.a === "am")
                                timing.hh = 0;
                            user_schedule_report_Date_time = moment.tz(timezone);
                            user_schedule_report_Date_time.set({
                                hour: timing.hh,
                                minute: timing.mm,
                                second: timing.ss
                            });
                            /* console.log("user_schedule_report_Date_time");
                             console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
                          */
                            /// 
                            if (user_schedule_report_Date_time.isBetween(now_date_time, next_run_report_time)) {
                                console.log("I am here ");
                                emaillist = scheduleemailreport.emails;
                                dailyemaillist.push(emaillist);
                            }
                        }
                    }
                    catch (error) {
                        //console.log(error);
                    }
                }
                ;
                if (!(dailyemaillist.length > 0)) return [3 /*break*/, 2];
                data = {
                    "pvt_type": "dailyreport",
                    "data": dailyemaillist,
                    "processed": false
                };
                return [4 /*yield*/, insert_dailyemaillist(companydbname, data)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var build_callactivity_report = function (companyScheduleReportInfo) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, companydbname, callActivityScheduleData, timezone, reportrunningUTCTime, now_date_time, next_run_report_time, dailyemaillist, _index, data, user_schedule_report_time_string, scheduleemailreport, dayname, monthday, endOfMonth, timing, daily, weekely, monthaly, reporttype, hh, user_schedule_report_Date_time, emaillist, data_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = companyScheduleReportInfo.companyid;
                companydbname = companyScheduleReportInfo.companydbname;
                callActivityScheduleData = companyScheduleReportInfo.callActivityScheduleData;
                timezone = "America/New_York";
                reportrunningUTCTime = companyScheduleReportInfo.reportrunningUTCTime;
                now_date_time = reportrunningUTCTime.tz(timezone);
                next_run_report_time = now_date_time.clone().add(30, 'minutes');
                dailyemaillist = [];
                for (_index = 0; _index < callActivityScheduleData.length; _index++) {
                    try {
                        data = callActivityScheduleData[_index];
                        scheduleemailreport = data;
                        dayname = now_date_time.format('dddd');
                        monthday = now_date_time.format('DD');
                        endOfMonth = moment().endOf('month').format('DD');
                        if (scheduleemailreport.daily.is_active) {
                            daily = scheduleemailreport.daily;
                            timing = daily.timing;
                        }
                        else if (scheduleemailreport.weekely.is_active && scheduleemailreport.days[dayname]) {
                            weekely = scheduleemailreport.weekely;
                            timing = weekely.timing;
                            // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
                        }
                        else if (scheduleemailreport.monthaly.is_active) {
                            monthaly = scheduleemailreport.monthaly;
                            reporttype = parseInt(monthaly.report_type);
                            if ((reporttype === 0 && monthday === 1) || (reporttype === 2 && monthday === 15)
                                || (endOfMonth === monthday)) {
                                timing = monthaly.timing;
                                //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                            }
                        }
                        //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
                        {
                            hh = parseInt(timing.hh);
                            if (timing.a === "pm" && hh != 12)
                                timing.hh = hh + 12;
                            else if (hh === 12 && timing.a === "am")
                                timing.hh = 0;
                            user_schedule_report_Date_time = moment.tz(timezone);
                            user_schedule_report_Date_time.set({
                                hour: timing.hh,
                                minute: timing.mm,
                                second: timing.ss
                            });
                            //                console.log(JSON.stringify( data.emails));
                            console.log("user_schedule_report_Date_time");
                            console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
                            if (user_schedule_report_Date_time.isBetween(now_date_time, next_run_report_time)) {
                                emaillist = scheduleemailreport.emails;
                                dailyemaillist.push(emaillist);
                                //         sendCallActivityScheduleReport(callActivityData, scheduleemailreport)
                            }
                        }
                    }
                    catch (error) {
                        //console.log(error);
                    }
                }
                ;
                console.log(dailyemaillist);
                if (!(dailyemaillist.length > 0)) return [3 /*break*/, 2];
                data_1 = {
                    "pvt_type": "callactivitydailyreport",
                    "data": dailyemaillist,
                    "processed": false
                };
                return [4 /*yield*/, insert_dailyemaillist(companydbname, data_1)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
var formaReportTime = function (value) {
    if (isNaN(value) || !value)
        return '';
    var time = parseInt(value);
    var hour = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60) - (hour * 60);
    var sconds = (time % 60);
    var minutes_str = minutes.toString();
    var sconds_str = sconds.toString();
    var hour_str = hour.toString();
    if (hour > 0)
        return hour + "h " + minutes_str + "m";
    else if (minutes > 0)
        return minutes + "m " + sconds_str + "s";
    else
        return "0m " + sconds_str + "s";
};
var sendCallActivityScheduleReport = function (reportdata, emails) {
    var header = ["Company Name", "Property Name", "Date", "Time", "Bussiness Hour", "Call Duration", "Type", "LIVE",
        "Caller Name", "Caller Number", "Respondent", "Response Time"];
    var csv = [];
    csv.push(header.join());
    console.log("reportdata");
    reportdata.forEach(function (cdr) {
        var cdrString = [];
        var duringbussinesshours = cdr.duringbussinesshours === "true" ? 'yes' : 'no';
        var timezone = cdr.propertytimezone ? cdr.propertytimezone : "America/New_York";
        var incidentdate = moment.unix(cdr.incidentdate).tz(timezone).format('M/D/YY');
        var incidentime = moment.unix(cdr.incidentdate).tz(timezone).format('h:mma');
        console.log(cdr.when);
        console.log(cdr.callduration);
        cdrString.push(cdr.companyname, cdr.propertyname, incidentdate, incidentime, duringbussinesshours, formaReportTime(cdr.cdr.callduration), cdr.type, cdr.when, cdr.callername, cdr.fromd, cdr.respondent, formaReportTime(cdr.responsetime));
        csv.push(cdrString.join(','));
    });
    console.log("csv");
    var emaillist = emails;
    console.log(emaillist);
    var emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: emaillist,
        subject: 'Notify call activity report',
        text: "Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .",
        html: "<img src=\"http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png\" width=\"150\" height=\"63\" title=\"HelloSpoke Logo\" alt=\"HelloSpoke\">\n        <div>\n            <h1>Thank you for using HelloSpoke!  </h1>\n            <p>Attached you will find your scheduled HelloSpoke call report, .</p>\n        </div>",
        attachments: [
            {
                filename: "call_activity.csv",
                content: csv.join('\n')
            }
        ]
    };
    var smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, function (err, info) {
        if (err) {
            console.log("kkkkkkkkkkkkkkkk erorr: ", err);
            // callback(err, null);
        }
        else {
            console.log("scucess ");
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
};
var sendScheduleReport = function (reportdata, emails) {
    var header = reportdata.data.header;
    header.unshift('TOTAL CALLS');
    header.unshift('PROPERTY NAME');
    header.push("AVG EMRT");
    var csv = [];
    csv.push(header.join()); //['PROPERTY NAME,TOTAL CALLS,LEASING,GENERAL,COURTESY ,EMERGENCY ,OTHER , AVG EMRT']; 
    reportdata.data.data.forEach(function (cdr) {
        var duration = moment.duration(+cdr.avg_emrt, 'seconds');
        var convert_durt = moment.utc(duration.asMilliseconds()).format("mm:s");
        var durtn = convert_durt.split(':');
        var final_durtn = durtn[0] + 'm' + ' ' + durtn[1] + 's';
        var _avgemrt = isNaN(cdr.avg_emrt) ? "-" : final_durtn;
        var cdrString = [];
        cdrString.push(cdr.propertyname, cdr.total_call, cdr[header[2].toLowerCase()], cdr[header[3].toLowerCase()], cdr[header[4].toLowerCase()], cdr[header[5].toLowerCase()], cdr[header[6].toLowerCase()], _avgemrt //   final_durtn 
        );
        csv.push(cdrString.join(','));
    });
    console.log("csv");
    console.log(csv);
    var emaillist = emails;
    console.log(emaillist);
    var emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: emaillist,
        subject: 'Notify property report',
        text: "Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .",
        html: "<img src=\"http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png\" width=\"150\" height=\"63\" title=\"HelloSpoke Logo\" alt=\"HelloSpoke\">\n        <div>\n            <h1>Thank you for using HelloSpoke!  </h1>\n            <p>Attached you will find your scheduled HelloSpoke call report, .</p>\n        </div>",
        attachments: [
            {
                filename: "Notify_Schedule.csv",
                content: csv.join('\n')
            }
        ]
    };
    var smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, function (err, info) {
        if (err) {
            console.log("kkkkkkkkkkkkkkkk erorr: ", err);
            // callback(err, null);
        }
        else {
            console.log("scucess ");
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
};
var update_call_summery_data = function () { return __awaiter(_this, void 0, void 0, function () {
    var account_db_pattern, dbnames, result, i, dbname, companyid, company, call_summery_result_data, inserresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                result = [];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 6];
                dbname = dbnames[i];
                console.log(dbname);
                companyid = parseDatabaseNameToAccount(dbname);
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 3:
                company = _a.sent();
                if (!company) return [3 /*break*/, 5];
                return [4 /*yield*/, calculate_company_callsummery(companyid)];
            case 4:
                call_summery_result_data = _a.sent();
                inserresult = insertcallsummerydata(dbname, call_summery_result_data);
                result.push(inserresult);
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, result];
        }
    });
}); };
var calculate_company_callsummery = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var companydbname, comapanydb, company, reportdocs, emrgency_reportdocs, companypropertylist, propertyData, emergency_propertyData, emergency_property_Response_Data_Count, calloptionData, multifamilycalloptions, heatingandaircalloptions, header, callsummery, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companydbname = parseAccountToDatabaseName(companyid);
                comapanydb = nano.use(companydbname);
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 1:
                company = _a.sent();
                return [4 /*yield*/, getmonthreportdata(companyid)];
            case 2:
                reportdocs = _a.sent();
                emrgency_reportdocs = reportdocs.filter(function (r) { return r.type
                    && r.type.toLowerCase() === "emergency" && !isNaN(r.responsetime) && r.responsetime > 0; });
                return [4 /*yield*/, getcompanypropertylsit(companyid)];
            case 3:
                companypropertylist = _a.sent();
                propertyData = d3c.nest()
                    .key(function (d) { return d.propertyid; })
                    .rollup(function (v) {
                    return {
                        total: v.length
                    };
                })
                    .entries(reportdocs);
                emergency_propertyData = d3c.nest()
                    .key(function (d) { return d.propertyid; })
                    .rollup(function (v) {
                    return {
                        avg_emrt: d3.mean(v, function (d) { return isNaN(d.responsetime) ? 0 : d.responsetime; })
                    };
                })
                    .entries(emrgency_reportdocs);
                emergency_property_Response_Data_Count = d3c.nest()
                    .key(function (d) { return d.propertyid; })
                    .rollup(function (v) {
                    return {
                        total: v.length
                    };
                })
                    .entries(emrgency_reportdocs);
                calloptionData = d3c.nest()
                    .key(function (d) { return d.propertyid; })
                    .key(function (d) { return d.type; })
                    .rollup(function (v) { return v.length; })
                    .entries(reportdocs);
                multifamilycalloptions = ["Leasing", "General", "Emergency", "Courtesy", "Other"];
                heatingandaircalloptions = ["Plumbing", "Electrical", "General", "Emergency", "Other"];
                header = company.industry === "Multifamily" ?
                    multifamilycalloptions
                    : heatingandaircalloptions;
                callsummery = [];
                companypropertylist.forEach(function (p) {
                    var propertydata = propertyData.find(function (pd) { return pd.key === p.propertyid; });
                    var emergency_propertydata = emergency_propertyData.find(function (pd) { return pd.key === p.propertyid; });
                    var emergency_property_response_data_count = emergency_property_Response_Data_Count.find(function (pd) { return pd.key === p.propertyid; });
                    var rowdata = {
                        propertyname: p.propertyname,
                        propertyid: p.propertyid
                    };
                    var calloptionRows = calloptionData.find(function (cl) { return cl.key === p.propertyid; });
                    console.log(propertydata);
                    if (propertydata) {
                        rowdata["total_call"] = propertydata.value.total;
                    }
                    else {
                        rowdata["total_call"] = 0;
                        ;
                    }
                    rowdata["avg_emrt"] = emergency_propertydata &&
                        emergency_propertydata.value &&
                        emergency_propertydata.value.avg_emrt ?
                        parseInt(emergency_propertydata.value.avg_emrt) :
                        "-";
                    rowdata["avg_emrt_data_count"] = emergency_property_response_data_count &&
                        emergency_property_response_data_count.value &&
                        emergency_property_response_data_count.value.total ?
                        parseInt(emergency_property_response_data_count.value.total) :
                        0;
                    // if (calloptionRows) {
                    header.forEach(function (calloption) {
                        var calloptionRowData = calloptionRows && calloptionRows.values ?
                            calloptionRows.values.find(function (clpr) { return clpr.key === calloption; }) : undefined;
                        //  console.log(calloptionRowData);
                        if (calloptionRowData)
                            rowdata[calloption.toLowerCase()] = calloptionRowData.value;
                        else
                            rowdata[calloption.toLowerCase()] = 0;
                    });
                    callsummery.push(rowdata);
                });
                result = {
                    data: {
                        header: header,
                        data: callsummery
                    }
                };
                return [2 /*return*/, result];
        }
    });
}); };
var insertcallsummerydata = function (companydbname, callsummurydata) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var globaldb, _storeddata, promise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                globaldb = nano.use(companydbname);
                return [4 /*yield*/, getcallsummerydata(companydbname)];
            case 1:
                _storeddata = _a.sent();
                callsummurydata.pvt_type = "callsummery";
                if (_storeddata) {
                    callsummurydata._id = _storeddata._id;
                    callsummurydata._rev = _storeddata._rev;
                }
                promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        globaldb.insert(callsummurydata, function (err, body) {
                            if (err) {
                                console.log("err callsummurydata", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" callsummurydata inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, promise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getSechdulereportData = function (companydbname, pvt_type) { return __awaiter(_this, void 0, void 0, function () {
    var companydb, contactsSelector, schedulereports;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companydb = nano.use(companydbname);
                contactsSelector = {
                    "selector": {
                        "processed": false,
                        "pvt_type": pvt_type
                    }
                };
                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
            case 1:
                schedulereports = _a.sent();
                return [2 /*return*/, schedulereports];
        }
    });
}); };
var insert_dailyemaillist = function (companydbname, data) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var companydb, promise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companydb = nano.use(companydbname);
                promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        companydb.insert(data, function (err, body) {
                            if (err) {
                                console.log("insert_dailyemaillist", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" insert_dailyemaillist  inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, promise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertemrtdata = function (i_emrtdata) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var globaldb, emrtdata, promise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                globaldb = nano.use("globaldb");
                return [4 /*yield*/, getemrtdata()];
            case 1:
                emrtdata = _a.sent();
                i_emrtdata.pvt_type = "emrtavg";
                if (emrtdata) {
                    i_emrtdata._id = emrtdata._id;
                    i_emrtdata._rev = emrtdata._rev;
                }
                promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        globaldb.insert(i_emrtdata, function (err, body) {
                            if (err) {
                                console.log("err i_emrtdata", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" emrtdata inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, promise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var inserts3notification = function (s3notification) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var globaldb, insertdata, promise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // if(typeof message === 'string') {
                console.log(s3notification);
                globaldb = nano.use("globaldb");
                insertdata = {
                    data: s3notification,
                    pvt_type: "s3notification"
                };
                promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        globaldb.insert(insertdata, function (err, body) {
                            if (err) {
                                console.log("err s3notification", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" s3notification inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, promise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertcompany = function (company, req) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var tree, index, dbnames, accountinsertpromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tree = company.tree;
                            tree.push(company.kazooid);
                            company.pvt_type = "company";
                            tree = tree.reverse();
                            index = 1;
                            return [4 /*yield*/, getaccountdbnames()];
                        case 1:
                            dbnames = _a.sent();
                            console.log("inserting company");
                            accountinsertpromise = [];
                            tree.forEach(function (accid) {
                                accountinsertpromise.push(new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                    var _accountdbname, isCompanyDBAvailable, creation_result, result, accountDb, stored_company;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                _accountdbname = parseAccountToDatabaseName(accid);
                                                isCompanyDBAvailable = dbnames.find(function (d) { return d === _accountdbname; });
                                                if (!!isCompanyDBAvailable) return [3 /*break*/, 5];
                                                return [4 /*yield*/, createaccountdb(_accountdbname)];
                                            case 1:
                                                creation_result = _a.sent();
                                                createindexes(_accountdbname);
                                                return [4 /*yield*/, setKazooAccountEmailNotification(req, accid)];
                                            case 2:
                                                _a.sent();
                                                return [4 /*yield*/, deletekazoostorage(req, accid)];
                                            case 3:
                                                _a.sent();
                                                return [4 /*yield*/, creteKazooStorageAttachments(req, accid)];
                                            case 4:
                                                result = _a.sent();
                                                _a.label = 5;
                                            case 5:
                                                console.log("\n  accountname ", _accountdbname);
                                                accountDb = nano.use(_accountdbname);
                                                return [4 /*yield*/, getcompanyInfo(company.companyid, accountDb)];
                                            case 6:
                                                stored_company = _a.sent();
                                                if (stored_company && stored_company._id && stored_company._rev) {
                                                    company._id = stored_company._id;
                                                    company._rev = stored_company._rev;
                                                }
                                                accountDb.insert(company, function (err, body) {
                                                    if (err) {
                                                        console.log("err ", err);
                                                        resolve(err);
                                                        ;
                                                    }
                                                    else {
                                                        console.log(" company inserted succefully");
                                                        resolve(body);
                                                    }
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            });
                            Promise.all(accountinsertpromise).then(function (results) {
                                resolve("succefully inserted company");
                            })["catch"](function (err) {
                                reject(err);
                            });
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var sendNotifySMS = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var messagingController, app_id, body, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BandwidthMessaging.Configuration.basicAuthUserName = "mrice";
                BandwidthMessaging.Configuration.basicAuthPassword = "bandwidthV0itr3ss14";
                messagingController = BandwidthMessaging.APIController;
                app_id = process.env.BANDWIDTH_APP_ID;
                body = new BandwidthMessaging.MessageRequest({
                    "applicationId": app_id,
                    "to": payload.to,
                    "from": payload.from,
                    "text": payload.messagetext,
                    "tag": "web hook outbound"
                });
                console.log(body);
                return [4 /*yield*/, messagingController.createMessage("5000040", body)["catch"](function (err) {
                        console.log("rejet");
                        console.log(err);
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var sendMessage = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var sendMessagePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sendMessagePromise = new Promise(function (resolve, reject) {
                    // console.log("sendsms2\n", payload);
                    client.Message.send({
                        from: payload.from,
                        to: payload.to,
                        text: payload.messagetext,
                        callbackUrl: "" + process.env.BANDWIDTH_MESSAGE_SERVER,
                        receiptRequested: 'all'
                    })
                        .then(function (message) {
                        resolve(JSON.stringify(message));
                    })["catch"](function (err) {
                        resolve(JSON.stringify(err));
                    });
                });
                return [4 /*yield*/, sendMessagePromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatecompany = function (company, accountid) {
    var accid = company.companyid;
    var _accountdbname = parseAccountToDatabaseName(accid);
    company.pvt_type = "company";
    console.log("\n  accountname ", _accountdbname);
    var accountDb = nano.use(_accountdbname);
    accountDb.insert(company, function (err, body) {
        if (err) {
            console.log("err ", err);
            return err;
            ;
        }
        else {
            console.log(" company updated succefully");
            return body;
        }
    });
    return true;
};
var getproperties = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var accountDbName, accountDb, contactsSelector, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            accountDbName = parseAccountToDatabaseName(companyid);
                            accountDb = nano.use(accountDbName);
                            contactsSelector = {
                                'selector': {
                                    '$and': [
                                        {
                                            'pvt_type': 'property',
                                            'enabled': true
                                        }
                                    ]
                                },
                                limit: 30000
                            };
                            _b = (_a = accountDb).find;
                            _c = [contactsSelector];
                            return [4 /*yield*/, function (err, result) {
                                    if (err) {
                                        try {
                                            reject(err);
                                        }
                                        catch (e) {
                                            console.error("Couldn't access the db in /properties");
                                            reject(err);
                                            ;
                                        }
                                    }
                                    else {
                                        // console.log("\n\n\n properties added 11111111\n", result);
                                        resolve((result));
                                    }
                                }];
                        case 1:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
var updateNOtifySchedule = function (propertyid, didnumber) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, property, companydbname, companydb, company, schedule, userIds, _a, userdocs, ntresult, escalationList, callflowsoptiontype, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accountDb = nano.use(parseAccountToDatabaseName(propertyid));
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _b.sent();
                companydbname = parseAccountToDatabaseName(property.companyid);
                companydb = nano.use(companydbname);
                return [4 /*yield*/, getcompanyInfo(property.companyid)];
            case 2:
                company = _b.sent();
                return [4 /*yield*/, findSchedule(accountDb, false, didnumber, property, company)];
            case 3:
                schedule = _b.sent();
                if (!schedule) return [3 /*break*/, 5];
                return [4 /*yield*/, findDayScheduleUsers(accountDb, schedule, false, company, property)];
            case 4:
                _a = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = [];
                _b.label = 6;
            case 6:
                userIds = _a;
                if (!(userIds.length == 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, findAnyNotifyDayScheduleUsers(accountDb, didnumber, false, company, property)];
            case 7:
                userIds = _b.sent();
                _b.label = 8;
            case 8: return [4 /*yield*/, findDayScheduleuserlist(userIds, property)];
            case 9:
                userdocs = _b.sent();
                return [4 /*yield*/, generateNoticationreply(userIds, userdocs)];
            case 10:
                ntresult = _b.sent();
                return [4 /*yield*/, findNotifyEscalationSettings(property)];
            case 11:
                escalationList = _b.sent();
                if (schedule)
                    callflowsoptiontype = schedule.callflowsoptiontype;
                result = {
                    "didnumber": didnumber,
                    "propertyid": propertyid,
                    "type": "notify",
                    "label": callflowsoptiontype,
                    "data": {
                        "escalation": escalationList,
                        "notify": ntresult
                    }
                };
                insertNotifySchedule(result);
                return [2 /*return*/, result];
        }
    });
}); };
var getNOtifySchedule = function (propertyid, didnumber) { return __awaiter(_this, void 0, void 0, function () {
    var prpertydbname, propertydb, contactsSelector, current_schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prpertydbname = parseAccountToDatabaseName(propertyid);
                propertydb = nano.use(prpertydbname);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "notify",
                        "didnumber": didnumber
                    },
                    limit: 30000
                };
                console.log(JSON.stringify(contactsSelector));
                return [4 /*yield*/, getdocumentbyproperty(propertydb, contactsSelector)];
            case 1:
                current_schedule = _a.sent();
                return [2 /*return*/, current_schedule];
        }
    });
}); };
var insertNotifySchedule = function (schedule) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var propertyid, prpertydbname, propertydb, stored_schedule, insertNotifySchedulePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                propertyid = schedule.propertyid;
                schedule.pvt_type = "notify";
                prpertydbname = parseAccountToDatabaseName(propertyid);
                propertydb = nano.use(prpertydbname);
                return [4 /*yield*/, getNOtifySchedule(schedule.propertyid, schedule.didnumber)];
            case 1:
                stored_schedule = _a.sent();
                if (stored_schedule && stored_schedule._id) {
                    schedule._id = stored_schedule._id;
                    schedule._rev = stored_schedule._rev;
                }
                insertNotifySchedulePromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        propertydb.insert(schedule, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" schedule inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, insertNotifySchedulePromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertproperty = function (property, accountid, req) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountdbname, dbnames, propertydbname, isPropertyDbAvailable, creation_result, accountid_1, result_1, accountDb, stored_property, propertyInsertPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountdbname = parseAccountToDatabaseName(accountid);
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                propertydbname = parseAccountToDatabaseName(property.propertyid);
                isPropertyDbAvailable = dbnames.find(function (d) { return d === propertydbname; });
                if (!!isPropertyDbAvailable) return [3 /*break*/, 5];
                return [4 /*yield*/, createaccountdb(propertydbname)];
            case 2:
                creation_result = _a.sent();
                createindexes(propertydbname);
                accountid_1 = property.propertyid;
                return [4 /*yield*/, deletekazoostorage(req, accountid_1)];
            case 3:
                _a.sent();
                return [4 /*yield*/, creteKazooStorageAttachments(req, accountid_1)];
            case 4:
                result_1 = _a.sent();
                _a.label = 5;
            case 5:
                property.pvt_type = "property";
                property.enabled = true;
                accountDb = nano.use(accountdbname);
                return [4 /*yield*/, getpropertyInfo(property.propertyid, accountDb)];
            case 6:
                stored_property = _a.sent();
                if (stored_property && stored_property._id && stored_property._rev) {
                    property._id = stored_property._id;
                    property._rev = stored_property._rev;
                }
                propertyInsertPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        accountDb.insert(property, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" property inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, propertyInsertPromise];
            case 7:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var removeEmailFromEscalationList = function (propertyid, emailids) { return __awaiter(_this, void 0, void 0, function () {
    var accountdbname, accountDb, contactsSelector, escalationemailobjlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountdbname = parseAccountToDatabaseName(propertyid);
                accountDb = nano.use(accountdbname);
                console.log("removeEmailFromEscalationList");
                contactsSelector = {
                    'selector': {
                        "pvt_type": "escalationemaillist"
                    }
                };
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, contactsSelector)];
            case 1:
                escalationemailobjlist = _a.sent();
                escalationemailobjlist.forEach(function (escalationemailobj) {
                    var emaillist = escalationemailobj.emaillist;
                    emaillist = emaillist.filter(function (e) { return !emailids.find(function (e1) { return e1.email === e.email; }); });
                    escalationemailobj.emaillist = emaillist;
                    updateescalationemaillist(accountDb, escalationemailobj);
                });
                return [2 /*return*/];
        }
    });
}); };
var updateescalationemaillist = function (accountDb, escalationemailobj) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var updateescalationemaillistpropmise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateescalationemaillistpropmise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        accountDb.insert(escalationemailobj, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" escalationemailobj update succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, updateescalationemaillistpropmise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertescalationemaillist = function (payload, callflowoption, userid) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountdbname, accountDb, contactsSelector, escalationemailobj, emaillist, emailobj, escalationemailPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountdbname = parseAccountToDatabaseName(payload.propertyid);
                accountDb = nano.use(accountdbname);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "escalationemaillist",
                        "callflowoption": callflowoption
                    }
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                escalationemailobj = _a.sent();
                emaillist = [];
                if (escalationemailobj) {
                    emaillist = escalationemailobj.emaillist;
                }
                else {
                    escalationemailobj = {
                        "pvt_type": "escalationemaillist",
                        "callflowoption": callflowoption
                    };
                }
                //       console.log ("emaillist1111 ",emaillist)
                if (!emaillist)
                    emaillist = [];
                //     console.log ("emaillist 2222 ",emaillist)
                if (payload.checked && payload.email) {
                    emailobj = { email: payload.email,
                        userid: userid };
                    emaillist.push(emailobj);
                }
                else if (!payload.checked && payload.email) {
                    emaillist = emaillist.filter(function (e) { return e.email != payload.email || e.userid != userid; });
                }
                escalationemailobj.emaillist = emaillist;
                escalationemailPromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        accountDb.insert(escalationemailobj, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log(" escalationemailobj inserted succefully");
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, escalationemailPromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertschedule = function (schedule, accountdbname) {
    schedule.pvt_type = "schedule";
    schedule.enabled = true;
    var accountDb = nano.use(accountdbname);
    accountDb.insert(schedule, function (err, body) {
        if (err) {
            console.log("err ", err);
            return err;
            ;
        }
        else {
            console.log(" schedule inserted succefully");
            return body;
        }
    });
};
var insertadjustschedule = function (schedule, accountdbname) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, contactsSelector, stored_schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schedule.pvt_type = "adjustschedule";
                schedule.enabled = true;
                accountDb = nano.use(accountdbname);
                if (!schedule._id) return [3 /*break*/, 2];
                contactsSelector = {
                    'selector': {
                        enabled: true,
                        "pvt_type": "adjustschedule",
                        "_id": schedule._id
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                stored_schedule = _a.sent();
                if (stored_schedule && stored_schedule._id) {
                    schedule._rev = stored_schedule._rev;
                }
                _a.label = 2;
            case 2:
                accountDb.insert(schedule, function (err, body) {
                    if (err) {
                        console.log("err ", err);
                        return err;
                        ;
                    }
                    else {
                        console.log(" adjsut schedule inserted succefully");
                        return body;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var getdocumentrev = function (accountDb, documentid) { return __awaiter(_this, void 0, void 0, function () {
    var documentrevPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n documentid ", documentid);
                if ((documentid === 'undefined' && documentid === undefined) && documentid.length === 0)
                    return [2 /*return*/, ''];
                documentrevPromise = new Promise(function (resolve, reject) {
                    // console.log(currentUserSelector);
                    accountDb.get(documentid, function (err, document) {
                        if (err) {
                            console.log("err ", err);
                            resolve('');
                            ;
                        }
                        else {
                            console.log("got document rev ", document._rev);
                            var rev = document._rev ? document._rev : '';
                            resolve(rev);
                        }
                    });
                });
                return [4 /*yield*/, documentrevPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var removeEmailAddressFromVoiceMaiilBox = function (req, property, removedEmails) {
    var callflowdata = property.callflowdata.filter(function (cl) { return cl.callflowoptiontype === "FWD Message" && cl.deviceid; });
    var propertyid = property.propertyid;
    if (callflowdata) {
        callflowdata.forEach(function (cl) { return __awaiter(_this, void 0, void 0, function () {
            var vmbox, emaillist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getVoiceMailBoxForId(req, propertyid, cl.deviceid)];
                    case 1:
                        vmbox = _a.sent();
                        emaillist = vmbox.data.notify_email_addresses;
                        console.log(removedEmails);
                        console.log(emaillist);
                        if (!emaillist) return [3 /*break*/, 3];
                        emaillist = emaillist.filter(function (e) { return !removedEmails.find(function (e1) { return e1.email === e; }); });
                        vmbox.data.notify_email_addresses = emaillist;
                        console.log(emaillist);
                        return [4 /*yield*/, updateVoiceMailBoxForId(req, propertyid, cl.deviceid, vmbox)];
                    case 2:
                        vmbox = _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
};
var updatefwdmessagevoicemaileemailsettings = function (req, payload) { return __awaiter(_this, void 0, void 0, function () {
    var vmbox, emaillist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getVoiceMailBoxForId(req, payload.propertyid, payload.callflowdata.deviceid)];
            case 1:
                vmbox = _a.sent();
                emaillist = vmbox.data.notify_email_addresses;
                if (!emaillist)
                    emaillist = [];
                if (payload.checked && payload.email) {
                    emaillist.push(payload.email);
                }
                else if (!payload.checked && payload.email) {
                    emaillist = emaillist.filter(function (e) { return e != payload.email; });
                }
                vmbox.data.notify_email_addresses = emaillist;
                return [4 /*yield*/, updateVoiceMailBoxForId(req, payload.propertyid, payload.callflowdata.deviceid, vmbox)];
            case 2:
                vmbox = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getVoiceMailBoxForId = function (req, accountId, vid) { return __awaiter(_this, void 0, void 0, function () {
    var kazooupdatepromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kazooupdatepromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/vmboxes/" + vid, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(e);
                        }
                        else {
                            resolve(JSON.parse(b));
                        }
                    });
                });
                return [4 /*yield*/, kazooupdatepromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var deleteVoiceMessages = function (accountId, vmbox_id) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, kazooupdatepromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                kazooupdatepromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(null, apiKey)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/vmboxes/" + vmbox_id + "/messages", function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(e);
                        }
                        else {
                            var messages = JSON.parse(b);
                            if (messages && messages.data && messages.data.length > 50) {
                                var oldest_message = messages.data[messages.data.length - 1];
                                var mesageid = oldest_message.media_id;
                                var kRequest_1 = getKazooRequest(null, apiKey)
                                    .del(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/vmboxes/" + vmbox_id + "/messages/" + mesageid, function (err, response, body) {
                                    console.log(body);
                                });
                            }
                            resolve(JSON.parse(b));
                        }
                    });
                });
                return [4 /*yield*/, kazooupdatepromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updateVoiceMailBoxForId = function (req, accountId, vid, vbox) { return __awaiter(_this, void 0, void 0, function () {
    var kazooupdatepromiss, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kazooupdatepromiss = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req)
                        .post({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/vmboxes/" + vid,
                        body: vbox,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(e);
                        }
                        else {
                            //  console.log("\nvoice mail box updated succesfully", b);
                            resolve(b);
                        }
                    });
                });
                return [4 /*yield*/, kazooupdatepromiss];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getdocumentbyproperty = function (accountDb, contactsSelector) { return __awaiter(_this, void 0, void 0, function () {
    var documentPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                documentPromise = new Promise(function (resolve, reject) {
                    accountDb.find(contactsSelector, function (err, result) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            var document;
                            if (result.docs.length > 0) {
                                document = result.docs[result.docs.length - 1];
                            }
                            //console.log("got document  " ,rev);
                            resolve(document);
                        }
                    });
                });
                return [4 /*yield*/, documentPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getalldocumentsbyproperty = function (accountDb, contactsSelector) { return __awaiter(_this, void 0, void 0, function () {
    var documentPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                documentPromise = new Promise(function (resolve, reject) {
                    accountDb.find(contactsSelector, function (err, result) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            var documents = [];
                            if (result.docs.length > 0) {
                                documents = result.docs;
                            }
                            //   console.log("got document  " ,result);
                            resolve(documents);
                        }
                    });
                });
                return [4 /*yield*/, documentPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatekazoousersettings = function (payload, req, companyid, id) { return __awaiter(_this, void 0, void 0, function () {
    var livereplysetting, notificationrulessetting, handoffrulessettings, escalationsettings, smsagreement, userdata, kazooupdatepromiss, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                livereplysetting = payload.livereplysetting === 'undefined' ? [] : payload.livereplysetting;
                notificationrulessetting = payload.notificationrulessetting === 'undefined' ? [] : payload.notificationrulessetting;
                handoffrulessettings = payload.handoffrulessettings === 'undefined' ? [] : payload.handoffrulessettings;
                escalationsettings = payload.escalationsettings === 'undefined' ? [] : payload.escalationsettings;
                smsagreement = payload.smsagreement;
                userdata = { data: {
                        title: payload.title,
                        timezone: payload.timezone,
                        phonesettings: payload.phonesettings,
                        smssettings: payload.smssettings,
                        emailsettings: payload.emailsettings,
                        pin: payload.pin,
                        livereplysetting: livereplysetting,
                        notificationrulessetting: notificationrulessetting,
                        handoffrulessettings: handoffrulessettings,
                        escalationsettings: escalationsettings,
                        smsagreement: smsagreement
                    } };
                kazooupdatepromiss = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req)
                        .patch({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + companyid + "/users/" + id,
                        body: userdata,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(e);
                        }
                        else {
                            console.log("\n kazoo updated successfull");
                            resolve(payload);
                        }
                    });
                });
                return [4 /*yield*/, kazooupdatepromiss];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatekazoouseremailsettings = function (payload, req, companyid, id) { return __awaiter(_this, void 0, void 0, function () {
    var userdata, kazooupdatepromiss, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userdata = { data: {
                        emailsettings: payload.emailsettings
                    } };
                kazooupdatepromiss = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req)
                        .patch({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + companyid + "/users/" + id,
                        body: userdata,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(e);
                        }
                        else {
                            console.log("\n kazoo updated email setting successfull");
                            resolve(payload);
                        }
                    });
                });
                return [4 /*yield*/, kazooupdatepromiss];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updateScheduleReport = function (accountDb, _userobj) { return __awaiter(_this, void 0, void 0, function () {
    var updateScheduleReportPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateScheduleReportPromise = new Promise(function (resolve, reject) {
                    // console.log("sendsms2\n", payload);
                    accountDb.insert(_userobj, function (err, result) {
                        if (err) {
                            console.log("err notifie user settingd ", err);
                            resolve(err);
                            ;
                            console.log(JSON.stringify(_userobj));
                        }
                        else {
                            console.log("suceess notifie user settingd ", result);
                            resolve(result);
                        }
                    });
                });
                return [4 /*yield*/, updateScheduleReportPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var check_user_log = function (_userobj, temp_user) {
    if (_userobj.pin != temp_user.pin) {
        console.log("update pin");
    }
};
var updatenotifyusersettings = function (accountDb, _userobj, payload, sendsms, property, req) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var temp_user, updatesettingspromise, response, messagetext_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                temp_user = JSON.parse(JSON.stringify(_userobj));
                updatesettingspromise = new Promise(function (resolve, reject) {
                    _userobj.timezone = payload.timezone;
                    _userobj.phonesettings = payload.phonesettings;
                    _userobj.title = payload.title;
                    _userobj.smssettings = payload.smssettings;
                    var deletedemailids = _userobj.emailsettings.settings.filter(function (_em) { return !payload.emailsettings.settings.find(function (pem) { return pem.email === _em.email; }); });
                    _userobj.emailsettings = payload.emailsettings;
                    _userobj.pin = payload.pin;
                    _userobj.livereplysetting = payload.livereplysetting;
                    _userobj.notificationrulessetting = payload.notificationrulessetting;
                    _userobj.handoffrulessettings = payload.handoffrulessettings;
                    _userobj.handoffrulessettings = payload.handoffrulessettings;
                    _userobj.escalationsettings = payload.escalationsettings;
                    _userobj.user_imager = payload.user_imager;
                    _userobj.member_image = payload.member_image;
                    _userobj.smsagreement = payload.smsagreement;
                    accountDb.insert(_userobj, function (err, result) {
                        if (err) {
                            console.log("err notifie user settingd ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            check_user_log(_userobj, temp_user);
                            if (deletedemailids && deletedemailids.length > 0) {
                                var propertyid = property ? property.propertyid : undefined;
                                removeEmailFromEscalationList(propertyid, deletedemailids);
                                removeEmailAddressFromVoiceMaiilBox(req, property, deletedemailids);
                            }
                            console.log("suceess notifie user settingd ", result);
                            resolve(result);
                        }
                    });
                });
                return [4 /*yield*/, updatesettingspromise];
            case 1:
                response = _a.sent();
                if (sendsms) {
                    messagetext_1 = "Please reply Y or YES to confirm you want to receive SMS messages from HelloSpoke Notify. Once subscribed, text STOP at any time to unsubscribe.";
                    payload.smssettings.settings.forEach(function (s) { return __awaiter(_this, void 0, void 0, function () {
                        var messaging_number;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!!s.optin) return [3 /*break*/, 2];
                                    messaging_number = process.env.MESSAGINGNUMBER;
                                    return [4 /*yield*/, sendOptinMessage(s.number, messaging_number, messagetext_1)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, response];
        }
    });
}); };
var sendOptinMessage = function (tonumber, fromnumber, messagetext) { return __awaiter(_this, void 0, void 0, function () {
    var payload, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (fromnumber.indexOf("+1") != 0)
                    fromnumber = "+1" + fromnumber;
                if (tonumber.indexOf("+1") != 0)
                    tonumber = "+1" + tonumber;
                payload = {
                    "to": [tonumber],
                    "from": fromnumber,
                    "messagetext": messagetext
                };
                return [4 /*yield*/, sendNotifySMS(payload)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
var createindexes = function (_accountdbname) { return __awaiter(_this, void 0, void 0, function () {
    var index_creation_result1, index_creation_result2, index_creation_result3, index_creation_result4, index_creation_result5, index_creation_result6, index_creation_result7, index_creation_result8, index_creation_result9, index_creation_result10, index_creation_result11, index_creation_result12, index_creation_result13, index_creation_result14, index_creation_result15, index_creation_result16, index_creation_result17, index_creation_result18, index_creation_result181, index_creation_result19, index_creation_result20, index_creation_result21, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 23, , 24]);
                return [4 /*yield*/, createindex(_accountdbname, ["datetime"], "datetime")];
            case 1:
                index_creation_result1 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["incidentdate"], "incidentdate_index")];
            case 2:
                index_creation_result2 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["_id"], "_id")];
            case 3:
                index_creation_result3 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "callflowsoptiontype", "enabled"], "pvt_type_callflowsoptiontype_enabled")];
            case 4:
                index_creation_result4 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "callflowsoptiontype"], "pvt_type_callflowsoptiontype")];
            case 5:
                index_creation_result5 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "callflowsoptiontype", "scheduleid", "datetime"], "pvt_type_callflowsoptiontype_scheduleid")];
            case 6:
                index_creation_result6 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "initialcallrecord", "callernumber"], "initialcallrecord_callernumber")];
            case 7:
                index_creation_result7 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "companyid", "enabled"], "pvt_type_companyid_enabled")];
            case 8:
                index_creation_result8 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "propertyid", "enabled"], "pvt_type_propertyid_enabled")];
            case 9:
                index_creation_result9 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "guid"], "pvt_type_guid")];
            case 10:
                index_creation_result10 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["email"], "email")];
            case 11:
                index_creation_result11 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "enabled"], "pvt_type_enabled")];
            case 12:
                index_creation_result12 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "incidentid", "enabled"], "pvt_type_incidentid_enabled")];
            case 13:
                index_creation_result13 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type"], "pvt_type")];
            case 14:
                index_creation_result14 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["notifytimestamp"], "notifytimestamp")];
            case 15:
                index_creation_result15 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "id"], "pvt_type_id")];
            case 16:
                index_creation_result16 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "notify_enabled", "pin"], "pvt_type_notify_enabled_pin")];
            case 17:
                index_creation_result17 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "type", "guid"], "pvt_type_type_guid")];
            case 18:
                index_creation_result18 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "elasticid"], "pvt_type_elasticid")];
            case 19:
                index_creation_result181 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["escalationsettings", "notify_enabled"], "escalationsettings_notify_enabled")];
            case 20:
                index_creation_result19 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "didnumber"], "pvttypedidnumber")];
            case 21:
                index_creation_result20 = _a.sent();
                return [4 /*yield*/, createindex(_accountdbname, ["pvt_type", "adjustdate_unix"], "pvt_typeadjustdate_unix-index")];
            case 22:
                index_creation_result21 = _a.sent();
                return [3 /*break*/, 24];
            case 23:
                ex_1 = _a.sent();
                console.log(ex_1);
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); };
var createindex = function (dbname, fields, name) { return __awaiter(_this, void 0, void 0, function () {
    var indexDef, hellospoke_db, nano1, db, creatindexpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("fields ", fields);
                indexDef = {
                    index: { fields: fields },
                    name: name
                };
                hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
                nano1 = require('nano')(hellospoke_db);
                db = nano1.use(dbname);
                creatindexpromise = new Promise(function (resolve, reject) {
                    var indexDef = {
                        index: { fields: fields },
                        name: name
                    };
                    db.createIndex(indexDef, function (err, body) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("index created ", body);
                            resolve(body);
                        }
                    });
                });
                return [4 /*yield*/, creatindexpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertdayschedule = function (schedule, accountdbname) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, stored_schedule, insertdayschedulePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schedule.pvt_type = "dayschedule";
                schedule.enabled = true;
                accountDb = nano.use(accountdbname);
                return [4 /*yield*/, getdayscheduleInfo(accountDb, schedule)];
            case 1:
                stored_schedule = _a.sent();
                if (stored_schedule && stored_schedule._id) {
                    schedule._rev = stored_schedule._rev;
                    schedule._id = stored_schedule._id;
                }
                insertdayschedulePromise = new Promise(function (resolve, reject) {
                    // console.log(currentUserSelector);
                    accountDb.insert(schedule, function (err, body) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("day schedule inserted succefully ", body);
                            resolve(body);
                        }
                    });
                });
                return [4 /*yield*/, insertdayschedulePromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatenotifyusercolorindex = function (accountDb, _userobj) { return __awaiter(_this, void 0, void 0, function () {
    var updatesettingspromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updatesettingspromise = new Promise(function (resolve, reject) {
                    accountDb.insert(_userobj, function (err, result) {
                        if (err) {
                            console.log("err notifie user colorindex settingd ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("suceess notifie colorindex settingd ", err);
                            resolve(result);
                        }
                    });
                });
                return [4 /*yield*/, updatesettingspromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatenotifyuseremailsettings = function (accountDb, _userobj, payload) { return __awaiter(_this, void 0, void 0, function () {
    var updatesettingspromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updatesettingspromise = new Promise(function (resolve, reject) {
                    _userobj.emailsettings = payload.emailsettings;
                    accountDb.insert(_userobj, function (err, result) {
                        if (err) {
                            console.log("err notifie user email settingd ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("suceess notifie user email settingd ", result);
                            resolve(result);
                        }
                    });
                });
                return [4 /*yield*/, updatesettingspromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertescalationuserlist = function (schedule, accountdbname) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, contactsSelector, stored_list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schedule.pvt_type = "escalationuserlist";
                schedule.enabled = true;
                accountDb = nano.use(accountdbname);
                contactsSelector = {
                    "selector": {
                        "pvt_type": "escalationuserlist"
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                stored_list = _a.sent();
                console.log("escalationuserlist");
                if (stored_list && stored_list._id && stored_list._rev) {
                    schedule._id = stored_list._id;
                    schedule._rev = stored_list._rev;
                }
                accountDb.insert(schedule, function (err, body) {
                    if (err) {
                        console.log("err ", err);
                        return err;
                        ;
                    }
                    else {
                        console.log("escalation user list inserted succefully");
                        return body;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var insertcallactivityreportinfo = function (callactivityinfo, accountdb) { return __awaiter(_this, void 0, void 0, function () {
    var callactivityinfoinsertpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callactivityinfo.pvt_type = "callactivityreport";
                callactivityinfoinsertpromise = new Promise(function (resolve, reject) {
                    accountdb.insert(callactivityinfo, function (err, body) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("call activity report info inserted succefully");
                            resolve(body);
                        }
                    });
                });
                return [4 /*yield*/, callactivityinfoinsertpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var formatPhoneNumber = function (phoneNumber) {
    if (!phoneNumber) {
        return null;
    }
    if (typeof phoneNumber === 'number') {
        phoneNumber = phoneNumber.toString();
    }
    phoneNumber = phoneNumber.replace(/\(/g, '').replace(/\)/g, '')
        .replace(/ /g, '').replace(/-/g, '').replace(/\+/);
    var re = /(?:1)?(\d{3})(\d{3})(\d{4})/;
    var matches = phoneNumber.match(re);
    if (matches === null) {
        return phoneNumber;
    }
    return matches[1] + "-" + matches[2] + "-" + matches[3];
};
var getreportdatadocument = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var guid, contactsSelector, reportdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                guid = callinfo.incidentid ? callinfo.incidentid : callinfo.guid;
                contactsSelector = {
                    'selector': {
                        enabled: true,
                        "pvt_type": "reportdata",
                        "guid": guid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                reportdata = _a.sent();
                return [2 /*return*/, reportdata];
        }
    });
}); };
var insertDocument = function (accountDb, document) { return __awaiter(_this, void 0, void 0, function () {
    var documentPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                documentPromise = new Promise(function (resolve, reject) {
                    accountDb.insert(document, function (err, result) {
                        if (err) {
                            console.log("err ", err);
                            resolve(err);
                            ;
                        }
                        else {
                            console.log("document " + document.pvt_type + " inserted");
                            resolve(result);
                        }
                    });
                });
                return [4 /*yield*/, documentPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getcallinfologformessagerecording = function (accountDb, guid) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, callinfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    "selector": {
                        "enabled": true,
                        "pvt_type": "callinfolog",
                        "type": "messagerecordingstart",
                        "guid": guid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                callinfo = _a.sent();
                return [2 /*return*/, callinfo];
        }
    });
}); };
var getreportdatadocumentfrommessagid = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, reportdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    'selector': {
                        enabled: true,
                        "pvt_type": "reportdata",
                        "messageid": callinfo.messageid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                reportdata = _a.sent();
                return [2 /*return*/, reportdata];
        }
    });
}); };
var getreportdatadocumentfromvoicemailid = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, reportdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    'selector': {
                        enabled: true,
                        "pvt_type": "reportdata",
                        "voicemailid": callinfo.voicemailid
                    },
                    limit: 30000
                };
                console.log(JSON.stringify(contactsSelector));
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                reportdata = _a.sent();
                return [2 /*return*/, reportdata];
        }
    });
}); };
var getunresolvedreportdatadocuments = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, reports;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    "selector": {
                        "propertyid": callinfo.propertyid,
                        "enabled": true,
                        "pvt_type": "reportdata",
                        "messageid": {
                            "$exists": true
                        },
                        "filename": {
                            "$exists": false
                        },
                        "elasticid": {
                            "$exists": true
                        },
                        "resolved": false
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, contactsSelector)];
            case 1:
                reports = _a.sent();
                return [2 /*return*/, reports];
        }
    });
}); };
var parseagenaction = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, agentaction, messagetype, callinfodescription, callrecording, customernumber, straction, filename, generatereport, now_unix, savedstr, calldetailsinfo, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocumentfrommessagid(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                agentaction = callinfo.action;
                messagetype = callinfo.messagetype;
                callinfodescription = (callinfo.agentname ? callinfo.agentname : 'unknown') + " ";
                callrecording = false;
                customernumber = reportdata.fromd;
                straction = "";
                filename = "";
                generatereport = false;
                if (agentaction === "2") {
                    straction += "called back " + formatPhoneNumber(customernumber);
                    callrecording = true;
                    filename = "notify_call_" + callinfo.guid + "_" + callinfo.messageid;
                    generatereport = true;
                }
                else if (agentaction === "3") {
                    straction += "acknowledged message from " + formatPhoneNumber(customernumber);
                    generatereport = true;
                }
                else if (agentaction === "7") {
                    straction += "deleted this message";
                    generatereport = true;
                }
                if (!generatereport) return [3 /*break*/, 3];
                now_unix = callinfo.notifytimestamp;
                savedstr = messagetype === "old" ? "from saved message" : "";
                if (messagetype === "new" && straction.length > 0) {
                    reportdata.respondent = callinfo.agentname;
                    reportdata.respondentphone = callinfo.agentphonenumber;
                    reportdata.respondentat = now_unix;
                    reportdata.responsetime = now_unix - reportdata.incidentdate;
                    reportdata.resolved = true;
                    reportdata.filename = filename;
                }
                callinfodescription += straction + " " + savedstr;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": callrecording
                };
                if (filename.length > 0) {
                    calldetailsinfo.filename = filename;
                }
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting agent action report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                fields = {
                    calldetailsinfolist: reportdata.calldetailsinfolist,
                    respondent: reportdata.respondent,
                    respondentphone: reportdata.respondentphone,
                    respondentat: reportdata.respondentat,
                    responsetime: reportdata.responsetime,
                    resolved: reportdata.resolved,
                    filename: reportdata.filename
                };
                updatereportdatatoelastic(accountDb, reportdata, fields);
                _a.label = 3;
            case 3: return [2 /*return*/, reportdata];
        }
    });
}); };
var parsemessagerecordingend = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, customernumber, callinfodescription, now_unix, calldetailsinfo, ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 6]);
                customernumber = reportdata.fromd;
                callinfodescription = "Message received from " + formatPhoneNumber(customernumber) + " ";
                now_unix = callinfo.notifytimestamp;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": true,
                    "filename": callinfo.messageid,
                    "voicemessage": true,
                    "messageurl": callinfo.url
                };
                reportdata.calldetailsinfolist = reportdata.calldetailsinfolist.filter(function (rd) { return !rd.messageurl; });
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                reportdata.messageid = callinfo.messageid;
                reportdata.messageurl = callinfo.url;
                console.log("inserting messagerecordingen report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 3:
                _a.sent();
                setTimeout(function () {
                    sendEscalationEmails(reportdata);
                }, 70000);
                return [2 /*return*/, reportdata];
            case 4:
                ex_2 = _a.sent();
                debugMessage("error droping report");
                debugMessage(ex_2);
                return [4 /*yield*/, parsemessagerecordingend(accountDb, callinfo)];
            case 5: return [2 /*return*/, _a.sent()];
            case 6: return [2 /*return*/];
        }
    });
}); };
var parseVoiceMessage = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, now_unix, type, description, calldetailsinfo, callinfodescription, calldetailsinfo_callend, calldetailsinfolist, fields, ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 6]);
                now_unix = callinfo.notifytimestamp;
                type = reportdata ? reportdata.type : "";
                if (type === "Emergency") {
                    description = "Caller selected General ";
                    calldetailsinfo = {
                        "time": now_unix,
                        "discription": description,
                        "callrecording": false
                    };
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                    reportdata.type = "General";
                }
                reportdata.voicemailid = callinfo.voicemail_id;
                callinfodescription = "Call disconnected ";
                calldetailsinfo_callend = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false,
                    "calldiscconected": true
                };
                reportdata.calldetailsinfolist.push(calldetailsinfo_callend);
                console.log("inserting voice message to report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 3:
                _a.sent();
                calldetailsinfolist = reportdata.calldetailsinfolist;
                fields = {
                    calldetailsinfolist: reportdata.calldetailsinfolist,
                    type: reportdata.type
                };
                updatereportdatatoelastic(accountDb, reportdata, fields);
                return [2 /*return*/, reportdata];
            case 4:
                ex_3 = _a.sent();
                callinfo.reporterror = true;
                return [4 /*yield*/, insertDocument(accountDb, callinfo)];
            case 5:
                _a.sent();
                throw ex_3;
            case 6: return [2 /*return*/];
        }
    });
}); };
var parseS3Notifcation = function (callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var key, keyparts, keyparts_account, account, propertydbname, propertyid, property, companyid, companydbname, accountDb, keyparts_voicemailid, voicemailid, reportdata, calldetailsinfolist, customernumber, callinfodescription, now_unix, calldetailsinfo, call_desconnected_index, call_desconnected_record, fields, ex_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                console.log("s3Onje3ct");
                console.log(callinfo);
                key = callinfo.key;
                if (!key) return [3 /*break*/, 5];
                keyparts = key.split("/");
                if (!(keyparts.length > 1)) return [3 /*break*/, 5];
                keyparts_account = keyparts[0];
                account = keyparts_account.split("-")[0];
                propertydbname = account.split("%252F").join("/");
                propertyid = parseDatabaseNameToAccount(propertydbname);
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                companyid = property.companyid;
                companydbname = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(companydbname);
                callinfo.pvt_type = "s3voicemail";
                return [4 /*yield*/, insertDocument(accountDb, callinfo)];
            case 2:
                _a.sent();
                keyparts_voicemailid = keyparts[1];
                voicemailid = keyparts_voicemailid.split("_")[0];
                callinfo.voicemailid = voicemailid;
                return [4 /*yield*/, getreportdatadocumentfromvoicemailid(accountDb, callinfo)];
            case 3:
                reportdata = _a.sent();
                if (!(reportdata && reportdata.voicemailid)) return [3 /*break*/, 5];
                calldetailsinfolist = reportdata.calldetailsinfolist;
                customernumber = reportdata.fromd;
                callinfodescription = "Message received from " + formatPhoneNumber(customernumber) + " ";
                now_unix = moment().utc().unix();
                ;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": true,
                    "voicemailid": reportdata.voicemailid,
                    "voicemessage": false,
                    "voicemailkey": callinfo.key
                };
                call_desconnected_index = calldetailsinfolist.findIndex(function (c) { return c.calldiscconected; });
                if (call_desconnected_index >= 0) {
                    call_desconnected_record = calldetailsinfolist[call_desconnected_index];
                    call_desconnected_record.now = now_unix;
                    calldetailsinfolist.splice(call_desconnected_index, 0, calldetailsinfo);
                }
                else {
                    calldetailsinfolist.push(calldetailsinfo);
                }
                reportdata.calldetailsinfolist = calldetailsinfolist;
                reportdata.messageid = callinfo.key;
                reportdata.voicemailkey = callinfo.key;
                reportdata.resolved = true;
                console.log("inserting s3 message to report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 4:
                _a.sent();
                fields = {
                    calldetailsinfolist: reportdata.calldetailsinfolist,
                    messageid: callinfo.key,
                    voicemailkey: callinfo.key,
                    resolved: true
                };
                updatereportdatatoelastic(accountDb, reportdata, fields);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                ex_4 = _a.sent();
                debugMessage("during s3 message parsing", "error");
                debugMessage(ex_4, "error info");
                debugMessage(callinfo, "info");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var parsecallrecording = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, ex_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                reportdata.filename = callinfo.filename;
                console.log("inserting call recording file ");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                ex_5 = _a.sent();
                throw ex_5;
            case 5: return [2 /*return*/, reportdata];
        }
    });
}); };
var parseagentpin = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, callinfodescription, result, now_unix, calldetailsinfo, customernumber, filename, when, ex_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(callinfo.when && callinfo.when.toLowerCase() === "live")) return [3 /*break*/, 3];
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                callinfodescription = callinfo.agentname + " ";
                result = callinfo.result ? callinfo.result.toLowerCase() : "";
                now_unix = callinfo.notifytimestamp;
                if (result === "valid") {
                    callinfodescription += 'entered PIN';
                    calldetailsinfo = {
                        "time": now_unix,
                        "discription": callinfodescription,
                        "callrecording": false
                    };
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                    reportdata.callstarttime = now_unix;
                    customernumber = reportdata.fromd;
                    callinfodescription = callinfo.agentname + " connected to " + formatPhoneNumber(customernumber);
                    filename = "live_call_" + reportdata.guid + ".wav";
                    calldetailsinfo = {
                        "time": now_unix,
                        "discription": callinfodescription,
                        "callrecording": true,
                        "filename": filename,
                        "voicemessage": false
                    };
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                    when = "LIVE";
                    reportdata.resolutionon = when;
                    reportdata.respondent = callinfo.agentname;
                    reportdata.respondentphone = callinfo.agentid;
                    reportdata.respondentat = now_unix;
                    reportdata.responsetime = now_unix - reportdata.incidentdate;
                    reportdata.filename = filename;
                    reportdata.resolved = true;
                }
                else {
                    callinfodescription += "entered invalid pin";
                }
                console.log("inserting agent respose pin ");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                return [2 /*return*/, reportdata];
            case 3: return [3 /*break*/, 5];
            case 4:
                ex_6 = _a.sent();
                throw ex_6;
            case 5: return [2 /*return*/];
        }
    });
}); };
var parsecallend = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, callinfodescription, now_unix, calldetailsinfo, ex_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(callinfo.when === "live" && callinfo.reason && callinfo.reason === "NORMAL_CLEARING")) return [3 /*break*/, 3];
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                if (!(reportdata && !reportdata.calldisconnected)) return [3 /*break*/, 3];
                callinfodescription = "Call disconnected ";
                now_unix = callinfo.notifytimestamp ? callinfo.notifytimestamp : moment().utc().unix();
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false,
                    "callduration": now_unix - reportdata.respondentat
                };
                reportdata.callduration = now_unix - reportdata.respondentat;
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                reportdata.calldisconnected = true;
                reportdata.callendtime = now_unix;
                console.log("inserting end ");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                return [2 /*return*/, reportdata];
            case 3: return [2 /*return*/, reportdata];
            case 4:
                ex_7 = _a.sent();
                throw ex_7;
            case 5: return [2 /*return*/];
        }
    });
}); };
var parseagentcallend = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, callinfodescription, now_unix, calldetailsinfo, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocumentfrommessagid(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                callinfodescription = "Call disconnected ";
                now_unix = callinfo.notifytimestamp;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false,
                    "callduration": now_unix - reportdata.respondentat
                };
                if (!reportdata.callduration) {
                    reportdata.callduration = now_unix - reportdata.respondentat;
                }
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting agen call end ");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                fields = {
                    calldetailsinfolist: reportdata.calldetailsinfolist
                };
                updatereportdatatoelastic(accountDb, reportdata, fields);
                return [2 /*return*/, reportdata];
        }
    });
}); };
var parseagentrespnse = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var result, reportdata, callinfodescription, result, now_unix, calldetailsinfo, ex_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                callinfodescription = callinfo.agentname + " ";
                result = callinfo.result ? callinfo.result.toLowerCase() : "";
                now_unix = callinfo.notifytimestamp;
                if (result === "accepted") {
                    callinfodescription += "accepted";
                }
                else if (result === 'rejected') {
                    callinfodescription += "rejected";
                }
                else if (result === 'userbusy') {
                    callinfodescription += "on other call";
                }
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false
                };
                //reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting agent respose accepted report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                result = reportdata;
                return [2 /*return*/, result];
            case 3:
                ex_8 = _a.sent();
                throw ex_8;
            case 4: return [2 /*return*/];
        }
    });
}); };
var updatenotelength = function (callinfo, noteslength, propertyid) { return __awaiter(_this, void 0, void 0, function () {
    var property, companydbname, companydb, reportdata, result, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                companydbname = parseAccountToDatabaseName(property.companyid);
                companydb = nano.use(companydbname);
                return [4 /*yield*/, getreportdatadocument(companydb, callinfo)];
            case 2:
                reportdata = _a.sent();
                reportdata.notes = noteslength;
                console.log("inserting notes length");
                return [4 /*yield*/, insertreportdata(reportdata, companydb)];
            case 3:
                result = _a.sent();
                fields = {
                    notes: reportdata.notes
                };
                updatereportdatatoelastic(companydb, reportdata, fields);
                return [2 /*return*/, result];
        }
    });
}); };
var parseruleexecution = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var formatedphone, callinfodescription, now_unix, calldetailsinfo, reportdata, reportlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                formatedphone = formatPhoneNumber(callinfo.agentphonenumber);
                callinfodescription = "SMS sent to " + (callinfo.agentname ? callinfo.agentname : 'unknown') + " ";
                now_unix = callinfo.notifytimestamp;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false
                };
                if (!(callinfo.when.toLowerCase() === "live")) return [3 /*break*/, 3];
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting ruleexecution sms report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, getunresolvedreportdatadocuments(accountDb, callinfo)];
            case 4:
                reportlist = _a.sent();
                reportlist.forEach(function (report) { return __awaiter(_this, void 0, void 0, function () {
                    var fields;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!report.calldetailsinfolist) return [3 /*break*/, 2];
                                report.calldetailsinfolist.push(calldetailsinfo);
                                console.log("inserting ruleexecution sms report");
                                return [4 /*yield*/, insertreportdata(report, accountDb)];
                            case 1:
                                _a.sent();
                                fields = {
                                    calldetailsinfolist: report.calldetailsinfolist
                                };
                                updatereportdatatoelastic(accountDb, report, fields);
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
                _a.label = 5;
            case 5: return [2 /*return*/, reportdata];
        }
    });
}); };
var parseagentpinfornotify = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var now_unix, reportlist, i, report, callinfodescription, result, now_unix_1, calldetailsinfo, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now_unix = callinfo.notifytimestamp;
                return [4 /*yield*/, getunresolvedreportdatadocuments(accountDb, callinfo)];
            case 1:
                reportlist = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < reportlist.length)) return [3 /*break*/, 5];
                report = reportlist[i];
                callinfodescription = callinfo.agentname + " ";
                result = callinfo.result ? callinfo.result.toLowerCase() : "";
                now_unix_1 = callinfo.notifytimestamp;
                if (result === "valid") {
                    callinfodescription += 'entered PIN';
                    calldetailsinfo = {
                        "time": now_unix_1,
                        "discription": callinfodescription,
                        "callrecording": false
                    };
                    report.calldetailsinfolist.push(calldetailsinfo);
                }
                return [4 /*yield*/, insertreportdata(report, accountDb)];
            case 3:
                _a.sent();
                fields = {
                    calldetailsinfolist: report.calldetailsinfolist
                };
                updatereportdatatoelastic(accountDb, report, fields);
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                ;
                return [2 /*return*/, reportlist];
        }
    });
}); };
var parseagentring = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var result, formatedphone, callinfodescription, now_unix, calldetailsinfo, reportdata, reportlist, ex_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                formatedphone = formatPhoneNumber(callinfo.agentphonnumber);
                callinfodescription = "Call sent to " + (callinfo.agentname ? callinfo.agentname : 'unknown') + " ";
                now_unix = callinfo.notifytimestamp;
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false
                };
                if (!(callinfo.when.toLowerCase() === "live")) return [3 /*break*/, 5];
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                if (!!reportdata) return [3 /*break*/, 3];
                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 2:
                reportdata = _a.sent();
                _a.label = 3;
            case 3:
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting agent respose ring report");
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5:
                if (!(callinfo.when.toLowerCase() === "notify")) return [3 /*break*/, 7];
                return [4 /*yield*/, getunresolvedreportdatadocuments(accountDb, callinfo)];
            case 6:
                reportlist = _a.sent();
                reportlist.forEach(function (report) { return __awaiter(_this, void 0, void 0, function () {
                    var fields;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.calldetailsinfolist.push(calldetailsinfo);
                                console.log("inserting ruleexecution ring report");
                                return [4 /*yield*/, insertreportdata(report, accountDb)];
                            case 1:
                                _a.sent();
                                fields = {
                                    calldetailsinfolist: report.calldetailsinfolist
                                };
                                updatereportdatatoelastic(accountDb, report, fields);
                                return [2 /*return*/];
                        }
                    });
                }); });
                _a.label = 7;
            case 7:
                result = reportdata;
                return [3 /*break*/, 9];
            case 8:
                ex_9 = _a.sent();
                console.log("throw ");
                throw ex_9;
            case 9: return [2 /*return*/, result];
        }
    });
}); };
var getpropertyInfo = function (propertyid, propertydb) {
    if (propertydb === void 0) { propertydb = undefined; }
    return __awaiter(_this, void 0, void 0, function () {
        var contactsSelector, property;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contactsSelector = {
                        'selector': {
                            "propertyid": propertyid,
                            enabled: true,
                            "pvt_type": "property"
                        },
                        limit: 30000
                    };
                    propertydb = propertydb === undefined ? nano.use(parseAccountToDatabaseName(propertyid)) : propertydb;
                    return [4 /*yield*/, getdocumentbyproperty(propertydb, contactsSelector)];
                case 1:
                    property = _a.sent();
                    return [2 /*return*/, property];
            }
        });
    });
};
var getcompanyInfo = function (companyid, companydb) {
    if (companydb === void 0) { companydb = undefined; }
    return __awaiter(_this, void 0, void 0, function () {
        var contactsSelector, comapnydbname, comapny;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contactsSelector = {
                        'selector': {
                            "companyid": companyid,
                            "pvt_type": "company"
                        },
                        limit: 30000
                    };
                    comapnydbname = parseAccountToDatabaseName(companyid);
                    companydb = companydb === undefined ? nano.use(comapnydbname) : companydb;
                    return [4 /*yield*/, getdocumentbyproperty(companydb, contactsSelector)];
                case 1:
                    comapny = _a.sent();
                    return [2 /*return*/, comapny];
            }
        });
    });
};
var getdayscheduleInfo = function (db, schedule1) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    'selector': {
                        "scheduleid": schedule1.scheduleid,
                        "datetime": schedule1.datetime,
                        "pvt_type": "dayschedule"
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(db, contactsSelector)];
            case 1:
                schedule = _a.sent();
                return [2 /*return*/, schedule];
        }
    });
}); };
var getmonthreportdata = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, comapnydbname, companydb, reportdocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    "selector": {
                        "pvt_type": "reportdata",
                        "companyid": companyid,
                        "enabled": true,
                        "removefromreport": false
                    },
                    "limit": 30000
                };
                comapnydbname = parseAccountToDatabaseName(companyid);
                companydb = nano.use(comapnydbname);
                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
            case 1:
                reportdocs = _a.sent();
                return [2 /*return*/, reportdocs];
        }
    });
}); };
var getcompanypropertylsit = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, comapnydbname, companydb, properties;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    'selector': {
                        enabled: true,
                        "pvt_type": "property"
                    }
                };
                comapnydbname = parseAccountToDatabaseName(companyid);
                companydb = nano.use(comapnydbname);
                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
            case 1:
                properties = _a.sent();
                return [2 /*return*/, properties];
        }
    });
}); };
var finddaybusinesshours = function (property) {
    var timezone = property.timezone;
    var currendatettime = moment().tz(timezone);
    var dayname = currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    var businesshours = property.bussinesshours[dayname];
    return businesshours;
};
var isduringBussinessHour = function (property) { return __awaiter(_this, void 0, void 0, function () {
    var timezone, currendatettime, dayname, daybusinesshours, from_hh, to_hh, from_mm, to_mm, duringbussenesshours, moment_from_time, moment_to_time;
    return __generator(this, function (_a) {
        console.log("isduringBussinessHour");
        timezone = property.timezone;
        currendatettime = moment().tz(timezone);
        dayname = currendatettime.format('dddd').toLowerCase();
        daybusinesshours = property.bussinesshours[dayname];
        from_hh = isNaN(daybusinesshours.from.hh) ? daybusinesshours.from.hh : parseInt(daybusinesshours.from.hh);
        if (from_hh != 12 && daybusinesshours.from.a === "pm") {
            from_hh += 12;
        }
        else if (from_hh === 12 && daybusinesshours.from.a === "am") {
            from_hh = 0;
        }
        to_hh = parseInt(daybusinesshours.to.hh);
        from_mm = parseInt(daybusinesshours.from.mm);
        to_mm = parseInt(daybusinesshours.to.mm);
        if (to_hh != 12 && daybusinesshours.to.a === "pm") {
            to_hh += 12;
        }
        else if ((to_hh === 12 || to_hh === 0) && daybusinesshours.to.a === "am") {
            to_hh = to_mm > 0 ? 0 : 24;
        }
        duringbussenesshours = false;
        if (isNaN(from_hh)) {
            duringbussenesshours = false;
        }
        else {
            moment_from_time = moment().tz(timezone).startOf('day').add(from_hh, "hours").add(from_mm, "minutes");
            ;
            moment_to_time = moment().tz(timezone).startOf('day').add(to_hh, "hours").add(to_mm, "minutes");
            ;
            //     duringbussenesshours=currendatettime.unix()>moment_from_time.unix() && currendatettime.unix()<moment_to_time.unix();
            /* console.log("moment_from_time");
             console.log(moment_from_time.format("DD-MM-YY hh mm ss a z"));
             console.log("currendatettime");
             console.log(currendatettime.format("DD-MM-YY hh mm ss A z"));
             console.log("moment_to_time");
             console.log(moment_to_time.format("DD-MM-YY hh mm ss a z"));
              */
            duringbussenesshours = currendatettime.isBetween(moment_from_time, moment_to_time);
        }
        return [2 /*return*/, duringbussenesshours];
    });
}); };
var parsecallinfoinitdata = function (accountDb, callinfolog) { return __awaiter(_this, void 0, void 0, function () {
    var calldetailsinfolist, callinfodescription, now_unix, calldetailsinfo, callinfodescription2, reportdata, stored_report, ex_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                calldetailsinfolist = [];
                callinfodescription = "Call received from " + formatPhoneNumber(callinfolog.callernumber);
                now_unix = callinfolog.notifytimestamp;
                if (callinfolog.when === "live") {
                    calldetailsinfo = {
                        "time": now_unix,
                        "discription": callinfodescription,
                        "callrecording": false
                    };
                    calldetailsinfolist.push(calldetailsinfo);
                    callinfodescription2 = "Caller selected " + callinfolog.callflowoption + " ";
                    calldetailsinfo = {
                        "time": now_unix,
                        "discription": callinfodescription2,
                        "callrecording": false
                    };
                    calldetailsinfolist.push(calldetailsinfo);
                }
                reportdata = {
                    "companyid": callinfolog.companyid,
                    "companyname": callinfolog.companyname,
                    "companytimezone": callinfolog.companytimezone,
                    "industry": callinfolog.industry,
                    "propertytype": callinfolog.propertytype,
                    "propertytimezone": callinfolog.propertytimezone,
                    "hscustomer": callinfolog.hscustomer,
                    "propertyid": callinfolog.propertyid,
                    "propertyname": callinfolog.propertyname,
                    "propertyphone": callinfolog.propertyphone,
                    "duringbussinesshours": callinfolog.duringbussinesshours,
                    "calldetailsinfolist": calldetailsinfolist,
                    "guid": callinfolog.guid,
                    "callid": callinfolog.guid,
                    "type": callinfolog.callflowoption,
                    "when": callinfolog.when,
                    "boxid": callinfolog.boxid,
                    "didnumber": callinfolog.didnumber,
                    "respondent": "-",
                    "responsetime": "-",
                    "notes": 0,
                    "from": callinfolog.callername,
                    "fromd": callinfolog.callernumber,
                    "incidentdate": now_unix,
                    "resolutiontype": "-",
                    "isescalation": true,
                    "pvt_type": "reportdata",
                    "enabled": true,
                    "resolutionon": "-",
                    "resolved": false,
                    "removefromreport": false
                };
                debugMessage("inserting initial report");
                return [4 /*yield*/, getreportdatadocument(accountDb, reportdata)];
            case 1:
                stored_report = _a.sent();
                if (stored_report) {
                    reportdata._id = stored_report._id;
                    reportdata._rev = stored_report._rev;
                }
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 2:
                _a.sent();
                // 
                return [2 /*return*/, reportdata];
            case 3:
                ex_10 = _a.sent();
                //callinfolog.reporterror=true;
                // insertDocument(accountDb,callinfolog);
                console.log("threow 111");
                throw (ex_10);
            case 4: return [2 /*return*/];
        }
    });
}); };
var insertnotifycallinfologtoreport = function (callinfotype, callinfo, companydb) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var promise1;
    return __generator(this, function (_a) {
        promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _a = callinfotype;
                        switch (_a) {
                            case "ruleexecution": return [3 /*break*/, 1];
                            case "ring": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(callinfo.ruletype === "sms")) return [3 /*break*/, 3];
                        _b = resolve;
                        return [4 /*yield*/, parseruleexecution(companydb, callinfo)];
                    case 2:
                        _b.apply(void 0, [_f.sent()]);
                        _f.label = 3;
                    case 3: return [3 /*break*/, 7];
                    case 4:
                        _d = resolve;
                        return [4 /*yield*/, parseagentring(companydb, callinfo)];
                    case 5:
                        _d.apply(void 0, [_f.sent()]);
                        console.log("parsing end", callinfotype);
                        return [3 /*break*/, 7];
                    case 6:
                        {
                            resolve({});
                        }
                        _f.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var insertlivecallinfologtoreport = function (callinfotype, callinfo, companydb) { return __awaiter(_this, void 0, void 0, function () {
    var result, _a, ex_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 18, , 19]);
                _a = callinfotype;
                switch (_a) {
                    case "callinit": return [3 /*break*/, 1];
                    case "ring": return [3 /*break*/, 4];
                    case "agentrespnse": return [3 /*break*/, 6];
                    case "pin": return [3 /*break*/, 8];
                    case "callrecording": return [3 /*break*/, 10];
                    case "callend": return [3 /*break*/, 12];
                    case "messagerecordingend": return [3 /*break*/, 14];
                }
                return [3 /*break*/, 16];
            case 1:
                if (!(callinfo.when.toLowerCase() === "live")) return [3 /*break*/, 3];
                return [4 /*yield*/, parsecallinfoinitdata(companydb, callinfo)];
            case 2:
                result = _b.sent();
                _b.label = 3;
            case 3:
                ;
                console.log("parsing end", callinfotype);
                console.log(result);
                _b.label = 4;
            case 4: return [4 /*yield*/, parseagentring(companydb, callinfo)];
            case 5:
                result = _b.sent();
                console.log("parsing end", callinfotype);
                return [3 /*break*/, 17];
            case 6: return [4 /*yield*/, parseagentrespnse(companydb, callinfo)];
            case 7:
                result = _b.sent();
                console.log("parsing end", callinfotype);
                return [3 /*break*/, 17];
            case 8: return [4 /*yield*/, parseagentpin(companydb, callinfo)];
            case 9:
                result = _b.sent();
                console.log("parsing end", callinfotype);
                return [3 /*break*/, 17];
            case 10: return [4 /*yield*/, parsecallrecording(companydb, callinfo)];
            case 11:
                result = _b.sent();
                return [3 /*break*/, 17];
            case 12: return [4 /*yield*/, parsecallend(companydb, callinfo)];
            case 13:
                result = _b.sent();
                return [3 /*break*/, 17];
            case 14: return [4 /*yield*/, parsemessagerecordingend(companydb, callinfo)];
            case 15:
                result = _b.sent();
                return [3 /*break*/, 17];
            case 16:
                {
                    result = {};
                    return [3 /*break*/, 17];
                }
                _b.label = 17;
            case 17: return [2 /*return*/, result];
            case 18:
                ex_11 = _b.sent();
                console.log("throw 2222");
                throw ex_11;
            case 19: return [2 /*return*/];
        }
    });
}); };
var parselivecallinfologdataforreport = function (companydb, guid) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, callinfo, callinfologs, i, callinfotype, ex_12, ex_13, notifycalllog, i, callinfotype_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                debugMessage("started parsing " + guid);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "callinfolog",
                        "guid": guid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
            case 1:
                callinfologs = _a.sent();
                callinfologs = callinfologs.sort(function (a, b) {
                    return a.notifytimestamp > b.notifytimestamp ? 1 : -1;
                });
                debugMessage("\\**********************************************************************\\");
                _a.label = 2;
            case 2:
                _a.trys.push([2, 12, , 13]);
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < callinfologs.length)) return [3 /*break*/, 11];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 8, , 10]);
                callinfo = callinfologs[i];
                guid = callinfo.guid;
                callinfotype = callinfo.type ? callinfo.type.toLowerCase() : '';
                console.log("parsing ", callinfotype);
                debugMessage("parsing " + callinfotype + " for " + guid);
                return [4 /*yield*/, insertlivecallinfologtoreport(callinfotype, callinfo, companydb)];
            case 5:
                _a.sent();
                if (!callinfo.reporterror) return [3 /*break*/, 7];
                callinfo.reporterror = false;
                return [4 /*yield*/, insertDocument(companydb, callinfo)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                debugMessage("parsing end " + callinfotype + " for " + guid);
                return [3 /*break*/, 10];
            case 8:
                ex_12 = _a.sent();
                console.log("final catch ");
                callinfo.reporterror = true;
                //console.log(callinfo);
                return [4 /*yield*/, insertDocument(companydb, callinfo)];
            case 9:
                //console.log(callinfo);
                _a.sent();
                throw ex_12;
            case 10:
                i++;
                return [3 /*break*/, 3];
            case 11: return [3 /*break*/, 13];
            case 12:
                ex_13 = _a.sent();
                callinfo.reporterror = true;
                console.log("final catch 2222222 ");
                return [3 /*break*/, 13];
            case 13:
                debugMessage("\\**********************************************************************\\");
                debugMessage("end parsing " + guid);
                debugMessage("\\**********************************************************************\\");
                if (!(callinfo && !callinfo.reporterror)) return [3 /*break*/, 16];
                return [4 /*yield*/, insertreportdatatoelastic(companydb, callinfo)];
            case 14:
                _a.sent();
                return [4 /*yield*/, getNotifyCallLog(companydb, callinfo)];
            case 15:
                notifycalllog = _a.sent();
                console.log(notifycalllog.length);
                for (i = 0; i < notifycalllog.length; i++) {
                    callinfotype_1 = notifycalllog[i].type.toLowerCase();
                    if (callinfotype_1 === "ruleexecution" || callinfotype_1 === "ring") {
                        console.log("inserting notify reportdata for " + notifycalllog[i].guid);
                        insertnotifycallinfologtoreport(callinfotype_1, notifycalllog[i], companydb);
                    }
                }
                _a.label = 16;
            case 16: return [2 /*return*/, callinfo];
        }
    });
}); };
var insertcallinfolog = function (callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var now_unix, propertydabname, propertydb, callinfotype, property, company, companydabname, companydb, result, callflowdata, callflow, isduringbussinesshours, insert_time_unix;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callinfo.pvt_type = "callinfolog";
                callinfo.enabled = true;
                now_unix = moment().utc().unix();
                callinfo.notifytimestamp = now_unix;
                propertydabname = parseAccountToDatabaseName(callinfo.propertyid);
                propertydb = nano.use(propertydabname);
                callinfotype = callinfo.type ? callinfo.type.toLowerCase() : '';
                return [4 /*yield*/, getpropertyInfo(callinfo.propertyid)];
            case 1:
                property = _a.sent();
                return [4 /*yield*/, getcompanyInfo(property.companyid)];
            case 2:
                company = _a.sent();
                companydabname = parseAccountToDatabaseName(property.companyid);
                companydb = nano.use(companydabname);
                if (!(callinfotype === "callinit")) return [3 /*break*/, 4];
                now_unix--;
                callinfo.notifytimestamp = now_unix;
                callflowdata = property.callflowdata;
                callflow = callflowdata.find(function (cl) { return cl.didnumber === callinfo.didnumber; });
                if (callflow) {
                    callinfo.callflowoption = callflow.callflowoption;
                    callinfo.callflowoptiontype = callflow.callflowoptiontype;
                }
                return [4 /*yield*/, isduringBussinessHour(property)];
            case 3:
                isduringbussinesshours = _a.sent();
                callinfo["companyid"] = company.companyid;
                callinfo["companyname"] = company.companyname;
                callinfo["companytimezone"] = company.timezone;
                callinfo["industry"] = company.industry;
                callinfo["propertytype"] = property.type;
                callinfo["propertytimezone"] = property.timezone;
                callinfo["hscustomer"] = property.hscustomer;
                callinfo["propertyid"] = property.propertyid;
                callinfo["propertyname"] = property.propertyname;
                callinfo["propertyphone"] = property.phone;
                callinfo["duringbussinesshours"] = isduringbussinesshours;
                callinfo["daybusinesshours"] = finddaybusinesshours(property);
                callinfo["units"] = property.units;
                callinfo["hsaccount"] = property.hsaccount;
                _a.label = 4;
            case 4:
                insert_time_unix = moment().utc().unix();
                callinfo.inserttimestamp = insert_time_unix;
                companydb.insert(callinfo, function (err, body) { return __awaiter(_this, void 0, void 0, function () {
                    var when, reason, messagerecordingstart, messageid;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!err) return [3 /*break*/, 1];
                                console.log("err ", err);
                                return [2 /*return*/, (err)];
                            case 1:
                                console.log("callinfo log inserted succefully");
                                when = callinfo.when ? callinfo.when.toLowerCase() : "";
                                reason = callinfo.reason ? callinfo.reason : "";
                                if (!(when === "live" && callinfotype === "callend" && reason === "NORMAL_CLEARING")) return [3 /*break*/, 5];
                                return [4 /*yield*/, getcallinfologformessagerecording(companydb, callinfo.guid)];
                            case 2:
                                messagerecordingstart = _a.sent();
                                messageid = callinfo.messageid;
                                if (!(!messagerecordingstart || messageid)) return [3 /*break*/, 4];
                                return [4 /*yield*/, removeInitialCallRecord(callinfo, companydb)];
                            case 3:
                                _a.sent();
                                result = parselivecallinfologdataforreport(companydb, callinfo.guid);
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                if (when === "notify" && (callinfotype === "ruleexecution" || callinfotype === "ring")) {
                                    console.log("inserting notify reportdata for " + callinfo.guid);
                                    result = insertnotifycallinfologtoreport(callinfotype, callinfo, companydb);
                                }
                                else if (when === "agentcall" && callinfotype === "agentaction") {
                                    result = parseagenaction(companydb, callinfo);
                                }
                                else if (when === "agentcall" && callinfotype === "callbackend") {
                                    result = parseagentcallend(companydb, callinfo);
                                }
                                else if (when === "agentcall" && callinfotype === "pin") {
                                    result = parseagentpinfornotify(companydb, callinfo);
                                }
                                _a.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                ;
                return [2 /*return*/, result];
        }
    });
}); };
var insertincidentnotes = function (incidentnotenotedata, accountdbname, propertyid) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, contactsSelector, incidencenotedocument, notes, noteslength, insertresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountDb = nano.use(accountdbname);
                contactsSelector = {
                    'selector': {
                        "incidentid": incidentnotenotedata.incidentid,
                        enabled: true,
                        "pvt_type": "incidentnotes"
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                incidencenotedocument = _a.sent();
                if (incidencenotedocument) {
                    incidencenotedocument.data.push(incidentnotenotedata);
                }
                else {
                    notes = [];
                    notes.push(incidentnotenotedata);
                    incidencenotedocument = {
                        incidentid: incidentnotenotedata.incidentid,
                        data: notes,
                        enabled: true,
                        "pvt_type": "incidentnotes"
                    };
                }
                noteslength = incidencenotedocument.data.length;
                return [4 /*yield*/, updatenotelength(incidentnotenotedata, noteslength, propertyid)];
            case 2:
                insertresult = _a.sent();
                accountDb.insert(incidencenotedocument, function (err, body) {
                    if (err) {
                        console.log("err ", err);
                        return err;
                        ;
                    }
                    else {
                        console.log("incident note  inserted succefully");
                        return body;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var insertreportdata = function (callinfo, accountDb) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var insertreportdatapromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callinfo.pvt_type = "reportdata";
                callinfo.enabled = true;
                insertreportdatapromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        accountDb.insert(callinfo, function (err, body) {
                            if (err) {
                                console.log("err ", err);
                                debugMessage(err);
                                resolve(err);
                                ;
                            }
                            else {
                                console.log("reportdata inserted succefully");
                                debugMessage("reportdata inserted succefully");
                                //console.log(JSON.stringify(body));
                                resolve(body);
                                ;
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, insertreportdatapromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var insertdtmfinfo = function (dtmfinfo, accountdbname, property) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, callflowdata, callflow, now_unix;
    return __generator(this, function (_a) {
        accountDb = nano.use(accountdbname);
        try {
            dtmfinfo.pvt_type = "voicemail";
            dtmfinfo.enabled = true;
            dtmfinfo.guid = dtmfinfo.call_id;
            dtmfinfo.callid = dtmfinfo.call_id;
            callflowdata = property.callflowdata;
            if (dtmfinfo && dtmfinfo.DTMF > 0 && callflowdata && callflowdata.length > dtmfinfo.DTMF)
                callflow = callflowdata[dtmfinfo.DTMF - 1];
            if (callflow) {
                dtmfinfo.callflowoption = callflow.callflowoption;
                dtmfinfo.callflowoptiontype = callflow.callflowoptiontype;
            }
            else {
                dtmfinfo.callflowoption = "Other";
            }
            now_unix = moment().utc().unix();
            dtmfinfo.notifytimestamp = now_unix;
        }
        catch (ex) {
            debugMessage("error while enserting voice mail from webhook", "error");
            debugMessage(ex, "error");
            debugMessage(dtmfinfo, "info");
            //dtmfinfo.reporterror=true;
        }
        accountDb.insert(dtmfinfo, function (err, body) {
            if (err) {
                console.log("err ", err);
                return err;
                ;
            }
            else {
                console.log("dtmf info inserted succefully");
                return body;
            }
        });
        return [2 /*return*/];
    });
}); };
var getInitilaCallRecordForCallingNumber = function (callernumber, companydb) { return __awaiter(_this, void 0, void 0, function () {
    var selector, reportdoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                selector = {
                    "selector": {
                        "pvt_type": "reportdata",
                        "initialcallrecord": true,
                        "callernumber": callernumber
                    },
                    "sort": [
                        {
                            "incidentdate": "desc"
                        }
                    ],
                    "limit": 1
                };
                return [4 /*yield*/, getdocumentbyproperty(companydb, selector)];
            case 1:
                reportdoc = _a.sent();
                return [2 /*return*/, reportdoc];
        }
    });
}); };
var removeInitialCallRecord = function (callinfo, companydb) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getInitilaCallRecordForCallingNumber(callinfo.callernumber, companydb)];
            case 1:
                reportdata = _a.sent();
                reportdata.removefromreport = true;
                return [4 /*yield*/, insertreportdata(reportdata, companydb)];
            case 2:
                _a.sent();
                fields = {
                    "removefromreport": true
                };
                return [4 /*yield*/, updatereportdatatoelastic(companydb, reportdata, fields)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var insertDTMFInforeport = function (dtmfinfo, accountdbname, property) { return __awaiter(_this, void 0, void 0, function () {
    var companydb, reportdata, now_unix, callinfodescription, calldetailsinfo, r1, calldetailsinfolist, r, fields;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("insertDTMFInforeport");
                companydb = nano.use(accountdbname);
                return [4 /*yield*/, getreportdatadocument(companydb, dtmfinfo)];
            case 1:
                reportdata = _a.sent();
                now_unix = dtmfinfo.notifytimestamp;
                callinfodescription = "Caller selected " + dtmfinfo.callflowoption + " ";
                calldetailsinfo = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false
                };
                if (!!reportdata) return [3 /*break*/, 3];
                return [4 /*yield*/, insertcallinitreport(dtmfinfo, accountdbname, property, calldetailsinfo)];
            case 2:
                r1 = _a.sent();
                return [2 /*return*/, r1];
            case 3:
                calldetailsinfolist = reportdata.calldetailsinfolist;
                calldetailsinfolist.push(calldetailsinfo);
                reportdata.type = dtmfinfo.callflowoption;
                reportdata.escalationtype = dtmfinfo.callflowoptiontype;
                reportdata.removefromreport = false;
                reportdata.callflowoption = dtmfinfo.callflowoption;
                reportdata["dtmf"] = dtmfinfo.DTMF;
                return [4 /*yield*/, insertreportdata(reportdata, companydb)];
            case 4:
                r = _a.sent();
                fields = {
                    type: reportdata.type,
                    escalationtype: reportdata.escalationtype,
                    callflowoption: reportdata.callflowoption,
                    calldetailsinfolist: reportdata.calldetailsinfolist,
                    dtmf: dtmfinfo.dtmf,
                    "removefromreport": false
                };
                updatereportdatatoelastic(companydb, reportdata, fields);
                return [2 /*return*/, r];
        }
    });
}); };
var insertcallinitreport = function (dtmfinfo, accountdbname, property, calldetailsinfo) { return __awaiter(_this, void 0, void 0, function () {
    var company, companydb, init_reportdata, now_unix, callinfodescription, calldetailsinfo_init, calldetailsinfolist, isduringbussinesshours, daybusinesshours, reportdata, accountDb, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getcompanyInfo(property.companyid)];
            case 1:
                company = _a.sent();
                companydb = nano.use(accountdbname);
                return [4 /*yield*/, getreportdatadocument(companydb, dtmfinfo)];
            case 2:
                init_reportdata = _a.sent();
                if (!!init_reportdata) return [3 /*break*/, 7];
                console.log("insertcallinitreport");
                now_unix = dtmfinfo.notifytimestamp;
                callinfodescription = "Call received from " + formatPhoneNumber(dtmfinfo.caller_id_number);
                calldetailsinfo_init = {
                    "time": now_unix,
                    "discription": callinfodescription,
                    "callrecording": false
                };
                calldetailsinfolist = [];
                calldetailsinfolist.push(calldetailsinfo_init);
                if (calldetailsinfo)
                    calldetailsinfolist.push(calldetailsinfo);
                return [4 /*yield*/, isduringBussinessHour(property)];
            case 3:
                isduringbussinesshours = _a.sent();
                daybusinesshours = finddaybusinesshours(property);
                reportdata = {
                    companyid: company.companyid,
                    companyname: company.companyname,
                    companytimezone: company.timezone,
                    industry: company.industry,
                    propertytype: property.type,
                    propertytimezone: property.timezone,
                    hscustomer: property.hscustomer,
                    propertyid: property.propertyid,
                    propertyname: property.propertyname,
                    propertyphone: property.phone,
                    duringbussinesshours: isduringbussinesshours,
                    daybusinesshours: daybusinesshours,
                    calldetailsinfolist: calldetailsinfolist,
                    guid: dtmfinfo.call_id,
                    callid: dtmfinfo.call_id,
                    callflowoption: dtmfinfo.callflowoption,
                    when: "-",
                    callername: dtmfinfo.caller_id_name,
                    callernumber: dtmfinfo.caller_id_number,
                    type: dtmfinfo.callflowoption,
                    escalationtype: dtmfinfo.callflowoptiontype,
                    dtmf: dtmfinfo.DTMF,
                    "respondent": "-",
                    "responsetime": "-",
                    "notes": 0,
                    "from": dtmfinfo.caller_id_name,
                    "fromd": dtmfinfo.caller_id_number,
                    "incidentdate": now_unix,
                    "resolutiontype": "-",
                    "isescalation": false,
                    "pvt_type": "reportdata",
                    "enabled": true,
                    "resolutionon": "-",
                    "resolved": false,
                    "removefromreport": false,
                    "initialcallrecord": true
                };
                reportdata["dtmf"] = dtmfinfo.DTMF;
                accountDb = nano.use(accountdbname);
                return [4 /*yield*/, insertreportdata(reportdata, accountDb)];
            case 4:
                result = _a.sent();
                if (!result) return [3 /*break*/, 6];
                return [4 /*yield*/, insertreportdatatoelastic(accountDb, reportdata)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, result];
            case 7: return [2 /*return*/, init_reportdata];
        }
    });
}); };
var getaccountdbnames = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountdbpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountdbpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var hellospoke_db, nano1;
                    return __generator(this, function (_a) {
                        hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
                        nano1 = require('nano')(hellospoke_db);
                        nano1.db.list(function (err, body) {
                            if (err) {
                                console.log("db error", err);
                                reject(err);
                            }
                            else {
                                //   console.log( "dblist",body);
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, accountdbpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createaccountdb = function (dbname) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountdbpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountdbpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var hellospoke_db, nano1;
                    return __generator(this, function (_a) {
                        hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
                        nano1 = require('nano')(hellospoke_db);
                        nano1.db.create(dbname, function (err, body) {
                            if (err) {
                                console.log("db creation error", err);
                                resolve(err);
                            }
                            else {
                                //   console.log( "sucess",body);
                                resolve(body);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, accountdbpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var resetpasswordemail = function (payload) {
    var smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var accountname = payload.data.accountname;
    var email = payload.data.email;
    var account_id = payload.data.accountid;
    var userid = payload.data.userid;
    var first_name = payload.data.first_name;
    var html = "<!DOCTYPE html>\n    <html>\n    \n    <head>\n        <style>\n            .reset_color {\n                fill: #FFFFFF;\n            }\n        </style>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    </head>\n    \n    <body>\n        <div\n            style=\"padding-left: 161px; background-color: #d3d3d342; width: 568px; height: auto; padding:37px 0px 71px 45px;\">\n            <div><img src=\"" + process.env.WEB_SERVER + "img/HelloSpoke_logo.png\" class=\"head1\" /></div>\n            <div class=\"row\" style=\"margin-left:0px;margin-right:0px;\">\n                <div style=\"font-size: 14px; color:#003A5d;  margin-top: 30px;\">\n                    Hi " + first_name + ", <br /> We received a request to reset your HelloSpoke password.\n                </div>\n                <div style=\"margin-top: 3%; margin-bottom: 11px; font-size: 14px; color:#003A5d;\">\n                    Simply click the button to set a new password:</div>\n            </div>\n            <div>\n            <a target=\"_blank\" href=\"" + process.env.WEB_SERVER + "Change_Password?email=" + email + "&accountname=" + accountname + "&account_id=" + account_id + "&userid=" + userid + "\"><img src=\"" + process.env.WEB_SERVER + "img/Reset_password.png\" class=\"head1\" /></a>\n                \n            </div> <br /><br />\n            <div class=\"row\" style=\"margin-top: 7px;margin-left:0px;margin-right:0px;\">\n                <div style=\"font-size: 10px; color:#003A5d; font-family:open sans;\">Or copy and paste this link into your\n                    browser:\n                    <a target=\"_blank\" href=\"" + process.env.WEB_SERVER + "Change_Password?email=" + email + "&accountname=" + accountname + "&account_id=" + account_id + "&userid=" + userid + "\">" + process.env.WEB_SERVER + "</a>\n                </div>\n            </div>\n            <div class=\"row\" style=\"margin-top: 34px;margin-left:0px;margin-right:0px;\">\n                <div style=\"font-size: 14px; color:#003A5d; font-family:open sans;\">If you didn\u2019t ask to change your\n                    password, no worries!<br />\n                    Your password is still safe and you can delete this email.</p>\n                </div>\n                <div class=\"row\" style=\"margin-left:0px;margin-right:0px;\">\n                    <div style=\"font-size: 14px; color:#003A5d; font-family:open sans;margin-top: 20px;\">If you need further\n                        assistance, reach out to HelloSpoke at 888-955-5155.</div>\n                </div>\n            </div>\n        </div>\n        </div>\n    </body>\n    \n    </html>";
    var mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: email,
        subject: ' NOTIFY Reset Password ',
        text: 'This is the email regarding  NOTIFY Reset Password.',
        html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
var sendEscalationEmails = function (reportdata) { return __awaiter(_this, void 0, void 0, function () {
    var callflowoption, propertyid, payload, dbname, accountDb, contactsSelector, escalationemailobj, emaillist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                callflowoption = reportdata.type;
                propertyid = reportdata.propertyid;
                payload = {
                    data: {
                        callflowoption: callflowoption,
                        emaillist: []
                    }
                };
                dbname = parseAccountToDatabaseName(propertyid);
                accountDb = nano.use(dbname);
                contactsSelector = {
                    'selector': { "pvt_type": "escalationemaillist",
                        "callflowoption": callflowoption
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                escalationemailobj = _a.sent();
                emaillist = [];
                if (escalationemailobj && escalationemailobj.emaillist)
                    emaillist = escalationemailobj.emaillist.map(function (a) { return a.email; });
                if (emaillist.length > 0) {
                    payload.data.emaillist = emaillist;
                    vmboxemail(payload, reportdata);
                }
                console.log(payload);
                return [2 /*return*/];
        }
    });
}); };
var vmboxemail = function (payload, reportdata) {
    var smtpConfig = {
        host: process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false,
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);
    var emails = payload.data.emaillist.toString();
    //console.log('sending email ', emails);
    var from = reportdata.from ? reportdata.from : '-';
    var fromnumber = reportdata.fromd ? reportdata.fromd : '-';
    ;
    var to = reportdata.didnumber ? reportdata.didnumber : '';
    var tonumber = reportdata.didnumber ? reportdata.tonumber : '';
    var incidentdate = moment.duration(reportdata.incidentdate, 'seconds');
    var dt = moment.utc(incidentdate.asMilliseconds());
    var received = dt.format("ddd, MMM D,YYYY at hh:mm");
    var duration = ""; ////payload.data.duration ? payload.data.duration : '';
    var filetype = 'wav';
    var filesize = "";
    var boxid = reportdata.boxid;
    var aws_url = 'https://hsnotifymessagerecording.s3-us-west-2.amazonaws.com/';
    var filename = reportdata.messageid;
    var audioserverurl = "" + aws_url + boxid + "/" + filename;
    var fileurl = audioserverurl;
    // const fileurl = audioserverurl;
    var propertyname = reportdata.propertyname;
    var caller = "from " + from + "(" + fromnumber + ")";
    var calee = "from " + to + "(" + tonumber + ")";
    var callflowoption = reportdata.type;
    var voicemailboxname = callflowoption + " Voicemail ";
    //const account_id = payload.data.accountid;
    //const userid= payload.data.userid;
    var html = "<!DOCTYPE html>\n    <html><head>    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    </head>\n    <body>\n        <div style=\" font-family: sans-serif; color: #555555;\">\n            <div style=\"width: 700px;padding-right: 3%; padding-bottom: 8px; padding-left: 3%; padding-top: 2%;  background-color: #d3d3d342; margin:0px auto\">\n                <div style=\"background-color: #5995f7;   height: 8px !important;   margin-top: -8% !important;   margin-left: -25px!important;>\n                </div>\n                <div class=\"row head1\">\n                    <h3 style=\"font-size: 17px; margin-left: 34%; padding-top: 30px;\">New Voicemail</h3>\n                </div>\n\t\t\t\t<div style=\"padding-top: 30px;\">\n                <div class=\"row\">\n                    <p style=\"font-size: 15px;  \">Hi,</p>\n                    <p style=\"margin-top: 6%;   \">You have a new voicemail from \n<span style=\"font-weight: 600;\">" + caller + "</span>  for your voicemail box at <span style=\"font-weight: 600;\">" + voicemailboxname + "</span>.</p>\n                </div>\n                <div style=\"display: flex;  \"> \n                <p>Please find the message audio file in the attachment.</p>\n                </div>\n                <div class=\"row info\">\n                    <p style=\"font-size: 15px;   margin-top: 4%;   margin-bottom: 5%; font-size: 17px;\">Voicemail Message Details</p>\n                </div>\n                <div class=\"row\">\n                    <table width=\"50%\" class=\"table col-md-4\" style=\"font-size: 13px;\">\n                        <tbody>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600; text-align: left;   border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    Caller</td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                    " + caller + "</td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600;text-align: left;border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    Callee</td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                    " + calee + "</td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600;text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;padding: 6px;\">\n                                    Received</td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                     " + received + "</td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    Length</td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                     " + duration + "</td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    File Name   </td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                    " + filename + "</td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    File Type   </td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                    " + filetype + " </td>\n                            </tr>\n                            <tr class=\"active\">\n                                <td\n                                    style=\"font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;\">\n                                    File Size   </td>\n                                <td\n                                    style=\"text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;\n\t\t\t\t\t\t\t\t\twhite-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;\">\n                                     " + filesize + " </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\t\t\t\t</div>\n            </div>\n        </div>\n        </div>\n    </body>\n    \n    </html>";
    payload.data.emaillist.forEach(function (email) {
        var mailOptions = {
            from: process.env.SMTP_MAIL_SERVER_FROM,
            to: email,
            subject: propertyname + " " + callflowoption + " voicemail",
            text: 'This is the email regarding vmbox.',
            html: html,
            attachments: [{
                    filename: filename,
                    contentType: 'application/wav',
                    path: fileurl
                }]
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    });
};
var relogin = function (req, account_name, creds) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var responseData, putData, reloginPromise, reloginPromiseresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                responseData = {
                    success: false
                };
                putData = {
                    data: {
                        credentials: creds,
                        account_name: account_name
                    },
                    verb: "PUT"
                };
                reloginPromise = new Promise(function (resolve, reject) {
                    var kRequest = Request.put(process.env.KAZOO_SERVER + "/v2/user_auth", {
                        body: JSON.stringify(putData)
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        var decoded, newToken;
                        return __generator(this, function (_a) {
                            if (err) {
                                console.error(err);
                                reject(err);
                            }
                            if (response && response.statusCode === 201) {
                                // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                                console.log("loggedin");
                                body = JSON.parse(body);
                                decoded = req['decoded'];
                                newToken = jwt.sign({
                                    'kazoo_api_key': body.auth_token,
                                    'logged_in': true,
                                    'user_id': decoded.user_id,
                                    'timezone': decoded.timezone,
                                    'account_id': decoded.account_id
                                }, app.get('superSecret'), {
                                    'expiresIn': '1h'
                                });
                                responseData.success = true;
                                responseData.token = newToken;
                                resolve(responseData);
                            }
                            else {
                                resolve(body);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                console.log("loggedin12344");
                return [4 /*yield*/, reloginPromise];
            case 1:
                reloginPromiseresult = _a.sent();
                console.log("loggedin 3445");
                console.log(reloginPromiseresult);
                return [2 /*return*/, reloginPromiseresult];
        }
    });
}); };
var loginwithcred = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var resetPasswordPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetPasswordPromise = new Promise(function (resolve, reject) {
                    var creds = process.env.KAZOO_CREDENTIAL_HASH;
                    var account_name = process.env.KAZOO_ACCOUNT_NAME;
                    var responseData = {
                        success: false
                    };
                    var putData = {
                        data: {
                            credentials: creds,
                            account_name: account_name
                        },
                        verb: "PUT"
                    };
                    var kRequest = Request.put(process.env.KAZOO_SERVER + "/v2/user_auth", {
                        body: JSON.stringify(putData)
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        var savepasswordresult;
                        return __generator(this, function (_a) {
                            if (err) {
                                console.error(err);
                            }
                            if (response && response.statusCode === 201) {
                                // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                                body = JSON.parse(body);
                                //  console.log(body);
                                console.log(body.auth_token);
                                resolve(body.auth_token);
                            }
                            else {
                                console.log("loggedin fail");
                                resolve(responseData);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, resetPasswordPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var loginsavenewpassword = function (req, accountId, userid, password) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var resetPasswordPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetPasswordPromise = new Promise(function (resolve, reject) {
                    var creds = process.env.KAZOO_CREDENTIAL_HASH;
                    var account_name = process.env.KAZOO_ACCOUNT_NAME;
                    var responseData = {
                        success: false
                    };
                    var putData = {
                        data: {
                            credentials: creds,
                            account_name: account_name
                        },
                        verb: "PUT"
                    };
                    var kRequest = Request.put(process.env.KAZOO_SERVER + "/v2/user_auth", {
                        body: JSON.stringify(putData)
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        var payload, savepasswordresult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        console.error(err);
                                    }
                                    if (!(response && response.statusCode === 201)) return [3 /*break*/, 2];
                                    // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                                    console.log("loggedin");
                                    body = JSON.parse(body);
                                    payload = {
                                        data: {
                                            //  username: this.$store.state.changepwd.data.username,
                                            password: password
                                        }
                                    };
                                    return [4 /*yield*/, savenewpassword(req, body.auth_token, accountId, userid, payload)];
                                case 1:
                                    savepasswordresult = _a.sent();
                                    resolve(savepasswordresult);
                                    return [3 /*break*/, 3];
                                case 2:
                                    console.log("loggedin fail");
                                    resolve(responseData);
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                });
                return [4 /*yield*/, resetPasswordPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var creteKazooStorage = function (req, accountId) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, storage_payload, storagePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                storage_payload = { "data": {} };
                storagePromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .put({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/storage?validate_settings=false",
                        body: JSON.stringify(storage_payload)
                    }, function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody storage error \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\nbody storage account \n", body);
                        resolve(body);
                    });
                });
                return [4 /*yield*/, storagePromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var setKazooAccountEmailNotification = function (req, accountId) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, payload, promise_email_notification, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                payload = {
                    "data": {
                        "id": "voicemail_to_email",
                        "to": {
                            "type": "original"
                        },
                        "from": "no_reply@kazoo1.hsnotify.com",
                        "subject": "voicemail from {{account.name}} - {{voicemail.vmbox_name}} ",
                        "enabled": true,
                        "template_charset": "utf-8"
                    }
                };
                promise_email_notification = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .post({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/notifications/voicemail_to_email",
                        body: JSON.stringify(payload)
                    }, function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody promise_email_notification error \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\nbody promise_email_notification  \n", body);
                        resolve(body);
                    });
                });
                return [4 /*yield*/, promise_email_notification];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var deletekazoostorage = function (req, accountId) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, storagePromise;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                storagePromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .del(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/storage", function (err, response, body) {
                        if (err) {
                            console.log("\n\n\delete storage error \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\Deleted storage \n", body);
                        resolve(body);
                    });
                });
                return [2 /*return*/];
        }
    });
}); };
var creteKazooStorageAttachments = function (req, accountId) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, property, uid, storage_payload, storagePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                return [4 /*yield*/, getpropertyInfo(accountId)];
            case 2:
                property = _a.sent();
                uid = uuid().replace(/\-/g, "");
                console.log(accountId);
                storage_payload = {
                    "data": {
                        "attachments": {},
                        "plan": {
                            "modb": {
                                "types": {
                                    "mailbox_message": {
                                        "attachments": {
                                            "handler": "" + uid,
                                            "settings": {
                                                "field_list": [
                                                    { "arg": "account_id" },
                                                    { "arg": "id" },
                                                    { "arg": "attachment" }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                storage_payload.data.attachments[uid] = {
                    "handler": "s3",
                    "name": "kazoos3",
                    "settings": {
                        "bucket": "hsnotify",
                        "key": "AKIAJ3MS2IX7TBGC4M4Q",
                        "secret": "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"
                    }
                };
                storagePromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .put({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/storage",
                        body: storage_payload,
                        json: true
                    }, function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody storage error \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\nbody storage account \n", body);
                        resolve(body);
                    });
                });
                return [4 /*yield*/, storagePromise];
            case 3:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getKazooStorageInfo = function (req, accountId) { return __awaiter(_this, void 0, void 0, function () {
    var apiKey, storagePromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loginwithcred()];
            case 1:
                apiKey = _a.sent();
                storagePromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/storage", function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody storage error \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\nbody storage account \n", body);
                        resolve(body);
                    });
                });
                return [4 /*yield*/, storagePromise];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var savenewpassword = function (req, auth_token, accountId, userid, payload) { return __awaiter(_this, void 0, void 0, function () {
    var resetPasswordPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                resetPasswordPromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, auth_token)
                        .patch({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/users/" + userid,
                        body: payload,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            resolve(JSON.stringify(e));
                            return;
                        }
                        else {
                            console.log("save passs success");
                            console.log(b);
                            resolve("Success");
                        }
                    });
                });
                return [4 /*yield*/, resetPasswordPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var checkuserincompanyaccount = function (req, _accountid, username, apiKey) { return __awaiter(_this, void 0, void 0, function () {
    var userdocs, users, userfound;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getAccountuser(req, _accountid, apiKey)];
            case 1:
                userdocs = _a.sent();
                users = userdocs.data;
                userfound = users.find(function (u) { return u.username === username; });
                return [2 /*return*/, userfound];
        }
    });
}); };
var checkuserinaccounts = function (req, _accountid, username, apiKey) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var companyuser, accountchildren, user, children;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("checkuserinaccounts user");
                return [4 /*yield*/, checkuserincompanyaccount(req, _accountid, username, apiKey)];
            case 1:
                companyuser = _a.sent();
                if (companyuser)
                    return [2 /*return*/, companyuser];
                return [4 /*yield*/, getAccountChildren(req, _accountid, apiKey)];
            case 2:
                accountchildren = _a.sent();
                if (accountchildren.data) {
                    children = accountchildren.data;
                    children.every(function (child) { return __awaiter(_this, void 0, void 0, function () {
                        var userdocs, users, userfound;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log("accountid");
                                    console.log(child.id);
                                    console.log(child.name);
                                    return [4 /*yield*/, getAccountuser(req, child.id, apiKey)];
                                case 1:
                                    userdocs = _a.sent();
                                    users = userdocs.data;
                                    userfound = users.find(function (u) { return u.username === username; });
                                    if (userfound) {
                                        user = child;
                                        user.account_id = child.id;
                                        user.account_name = child.name;
                                    }
                                    return [2 /*return*/, true];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, user];
        }
    });
}); };
var getAccountChildren = function (req, _accountid, apiKey) { return __awaiter(_this, void 0, void 0, function () {
    var accountChildrenPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getAccountChildren");
                accountChildrenPromise = new Promise(function (resolve, reject) {
                    getKazooRequest(req, apiKey)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + _accountid + "/children", function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody acconut \n", err);
                            resolve(err);
                            return;
                        }
                        console.log("\n\n\nbody acconut \n", body);
                        resolve(JSON.parse(body));
                    });
                });
                return [4 /*yield*/, accountChildrenPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var getAccountuser = function (req, _accountid, apiKey) { return __awaiter(_this, void 0, void 0, function () {
    var accountusersPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getAccountuser");
                accountusersPromise = new Promise(function (resolve, reject) {
                    getKazooRequest(req, apiKey)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + _accountid + "/users", function (err, response, body) {
                        if (err) {
                            console.log("\n\n\nbody users \n", err);
                            resolve(err);
                            return;
                        }
                        // console.log("\n\n\nbody users \n", body);
                        resolve(JSON.parse(body));
                    });
                });
                return [4 /*yield*/, accountusersPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createUserInKazoo = function (req, accountid, payload, apiKey) { return __awaiter(_this, void 0, void 0, function () {
    var accountusersPromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("createUserInKazoo");
                payload.data.priv_level = "user";
                console.log(payload);
                accountusersPromise = new Promise(function (resolve, reject) {
                    var kRequest = getKazooRequest(req, apiKey)
                        .put({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountid + "/users",
                        body: payload,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log("\nkazoo error");
                            console.log(JSON.stringify(e));
                            resolve(JSON.stringify(e));
                            return;
                        }
                        else {
                            var _usr = r.body.data;
                            if (_usr.email) {
                                console.log("\nuser creation started \n", _usr);
                                _usr.kazooid = _usr.id;
                                resolve(_usr);
                            }
                            else {
                                resolve(_usr);
                            }
                        }
                    });
                });
                return [4 /*yield*/, accountusersPromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
//free switch 
var free_switch_login = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var freeswitchlogin, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("free_switch_login");
                freeswitchlogin = new Promise(function (resolve, reject) {
                    var responseData = {
                        success: false
                    };
                    var loginData = {
                        "username": process.env.FREE_SWITCH_SERVER_USER_NAME,
                        "password": process.env.FREE_SWITCH_SERVER_USER_PASSWORD
                    };
                    var kRequest = Request.post(process.env.FREE_SWITCH_SERVER + "/login", {
                        body: loginData,
                        json: true
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (err) {
                                console.error(err);
                            }
                            console.log("response.statusCode ", response.statusCode);
                            if (response && response.statusCode === 200) {
                                console.log("loggedin ", body.data.token);
                                resolve(body);
                            }
                            else {
                                console.log("loggedin fail  ", response.body);
                                resolve(responseData);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, freeswitchlogin];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var free_switch_create_device = function (apikey, didnumber, password, realm, callflowdeviceusernamesuffix) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var freeswitchcreatedevice, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("freeswitchcreatedevice ,");
                freeswitchcreatedevice = new Promise(function (resolve, reject) {
                    var responseData = {
                        success: false
                    };
                    var username = didnumber + callflowdeviceusernamesuffix;
                    var postData = {
                        "gateway_name": username,
                        "username": username,
                        "password": password,
                        "realm": realm,
                        "from-domain": realm,
                        "register": "1",
                        "register-proxy": process.env.PROXY,
                        "proxy": process.env.PROXY,
                        "ping": "25",
                        "is_messagebox": "1",
                        "is_outbound": "1"
                    };
                    console.log(postData);
                    //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
                    //  console.log("url ", url);
                    var kRequest = getFreeSwitchRequest(apikey).post(process.env.FREE_SWITCH_SERVER + "/v1/device/create", {
                        body: postData,
                        json: true
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (err) {
                                console.log("freeswitchcreatedevice fail  ");
                                console.error(err);
                            }
                            if (response && response.statusCode === 200) {
                                console.log("freeswitchcreatedevice sucess");
                                resolve(body);
                            }
                            else {
                                console.log("freeswitchcreatedevice fail  ", response.body);
                                resolve(body);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, freeswitchcreatedevice];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var free_switch_create_property_device = function (apikey, payload) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var freeswitchcreatedevice, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("free_switch_create_property_device");
                freeswitchcreatedevice = new Promise(function (resolve, reject) {
                    var responseData = {
                        success: false
                    };
                    var postData = {
                        "propertyId": payload.propertyId,
                        "gateway_name": payload.username,
                        "username": payload.username,
                        "password": payload.password,
                        "realm": payload.realm,
                        "from-domain": payload.realm,
                        "register": "1",
                        "register-proxy": process.env.PROXY,
                        "proxy": process.env.PROXY,
                        "ping": "25"
                    };
                    console.log("postData for property device", postData);
                    //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
                    //  console.log("url ", url);
                    var kRequest = getFreeSwitchRequest(apikey).post(process.env.FREE_SWITCH_SERVER + "/v1/property/device/create", {
                        body: postData,
                        json: true
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (err) {
                                console.log("freeswitch property device fail  ");
                                console.error(err);
                            }
                            if (response && response.statusCode === 200) {
                                console.log("freeswitch property device sucess");
                                resolve(response);
                            }
                            else {
                                console.log("freeswitch property device fail  ", response.body);
                                resolve(responseData);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, freeswitchcreatedevice];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var free_switch_create_voicemessagebox = function (apikey, payload) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var freeswitchcreatedevice, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("free_switch_create_voicemessagebox");
                freeswitchcreatedevice = new Promise(function (resolve, reject) {
                    var responseData = {
                        success: false
                    };
                    var postData = {
                        "propertyId": payload.propertyId,
                        "number": payload.number,
                        "DID": payload.didnumber,
                        "password": "1234",
                        "status": "1"
                    };
                    console.log("postData postData", postData);
                    //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
                    //  console.log("url ", url);
                    var kRequest = getFreeSwitchRequest(apikey).post(process.env.FREE_SWITCH_SERVER + "/v1/voicemessagebox/create", {
                        body: postData,
                        json: true
                    }, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (err) {
                                console.log("freeswitch voicemessagebox fail  ");
                                console.error(err);
                            }
                            if (response && response.statusCode === 200) {
                                console.log("freeswitch voicemessagebox sucess");
                                resolve(response);
                            }
                            else {
                                console.log("freeswitch voicemessagebox fail  ", response.body);
                                resolve(responseData);
                            }
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, freeswitchcreatedevice];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
//elastic search
var getelasticsearchreportdata = function (guid) { return __awaiter(_this, void 0, void 0, function () {
    var body, elasticsearchreportdocs, reportdoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    size: 20,
                    from: 0,
                    query: {
                        "match": {
                            "guid": guid //"1b305a84-693b-42c2-bf64-798dc8db8ecb411132"
                        }
                    }
                };
                return [4 /*yield*/, search('reportdocs', body)];
            case 1:
                elasticsearchreportdocs = _a.sent();
                console.log(elasticsearchreportdocs);
                if (elasticsearchreportdocs.lenghth > 0) {
                    reportdoc = elasticsearchreportdocs[0];
                }
                return [2 /*return*/, reportdoc];
        }
    });
}); };
var getNotifyCallLog = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var reportdata, contactsSelector, reportdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                contactsSelector = {
                    'selector': {
                        "pvt_type": "callinfolog",
                        "when": "notify",
                        "type": {
                            "$in": [
                                "ruleexecution",
                                "ring"
                            ]
                        },
                        "notifytimestamp": {
                            "$gt": reportdata.callendtime
                        }
                    }
                };
                console.log("getNotifyCallLog");
                console.log(JSON.stringify(contactsSelector));
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, contactsSelector)];
            case 2:
                reportdata = _a.sent();
                return [2 /*return*/, reportdata];
        }
    });
}); };
var insertreportdatatoelastic = function (accountDb, callinfo) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var reportdata, promise1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                promise1 = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var url, options;
                    return __generator(this, function (_a) {
                        delete reportdata._id;
                        delete reportdata._rev;
                        url = process.env.ELASTIC_SEARCH_SERVER + "/reportdocs/_doc";
                        options = {
                            method: 'POST',
                            url: url,
                            headers: {
                                // 'cache-control': 'no-cache',
                                'Content-Type': 'application/json'
                            },
                            body: reportdata,
                            json: true
                        };
                        Request(options, function (error, response, body) { return __awaiter(_this, void 0, void 0, function () {
                            var reportdata2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!error) return [3 /*break*/, 1];
                                        console.log(' elastic insert error ');
                                        console.log(error + '//' + 'error');
                                        resolve(error);
                                        return [3 /*break*/, 4];
                                    case 1:
                                        console.log('elastic insert sucess');
                                        console.log(JSON.stringify(body) + ' // ' + 'succuss');
                                        return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
                                    case 2:
                                        reportdata2 = _a.sent();
                                        //insert elastic id to couchdb so we can use it for updation
                                        reportdata2.elasticid = body._id;
                                        console.log('elastic sucess insertreportdata');
                                        return [4 /*yield*/, insertreportdata(reportdata2, accountDb)];
                                    case 3:
                                        _a.sent();
                                        resolve(body);
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, promise1];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getelasticsearchdata = function (payload) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var page, size, from, query_string, query, options, resultpromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = isNaN(payload.page) ? 1 : payload.page;
                size = 1000;
                from = ((parseInt(page) - 1) * size) + 1;
                query_string = payload.querystring + " ";
                query = {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "fields": ["resolutionon", "companyname", "industry", "propertytype", "propertyname", "propertyphone", "type", "didnumber", "respondent", "from", "fromd", "resolutiontype"],
                                    "query": query_string,
                                    "lenient": true
                                }
                            },
                            {
                                "range": {
                                    "incidentdate": {
                                        "gte": payload.starttime,
                                        "lte": payload.endtime,
                                        "boost": 2.0
                                    }
                                }
                            },
                            {
                                "bool": {
                                    "should": [
                                        {
                                            "bool": {
                                                "must_not": [
                                                    {
                                                        "exists": {
                                                            "field": "removefromreport"
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            "bool": {
                                                "must": [
                                                    {
                                                        "query_string": {
                                                            "query": "(removefromreport:false)"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                options = {
                    method: 'POST',
                    url: process.env.ELASTIC_SEARCH_SERVER + "/reportdocs/_search",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "sort": [
                            { "incidentdate": { "order": "desc" } }
                        ],
                        "query": query
                    },
                    from: from,
                    size: size,
                    json: true
                };
                resultpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        Request(options, function (error, response, body) {
                            if (error) {
                                console.log(error + '//' + 'error');
                                resolve(error);
                            }
                            else {
                                //res.send(body);
                                var result_2 = body.hits && body.hits.hits ? body.hits.hits.map(function (a) { return a._source; }) : [];
                                // console.log(JSON.stringify(result) +' // '+ 'succuss');
                                resolve(result_2);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, resultpromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var updatereportdatatoelastic = function (accountDb, callinfo, fileds) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var reportdata, elasticid, url, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
            case 1:
                reportdata = _a.sent();
                elasticid = reportdata.elasticid;
                console.log("elasticid");
                console.log(elasticid);
                url = process.env.ELASTIC_SEARCH_SERVER + "/reportdocs/_update/" + elasticid;
                options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        // 'cache-control': 'no-cache',
                        'Content-Type': 'application/json'
                    },
                    body: {
                        doc: fileds
                    },
                    json: true
                };
                Request(options, function (error, response, body) { return __awaiter(_this, void 0, void 0, function () {
                    var reportdata2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!error) return [3 /*break*/, 1];
                                console.log(' elastic update error');
                                console.log(error + '//' + 'error');
                                return [2 /*return*/, error];
                            case 1:
                                console.log('elastic update sucess');
                                console.log(JSON.stringify(body) + ' // ' + 'succuss');
                                return [4 /*yield*/, getreportdatadocument(accountDb, callinfo)];
                            case 2:
                                reportdata2 = _a.sent();
                                return [2 /*return*/, body];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
//function end
app.get('/properties/:compnyid', validateJWT, function (req, res) {
    var id = req.params.compnyid;
    var accountId = req['decoded'].account_id;
    //getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {
    getKazooRequest(req).get(process.env.KAZOO_SERVER + "/v2/accounts/" + id + "/descendants?paginate=false", function (e, r, b1) {
        if (e) {
            res.send(e);
        }
        var b = JSON.parse(r.body);
        var data = b.data;
        res.send(data);
    });
});
app.get('/addedproperties/:companyid', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    console.log('mster users  ', parseAccountToDatabaseName(req['decoded'].account_id));
    var companyid = req.params.companyid;
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    'pvt_type': 'property'
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /propery");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log('\ncomapnyies\n');
            console.log(JSON.stringify(result));
            res.send(result);
        }
    });
});
app.post('/addcompany', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, _accountid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = JSON.parse(req.body.payload);
                _accountid = parseAccountToDatabaseName(req['decoded'].account_id);
                return [4 /*yield*/, insertcompany(payload, req)];
            case 1:
                result = _a.sent();
                console.log('result' + result);
                res.send("sucess");
                return [2 /*return*/];
        }
    });
}); });
app.put('/companies/:id', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, _accountid, accountDb, result;
    return __generator(this, function (_a) {
        payload = JSON.parse(req.body.payload);
        _accountid = parseAccountToDatabaseName(req['decoded'].account_id);
        accountDb = nano.use(_accountid);
        result = updatecompany(payload, _accountid);
        console.log('result' + result);
        res.send("sucess");
        return [2 /*return*/];
    });
}); });
app.get('/companies/:id', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, company, account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.id;
                console.log('comanyid ' + companyid);
                console.log("get company info ");
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 1:
                company = _a.sent();
                if (!(!company || company.error)) return [3 /*break*/, 3];
                return [4 /*yield*/, getkazooaccountinfo(req, companyid)];
            case 2:
                account = _a.sent();
                console.log(account.data.timezone);
                company = { industrytype: '',
                    company_phone: '9694787894',
                    timezone: account.data.timezone
                };
                _a.label = 3;
            case 3:
                console.log(JSON.stringify(company));
                res.send(company);
                return [2 /*return*/];
        }
    });
}); });
app.get('/getnotifycompanies/:accountid', validateJWT, function (req, res) {
    var accountid = req.params.accountid;
    var _accountdbname = parseAccountToDatabaseName(accountid);
    // const _accountdbname=parseAccountToDatabaseName(_accountid);
    console.log("\n  accountname ", _accountdbname);
    var accountDb = nano.use(_accountdbname);
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    "pvt_type": "company",
                    "enabled": true
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db ");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            result.docs.sort(function (a, b) {
                return a.companyname.toLowerCase() > b.companyname.toLowerCase() ? 1 : -1;
            });
            //  console.log("company resulet ",result);
            res.send(result);
        }
    });
    // res.send(body);
    //    });
    /*
       const kRequest = getKazooRequest(req)
           .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/children`, (err, response, body) => {
               console.log('\n\n\n body ', body);
               var companydata=JSON.parse( body).data;
              // console.log('\n\n\n result ', JSON.stringify (result));
               res.send(companydata);
           });*/
});
app.get('/getnotifyproperties/:id', validateJWT, function (req, res) {
    var kRequest = getKazooRequest(req)
        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + req.params.id + "/children", function (err, response, body) {
        console.log('\n\n\n body ', body);
        var companydata = JSON.parse(body).data;
        res.send(companydata);
    });
});
app.get('/industries', function (req, res) {
    // const accountId = (req['decoded'] as DecodedJWT).account_id;
    var industries = { data: [
            {
                type: 'Multifamily',
                subtypes: [
                    'Affordable',
                    'Conventional',
                    'Senior'
                ]
            },
            {
                type: 'Service Contractor',
                subtypes: [
                    'HVAC',
                    'Plumbing',
                    'Electric'
                ]
            }
        ]
    };
    res.send(industries);
});
//notify user managment
app.get('/forgotpassword/company/:name/user/:email', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var dbnames, accountname, username, result, company, account_db_pattern, user, i, dbname, accountDb, companydbname, companydb, payload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                accountname = req.params.name;
                username = req.params.email;
                companyIdSelector.selector.$or[0].companyname = accountname;
                companyIdSelector.selector.$or[1].kazoopropertyname = accountname;
                userSelector.selector.username = username;
                result = {};
                account_db_pattern = new RegExp(getDabaseNameRegx());
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 6];
                dbname = dbnames[i];
                if (account_db_pattern.test(dbname) === false)
                    return [3 /*break*/, 5];
                accountDb = nano.use(dbname);
                return [4 /*yield*/, getdocumentbyproperty(accountDb, companyIdSelector)];
            case 3:
                company = _a.sent();
                if (!(company && company.companyid)) return [3 /*break*/, 5];
                companydbname = parseAccountToDatabaseName(company.companyid);
                companydb = nano.use(companydbname);
                return [4 /*yield*/, getdocumentbyproperty(companydb, userSelector)];
            case 4:
                user = _a.sent();
                return [3 /*break*/, 6];
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6:
                if (company && company.companyid && user && user.id) {
                    payload = {
                        data: {
                            accountname: accountname,
                            accountid: company.companyid,
                            email: username,
                            userid: user.id,
                            first_name: user.first_name
                        }
                    };
                    resetpasswordemail(payload);
                    res.send("Email sent");
                }
                else {
                    res.send("Error");
                }
                return [2 /*return*/];
        }
    });
}); });
//create users update  colorindex  settings
app.put('/company/:comapnyid/property/:propertyid/user/:userid/:colorindex', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, propertyid, colorindex, contactsSelector, _userobj, userproperty, notifyupdateresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                propertyid = req.params.propertyid;
                colorindex = req.params.colorindex;
                contactsSelector = {
                    'selector': {
                        "id": userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _userobj = _a.sent();
                if (!(_userobj && _userobj._id)) return [3 /*break*/, 3];
                if (_userobj.msteruser)
                    _userobj.colorindex = colorindex;
                else if (_userobj.propertylist) {
                    userproperty = _userobj.propertylist.find(function (up) { return up.id === propertyid; });
                    if (userproperty)
                        userproperty.colorindex = parseInt(colorindex);
                }
                return [4 /*yield*/, updatenotifyusercolorindex(accountDb, _userobj)];
            case 2:
                notifyupdateresult = _a.sent();
                res.send(_userobj);
                return [3 /*break*/, 4];
            case 3:
                res.send("error");
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//create users savepassword
app.get('/savepassword/company/:companyid/:accountname/user/:userid/password/:password', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var accountId, userid, password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accountId = req.params.companyid;
                userid = req.params.userid;
                password = req.params.password;
                return [4 /*yield*/, loginsavenewpassword(req, accountId, userid, password)];
            case 1:
                _a.sent();
                res.send("sucess");
                return [2 /*return*/];
        }
    });
}); });
//create users changePassword
app.put('/changePassword', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var payload, _id, accountId, accountname, creds, kRequest;
    return __generator(this, function (_a) {
        payload = req.body.payload;
        _id = req['decoded'].user_id;
        accountId = req['decoded'].account_id;
        accountname = payload.data.accountname;
        creds = payload.creds;
        delete payload.data.accountname;
        delete payload.creds;
        payload.data.passwordreset = true;
        console.log("relogin payload ", payload);
        kRequest = getKazooRequest(req)
            .patch({
            url: process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/users/" + _id,
            body: payload,
            json: true
        }, function (e, r, b) { return __awaiter(_this, void 0, void 0, function () {
            var reloginresult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!e) return [3 /*break*/, 1];
                        debugMessage(e, "error");
                        //console.log(e);
                        res.send(JSON.stringify(e));
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, relogin(req, accountname, creds)];
                    case 2:
                        reloginresult = _a.sent();
                        res.send(reloginresult);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// create users  change role
app.post('/changeRole', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, companyid, accountDbName, accountDb, contactsSelector, _userobj, insertingpropertylist, user_type, propertysetting, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = JSON.parse(req.body.payload);
                companyid = payload.companyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                contactsSelector = {
                    'selector': {
                        "id": payload.userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _userobj = _a.sent();
                insertingpropertylist = _userobj.propertylist;
                user_type = payload.user_type.toLowerCase();
                if (user_type != "master") {
                    _userobj.user_type = payload.user_type;
                    _userobj.msteruser = false;
                    propertysetting = insertingpropertylist.find(function (ip) { return ip.id === payload.propertyid; });
                    propertysetting.user_type = payload.user_type;
                }
                else {
                    _userobj.user_type = payload.user_type;
                    _userobj.msteruser = true;
                }
                return [4 /*yield*/, insertUser(_userobj, accountDbName)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
// create users delete
app["delete"]('/companies/:companyid/property/:propertyid/users/:userid/:removeall', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, userid, removeall, propertyid, accountDbName, accountDb, contactsSelector, _userobj, insertingpropertylist, user_type, propertysetting, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.companyid;
                userid = req.params.userid;
                removeall = req.params.removeall;
                propertyid = req.params.propertyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                contactsSelector = {
                    'selector': {
                        "id": userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _userobj = _a.sent();
                insertingpropertylist = _userobj.propertylist;
                user_type = _userobj.user_type.toLowerCase();
                if (user_type != "master") {
                    if (removeall != "true") {
                        propertysetting = insertingpropertylist.find(function (ip) { return ip.id === propertyid; });
                        propertysetting.enabled = false;
                    }
                    else {
                        insertingpropertylist.forEach(function (ip) {
                            ip.enabled = false;
                        });
                    }
                    insertingpropertylist = insertingpropertylist.filter(function (ip) { return ip.enabled; });
                    _userobj.notify_enabled = insertingpropertylist.length > 0;
                }
                else {
                    _userobj.notify_enabled = false;
                }
                result = insertUser(_userobj, accountDbName);
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
//create user update 
app.put('/companies/:companyid/masterusers/:userid', validateJWT, function (req, res) {
    var companyid = req.params.companyid;
    var accountDbName = parseAccountToDatabaseName(companyid);
    var accountDb = nano.use(accountDbName);
    var userid = req.params.userid;
    var payload = req.body.payload;
    accountDb.get(userid, function (err, _userobj) {
        if (err) {
            console.log("\n deleting user error:", err);
            res.send(err);
        }
        else {
            _userobj.email = payload.email;
            _userobj.first_name = payload.first_name;
            _userobj.last_name = payload.last_name;
            _userobj.title = payload.title;
            accountDb.insert(_userobj, function (err, result) {
                if (err) {
                    try {
                        res.statusCode = result.statusCode;
                        res.send(err);
                    }
                    catch (e) {
                        console.error("Couldn't access the db in /contacts");
                        res.send(err);
                    }
                }
                else {
                    var payload1 = {
                        data: {
                            email: payload.email,
                            first_name: payload.first_name,
                            _last_name: payload.last_name,
                            title: payload.title
                        }
                    };
                    var kRequest = getKazooRequest(req)
                        .patch({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + companyid + "/users/" + _userobj.id,
                        body: payload1,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log(e);
                            res.send(JSON.stringify(e));
                            return;
                        }
                        else {
                            console.log("\n kazoo updated successfull");
                            res.send(payload);
                        }
                    });
                }
            });
        }
    });
});
//create users
//create users create property users
app.post('/companies/:companyid/properties/:propertyid/users', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, propertyid, payload, contactsSelector, primarykazooaccount, kazooacccountid, accountinfo, kazooacccountname, accountDbname, accountDb, user, apiKey, insertingpropertylist, user_type, result, propertylist, insertingpropertylist, allpropertiesavailable, user_type, user_type_1, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.companyid;
                propertyid = req.params.propertyid;
                payload = JSON.parse(req.body.payload);
                contactsSelector = {
                    'selector': {
                        "username": payload.data.email
                    },
                    limit: 30000
                };
                primarykazooaccount = payload.data.primarykazooaccount;
                kazooacccountid = primarykazooaccount ? primarykazooaccount.id : companyid;
                return [4 /*yield*/, getkazooaccountinfo(req, kazooacccountid)];
            case 1:
                accountinfo = _a.sent();
                kazooacccountname = accountinfo.data.name;
                primarykazooaccount = {
                    id: kazooacccountid,
                    name: kazooacccountname
                };
                payload.data.primarykazooaccount = primarykazooaccount;
                accountDbname = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbname);
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 8];
                payload.data.emailsettings = { settings: [] };
                payload.data.emailsettings.settings.push({ email: payload.data.email });
                return [4 /*yield*/, loginwithcred()];
            case 3:
                apiKey = _a.sent();
                return [4 /*yield*/, checkuserinaccounts(req, companyid, payload.data.email, apiKey)];
            case 4:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 6];
                return [4 /*yield*/, createUserInKazoo(req, kazooacccountid, payload, apiKey)];
            case 5:
                user = _a.sent();
                if (user.email) {
                    payload.data.kazooid = user.kazooid;
                    payload.data.id = user.kazooid;
                }
                else {
                    payload.data.error = "Error occured while creating kazoo user";
                }
                return [3 /*break*/, 7];
            case 6:
                payload.data.kazooid = user.id;
                _a.label = 7;
            case 7:
                if (payload.data.kazooid) {
                    console.log("\nisnserting master users  ", accountDbname);
                    insertingpropertylist = payload.data.propertylist;
                    user_type = payload.data.user_type.toLowerCase();
                    if (user_type != "master") {
                        insertingpropertylist.forEach(function (ip) {
                            ip.user_type = payload.data.user_type;
                        });
                    }
                    result = insertUser(payload.data, accountDbname);
                    sendemail(payload);
                }
                return [3 /*break*/, 11];
            case 8:
                propertylist = user.propertylist;
                insertingpropertylist = payload.data.propertylist;
                allpropertiesavailable = true;
                user_type = payload.data.user_type.toLowerCase();
                if (user_type != "master") {
                    insertingpropertylist.forEach(function (ip) {
                        var property = propertylist.find(function (p) { return p.id === ip.id; });
                        if (!property) {
                            allpropertiesavailable = false;
                            user.propertylist.push({
                                "id": ip.id,
                                "enabled": true,
                                "name": ip.name,
                                "user_type": payload.data.user_type
                            });
                        }
                    });
                }
                if (!allpropertiesavailable) return [3 /*break*/, 9];
                payload.data.error = "user already exist";
                return [3 /*break*/, 11];
            case 9:
                user_type_1 = payload.data.user_type.toLowerCase();
                if (user_type_1 != "master") {
                    user.user_type = payload.data.user_type;
                }
                return [4 /*yield*/, insertUser(user, accountDbname)];
            case 10:
                result = _a.sent();
                payload.data = user;
                _a.label = 11;
            case 11:
                res.send(payload.data);
                return [2 /*return*/];
        }
    });
}); });
//create users update settings
app.put('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, payload, contactsSelector, _userobj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("afas");
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                payload = req.body.payload;
                console.log("payload");
                console.log(payload);
                contactsSelector = {
                    'selector': {
                        "id": userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _userobj = _a.sent();
                if (_userobj && _userobj._id) {
                    _userobj.scheduleemailreport = payload;
                    updateScheduleReport(accountDb, _userobj);
                    //console.log("userfound", _userobj);
                }
                res.send("sucess");
                return [2 /*return*/];
        }
    });
}); });
app.put('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, payload, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("afas");
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                console.log(accountDbName);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                payload = req.body.payload;
                payload.userid = userid;
                payload.enabled = true;
                return [4 /*yield*/, insertcallactivityreportinfo(payload, accountDb)];
            case 1:
                result = _a.sent();
                res.send("sucess");
                return [2 /*return*/];
        }
    });
}); });
app.put('/company/:comapnyid/user/:userid/scheduleactivityreport/:id', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, id, accountDbName, accountDb, contactsSelector, _scheduledoc, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("afas");
                companyid = req.params.comapnyid;
                id = req.params.id;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                contactsSelector = {
                    'selector': {
                        "_id": id
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _scheduledoc = _a.sent();
                _scheduledoc.enabled = false;
                return [4 /*yield*/, insertcallactivityreportinfo(_scheduledoc, accountDb)];
            case 2:
                result = _a.sent();
                res.send("sucess");
                return [2 /*return*/];
        }
    });
}); });
app.get('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, contactsSelector, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("new");
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                contactsSelector = {
                    "selector": {
                        "pvt_type": "callactivityreport",
                        "userid": userid,
                        "enabled": true
                    },
                    "limit": 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, contactsSelector)];
            case 1:
                result = _a.sent();
                //    console.log(result);
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, contactsSelector, _userobj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("afas");
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                contactsSelector = {
                    'selector': {
                        "id": userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                _userobj = _a.sent();
                if (!_userobj) {
                    _userobj = { "scheduleemailreport": {} };
                }
                res.send(_userobj.scheduleemailreport);
                return [2 /*return*/];
        }
    });
}); });
app.put('/updatenotifyusersettings/:id/:userid', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, property, companyid, accountDbName, accountDb, uid, payload, pinuser, error, contactsSelector, _userobj, kazooupdateresult, notifyupdateresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, findPropertydocument(id)];
            case 1:
                property = _a.sent();
                companyid = property && property.companyid ? property.companyid : id;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                uid = req.params.userid;
                payload = JSON.parse(req.body.payload);
                console.log("\n  userid :- ", uid);
                return [4 /*yield*/, checkpin(payload.pin, companyid)];
            case 2:
                pinuser = _a.sent();
                if (!(pinuser && pinuser.id != uid)) return [3 /*break*/, 3];
                console.log("duplicate pin");
                error = {
                    error: "duplicate pin"
                };
                res.send(error);
                return [3 /*break*/, 7];
            case 3:
                contactsSelector = {
                    'selector': {
                        "$or": [{
                                "_id": uid
                            },
                            {
                                "id": uid
                            },
                            {
                                "kazooid": uid
                            }
                        ]
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 4:
                _userobj = _a.sent();
                if (!(_userobj && _userobj._id)) return [3 /*break*/, 7];
                return [4 /*yield*/, updatekazoousersettings(payload, req, id, uid)];
            case 5:
                kazooupdateresult = _a.sent();
                console.log("start notify user setting", kazooupdateresult);
                return [4 /*yield*/, updatenotifyusersettings(accountDb, _userobj, payload, true, property, req)];
            case 6:
                notifyupdateresult = _a.sent();
                serverlog("info", req['decoded'].user_id + " created  updated settings for (" + _userobj.email + ")", "create schedule");
                res.send(_userobj);
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
//create users update  email  settings
app.put('/updatenotifyuseremailsettings/:comapnyid/:userid', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, accountDbName, accountDb, userid, payload, emaildatalist, i, emaildata, callflowoptiontype, contactsSelector, _userobj, notifyupdateresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.comapnyid;
                accountDbName = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(accountDbName);
                userid = req.params.userid;
                payload = JSON.parse(req.body.payload);
                emaildatalist = payload.emaildatalist;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < emaildatalist.length)) return [3 /*break*/, 6];
                emaildata = emaildatalist[i];
                callflowoptiontype = emaildata.callflowdata.callflowoptiontype;
                if (!(callflowoptiontype && callflowoptiontype.toLowerCase() === "fwd message")) return [3 /*break*/, 3];
                //update voicemail box 
                return [4 /*yield*/, updatefwdmessagevoicemaileemailsettings(req, emaildata)];
            case 2:
                //update voicemail box 
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!(callflowoptiontype && callflowoptiontype.toLowerCase() === "escalation")) return [3 /*break*/, 5];
                return [4 /*yield*/, insertescalationemaillist(emaildata, emaildata.callflowdata.callflowoption, userid)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6:
                contactsSelector = {
                    'selector': {
                        "id": userid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 7:
                _userobj = _a.sent();
                if (!(_userobj && _userobj._id)) return [3 /*break*/, 9];
                return [4 /*yield*/, updatenotifyuseremailsettings(accountDb, _userobj, payload)];
            case 8:
                notifyupdateresult = _a.sent();
                res.send(_userobj);
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
//create user get
app.get('/presenceid/:username', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var accountId, userid, username;
    return __generator(this, function (_a) {
        accountId = req['decoded'].account_id;
        userid = req['decoded'].user_id;
        username = req.params.username;
        serverlog("info", username + " login in to " + accountId, "login");
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + accountId + "/users/" + userid, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
            var userdata, companyid, accountdbname, accountDb, contactsSelector, _userobj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err) {
                            res.send(err);
                        }
                        body = JSON.parse(body);
                        userdata = body.data;
                        if (!userdata.cid) return [3 /*break*/, 2];
                        companyid = userdata.cid;
                        accountdbname = parseAccountToDatabaseName(companyid);
                        accountDb = nano.use(accountdbname);
                        contactsSelector = {
                            'selector': {
                                "email": req.params.username
                            },
                            limit: 30000
                        };
                        return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
                    case 1:
                        _userobj = _a.sent();
                        if (_userobj) {
                            _userobj.passwordreset = userdata.passwordreset ? userdata.passwordreset : false;
                            res.send(_userobj);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        userdata.flags = ['c'];
                        res.send(userdata);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//create users get settings
app.get('/getnotifyusersettings/:id/:userid', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var uid, contactsSelector, propertyid, property, comapnyid, accountDb, _userobj, result, userdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = req.params.userid;
                contactsSelector = {
                    'selector': { "$or": [{
                                "kazooid": uid
                            },
                            { "id": uid }
                        ]
                    },
                    limit: 30000
                };
                propertyid = req.params.id;
                return [4 /*yield*/, findPropertydocument(propertyid)];
            case 1:
                property = _a.sent();
                comapnyid = property && property.companyid ? property.companyid : propertyid;
                accountDb = nano.use(parseAccountToDatabaseName(comapnyid));
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 2:
                _userobj = _a.sent();
                if (_userobj) {
                    userdata = _userobj;
                    //    console.log('\n\n\n body ', JSON.stringify(userdata));
                    result = { data: {
                            fullname: userdata.first_name + '  ' + userdata.last_name,
                            title: userdata.title ? userdata.title : '',
                            timezone: userdata.timezone ? userdata.timezone : '',
                            phonesettings: userdata.phonesettings ? userdata.phonesettings : { settings: [] },
                            smssettings: userdata.smssettings ? userdata.smssettings : { settings: [] },
                            emailsettings: userdata.emailsettings ? userdata.emailsettings : { settings: [] },
                            pin: userdata.pin ? userdata.pin : '',
                            id: userdata.id,
                            livereplysetting: userdata.livereplysetting ? userdata.livereplysetting : [],
                            notificationrulessetting: userdata.notificationrulessetting ? userdata.notificationrulessetting : [],
                            handoffrulessettings: userdata.handoffrulessettings ? userdata.handoffrulessettings : [],
                            smsagreement: userdata.smsagreement,
                            escalationsettings: userdata.escalationsettings,
                            user_imager: userdata.user_imager ? userdata.user_imager : '',
                            member_image: userdata.member_image ? userdata.member_image : ''
                        }
                    };
                }
                // console.log('\n\n\n result ', JSON.stringify (result));
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
//create user get property users
app.get('/companies/:id/property/:propertyid/users/:page/:limit/:activeuseronly', validateJWT, function (req, res) {
    var companyid = req.params.id;
    var propertyid = req.params.propertyid;
    var page = isNaN(req.params.page) ? 1 : req.params.page;
    var limit = '1000'; //isNaN(req.params.limit) ?  1000:req.params.limit;
    var skip = ((parseInt(page) - 1) * parseInt(limit));
    var accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    console.log("\n propertyid: ", propertyid);
    var activeuseronly = req.params.activeuseronly;
    var contactsSelector = {
        "selector": {
            "$and": [
                {
                    "pvt_type": "user"
                },
                {
                    "notify_enabled": true
                },
                {
                    "$or": [
                        {
                            "propertylist": {
                                "$elemMatch": {
                                    "id": propertyid,
                                    "enabled": true
                                }
                            }
                        },
                        {
                            "user_type": "master"
                        }
                    ]
                }
            ]
        },
        limit: parseInt(limit),
        skip: skip
    };
    if (activeuseronly != "false") {
        var activeusercondition = {
            "notificationrulessetting": {
                "$exists": true
            }
        };
        contactsSelector.selector.$and.push(activeusercondition);
    }
    console.log("property users ", JSON.stringify(contactsSelector));
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /property");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
            res.send(JSON.stringify(result));
        }
    });
});
//create user get non property users
app.get('/companies/:id/properties/:propertyid/users/notadded', validateJWT, function (req, res) {
    var companyid = req.params.id;
    var propertyid = req.params.propertyid;
    var accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    var contactsSelector = {
        "selector": {
            "pvt_type": "user",
            "$or": [
                {
                    "notify_enabled": false
                },
                {
                    "propertylist": {
                        "$allMatch": {
                            "$or": [
                                {
                                    "id": {
                                        "$ne": propertyid
                                    }
                                },
                                {
                                    "enabled": false
                                }
                            ]
                        }
                    }
                }
            ]
        },
        limit: 30000,
        "fields": [
            "id",
            "first_name",
            "last_name",
            "user_type",
            "notify_enabled"
        ]
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /user");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
            res.send(JSON.stringify(result));
        }
    });
});
//create user get non master users
app.get('/companies/:id/masterusers/notadded', validateJWT, function (req, res) {
    var companyid = req.params.id;
    var accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    var contactsSelector = {
        "selector": {
            "pvt_type": "user",
            "notify_enabled": false,
            "user_type": "master"
        },
        limit: 30000,
        "fields": [
            "id",
            "first_name",
            "last_name",
            "user_type",
            "notify_enabled",
            "email",
            "title"
        ]
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /user");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
            res.send(JSON.stringify(result));
        }
    });
});
//create user get masterusers
app.get('/companies/:id/masterusers', validateJWT, function (req, res) {
    var companyid = req.params.id;
    var accountDb = nano.use(parseAccountToDatabaseName(companyid));
    console.log("\n accountDb: ", parseAccountToDatabaseName(companyid));
    var contactsSelector = {
        'selector': { 'user_type': 'master',
            "msteruser": true,
            "notify_enabled": true
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /user");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            res.send(JSON.stringify(result));
        }
    });
});
//notify user managment end 
app.get('/companies/:companyid/properties/added', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.companyid;
                return [4 /*yield*/, getproperties(companyid)];
            case 1:
                result = _a.sent();
                // console.log("\n\n\n properties added\n", result);
                res.statusCode = 200;
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/companies/:companyid/callsummery', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, companydbname, result, call_summery_result_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("callsummery");
                companyid = req.params.companyid;
                companydbname = parseAccountToDatabaseName(companyid);
                return [4 /*yield*/, getcallsummerydata(companydbname)];
            case 1:
                result = _a.sent();
                if (!(result === undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, calculate_company_callsummery(companyid)];
            case 2:
                call_summery_result_data = _a.sent();
                result = {
                    data: call_summery_result_data.data
                };
                _a.label = 3;
            case 3:
                console.log("result11111");
                console.log(JSON.stringify(result));
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.post('/updatecallsummery', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, update_call_summery_data()];
            case 1:
                result = _a.sent();
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/companies/:companyid/properties_avg', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var emrt_data, i_companyid, comp, avg_calldetails, emergency_companydata, company_avg_emrt_data, company_avg_emrt, industry_avg_emrt_list, industry_avg_emrt;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getemrtdata()];
            case 1:
                emrt_data = _a.sent();
                i_companyid = req.params.companyid;
                return [4 /*yield*/, getcompanyInfo(i_companyid)];
            case 2:
                comp = _a.sent();
                avg_calldetails = {
                    property: {
                        company: 0,
                        industry: 0
                    }
                };
                if (emrt_data && emrt_data.data) {
                    emergency_companydata = emrt_data.data;
                    if (emergency_companydata && Array.isArray(emergency_companydata)) {
                        console.log(emergency_companydata);
                        company_avg_emrt_data = emergency_companydata.find(function (c) { return comp.companyid === c.companyid; });
                        company_avg_emrt = company_avg_emrt_data && company_avg_emrt_data.avgemrt ? company_avg_emrt_data.avgemrt : 0;
                        industry_avg_emrt_list = emergency_companydata.filter(function (c) { return comp.industry === c.industry && c.avgemrt; });
                        industry_avg_emrt = d3.mean(industry_avg_emrt_list.map(function (id) { return id.avgemrt; }));
                        avg_calldetails = { property: {
                                company: company_avg_emrt ? company_avg_emrt : 0,
                                industry: industry_avg_emrt ? industry_avg_emrt : 0
                            }
                        };
                    }
                }
                ;
                res.send(avg_calldetails);
                return [2 /*return*/];
        }
    });
}); });
app.get('/companies/:id/properties', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var comanyid, accountchildrenpromiss, accountpromiss, propertiespromiss;
    return __generator(this, function (_a) {
        comanyid = req.params.id;
        accountchildrenpromiss = new Promise(function (resolve, reject) {
            getKazooRequest(req)
                .get(process.env.KAZOO_SERVER + "/v2/accounts/" + comanyid + "/children", function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                var children;
                return __generator(this, function (_a) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                        return [2 /*return*/];
                    }
                    children = JSON.parse(body);
                    resolve(children);
                    return [2 /*return*/];
                });
            }); });
        });
        accountpromiss = new Promise(function (resolve, reject) {
            getKazooRequest(req)
                .get(process.env.KAZOO_SERVER + "/v2/accounts/" + comanyid, function (err, response, body) { return __awaiter(_this, void 0, void 0, function () {
                var account;
                return __generator(this, function (_a) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                        return [2 /*return*/];
                    }
                    account = JSON.parse(body);
                    //  console.log("\n\n\n accounts\n", account);
                    resolve(account);
                    return [2 /*return*/];
                });
            }); });
        });
        propertiespromiss = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var pr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getproperties(comanyid)];
                    case 1:
                        pr = _a.sent();
                        resolve(pr);
                        return [2 /*return*/];
                }
            });
        }); });
        Promise.all([accountchildrenpromiss, accountpromiss, propertiespromiss]).then(function (values) {
            var properties = values[2];
            var accounts = values[0];
            accounts.data.push(values[1].data);
            console.log("\n\n\n accounts\n", accounts);
            if (properties.docs) {
                if (accounts.data) {
                    accounts.data = accounts.data.filter(function (e) {
                        var index = properties.docs.findIndex(function (e1) {
                            return e1.propertyid === e.id;
                        });
                        //    console.log("\nindex ");
                        //console.log("\nindex ",  index)
                        return index < 0;
                    });
                }
            }
            res.send(accounts);
        });
        return [2 /*return*/];
    });
}); });
//storage apis
app.get('/companies/:id/storage', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var account_db_pattern, dbnames, i, dbname, accountid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("storage");
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 5];
                dbname = dbnames[i];
                accountid = parseDatabaseNameToAccount(dbname);
                // await deletekazoostorage(req,accountid)
                console.log("Dbname" + dbname);
                return [4 /*yield*/, creteKazooStorageAttachments(req, accountid)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                ;
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
//create property add users
app.post('/companies/:companyid/properties/:propertyid/addusers', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, propertyid, companyid, propertyname, dbname, accountDb, userlist, contactsSelector, users, userindex, user, propertylist, property, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("addusuers");
                console.log(req.body);
                payload = req.body.payload;
                console.log(payload.data);
                propertyid = req.params.propertyid;
                companyid = req.params.companyid;
                propertyname = payload.data.propertyname;
                dbname = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(dbname);
                userlist = payload.data.userlist;
                contactsSelector = {
                    "selector": {
                        "pvt_type": "user",
                        "id": {
                            "$in": userlist
                        }
                    },
                    "limit": 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, contactsSelector)];
            case 1:
                users = _a.sent();
                userindex = 0;
                _a.label = 2;
            case 2:
                if (!(userindex < users.length)) return [3 /*break*/, 5];
                user = users[userindex];
                if (user.user_type.toLowerCase() === "master") {
                    user.msteruser = true;
                }
                propertylist = user.propertylist ? user.propertylist : [];
                property = propertylist.find(function (p) { return p.id === propertyid; });
                if (property) {
                    property.enabled = true;
                    if (!property.user_type)
                        property.user_type = "basic";
                }
                else {
                    property =
                        {
                            "id": propertyid,
                            "enabled": true,
                            "name": propertyname,
                            "user_type": user.user_type
                        };
                    propertylist.push(property);
                }
                user.notify_enabled = true;
                user.propertylist = propertylist;
                return [4 /*yield*/, insertUser(user, dbname)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                userindex++;
                return [3 /*break*/, 2];
            case 5:
                ;
                console.log("end");
                res.send({
                    status: 201,
                    message: "sucess"
                });
                return [2 /*return*/];
        }
    });
}); });
//create property add masterusers
app.post('/companies/:companyid/addmasterusers', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, companyid, dbname, accountDb, contactsSelector, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = req.body.payload;
                companyid = req.params.companyid;
                dbname = parseAccountToDatabaseName(companyid);
                accountDb = nano.use(dbname);
                contactsSelector = {
                    "selector": {
                        "pvt_type": "user",
                        "id": payload.data.id
                    },
                    "limit": 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                user = _a.sent();
                user.first_name = payload.data.first_name;
                user.last_name = payload.data.last_name;
                user.title = payload.data.title;
                user.notify_enabled = true;
                user.msteruser = true;
                user.user_type = "master";
                return [4 /*yield*/, insertUser(user, dbname)];
            case 2:
                result = _a.sent();
                console.log("end");
                res.send({
                    status: 201,
                    result: result
                });
                return [2 /*return*/];
        }
    });
}); });
//create property
var putDataDevice = {
    "data": {
        "caller_id": { "external": { "number": 1222 } },
        "sip": {
            "password": "",
            "realm": process.env.KAZOO_REALM,
            "username": ""
        },
        "call_restriction": {
            "tollfree_us": {
                "action": "inherit"
            },
            "toll_us": {
                "action": "inherit"
            },
            "emergency": {
                "action": "inherit"
            },
            "caribbean": {
                "action": "inherit"
            },
            "did_us": {
                "action": "inherit"
            },
            "international": {
                "action": "inherit"
            },
            "unknown": {
                "action": "inherit"
            }
        },
        "device_type": "softphone",
        "enabled": true,
        "media": {
            "encryption": {
                "enforce_security": false,
                "methods": []
            },
            "audio": {
                "codecs": ["PCMU", "PCMA"]
            },
            "video": {
                "codecs": []
            }
        },
        "suppress_unregister_notifications": true,
        "name": "",
        "ignore_completed_elsewhere": false,
        "custom_sip_headers": {
            "in": {
                "X-device-header-in": "565658665"
            },
            "out": {
                "X-device-outbound": "16616161611"
            }
        },
        "ui_metadata": {
            "version": "4.3-66",
            "ui": "monster-ui",
            "origin": "voip"
        }
    }
};
var putDataVM = {
    "data": {
        "require_pin": true,
        "check_if_owner": true,
        "name": "manish",
        "mailbox": "122",
        "is_setup": false,
        "skip_greeting": false,
        "skip_instructions": false,
        "delete_after_notify": false,
        "is_voicemail_ff_rw_enabled": false,
        "oldest_message_first": false,
        "media": {},
        "notify_email_addresses": [],
        "not_configurable": false,
        "ui_metadata": {
            "version": "4.3-66",
            "ui": "monster-ui",
            "origin": "voip"
        }
    }
};
var getdevices = function (req, propertyid) { return __awaiter(_this, void 0, void 0, function () {
    var devicepromise, devices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                devicepromise = new Promise(function (resolve, reject) {
                    getKazooRequest(req)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + propertyid + "/devices", function (err, response, body) {
                        //    console.log("device d0d7c961d8c8d23cfe17982ddb9153fd", JSON.parse (body).data);
                        resolve(JSON.parse(body).data);
                    });
                });
                return [4 /*yield*/, devicepromise];
            case 1:
                devices = _a.sent();
                return [2 /*return*/, devices];
        }
    });
}); };
var getvoicemaibox = function (req, propertyid) { return __awaiter(_this, void 0, void 0, function () {
    var devicepromise, devices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                devicepromise = new Promise(function (resolve, reject) {
                    getKazooRequest(req)
                        .get(process.env.KAZOO_SERVER + "/v2/accounts/" + propertyid + "/vmboxes?paginate=false", function (err, response, body) {
                        resolve(JSON.parse(body).data);
                    });
                });
                return [4 /*yield*/, devicepromise];
            case 1:
                devices = _a.sent();
                return [2 /*return*/, devices];
        }
    });
}); };
var createDeviceInKazoo = function (req, propertyid, putDataDevice) { return __awaiter(_this, void 0, void 0, function () {
    var kazoodevicepromise, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kazoodevicepromise = new Promise(function (resolve, reject) {
                    console.log("createDeviceInKazoo for ", putDataDevice.data.name);
                    var kRequest = getKazooRequest(req)
                        .put({
                        url: process.env.KAZOO_SERVER + "/v2/accounts/" + propertyid + "/devices/",
                        body: putDataDevice,
                        json: true
                    }, function (e, r, b) {
                        if (e) {
                            console.log("error device for ", putDataDevice);
                            resolve(e);
                        }
                        else {
                            console.log("sucess device for ", b.data);
                            ;
                            resolve(b.data.id);
                        }
                    });
                });
                return [4 /*yield*/, kazoodevicepromise];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var setup_free_switch = function (propertyid, didnumber, propertydeviceusernamesuffix, callflowdeviceusernamesuffix, password, realm) {
    return __awaiter(this, void 0, void 0, function () {
        var loginresponse, apikey, freeswitchdevice, freeswitch_property_device_data, freeswitch_voice_messagebox_payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, free_switch_login()];
                case 1:
                    loginresponse = _a.sent();
                    apikey = loginresponse.data.token;
                    console.log("setup_free_switch didnumber ", didnumber);
                    //device creattion
                    console.log("free_switch_create_device");
                    return [4 /*yield*/, free_switch_create_device(apikey, didnumber, password, realm, callflowdeviceusernamesuffix)];
                case 2:
                    freeswitchdevice = _a.sent();
                    freeswitch_property_device_data = {
                        "propertyId": propertyid,
                        "didnumber": didnumber,
                        "username": didnumber + propertydeviceusernamesuffix,
                        "password": password,
                        "realm": realm
                    };
                    console.log("free_switch_create_property_device");
                    return [4 /*yield*/, free_switch_create_property_device(apikey, freeswitch_property_device_data)];
                case 3:
                    _a.sent();
                    freeswitch_voice_messagebox_payload = {
                        "propertyId": propertyid,
                        "number": didnumber + callflowdeviceusernamesuffix,
                        "didnumber": didnumber + propertydeviceusernamesuffix,
                        "realm": realm
                    };
                    console.log("free_switch_create_voicemessagebox ", freeswitch_voice_messagebox_payload);
                    return [4 /*yield*/, free_switch_create_voicemessagebox(apikey, freeswitch_voice_messagebox_payload)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
//const createpropertydevice =  async () 
var createdevice = function (req, payload, accountdevice, escalationlist, suffix, realm) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                var devices;
                return __generator(this, function (_a) {
                    devices = [];
                    escalationlist.forEach(function (clp) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            devices.push(new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var propertydeviceusernamesuffix, callflowdeviceusernamesuffix, usernamesuffix, device, ext_num, deviceid;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            propertydeviceusernamesuffix = "_" + clp.callflowoption + "_property";
                                            callflowdeviceusernamesuffix = "_" + clp.callflowoption + "_Callflow";
                                            clp.propertydeviceusername = clp.didnumber + propertydeviceusernamesuffix;
                                            clp.propertydevicecallerid = payload.phone;
                                            clp.propertydevicecallerid = clp.didnumber;
                                            clp.didnumber = clp.didnumber.replace("+1", "");
                                            clp.propertydeviceusername = clp.didnumber + propertydeviceusernamesuffix;
                                            clp.callflowdeviceusername = clp.didnumber + callflowdeviceusernamesuffix;
                                            usernamesuffix = suffix == 1 ? callflowdeviceusernamesuffix : propertydeviceusernamesuffix;
                                            putDataDevice.data.name = clp.didnumber + usernamesuffix; //suffix ==="1"? clp.didnumber:payload.phone ; 
                                            putDataDevice.data.sip.username = clp.didnumber + usernamesuffix;
                                            putDataDevice.data.sip.password = clp.password;
                                            device = accountdevice.find(function (d) { return d.name === putDataDevice.data.name; });
                                            console.log(putDataDevice.data.name);
                                            if (!device) return [3 /*break*/, 1];
                                            console.log(" device found ", device);
                                            clp["deviceid" + suffix] = device.id;
                                            resolve(device.id);
                                            return [3 /*break*/, 5];
                                        case 1:
                                            //console.log("createDeviceInKazoo 111");
                                            putDataDevice.data.caller_id.external.number = suffix === "1" ? clp.didnumber : payload.phone;
                                            putDataDevice.data.caller_id.external.name = payload.phone;
                                            if (suffix === "1")
                                                putDataDevice.data.caller_id.external.name += "_" + clp.callflowoption;
                                            ext_num = putDataDevice.data.caller_id.external.number;
                                            console.log("ext_num ", ext_num);
                                            if (ext_num.indexOf("+1") != 0)
                                                putDataDevice.data.caller_id.external.number = "+1" + ext_num;
                                            putDataDevice.data.sip.realm = realm;
                                            return [4 /*yield*/, createDeviceInKazoo(req, payload.propertyid, putDataDevice)];
                                        case 2:
                                            deviceid = _a.sent();
                                            if (!(deviceid && suffix != 1)) return [3 /*break*/, 4];
                                            console.log("calling free switch ");
                                            return [4 /*yield*/, setup_free_switch(payload.propertyid, clp.didnumber, propertydeviceusernamesuffix, callflowdeviceusernamesuffix, clp.password, realm)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4:
                                            // clp.didnumber=didnum;
                                            clp["deviceid" + suffix] = deviceid;
                                            resolve(deviceid);
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); }));
                            return [2 /*return*/];
                        });
                    }); });
                    Promise.all(devices).then(function (results) {
                        // console.log(`Finished Kazoo Requests`);
                        console.log("\n returning devices");
                        resolve(results);
                    })["catch"](function (err) {
                        reject(err);
                    });
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
var createvoicemessage = function (req, payload, accountVM) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var vmboxes, escalationlist;
                return __generator(this, function (_a) {
                    vmboxes = [];
                    escalationlist = payload.callflowdata.filter(function (cl) { return cl.callflowoptiontype.toLowerCase() === "fwd message"; });
                    escalationlist.forEach(function (clp) {
                        vmboxes.push(new Promise(function (resolve, reject) {
                            //  console.log("creating device for ",clp.callflowoption);
                            putDataVM.data.name = "" + clp.callflowoption;
                            putDataVM.data.mailbox = "" + clp.callflowoption;
                            var vm = accountVM ? accountVM.find(function (d) { return d.name === putDataVM.data.name; }) : undefined;
                            if (vm) {
                                console.log(" device found ", vm.id);
                                clp.deviceid = vm.id;
                                resolve(vm.id);
                            }
                            else {
                                var kRequest = getKazooRequest(req)
                                    .put({
                                    url: process.env.KAZOO_SERVER + "/v2/accounts/" + payload.propertyid + "/vmboxes",
                                    body: putDataVM,
                                    json: true
                                }, function (e, r, b) {
                                    if (e) {
                                        console.log("error device for ", clp.username);
                                        resolve(e);
                                    }
                                    else {
                                        //    console.log("sucess device for ",clp.username);
                                        clp.deviceid = b.data.id;
                                        resolve(b.data.id);
                                    }
                                });
                            }
                        }));
                    });
                    Promise.all(vmboxes).then(function (results) {
                        // console.log(`Finished Kazoo Requests`);
                        console.log("\n returning devices");
                        resolve(results);
                    })["catch"](function (err) {
                        reject(err);
                    });
                    return [2 /*return*/];
                });
            }); })];
    });
}); };
app.post('/companies/:id/properties', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, payload, propertyid, devices, escalationlist, account, realm, vmbox, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.id;
                payload = JSON.parse(req.body.payload);
                propertyid = payload.propertyid;
                return [4 /*yield*/, getdevices(req, payload.propertyid)];
            case 1:
                devices = _a.sent();
                escalationlist = payload.callflowdata.filter(function (cl) { return cl.callflowoptiontype.toLowerCase() === "escalation"; });
                return [4 /*yield*/, getkazooaccountinfo(req, payload.propertyid)];
            case 2:
                account = _a.sent();
                console.log("account.realm ", account.data.realm);
                realm = account.data.realm;
                return [4 /*yield*/, createdevice(req, payload, devices, escalationlist, "1", realm)];
            case 3:
                _a.sent();
                return [4 /*yield*/, createdevice(req, payload, devices, escalationlist, "", realm)];
            case 4:
                _a.sent();
                payload.kazoopropertyname = account.data.name;
                return [4 /*yield*/, getvoicemaibox(req, payload.propertyid)];
            case 5:
                vmbox = _a.sent();
                return [4 /*yield*/, createvoicemessage(req, payload, vmbox)];
            case 6:
                _a.sent();
                return [4 /*yield*/, insertproperty(payload, companyid, req)];
            case 7:
                result = _a.sent();
                if (!(companyid != propertyid)) return [3 /*break*/, 9];
                return [4 /*yield*/, insertproperty(payload, propertyid, req)];
            case 8:
                result = _a.sent();
                _a.label = 9;
            case 9:
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app["delete"]('/companies/:companyid/properties/:id', validateJWT, function (req, res) {
    console.log("\n\n delete interview");
    var id = req.params.id;
    var companyid = req.params.companyid;
    console.log("\n\ncompanyid : ", companyid);
    console.log("\n\n id", id);
    var accountDb = nano.use(parseAccountToDatabaseName(companyid));
    accountDb.get(id, function (err, _proerty) {
        if (err) {
            res.send(err);
        }
        else {
            _proerty.enabled = false;
            accountDb.insert(_proerty, function (err, body) {
                if (err) {
                    res.send(err);
                }
                else {
                    console.log("property updated succefully");
                    res.send("sucsess");
                }
            });
        }
    });
});
app.post('/companies/:companyid/properties/:propertyid/schedules/:id', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, propertyid, scheduleid, payload, dbname, result, property, messageinfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("why this");
                companyid = req.params.companyid;
                propertyid = req.params.propertyid;
                scheduleid = req.params.id;
                payload = JSON.parse(req.body.payload);
                dbname = parseAccountToDatabaseName(propertyid);
                result = insertschedule(payload, dbname);
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                messageinfo = "User " + req['decoded'].user_id + " edited  scheduling  in (" + property.propertyname + ")";
                console.log(messageinfo);
                serverlog("info", messageinfo, "edit schedule");
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.post('/companies/:companyid/properties/:propertyid/adjustschedules/:id', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, propertyid, scheduleid, payload, dbname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\nadjust schedules\n");
                companyid = req.params.companyid;
                propertyid = req.params.propertyid;
                scheduleid = req.params.id;
                payload = JSON.parse(req.body.payload);
                dbname = parseAccountToDatabaseName(propertyid);
                return [4 /*yield*/, insertadjustschedule(payload, dbname)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/companies/:companyid/properties/:propertyid/schedules/:optiontype', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, optiontype, accountDbName, accountDb, result, schedulelist, dayschedulelist, adjustschedulelist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
                console.log("\n schedules111: ");
                propertyid = req.params.propertyid;
                optiontype = req.params.optiontype;
                accountDbName = parseAccountToDatabaseName(propertyid);
                accountDb = nano.use(accountDbName);
                result = [];
                return [4 /*yield*/, getSchedule_for_callflowsoptiontype(accountDb, optiontype, "schedule")];
            case 1:
                schedulelist = _a.sent();
                return [4 /*yield*/, getSchedule_for_callflowsoptiontype(accountDb, optiontype, "dayschedule")];
            case 2:
                dayschedulelist = _a.sent();
                return [4 /*yield*/, getSchedule_for_callflowsoptiontype(accountDb, optiontype, "adjustschedule")];
            case 3:
                adjustschedulelist = _a.sent();
                if (Array.isArray(schedulelist)) {
                    result.push.apply(result, schedulelist);
                }
                if (Array.isArray(dayschedulelist)) {
                    result.push.apply(result, dayschedulelist);
                }
                if (Array.isArray(adjustschedulelist)) {
                    result.push.apply(result, adjustschedulelist);
                }
                res.statusCode = 200;
                // console.log("\nschedule Plumbing:",JSON.stringify( result));
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.post('/companies/:companyid/properties/:propertyid/dayschedules', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, payload, dbname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\ndayschedules\n");
                propertyid = req.params.propertyid;
                payload = JSON.parse(req.body.payload);
                dbname = parseAccountToDatabaseName(propertyid);
                return [4 /*yield*/, insertdayschedule(payload, dbname)];
            case 1:
                result = _a.sent();
                console.log("days schedule return  ", result);
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.post('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, payload, dbname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\nescalationuserlist\n");
                propertyid = req.params.propertyid;
                payload = JSON.parse(req.body.payload);
                dbname = parseAccountToDatabaseName(propertyid);
                return [4 /*yield*/, insertescalationuserlist(payload, dbname)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, function (req, res) {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n escalationuserlist: ");
    var propertyid = req.params.propertyid;
    var accountDbName = parseAccountToDatabaseName(propertyid);
    var accountDb = nano.use(accountDbName);
    console.log("\n accountDb: ", accountDbName);
    console.log("\n propertyid: ", propertyid);
    var contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /", accountDbName);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            // console.log("\nescalationuserlist ", JSON.stringify(result.docs));
            res.send(result.docs);
        }
    });
});
var getSchedule_for_callflowsoptiontype = function (accountDb, callflowsoptiontype, scheduletype) { return __awaiter(_this, void 0, void 0, function () {
    var scheduleselector, schdulelist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scheduleselector = {
                    "selector": {
                        "callflowsoptiontype": callflowsoptiontype,
                        "pvt_type": scheduletype,
                        "enabled": true
                    },
                    "limit": 3000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(accountDb, scheduleselector)];
            case 1:
                schdulelist = _a.sent();
                return [2 /*return*/, schdulelist];
        }
    });
}); };
var findAdjustSchedule = function (timezone, callflowoption, accountDb) { return __awaiter(_this, void 0, void 0, function () {
    var startoftheday, contactsSelector, adjustSchedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startoftheday = moment().tz(timezone).startOf('day').unix();
                console.log("startoftheday");
                console.log(startoftheday);
                contactsSelector = {
                    "selector": {
                        "pvt_type": "adjustschedule",
                        "adjustdate_unix": startoftheday,
                        "callflowsoptiontype": callflowoption
                    }
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                adjustSchedule = _a.sent();
                return [2 /*return*/, adjustSchedule];
        }
    });
}); };
var findSchedules = function (accountDb, isliveschedule, didnumber, property, company) { return __awaiter(_this, void 0, void 0, function () {
    var timezone, callflowdatalist, callflowdata, callflowoption, adjustSchedule, currendatettime, currentminute, currenthour, currenttime, prevdaytime, todaysday, yesterday, schedulelist, adjustDaySchedule, contactsSelector, document, restricschedules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timezone = property.timezone ? property.timezone : company.timezone;
                didnumber = didnumber.substring(0, 10);
                callflowdatalist = property.callflowdata;
                callflowdata = callflowdatalist.find(function (cl) { return cl.didnumber === didnumber; });
                callflowoption = callflowdata.callflowoption ? callflowdata.callflowoption : "";
                return [4 /*yield*/, findAdjustSchedule(timezone, callflowoption, accountDb)];
            case 1:
                adjustSchedule = _a.sent();
                currendatettime = moment().tz(timezone);
                currentminute = currendatettime.format("mm");
                currenthour = currendatettime.format("HH");
                currenttime = Number(currenthour + "." + currentminute);
                prevdaytime = currenttime + 24;
                todaysday = currendatettime.format('dddd').toLowerCase();
                yesterday = currendatettime.add(-1, 'days').format('dddd').toLowerCase();
                schedulelist = [];
                if (!(adjustSchedule && adjustSchedule.data)) return [3 /*break*/, 2];
                adjustDaySchedule = adjustSchedule.data.find(function (sch) { return sch.livereply === isliveschedule
                    && sch.ifrom <= prevdaytime
                    && sch.ito > prevdaytime; });
                if (adjustDaySchedule) {
                    schedulelist.push(adjustDaySchedule);
                }
                return [3 /*break*/, 4];
            case 2:
                contactsSelector = {
                    "selector": {
                        "pvt_type": "schedule",
                        "callflowsoptiontype": callflowoption
                    }
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 3:
                document = _a.sent();
                if (document && document.data && document.data.length > 0) {
                    restricschedules = document.data.filter(function (sch) { return sch.livereply === isliveschedule
                        && sch.enabled
                        && (sch.days[todaysday] || sch.days[yesterday])
                        && sch.restricted
                        && sch.livereply === isliveschedule; });
                    // console.log(JSON.stringify (restricschedules));
                    restricschedules.forEach(function (rsch) {
                        if (schedulelist.length <= 0) {
                            /**/
                            var dayrestrictschedule = rsch.restrictedschedule
                                .find(function (drsch) {
                                return drsch.day === todaysday
                                    && drsch.ifrom <= currenttime
                                    && drsch.ito > currenttime;
                            });
                            if (!dayrestrictschedule) {
                                dayrestrictschedule = rsch.restrictedschedule
                                    .find(function (drsch) {
                                    return drsch.day === yesterday
                                        && drsch.ifrom <= prevdaytime
                                        && drsch.ito > prevdaytime;
                                });
                                if (dayrestrictschedule)
                                    rsch.ispreviousday = true;
                            }
                            if (dayrestrictschedule)
                                schedulelist.push(rsch);
                        }
                    });
                    if (schedulelist.length <= 0) {
                        schedulelist = document.data.filter(function (sch) { return sch.livereply === isliveschedule
                            && sch.enabled
                            && sch.days[todaysday]
                            && !sch.restricted
                            && ((sch.ifrom <= currenttime && sch.ito > currenttime)); });
                        if (schedulelist.length <= 0) {
                            schedulelist = document.data.filter(function (sch) { return sch.livereply === isliveschedule
                                && sch.enabled
                                && sch.days[yesterday]
                                && !sch.restricted
                                && sch.ifrom <= prevdaytime && sch.ito > prevdaytime; });
                            if (schedulelist.length > 0)
                                schedulelist[schedulelist.length - 1].ispreviousday = true;
                        }
                    }
                }
                _a.label = 4;
            case 4:
                console.log("schedulelist length ", schedulelist.length);
                return [2 /*return*/, schedulelist];
        }
    });
}); };
var getpropertycallflowoptions = function (didnumber, property) {
    return __awaiter(this, void 0, void 0, function () {
        var callflowdatalist, callflowdata, callflowoption;
        return __generator(this, function (_a) {
            didnumber = didnumber.substring(0, 10);
            callflowdatalist = property.callflowdata;
            callflowdata = callflowdatalist.find(function (cl) { return cl.didnumber === didnumber; });
            callflowoption = callflowdata.callflowoption ? callflowdata.callflowoption : "";
            return [2 /*return*/, callflowoption];
        });
    });
};
var findSchedule = function (accountDb, isliveschedule, didnumber, property, company) { return __awaiter(_this, void 0, void 0, function () {
    var callflowsoptiontype, schedulelist, schedulelistlength, scheduledocument;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getpropertycallflowoptions(didnumber, property)];
            case 1:
                callflowsoptiontype = _a.sent();
                return [4 /*yield*/, findSchedules(accountDb, isliveschedule, didnumber, property, company)];
            case 2:
                schedulelist = _a.sent();
                schedulelistlength = schedulelist.length;
                scheduledocument = schedulelistlength > 0 ? schedulelist[schedulelistlength - 1] : undefined;
                if (scheduledocument)
                    scheduledocument.callflowsoptiontype = callflowsoptiontype;
                return [2 /*return*/, scheduledocument];
        }
    });
}); };
var findNotifyEscalationSettings = function (property) { return __awaiter(_this, void 0, void 0, function () {
    var accountDb, contactsSelector_1, escalationSettings, escalationList, propertyid_1, escalationSettingsdocs, escalationSettingsdocs_filter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(property && property.companyid)) return [3 /*break*/, 2];
                accountDb = nano.use(parseAccountToDatabaseName(property.companyid));
                contactsSelector_1 = {
                    "selector": {
                        "escalationsettings.0": {
                            "$gt": 0
                        },
                        "notify_enabled": true
                    },
                    "fields": [
                        "_id",
                        "id",
                        "first_name",
                        "last_name",
                        "escalationsettings",
                        "msteruser",
                        "propertylist"
                    ],
                    "limit": 3000
                };
                escalationSettings = new Promise(function (resolve, reject) {
                    // console.log(currentUserSelector);
                    accountDb.find(contactsSelector_1, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        try {
                            // console.log(`Found ${result.docs.length} docs for these users`);
                            resolve(result.docs);
                        }
                        catch (e) {
                            // console.error(`Couldn't fetch users (${userIds}) from the database`);
                            resolve([]);
                        }
                    });
                });
                escalationList = [];
                propertyid_1 = property.propertyid;
                return [4 /*yield*/, escalationSettings];
            case 1:
                escalationSettingsdocs = _a.sent();
                escalationSettingsdocs_filter = escalationSettingsdocs.filter(function (es) { return es.msteruser ||
                    (es.propertylist && es.propertylist.find(function (p) { return p.id === propertyid_1 && p.enabled; })); });
                escalationSettingsdocs_filter.forEach(function (setting) {
                    setting.escalationsettings.forEach(function (escalationsetting) {
                        var temp = {
                            "name": setting.first_name + " " + setting.last_name,
                            "waittime": escalationsetting.time * 60,
                            "callingnumber": "+1" + escalationsetting.number,
                            "type": "sms"
                        };
                        escalationList.push(temp);
                    });
                });
                return [2 /*return*/, escalationList];
            case 2: return [2 /*return*/, []];
        }
    });
}); };
var updateemrtdata = function () { return __awaiter(_this, void 0, void 0, function () {
    var now_unix, emergency_companydata, account_db_pattern, dbnames, i, dbname, companyid, company, companyreportdocs, emrgency_companyreportdocs, emergency_company_propertydata, emergency_company_company_avg_emrt, emrt_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now_unix = moment().utc().unix();
                emergency_companydata = [];
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 6];
                dbname = dbnames[i];
                console.log(dbname);
                companyid = parseDatabaseNameToAccount(dbname);
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 3:
                company = _a.sent();
                if (!(company && company.companyid)) return [3 /*break*/, 5];
                return [4 /*yield*/, getmonthreportdata(companyid)];
            case 4:
                companyreportdocs = _a.sent();
                emrgency_companyreportdocs = companyreportdocs.filter(function (r) { return r.type &&
                    r.type.toLowerCase() === "emergency"
                    && !isNaN(r.responsetime) && r.responsetime > 0; });
                emergency_company_propertydata = d3c.nest()
                    .key(function (d) { return d.propertyid; })
                    .rollup(function (v) {
                    return {
                        avg_emrt: d3.mean(v, function (d) { return isNaN(d.responsetime) ? 0 : d.responsetime; })
                    };
                })
                    .entries(emrgency_companyreportdocs);
                emergency_company_company_avg_emrt = d3.mean(emergency_company_propertydata.map(function (da) { return da.value.avg_emrt; }));
                emergency_companydata.push({
                    companyid: company.companyid,
                    companyname: company.companyname,
                    industry: company.industry,
                    avgemrt: emergency_company_company_avg_emrt
                });
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6:
                ;
                emrt_data = {
                    timestamp: now_unix,
                    data: emergency_companydata
                };
                console.log("emrt_data");
                console.log(JSON.stringify(emrt_data));
                return [4 /*yield*/, insertemrtdata(emrt_data)];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getScheduleforProperty = function (propertydb) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, schedulelist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    'selector': {
                        "pvt_type": "schedule",
                        "enabled": true
                    }
                };
                return [4 /*yield*/, getalldocumentsbyproperty(propertydb, contactsSelector)];
            case 1:
                schedulelist = _a.sent();
                return [2 /*return*/, schedulelist];
        }
    });
}); };
var handoffrule = function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var reportrunningUTCTime, next_run_report_time, account_db_pattern, dbnames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reportrunningUTCTime = moment().utc();
                console.log(reportrunningUTCTime.format("DD:mm:YYYY HH:mm:ss z"));
                next_run_report_time = reportrunningUTCTime.clone().add(455, 'minutes');
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); }); // && d==='nt_account/2d/67/08f277a137338e4c5815c24962f9');
                dbnames.forEach(function (dbname) { return __awaiter(_this, void 0, void 0, function () {
                    var propertyid, property, timezone, starttime, endtime, scheduleday1, scheduleday2, propertydb, property_schedulelist, property_day_schedules, property_schedule_index, property_schedule, datalist, day_schedules, reporttime_utc_unix;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                propertyid = parseDatabaseNameToAccount(dbname);
                                return [4 /*yield*/, getpropertyInfo(propertyid)];
                            case 1:
                                property = _a.sent();
                                if (!property) return [3 /*break*/, 4];
                                timezone = property.timezone;
                                starttime = reportrunningUTCTime.clone().tz(timezone);
                                endtime = starttime.clone().add(455, 'minutes');
                                scheduleday1 = starttime.format('dddd').toLowerCase();
                                scheduleday2 = endtime.format('dddd').toLowerCase();
                                propertydb = nano.use(dbname);
                                return [4 /*yield*/, getScheduleforProperty(propertydb)];
                            case 2:
                                property_schedulelist = _a.sent();
                                property_day_schedules = [];
                                for (property_schedule_index = 0; property_schedule_index < property_schedulelist.length; property_schedule_index++) {
                                    property_schedule = property_schedulelist[property_schedule_index];
                                    datalist = property_schedule.data;
                                    day_schedules = datalist.filter(function (data) { return data.days[scheduleday1]
                                        || data.days[scheduleday2]; });
                                    property_day_schedules.push.apply(property_day_schedules, day_schedules);
                                }
                                reporttime_utc_unix = reportrunningUTCTime.unix();
                                // const endtime_utc_unix=  reportrunningUTCTime.clone().add(455, 'minutes').unix(); 
                                return [4 /*yield*/, handoffruleforproperty(property, property_day_schedules, reporttime_utc_unix)];
                            case 3:
                                // const endtime_utc_unix=  reportrunningUTCTime.clone().add(455, 'minutes').unix(); 
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var handoffruleforproperty = function (property, property_day_schedules_list, reporttime_utc_unix) { return __awaiter(_this, void 0, void 0, function () {
    var starttime_d, starttime_unix, endtime_d, endtime_unix, company, dayschedules, _loop_4, from_hh, schedule_start_time, to_hh, userdocs, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                starttime_d = moment().tz(property.timezone).startOf('day');
                starttime_unix = starttime_d.unix();
                endtime_d = starttime_d.clone().add(1, "days").add(455, "minutes");
                endtime_unix = endtime_d.unix();
                return [4 /*yield*/, getcompanyInfo(property.companyid)];
            case 1:
                company = _a.sent();
                return [4 /*yield*/, findUsersForhandOffRules(property, starttime_unix, endtime_unix)];
            case 2:
                dayschedules = _a.sent();
                _loop_4 = function () {
                    var dayschedule, property_day_schedule, from_mm, from_a, to_mm, to_a, schedule_end_time, datetimeunix, enddatetimeunix, schedulefromtimediffrence, scheduleendtimediffrence, users, userIds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                dayschedule = dayschedules[i];
                                property_day_schedule = property_day_schedules_list.find(function (pd) { return pd.scheduleid === dayschedule.scheduleid; });
                                if (!property_day_schedule) return [3 /*break*/, 3];
                                from_hh = parseInt(property_day_schedule.from.hh);
                                from_mm = parseInt(property_day_schedule.from.mm);
                                from_a = property_day_schedule.from.a;
                                if (from_a === "pm" && from_hh < 12) {
                                    from_hh += 12;
                                }
                                schedule_start_time = starttime_d.clone().add(from_hh, "hours").add(from_mm, "minutes");
                                to_hh = parseInt(property_day_schedule.to.hh);
                                to_mm = parseInt(property_day_schedule.to.mm);
                                to_a = property_day_schedule.to.a;
                                if (to_a === "pm" && to_hh < 12) {
                                    to_hh += 12;
                                }
                                schedule_end_time = starttime_d.clone().add(to_hh, "hours").add(to_mm, "minutes");
                                datetimeunix = schedule_start_time.utc().unix();
                                enddatetimeunix = schedule_end_time.utc().unix();
                                schedulefromtimediffrence = (datetimeunix - reporttime_utc_unix) / 60;
                                scheduleendtimediffrence = (enddatetimeunix - reporttime_utc_unix) / 60;
                                users = dayschedule.users;
                                userIds = users.map(function (a) { return a.key; });
                                console.log(JSON.stringify(userIds));
                                return [4 /*yield*/, findDayScheduleuserlist(userIds, property)];
                            case 1:
                                userdocs = _a.sent();
                                return [4 /*yield*/, sendhandoffrulesmessage(userdocs, dayschedule, property, schedulefromtimediffrence, scheduleendtimediffrence)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < dayschedules.length)) return [3 /*break*/, 6];
                return [5 /*yield**/, _loop_4()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
var sendhandoffrulesmessage = function (userdocs, dayscheule, property, schedulefromtimediffrence, scheduleendtimediffrence) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        userdocs.forEach(function (user) {
            var handoffrulessettings = user.handoffrulessettings;
            if (handoffrulessettings) {
                handoffrulessettings = handoffrulessettings
                    .filter(function (h) { return h.call.toLowerCase() === "on"
                    || h.call.toLowerCase() === "off"; });
                handoffrulessettings.forEach(function (setting) { return __awaiter(_this, void 0, void 0, function () {
                    var ruletype, time, diffrencetime, timediffrence, number, propertyname, schedulename, message, messaging_number, from, payload;
                    return __generator(this, function (_a) {
                        ruletype = setting.call.toLowerCase();
                        time = parseInt(setting.time);
                        diffrencetime = ruletype === "on" ?
                            schedulefromtimediffrence
                            : scheduleendtimediffrence;
                        timediffrence = diffrencetime - time;
                        console.log("timediffrence");
                        console.log(timediffrence);
                        if (timediffrence <= 14 && timediffrence > 0) {
                            number = setting.number.toString();
                            propertyname = property.propertyname;
                            schedulename = dayscheule.callflowsoptiontype;
                            message = "You\u2019re " + ruletype + " call in " + time + " minutes for " + propertyname + " " + schedulename;
                            messaging_number = process.env.MESSAGINGNUMBER;
                            from = messaging_number;
                            number = number.indexOf("+1") >= 0 ? number : "+1" + number;
                            payload = {
                                "from": from,
                                "to": number,
                                "messagetext": message
                            };
                            console.log("sendig message " + message);
                            sendNotifySMS(payload);
                        }
                        return [2 /*return*/];
                    });
                }); });
            }
        });
        return [2 /*return*/];
    });
}); };
var findUsersForhandOffRules = function (property, starttime_utc_unix, endtime_utc_unix) { return __awaiter(_this, void 0, void 0, function () {
    var propertydbname, propertydb, contactsSelector, dayscheules;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                propertydbname = parseAccountToDatabaseName(property.propertyid);
                propertydb = nano.use(propertydbname);
                contactsSelector = {
                    "selector": {
                        "pvt_type": "dayschedule",
                        "$or": [{ "datetimeunix": {
                                    "$gt": starttime_utc_unix,
                                    "$lt": endtime_utc_unix
                                }
                            },
                            {
                                "enddatetimeunix": {
                                    "$gt": starttime_utc_unix,
                                    "$lt": endtime_utc_unix
                                }
                            }
                        ],
                        "users.0": {
                            "$gt": 0
                        }
                    }
                };
                console.log(JSON.stringify(contactsSelector));
                return [4 /*yield*/, getalldocumentsbyproperty(propertydb, contactsSelector)];
            case 1:
                dayscheules = _a.sent();
                return [2 /*return*/, dayscheules];
        }
    });
}); };
var setHandOfffRuleJob = function () {
    // handoffrule();
    console.log(moment().utc().format());
    cron.schedule('0 10,25,40,55 * * * *', function () {
        console.log('running handoff rule');
        handoffrule();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var setSyncReportJob = function () {
    // handoffrule();
    console.log(moment().utc().format());
    cron.schedule('0 5,10,15,20,25,30,35,40,45,50,55 * * * *', function () {
        console.log('running sync report rule');
        unSavedReportToElasticSearch();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var unSavedReport = function () { return __awaiter(_this, void 0, void 0, function () {
    var account_db_pattern, dbnames, i, dbname, companyid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 5];
                dbname = dbnames[i];
                companyid = parseDatabaseNameToAccount(dbname);
                return [4 /*yield*/, fixBrokenCompanyReports(companyid)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
var fixBrokenCompanyReports = function (companyid) { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, company, dbname, comapnydb, callinfologs, k, callinfolog;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    "selector": {
                        "pvt_type": "callinfolog",
                        "reporterror": true
                    }
                };
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 1:
                company = _a.sent();
                dbname = parseAccountToDatabaseName(companyid);
                if (!(company && company.companyid)) return [3 /*break*/, 6];
                console.log(dbname);
                comapnydb = nano.use(dbname);
                return [4 /*yield*/, getalldocumentsbyproperty(comapnydb, contactsSelector)];
            case 2:
                callinfologs = _a.sent();
                k = 0;
                _a.label = 3;
            case 3:
                if (!(k < callinfologs.length)) return [3 /*break*/, 6];
                callinfolog = callinfologs[k];
                if (!(callinfolog && callinfolog.guid)) return [3 /*break*/, 5];
                console.log(JSON.stringify(callinfolog.guid));
                return [4 /*yield*/, parselivecallinfologdataforreport(comapnydb, callinfolog.guid)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                k++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
var unSavedReportToElasticSearch = function () { return __awaiter(_this, void 0, void 0, function () {
    var contactsSelector, account_db_pattern, dbnames, i, dbname, companyid, company, comapnydb, reports, k, reportdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                contactsSelector = {
                    "selector": {
                        "pvt_type": "reportdata",
                        "elasticid": {
                            "$exists": false
                        }
                    }
                };
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 9];
                dbname = dbnames[i];
                companyid = parseDatabaseNameToAccount(dbname);
                return [4 /*yield*/, getcompanyInfo(companyid)];
            case 3:
                company = _a.sent();
                if (!(company && company.companyid)) return [3 /*break*/, 8];
                console.log(dbname);
                comapnydb = nano.use(dbname);
                return [4 /*yield*/, getalldocumentsbyproperty(comapnydb, contactsSelector)];
            case 4:
                reports = _a.sent();
                k = 0;
                _a.label = 5;
            case 5:
                if (!(k < reports.length)) return [3 /*break*/, 8];
                reportdata = reports[k];
                if (!(reportdata && reportdata.guid)) return [3 /*break*/, 7];
                console.log(JSON.stringify(reportdata.guid));
                return [4 /*yield*/, insertreportdatatoelastic(comapnydb, reportdata)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                k++;
                return [3 /*break*/, 5];
            case 8:
                i++;
                return [3 /*break*/, 2];
            case 9: return [2 /*return*/];
        }
    });
}); };
var setScheduleReportJob = function () {
    cron.schedule('0 2,32 * * * *', function () {
        console.log('building ScheduleReport');
        callsummery_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
    //send schedule report on every 30 minutes
    cron.schedule('0 29,59 * * * *', function () {
        console.log('sending ScheduleReport');
        send_callsummery_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var setCallActivityScheduleReportJob = function () {
    cron.schedule('0 5,35 * * * *', function () {
        console.log('building call activity  ScheduleReport');
        callactivity_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
    //send schedule report on every 30 minutes
    cron.schedule('0 1,31 * * * *', function () {
        console.log('sending call activity ScheduleReport');
        send_callactivity_report();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var setUpdateCallSummeryJob = function () {
    cron.schedule('0 1,10,20,30,40,50 * * * *', function () {
        console.log('update call_summery_data');
        update_call_summery_data();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var setUpdateEMRTdataJob = function () {
    cron.schedule('0 1,10,20,30,40,50 * * * *', function () {
        console.log('update EMRT data');
        updateemrtdata();
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    });
};
var checkScheduleCallActivityReport = function () {
    //setInterval(function(){ console.log("Hello"); }, 36000);
    console.log(moment().format("HH:mm:ss"));
    callactivity_report();
    // setInterval(function(){ console.log("Hello");
    // console.log(moment().format("HH:mm:ss"));update_call_summery_data();callsummery_report(); }, 300000);
};
var findAnyNotifyDayScheduleUsers = function (accountDb, didnumber, islivereply, company, property) { return __awaiter(_this, void 0, void 0, function () {
    var callflowsoptiontype, timezone, scheduledate, scheduledate_start_unix, contactsSelector, dayschedulePromise, dayscheduledocs, keyArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("findAnyNotifyDayScheduleUsers");
                return [4 /*yield*/, getpropertycallflowoptions(didnumber, property)];
            case 1:
                callflowsoptiontype = _a.sent();
                timezone = property.timezone ? property.timezone : company.timezone;
                scheduledate = moment().tz(timezone).startOf('day');
                scheduledate = scheduledate.add(+1, 'days');
                scheduledate_start_unix = scheduledate.unix();
                contactsSelector = {
                    "selector": {
                        "pvt_type": "dayschedule",
                        "datetime": {
                            "$lt": scheduledate_start_unix
                        },
                        "users.0": {
                            "$gt": 0
                        },
                        "livereply": false,
                        "callflowsoptiontype": callflowsoptiontype
                    },
                    "sort": [
                        {
                            "datetime": "desc"
                        }
                    ],
                    "limit": 1
                };
                dayschedulePromise = new Promise(function (resolve, reject) {
                    console.log(JSON.stringify(contactsSelector));
                    accountDb.find(contactsSelector, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        try {
                            //console.log(`Found ${result.docs.length} docs for these users`);
                            // var  docresult =result.docs.length>0 ?result.docs[0]: []
                            resolve(result.docs);
                        }
                        catch (e) {
                            console.error("Couldn't fetch users  from the database");
                            resolve([]);
                        }
                    });
                });
                return [4 /*yield*/, dayschedulePromise];
            case 2:
                dayscheduledocs = _a.sent();
                console.log(dayscheduledocs);
                console.log("dayscheduledocs");
                keyArray = [];
                if (dayscheduledocs && dayscheduledocs.length > 0 && dayscheduledocs[dayscheduledocs.length - 1]
                    && dayscheduledocs[dayscheduledocs.length - 1].users)
                    keyArray = dayscheduledocs[dayscheduledocs.length - 1].users.map(function (item) { return item["key"]; });
                return [2 /*return*/, keyArray];
        }
    });
}); };
var findDayScheduleUsers = function (accountDb, schedule, islivereply, company, property) { return __awaiter(_this, void 0, void 0, function () {
    var timezone, scheduledate, scheduledate_start_unix, scheduledate_end_unix, contactsSelector, dayschedulePromise, dayscheduledocs, keyArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                timezone = property.timezone ? property.timezone : company.timezone;
                scheduledate = moment().tz(timezone).startOf('day');
                if (schedule.ispreviousday)
                    scheduledate = scheduledate.add("-1", "days");
                scheduledate_start_unix = scheduledate.unix();
                scheduledate_end_unix = scheduledate.add(+1, 'days').subtract(1, 'minutes').unix();
                contactsSelector = {
                    "selector": {
                        "pvt_type": "dayschedule",
                        "callflowsoptiontype": schedule.callflowsoptiontype.trim(),
                        "scheduleid": schedule.scheduleid,
                        "datetime": {
                            "$gte": scheduledate_start_unix,
                            "$lte": scheduledate_end_unix
                        }
                    }
                };
                dayschedulePromise = new Promise(function (resolve, reject) {
                    accountDb.find(contactsSelector, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        try {
                            //console.log(`Found ${result.docs.length} docs for these users`);
                            resolve(result.docs);
                        }
                        catch (e) {
                            console.error("Couldn't fetch users  from the database");
                            resolve([]);
                        }
                    });
                });
                return [4 /*yield*/, dayschedulePromise];
            case 1:
                dayscheduledocs = _a.sent();
                keyArray = [];
                if (dayscheduledocs && dayscheduledocs.length > 0 && dayscheduledocs[dayscheduledocs.length - 1]
                    && dayscheduledocs[dayscheduledocs.length - 1].users)
                    keyArray = dayscheduledocs[dayscheduledocs.length - 1].users.map(function (item) { return item["key"]; });
                return [2 /*return*/, keyArray];
        }
    });
}); };
var findPropertydocument = function (propertyid) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var currentUserSelector, companypromise, companydocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUserSelector = {
                    'selector': {
                        "pvt_type": "property",
                        "enabled": true
                    }
                };
                companypromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var accountDb;
                    return __generator(this, function (_a) {
                        accountDb = nano.use(parseAccountToDatabaseName(propertyid));
                        accountDb.find(currentUserSelector, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            try {
                                resolve(result.docs);
                            }
                            catch (e) {
                                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                                resolve([]);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, companypromise];
            case 1:
                companydocs = _a.sent();
                //console.log(`Found users`, companydocs[0]);
                return [2 /*return*/, companydocs.length > 0 ? companydocs[0] : {}];
        }
    });
}); };
var checkpin = function (pin, companyid) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var currentUserSelector, userpromise, userdocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentUserSelector = {
                    'selector': {
                        'pin': {
                            '$eq': pin
                        },
                        "pvt_type": "user",
                        "notify_enabled": true
                    }
                };
                userpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var accountDb;
                    return __generator(this, function (_a) {
                        accountDb = nano.use(parseAccountToDatabaseName(companyid));
                        //         accountDb = nano.use(parseAccountToDatabaseName("441202171b923a9cc3a8ab36f9728294"));
                        accountDb.find(currentUserSelector, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            try {
                                // console.log(`Found ${result.docs.length} docs for these users`);
                                var user;
                                if (result.docs.length > 0)
                                    user = result.docs[0];
                                resolve(user);
                            }
                            catch (e) {
                                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                                resolve([]);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, userpromise];
            case 1:
                userdocs = _a.sent();
                // console.log(`pin users`, userdocs);
                return [2 /*return*/, userdocs];
        }
    });
}); };
var findDayScheduleuserlist = function (userIds, property) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var currentUserSelector_1, userpromise, userdocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(property && property.companyid)) return [3 /*break*/, 2];
                currentUserSelector_1 = {
                    'selector': {
                        'id': {
                            '$in': userIds
                        },
                        "pvt_type": "user"
                    }
                };
                userpromise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var accountDb;
                    return __generator(this, function (_a) {
                        accountDb = nano.use(parseAccountToDatabaseName(property.companyid));
                        accountDb.find(currentUserSelector_1, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            try {
                                resolve(result.docs);
                            }
                            catch (e) {
                                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                                resolve([]);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, userpromise];
            case 1:
                userdocs = _a.sent();
                //console.log(`Found users`, userdocs);
                return [2 /*return*/, userdocs];
            case 2: return [2 /*return*/, []];
        }
    });
}); };
var generateLivereply = function (userIds, userdocs) { return __awaiter(_this, void 0, void 0, function () {
    var livereplypromiss, lrresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                livereplypromiss = new Promise(function (resolve, reject) {
                    var lrdatalist = [];
                    userIds.forEach(function (id) {
                        //  if (user.livereplysetting)
                        var user = userdocs.find(function (u) { return u.id == id; });
                        if (user && user.livereplysetting) {
                            //console.log(user.first_name);
                            var lrdata = {
                                name: user.first_name,
                                userid: user.id,
                                pin: user.pin,
                                phones: []
                            };
                            user.livereplysetting.forEach(function (lr) {
                                // console.log("\nlr.number", lr.number);
                                lrdata.phones.push({
                                    "callingnumber": "+1" + lr.number,
                                    "ring": 30
                                });
                            });
                            lrdatalist.push(lrdata);
                        }
                    });
                    resolve(lrdatalist);
                });
                return [4 /*yield*/, livereplypromiss];
            case 1:
                lrresult = _a.sent();
                // console.log(`Found lrresult`, lrresult);
                return [2 /*return*/, lrresult];
        }
    });
}); };
var generateNoticationreply = function (userIds, userdocs) { return __awaiter(_this, void 0, void 0, function () {
    var livereplypromiss, lrresult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                livereplypromiss = new Promise(function (resolve, reject) {
                    // console.log("generateNoticationreply 22222");
                    var ntdatalist = [];
                    userIds.forEach(function (id) {
                        //  if (user.livereplysetting)
                        var user = userdocs.find(function (u) { return u.id == id; });
                        if (user.notificationrulessetting) {
                            console.log(user.first_name);
                            var ntdata = {
                                name: user.first_name,
                                userid: user.id,
                                data: []
                            };
                            user.notificationrulessetting.forEach(function (nt) {
                                var waittime1 = nt.notificationwait.toString().replace(/\D/g, '').trim();
                                var waittime = 60 * waittime1;
                                ntdata.data.push({
                                    "callingnumber": "+1" + nt.number,
                                    type: nt.type.toLowerCase(),
                                    "waittime": waittime,
                                    pin: user.pin
                                });
                            });
                            ntdatalist.push(ntdata);
                        }
                    });
                    resolve(ntdatalist);
                });
                return [4 /*yield*/, livereplypromiss];
            case 1:
                lrresult = _a.sent();
                //console.log(`Found lrresult`, lrresult);
                return [2 /*return*/, lrresult];
        }
    });
}); };
app.get('/property/:propertyid/handoffrules', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid;
    return __generator(this, function (_a) {
        propertyid = req.params.propertyid;
        res.send("sucess");
        return [2 /*return*/];
    });
}); });
//propertycalloutnumber
app.get('/property/:propertyid/:didnumber/schedule', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var didnumber, type, propertyid, accountDb, propertyIdSelector, property, companyselector, companydbname, companydb, company, schedule, userIds, _a, userdocs, lrresult, strmaxhold, intmaxhold, callflowsoptiontype, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                didnumber = req.params.didnumber;
                type = "";
                propertyid = req.params.propertyid;
                accountDb = nano.use(parseAccountToDatabaseName(propertyid));
                propertyIdSelector = {
                    "selector": {
                        "pvt_type": "property",
                        "propertyid": propertyid,
                        "enabled": true
                    },
                    "fields": [
                        "_id",
                        "companyid",
                        "propertyname",
                        "companyname",
                        "propertyid",
                        "callflowdata",
                        "timezone"
                    ]
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, propertyIdSelector)];
            case 1:
                property = _b.sent();
                companyselector = {
                    "selector": {
                        "pvt_type": "company",
                        "companyid": property.companyid
                    }
                };
                companydbname = parseAccountToDatabaseName(property.companyid);
                companydb = nano.use(companydbname);
                return [4 /*yield*/, getdocumentbyproperty(companydb, companyselector)];
            case 2:
                company = _b.sent();
                return [4 /*yield*/, findSchedule(accountDb, true, didnumber, property, company)];
            case 3:
                schedule = _b.sent();
                if (!schedule) return [3 /*break*/, 5];
                return [4 /*yield*/, findDayScheduleUsers(accountDb, schedule, true, company, property)];
            case 4:
                _a = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                _a = [];
                _b.label = 6;
            case 6:
                userIds = _a;
                return [4 /*yield*/, findDayScheduleuserlist(userIds, property)];
            case 7:
                userdocs = _b.sent();
                return [4 /*yield*/, generateLivereply(userIds, userdocs)];
            case 8:
                lrresult = _b.sent();
                strmaxhold = schedule ? schedule.livereplyduration : '120';
                intmaxhold = isNaN(strmaxhold) ? 120 : strmaxhold;
                if (schedule)
                    callflowsoptiontype = schedule.callflowsoptiontype;
                result = {
                    "didnumber": didnumber,
                    "propertyid": propertyid,
                    "type": "live",
                    "maxonholdtime": intmaxhold,
                    "label": callflowsoptiontype,
                    "data": lrresult
                };
                //console.log("\n live result result:",  JSON.stringify( result));
                res.send(JSON.stringify(result));
                return [2 /*return*/];
        }
    });
}); });
//propertycalloutnumber
app.get('/property/:propertyid/propertycalloutnumber', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, dbnames, propertydbname, isCompanyDbAvailable, result, propertydb, propertyIdSelector, property;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("propertycalloutnumber");
                propertyid = req.params.propertyid;
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                propertydbname = parseAccountToDatabaseName(propertyid);
                isCompanyDbAvailable = dbnames.find(function (d) { return d === propertydbname; });
                result = { data: {
                        calloutnumber: "",
                        propertyid: propertyid
                    }
                };
                if (!isCompanyDbAvailable) return [3 /*break*/, 3];
                propertydb = nano.use(propertydbname);
                propertyIdSelector = {
                    "selector": {
                        "pvt_type": "property",
                        "propertyid": propertyid,
                        "enabled": true
                    },
                    "fields": [
                        "propertyid",
                        "propertyname",
                        "companyname",
                        "phone"
                    ]
                };
                return [4 /*yield*/, getdocumentbyproperty(propertydb, propertyIdSelector)];
            case 2:
                property = _a.sent();
                result.data.calloutnumber = property.phone;
                _a.label = 3;
            case 3:
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/:didnumber/:boxid/pin/:pin', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var didnumber, propertyid, property, comapnyid, pin, pinuser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("pin");
                didnumber = req.params.didnumber;
                propertyid = req.params.propertyid;
                return [4 /*yield*/, findPropertydocument(propertyid)];
            case 1:
                property = _a.sent();
                comapnyid = property.companyid;
                console.log("\n comapnyid ", comapnyid);
                pin = req.params.pin;
                return [4 /*yield*/, checkpin(pin, comapnyid)];
            case 2:
                pinuser = _a.sent();
                result = {
                    data: { verified: false,
                        propertyid: propertyid }
                };
                if (pinuser) {
                    result.data.verified = true;
                    result.data.agenttid = pinuser.id;
                    result.data.agenttname = pinuser.first_name;
                }
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/company/:companyid/property/:propertyid/pin/:pin/:userid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var comapnyid, pin, userid, pinuser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("user pin pin");
                comapnyid = req.params.companyid;
                console.log("\n comapnyid ", comapnyid);
                pin = req.params.pin;
                userid = req.params.userid;
                return [4 /*yield*/, checkpin(pin, comapnyid)];
            case 1:
                pinuser = _a.sent();
                result = {
                    data: { verified: false
                    }
                };
                if (pinuser && pinuser.id != userid) {
                    result.data.verified = true;
                    result.data.agenttid = pinuser.id;
                    result.data.agenttname = pinuser.first_name;
                }
                res.send(result);
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/:didnumber/schedule/notify', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var didnumber, propertyid, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("notify schedule");
                didnumber = req.params.didnumber;
                propertyid = req.params.propertyid;
                return [4 /*yield*/, updateNOtifySchedule(propertyid, didnumber)];
            case 1:
                result = _a.sent();
                res.send(JSON.stringify(result));
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/:callflowoption/vmboxemail', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, callflowoption, payload, dbname, accountDb, contactsSelector, escalationemailobj, emaillist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                propertyid = req.params.propertyid;
                callflowoption = req.params.callflowoption;
                payload = {
                    data: {
                        callflowoption: callflowoption,
                        emaillist: []
                    }
                };
                dbname = parseAccountToDatabaseName(propertyid);
                accountDb = nano.use(dbname);
                contactsSelector = {
                    'selector': { "pvt_type": "escalationemaillist",
                        "callflowoption": callflowoption
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getdocumentbyproperty(accountDb, contactsSelector)];
            case 1:
                escalationemailobj = _a.sent();
                emaillist = [];
                if (escalationemailobj && escalationemailobj.emaillist)
                    emaillist = escalationemailobj.emaillist.map(function (a) { return a.email; });
                payload.data.emaillist = emaillist;
                console.log(payload);
                // vmboxemail(payload);
                res.send({
                    "Status": "200",
                    "list": payload,
                    "messages": "Email sent  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/property/:propertyid/:didnumber/callinfolog', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, didnumber, payload, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n callinfo log\n");
                propertyid = req.params.propertyid;
                didnumber = req.params.didnumber.substring(0, 10);
                payload = req.body;
                payload.didnumber = didnumber;
                payload.propertyid = propertyid;
                return [4 /*yield*/, insertcallinfolog(payload)];
            case 1:
                result = _a.sent();
                res.send({
                    "Status": "200",
                    "messages": "Call info log  log inserted  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/callinfolog/guid/:guid', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, property, companyid, dbname, comapnydb, guid, contactsSelector, callinfologs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n callinfo log\n");
                propertyid = req.params.propertyid;
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                companyid = property.companyid;
                dbname = parseAccountToDatabaseName(companyid);
                comapnydb = nano.use(dbname);
                guid = req.params.guid;
                contactsSelector = {
                    'selector': {
                        "pvt_type": "callinfolog",
                        "guid": guid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(comapnydb, contactsSelector)];
            case 2:
                callinfologs = _a.sent();
                // console.log("reportdocs\n",  reportdocs);
                res.send({
                    "Status": "200",
                    callinfologs: callinfologs
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/:incidentid/notes', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, incidentid, contactsSelector, dbname, db, notes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("incident notes");
                propertyid = req.params.propertyid;
                incidentid = req.params.incidentid;
                contactsSelector = {
                    'selector': {
                        "incidentid": incidentid,
                        enabled: true,
                        "pvt_type": "incidentnotes"
                    },
                    limit: 30000
                };
                dbname = parseAccountToDatabaseName(propertyid);
                db = nano.use(dbname);
                return [4 /*yield*/, getalldocumentsbyproperty(db, contactsSelector)];
            case 1:
                notes = _a.sent();
                //console.log("incident notes\n",  notes);
                res.send({
                    "Status": "200",
                    notes: notes
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/property/:propertyid/:incidentid/notes', validateJWT, function (req, res) {
    console.log("\n\n incidentid notes\n");
    var propertyid = req.params.propertyid; //'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    var payload = req.body;
    var dbname = parseAccountToDatabaseName(propertyid);
    var result = insertincidentnotes(payload, dbname, propertyid);
    res.send({
        "Status": "200",
        "messages": "CDR log inserted  successfully"
    });
});
app.post('/property/:propertyid/reportdata', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, payload, dbname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n reportdata  log\n");
                propertyid = req.params.propertyid;
                payload = req.body;
                dbname = parseAccountToDatabaseName(propertyid);
                return [4 /*yield*/, insertreportdata(payload, dbname)];
            case 1:
                result = _a.sent();
                res.send({
                    "Status": "200",
                    "messages": "CDR log inserted  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/company/:companyid/autosearch', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid, dbname, comapnydb, contactsSelector, reportdocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n get company reportdata  log\n");
                companyid = req.params.companyid;
                dbname = parseAccountToDatabaseName(companyid);
                comapnydb = nano.use(dbname);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "reportdata"
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(comapnydb, contactsSelector)];
            case 1:
                reportdocs = _a.sent();
                // console.log("reportdocs\n",  reportdocs);
                res.send({
                    "Status": "200",
                    reportdocs: reportdocs
                });
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/autosearch', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var propertyid, body, property, companyid, dbname, comapnydb, contactsSelector, reportdocs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n get reportdata  log\n");
                propertyid = req.params.propertyid;
                if (!(propertyid === "441202171b923a9cc3a8ab36f9728294")) return [3 /*break*/, 1];
                body = {
                    size: 20,
                    from: 0,
                    query: {
                        "match": {
                            "companyid": "441202171b923a9cc3a8ab36f9728294"
                        }
                    }
                };
                search('reportdocs', body)
                    .then(function (results) {
                    var hits = results.hits.hits;
                    var result1 = hits.map(function (a) { return a._source; });
                    res.send({
                        "Status": "200",
                        reportdocs: result1
                    });
                });
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 2:
                property = _a.sent();
                companyid = property.companyid;
                dbname = parseAccountToDatabaseName(companyid);
                comapnydb = nano.use(dbname);
                contactsSelector = {
                    'selector': {
                        "pvt_type": "reportdata",
                        "propertyid": propertyid
                    },
                    limit: 30000
                };
                return [4 /*yield*/, getalldocumentsbyproperty(comapnydb, contactsSelector)];
            case 3:
                reportdocs = _a.sent();
                // console.log("reportdocs\n",  reportdocs);
                res.send({
                    "Status": "200",
                    reportdocs: reportdocs
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/chart/:type/:bussinesshours/:nonbussinesshours/:startime/:endtime', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var response_result, propertyid, bussinesshours, nonbussinesshours, startime, endtime, property, companydbname, companydb, type_1, contactsSelector, reportdocs, timezone_1, incidentdatetime_1, serachcount_1, groupBy, groupByType, reportdocs, reportdocskeys;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n get chart  log\n");
                response_result = [];
                propertyid = req.params.propertyid;
                bussinesshours = req.params.bussinesshours;
                nonbussinesshours = req.params.nonbussinesshours;
                startime = parseInt(req.params.startime);
                endtime = parseInt(req.params.endtime);
                console.log(startime);
                console.log(endtime);
                if (!(bussinesshours === "true" || nonbussinesshours === "true")) return [3 /*break*/, 3];
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                companydbname = parseAccountToDatabaseName(property.companyid);
                companydb = nano.use(companydbname);
                type_1 = Number(req.params.type);
                contactsSelector = {
                    "selector": {
                        "pvt_type": "reportdata",
                        "removefromreport": false,
                        "$and": [
                            {
                                "incidentdate": {
                                    "$gte": startime
                                }
                            },
                            {
                                "incidentdate": {
                                    "$lte": endtime
                                }
                            }
                        ],
                        "propertyid": propertyid,
                        "$or": [{ "duringbussinesshours": true }, { "duringbussinesshours": false }]
                    },
                    limit: 30000
                };
                if (bussinesshours === "false" || nonbussinesshours === "false") {
                    contactsSelector.selector.$or[0].duringbussinesshours = bussinesshours === "true";
                    contactsSelector.selector.$or[1].duringbussinesshours = bussinesshours === "true";
                }
                console.log(JSON.stringify(contactsSelector));
                return [4 /*yield*/, getalldocumentsbyproperty(companydb, contactsSelector)];
            case 2:
                reportdocs = _a.sent();
                timezone_1 = property.timezone ? property.timezone : 'America/Kentucky/Louisville';
                incidentdatetime_1 = function (time, type) {
                    var retunvalue = -1;
                    if (type === 0) {
                        retunvalue = moment.unix(time).tz(timezone_1).format('H');
                    }
                    else if (type === 1)
                        retunvalue = moment.unix(time).tz(timezone_1).day();
                    else if (type === 2) {
                        retunvalue = parseInt(moment.unix(time).tz(timezone_1).format("M")) - 1;
                    }
                    return retunvalue;
                };
                serachcount_1 = function (dataset, search) {
                    var count = dataset.reduce(function (n, val) {
                        return n + (val == search);
                    }, 0);
                    return count;
                };
                groupBy = function (key) { return function (array) {
                    return array.reduce(function (objectsByKeyValue, obj) {
                        return (__assign({}, objectsByKeyValue, (_a = {}, _a[obj[key]] = (objectsByKeyValue[obj[key]] || []).concat(incidentdatetime_1(obj.incidentdate, type_1)), _a)));
                        var _a;
                    }, {});
                }; };
                groupByType = groupBy('type');
                reportdocs = groupByType(reportdocs);
                reportdocskeys = Object.keys(reportdocs);
                reportdocskeys.forEach(function (k) {
                    var seriesdata = reportdocs[k];
                    var seriesdatavalue = [];
                    for (var i = 0; i < 24; i++) {
                        //   console.log(i);
                        var tmpvalue = { value: serachcount_1(seriesdata, i)
                        };
                        seriesdatavalue.push(tmpvalue);
                    }
                    var tmp = {
                        seriesname: k,
                        hourdata: seriesdatavalue
                    };
                    response_result.push(tmp);
                });
                _a.label = 3;
            case 3:
                res.send({
                    "Status": "200",
                    chartdata: response_result
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/elasticsearch', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, result1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('ElasticSearch ');
                console.log(JSON.stringify(req.body));
                payload = req.body;
                return [4 /*yield*/, getelasticsearchdata(payload.payload)];
            case 1:
                result1 = _a.sent();
                res.send({ result: result1 });
                return [2 /*return*/];
        }
    });
}); });
app.get('/property/:propertyid/reportdata', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        console.log("\n\n get reportdata  log\n");
        body = {
            size: 20,
            from: 0,
            query: {
                "match_all": {}
            }
        };
        search('reportdocs', body)
            .then(function (results) {
            var hits = results.hits.hits;
            var result1 = hits.map(function (a) { return a._source; });
            res.send({
                "Status": "200",
                reportdocs: result1
            });
        });
        return [2 /*return*/];
    });
}); });
app.post('/webhook/VoicemailEmail/Notification', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, fields, indexname, account_db_pattern, dbnames, i, dbname, account_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("email notification ");
                payload = req.body;
                fields = payload.fields;
                indexname = payload.name;
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 5];
                dbname = dbnames[i];
                account_id = parseDatabaseNameToAccount(dbname);
                console.log(account_id);
                return [4 /*yield*/, setKazooAccountEmailNotification(req, account_id)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                res.send({
                    "Status": "200",
                    "messages": "voicemail optin  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhook/createindex', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, fields, indexname, account_db_pattern, dbnames, i, dbname;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("createindex ");
                payload = req.body;
                console.log(JSON.stringify(payload));
                fields = payload.fields;
                indexname = payload.name;
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); });
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < dbnames.length)) return [3 /*break*/, 5];
                dbname = dbnames[i];
                console.log(dbname);
                return [4 /*yield*/, createindex(dbname, fields, indexname)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                res.send({
                    "Status": "200",
                    "messages": "voicemail optin  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhook/voicemail', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, propertyid_2, property, companyid, companydbname, companydb, result, ex_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("voice mail ");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                payload = req.body;
                console.log(JSON.stringify(payload));
                propertyid_2 = payload.account_id;
                return [4 /*yield*/, getpropertyInfo(propertyid_2)];
            case 2:
                property = _a.sent();
                if (!(!property || !property.propertyid)) return [3 /*break*/, 4];
                return [4 /*yield*/, getpropertyInfo(propertyid_2)];
            case 3:
                property = _a.sent();
                _a.label = 4;
            case 4:
                companyid = property.companyid;
                companydbname = parseAccountToDatabaseName(companyid);
                companydb = nano.use(companydbname);
                payload.eventtype = "voicemail";
                setTimeout(function () {
                    deleteVoiceMessages(propertyid_2, payload.voicemail_box);
                }, 1000);
                return [4 /*yield*/, insertdtmfinfo(payload, companydbname, property)];
            case 5:
                result = _a.sent();
                return [4 /*yield*/, parseVoiceMessage(companydb, payload)];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                ex_14 = _a.sent();
                debugMessage("error from voice mail", "error");
                debugMessage(ex_14, "error");
                debugMessage(payload, "error for");
                return [3 /*break*/, 8];
            case 8:
                res.send({
                    "Status": "200",
                    "messages": "voicemail optin  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhook/media', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload;
    return __generator(this, function (_a) {
        console.log("media mail ");
        payload = req.body;
        console.log(req);
        res.sendStatus(200);
        return [2 /*return*/];
    });
}); });
app.post('/webhook/s3messageinfo', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var bodyarr;
    return __generator(this, function (_a) {
        console.log("s3messageinfo  ");
        bodyarr = [];
        req.on('data', function (chunk) {
            bodyarr.push(chunk);
        });
        req.on('end', function () {
            return __awaiter(this, void 0, void 0, function () {
                var bodyarr2, message;
                return __generator(this, function (_a) {
                    console.log("bodyarr");
                    console.log(bodyarr.join(''));
                    bodyarr2 = JSON.parse(bodyarr.join(''));
                    message = JSON.parse((bodyarr2.Message));
                    message.Records.forEach(function (record) {
                        try {
                            console.log("record");
                            console.log(record);
                            var notification = record;
                            console.log("notification");
                            console.log(notification);
                            var s3 = notification.s3;
                            console.log("s3");
                            console.log(s3);
                            if (s3.object) {
                                var s3Onje3ct_1 = s3.object;
                                console.log("s3Onje3ct");
                                console.log(s3Onje3ct_1);
                                setTimeout(function () {
                                    parseS3Notifcation(s3Onje3ct_1);
                                }, 15000);
                            }
                        }
                        catch (ex) {
                            debugMessage("during s3 record parsing", "error");
                            debugMessage(ex, "error info");
                            debugMessage(record, "info");
                        }
                    });
                    return [2 /*return*/];
                });
            });
        });
        res.sendStatus(200);
        return [2 /*return*/];
    });
}); });
app.post('/property/dtmfinfo', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, propertyid, property, companyid, dbname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("\n\n dtmf log\n");
                payload = req.body;
                console.log("\n\n dtmf log\n", payload);
                propertyid = payload.account_id;
                return [4 /*yield*/, getpropertyInfo(propertyid)];
            case 1:
                property = _a.sent();
                companyid = property.companyid;
                dbname = parseAccountToDatabaseName(companyid);
                console.log("payload.DTMFpayload.DTMFpayload.DTMFpayload.DTMF111111 ", payload.DTMF);
                return [4 /*yield*/, insertdtmfinfo(payload, dbname, property)];
            case 2:
                result = _a.sent();
                console.log("payload.DTMFpayload.DTMFpayload.DTMFpayload.DTMF ", payload.DTMF);
                if (!(payload.DTMF && payload.DTMF >= 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, insertDTMFInforeport(payload, dbname, property)];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                //we wait for 1 so user can choose menu options dtmf inof 
                setTimeout(function () { insertcallinitreport(payload, dbname, property, undefined); }, 70000);
                _a.label = 5;
            case 5:
                res.send({
                    "Status": "200",
                    "messages": "DTMF inserted  successfully"
                });
                return [2 /*return*/];
        }
    });
}); });
//serverlog
app.post('/serverlog', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var payload, message, method;
    return __generator(this, function (_a) {
        console.log("serverlog \n");
        payload = JSON.parse(req.body.payload);
        console.log(payload);
        message = payload.message;
        method = payload.method;
        serverlog("info", message, method);
        res.send("log inserted");
        return [2 /*return*/];
    });
}); });
app.get('/companies/:companyid/properties/:propertyid/callflow', validateJWT, function (req, res) {
    var _accountid = req['decoded'].account_id;
    var propertid = req.params.propertyid;
    var promise1 = new Promise(function (resolve, reject) {
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + propertid + "/callflows?filter_not_ui_metadata.origin=voip&filter_not_ui_metadata.origin=callqueues&_=1578197504745", function (err, response, body) {
            if (err) {
                console.log("\n\n\nbody callflow \n", err);
                res.send(err);
                return;
            }
            //console.log("\n\n\nbody callflow \n", body);
            res.send(body);
        });
    });
});
app.get('/companies/:companyid/properties/:propertyid/phonenumbers', validateJWT, function (req, res) {
    var _accountid = req['decoded'].account_id;
    var propertid = req.params.propertyid;
    var promise1 = new Promise(function (resolve, reject) {
        getKazooRequest(req)
            .get(process.env.KAZOO_SERVER + "/v2/accounts/" + propertid + "/phone_numbers?paginate=false", function (err, response, body) {
            if (err) {
                // console.log("\n\n\nbody phone_numbers \n", err);
                res.send(err);
                return;
            }
            //  console.log("\n\n\nbody phone_numbers \n", body);
            res.send(body);
        });
    });
});
app.get('*', function (req, res) {
    var filename = req.path;
    if (filename.indexOf('.') >= 0) {
        var filePath = path.join(__dirname, "public/dist/", filename);
        //         console.log(filePath);
        fs.stat(filePath, function (err, stat) {
            if (err) {
                res.sendStatus(404);
            }
            res.sendFile(path.join(__dirname, "public/dist/", filename));
        });
    }
    else {
        res.sendFile(path.join(__dirname, "public/dist/", 'index.html'));
    }
});
app.get('/property/:propertyid', validateJWT, function (req, res) {
    var accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    //console.log('added properties  ', parseAccountToDatabaseName(req['decoded'].account_id));
    var companyid = req.params.companyid;
    var contactsSelector = {
        'selector': {
            '$and': [
                {
                    'pvt_type': 'property'
                }
            ]
        },
        limit: 30000
    };
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            }
            catch (e) {
                console.error("Couldn't access the db in /user");
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log('master users');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
        }
    });
});
app.post('/fixreport/company/:companyid', validateJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var companyid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                companyid = req.params.companyid;
                return [4 /*yield*/, fixBrokenCompanyReports(companyid)];
            case 1:
                _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
app.post('/sendsms', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var payload, messaging_number, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("sendsms\n", req.body);
                payload = req.body;
                messaging_number = process.env.MESSAGINGNUMBER;
                payload.from = messaging_number;
                return [4 /*yield*/, sendNotifySMS(payload)];
            case 1:
                response = _a.sent();
                console.log("response");
                console.log(response);
                res.send(response);
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhook/schedulereport', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var account_db_pattern, dbnames;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("schedulereport");
                account_db_pattern = new RegExp(getDabaseNameRegx());
                return [4 /*yield*/, getaccountdbnames()];
            case 1:
                dbnames = _a.sent();
                dbnames = dbnames.filter(function (d) { return account_db_pattern.test(d); }); //&& d==="account/44/12/02171b923a9cc3a8ab36f9728294"
                dbnames.forEach(function (dbname) { return __awaiter(_this, void 0, void 0, function () {
                    var companyid, company, companyuserlist, companyschedulereportinfo;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                companyid = parseDatabaseNameToAccount(dbname);
                                return [4 /*yield*/, getcompanyInfo(companyid)];
                            case 1:
                                company = _a.sent();
                                if (!company) return [3 /*break*/, 3];
                                return [4 /*yield*/, getComapnyUsers(dbname)];
                            case 2:
                                companyuserlist = _a.sent();
                                if (companyuserlist && Array.isArray(companyuserlist) && companyuserlist.length > 0) {
                                    companyschedulereportinfo = {
                                        companyid: companyid,
                                        companydbname: dbname,
                                        users: companyuserlist
                                    };
                                    send_callsumery_report(companyschedulereportinfo);
                                }
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                res.send("done");
                return [2 /*return*/];
        }
    });
}); });
app.post('/webhook/optin', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var incomingMessages;
    return __generator(this, function (_a) {
        console.log("\n\n webhook optin\n");
        incomingMessages = req.body;
        console.log(JSON.stringify(incomingMessages));
        incomingMessages.forEach(function (m) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var mtext, toarr, from, phone, messaging_number, dbnames, messageneedstosend, accountname, username, result, company, account_db_pattern, users, i, dbname, accountDb, dbid, messagetext, messaging_number_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mtext = m.message.text.toLowerCase();
                        toarr = m.message.to;
                        from = m.message.from.replace("+1", "");
                        ;
                        phone = toarr[0].replace("+1", "");
                        messaging_number = process.env.MESSAGINGNUMBER;
                        messaging_number = messaging_number.replace("+1", '');
                        if (!(phone === messaging_number && (mtext === "yes" || mtext === "stop" || mtext === "y"))) return [3 /*break*/, 7];
                        return [4 /*yield*/, getaccountdbnames()];
                    case 1:
                        dbnames = _a.sent();
                        messageneedstosend = false;
                        accountname = req.params.name;
                        username = req.params.email;
                        optinUserIdSelector.selector["smssettings.settings"].$elemMatch.$or[0].number = from;
                        optinUserIdSelector.selector["smssettings.settings"].$elemMatch.$or[1].number = "+1" + from;
                        console.log("optinUserIdSelector", JSON.stringify(optinUserIdSelector));
                        result = {};
                        account_db_pattern = new RegExp(getDabaseNameRegx());
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < dbnames.length)) return [3 /*break*/, 6];
                        dbname = dbnames[i];
                        if (account_db_pattern.test(dbname) === false)
                            return [3 /*break*/, 5];
                        accountDb = nano.use(dbname);
                        dbid = parseDatabaseNameToAccount(dbname);
                        return [4 /*yield*/, getcompanyInfo(dbid)];
                    case 3:
                        company = _a.sent();
                        if (!(company && company.companyid)) return [3 /*break*/, 5];
                        accountDb = nano.use(parseAccountToDatabaseName(company.companyid));
                        return [4 /*yield*/, getalldocumentsbyproperty(accountDb, optinUserIdSelector)];
                    case 4:
                        // console.log("company ", company);
                        users = _a.sent();
                        //console.log("users ", users.length); 
                        users.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            var needstoupdate, smssettings, notificationrulessetting;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        needstoupdate = false;
                                        smssettings = user.smssettings.settings;
                                        smssettings.forEach(function (settings) { return __awaiter(_this, void 0, void 0, function () {
                                            var oldoptin;
                                            return __generator(this, function (_a) {
                                                if (settings.number === from || settings.number === "+1" + from) {
                                                    oldoptin = settings.optin;
                                                    settings.optin = mtext === "yes" || mtext === "y";
                                                    settings.smsagreement = settings.optin;
                                                    needstoupdate = needstoupdate || oldoptin != settings.optin;
                                                    //console.log(JSON.stringify( settings))
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        if (!needstoupdate) return [3 /*break*/, 2];
                                        notificationrulessetting = user.notificationrulessetting;
                                        if (mtext === "stop" && notificationrulessetting && notificationrulessetting.length > 0) {
                                            notificationrulessetting = notificationrulessetting.filter(function (nrs) { return nrs.type === "Phone" || (nrs.number != from && nrs.number != "+1" + from); });
                                            user.notificationrulessetting = notificationrulessetting;
                                        }
                                        return [4 /*yield*/, updatenotifyusersettings(accountDb, user, user, false, undefined, undefined)];
                                    case 1:
                                        _a.sent();
                                        messageneedstosend = mtext === "stop";
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        if (messageneedstosend) {
                            console.log("sending messgae from ", from);
                            messagetext = "You have unsubscribed from HelloSpoke Notify SMS messages. To resubscribe you must opt in again via the Notify portal.";
                            messaging_number_1 = process.env.MESSAGINGNUMBER;
                            sendOptinMessage(from, messaging_number_1, messagetext);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        console.log("do nothing");
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        console.log("done");
        res.send({
            "Status": "200",
            "messages": "webhook optin  successfully"
        });
        return [2 /*return*/];
    });
}); });
app.post('/sendoptinsms', function (req, res, next) {
    // console.log("sendsms\n", req.body);
    var payload = req.body;
    console.log("sendsms2\n", payload);
    var index = 0;
    var length = payload.to.length;
    var smsmessage = 'Please reply YES to recive SMS message from HelloSpoke Notify.\n Std message&data rates apply.Reply stop to';
    payload.to.forEach(function (to_num) {
        client.Message.send({
            from: payload.from,
            to: to_num,
            text: payload.messagetext,
            callbackUrl: "" + process.env.BANDWIDTH_MESSAGE_SERVER,
            receiptRequested: 'all'
        })
            .then(function (message) {
            index++;
            if (index == length)
                res.send(JSON.stringify(message));
        })["catch"](function (err) {
            res.statusCode = 500;
            index++;
            if (index == length)
                res.send(JSON.stringify(err));
        });
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).render("error", {
        message: err.message,
        error: {}
    });
});
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        if (!res.headersSent) {
            res.status(500).write("error\n                message: " + (err.message || 'no error message') + "\n                error: " + (err || {}) + "\n            ");
            // res.sendStatus(500);
        }
    });
}
//checkHandOfffRule();
//setScheduleReportJob();
//setCallActivityScheduleReportJob();
//setCallActivityScheduleReportJob();
//checkScheduleCallActivityReport();
//checkScheduleCallActivityReport();
//unSavedReportToElasticSearch();
//setUpdateEMRTdataJob()
//setUpdateCallSummeryJob()
//setHandOfffRuleJob();
//setSyncReportJob();
//send_callsummery_report();;
//Change HTTP request to https
/*
http.createServer(function (req, res) {
    console.log(req.url);
   // if (req && req.headers &&req.headers['host'] )
     //   res.writeHead(301, { "Location": "https://" + req.headers['host'].replace(':3000','') + req.url });
    
    res.end();
}).listen(3000);

httpsServer.listen(443,3000);
*/
//unSavedReport();
app.listen(process.env.PORT || 3000, function (err) {
    if (err)
        console.log("Error in server setup");
    console.log("Node server listening on Port 3000");
});
module.exports = app;
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});
