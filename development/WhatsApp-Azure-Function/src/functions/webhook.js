 //Secrets need to be called from KeyVault
 const PICOVOICE_API_KEY = "SzthCHR8COg6e3O0EpW72p6zMjgYKJiR3Px08xMcB6sIfxRO4VDc2A==";
 const WHATSAPP_VERSION = "v17.0";
 const VERIFY_TOKEN = "voiceflow";
 const VF_DM_URL = "https://general-runtime.voiceflow.com";
 const VF_TRANSCRIPT_ICON = "https://s3.amazonaws.com/com.voiceflow.studio/share/200x200/200x200.png";
 const PORT = "3000";
 const VF_VERSION_ID = "development";
 const VF_API_KEY = "VF.DM.64f064c4d52233000786e950.Ri9jJ0ttL6nFOdeX";
 const VF_PROJECT_ID = "64f064c4d52233000786e94f";
 const WHATSAPP_TOKEN = "EAAB3H0gQWi0BO0Fci4WTwqgXOZCTrt9cMZB6Uy8SmUXZBUeokRaRUdMeoZCVVbTtV7RCmLdaTRdy30p1xcbiGreguuoeXBWt6FPzlXaEOnxZB6UE27MWQBpn5T4bb4j8sZAP1R2ehzwSTlZAM05OzBtFeflhL0E7kbpmbSZAxHNb911ANZBWfe296wFmZAvuQnlAQ1";


const { app } = require('@azure/functions');
const axios = require('axios');
const fs = require('fs');
const {Leopard} = require('@picovoice/leopard-node');
// const {fetchMediaOrFile} = require('./fetchMediaOrFile');
// const {n8nPostImage} = require('./fetchFile');



let session = 0
let noreplyTimeout = null
let user_id = null
const DMconfig = {
    tts: false,
    stripSSML: true,
  }

