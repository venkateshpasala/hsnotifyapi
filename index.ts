"use strict";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as jsf from "json-schema-faker";
import report_schema from './fake_call_report_schema'; // for faking call report objects
import * as times from "./lib/times";
import * as randInt from "./lib/rand_int";
import * as jwt from 'jsonwebtoken';
import * as cors from 'cors';
import * as download from 'download';
import * as dotenv from 'dotenv';
//import * as http from 'http';
import * as Request from 'request';
import * as fs from 'fs';
import * as Bandwidth from 'node-bandwidth';
import * as Crossbar from 'crossbar';
import * as Multer from 'multer';
import * as AWS from 'aws-sdk';
import * as MulterS3 from 'multer-s3';
import * as uuid from 'uuid/v4';
import * as moment  from 'moment-timezone';
import*  as elasticsearch from 'elasticsearch';
import * as d3 from "d3";
import * as d3c from "d3-collection";
import { configure, getLogger } from "log4js";

configure("./log4js.config");
const log4jslogger = getLogger();


 const esClient = new elasticsearch.Client({
    host: 'https://elastic:XOwFQQx983a77XW5p5RoNo6h@6c572ba545cc45609161790ba6dbc7d8.us-west-1.aws.found.io:9243/',
    log: 'error'
  });
//Elastic Search - Search Function
const search = async function search(index, body) {
    return await esClient.search({index: index, body: body});
  };
  
//    
import { RSA_PKCS1_OAEP_PADDING } from "constants";
const nodemailer = require('nodemailer');
const BandwidthMessaging = require('@bandwidth/messaging');
dotenv.config();

const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init("666282ccb892339b12298ffaf5bf5059");

const app: express.Express = express();
const nano = require('nano')(process.env.COUCHBASE_DB)
const storage = Multer.memoryStorage();
const upload = Multer({storage: storage});
AWS.config.loadFromPath('./aws_config.json');
const s3 = new AWS.S3({});
var cron = require('node-cron');

const s3_storage = {
    storage: MulterS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'spoke-mms',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {  
            cb(null, `${uuid()}.${file.originalname.split('.').pop()}`);
           
        }
    })
};
const notificationdata= {
    data:[
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
const livereplydata= {
    data:[
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
const s3_upload = Multer(s3_storage);
// const avatar_upload = Multer({ avatarStorage });
const https = require('https');
var http = require("http");
// const fs = require('fs');
const privateKey  = fs.readFileSync('./certs/key.key', 'utf8');
const certificate = fs.readFileSync('./certs/cert.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

declare interface DecodedJWT {
    kazoo_api_key: string;
    logged_in: boolean;
    user_id: number;
    timezone: string;
    account_id: string;
}


app.use(logger("dev"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true ,
    parameterLimit: 1000000,
    limit: '50mb',
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cors());
app.set('superSecret', 'SuperDuperSecretDoNotTellAnyone');
app.use(function(req, res, next) {
    res.on('finish', function() {
      // Do whatever based on status code
        if (res.statusCode === 500) {
            console.error(`Error at: ${req.url}`, req.body);
        }
    });
    next();
});

// Lifted from the index_sms.js on Teamwork
const client = new Bandwidth({
userId: "u-enlczxkbnudy7tclkqsnyea", // <-- note, this is not the same as the username you used to login to the portal
apiToken: "t-2uakaqql6gmln5c5k2pnboa",
apiSecret: "7grhxwroryz2s4wnuggjm7jidpa4icrenrz5vuq"
});


const serverlog=  (level,message,methodname)=>
{
    console.log('serverlog' );
    console.log(process.env.ELASTIC_SEARCH_SERVER);;
    const now= moment().utc().format();
    
    const payload=  {
        "timestamp": now,
        "level": level,
        "message": message,
        "servernode": "node server",
        "methodname": methodname
        
        }
    
    const options = {
    method: 'POST',
    url: `${process.env.ELASTIC_SEARCH_SERVER}/hpsapperrorlog/_doc`,
    headers:
    { 
       
        'Content-Type': 'application/json',
        },
        body:payload,
    
        json: true 
    };
    Request(options, function (error, response, body) {
        if (error) {  
            console.log(error +'//'+ 'error');
        }
        else
        {
           console.log ("log sucuessfully inserted");
           //console.log (body)
        }
    });

}
const debugMessage = (message ,type='debug') => {

  
   var log_message= `could not be assigned ${typeof message}`
   
    if(typeof message === 'string') {
        log_message= message
       
    }
    else if(typeof message === 'object') {
        log_message = JSON.stringify( message);
    }
    console.log(process.env.LOCAL_DEBUGING);
    if  ( process.env.LOCAL_DEBUGING==="true")
    {
            console.log(message)
    }
    else
    {
        log4jslogger.level = type;
        log4jslogger.debug(message);
    }
}


debugMessage("server started");
const getkazooaccountinfo= async (req, accountid)=>
{
    var apiKey = null;
    if (req===null)
    {
         apiKey = await loginwithcred();
    }
    var accountpromiss=  new Promise((resolve, reject) => {
        getKazooRequest(req,apiKey)
                .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountid}`, async (err, response, body) => {
                if (err)
                {
                    debugMessage(err, "error");
                    resolve(err)
                    return;
                }
                var account=JSON.parse(body);
              //  console.log("\n\n\n accounts\n", account);
                
                resolve (account);
                });
        });

        var  result = await accountpromiss;
        return result;

}

const sendemail= async (payload)=>
{
     const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
     const transporter = nodemailer.createTransport(smtpConfig);
    
  const accountname= payload.data.primarykazooaccount.name;
    debugMessage(`accountname  ${accountname}`, "info"); 
     let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: payload.data.username, // Recepient email address. Multiple emails can send separated by commas
        subject: ' NOTIFY Account activation ',
        text: 'This is the email regarding NOTIFY account activation.',   
            
       
          html: `<!DOCTYPE html>
          <html>
          
          <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                  table { 
                      border-collapse: collapse; 
                      width: 100%; 
                  } 
                    
                  th, td { 
                      text-align: left; 
                     
                  } 
                    
                  tr:nth-child(odd) { 
                      background-color: #F8F8F8; 
                  } 
				.info{
				color:#003a5d;
				}
                  .login { fill: #ffffff;  } 
                  .head1
                  {
                     
                      width: 117px;
                      height: 46px;   
                      background-position: center;
                      background-repeat: no-repeat;
                  }
                  .loginimg
                  {                     
                      height: 31px;   
                      background-position: center;
                      background-repeat: no-repeat;
                      width:138px;
                  }
                  .heading
                  {
                      width: 226px;
                      height:55px;
                  }
                  .no-margin
                  {
                      margin-left:0px;
                      margin-right:0px;
                  }
              </style>
          </head>
          
          <body>
              <div style=" height:670px;margin:0px auto; font-family: sans-serif; color: #003a5d ;width:700px">
                  <div style="height:100%; padding-left: 45px; padding-top:37px; background-color: #d3d3d342; color: #003a5d;">
                    
                      <div class="row no-margin" >
                            <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1"/></div>
                      </div>
                      <div class="row heading no-margin" style="margin-top:20px;">
                          <p style="font-size: 14px;  color:#003A5D ">Welcome to Notify!</p>
                          <p style="font-size: 14px; color:#003A5D "> Below are your user profile details.</p>
                      </div>
                     
                      <div style="padding-top: 29px; "> 
                        <div class="row info no-margin"> 
                            <a target="_blank" href=${process.env.WEB_SERVER}>                        
                            <div class="loginimg"><img src="${process.env.WEB_SERVER}img/login.png"/></div>
                            </div>
                              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="138" height="31" viewBox="0 0 138 31"><defs><style></style></defs><g transform="translate(-596 -522)"><path class="a" d="M15.5,0h107a15.5,15.5,0,0,1,0,31H15.5a15.5,15.5,0,0,1,0-31Z" transform="translate(596 522)"/><text class="login" transform="translate(664 544)"><tspan x="-54.062" y="0" style="cursor: pointer;">LOG IN NOW</tspan></text></g></svg> -->
                      <div class="row info no-margin">
                          <p style="font-size: 10px;width:500px;height:14px;color:#003A5D ">Or copy and paste this link into your browser:<a style="text-decoration:underline;color:#4BBBFF" target="_blank" href=${process.env.WEB_SERVER}>${process.env.WEB_SERVER}</a></p></div>
                      </div>
                      <div class="row info no-margin">
                          <p style="font-size: 14px;color:#003A5D ;   margin-top:25px;width:603px;">You will be asked to change your password and set up your user profile when you first log in.</p>
                      </div>
                      <div class="row no-margin" style="padding-top:21px">
                          <table class="table" style="font-size: 13px;   width: 386px;">
                              <tbody>
                                  <tr class="active">
                                      <td
                                          style="background-color: #F8F8F8; color: #95989A; padding: 10px;  border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          First Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; text-align: left ;color:#003A5D ;  border: 1px solid #f4f4f4; padding: 10px;     font-size: 14px;   height: 29px; ">
                                          ${payload.data.first_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px;border: 1px solid #f4f4f4;   width: 115px;   font-size: 14px;   height: 29px;">
                                          Last Name</td>
                                      <td
                                          style="text-align: left ; padding: 10px; border: 1px solid #f4f4f4; color:#003A5D ;    font-size: 14px;   height: 29px;  ">
                                          ${payload.data.last_name}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4; width: 115px;     font-size: 14px;   height: 29px;">
                                          User Name</td>
                                      <td
                                          style=" background-color: #F8F8F8 ;text-align: left ;color:#003A5D ;padding: 10px;  border: 1px solid #f4f4f4;     font-size: 14px;   height: 29px;  ">
                                          ${payload.data.username}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style="color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;   font-size: 14px;   height: 29px;">
                                          Password</td>
                                      <td
                                          style="text-align: left ;  border: 1px solid #f4f4f4;  color:#003A5D ; padding: 10px;   font-size: 14px;   height: 29px;  ">
                                          ${payload.data.password}</td>
                                  </tr>
                                  <tr class="active">
                                      <td
                                          style=" background-color: #F8F8F8; color: #95989A; padding: 10px; border: 1px solid #f4f4f4;  width: 115px;    font-size: 14px;   height: 29px;   ">
                                          Account Name</td>
                                      <td
                                          style=" background-color: #F8F8F8; border: 1px solid #f4f4f4;  padding: 10px;    font-size: 14px;   height: 29px;color:#003A5D  ">
                                          ${accountname}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <div class="row info no-margin">
                         <p style="font-size: 14px;  width:363px;height:19px;color:#003A5D">If you have any questions, please contact ${payload.data.masteruser_name}.</p>
                      </div>
              </div>
              </div>
          </body>
          
          </html>`
        };

 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
         } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
const validateJWT = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    // check header or url parameters or post parameters for token
    var token = req.headers.authorization || req.body.token || req.query.token || req.headers['x-access-token'];
   
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token.replace('Bearer ', ''), app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.status(401).send({ success: false, message: 'Failed to authenticate token.', err: err });    
            } else {
                const newToken = jwt.sign({
                    'kazoo_api_key': decoded.kazoo_api_key,
                    'logged_in': true,
                    'user_id': decoded.user_id,
                    'timezone': decoded.timezone,
                    'account_id': decoded.account_id
                }, app.get('superSecret'), {
                    'expiresIn': '1h'
                })
                // if everything is good, save to request for use in other routes
                res.append('token', newToken);
                res.append('Access-Control-Expose-Headers', 'token');
                req.decoded = decoded;
                req.headers['X-AUTH-TOKEN'] = jwt.decode(decoded.kazoo_api_key)
                next();
            }
        });

    } else {

        // if there is no token
         //console.log("logout");
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

const getKazooRequest = (req, apiKey = null) => {
   
    return Request.defaults({
        headers: {
            'X-AUTH-TOKEN': (apiKey ||req['decoded'] && req['decoded'].kazoo_api_key)  || null
        }
    });
}

const getFreeSwitchRequest = ( token ) => {
   
    return Request.defaults({
        headers: {
            'Token':  token 
        }
    });
}

function parseAccountToDatabaseName(accountName) {
    const notifytext= process.env.ISPRODUCTION==="true"? "nt_":"";
    return [`${notifytext}account`, accountName.substr(0, 2), accountName.substr(2, 2), accountName.substr(4)].join('/');
}

function getDabaseNameRegx()
{
   return  process.env.ISPRODUCTION==="true"? "nt_account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$":"account\/[0-9a-z]{2}\/[0-9a-z]{2}\/[0-9a-z]*$";
}
function parseDatabaseNameToAccount(dbnmae) {
    var arr = dbnmae.split("/");
    arr= arr.splice(1,arr.length-1);
    return arr.join('');
   }

/**
 * Call Reports API Routes
 */


const doCdrSearch = (accountName, my, bookmark = null, req, cdrLimit) => {
    const accountDb = nano.use(`${accountName}-${my}`);

    // Build Lucene Query
    const query = [
        //'main_leg:true',

    ];
    if (req.query.startTime && req.query.endTime) {
        const uToG = (u) => {
            return (+u / 1000) + 62167219200;
        }
        const startTime = uToG(req.query.startTime);
        const endDate = new Date(+req.query.endTime);
        endDate.setDate(endDate.getDate() + 1);
        const endTime = uToG(endDate.getTime());
        query.push(`timestamp:[${startTime} TO ${endTime}]`);
    }

    if (req.query.call_direction) {
        switch (req.query.call_direction) {
            case ('inbound'):
                query.push(`call_direction:inbound`);
                break;
            case ('outbound'):
                query.push(`call_direction:outbound`);
                break;
            case ('both'):
                query.push(`(call_direction:inbound OR call_direction:outbound)`);
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

    if(req.query.owner_id) {
        query.push(`owner_id:${req.query.owner_id}`);
    }
    else if (req.query.extensions) {
        var extensions = req.query.extensions.split(',')
            .map(function (e) { return "owner_id:\"" + e + "\""; })
            .join(' OR ');
        query.push("(" + extensions + ")");
    }
    else {
        query.push(`owner_id:__no_owner_id`);
    }

    if (req.query.search) {
        query.push(`(${[
            `callee_id_number:${req.query.search}*`,
            `callee_id_number:1${req.query.search}*`,
            `caller_id_number:${req.query.search}*`,
            `caller_id_number:1${req.query.search}*`,
            `to:${req.query.search}*`,
            // `caller_id_number:+1${req.query.search}*`,
            // `to:+1${req.query.search}*`,
           
            `to:1${req.query.search}*`,
            `callee_id_name:${req.query.search}*`,
            `caller_id_name:${req.query.search}*`
        ].join(' OR ')})`)
    }

    const params = {
        q: query.join(" AND "),
        include_docs: true,
        limit: cdrLimit,
        sort: '-timestamp'
    };

    if (bookmark) {
        params['bookmark'] = bookmark;
    }

    // Execute db Query

    return new Promise<{}>((resolve, reject) => {
        function cdr_post_search(callback) {
            nano.request({ db: accountName + "-" + my, path: '_design/search/_search/cdrs', method: 'POST', body: params }, callback);
        }
        const callReports = [];
        cdr_post_search(cdr_post_search_callback);


        function cdr_post_search_callback (err, result) {
            if (err) {
                resolve({
                    callReports: [],
                    bookmark: '',
                    my: my,
                    totalRecords: 0
                });
            }
            if (result && result.rows) {
                const callReport = result.rows.map(r => r.doc).map(cdrMapping);
                callReports.push(...callReport);
                params['bookmark'] = result.bookmark;
               
                if (result.rows.length<cdrLimit || !req.query.download )
                {
                  resolve({
                      callReports,
                      bookmark: result.bookmark,
                      my,
                      totalRecords: result.total_rows
                  });
                }
                else
                {
                 
                  cdr_post_search(cdr_post_search_callback);
                }
            }

        }
    });
}

const getNumber = (cdrTo) => {
    return cdrTo ? cdrTo.indexOf('@') > 0 ? cdrTo.split('@')[0] : cdrTo : cdrTo;
}
const calldirection = function (direction) {
    if (direction === "outbound") {
        return "inbound";
    };
    if (direction === "inbound") {
        return "outbound";
    };
};

const callrecording = function (direction, account_id, call_id) { //Adds an additional "." to the file extension for outbound calls. Bug in Kazoo.
    if (direction === "outbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + "..mp3"
    };
    if (direction === "inbound") {
        return "https://s3-us-west-2.amazonaws.com/spokerecordings/" + account_id + "/call_recording_" + call_id + ".mp3"
    };
};

const to_num = function (direction, num , to ) { //Cleans up redundancy.
    if (direction === "outbound") {
        return getNumber(num);
    };
    if ( (direction === "inbound") && (num === getNumber(to)) ) {
        return " ";
    }
    else {
        return getNumber(num);
    }
};

const cdrMapping = (cdr) => {
    const  resultdata=[];  
    //Sample data for "cdr.custom_channel_vars.media_names" need to work
     var media_nameslist=
    {
     "media_name": "7ad1c467369388de6e0be4536125595a.mp3",
     "media_names": [
                 "7ad1c467369388de6e0be4536125595a.mp3",
                 "7a17b50e1aa4ceb84a1076aeb15d81e0.mp3",
                 "7f36ddcdeacb58578629fecee03d0289.mp3"
                    ],
     };
     if(media_nameslist.media_names.length>0)
     {
         for(var i=0; i<media_nameslist.media_names.length ;i++){
            resultdata.push(
                {
                 media:callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id),
                 Id: 0
                });
         }
     };  
    return {
        id: cdr._id,
        from_number: cdr.caller_id_number.split("+1").pop(),
        to_number: getNumber(cdr.to).split("+1").pop(),
        duration: cdr.duration_seconds,
        timestamp: (cdr.timestamp - 62167219200) * 1000,
        dialed_number: cdr.custom_channel_vars.inception ? to_num(cdr.call_direction, cdr.custom_channel_vars.inception, cdr.to).split("+1").pop()  : null || cdr.callee_id_number ? to_num(cdr.call_direction, cdr.callee_id_number, cdr.to).split("+1").pop()  : null ,
        to_name: cdr.callee_id_name ? to_num(cdr.call_direction, cdr.callee_id_name, cdr.to)  : null ,
        from_name: cdr.caller_id_name || '',
        call_recording: cdr.custom_channel_vars.media_name ? callrecording(cdr.call_direction, cdr.custom_channel_vars.account_id, cdr.call_id)  : null ,
        call_recording_medias:cdr.custom_channel_vars.media_names ? resultdata:'',
        call_direction: calldirection(cdr.call_direction)
    };
};

const maybePad = (month) => {
    return `${month.toString().length === 1 ? `0${month}` : month}`;
}

// This is similiar but not *quite* identical.
// For starters this doesn't send back a response,
// It also has a different rv/send value. This returns
// an array rather than an object.
const getExtensions = (req) => {
    return new Promise(async (resolve, reject) => {
        const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));

        // Marshall all user id's to request from kazoo
        // console.log(`Starting user search`);
        const findAssignedUsers = async (userIds: string[], level = 0): Promise<string[]> => {
            // console.log(`Searching through nesting level ${level}`);
            const currentUserSelector = {
                'selector': {
                    '_id': {
                        '$in': userIds
                    },
                    'pvt_type': 'user'
                }
            };
            const usersPromise = new Promise<any[]>((resolve, reject) => {
                // console.log(currentUserSelector);
                accountDb.find(currentUserSelector, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    try {
                        // console.log(`Found ${result.docs.length} docs for these users`);
                        resolve(result.docs);
                    } catch (e) {
                        // console.error(`Couldn't fetch users (${userIds}) from the database`);
                        resolve([]);
                    }
                });
            });

            // console.log(`Starting to search for users in set`, userIds);
            const userDocs = await usersPromise;
            // console.log(`Found users`, userDocs.length);
            const descendants = [];
            userDocs.forEach(doc => {
                // console.log(`${doc._id} has ${doc['assigned_users'].length} assigned users`);
                if (doc['assigned_users'].length > 0) {
                    // console.log(doc['assigned_users']);
                    descendants.push(...doc['assigned_users'].filter(uid => uid !== doc._id));
                }
            });
            if (descendants.length > 0) {
                // console.log(`Searching through descendants`, descendants);
                const nextChildren = await findAssignedUsers(descendants, ++level);
                userIds.push(...nextChildren);
            }
            return userIds;
        }
        let userIds = [];
        try {
            userIds = await findAssignedUsers([req['decoded'].user_id]);
        } catch (e) {
            
        }        
        const userRequests = [];
        userIds.forEach(userId => {
            userRequests.push(new Promise((resolve, reject) => {
                // console.log(`Starting Kazoo request for user: ${userId}`);
                getKazooRequest(req)
                    .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${userId}`, (err, response, body) => {
                        body = JSON.parse(body);
                        if (body.error && body.error == "401") {
                            reject(err);
                        }
                        const extension = body.data && body.data.caller_id && body.data.caller_id.internal && body.data.caller_id.internal.number;
                        const externalExtension = body.data && body.data.caller_id && body.data.caller_id.external && body.data.caller_id.external.number;
                        const userId = body.data && body.data.id;
                        if (extension !== undefined) {
                            // console.log(`Body for ${extension}`, body);
                            resolve([extension, externalExtension, userId]);
                        } else {
                            resolve(null);
                        }
                    });
            }));
        });

        Promise.all(userRequests).then(results => {
            // console.log(`Finished Kazoo Requests`);
            results = results.filter(r => r !== null)
            results = results.reduce((p, c) => {
                p.push(c[0]);
                return p;
            }, []);
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

const getLastMonthCDRs = (req, res, accountName, cdrLimit) => {
    const today = new Date();
    let startMonth = today.getMonth() + 1;
    let endMonth = today.getMonth() + 1;
    let startYear = today.getFullYear();
    let endYear = today.getFullYear();
    let my = `${today.getFullYear()}${maybePad(today.getMonth() + 1)}`;
    const mys = [];
    if (req.query.startTime) {
        const startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();
    }

    if (req.query.endTime) {
        const endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth() + 1;
        endYear = endDate.getFullYear();
    }

    if (startMonth === endMonth) {
        my = `${startYear}${maybePad(startMonth)}`;
        mys.push(my);
    } else {
        let workingDate = new Date(`${startMonth}/1/${startYear}`);
        while ((workingDate.getMonth() + 1) <= endMonth || workingDate.getFullYear() < endYear) {
            if (endMonth==12 && workingDate.getMonth()+1 ==1)
            break;
            let my = `${workingDate.getFullYear()}${maybePad(workingDate.getMonth() + 1)}`;
            mys.push(my);
            workingDate.setMonth(workingDate.getMonth() + 1);
        }
    }
    // console.log('and here are the mys', mys);
    const myrs= mys.reverse();
    // Do Nano queries
    Promise.all(mys.map(my => {
        if (req.query.bookmarks) {
            const bookmarks = JSON.parse(req.query.bookmarks);
            if (Object.keys(bookmarks).indexOf(my) >= 0) {
                if (bookmarks[my] !== true) {
                    return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
                } else {
                    return doCdrSearch(accountName, my, null, req, cdrLimit);
                }
            } else {
                return Promise.resolve([]);
            }
        } else {
            return doCdrSearch(accountName, my, null, req, cdrLimit);
        }
    }))
    .then(cdrGroups => {
        const allCdrs = [];
        const bookmarks = {};
        let recordCount = 0;
        cdrGroups.forEach(cdrGroup => {
            // console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
            if (cdrGroup['callReports']) {
                // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                const recordsToGet = cdrLimit - recordCount;
                // console.log(`Getting ${recordsToGet} records`);
                if (recordsToGet === 0) {
                    bookmarks[cdrGroup['my']] = true;
                } else {
                    const recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
                    recordCount += recordsForThisMonth.length;
                    allCdrs.push(...recordsForThisMonth);
                    // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                    bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
                }
            }
        });
        res.statusCode = 200;
        res.send(JSON.stringify({
            cdrs: allCdrs,
            bookmarks,
            mys
        }));
    });
}


app.get('/verifyJWT', validateJWT, (req, res) => {
    var u_id= req['decoded'].user_id;
    var a_id= req['decoded'].account_id;
    getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${a_id}/users/${u_id}`, (err, resp3, body) => {
        if(err) {
        //    console.log("token error ", err);
            res.send(err);
            return;
        }
       // console.log("\n user\n",body);
        res.send(body);
    });
    
});
app.get("/reportdocs/search", (req, res) => {
    console.log("reportdocs");
	let body = {
      size: 20,
      from: 0,
      query: {
        "match_all":{}
      }
    };
	 search('reportdocs', body)
    .then(results => {
        var hits= results.hits.hits

        let result1 = hits.map(a => a._source);
        res.send({  

            "Status":"200",
         
            reportdocs:result1
         
         })   
    })
});

app.get('/callHistory', validateJWT, async (req, res) => {
    // let extensions = await getExtensions(req);
    // extensions = (extensions as any).join();
    const owner_id = req['decoded'].user_id;
    const cdrLimit = 150;
    // req.query.extensions = extensions;
    req.query.owner_id = owner_id;
    const end_time = new Date().getTime();
    const start_time = new Date(+ new Date().getTime() - 31 * 24 * 60 * 60 * 1000).getTime();
    req.query.startTime = start_time;
    req.query.endTime = end_time;
    let accountName = `${parseAccountToDatabaseName(req['decoded'].account_id)}`;
    getLastMonthCDRs(req, res, accountName, cdrLimit);
});

app.get('/myCallHistory/:start_time?/:end_time?', validateJWT, (req, res) => {
    const owner_id = req['decoded'] && req['decoded'].user_id;
    getKazooRequest(req)
    .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}`, (err, response, body) => {
        body = JSON.parse(body);
        // console.log('this is the extension I am looking for', extension);
        var cdrLimit = 150;
        req.query.owner_id = owner_id;
        let end_time = new Date().getTime();
        let start_time = new Date(+ new Date().getTime() - 31 * 24 * 60 * 60 * 1000).getTime();
        if (req.params.start_time) {
            start_time = req.params.start_time;
        }
        if (req.params.end_time) {
            end_time = req.params.end_time;
        }
        req.query.startTime = start_time;
        req.query.endTime = end_time;
        let accountName = `${parseAccountToDatabaseName(req['decoded'].account_id)}`;
        getLastMonthCDRs(req, res, accountName, cdrLimit);
    });
});

app.get('/getCallReports', validateJWT, (req, res) => {
    const cdrLimit = 150;

    let accountName = `${parseAccountToDatabaseName(req['decoded'].account_id)}`;

    const today = new Date();
    let startMonth = today.getMonth()+1;
    let endMonth = today.getMonth()+1;
    let startYear = today.getFullYear();
    let endYear = today.getFullYear();
    let my = `${today.getFullYear()}${maybePad(today.getMonth()+1)}`;
   // let pageno=0;
    //let monthindex=0;
    //let monthlist=[];
    const mys = [];
    //if (req.query.Page)
     // pageno=req.query.Page;
   

   // if (req.query.Monthindex)
     //   monthindex=req.query.Monthindex;

    if (req.query.startTime) {
        const startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth()+1;
        startYear = startDate.getFullYear();
    }

    if (req.query.endTime) {
        const endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth()+1;
        endYear = endDate.getFullYear();
    }

    if (startMonth === endMonth) {
        my = `${startYear}${maybePad(startMonth)}`;
        mys.push(my);
       /* monthlist.push ({month: startMonth,
                        year: startYear});*/
    } else {
        let workingDate = new Date(`${startMonth}/1/${startYear}`);
        let tmpindex=0;
        while ((workingDate.getMonth()+1) <= endMonth || workingDate.getFullYear() < endYear) {
            if (endMonth==12 && workingDate.getMonth()+1 ==1)
            break;
            let my = `${workingDate.getFullYear()}${maybePad(workingDate.getMonth()+1)}`;
           
         
                mys.push(my);
            tmpindex++;
       
            workingDate.setMonth(workingDate.getMonth()+1 );
        }
    }

    const myrs= mys.reverse(); //latest month should come first
    Promise.all(myrs.map(my => {
if (req.query.bookmarks) {
const bookmarks = JSON.parse(req.query.bookmarks);
if (Object.keys(bookmarks).indexOf(my) >= 0) {
if (bookmarks[my] !== true) {
return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
} else {
return doCdrSearch(accountName, my, null, req, cdrLimit);
}
} else {
return Promise.resolve([]);
}
} else {
return doCdrSearch(accountName, my, null, req, cdrLimit);
}
}))
.then(cdrGroups => {
const allCdrs = [];
const bookmarks = {};
let recordCount = 0;
cdrGroups.forEach(cdrGroup => {
// console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
if (cdrGroup['callReports']) {
// console.log(cdrGroup['my'], cdrGroup['callReports'].length);
const recordsToGet = cdrLimit - recordCount;
                // console.log(`Getting ${recordsToGet} records`);
                if (req.query.download)
                {
                    allCdrs.push(...cdrGroup['callReports']);
                }
else if (recordsToGet === 0) {
bookmarks[cdrGroup['my']] = true;
} else {
const recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
recordCount += recordsForThisMonth.length;
allCdrs.push(...recordsForThisMonth);

bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
}
}
});
        res.statusCode = 200;
       
res.send(JSON.stringify({
cdrs: allCdrs,
bookmarks
}));
});
});

app.get('/scheduledCallReports', (req, res) => {
    const cdrLimit = 200;

    let accountName = `${parseAccountToDatabaseName(req.query.account_id)}`;

    const today = new Date();
    let startMonth = today.getMonth()+1;
    let endMonth = today.getMonth()+1;
    let startYear = today.getFullYear();
    let endYear = today.getFullYear();
    let my = `${today.getFullYear()}${maybePad(today.getMonth()+1)}`;
    const mys = [];
    if (req.query.startTime) {
        const startDate = new Date(+req.query.startTime);
        startMonth = startDate.getMonth()+1;
        startYear = startDate.getFullYear();
    }

    if (req.query.endTime) {
        const endDate = new Date(+req.query.endTime);
        endMonth = endDate.getMonth()+1;
        endYear = endDate.getFullYear();
    }

    if (startMonth === endMonth) {
        my = `${startYear}${maybePad(startMonth)}`;
        mys.push(my);
    } else {
        let workingDate = new Date(`${startMonth}/1/${startYear}`);
        while ((workingDate.getMonth()+1) <= endMonth && workingDate.getFullYear() <= endYear) {
            let my = `${workingDate.getFullYear()}${maybePad(workingDate.getMonth()+1)}`;
            mys.push(my);
            workingDate.setMonth(workingDate.getMonth() + 1);
        }
    }

    // Do Nano queries
        Promise.all(mys.map(my => {
            if (req.query.bookmarks) {
                const bookmarks = JSON.parse(req.query.bookmarks);
                if (Object.keys(bookmarks).indexOf(my) >= 0) {
                    if (bookmarks[my] !== true) {
                        return doCdrSearch(accountName, my, bookmarks[my], req, cdrLimit);
                    } else {
                        return doCdrSearch(accountName, my, null, req, cdrLimit);
                    }
                } else {
                    return Promise.resolve([]);
                }
            } else {
                return doCdrSearch(accountName, my, null, req, cdrLimit);
            }
        }))
            .then(cdrGroups => {
                const allCdrs = [];
                const bookmarks = {};
                let recordCount = 0;
                cdrGroups.forEach(cdrGroup => {
                    // console.log(`${cdrGroup['my']} - ${cdrGroup['totalRecords']}`);
                    if (cdrGroup['callReports']) {
                        // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                        const recordsToGet = cdrLimit - recordCount;
                        // console.log(`Getting ${recordsToGet} records`);
                        if (recordsToGet === 0) {
                            bookmarks[cdrGroup['my']] = true;
                        } else {
                            const recordsForThisMonth = cdrGroup['callReports'].splice(0, recordsToGet);
                            recordCount += recordsForThisMonth.length;
                            allCdrs.push(...recordsForThisMonth);
                            // console.log(cdrGroup['my'], cdrGroup['callReports'].length);
                            bookmarks[cdrGroup['my']] = cdrGroup['bookmark'];
                        }
                    }
                });
                res.statusCode = 200;
                res.send(JSON.stringify({
                    cdrs: allCdrs,
                    bookmarks
                }));
            })

});

app.get('/extensions', validateJWT, async (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));

    // Marshall all user id's to request from kazoo
    // console.log(`Starting user search`);
    const findAssignedUsers = async (userIds: string[], level = 0): Promise<string[]> => {
        // console.log(`Searching through nesting level ${level}`);
        const currentUserSelector = {
            'selector': {
                '_id': {
                    '$in': userIds
                },
                'pvt_type': 'user'
            }
        };
        const usersPromise = new Promise<any[]>((resolve, reject) => {
            // console.log(currentUserSelector);
            accountDb.find(currentUserSelector, (err, result) => {
                if (err) {
                    reject(err);
                }
                try {
                    // console.log(`Found ${result.docs.length} docs for these users`);
                    resolve(result.docs);
                } catch (e) {
                    // console.error(`Couldn't fetch users (${userIds}) from the database`);
                    resolve([]);
                }
            });
        });

        // console.log(`Starting to search for users in set`, userIds);
        const userDocs = await usersPromise;
        // console.log(`Found users`, userDocs.length);
        const descendants = [];
        userDocs.forEach(doc => {
            // console.log(`${doc._id} has ${doc['assigned_users'].length} assigned users`);
            if ( doc.hasOwnProperty("assigned_users") && doc['assigned_users'].length > 0 ) {
                // console.log(doc['assigned_users']);
                descendants.push(...doc['assigned_users'].filter(uid => uid !== doc._id));
            } else {
                console.log("NOTHING");
                descendants.push.apply(descendants, null);
            }
        });
        if (descendants.length > 0) {
            // console.log(`Searching through descendants`, descendants);
            const nextChildren = await findAssignedUsers(descendants, ++level);
            userIds.push(...nextChildren);
        }
        return userIds;
    }

    let userIds = [];
    try {
        userIds = await findAssignedUsers([req['decoded'].user_id]);
    } catch (e) {
        // console.error(`Couldn't fetch assigned users for ${req['decoded'].user_id}`);
    }
    // console.log(`Found users`, userIds);

    // Request user info from kazoo
    const userRequests = [];
    userIds.forEach(userId => {
        userRequests.push(new Promise((resolve, reject) => {
            // console.log(`Starting Kazoo request for user: ${userId}`);
            getKazooRequest(req)
                .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${userId}`, (err, response, body) => {
                    body = JSON.parse(body);
                    if (body.error && body.error == "401") {
                        reject(err);
                    }
                    const extension = body.data && body.data.caller_id && body.data.caller_id.internal && body.data.caller_id.internal.name;
                    const externalExtension = body.data && body.data.id;
                    const userId = body.data && body.data.id;
                    if (extension !== undefined) {
                        // console.log(`Body for ${extension}`, body);
                        resolve([extension, externalExtension, userId]);
                    } else {
                        resolve(null);
                    }
                });
        }));
    });

    Promise.all(userRequests).then(results => {
        // console.log(`Finished Kazoo Requests`);
        results = results.filter(r => r !== null)
        results = results.reduce((p, c) => {
            p[c[0]] = {
                external: c[1] || null,
                selected: false,
                userId: c[2] || null
            }; return p;
        }, {});
        const results_ordered = {};
                    Object.keys(results).sort().forEach(function(key) {
                        results_ordered[key] = results[key];
                      });
                 
        res.send(results);
    }).catch(err => {
        res.statusCode = 403;
        res.send(JSON.stringify(err));
    });
   
});

app.post('/updateDeliveryStatus', validateJWT, (req, res) => {
try {
const payload = JSON.parse(req.body.payload);
       
        const today = new Date(payload.time);
      const my = `${today.getFullYear()}${maybePad(today.getMonth() + 1)}`;
       
        const accountDb = parseAccountToDatabaseName(req['decoded'].account_id);
        const db_name= `${accountDb}-${my}_sms`
        const sms_accountdb = nano.use(db_name);
        console.log("get text db name ", db_name);
       
sms_accountdb.insert(payload, (err, body) => {
if(err) {
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
catch(e) {
//console.log(e);
res.statusCode = 400;
res.send("Invalid request");
}
});

app.patch('/updateContact', validateJWT, (req, res) => {
try {
const payload = JSON.parse(req.body.payload);
const id = payload._id;
const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
accountDb.insert(payload, (err, body) => {
if(err) {
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
catch(e) {
//console.log(e);
res.statusCode = 400;
res.send("Invalid request");
}
});

app.get('/privilege', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(req['decoded'].user_id, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /contacts`);
                res.send(err);
            }
        } else {
            res.statusCode = 200;
            res.send(JSON.stringify(result.priv_level));
        }
    });
});

