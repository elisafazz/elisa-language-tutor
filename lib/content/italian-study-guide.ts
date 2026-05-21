export type GuidePhrase = {
  italian: string
  english: string
  note?: string
}

export type VerbConjugation = {
  verb: string
  english: string
  rows: [string, string][]
  note?: string
}

export type PastVerb = {
  verb: string
  participle: string
  english: string
  auxiliary: 'avere' | 'essere'
  rows: [string, string][]
  note?: string
}

export type DialogueLine = {
  speaker: 'you' | 'them'
  speakerLabel?: string
  italian: string
  english: string
}

export type GrammarNote = {
  feature: string
  explanation: string
}

export type ExampleScenario = {
  id: string
  title: string
  italianTitle: string
  setting: string
  dialogue: DialogueLine[]
  grammarNotes: GrammarNote[]
  heritageTip?: string
}

export type GuideSection =
  | { type: 'phrases'; id: string; title: string; subtitle?: string; phrases: GuidePhrase[] }
  | { type: 'verbs'; id: string; title: string; subtitle?: string; verbs: VerbConjugation[] }
  | { type: 'past'; id: string; title: string; subtitle?: string; pastVerbs: PastVerb[]; travelPhrases: GuidePhrase[] }
  | { type: 'possessives'; id: string; title: string; subtitle?: string }
  | { type: 'combinations'; id: string; title: string; subtitle?: string; phrases: GuidePhrase[] }
  | { type: 'numbers'; id: string; title: string; subtitle?: string }
  | { type: 'example-scenarios'; id: string; title: string; subtitle?: string; scenarios: ExampleScenario[] }

// ─── SCENARIOS ────────────────────────────────────────────────────────────────

const rentalCar: GuidePhrase[] = [
  { italian: 'Ho una prenotazione a nome di Fazzari.', english: 'I have a reservation under Fazzari.' },
  { italian: 'Ecco la mia patente.', english: 'Here is my driver\'s license.' },
  { italian: 'Ecco la mia carta di credito.', english: 'Here is my credit card.' },
  { italian: 'Vorrei l\'assicurazione completa.', english: 'I\'d like full coverage insurance.' },
  { italian: 'È automatica?', english: 'Is it automatic?', note: 'Automatics are rare in Italy — ask before assuming.' },
  { italian: 'Il serbatoio è pieno?', english: 'Is the tank full?' },
  { italian: 'Devo riconsegnare la macchina con il pieno?', english: 'Do I need to return it with a full tank?' },
  { italian: 'Fa benzina o diesel?', english: 'Does it take gas or diesel?', note: 'Diesel = gasolio. Many Italian rental cars are diesel.' },
  { italian: 'C\'è qualche graffio o ammaccatura?', english: 'Are there any scratches or dents?' },
  { italian: 'Potete segnarlo sulla scheda?', english: 'Can you note it on the form?' },
  { italian: 'Dov\'è la macchina?', english: 'Where is the car?' },
  { italian: 'Come funziona il navigatore?', english: 'How does the GPS work?' },
  { italian: 'Come si apre il bagagliaio?', english: 'How do you open the trunk?' },
  { italian: 'Dov\'è la restituzione auto?', english: 'Where is the car return?' },
  { italian: 'A che ora devo riconsegnare la macchina?', english: 'What time do I need to return the car?' },
  { italian: 'Posso riconsegnare la macchina in un\'altra città?', english: 'Can I return the car in another city?' },
  { italian: 'Dove si paga il pedaggio?', english: 'Where do you pay the toll?', note: 'Autostrada tolls are common. Telepass lanes are for subscribers only.' },
  { italian: 'Ho una gomma a terra.', english: 'I have a flat tire.' },
  { italian: 'La macchina non si avvia.', english: 'The car won\'t start.' },
  { italian: 'Ho avuto un incidente.', english: 'I was in an accident.' },
  { italian: 'Dov\'è il numero per l\'assistenza stradale?', english: 'Where is the roadside assistance number?' },
  { italian: 'Posso parcheggiare qui?', english: 'Can I park here?' },
  { italian: 'C\'è un parcheggio nelle vicinanze?', english: 'Is there a parking lot nearby?' },
  { italian: 'Zona a traffico limitato.', english: 'Limited traffic zone (ZTL).', note: 'ZTL = Zona Traffico Limitato. Cameras fine you automatically. Ask the hotel if your car is exempt.' },
]

const hotelCheckin: GuidePhrase[] = [
  { italian: 'Ho una prenotazione a nome di Fazzari.', english: 'I have a reservation under Fazzari.' },
  { italian: 'Rimango per tre settimane.', english: 'I\'m staying for three weeks.' },
  { italian: 'Rimango fino al cinque giugno.', english: 'I\'m staying until June 5th.' },
  { italian: 'Siamo in due.', english: 'There are two of us.' },
  { italian: 'Avete una camera matrimoniale?', english: 'Do you have a double bed room?', note: 'Matrimoniale = one large bed. Due letti singoli = two single beds.' },
  { italian: 'Avete una camera con vista?', english: 'Do you have a room with a view?' },
  { italian: 'A che piano siamo?', english: 'What floor are we on?' },
  { italian: 'C\'è un ascensore?', english: 'Is there an elevator?' },
  { italian: 'La colazione è inclusa?', english: 'Is breakfast included?' },
  { italian: 'A che ora è la colazione?', english: 'What time is breakfast?' },
  { italian: 'Qual è il codice del Wi-Fi?', english: 'What is the WiFi password?' },
  { italian: 'A che ora è il check-out?', english: 'What time is check-out?' },
  { italian: 'C\'è il parcheggio?', english: 'Is there parking?', note: 'Ask if it\'s covered (coperto) and if there\'s a charge (a pagamento).' },
  { italian: 'Posso lasciare i bagagli qui prima del check-in?', english: 'Can I leave my luggage here before check-in?' },
  { italian: 'Posso lasciare i bagagli dopo il check-out?', english: 'Can I leave my luggage after check-out?' },
  { italian: 'La stanza è pronta?', english: 'Is the room ready?' },
  { italian: 'Potete chiamarmi un taxi?', english: 'Can you call me a taxi?' },
  { italian: 'C\'è una cassaforte in camera?', english: 'Is there a safe in the room?' },
  { italian: 'Avete un minibar?', english: 'Do you have a minibar?' },
  { italian: 'Dov\'è il ristorante dell\'hotel?', english: 'Where is the hotel restaurant?' },
  { italian: 'A che ora chiude il ristorante?', english: 'What time does the restaurant close?' },
  { italian: 'C\'è la piscina? La palestra?', english: 'Is there a pool? A gym?' },
]

