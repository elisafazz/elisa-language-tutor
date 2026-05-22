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

export type VocabItem = { italian: string; english: string; note?: string }

export type GuideSection =
  | { type: 'phrases'; id: string; title: string; subtitle?: string; phrases: GuidePhrase[] }
  | { type: 'verbs'; id: string; title: string; subtitle?: string; verbs: VerbConjugation[] }
  | { type: 'past'; id: string; title: string; subtitle?: string; pastVerbs: PastVerb[]; travelPhrases: GuidePhrase[] }
  | { type: 'possessives'; id: string; title: string; subtitle?: string }
  | { type: 'combinations'; id: string; title: string; subtitle?: string; phrases: GuidePhrase[] }
  | { type: 'numbers'; id: string; title: string; subtitle?: string }
  | { type: 'example-scenarios'; id: string; title: string; subtitle?: string; scenarios: ExampleScenario[] }
  | { type: 'vocab'; id: string; title: string; subtitle?: string; items: VocabItem[] }

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
  // MIO / MIA / MIEI / MIE (my)
  { italian: 'il mio passaporto', english: 'my passport' },
  { italian: 'i miei passaporti', english: 'my passports' },
  { italian: 'la mia patente', english: 'my driver\'s license' },
  { italian: 'la mia valigia', english: 'my suitcase' },
  { italian: 'le mie valigie', english: 'my suitcases' },
  { italian: 'le mie chiavi', english: 'my keys' },
  { italian: 'le mie scarpe', english: 'my shoes' },
  { italian: 'i miei amici', english: 'my friends' },
  { italian: 'i miei vestiti', english: 'my clothes' },
  { italian: 'la mia prenotazione', english: 'my reservation' },
  { italian: 'la mia macchina', english: 'my car' },
  { italian: 'il mio telefono', english: 'my phone' },
  { italian: 'i miei occhiali', english: 'my glasses' },

  // TUO / TUA / TUOI / TUE (your, informal)
  { italian: 'il tuo passaporto', english: 'your passport (informal)' },
  { italian: 'la tua camera', english: 'your room' },
  { italian: 'i tuoi documenti', english: 'your documents' },
  { italian: 'le tue scarpe', english: 'your shoes' },
  { italian: 'il tuo telefono', english: 'your phone' },
  { italian: 'la tua valigia', english: 'your suitcase' },
  { italian: 'i tuoi amici', english: 'your friends' },

  // SUO / SUA / SUOI / SUE (his / her / formal your)
  { italian: 'il suo passaporto', english: 'his / her passport', note: 'sua = his or her — context clarifies.' },
  { italian: 'la sua borsa', english: 'his / her bag' },
  { italian: 'i suoi documenti', english: 'his / her documents' },
  { italian: 'le sue chiavi', english: 'his / her keys' },
  { italian: 'la sua valigia', english: 'his / her suitcase' },
  { italian: 'le sue valigie', english: 'his / her suitcases' },
  { italian: 'il suo cane', english: 'his / her dog' },
  { italian: 'la sua famiglia', english: 'his / her family' },

  // NOSTRO / NOSTRA / NOSTRI / NOSTRE (our)
  { italian: 'la nostra camera', english: 'our hotel room' },
  { italian: 'la nostra prenotazione', english: 'our reservation' },
  { italian: 'il nostro tavolo', english: 'our table' },
  { italian: 'i nostri passaporti', english: 'our passports' },
  { italian: 'le nostre valigie', english: 'our suitcases' },
  { italian: 'i nostri biglietti', english: 'our tickets' },
  { italian: 'la nostra macchina', english: 'our car' },
  { italian: 'le nostre amiche', english: 'our friends (all f)' },
  { italian: 'i nostri amici', english: 'our friends (mixed or m)' },

  // VOSTRO / VOSTRA / VOSTRI / VOSTRE (your, plural)
  { italian: 'il vostro tavolo', english: 'your table (plural you)' },
  { italian: 'la vostra prenotazione', english: 'your reservation (plural you)' },
  { italian: 'il vostro hotel', english: 'your hotel' },
  { italian: 'il vostro indirizzo', english: 'your address' },

  // LORO (their)
  { italian: 'i loro bagagli', english: 'their luggage' },
  { italian: 'la loro prenotazione', english: 'their reservation' },
  { italian: 'la loro macchina', english: 'their car' },
  { italian: 'il loro hotel', english: 'their hotel' },
  { italian: 'le loro valigie', english: 'their suitcases' },
  { italian: 'la loro casa', english: 'their house' },

  // FAMILY EXCEPTIONS
  { italian: 'mia madre', english: 'my mother', note: 'Singular family: NO article. Not "la mia madre."' },
  { italian: 'mio padre', english: 'my father' },
  { italian: 'mia sorella', english: 'my sister' },
  { italian: 'mio fratello', english: 'my brother' },
  { italian: 'tua zia / tuo zio', english: 'your aunt / your uncle' },
  { italian: 'sua nonna / suo nonno', english: 'his/her grandmother / grandfather' },
  { italian: 'i miei genitori', english: 'my parents', note: 'PLURAL family = article comes back: i miei genitori, i miei fratelli.' },
  { italian: 'i miei nonni', english: 'my grandparents' },
  { italian: 'i miei fratelli', english: 'my brothers / siblings' },
  { italian: 'la mia amica / il mio amico', english: 'my friend (f) / my friend (m)', note: 'Friends are NOT family — keep the article.' },
  { italian: 'il loro nonno', english: 'their grandfather', note: 'EXCEPTION: loro ALWAYS keeps the article, even with singular family.' },
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

// ─── PINNED FOR THE TRIP (Elisa's must-haves) ────────────────────────────────