app.get('/contacts', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
const contactsSelector = {
'selector': {
            '$and': [
                {
                    'pvt_type': 'contact',
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
        limit:30000
}
accountDb.find(contactsSelector, function (err, result) {
if (err) {
try {
res.statusCode = result.statusCode;
res.send(err);
} catch (e) {
console.error(`Couldn't access the db in /contacts`);
res.send(err);
}
        }
        else {
            res.statusCode = 200;
           
            result.docs = result.docs.filter(e => {
                return !e.hasOwnProperty("pvt_deleted") || e.pvt_deleted!= true;
            });
           result.docs.forEach(function(rec) {
                rec.updatePublic= rec.owner_id===  req['decoded'].user_id;
            });
            res.send(JSON.stringify(result));
        }
});
})

 



app.post('/outbound_sms', validateJWT, (req, res, next) => {
const payload = JSON.parse(req.body.payload);
client.Message.send({
from: payload.from,
to: payload.to,
        text: payload.content,
        callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
        receiptRequested:'all',
        // These are being added to the tag so that we can find the db
        // in the webhook as well as record the user ID that sent the text
        tag: `${req['decoded'].account_id} ${req['decoded'].user_id}`
})
.then(function (message) {
res.send(JSON.stringify(message));
})
.catch(function (err) {
        res.statusCode = 500;
res.send(JSON.stringify(err));
});
});

app.get('/textPermissions', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(req['decoded'].user_id, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /contacts`);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            res.send(JSON.stringify(result.text_permissions));
        }
    });
});

app.get('/messageInfo/:id', validateJWT, (req, res) => {
client.Message.get(req.params.id)
.then(message => {
res.statusCode = 200;
res.send(message);
})
.catch(err => {
res.statusCode = 403;
res.send(err)
});
});

// This is the webhook for outbound messages
app.post('/messageURL', async (req, res) => {
    const today = new Date();
    const my = `${today.getFullYear()}${maybePad(today.getMonth() + 1)}`;
    // Grab the IDs from the tag
    const [account_id, user_id] = req.body.tag.split(' ');
    const account_name = parseAccountToDatabaseName(account_id);
    const accountDb = nano.use(`${account_name}-${my}_sms`);
    let doc = {...req.body};
    doc.account_id = account_id;
    doc.user_id = user_id;
    accountDb.insert(doc, (err, body) => {
        if (err) {
            res.statusCode = 500;
            res.send(JSON.stringify(err));
        }
        else {
            res.statusCode = 200;
            doc._rev = body.rev;
            Request.post(`${process.env.WEBSOCKET_SERVER}`, {
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(doc)
            });
            res.send();
        }
    });
});

app.post('/incomingMessage', async (req, res) => {
     const putData = {
        data: {
            credentials: `${process.env.KAZOO_CREDENTIAL_HASH}`,
            account_name: `${process.env.KAZOO_ACCOUNT_NAME}`
        },
        verb: "PUT"
    };
    Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
        body: JSON.stringify(putData)
    }, async (err: Error, response: Request.RequestResponse, body: any) => {
        if (err)    {
            res.statusCode = 200;
            res.send();
            return;
        }
        if (response && response.statusCode === 201) {
            body = JSON.parse(body);
            const auth_token = body.auth_token;
            let today = new Date();
            let my = "" + today.getFullYear() + maybePad(today.getMonth() + 1);
            let hs_api_path = `${process.env.KAZOO_SERVER}/v2/accounts/${process.env.KAZOO_ACCOUNT_ROOT}/phone_numbers/` + req.body.to + "/identify"; // API URL path to lookup number -account fc0f2fbed1513277c3846e0cf0c66d4c is the root account.
            let options = {
                url: hs_api_path,
                json: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': auth_token
                }
            };
            Request.get(options, async (error, response, kazoo_body) => { //Send api request to Kazoo to lookup number.
                if (error) {
                    res.statusCode = 200;
                    res.send();
                    return;
                } else {
                    if (kazoo_body.data.account_id) {
                        let db_name = "account/" + kazoo_body.data.account_id.substr(0, 2) + "/" + kazoo_body.data.account_id.charAt(2) + kazoo_body.data.account_id.charAt(3) + "/" + kazoo_body.data.account_id.substring(4) + "-" + my + "_sms"; //Saves SMS message in Account's Month SMS DB
                        let smsDB = nano.use(db_name);
                        let inbound_SMS = req.body;
                        inbound_SMS.carrier = "bandwidth";
                        inbound_SMS._id = req.body.messageId;
                        inbound_SMS.read = false;
                        smsDB.insert(inbound_SMS, (err, body) => {
                            if(!err) {
                                inbound_SMS._rev = body.rev;
                                inbound_SMS.account_id = kazoo_body.data.account_id;
                                Request.post(`${process.env.WEBSOCKET_SERVER}`, {
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify(inbound_SMS)
                                });
                            }
                        });
                    }
                }
            });
        } else {
            res.statusCode = 200;
            res.send();
        }
    });
});

app.post('/messageHistory', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const {num1, num2} = payload;
    const selector = {
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
                    '$or':[
                        {
                            '$not': {
                                '$and':[
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
        limit:200,
       
        'sort': [{
            'time': 'desc'
        }]
    };
    let docs = [];
    const d = new Date();
    let year = d.getUTCFullYear();
    let month: number | string = d.getUTCMonth() + 1;
    while (docs.length < 25) {
        let month_string = month.toString();
        if (month_string.length === 1) {
            month_string = `0${month_string}`;
        }
        const db_name = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year}${month_string}_sms`;
        let last_month: number | string = month - 1;
        if (month === 1) {
            last_month = 12;
            year--;
        }
        month = last_month;
        try {
            let db = nano.use(db_name);
            let new_docs = await new Promise((resolve, reject) => {
                db.find(selector, (err, body) => {
                    if(err) {
                        reject(err);
                    }
                    else {
                        resolve(body.docs);
                    }
                });
            });
            docs = docs.concat(new_docs);
           
        }
        catch(e) {
            if (month!=d.getUTCMonth() )
            break;
        }
    }
    res.send(docs);


});

app.post('/newMessages', (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const rv = {
        success: false,
        call1: null,
        call2: null
    };
    const promise1 = client.Message.list({
        to: payload.num1,
        from: payload.num2,
        size: 1000,
        fromDateTime: payload.timestamp,
        sortOrder: "desc"
    });
    const promise2 = client.Message.list({
        to: payload.num2,
        from: payload.num1,
        size: 1000,
        fromDateTime: payload.timestamp,
        sortOrder: "desc"
    });
    Promise.all([promise1, promise2]).then(values => {
        rv.call1 = values[0];
        rv.call2 = values[1];
        rv.success = true;
        res.statusCode = 200;
        res.send(rv);
    }).catch(r => {
        res.statusCode = 403;
        res.send(JSON.stringify(r));
    });
});

app.post('/old_loadMoreTexts', validateJWT, (req, res) => {
    const payload = JSON.parse(req.body.payload);
    // Typescript doesn't like object destructuring
    const timestamp = payload.timestamp;
    const d = new Date(timestamp);
    const year1 = d.getUTCFullYear();
    let year2 = year1;
    let this_month: number | string = d.getUTCMonth() + 1;
    let last_month: number | string = this_month - 1;
    if (this_month === 1) {
        last_month = 12;
        year2--;
    }
    this_month = this_month.toString();
    last_month = last_month.toString();
    if (this_month.length === 1) {
        this_month = `0${this_month}`;
    }
    if (last_month.length === 1) {
        last_month = `0${last_month}`;
    }
    const { num1, num2 } = payload;
    const db1 = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year1}${this_month}_sms`;
    const db2 = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year2}${last_month}_sms`;
    let textDB = nano.use(db1);
    const selector = {
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
    textDB.find(selector, (err, body) => {
        if (err) {
            res.send(err);
        }
        else {
            if(body.docs.length < 25) {
                const prevDB = nano.use(db2);
                prevDB.find(selector, (err2, body2) => {
                    if(err2) {
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

app.post('/loadMoreTexts', validateJWT, async (req, res) => {
    const payload = JSON.parse(req.body.payload);
    const timestamp = payload.timestamp;
    const { num1, num2 } = payload;
    let d = new Date(timestamp);
    const selector = {
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
    let docs = [];
    let year = d.getUTCFullYear();
    let month: number | string = d.getUTCMonth() + 1;
    while (docs.length < 25) {
        let month_string = month.toString();
        if (month_string.length === 1) {
            month_string = `0${month_string}`;
        }
        const db_name = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year}${month_string}_sms`;
        try {
            let db = nano.use(db_name);
            let new_docs = await new Promise((resolve, reject) => {
                db.find(selector, (err, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(body.docs);
                    }
                });
            });
            docs = docs.concat(new_docs);
            let last_month: number | string = month - 1;
            if (month === 1) {
                last_month = 12;
                year--;
            }
            month = last_month;
        }
        catch (e) {
            break;
        }
    }
    res.send(docs);
});

app.get('/settings', validateJWT, (req, res) => {
   // 56c01cc1cbc62ea1f4de11c8608d8f3d
   const payload = {
       data: {
        notify_email_addresses:["manish@gmail.com","manishbill@gmail.com"]
       }
   }
   const kRequest2 = getKazooRequest(req)
   .patch({
       url: `${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/56c01cc1cbc62ea1f4de11c8608d8f3d`,
       body: payload,
       json: true
   },
   (e, r, b) => {
       if (e) {
           console.log("\n\n\nerror \n\n\n\n");
          // res.send(JSON.stringify(e));
           //return;
       }
       else { 
           console.log("\n\n\n\sucess\n\n\n\n" ,  b);
       }
   }
   );

   
    const kRequest = getKazooRequest(req)
    .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}`, (err, response, body) => {
        res.send(body);
    });
});

app.post('/updateSettings', validateJWT, (req, res) => {
    const payload = { ...req.body };
    const body:any = {
        data: {
            vm_to_email_enabled: payload.vm_to_email_enabled,
            call_forward: {
                enabled: payload.enable_call_forward
            }
        }
    };
    if(body.data.vm_to_email_enabled) {
        body.data.email = payload.email
    }
    if(body.data.call_forward.enabled) {
        body.data.call_forward.number = payload.phone_number;
        body.data.call_forward.substitute = payload.ring_voip_phone;
        body.data.call_forward.keep_caller_id = payload.keep_caller_id;
    }
    const kRequest = getKazooRequest(req)
    .patch({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}`,
        body: body,
        json: true
    },
    (err, response, body) => {
     //   console.log(response);
        if(err) {
            console.log(err);
        }
        res.send(body);
    });
});

app.post('/uploadAvatar', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const payload = { ...req.body };
    accountDb.attachment.insert(payload.id, payload.fd.file.filename, new Buffer(payload.fd.file.filename, "binary"), payload.fd.file.mimetype,
    { rev: payload.rev }, (err, body) => {
        if (err) {
            res.send(err);
        }
        else {
            accountDb.attachment.get(payload.id, payload.fd.file.filename).then((body) => {
            res.send(body);
        });
        }
    });
});
app.post("/mixpanel/:type", validateJWT, (req, res) => {
    var type = req.params.type;
    var body = {type: type, distinct_id: Math.floor(Date.now() / 1000), username: req.body.data.username ? req.body.data.username : '', email: req.body.data.email ? req.body.data.email : '', url: req.body.config.url ? req.body.config.url : '', first_name: req.body.data.first_name ? req.body.data.first_name : '', last_name: req.body.data.last_name ? req.body.data.last_name : '', timestamp: moment().toISOString()};
    mixpanel.track(type, body,(err)=>{if(err){ console.log("mixpanel error"); console.log(err); }});
    
    res.send('success');
})
app.post('/quickCall/:device_id/:phone_number', validateJWT, (req, res) => {
    getKazooRequest(req).
        get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/devices/${req.params.device_id}/quickcall/${req.params.phone_number}`
        , (err, response, body) => {
            res.send(response);
        });

});

app.get('/devices', validateJWT, (req, res) => {
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/devices/status`, (err, response, body) => {
            resolve(body);
        });
    });
    const promise2 = new Promise((resolve, reject) => {
        getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req['decoded'].user_id}/devices`, (err, response, body) => {
            resolve(body);
        });
    });
    const promise3 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/devices/fc5ae4217d1e71b63f3da8125143a14e`, (err, response, body) => {
                resolve(body);
            });
    });
    Promise.all([promise1, promise2, promise3]).then(([device_status, devices, tmp]) => {
        const rv = {
            device_status: device_status,
            devices: devices,
            tmp
        }
        res.send(rv);
    });
});

app.get ('/voicemailaudio/:dbname/:media_id/:attachment', (req, res) => {

       
    const encodeddb=  encodeURIComponent(req.params.dbname);
   // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
   const attachementurl = `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
 
   download(attachementurl)
.then(data => {
     
            res.statusCode = 200;
    res.send(data);
}).catch(error => {
    console.log(`Something happened: ${error}`);
})
});

app.post ('/downloadfile/', (req, res) => {
console.log ('downloadfile');
console.log (req.body);
var   fileurl = req.body.fileurl;
  //  const fileurl=  encodeURIComponent('http://www.africau.edu/images/default/sample.pdf');
   // const attachementurl ='http://www.africau.edu/images/default/sample.pdf';// `${process.env.COUCHBASE_DB}${encodeddb}/${req.params.media_id}/${req.params.attachment}`;
  console.log (fileurl);
 
   download(fileurl)
.then(data => {
     
            res.statusCode = 200;
    res.send(data);
})
});

app.get('/voicemailaudioattachment/:id/:my',validateJWT, (req, res) => {
   
    const encodeddb=  encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id));
 
    const reqUrl = `${process.env.COUCHBASE_DB}/${encodeddb}-${req.params.my}/${req.params.id}`;
    // console.log(reqUrl);
    const couchbaseRequest = Request.get(reqUrl,
    (error: Error, response: Request.RequestResponse, body: any) => {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = response.statusCode;
       
        let resp= JSON.parse(body);
        resp.COUCHBASE_DB= process.env.COUCHBASE_DB;
        resp.dbname= `${encodeddb}-${req.params.my}`;

        res.statusCode = 200;
        res.send(resp);
    })
});


app.get('/voicemails', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes`, (err, response, body) => {
            const rv = {
                vm_id: '',
                body: []
            };
            const tmp = JSON.parse(body);
            const data = tmp.data;
            if(data && Array.isArray(data)) {
                const vm_id = data.find(e => {
                    return e.owner_id === req['decoded'].user_id
                }).id;
                rv.vm_id = vm_id;
                const kRequest2 = getKazooRequest(req)
                    .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/${vm_id}/messages`, (err, response, body) => {
                        rv.body = body;
                        res.send(rv);
                    });
            }
            else {
                res.send("oh no");
            }
        });
});

app.delete('/voicemail/:vm_id/:media_id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
    .del(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/${req.params.vm_id}/messages/${req.params.media_id}`
    , (err, response, body) => {
        res.send(response);
    });
});

app.get('/voicemailAudio/:vm_id/:media_id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/${req.params.vm_id}/messages/${req.params.media_id}/raw`, (err, response, body) => {
            res.send(response);
    });
});

app.post('/markVoicemailAsRead/:vm_id/:media_id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .post(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/${req.params.vm_id}/messages/${req.params.media_id}?folder=saved`, (err, response, body) => {
            res.send(response);
        });
});

app.get('/getTemplate', (req, res) => {
    res.download(__dirname + '/hellospoke_contact_import.csv');
});

app.post('/sendMMSFile', validateJWT, s3_upload.single('file'), (req, res) => {
    client.Message.send({
        from: req.body.from,
        to: req.body.to,
        text: '',
        callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
        media: [`https://s3-us-west-2.amazonaws.com/spoke-mms/${req['file'].key}`],
        tag: `${req['decoded'].account_id} ${req['decoded'].user_id}`
    })
    .then(resp => {
        res.send(resp);
    })
    .catch(err => {
        res.send(err);
    });
});
app.post('/uploadContactImage', validateJWT, s3_upload.single('file'), (req, res) => {

     
    const resposne = {
       imageurl:`https://s3-us-west-2.amazonaws.com/spoke-mms/${req['file'].key}`
    }

    res.statusCode = 200;
    res.send(JSON.stringify(resposne));
});
app.post('/importContacts', validateJWT, upload.single('file'), (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const contents = req['file']['buffer'].toString();
    const lines = contents.split(/[\r\n]+/);
    const len = lines.length;
  //  console.log('po0p',len)
    let contacts = [];
    for(let i = 1; i < len; i++) {
        const fields = lines[i].split(',');
     //   console.log(fields)
       // console.log(JSON.stringify(fields))
        if(fields.length === 1) {
            continue;
        }
        if(fields.length !== 14) {
            res.statusCode = 406;
            res.send('Invalid CSV format.');
            return;
        }

        if(fields[0] === '' || fields[1] === '') {
            res.statusCode = 406;
            res.send('Both a first name and last name are required');
            return;
        }
        if(fields[2] === '' && fields[3] === '') {
            res.statusCode = 406;
            res.send('A contact must have a main or a mobile number');
            return;
        }
        if(fields[0] === '' && fields[1] === '' && fields[2] === '' && fields[3] === '') {
            res.statusCode = 406;
            res.send('Please fill required field');
            return;
        }
        const contact = {
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
            owner_id: req['decoded'].user_id,
        }
        contacts.push(contact);
    }
    Promise.all(contacts.map(contact => {
        return new Promise((resolve, reject) => {
            accountDb.insert(contact, (err, body) => {
                if (err) {
                   // console.log(err);
                    reject('Could not insert');
                }
                else {
                    resolve();
                }
            })
        })
    })).then(() => {
        res.send(JSON.stringify(contacts));
    }).catch(r => {
        res.send("Could not insert contacts");
    });
});
``
app.post('/addCallerToContacts', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const payload = JSON.parse(req.body.payload);
  //  console.log('addCallerToContacts   ',payload.number);
    let contact = {
        first_name  : payload.fname,
        last_name   : payload.lname,
        custermerid : payload.custermerid,
        extension   : payload.extension,
        compny_name : payload.coyname,
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
            country: '',
        },
        email: [
            payload.email,
        ],
        allows_texts: true,
        notes: [],
        pvt_type: "contact",
        private: payload.private,//payload.mobile ? false : true,
        owner_id: req['decoded'].user_id,
    };
    accountDb.insert(contact, (err, body) => {
        if (err) {
            res.send(err);
        }
        else {
            (contact as any)._id = body.id;
            (contact as any)._rev = body.rev;
            res.send(contact);
        }
    });
});

app.post('/createContactFromNumber', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const payload = JSON.parse(req.body.payload);
    let contact = {
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
            country: '',
        },
        email: [
            '',
        ],
        allows_texts: true,
        notes: [],
        pvt_type: "contact",
        private: false,
        owner_id: req['decoded'].user_id,
    };
    accountDb.insert(contact, (err, body) => {
        if (err) {
            res.send(err);
        }
        else {
            (contact as any)._id = body.id;
            (contact as any)._rev = body.rev;
            res.send(contact);
        }
    });
});




app.put('/updateUsers', validateJWT, (req, res) => {
    //console.log("here is the user object 11111111111");
    const payload = req.body.payload;
    const accountDb = nano.use(parseAccountToDatabaseName(payload.account_id));
    let response_data = [];
  //  console.log("here is the user object", payload);
    const count = payload.users.length;
    for(const user of payload.users) {
      //  console.log("user  "  +JSON.stringify(user));
   //  console.log("here is the user object", user);
        Object.keys(user.text_permissions).forEach(function(key) {
            const phonenumber = user.text_permissions[key].phone_number;
           // console.log(phonenumber);
           

            const options = { method: 'GET',
            url: 'https://api.catapult.inetwork.com/v1/users/u-enlczxkbnudy7tclkqsnyea/phoneNumbers/'+phonenumber ,
            headers:
            { 'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                Authorization: 'Basic dC0ydWFrYXFxbDZnbWxuNWM1azJwbmJvYTo3Z3JoeHdyb3J5ejJzNHdudWdnam03amlkcGE0aWNyZW5yejV2dXE=' } };

            Request(options, function (error, response, body) {
                if (error) {
                    console.log(error);
                }
                else {
                   // console.log('body  ' + body);
                   // console.log(response.statusCode);
                   if (response.statusCode === 404){
                        console.log(" Number lookup failed "+phonenumber);
                        const options = { method: 'POST',
                        url: 'https://api.catapult.inetwork.com/v1/users/u-enlczxkbnudy7tclkqsnyea/phoneNumbers',
                        headers:
                        { 'cache-control': 'no-cache',
                            'Content-Type': 'application/json',
                            Authorization: 'Basic dC0ydWFrYXFxbDZnbWxuNWM1azJwbmJvYTo3Z3JoeHdyb3J5ejJzNHdudWdnam03amlkcGE0aWNyZW5yejV2dXE=' },
                        body:
                        { number: phonenumber,
                            applicationId: 'a-leuyl4wkaxyvktoaynmgepy',
                            name: 'SMS_in',
                            provider:
                            { providerName: 'bandwidth-dashboard',
                                properties:
                                { accountId: '5000040',
                                userName: 'mrice',
                                password: 'bandwidthV0itr3ss1' } } },
                        json: true };

                        Request(options, function (error, response, body) {
                            if (error) {console.log(error);}
                            else{ console.log(body);}
                        });
                    }
                }
            });
        });

       
        accountDb.insert(user, (err, body) => {
            if(err) {
                console.log("Could not insert "  +err);
                res.send(`Error, could not insert ${user._id}`);
                return;
            }
            // The body parameter only includes: { id: id_of_inserted_doc, rev: rev_of_inserted_doc }
            // for inserts. However, we still don't need this because if the insertion was successful
            // then the user from payload.users is essentially the doc. Will remove.
            else {
               
                const payload = {
                    data: {
                        priv_level: user.priv_level,                        
                        "call_recording":{
                            "inbound":{
                              "offnet":{
                                enabled:user.callrecord_external
                              },
                              "onnet":{
                                enabled:user.callrecord_internal
                              }
                            }
                            ,"outbound":{
                              "offnet":{
                                enabled:user.callrecord_external
                              },
                              "onnet":{
                                enabled:user.callrecord_internal
                              }
                            }
                           

                        }
                    }
                }
                const kRequest = getKazooRequest(req)
                .patch({
                    url: `${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${user._id}`,
                    body: payload,
                    json: true
                },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                        res.send(JSON.stringify(e));
                        return;
                    }
                    else {
                        //console.log(JSON.stringify(r.body));
                        user._rev=body.rev;
                        response_data.push(user);
                        if (response_data.length === count) {
                            res.send(response_data);
                        }
                    }
                });
            }
        });
    }
});

app.post('/updateMasterUser/:id', validateJWT, (req, res) => {
    const payload = req.body.payload;
    console.log(payload);
   const id = req.params.id;
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    accountDb.get(id, (err, _userobj) => {
        if(err) {
            res.send(err);
        }
        else {
            _userobj.first_name=payload.first_name;
            _userobj.last_name=payload.last_name;
            _userobj.email=payload.email;
             accountDb.insert( _userobj, (update_err, update_body) => {
                if(update_err) {
                    res.send(update_err);
                    console.log(update_err);
                }
                else {
                    res.send("sucsess");
                }
            })
        }
                    
    });
});





app.get('/presence11:username', validateJWT, (req, res) => {
    //console.log("here is the user object 11111111111");
    const payload = req.body.payload;
     
    
});


app.get('/tmp_users', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users`, (err, response, body) => {
            res.send(body);
        });
});


app.get('/notes/:contact_id', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const notes = [];
    accountDb.get(req.params.contact_id, (err, result) => {
        //console.log(result.notes.length);
        if(err) {
            res.send(err);
            return;
        }
        if(result.notes.length==0){
            res.send(err);
            return;
        }
        else {
            if(typeof result.notes === "undefined") {
                res.send(notes);
                return;
            }
            const ids  = result.notes.filter(function (el) {
                return typeof el == "string";
              });
              const len = ids.length;
            for(const id of ids) {
                accountDb.get(id, (note_err, note) => {
                    if(note_err) {
                        res.send(note_err);
                    }
                    else {
                        notes.push(note);
                        if(notes.length === len) {
                            res.send(notes);
                        }
                    }
                });
            }
        }
    });
});

app.post('/saveNote', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const note = req.body.note;
    accountDb.insert(note, (err, result) => {
        if(err) {
            res.send(err);
            return;
        }
        else {
            const id = result.id;
            accountDb.get(note.contact_id, (contact_err, contact) => {
                if(contact_err) {
                    res.send(contact_err);
                    return;
                }
                else {
                    // This is a new note, we need to add the note
                    // to the contact's notes array and then get the note
                    if(typeof contact.notes === "undefined") {
                        contact.notes = [];
                    }
                    if(typeof contact.notes.find(e =>  e === id) === "undefined") {
                        contact.notes.push(id);
                        accountDb.insert(contact, (update_body_err, updated_contact_body) => {
                            if (update_body_err) {
                                res.send(update_body_err);
                                return;
                            }
                            else {
                                accountDb.get(updated_contact_body.id, (update_err, updated_contact) => {
                                    const len = updated_contact.notes.length;
                                    let rv = {
                                        notes: [],
                                        rev: updated_contact._rev
                                    };
                                    accountDb.fetch({ keys: updated_contact.notes}, (e, n) => {
                                        if(e) {
                                            res.send(e);
                                            return;
                                        }
                                        else {
                                            n = n.rows.map(e =>
                                                e = e.doc
                                            );
                                            rv.notes = n;
                                            res.send(JSON.stringify(rv));
                                            return;
                                        }
                                    });
                                });
                            }
                        });
                    }
                    // This is an updated note, need to fetch the updated note
                    else {
                        const len = contact.notes.length;
                        let rv = {
                            rev: null,
                            notes: []
                        };
                        accountDb.fetch({ keys: contact.notes }, (e, n) => {
                            if (e) {
                                res.send(e);
                            }
                            else {
                                n = n.rows.map(e =>
                                    e = e.doc
                                );
                                rv.notes = n;
                                res.send(JSON.stringify(rv));
                                return;
                            }
                        });
                    }
                }
            });
        }
    });
});

app.delete('/deleteNote/:note_id/:note_rev/:contact_id', validateJWT, (req, res) => {
    const id = req.params.note_id;
    const rev = req.params.note_rev;
    const contact_id = req.params.contact_id;
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const rv = {
        rev: null,
        notes: []
    }
    accountDb.get(contact_id, (err, contact) => {
        if(err) {
            res.send(err);
        }
        else {
            contact.notes = contact.notes.filter(e => {
                return e !== id
            });
            accountDb.insert(contact, (update_err, updated_contact_body) => {
                if(update_err) {
                    res.send(update_err);
                }
                else {
                    accountDb.destroy(id, rev, (delete_err, delete_body) => {
                        if(delete_err) {
                            res.send(delete_err);
                        }
                        else {
                            accountDb.get(updated_contact_body.id, (contact_err, updated_contact) => {
                                if(contact_err) {
                                    res.send(contact_err);
                                }
                                else {
                                    rv.rev = updated_contact._rev;
                                    const len = updated_contact.notes.length;
                                    accountDb.fetch({ keys: updated_contact.notes }, (e, n) => {
                                        if (e) {
                                            res.send(e);
                                        }
                                        else {
                                            n = n.rows.map(e =>
                                                e = e.doc
                                            );
                                            rv.notes = n;
                                            res.send(JSON.stringify(rv));
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            });
        }
    });
});

//Delete contact by _id
app.delete('/deleteContact/:contact_id/:contact_rev/', validateJWT, (req, res) => {
    const rev = req.params.contact_rev;
    const contact_id = req.params.contact_id;
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));  
    accountDb.get(contact_id, (err, contact) => {
        if(err) {
            res.send(err);  
        }
        else {
            accountDb.destroy(contact_id, rev,  (delete_err, delete_body) => {
                if(delete_err) {
                    res.send(delete_err);
                  }
                  else{
                     res.send( { message: "deleted " });
                  }
            })
        }
    });
});



app.get('/scheduledReports', validateJWT, (req, res) => {
    // Get the real scheduled reports for this user
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    const scheduledReportSelector = {
        'selector': {
            'user_id': req['decoded'].user_id,
            'pvt_type': 'scheduled_report'
        },
        // 'use_index': ['query', 'scheduled-report-by-user']
    }
     
      // note `find` needs https://github.com/apache/couchdb-nano/pull/50 to be merged
    accountDb.find(scheduledReportSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /scheduledReports`);
                res.send(err);
            }
        }
        res.statusCode = 200;
        // Can remove this once we have an endpoint that filters by the user
        res.send(JSON.stringify(result));
    });
});

app.get('/scheduledReports/:id', validateJWT, (req, res) => {
    const reqUrl = `${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/${req.params.id}`;
    // console.log(reqUrl);
    const couchbaseRequest = Request.get(reqUrl,
    (error: Error, response: Request.RequestResponse, body: any) => {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = 200;
        res.send(body);
    })
});

app.delete('/scheduledReports/:id/:rev', validateJWT, (req, res) => {
    // Actually delete the scheduled report from the database
    const couchbaseRequest = Request.del(`${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/${req.params.id}?rev=${req.params.rev}`,
    (error: Error, response: Request.RequestResponse, body: any) => {
        if (error) {
            res.statusCode = response.statusCode;
            res.send(error);
        }
        res.statusCode = 200;
        res.send(body);
    })
});

app.get('/getUser/:id', validateJWT, (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/users/${req.params.id}`, (err, response, body) => {
            res.send(body);
        });
})

app.post('/login', (req, res) => {

    const { creds, account_name } = req.body;
       const responseData: any = {
        success: false
    };
    ///console.log(creds);
  //  creds 36b9c8368832d97173a6bb9911dc951f
//creaccount_nameds morit
    const putData = {
        data: {
            credentials: creds,
            account_name
        },
        verb: "PUT"
    };
    const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
        body: JSON.stringify(putData)
    }, (err: Error, response: Request.RequestResponse, body: any) => {
        if (err) {
            console.error(err);
            serverlog  ("warning",err,"login");
        }
        if (response && response.statusCode === 201) {
            // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
            
            body = JSON.parse(body);
          
            const accountRequest = getKazooRequest(req, body.auth_token).get(`${process.env.KAZOO_SERVER}/v2/accounts/${body.data.account_id}/`, (err2, response2, body2) => {
                body2 = JSON.parse(body2);
                const token = jwt.sign({
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
            })
        } else {
            serverlog  ("warning","login fail","login");
            res.send(responseData);
        }
    });
});

app.post('/saveScheduledReport', validateJWT, (req, res) => {
     if (!req.body.account_id && !req.body.user_id) {
         req.body.account_id = req['decoded'].account_id;
         req.body.user_id = req['decoded'].user_id;
     }
    const couchRequest = Request.post({
        json: true,
        url: `${process.env.COUCHBASE_DB}/${encodeURIComponent(parseAccountToDatabaseName(req['decoded'].account_id))}/`,
        body: req.body
    }, (err: Error, response: Request.RequestResponse, body: any) => {
        if (response.statusCode === 201) {
            res.statusCode = 201;
            res.send();
        }
    }).on('error', e => {
        console.error(e);
    });
});

app.get('/socketInfo', validateJWT, (req, res) => {
    res.send({
        account_id: req['decoded'].account_id,
        user_id: req['decoded'].user_id,
        token: req['decoded'].kazoo_api_key
    });
});

app.post('/checkNotifications', validateJWT, async (req, res) => {
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes`, (err, response, body) => {
            const vms = {
                vm_id: '',
                body: []
            };
            const tmp = JSON.parse(body);
            const data = tmp.data;
            if(data && Array.isArray(data)) {
                const vm_id = data.find(e => {
                    return e.owner_id === req['decoded'].user_id
                }).id;
                vms.vm_id = vm_id;
                const kRequest2 = getKazooRequest(req)
                    .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req['decoded'].account_id}/vmboxes/${vm_id}/messages`, (err, response, body) => {
                        vms.body = body;
                        var vmarr=[];
                        JSON.parse( body).data.forEach(element => {
                          if (element.folder && (element.folder === 'new' || element.folder === 'saved'))
                          {

                            var mapobj= {
                               
                                eventType: "vm",
                                from: element.caller_id_number,
                                messageId: element.media_id,
                                id:element.media_id,
                                _id:element.media_id,
                                timestamp:element.timestamp,
                                read:element.folder != 'new'
                            }
                            vmarr.push(mapobj);
                        }
                        });    

                        let rv = vmarr;
                        const numbers = req.body.numbers;
                        const d = new Date();
                        const year1 = d.getUTCFullYear();
                        let year2 = year1;
                        let this_month: number|string = d.getUTCMonth() + 1;
                        let last_month: number|string = this_month - 1;
                        if(this_month === 1) {
                            last_month = 12;
                            year2--;
                        }
                        this_month = this_month.toString();
                        last_month = last_month.toString();
                        if(this_month.length === 1) {
                            this_month = `0${this_month}`;
                        }
                        if(last_month.length === 1) {
                            last_month = `0${last_month}`;
                        }
                        let selector = {
                            'selector': {
                                'to': {'$in': numbers},
                                'direction':'in',
                               
                             //   'read': false
                            },
                           limit:100,
                           'sort': [{
                            'time': 'desc'
                        }]

                        };
                        const db1 = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year1}${this_month}_sms`;
                        const db2 = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${year2}${last_month}_sms`;
                        let textDB = nano.use(db1);
                       
                        textDB.find(selector, (err, body) => {
                            if(err) {
                                res.send(err);
                            }
                            else {
                                rv= rv.concat ( body.docs);
                                const recivedlenghth= body.docs.length;
                                console.log("recivedlenghth : ", recivedlenghth);
                               if (recivedlenghth<100)
                               {
                                    selector.limit=100-recivedlenghth;
                                    textDB = nano.use(db2);
                                    textDB.find(selector, (err2, body2) => {
                                        if(err2) {
                                            res.send(err2);
                                        }
                                        else {
                                            rv=rv.concat(body2.docs);
                                            res.send(rv);
                                        }
                                    });
                            }
                                else
                                {
                                    res.send(rv);
                                }
                            }
                        });
                       
                    });
            }
    });



   
});

app.post('/markNotificationAsRead', validateJWT, (req, res) => {
    const d = new Date(req.body.timestamp);
    let month = (d.getUTCMonth() + 1).toString();
    if(month.length === 1) {
        month = `0${month}`;
    }
    const db_name = `${parseAccountToDatabaseName(req['decoded'].account_id)}-${d.getUTCFullYear()}${month}_sms`;
    const db = nano.use(db_name);
    db.get(req.body.id, (err, body) => {
        if(err) {
            res.send(err);
        }
        else {
            const doc = body;
            doc.read = true;
            db.insert(doc, (err2, body2) => {
                if(err2) {
                    res.send(err2);
                }
                else {
                    res.send(req.body.id);
                }
            });
        }
    });
});

app.get('/error', (req, res) => {
    res.status(500);
    res.send(`test`);
});
app.get('/status', (req, res) => {
    res.status(200);
    res.send(`ok`);
});

function getHelloSpokeDbName() {
 return process.env.COUCHBASE_DB_ADMIN;// 'http://internal-hs-dashboard-db-1088269106.us-west-2.elb.amazonaws.com:5984';
}

function getAdminNano() {
    const adminNano = require('nano')(getHelloSpokeDbName());

    //https://github.com/apache/nano#using-cookie-authentication
    return adminNano;
}

function getAccountNameFromId(account_id) {
    return  `account/${account_id[0]}${account_id[1]}/${account_id[2]}${account_id[3]}/${account_id.substring(4)}`;
}

function markDocAsKazooDeleted(accountDb, selector): Promise<number> {
    return new Promise((resolve, reject) => {
        accountDb.find(selector, (err, body) => {
            if (err) {
                console.error(err);
                resolve(500);
            } else if (body.docs.length > 0) {
                const user = body.docs[0];
                // console.log(`Found this doc`, user);
                user.kazoo_deleted = new Date();
                user.pvt_deleted= true ;
                accountDb.insert(user, (updateErr, updated) => {
                    if (updateErr) {
                        console.error(updateErr);
                        resolve(500);
                    } else {
                        // console.log(updated);
                        resolve(200);
                    }
                });
            } else {
                console.error(`Couldn't find any docs for selector: `, selector);
                resolve(500);
            }
        });
    });
}

/**
 * Call Dashboard API Routes
 */

app.get('/admin/accounts', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/`, (e, r, b1) => {
            if(e) {
                reject(e);``
            }
            b1 = JSON.parse(b1);
            const self = {
                id: accountId,
                name: b1.data.name,
                realm: b1.data.realm,
                timezone:b1.timezone,
                tree: []
            }
            resolve(self);
        });
    });
    const promise2 = new Promise((resolve, reject) => {
        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {
            if (err) {
                // res.statusCode = 500;
                // res.send(err);
                // reject(err);
                reject(err);
                return;
            } else {
               // console.log("\n\naccounts: ",body )
                const b = JSON.parse(body);
                if (b.error === "401") {
                    reject(b);
                    return;
                }
                const data = b.data;
                resolve(data);
                return;
            }
        });
    });
    Promise.all([promise1, promise2]).then(values => {
        if(values[1] === 'invalid creds') {
            res.send('oh no!');
        }
        let data = [values[0]];
        data = data.concat(values[1]);
        // This is dumb, but the store.ts file expects a response.data.data
        const body = { data: null };
        body.data = data;
        res.send(body);
    }).catch(e => {
        res.send(e);
    });

});

//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/conferences?filter_owner_id=937adb7fb12cd203171a9d105fd9b43b&paginate=false&_=1553246578342
app.get('/conferences', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const owner_id = req['decoded'].user_id;
   
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences?filter_owner_id=${owner_id}&paginate=false`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
         //   console.log('conferences body  ' + JSON.stringify(body));
            res.send(body);
        });
});
app.get('/callflows', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
   
   
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/callflows?filter_type=conference&paginate=false`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
           res.send(body);
        });
});


app.post('/conferenceaction/:conferenceid/:action?/:membeid?', validateJWT,(req, res) => {
 
  const memberid= req.params.membeid;
 
  const action= req.params.action;
 
  const conferenceid = req.params.conferenceid;

   const accountId = (req['decoded'] as DecodedJWT).account_id;
    const owner_id = req['decoded'].user_id;
   

    const responseData: any = {
        success: false
    };
    const putData = {
        data: {
            action:action,
            ui_metadata:{
                version:"4.2-50",
                ui:"monster-ui",
                origin:"common"
            }
        }
    };
    var url =`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${conferenceid}/participants/${memberid}`;
    if (memberid==0)
        {
            url =`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${conferenceid}/participants`;

        }

        if (action==='lock')
        {

            url =`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${conferenceid}`

        }

        // console.log('conferenceaction:- ', url);

    //console.log('data:- ', JSON.stringify(putData));
    const kRequest = getKazooRequest(req).put(url, {
        body: JSON.stringify(putData)
    }, (err: Error, response: Request.RequestResponse, body: any) => {
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
            console.error('err  ' +JSON.stringify(response));
            console.error('err  body' +JSON.stringify(body));
            res.send(response);
        }
    });
});

app.put('/conferences/:id', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const owner_id = req['decoded'].user_id;
    //console.log(" put owner_id " + owner_id);

    const id= req.params.id;
   // console.log("conferencesInfo put  id " + id);
    const data =req.body.data;
  //  console.log("conferencesInfo put  data " + data);
    const kRequest = getKazooRequest(req)
    .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${id}`,
        body: data,
        json: true
    },
    (err, response, body) => {
     //   console.log(response);
        if(err) {
            console.log(err);
        }
        res.send(body);
    });
   
 
});

//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/users?paginate=false

app.get('/conferenceusers', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
   
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users?paginate=false`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
           // console.log('conferences user body  ' + JSON.stringify(body));
            res.send(body);
        });
});
//https://api.hellospoke.com:8443/v2/accounts/173d9d1269761052da83512b3e47fbe7/devices?_=1553516827536


app.get('/conferencedevices', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
   
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/devices?paginate=false`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
           // console.log('conferences device body  ' + JSON.stringify(body));
            res.send(body);
        });
});