const hotelRequests: GuidePhrase[] = [
  { italian: 'Potete portarmi degli asciugamani in più?', english: 'Can you bring me extra towels?' },
  { italian: 'Ho bisogno di cuscini in più.', english: 'I need extra pillows.' },
  { italian: 'Ho bisogno di una coperta in più.', english: 'I need an extra blanket.' },
  { italian: 'L\'aria condizionata non funziona.', english: 'The air conditioning isn\'t working.' },
  { italian: 'Il riscaldamento non funziona.', english: 'The heating isn\'t working.' },
  { italian: 'Il rubinetto perde.', english: 'The faucet is dripping.' },
  { italian: 'Non c\'è acqua calda.', english: 'There\'s no hot water.' },
  { italian: 'La luce non funziona.', english: 'The light isn\'t working.' },
  { italian: 'Il televisore non funziona.', english: 'The TV isn\'t working.' },
  { italian: 'C\'è molto rumore dalla camera vicina.', english: 'There\'s a lot of noise from the next room.' },
  { italian: 'Potete pulire la camera?', english: 'Can you clean the room?' },
  { italian: 'Non disturbare, per favore.', english: 'Do not disturb, please.' },
  { italian: 'Potrei avere il check-out posticipato?', english: 'Can I have a late check-out?', note: 'They may charge extra — ask "è gratuito?" (is it free?)' },
  { italian: 'Potete svegliarmi alle sette?', english: 'Can you give me a wake-up call at seven?' },
  { italian: 'C\'è il servizio in camera?', english: 'Is there room service?' },
  { italian: 'Fino a che ora fa il room service?', english: 'Until what time is room service?' },
  { italian: 'Vorrei ordinare qualcosa da mangiare in camera.', english: 'I\'d like to order something to eat in the room.' },
  { italian: 'Potete tenere i miei bagagli?', english: 'Can you hold my luggage?' },
  { italian: 'Avete un ferro da stiro?', english: 'Do you have an iron?' },
  { italian: 'C\'è una lavanderia nelle vicinanze?', english: 'Is there a laundromat nearby?' },
]

const gettingSeated: GuidePhrase[] = [
  { italian: 'Un tavolo per due, per favore.', english: 'A table for two, please.' },
  { italian: 'Un tavolo per tre, per favore.', english: 'A table for three, please.' },
  { italian: 'Avete un tavolo libero?', english: 'Do you have a free table?' },
  { italian: 'Ho prenotato un tavolo a nome di Fazzari.', english: 'I have a table reserved under Fazzari.' },
  { italian: 'Ho prenotato per le otto.', english: 'I have a reservation for 8 o\'clock.', note: '20:00 in 24-hour time = le venti.' },
  { italian: 'Non ho prenotato.', english: 'I don\'t have a reservation.' },
  { italian: 'Quanto dobbiamo aspettare?', english: 'How long do we have to wait?' },
  { italian: 'Possiamo sederci fuori?', english: 'Can we sit outside?' },
  { italian: 'Possiamo sederci dentro?', english: 'Can we sit inside?' },
  { italian: 'Possiamo sederci lì?', english: 'Can we sit there?' },
  { italian: 'Avete un tavolino per bambini?', english: 'Do you have a high chair?', note: 'If needed.' },
  { italian: 'Torneremo tra venti minuti.', english: 'We\'ll come back in twenty minutes.' },
]

const ordering: GuidePhrase[] = [
  { italian: 'Avete il menu in inglese? Per lei.', english: 'Do you have a menu in English? For her.', note: 'Per lei = for her. Per lui = for him.' },
  { italian: 'Avete il menu del giorno?', english: 'Do you have today\'s special menu?', note: 'Often a fixed-price lunch — good value.' },
  { italian: 'Siamo pronti per ordinare.', english: 'We are ready to order.' },
  { italian: 'Cosa ci consiglia?', english: 'What do you recommend?', note: 'Locals trust this. Waiters usually name one or two things genuinely.' },
  { italian: 'Qual è il piatto tipico?', english: 'What is the typical dish here?' },
  { italian: 'Vorrei...', english: 'I would like...', note: 'More polite than voglio. Always use this when ordering.' },
  { italian: 'Per me...', english: 'For me...' },
  { italian: 'Per lei...', english: 'For her...' },
  { italian: 'Per lui...', english: 'For him...' },
  { italian: 'Per noi due...', english: 'For both of us...' },
  { italian: 'Come primo...', english: 'For the first course...' },
  { italian: 'Come secondo...', english: 'For the second course...' },
  { italian: 'Possiamo avere l\'acqua del rubinetto?', english: 'Can we have tap water?', note: 'Tap water (acqua del rubinetto) is free. They may push bottled — you can politely decline.' },
  { italian: 'Un\'acqua naturale, per favore.', english: 'A still water, please.' },
  { italian: 'Un\'acqua frizzante, per favore.', english: 'A sparkling water, please.' },
  { italian: 'Una bottiglia di vino rosso / bianco.', english: 'A bottle of red / white wine.' },
  { italian: 'Il vino della casa, per favore.', english: 'The house wine, please.' },
  { italian: 'Mezzo litro di vino rosso.', english: 'Half a liter of red wine.' },
  { italian: 'Un quarto di vino bianco.', english: 'A quarter liter of white wine.' },
  { italian: 'Cosa c\'è dentro?', english: 'What\'s in it?' },
  { italian: 'È piccante?', english: 'Is it spicy?' },
  { italian: 'È di stagione?', english: 'Is it in season?', note: 'Italians respect this question for vegetables and fish.' },
  { italian: 'Possiamo dividere?', english: 'Can we share?' },
  { italian: 'Sono allergica a...', english: 'I\'m allergic to...', note: 'Replace with: noci (nuts), arachidi (peanuts), crostacei (shellfish), latticini (dairy), glutine (gluten).' },
  { italian: 'Non mangio carne.', english: 'I don\'t eat meat.' },
  { italian: 'Non mangio pesce.', english: 'I don\'t eat fish.' },
  { italian: 'Non mangio latticini.', english: 'I don\'t eat dairy.' },
  { italian: 'Sono celiaca.', english: 'I\'m celiac (gluten intolerant). (f)', note: 'Celiaco = m. Celiaca = f.' },
  { italian: 'A lei non piace il pesce.', english: 'She doesn\'t like fish.' },
  { italian: 'Non le piacciono i funghi.', english: 'She doesn\'t like mushrooms.', note: 'piacciono (not piace) because mushrooms are plural.' },
  { italian: 'Non ci piace...', english: 'We don\'t like...' },
  { italian: 'Ancora un po\', per favore.', english: 'A little more, please.' },
  { italian: 'Basta così, grazie.', english: 'That\'s enough, thank you.' },
]