export const pinnedTrip: GuidePhrase[] = [
  { italian: 'Possiamo sederci fuori?', english: 'Can we sit outside?' },
  { italian: 'Possiamo sederci dentro?', english: 'Can we sit inside?' },
  { italian: 'Ci porta...?', english: 'Can you bring us...? (formal)', note: '"Ci" = us. Pair with anything: ci porta dell\'acqua, ci porta il pane, ci porta il conto.' },
  { italian: 'Ci porta i menu, per favore?', english: 'Can you bring us the menus, please?' },
  { italian: 'Ci porta dell\'acqua, per favore?', english: 'Can you bring us some water, please?' },
  { italian: 'Ci porta il conto?', english: 'Can you bring us the check?' },
  { italian: 'Siamo a posto, grazie.', english: 'We\'re all set, thanks.', note: 'Literally "we\'re in place." Means you\'re done / good / don\'t need anything more.' },
  { italian: 'Stiamo tre settimane in totale: una settimana in Sardegna, poi andiamo a Genova e poi in Toscana.', english: 'We\'re staying three weeks total: one week in Sardinia, then we go to Genoa and then to Tuscany.' },
  { italian: 'Come arriviamo alla stazione?', english: 'How do we get to the station?' },
  { italian: 'Come arriviamo al centro?', english: 'How do we get downtown / to the center?' },
  { italian: 'Come arriviamo a Genova?', english: 'How do we get to Genoa?', note: 'Pattern: "Come arriviamo a [città]?" — drop the article with city names.' },
  { italian: 'Per iniziare, prosciutto e melone. Poi prendiamo la pasta. E come secondo, il pollo e la bistecca.', english: 'To start, prosciutto and melon. Then we\'ll have the pasta. And for the second course, the chicken and the steak.', note: 'A full restaurant order in one breath. Per iniziare = to start. Come secondo = as a second course.' },
  { italian: 'sopra', english: 'above / on top of' },
  { italian: 'sotto', english: 'below / under' },
  { italian: 'a destra', english: 'to the right' },
  { italian: 'a sinistra', english: 'to the left' },
  { italian: 'in cima', english: 'on top / at the top', note: 'Used for vertical "on top" — in cima alla collina = on top of the hill.' },
  { italian: 'in fondo', english: 'at the bottom / at the back / at the far end', note: 'In fondo alla strada = at the end of the street. In fondo al menu = at the bottom of the menu.' },
  { italian: 'davanti / dietro', english: 'in front / behind' },
  { italian: 'vicino a / lontano da', english: 'near to / far from' },
  { italian: 'di fianco a / accanto a', english: 'next to / beside' },
  { italian: 'di fronte a', english: 'across from / facing' },
]

// ─── VOCABULARY BANK ─────────────────────────────────────────────────────────

const vocabAroundTown: VocabItem[] = [
  { italian: 'la città', english: 'the city' },
  { italian: 'il paese', english: 'the town / village', note: 'Also means "country."' },
  { italian: 'il quartiere', english: 'the neighborhood' },
  { italian: 'il centro', english: 'downtown / the center' },
  { italian: 'la via / la strada', english: 'the street / the road' },
  { italian: 'la piazza', english: 'the square' },
  { italian: 'il ponte', english: 'the bridge' },
  { italian: 'il parco', english: 'the park' },
  { italian: 'la chiesa', english: 'the church' },
  { italian: 'il duomo', english: 'the cathedral' },
  { italian: 'il museo', english: 'the museum' },
  { italian: 'il negozio', english: 'the shop' },
  { italian: 'il mercato', english: 'the market' },
  { italian: 'la farmacia', english: 'the pharmacy', note: 'Green cross sign. Pharmacists give real advice.' },
  { italian: 'l\'ospedale (m)', english: 'the hospital' },
  { italian: 'l\'ufficio postale', english: 'the post office' },
  { italian: 'la banca', english: 'the bank' },
  { italian: 'il bancomat', english: 'the ATM' },
  { italian: 'il supermercato', english: 'the supermarket' },
  { italian: 'l\'alimentari (m)', english: 'the grocery store' },
  { italian: 'la panetteria', english: 'the bakery (bread)' },
  { italian: 'la pasticceria', english: 'the pastry shop' },
  { italian: 'la gelateria', english: 'the gelato shop' },
  { italian: 'l\'edicola (f)', english: 'the newsstand' },
  { italian: 'la libreria', english: 'the bookstore', note: 'NOT library — that\'s biblioteca.' },
  { italian: 'la biblioteca', english: 'the library' },
  { italian: 'il tabaccaio', english: 'the tobacco shop', note: 'Sells transit tickets, stamps, lottery, top-ups.' },
  { italian: 'il bar', english: 'the café / bar', note: 'In Italy bar = café with coffee. Not a nightlife bar.' },
  { italian: 'il ristorante', english: 'the restaurant' },
  { italian: 'la trattoria', english: 'the trattoria', note: 'Casual family-run restaurant.' },
  { italian: 'l\'osteria (f)', english: 'the osteria', note: 'Even more casual, wine-focused.' },
  { italian: 'l\'enoteca (f)', english: 'the wine bar / wine shop' },
  { italian: 'il bagno / i bagni', english: 'the bathroom / bathrooms' },
  { italian: 'la stazione', english: 'the station' },
  { italian: 'l\'aeroporto (m)', english: 'the airport' },
]