app.get('/channels', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
   
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/channels`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
           // console.log('conferences device body  ' + JSON.stringify(body));
            res.send(body);
        });
});


app.get('/conferencesInfo/:id', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const owner_id = req['decoded'].user_id;
    //console.log("conferencesInfo owner_id " + owner_id);

    const id= req.params.id;
   // console.log("conferencesInfo id " + id);
    const kRequest = getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${id}`
        , (err, response, body) => {
            if(err) {
                res.send(err);
            }
            body = JSON.parse(body);
        //    console.log('conferences response  ' + JSON.stringify(response));
         //   console.log('conferences info body  ' + JSON.stringify(body));
            res.send(body);
        });
});


app.post('/conferencesInfo/:id', validateJWT, (req, res) => {
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    const owner_id = req['decoded'].user_id;
    console.log(" post owner_id " + owner_id);

    const id= req.params.id;
    console.log("conferencesInfo post  id " + id);
    const data =req.body.data;
    console.log("conferencesInfo post  data " + data);
    const kRequest = getKazooRequest(req)
    .post({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/conferences/${id}`,
        body: data,
        json: true
    },
    (err, response, body) => {
     //   console.log(response);
        if(err) {
            console.log(err);
        }
        res.send(body);
    });
   
 
});


app.get('/admin/accounts/:accountId/users', validateJWT, (req,res) => {
    // const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
// This is correct, but the database isn't whole right now.
    const accountDb = nano.use(parseAccountToDatabaseName(req.params.accountId));
    const selector = {
        'selector': {
            'pvt_deleted': {
                '$exists': false
             },
            'pvt_type': 'user'
        },
        'limit': 999
    };
    accountDb.find(selector, (err, result) => {
        if (err) {
            res.statusCode = 500;
            res.send(err);
        } else {
            const promise1 = new Promise((resolve, reject) =>{
                getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${req.params.accountId}/callflows?paginate=false`, (err2, resp, body) => {
                    if(err2) {
                        reject(err2);
                    }
                    resolve(body);
                });
            });
            const promise2 = new Promise((resolve, reject) => {
                getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${req.params.accountId}/phone_numbers?paginate=false`, (err3, resp2, body2) => {
                    if(err3) {
                        reject(err3);
                    }
                    resolve(body2);
                });
            });

            const promise3 = new Promise((resolve, reject) => {
                getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${req.params.accountId}/users`, (err4, resp3, body3) => {
                    if(err4) {
                        reject(err4);
                    }
                    resolve(body3);
                });
            });
            Promise.all([promise1, promise2,promise3]).then(values => {
                result.callflows = JSON.parse(<string> values[0]);
                result.phone_numbers = JSON.parse(<string> values[1]);
                result.users = JSON.parse(<string> values[2]);
                result.docs = result.docs.map(user => {
                    if (!user.hasOwnProperty('assigned_managers')) {
                        user.assigned_managers = [];
                    }
                    return user;
                })
                res.statusCode = 200;
                res.send(result);
            }).catch(r => {
                res.send(r);
            })
        }
    });
})





/**
 * Webhooks
 */

app.post('/webhooks/accountCreated', (req, res) => {
    if (req.body.type !== 'account') {
        res.statusCode = 403;
        res.send();
    } else {
        // console.log(req.body);
        const adminNano = getAdminNano();
       
        // Format account DB name
        const account_db_name = getAccountNameFromId(req.body.account_id);
        // console.log(`New account database name: ${account_db_name}`);
        const account_template_db = `${getHelloSpokeDbName()}/account_template`;
       
        // Create DB
        adminNano.db.create(account_db_name, function(err, body) {
            if (err) {
                if (err.statusCode === 412) {
                   // console.log("Account DB already exits with name " + account_db_name);
                } else {
                     // console.log(err);
                    // throw err;
                }
            } else {
                // console.log('database', account_db_name, 'successfully created');
                // Setup replication between the hellospoke Account Template DB and the new account DB.
                // This will ensure the account DB always has the up-to-date design documents
                var account_db = `${getHelloSpokeDbName()}/${encodeURIComponent(account_db_name)}`;
                adminNano.db.replication.enable(account_template_db, account_db, { create_target:false }, function(err, body) {
                    if (err) {
                        // console.log(err);
                        // throw err;
                    } else {
                        // Check on the state of the replication
                        adminNano.db.replication.query(body.id, function(error, reply) {
                            if (!error) {
                                if (reply.hasOwnProperty('_replication_state') && reply['_replication_state'] === 'error') {
                                    // console.log("Failed to replicate between the account DB " + account_db_name + " and the Account Template DB");
                                } else {
                                    // console.log("Successfully REQUESTED replicated between the account DB " + account_db_name + " and the Account Template DB");
                                    // console.log(reply);
                                    const accountDb = adminNano.use(account_db_name);
                                    accountDb.insert({
                                        'email': '',
                                        'password': '',
                                        'outgoing_mail_server': '',
                                        'kazoo_deleted': false,
                                        'pvt_type': 'account'
                                    }, (accountDocErr, accountDocBody) => {
                                        if (accountDocErr) {
                                            console.error(accountDocErr);
                                        } else {
                                           // console.log(`Created new account doc`, accountDocBody);
                                            res.statusCode = 200;
                                            res.send();
                                        }
                                    });
                                }
                            } else {
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

app.post('/webhooks/accountDeleted', async (req, res) => {
   // console.log(req.body);
    const adminNano = getAdminNano();
    const accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
    const accountDocQuery = {
        'selector': {
            'pvt_type': 'account'
        }
    };
    res.statusCode = await markDocAsKazooDeleted(accountDb, accountDocQuery);
    res.send();
});

app.post('/webhooks/userCreated', (req, res) => {
    // console.log(req.body);
    const adminNano = getAdminNano();
    const accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
    accountDb.insert({
        _id: req.body.id,
        user_id: req.body.id,
        account_id: req.body.account_id,
        privilege_level: "user",
        kazoo_deleted: false,
        pvt_deleted:false,
        assigned_users: [ ],
        pvt_type: "user"
    }, (err, body) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send();
        } else {
            // console.log(body);
            res.statusCode = 200;
            res.send();
        }
    });
});

app.post('/webhooks/userDeleted', async (req, res) => {
    // console.log(req.body);
    const adminNano = getAdminNano();
    const accountDb = adminNano.use(getAccountNameFromId(req.body.account_id));
    const userSelector = {
        'selector':  {
            'pvt_type': 'user',
            '_id': {
                "$eq": req.body.id
            }
        }
    };
    res.statusCode = await markDocAsKazooDeleted(accountDb, userSelector);
    res.send();
});



//notify code start from here


//functions

var companyIdSelector:any ={
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

var userSelector= {
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
 }
    var optinPropertyIdSelector:any ={
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

var optinUserIdSelector={
    "selector": {
       "pvt_type": "user",
      
       "smssettings.settings": {
          "$elemMatch":{"$or": [{
             "number": "5023520197"
          },
          {
            "number": "5023520197"
         }
        ]}
       }
    }
 }
const getMasterUsers= (account_id,companyid)=>
{
    const accountDb = nano.use(account_id);
    
    const contactsSelector = {
    'selector': {
            '$and': [
                {
                    'pvt_type': 'user',
                }
            ]
        },
        limit:30000 
    }

    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                return {statusCode:result.statusCode,
                err};
            } catch (e) {
                return {statusCode:401,
                    err};
            }
        }
        else {
            return {statusCode : 200,
                result
            };
        }
    });
}


const getAddedProperty= (account_id,companyid)=>
{
    const accountDb = nano.use(account_id);
    
    const contactsSelector = {
    'selector': {
            '$and': [
                {
                    'pvt_type': 'property',
                }
            ]
        },
        limit:30000 
    }

    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            console.log('error:--', err);
            try {
                return {statusCode:500,
                err};
            } catch (e) {
                return {statusCode:401,
                    err};
            }
        }
        else {
            console.log('result');
            return {statusCode : 200,
                result
            };
        }
    });
}
const insertUser= async (usr,accountdbname)=>
{
    console.log("\naccountdbname ", accountdbname);
    const accountDb = nano.use(accountdbname);
    var insertuserpromise = new Promise(async (resolve, reject) => {
        usr.pvt_type="user";
        accountDb.insert(usr, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
             console.log("inserted succefully");
             resolve( body);         
         }
     });
    });

    var result = await insertuserpromise;
    return result;
   

}
const getCallReportData= async (companydbname)=>
{
    console.log("\getComapnyUsers ", companydbname);
    const companydb = nano.use(companydbname);
    var userdocspromise = new Promise(async (resolve, reject) => {
        const contactsSelector = {
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
       
        
        var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;
    

}
const getCallActivityReportData= async (companydbname)=>
{
    console.log("\getCallActivityReportData1 ", companydbname);
    const companydb = nano.use(companydbname);
    var callActivityReportDataPromise = new Promise(async (resolve, reject) => {
        const contactsSelector = {
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
            "limit": 30000,
            
         };
       
        
        var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await callActivityReportDataPromise;
    return result;
   

}
const getComapnyUsers= async (companydbname)=>
{
    console.log("\getComapnyUsers ", companydbname);
    const companydb = nano.use(companydbname);
    var userdocspromise = new Promise(async (resolve, reject) => {
        const contactsSelector = {
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
       
        
        var userdocs=await getalldocumentsbyproperty(companydb,contactsSelector);
        resolve(userdocs)
    });

    var result = await userdocspromise;
    return result;
   

}
const insertusersettings= (usrsettings,accountdbname)=>
{
    console.log("\naccountdbname ", accountdbname);
    const accountDb = nano.use(accountdbname);
    usrsettings.pvt_type="usersetting";
       accountDb.insert(usrsettings, (err, body) => {
        if (err) {
            console.log("err ",err);
            return err;;
        }
        else {
            console.log("usersetting inserted succefully");
            return body;         
        }
    });

}
const getemrtdata= async()=>
{
    const globaldb=nano.use("globaldb");
        const contactsSelector = {
                'selector': {
                    "pvt_type":"emrtavg",
                    
                    }
                }
   var emrtdata=await getdocumentbyproperty(globaldb,contactsSelector); 

   return emrtdata;
   
}

const getcallsummerydata= async(companydbname)=>
{
    const companydb=nano.use(companydbname);
        const contactsSelector = {
                'selector': {
                    "pvt_type":"callsummery",
                    
                    }
                }
   var callsummeryforcompany=await getdocumentbyproperty(companydb,contactsSelector); 

   return callsummeryforcompany;
   
}
const get_call_activity_data=async(companyid)=>
{
    const start_date_local = moment().add(-30, "days").startOf('day');
    var start_date_utc = moment(start_date_local.clone()).utc();
    var start_date_utc_unix = start_date_utc.unix();

    const end_date_local = moment().endOf('day');
    var end_date_utc = moment(end_date_local.clone()).utc() ;
    var end_date_utc_unix = end_date_utc.unix();
    const querystring=`(companyid:${companyid})`;
            
    const payload = {
        querystring: querystring,
        starttime: start_date_utc_unix,
        endtime: end_date_utc_unix
     }

    const callActivityData=  await getelasticsearchdata(payload);
    return callActivityData;
}
const send_callactivity_report= async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d))
   // dbnames.forEach(async (dbname) => 
    for (var dbindex=0;dbindex<dbnames.length;dbindex++)
    {
        const dbname=dbnames[dbindex];
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        console.log(dbname);
        if (company)
        {
            var scheduleemailreport  = await getSechdulereportData(dbname,"callactivitydailyreport");
            //console.log("scheduleemailreport");

            //console.log(JSON.stringify(scheduleemailreport));
            if (scheduleemailreport && scheduleemailreport.length>0&& scheduleemailreport[0].data && scheduleemailreport[0].data.length)
                    {
                        //console.log(scheduleemailreport[0]);
                        var emails =scheduleemailreport[0].data.join();
                        const callActivityData:any=  await get_call_activity_data(companyid);
                       sendCallActivityScheduleReport(callActivityData, emails);
                       scheduleemailreport[0].processed=true;
                       await insert_dailyemaillist(dbname,scheduleemailreport[0])
                    }
           
        }
    }
    //
}
const callactivity_report = async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d))
    dbnames.forEach(async (dbname) => 
    {
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        const reportrunningUTCTime= moment().utc();
   
        if (company)
        {
            
            const callActivityScheduleData:any=  await  getCallActivityReportData(dbname);
            if (callActivityScheduleData && Array.isArray(callActivityScheduleData) &&callActivityScheduleData.length>0 )
            {
                
                const companyschedulereportinfo= {
                    companyid:companyid,
                    companydbname:dbname,
                    callActivityScheduleData:callActivityScheduleData,
                    reportrunningUTCTime
                }
                build_callactivity_report(companyschedulereportinfo);
            }
            
            
        } 
    });
    

}
const send_callsummery_report=async ()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d) )

   
    dbnames.forEach(async (dbname) => 
    {
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        console.log(dbname)
        if (company)
        {
            var schedulereportdatalist= await getSechdulereportData(dbname,"dailyreport");
           if (schedulereportdatalist && Array.isArray(schedulereportdatalist) && schedulereportdatalist.length>0)
            {
                var callsummeryData=await getcallsummerydata(dbname);
                schedulereportdatalist.forEach(async(schedulereportdata) => {
                   // console.log("schedulereportdata");
                    //console.log(schedulereportdata);
                    if (schedulereportdata.data && schedulereportdata.data.length)
                    {
                        var emails =schedulereportdata.data.join();
                        console.log(emails);
                        await sendScheduleReport(callsummeryData,emails);
                        
                    }
                    schedulereportdata.processed=true;
                      await insert_dailyemaillist(dbname,schedulereportdata)
                });
                
            }
        }
    });
    
}
const callsummery_report = async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d) )
    const reportrunningUTCTime= moment().utc();
    dbnames.forEach(async (dbname) => 
    {
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        if (company)
        {
           
            const companyuserlist:any=  await  getComapnyUsers(dbname);
            if (companyuserlist && Array.isArray(companyuserlist) &&companyuserlist.length>0 )
            {
                
                const companyschedulereportinfo= {
                    companyid:companyid,
                    companydbname:dbname,
                    users:companyuserlist,
                    reportrunningUTCTime
                }
                send_callsumery_report(companyschedulereportinfo);
            }
            
            
        } 
    });
    

}
const send_callsumery_report= async (companyScheduleReportInfo )=>
{
    
    const companyid= companyScheduleReportInfo.companyid;
   const companydbname= companyScheduleReportInfo.companydbname;
    var users= companyScheduleReportInfo.users;
    
    const reportrunningUTCTime=  companyScheduleReportInfo.reportrunningUTCTime;
       var dailyemaillist=[];
    var weeklyemaillist=[];
    var monthlyeamillist=[];
    for (var userindex=0;userindex<users.length;userindex++) {
        try
        {
            
           var user=users[userindex];
           const timezone=user.timezone? user.timezone:"America/New_York";
           var now_date_time= reportrunningUTCTime.tz( timezone);
           var next_run_report_time= now_date_time.clone().add(30, 'minutes');
       
            var user_schedule_report_time_string;
            const scheduleemailreport= user.scheduleemailreport;
            const dayname= now_date_time.format('dddd');
            const monthday=now_date_time.format( 'DD');
            const endOfMonth   = moment().endOf('month').format('DD');
            var timing;
            if (scheduleemailreport.daily.is_active)
            {
                const daily= scheduleemailreport.daily;
                timing= daily.timing;

             //   user_schedule_report_time_string= `${dailytiming.hh}:${dailytiming.mm} ${dailytiming.a}`;
                //user_schedule_report_time=  moment(from_time_1 ,"hh:mm a");
            }
            else if (scheduleemailreport.weekely.is_active && scheduleemailreport.days[ dayname])
            {
                const weekely= scheduleemailreport.weekely;   
                timing=weekely.timing;
               // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
            }
            else if (scheduleemailreport.monthaly.is_active)
            {
                
                const monthaly= scheduleemailreport.monthaly;
                const reporttype= parseInt(monthaly.report_type) ;
               
                
                if ((reporttype===0 &&monthday===1) ||(  reporttype===2&& monthday===15)
                    || (endOfMonth===monthday))
                    {
                        timing=monthaly.timing;
                        //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                    }
            }
            //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
            {
              
                const hh=parseInt( timing.hh);
                if (timing.a==="pm"&& hh!=12)
                    timing.hh=hh+12;
                else if (hh===12 &&timing.a==="am" )
                    timing.hh=0;
                const user_schedule_report_Date_time=  moment.tz(timezone);
                user_schedule_report_Date_time.set({
                    hour:  timing.hh,
                    minute:timing.mm ,
                    second: timing.ss
                    
                })
                
               /* console.log("user_schedule_report_Date_time");
                console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
             */   
             /// 
                if (user_schedule_report_Date_time.isBetween(now_date_time,next_run_report_time))
                {
                    console.log("I am here ");
                              
                    const emaillist= scheduleemailreport.emails;
                    dailyemaillist.push(emaillist);
                              
                }
            }
        }
        catch(error)
        {
                //console.log(error);
        }
    };
    if (dailyemaillist.length>0)
    {
        const data= {
            "pvt_type":"dailyreport",
            "data":dailyemaillist,
            "processed":false
        }
        await insert_dailyemaillist(companydbname,data)
    }
}

const build_callactivity_report= async (companyScheduleReportInfo )=>
{
    
    const companyid= companyScheduleReportInfo.companyid;
   const companydbname= companyScheduleReportInfo.companydbname;
    var callActivityScheduleData= companyScheduleReportInfo.callActivityScheduleData;
   const timezone= "America/New_York";
   const reportrunningUTCTime=  companyScheduleReportInfo.reportrunningUTCTime;
   var now_date_time= reportrunningUTCTime.tz( timezone);
   var next_run_report_time= now_date_time.clone().add(30, 'minutes');
   var dailyemaillist=[];
    for (var _index=0;_index< callActivityScheduleData.length;_index++)
    {
        try
        {
            var data= callActivityScheduleData[_index];
            var user_schedule_report_time_string;
            const scheduleemailreport= data;
            const dayname= now_date_time.format('dddd');
            const monthday=now_date_time.format( 'DD');
            const endOfMonth   = moment().endOf('month').format('DD');
            var timing;
            if (scheduleemailreport.daily.is_active)
            {
                const daily= scheduleemailreport.daily;
                timing= daily.timing;

            }
            else if (scheduleemailreport.weekely.is_active && scheduleemailreport.days[ dayname])
            {
                const weekely= scheduleemailreport.weekely;   
                timing=weekely.timing;
               // user_schedule_report_time_string= `${weekelytiming.hh}:${weekelytiming.mm} ${weekelytiming.a}`;;
            }
            else if (scheduleemailreport.monthaly.is_active)
            {
                
                const monthaly= scheduleemailreport.monthaly;
                const reporttype= parseInt(monthaly.report_type) ;
               
                
                if ((reporttype===0 &&monthday===1) ||(  reporttype===2&& monthday===15)
                    || (endOfMonth===monthday))
                    {
                        timing=monthaly.timing;
                        //user_schedule_report_time_string= `${monthalytiming.hh}:${monthalytiming.mm} ${monthalytiming.a}`;;
                    }
            }
            //if (user_schedule_report_time_string && user_schedule_report_time_string.length>0)
            {
                const hh=parseInt( timing.hh);
                if (timing.a==="pm"&& hh!=12)
                    timing.hh=hh+12;
                else if (hh===12 &&timing.a==="am" )
                    timing.hh=0;
                const user_schedule_report_Date_time=  moment.tz(timezone);
                user_schedule_report_Date_time.set({
                    hour:  timing.hh,
                    minute:timing.mm ,
                    second: timing.ss
                    
                })
                
//                console.log(JSON.stringify( data.emails));
                console.log("user_schedule_report_Date_time");
                console.log(user_schedule_report_Date_time.format("DD-MM-YY hh mm ss A z"));
                
                if (user_schedule_report_Date_time.isBetween(now_date_time,next_run_report_time))
                {
                   // console.log("I am here ");
                    const emaillist= scheduleemailreport.emails;
                    dailyemaillist.push(emaillist);
                   
           //         sendCallActivityScheduleReport(callActivityData, scheduleemailreport)
                              
                }
            }
        }
        catch(error)
        {
                //console.log(error);
        }
    };

    console.log(dailyemaillist);
    if (dailyemaillist.length>0)
    {
        const data= {
            "pvt_type":"callactivitydailyreport",
            "data":dailyemaillist,
            "processed":false
        }
        await insert_dailyemaillist(companydbname,data)
    }
}
const formaReportTime= (value)=>
    {   
        if (isNaN(value) || !value) return '';
        const time=parseInt(value);
        var hour=Math.floor( time/3600);
        const minutes= Math.floor(time / 60) - (hour * 60);
        const sconds=(time % 60);
        const minutes_str=minutes.toString();
        const sconds_str=sconds.toString();
        const hour_str=hour.toString();
        if (hour>0)
             return `${hour}h ${minutes_str}m`;
        else if (minutes>0)
            return `${minutes}m ${sconds_str}s`;
        else
            return  `0m ${sconds_str}s`;
    }
const sendCallActivityScheduleReport=(reportdata, emails)=>
{

    const header= ["Company Name", "Property Name", "Date","Time","Bussiness Hour","Call Duration","Type", "LIVE", 
    "Caller Name", "Caller Number","Respondent","Response Time" ]   ;

    const csv =[];
    csv.push (header.join());
    console.log("reportdata")        ;
      reportdata.forEach(cdr => {
         
        const cdrString = [];
        const duringbussinesshours= cdr.duringbussinesshours==="true"? 'yes':'no'
        const timezone= cdr.propertytimezone ? cdr.propertytimezone: "America/New_York";
       const  incidentdate = moment.unix(cdr.incidentdate).tz(timezone).format('M/D/YY');
       const  incidentime = moment.unix(cdr.incidentdate).tz(timezone).format('h:mma');
       console.log( cdr.when)
       console.log( cdr.callduration)
        cdrString.push( 
            cdr.companyname,
            cdr.propertyname ,
            incidentdate,
            incidentime,
            duringbussinesshours,
            formaReportTime(cdr.cdr.callduration),
            cdr.type,
            cdr.when,
            cdr.callername,
            cdr.fromd,
            cdr.respondent,
            formaReportTime(cdr.responsetime),
            
   
    );
         csv.push(cdrString.join(','));     
     });
     console.log("csv");
     const emaillist= emails;
     console.log(emaillist);  
    
     const emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to:  emaillist, 
        subject: 'Notify call activity report',
        text: `Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .`,
        html: `<img src="http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png" width="150" height="63" title="HelloSpoke Logo" alt="HelloSpoke">
        <div>
            <h1>Thank you for using HelloSpoke!  </h1>
            <p>Attached you will find your scheduled HelloSpoke call report, .</p>
        </div>`,
       
        attachments: [
            {
                filename: `call_activity.csv`,
                content: csv.join('\n')
            }
        ]
    }
    const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, (err, info) => {
        if (err) {
           console.log(`kkkkkkkkkkkkkkkk erorr: `,err);

           // callback(err, null);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
}
const sendScheduleReport=(reportdata, emails)=>
{

    const header=reportdata.data.header;
    header.unshift('TOTAL CALLS');
    header.unshift('PROPERTY NAME');
    header.push("AVG EMRT");
    const csv =[];
    csv.push (header.join());//['PROPERTY NAME,TOTAL CALLS,LEASING,GENERAL,COURTESY ,EMERGENCY ,OTHER , AVG EMRT']; 
                  
    reportdata.data.data.forEach(cdr => {
        const duration = moment.duration(+cdr.avg_emrt, 'seconds');  
        var convert_durt= moment.utc(duration.asMilliseconds()).format("mm:s")
        var durtn= convert_durt.split(':');
        var final_durtn=durtn[0]+'m' +' '+ durtn[1]+'s';
        var _avgemrt=isNaN(cdr.avg_emrt) ? "-": final_durtn;
        const cdrString = [];
        cdrString.push( 
                 cdr.propertyname ,
                 cdr.total_call ,
                 cdr[header[2].toLowerCase()],
                 cdr[header[3].toLowerCase()],
                 cdr[header[4].toLowerCase()],
                 cdr[header[5].toLowerCase()],
                 cdr[header[6].toLowerCase()],
                 _avgemrt//   final_durtn 
            );
         csv.push(cdrString.join(','));     
     });
     console.log("csv");
     console.log(csv);
     const emaillist= emails;
     console.log(emaillist);  
     const emailMessage = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to:  emaillist, 
        subject: 'Notify property report',
        text: `Thank you for using HelloSpoke! Attached you will find your scheduled HelloSpoke call report, .`,
        html: `<img src="http://ec2-52-88-89-227.us-west-2.compute.amazonaws.com:3000/assets/HelloSpoke_horiz_150x63.png" width="150" height="63" title="HelloSpoke Logo" alt="HelloSpoke">
        <div>
            <h1>Thank you for using HelloSpoke!  </h1>
            <p>Attached you will find your scheduled HelloSpoke call report, .</p>
        </div>`,
        
        attachments: [
            {
                filename: `Notify_Schedule.csv`,
                content: csv.join('\n')
            }
        ]
    }
    const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    transporter.sendMail(emailMessage, (err, info) => {
        if (err) {
           console.log(`kkkkkkkkkkkkkkkk erorr: `,err);

           // callback(err, null);
        } else {
            console.log(`scucess `);
            // delete message
            // console.log(`Deleting SQS Message with ReceiptHandle: `);
        }
    });
}
const update_call_summery_data= async()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
    var result=[];
   // console.log(dbnames);
    for (var i =0;i<dbnames.length;i++)
    {
        const dbname=dbnames[i];
        console.log(dbname);
        const companyid = parseDatabaseNameToAccount(dbname);
        const company= await getcompanyInfo(companyid);
        if (company)
        {
            var call_summery_result_data=await calculate_company_callsummery(companyid);
            var inserresult=  insertcallsummerydata(dbname,call_summery_result_data);
            result.push(inserresult);
        }
    }
    return result;

}
const calculate_company_callsummery= async (companyid)=>
{
    const companydbname= parseAccountToDatabaseName(companyid);
    const comapanydb = nano.use(companydbname);
    const company = await  getcompanyInfo(companyid);
    const reportdocs=await getmonthreportdata(companyid);
    const emrgency_reportdocs=reportdocs.filter(r=>  r.type
         && r.type.toLowerCase()==="emergency"    && !isNaN( r.responsetime) && r.responsetime>0)
    const companypropertylist= await getcompanypropertylsit(companyid);
    var propertyData=d3c.nest()
        .key(function(d) { return d.propertyid; }) 
       
        .rollup(function(v) { return {
                total: v.length,
            }
        })
        .entries(reportdocs);

    var emergency_propertyData=d3c.nest()
        .key(function(d) { return d.propertyid; }) 

        .rollup(function(v) { return {

                avg_emrt: d3.mean(v, function(d) { return isNaN(d.responsetime)?0: d.responsetime; })
            }
        })
        .entries(emrgency_reportdocs);

    var emergency_property_Response_Data_Count=d3c.nest()
        .key(function(d) { return d.propertyid; }) 

        .rollup(function(v) { return {
            total: v.length,
        }
        })
        .entries(emrgency_reportdocs);
        
    
    var calloptionData = d3c.nest()
        .key(function(d) { return d.propertyid; }) 
     
        .key(function(d) { return d.type; })
        .rollup(function(v) { return v.length; })
        .entries(reportdocs);
    const multifamilycalloptions=["Leasing","General","Emergency","Courtesy","Other"];
    const heatingandaircalloptions=["Plumbing","Electrical","General","Emergency","Other"]
    const header= company.industry==="Multifamily" ?
                multifamilycalloptions
                : heatingandaircalloptions;
    var callsummery=[];
     companypropertylist.forEach(p => 
        {
            const propertydata = propertyData.find(pd=>pd.key===p.propertyid);
            const emergency_propertydata = emergency_propertyData.find(pd=>pd.key===p.propertyid );
            const emergency_property_response_data_count= emergency_property_Response_Data_Count.find(pd=>pd.key===p.propertyid );
            var rowdata:any={
                propertyname:p.propertyname,
                propertyid:p.propertyid,
            }
            const calloptionRows= calloptionData.find(cl=> cl.key===p.propertyid);
            console.log(propertydata);
            if (propertydata)
            {
                rowdata["total_call"]=propertydata.value.total;
                
            }
            else
            {
                rowdata["total_call"]=0;
                ;
            }
            rowdata["avg_emrt"] = emergency_propertydata && 
                                  emergency_propertydata.value && 
                                  emergency_propertydata.value.avg_emrt ?
                                  parseInt(emergency_propertydata.value.avg_emrt):
                                  "-";
            rowdata["avg_emrt_data_count"] = emergency_property_response_data_count && 
                                            emergency_property_response_data_count.value && 
                                            emergency_property_response_data_count.value.total ?
                                            parseInt(emergency_property_response_data_count.value.total):
                                             0;            
                                  
           // if (calloptionRows) {
                header.forEach(calloption => {
                    const calloptionRowData=calloptionRows && calloptionRows.values?
                                    calloptionRows.values.find(clpr=>clpr.key===calloption ):undefined;
                  //  console.log(calloptionRowData);
                    if (calloptionRowData)
                        rowdata[calloption.toLowerCase()]= calloptionRowData.value;
                    else
                        rowdata[calloption.toLowerCase()]= 0;
                });
            
            callsummery.push(rowdata);
   
   });
   var result = {
       data:{
           header:header,
           data:callsummery,
       }
   }

   return result;
}
const insertcallsummerydata= async(companydbname, callsummurydata)=>
{
    const globaldb=nano.use(companydbname);
    var _storeddata =await getcallsummerydata(companydbname);
    
    callsummurydata.pvt_type= "callsummery";
    if (_storeddata)
    {
        callsummurydata._id=_storeddata._id;
        callsummurydata._rev=_storeddata._rev;
    }
    const promise= new Promise(async (resolve, reject) => {
        globaldb.insert(callsummurydata, (err, body) => {
            if (err) {
                console.log("err callsummurydata",err);
                resolve( err);;
            }
            else {
                console.log(" callsummurydata inserted succefully");
                resolve( body);
    
            }
        });
    })
    var result= await promise;
    return result;
}


const getSechdulereportData= async(companydbname,pvt_type)=>
{
   
    const companydb=nano.use(companydbname);
    const contactsSelector = {
        "selector": {
            "processed":false,
            "pvt_type":pvt_type 
        }
    };
   
    var schedulereports=await getalldocumentsbyproperty(companydb,contactsSelector); 
   
    return schedulereports;
}

const insert_dailyemaillist= async(companydbname, data)=>
{

   
    const companydb=nano.use(companydbname);
  
    const promise= new Promise(async (resolve, reject) => {
        companydb.insert(data, (err, body) => {
            if (err) {
                console.log("insert_dailyemaillist",err);
                resolve( err);;
            }
            else {
                console.log(" insert_dailyemaillist  inserted succefully");
                resolve( body);
    
            }
        });
    })
    var result= await promise;
    return result;
}
const insertemrtdata= async(i_emrtdata)=>
{
    const globaldb=nano.use("globaldb");
    var emrtdata =await getemrtdata();
    
    i_emrtdata.pvt_type= "emrtavg";
    if (emrtdata)
    {
        i_emrtdata._id=emrtdata._id;
        i_emrtdata._rev=emrtdata._rev;
    }
    const promise= new Promise(async (resolve, reject) => {
        globaldb.insert(i_emrtdata, (err, body) => {
            if (err) {
                console.log("err i_emrtdata",err);
                resolve( err);;
            }
            else {
                console.log(" emrtdata inserted succefully");
                resolve( body);
    
            }
        });
    })
    var result= await promise;
    return result;
}

const inserts3notification= async(s3notification)=>
{
   // if(typeof message === 'string') {
         console.log(s3notification)
    const globaldb=nano.use("globaldb");
    var insertdata={
       data:s3notification,
        pvt_type:"s3notification"
    }
 
    
    const promise= new Promise(async (resolve, reject) => {
        globaldb.insert(insertdata, (err, body) => {
            if (err) {
                console.log("err s3notification",err);
                resolve( err);;
            }
            else {
                console.log(" s3notification inserted succefully");
                resolve( body);
    
            }
        });
    })
    var result= await promise;
    return result;
}
const insertcompany= async (company,req): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
	  var tree= company.tree;
    tree.push(company.kazooid);
    company.pvt_type= "company";
    tree= tree.reverse();
    var index =1;
    var dbnames:any=await getaccountdbnames();
   
   console.log("inserting company");
    var accountinsertpromise= [];
	tree.forEach(accid => {
        accountinsertpromise.push(new Promise(async (resolve, reject) =>
				{
                    
                     const _accountdbname=parseAccountToDatabaseName(accid);
                     const isCompanyDBAvailable= dbnames.find(d=>d===_accountdbname);
                    if (!isCompanyDBAvailable)
                    {
                       var creation_result= await  createaccountdb (_accountdbname);
                       createindexes(_accountdbname)
                       await setKazooAccountEmailNotification(req,accid);
                       await deletekazoostorage(req,accid)
                        const result= await  creteKazooStorageAttachments(req,accid);

                    }
					 console.log("\n  accountname ",_accountdbname );
                     const accountDb = nano.use(_accountdbname);
                     const stored_company= await getcompanyInfo(company.companyid,accountDb);
                     if (stored_company && stored_company._id && stored_company._rev)
                     {
                         company._id=stored_company._id;
                         company._rev=stored_company._rev;
                     }
                    accountDb.insert(company, (err, body) => {
						if (err) {
							console.log("err ",err);
							resolve( err);;
						}
						else {
							console.log(" company inserted succefully");
							resolve( body);
				
						}
			});
				
				}))
            });
            Promise.all(accountinsertpromise).then(results => {
				resolve("succefully inserted company");
            }).catch(err => {
                reject(err);
            });
        })
    
   
}
const sendNotifySMS= async(payload)=>
{
    BandwidthMessaging.Configuration.basicAuthUserName = "mrice";
    BandwidthMessaging.Configuration.basicAuthPassword = "bandwidthV0itr3ss14";
    const messagingController = BandwidthMessaging.APIController;
    const app_id=process.env.BANDWIDTH_APP_ID;
   
    var body = new BandwidthMessaging.MessageRequest({
        "applicationId" : app_id ,
        "to"            : payload.to,
        "from"          : payload.from,
        "text"          : payload.messagetext,
        "tag"           :"web hook outbound"
    });
console.log(body);
    var response = await messagingController.createMessage( "5000040", body).catch (function (err)
    {
        console.log("rejet")
            console.log(err)
    });

    return response;
}
const sendMessage=  async(payload)=>
{   
   
    const sendMessagePromise = new Promise<any>((resolve, reject) => {
		// console.log("sendsms2\n", payload);
		client.Message.send({
			from: payload.from,
			to: payload.to,
			text: payload.messagetext,
			callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
			receiptRequested:'all',

		})
		.then(function (message) {
				resolve(JSON.stringify(message));
		})
		.catch(function (err) {
			
			resolve(JSON.stringify(err));
		});
       
    });

    const result = await sendMessagePromise;
    return result;

}

const updatecompany= (company,accountid)=>
{
  
    var accid = company.companyid;
   
    const _accountdbname=parseAccountToDatabaseName(accid);
    company.pvt_type= "company";   
    console.log("\n  accountname ",_accountdbname );
        const accountDb = nano.use(_accountdbname);
        accountDb.insert(company, (err, body) => {
            if (err) {
                console.log("err ",err);
                return err;;
            }
            else {
                console.log(" company updated succefully");
                return body;
    
            }
        });

        return true;
}

const getproperties = async (companyid)=>
{
    return new Promise(async (resolve, reject) => {
        const accountDbName= parseAccountToDatabaseName(companyid);
        const accountDb = nano.use(accountDbName);
        const contactsSelector = {
        'selector': {
                '$and': [
                    {
                        'pvt_type': 'property',
                        'enabled':true
                    }
                ]
            },
            limit:30000 
        }
         accountDb.find(contactsSelector,await  function (err, result) {
            if (err) {
                try {
                    reject( err);
                } catch (e) {
                    console.error(`Couldn't access the db in /properties`);
                    reject( err);;
                }
            }
            else {
               // console.log("\n\n\n properties added 11111111\n", result);
                resolve( (result));
            }
        });
    });
}
 const updateNOtifySchedule= async(propertyid, didnumber)=>
 {
    var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
    const property=await getpropertyInfo(propertyid); 
    const companydbname= parseAccountToDatabaseName(property.companyid);
    const companydb= nano.use(companydbname);
    const company=await getcompanyInfo(property.companyid); 

       ///notify
    var schedule = await findSchedule(accountDb,false,didnumber,property,company);
    
    var userIds= schedule ?await findDayScheduleUsers(accountDb,schedule,false,company,property):[];
     if (userIds.length==0) 
     {
        userIds=await findAnyNotifyDayScheduleUsers(accountDb,didnumber,false,company,property);
     }   
    var userdocs=await findDayScheduleuserlist(userIds,property);

     var ntresult= await generateNoticationreply(userIds, userdocs);

     var escalationList=await findNotifyEscalationSettings(property);
   // var result:any= notificationdata.data.find(d => d.propertyid === propertyid && d.didnumber== didnumber    )
    
   
   var callflowsoptiontype;
   if (schedule)
          callflowsoptiontype= schedule.callflowsoptiontype
    
   
   var result:any= {
    "didnumber": didnumber,
    "propertyid": propertyid,
    "type": "notify",
    "label":callflowsoptiontype,    
    "data": {
        "escalation": escalationList,
        "notify": ntresult
    }
    
   }
   insertNotifySchedule(result);
   
   return result;
 } 

 const getNOtifySchedule= async(propertyid, didnumber)=>
 {
    const prpertydbname= parseAccountToDatabaseName(propertyid);
    const propertydb= nano.use(prpertydbname);
    const contactsSelector = {
        'selector': {
            "pvt_type": "notify",
            "didnumber": didnumber
            },
            limit:30000 
    }
    console.log(JSON.stringify(contactsSelector))
    var current_schedule=await getdocumentbyproperty(propertydb,contactsSelector); 
    return current_schedule;
 }
 const insertNotifySchedule= async(schedule)=>
 {
    const propertyid=  schedule.propertyid;
    schedule.pvt_type="notify";
    const prpertydbname= parseAccountToDatabaseName(propertyid);
    const propertydb= nano.use(prpertydbname);
    const stored_schedule= await getNOtifySchedule(schedule.propertyid, schedule.didnumber);
    if (stored_schedule && stored_schedule._id)
    {
        schedule._id= stored_schedule._id;
        schedule._rev= stored_schedule._rev;

    }

    const insertNotifySchedulePromise = new Promise<any>(async (resolve, reject) => {
        propertydb.insert(schedule, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
             console.log(" schedule inserted succefully");
             resolve( body);
 
         }
     });
     });    

   const result = await insertNotifySchedulePromise;
   return result;

 }
