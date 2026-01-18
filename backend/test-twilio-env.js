/**
 * Script de diagnóstico para Twilio WhatsApp (lee de .env)
 *
 * Uso:
 * docker exec techno-hogar-backend node test-twilio-env.js
 */

require('dotenv').config();
const axios = require('axios');

async function testTwilio() {
  console.log('🧪 Testing Twilio WhatsApp Configuration (from .env)...\n');

  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;
  const YOUR_WHATSAPP_NUMBER = process.env.WHATSAPP_ADMIN_PHONE;

  // Validar configuración
  if (!TWILIO_ACCOUNT_SID || TWILIO_ACCOUNT_SID === 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    console.error('❌ ERROR: TWILIO_ACCOUNT_SID no está configurado en .env\n');
    console.log('📖 Para obtener tus credenciales:');
    console.log('1. Ve a: https://console.twilio.com');
    console.log('2. En el Dashboard verás:');
    console.log('   - Account SID');
    console.log('   - Auth Token (Click en "Show" para verlo)');
    console.log('3. Agrégalos a backend/.env\n');
    return;
  }

  if (!TWILIO_AUTH_TOKEN || TWILIO_AUTH_TOKEN === 'tu_auth_token_aqui') {
    console.error('❌ ERROR: TWILIO_AUTH_TOKEN no está configurado en .env\n');
    return;
  }

  if (!TWILIO_WHATSAPP_NUMBER) {
    console.error('❌ ERROR: TWILIO_WHATSAPP_NUMBER no está configurado en .env\n');
    console.log('Debe ser algo como: whatsapp:+14155238886\n');
    return;
  }

  if (!YOUR_WHATSAPP_NUMBER) {
    console.error('❌ ERROR: WHATSAPP_ADMIN_PHONE no está configurado en .env\n');
    console.log('Debe ser algo como: whatsapp:+5218441972327\n');
    return;
  }

  console.log(`🔑 Account SID: ${TWILIO_ACCOUNT_SID}`);
  console.log(`📱 From: ${TWILIO_WHATSAPP_NUMBER}`);
  console.log(`📱 To: ${YOUR_WHATSAPP_NUMBER}\n`);

  try {
    const testMessage = `🧪 Test desde Techno Hogar - ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}

¡Twilio está funcionando correctamente! ✅

Este es un mensaje de prueba automático.`;

    console.log('📤 Enviando mensaje de prueba...\n');

    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: TWILIO_WHATSAPP_NUMBER,
        To: YOUR_WHATSAPP_NUMBER,
        Body: testMessage,
      }),
      {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('✅ Respuesta de Twilio:');
    console.log('   Message SID:', response.data.sid);
    console.log('   Status:', response.data.status);
    console.log('   From:', response.data.from);
    console.log('   To:', response.data.to);
    console.log('   Price:', response.data.price || '0.00', response.data.price_unit || 'USD');

    console.log('\n🎉 ¡Mensaje enviado exitosamente!');
    console.log('   Revisa tu WhatsApp en los próximos segundos...\n');

  } catch (error) {
    console.error('\n❌ ERROR al enviar mensaje:');

    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Error Code:', error.response.data.code);
      console.error('   Message:', error.response.data.message);

      if (error.response.status === 401) {
        console.log('\n💡 Error de autenticación:');
        console.log('   - Verifica que Account SID y Auth Token sean correctos en .env');
        console.log('   - Asegúrate de no tener espacios extra al copiarlos');
      } else if (error.response.status === 400) {
        console.log('\n💡 Posibles causas:');
        console.log('   - El número destino no está registrado en WhatsApp');
        console.log('   - No has activado el Twilio Sandbox');
        console.log('   - Formato incorrecto del número (debe incluir "whatsapp:")');
      } else if (error.response.data.code === 21608) {
        console.log('\n💡 Error de Sandbox:');
        console.log('   1. Ve a: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn');
        console.log('   2. Sigue las instrucciones para activar tu número');
        console.log('   3. Envía el mensaje desde tu WhatsApp al número de Twilio');
        console.log('   4. Espera confirmación antes de intentar de nuevo');
      }
    } else if (error.request) {
      console.error('   No se recibió respuesta del servidor');
      console.log('\n💡 Posibles causas:');
      console.log('   - Problema de conexión a internet');
      console.log('   - Firewall bloqueando la conexión');
    } else {
      console.error('   Error:', error.message);
    }
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log('  🔧 Twilio WhatsApp Diagnostic Tool - Techno Hogar');
console.log('  (Reads configuration from .env file)');
console.log('═══════════════════════════════════════════════════════\n');

testTwilio();