const vocabTransit: VocabItem[] = [
  { italian: 'il treno', english: 'the train' },
  { italian: 'la stazione', english: 'the station' },
  { italian: 'il binario', english: 'the platform / track' },
  { italian: 'il biglietto', english: 'the ticket' },
  { italian: 'la biglietteria', english: 'the ticket office' },
  { italian: 'la macchinetta', english: 'the ticket machine', note: 'Also "the validation machine" — yellow boxes on platforms.' },
  { italian: 'timbrare il biglietto', english: 'to validate the ticket', note: 'CRITICAL on regional trains. Stamp it before boarding or get fined.' },
  { italian: 'la coincidenza', english: 'the connection' },
  { italian: 'il treno regionale', english: 'the regional train', note: 'Slow, cheap, requires validation.' },
  { italian: 'il Frecciarossa / Italo', english: 'high-speed train', note: 'Reserved seats, no validation needed.' },
  { italian: 'l\'autobus (m)', english: 'the bus' },
  { italian: 'il pullman', english: 'the coach bus', note: 'Long-distance bus.' },
  { italian: 'la fermata', english: 'the stop' },
  { italian: 'la metro / metropolitana', english: 'the metro / subway' },
  { italian: 'il taxi', english: 'the taxi' },
  { italian: 'l\'aeroporto (m)', english: 'the airport' },
  { italian: 'il gate / l\'uscita', english: 'the gate' },
  { italian: 'la carta d\'imbarco', english: 'the boarding pass' },
  { italian: 'il volo', english: 'the flight' },
  { italian: 'i bagagli', english: 'the luggage' },
  { italian: 'la valigia', english: 'the suitcase' },
  { italian: 'il bagaglio a mano', english: 'the carry-on' },
  { italian: 'lo zaino', english: 'the backpack' },
  { italian: 'partenze', english: 'departures' },
  { italian: 'arrivi', english: 'arrivals' },
  { italian: 'il ritardo', english: 'the delay' },
  { italian: 'in orario', english: 'on time' },
  { italian: 'in ritardo', english: 'late / delayed' },
  { italian: 'il traghetto', english: 'the ferry', note: 'For Sardinia/islands.' },
  { italian: 'il porto', english: 'the port / harbor' },
  { italian: 'l\'imbarco (m)', english: 'boarding' },
  { italian: 'l\'andata (f)', english: 'one way / outbound' },
  { italian: 'il ritorno', english: 'return / inbound' },
  { italian: 'andata e ritorno', english: 'round trip' },
]

const vocabCar: VocabItem[] = [
  { italian: 'la macchina / l\'auto (f)', english: 'the car' },
  { italian: 'l\'autostrada (f)', english: 'the highway' },
  { italian: 'il casello', english: 'the toll booth' },
  { italian: 'il pedaggio', english: 'the toll' },
  { italian: 'il telepass', english: 'electronic toll pass', note: 'Telepass lanes are subscribers only — don\'t enter them.' },
  { italian: 'la benzina', english: 'gasoline' },
  { italian: 'il gasolio / diesel', english: 'diesel' },
  { italian: 'il pieno', english: 'a full tank' },
  { italian: 'la pompa', english: 'the gas pump' },
  { italian: 'il distributore', english: 'the gas station' },
  { italian: 'self-service', english: 'self-service' },
  { italian: 'servito', english: 'full-service', note: 'Costs more per liter.' },
  { italian: 'il navigatore / GPS', english: 'the GPS' },
  { italian: 'la gomma', english: 'the tire' },
  { italian: 'una gomma a terra', english: 'a flat tire' },
  { italian: 'il volante', english: 'the steering wheel' },
  { italian: 'i fari', english: 'the headlights' },
  { italian: 'il freno', english: 'the brake' },
  { italian: 'la frizione', english: 'the clutch' },
  { italian: 'il cambio', english: 'the gearshift' },
  { italian: 'automatico / manuale', english: 'automatic / manual' },
  { italian: 'il parcheggio', english: 'the parking lot' },
  { italian: 'parcheggiare', english: 'to park' },
  { italian: 'la rotonda', english: 'the roundabout' },
  { italian: 'l\'incrocio (m)', english: 'the intersection' },
  { italian: 'il semaforo', english: 'the traffic light' },
  { italian: 'senso unico', english: 'one way' },
  { italian: 'divieto di sosta', english: 'no parking' },
  { italian: 'le strisce blu', english: 'paid parking spaces' },
  { italian: 'le strisce bianche', english: 'free parking spaces' },
  { italian: 'le strisce gialle', english: 'reserved/disabled parking' },
  { italian: 'l\'autovelox (m)', english: 'speed camera' },
  { italian: 'la ZTL', english: 'limited traffic zone', note: 'Cameras fine you automatically. Hotels can register your plate for exemption.' },
  { italian: 'la multa', english: 'the fine / ticket' },
]

const vocabToiletries: VocabItem[] = [
  { italian: 'lo spazzolino', english: 'the toothbrush' },
  { italian: 'il dentifricio', english: 'the toothpaste' },
  { italian: 'il filo interdentale', english: 'dental floss' },
  { italian: 'il collutorio', english: 'mouthwash' },
  { italian: 'il sapone', english: 'the soap' },
  { italian: 'lo shampoo', english: 'the shampoo' },
  { italian: 'il balsamo', english: 'the conditioner' },
  { italian: 'il bagnoschiuma', english: 'the shower gel' },
  { italian: 'il deodorante', english: 'the deodorant' },
  { italian: 'il rasoio', english: 'the razor' },
  { italian: 'la schiuma da barba', english: 'shaving cream' },
  { italian: 'la crema idratante', english: 'moisturizer' },
  { italian: 'la crema solare', english: 'sunscreen' },
  { italian: 'il doposole', english: 'after-sun lotion' },
  { italian: 'le salviettine', english: 'wipes' },
  { italian: 'gli assorbenti', english: 'pads' },
  { italian: 'i tamponi', english: 'tampons' },
  { italian: 'il profumo', english: 'the perfume' },
  { italian: 'il trucco', english: 'makeup' },
  { italian: 'lo struccante', english: 'makeup remover' },
  { italian: 'il pettine', english: 'the comb' },
  { italian: 'la spazzola', english: 'the hairbrush' },
  { italian: 'i fazzoletti', english: 'tissues' },
  { italian: 'i cotton fioc', english: 'cotton swabs' },
  { italian: 'l\'asciugacapelli (m) / il phon', english: 'the hair dryer' },
  { italian: 'l\'accappatoio (m)', english: 'the bathrobe' },
  { italian: 'le pantofole', english: 'slippers' },
]