const insertproperty= async (property,accountid,req)=>
{

    const accountdbname=parseAccountToDatabaseName(accountid);
    var dbnames:any=await getaccountdbnames();

    const propertydbname= parseAccountToDatabaseName(property.propertyid);
    const isPropertyDbAvailable= dbnames.find(d=>d===propertydbname);
    if (!isPropertyDbAvailable)
    {
        var creation_result= await  createaccountdb (propertydbname);
        createindexes(propertydbname);
        const accountid=property.propertyid;
        await deletekazoostorage(req,accountid)
        const result= await  creteKazooStorageAttachments(req,accountid);
    }
    property.pvt_type= "property";
    property.enabled=true;
    const accountDb = nano.use(accountdbname);
    const stored_property= await getpropertyInfo(property.propertyid,accountDb);

    if(stored_property && stored_property._id && stored_property._rev)
    {
        property._id=stored_property._id;
        property._rev=stored_property._rev;
    } 
    const propertyInsertPromise = new Promise<any>(async (resolve, reject) => {
        accountDb.insert(property, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
             console.log(" property inserted succefully");
             resolve( body);
 
         }
     });
     });
    var result = await propertyInsertPromise;
    return result;

}
const removeEmailFromEscalationList= async (propertyid,emailids)=>
{
    const accountdbname=parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(accountdbname);
    console.log("removeEmailFromEscalationList");
    const contactsSelector = {
        'selector': {
            "pvt_type":"escalationemaillist",
                   
         },
                   
    }
   var escalationemailobjlist=await getalldocumentsbyproperty(accountDb,contactsSelector); 
  
   escalationemailobjlist.forEach(escalationemailobj => {
         var  emaillist=escalationemailobj.emaillist;
        
          emaillist=emaillist.filter(e=> !emailids.find((e1)=> e1.email===e.email));
         
          escalationemailobj.emaillist=emaillist;
          updateescalationemaillist(accountDb,escalationemailobj);
   });
           
}
const updateescalationemaillist= async (accountDb,escalationemailobj)=>
{
      const updateescalationemaillistpropmise = new Promise<any>(async (resolve, reject) => {
        accountDb.insert(escalationemailobj, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
             console.log(" escalationemailobj update succefully");
             resolve( body);
 
         }
     });
     });
    var result = await updateescalationemaillistpropmise;
    return result;
   
}
const insertescalationemaillist= async (payload,callflowoption,userid)=>
{
   // console.log ("payload  insertescalationemaillist ", payload);
    const accountdbname=parseAccountToDatabaseName(payload.propertyid);
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
                'selector': {
                    "pvt_type":"escalationemaillist",
                    "callflowoption":callflowoption
                    }
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            var emaillist=[];
            if (escalationemailobj)
            {
                emaillist=escalationemailobj.emaillist
            }
            else
            {
                escalationemailobj= {
                    "pvt_type":"escalationemaillist",
                    "callflowoption":callflowoption
                };
            }

     //       console.log ("emaillist1111 ",emaillist)
            if (!emaillist)  emaillist=[];
       //     console.log ("emaillist 2222 ",emaillist)
            

            if (payload.checked && payload.email)
            {
                var emailobj= {email:payload.email,
                userid:userid}
                emaillist.push(emailobj);
               
            }
            else if( !payload.checked && payload.email)
            {
                
                emaillist=  emaillist.filter (e=> e.email!=payload.email || e.userid!=userid);
            }
                
            escalationemailobj.emaillist=emaillist;
         //   console.log ("escalationemailobj ",escalationemailobj)
    const escalationemailPromise = new Promise<any>(async (resolve, reject) => {
        accountDb.insert(escalationemailobj, (err, body) => {
         if (err) {
             console.log("err ",err);
             resolve( err);;
         }
         else {
             console.log(" escalationemailobj inserted succefully");
             resolve( body);
 
         }
     });
     });
    var result = await escalationemailPromise;
    return result;

}
const insertschedule= (schedule,accountdbname)=>
{
    schedule.pvt_type= "schedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
   
    accountDb.insert(schedule, (err, body) => {
        if (err) {
            console.log("err ",err);
            return err;;
        }
        else {
            console.log(" schedule inserted succefully");
            
            return body;

        }
    });

}

const insertadjustschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "adjustschedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    if (schedule._id)
    {
        const contactsSelector = {
            'selector': {
                enabled:true,
                "pvt_type": "adjustschedule",
                "_id":schedule._id
                },
                limit:30000 
        }
        var stored_schedule=await getdocumentbyproperty(accountDb,contactsSelector); 
        if (stored_schedule && stored_schedule._id)
        {
            schedule._rev=stored_schedule._rev;
        }
    }
    accountDb.insert(schedule, (err, body) => {
        if (err) {
            console.log("err ",err);
            return err;;
        }
        else {
            console.log(" adjsut schedule inserted succefully");
            return body;

        }
    });

}
const getdocumentrev=  async(accountDb,documentid)=>
{   
    console.log ("\n documentid ",documentid);
    if ((documentid=== 'undefined' && documentid===undefined) && documentid.length===0) return '';
    const documentrevPromise = new Promise<any>((resolve, reject) => {
        // console.log(currentUserSelector);
       accountDb.get(documentid, (err, document) => {
        if (err) {
            console.log("err ",err);
            resolve( '');;
        }
        else {
            console.log("got document rev " ,document._rev);
            var rev= document._rev ? document._rev:'';
            resolve( rev);

        }
    });
    });

    const result = await documentrevPromise;
    return result;

}
const removeEmailAddressFromVoiceMaiilBox=(req, property,removedEmails)=>
{
    const  callflowdata= property.callflowdata.filter(cl=>  cl.callflowoptiontype==="FWD Message" && cl.deviceid)
    const propertyid= property.propertyid;
    if (callflowdata)
    {
        callflowdata.forEach(async (cl) => {
            var vmbox=   await getVoiceMailBoxForId(req,propertyid,cl.deviceid);
            var emaillist = vmbox.data.notify_email_addresses;
            console.log(removedEmails);
            console.log(emaillist);
            if (emaillist)
            {
                emaillist=  emaillist.filter (e=>!removedEmails.find(e1=>e1.email===e) );
                vmbox.data.notify_email_addresses= emaillist;
                console.log(emaillist);
                vmbox=await  updateVoiceMailBoxForId(req,propertyid,cl.deviceid,vmbox);
               
            }
        });
    }
    
}
const updatefwdmessagevoicemaileemailsettings= async (req,payload)=>
{
        var vmbox=   await getVoiceMailBoxForId(req,payload.propertyid,payload.callflowdata.deviceid);
        var emaillist = vmbox.data.notify_email_addresses;
       
        if (!emaillist)  emaillist=[];
        if (payload.checked && payload.email)
        {
            emaillist.push(payload.email);
           
        }
        else if( !payload.checked && payload.email)
        {
            
            emaillist=  emaillist.filter (e=> e!=payload.email );
        }
          vmbox.data.notify_email_addresses= emaillist;

        vmbox=await  updateVoiceMailBoxForId(req,payload.propertyid,payload.callflowdata.deviceid,vmbox);
       
}

const getVoiceMailBoxForId=  async(req,accountId,vid)=>
{   
   const kazooupdatepromise = new Promise<any>((resolve, reject) => {
       
            const kRequest =getKazooRequest(req)
			.get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}`
				,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                    
                     
                        resolve(JSON.parse( b));
                    }
                }
                );
             });

  
    const result = await kazooupdatepromise;
     return result;
}

const deleteVoiceMessages=  async(accountId, vmbox_id)=>
{   
    //33c743df62f6444acaa74eb7f16610c1
    const apiKey = await loginwithcred();
   const kazooupdatepromise = new Promise<any>((resolve, reject) => {
            const kRequest =getKazooRequest(null, apiKey)
			.get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages`
				,
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                        
                        const messages= JSON.parse( b);
                        
                        if (messages && messages.data && messages.data.length>50)
                        {
                            const oldest_message=messages.data[ messages.data.length-1];
                        
                            const mesageid=oldest_message.media_id;
                            const kRequest = getKazooRequest(null,apiKey)
                                         .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vmbox_id}/messages/${mesageid}`
                                        , (err, response, body) => {
                                            console.log(body)
                                         });

                        }
                        resolve(JSON.parse( b));
                    }
                }
                );
             });

  
    const result = await kazooupdatepromise;
     return result;
}

const updateVoiceMailBoxForId=  async(req,accountId,vid, vbox)=>
{   
   
       //    console.log("\n updateVoiceMailBoxForId vbox ", vbox);
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {
       
            const kRequest =getKazooRequest(req)
			.post({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/vmboxes/${vid}`,
                body: vbox,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                      //  console.log("\nvoice mail box updated succesfully", b);
                        resolve( b);
                    }
                }
                );
             })
    const result = await kazooupdatepromiss;
    return result;
}
const getdocumentbyproperty=  async(accountDb,contactsSelector)=>
{   
   
    const documentPromise = new Promise<any>((resolve, reject) => {
       
           accountDb.find(contactsSelector, function (err, result) {
              if (err) {
                        console.log("err ",err);
                        resolve( err);;
                    }
                    else {
                        
                        var document;
                        if (result.docs.length>0)
                        {
                            document= result.docs[result.docs.length-1];
                        }
                       
                        //console.log("got document  " ,rev);
                        resolve( document);
                    }
                });
    });

    const result = await documentPromise;
    return result;

}


const getalldocumentsbyproperty=  async(accountDb,contactsSelector)=>
{   
   
    const documentPromise = new Promise<any>((resolve, reject) => {
       
           accountDb.find(contactsSelector, function (err, result) {
              if (err) {
                        console.log("err ",err);
                        resolve( err);;
                    }
                    else {
                        
                        var documents=[];
                        if (result.docs.length>0)
                        {
                            documents= result.docs;
                        }
                       
                     //   console.log("got document  " ,result);
                        resolve( documents);
                    }
                });
    });

    const result = await documentPromise;
    return result;

}


const updatekazoousersettings=  async(payload,req,companyid,id)=>
{   
    const livereplysetting= payload.livereplysetting ==='undefined' ? []: payload.livereplysetting;
			    const notificationrulessetting= payload.notificationrulessetting ==='undefined' ? []: payload.notificationrulessetting;
			    const handoffrulessettings=payload.handoffrulessettings ==='undefined' ? []: payload.handoffrulessettings;
			    const escalationsettings=payload.escalationsettings ==='undefined' ? []: payload.escalationsettings;
			    const smsagreement= payload.smsagreement
 
            var userdata:any={data:{
                title:payload.title,
                timezone:payload.timezone,
                phonesettings:payload.phonesettings,
                smssettings:payload.smssettings,
                emailsettings:payload.emailsettings,
                pin:payload.pin,
                livereplysetting:livereplysetting,
                notificationrulessetting:notificationrulessetting,
                handoffrulessettings:handoffrulessettings,
                escalationsettings:escalationsettings,
                smsagreement:smsagreement
        }};
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {
       
            const kRequest = getKazooRequest(req)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${id}`,
                body: userdata,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                        console.log("\n kazoo updated successfull");
                        resolve(payload);
                    }
                }
                );
             })
    const result = await kazooupdatepromiss;
    return result;
}

const updatekazoouseremailsettings=  async(payload,req,companyid,id)=>
{   
   
            var userdata:any={data:{
                
                emailsettings:payload.emailsettings,
                
        }};
    const kazooupdatepromiss = new Promise<any>((resolve, reject) => {
       
            const kRequest = getKazooRequest(req)
            .patch({
                url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${id}`,
                body: userdata,
                json: true
            },
                (e, r, b) => {
                    if (e) {
                        console.log(e);
                    
                        resolve(e);
                    }
                    else {
                        console.log("\n kazoo updated email setting successfull");
                        resolve(payload);
                    }
                }
                );
             })
    const result = await kazooupdatepromiss;
    return result;
}
const updateScheduleReport=  async(accountDb,_userobj)=>
{   
   
    const updateScheduleReportPromise = new Promise<any>((resolve, reject) => {
		// console.log("sendsms2\n", payload);
		accountDb.insert(_userobj, function (err, result) {
              if (err) {
                        console.log("err notifie user settingd ",err);
                        resolve( err);;
                        console.log(JSON.stringify(_userobj));
                    }
                    else {
                        console.log("suceess notifie user settingd ",result);
                      resolve( result);
                    }
                });
       
    });

    const result = await updateScheduleReportPromise;
    return result;

}
const check_user_log= (_userobj, temp_user)=>
{
    if (_userobj.pin!=temp_user.pin)
    {
        console.log("update pin");
    }
    
    
}
const updatenotifyusersettings=  async(accountDb,_userobj,payload, sendsms, property,req)=>
{   
    //console.log("updatenotifyusersettings");
    const temp_user= JSON.parse(JSON.stringify(_userobj));
     const updatesettingspromise = new Promise<any>((resolve, reject) => {
		 _userobj.timezone=payload.timezone;
		_userobj.phonesettings=payload.phonesettings;
		_userobj.title=payload.title;
		
        _userobj.smssettings=payload.smssettings;
        const deletedemailids= _userobj.emailsettings.settings.filter ((_em)=> !payload.emailsettings.settings.find((pem)=>pem.email===_em.email) )
        _userobj.emailsettings=payload.emailsettings;
		_userobj.pin=payload.pin;
		_userobj.livereplysetting=payload.livereplysetting;
		
		_userobj.notificationrulessetting=payload.notificationrulessetting;
		_userobj.handoffrulessettings=payload.handoffrulessettings;
		_userobj.handoffrulessettings=payload.handoffrulessettings;
        _userobj.escalationsettings=payload.escalationsettings;
        
        _userobj.user_imager=payload.user_imager;
		_userobj.member_image=payload.member_image;
		
        _userobj.smsagreement=payload.smsagreement
           accountDb.insert(_userobj, function (err, result) {
              if (err) {
                        console.log("err notifie user settingd ",err);
                        resolve( err);;
                    }
                    else {
                        check_user_log(_userobj, temp_user);
                        if (deletedemailids && deletedemailids.length>0)
                        {
                            const propertyid= property ? property.propertyid:undefined;
                            removeEmailFromEscalationList(propertyid,deletedemailids);
                            removeEmailAddressFromVoiceMaiilBox(req,property,deletedemailids);
                        }
                        console.log("suceess notifie user settingd ",result);
                      resolve( result);
                    }
                });
    });

    var response= await updatesettingspromise;
    if (sendsms){
       const messagetext= "Please reply Y or YES to confirm you want to receive SMS messages from HelloSpoke Notify. Once subscribed, text STOP at any time to unsubscribe.";
        payload.smssettings.settings.forEach(async (s )=> {
            if (!s.optin)
            {
                const messaging_number= process.env.MESSAGINGNUMBER;
                await sendOptinMessage(s.number,messaging_number,messagetext);
            }
        });    
    }
    return response;


}
const sendOptinMessage= async (tonumber, fromnumber,messagetext)=>
{

        if (fromnumber.indexOf("+1")!=0)
            fromnumber= "+1"+fromnumber;
        if (tonumber.indexOf("+1")!=0)
            tonumber= "+1"+tonumber;
                    
        const payload = {
            "to"            : [ tonumber],
            "from"          : fromnumber,
            "messagetext"   : messagetext
        }
        const response= await sendNotifySMS(payload);
        return response;
     }

     const createindexes=async (_accountdbname)=>
     {
         try{
            var index_creation_result1= await createindex(_accountdbname,["datetime"],"datetime");
            var index_creation_result2= await createindex(_accountdbname,["incidentdate"],"incidentdate_index");
            var index_creation_result3= await createindex(_accountdbname,["_id"],"_id");
            var index_creation_result4= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype","enabled"],"pvt_type_callflowsoptiontype_enabled");
            var index_creation_result5= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype"],"pvt_type_callflowsoptiontype");
            var index_creation_result6= await createindex(_accountdbname,["pvt_type", "callflowsoptiontype","scheduleid","datetime"],"pvt_type_callflowsoptiontype_scheduleid");
            var index_creation_result7= await createindex(_accountdbname,["pvt_type","initialcallrecord","callernumber"],"initialcallrecord_callernumber");
            var index_creation_result8= await createindex(_accountdbname,["pvt_type","companyid","enabled"],"pvt_type_companyid_enabled");
            var index_creation_result9= await createindex(_accountdbname,["pvt_type","propertyid","enabled"],"pvt_type_propertyid_enabled");
            var index_creation_result10= await createindex(_accountdbname,["pvt_type", "guid"],"pvt_type_guid");
            var index_creation_result11= await createindex(_accountdbname,["email"],"email");
            var index_creation_result12= await createindex(_accountdbname,["pvt_type", "enabled"],"pvt_type_enabled");
            var index_creation_result13= await createindex(_accountdbname,["pvt_type", "incidentid","enabled"],"pvt_type_incidentid_enabled");
            var index_creation_result14= await createindex(_accountdbname,["pvt_type"],"pvt_type");
            var index_creation_result15= await createindex(_accountdbname,["notifytimestamp"],"notifytimestamp");
            var index_creation_result16= await createindex(_accountdbname,["pvt_type","id"],"pvt_type_id");
            var index_creation_result17= await createindex(_accountdbname,["pvt_type","notify_enabled","pin"],"pvt_type_notify_enabled_pin");
            var index_creation_result18= await createindex(_accountdbname,["pvt_type","type","guid"],"pvt_type_type_guid");
            var index_creation_result181= await createindex(_accountdbname,["pvt_type","elasticid"],"pvt_type_elasticid");
            var index_creation_result19= await createindex(_accountdbname,["escalationsettings","notify_enabled"],"escalationsettings_notify_enabled");
            var index_creation_result20= await createindex(_accountdbname,["pvt_type","didnumber"],"pvttypedidnumber");
            var index_creation_result21= await createindex(_accountdbname,["pvt_type","adjustdate_unix"],"pvt_typeadjustdate_unix-index");

        }
         catch(ex)
         {
             console.log(ex);
         }    
     }
const createindex=async (dbname, fields,name)=>
{

    console.log("fields ",fields);

    const indexDef = {
        index: { fields: fields },
        name: name
      };
      var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
      var nano1 = require('nano')(hellospoke_db);
      const db=nano1.use(dbname);
      const creatindexpromise= new Promise((resolve,reject)=>{
          
        const indexDef = {
            index: { fields: fields },
            name: name
        };
        db.createIndex(indexDef, (err, body) => {
            if (err) {
                console.log("err ",err);
                resolve( err);;
            }
            else {
                console.log("index created " ,body);
                resolve( body);

            }
    });
});
       

     
      var result= await creatindexpromise;
      return result;
}
const insertdayschedule= async(schedule,accountdbname)=>
{
    schedule.pvt_type= "dayschedule";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    const stored_schedule= await getdayscheduleInfo(accountDb,schedule);
    if (stored_schedule && stored_schedule._id)
    {
         schedule._rev=stored_schedule._rev;
         schedule._id=stored_schedule._id;
    }
    const insertdayschedulePromise = new Promise<any>((resolve, reject) => {
        // console.log(currentUserSelector);
       accountDb.insert(schedule, (err, body) => {
        if (err) {
            console.log("err ",err);
            resolve( err);;
        }
        else {
            console.log("day schedule inserted succefully " ,body);
            resolve( body);

        }
    });
    });

    // console.log(`Starting to search for users in set`, userIds);
    const result = await insertdayschedulePromise;
      return   result;
}
const updatenotifyusercolorindex=  async(accountDb,_userobj)=>
{   
   
    const updatesettingspromise = new Promise<any>((resolve, reject) => {
	
		accountDb.insert(_userobj, function (err, result) {
              if (err) {
                        console.log("err notifie user colorindex settingd ",err);
                        resolve( err);;
                    }
                    else {
                        console.log("suceess notifie colorindex settingd ",err);
                      resolve( result);
                    }
                });
    });

    const result = await updatesettingspromise;
    return result;

}
const updatenotifyuseremailsettings=  async(accountDb,_userobj,payload)=>
{   
   
    const updatesettingspromise = new Promise<any>((resolve, reject) => {
 
		_userobj.emailsettings=payload.emailsettings;
        accountDb.insert(_userobj, function (err, result) {
              if (err) {
                        console.log("err notifie user email settingd ",err);
                        resolve( err);;
                    }
                    else {
                        console.log("suceess notifie user email settingd ",result);
                      resolve( result);
                    }
                });
    });

    const result = await updatesettingspromise;
    return result;

}

const insertescalationuserlist= async (schedule,accountdbname)=>
{
    schedule.pvt_type= "escalationuserlist";
    schedule.enabled=true;
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
        "selector": {
            "pvt_type": "escalationuserlist"
            
         },
        limit:30000 
    }
    var stored_list=await getdocumentbyproperty(accountDb,contactsSelector); 
    console.log("escalationuserlist");
    if (stored_list && stored_list._id && stored_list._rev)
    {
        schedule._id=stored_list._id;
        schedule._rev=stored_list._rev;
    }

    accountDb.insert(schedule, (err, body) => {
        if (err) {
            console.log("err ",err);
            return err;;
        }
        else {
            console.log("escalation user list inserted succefully");
            return body;

        }
    });

}


const insertcallactivityreportinfo= async (callactivityinfo,accountdb)=>
{
    callactivityinfo.pvt_type= "callactivityreport";
    
   
    const callactivityinfoinsertpromise = new Promise((resolve,reject)=>{
        accountdb.insert(callactivityinfo, (err, body) => {
            if (err) {
                console.log("err ",err);
                resolve( err);;
            }
            else {
                console.log("call activity report info inserted succefully");
                resolve( body);
    
            }
        });
    });

    const result= await callactivityinfoinsertpromise;
    return result;

}

const formatPhoneNumber= (phoneNumber) =>{
    if (!phoneNumber) {
        return null;
    }
    if (typeof phoneNumber === 'number') {
        phoneNumber = phoneNumber.toString();
    }
    phoneNumber = phoneNumber.replace(/\(/g, '').replace(/\)/g, '')
        .replace(/ /g, '').replace(/-/g, '').replace(/\+/);

    const re = /(?:1)?(\d{3})(\d{3})(\d{4})/;

    const matches = phoneNumber.match(re);

    if (matches === null) {
        return phoneNumber;
    }

    return `${matches[1]}-${matches[2]}-${matches[3]}`;
}
const getreportdatadocument= async (accountDb,callinfo)=>
{
    const guid= callinfo.incidentid ? callinfo.incidentid: callinfo.guid
    const contactsSelector = {
        'selector': {
            enabled:true,
            "pvt_type": "reportdata",
            "guid": guid
            
            },
            limit:30000 
        }
        var reportdata=await getdocumentbyproperty(accountDb,contactsSelector); 
    return reportdata;
}
const insertDocument= async (accountDb, document)=>
{
    const documentPromise = new Promise<any>((resolve, reject) => {
       
        accountDb.insert(document, function (err, result) {
           if (err) {
                     console.log("err ",err);
                     resolve( err);;
                 }
                 else {
                     console.log(`document ${document.pvt_type} inserted`);
                     resolve( result);
                 }
             });
        });
        const result = await documentPromise;
        return result;
}
const getcallinfologformessagerecording= async (accountDb,guid)=>
{
     const contactsSelector = {
        "selector": {
            "enabled":true,
            "pvt_type": "callinfolog",
            "type": "messagerecordingstart",
            "guid": guid
            
            },
            limit:30000 
        }
        var callinfo=await getdocumentbyproperty(accountDb,contactsSelector); 
    return callinfo
}
const getreportdatadocumentfrommessagid= async (accountDb,callinfo)=>
{
    
    const contactsSelector = {
        'selector': {
            enabled:true,
            "pvt_type": "reportdata",
            "messageid":callinfo.messageid
            },
            limit:30000 
        }
        var reportdata=await getdocumentbyproperty(accountDb,contactsSelector); 
    return reportdata
}


const getreportdatadocumentfromvoicemailid= async (accountDb,callinfo)=>
{
    
    const contactsSelector = {
        'selector': {
            enabled:true,
            "pvt_type": "reportdata",
            "voicemailid":callinfo.voicemailid
            },
            limit:30000 
        }
        console.log(JSON.stringify(contactsSelector));
        var reportdata=await getdocumentbyproperty(accountDb,contactsSelector); 
    return reportdata
}

const getunresolvedreportdatadocuments= async (accountDb,callinfo)=>
{
    
    const contactsSelector = {
        "selector": {
            "propertyid":callinfo.propertyid,
            "enabled":true,
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
            "resolved":false
            },
            limit:30000 
        }
          var reports=await getalldocumentsbyproperty(accountDb,contactsSelector);
            return reports
}

const parseagenaction= async(accountDb,callinfo)=>
{
    var reportdata=await getreportdatadocumentfrommessagid(accountDb,callinfo);
    var agentaction = callinfo.action;
    var messagetype=callinfo.messagetype;
    var callinfodescription= `${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
    var callrecording=false;
    const customernumber= reportdata.fromd; 
    var straction= "";
    var filename="";
    var generatereport=false;
    if (agentaction==="2")
    {
        straction+=`called back ${formatPhoneNumber(customernumber)}`;
        callrecording=true;
         filename= `notify_call_${callinfo.guid}_${callinfo.messageid}`;
         generatereport=true;
    }
    else if (agentaction==="3")
    {
        straction+=`acknowledged message from ${formatPhoneNumber(customernumber)}`;
        generatereport=true;
        
    }
    else if (agentaction==="7")
    {
        straction+=`deleted this message`;
        generatereport=true;
        
    }
    if(generatereport)
    {
        const now_unix= callinfo.notifytimestamp; 
    
        const savedstr= messagetype==="old" ? "from saved message":"";
        if (messagetype==="new" &&  straction.length>0)
        {
            reportdata.respondent=callinfo.agentname;
            reportdata.respondentphone=callinfo.agentphonenumber;
            reportdata.respondentat=now_unix ;
            reportdata.responsetime= now_unix- reportdata.incidentdate;
            reportdata.resolved=true;
            reportdata.filename= filename;

        }
        callinfodescription+=`${straction} ${savedstr}`;
        
        var calldetailsinfo:any= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":callrecording,
            
            };
        if(filename.length>0)
        {
            calldetailsinfo.filename=filename;
            
        } 
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        console.log("inserting agent action report");
        await insertreportdata(reportdata,accountDb);
        //update elastic search 
        var fields = {
            calldetailsinfolist:reportdata.calldetailsinfolist,
            respondent:reportdata.respondent,
            respondentphone:reportdata.respondentphone,
            respondentat:reportdata.respondentat,
            responsetime:reportdata.responsetime,
            resolved:reportdata.resolved,
            filename:reportdata.filename

        }
    
    
        updatereportdatatoelastic(accountDb,reportdata,fields);
    }    
    return reportdata;
    
}

const parsemessagerecordingend= async(accountDb,callinfo)=>
{
    var reportdata=await getreportdatadocument(accountDb,callinfo);
    try
    {
        const customernumber= reportdata.fromd;
        var callinfodescription= `Message received from ${formatPhoneNumber(customernumber)} `;
        const now_unix= callinfo.notifytimestamp;
        var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":true,
            "filename":callinfo.messageid,
            "voicemessage":true,
            "messageurl":callinfo.url
        };
        reportdata.calldetailsinfolist=  reportdata.calldetailsinfolist.filter(rd=> !rd.messageurl);
     
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        reportdata.messageid= callinfo.messageid;
        reportdata.messageurl= callinfo.url;
        console.log("inserting messagerecordingen report");
        await insertreportdata(reportdata,accountDb);
    
        setTimeout(() => {
            sendEscalationEmails(reportdata)
        }, 70000); 
    return reportdata;
    }
    catch (ex)
    {
        debugMessage("error droping report");
        debugMessage(ex);
        return await parsemessagerecordingend(accountDb,callinfo);

    }
    
}

const parseVoiceMessage= async(accountDb,callinfo)=>
{

    var reportdata=await getreportdatadocument(accountDb,callinfo);
    try{
        const now_unix= callinfo.notifytimestamp;
        const type=reportdata? reportdata.type:""  ;
        if (type==="Emergency")
        {
            var description= `Caller selected General `;
            const calldetailsinfo= {
                "time":now_unix,
                "discription":description,
                "callrecording":false
            
            };
            reportdata.calldetailsinfolist.push(calldetailsinfo); 
            reportdata.type="General";  
        }
        reportdata.voicemailid=callinfo.voicemail_id;
        var callinfodescription= `Call disconnected `;

        const calldetailsinfo_callend= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false,
            "calldiscconected":true
        };
    
        reportdata.calldetailsinfolist.push(calldetailsinfo_callend); 
        console.log("inserting voice message to report");
        await insertreportdata(reportdata,accountDb);
        var calldetailsinfolist= reportdata.calldetailsinfolist;
        var fields = {
            calldetailsinfolist:reportdata.calldetailsinfolist,
            type:reportdata.type
        }
        updatereportdatatoelastic(accountDb,reportdata,fields);
        return reportdata;
    }
    catch(ex)
    {
        callinfo.reporterror=true;
        await insertDocument(accountDb,callinfo);
        throw ex;    
    }

}


const parseS3Notifcation= async(callinfo)=>
{
    try {
        console.log("s3Onje3ct");
        console.log(callinfo)
        const key =callinfo.key;
        if (key)
        {
            const keyparts= key.split("/");
        
            if (keyparts.length>1)
            {
            // account%2F20%2F47%2Fa7abb35d2ee72092efca120a0119-202007
            // account%2F20%2F47%2Fa7abb35d2ee72092efca120a0119-202007
                //account%252F20%252F47%252Fa7abb35d2ee72092efca120a0119-202007
            
                const keyparts_account= keyparts[0];
                const account= keyparts_account.split("-")[0];
                const propertydbname=  account.split("%252F").join("/");
                const propertyid=  parseDatabaseNameToAccount(propertydbname);
                const property= await getpropertyInfo(propertyid);
                const companyid= property.companyid;
                const companydbname= parseAccountToDatabaseName(companyid);
                const accountDb= nano.use(companydbname);
                callinfo.pvt_type="s3voicemail";
                await insertDocument(accountDb,callinfo); 
                const keyparts_voicemailid= keyparts[1];
                const voicemailid= keyparts_voicemailid.split("_")[0];
                callinfo.voicemailid=voicemailid;
                var reportdata=await getreportdatadocumentfromvoicemailid(accountDb,callinfo);
                if (reportdata && reportdata.voicemailid)
                {
                    var calldetailsinfolist=  reportdata.calldetailsinfolist;
                    const customernumber= reportdata.fromd;
                    var callinfodescription= `Message received from ${formatPhoneNumber(customernumber)} `;
                    const now_unix= moment().utc().unix();;
                    var calldetailsinfo= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":true,
                        "voicemailid":reportdata.voicemailid,
                        "voicemessage":false,
                        "voicemailkey":callinfo.key
                    };

                    const call_desconnected_index= calldetailsinfolist.findIndex(c=> c.calldiscconected);
                    if (call_desconnected_index>=0)
                    {
                        var call_desconnected_record=calldetailsinfolist[call_desconnected_index];
                        call_desconnected_record.now=now_unix;
                        calldetailsinfolist.splice(call_desconnected_index,0,calldetailsinfo) 
                    }
                    else 
                    {
                        calldetailsinfolist.push(calldetailsinfo);
                    }
                    reportdata.calldetailsinfolist=calldetailsinfolist;
                    reportdata.messageid= callinfo.key;
                    reportdata.voicemailkey= callinfo.key;
                    reportdata.resolved=true;
                
                    console.log("inserting s3 message to report");
                    await insertreportdata(reportdata,accountDb);
                    //update elastic search     
                    var fields = {
                        calldetailsinfolist:reportdata.calldetailsinfolist,
                        messageid:callinfo.key,
                        voicemailkey:callinfo.key,
                        resolved:true

                    }
                    updatereportdatatoelastic(accountDb,reportdata,fields);
                }
            }
            
        }
    }
    catch(ex)
    {
        debugMessage("during s3 message parsing", "error");
        debugMessage(ex, "error info")
        debugMessage(callinfo, "info");
        
    }
    
}
const parsecallrecording= async(accountDb,callinfo)=>
{
        var reportdata=await getreportdatadocument(accountDb,callinfo)
        try {
            reportdata.filename= callinfo.filename;
            console.log("inserting call recording file ");
            await insertreportdata(reportdata,accountDb);
           
        }catch(ex){
              
                    throw ex;
            }
        return reportdata;
    
}


const parseagentpin= async(accountDb,callinfo)=>
{
    try {
        if (callinfo.when&& callinfo.when.toLowerCase()==="live")
        {
            var reportdata=await getreportdatadocument(accountDb,callinfo)
            var callinfodescription= `${callinfo.agentname} `;
            var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
            const now_unix= callinfo.notifytimestamp;
            if (result==="valid")
            {
                
                callinfodescription+='entered PIN';
                var calldetailsinfo:any= {
                    "time":now_unix,
                    "discription":callinfodescription,
                    "callrecording":false
                };
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                reportdata.callstarttime= now_unix;
                const customernumber= reportdata.fromd;
                callinfodescription= `${callinfo.agentname} connected to ${formatPhoneNumber(customernumber)}`;
                const filename= `live_call_${reportdata.guid}.wav`   ;
                calldetailsinfo= {
                    "time":now_unix,
                    "discription":callinfodescription,
                    "callrecording":true,
                    "filename":filename,
                    "voicemessage":false
                };
                reportdata.calldetailsinfolist.push(calldetailsinfo);
                var when=  "LIVE";
                reportdata.resolutionon=when;
                reportdata.respondent=callinfo.agentname;
                reportdata.respondentphone=callinfo.agentid;
                reportdata.respondentat=now_unix ;
                reportdata.responsetime= now_unix- reportdata.incidentdate;
                reportdata.filename= filename;
                reportdata.resolved=true;
            }
            else 
            {
                callinfodescription+= "entered invalid pin";
            }
            
            console.log("inserting agent respose pin ");
            await insertreportdata(reportdata,accountDb);
            return reportdata;
        }
    }
    catch(ex)
    {
        throw ex;
    }

    
}

const parsecallend= async(accountDb,callinfo)=>
{
    try{
        if (callinfo.when==="live" && callinfo.reason && callinfo.reason==="NORMAL_CLEARING" )
        {
        var reportdata=await getreportdatadocument(accountDb,callinfo)
        if (reportdata && !reportdata.calldisconnected)
        {
                var callinfodescription= `Call disconnected `;

                const now_unix= callinfo.notifytimestamp? callinfo.notifytimestamp: moment().utc().unix();
                    var calldetailsinfo= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":false,
                        "callduration":now_unix- reportdata.respondentat
                    };
                    reportdata.callduration=now_unix- reportdata.respondentat;
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                    reportdata.calldisconnected= true;
                    reportdata.callendtime=now_unix;

                    console.log("inserting end ");
                    await insertreportdata(reportdata,accountDb);
                    return reportdata;
                }
            }
            return reportdata;
        }
        catch (ex)
        {
            throw ex;
        }
}

const parseagentcallend= async(accountDb,callinfo)=>
{
    var reportdata=await getreportdatadocumentfrommessagid(accountDb,callinfo);
    
    var callinfodescription= `Call disconnected `;
    const now_unix= callinfo.notifytimestamp;
    var calldetailsinfo= {
        "time":now_unix,
        "discription":callinfodescription,
        "callrecording":false,
        "callduration":now_unix- reportdata.respondentat
    };
    if (!reportdata.callduration)
    {
         reportdata.callduration=now_unix- reportdata.respondentat;
    }
    reportdata.calldetailsinfolist.push(calldetailsinfo);

    console.log("inserting agen call end ");
    await insertreportdata(reportdata,accountDb);

    var fields = {
        calldetailsinfolist:reportdata.calldetailsinfolist
    }
    updatereportdatatoelastic(accountDb,reportdata,fields);
    return reportdata;

}
const parseagentrespnse= async(accountDb,callinfo)=>
{
    var result;
    try{
         var reportdata=await getreportdatadocument(accountDb,callinfo)
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="accepted")
        {
            callinfodescription+= "accepted";
        }
        else if (result=== 'rejected')
        {
            callinfodescription+= "rejected";
        }
        else if (result=== 'userbusy')
        {
            callinfodescription+= "on other call";
        }

       
        var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        };
        //reportdata.calldetailsinfolist.push(calldetailsinfo);
        console.log("inserting agent respose accepted report");
        await insertreportdata(reportdata,accountDb);

        result =reportdata;
        return result;
    } 
    catch(ex)
    {
        throw ex;
    }   
   
   
}

    

const updatenotelength= async(callinfo,noteslength,propertyid)=>
{
        const property= await getpropertyInfo(propertyid);
        const companydbname= parseAccountToDatabaseName(property.companyid);
        const companydb=nano.use(companydbname);
        var reportdata=await getreportdatadocument(companydb,callinfo);
        reportdata.notes = noteslength;
        console.log("inserting notes length");
        var result =await insertreportdata(reportdata,companydb);
        var fields = {
            notes:reportdata.notes 
        }
        updatereportdatatoelastic(companydb,reportdata,fields);
        return result;
    
}
const parseruleexecution= async(accountDb,callinfo)=>
{
    var formatedphone= formatPhoneNumber(callinfo.agentphonenumber);
    var callinfodescription= `SMS sent to ${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
    const now_unix= callinfo.notifytimestamp;
    var calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        };
       // getunresolvedreportdatadocuments
    if (callinfo.when.toLowerCase()==="live")
    {
        var reportdata=await getreportdatadocument(accountDb,callinfo);
    
        reportdata.calldetailsinfolist.push(calldetailsinfo);
        console.log("inserting ruleexecution sms report");
        await insertreportdata(reportdata,accountDb);
    }
    else 
    {
       var reportlist:any=await getunresolvedreportdatadocuments(accountDb,callinfo);
       reportlist.forEach(async(report) => {
           if (report.calldetailsinfolist)
           {
                report.calldetailsinfolist.push(calldetailsinfo);
                console.log("inserting ruleexecution sms report");
                await insertreportdata(report,accountDb);
                //update elastic search 
                var fields = {
                    calldetailsinfolist:report.calldetailsinfolist
                }
                updatereportdatatoelastic(accountDb,report,fields);
            }
       });
    }
    return reportdata;
    
}