const paying: GuidePhrase[] = [
  { italian: 'Il conto, per favore.', english: 'The check, please.' },
  { italian: 'Conti separati, per favore.', english: 'Separate checks, please.', note: 'Less common in Italy — they may resist or look confused. Worth asking anyway.' },
  { italian: 'Posso pagare con carta?', english: 'Can I pay by card?' },
  { italian: 'Accettate carte di credito?', english: 'Do you accept credit cards?' },
  { italian: 'C\'è un errore nel conto.', english: 'There is a mistake in the bill.' },
  { italian: 'Cos\'è questa voce?', english: 'What is this item?' },
  { italian: 'Il coperto è incluso?', english: 'Is the cover charge included?', note: 'Coperto = fixed per-person cover charge, common in Italy.' },
  { italian: 'Tenga il resto.', english: 'Keep the change.', note: 'Tipping is minimal in Italy. Rounding up or saying this is plenty.' },
  { italian: 'Era squisito.', english: 'It was delicious.' },
  { italian: 'Era ottimo.', english: 'It was excellent.' },
  { italian: 'I complimenti al cuoco.', english: 'Compliments to the chef.' },
]

const gettingAround: GuidePhrase[] = [
  { italian: 'Dov\'è...?', english: 'Where is...?' },
  { italian: 'Come si arriva a...?', english: 'How do you get to...?' },
  { italian: 'Giri a destra.', english: 'Turn right.' },
  { italian: 'Giri a sinistra.', english: 'Turn left.' },
  { italian: 'Vada dritto.', english: 'Go straight.' },
  { italian: 'È lontano?', english: 'Is it far?' },
  { italian: 'Quanto tempo ci vuole?', english: 'How long does it take?' },
  { italian: 'A piedi / in macchina / in treno.', english: 'On foot / by car / by train.' },
  { italian: 'La prima / seconda strada a destra.', english: 'First / second street on the right.' },
  { italian: 'Al semaforo, giri a sinistra.', english: 'At the traffic light, turn left.' },
  { italian: 'All\'incrocio.', english: 'At the intersection.' },
  { italian: 'Dopo il ponte.', english: 'After the bridge.' },
  { italian: 'Di fronte a / accanto a / dietro.', english: 'In front of / next to / behind.' },
  { italian: 'Un biglietto per..., per favore.', english: 'A ticket to..., please.' },
  { italian: 'A che ora parte il prossimo treno per...?', english: 'What time does the next train to... leave?' },
  { italian: 'Da quale binario?', english: 'From which platform?' },
  { italian: 'Vorrei un taxi, per favore.', english: 'I\'d like a taxi, please.' },
  { italian: 'Mi porti a questo indirizzo.', english: 'Take me to this address.' },
]

const survival: GuidePhrase[] = [
  { italian: 'Buongiorno.', english: 'Good morning / Good day.', note: 'Use until mid-afternoon.' },
  { italian: 'Buonasera.', english: 'Good evening.' },
  { italian: 'Ciao.', english: 'Hi / Bye.', note: 'Informal only. Use buongiorno/buonasera with strangers.' },
  { italian: 'Arrivederci.', english: 'Goodbye (formal).' },
  { italian: 'Per favore.', english: 'Please.' },
  { italian: 'Grazie.', english: 'Thank you.' },
  { italian: 'Grazie mille.', english: 'Thank you very much.' },
  { italian: 'Prego.', english: 'You\'re welcome / Please / After you.', note: 'Context-dependent — also used to invite someone to proceed.' },
  { italian: 'Mi scusi.', english: 'Excuse me (formal).', note: 'Use this to get attention or apologize.' },
  { italian: 'Permesso.', english: 'Excuse me / May I pass.', note: 'Use when physically moving past someone.' },
  { italian: 'Mi dispiace.', english: 'I\'m sorry.' },
  { italian: 'Non capisco.', english: 'I don\'t understand.' },
  { italian: 'Non parlo bene l\'italiano.', english: 'I don\'t speak Italian well.' },
  { italian: 'Sono di origini italiane — capisco un po\'.', english: 'I\'m of Italian descent — I understand a little.', note: 'A good icebreaker. Italians love this.' },
  { italian: 'Parla inglese?', english: 'Do you speak English?', note: 'Use as a last resort — try Italian first.' },
  { italian: 'Può parlare più lentamente, per favore?', english: 'Can you speak more slowly, please?' },
  { italian: 'Può ripetere, per favore?', english: 'Can you repeat that, please?' },
  { italian: 'Può scriverlo, per favore?', english: 'Can you write it down, please?' },
  { italian: 'Come si dice... in italiano?', english: 'How do you say... in Italian?' },
  { italian: 'Cosa significa...?', english: 'What does... mean?' },
  { italian: 'Ho bisogno di aiuto.', english: 'I need help.' },
  { italian: 'Può aiutarmi?', english: 'Can you help me? (formal)' },
  { italian: 'Dove sono i bagni?', english: 'Where are the bathrooms?' },
  { italian: 'C\'è una farmacia qui vicino?', english: 'Is there a pharmacy nearby?' },
  { italian: 'Chiami un medico, per favore.', english: 'Call a doctor, please.' },
  { italian: 'Chiami la polizia, per favore.', english: 'Call the police, please.' },
  { italian: 'Mi hanno rubato il portafoglio.', english: 'My wallet was stolen.' },
  { italian: 'Ho perso il passaporto.', english: 'I\'ve lost my passport.' },
]

// ─── PRESENT TENSE VERBS ──────────────────────────────────────────────────────