const vocabClothing: VocabItem[] = [
  { italian: 'i vestiti', english: 'clothes' },
  { italian: 'il vestito', english: 'the dress / suit' },
  { italian: 'la maglietta / la t-shirt', english: 'the t-shirt' },
  { italian: 'la maglia', english: 'the top / sweater' },
  { italian: 'la camicia', english: 'the button-up shirt' },
  { italian: 'la camicetta', english: 'the blouse' },
  { italian: 'i pantaloni', english: 'pants', note: 'Always plural in Italian.' },
  { italian: 'i jeans', english: 'jeans' },
  { italian: 'i pantaloncini', english: 'shorts' },
  { italian: 'la gonna', english: 'the skirt' },
  { italian: 'la giacca', english: 'the jacket' },
  { italian: 'il cappotto', english: 'the coat' },
  { italian: 'il maglione', english: 'the sweater' },
  { italian: 'la felpa', english: 'the sweatshirt / hoodie' },
  { italian: 'la giacca a vento', english: 'the windbreaker' },
  { italian: 'l\'impermeabile (m)', english: 'the raincoat' },
  { italian: 'le scarpe', english: 'shoes' },
  { italian: 'le scarpe da ginnastica', english: 'sneakers' },
  { italian: 'i sandali', english: 'sandals' },
  { italian: 'gli stivali', english: 'boots' },
  { italian: 'le infradito', english: 'flip-flops' },
  { italian: 'le calze / i calzini', english: 'socks' },
  { italian: 'i collant', english: 'tights / pantyhose' },
  { italian: 'la biancheria intima', english: 'underwear (general)' },
  { italian: 'le mutande', english: 'underwear / panties' },
  { italian: 'il reggiseno', english: 'the bra' },
  { italian: 'il costume da bagno', english: 'the swimsuit' },
  { italian: 'il bikini', english: 'the bikini' },
  { italian: 'il cappello', english: 'the hat' },
  { italian: 'gli occhiali da sole', english: 'sunglasses' },
  { italian: 'la sciarpa', english: 'the scarf' },
  { italian: 'la cintura', english: 'the belt' },
  { italian: 'la borsa', english: 'the bag / purse' },
  { italian: 'il portafoglio', english: 'the wallet' },
  { italian: 'la taglia', english: 'the size (clothing)' },
  { italian: 'il numero', english: 'the size (shoes)' },
  { italian: 'il camerino', english: 'the fitting room' },
  { italian: 'provarsi qualcosa', english: 'to try something on' },
]

const vocabBodyHealth: VocabItem[] = [
  { italian: 'la testa', english: 'the head' },
  { italian: 'la gola', english: 'the throat' },
  { italian: 'lo stomaco', english: 'the stomach' },
  { italian: 'la pancia', english: 'the belly / stomach' },
  { italian: 'la schiena', english: 'the back' },
  { italian: 'il collo', english: 'the neck' },
  { italian: 'la spalla', english: 'the shoulder' },
  { italian: 'il braccio / le braccia', english: 'the arm / arms', note: 'Irregular plural: feminine in plural.' },
  { italian: 'la mano / le mani', english: 'the hand / hands', note: 'Feminine despite -o ending.' },
  { italian: 'il dito / le dita', english: 'the finger / fingers', note: 'Irregular: feminine plural.' },
  { italian: 'la gamba', english: 'the leg' },
  { italian: 'il ginocchio', english: 'the knee' },
  { italian: 'la caviglia', english: 'the ankle' },
  { italian: 'il piede', english: 'the foot' },
  { italian: 'l\'occhio / gli occhi', english: 'the eye / eyes' },
  { italian: 'l\'orecchio / le orecchie', english: 'the ear / ears' },
  { italian: 'il naso', english: 'the nose' },
  { italian: 'la bocca', english: 'the mouth' },
  { italian: 'i denti', english: 'the teeth' },
  { italian: 'il raffreddore', english: 'a cold' },
  { italian: 'la febbre', english: 'fever' },
  { italian: 'la tosse', english: 'cough' },
  { italian: 'mal di testa', english: 'headache' },
  { italian: 'mal di stomaco', english: 'stomachache' },
  { italian: 'mal di gola', english: 'sore throat' },
  { italian: 'mal di schiena', english: 'backache' },
  { italian: 'il mal d\'auto / di mare', english: 'car sickness / seasickness' },
  { italian: 'la nausea', english: 'nausea' },
  { italian: 'la diarrea', english: 'diarrhea' },
  { italian: 'la stitichezza', english: 'constipation' },
  { italian: 'una scottatura', english: 'a sunburn' },
  { italian: 'una puntura d\'insetto', english: 'an insect bite' },
  { italian: 'la medicina / il farmaco', english: 'medicine' },
  { italian: 'l\'antidolorifico (m)', english: 'painkiller' },
  { italian: 'la ricetta', english: 'the prescription' },
  { italian: 'il pronto soccorso', english: 'the emergency room' },
  { italian: 'sono stanca', english: 'I\'m tired (f)' },
  { italian: 'sono stanca morta', english: 'I\'m exhausted (f)', note: 'Literally "dead tired."' },
  { italian: 'ho le vertigini', english: 'I\'m dizzy' },
  { italian: 'ho la nausea', english: 'I feel sick / nauseous' },
  { italian: 'mi sento male', english: 'I feel sick / bad' },
  { italian: 'sto meglio', english: 'I feel better' },
]

