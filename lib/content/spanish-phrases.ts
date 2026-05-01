import type { ContentItem } from './types'

const p = (
  id: string,
  spanish: string,
  english: string,
  topic: string,
  register: ContentItem['register'],
  difficulty: ContentItem['difficulty'],
  notes?: string
): ContentItem => ({
  id: `phrase:${topic}:${id}`,
  type: 'phrase',
  language: 'spanish',
  spanish,
  english,
  audioUrl: '',
  topic,
  register,
  difficulty,
  notes,
})

export const spanishPhrases: ContentItem[] = [
  p('me-llamo', 'me llamo Elisa', 'my name is Elisa', 'social', 'both', 1),
  p('como-esta', '¿cómo está?', 'how are you? (formal)', 'social', 'formal', 1, 'usted form.'),
  p('como-estas', '¿cómo estás?', 'how are you? (informal)', 'social', 'informal', 1),
  p('estoy-bien', 'estoy bien, gracias', "I'm well, thanks", 'social', 'both', 1),
  p('mucho-gusto', 'mucho gusto', 'pleased to meet you', 'social', 'both', 1),
  p('soy-de', 'soy de Los Ángeles', "I'm from Los Angeles", 'social', 'both', 1),
  p('hablo-poco', 'hablo un poco de español', 'I speak a little Spanish', 'social', 'both', 1),
  p('puede-ayudarme', '¿puede ayudarme?', 'can you help me? (formal)', 'social', 'formal', 1),
  p('puede-repetir', '¿puede repetir, por favor?', 'can you repeat, please?', 'social', 'formal', 1),
  p('mas-despacio', 'más despacio, por favor', 'more slowly, please', 'social', 'both', 1),

  p('mesa-para-dos', 'una mesa para dos, por favor', 'a table for two, please', 'restaurant', 'formal', 1),
  p('tienen-reserva', '¿tienen una reserva?', 'do you have a reservation?', 'restaurant', 'formal', 2, "What you'll hear from waiters."),
  p('quisiera', 'quisiera...', 'I would like...', 'restaurant', 'both', 1, 'More polite than "quiero".'),
  p('para-mi', 'para mí...', 'for me...', 'restaurant', 'both', 1),
  p('que-recomienda', '¿qué recomienda?', 'what do you recommend?', 'restaurant', 'formal', 2),
  p('estaba-delicioso', 'estaba delicioso', 'it was delicious', 'restaurant', 'both', 2),
  p('la-cuenta-por-favor', 'la cuenta, por favor', 'the check, please', 'restaurant', 'formal', 1),
  p('soy-alergica-spanish', 'soy alérgica a las nueces', "I'm allergic to nuts (f)", 'restaurant', 'both', 1, 'Replace nueces with: cacahuetes (peanuts), mariscos (shellfish), lácteos (dairy), gluten (gluten).'),

  p('tengo-una-reserva', 'tengo una reserva a nombre de Fazzari', 'I have a reservation under Fazzari', 'hotel', 'formal', 1),
  p('a-que-hora-desayuno', '¿a qué hora es el desayuno?', 'what time is breakfast?', 'hotel', 'formal', 1),
  p('esta-incluido', '¿está incluido el desayuno?', 'is breakfast included?', 'hotel', 'formal', 2),
  p('hasta-que-hora', '¿hasta qué hora se puede hacer check-out?', 'until what time is check-out?', 'hotel', 'formal', 2),
  p('no-hay-agua-caliente', 'no hay agua caliente', 'there is no hot water', 'hotel', 'formal', 2),

  p('un-billete-para', 'un billete para Madrid, por favor', 'a ticket to Madrid, please', 'transport', 'formal', 1),
  p('a-que-hora-sale', '¿a qué hora sale el próximo tren?', 'what time does the next train leave?', 'transport', 'formal', 1),
  p('cuanto-tiempo', '¿cuánto tiempo se tarda?', 'how long does it take?', 'transport', 'both', 1),
  p('a-la-estacion', 'a la estación, por favor', 'to the station, please', 'transport', 'formal', 1),
  p('al-aeropuerto', 'al aeropuerto, por favor', 'to the airport, please', 'transport', 'formal', 1),

  p('disculpe-donde', '¿disculpe, dónde está la catedral?', 'excuse me, where is the cathedral?', 'directions', 'formal', 1),
  p('como-llego', '¿cómo llego al museo?', 'how do I get to the museum?', 'directions', 'formal', 2),
  p('esta-lejos', '¿está lejos de aquí?', 'is it far from here?', 'directions', 'both', 1),
  p('me-he-perdido', 'me he perdido', "I'm lost", 'directions', 'both', 2),

  p('cuanto-cuesta-esto', '¿cuánto cuesta esto?', 'how much does this cost?', 'shopping', 'both', 1),
  p('solo-estoy-mirando', 'solo estoy mirando, gracias', "I'm just looking, thanks", 'shopping', 'both', 1),
  p('puedo-pagar-tarjeta', '¿puedo pagar con tarjeta?', 'can I pay by card?', 'shopping', 'formal', 1),
  p('es-muy-caro', 'es muy caro', "it's too expensive", 'shopping', 'both', 1),

  p('a-que-hora-cierra', '¿a qué hora cierra?', 'what time does it close?', 'general', 'both', 1),
  p('me-gusta', 'me gusta mucho', 'I like it a lot', 'general', 'both', 1),
  p('no-me-gusta', 'no me gusta', "I don't like it", 'general', 'both', 1),
  p('que-bonito', '¡qué bonito!', 'how nice / beautiful!', 'general', 'both', 1),

  p('socorro', '¡socorro!', 'help! (emergency)', 'emergency', 'both', 1, 'Stronger than ayuda — for true emergencies.'),
  p('llame-policia', '¡llame a la policía!', 'call the police!', 'emergency', 'formal', 1),
  p('llame-ambulancia', '¡llame una ambulancia!', 'call an ambulance!', 'emergency', 'formal', 1),
  p('me-han-robado', 'me han robado', 'I have been robbed', 'emergency', 'both', 2),
  p('he-perdido-pasaporte', 'he perdido el pasaporte', 'I lost my passport', 'emergency', 'both', 1),
]