const parseagentpinfornotify= async(accountDb,callinfo)=>
{
    const now_unix= callinfo.notifytimestamp;
    var reportlist:any=await getunresolvedreportdatadocuments(accountDb,callinfo);
    for (var i=0;i<reportlist.length;i++){
        var report= reportlist[i];
       
        var callinfodescription= `${callinfo.agentname} `;
        var result =callinfo.result ? callinfo.result.toLowerCase(): "" ;
        const now_unix= callinfo.notifytimestamp;
        if (result==="valid")
        {
            
            callinfodescription+='entered PIN';
            var calldetailsinfo:any= {
                "time":now_unix,
                "discription":callinfodescription,
                "callrecording":false
            };
            report.calldetailsinfolist.push(calldetailsinfo);
        }
       
       
        await insertreportdata(report,accountDb);
        var fields = {
            calldetailsinfolist:report.calldetailsinfolist
        }
        updatereportdatatoelastic(accountDb,report,fields);
    }
       ;
    
    return reportlist;
    
}
const parseagentring= async(accountDb,callinfo)=>
{
    var result;
        try{
            var formatedphone= formatPhoneNumber(callinfo.agentphonnumber);
            // const setorissue= callinfo.when.toLowerCase()==="live" ? "issued": "sent";
                var callinfodescription= `Call sent to ${callinfo.agentname  ? callinfo.agentname :'unknown'} `;
            
                const now_unix= callinfo.notifytimestamp;
                    
                var calldetailsinfo= {
                    "time":now_unix,
                    "discription":callinfodescription,
                    "callrecording":false
                };
                if (callinfo.when.toLowerCase()==="live")
                {
                    var reportdata=await getreportdatadocument(accountDb,callinfo);
                    if (!reportdata) //try one more time 
                        reportdata=await getreportdatadocument(accountDb,callinfo);
                    reportdata.calldetailsinfolist.push(calldetailsinfo);
                    console.log("inserting agent respose ring report");
                    await insertreportdata(reportdata,accountDb);
                }
                else if (callinfo.when.toLowerCase()==="notify")
                {
                    var reportlist:any= await getunresolvedreportdatadocuments(accountDb,callinfo);
                    reportlist.forEach(async(report) => {
                        report.calldetailsinfolist.push(calldetailsinfo);
                        console.log("inserting ruleexecution ring report");
                        await insertreportdata(report,accountDb);
                        //update elastic search 
                        var fields = {
                            calldetailsinfolist:report.calldetailsinfolist
                        }
                        updatereportdatatoelastic(accountDb,report,fields);

                    });
                }
            
                result= reportdata;
            }
            catch(ex){
                  console.log("throw ")
                    throw ex;
            }
       
        
        return result;
}
 

const getpropertyInfo=async(propertyid, propertydb=undefined)=>
{

   
    const contactsSelector = {
        'selector': {
            "propertyid":propertyid,
            enabled:true,
            "pvt_type": "property"
            },
            limit:30000 
        }
    
  
     propertydb=propertydb===undefined? nano.use(parseAccountToDatabaseName( propertyid)): propertydb;
    
    var property=await getdocumentbyproperty(propertydb,contactsSelector);

    return property;
        
}
const getcompanyInfo=async(companyid, companydb=undefined)=>
{


    const contactsSelector = {
        'selector': {
            "companyid":companyid,
            
            "pvt_type": "company"
            },
            limit:30000 
        }
    var comapnydbname= parseAccountToDatabaseName(companyid);
  
     companydb=companydb===undefined ?nano.use(comapnydbname):companydb;
    
    var comapny=await getdocumentbyproperty(companydb,contactsSelector); 
    return comapny;
        
}

const getdayscheduleInfo=async(db,schedule1)=>
{
    const contactsSelector = {
        'selector': {
            "scheduleid":schedule1.scheduleid,
            "datetime":schedule1.datetime,
            "pvt_type": "dayschedule"
            },
            limit:30000 
        }
   
    var schedule=await getdocumentbyproperty(db,contactsSelector); 
    return schedule;
        
}
const getmonthreportdata=async(companyid)=>
{

    const contactsSelector = {
        "selector": {
            "pvt_type": "reportdata",
            "companyid": companyid,
            "enabled": true,
            "removefromreport": false
        },
        "limit": 30000
    };
    var comapnydbname= parseAccountToDatabaseName(companyid);
  
    var companydb= nano.use(comapnydbname);
    
    var reportdocs=await getalldocumentsbyproperty(companydb,contactsSelector); 
    return reportdocs;
        
}


const getcompanypropertylsit=async(companyid)=>
{

    const contactsSelector = {
        'selector': {
            enabled:true,
            "pvt_type": "property"
        }
    };
    var comapnydbname= parseAccountToDatabaseName(companyid);
  
    var companydb= nano.use(comapnydbname);
    
    var properties=await getalldocumentsbyproperty(companydb,contactsSelector); 
    return properties;
        
}
const finddaybusinesshours = (property)=>
{
    const timezone= property.timezone;
    var currendatettime =moment().tz(timezone);
    const dayname= currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const businesshours= property.bussinesshours[dayname];
    return businesshours;
}
const isduringBussinessHour=async(property)=>
{
    console.log("isduringBussinessHour");
    const timezone= property.timezone;
    var currendatettime =moment().tz(timezone);
    const dayname= currendatettime.format('dddd').toLowerCase();
    //console.log(dayname);
    const daybusinesshours= property.bussinesshours[dayname];
    //console.log(JSON.stringify( daybusinesshours));
    var from_hh=isNaN(daybusinesshours.from.hh)? daybusinesshours.from.hh :parseInt( daybusinesshours.from.hh);
    if (from_hh!=12 && daybusinesshours.from.a==="pm" )
    {
        from_hh+=12;
    }
    else  if (from_hh===12 && daybusinesshours.from.a==="am" )
    {
        from_hh=0;
    }
    var to_hh= parseInt(daybusinesshours.to.hh);
    const from_mm= parseInt(daybusinesshours.from.mm);
    const to_mm=parseInt( daybusinesshours.to.mm);
   
    if (to_hh!=12 && daybusinesshours.to.a==="pm" )
    {
        to_hh+=12;
    }
    else  if ((to_hh===12 || to_hh===0)&& daybusinesshours.to.a==="am" )
    {
        to_hh= to_mm>0 ? 0 :24;
    }
   
    var duringbussenesshours=false;
    if (isNaN(from_hh))
    {
        duringbussenesshours=false;
    }
    else
    {
        
        var moment_from_time= moment().tz(timezone).startOf('day').add(from_hh,"hours").add(from_mm,"minutes");;
      
        var moment_to_time= moment().tz(timezone).startOf('day').add(to_hh,"hours").add(to_mm,"minutes");;   
   //     duringbussenesshours=currendatettime.unix()>moment_from_time.unix() && currendatettime.unix()<moment_to_time.unix();
  /* console.log("moment_from_time");
   console.log(moment_from_time.format("DD-MM-YY hh mm ss a z"));
   console.log("currendatettime");
   console.log(currendatettime.format("DD-MM-YY hh mm ss A z"));
   console.log("moment_to_time");
   console.log(moment_to_time.format("DD-MM-YY hh mm ss a z"));
    */   
        
        duringbussenesshours=currendatettime.isBetween(moment_from_time,moment_to_time);
    }
    return duringbussenesshours;
       
}
const parsecallinfoinitdata = async(accountDb,callinfolog)=>
{
        try{
          
            var calldetailsinfolist=[];
            const callinfodescription= `Call received from ${formatPhoneNumber(callinfolog.callernumber)}`;
            const now_unix= callinfolog.notifytimestamp;
            if (callinfolog.when==="live"){
                    var calldetailsinfo= {
                        "time":now_unix,
                        "discription":callinfodescription,
                        "callrecording":false
                    }
                    calldetailsinfolist.push(calldetailsinfo);
                    const callinfodescription2= `Caller selected ${callinfolog.callflowoption} `
                    calldetailsinfo= {
                        "time":now_unix,
                        "discription":callinfodescription2,
                        "callrecording":false
                    }
                    calldetailsinfolist.push(calldetailsinfo);
            }
        
                
            var reportdata:any={
                "companyid":callinfolog.companyid,
                "companyname":callinfolog.companyname,
                "companytimezone":callinfolog.companytimezone,
                "industry":callinfolog.industry,
                "propertytype":callinfolog.propertytype,
                "propertytimezone":callinfolog.propertytimezone,
                "hscustomer": callinfolog.hscustomer,
                "propertyid": callinfolog.propertyid,
                "propertyname": callinfolog.propertyname,
                "propertyphone":callinfolog.propertyphone,
                "duringbussinesshours":callinfolog.duringbussinesshours,
                "calldetailsinfolist":calldetailsinfolist,
                "guid":callinfolog.guid,
                "callid":callinfolog.guid,
                "type":callinfolog.callflowoption ,
                "when": callinfolog.when,
                "boxid": callinfolog.boxid,
                "didnumber": callinfolog.didnumber,
                "respondent": "-",
                "responsetime": "-",
                "notes": 0,
                "from": callinfolog.callername,
                "fromd":callinfolog.callernumber,
                "incidentdate": now_unix,
                "resolutiontype": "-",
                "isescalation": true,
                "pvt_type": "reportdata",
                "enabled": true,
                "resolutionon":"-",
                "resolved":false,
                "removefromreport":false
            }
            debugMessage(`inserting initial report`);
            var stored_report =  await getreportdatadocument(accountDb,reportdata);
            if (stored_report)
            {
                reportdata._id= stored_report._id;
                reportdata._rev= stored_report._rev;
            }
            await insertreportdata(reportdata,accountDb);
        // 
            return reportdata;
    }
    catch(ex){
        //callinfolog.reporterror=true;
       // insertDocument(accountDb,callinfolog);
            console.log("threow 111")
            throw( ex);
    }
    
    

   
    
}
const insertnotifycallinfologtoreport= async (callinfotype,callinfo,companydb)=>{
    var promise1= new Promise(async (resolve , reject )=>
    {
        switch (callinfotype)
        {
            case "ruleexecution":
            {
                if (callinfo.ruletype==="sms")
                resolve( await  parseruleexecution(companydb,callinfo));
                break;
            }
            case  "ring":   
            {
                resolve(await parseagentring(companydb,callinfo));
                console.log("parsing end",callinfotype ) 
                break;
            }
            default:
            {
                resolve ({})
            }
        }
    });
}

const insertlivecallinfologtoreport= async (callinfotype,callinfo,companydb)=>
{
    try {
        var result;
        switch (callinfotype)
        {
            case "callinit":
                {
                    if (callinfo.when.toLowerCase()==="live")
                        result =await parsecallinfoinitdata(companydb,callinfo);;
                        console.log("parsing end",callinfotype ) 
                        console.log(result);
                }
            case  "ring":   
            {
                result= await parseagentring(companydb,callinfo);
                console.log("parsing end",callinfotype ) 
                break ;
            }
            case  "agentrespnse":   
            {
                result= await parseagentrespnse(companydb,callinfo);
                console.log("parsing end",callinfotype ) ;
                break;
                ;
            }
            case  "pin":   
            {
                result= await parseagentpin(companydb,callinfo);
                console.log("parsing end",callinfotype ) 
                break;
            }
            
            case "callrecording":
            {
                result=  await parsecallrecording(companydb,callinfo);
                break;
            }

            case "callend":
            {
                result= await parsecallend(companydb,callinfo);
                break;
            }
            case "messagerecordingend":
            {
                result= await parsemessagerecordingend(companydb,callinfo);
                break;
            }
            
          
            default:
            {
                result= {};
                break;
                
            }

        }
    return result;
    }
    catch (ex)
    {
        console.log("throw 2222")
        throw ex;
    }
    }
const parselivecallinfologdataforreport=async(companydb,guid)=>
{
    debugMessage(`started parsing ${guid}`);
    const contactsSelector = {
            'selector': {
                "pvt_type":"callinfolog",
                "guid":guid
                },
                limit:30000 
            }
        var callinfo;  
        var callinfologs=await getalldocumentsbyproperty(companydb,contactsSelector);
       
        callinfologs= callinfologs.sort((a, b) => {
                        
            return a.notifytimestamp > b.notifytimestamp  ? 1 : -1;
        });
        debugMessage(`\\**********************************************************************\\`);
        try{
        for (var i=0 ; i<callinfologs.length;i++)
        {
            try
            {
                callinfo= callinfologs[i];
                guid=callinfo.guid;
                var callinfotype= callinfo.type  ? callinfo.type.toLowerCase():'';
                console.log("parsing ",callinfotype )
                debugMessage(`parsing ${callinfotype} for ${guid}`);
                await insertlivecallinfologtoreport(callinfotype,callinfo,companydb);
                if ( callinfo.reporterror)
                {
                    callinfo.reporterror=false;
                    await insertDocument(companydb,callinfo); 
                }
                debugMessage(`parsing end ${callinfotype} for ${guid}`);
            }
            catch(ex)
            {
                console.log("final catch ");
                
                callinfo.reporterror=true;
                //console.log(callinfo);
                await insertDocument(companydb,callinfo);
                throw ex;
            }
        }
    }
    catch(ex)
    {
         callinfo.reporterror=true;
        console.log("final catch 2222222 ")
    }
                    
        debugMessage(`\\**********************************************************************\\`);
        debugMessage(`end parsing ${guid}`);
        debugMessage(`\\**********************************************************************\\`);
        //console.log(callinfo);
    if (callinfo && !callinfo.reporterror)
    {
        await insertreportdatatoelastic(companydb,callinfo);
        const  notifycalllog= await getNotifyCallLog(companydb,callinfo);
        console.log(notifycalllog.length);
        for (var i=0; i<notifycalllog.length;i++)
        {
            const callinfotype= notifycalllog[i].type.toLowerCase();
           
            if (callinfotype==="ruleexecution" || callinfotype==="ring")
            {
                    console.log(`inserting notify reportdata for ${notifycalllog[i].guid}`)
                    insertnotifycallinfologtoreport(callinfotype, notifycalllog[i], companydb);
            }
        }
    }
       return callinfo;
       
   

}

const insertcallinfolog= async(callinfo)=>
{
        callinfo.pvt_type= "callinfolog";
        callinfo.enabled=true;
        var now_unix= moment().utc().unix();
        callinfo.notifytimestamp=now_unix;

        const propertydabname= parseAccountToDatabaseName(callinfo.propertyid);
        const propertydb = nano.use(propertydabname);
    
        var callinfotype= callinfo.type  ? callinfo.type.toLowerCase():''; 
        const property=await getpropertyInfo(callinfo.propertyid);
        const company =await  getcompanyInfo(property.companyid);
        const companydabname= parseAccountToDatabaseName(property.companyid);
        const companydb = nano.use(companydabname);
        var result;
        if (callinfotype==="callinit")
        {
            now_unix--;
            callinfo.notifytimestamp=now_unix;
            var callflowdata= property.callflowdata;
             var callflow;
             callflow= callflowdata.find(cl=>cl.didnumber===callinfo.didnumber);
            if (callflow)
            {
                callinfo.callflowoption= callflow.callflowoption;
                callinfo.callflowoptiontype= callflow.callflowoptiontype;
             }
            const isduringbussinesshours=await isduringBussinessHour(property);
            
            callinfo["companyid"]=company.companyid;
            callinfo["companyname"]=company.companyname;
            callinfo["companytimezone"]=company.timezone;
            callinfo["industry"]=company.industry;
            callinfo["propertytype"]=property.type;
            callinfo["propertytimezone"]=property.timezone;
            callinfo["hscustomer"]= property.hscustomer;
            callinfo["propertyid"]= property.propertyid;
            callinfo["propertyname"]= property.propertyname;
            callinfo["propertyphone"]=property.phone;
            callinfo["duringbussinesshours"]=isduringbussinesshours;
            callinfo["daybusinesshours"]=finddaybusinesshours (property);
            callinfo["units"]= property.units;
            callinfo["hsaccount"]=property.hsaccount;
        }
        
            var insert_time_unix= moment().utc().unix();
            callinfo.inserttimestamp=insert_time_unix;
            companydb.insert(callinfo, async (err, body) => {
            if (err) {
                console.log("err ",err);
                return( err);
                ;;
            }                   
            else {
                console.log("callinfo log inserted succefully");
                const when= callinfo.when ? callinfo.when.toLowerCase():"";
                const reason=callinfo.reason ? callinfo.reason:"";
                if (when === "live" && callinfotype==="callend" && reason==="NORMAL_CLEARING")
                {
                     const messagerecordingstart= await getcallinfologformessagerecording(companydb,callinfo.guid)   
                    
                    const messageid= callinfo.messageid;
                     if (!messagerecordingstart || messageid)
                    {
                         await removeInitialCallRecord(callinfo,companydb );
                         result= parselivecallinfologdataforreport(companydb,callinfo.guid);
                    }
                }
                else if (when === "notify" &&(callinfotype==="ruleexecution" || callinfotype==="ring") )
                {
                    console.log(`inserting notify reportdata for ${callinfo.guid}`)
                     result= insertnotifycallinfologtoreport(callinfotype, callinfo, companydb);
                }
                else if (when=== "agentcall" && callinfotype ==="agentaction")
                {
                    result= parseagenaction(companydb,callinfo);
                }
               else if (when=== "agentcall" && callinfotype ==="callbackend")
                {
                    result=parseagentcallend(companydb,callinfo);
                }
                else if (when=== "agentcall" && callinfotype ==="pin")
                {
                    result=parseagentpinfornotify(companydb,callinfo);
                }
               
            }
        });
      ;
        return result;
    
   
}

const insertincidentnotes= async(incidentnotenotedata,accountdbname,propertyid)=>
{
   
    const accountDb = nano.use(accountdbname);
    const contactsSelector = {
        'selector': {
            "incidentid":incidentnotenotedata.incidentid,
            enabled:true,
            "pvt_type": "incidentnotes"
            },
            limit:30000 
        }
    var incidencenotedocument:any=await getdocumentbyproperty(accountDb,contactsSelector); 
    if (incidencenotedocument)
    {
        incidencenotedocument.data.push(incidentnotenotedata)
    }
    else
    {
        
        var notes= [];
        notes.push(incidentnotenotedata);
        incidencenotedocument= {
            incidentid:incidentnotenotedata.incidentid,
            data:notes,
            enabled:true,
            "pvt_type": "incidentnotes"
        }
       
    }
    
    const noteslength=incidencenotedocument.data.length;
    var insertresult= await   updatenotelength(incidentnotenotedata,noteslength,propertyid);
    accountDb.insert(incidencenotedocument, (err, body) => {
        if (err) {
            console.log("err ",err);
            return err;;
        }
        else {
            console.log("incident note  inserted succefully");
            return body;

        }
    });

}
const insertreportdata= async (callinfo,accountDb)=>
{
    callinfo.pvt_type= "reportdata";
    callinfo.enabled=true;
    //const accountDb = nano.use(accountdbname);
  
    var insertreportdatapromise =new Promise(async (resolve, reject) => {
        accountDb.insert(callinfo, (err, body) => {
            if (err) {
                console.log("err ",err);
                debugMessage(err);
       
                resolve( err);;
            }
            else {
                console.log("reportdata inserted succefully");
                debugMessage("reportdata inserted succefully");
                //console.log(JSON.stringify(body));
                resolve( body);;
                
    
            }
        });
    });

    var result = await insertreportdatapromise;
    return result;
   

}
const insertdtmfinfo=async  (dtmfinfo,accountdbname,property)=>
{  
    const accountDb = nano.use(accountdbname);
    try {
        dtmfinfo.pvt_type= "voicemail";
        dtmfinfo.enabled=true;
        dtmfinfo.guid=dtmfinfo.call_id;
        dtmfinfo.callid=dtmfinfo.call_id;
        
        var callflowdata= property.callflowdata;
        var callflow;
        if (dtmfinfo && dtmfinfo.DTMF>0 && callflowdata && callflowdata.length>dtmfinfo.DTMF)
             callflow= callflowdata[dtmfinfo.DTMF-1];
        if (callflow)
        {
            dtmfinfo.callflowoption= callflow.callflowoption;
            dtmfinfo.callflowoptiontype= callflow.callflowoptiontype;
        }
        else
        {
            dtmfinfo.callflowoption="Other";
        }
        const now_unix= moment().utc().unix();
        dtmfinfo.notifytimestamp=now_unix;
     }
        catch (ex)
        {
            debugMessage ("error while enserting voice mail from webhook", "error")
            debugMessage (ex, "error") ;
            debugMessage (dtmfinfo, "info") ;
            //dtmfinfo.reporterror=true;
            
        }
        accountDb.insert(dtmfinfo, (err, body) => {
            if (err) {
                console.log("err ",err);
                return err;;
            }
            else {
                console.log("dtmf info inserted succefully");
                return body;

            }
        });

}
const getInitilaCallRecordForCallingNumber= async (callernumber,companydb)=>
{

    const selector = 
        {
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
    var reportdoc=await getdocumentbyproperty(companydb,selector); 
    return reportdoc;
    
}
const removeInitialCallRecord=async(callinfo,companydb)=>{
       
        var reportdata= await getInitilaCallRecordForCallingNumber(callinfo.callernumber,companydb);
        reportdata.removefromreport= true;
        await insertreportdata(reportdata,companydb);
        var fields = {
            "removefromreport":true
        }
        await updatereportdatatoelastic(companydb,reportdata,fields);

}
const insertDTMFInforeport=async  (dtmfinfo,accountdbname,property)=>
{
    console.log("insertDTMFInforeport");
    const companydb = nano.use(accountdbname);
    var reportdata=await getreportdatadocument(companydb,dtmfinfo);
    const now_unix= dtmfinfo.notifytimestamp;
    const callinfodescription= `Caller selected ${dtmfinfo.callflowoption} `
    const calldetailsinfo= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        }
    if (!reportdata)
    {
        const r1=await insertcallinitreport(dtmfinfo,accountdbname,property,calldetailsinfo);
        return   r1;   
    }
    else
    {
        var calldetailsinfolist= reportdata.calldetailsinfolist;
        calldetailsinfolist.push(calldetailsinfo);
        reportdata.type= dtmfinfo.callflowoption;
        reportdata.escalationtype =dtmfinfo.callflowoptiontype;
        reportdata.removefromreport=false;
        reportdata.callflowoption=dtmfinfo.callflowoption;
        reportdata["dtmf"]= dtmfinfo.DTMF;
        var r=await insertreportdata(reportdata,companydb);
        //update elastic search 
        var fields = {
            type:reportdata.type,
            escalationtype:reportdata.escalationtype,
            callflowoption:reportdata.callflowoption,
            calldetailsinfolist:reportdata.calldetailsinfolist,
            dtmf:dtmfinfo.dtmf,
            "removefromreport":false
        }
        updatereportdatatoelastic(companydb,reportdata,fields);
        return r;
    }

}

const insertcallinitreport=async  (dtmfinfo,accountdbname,property,calldetailsinfo)=>
{

    
    const company= await getcompanyInfo(property.companyid);
    const companydb= nano.use (accountdbname);
    var init_reportdata=await getreportdatadocument(companydb,dtmfinfo);
   if (!init_reportdata)
   {
        console.log("insertcallinitreport");
        const now_unix= dtmfinfo.notifytimestamp;
        const callinfodescription= `Call received from ${formatPhoneNumber(dtmfinfo.caller_id_number)}`;
        var calldetailsinfo_init= {
            "time":now_unix,
            "discription":callinfodescription,
            "callrecording":false
        }
    var  calldetailsinfolist=[];
        calldetailsinfolist.push(calldetailsinfo_init);
        if (calldetailsinfo)
            calldetailsinfolist.push(calldetailsinfo);
        const isduringbussinesshours=await isduringBussinessHour(property);
        const daybusinesshours  =finddaybusinesshours(property);
        const reportdata= {
            
            companyid:company.companyid,
            companyname:company.companyname,
            companytimezone:company.timezone,
            industry:company.industry,
            propertytype:property.type,
            propertytimezone:property.timezone,
            hscustomer: property.hscustomer,
            propertyid:property.propertyid,
            propertyname:property.propertyname,
            propertyphone:property.phone,
            duringbussinesshours:isduringbussinesshours,
            daybusinesshours:daybusinesshours,
            calldetailsinfolist:calldetailsinfolist,
            guid:dtmfinfo.call_id,
            callid:dtmfinfo.call_id,
            callflowoption:dtmfinfo.callflowoption ,
            when:"-",
            
            callername:dtmfinfo.caller_id_name,
            callernumber:dtmfinfo.caller_id_number,
            type: dtmfinfo.callflowoption,
            escalationtype :dtmfinfo.callflowoptiontype,
            dtmf: dtmfinfo.DTMF,
            "respondent": "-",
            "responsetime": "-",
            "notes": 0,
            "from": dtmfinfo.caller_id_name,
            "fromd":dtmfinfo.caller_id_number,
            "incidentdate": now_unix,
            "resolutiontype": "-",
            "isescalation": false,
            "pvt_type": "reportdata",
            "enabled": true,
            "resolutionon":"-",
            "resolved":false,
            "removefromreport":false,
            "initialcallrecord":true
        }
        reportdata["dtmf"]= dtmfinfo.DTMF;
        const accountDb = nano.use(accountdbname);
        const result= await insertreportdata(reportdata,accountDb);
        if (result)
        {
        await  insertreportdatatoelastic(accountDb,reportdata);
        }
        return   result;
    }
    else 
        return init_reportdata;               

}

const getaccountdbnames = async ()=>
{
    var accountdbpromise =new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
    var nano1 = require('nano')(hellospoke_db);
    nano1.db.list(function(err, body) {
        if (err) {
            console.log("db error", err);
            reject(  err);
        }
        else
        {
         //   console.log( "dblist",body);
            resolve( body);
        }
    });
    });
    var result = await accountdbpromise;
    return result;
   
}


const createaccountdb = async (dbname)=>
{
    var accountdbpromise =new Promise(async (resolve, reject) => {
        var hellospoke_db = process.env.COUCHBASE_DB_ADMIN;
    var nano1 = require('nano')(hellospoke_db);
    nano1.db.create(dbname,function(err, body) {
        if (err) {
            console.log("db creation error", err);
            resolve(  err);
        }
        else
        {
         //   console.log( "sucess",body);
            resolve( body);
        }
    });
    });
    var result = await accountdbpromise;
    return result;
   
}


const resetpasswordemail = (payload) => {
    const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
     const transporter = nodemailer.createTransport(smtpConfig);

    const accountname = payload.data.accountname;
    const email= payload.data.email;
    const account_id = payload.data.accountid;
    const userid= payload.data.userid;
    const first_name= payload.data.first_name;
    const html= `<!DOCTYPE html>
    <html>
    
    <head>
        <style>
            .reset_color {
                fill: #FFFFFF;
            }
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    
    <body>
        <div
            style="padding-left: 161px; background-color: #d3d3d342; width: 568px; height: auto; padding:37px 0px 71px 45px;">
            <div><img src="${process.env.WEB_SERVER}img/HelloSpoke_logo.png" class="head1" /></div>
            <div class="row" style="margin-left:0px;margin-right:0px;">
                <div style="font-size: 14px; color:#003A5d;  margin-top: 30px;">
                    Hi ${first_name}, <br /> We received a request to reset your HelloSpoke password.
                </div>
                <div style="margin-top: 3%; margin-bottom: 11px; font-size: 14px; color:#003A5d;">
                    Simply click the button to set a new password:</div>
            </div>
            <div>
            <a target="_blank" href="${process.env.WEB_SERVER}Change_Password?email=${email}&accountname=${accountname}&account_id=${account_id}&userid=${userid}"><img src="${process.env.WEB_SERVER}img/Reset_password.png" class="head1" /></a>
                
            </div> <br /><br />
            <div class="row" style="margin-top: 7px;margin-left:0px;margin-right:0px;">
                <div style="font-size: 10px; color:#003A5d; font-family:open sans;">Or copy and paste this link into your
                    browser:
                    <a target="_blank" href="${process.env.WEB_SERVER}Change_Password?email=${email}&accountname=${accountname}&account_id=${account_id}&userid=${userid}">${process.env.WEB_SERVER}</a>
                </div>
            </div>
            <div class="row" style="margin-top: 34px;margin-left:0px;margin-right:0px;">
                <div style="font-size: 14px; color:#003A5d; font-family:open sans;">If you didn’t ask to change your
                    password, no worries!<br />
                    Your password is still safe and you can delete this email.</p>
                </div>
                <div class="row" style="margin-left:0px;margin-right:0px;">
                    <div style="font-size: 14px; color:#003A5d; font-family:open sans;margin-top: 20px;">If you need further
                        assistance, reach out to HelloSpoke at 888-955-5155.</div>
                </div>
            </div>
        </div>
        </div>
    </body>
    
    </html>`;

    let mailOptions = {
        from: process.env.SMTP_MAIL_SERVER_FROM,
        to: email,
        subject: ' NOTIFY Reset Password ',
        text: 'This is the email regarding  NOTIFY Reset Password.',       
        html: html,
        
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}

const sendEscalationEmails= async(reportdata)=>
{
   
    const callflowoption=reportdata.type;
    const propertyid=reportdata.propertyid
   // console.log(JSON.stringify( reportdata));
    var payload ={
        data:{
            callflowoption:callflowoption,
            emaillist:[]
            
        }
    } ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(dbname);
    const contactsSelector = {
                'selector': { "pvt_type": "escalationemaillist",
                "callflowoption": callflowoption
                    },
                    limit:30000 
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
     var emaillist=[];           
   if (escalationemailobj  && escalationemailobj.emaillist)
            emaillist=escalationemailobj.emaillist.map(a => a.email);
    if (emaillist.length>0)
    {
        payload.data.emaillist= emaillist;
        vmboxemail(payload,reportdata);
    }
    console.log(payload);

}
const vmboxemail = (payload,reportdata) => {
     const smtpConfig = {
        host:process.env.SMTP_MAIL_SERVER,
        port: 25,
        secure: false, // Use TLS
        auth: {
            user: process.env.SMTP_MAIL_SERVER_USERNAME,
            pass: process.env.SMTP_MAIL_SERVER_PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    };
     const transporter = nodemailer.createTransport(smtpConfig);
   
  const emails= payload.data.emaillist.toString();
  //console.log('sending email ', emails);
  const from = reportdata.from ? reportdata.from : '-';
  const fromnumber =reportdata.fromd ? reportdata.fromd : '-';;
  const to = reportdata.didnumber ? reportdata.didnumber : '';
  const tonumber = reportdata.didnumber ? reportdata.tonumber : '';
  const  incidentdate= moment.duration(reportdata.incidentdate , 'seconds');
  const dt= moment.utc(incidentdate.asMilliseconds());
  const received = dt.format("ddd, MMM D,YYYY at hh:mm")
  const duration = "";////payload.data.duration ? payload.data.duration : '';
 
  const filetype = 'wav';
  const filesize = "";
  const boxid= reportdata.boxid;
  const aws_url= 'https://hsnotifymessagerecording.s3-us-west-2.amazonaws.com/';
   const filename= reportdata.messageid;
   const audioserverurl=`${aws_url}${boxid}/${filename}`; 

  const fileurl =audioserverurl
  // const fileurl = audioserverurl;
const propertyname= reportdata.propertyname;
  const caller=  `from ${from}(${fromnumber})`;
  const calee=  `from ${to}(${tonumber})`;
  const callflowoption= reportdata.type;
  const voicemailboxname= `${callflowoption} Voicemail `;
    //const account_id = payload.data.accountid;
    //const userid= payload.data.userid;
    const html= 
    `<!DOCTYPE html>
    <html><head>    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div style=" font-family: sans-serif; color: #555555;">
            <div style="width: 700px;padding-right: 3%; padding-bottom: 8px; padding-left: 3%; padding-top: 2%;  background-color: #d3d3d342; margin:0px auto">
                <div style="background-color: #5995f7;   height: 8px !important;   margin-top: -8% !important;   margin-left: -25px!important;>
                </div>
                <div class="row head1">
                    <h3 style="font-size: 17px; margin-left: 34%; padding-top: 30px;">New Voicemail</h3>
                </div>
				<div style="padding-top: 30px;">
                <div class="row">
                    <p style="font-size: 15px;  ">Hi,</p>
                    <p style="margin-top: 6%;   ">You have a new voicemail from \n<span style="font-weight: 600;">${caller}</span>  for your voicemail box at <span style="font-weight: 600;">${voicemailboxname}</span>.</p>
                </div>
                <div style="display: flex;  "> 
                <p>Please find the message audio file in the attachment.</p>
                </div>
                <div class="row info">
                    <p style="font-size: 15px;   margin-top: 4%;   margin-bottom: 5%; font-size: 17px;">Voicemail Message Details</p>
                </div>
                <div class="row">
                    <table width="50%" class="table col-md-4" style="font-size: 13px;">
                        <tbody>
                            <tr class="active">
                                <td
                                    style="font-weight: 600; text-align: left;   border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    Caller</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                    ${caller}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600;text-align: left;border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    Callee</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                    ${calee}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600;text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;padding: 6px;">
                                    Received</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                     ${received}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    Length</td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                     ${duration}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    File Name   </td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                    ${filename}</td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    File Type   </td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                    ${filetype} </td>
                            </tr>
                            <tr class="active">
                                <td
                                    style="font-weight: 600; text-align: left; border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px; padding: 6px;">
                                    File Size   </td>
                                <td
                                    style="text-align: left ;  border: 1px solid #f4f4f4;   background-color: white;   font-size: 14px;   height: 29px;   padding-left: 6px;
									white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30ch;">
                                     ${filesize} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
				</div>
            </div>
        </div>
        </div>
    </body>
    
    </html>`;
    payload.data.emaillist.forEach(email => {
        let mailOptions = {
            from: process.env.SMTP_MAIL_SERVER_FROM,
            to: email,
            subject: `${propertyname} ${callflowoption} voicemail`,
            text: 'This is the email regarding vmbox.',
            html: html,
            attachments: [{
                filename:filename, 
                        contentType: 'application/wav',
                path: fileurl
            }]
        };
    
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        }); 
    });
}


const relogin=  async(req,account_name,creds)=>
{
    const responseData: any = {
        success: false
    };

    const putData = {
        data: {
            credentials: creds,
            account_name
        },
        verb: "PUT"
    };
    const reloginPromise = new Promise<any>((resolve, reject) => {
        const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
            body: JSON.stringify(putData)
   }, async (err: Error, response: Request.RequestResponse, body: any) => {
       if (err) {
           console.error(err);
           reject(err);
       }
       if (response && response.statusCode === 201) {
       // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
           console.log("loggedin");
           body = JSON.parse(body);
           var decoded= req['decoded'];
           const newToken = jwt.sign({
            'kazoo_api_key': body.auth_token,
            'logged_in': true,
            'user_id': decoded.user_id,
            'timezone': decoded.timezone,
            'account_id': decoded.account_id
        }, app.get('superSecret'), {
            'expiresIn': '1h'
        })
              
        responseData.success = true;
        responseData.token = newToken;
     
        
           resolve(responseData)
       }
       else{
        resolve(body)
       }
       
    })
    });
    console.log("loggedin12344");
    const reloginPromiseresult = await reloginPromise;
    console.log("loggedin 3445");
    console.log(reloginPromiseresult);
    return reloginPromiseresult;

}

const loginwithcred=  async()=>
{   
   const resetPasswordPromise = new Promise<any>((resolve, reject) => {
    const  creds=process.env.KAZOO_CREDENTIAL_HASH;
    const account_name=process.env.KAZOO_ACCOUNT_NAME ;
    const responseData: any = {
            success: false
        };

    const putData = {
        data: {
            credentials: creds,
            account_name
        },
        verb: "PUT"
    };
    const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
                body: JSON.stringify(putData)
    }, async (err: Error, response: Request.RequestResponse, body: any) => {
        if (err) {
            console.error(err);
        }
        if (response && response.statusCode === 201) {
        // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
            
           
            body = JSON.parse(body);
          //  console.log(body);
            console.log(body.auth_token);
            var savepasswordresult;//= await savenewpassword(req,body.auth_token,accountId,userid,payload)
            
            resolve(body.auth_token);
            
            } else {
            console.log("loggedin fail");
            resolve(responseData);
        }
    });
    });

    const result = await resetPasswordPromise;
    return result;

}