const vocabMoney: VocabItem[] = [
  { italian: 'il prezzo', english: 'the price' },
  { italian: 'i soldi / il denaro', english: 'money' },
  { italian: 'i contanti', english: 'cash' },
  { italian: 'la carta di credito', english: 'credit card' },
  { italian: 'il bancomat', english: 'debit card / ATM', note: 'Same word for both.' },
  { italian: 'lo scontrino', english: 'the receipt (small purchase)' },
  { italian: 'la ricevuta', english: 'the receipt (formal)' },
  { italian: 'il resto', english: 'the change' },
  { italian: 'gli spiccioli', english: 'small change / coins' },
  { italian: 'caro / costoso', english: 'expensive' },
  { italian: 'economico / a buon prezzo', english: 'cheap / inexpensive' },
  { italian: 'i saldi', english: 'sales (seasonal)' },
  { italian: 'lo sconto', english: 'the discount' },
  { italian: 'in offerta', english: 'on sale / on offer' },
  { italian: 'l\'IVA (f)', english: 'VAT (value-added tax)', note: 'Usually included in marked price.' },
  { italian: 'il tasso di cambio', english: 'exchange rate' },
  { italian: 'mancia', english: 'tip', note: 'Tipping in Italy is minimal — rounding up or 5-10% on large bills.' },
  { italian: 'gratis / gratuito', english: 'free' },
  { italian: 'pagare', english: 'to pay' },
  { italian: 'spendere', english: 'to spend' },
]

const vocabFood: VocabItem[] = [
  { italian: 'la colazione', english: 'breakfast' },
  { italian: 'il pranzo', english: 'lunch' },
  { italian: 'la cena', english: 'dinner' },
  { italian: 'l\'aperitivo (m)', english: 'aperitivo / pre-dinner drink + snacks' },
  { italian: 'lo spuntino', english: 'snack' },
  { italian: 'il pane', english: 'bread' },
  { italian: 'i grissini', english: 'breadsticks' },
  { italian: 'la pasta', english: 'pasta' },
  { italian: 'il riso', english: 'rice' },
  { italian: 'il risotto', english: 'risotto' },
  { italian: 'la pizza', english: 'pizza' },
  { italian: 'il formaggio', english: 'cheese' },
  { italian: 'il prosciutto', english: 'cured ham' },
  { italian: 'il salame', english: 'salami' },
  { italian: 'la carne', english: 'meat' },
  { italian: 'il pesce', english: 'fish' },
  { italian: 'il pollo', english: 'chicken' },
  { italian: 'il manzo', english: 'beef' },
  { italian: 'il maiale', english: 'pork' },
  { italian: 'l\'agnello (m)', english: 'lamb' },
  { italian: 'i frutti di mare', english: 'seafood / shellfish' },
  { italian: 'le verdure', english: 'vegetables' },
  { italian: 'l\'insalata (f)', english: 'salad' },
  { italian: 'il pomodoro', english: 'tomato' },
  { italian: 'il basilico', english: 'basil' },
  { italian: 'l\'aglio (m)', english: 'garlic' },
  { italian: 'la cipolla', english: 'onion' },
  { italian: 'il peperoncino', english: 'chili pepper' },
  { italian: 'la frutta', english: 'fruit' },
  { italian: 'la mela / le mele', english: 'apple / apples' },
  { italian: 'l\'arancia / le arance', english: 'orange / oranges' },
  { italian: 'il limone', english: 'lemon' },
  { italian: 'l\'uva (f)', english: 'grapes' },
  { italian: 'il dolce / i dolci', english: 'dessert / sweets' },
  { italian: 'il gelato', english: 'gelato' },
  { italian: 'l\'acqua (f)', english: 'water' },
  { italian: 'il vino', english: 'wine' },
  { italian: 'la birra', english: 'beer' },
  { italian: 'il caffè', english: 'espresso (default)' },
  { italian: 'il cappuccino', english: 'cappuccino', note: 'Morning only — never after lunch.' },
  { italian: 'il latte', english: 'milk' },
  { italian: 'il tè', english: 'tea' },
  { italian: 'lo zucchero', english: 'sugar' },
  { italian: 'il sale', english: 'salt' },
  { italian: 'il pepe', english: 'pepper' },
  { italian: 'l\'olio (m) d\'oliva', english: 'olive oil' },
  { italian: 'l\'aceto (m)', english: 'vinegar' },
  { italian: 'il burro', english: 'butter' },
  { italian: 'le uova', english: 'eggs', note: 'Irregular plural: l\'uovo (m sg) → le uova (f pl).' },
  { italian: 'un etto', english: '100 grams', note: 'Standard unit at delis: "due etti di prosciutto."' },
  { italian: 'mezzo chilo', english: 'half a kilo' },
  { italian: 'un litro', english: 'a liter' },
]

const vocabColors: VocabItem[] = [
  { italian: 'rosso', english: 'red' },
  { italian: 'blu', english: 'dark blue', note: 'Invariable — never changes form.' },
  { italian: 'azzurro', english: 'light blue / sky blue' },
  { italian: 'verde', english: 'green' },
  { italian: 'giallo', english: 'yellow' },
  { italian: 'arancione', english: 'orange' },
  { italian: 'rosa', english: 'pink', note: 'Invariable.' },
  { italian: 'viola', english: 'purple', note: 'Invariable.' },
  { italian: 'nero', english: 'black' },
  { italian: 'bianco', english: 'white' },
  { italian: 'grigio', english: 'gray' },
  { italian: 'marrone', english: 'brown' },
  { italian: 'beige', english: 'beige', note: 'Invariable.' },
  { italian: 'chiaro', english: 'light (color)' },
  { italian: 'scuro', english: 'dark (color)' },
]