const presentVerbs: VerbConjugation[] = [
  {
    verb: 'avere', english: 'to have',
    rows: [['io', 'ho'], ['tu', 'hai'], ['lui / lei', 'ha'], ['noi', 'abbiamo'], ['voi', 'avete'], ['loro', 'hanno']],
    note: 'Also used in expressions: ho fame (I\'m hungry), ho sete (I\'m thirsty), ho caldo/freddo (I\'m hot/cold), ho paura (I\'m scared).',
  },
  {
    verb: 'essere', english: 'to be',
    rows: [['io', 'sono'], ['tu', 'sei'], ['lui / lei', 'è'], ['noi', 'siamo'], ['voi', 'siete'], ['loro', 'sono']],
    note: 'Two forms of "are" in Italian: sono for io and loro — context distinguishes them.',
  },
  {
    verb: 'volere', english: 'to want',
    rows: [['io', 'voglio'], ['tu', 'vuoi'], ['lui / lei', 'vuole'], ['noi', 'vogliamo'], ['voi', 'volete'], ['loro', 'vogliono']],
    note: 'Voglio sounds blunt — soften by using vorrei (I would like) when ordering or requesting.',
  },
  {
    verb: 'dovere', english: 'must / to have to',
    rows: [['io', 'devo'], ['tu', 'devi'], ['lui / lei', 'deve'], ['noi', 'dobbiamo'], ['voi', 'dovete'], ['loro', 'devono']],
  },
  {
    verb: 'potere', english: 'can / to be able to',
    rows: [['io', 'posso'], ['tu', 'puoi'], ['lui / lei', 'può'], ['noi', 'possiamo'], ['voi', 'potete'], ['loro', 'possono']],
  },
  {
    verb: 'piacere', english: 'to like (special construction)',
    rows: [['mi', 'piace / piacciono'], ['ti', 'piace / piacciono'], ['gli / le', 'piace / piacciono'], ['ci', 'piace / piacciono'], ['vi', 'piace / piacciono'], ['loro', 'piace / piacciono']],
    note: 'piace = for singular things. piacciono = for plural things. The subject is what you like, not you. "Mi piace il vino" = the wine pleases me. "Non le piacciono i funghi" = mushrooms don\'t please her.',
  },
  {
    verb: 'andare', english: 'to go',
    rows: [['io', 'vado'], ['tu', 'vai'], ['lui / lei', 'va'], ['noi', 'andiamo'], ['voi', 'andate'], ['loro', 'vanno']],
  },
  {
    verb: 'stare', english: 'to stay / to be (condition)',
    rows: [['io', 'sto'], ['tu', 'stai'], ['lui / lei', 'sta'], ['noi', 'stiamo'], ['voi', 'state'], ['loro', 'stanno']],
    note: 'Stare = temporary condition or location. "Come stai?" = How are you? (how\'s your condition). "Sto bene" = I\'m well.',
  },
  {
    verb: 'fare', english: 'to do / to make',
    rows: [['io', 'faccio'], ['tu', 'fai'], ['lui / lei', 'fa'], ['noi', 'facciamo'], ['voi', 'fate'], ['loro', 'fanno']],
    note: 'Fa freddo / fa caldo = it\'s cold / hot (weather). Fare colazione = to have breakfast.',
  },
  {
    verb: 'venire', english: 'to come',
    rows: [['io', 'vengo'], ['tu', 'vieni'], ['lui / lei', 'viene'], ['noi', 'veniamo'], ['voi', 'venite'], ['loro', 'vengono']],
  },
  {
    verb: 'sapere', english: 'to know (a fact)',
    rows: [['io', 'so'], ['tu', 'sai'], ['lui / lei', 'sa'], ['noi', 'sappiamo'], ['voi', 'sapete'], ['loro', 'sanno']],
    note: 'Sapere = to know facts / information. Conoscere = to know people / places.',
  },
  {
    verb: 'rimanere', english: 'to stay / to remain',
    rows: [['io', 'rimango'], ['tu', 'rimani'], ['lui / lei', 'rimane'], ['noi', 'rimaniamo'], ['voi', 'rimanete'], ['loro', 'rimangono']],
    note: 'Rimango per tre settimane = I\'m staying for three weeks.',
  },
]

// ─── PAST TENSE ───────────────────────────────────────────────────────────────

const pastVerbs: PastVerb[] = [
  {
    verb: 'fare', participle: 'fatto', english: 'to do / make', auxiliary: 'avere',
    rows: [['io', 'ho fatto'], ['tu', 'hai fatto'], ['lui / lei', 'ha fatto'], ['noi', 'abbiamo fatto'], ['voi', 'avete fatto'], ['loro', 'hanno fatto']],
  },
  {
    verb: 'mangiare', participle: 'mangiato', english: 'to eat', auxiliary: 'avere',
    rows: [['io', 'ho mangiato'], ['tu', 'hai mangiato'], ['lui / lei', 'ha mangiato'], ['noi', 'abbiamo mangiato'], ['voi', 'avete mangiato'], ['loro', 'hanno mangiato']],
  },
  {
    verb: 'bere', participle: 'bevuto', english: 'to drink', auxiliary: 'avere',
    rows: [['io', 'ho bevuto'], ['tu', 'hai bevuto'], ['lui / lei', 'ha bevuto'], ['noi', 'abbiamo bevuto'], ['voi', 'avete bevuto'], ['loro', 'hanno bevuto']],
  },
  {
    verb: 'visitare', participle: 'visitato', english: 'to visit', auxiliary: 'avere',
    rows: [['io', 'ho visitato'], ['tu', 'hai visitato'], ['lui / lei', 'ha visitato'], ['noi', 'abbiamo visitato'], ['voi', 'avete visitato'], ['loro', 'hanno visitato']],
  },
  {
    verb: 'provare', participle: 'provato', english: 'to try', auxiliary: 'avere',
    rows: [['io', 'ho provato'], ['tu', 'hai provato'], ['lui / lei', 'ha provato'], ['noi', 'abbiamo provato'], ['voi', 'avete provato'], ['loro', 'hanno provato']],
  },
  {
    verb: 'finire', participle: 'finito', english: 'to finish', auxiliary: 'avere',
    rows: [['io', 'ho finito'], ['tu', 'hai finito'], ['lui / lei', 'ha finito'], ['noi', 'abbiamo finito'], ['voi', 'avete finito'], ['loro', 'hanno finito']],
  },
  {
    verb: 'prenotare', participle: 'prenotato', english: 'to reserve', auxiliary: 'avere',
    rows: [['io', 'ho prenotato'], ['tu', 'hai prenotato'], ['lui / lei', 'ha prenotato'], ['noi', 'abbiamo prenotato'], ['voi', 'avete prenotato'], ['loro', 'hanno prenotato']],
  },
  {
    verb: 'vedere', participle: 'visto', english: 'to see', auxiliary: 'avere',
    rows: [['io', 'ho visto'], ['tu', 'hai visto'], ['lui / lei', 'ha visto'], ['noi', 'abbiamo visto'], ['voi', 'avete visto'], ['loro', 'hanno visto']],
  },
  {
    verb: 'comprare', participle: 'comprato', english: 'to buy', auxiliary: 'avere',
    rows: [['io', 'ho comprato'], ['tu', 'hai comprato'], ['lui / lei', 'ha comprato'], ['noi', 'abbiamo comprato'], ['voi', 'avete comprato'], ['loro', 'hanno comprato']],
  },
  {
    verb: 'andare', participle: 'andato / andata', english: 'to go', auxiliary: 'essere',
    rows: [['io (m)', 'sono andato'], ['io (f)', 'sono andata'], ['tu (m)', 'sei andato'], ['tu (f)', 'sei andata'], ['lui', 'è andato'], ['lei', 'è andata'], ['noi (mixed/m)', 'siamo andati'], ['noi (f)', 'siamo andate'], ['loro (m)', 'sono andati'], ['loro (f)', 'sono andate']],
    note: 'Essere verbs require gender agreement on the participle. Elisa: sempre "andata, arrivata, partita, tornata" (female form).',
  },
  {
    verb: 'arrivare', participle: 'arrivato / arrivata', english: 'to arrive', auxiliary: 'essere',
    rows: [['io (f)', 'sono arrivata'], ['tu (m)', 'sei arrivato'], ['lei', 'è arrivata'], ['noi', 'siamo arrivati/e'], ['voi', 'siete arrivati/e'], ['loro', 'sono arrivati/e']],
  },
  {
    verb: 'partire', participle: 'partito / partita', english: 'to leave / depart', auxiliary: 'essere',
    rows: [['io (f)', 'sono partita'], ['tu (m)', 'sei partito'], ['lei', 'è partita'], ['noi', 'siamo partiti/e'], ['voi', 'siete partiti/e'], ['loro', 'sono partiti/e']],
  },
  {
    verb: 'tornare', participle: 'tornato / tornata', english: 'to return', auxiliary: 'essere',
    rows: [['io (f)', 'sono tornata'], ['tu (m)', 'sei tornato'], ['lei', 'è tornata'], ['noi', 'siamo tornati/e'], ['loro', 'sono tornati/e']],
  },
  {
    verb: 'venire', participle: 'venuto / venuta', english: 'to come', auxiliary: 'essere',
    rows: [['io (f)', 'sono venuta'], ['tu (m)', 'sei venuto'], ['lei', 'è venuta'], ['noi', 'siamo venuti/e'], ['loro', 'sono venuti/e']],
  },
]

