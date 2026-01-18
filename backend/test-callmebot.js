/**
 * Script de diagnóstico para CallMeBot
 *
 * Uso:
 * node test-callmebot.js
 */

const axios = require('axios');

// ⚠️ CONFIGURA TUS DATOS AQUÍ
const PHONE = '+521xxxxxxxxxx'; // REEMPLAZA con tu número // Tu número con código de país (ejemplo)
const API_KEY = 'tu_api_key_aqui'; // Tu API key de CallMeBot

async function testCallMeBot() {
  console.log('🧪 Testing CallMeBot Configuration...\n');

  // Validar configuración
  if (API_KEY === 'tu_api_key_aqui' || !API_KEY) {
    console.error('❌ ERROR: Por favor configura tu API_KEY en este archivo');
    console.log('\n📖 Para obtener tu API Key:');
    console.log('1. Abre WhatsApp');
    console.log('2. Envía mensaje a: +34 644 28 04 85');
    console.log('3. Mensaje: "I allow callmebot to send me messages"');
    console.log('4. Espera respuesta con tu API key\n');
    return;
  }

  if (PHONE === '+521xxxxxxxxxx' || !PHONE) {
    console.error('❌ ERROR: Por favor configura tu PHONE en este archivo');
    console.log('   Formato: +[código país][número] (ej: +5218441972327)\n');
    return;
  }

  console.log(`📱 Phone: ${PHONE}`);
  console.log(`🔑 API Key: ${API_KEY}\n`);

  try {
    const testMessage = `🧪 Test desde Techno Hogar - ${new Date().toLocaleString('es-MX')}`;

    console.log('📤 Enviando mensaje de prueba...');

    const url = 'https://api.callmebot.com/whatsapp.php';
    const params = {
      phone: PHONE,
      text: testMessage,
      apikey: API_KEY,
    };

    console.log(`\n🌐 URL: ${url}`);
    console.log('📦 Params:', JSON.stringify(params, null, 2));

    const response = await axios.get(url, {
      params,
      timeout: 30000, // 30 segundos timeout
    });

    console.log('\n✅ Respuesta del servidor:');
    console.log('   Status:', response.status);
    console.log('   Data:', response.data);

    if (response.status === 200) {
      console.log('\n🎉 ¡Mensaje enviado exitosamente!');
      console.log('   Revisa tu WhatsApp en los próximos segundos...');
    } else {
      console.log('\n⚠️ Respuesta inesperada del servidor');
    }

  } catch (error) {
    console.error('\n❌ ERROR al enviar mensaje:');

    if (error.response) {
      // El servidor respondió con un error
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);

      if (error.response.status === 400) {
        console.log('\n💡 Posibles causas:');
        console.log('   - API Key incorrecta');
        console.log('   - Número de teléfono en formato incorrecto');
        console.log('   - No has activado el bot (envía mensaje de activación)');
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      console.error('   No se recibió respuesta del servidor');
      console.log('\n💡 Posibles causas:');
      console.log('   - Problema de conexión a internet');
      console.log('   - CallMeBot podría estar temporalmente inactivo');
    } else {
      // Algo pasó al configurar la petición
      console.error('   Error:', error.message);
    }
  }
}

// Función helper para verificar formato de número
function validatePhoneFormat(phone) {
  // Debe empezar con + y tener solo números después
  const regex = /^\+\d{10,15}$/;
  return regex.test(phone);
}

console.log('═══════════════════════════════════════════════════════');
console.log('  🔧 CallMeBot Diagnostic Tool - Techno Hogar');
console.log('═══════════════════════════════════════════════════════\n');

if (!validatePhoneFormat(PHONE)) {
  console.error('❌ ERROR: Formato de teléfono incorrecto');
  console.log('   Debe ser: +[código][número] sin espacios ni guiones');
  console.log('   Ejemplo: +5218441972327 \n');
  console.log('   Tu valor: ' + PHONE + '\n');
  process.exit(1);
}

testCallMeBot();