const loginsavenewpassword=  async(req,accountId,userid,password)=>
{   
   
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
       const  creds=process.env.KAZOO_CREDENTIAL_HASH;
        const account_name=process.env.KAZOO_ACCOUNT_NAME ;


        const responseData: any = {
            success: false
        };

        const putData = {
            data: {
                credentials: creds,
                account_name
            },
            verb: "PUT"
        };
        const kRequest = Request.put(`${process.env.KAZOO_SERVER}/v2/user_auth`, {
                 body: JSON.stringify(putData)
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            if (response && response.statusCode === 201) {
            // const cipher = crypto.createCipheriv('aes-128-cbc', new Buffer('vectorvector1234'), null);
                console.log("loggedin");
                body = JSON.parse(body);
                
                const payload = {
                    data: {
                    //  username: this.$store.state.changepwd.data.username,
                      password:password,
                    }
                  }
                var savepasswordresult= await savenewpassword(req,body.auth_token,accountId,userid,payload)
                resolve(savepasswordresult);
               
             } else {
                console.log("loggedin fail");
                resolve(responseData);
         }
        });
        });

    const result = await resetPasswordPromise;
    return result;

}
const creteKazooStorage=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   const storage_payload= {"data":{}};
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage?validate_settings=false`,
        body:JSON.stringify( storage_payload)
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}

const setKazooAccountEmailNotification=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   const payload= {
    "data": {
      "id":"voicemail_to_email",
      "to": {
        "type": "original"
      },
      
      "from": "no_reply@kazoo1.hsnotify.com",
      "subject": "voicemail from {{account.name}} - {{voicemail.vmbox_name}} ",
      "enabled": true,
      "template_charset": "utf-8"
    }};
    const promise_email_notification = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .post({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/notifications/voicemail_to_email`,
        body:JSON.stringify( payload)
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody promise_email_notification error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody promise_email_notification  \n", body);
           resolve( body);
       });


                
    });

    const result = await promise_email_notification;
    return result;

}
const deletekazoostorage= async(req,accountId)=>
{
    const apiKey = await loginwithcred();
   
    const storagePromise = new Promise<any>((resolve, reject) => {
        const kRequest = getKazooRequest(req, apiKey)
        .del(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {
 
            if (err)
            {
                console.log("\n\n\delete storage error \n", err);
                resolve(err);
                return;
            }
            console.log("\n\n\Deleted storage \n", body);
            resolve( body);
        });
 
 
                 
     });
    
}
const creteKazooStorageAttachments=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
    const property = await getpropertyInfo(accountId);
    const uid= uuid().replace(/\-/g, "");
    
    console.log(accountId);
    const storage_payload:any= {
    "data": { 
            "attachments": {
             
            },
            
        "plan": {
            "modb": {
                "types": {
                    "mailbox_message": {
                        "attachments": {
                            "handler": `${uid}`,
                            "settings":{
                                "field_list":[
                                    {"arg":"account_id"}
                                    ,{"arg":"id"}
                                    ,{"arg":"attachment"}
                                ]
                               
                            }
                        }
                    }
                }
            }
        }
        }
    };
    storage_payload.data.attachments[uid]= {
        "handler": "s3",
        "name":"kazoos3",
        "settings": {
            "bucket":"hsnotify",
    "key":"AKIAJ3MS2IX7TBGC4M4Q",
    "secret":"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"
        }
    }
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`,
        body: storage_payload,
        json :true
       
    },
     (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}
const getKazooStorageInfo=  async(req,accountId)=>
{   
    const apiKey = await loginwithcred();
   
    const storagePromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, apiKey)
       .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/storage`, (err, response, body) => {

           if (err)
           {
               console.log("\n\n\nbody storage error \n", err);
               resolve(err);
               return;
           }
           console.log("\n\n\nbody storage account \n", body);
           resolve( body);
       });


                
    });

    const result = await storagePromise;
    return result;

}
const savenewpassword=  async(req,auth_token,accountId,userid,payload)=>
{   
   
    const resetPasswordPromise = new Promise<any>((resolve, reject) => {
       const kRequest = getKazooRequest(req, auth_token)
                .patch({
                    url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${userid}`,
                    body: payload,
                    json: true
                },
                  (e, r, b) => {
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

    const result = await resetPasswordPromise;
    return result;

}


const checkuserincompanyaccount=async  (req,_accountid, username,apiKey)=>
{
    var userdocs:any = await getAccountuser(req, _accountid,apiKey);
    const users= userdocs.data;
    const userfound= users.find(u=>u.username ===username);
    return userfound;
}
const checkuserinaccounts= async (req,_accountid, username,apiKey) => {
    console.log("checkuserinaccounts user");

    const companyuser= await checkuserincompanyaccount(req,_accountid, username,apiKey);
    if (companyuser) return companyuser;

    //check user in child account
  
    var accountchildren:any= await getAccountChildren(req,_accountid, apiKey);
    var user;
    if (accountchildren.data) 
    {
        const children = accountchildren.data;
        children.every(async (child) => {
            console.log ("accountid");
            console.log (child.id);
            console.log (child.name);

            var userdocs:any = await getAccountuser(req, child.id,apiKey)
            const users= userdocs.data;
            const userfound= users.find(u=>u.username ===username);
            if (userfound) 
            {
                user=child;
                user.account_id= child.id;
                user.account_name= child.name;
            }
            return true;
        });
    }
    return user;

}
const  getAccountChildren= async (req,_accountid,apiKey)=>{
    console.log("getAccountChildren");
    const accountChildrenPromise = new Promise((resolve, reject) => {
          getKazooRequest(req,apiKey)
              .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/children`, (err, response, body) => {
  
                  if (err)
                  {
                      console.log("\n\n\nbody acconut \n", err);
                      resolve(err);
                      return;
                  }
                  console.log("\n\n\nbody acconut \n", body);
                  resolve(JSON.parse( body));
              });
       
      
  });
  
      const result= await accountChildrenPromise;
      return result;
  }


  const  getAccountuser= async (req,_accountid,apiKey)=>{
    console.log("getAccountuser");
    const accountusersPromise = new Promise((resolve, reject) => {
          getKazooRequest(req,apiKey)
              .get(`${process.env.KAZOO_SERVER}/v2/accounts/${_accountid}/users`, (err, response, body) => {
  
                  if (err)
                  {
                      console.log("\n\n\nbody users \n", err);
                      resolve(err);
                      return;
                  }
                 // console.log("\n\n\nbody users \n", body);
                  resolve(JSON.parse( body));
              });
       
      
  });
  
      const result= await accountusersPromise;
      return result;
  }

  const createUserInKazoo= async (req,accountid,payload,apiKey)=> {
      console.log("createUserInKazoo");
        payload.data.priv_level= "user";
      console.log(payload);
    const accountusersPromise = new Promise((resolve, reject) => {
    const kRequest = getKazooRequest(req,apiKey)
    .put({
        url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountid}/users`,
        body: payload,
        json: true
    },
    (e, r, b) => {
        if (e) {
            console.log("\nkazoo error");
  
            console.log(JSON.stringify(e));
            resolve(JSON.stringify(e));
            return;
        }
        else {  
            let _usr=(r as any).body.data;
            if (_usr.email)
            {
                console.log("\nuser creation started \n", _usr );
               _usr.kazooid= _usr.id;
               
                resolve(_usr);
            }
            else
            {
                resolve(_usr);
            }
         }
    })
});

var result = await accountusersPromise;
return result;
  }

  //free switch 

  const free_switch_login=  async()=>
{   
   console.log("free_switch_login");
    const freeswitchlogin = new Promise<any>((resolve, reject) => {
    const responseData: any = {
            success: false
        };
    const loginData = 
            {
				"username":process.env.FREE_SWITCH_SERVER_USER_NAME,
				"password":process.env.FREE_SWITCH_SERVER_USER_PASSWORD
			}
     const kRequest = Request.post(`${process.env.FREE_SWITCH_SERVER}/login`, {
                 body: loginData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.error(err);
            }
            console.log("response.statusCode " , response.statusCode);
            if (response && response.statusCode === 200) {
           
                console.log("loggedin " , body.data.token);
                resolve(body);
               
             } else {
                console.log("loggedin fail  " , response.body);
                resolve(responseData);
         }
        });
        });

    const result = await freeswitchlogin;
    return result;

}

const free_switch_create_device=  async(apikey,didnumber,password,realm,callflowdeviceusernamesuffix)=>
{   
   console.log("freeswitchcreatedevice ,");

    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      
       
        const responseData: any = {
            success: false
        };
        var username= didnumber + callflowdeviceusernamesuffix;
        const postData = 
            {
				
                "gateway_name":username,
                "username":username,
                "password":password,
                "realm":realm,
                "from-domain": realm,
                "register":"1",
                "register-proxy":process.env.PROXY,
                "proxy": process.env.PROXY,
                "ping":"25",
                "is_messagebox":"1",
                "is_outbound":"1"
            }
            

            console.log(postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/device/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitchcreatedevice fail  " );
                console.error(err);
            }
           
            
            if (response && response.statusCode === 200) {
           
                console.log("freeswitchcreatedevice sucess");
               
                
           
                resolve(body);
               
             } else {
                console.log("freeswitchcreatedevice fail  " , response.body);
                resolve(body);
         }
        });
        });

    const result = await freeswitchcreatedevice;
    return result;

}


const free_switch_create_property_device=  async(apikey, payload)=>
{   
   console.log("free_switch_create_property_device");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      

        const responseData: any = {
            success: false
        };

        const postData = 
        {
            "propertyId":payload.propertyId,
            "gateway_name":payload.username,
            "username":payload.username,
            "password":payload.password,
           "realm":payload.realm,
            "from-domain":payload.realm,
            "register":"1",
            "register-proxy":process.env.PROXY,
            "proxy": process.env.PROXY,
             "ping":"25"
        }
        console.log("postData for property device" , postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/property/device/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch property device fail  " );
                console.error(err);
            }
            if (response && response.statusCode === 200) {
           
                console.log("freeswitch property device sucess");
                resolve(response);
               
             } else {
                console.log("freeswitch property device fail  " , response.body);
                resolve(responseData);
         }
        });
        });

    const result = await freeswitchcreatedevice;
    return result;

}

const free_switch_create_voicemessagebox=  async(apikey, payload)=>
{   
   console.log("free_switch_create_voicemessagebox");
    const freeswitchcreatedevice = new Promise<any>((resolve, reject) => {
      

        const responseData: any = {
            success: false
        };

        const postData = 
        {
            "propertyId":payload.propertyId,
            "number":payload.number ,
            "DID":payload.didnumber,
            "password":"1234",
            "status":"1"
        }
console.log("postData postData" , postData);
     //  const url =`${process.env.FREE_SWITCH_SERVER}/login`;
     //  console.log("url ", url);
        const kRequest = getFreeSwitchRequest(apikey).post(`${process.env.FREE_SWITCH_SERVER}/v1/voicemessagebox/create`, {
                 body: postData,
                 json:true,
        }, async (err: Error, response: Request.RequestResponse, body: any) => {
            if (err) {
                console.log("freeswitch voicemessagebox fail  " );
                console.error(err);
            }
            if (response && response.statusCode === 200) {
           
                console.log("freeswitch voicemessagebox sucess");
                resolve(response);
               
             } else {
                console.log("freeswitch voicemessagebox fail  " , response.body);
                resolve(responseData);
         }
        });
        });

    const result = await freeswitchcreatedevice;
    return result;

}

//elastic search
const getelasticsearchreportdata= async(guid)=>
{

    let body = {
        size: 20,
        from: 0,
        query: {
        "match":{
            "guid":guid//"1b305a84-693b-42c2-bf64-798dc8db8ecb411132"
        }
        }
    };
    var elasticsearchreportdocs= await search('reportdocs', body);
    console.log(elasticsearchreportdocs);
    var reportdoc
    if(elasticsearchreportdocs.lenghth>0)
    {
        reportdoc= elasticsearchreportdocs[0];
    }
    return reportdoc;
}
const getNotifyCallLog= async (accountDb,callinfo)=>
{
    var reportdata= await getreportdatadocument(accountDb,callinfo);
    const contactsSelector = {
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
        },
    }
    console.log("getNotifyCallLog");
    console.log(JSON.stringify(contactsSelector));
                 
        var reportdata=await getalldocumentsbyproperty(accountDb,contactsSelector); 
    return reportdata;
}
const insertreportdatatoelastic= async (accountDb,callinfo)=>
{
    var reportdata= await getreportdatadocument(accountDb,callinfo);
    const promise1 = new Promise(async (resolve, reject) => 
    {
        delete reportdata._id;
        delete reportdata._rev;
        var url=  `${process.env.ELASTIC_SEARCH_SERVER}/reportdocs/_doc`;
        const options = {
            method: 'POST',
            url: url,
            headers:
            {
            // 'cache-control': 'no-cache',
                'Content-Type': 'application/json',
                },
            body:reportdata
            ,
            json: true };
            Request(options, async  (error, response, body)=> {
                if (error) {  
                    console.log(' elastic insert error ');
                    console.log(error +'//'+ 'error');
                    resolve( error);
                }
                else
                {
                    console.log('elastic insert sucess')
                    console.log(JSON.stringify(body) +' // '+ 'succuss');
                    var reportdata2= await getreportdatadocument(accountDb,callinfo);
                    //insert elastic id to couchdb so we can use it for updation
                    reportdata2.elasticid=body._id;
                    console.log('elastic sucess insertreportdata')
                    await insertreportdata(reportdata2,accountDb);
                    resolve( body);
                }
            });
    })
    return await promise1;
}

const getelasticsearchdata= async (payload)=>
{
    let page = isNaN(payload.page) ? 1 : payload.page ;
    const size = 1000 ; 
    let from = ((parseInt(page)-1)* size) + 1; 
    const query_string= `${payload.querystring} `
    const query =  {
        "bool": {
          "must": [
           {
              "query_string": {
                "fields": ["resolutionon","companyname","industry","propertytype","propertyname","propertyphone","type","didnumber","respondent","from","fromd","resolutiontype"],       
                "query": query_string,
                "lenient": true
              }
           },
            {
              "range": {
                "incidentdate": {
                  "gte": payload.starttime,
                  "lte" : payload.endtime,
                    "boost" : 2.0
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
                   "bool":
                   {
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
   // const searchdata= req.params.searchdata
    const options = {
        method: 'POST',
        url: `${process.env.ELASTIC_SEARCH_SERVER}/reportdocs/_search`,
        headers:
        { 
            'Content-Type': 'application/json',
        },
        body:
        {      
            "sort":[
                { "incidentdate" : {"order" : "desc"}}],
            "query":query
        },
        from: from,
        size: size,
        json: true
    };
    const resultpromise=  new Promise (async(resolve, reject)=>{
        Request(options, function (error, response, body) {
            if (error) {  
                console.log(error +'//'+ 'error');
                resolve(error);
            }
            else
            {
               
                //res.send(body);
                let result = body.hits && body.hits.hits? body.hits.hits.map(a => a._source):[];
               // console.log(JSON.stringify(result) +' // '+ 'succuss');
                resolve(result)
            }
        });
    })
    const result= await resultpromise;
    return result;
    
}
const updatereportdatatoelastic= async (accountDb,callinfo,fileds)=>
{
    
    var reportdata= await getreportdatadocument(accountDb,callinfo);
    
   const elasticid= reportdata.elasticid;
   console.log("elasticid");
   console.log(elasticid);
    var url=  `${process.env.ELASTIC_SEARCH_SERVER}/reportdocs/_update/${elasticid}`;
    const options = {
        method: 'POST',
        url: url,
        headers:
        { 
           // 'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            },
            body:{
            doc:fileds
            }
         ,
        json: true };
        Request(options, async  (error, response, body)=> {
            if (error) {  
                console.log(' elastic update error');
                console.log(error +'//'+ 'error');
               return error;
            }
            else
            {
                console.log('elastic update sucess')
                console.log(JSON.stringify(body) +' // '+ 'succuss');
                 var reportdata2= await getreportdatadocument(accountDb,callinfo);
                 return body;
            }
        });
}
//function end

app.get('/properties/:compnyid', validateJWT, (req, res) => {
   
    var id =req.params.compnyid;
    const accountId = (req['decoded'] as DecodedJWT).account_id;
    //getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/descendants?paginate=false`, (err, response, body) => {

        getKazooRequest(req).get(`${process.env.KAZOO_SERVER}/v2/accounts/${id}/descendants?paginate=false`, (e, r, b1) => {
            if(e) {
                res.send( e);
            }
            
           
            const b = JSON.parse(r.body);
            const data = b.data;
           
            res.send(data);
        });
    
});

app.get('/addedproperties/:companyid', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    console.log('mster users  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid=req.params.companyid;
    const contactsSelector = {
    'selector': {
            '$and': [
                {
                    'pvt_type': 'property',
                }
            ]
        },
        limit:30000 
    }
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /propery`);
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
})



app.post('/addcompany', validateJWT, async (req, res) => {
    const payload =  JSON.parse(req.body.payload);
  
   const _accountid=parseAccountToDatabaseName(req['decoded'].account_id);
  
   const result =await insertcompany(payload,req)   ;
   console.log('result'+result);
   res.send("sucess");
         
    
});


app.put('/companies/:id', validateJWT, async (req, res) => {
    var payload =  JSON.parse(req.body.payload);
    const _accountid=parseAccountToDatabaseName(req['decoded'].account_id);
    const accountDb = nano.use(_accountid);
   const result =updatecompany(payload,_accountid)   ;
   console.log('result'+result);
    res.send("sucess");
 });

app.get('/companies/:id', validateJWT, async(req, res) => {
    const companyid =  req.params.id;
    console.log('comanyid '+companyid);
    console.log("get company info ")
    
    var company:any = await getcompanyInfo(companyid);
   // console.log (company.error);
    if (!company || company.error )
    {
        //console.log (company.error);
        const account:any = await getkazooaccountinfo(req,companyid);
        console.log(account.data.timezone)
        company = {industrytype:'',
                     company_phone:'9694787894',
                     timezone:account.data.timezone
                 }
    }
    console.log(JSON.stringify(company));
    res.send(company);
          
    
});


app.get('/getnotifycompanies/:accountid', validateJWT, (req, res) => {
    const accountid=req.params.accountid;
    const _accountdbname=parseAccountToDatabaseName(accountid);
   // const _accountdbname=parseAccountToDatabaseName(_accountid);
      
    
   console.log("\n  accountname ",_accountdbname );
    const accountDb = nano.use(_accountdbname);
    const contactsSelector = {
       'selector': {
               '$and': [
                   {
                       "pvt_type": "company",
                       "enabled": true
                   }
               ]
           },
           limit:30000 
       }
      
       accountDb.find(contactsSelector, function (err, result) {
           if (err) {
               try {
                   res.statusCode = result.statusCode;
                   res.send(err);
               } catch (e) {
                   console.error(`Couldn't access the db `);
                   res.send(err);
               }
           }
           else {
               res.statusCode = 200;
              result.docs.sort((a, b) => {
                        
                return a.companyname.toLowerCase() > b.companyname.toLowerCase()  ? 1 : -1;
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
})
app.get('/getnotifyproperties/:id', validateJWT, (req, res) => {
   const kRequest = getKazooRequest(req)
       .get(`${process.env.KAZOO_SERVER}/v2/accounts/${req.params.id}/children`, (err, response, body) => {
           console.log('\n\n\n body ', body);
           var companydata=JSON.parse( body).data;
       
          res.send(companydata);
       });
})


app.get('/industries', (req, res) => {
   // const accountId = (req['decoded'] as DecodedJWT).account_id;
    const industries = {data:[
        {
            type:'Multifamily',
            subtypes:[
                'Affordable',
                'Conventional',
                'Senior'
            ]
        },
        {
            type:'Service Contractor',
            subtypes:[
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




app.get('/forgotpassword/company/:name/user/:email', async (req, res) => {
  //  console.log("here is the user object 11111111111");

     var dbnames:any=await getaccountdbnames();
     
    var accountname= req.params.name;
    var username= req.params.email;
    companyIdSelector.selector.$or[0].companyname= accountname;
    companyIdSelector.selector.$or[1].kazoopropertyname= accountname;
    userSelector.selector.username=username;
     var result:any= {};
     var company:any;
     var account_db_pattern = new RegExp(getDabaseNameRegx());
     var user;
     for (var i=0; i<dbnames.length;i++)
     {
         var dbname= dbnames[i];
         
            if (account_db_pattern.test(dbname) === false) continue
            const accountDb = nano.use(dbname);
           
             company=await getdocumentbyproperty(accountDb,companyIdSelector); 
     
            if (company && company.companyid)
            {
                const companydbname= parseAccountToDatabaseName(company.companyid);
                const companydb=nano.use(companydbname);
                 user =await getdocumentbyproperty(companydb,userSelector);
                break;
            }
     }
     if (company && company.companyid &&user && user.id )
     {
         const payload= {
             data:
             {
                accountname:accountname,
                accountid:company.companyid,
                email:username,
                userid:user.id,
                first_name : user.first_name
            }
         }
     
            resetpasswordemail(payload);
            res.send("Email sent");
     }
     else
     {
        res.send("Error");
     }
      
});

//create users update  colorindex  settings
app.put('/company/:comapnyid/property/:propertyid/user/:userid/:colorindex', validateJWT, async (req, res) => {
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const propertyid = req.params.propertyid;
    const colorindex = req.params.colorindex;
    const contactsSelector = {
            'selector': {
                "id":userid
                },
                limit:30000 
            }

     var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
            if (_userobj && _userobj._id)
            {
                if (_userobj.msteruser)
                    _userobj.colorindex=colorindex;
                else if (_userobj.propertylist)
                {
                    var userproperty= _userobj.propertylist.find (up=>up.id===propertyid );
                    if (userproperty)
                        userproperty.colorindex=parseInt(colorindex);

                }
                var notifyupdateresult = await updatenotifyusercolorindex(accountDb,_userobj);
                res.send(_userobj);
            }
            else
            {
                res.send("error");
            }
 });




//create users savepassword
app.get('/savepassword/company/:companyid/:accountname/user/:userid/password/:password', async (req, res) => {
   
    const accountId= req.params.companyid;
    const userid= req.params.userid;
    const password= req.params.password;
    await loginsavenewpassword(req,accountId,userid,password);
            
    res.send("sucess");
           
       
});

//create users changePassword
app.put('/changePassword', validateJWT, async (req, res) => {
    //console.log("here is the user object 11111111111");
    var payload = req.body.payload;
    const _id=req['decoded'].user_id;
    const accountId = req['decoded'].account_id;
    const accountname= payload.data.accountname;
    const creds= payload.creds;
    delete payload.data.accountname;
    delete payload.creds;
    payload.data.passwordreset= true;
    console.log ("relogin payload ", payload);
    // console.log("id " + _id);
     const kRequest = getKazooRequest(req)
     .patch({
         url: `${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${_id}`,
         body: payload,
         json: true
     },
     async (e, r, b) => {
         if (e) {
            debugMessage(e, "error");         
   
             //console.log(e);
             res.send(JSON.stringify(e));
             return;
         }
         else {
            const reloginresult= await relogin(req,accountname, creds );
             res.send(reloginresult);
        }
     });
       
});

// create users  change role
app.post('/changeRole',validateJWT,async (req, res) => {

        const payload = JSON.parse(req.body.payload);
        const companyid=payload.companyid;
        const accountDbName= parseAccountToDatabaseName(companyid);
        const accountDb = nano.use(accountDbName);
        const contactsSelector = {
            'selector': {
                "id":payload.userid
                },
                limit:30000 
            }
        var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
        var insertingpropertylist= _userobj.propertylist;
        const user_type= payload.user_type.toLowerCase();
        if (user_type!="master" )
        {
            _userobj.user_type= payload.user_type;
            _userobj.msteruser=false;
            var propertysetting= insertingpropertylist.find(ip => ip.id===payload.propertyid);
            propertysetting.user_type=payload.user_type;
        }
        else
        {
            _userobj.user_type= payload.user_type;
            _userobj.msteruser=true;
        }

        const result =await insertUser(_userobj,accountDbName)   ;
        res.send (result);

  
});
// create users delete
app.delete('/companies/:companyid/property/:propertyid/users/:userid/:removeall', validateJWT,async(req, res) => {
   
    const companyid=req.params.companyid;
    const userid= req.params.userid;
    const removeall= req.params.removeall;
    const propertyid=req.params.propertyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        'selector': {
            "id":userid
            },
            limit:30000 
        }
    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
    var insertingpropertylist= _userobj.propertylist;
    const user_type= _userobj.user_type.toLowerCase();
    if (user_type!="master" )
    {
     
        if (removeall!="true")
        {
            var propertysetting= insertingpropertylist.find(ip => ip.id===propertyid);
            propertysetting.enabled=false;
        }
        else
        {
            insertingpropertylist.forEach(ip => {
                ip.enabled=false;
            });
        }
        insertingpropertylist=insertingpropertylist.filter(ip=> ip.enabled);
        _userobj.notify_enabled=insertingpropertylist.length>0;
    }
    else
    {
        _userobj.notify_enabled= false;
        
    }

    const result =insertUser(_userobj,accountDbName)   ;
    res.send (result);
                
        
});

//create user update 
app.put('/companies/:companyid/masterusers/:userid', validateJWT, (req, res) => {
   
    const companyid=req.params.companyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const payload:any =  req.body.payload;
    accountDb.get(userid, (err, _userobj) => {
        if(err) {
           console.log("\n deleting user error:" , err);
            res.send(err);
        }
        else {
            _userobj.email=payload.email;
            _userobj.first_name=payload.first_name;
            _userobj.last_name=payload.last_name;
            _userobj.title=payload.title;
          
            accountDb.insert(_userobj, function (err, result) {
                if (err) {
                    try {
                        res.statusCode = result.statusCode;
                        res.send(err);
                    } catch (e) {
                        console.error(`Couldn't access the db in /contacts`);
                        res.send(err);
                    }
                } else {
                    const payload1:any = {
                        data: {
                            email:payload.email,
                            first_name:payload.first_name,
                            _last_name:payload.last_name,
                            title:payload.title,
                    }
                };
               
                    const kRequest = getKazooRequest(req)
                    .patch({
                        url: `${process.env.KAZOO_SERVER}/v2/accounts/${companyid}/users/${_userobj.id}`,
                        body: payload1,
                        json: true
                    },
                    (e, r, b) => {
                        if (e) {
                            console.log(e);
                            res.send(JSON.stringify(e));
                            return;
                        }
                        else {
                            console.log("\n kazoo updated successfull");
                            res.send(payload);
                           
                            }
                        }
                    );
                   
                }
            });
        }
    });
                
        
});
//create users


//create users create property users
app.post('/companies/:companyid/properties/:propertyid/users', validateJWT, async (req, res) => {
    
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //
  
    let payload =  JSON.parse(req.body.payload);
    const contactsSelector = {
        'selector': {
            "username":payload.data.email
            },
            limit:30000 
        }
      

    var primarykazooaccount:any =payload.data.primarykazooaccount
    const kazooacccountid= primarykazooaccount ? primarykazooaccount.id:companyid;
    const accountinfo:any=  await getkazooaccountinfo(req,kazooacccountid);
    const kazooacccountname= accountinfo.data.name;
    primarykazooaccount={
            id:kazooacccountid,
            name:kazooacccountname
        }
    payload.data.primarykazooaccount=primarykazooaccount;
    //sendemail(payload);
    const accountDbname = parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbname);
    var user=await getdocumentbyproperty(accountDb,contactsSelector);
    if (!user)
    {
        payload.data.emailsettings= {settings:[]};
        payload.data.emailsettings.settings.push({email:payload.data.email});
        var apiKey=await loginwithcred();
        user = await checkuserinaccounts(req,companyid, payload.data.email,apiKey);
        if (!user)
        {
            user=  await createUserInKazoo(req,kazooacccountid,payload,apiKey);
            if (user.email)
            {
                payload.data.kazooid= user.kazooid;
                payload.data.id= user.kazooid;
            }
            else
            {
                payload.data.error= "Error occured while creating kazoo user"
            }
        }
        else
        {
            payload.data.kazooid= user.id;     
        }
        if (payload.data.kazooid)
        {
             console.log("\nisnserting master users  ",accountDbname);


             var insertingpropertylist= payload.data.propertylist;
             const user_type= payload.data.user_type.toLowerCase();
             if (user_type!="master" )
             {
                insertingpropertylist.forEach(ip => {
                    ip.user_type=payload.data.user_type;
                });
            }
             const result =insertUser(payload.data,accountDbname)   ;
             sendemail(payload);
        }
    }
    else
    {
        var propertylist= user.propertylist;
        var insertingpropertylist= payload.data.propertylist;
        var allpropertiesavailable=true;
         const user_type= payload.data.user_type.toLowerCase();
        if (user_type!="master" )
        {
            insertingpropertylist.forEach(ip => {
                const property= propertylist.find(p=> p.id ===ip.id);
                if (!property)
                {
                    allpropertiesavailable=false;
                    user.propertylist.push({
                        "id": ip.id,
                        "enabled": true,
                        "name": ip.name,
                        "user_type":payload.data.user_type
                    });
        
                }
            
            });
        }
       
        if (allpropertiesavailable)
            payload.data.error="user already exist";
        else
        {
            const user_type= payload.data.user_type.toLowerCase();
           
            if (user_type!="master" )
            {
                user.user_type=payload.data.user_type;
            }
            const result =await insertUser(user,accountDbname) ;
            payload.data=user;
            
        }
    }
   res.send(payload.data);
   
})
//create users update settings
app.put('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
    const payload =  req.body.payload;
    console.log("payload");
    console.log(payload);
    const contactsSelector = {
        'selector': {
            "id":userid
            },
            limit:30000 
        }
    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
    if (_userobj && _userobj._id)
    {
        _userobj.scheduleemailreport= payload;
        updateScheduleReport(accountDb,_userobj);
        //console.log("userfound", _userobj);
    }
    res.send("sucess");

});



app.put('/company/:comapnyid/user/:userid/scheduleactivityreport', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    console.log(accountDbName);
    const accountDb = nano.use(accountDbName);
   
    const userid= req.params.userid;
    const payload =  req.body.payload;
    payload.userid=userid;
    payload.enabled=true;
    const result=await insertcallactivityreportinfo(payload,accountDb);
    res.send("sucess");

});

app.put('/company/:comapnyid/user/:userid/scheduleactivityreport/:id', validateJWT, async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const id=req.params.id;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const contactsSelector = {
        'selector': {
            "_id":id
            },
            limit:30000 
        }
    var _scheduledoc:any=await getdocumentbyproperty(accountDb,contactsSelector); 
    _scheduledoc.enabled=false;

   
    const result=await insertcallactivityreportinfo(_scheduledoc,accountDb);
    res.send("sucess");

});
app.get('/company/:comapnyid/user/:userid/scheduleactivityreport',validateJWT, async (req, res) => {
    console.log("new");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
  
        const contactsSelector = {
            "selector": {
                "pvt_type": "callactivityreport",
                "userid": userid,
                "enabled": true
            },
            "limit": 30000
         };
    
      
        var result =await getalldocumentsbyproperty(accountDb,contactsSelector);
    //    console.log(result);
    res.send(result);

});

app.get('/company/:comapnyid/user/:userid/scheduleemailreport', validateJWT,async (req, res) => {
    console.log("afas");
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
   
    
    const contactsSelector = {
        'selector': {
            "id":userid
            },
            limit:30000 
        }
    var _userobj:any=await getdocumentbyproperty(accountDb,contactsSelector); 

    if (!_userobj )
    {
        _userobj = {"scheduleemailreport":{}}
    }
    res.send(_userobj.scheduleemailreport);

});
app.put('/updatenotifyusersettings/:id/:userid', validateJWT, async (req, res) => {
      
   
    const id=req.params.id;
    var property=await findPropertydocument(id);

    var companyid=property&& property.companyid ? property.companyid:id;
    const accountDbName= parseAccountToDatabaseName(companyid);

    const accountDb = nano.use(accountDbName);
    const uid= req.params.userid;
	const payload = JSON.parse( req.body.payload);
    
   console.log ("\n  userid :- ", uid);
    var pinuser=await    checkpin(payload.pin,companyid);
    
    if (pinuser && pinuser.id!=uid )
    {
            console.log("duplicate pin");
            var error = {
                    error:"duplicate pin"
            }
            res.send(error);
    }
    else
    {
        const contactsSelector = {
            'selector': {
                "$or":[{
                "_id":uid},
                {
                 "id":uid
                },
                {
                    "kazooid":uid
                }
            ]

                },
                limit:30000 
            }

            var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 

            if (_userobj && _userobj._id)
            {
                var kazooupdateresult= await updatekazoousersettings(payload,req,id,uid);

                console.log("start notify user setting",kazooupdateresult);
                var notifyupdateresult = await updatenotifyusersettings(accountDb,_userobj,payload,true,property,req);
                
                serverlog  ("info",`${req['decoded'].user_id} created  updated settings for (${_userobj.email})`,"create schedule");

                res.send(_userobj);
            }
        }
      
   
 });


 //create users update  email  settings
app.put('/updatenotifyuseremailsettings/:comapnyid/:userid', validateJWT, async (req, res) => {
      
   
    const companyid=req.params.comapnyid;
    const accountDbName= parseAccountToDatabaseName(companyid);
    const accountDb = nano.use(accountDbName);
    const userid= req.params.userid;
	const payload = JSON.parse( req.body.payload);
    var emaildatalist= payload.emaildatalist;
    for (var i=0;i<emaildatalist.length;i++) 
    {
        var emaildata=emaildatalist[i];
       // console.log("emaillist");
       // console.log(JSON.stringify());
        var callflowoptiontype = emaildata.callflowdata.callflowoptiontype;
        if (  callflowoptiontype && callflowoptiontype.toLowerCase() ==="fwd message" )
        {
            //update voicemail box 
               
                 await updatefwdmessagevoicemaileemailsettings(req,emaildata); 
        }
        else if ((  callflowoptiontype && callflowoptiontype.toLowerCase() ==="escalation" ))
        {
                 await insertescalationemaillist(emaildata,emaildata.callflowdata.callflowoption,userid)    
        }
   }
    
    //console.log(payload.callflowdata);
  
        const contactsSelector = {
            'selector': {
                "id":userid
                },
                limit:30000 
            }

            var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            
            if (_userobj && _userobj._id)
            {
        //        var kazooupdateresult= await updatekazoouseremailsettings(payload,req,companyid,userid);
              
                var notifyupdateresult = await updatenotifyuseremailsettings(accountDb,_userobj,payload);
                res.send(_userobj);
            }
        
      
   
 });
//create user get
app.get('/presenceid/:username',validateJWT, async (req, res) => {
    
    const accountId = req['decoded'].account_id;
    const userid = req['decoded'].user_id;
    const username= req.params.username
    serverlog  ("info",`${username} login in to ${accountId}`,"login");
    getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${accountId}/users/${userid}`
            , async(err, response, body) => {
                if(err) {
                    res.send(err);
                }
                body = JSON.parse(body);
                var userdata=body.data;
              // console.log("user data ", userdata);
                if (userdata.cid)
                {
                    var companyid= userdata.cid;
                    const accountdbname= parseAccountToDatabaseName(companyid);
                    var accountDb= nano.use(accountdbname);
                    const contactsSelector = {
                        'selector': {
                            "email":req.params.username
                        } ,
                        limit:30000 
                    };
                    var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
                    if (_userobj)
                    {
                        _userobj.passwordreset = userdata.passwordreset? userdata.passwordreset :false;
                        res.send(_userobj);
                    }
                }
                else
                {
                    userdata.flags= ['c'];
                    res.send(userdata);
                }
                
            });
      
});

//create users get settings
app.get('/getnotifyusersettings/:id/:userid', validateJWT,async (req, res) => {
   const uid= req.params.userid;
    const contactsSelector = {
        'selector': {"$or":[{
                "kazooid":uid},
                {"id":uid}
        ]
             },
            limit:30000 
        };

        var propertyid=req.params.id;
        var property=await findPropertydocument(propertyid);
        var comapnyid= property && property.companyid? property.companyid:propertyid;
        var accountDb = nano.use(parseAccountToDatabaseName(comapnyid));
   
        var _userobj=await getdocumentbyproperty(accountDb,contactsSelector); 
            var result:{data:{}};
            if (_userobj){
                    var userdata=_userobj;
                //    console.log('\n\n\n body ', JSON.stringify(userdata));
                    result= {data: {
                        fullname:userdata.first_name + '  ' +userdata.last_name,
                        title : userdata.title? userdata.title:'',
                        timezone : userdata.timezone? userdata.timezone:'',
                        phonesettings : userdata.phonesettings? userdata.phonesettings:{settings:[]},
                        smssettings : userdata.smssettings? userdata.smssettings:{settings:[]},
                        emailsettings: userdata.emailsettings? userdata.emailsettings:{settings:[]},
                        pin:userdata.pin?userdata.pin:'',
                        id:userdata.id,
                        livereplysetting: userdata.livereplysetting? userdata.livereplysetting:[],
                        notificationrulessetting:userdata.notificationrulessetting? userdata.notificationrulessetting:[],
                        handoffrulessettings: userdata.handoffrulessettings? userdata.handoffrulessettings:[],
                        smsagreement:userdata.smsagreement,
                        escalationsettings:userdata.escalationsettings,
                        user_imager:userdata.user_imager?userdata.user_imager:'',
                        member_image:userdata.member_image?userdata.member_image:'',
                    
                    }
        }

            }
         // console.log('\n\n\n result ', JSON.stringify (result));
            res.send(result);
     
})


//create user get property users
app.get('/companies/:id/property/:propertyid/users/:page/:limit/:activeuseronly', validateJWT, (req, res) => {
    const companyid= req.params.id;
   const  propertyid= req.params.propertyid;
   let page = isNaN(req.params.page)   ? 1:req.params.page ;
   const limit ='1000';  //isNaN(req.params.limit) ?  1000:req.params.limit;
   let skip = ((parseInt(page)-1)*parseInt(limit)) ;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
  console.log("\n propertyid: ",propertyid);
  const activeuseronly=req.params.activeuseronly
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
    }
    
    if (activeuseronly!="false")
    {
        const activeusercondition:any={
            "notificationrulessetting": {
                "$exists": true
            }
        }
        contactsSelector.selector.$and.push(activeusercondition);
    }
    console.log("property users ", JSON.stringify(contactsSelector));
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /property`);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
         
            res.send(JSON.stringify(result));
        }
    });
})


//create user get non property users
app.get('/companies/:id/properties/:propertyid/users/notadded',validateJWT,(req, res) => {
    const companyid= req.params.id;
   const  propertyid= req.params.propertyid;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
  
    const contactsSelector = {
                
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
         }
         ,
        limit:30000 ,
        
   "fields": [
      "id",
      "first_name",
      "last_name",
      "user_type",
      "notify_enabled"
   ]
    }
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /user`);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
         
            res.send(JSON.stringify(result));
        }
    });
})


//create user get non master users
app.get('/companies/:id/masterusers/notadded',validateJWT,(req, res) => {
    const companyid= req.params.id;
  
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
  
    const contactsSelector = {
                
        "selector": {
            "pvt_type": "user",
            "notify_enabled": false,
          "user_type":"master"
         }
         ,
        limit:30000 ,
        
   "fields": [
    "id",
      "first_name",
      "last_name",
      "user_type",
      "notify_enabled",
      "email",
      "title"
   ]
    }
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /user`);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            console.log("Number of users ", result.docs.length);
         
            res.send(JSON.stringify(result));
        }
    });
})
//create user get masterusers
app.get('/companies/:id/masterusers', validateJWT, (req, res) => {
    const companyid= req.params.id;
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
  console.log("\n accountDb: ",parseAccountToDatabaseName(companyid));
    const contactsSelector = {
    'selector': {'user_type': 'master',
                    "msteruser":true,
                    "notify_enabled":true
                },
        limit:30000   
    }
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /user`);
                res.send(err);
            }
        }
        else {
            res.statusCode = 200;
            res.send(JSON.stringify(result));
        }
    });
})
//notify user managment end 


app.get('/companies/:companyid/properties/added', validateJWT, async (req, res) => {
    
   
    const companyid=req.params.companyid;
    var result= await getproperties(companyid);
   // console.log("\n\n\n properties added\n", result);
    res.statusCode = 200;
    res.send(result);
    
});

app.get('/companies/:companyid/callsummery',validateJWT, async(req, res) => {  
    console.log("callsummery");
    const companyid= req.params.companyid;
    const companydbname= parseAccountToDatabaseName(companyid);
   
  var result = await getcallsummerydata(companydbname);
 
  if (result===undefined)
 {
    var call_summery_result_data=await calculate_company_callsummery(companyid);
    result= {
     data:call_summery_result_data.data
    }
 }

 
    console.log("result11111");
    console.log(JSON.stringify( result));
 
   res.send(result);
});

app.post('/updatecallsummery', async(req, res) => {  
   
    
 //  console.log("updatecallsummery"); 
  const result = await update_call_summery_data();
   res.send(result);
});

app.get('/companies/:companyid/properties_avg',validateJWT,async (req, res) => {
    var emrt_data= await getemrtdata();
    
    const i_companyid=req.params.companyid;
    const comp= await getcompanyInfo(i_companyid);
      var avg_calldetails= {
        property:{
        company:0,
        industry:0,
    }
    };
    if (emrt_data && emrt_data.data){
        var  emergency_companydata=emrt_data.data;

        if (emergency_companydata && Array.isArray( emergency_companydata))
        {
            console.log(emergency_companydata);
            const company_avg_emrt_data= emergency_companydata.find(c=>comp.companyid===c.companyid);
            const company_avg_emrt= company_avg_emrt_data && company_avg_emrt_data.avgemrt ? company_avg_emrt_data.avgemrt:0;
   
            const industry_avg_emrt_list= emergency_companydata.filter(c=>comp.industry===c.industry && c.avgemrt);
  
            const industry_avg_emrt= d3.mean(industry_avg_emrt_list.map (id=> id.avgemrt));
  
            avg_calldetails= {property:{
                company:company_avg_emrt ? company_avg_emrt:0,
                industry:industry_avg_emrt ?industry_avg_emrt:0,
            }
        }
    }
}

    ;
           
      
   
    res.send(avg_calldetails);
});

 app.get('/companies/:id/properties', validateJWT, async (req, res) => {
    const comanyid =  req.params.id;
    var accountchildrenpromiss=  new Promise((resolve, reject) => {
            getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}/children`, async (err, response, body) => {
            if (err)
            {
                console.log(err);
                res.send(err);
                return;
            }
            var children=JSON.parse(body);
            resolve (children);
     });
    });
    var accountpromiss=  new Promise((resolve, reject) => {
        getKazooRequest(req)
                .get(`${process.env.KAZOO_SERVER}/v2/accounts/${comanyid}`, async (err, response, body) => {
                if (err)
                {
                    console.log(err);
                    res.send(err);
                    return;
                }
                var account=JSON.parse(body);
              //  console.log("\n\n\n accounts\n", account);
                
                resolve (account);
                });
        });

      //  console.log("\n\n\n properties\n", body);
       var propertiespromiss = new Promise(async (resolve, reject) => { 
                    var pr= await getproperties(comanyid);
                    resolve(pr);
       });

       Promise.all([accountchildrenpromiss, accountpromiss,propertiespromiss]).then(values => {
           var properties:any= values[2];
           var accounts:any =values[0];
           accounts.data.push((values[1] as any).data);
           console.log("\n\n\n accounts\n", accounts);
           if (properties.docs)
           { 
                if (accounts.data)
                {
                    accounts.data=accounts.data.filter((e) => {
                        const index = properties.docs.findIndex((e1) => {
                            return (e1 as any).propertyid === e.id;
                        });
                    //    console.log("\nindex ");
                    //console.log("\nindex ",  index)
                        return index<0;
                    });
                }
           }
           res.send(accounts);
       });
     
       
    //    body.data=availableproperperiees;
       
    });
  //storage apis

   app.get('/companies/:id/storage', async (req, res) => {
       console.log("storage");
      
       var account_db_pattern = new RegExp(getDabaseNameRegx());
        var dbnames:any= await getaccountdbnames();
         dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
         for (var i=0;i<dbnames.length;i++)
            {
                const dbname= dbnames[i];
                const accountid=parseDatabaseNameToAccount(dbname) ;
            //if (accountid==="7cf889a72eab5c7a71c1a643e661c748")
            {
               // await deletekazoostorage(req,accountid)
               console.log("Dbname" +dbname);
                const result= await  creteKazooStorageAttachments(req,accountid);
            }
         };
       res.sendStatus(200);
    });    