const pastTravelPhrases: GuidePhrase[] = [
  { italian: 'Ho prenotato il tavolo per stasera.', english: 'I reserved the table for tonight.' },
  { italian: 'Siamo arrivati ieri sera.', english: 'We arrived yesterday evening.' },
  { italian: 'Abbiamo visitato il Colosseo stamattina.', english: 'We visited the Colosseum this morning.' },
  { italian: 'Ho provato il tiramisù — era fantastico.', english: 'I tried the tiramisù — it was fantastic.' },
  { italian: 'Abbiamo finito il vino.', english: 'We finished the wine.' },
  { italian: 'Ho mangiato troppo.', english: 'I ate too much.' },
  { italian: 'Abbiamo bevuto un ottimo vino.', english: 'We drank an excellent wine.' },
  { italian: 'Ho comprato dei souvenir.', english: 'I bought some souvenirs.' },
  { italian: 'Ho visto il tramonto da lassù — mozzafiato.', english: 'I saw the sunset from up there — breathtaking.' },
  { italian: 'Siamo andate a piedi fino al centro.', english: 'We walked all the way to the center. (f pl)' },
  { italian: 'Sono partita da Los Angeles tre giorni fa.', english: 'I left Los Angeles three days ago. (f)' },
  { italian: 'Sono tornata dall\'escursione stanchissima.', english: 'I came back from the excursion exhausted. (f)' },
]

// ─── COMBINATIONS ─────────────────────────────────────────────────────────────

const combinations: GuidePhrase[] = [
  { italian: 'Dobbiamo andare.', english: 'We have to go.' },
  { italian: 'Devo chiamare l\'hotel.', english: 'I have to call the hotel.' },
  { italian: 'Possiamo restare un altro giorno?', english: 'Can we stay one more day?' },
  { italian: 'Posso pagare con carta?', english: 'Can I pay by card?' },
  { italian: 'Vogliamo ordinare.', english: 'We want to order.' },
  { italian: 'Vuole dello zucchero?', english: 'Does she want some sugar?' },
  { italian: 'Mi piace questo vino.', english: 'I like this wine. (singular)', note: 'piace with singular noun' },
  { italian: 'Mi piacciono i funghi.', english: 'I like mushrooms. (plural)', note: 'piacciono with plural noun' },
  { italian: 'Non mi piace il pesce.', english: 'I don\'t like fish.' },
  { italian: 'Non le piacciono le olive.', english: 'She doesn\'t like olives.' },
  { italian: 'Non ci piace il rumore.', english: 'We don\'t like the noise.' },
  { italian: 'Non mangio mai carne.', english: 'I never eat meat.' },
  { italian: 'Non ho ancora mangiato.', english: 'I haven\'t eaten yet.' },
  { italian: 'Non voglio più vino.', english: 'I don\'t want any more wine.' },
  { italian: 'Non voglio niente, grazie.', english: 'I don\'t want anything, thanks.' },
  { italian: 'Ho bisogno di...', english: 'I need...', note: 'avere bisogno di + noun: ho bisogno di aiuto, ho bisogno di un dottore' },
  { italian: 'Abbiamo bisogno di...', english: 'We need...' },
  { italian: 'Mi serve un tavolo per due.', english: 'I need a table for two.', note: 'mi serve (singular) / mi servono (plural) — more direct than ho bisogno di' },
  { italian: 'Mi servono delle forchette.', english: 'I need some forks.' },
]

// ─── POSSESSIVES (rendered separately as a table component) ───────────────────
// The actual table is rendered in the page component. These are the travel examples.
export const possessiveExamples: GuidePhrase[] = [
  { italian: 'il mio passaporto / i miei passaporti', english: 'my passport / my passports' },
  { italian: 'la mia patente / le mie chiavi', english: 'my driver\'s license / my keys' },
  { italian: 'la mia prenotazione', english: 'my reservation' },
  { italian: 'la mia valigia / le mie valigie', english: 'my suitcase / my suitcases' },
  { italian: 'il tuo passaporto / i tuoi documenti', english: 'your passport / your documents' },
  { italian: 'la sua borsa', english: 'her bag', note: 'sua = his or her, context clarifies' },
  { italian: 'il suo passaporto', english: 'his / her passport' },
  { italian: 'la nostra camera', english: 'our hotel room' },
  { italian: 'la nostra prenotazione', english: 'our reservation' },
  { italian: 'i nostri passaporti', english: 'our passports' },
  { italian: 'le nostre valigie', english: 'our suitcases' },
  { italian: 'il nostro tavolo', english: 'our table' },
  { italian: 'i loro bagagli', english: 'their luggage' },
  { italian: 'la loro prenotazione', english: 'their reservation' },
  { italian: 'mia madre / mio padre', english: 'my mother / my father', note: 'Singular family members: NO article. mia madre (not la mia madre). BUT: i miei genitori (pl family = article).' },
  { italian: 'mia sorella / mio fratello', english: 'my sister / my brother', note: 'No article for singular family nouns.' },
  { italian: 'la mia amica / il mio amico', english: 'my friend (f) / my friend (m)', note: 'Friends are not family — keep the article.' },
]

export const possessiveTable = {
  headers: ['', 'masc. sing.', 'fem. sing.', 'masc. pl.', 'fem. pl.'],
  rows: [
    ['my', 'il mio', 'la mia', 'i miei', 'le mie'],
    ['your (tu)', 'il tuo', 'la tua', 'i tuoi', 'le tue'],
    ['his / her', 'il suo', 'la sua', 'i suoi', 'le sue'],
    ['our', 'il nostro', 'la nostra', 'i nostri', 'le nostre'],
    ['your (voi)', 'il vostro', 'la vostra', 'i vostri', 'le vostre'],
    ['their', 'il loro', 'la loro', 'i loro', 'le loro'],
  ],
}

// ─── NUMBERS & TIME ───────────────────────────────────────────────────────────