app.http('webhook', {

    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (req, context) => {
        context.log(`Http function processed request for url "${req.url}"`);
        //updateVoiceflowUserVariables('+27785296316', { user_id: '+27785296316', user_name: "Ryan", authUser: false });

            // Check the Incoming webhook message
            // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
            if (req.method === 'GET') {
                // Handle GET request
                context.log('Handling GET request');
                let isVerified = await verifyWebhook(req);  
                return isVerified;
            }

             // Parse the request body from the POST
             const body = await req.json();
             console.log("body: ", body);

        
            if (body.object && req.method === 'POST') {
              const isNotInteractive = body?.entry[0]?.changes[0]?.value?.messages?.length || null
              if (isNotInteractive) {
          
                let phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id
                user_id = body.entry[0].changes[0].value.messages[0].from // extract the phone number from the webhook payload
                let user_name = body.entry[0].changes[0].value.contacts[0].profile.name
          
                console.log("body: ", user_name, user_id, phone_number_id);

          
                //Show blue ticks(Read receipts):
                await readReceipts(body.entry[0].changes[0].value.messages[0], phone_number_id);
                    
                if (body.entry[0].changes[0].value.messages[0].text) {
                  await interact(
                    user_id,
                    {
                      type: 'text',
                      payload: body.entry[0].changes[0].value.messages[0].text.body,
                    },
                    phone_number_id,
                    user_name
                  )
                } else if (body?.entry[0]?.changes[0]?.value?.messages[0]?.audio) {
                  if (
                    body?.entry[0]?.changes[0]?.value?.messages[0]?.audio?.voice ==
                    true &&
                    PICOVOICE_API_KEY
                  ) {
                    let mediaURL = await axios({
                      method: 'GET',
                      url: `https://graph.facebook.com/${WHATSAPP_VERSION}/${body.entry[0].changes[0].value.messages[0].audio.id}`,
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + WHATSAPP_TOKEN,
                      },
                    })
          
                    const rndFileName =
                      'audio_' + Math.random().toString(36).substring(7) + '.ogg'
          
                    axios({
                      method: 'get',
                      url: mediaURL.data.url,
                      headers: {
                        Authorization: 'Bearer ' + WHATSAPP_TOKEN,
                      },
                      responseType: 'stream',
                    }).then(function(response) {
                      let engineInstance = new Leopard(PICOVOICE_API_KEY)
                      const wstream = fs.createWriteStream(rndFileName)
                      response.data.pipe(wstream)
                      wstream.on('finish', async () => {
                        console.log('Analysing Audio file')
                        const { transcript, words } =
                          engineInstance.processFile(rndFileName)
                        engineInstance.release()
                        fs.unlinkSync(rndFileName)
                        if (transcript && transcript != '') {
                          console.log('User audio:', transcript)
                          await interact(
                            user_id,
                            {
                              type: 'text',
                              payload: transcript,
                            },
                            phone_number_id,
                            user_name
                          )
                        }
                      })
                    })
                  }
                }
          
                //Image/Video message
                else if (body.entry[0].changes[0].value.messages[0].image || body.entry[0].changes[0].value.messages[0].video) {
          
                  const reqBody = body.entry[0].changes[0].value.messages[0].image || body.entry[0].changes[0].value.messages[0].video;
          
                  // Call fetchMediaOrFile function here...(Images/Vidoes download as stream)   
                  // fetchMediaOrFile(reqBody, "stream");
                  await n8nPostImage(reqBody, user_id);
                  await interact(
                    user_id,
                    {
                      type: 'text',
                      payload: "Image Uploaded...",
                    },
                    phone_number_id,
                    user_name
                  )
          
                }
          
                //Document message
                else if (body.entry[0].changes[0].value.messages[0].document) {
          
                  // Call document function here...(Documents download as arraybuffer)   
                  fetchMediaOrFile(body.entry[0].changes[0].value.messages[0].document, 'arraybuffer');
          
                }
          
                //Buttons/List message:
                else if (body.entry[0].changes[0].value.messages[0].interactive) {
                  if (body.entry[0]?.changes[0]?.value?.messages[0]?.interactive.button_reply?.id?.includes('path-')) {
                    await interact(
                      user_id,
                      {
                        type: body.entry[0].changes[0].value.messages[0].interactive
                          .button_reply.id,
                        payload: {
                          label:
                            body.entry[0].changes[0].value.messages[0].interactive
                              .button_reply.title,
                        },
                      },
                      phone_number_id,
                      user_name
                    )
                  } else {
                    console.log('in else interaction');
                    let payload = {};
                    if (body.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.type === "button_reply") {
                      payload = body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
          
                    }
                    else if (body.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.type === "list_reply") {
          
                      payload = body.entry[0].changes[0].value.messages[0].interactive.list_reply.title
          
                    }
                    await interact(
                      user_id,
                      {
                        type: 'text',
                        payload: payload
                      },
                      phone_number_id,
                      user_name
                    )
                  }
                }
          
              }

              return {
                status: 200,
                body: 'ok',
              };

            } else {
              // Return a '404 Not Found' if event is not from a WhatsApp API
              return {
                status: 404,
                body: 'error | unexpected body',
              };
            }  
    }
});


 verifyWebhook = async (req) => { 
        
        //Test: 
        // req.query = {
        //     "hub.mode": "subscribe",
        //     "hub.challenge": "1626709404",
        //     "hub.verify_token": "voiceflow"
        // }
        
        // Parse params from the webhook verification request
        let mode = req.query.get('hub.mode');
        let token = req.query.get('hub.verify_token');
        let challenge = req.query.get('hub.challenge');
    
        // Check if a token and mode were sent
        if (mode && token) {
            // Check the mode and token sent are correct
            if (
                (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) ||
                token === 'voiceflow'
            ) {
                // Respond with 200 OK and challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                return {
                    status: 200,
                    body: challenge
                };
            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                return {
                    status: 403,
                    body: 'Forbidden'
                };
            }
        }
 }

