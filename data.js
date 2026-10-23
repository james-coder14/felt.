const GENRES = [
  "indie", "alternative", "r&b", "hip-hop", "pop", "rock",
  "electronic", "folk", "soul", "jazz", "lo-fi", "dream pop",
  "punk", "metal", "country", "ambient", "hyperpop"
];

const VIBES = [
  "melancholy", "euphoric", "introspective", "nostalgic",
  "aggressive", "dreamy", "raw", "soft", "cinematic",
  "danceable", "atmospheric", "bittersweet", "hopeful", "dark"
];

const SONG_CATALOG = [
  { title: "Motion Picture Soundtrack", artist: "Radiohead", genres: ["alternative", "rock"], vibes: ["melancholy", "cinematic"], tags: ["lonely", "quiet", "devastated", "empty"], reason: "sparse piano and a distant voice for the hollow after something ends." },
  { title: "Motion Sickness", artist: "Phoebe Bridgers", genres: ["indie", "folk"], vibes: ["melancholy", "bittersweet"], tags: ["heartbroken", "angry", "lonely"], reason: "sharp and still tender — like replaying an argument." },
  { title: "I Know The End", artist: "Phoebe Bridgers", genres: ["indie", "folk"], vibes: ["melancholy", "cinematic"], tags: ["ending", "apocalyptic", "release"], reason: "builds from quiet dread into full release." },
  { title: "Holocene", artist: "Bon Iver", genres: ["indie", "folk"], vibes: ["introspective", "atmospheric"], tags: ["small", "quiet", "lonely", "awe"], reason: "standing still while the world keeps moving." },
  { title: "Pink + White", artist: "Frank Ocean", genres: ["r&b", "soul"], vibes: ["nostalgic", "soft"], tags: ["nostalgia", "warm", "memory"], reason: "sun-lit nostalgia that never quite lets go." },
  { title: "Ivy", artist: "Frank Ocean", genres: ["r&b"], vibes: ["nostalgic", "bittersweet"], tags: ["love", "regret", "summer"], reason: "memory and desire tangled after something is gone." },
  { title: "Self Control", artist: "Frank Ocean", genres: ["r&b"], vibes: ["melancholy", "bittersweet"], tags: ["longing", "lonely", "night"], reason: "late-night almost calling someone you shouldn't." },
  { title: "Nights", artist: "Frank Ocean", genres: ["r&b", "hip-hop"], vibes: ["introspective", "dark"], tags: ["change", "growth", "lonely"], reason: "the before and after of a personal shift." },
  { title: "Looking Out for You", artist: "Joy Again", genres: ["indie", "dream pop"], vibes: ["soft", "nostalgic"], tags: ["crush", "gentle", "hope"], reason: "gentle and a little bittersweet." },
  { title: "Space Song", artist: "Beach House", genres: ["dream pop", "indie"], vibes: ["dreamy", "atmospheric"], tags: ["distant", "dreamy", "lonely"], reason: "floats between closeness and distance." },
  { title: "Myth", artist: "Beach House", genres: ["dream pop"], vibes: ["dreamy", "melancholy"], tags: ["longing", "mythic"], reason: "hazy and endless, like a feeling that won't resolve." },
  { title: "Silver Soul", artist: "Beach House", genres: ["dream pop"], vibes: ["dreamy", "euphoric"], tags: ["release", "light"], reason: "a slow bloom of light after a long grey stretch." },
  { title: "Real Love Baby", artist: "Father John Misty", genres: ["indie", "folk"], vibes: ["bittersweet", "nostalgic"], tags: ["love", "ironic", "warm"], reason: "warm, slightly ironic, still sincere about wanting connection." },
  { title: "The Night We Met", artist: "Lord Huron", genres: ["indie", "folk"], vibes: ["nostalgic", "melancholy"], tags: ["regret", "memory", "lost"], reason: "for the version of the past you keep trying to return to." },
  { title: "About You", artist: "The 1975", genres: ["pop", "alternative"], vibes: ["nostalgic", "bittersweet"], tags: ["missing", "love", "distance"], reason: "the ache of still thinking about someone long after." },
  { title: "Robbers", artist: "The 1975", genres: ["alternative", "indie"], vibes: ["raw", "aggressive"], tags: ["obsessive", "intense", "love"], reason: "desperate and completely consumed by another person." },
  { title: "Somebody Else", artist: "The 1975", genres: ["pop", "alternative"], vibes: ["melancholy", "bittersweet"], tags: ["jealousy", "loss", "change"], reason: "watching someone become a stranger." },
  { title: "Fine Line", artist: "Harry Styles", genres: ["pop", "rock"], vibes: ["bittersweet", "hopeful"], tags: ["ending", "acceptance"], reason: "the soft acceptance that some lines you just walk." },
  { title: "Sign of the Times", artist: "Harry Styles", genres: ["pop", "rock"], vibes: ["cinematic", "hopeful"], tags: ["change", "apocalyptic", "hope"], reason: "grand and slightly apocalyptic, still reaching." },
  { title: "Vienna", artist: "Billy Joel", genres: ["pop", "rock"], vibes: ["soft", "hopeful"], tags: ["patience", "pressure", "gentle"], reason: "you don't have to rush the becoming." },
  { title: "Landslide", artist: "Fleetwood Mac", genres: ["rock", "folk"], vibes: ["introspective", "nostalgic"], tags: ["change", "aging", "reflection"], reason: "looking at who you used to be." },
  { title: "Dreams", artist: "Fleetwood Mac", genres: ["rock"], vibes: ["bittersweet", "dreamy"], tags: ["freedom", "loss", "acceptance"], reason: "thunder only happens when it's raining." },
  { title: "Breathe Me", artist: "Sia", genres: ["pop", "alternative"], vibes: ["raw", "melancholy"], tags: ["fragile", "help", "lonely"], reason: "vulnerable to the point of breaking." },
  { title: "Running Up That Hill", artist: "Kate Bush", genres: ["pop", "alternative"], vibes: ["cinematic", "intense"], tags: ["deal", "understanding", "swap"], reason: "the desperate wish to trade places just to understand." },
  { title: "drivers license", artist: "Olivia Rodrigo", genres: ["pop"], vibes: ["melancholy", "raw"], tags: ["heartbreak", "teenage", "jealousy"], reason: "seeing someone move on while you're still stuck." },
  { title: "traitor", artist: "Olivia Rodrigo", genres: ["pop"], vibes: ["raw", "aggressive"], tags: ["betrayal", "anger"], reason: "clear-eyed anger at the person who chose someone else." },
  { title: "good 4 u", artist: "Olivia Rodrigo", genres: ["pop", "punk"], vibes: ["aggressive", "raw"], tags: ["angry", "petty", "release"], reason: "finally saying the mean thing out loud." },
  { title: "All Too Well", artist: "Taylor Swift", genres: ["pop", "folk"], vibes: ["nostalgic", "raw"], tags: ["memory", "heartbreak", "detail"], reason: "every small detail of a relationship that still lives in your body." },
  { title: "August", artist: "Taylor Swift", genres: ["pop", "indie"], vibes: ["nostalgic", "bittersweet"], tags: ["summer", "almost", "memory"], reason: "the almost-love that only existed in one season." },
  { title: "cardigan", artist: "Taylor Swift", genres: ["indie", "folk"], vibes: ["nostalgic", "soft"], tags: ["memory", "comfort", "lost"], reason: "soft nostalgia for a person who used to fit." },
  { title: "Anti-Hero", artist: "Taylor Swift", genres: ["pop"], vibes: ["introspective", "raw"], tags: ["self", "flawed", "lonely"], reason: "looking at yourself and not entirely liking what you see." },
  { title: "Mirrorball", artist: "Taylor Swift", genres: ["indie", "folk"], vibes: ["introspective", "soft"], tags: ["people-pleasing", "fragile"], reason: "becoming whatever the room needs." },
  { title: "Daylight", artist: "Taylor Swift", genres: ["pop"], vibes: ["hopeful", "soft"], tags: ["healing", "love", "new"], reason: "the slow warmth of something good after the dark." },
  { title: "Softly", artist: "Clairo", genres: ["indie", "r&b"], vibes: ["soft", "introspective"], tags: ["gentle", "crush", "shy"], reason: "quiet, careful wanting." },
  { title: "Bags", artist: "Clairo", genres: ["indie"], vibes: ["melancholy", "soft"], tags: ["leaving", "love", "distance"], reason: "knowing you should leave but not quite able to." },
  { title: "A Pearl", artist: "Mitski", genres: ["indie", "alternative"], vibes: ["raw", "melancholy"], tags: ["pain", "hiding", "self"], reason: "carrying something sharp inside and smiling anyway." },
  { title: "Nobody", artist: "Mitski", genres: ["indie", "pop"], vibes: ["raw", "lonely"], tags: ["lonely", "desperate", "want"], reason: "the loud loneliness of wanting someone — anyone." },
  { title: "Washing Machine Heart", artist: "Mitski", genres: ["indie"], vibes: ["raw", "aggressive"], tags: ["unrequited", "messy"], reason: "wanting to be chosen so badly it turns a little unhinged." },
  { title: "First Love / Late Spring", artist: "Mitski", genres: ["indie"], vibes: ["melancholy", "nostalgic"], tags: ["youth", "leaving", "family"], reason: "the grief of outgrowing a place or a version of yourself." },
  { title: "Francis Forever", artist: "Mitski", genres: ["indie", "folk"], vibes: ["melancholy", "soft"], tags: ["missing", "small"], reason: "missing someone in the smallest moments." },
  { title: "Two Slow Dancers", artist: "Mitski", genres: ["indie"], vibes: ["melancholy", "nostalgic"], tags: ["ending", "old", "bittersweet"], reason: "two people who used to be everything, still moving slowly." },
  { title: "My Love Mine All Mine", artist: "Mitski", genres: ["indie"], vibes: ["soft", "hopeful"], tags: ["love", "self", "moon"], reason: "a quiet claim on the love you still get to keep." },
  { title: "Ribs", artist: "Lorde", genres: ["pop", "alternative"], vibes: ["nostalgic", "anxious"], tags: ["youth", "time", "fear"], reason: "the sudden fear that the best nights are already behind you." },
  { title: "Liability", artist: "Lorde", genres: ["pop"], vibes: ["melancholy", "introspective"], tags: ["self", "burden", "lonely"], reason: "the quiet conviction that you are somehow too much." },
  { title: "Supercut", artist: "Lorde", genres: ["pop", "electronic"], vibes: ["nostalgic", "bittersweet"], tags: ["memory", "highlight", "pain"], reason: "replaying only the best moments until they hurt." },
  { title: "Green Light", artist: "Lorde", genres: ["pop"], vibes: ["euphoric", "aggressive"], tags: ["moving-on", "party", "release"], reason: "the first night you feel the weight start to lift." },
  { title: "Writer in the Dark", artist: "Lorde", genres: ["pop", "alternative"], vibes: ["raw", "melancholy"], tags: ["heartbreak", "writing", "revenge"], reason: "turning the pain into something sharp and lasting." },
  { title: "The Louvre", artist: "Lorde", genres: ["pop", "alternative"], vibes: ["dreamy", "hopeful"], tags: ["love", "art", "summer"], reason: "love as something vast and almost too beautiful to hold." },
  { title: "Perfect Places", artist: "Lorde", genres: ["pop"], vibes: ["bittersweet", "euphoric"], tags: ["search", "emptiness", "party"], reason: "chasing the perfect night and still feeling a little empty." },
  { title: "Sober", artist: "Lorde", genres: ["pop", "electronic"], vibes: ["dark", "danceable"], tags: ["party", "mask", "night"], reason: "the version of yourself that only exists after midnight." },
  { title: "Team", artist: "Lorde", genres: ["pop"], vibes: ["hopeful", "dreamy"], tags: ["youth", "us", "against"], reason: "a soft anthem for the people who still feel like home." },
  { title: "Hard Feelings", artist: "Lorde", genres: ["pop", "alternative"], vibes: ["raw", "melancholy"], tags: ["ending", "pain", "growth"], reason: "letting the hard feelings exist without trying to fix them yet." },
  { title: "Blinding Lights", artist: "The Weeknd", genres: ["pop", "r&b"], vibes: ["euphoric", "danceable"], tags: ["night", "obsession", "city"], reason: "neon, restless, unable to let go of the feeling." },
  { title: "Save Your Tears", artist: "The Weeknd", genres: ["pop", "r&b"], vibes: ["bittersweet", "danceable"], tags: ["regret", "party"], reason: "dancing through the regret instead of sitting with it." },
  { title: "Die For You", artist: "The Weeknd", genres: ["r&b"], vibes: ["melancholy", "soft"], tags: ["love", "sacrifice"], reason: "the kind of love that still wants to give everything." },
  { title: "Call Out My Name", artist: "The Weeknd", genres: ["r&b"], vibes: ["raw", "melancholy"], tags: ["heartbreak", "desperate"], reason: "desperate, soaring, completely unguarded." },
  { title: "After Hours", artist: "The Weeknd", genres: ["r&b"], vibes: ["dark", "atmospheric"], tags: ["night", "loneliness"], reason: "the long stretch of night when you're the only one still awake." },
  { title: "I Feel It Coming", artist: "The Weeknd", genres: ["pop", "r&b"], vibes: ["hopeful", "soft"], tags: ["new-love", "cautious"], reason: "cautious hope that this time the good feeling might stay." },
  { title: "See You Again", artist: "Tyler, The Creator", genres: ["hip-hop", "alternative"], vibes: ["hopeful", "nostalgic"], tags: ["friendship", "future"], reason: "looking forward to the day the right people find each other." },
  { title: "EARFQUAKE", artist: "Tyler, The Creator", genres: ["hip-hop", "pop"], vibes: ["raw", "melancholy"], tags: ["heartbreak", "vulnerable"], reason: "vulnerable in a way that still hits hard." },
  { title: "GONE, GONE / THANK YOU", artist: "Tyler, The Creator", genres: ["hip-hop"], vibes: ["hopeful", "bittersweet"], tags: ["gratitude", "growth"], reason: "saying goodbye to an old self and thanking it." },
  { title: "ARE WE STILL FRIENDS?", artist: "Tyler, The Creator", genres: ["hip-hop", "r&b"], vibes: ["melancholy", "soft"], tags: ["friendship", "distance"], reason: "the quiet fear that a friendship has already slipped." },
  { title: "WILDFLOWER", artist: "Billie Eilish", genres: ["pop", "alternative"], vibes: ["melancholy", "soft"], tags: ["guilt", "friendship"], reason: "the complicated guilt of being the reason someone is hurting." },
  { title: "CHIHIRO", artist: "Billie Eilish", genres: ["pop", "electronic"], vibes: ["dreamy", "melancholy"], tags: ["loss", "dream"], reason: "floating through a dream that keeps turning into loss." },
  { title: "LUNCH", artist: "Billie Eilish", genres: ["pop"], vibes: ["euphoric", "danceable"], tags: ["desire", "fun"], reason: "playful, hungry, unapologetic about wanting." },
  { title: "THE GREATEST", artist: "Billie Eilish", genres: ["pop"], vibes: ["melancholy", "raw"], tags: ["effort", "unseen"], reason: "all the work you did that nobody ever saw." },
  { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", genres: ["pop"], vibes: ["hopeful", "soft"], tags: ["love", "forever"], reason: "wanting to stay with someone even past the end of everything." },
  { title: "BLUE", artist: "Billie Eilish", genres: ["pop", "alternative"], vibes: ["melancholy", "atmospheric"], tags: ["sadness", "color"], reason: "when the sadness has a color and it is this exact shade." },
  { title: "Guess", artist: "Charli XCX", genres: ["hyperpop", "pop"], vibes: ["euphoric", "danceable"], tags: ["party", "confident"], reason: "loud, shiny confidence that doesn't ask for permission." },
  { title: "360", artist: "Charli XCX", genres: ["hyperpop", "pop"], vibes: ["euphoric", "danceable"], tags: ["self", "icon"], reason: "turning yourself into the main character of the night." },
  { title: "Von dutch", artist: "Charli XCX", genres: ["hyperpop", "pop"], vibes: ["aggressive", "euphoric"], tags: ["attention", "fame"], reason: "the hunger for attention that is both a joke and serious." },
  { title: "Midnight City", artist: "M83", genres: ["electronic", "dream pop"], vibes: ["euphoric", "cinematic"], tags: ["city", "night", "youth"], reason: "the sound of being young and unstoppable in a city at night." },
  { title: "Wait", artist: "M83", genres: ["electronic", "dream pop"], vibes: ["cinematic", "melancholy"], tags: ["time", "loss"], reason: "a sweeping feeling of time running out." },
  { title: "Outro", artist: "M83", genres: ["electronic", "ambient"], vibes: ["cinematic", "hopeful"], tags: ["epic", "ending"], reason: "the final movement of something vast." },
  { title: "Nightcall", artist: "Kavinsky", genres: ["electronic"], vibes: ["dark", "cinematic"], tags: ["night", "drive"], reason: "neon highways and the feeling that the night belongs to you." },
  { title: "My Tears Are Becoming A Sea", artist: "M83", genres: ["electronic", "ambient"], vibes: ["cinematic", "melancholy"], tags: ["overwhelm", "beauty"], reason: "when the feeling is so big it starts to flood everything." }
];

const EMOTION_PROFILES = {
  lonely: {
    name: "quiet loneliness",
    description: "the soft, persistent ache of being alone even when the room is full.",
    tags: ["lonely", "quiet", "empty", "distant", "missing"]
  },
  heartbroken: {
    name: "heartbreak that still breathes",
    description: "the specific pain of someone who mattered leaving a shape you can still feel.",
    tags: ["heartbroken", "loss", "regret", "missing", "ending"]
  },
  restless: {
    name: "restless energy",
    description: "something inside wants to move or break out, but the world hasn't opened yet.",
    tags: ["restless", "energy", "anxious", "trapped", "urgent"]
  },
  nostalgic: {
    name: "warm nostalgia",
    description: "a soft ache for a time, place, or person that no longer exists the way you remember.",
    tags: ["nostalgia", "memory", "summer", "past", "warm"]
  },
  proud_lonely: {
    name: "proud and somehow lonely",
    description: "you did the hard thing. you're standing taller. and somehow the room still feels empty.",
    tags: ["proud", "lonely", "accomplished", "isolated", "bittersweet"]
  },
  quiet_after: {
    name: "the quiet after",
    description: "the fight is over. the words are said. now there's only the strange, ringing silence.",
    tags: ["quiet", "after", "fight", "silence", "aftermath"]
  },
  devastated: {
    name: "quietly devastated",
    description: "everything is still moving. you're still moving. but something essential has cracked.",
    tags: ["devastated", "broken", "quiet", "pain", "fragile"]
  },
  hopeful: {
    name: "cautious hope",
    description: "something small and bright is trying to grow. you're not ready to trust it fully, but you're watching.",
    tags: ["hope", "hopeful", "new", "possibility", "light"]
  },
  angry: {
    name: "clean anger",
    description: "not chaotic rage — the clear, focused heat of knowing something was wrong.",
    tags: ["angry", "anger", "furious", "betrayed", "rage"]
  },
  dreamy: {
    name: "soft dream state",
    description: "half here, half somewhere better. the edges of the day have gone soft.",
    tags: ["dreamy", "float", "hazy", "soft", "distant"]
  },
  default: {
    name: "something unnamed",
    description: "a feeling that doesn't fit the usual labels. felt. will still try to meet it where it is.",
    tags: ["complex", "mixed", "unnamed"]
  }
};