export const numbersData = {
  ones: [
    ['1', 'uno'], ['2', 'due'], ['3', 'tre'], ['4', 'quattro'], ['5', 'cinque'],
    ['6', 'sei'], ['7', 'sette'], ['8', 'otto'], ['9', 'nove'], ['10', 'dieci'],
    ['11', 'undici'], ['12', 'dodici'], ['13', 'tredici'], ['14', 'quattordici'], ['15', 'quindici'],
    ['16', 'sedici'], ['17', 'diciassette'], ['18', 'diciotto'], ['19', 'diciannove'], ['20', 'venti'],
  ] as [string, string][],
  tens: [
    ['20', 'venti'], ['30', 'trenta'], ['40', 'quaranta'], ['50', 'cinquanta'],
    ['60', 'sessanta'], ['70', 'settanta'], ['80', 'ottanta'], ['90', 'novanta'],
    ['100', 'cento'], ['200', 'duecento'], ['1000', 'mille'], ['2000', 'duemila'],
  ] as [string, string][],
  ordinals: [
    ['1st', 'primo / prima'], ['2nd', 'secondo / seconda'], ['3rd', 'terzo / terza'],
    ['4th', 'quarto / quarta'], ['5th', 'quinto / quinta'],
  ] as [string, string][],
  time: [
    { italian: 'Che ore sono?', english: 'What time is it?' },
    { italian: 'Sono le otto.', english: 'It\'s 8 o\'clock.' },
    { italian: 'Sono le otto e mezza.', english: 'It\'s 8:30.' },
    { italian: 'Sono le otto e un quarto.', english: 'It\'s 8:15.' },
    { italian: 'Sono le otto meno un quarto.', english: 'It\'s 7:45.' },
    { italian: 'È mezzogiorno.', english: 'It\'s noon.' },
    { italian: 'È mezzanotte.', english: 'It\'s midnight.' },
    { italian: 'Alle venti.', english: 'At 8pm. (24-hr clock)', note: 'Italy uses 24-hr time for schedules.' },
    { italian: 'Stamattina / questo pomeriggio / stasera / stanotte.', english: 'This morning / this afternoon / tonight / tonight (late).' },
    { italian: 'Ieri / oggi / domani / dopodomani.', english: 'Yesterday / today / tomorrow / day after tomorrow.' },
    { italian: 'La settimana scorsa / la settimana prossima.', english: 'Last week / next week.' },
    { italian: 'Per quanto tempo rimane?', english: 'How long are you staying?' },
    { italian: 'Rimango per tre settimane.', english: 'I\'m staying for three weeks.' },
    { italian: 'Rimango fino al cinque giugno.', english: 'I\'m staying until June 5th.' },
  ] as GuidePhrase[],
  days: [
    ['Mon', 'lunedì'], ['Tue', 'martedì'], ['Wed', 'mercoledì'], ['Thu', 'giovedì'],
    ['Fri', 'venerdì'], ['Sat', 'sabato'], ['Sun', 'domenica'],
  ] as [string, string][],
  months: [
    ['Jan', 'gennaio'], ['Feb', 'febbraio'], ['Mar', 'marzo'], ['Apr', 'aprile'],
    ['May', 'maggio'], ['Jun', 'giugno'], ['Jul', 'luglio'], ['Aug', 'agosto'],
    ['Sep', 'settembre'], ['Oct', 'ottobre'], ['Nov', 'novembre'], ['Dec', 'dicembre'],
  ] as [string, string][],
}

// ─── EXAMPLE SCENARIOS (dialogue + grammar breakdown) ────────────────────────