//create property add users

app.post('/companies/:companyid/properties/:propertyid/addusers',validateJWT, async(req, res) => {
    
    console.log ("addusuers")
    console.log(req.body);
    const payload =  req.body.payload;
    console.log(payload.data);
    const propertyid =req.params.propertyid;
    const companyid =req.params.companyid;
    const propertyname =payload.data.propertyname;

    const dbname=parseAccountToDatabaseName(companyid);
    const accountDb= nano.use(dbname)

    const userlist= payload.data.userlist;
    const contactsSelector = {
        "selector": {
           "pvt_type": "user",
           "id": {
              "$in":userlist
           }
        },
        "limit": 30000
     };

  
    var users =await getalldocumentsbyproperty(accountDb,contactsSelector);
     for (var userindex=0;userindex<users.length;userindex++)
    
    {
       const user=users[userindex];
        if (user.user_type.toLowerCase() ==="master" )
            {
                user.msteruser=true;
            }

         var propertylist=   user.propertylist ? user.propertylist:[];
         var property= propertylist.find(p =>p.id===propertyid );
         if (property)
         {
            property.enabled= true;
            if (!property.user_type)
                 property.user_type="basic";
         }
         else
         {
            property=

            {
                "id": propertyid,
                "enabled": true,
                "name": propertyname,
                "user_type":user.user_type
              }

              propertylist.push(property);
             
         }

         user.notify_enabled=true;

         user.propertylist =propertylist;
         const result =await insertUser(user,dbname)   ;


    };
console.log("end");
res.send({
    status:201,
    message:"sucess"
})

}
);
//create property add masterusers
app.post('/companies/:companyid/addmasterusers', validateJWT,async(req, res) => {
    
    const payload = req.body.payload;


    const companyid =req.params.companyid;
   

    const dbname=parseAccountToDatabaseName(companyid);
    const accountDb= nano.use(dbname)

    
    const contactsSelector = {
        "selector": {
           "pvt_type": "user",
           "id": payload.data.id
        },
        "limit": 30000
     };

  
    var user =await getdocumentbyproperty(accountDb,contactsSelector);
     user.first_name= payload.data.first_name;
     user.last_name= payload.data.last_name;
     user.title= payload.data.title;
     user.notify_enabled= true;
     user.msteruser=true;
     user.user_type= "master";
    const result =await insertUser(user,dbname)   ;


   
console.log("end");
res.send({
    status:201,
    result:result
})

}
);
         
//create property