const vocabWeather: VocabItem[] = [
  { italian: 'fa caldo', english: 'it\'s hot' },
  { italian: 'fa freddo', english: 'it\'s cold' },
  { italian: 'fa fresco', english: 'it\'s cool' },
  { italian: 'fa bel tempo', english: 'the weather is nice' },
  { italian: 'fa brutto tempo', english: 'the weather is bad' },
  { italian: 'c\'è il sole', english: 'it\'s sunny' },
  { italian: 'piove', english: 'it\'s raining' },
  { italian: 'la pioggia', english: 'rain' },
  { italian: 'tira vento', english: 'it\'s windy' },
  { italian: 'il vento', english: 'wind' },
  { italian: 'è nuvoloso', english: 'it\'s cloudy' },
  { italian: 'è sereno', english: 'it\'s clear' },
  { italian: 'il temporale', english: 'thunderstorm' },
  { italian: 'la neve / nevica', english: 'snow / it\'s snowing' },
  { italian: 'umido', english: 'humid' },
  { italian: 'afoso', english: 'muggy / stifling' },
  { italian: 'il tramonto', english: 'sunset' },
  { italian: 'l\'alba (f)', english: 'dawn / sunrise' },
]

const vocabBeach: VocabItem[] = [
  { italian: 'la spiaggia', english: 'the beach' },
  { italian: 'la spiaggia libera', english: 'free public beach' },
  { italian: 'lo stabilimento balneare', english: 'the beach club (paid)' },
  { italian: 'l\'ombrellone (m)', english: 'beach umbrella' },
  { italian: 'il lettino / la sdraio', english: 'beach lounger / deck chair' },
  { italian: 'l\'asciugamano (m) da mare', english: 'beach towel' },
  { italian: 'il costume da bagno', english: 'swimsuit' },
  { italian: 'la sabbia', english: 'sand' },
  { italian: 'gli scogli', english: 'rocks (sea rocks)' },
  { italian: 'il mare', english: 'the sea' },
  { italian: 'l\'onda / le onde', english: 'wave / waves' },
  { italian: 'la corrente', english: 'the current' },
  { italian: 'la marea', english: 'the tide' },
  { italian: 'fare il bagno', english: 'to swim / go in the water' },
  { italian: 'nuotare', english: 'to swim' },
  { italian: 'la maschera / il boccaglio', english: 'mask / snorkel' },
  { italian: 'le pinne', english: 'flippers' },
  { italian: 'la doccia', english: 'shower', note: 'Public showers at the beach.' },
  { italian: 'la riva', english: 'the shore' },
  { italian: 'la barca', english: 'boat' },
  { italian: 'la medusa', english: 'jellyfish' },
  { italian: 'una scottatura solare', english: 'a sunburn' },
  { italian: 'abbronzarsi', english: 'to tan' },
  { italian: 'l\'abbronzatura (f)', english: 'a tan' },
]

// ─── EXTRA PHRASES (fillers, reactions, café, Cathy) ──────────────────────────

const cafePhrases: GuidePhrase[] = [
  { italian: 'Un caffè, per favore.', english: 'An espresso, please.', note: 'Default "un caffè" = espresso. Anything else needs specifying.' },
  { italian: 'Un caffè macchiato.', english: 'An espresso with a dash of milk.' },
  { italian: 'Un caffè lungo.', english: 'A longer / weaker espresso.' },
  { italian: 'Un caffè ristretto.', english: 'A short / strong espresso.' },
  { italian: 'Un caffè decaffeinato / un deca.', english: 'A decaf coffee.' },
  { italian: 'Un caffè d\'orzo.', english: 'A barley coffee.', note: 'Caffeine-free, common in Italy.' },
  { italian: 'Un cappuccino.', english: 'A cappuccino.', note: 'Only ordered before noon.' },
  { italian: 'Un cappuccino tiepido / freddo.', english: 'A warm / cold cappuccino.' },
  { italian: 'Un cornetto vuoto / alla crema / alla marmellata.', english: 'A plain / cream-filled / jam-filled croissant.' },
  { italian: 'Una brioche.', english: 'A brioche (pastry).' },
  { italian: 'Al banco o al tavolo?', english: 'At the counter or at a table?', note: 'They will ask this. Al banco is cheaper and faster.' },
  { italian: 'Pago alla cassa?', english: 'Do I pay at the register?' },
  { italian: 'Lo scontrino.', english: 'The receipt.', note: 'In some bars: pay first at register, get receipt, then order at counter.' },
  { italian: 'Un\'acqua naturale dal frigo.', english: 'A cold still water from the fridge.' },
  { italian: 'Una spremuta d\'arancia.', english: 'A fresh-squeezed orange juice.' },
  { italian: 'Un succo di frutta.', english: 'A fruit juice (bottled).' },
]

const gelatoAperitivo: GuidePhrase[] = [
  { italian: 'Un cono / una coppetta.', english: 'A cone / a cup.' },
  { italian: 'Piccolo / medio / grande.', english: 'Small / medium / large.' },
  { italian: 'Due gusti, per favore.', english: 'Two flavors, please.' },
  { italian: 'Quali sono i gusti del giorno?', english: 'What are today\'s flavors?' },
  { italian: 'Con la panna?', english: 'With whipped cream?', note: 'Often free.' },
  { italian: 'Quanto viene?', english: 'How much is it?' },
  { italian: 'Un Aperol Spritz, per favore.', english: 'An Aperol Spritz, please.' },
  { italian: 'Un Negroni.', english: 'A Negroni.' },
  { italian: 'Un bicchiere di vino bianco / rosso.', english: 'A glass of white / red wine.' },
  { italian: 'Cosa è incluso con l\'aperitivo?', english: 'What\'s included with the aperitivo?', note: 'Italian aperitivo often comes with free snacks or a buffet.' },
  { italian: 'Vorrei qualcosa di locale.', english: 'I\'d like something local.', note: 'Great for wine in Tuscany, vermentino in Sardinia, etc.' },
]