const exampleScenarios: ExampleScenario[] = [
  {
    id: 'scenario-rental-car',
    title: 'Picking up a rental car',
    italianTitle: 'Ritiro dell\'auto a noleggio',
    setting: 'You walk up to the rental counter at the airport with your reservation.',
    dialogue: [
      { speaker: 'you', italian: 'Buongiorno, ho una prenotazione a nome Fazzari.', english: 'Good morning, I have a reservation under Fazzari.' },
      { speaker: 'them', speakerLabel: 'Agent', italian: 'Buongiorno. Posso vedere la patente e una carta di credito?', english: 'Good morning. Can I see your license and a credit card?' },
      { speaker: 'you', italian: 'Ecco. Vorrei aggiungere l\'assicurazione completa.', english: 'Here. I\'d like to add full insurance.' },
      { speaker: 'them', speakerLabel: 'Agent', italian: 'Va bene. La macchina è automatica, va benissimo per voi?', english: 'Alright. The car is automatic, is that good for you?' },
      { speaker: 'you', italian: 'Perfetto. Devo riportarla con il pieno?', english: 'Perfect. Do I have to return it with a full tank?' },
      { speaker: 'them', speakerLabel: 'Agent', italian: 'Sì, e la restituzione è qui entro le sei di sera.', english: 'Yes, and the return is here by six in the evening.' },
      { speaker: 'you', italian: 'Posso vedere la macchina prima per controllare i graffi?', english: 'Can I see the car first to check the scratches?' },
    ],
    grammarNotes: [
      { feature: 'vorrei + infinitive', explanation: '"Vorrei aggiungere" = conditional of volere + infinitive. Softer than "voglio aggiungere." Always prefer vorrei when requesting or buying — sounds polite, not demanding.' },
      { feature: 'dovere + infinitive', explanation: '"Devo riportarla" = devo (I must) + riportare (to return) + la (it, feminine, attached). The clitic pronoun attaches to the infinitive: riportar(e) + la = riportarla.' },
      { feature: 'per + infinitive (purpose)', explanation: '"Per controllare" = "in order to check." Italian uses per + infinitive for purpose clauses where English uses "to + verb." Stack them: potere + infinitive + per + infinitive.' },
      { feature: 'entro le sei', explanation: '"Entro" = by/within (a deadline). "Entro le sei" = by 6 o\'clock. Different from "fino alle sei" which means "until 6."' },
    ],
    heritageTip: 'Heritage speakers often say "riportare la macchina" or "la riportare" — but the natural form is the attached clitic: "riportarla." Same with portarlo, vederla, prenderla, etc.',
  },
  {
    id: 'scenario-hotel-checkin',
    title: 'Checking into a hotel',
    italianTitle: 'Check-in in hotel',
    setting: 'Evening arrival at a small hotel in Olbia.',
    dialogue: [
      { speaker: 'you', italian: 'Buonasera, ho una prenotazione a nome Fazzari.', english: 'Good evening, I have a reservation under Fazzari.' },
      { speaker: 'them', speakerLabel: 'Receptionist', italian: 'Benvenuta. Quante notti rimanete?', english: 'Welcome. How many nights are you staying?' },
      { speaker: 'you', italian: 'Tre notti. Rimaniamo fino a giovedì.', english: 'Three nights. We\'re staying until Thursday.' },
      { speaker: 'them', speakerLabel: 'Receptionist', italian: 'Perfetto. Vi ho preparato una matrimoniale con vista mare al secondo piano.', english: 'Perfect. I\'ve prepared a double with sea view on the second floor for you.' },
      { speaker: 'you', italian: 'A che ora è la colazione?', english: 'What time is breakfast?' },
      { speaker: 'them', speakerLabel: 'Receptionist', italian: 'Dalle sette alle dieci, ed è inclusa nel prezzo.', english: 'From seven to ten, and it\'s included in the price.' },
      { speaker: 'you', italian: 'E il codice del Wi-Fi?', english: 'And the WiFi password?' },
      { speaker: 'them', speakerLabel: 'Receptionist', italian: 'Lo trova sulla cartolina dentro la camera.', english: 'You\'ll find it on the card inside the room.' },
    ],
    grammarNotes: [
      { feature: 'Present tense for the immediate future', explanation: '"Rimaniamo fino a giovedì" — present tense (not future) when the context makes the future clear. Italian uses present for "near future" much more than English does.' },
      { feature: 'Prepositions + articles (contractions)', explanation: 'Hours always need articles: "alle sette," "dalle dieci." Da + le → dalle, a + le → alle, di + le → delle. You cannot drop the article: "a sette" is wrong.' },
      { feature: 'Participle agreement with essere', explanation: '"È inclusa" (not incluso) because "colazione" is feminine singular. When you use essere (or a passive construction), the past participle agrees with the subject in gender + number.' },
      { feature: 'Lei form for staff', explanation: '"Lo trova" = "you (formal) find it." Lei conjugation = third person singular (trova). With hotel staff, always Lei. With family and friends, tu.' },
      { feature: 'Direct object pronoun before verb', explanation: '"Lo trova" — lo (it, = il codice, m sg) goes BEFORE the conjugated verb. Only with infinitives, gerunds, and imperatives does the pronoun attach to the end.' },
    ],
    heritageTip: '"Vi ho preparato" — the receptionist used voi (you all) because she\'s addressing both of you. Hotel staff often switch between Lei (formal singular) and voi (plural). Don\'t get thrown off — both are polite.',
  },
  {
    id: 'scenario-pillows',
    title: 'Asking for pillows and extra towels',
    italianTitle: 'Chiedere cuscini e asciugamani in più',
    setting: 'You call the front desk from your room.',
    dialogue: [
      { speaker: 'you', italian: 'Buonasera, sono nella camera trecentocinque. Potete portarmi due cuscini in più e degli asciugamani?', english: 'Good evening, I\'m in room 305. Can you bring me two extra pillows and some towels?' },
      { speaker: 'them', speakerLabel: 'Staff', italian: 'Certo, signora. Glieli porto subito.', english: 'Of course, ma\'am. I\'ll bring them to you right away.' },
      { speaker: 'you', italian: 'Grazie mille. Ah, anche una coperta se possibile.', english: 'Thank you very much. Oh, also a blanket if possible.' },
      { speaker: 'them', speakerLabel: 'Staff', italian: 'Va bene, le porto tutto tra dieci minuti.', english: 'Alright, I\'ll bring everything to you in ten minutes.' },
      { speaker: 'you', italian: 'Perfetto, la ringrazio.', english: 'Perfect, thank you (formal).' },
    ],
    grammarNotes: [
      { feature: 'potere + infinitive + attached pronoun', explanation: '"Portarmi" = portare + mi (to me). When you stack "Potete portarmi" you get: can-you + bring + to-me. Indirect object (mi) attaches to the infinitive.' },
      { feature: 'in più = extra', explanation: '"Due cuscini in più" = "two extra pillows." "In più" is the standard way to say "extra/additional." Don\'t say "extra cuscini."' },
      { feature: 'Partitive article "degli"', explanation: '"Degli asciugamani" = "some towels." The partitive = di + article. di + gli = degli (masc pl starting with vowel/s+cons/z). For feminine: delle. Singular: del / della / dello / dell\'.' },
      { feature: 'Combined pronoun: glieli', explanation: 'HARD one. "Glieli porto" = "I\'ll bring them to her/him/you." gli (to him/her/you-formal) + li (them, m pl) → glieli. The combination: gli + lo/la/li/le/ne becomes glielo / gliela / glieli / gliele / gliene.' },
      { feature: 'Le porto (formal indirect)', explanation: '"Le porto tutto" = "I\'ll bring you (formal) everything." Le = formal indirect "to you." Same word as "le" (feminine direct "her") — context disambiguates.' },
    ],
    heritageTip: 'Combined pronouns (glielo, gliela, glieli, gliele) are the single biggest tell that someone is a heritage speaker who never got native input. Most fudge by saying "li porto a Lei" — understandable but flagged. Worth practicing this one before the trip.',
  },
  {
    id: 'scenario-breakfast',
    title: 'Ordering breakfast at a café',
    italianTitle: 'Colazione al bar',
    setting: 'A typical Italian bar in the morning. Other people are standing at the counter.',
    dialogue: [
      { speaker: 'you', italian: 'Buongiorno, un cappuccino e un cornetto, per favore.', english: 'Good morning, a cappuccino and a croissant, please.' },
      { speaker: 'them', speakerLabel: 'Barista', italian: 'Al banco o al tavolo?', english: 'At the counter or at a table?' },
      { speaker: 'you', italian: 'Al banco. Il cornetto è alla crema o vuoto?', english: 'At the counter. Is the croissant filled with cream or plain?' },
      { speaker: 'them', speakerLabel: 'Barista', italian: 'Ci sono entrambi. Quale preferisce?', english: 'There are both. Which do you prefer?' },
      { speaker: 'you', italian: 'Alla crema, grazie. Quanto viene?', english: 'Filled with cream, thanks. How much is it?' },
      { speaker: 'them', speakerLabel: 'Barista', italian: 'Tre e cinquanta. Paga prima alla cassa, poi torni qui con lo scontrino.', english: 'Three fifty. You pay first at the register, then you come back here with the receipt.' },
    ],
    grammarNotes: [
      { feature: 'Articles repeat with each noun', explanation: '"Un cappuccino e un cornetto" — Italian does NOT share articles like English does. You can\'t say "un cappuccino e cornetto." Every noun needs its own article.' },
      { feature: 'Preposition + article contraction', explanation: '"Al banco" = a + il → al. "Al tavolo" = a + il → al. "Alla crema" = a + la → alla. These contractions are mandatory — you cannot say "a il banco."' },
      { feature: 'Quanto viene? (instead of costa)', explanation: '"Venire" is the casual way to say "comes to / costs" in Italian. "Quanto viene?" = "how much does it come to?" In a bar/market it\'s more common than "Quanto costa?"' },
      { feature: 'Tre e cinquanta = €3.50', explanation: 'Money is read as: integer + e + cents. "Tre e cinquanta" = 3.50. "Dieci e venti" = 10.20. In writing, Italians use comma not period: 3,50 €.' },
      { feature: 'Lei imperative (paga, torni)', explanation: 'The barista uses Lei: "paga" (you pay) and "torni" (you return). Lei imperative = third person singular present subjunctive. With tu it would be "paga" (same form here) and "torna."' },
    ],
    heritageTip: 'CULTURE: "Al banco" (standing at the counter) is half the price of "al tavolo" (table service). Italians stand. Cappuccino is a morning drink only — ordering one after lunch marks you as a tourist. After breakfast, just espresso ("un caffè").',
  },
  {
    id: 'scenario-aunt',
    title: 'Talking to your aunt about trip plans',
    italianTitle: 'Parlare con la zia dei piani del viaggio',
    setting: 'Family lunch in Calabria. Your aunt wants to know everything you\'re doing.',
    dialogue: [
      { speaker: 'them', speakerLabel: 'Zia', italian: 'Allora, raccontami! Dove andate dopo?', english: 'So, tell me! Where are you going after?' },
      { speaker: 'you', italian: 'Domani partiamo per la Sardegna. Siamo qui a Roma da tre giorni e abbiamo visto un sacco di cose.', english: 'Tomorrow we leave for Sardinia. We\'ve been here in Rome for three days and we\'ve seen a ton of things.' },
      { speaker: 'them', speakerLabel: 'Zia', italian: 'Bravissime! Cosa avete fatto di bello?', english: 'Wonderful! What lovely things have you done?' },
      { speaker: 'you', italian: 'Abbiamo visitato i Musei Vaticani, abbiamo mangiato in quel ristorante che mi avevi consigliato tu, e ieri sera ho portato Cathy a vedere il Colosseo di notte.', english: 'We visited the Vatican Museums, we ate at that restaurant you had recommended to me, and last night I took Cathy to see the Colosseum at night.' },
      { speaker: 'them', speakerLabel: 'Zia', italian: 'Che bello! E poi cosa fate?', english: 'How lovely! And then what are you doing?' },
      { speaker: 'you', italian: 'Da Olbia prendiamo la macchina e giriamo per l\'isola una settimana. Poi voliamo in Liguria, e finiamo in Toscana per il vino.', english: 'From Olbia we take the car and tour around the island for a week. Then we fly to Liguria, and we finish in Tuscany for the wine.' },
      { speaker: 'them', speakerLabel: 'Zia', italian: 'Mi raccomando, mangiate per tutti e due! E salutami Cathy.', english: 'Make sure you eat for both of you! And say hi to Cathy for me.' },
    ],
    grammarNotes: [
      { feature: '★ Present + da for duration', explanation: 'THE biggest heritage-speaker trap. "Siamo qui da tre giorni" = "We HAVE BEEN here for three days." English uses perfect tense; Italian uses PRESENT tense + da. The action is ongoing, so present, not past. Wrong: "Siamo stati qui per tre giorni" (that means it ended).' },
      { feature: 'Passato prossimo with avere', explanation: '"Abbiamo visitato / mangiato / fatto / visto / portato" — all formed with avere + past participle. Visitare → visitato. Mangiare → mangiato. Fare → fatto (irregular). Vedere → visto (irregular). Portare → portato.' },
      { feature: 'Trapassato prossimo (past perfect)', explanation: '"Mi avevi consigliato" = "you had recommended to me." Imperfect of avere (avevi) + past participle. Used for past-before-past: at some past moment, this had already happened.' },
      { feature: 'portare a + infinitive', explanation: '"Ho portato Cathy a vedere" = "I took Cathy to see." Structure: portare (qualcuno) + a + infinitive = to take someone to do something. Same pattern with andare a, venire a.' },
      { feature: 'Present for near-future plans', explanation: '"Prendiamo, giriamo, voliamo, finiamo" — all present tense even though they refer to the future. With travel plans, locations, and schedules, Italians use present indicative. Future tense (prenderemo) sounds bookish here.' },
      { feature: 'voi form from family', explanation: 'Aunts and older relatives often address you as voi (plural "you") when you\'re with a partner: "andate, fate, mangiate." She\'s talking to both you and Cathy. Don\'t mistake it for the antique Voi-as-singular-formal — context makes it clear.' },
      { feature: 'Imperative + attached pronoun', explanation: '"Raccontami!" = racconta (tu imperative) + mi (to me). "Salutami Cathy" = saluta + mi (for me) + Cathy. The pronoun attaches to the affirmative imperative. With negation it\'s different: "Non raccontarmi" or "Non mi raccontare."' },
      { feature: 'Mi raccomando', explanation: 'Idiomatic — literally "I recommend (it) to myself," used as "please make sure / take care to..." Italians use this all the time when giving advice or fussing over you. No real English equivalent.' },
    ],
    heritageTip: '★ The "present + da" rule is what separates a fluent heritage speaker from a textbook learner. Drill it: "Vivo a Los Angeles da venti anni" (I have lived in LA for 20 years). "Studio italiano da sempre" (I have studied Italian forever). "Sono qui da un\'ora" (I have been here for an hour). All PRESENT tense in Italian.',
  },
]

