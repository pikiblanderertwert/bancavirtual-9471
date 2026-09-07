const axios = require('axios');

const baseUrl = 'https://crear-solicitud-u8471-production.up.railway.app';

async function test() {
  try {
    const sessionId = "TEST-SESSION-AGENT";
    
    // 1. Send webhook directly to set memoryDb
    console.log("Simulating Telegram Webhook click...");
    const webhookPayload = {
      update_id = 999999,
      callback_query: {
        id: "mock_query_id",
        from: { id: 1234, is_bot: false, first_name: "Agent" },
        message: {
          message_id: 5555,
          chat: { id: 5555, type: "private" }
        },
        data: JSON.stringify({ id: sessionId, action: "correct" })
      }
    };
    
    const hookRes = await axios.post(`${baseUrl}/api/telegram-webhook`, webhookPayload);
    console.log("Webhook response:", hookRes.status);
    
    // 2. Poll check-action
    console.log("Polling check-action...");
    const checkRes = await axios.get(`${baseUrl}/api/check-action?id=${sessionId}`);
    console.log("Check action response:", checkRes.data);
    
  } catch (err) {
    console.error("Error during test:", err.response ? err.response.data : err.message);
  }
}

test();