const fillers: GuidePhrase[] = [
  { italian: 'Allora...', english: 'So... / Well then...', note: 'Universal opener / pause word.' },
  { italian: 'Cioè...', english: 'I mean... / That is...', note: 'Clarifying or backtracking.' },
  { italian: 'Quindi...', english: 'So... / Therefore...' },
  { italian: 'Insomma...', english: 'Well... / Kind of / All in all.' },
  { italian: 'Comunque...', english: 'Anyway... / In any case.' },
  { italian: 'Diciamo che...', english: 'Let\'s say that...' },
  { italian: 'Praticamente...', english: 'Basically...' },
  { italian: 'Magari!', english: 'I wish! / If only!', note: 'Wistful — responding to "Are you going back?" with "Magari!"' },
  { italian: 'Dai!', english: 'Come on! / No way!', note: 'Versatile — encouragement, disbelief, "come on now."' },
  { italian: 'Boh.', english: 'Dunno. / Shrug.', note: 'Shoulder shrug equivalent. Often paired with a literal shrug.' },
  { italian: 'Mah...', english: 'Hmm... / Eh...', note: 'Skeptical or unconvinced.' },
  { italian: 'Macché!', english: 'No way! / Not at all!' },
  { italian: 'Figurati!', english: 'Don\'t mention it! / No problem!', note: 'Reply to thanks.' },
  { italian: 'Ma dai!', english: 'Come on! / You\'re kidding!' },
  { italian: 'Davvero?', english: 'Really?' },
  { italian: 'Certo!', english: 'Of course! / Sure!' },
  { italian: 'Esatto.', english: 'Exactly.' },
  { italian: 'Va bene. / D\'accordo.', english: 'Okay. / Agreed.' },
  { italian: 'Non importa.', english: 'It doesn\'t matter. / No worries.' },
  { italian: 'Non c\'è problema.', english: 'No problem.' },
  { italian: 'Lascia stare.', english: 'Let it go. / Forget about it.' },
  { italian: 'Un attimo.', english: 'One moment.' },
  { italian: 'Aspetta!', english: 'Wait! (informal)' },
  { italian: 'Aspetti!', english: 'Wait! (formal Lei)' },
]

const reactions: GuidePhrase[] = [
  { italian: 'Che bello!', english: 'How lovely! (m)' },
  { italian: 'Che bella!', english: 'How lovely! (f)' },
  { italian: 'Che buono!', english: 'How tasty! (m)' },
  { italian: 'Buonissimo!', english: 'Delicious! / Really good!' },
  { italian: 'Squisito!', english: 'Exquisite!' },
  { italian: 'Spettacolare!', english: 'Spectacular!' },
  { italian: 'Mozzafiato.', english: 'Breathtaking.' },
  { italian: 'Pazzesco!', english: 'Crazy! / Amazing!' },
  { italian: 'Che meraviglia!', english: 'How wonderful!' },
  { italian: 'Che peccato!', english: 'What a shame!' },
  { italian: 'Auguri!', english: 'Best wishes! / Congrats! / Happy [occasion]!' },
  { italian: 'Salute!', english: 'Cheers! / Bless you!' },
  { italian: 'Buon appetito!', english: 'Enjoy your meal!' },
  { italian: 'Altrettanto.', english: 'Same to you.', note: 'Reply to buon appetito, buona giornata, etc.' },
  { italian: 'In bocca al lupo!', english: 'Good luck! (lit. "in the wolf\'s mouth")' },
  { italian: 'Crepi!', english: 'Thanks! (reply to "in bocca al lupo")', note: 'Never say "grazie" — always "crepi (il lupo)."' },
]

const heritageOpeners: GuidePhrase[] = [
  { italian: 'I miei nonni erano di origini italiane.', english: 'My grandparents were of Italian origin.', note: 'Opens almost every conversation. Italians love this.' },
  { italian: 'La mia famiglia è di origini calabresi.', english: 'My family is of Calabrian origin.', note: 'Fazzari is a Calabrian surname. This usually triggers warm reactions.' },
  { italian: 'I miei nonni sono emigrati negli Stati Uniti.', english: 'My grandparents emigrated to the United States.' },
  { italian: 'A casa parlavamo in dialetto.', english: 'At home we spoke in dialect.', note: 'Real talk — many Italian-Americans grew up with regional dialect, not standard Italian.' },
  { italian: 'Capisco bene ma faccio fatica a parlare.', english: 'I understand well but I struggle to speak.', note: 'A genuine heritage-speaker description. Italians find this endearing.' },
  { italian: 'Sto cercando di riprendere l\'italiano.', english: 'I\'m trying to pick Italian back up.' },
  { italian: 'È la mia prima volta in [città].', english: 'It\'s my first time in [city].' },
  { italian: 'Vengo per visitare le mie origini.', english: 'I\'m coming to visit my roots.' },
  { italian: 'Mi sento a casa qui.', english: 'I feel at home here.' },
]