var putDataDevice:any = {
    "data": 
    {
        "caller_id":{"external": {"number":1222}},
        "sip": {
            "password":  "",
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
        "name":"",
        "ignore_completed_elsewhere": false,
        "custom_sip_headers": {
            "in": {
                "X-device-header-in": "565658665"
            },
            "out": {
                "X-device-outbound":"16616161611"
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
}

const getdevices= async (req,propertyid): Promise<any> => 
    {
        const devicepromise = new Promise((resolve, reject) => {
            getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices`, (err, response, body) => {
            //    console.log("device d0d7c961d8c8d23cfe17982ddb9153fd", JSON.parse (body).data);
                resolve(JSON.parse (body).data);
            });
        });
        const devices = await devicepromise;
        return devices;
    }
const getvoicemaibox = async (req,propertyid): Promise<any> => 
{
    const devicepromise = new Promise((resolve, reject) => {
        getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/vmboxes?paginate=false`, (err, response, body) => {
          
            resolve(JSON.parse (body).data);
        });
    });
    const devices = await devicepromise;
    return devices;
}

const createDeviceInKazoo = async (req, propertyid,putDataDevice) :Promise<any> =>{
    const kazoodevicepromise = new Promise((resolve, reject) => {
        console.log("createDeviceInKazoo for ", putDataDevice.data.name);    
        let kRequest = getKazooRequest(req)
        .put({
            url: `${process.env.KAZOO_SERVER}/v2/accounts/${propertyid}/devices/`,
            body: putDataDevice,
            json: true
        },
        (e, r, b) => {
            if (e) {
                console.log("error device for ",putDataDevice);
            resolve (e);
            }
            else {
                console.log("sucess device for ",b.data);
              ;
              
                resolve (b.data.id);
            }
    
        });
    });
   var result= await kazoodevicepromise;
   return result;
}
const setup_free_switch = async function(propertyid,didnumber,propertydeviceusernamesuffix,
    callflowdeviceusernamesuffix , password,realm)
{
    const loginresponse= await free_switch_login();
    var apikey =loginresponse.data.token;
    console.log("setup_free_switch didnumber ", didnumber);
        
        //device creattion
        console.log("free_switch_create_device");
        var freeswitchdevice= await free_switch_create_device(apikey,didnumber, password, realm,callflowdeviceusernamesuffix);


        ///property device creation     
        const freeswitch_property_device_data = 
        {
            "propertyId":propertyid,
            "didnumber":didnumber,
            "username":didnumber + propertydeviceusernamesuffix,
            "password":password,
            "realm":realm
        }

        console.log("free_switch_create_property_device");
        await free_switch_create_property_device(apikey, freeswitch_property_device_data);
          const freeswitch_voice_messagebox_payload = 
        {
            "propertyId":propertyid,
            "number":didnumber+ callflowdeviceusernamesuffix,
            "didnumber":didnumber + propertydeviceusernamesuffix,
            "realm":realm
            
        }
       
        console.log("free_switch_create_voicemessagebox ", freeswitch_voice_messagebox_payload);
        await free_switch_create_voicemessagebox(apikey ,freeswitch_voice_messagebox_payload);
      
      
    
    
}

//const createpropertydevice =  async () 
const createdevice = async (req,payload:any, accountdevice:any, escalationlist,suffix,realm): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
    var devices= [];
            
	escalationlist.forEach(async (clp) => {
				devices.push(
                    new Promise(async(resolve, reject) =>
				{
                   // console.log("clp ", clp );
                   // const didnum=clp.didnumber;
                    //clp.didnumber="4"+didnum;
                   var propertydeviceusernamesuffix=`_${clp.callflowoption}_property` ;
                   var callflowdeviceusernamesuffix = `_${clp.callflowoption}_Callflow`
                 
                   clp.propertydeviceusername= clp.didnumber+propertydeviceusernamesuffix;
                   clp.propertydevicecallerid=payload.phone;

                   clp.propertydevicecallerid=clp.didnumber;
                         
                    
                    clp.didnumber= clp.didnumber.replace("+1","");
                    
                   clp.propertydeviceusername= clp.didnumber+propertydeviceusernamesuffix;
                   clp.callflowdeviceusername = clp.didnumber+callflowdeviceusernamesuffix;
                    
                   var usernamesuffix= suffix==1? callflowdeviceusernamesuffix :propertydeviceusernamesuffix;
                  

				 	putDataDevice.data.name=clp.didnumber+usernamesuffix;//suffix ==="1"? clp.didnumber:payload.phone ; 
					putDataDevice.data.sip.username=clp.didnumber+usernamesuffix; 
                                       
                    putDataDevice.data.sip.password=clp.password; 
                    
                    var device=accountdevice.find(d=> d.name===putDataDevice.data.name);
                    console.log(	putDataDevice.data.name);
                    if (device)
                    {
                        console.log(" device found ",device);
                        clp["deviceid"+ suffix]= device.id;
                        resolve (device.id)
                    }
                    else
                    {
                        //console.log("createDeviceInKazoo 111");

                        
                        putDataDevice.data.caller_id.external.number=suffix==="1"? clp.didnumber:payload.phone;
                        putDataDevice.data.caller_id.external.name= payload.phone;
                        if (suffix==="1")
                             putDataDevice.data.caller_id.external.name+=`_${clp.callflowoption}`;
                        const ext_num= putDataDevice.data.caller_id.external.number;
                        console.log("ext_num ",ext_num);
                        if (ext_num.indexOf("+1")!=0)
                            putDataDevice.data.caller_id.external.number="+1" +ext_num;
                        putDataDevice.data.sip.realm= realm;
                       const deviceid= await createDeviceInKazoo(req,payload.propertyid,putDataDevice);
                       
                       if (deviceid && suffix !=1)
                       {   
                            console.log("calling free switch "); 
                            await setup_free_switch(payload.propertyid,clp.didnumber,propertydeviceusernamesuffix,
                                    callflowdeviceusernamesuffix ,clp.password, realm);
                       }
                      // clp.didnumber=didnum;
                       clp["deviceid"+ suffix]= deviceid;
                       resolve (deviceid)
                    }
                
                }))
            });
            Promise.all(devices).then(results => {
                // console.log(`Finished Kazoo Requests`);
                console.log("\n returning devices");
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        })
    
   
}

const createvoicemessage = async (req,payload:any, accountVM:any): Promise<any> => {

    return new Promise(async (resolve, reject) => {
   // accountdevice
	var vmboxes= [];
	let escalationlist = payload.callflowdata.filter(cl=>cl.callflowoptiontype.toLowerCase()=== "fwd message");
    escalationlist.forEach(clp => {
        vmboxes.push(new Promise((resolve, reject) =>
        {
            //  console.log("creating device for ",clp.callflowoption);
                    putDataVM.data.name=`${clp.callflowoption}`; 
                    putDataVM.data.mailbox=`${clp.callflowoption}`; 

                    var vm=accountVM ? accountVM.find(d=>d.name===putDataVM.data.name): undefined;
                    
                    if (vm)
                    {
                        console.log(" device found ",vm.id);
                        clp.deviceid= vm.id;
                        resolve (vm.id)
                    }
                    else
                    {
                        let kRequest = getKazooRequest(req)
                            .put({
                                url: `${process.env.KAZOO_SERVER}/v2/accounts/${payload.propertyid}/vmboxes`,
                                body: putDataVM,
                                json: true
                            },
                            (e, r, b) => {
                                if (e) {
                                    console.log("error device for ",clp.username);
                                resolve (e);
                                }
                                else {
                                //    console.log("sucess device for ",clp.username);
                                    clp.deviceid= b.data.id;
                                    resolve (b.data.id);
                                }
                        
                            });
                    }
				
				}))
            });
            Promise.all(vmboxes).then(results => {
                // console.log(`Finished Kazoo Requests`);
                console.log("\n returning devices");
                resolve(results);
            }).catch(err => {
                reject(err);
            });
        })
    
   
}

app.post('/companies/:id/properties', validateJWT,async (req, res) => {
    const companyid= req.params.id;
  
    const payload =JSON.parse(req.body.payload)  ;
   
    const propertyid=payload.propertyid;
  
    var devices:any=await getdevices(req,payload.propertyid);
    
    let escalationlist = payload.callflowdata.filter(cl=>cl.callflowoptiontype.toLowerCase()=== "escalation");
    const account:any = await getkazooaccountinfo(req,payload.propertyid);
    console.log("account.realm ", account.data.realm);
    const realm= account.data.realm;
     await createdevice(req,payload,devices,escalationlist,"1",realm);
     await createdevice(req,payload,devices,escalationlist,"" ,realm);
    
     payload.kazoopropertyname=account.data.name;
     var vmbox= await getvoicemaibox (req,payload.propertyid);
     await createvoicemessage(req,payload,vmbox);
      var result =await insertproperty(payload,companyid,req)   ;
    if (companyid!=propertyid)
         result =await insertproperty(payload,propertyid,req)   ;
    res.send(result);
})

app.delete('/companies/:companyid/properties/:id', validateJWT, (req, res) => {
    console.log("\n\n delete interview");
    const id = req.params.id;
    const companyid = req.params.companyid;
    console.log("\n\ncompanyid : " ,companyid);
    console.log("\n\n id", id);
    const accountDb = nano.use(parseAccountToDatabaseName(companyid));
   
    accountDb.get(id, (err, _proerty) => {
        if(err) {
            res.send(err);
        }
        else {
                 _proerty.enabled=false;
                 accountDb.insert(_proerty, (err, body) => {
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




app.post('/companies/:companyid/properties/:propertyid/schedules/:id', validateJWT, async(req, res) => {

    console.log("why this");
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =insertschedule(payload,dbname)   ;
    const property = await getpropertyInfo(propertyid);
    const messageinfo = `User ${req['decoded'].user_id} edited  scheduling  in (${property.propertyname})`;
    console.log(messageinfo);
    serverlog  ("info",messageinfo,"edit schedule");

    res.send(result);

})



app.post('/companies/:companyid/properties/:propertyid/adjustschedules/:id', validateJWT, async(req, res) => {
    console.log("\nadjust schedules\n");
    const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =await insertadjustschedule(payload,dbname)   ;
    res.send(result);

})
app.get('/companies/:companyid/properties/:propertyid/schedules/:optiontype', validateJWT, async(req, res) => {
//app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
    console.log("\n schedules111: ");
   const  propertyid= req.params.propertyid;
   const  optiontype= req.params.optiontype;
   const accountDbName= parseAccountToDatabaseName(propertyid);
   const accountDb = nano.use(accountDbName);
   var result =[];
  const schedulelist= await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"schedule");
   const dayschedulelist=await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"dayschedule");
   const adjustschedulelist=await getSchedule_for_callflowsoptiontype(accountDb,optiontype,"adjustschedule");
    if (Array.isArray(schedulelist))
    {
        result.push(...schedulelist);
    }
    if (Array.isArray(dayschedulelist))
    {
        result.push(...dayschedulelist);
    }
    if (Array.isArray(adjustschedulelist))
    {
        result.push(...adjustschedulelist);
    }
   res.statusCode = 200;
         
  // console.log("\nschedule Plumbing:",JSON.stringify( result));
   res.send(result);

})
app.post('/companies/:companyid/properties/:propertyid/dayschedules', validateJWT,async (req, res) => {
    console.log("\n\ndayschedules\n");
    //const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result = await insertdayschedule(payload,dbname)   ;
    console.log("days schedule return  ", result);
    res.send(result);

})

app.post('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, async (req, res) => {
    console.log("\n\nescalationuserlist\n");
    //const companyid= req.params.companyid;
    const propertyid= req.params.propertyid;
    //const scheduleid=req.params.id;
    const payload =JSON.parse(req.body.payload)  ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const result =await insertescalationuserlist(payload,dbname)   ;
    res.send(result);

})

app.get('/companies/:companyid/properties/:propertyid/escalationuserlist', validateJWT, (req, res) => {
    //app.get('/companies/:companyid/properties/:propertyid/schedules', validateJWT, (req, res) => {
        console.log("\n escalationuserlist: ");
       const  propertyid= req.params.propertyid;
       
       const accountDbName= parseAccountToDatabaseName(propertyid);
        const accountDb = nano.use(accountDbName);
      console.log("\n accountDb: ",accountDbName);
      console.log("\n propertyid: ",propertyid);
        const contactsSelector = {
            "selector": {
                "pvt_type": "escalationuserlist"
                
             },
            limit:30000 
        }
        accountDb.find(contactsSelector, function (err, result) {
            if (err) {
                try {
                    res.statusCode = result.statusCode;
                    res.send(err);
                } catch (e) {
                    console.error(`Couldn't access the db in /`, accountDbName);
                    res.send(err);
                }
            }
            else {
                res.statusCode = 200;
               // console.log("\nescalationuserlist ", JSON.stringify(result.docs));
                res.send(result.docs);
            }
        });
    
    })
const getSchedule_for_callflowsoptiontype= async(accountDb,callflowsoptiontype,scheduletype)=>
{
    const scheduleselector= {
        "selector": {
            "callflowsoptiontype": callflowsoptiontype,
             "pvt_type": scheduletype,
            "enabled": true
        },
        "limit":3000
    }
    const schdulelist=await getalldocumentsbyproperty(accountDb,scheduleselector); 
    return schdulelist;
        
}
const findAdjustSchedule = async (timezone,callflowoption,accountDb)=>
{
    var startoftheday =moment().tz(timezone).startOf('day').unix();
    console.log("startoftheday");
    console.log(startoftheday);
    const contactsSelector = {
        "selector": {
            "pvt_type": "adjustschedule",
            "adjustdate_unix": startoftheday,
            "callflowsoptiontype":callflowoption

        }
    };
     
    var adjustSchedule= await getdocumentbyproperty(accountDb,contactsSelector);
    return adjustSchedule;
   
}
const findSchedules = async (accountDb:any,isliveschedule:boolean,
    didnumber,property,company): Promise<any> => {
    const timezone=property.timezone?  property.timezone: company.timezone;
    didnumber= didnumber.substring(0,10);
    const callflowdatalist=  property.callflowdata;
    const callflowdata= callflowdatalist.find(cl=> cl.didnumber===didnumber);
    const callflowoption= callflowdata.callflowoption ? callflowdata.callflowoption:"";
    const adjustSchedule=await  findAdjustSchedule  (timezone,callflowoption,accountDb);
   
    var currendatettime =moment().tz(timezone);
    var currentminute= currendatettime.format("mm");
    var currenthour=currendatettime.format("HH");
    var currenttime =Number(currenthour  + "." +currentminute );
    var prevdaytime=currenttime+24;
    var todaysday= currendatettime.format('dddd').toLowerCase();
    var yesterday = currendatettime.add(-1, 'days').format('dddd').toLowerCase();
   
       var schedulelist=  [];
    if (adjustSchedule &&adjustSchedule.data )
    {
         const adjustDaySchedule= adjustSchedule.data.find(sch=> sch.livereply===isliveschedule 
                                                        && sch.ifrom<=prevdaytime
                                                        && sch.ito>prevdaytime
                                                            );
        if (adjustDaySchedule)
        {
            schedulelist.push(adjustDaySchedule);
        }
    }   
    else
    { 
        const contactsSelector = {
            "selector": {
                "pvt_type": "schedule",
                "callflowsoptiontype": callflowoption
            
            }
        };
        
        var document= await getdocumentbyproperty(accountDb,contactsSelector);
    
        
        if (document && document.data && document.data.length>0)
        {
            const restricschedules= document.data.filter(sch=> sch.livereply===isliveschedule 
                && sch.enabled 
                && (sch.days[todaysday]  ||  sch.days[yesterday])
            && sch.restricted
            && sch.livereply===isliveschedule
            );
            // console.log(JSON.stringify (restricschedules));
            restricschedules.forEach(rsch => {
            if (schedulelist.length<=0)
            {
                /**/
                    var dayrestrictschedule= rsch.restrictedschedule
                                                    .find (drsch=>
                                                        drsch.day ===todaysday
                                                        && drsch.ifrom<=currenttime 
                                                        && drsch.ito>currenttime
                                                    );
                    if (!dayrestrictschedule )
                    {
                            dayrestrictschedule= rsch.restrictedschedule
                                                    .find (drsch=>
                                                        drsch.day ===yesterday
                                                        && drsch.ifrom<=prevdaytime
                                                        && drsch.ito>prevdaytime);
                            if (dayrestrictschedule )
                                rsch.ispreviousday= true;
                                
                                                            
                    }

                    if (dayrestrictschedule)
                        schedulelist.push(rsch);
            }                                        
            });
            if (schedulelist.length<=0 ) //if there is no restrict shedule
            {
                schedulelist= document.data.filter(sch=> sch.livereply===isliveschedule 
                    && sch.enabled 
                    && sch.days[todaysday]
                    && !sch.restricted
                    && ( (sch.ifrom<=currenttime && sch.ito>currenttime) ) 
                    );
                if (schedulelist.length<=0 ) // fi we didnt find shedule for current day we should look for yesterday's spill over schedule
                {
                    schedulelist= document.data.filter(sch=> sch.livereply===isliveschedule 
                        && sch.enabled
                        && sch.days[yesterday]
                        && !sch.restricted
                        && sch.ifrom<=prevdaytime && sch.ito>prevdaytime
                    );
                    if (schedulelist.length>0)
                            schedulelist[schedulelist.length-1].ispreviousday= true;
                }
            }
        }
    }
    console.log("schedulelist length ", schedulelist.length)
    return schedulelist;
    

} 


const getpropertycallflowoptions= async function (didnumber,property)
{
    didnumber= didnumber.substring(0,10);
    const callflowdatalist=  property.callflowdata;
    const callflowdata= callflowdatalist.find(cl=> cl.didnumber===didnumber);
    const callflowoption= callflowdata.callflowoption ? callflowdata.callflowoption:"";
    return callflowoption;
}
const findSchedule = async (accountDb:any,isliveschedule:boolean,didnumber,property,company): Promise<any> => {
    var callflowsoptiontype= await getpropertycallflowoptions(didnumber,property)

    var schedulelist=  await  findSchedules(accountDb,isliveschedule,didnumber,property,company); 
    const schedulelistlength=schedulelist.length;
    var scheduledocument=schedulelistlength>0? schedulelist[schedulelistlength-1]:undefined;
    
    if(scheduledocument)
        scheduledocument.callflowsoptiontype= callflowsoptiontype;
    return scheduledocument;
}

const findNotifyEscalationSettings = async (property:any): Promise<any> => {
    // console.log(`Searching through nesting level ${level}`);
    if (property && property.companyid)
    {
        var accountDb = nano.use(parseAccountToDatabaseName(property.companyid));
        const contactsSelector ={
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
        

        const escalationSettings = new Promise<any[]>((resolve, reject) => {
        // console.log(currentUserSelector);
            accountDb.find(contactsSelector, (err, result) => {
                if (err) {
                    reject(err);
                }
                try {
                // console.log(`Found ${result.docs.length} docs for these users`);
              
                    resolve(result.docs);
                } catch (e) {
                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                    resolve([]);
                }
            });
        });
    
    // console.log(`Starting to search for users in set`, userIds);
        var  escalationList= [];
        const propertyid = property.propertyid;
        const escalationSettingsdocs = await escalationSettings;
        const escalationSettingsdocs_filter= escalationSettingsdocs.filter(
            (es)=> es.msteruser || 
            (es.propertylist && es.propertylist.find((p)=>p.id===propertyid&& p.enabled) ));
        escalationSettingsdocs_filter.forEach(setting => {
            setting.escalationsettings.forEach(escalationsetting => {
            var temp= {
                "name": `${setting.first_name} ${setting.last_name}`,
                "waittime": escalationsetting.time*60,
                "callingnumber": `+1${escalationsetting.number}`,
                "type": "sms"
            }
            escalationList.push(temp);
        });
    });
    
    return escalationList;
}
else
{
    return[];
}
}
const updateemrtdata=async()=>
{
    const now_unix= moment().utc().unix();
    //update_call_summery_data();
    var  emergency_companydata=[];
    
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
    // && d===parseAccountToDatabaseName("d5344ff8100a978c549b0335be45277b"));
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname=dbnames[i]
        console.log(dbname); 
        const companyid= parseDatabaseNameToAccount(dbname) ;
    // console.log(companyid);
        const company= await getcompanyInfo(companyid); 
        if (company && company.companyid)
        {
            const companyreportdocs=await getmonthreportdata(companyid);
            const emrgency_companyreportdocs=companyreportdocs.filter(r=>  r.type && 
                                        r.type.toLowerCase()==="emergency"
                                        && !isNaN( r.responsetime) && r.responsetime>0)

            var emergency_company_propertydata=d3c.nest()
            .key(function(d) { return d.propertyid; }) 
            
            .rollup(function(v) { return {
                avg_emrt: d3.mean(v, function(d) { return isNaN(d.responsetime)?0: d.responsetime; })
                }
            })
            .entries(emrgency_companyreportdocs);
            const emergency_company_company_avg_emrt=d3.mean(emergency_company_propertydata.map(da=>da.value.avg_emrt));
            emergency_companydata.push (
            {
                companyid:company.companyid,
                companyname: company.companyname,
                industry:company.industry,
                avgemrt:emergency_company_company_avg_emrt
            }
        )
        //console.log(emergency_companydata);
        }
    };
    //for loop end 

    var emrt_data= {
        timestamp:now_unix,
        data:emergency_companydata
    }
    console.log("emrt_data");
    console.log(JSON.stringify(emrt_data) );
    await insertemrtdata(emrt_data);
}

const getScheduleforProperty= async (propertydb)=>
{
    const contactsSelector = {
        'selector': {
            "pvt_type":"schedule",
            "enabled":true
            }
        }
    var schedulelist=await getalldocumentsbyproperty(propertydb,contactsSelector); 
    return schedulelist;

}
const handoffrule=async ()=>
{
    var reportrunningUTCTime= moment().utc();
    
   console.log(reportrunningUTCTime.format ("DD:mm:YYYY HH:mm:ss z"));
   var next_run_report_time= reportrunningUTCTime.clone().add(455, 'minutes');

   var account_db_pattern = new RegExp(getDabaseNameRegx());
   var dbnames:any= await getaccountdbnames();
  dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );// && d==='nt_account/2d/67/08f277a137338e4c5815c24962f9');
  dbnames.forEach(async(dbname) => {
      const propertyid= parseDatabaseNameToAccount(dbname);
    const property=await getpropertyInfo(propertyid);
    if (property)
    {
            const timezone= property.timezone;
            var starttime= reportrunningUTCTime.clone().tz( timezone);
            var endtime= starttime.clone().add(455, 'minutes');
          
           var scheduleday1 = starttime.format('dddd').toLowerCase();
            var scheduleday2 = endtime.format('dddd').toLowerCase();
            const propertydb= nano.use(dbname);
            const property_schedulelist = await getScheduleforProperty(propertydb);
            var property_day_schedules=[];
            for (var property_schedule_index=0;
                property_schedule_index< property_schedulelist.length;
                property_schedule_index++)
            {
                const property_schedule= property_schedulelist[property_schedule_index];
                const datalist =property_schedule.data;
                const day_schedules=datalist.filter(data=> data.days[scheduleday1] 
                                                        ||data.days[scheduleday2] );
                property_day_schedules.push(...day_schedules);
            }
            const reporttime_utc_unix= reportrunningUTCTime.unix();
          // const endtime_utc_unix=  reportrunningUTCTime.clone().add(455, 'minutes').unix(); 
           
           await handoffruleforproperty(property,property_day_schedules,reporttime_utc_unix);
    }
  });
   
}
const handoffruleforproperty= async (property,property_day_schedules_list,reporttime_utc_unix)=>
{

    var starttime_d =moment().tz(property.timezone).startOf('day');
    var starttime_unix=starttime_d.unix();
    var endtime_d = starttime_d.clone().add(1, "days").add(455,"minutes");
    var endtime_unix=endtime_d.unix();
     const company=await getcompanyInfo(property.companyid); 
    
   var dayschedules = await findUsersForhandOffRules(property,starttime_unix,endtime_unix);
      
   for (var i=0; i<dayschedules.length;i++)
   {
      const dayschedule= dayschedules[i];
      const property_day_schedule= property_day_schedules_list.find(pd=> pd.scheduleid===dayschedule.scheduleid);
      if(property_day_schedule)
      {
            var from_hh= parseInt( property_day_schedule.from.hh);
            const from_mm= parseInt( property_day_schedule.from.mm);
            const from_a=  property_day_schedule.from.a;
            if (from_a==="pm" && from_hh<12)
            {
                from_hh+=12;
            }
            var schedule_start_time= starttime_d.clone().add(from_hh, "hours").add(from_mm, "minutes");
            
            var to_hh= parseInt( property_day_schedule.to.hh);
            const to_mm= parseInt( property_day_schedule.to.mm);
            const to_a=  property_day_schedule.to.a;
            if (to_a==="pm" && to_hh<12)
            {
                to_hh+=12;
            }
            
            const schedule_end_time= starttime_d.clone().add(to_hh, "hours").add(to_mm, "minutes");
          
            const datetimeunix=schedule_start_time.utc().unix();
            const enddatetimeunix= schedule_end_time.utc().unix();
            
            const schedulefromtimediffrence= (datetimeunix-reporttime_utc_unix)/60;
            const scheduleendtimediffrence= (enddatetimeunix-reporttime_utc_unix)/60;
            const users= dayschedule.users;
            const userIds = users.map(a => a.key);
            console.log(JSON.stringify(userIds));
            var userdocs=await findDayScheduleuserlist(userIds, property);
            await sendhandoffrulesmessage(userdocs,dayschedule,property,schedulefromtimediffrence,scheduleendtimediffrence);
      }
   }
}
const sendhandoffrulesmessage= async(userdocs,dayscheule,property,schedulefromtimediffrence,scheduleendtimediffrence )=>
{

    userdocs.forEach(user => {
        var handoffrulessettings =user.handoffrulessettings;
        if (handoffrulessettings)
        {
            handoffrulessettings= handoffrulessettings
                                        .filter(h=>h.call.toLowerCase()==="on" 
                                            || h.call.toLowerCase()==="off");
            
            
            handoffrulessettings.forEach(async (setting) => {
                const ruletype=setting.call.toLowerCase();
                const time= parseInt( setting.time);
                const diffrencetime=ruletype==="on"?
                                             schedulefromtimediffrence 
                                             :scheduleendtimediffrence
                const timediffrence= diffrencetime-time;
                console.log("timediffrence");
                console.log(timediffrence);
               if (timediffrence<=14 &&  timediffrence>0 )
                {
                    var  number= setting.number.toString();
                    const propertyname= property.propertyname;
                    const schedulename= dayscheule.callflowsoptiontype;
                    const message= `You’re ${ruletype} call in ${time} minutes for ${propertyname} ${schedulename}`;
                    const messaging_number= process.env.MESSAGINGNUMBER;
                    const from = messaging_number;
                    number= number.indexOf("+1")>=0?number:`+1${number}`;
                   
                    var payload={
                        
                        "from": from,
                        "to": number,
                        "messagetext": message
                        
                    }
                    console.log(`sendig message ${message}`);
                    sendNotifySMS(payload)
                }
            });
         }
    });
}
const findUsersForhandOffRules= async(property,starttime_utc_unix,endtime_utc_unix)=>
{
    const propertydbname= parseAccountToDatabaseName(property.propertyid)
    const propertydb=  nano.use (propertydbname);
   
    const contactsSelector = {
        "selector": {
           "pvt_type": "dayschedule",
           "$or":[{"datetimeunix": {
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
                ]
           ,
           "users.0": {
              "$gt": 0
           }
        } 
        };
        console.log(JSON.stringify( contactsSelector));
       var dayscheules=await getalldocumentsbyproperty(propertydb,contactsSelector); 
       return dayscheules;
}

const setHandOfffRuleJob = ()=>
{
   // handoffrule();
  console.log( moment().utc().format())
   cron.schedule('0 10,25,40,55 * * * *', () => {
    console.log('running handoff rule');
    handoffrule();
  }, {
    scheduled: true,
    timezone: "Etc/UTC"
  });
}


const setSyncReportJob = ()=>
{
   // handoffrule();
  console.log( moment().utc().format())
   cron.schedule('0 5,10,15,20,25,30,35,40,45,50,55 * * * *', () => {
    console.log('running sync report rule');
    unSavedReportToElasticSearch();
  }, {
    scheduled: true,
    timezone: "Etc/UTC"
  });
}

const unSavedReport=async ()=>
{
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
        const companyid= parseDatabaseNameToAccount(dbname);
        await fixBrokenCompanyReports(companyid);
    }
    
} 
const fixBrokenCompanyReports= async (companyid)=>
{
    const contactsSelector = {
        "selector": {
            "pvt_type": "callinfolog",
            "reporterror":true
         } 
        }
    
    const company=  await getcompanyInfo(companyid);
    const dbname= parseAccountToDatabaseName(companyid);
    if (company && company.companyid)
    {
        console.log(dbname);
        const comapnydb= nano.use(dbname);
        var callinfologs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 
        for (var k=0; k<callinfologs.length;k++)
        {
            const callinfolog= callinfologs[k];
            if (callinfolog &&callinfolog.guid)
            {
                console.log(JSON.stringify(callinfolog.guid));
                await parselivecallinfologdataforreport(comapnydb,callinfolog.guid);
            }
        }
          
    }
}
const unSavedReportToElasticSearch=async ()=>
{
   
    const contactsSelector = {
        "selector": {
            "pvt_type": "reportdata",
            "elasticid": {
               "$exists": false
            }
         } 
        }
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d));
   // dbnames.forEach(async(dbname) => 
    for (var i=0; i<dbnames.length;i++)
    {
        const dbname= dbnames[i];
       
        const companyid= parseDatabaseNameToAccount(dbname);
       const company=  await getcompanyInfo(companyid);
       if (company && company.companyid)
       {
            console.log(dbname);
           const comapnydb= nano.use(dbname);
           var reports=await getalldocumentsbyproperty(comapnydb,contactsSelector); 
           
            //reports.forEach(async(reportdata) => 
            for (var k=0; k<reports.length;k++)
            {
              const reportdata= reports[k];
                if (reportdata &&reportdata.guid)
                {
                    console.log(JSON.stringify(reportdata.guid));

                     await insertreportdatatoelastic(comapnydb,reportdata);
                }
            }
            //);  
       }  
    }
    //);
    
}

const setScheduleReportJob= ()=>
{
    
    cron.schedule('0 2,32 * * * *', () => {
        console.log('building ScheduleReport');
        callsummery_report();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      });
      //send schedule report on every 30 minutes
      cron.schedule('0 29,59 * * * *', () => {
        console.log('sending ScheduleReport');
        
        send_callsummery_report();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      })
   
    
}

const setCallActivityScheduleReportJob= ()=>
{
    
    cron.schedule('0 5,35 * * * *', () => {
        console.log('building call activity  ScheduleReport');
        callactivity_report();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      });
      //send schedule report on every 30 minutes
      cron.schedule('0 1,31 * * * *', () => {
        console.log('sending call activity ScheduleReport');
        
        send_callactivity_report();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      })
   
    
}

const setUpdateCallSummeryJob= ()=>
{
    
    cron.schedule('0 1,10,20,30,40,50 * * * *', () => {
        console.log('update call_summery_data');
        update_call_summery_data();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      });
    
   
    
}

const setUpdateEMRTdataJob= ()=>
{
    
    cron.schedule('0 1,10,20,30,40,50 * * * *', () => {
        console.log('update EMRT data');
        updateemrtdata();
      }, {
        scheduled: true,
        timezone: "Etc/UTC"
      });
     
   
    
}

const checkScheduleCallActivityReport= ()=>
{
    //setInterval(function(){ console.log("Hello"); }, 36000);
    console.log( moment().format("HH:mm:ss"));

    callactivity_report();
   // setInterval(function(){ console.log("Hello");
   // console.log(moment().format("HH:mm:ss"));update_call_summery_data();callsummery_report(); }, 300000);


}


const findAnyNotifyDayScheduleUsers = async (accountDb:any,didnumber,islivereply,company,property): Promise<string[]> => {
    
    console.log("findAnyNotifyDayScheduleUsers");
    const callflowsoptiontype=await getpropertycallflowoptions(didnumber,property);
    const timezone=property.timezone?  property.timezone: company.timezone;
    var scheduledate =moment().tz(timezone).startOf('day');//tz(timezone);
    scheduledate = scheduledate.add(+1, 'days');
    const scheduledate_start_unix= scheduledate.unix();
    
   // const scheduledate_end_unix= scheduledate.add(+1, 'days').subtract(1,'minutes').unix();
   const contactsSelector = {
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
    const dayschedulePromise = new Promise<any[]>((resolve, reject) => {
         console.log(JSON.stringify( contactsSelector));
        accountDb.find(contactsSelector, (err, result) => {
            if (err) {
                reject(err);
            }
            try {
                 //console.log(`Found ${result.docs.length} docs for these users`);
               // var  docresult =result.docs.length>0 ?result.docs[0]: []
                resolve(result.docs);
            } catch (e) {
                console.error(`Couldn't fetch users  from the database`);
                resolve([]);
            }
        });
    });

    // console.log(`Starting to search for users in set`, userIds);
    const dayscheduledocs = await dayschedulePromise;
    console.log(dayscheduledocs);
    console.log("dayscheduledocs");
   var keyArray = [];
    if (dayscheduledocs && dayscheduledocs.length>0 && dayscheduledocs[ dayscheduledocs.length-1] 
        && dayscheduledocs[ dayscheduledocs.length-1].users)
        keyArray=  dayscheduledocs[dayscheduledocs.length-1].users.map(function(item) { return item["key"]; });
    return keyArray;
}

const findDayScheduleUsers = async (accountDb:any,schedule:any,islivereply,company,property): Promise<string[]> => {
    
   
    const timezone=property.timezone?  property.timezone: company.timezone;
    var scheduledate =moment().tz(timezone).startOf('day');//tz(timezone);
    if (schedule.ispreviousday)
        scheduledate= scheduledate.add("-1","days");
   
    const scheduledate_start_unix= scheduledate.unix();
    
    const scheduledate_end_unix= scheduledate.add(+1, 'days').subtract(1,'minutes').unix();
   const contactsSelector = {
        "selector": {
           "pvt_type": "dayschedule",
           "callflowsoptiontype": schedule.callflowsoptiontype.trim(),
          
           "scheduleid":schedule.scheduleid,
           "datetime":{
            "$gte": scheduledate_start_unix,
            "$lte": scheduledate_end_unix
          }
         }
    };
    const dayschedulePromise = new Promise<any[]>((resolve, reject) => {
        accountDb.find(contactsSelector, (err, result) => {
            if (err) {
                reject(err);
            }
            try {
                 //console.log(`Found ${result.docs.length} docs for these users`);
                resolve(result.docs);
            } catch (e) {
                console.error(`Couldn't fetch users  from the database`);
                resolve([]);
            }
        });
    });

    // console.log(`Starting to search for users in set`, userIds);
    const dayscheduledocs = await dayschedulePromise;
   var keyArray = [];
    if (dayscheduledocs && dayscheduledocs.length>0 && dayscheduledocs[ dayscheduledocs.length-1] 
        && dayscheduledocs[ dayscheduledocs.length-1].users)
        keyArray=  dayscheduledocs[dayscheduledocs.length-1].users.map(function(item) { return item["key"]; });
    return keyArray;
}

const findPropertydocument = async (propertyid:string): Promise<any> => {
    const currentUserSelector = {
        'selector': {
           
            "pvt_type": "property",
            "enabled": true
            
        }
    };

    const companypromise = new Promise<any[]>(async (resolve, reject) => {
        // console.log(currentUserSelector);
        var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
        accountDb.find(currentUserSelector, (err, result) => {
            if (err) {
                reject(err);
            }
            try {
                 resolve(result.docs);
            } catch (e) {
                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                resolve([]);
            }
        });
    });

    // console.log(`Starting to search for users in set`, userIds);
    const companydocs = await companypromise;
     //console.log(`Found users`, companydocs[0]);
     return companydocs.length>0 ?  companydocs[0]: {};
}


const checkpin = async (pin:string, companyid:string): Promise<any> => {
  const currentUserSelector = {
        'selector': {
            'pin': {
                '$eq': pin
            },
            "pvt_type": "user",
            "notify_enabled": true
        }
    };

    const userpromise = new Promise<any[]>(async (resolve, reject) => {
        // console.log(currentUserSelector);
        var accountDb = nano.use(parseAccountToDatabaseName(companyid ));
   
        
        
//         accountDb = nano.use(parseAccountToDatabaseName("441202171b923a9cc3a8ab36f9728294"));
        accountDb.find(currentUserSelector, (err, result) => {
            if (err) {
                reject(err);
            }
            try {
                // console.log(`Found ${result.docs.length} docs for these users`);
                var user;
                if (result.docs.length>0)
                    user=result.docs[0];
                resolve(user);
                     
            } catch (e) {
                // console.error(`Couldn't fetch users (${userIds}) from the database`);
                resolve([]);
            }
        });
    });

    // console.log(`Starting to search for users in set`, userIds);
    const userdocs = await userpromise;
    // console.log(`pin users`, userdocs);
        return userdocs;
}


const findDayScheduleuserlist = async (userIds: string[],property): Promise<any> => {
            
    if (property && property.companyid)
        {
             const currentUserSelector = {
                'selector': {
                    'id': {
                        '$in': userIds
                    },
                    "pvt_type": "user",
                    
                }
            };

            const userpromise = new Promise<any[]>(async (resolve, reject) => {
                // console.log(currentUserSelector);
                var accountDb = nano.use(parseAccountToDatabaseName(property.companyid));
               
                accountDb.find(currentUserSelector, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    try {
                        resolve(result.docs);
                    } catch (e) {
                        // console.error(`Couldn't fetch users (${userIds}) from the database`);
                        resolve([]);
                    }
                });
            });

           // console.log(`Starting to search for users in set`, userIds);
            const userdocs = await userpromise;
             //console.log(`Found users`, userdocs);
             return userdocs;   
    }
    else
     {
        return []
     }
}
const generateLivereply = async (userIds: string[],userdocs:any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);
   
    const livereplypromiss = new Promise<any>((resolve, reject) => {
 

         var lrdatalist=[];
         
        userIds.forEach(id => {
            //  if (user.livereplysetting)
            var user =userdocs.find(u=> u.id==id) ;
            if (user && user.livereplysetting)
            {
                //console.log(user.first_name);
                var lrdata={
                    name:user.first_name,
                    userid:user.id,
                    pin:user.pin,
                    phones:[]
                };
                user.livereplysetting.forEach(lr => {
                   // console.log("\nlr.number", lr.number);
                    lrdata.phones.push({
                        "callingnumber":"+1"+lr.number,
                        "ring": 30
                    });
                 });
                lrdatalist.push(lrdata); 
            }
             
         });
        
        resolve(lrdatalist);
    });
    

    // console.log(`Starting to search for users in set`, userIds);
    const lrresult = await livereplypromiss;
    // console.log(`Found lrresult`, lrresult);
     
  
       
    
    return lrresult;
};

const generateNoticationreply = async (userIds: string[],userdocs:any[]): Promise<string[]> => {
    // console.log(`Searching through nesting level ${level}`);
   
    const livereplypromiss = new Promise<any>((resolve, reject) => {
        // console.log("generateNoticationreply 22222");

         var ntdatalist=[];
        userIds.forEach(id => {
            //  if (user.livereplysetting)
          
           
            var user =userdocs.find(u=> u.id==id) ;

           
            if (user.notificationrulessetting)
            {
               console.log(user.first_name);
                var ntdata={
                    name:user.first_name,
                    userid:user.id,
                    data:[]
                };
                user.notificationrulessetting.forEach(nt => {
                    var waittime1= nt.notificationwait.toString().replace(/\D/g,'').trim();
                    var waittime= 60*waittime1;
                    ntdata.data.push({
                        "callingnumber":"+1"+nt.number,
                        type:nt.type.toLowerCase(),
                        "waittime":waittime,
                        pin:user.pin
                        
                        
                    });
                   
                    });
                ntdatalist.push(ntdata); 
            }
             
         });
        
        resolve(ntdatalist);
    });
    

    // console.log(`Starting to search for users in set`, userIds);
    const lrresult = await livereplypromiss;
     //console.log(`Found lrresult`, lrresult);
     
  
       
    
    return lrresult;
};


app.get('/property/:propertyid/handoffrules', async(req, res)=>
{
        //console.log ("fffff");
       
        const propertyid=req.params.propertyid;
        
      
     res.send("sucess");

});


//propertycalloutnumber

app.get('/property/:propertyid/:didnumber/schedule', async(req, res) => {
        
        const didnumber= req.params.didnumber;
        var  type= "";
        const propertyid=req.params.propertyid;//441202171b923a9cc3a8ab36f9728294
        var accountDb = nano.use(parseAccountToDatabaseName(propertyid));
        var propertyIdSelector:any ={
            "selector": {
                    "pvt_type": "property",
                    "propertyid":propertyid ,
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
    
        const property=await getdocumentbyproperty(accountDb,propertyIdSelector); 
        
        const companyselector= {
            "selector": {
               "pvt_type": "company",
               "companyid": property.companyid
            }
         }
         const companydbname= parseAccountToDatabaseName(property.companyid);
        
         const companydb= nano.use(companydbname);
         const company=await getdocumentbyproperty(companydb,companyselector); 

        var schedule = await findSchedule(accountDb,true,didnumber,property,company);
      
        var userIds= schedule ? await findDayScheduleUsers(accountDb,schedule,true,company,property):[];

        var userdocs=await findDayScheduleuserlist(userIds,property);

         var lrresult= await generateLivereply(userIds, userdocs);
         const strmaxhold= schedule ? schedule.livereplyduration:'120';
         const intmaxhold= isNaN(strmaxhold) ? 120:strmaxhold;
         var callflowsoptiontype;
         if (schedule)
                callflowsoptiontype= schedule.callflowsoptiontype

       // var result:any= notificationdata.data.find(d => d.propertyid === propertyid && d.didnumber== didnumber    )
       var result:any= {
        "didnumber": didnumber,
        "propertyid": propertyid,
        "type": "live",
        "maxonholdtime": intmaxhold,
        "label":callflowsoptiontype,
        "data":lrresult
       };
       
       //console.log("\n live result result:",  JSON.stringify( result));
         res.send( JSON.stringify( result));
        //res.send(  result);
    
  
})

//propertycalloutnumber

app.get('/property/:propertyid/propertycalloutnumber', async(req, res) => {
    console.log("propertycalloutnumber");
    
   var propertyid=req.params.propertyid;
   var dbnames:any=await getaccountdbnames();

    const propertydbname= parseAccountToDatabaseName(propertyid);
    const isCompanyDbAvailable= dbnames.find(d=>d===propertydbname);
    var result ={data:{
      
        calloutnumber:"",
        propertyid:propertyid
    }
  
    }
   
    if (isCompanyDbAvailable)
    {
        const propertydb= nano.use(propertydbname);

        var propertyIdSelector:any ={
            "selector": {
                    "pvt_type": "property",
                    "propertyid":propertyid ,
                    "enabled": true
                    
                
            },
            "fields": [
                "propertyid",
                "propertyname",
                "companyname",
                "phone"
            ]
            };
    
            const property=await getdocumentbyproperty(propertydb,propertyIdSelector); 
            result.data.calloutnumber=property.phone;
    }

  
  res.send(result);

})
app.get('/property/:propertyid/:didnumber/:boxid/pin/:pin', async(req, res) => {
     console.log("pin");
     const didnumber= req.params.didnumber;
     var propertyid=req.params.propertyid;
    var property=await findPropertydocument(propertyid);
    var comapnyid= property.companyid;
    console.log("\n comapnyid ", comapnyid);
    var pin=req.params.pin;

    var pinuser=await checkpin(pin,comapnyid);
    var result:any= {
        data:{verified:false,
            propertyid:propertyid}
    };
    if (pinuser)
    {
        result.data.verified=true;
        result.data.agenttid=pinuser.id;
        result.data.agenttname=pinuser.first_name;
       
    }
   
   res.send(result);

})

app.get('/company/:companyid/property/:propertyid/pin/:pin/:userid', async(req, res) => {
    console.log("user pin pin");
    
   var comapnyid=  req.params.companyid;
   console.log("\n comapnyid ", comapnyid);
   var pin=req.params.pin;
    const userid=req.params.userid;
   var pinuser=await checkpin(pin,comapnyid);
   var result:any= {
       data:{verified:false,
          }
   };
   if (pinuser && pinuser.id!=userid)
   {
       result.data.verified=true;
       result.data.agenttid=pinuser.id;
       result.data.agenttname=pinuser.first_name;
      
   }
  
  res.send(result);

})
app.get('/property/:propertyid/:didnumber/schedule/notify', async(req, res) => {
    console.log("notify schedule");
    const didnumber= req.params.didnumber;
        
        const propertyid=req.params.propertyid;
       const result=await  updateNOtifySchedule(propertyid, didnumber);// getNOtifySchedule(propertyid, didnumber)//  
        
       res.send( JSON.stringify( result));
      

})


app.get('/property/:propertyid/:callflowoption/vmboxemail', async(req, res) => {
    //console.log("\n\n vmboxemail\n");
    const propertyid= req.params.propertyid;
    const callflowoption= req.params.callflowoption;
    var payload ={
        data:{
            callflowoption:callflowoption,
            emaillist:[]
        }
    } ;
    const dbname=parseAccountToDatabaseName(propertyid);
    const accountDb = nano.use(dbname);
    const contactsSelector = {
                'selector': { "pvt_type": "escalationemaillist",
                "callflowoption": callflowoption
                    },
                    limit:30000 
                }
   var escalationemailobj=await getdocumentbyproperty(accountDb,contactsSelector); 
     var emaillist=[];           
   if (escalationemailobj  && escalationemailobj.emaillist)
            emaillist=escalationemailobj.emaillist.map(a => a.email);
    
    payload.data.emaillist= emaillist;

    console.log(payload);
   // vmboxemail(payload);

    res.send({  

        "Status":"200",
        "list":payload,
        "messages":"Email sent  successfully",
     
     });

})



app.post('/property/:propertyid/:didnumber/callinfolog', async (req, res) => {
    console.log("\n\n callinfo log\n");
    
    const propertyid= req.params.propertyid;
    const didnumber= req.params.didnumber.substring(0,10);
    const payload =req.body ;
    payload.didnumber= didnumber;
    payload.propertyid= propertyid;
    const result = await insertcallinfolog(payload)   ;
    res.send({  

        "Status":"200",
     
        "messages":"Call info log  log inserted  successfully",
     
     });

})

app.get('/property/:propertyid/callinfolog/guid/:guid', async(req, res) => {
    console.log("\n\n callinfo log\n");
    
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const property= await getpropertyInfo(propertyid);
    const companyid= property.companyid;
     const dbname=parseAccountToDatabaseName(companyid);
     const comapnydb= nano.use(dbname);
    
    const guid= req.params.guid;
    
    const contactsSelector = {
        'selector': {
            "pvt_type":"callinfolog",
            "guid":guid
            },
            limit:30000 
        }
    var callinfologs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 

   // console.log("reportdocs\n",  reportdocs);

    res.send({  

        "Status":"200",
    
        callinfologs:callinfologs
    
    });
    

})
app.get('/property/:propertyid/:incidentid/notes',validateJWT,async (req, res) => {
    console.log("incident notes");
    var propertyid = req.params.propertyid;
    var incidentid=req.params.incidentid
    const contactsSelector = {
        'selector': {
            "incidentid":incidentid,
            enabled:true,
            "pvt_type": "incidentnotes"
            },
            limit:30000 
        }

        var dbname= parseAccountToDatabaseName(propertyid);
        var db= nano.use(dbname);
        var notes=await getalldocumentsbyproperty(db,contactsSelector); 

        //console.log("incident notes\n",  notes);

        res.send({  

            "Status":"200",
    
             notes:notes
    
            });
})

app.post('/property/:propertyid/:incidentid/notes', validateJWT,(req, res) => {
    console.log("\n\n incidentid notes\n");
    
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
    const payload =req.body ;
    const dbname=parseAccountToDatabaseName(propertyid);
   
    
    const result =insertincidentnotes(payload,dbname,propertyid)   ;
    
    res.send({  

        "Status":"200",
     
        "messages":"CDR log inserted  successfully",
     
     });

})

app.post('/property/:propertyid/reportdata', async (req, res) => {
    console.log("\n\n reportdata  log\n");
    const propertyid= req.params.propertyid;//'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
   
    const payload =req.body ;
    const dbname=parseAccountToDatabaseName(propertyid);
   
    const result =await insertreportdata(payload,dbname)   ;

    
    
    res.send({  

        "Status":"200",
     
        "messages":"CDR log inserted  successfully",
     
     });

})


app.get('/company/:companyid/autosearch',validateJWT,async (req, res) => {
    console.log("\n\n get company reportdata  log\n");
    const companyid= req.params.companyid;
    const dbname=parseAccountToDatabaseName(companyid);
    const comapnydb= nano.use(dbname);
    const contactsSelector = {
        'selector': {
            "pvt_type":"reportdata",
            },
            limit:30000 
        }
    var reportdocs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 

    // console.log("reportdocs\n",  reportdocs);

    res.send({  

        "Status":"200",
    
        reportdocs:reportdocs
    
    });


})
app.get('/property/:propertyid/autosearch',validateJWT,async (req, res) => {
    console.log("\n\n get reportdata  log\n");
    const propertyid= req.params.propertyid;
    if (propertyid==="441202171b923a9cc3a8ab36f9728294")
    {
            let body = {
                size: 20,
                from: 0,
                query: {
                "match":{
                    "companyid":"441202171b923a9cc3a8ab36f9728294"
                }
                }
            };
            search('reportdocs', body)
            .then(results => {
                var hits= results.hits.hits
        
                let result1 = hits.map(a => a._source);
                res.send({  
        
                    "Status":"200",
                
                    reportdocs:result1
                
                })   
            })
        }
            
   //'441202171b923a9cc3a8ab36f9728294';//req.params.propertyid;
   
    else
    {
        const property= await getpropertyInfo(propertyid);
        const companyid= property.companyid;
         const dbname=parseAccountToDatabaseName(companyid);
         const comapnydb= nano.use(dbname);
        
        /*var today = new Date();
        today.setMinutes(0);
        today.setHours(0);
        today.setSeconds(0);

   

        const incidentdate_unix= Math.floor(today.getTime()/1000);*/

    //console.log(incidentdate_unix);
        const contactsSelector = {
            'selector': {
                "pvt_type":"reportdata",
                "propertyid":propertyid
                },
                limit:30000 
            }
        var reportdocs=await getalldocumentsbyproperty(comapnydb,contactsSelector); 

       // console.log("reportdocs\n",  reportdocs);
    
        res.send({  

            "Status":"200",
        
            reportdocs:reportdocs
        
        });
    }

})

app.get('/property/:propertyid/chart/:type/:bussinesshours/:nonbussinesshours/:startime/:endtime',validateJWT,async (req, res) => {
    
    console.log("\n\n get chart  log\n");
    var response_result=[];
    
    const propertyid= req.params.propertyid;
    const bussinesshours=req.params.bussinesshours;
    const nonbussinesshours=req.params.nonbussinesshours;
    const startime=parseInt( req.params.startime);
    const endtime=parseInt(req.params.endtime);

    console.log(startime);
    console.log(endtime);
    if(bussinesshours==="true"|| nonbussinesshours==="true")
    {
        const property =await getpropertyInfo(propertyid);
        const companydbname= parseAccountToDatabaseName(property.companyid);
        const companydb= nano.use(companydbname);
        const type=Number(req.params.type);
        var  contactsSelector = {
                "selector": {
                   "pvt_type":"reportdata",
                   "removefromreport":false,
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
                   "propertyid":propertyid,
                    "$or":[{"duringbussinesshours":true}, {"duringbussinesshours":false}]
                    },
                    limit:30000 
                }
                if (bussinesshours==="false"|| nonbussinesshours==="false")
                {
                
                    contactsSelector.selector.$or[0].duringbussinesshours= bussinesshours==="true";
                    contactsSelector.selector.$or[1].duringbussinesshours= bussinesshours==="true";
                }
                console.log(JSON.stringify( contactsSelector));
            var reportdocs=await getalldocumentsbyproperty(companydb,contactsSelector); 
            const timezone= property.timezone? property.timezone: 'America/Kentucky/Louisville';
      
            const incidentdatetime= (time,type)=>
            {
                
                var retunvalue:any=-1;
                if (type===0)//daily
                {
                    retunvalue= moment.unix(time).tz(timezone).format('H');
                }
                else if (type===1)
                    retunvalue= moment.unix(time).tz(timezone).day();
                else if(type===2)
                {
                    retunvalue= parseInt( moment.unix(time).tz(timezone).format("M"))-1;
                                      
                }
                return retunvalue;
            }
            const serachcount=(dataset,search)=>
            {
                var count = dataset.reduce(function(n, val) {
                    return n + (val == search);
                }, 0);

                return count;
            }
            const groupBy = key => array =>
            array.reduce(
                (objectsByKeyValue, obj) => ({
                ...objectsByKeyValue,
                [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(incidentdatetime(obj.incidentdate,type))
                }),
                {}
            );

                
            const groupByType = groupBy('type');

            var reportdocs= groupByType(reportdocs);
            var reportdocskeys= Object.keys(reportdocs);
        
            reportdocskeys.forEach(k => {

                var seriesdata= reportdocs[k];
                var seriesdatavalue=[];
                for ( var i=0;i<24;i++)
                {
                //   console.log(i);
                
                var tmpvalue= { value:serachcount(seriesdata,i)
                                };
                seriesdatavalue.push(tmpvalue);
                }
                var tmp= {
                    seriesname:k,
                    hourdata:seriesdatavalue
                }

                response_result.push(tmp);
            });
    }
        
        
        res.send({  

            "Status":"200",
        
            chartdata:response_result
        
        });
    

})
app.post('/elasticsearch',validateJWT, async (req, res) => {
    console.log('ElasticSearch ' );
    console.log(JSON.stringify(req.body));
    const payload= req.body;
    const result1 =await getelasticsearchdata(payload.payload);
    res.send({result:result1}); 
});


app.get('/property/:propertyid/reportdata',validateJWT,async (req, res) => {
    console.log("\n\n get reportdata  log\n");
    let body = {
        size: 20,
        from: 0,
        query: {
          "match_all":{}
        }
      };
       search('reportdocs', body)
      .then(results => {
          var hits= results.hits.hits
  
          let result1 = hits.map(a => a._source);
          res.send({  
  
              "Status":"200",
           
              reportdocs:result1
           
           })   
      })
    })

    app.post('/webhook/VoicemailEmail/Notification', async (req, res) => {
        console.log("email notification ");
        var payload =req.body ;
       // console.log(JSON.stringify(payload));
        const fields= payload.fields;
        const indexname= payload.name;
        var account_db_pattern = new RegExp(getDabaseNameRegx());
        var dbnames:any= await getaccountdbnames();
       dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
        for (var i=0;i<dbnames.length;i++)
        {
            const dbname= dbnames[i];
            const account_id=parseDatabaseNameToAccount(dbname);//"d0ca5df0ae801c7f8963a7605da860c9";//"2047a7abb35d2ee72092efca120a0119";//
           console.log(account_id);
            await setKazooAccountEmailNotification(req,account_id)
        }
        res.send({  
    
            "Status":"200",
         
            "messages":"voicemail optin  successfully",
         
         });
    
    })

    
    app.post('/webhook/createindex', async (req, res) => {
        console.log("createindex ");
        var payload =req.body ;
        console.log(JSON.stringify(payload));
        const fields= payload.fields;
        const indexname= payload.name;
        var account_db_pattern = new RegExp(getDabaseNameRegx());
        var dbnames:any= await getaccountdbnames();
       dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );
        for (var i=0;i<dbnames.length;i++)
        {
            const dbname= dbnames[i];
           console.log(dbname);
            await createindex(dbname,fields,indexname)
        }
        res.send({  
    
            "Status":"200",
         
            "messages":"voicemail optin  successfully",
         
         });
    
    })
    
app.post('/webhook/voicemail', async (req, res) => {
        console.log("voice mail ");
    try{
        var payload =req.body ;
        console.log(JSON.stringify(payload));
        const propertyid= payload.account_id;
        var property= await getpropertyInfo(propertyid);
        if (!property || !property.propertyid)
        {
            property= await getpropertyInfo(propertyid);
        }
        var companyid=property.companyid;
        const companydbname=parseAccountToDatabaseName(companyid);
        const companydb= nano.use (companydbname);
        payload.eventtype="voicemail";
        setTimeout(() => {
            deleteVoiceMessages(propertyid,payload.voicemail_box);
        }, 1000); 

        const result =await insertdtmfinfo(payload,companydbname,property)   ;
    
        await parseVoiceMessage(companydb,payload);
    }
    catch(ex)
    {
        debugMessage ("error from voice mail", "error")
        debugMessage (ex, "error")
        debugMessage (payload, "error for")
    }
       
    res.send({  
    
            "Status":"200",
         
            "messages":"voicemail optin  successfully",
         
         });
    
});
    
    app.post('/webhook/media', async (req, res) => {
        console.log("media mail ");
        var payload =req.body ;
        console.log(req);
        
        res.sendStatus(200);
    
    })

    app.post('/webhook/s3messageinfo', async (req, res) => {
        console.log("s3messageinfo  ");
        //await inserts3notification(req);
        var bodyarr = []
        req.on('data', function(chunk){
          bodyarr.push(chunk);
        })
        
        req.on('end',async  function(){
            console.log("bodyarr")
            console.log( bodyarr.join('') )
            var bodyarr2 = JSON.parse(bodyarr.join(''));
            //await inserts3notification(bodyarr2);
            const message=JSON.parse( (bodyarr2.Message));
            message.Records.forEach(record => {
                try{
                    console.log("record")
                    console.log(record)
                    var notification =record;
                    
                    console.log("notification")
                    console.log(notification)
                    var s3= notification.s3;
                    console.log ("s3");
                    console.log (s3);
                    if (s3.object)
                    {
                        const s3Onje3ct= s3.object;
                        console.log("s3Onje3ct");
                        console.log(s3Onje3ct);
                        setTimeout(() => {
                            parseS3Notifcation(s3Onje3ct);
                        }, 15000); 
                       
                    }
                }
                catch(ex)
                {
                    debugMessage("during s3 record parsing", "error");
                    debugMessage(ex, "error info")
                    debugMessage(record, "info");
                }

               });
        })  
       
        res.sendStatus(200);
    
    })
    
app.post('/property/dtmfinfo', async (req, res) => {
    console.log("\n\n dtmf log\n");
    const payload =req.body ;
    console.log("\n\n dtmf log\n", payload);
    const propertyid= payload.account_id;
    const property= await getpropertyInfo(propertyid);
    var companyid=property.companyid;
    const dbname=parseAccountToDatabaseName(companyid);
    console.log("payload.DTMFpayload.DTMFpayload.DTMFpayload.DTMF111111 ", payload.DTMF)
    const result =await insertdtmfinfo(payload,dbname,property)   ;
    console.log("payload.DTMFpayload.DTMFpayload.DTMFpayload.DTMF ", payload.DTMF)
    if (payload.DTMF && payload.DTMF>=0)
    {
        await insertDTMFInforeport(payload,dbname,property)  ;   
       
    }
    else
    {

        //we wait for 1 so user can choose menu options dtmf inof 
       
          
        setTimeout(()=>{ insertcallinitreport(payload,dbname,property,undefined)  },70000); 
        
    }
    res.send({  

        "Status":"200",
     
        "messages":"DTMF inserted  successfully",
     
     });

})
//serverlog
app.post('/serverlog', validateJWT, async(req, res) => {
    console.log("serverlog \n");
    const payload  =JSON.parse( req.body.payload ) ;
    console.log (payload);
    const message = payload.message;
    const method = payload.method;

    serverlog  ("info",message,method);
    res.send("log inserted");

})



app.get('/companies/:companyid/properties/:propertyid/callflow', validateJWT, (req, res) => {
        const _accountid=req['decoded'].account_id;
        const propertid= req.params.propertyid;
        const promise1 = new Promise((resolve, reject) => {
        getKazooRequest(req)
            .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/callflows?filter_not_ui_metadata.origin=voip&filter_not_ui_metadata.origin=callqueues&_=1578197504745`, (err, response, body) => {

                if (err)
                {
                    console.log("\n\n\nbody callflow \n", err);
                    res.send(err);
                    return;
                }
                //console.log("\n\n\nbody callflow \n", body);
                res.send(body);
            });
     
    
});
})



app.get('/companies/:companyid/properties/:propertyid/phonenumbers', validateJWT, (req, res) => {
    const _accountid=req['decoded'].account_id;
    const propertid= req.params.propertyid;
    const promise1 = new Promise((resolve, reject) => {
    getKazooRequest(req)
        .get(`${process.env.KAZOO_SERVER}/v2/accounts/${propertid}/phone_numbers?paginate=false`, 
        (err, response, body) => {

            if (err)
            {
               // console.log("\n\n\nbody phone_numbers \n", err);
                res.send(err);
                return;
            }
          //  console.log("\n\n\nbody phone_numbers \n", body);
            res.send(body);
        });
 

});
})
    
app.get('*', (req, res) => {
    let filename = req.path;
    if (filename.indexOf('.') >= 0) {
        const filePath = path.join(__dirname, "public/dist/", filename);
//         console.log(filePath);
        fs.stat(filePath, (err, stat) => {
            if (err) {
                res.sendStatus(404);
            }
            res.sendFile(path.join(__dirname, "public/dist/", filename));
        })
    } else {
        res.sendFile(path.join(__dirname, "public/dist/", 'index.html'));
    }
});


app.get('/property/:propertyid', validateJWT, (req, res) => {
    const accountDb = nano.use(parseAccountToDatabaseName(req['decoded'].account_id));
    //console.log('added properties  ', parseAccountToDatabaseName(req['decoded'].account_id));
    const companyid=req.params.companyid;
    const contactsSelector = {
    'selector': {
            '$and': [
                {
                    'pvt_type': 'property',
                }
            ]
        },
        limit:30000 
    }
    accountDb.find(contactsSelector, function (err, result) {
        if (err) {
            try {
                res.statusCode = result.statusCode;
                res.send(err);
            } catch (e) {
                console.error(`Couldn't access the db in /user`);
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
})


app.post('/fixreport/company/:companyid', validateJWT, async(req, res) => {
    const companyid= req.params.companyid;
    await fixBrokenCompanyReports(companyid)
    res.sendStatus(200);
})

app.post('/sendsms',  async(req, res, next) => {
    console.log("sendsms\n", req.body);
   

const payload = req.body;
const messaging_number= process.env.MESSAGINGNUMBER;
payload.from=messaging_number;
   const response= await sendNotifySMS(payload);
console.log("response");
console.log(response);


res.send(response);


});

app.post('/webhook/schedulereport', async (req, res) => {
    console.log("schedulereport");
    var account_db_pattern = new RegExp(getDabaseNameRegx());
    var dbnames:any=await getaccountdbnames();
    dbnames= dbnames.filter (d=>  account_db_pattern.test(d) );//&& d==="account/44/12/02171b923a9cc3a8ab36f9728294"
    dbnames.forEach(async (dbname) => 
    {
        var companyid= parseDatabaseNameToAccount(dbname);
        const company = await getcompanyInfo (companyid);
        if (company)
        {
           
            const companyuserlist:any=  await  getComapnyUsers(dbname);
            if (companyuserlist && Array.isArray(companyuserlist) &&companyuserlist.length>0 )
            {
                
                const companyschedulereportinfo= {
                    companyid:companyid,
                    companydbname:dbname,
                    users:companyuserlist
                }
                send_callsumery_report(companyschedulereportinfo);
            }
            
            
        } 
    });
       
    res.send("done");

})
app.post('/webhook/optin', async (req, res) => {
    console.log("\n\n webhook optin\n");

    const incomingMessages =req.body ;
    console.log(JSON.stringify(incomingMessages));

    incomingMessages.forEach(async (m) => {
        
        const mtext= m.message.text.toLowerCase();
        var toarr= m.message.to;
        var from= m.message.from.replace("+1","");;
        var phone=toarr[0].replace("+1","");
        
        //console.log ("from ", phone);
        var messaging_number= process.env.MESSAGINGNUMBER;
        messaging_number=messaging_number.replace("+1",'');
        if (phone===messaging_number &&(mtext==="yes" ||mtext=== "stop" || mtext=== "y" ))
        {
           var dbnames:any=await getaccountdbnames();
           
            var messageneedstosend=false;
            var accountname= req.params.name;
            var username= req.params.email;
                             
            optinUserIdSelector.selector["smssettings.settings"].$elemMatch.$or[0].number=from;
            optinUserIdSelector.selector["smssettings.settings"].$elemMatch.$or[1].number="+1" +from;

            console.log("optinUserIdSelector", JSON.stringify(optinUserIdSelector));
            var result:any= {};
            var company:any;
            var account_db_pattern = new RegExp(getDabaseNameRegx());
            var users;
        
            for (var i=0; i<dbnames.length;i++)
            {
                var dbname= dbnames[i];
             
                if (account_db_pattern.test(dbname) === false) continue
                var accountDb = nano.use(dbname);
               const dbid= parseDatabaseNameToAccount(dbname);
               company=await getcompanyInfo(dbid); 
                 
                 
                if (company && company.companyid)
                {
                    accountDb = nano.use( parseAccountToDatabaseName(company.companyid) ); 
                   // console.log("company ", company);
                     users =await getalldocumentsbyproperty(accountDb,optinUserIdSelector);
                     //console.log("users ", users.length); 
                     users.forEach(async (user) => {
                         var needstoupdate=false;
                         var smssettings= user.smssettings.settings;
                         smssettings.forEach(async (settings) => {
                             if (settings.number===from || settings.number==="+1"+from )
                             {
                                // console.log(JSON.stringify( settings))
                                var oldoptin=settings.optin;
                                settings.optin=mtext==="yes" || mtext==="y";
                                settings.smsagreement=settings.optin;
                                needstoupdate= needstoupdate || oldoptin!=settings.optin;
                                //console.log(JSON.stringify( settings))
                                
                             }
                         });
                         if (needstoupdate) 
                         {  
                            var notificationrulessetting=user.notificationrulessetting;
                             if (mtext=== "stop" && notificationrulessetting && notificationrulessetting.length>0)
                             {
                                 notificationrulessetting=notificationrulessetting.filter(
                                            nrs=>nrs.type==="Phone" ||(nrs.number!=from && nrs.number!="+1"+from)
                                 ) 
                                 user.notificationrulessetting=notificationrulessetting;
                             }
                             await updatenotifyusersettings(accountDb, user,user,false,undefined,undefined);
                             messageneedstosend=  mtext=== "stop" ;           
                         }
                         
                     });
                  //  console.log("user:", users);
                   // break;
                  
                }

                
            }
            if (messageneedstosend)
                {
                    console.log("sending messgae from ", from);
                   
                    const messagetext= "You have unsubscribed from HelloSpoke Notify SMS messages. To resubscribe you must opt in again via the Notify portal.";
                    const messaging_number= process.env.MESSAGINGNUMBER;
                    sendOptinMessage(from,messaging_number,messagetext);
                 }
        }
        else
        {
            console.log ("do nothing");
        }
    });
    console.log ("done");
   
    res.send({  

        "Status":"200",
     
        "messages":"webhook optin  successfully",
     
     });

})

app.post('/sendoptinsms',  (req, res, next) => {
        // console.log("sendsms\n", req.body);
         
         const payload = req.body;
         console.log("sendsms2\n", payload);
         var index=0;
         var length=  payload.to.length;
         const smsmessage= 'Please reply YES to recive SMS message from HelloSpoke Notify.\n Std message&data rates apply.Reply stop to'
         payload.to.forEach(to_num => {
             
          
         client.Message.send({
         from: payload.from,
         to: to_num,
         text: payload.messagetext,
         callbackUrl: `${process.env.BANDWIDTH_MESSAGE_SERVER}`,
         receiptRequested:'all',
         // These are being added to the tag so that we can find the db
         // in the webhook as well as record the user ID that sent the text
        // tag: `${req['decoded'].account_id} ${req['decoded'].user_id}`
         })
         .then(function (message) {
            index++;
             if (index==length)
                 res.send(JSON.stringify(message));
         })
         .catch(function (err) {
                 res.statusCode = 500;
                 index++;
                 if (index==length)
                    res.send(JSON.stringify(err));
         });
         });
     });

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function): void => {
    let err: Error = new Error("Not Found");
    next(err);
});

// production error handler
app.use((err: any, req: express.Request, res: express.Response, next): void => {
    res.status(err.status || 500).render("error", {
        message: err.message,
        error: {}
    });
});

if (app.get("env") === "development") {
    app.use((err: Error, req: express.Request, res: express.Response, next): void => {
        if (!res.headersSent) {
            res.status(500).write(`error
                message: ${err.message || 'no error message'}
                error: ${err || {}}
            `
            );
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
  app.listen(process.env.PORT || 3000, function(err) {
    if (err) console.log("Error in server setup") 
    console.log("Hsnotify server listening on Port 3000"); 
  });
  module.exports = app;

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
});