// ─── SECTION REGISTRY ─────────────────────────────────────────────────────────

export const studyGuideSections: GuideSection[] = [
  { type: 'example-scenarios', id: 'example-scenarios', title: 'Example Scenarios', subtitle: 'Dialogue + grammar breakdown', scenarios: exampleScenarios },
  { type: 'phrases', id: 'rental-car', title: 'Rental Car', subtitle: 'Auto a Noleggio', phrases: rentalCar },
  { type: 'phrases', id: 'hotel-checkin', title: 'Hotel Check-In', subtitle: 'Arrivo in hotel', phrases: hotelCheckin },
  { type: 'phrases', id: 'hotel-requests', title: 'Hotel Requests', subtitle: 'Richieste in hotel', phrases: hotelRequests },
  { type: 'phrases', id: 'getting-seated', title: 'Getting Seated', subtitle: 'Al ristorante', phrases: gettingSeated },
  { type: 'phrases', id: 'ordering', title: 'Ordering', subtitle: 'Ordinare', phrases: ordering },
  { type: 'phrases', id: 'paying', title: 'Paying', subtitle: 'Il conto', phrases: paying },
  { type: 'phrases', id: 'getting-around', title: 'Getting Around', subtitle: 'Spostarsi', phrases: gettingAround },
  { type: 'phrases', id: 'survival', title: 'Survival Phrases', subtitle: 'Frasi essenziali', phrases: survival },
  { type: 'verbs', id: 'present-verbs', title: 'Key Verb Conjugations', subtitle: 'Presente indicativo', verbs: presentVerbs },
  { type: 'possessives', id: 'possessives', title: 'Possessives', subtitle: 'Aggettivi possessivi' },
  { type: 'combinations', id: 'combinations', title: 'Useful Combinations', subtitle: 'Costruzioni utili', phrases: combinations },
  { type: 'past', id: 'past-tense', title: 'Past Tense', subtitle: 'Passato prossimo', pastVerbs, travelPhrases: pastTravelPhrases },
  { type: 'numbers', id: 'numbers', title: 'Numbers, Time & Dates', subtitle: 'Numeri, ora e date' },
]