async function interact(user_id, request, phone_number_id, user_name) {
    clearTimeout(noreplyTimeout)
    if (!session) {
      session = `${VF_VERSION_ID}.${rndID()}`
    }
  
  
    // await axios({
    //   method: 'DELETE',
    //   url: `${VF_DM_URL}/state/user/${user_id}`,
    //   headers: {
    //     Authorization: VF_API_KEY,
    //     'Content-Type': 'application/json',
    //     versionID: VF_VERSION_ID,
    //   }
    // })
  
    //Check if user_ID has an open/started VF session;
    let vfState = await axios({
      method: 'GET',
      url: `${VF_DM_URL}/state/user/${user_id}`,
      headers: {
        Authorization: VF_API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        user_id: user_id
      },
    })
  
    console.log("vf state: ", vfState.data);
    //uploadImageBoolean = vfState.data.variables['upload_image_boolean'];
    //console.log('test uploadImageBoolean: ',uploadImageBoolean);
  
    //Launch Chatbot if no VF session is returned : 
    if (!vfState.data && Object.keys(vfState.data).length === 0) {
      await interact(user_id,
        {
          type: 'launch',
        },
        phone_number_id,
        user_name)
    }
  

    await axios({
      method: 'PATCH',
      url: `${VF_DM_URL}/state/user/${encodeURI(user_id)}/variables`,
      headers: {
        Authorization: VF_API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        user_id: user_id,
        user_name: user_name,
      },
    })
  
    let response = await axios({
      method: 'POST',
      url: `${VF_DM_URL}/state/user/${encodeURI(user_id)}/interact`,
      headers: {
        Authorization: VF_API_KEY,
        'Content-Type': 'application/json',
        versionID: VF_VERSION_ID,
        sessionID: session,
      },
      data: {
        action: request,
        config: DMconfig,
      },
    })
  
    //console.log("hello world: ", JSON.stringify(response.data));
  
    let isEnding = response.data.filter(({ type }) => type === 'end');
    if (isEnding.length > 0) {
      console.log('isEnding');
      isEnding = true;
  
      //Restart user state when conversation ends:
      await axios({
        method: 'DELETE',
        url: `${VF_DM_URL}/state/user/${user_id}`,
        headers: {
          Authorization: VF_API_KEY,
          'Content-Type': 'application/json',
          versionID: VF_VERSION_ID,
        }
      })
  
      saveTranscript(user_name)
    } else {
      isEnding = false;
    }
  
    let messages = []
    //call Whatsapp read message function here: 
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].type == 'text') {
        let tmpspeech = ''
  
        for (let j = 0; j < response.data[i].payload.slate.content.length; j++) {
          for (
            let k = 0;
            k < response.data[i].payload.slate.content[j].children.length;
            k++
          ) {
            if (response.data[i].payload.slate.content[j].children[k].type) {
              if (
                response.data[i].payload.slate.content[j].children[k].type ==
                'link'
              ) {
                tmpspeech +=
                  response.data[i].payload.slate.content[j].children[k].url
              }
            } else if (
              response.data[i].payload.slate.content[j].children[k].text != '' &&
              response.data[i].payload.slate.content[j].children[k].fontWeight
            ) {
              tmpspeech +=
                '*' +
                response.data[i].payload.slate.content[j].children[k].text +
                '*'
            } else if (
              response.data[i].payload.slate.content[j].children[k].text != '' &&
              response.data[i].payload.slate.content[j].children[k].italic
            ) {
              tmpspeech +=
                '_' +
                response.data[i].payload.slate.content[j].children[k].text +
                '_'
            } else if (
              response.data[i].payload.slate.content[j].children[k].text != '' &&
              response.data[i].payload.slate.content[j].children[k].underline
            ) {
              tmpspeech +=
                // no underline in WhatsApp
                response.data[i].payload.slate.content[j].children[k].text
            } else if (
              response.data[i].payload.slate.content[j].children[k].text != '' &&
              response.data[i].payload.slate.content[j].children[k].strikeThrough
            ) {
              tmpspeech +=
                '~' +
                response.data[i].payload.slate.content[j].children[k].text +
                '~'
            } else if (
              response.data[i].payload.slate.content[j].children[k].text != ''
            ) {
              tmpspeech +=
                response.data[i].payload.slate.content[j].children[k].text
            }
          }
          tmpspeech += '\n'
        }
        if (
          response.data[i + 1]?.type &&
          response.data[i + 1]?.type == 'choice'
        ) {
          messages.push({
            type: 'body',
            value: tmpspeech,
          })
        } else {
          messages.push({
            type: 'text',
            value: tmpspeech,
          })
        }
      }
      else if (response.data[i].type == 'speak') {
        if (response.data[i].payload.type == 'audio') {
          messages.push({
            type: 'audio',
            value: response.data[i].payload.src,
          })
        }
        else {
          if (
            response.data[i + 1]?.type &&
            response.data[i + 1]?.type == 'choice'
          ) {
            messages.push({
              type: 'body',
              value: response.data[i].payload.message,
            })
          } else {
            messages.push({
              type: 'text',
              value: response.data[i].payload.message,
            })
          }
        }
      } else if (response.data[i].type == 'visual') {
        messages.push({
          type: 'image',
          value: response.data[i].payload.image,
        })
      }
      else if (response.data[i].type == 'choice') {
        let buttons = []
        for (let b = 0; b < response.data[i].payload.buttons.length; b++) {
          let link = null
          if (
            response.data[i].payload.buttons[b].request.payload.actions !=
            undefined &&
            response.data[i].payload.buttons[b].request.payload.actions.length > 0
          ) {
            link =
              response.data[i].payload.buttons[b].request.payload.actions[0]
                .payload.url
          }
          if (link) {
            // Ignore links
          } else if (
            response.data[i].payload?.buttons[b]?.request?.type?.includes('path-')
          ) {
            let id = response.data[i].payload.buttons[b].request.payload.label
            buttons.push({
              type: 'reply',
              reply: {
                id: response.data[i].payload.buttons[b].request.type,
                title: truncateString(
                  response.data[i].payload.buttons[b].request.payload.label
                ) ?? "",
              },
            })
          } else {
            if (response.data[i].payload.buttons[b].request.payload.intent) {
              buttons.push({
                type: 'reply',
                reply: {
                  id: response.data[i].payload.buttons[b].request.payload.intent
                    .name,
                  title: truncateString(
                    response.data[i].payload.buttons[b].request.payload.label
                  ) ?? "",
                },
              })
            }
          }
        }
        if (response.data[i].payload?.buttons?.length > 2) {
          //buttons = buttons.slice(0, 3);
          messages.push({
            type: 'list',
            buttons: formatObjectArrayForLists(response.data[i].payload.buttons) || [],
          })
        }
        else {
          messages.push({
            type: 'buttons',
            buttons: formatObjectArrayForButtons(response.data[i].payload.buttons) || [],
          })
        }
  
        // console.log(response.data[i].payload);
  
      }
      else if (response.data[i].type == 'no-reply' && isEnding == false) {
        noreplyTimeout = setTimeout(function() {
          sendNoReply(user_id, request, phone_number_id, user_name)
        }, Number(response.data[i].payload.timeout) * 1000)
      }
    }
    await sendMessage(messages, phone_number_id, user_id)
    if (isEnding == true) {
      session = null
    }
  }
  
  async function sendMessage(messages, phone_number_id, from) {
    const timeoutPerKB = 10 // Adjust as needed, 10 milliseconds per kilobyte
    //console.log("wtyf: ", JSON.stringify(messages));
    for (let j = 0; j < messages.length; j++) {
      let data
      let ignore = null
  
      // Image
      if (messages[j].type == 'image') {
        data = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: from,
          type: 'image',
          image: {
            link: messages[j].value,
          },
        }
        // Audio
      } else if (messages[j].type == 'audio') {
        data = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: from,
          type: 'audio',
          audio: {
            link: messages[j].value,
          },
        }
        // Buttons
      }
      else if (messages[j].type == 'buttons') {
  
        data = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: from,
          type: 'interactive',
          interactive: {
            type: 'button',
            body: {
              text: messages[j - 1]?.value || 'Make your choice',
            },
            action: {
              buttons:
                /*   [
                   {
                     "type": "reply",
                     "reply": {
                       "id": "UNIQUE_BUTTON_ID_1",
                       "title": "BUTTON_TITLE_1"
                     }
                   },
                   {
                     "type": "reply",
                     "reply": {
                       "id": "UNIQUE_BUTTON_ID_2",
                       "title": "BUTTON_TITLE_2"
                     }
                   },
                   {
                     "type": "reply",
                     "reply": {
                       "id": "UNIQUE_BUTTON_ID_3",
                       "title": "BUTTON_TITLE_3"
                     }
                   }
                 ],*/
                messages[j].buttons,
            },
          },
        }
  
        // Lists
      }
      else if (messages[j].type == 'list') {
  
        data = {
          "messaging_product": "whatsapp",
          "recipient_type": "individual",
          "to": from,
          "type": "interactive",
          "interactive": {
            "type": "list",
            //"header": {},
            "body": {
              "text": messages?.[j - 1]?.value ?? 'Make your choice'
            },
            //"footer": {},
            "action": {
              "button": "Select from list",
              "sections": [
                {
                  "title": "Locations:",
                  "rows":
                    /*[
                    {
                      "id": "SECTION_1_ROW_1_ID",
                      "title": "SECTION_1_ROW_1_TITLE",
                      "description": "SECTION_1_ROW_1_DESCRIPTION"
                    },
                    {
                      "id": "SECTION_1_ROW_2_ID",
                      "title": "SECTION_1_ROW_2_TITLE",
                      "description": "SECTION_1_ROW_2_DESCRIPTION"
                    }
                  ]*/
                    messages[j].buttons,
                }
              ]
            }
          }
        }
      }
      else if (messages[j].type == 'text') {
        data = {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: from,
          type: 'text',
          text: {
            preview_url: true,
            body: messages[j].value,
          },
        }
        // Image
      } else {
        ignore = true
      }
  
      if (!ignore) {
        try {
          await axios({
            method: 'POST',
            url: `https://graph.facebook.com/${WHATSAPP_VERSION}/${phone_number_id}/messages`,
            data: data,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + WHATSAPP_TOKEN,
            },
          })
  
          if (messages[j].type === 'image') {
            try {
              const response = await axios.head(messages[j].value)
  
              if (response.headers['content-length']) {
                const imageSizeKB =
                  parseInt(response.headers['content-length']) / 1024
                const timeout = imageSizeKB * timeoutPerKB
                await new Promise((resolve) => setTimeout(resolve, timeout))
              }
            } catch (error) {
              console.error('Failed to fetch image size:', error)
              await new Promise((resolve) => setTimeout(resolve, 5000))
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
  
  async function sendNoReply(user_id, request, phone_number_id, user_name) {
    clearTimeout(noreplyTimeout)
    console.log('No reply')
    await interact(
      user_id,
      {
        type: 'no-reply',
      },
      phone_number_id,
      user_name
    )
  }
  
  async function readReceipts(request, phone_number_id) {
    try {
  
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${WHATSAPP_VERSION}/${phone_number_id}/messages`,
        data: {
          "messaging_product": "whatsapp",
          "status": "read",
          "message_id": request.id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + WHATSAPP_TOKEN,
        },
      })
    } catch (e) {
      console.log('error: ', e);
    }
  }
  
  var rndID = function() {
    // Random Number Generator
    var randomNo = Math.floor(Math.random() * 1000 + 1)
    // get Timestamp
    var timestamp = Date.now()
    // get Day
    var date = new Date()
    var weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'
    var day = weekday[date.getDay()]
    return randomNo + day + timestamp
  }
  
  function truncateString(str, maxLength = 20) {
    if (str) {
      if (str.length > maxLength) {
        return str.substring(0, maxLength - 1) + '…'
      }
      return str
    }
    return ""
  }
  
  async function saveTranscript(username) {
    if (VF_PROJECT_ID) {
      if (!username || username == '' || username == undefined) {
        username = 'Anonymous'
      }
      axios({
        method: 'put',
        url: 'https://api.voiceflow.com/v2/transcripts',
        data: {
          browser: 'WhatsApp',
          device: 'desktop',
          os: 'server',
          sessionID: session,
          unread: true,
          versionID: VF_VERSION_ID,
          projectID: VF_PROJECT_ID,
          user: {
            name: username,
            image: VF_TRANSCRIPT_ICON,
          },
        },
        headers: {
          Authorization: process.env.VF_API_KEY,
        },
      })
        .then(function(response) {
          console.log('Transcript Saved!')
        })
        .catch((err) => console.log(err))
    }
    session = `${VF_VERSION_ID}.${rndID()}`
  }
  
  function formatObjectArrayForButtons(inputObject) {
    if (Array.isArray(inputObject) && inputObject.length > 0) {
      const formattedButtons = inputObject.map((item, index) => {
        if (item.name && item.request && item.request.type && item.request.payload) {
          const uniqueId = `UNIQUE_BUTTON_ID_${index + 1}`;
          const title = item.name; // Use the "name" property for the title
          return {
            type: "reply",
            reply: {
              id: uniqueId,
              title: title
            }
          };
        } else {
          // If an item doesn't have the expected structure, return null
          return null;
        }
      }).filter(button => button !== null);
  
      return formattedButtons;
    } else {
      return inputObject; // Return the input object if it doesn't match the expected structure
    }
  }
  
  function formatObjectArrayForLists(inputArray) {
    const formattedArray = [];
  
    for (let i = 0; i < inputArray.length; i++) {
      const item = inputArray[i];
      const description = item?.description ?? ''; // Use an empty string if no description is provided
      formattedArray.push({
        id: `SECTION_1_ROW_${i + 1}_ID`,
        title: item?.name || `BUTTON${i + 1}`,
        description: description,
      });
    }
  
    return formattedArray;
  }

  async function fetchMediaOrFile(whatsAppAPIres, responseType) {
    try {
      console.log("In fetchMediaOrFile");
      // Fetch media metadata/details
      const mediaResponse = await axios({
        method: 'get',
        url: `https://graph.facebook.com/v17.0/${whatsAppAPIres.id}/`,
        headers: {
          Authorization: 'Bearer ' + WHATSAPP_TOKEN,
        },
      });
  
      // Fetch the media content
      const mediaContentResponse = await axios({
        method: 'get',
        url: mediaResponse.data.url, // actual URL from the response headers
        headers: {
          Authorization: 'Bearer ' + WHATSAPP_TOKEN, // Add any required headers for authentication if needed
        },
        responseType: responseType, // Specify the desired response type (e.g., 'stream', 'text', 'arraybuffer')
      });
  
      // Change this to your desired filename with the appropriate file extension:
      const extension = whatsAppAPIres.mime_type.split('/').pop() || 'mp4';
      const fileName = whatsAppAPIres.filename || `whatsApp_media.${extension}`;
  
      if (responseType === 'stream') {
        const writer = fs.createWriteStream(fileName);
  
        mediaContentResponse.data.pipe(writer);
  
        writer.on('finish', async () => {
          console.log(`${responseType} downloaded and saved successfully: ${fileName}`);
          // Handle the downloaded media content based on its type
          // You can convert the downloaded image to base64 as needed
          try {
            //const base64String = await imageToBase64(fileName);
            // Use the base64String as needed (e.g., pass it to an object or insert it into a database)
          } catch (error) {
            console.error('Error converting image to base64:', error);
          }
  
        });
  
        writer.on('error', (err) => {
          console.error(`Error saving the ${responseType}:`, err);
        });
      }
      else if (responseType === 'arraybuffer') {
        // Save the arraybuffer as a binary file
        fs.writeFileSync(fileName, Buffer.from(mediaContentResponse.data), 'binary');
  
        console.log(`${responseType} downloaded and saved successfully: ${fileName}`);
      }
      else {
        // Handle other response types (e.g., text, arraybuffer) here as needed
        console.log('Media content:', mediaContentResponse.data);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }
  
  async function n8nPostImage(whatsAppAPIResponse,userID) {
    try {
  
      let response = await axios({
        method: 'POST',
        url: `https://integrove-testn8n.onrender.com/webhook/reqSubmitv1`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          whatsAppMediaID: whatsAppAPIResponse.id,
          userID: userID
        },
      })
  
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  }

  async function updateVoiceflowUserVariables(user_id, data) {
    let response = await axios({
      method: 'PATCH',
      url: `${VF_DM_URL}/state/user/${encodeURI(user_id)}/variables`,
      headers: {
        Authorization: VF_API_KEY,
        'Content-Type': 'application/json',
      },
      data: data,
    });
    console.log("response: ", response.data);
  }

  
  async function checkUserAuthorization(user_id) {
    //Check if user token(authUser) is still valid here: 

    /*If (valid) {
      1. Get user details from database.
      2. Update Voiceflow variables with user details.
      3. Chatbot should now have access to user details and should respond with users Registered company details rather than WhatsApp Name.
    } else {
    
      Respond with default WhatsApp variables

    }
    }*/
   
  }