const cathyPhrases: GuidePhrase[] = [
  { italian: 'Lei è la mia ragazza, Cathy.', english: 'She\'s my girlfriend, Cathy.' },
  { italian: 'Lei non parla italiano.', english: 'She doesn\'t speak Italian.' },
  { italian: 'Lei capisce qualche parola.', english: 'She understands a few words.' },
  { italian: 'Per lei niente glutine, è celiaca.', english: 'No gluten for her, she\'s celiac.' },
  { italian: 'Lei è allergica a...', english: 'She\'s allergic to...', note: 'Replace with: noci, arachidi, crostacei, latticini.' },
  { italian: 'Avete il menu in inglese per lei?', english: 'Do you have a menu in English for her?' },
  { italian: 'Possiamo avere due acque, una per lei e una per me?', english: 'Can we have two waters, one for her and one for me?' },
  { italian: 'Lei vorrebbe sapere cosa c\'è dentro.', english: 'She\'d like to know what\'s in it.' },
  { italian: 'Vi presento Cathy.', english: 'Let me introduce you to Cathy.' },
  { italian: 'Viaggiamo insieme da Los Angeles.', english: 'We\'re traveling together from Los Angeles.' },
  { italian: 'Siamo qui per tre settimane.', english: 'We\'re here for three weeks.' },
]

// ─── SECTION REGISTRY ─────────────────────────────────────────────────────────

export const studyGuideSections: GuideSection[] = [
  { type: 'phrases', id: 'pinned-trip', title: 'Pinned for the Trip', subtitle: 'Your must-haves', phrases: pinnedTrip },
  { type: 'example-scenarios', id: 'example-scenarios', title: 'Example Scenarios', subtitle: 'Dialogue + grammar breakdown', scenarios: exampleScenarios },
  { type: 'phrases', id: 'survival', title: 'Survival Phrases', subtitle: 'Frasi essenziali', phrases: survival },
  { type: 'phrases', id: 'heritage-openers', title: 'Heritage Openers', subtitle: 'Per i miei nonni', phrases: heritageOpeners },
  { type: 'phrases', id: 'cathy', title: 'Speaking for Cathy', subtitle: 'Per lei', phrases: cathyPhrases },
  { type: 'phrases', id: 'fillers', title: 'Fillers & Soft Words', subtitle: 'Allora, cioè, magari', phrases: fillers },
  { type: 'phrases', id: 'reactions', title: 'Reactions & Compliments', subtitle: 'Che bello!', phrases: reactions },
  { type: 'phrases', id: 'rental-car', title: 'Rental Car', subtitle: 'Auto a Noleggio', phrases: rentalCar },
  { type: 'phrases', id: 'hotel-checkin', title: 'Hotel Check-In', subtitle: 'Arrivo in hotel', phrases: hotelCheckin },
  { type: 'phrases', id: 'hotel-requests', title: 'Hotel Requests', subtitle: 'Richieste in hotel', phrases: hotelRequests },
  { type: 'phrases', id: 'getting-seated', title: 'Getting Seated', subtitle: 'Al ristorante', phrases: gettingSeated },
  { type: 'phrases', id: 'ordering', title: 'Ordering', subtitle: 'Ordinare', phrases: ordering },
  { type: 'phrases', id: 'paying', title: 'Paying', subtitle: 'Il conto', phrases: paying },
  { type: 'phrases', id: 'cafe', title: 'Café / Bar', subtitle: 'Al bar', phrases: cafePhrases },
  { type: 'phrases', id: 'gelato-aperitivo', title: 'Gelato & Aperitivo', subtitle: 'Dolcezze italiane', phrases: gelatoAperitivo },
  { type: 'phrases', id: 'getting-around', title: 'Getting Around', subtitle: 'Spostarsi', phrases: gettingAround },
  { type: 'vocab', id: 'vocab-around-town', title: 'Vocab — Around Town', subtitle: 'In città', items: vocabAroundTown },
  { type: 'vocab', id: 'vocab-transit', title: 'Vocab — Transit', subtitle: 'Trasporti', items: vocabTransit },
  { type: 'vocab', id: 'vocab-car', title: 'Vocab — The Car', subtitle: 'In macchina', items: vocabCar },
  { type: 'vocab', id: 'vocab-toiletries', title: 'Vocab — Toiletries', subtitle: 'Articoli da bagno', items: vocabToiletries },
  { type: 'vocab', id: 'vocab-clothing', title: 'Vocab — Clothing', subtitle: 'Abbigliamento', items: vocabClothing },
  { type: 'vocab', id: 'vocab-body-health', title: 'Vocab — Body & Health', subtitle: 'Corpo e salute', items: vocabBodyHealth },
  { type: 'vocab', id: 'vocab-money', title: 'Vocab — Money & Shopping', subtitle: 'Soldi e acquisti', items: vocabMoney },
  { type: 'vocab', id: 'vocab-food', title: 'Vocab — Food & Drink', subtitle: 'Cibo e bevande', items: vocabFood },
  { type: 'vocab', id: 'vocab-colors', title: 'Vocab — Colors', subtitle: 'Colori', items: vocabColors },
  { type: 'vocab', id: 'vocab-weather', title: 'Vocab — Weather', subtitle: 'Il tempo', items: vocabWeather },
  { type: 'vocab', id: 'vocab-beach', title: 'Vocab — Beach', subtitle: 'In spiaggia', items: vocabBeach },
  { type: 'verbs', id: 'present-verbs', title: 'Key Verb Conjugations', subtitle: 'Presente indicativo', verbs: presentVerbs },
  { type: 'possessives', id: 'possessives', title: 'Possessives', subtitle: 'Aggettivi possessivi' },
  { type: 'combinations', id: 'combinations', title: 'Useful Combinations', subtitle: 'Costruzioni utili', phrases: combinations },
  { type: 'past', id: 'past-tense', title: 'Past Tense', subtitle: 'Passato prossimo', pastVerbs, travelPhrases: pastTravelPhrases },
  { type: 'numbers', id: 'numbers', title: 'Numbers, Time & Dates', subtitle: 'Numeri, ora e date' },
]
