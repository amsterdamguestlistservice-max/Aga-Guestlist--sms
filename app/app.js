// Web and native (App Store) builds share this file. In the native app the
// page is served from capacitor://localhost, so API calls need the full URL.
const SITE_URL = 'https://www.amsterdamguestlistservice.website';
const IS_NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const API_BASE = /^https?:$/.test(location.protocol) && !IS_NATIVE ? '' : SITE_URL;

const EVENTS = [
  {
    id: "behind-closed-doors-2026-09-05",
    name: "Behind Closed Doors",
    date: "2026-09-05",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-09-05.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited", // "open" | "limited" | "closed" | "none" (no guestlist at all — tickets/table only)
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false,
    // Optional — only the Featured Event section uses this. Real clip from
    // the club floor with "BCD" signage visible; falls back to "image"
    // above if this isn't set (e.g. for events without footage yet).
    video: {
      mp4: "bcd-clip.mp4",
      webm: "bcd-clip.webm",
      poster: "events/behind-closed-doors-2026-09-05-poster.jpg"
    }
  },
  {
    id: "behind-closed-doors-2026-09-12",
    name: "Behind Closed Doors",
    date: "2026-09-12",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-09-12.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-09-19",
    name: "Behind Closed Doors",
    date: "2026-09-19",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-09-19.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-09-26",
    name: "Behind Closed Doors",
    date: "2026-09-26",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-09-26.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "nema-x-keinemusik-afterparty-2026-09-05",
    name: "Nema x Keinemusik Afterparty",
    date: "2026-09-05",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/nema-x-keinemusik-afterparty-2026-09-05.jpg",
    description: "The official Keinemusik afterparty from Nema — Kosta, Micha Barenholz and Mick Moscou behind the decks until 4am.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "shift-x-aurea-2026-09-05",
    name: "Shift x Aurea",
    date: "2026-09-05",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/shift-x-aurea-2026-09-05.jpg",
    description: "A two-room pre-party from 23:00 — Room 1 with Merlu, Keizar, Quin and Dax, Room 2 all night long with Amos, plus exclusive extras.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "huisfissa-2026-09-11",
    name: "Huisfissa",
    date: "2026-09-11",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/huisfissa-2026-09-11.jpg",
    description: "Two rooms, one night — Main Room hits and house with Djay Pequeno and Thys, plus Area 2 house with Sem Elbers and Mas.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "siempre-2026-09-04",
    name: "SIEMPRE",
    date: "2026-09-04",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/siempre-2026-09-04.jpg",
    description: "For the nights that last forever — Himalaya, Kosta, Donna, Rivaldo, Narro and Quinzo, hosted by Mister V.I.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?c=2t9qk&eventId=e_w44nd",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "wifey-amsterdam-2026-09-11",
    name: "WIFEY AMSTERDAM",
    date: "2026-09-11",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/wifey-amsterdam-2026-09-11.jpg",
    description: "WIFEY Amsterdam takes over Chin Chin Club for one night only.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "memoire-amsterdam-x-selva-2026-09-03",
    name: "MEMOIRE AMSTERDAM x SELVA",
    date: "2026-09-03",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/memoire-amsterdam-x-selva-2026-09-03.jpg",
    description: "Memoire Amsterdam joins forces with Selva for one night at Chin Chin Club.",
    guestlistStatus: "none", // no guestlist for this event — only tickets and table bookings
    ticketUrl: "https://shop.celebratix.io/?c=2t9qk&eventId=e_7hhea",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "layali-amsterdam-2026-09-20",
    name: "Layali Amsterdam",
    date: "2026-09-20",
    time: "20:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/layali-amsterdam-2026-09-20.jpg",
    description: "Amsterdam · Arabic Nights — an evening of Arabic music and culture, 20:00 till 00:30.",
    guestlistStatus: "none", // no guestlist for this event — only tickets and table bookings
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "pretty-young-thing-2026-09-25",
    name: "Pretty Young Thing",
    date: "2026-09-25",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/pretty-young-thing-2026-09-25.jpg",
    description: "Merlu, Raffa, Micha and Nick Averton, 23:00 till 04:00 — new wave, throwbacks and more.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: true,
    countdownEnabled: true
  },
  {
    id: "nema-2026-10-31",
    name: "Nema",
    date: "2026-10-31",
    time: "23:00",
    venue: "Bar Rouge · Amsterdam",
    image: "events/nema-2026-10-31.png",
    description: "Nema returns for one night at Bar Rouge, 23:00 till 04:00. This event is completely sold out — the guestlist is full and there are no tickets left.",
    guestlistStatus: "closed",
    badgeLabel: "Sold Out",
    closedLabel: "Guestlist Full",
    ticketUrl: "#",
    ticketsSoldOut: true,
    ticketButtonLabel: "Buy Discount Tickets",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "roza-2026-09-25",
    name: "Roza",
    date: "2026-09-25",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/roza-2026-09-25.jpg",
    description: "Tone, Kosta, Pequeno and Dazey, 23:00 till 04:00. Dresscode: black, white, red.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "desire-2026-10-10",
    name: "Desire",
    date: "2026-10-10",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/desire-2026-10-10.jpg",
    description: "Merlu, Romee, Charlizeh, Ozai and Belu, hosted by MC Shell. 23:00 till 04:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-10-03",
    name: "Behind Closed Doors",
    date: "2026-10-03",
    time: "00:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-10-03.jpg",
    description: "BCD x Alex Oliva & Friends: Mojo, Quinzo, Alex Oliva, Narro, Kalla, hosted by Prempeh. Lounge: Saar, Quinchoo. 00:00 till 04:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "shift-x-aurea-2026-10-02",
    name: "Shift x Aurea",
    date: "2026-10-02",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/shift-x-aurea-2026-10-02.jpg",
    description: "Aurea x Shift, line-up TBA. 23:00 till 04:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "huisfissa-2026-10-09",
    name: "Huisfissa",
    date: "2026-10-09",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/huisfissa-2026-10-09.jpg",
    description: "Main Room hits, urban and house with Djay, Pequeno, Sam Last and Thys, hosted by Siddy MC. Area 2 throwback with Ticey and Peq. 23:00 till 04:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-10-10",
    name: "Behind Closed Doors",
    date: "2026-10-10",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-10-10.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "mita-ade-2026-10-23",
    name: "MITA x ADE",
    date: "2026-10-23",
    time: "17:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/mita-ade-2026-10-23.jpg",
    description: "MITA x ADE special edition with Cees, Chopper, Gissa, Mitch Julian, Roox and Sven Jansen. 17:00 till 22:00.",
    guestlistStatus: "open",
    ticketUrl: "#",
    ticketLabel: "Guestlist Only",
    guestlistUrl: "#guestlist",
    // Tickets are emailed to each guest to personalise, so every guest
    // (incl. additional guests) must give first & last name, age and email.
    guestEmailRequired: true,
    guestGenderRequired: true, // MITA needs man/woman per guest for the ticket
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-10-17",
    name: "Behind Closed Doors",
    date: "2026-10-17",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-10-17.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-10-24",
    name: "Johnny 500 & Friends",
    date: "2026-10-24",
    time: "22:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-10-24.jpg",
    description: "Behind Closed Doors presents Johnny 500 & Friends — ADE special at Jimmy Woo. Urban, Afro & R&B. 22:00 till 05:00. 21+.",
    guestlistStatus: "none",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg&eventId=e_n3bfr",
    badgeLabel: "Discount Tickets Only",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-10-31",
    name: "Behind Closed Doors",
    date: "2026-10-31",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-10-31.jpg",
    description: "Halloween: BCD x Luca Nahorst & Friends. Club: Luca Nahorst, Smitmeister, DaniQ, MC Lion. Lounge: Romée, Gabi, Sann.",
    guestlistStatus: "none",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    badgeLabel: "Discount Tickets Only",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-11-07",
    name: "Behind Closed Doors",
    date: "2026-11-07",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-11-07.jpg",
    description: "BCD presents Damian Bday Bash. Club: Campz, Quinchoo, Luca Nahorst, Damie b2b Jayson Alanzo, Mojo, MC Shel. Lounge: Romée, Benji, Jaci Wodo.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-11-14",
    name: "Behind Closed Doors",
    date: "2026-11-14",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-11-14.jpg",
    description: "BCD x Soirée x Autrefois. Club: Diana, Yung Alxndr, Quinchoo, hosted by Razberry. Lounge: Denna, Merlu, Jo'ell.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-11-21",
    name: "Behind Closed Doors",
    date: "2026-11-21",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-11-21.jpg",
    minAge: 21,
    description: "BCD x Habits. Club: Salie, Rivaldo, Esma Zavina, hosted by Giac Orpheo. Lounge: Merlu, Devøra. The Age OK list (18-20) is full, the guestlist is now 21+ only.",
    ageOkWaitlist: true,
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "mita-suppers-house-2026-11-21",
    name: "MITA x Suppers House",
    date: "2026-11-21",
    time: "23:00",
    venue: "Suppers House · Amsterdam",
    image: "events/mita-suppers-house-2026-11-21.jpg",
    description: "Roox & Friends: Mannus, Dua Cultura, Kosta, Roox. 23:00 till 04:00.",
    guestlistStatus: "open",
    ticketUrl: "#",
    ticketLabel: "Guestlist Only",
    guestlistUrl: "#guestlist",
    // Same as earlier MITA nights: tickets are personalised per guest.
    guestEmailRequired: true,
    guestGenderRequired: true,
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-11-28",
    name: "Behind Closed Doors",
    date: "2026-11-28",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-11-28.jpg",
    description: "BCD presents Cour des Étoiles at Jimmy Woo. Club: Jaci Wodo, Invictim, Leethedeejay, Pequeno and a mystery guest.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-12-05",
    name: "Behind Closed Doors",
    date: "2026-12-05",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-12-05.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-12-12",
    name: "Behind Closed Doors",
    date: "2026-12-12",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-12-12.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-12-19",
    name: "Behind Closed Doors",
    date: "2026-12-19",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-12-19.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2026-12-26",
    name: "Behind Closed Doors",
    date: "2026-12-26",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2026-12-26.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2027-01-02",
    name: "Behind Closed Doors",
    date: "2027-01-02",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2027-01-02.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2027-01-09",
    name: "Behind Closed Doors",
    date: "2027-01-09",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2027-01-09.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2027-01-16",
    name: "Behind Closed Doors",
    date: "2027-01-16",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2027-01-16.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2027-01-23",
    name: "Behind Closed Doors",
    date: "2027-01-23",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2027-01-23.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-2027-01-30",
    name: "Behind Closed Doors",
    date: "2027-01-30",
    time: "23:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-2027-01-30.jpg",
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "afroholic-2026-10-23",
    name: "Afroholic",
    date: "2026-10-23",
    time: "23:30",
    venue: "Soul Kitchen · Amsterdam",
    image: "events/afroholic-2026-10-23.jpg",
    description: "Amajoyo presents Afroholic, an ADE special with Nitefreak, De La Noise, Wilson Kentura, Thami The Unknown, Elson Soares and Randoree · Marinus. 23:30 till 05:00. Discounted tickets.",
    guestlistStatus: "none",
    ticketUrl: "#",
    ticketLabel: "Discount Tickets Soon Available",
    badgeLabel: "Discount Tickets Only",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "afrohouse-collective-cruise-2026-10-25",
    name: "The AfroHouse Collective Cruise",
    date: "2026-10-25",
    time: "16:00",
    venue: "The Cruise Club · Amsterdam",
    image: "events/afrohouse-collective-cruise-2026-10-25.jpg",
    description: "The best Afro house beats & braai on a boat, by Amajoyo, Afro 2 the World, Deep State, Zenda, Venha Aqui and Mélodika. Amsterdam Central, Pier 14 (next to the ferry). 16:00 till 21:00, the boat leaves at 16:15.",
    guestlistStatus: "none",
    ticketUrl: "https://weeztix.shop/mvc36v22?coupon=amsterdamguestlistserivce",
    badgeLabel: "Discount Tickets Only",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "pretty-young-thing-halloween-2026-10-30",
    name: "Pretty Young Thing · Halloween Night",
    date: "2026-10-30",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    image: "events/pretty-young-thing-halloween-2026-10-30.jpg",
    description: "Halloween Night with Tins (23:00-01:00), Campz (01:00-02:30) and Raffa (02:30-close), hosted by MC Nick Averton (01:00-04:00). Discounted tickets.",
    guestlistStatus: "none",
    ticketUrl: "https://ticketapp.shop/jvgfntrvbl?promoCode=MzMozKZUDC",
    badgeLabel: "Discount Tickets Only",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "desire-2026-11-14",
    name: "Desire",
    date: "2026-11-14",
    time: "23:59",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/desire-2026-11-14.jpg",
    description: "Where she comes alive. Music by Mystery Artist, Quinzo, Danita Regina, Ozai and Rivaldo, hosted by Kelly MC. Rozengracht 133, 23:59 till 05:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "house-of-zenda-2026-11-28",
    name: "House of Zenda",
    date: "2026-11-28",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/house-of-zenda-2026-11-28.jpg",
    clip: { mp4: "events/house-of-zenda-2026-11-28.mp4", poster: "events/house-of-zenda-2026-11-28-poster.jpg" },
    description: "House of Zenda at Chin Chin Club. 21+, Age OK list (18-20) open.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?c=356ku",
    badgeLabel: "", // empty = no badge on the card
    guestlistUrl: "#guestlist",
    minAge: 18,
    featured: false,
    countdownEnabled: false
  },
  {
    id: "club-fair-2026-11-20",
    name: "Club Fair",
    date: "2026-11-20",
    time: "23:00",
    endTime: "04:00",
    venue: "Oliva · Amsterdam",
    image: "events/club-fair-2026-11-20.jpg",
    description: "Club Fair — the most special night out. Moulin Rouge, hits & house at Oliva. 23:00 till 05:00.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "roza-2026-11-27",
    name: "Roza",
    date: "2026-11-27",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    image: "events/roza-2026-11-27.jpg",
    clip: { mp4: "events/roza-feed.mp4", poster: "events/roza-feed-poster.jpg" },
    description: "Roza at Chin Chin Club with Brayen, Djay, Mick Moscou and Pequeno. 23:00 till 05:00. Dresscode: black, white, red.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "behind-closed-doors-nye-2026-12-31",
    name: "Behind Closed Doors · New Year’s Eve",
    date: "2026-12-31",
    time: "23:00",
    endTime: "04:00",
    venue: "Jimmy Woo · Amsterdam",
    image: "events/behind-closed-doors-nye-2026-12-31.jpg",
    description: "Behind Closed Doors New Year’s Eve Nº27 at Jimmy Woo. 23:00 till 04:00. Discounted tickets through AGS.",
    guestlistStatus: "none", // NYE = tickets only
    ticketUrl: "https://shop.celebratix.io/?t=36fcxh",
    badgeLabel: "NYE · Discount Tickets",
    discount: true,
    guestlistUrl: "#guestlist",
    publicFrom: "2026-11-25T19:00:00+01:00", // members (Silver+) see it early; public with the NYE push at 19:00
    featured: false,
    countdownEnabled: false
  },
  {
    id: "huisfissa-2026-12-11",
    name: "Huisfissa",
    date: "2026-12-11",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    description: "Huisfissa at Oliva — Main Room and Area 2. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // recurring night (2nd Friday) — add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "desire-2026-12-12",
    name: "Desire",
    date: "2026-12-12",
    time: "23:00",
    endTime: "04:00",
    venue: "Chin Chin Club · Amsterdam",
    description: "Desire at Chin Chin Club, Rozengracht 133. 23:00 till 04:00. Guestlist only. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "club-fair-2026-12-18",
    name: "Club Fair",
    date: "2026-12-18",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    description: "Club Fair at Oliva. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // recurring night (3rd Friday) — add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "huisfissa-2027-01-08",
    name: "Huisfissa",
    date: "2027-01-08",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    description: "Huisfissa at Oliva — Main Room and Area 2. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // recurring night (2nd Friday) — add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "club-fair-2027-01-15",
    name: "Club Fair",
    date: "2027-01-15",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    description: "Club Fair at Oliva. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // recurring night (3rd Friday) — add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "roza-2027-01-22",
    name: "Roza",
    date: "2027-01-22",
    time: "23:00",
    venue: "Chin Chin Club · Amsterdam",
    clip: { mp4: "events/roza-feed.mp4", poster: "events/roza-feed-poster.jpg" },
    description: "Roza at Chin Chin Club. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // recurring night (4th Friday) — add the flyer when it's in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "shift-amsterdam-2026-12-10",
    name: "Shift Amsterdam",
    date: "2026-12-10",
    time: "23:00",
    venue: "Oliva · Amsterdam",
    description: "Shift Amsterdam at Oliva. Line-up coming soon.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
    featured: false,
    countdownEnabled: false
  },
  {
    id: "nema-2026-12-05",
    name: "NEMA",
    date: "2026-12-05",
    time: "23:00",
    venue: "MEWE · Amsterdam",
    image: "events/nema-2026-12-05.jpg",
    clip: { mp4: "events/nema-2026-12-05.mp4", poster: "events/nema-2026-12-05-poster.jpg" },
    description: "NEMA at MEWE Amsterdam (Korte Leidsedwarsstraat 14). Afro House / Afro Tech with Bastik, Deuces, Azaro, Rezaie and Noah Staal. 23:00 till 04:00. Men 21+, women 18+.",
    guestlistStatus: "limited",
    minAge: 18,
    minAgeMen: 21,
    minAgeWomen: 18,
    guestGenderRequired: true,
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "amajoyo-2026-11-27",
    name: "Amajoyo",
    date: "2026-11-27",
    time: "23:00",
    venue: "Soul Kitchen · Amsterdam",
    image: "events/amajoyo-2026-11-27.jpg",
    clip: { mp4: "events/amajoyo-2026-11-27.mp4", poster: "events/amajoyo-2026-11-27-poster.jpg" },
    featuredHero: true, // big video at the top of the home screen; tap = straight to the guestlist
    description: "Amajoyo at Soul Kitchen with De La Noise, Terrie T (Afroholic), Pascal Morais, Dems . Rezaie and Noah Staal. 23:00 till 04:00. Normally 23+, but on the AGS guestlist you're in from 20+. Discounted BFF tickets via AGS (23+).",
    guestlistStatus: "limited",
    minAge: 20,
    ticketUrl: "https://site.fourvenues.com/en/amsterdam-guestlist-service/events/soulkitchen-invites-amajoyo-27-11-2026-XBHW",
    ticketButtonLabel: "BFF Discount Tickets (23+)",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  },
  {
    id: "common-sense-all-or-nothing-2026-11-13",
    name: "Common Sense: All or Nothing",
    date: "2026-11-13",
    time: "23:30",
    venue: "Club Panama · Amsterdam",
    image: "events/common-sense-all-or-nothing-2026-11-13.jpg",
    description: "Common Sense Events presents All or Nothing at Club Panama. Main Stage: Sam Last, Jacob. Boiler Room: DJ Stem, Wootroo, Deivv. 23:30 till 05:00. 18+.",
    guestlistStatus: "none",
    minAge: 18,
    ticketUrl: "https://shop.celebratix.io/?t=355v52",
    ticketButtonLabel: "Buy Discount Tickets",
    guestlistUrl: "#guestlist",
    featured: false,
    countdownEnabled: false
  }
];
/* ================================================================
   REFERRALS — capture ?ref=CODE from the URL as soon as the app
   loads, so it survives however long the guest browses before they
   actually sign up. Consumed at signup time (see the signup handler).
   ================================================================ */
(function captureReferralCode(){
  try{
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if(ref){ localStorage.setItem('ags_referral_code', ref.trim().toUpperCase()); }
  } catch(e){ /* localStorage unavailable — referral just won't be tracked */ }
})();

/* ================================================================
   HELPERS
   ================================================================ */
function formatDate(dateStr){
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const d = new Date(dateStr + 'T00:00:00');
  const year = d.getFullYear() !== new Date().getFullYear() ? ' ' + d.getFullYear() : '';
  return days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()] + year;
}
function formatDateReadable(dateStr){
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
}
function formatDateDutchShort(dateStr){
  const months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDate() + ' ' + months[d.getMonth()];
}
function eventVenueName(ev){
  return ev.venue.split('·')[0].trim();
}
// Flyers fade in once loaded; until then the frame shows a soft shimmer.
function markMediaLoaded(e){
  const el = e.target;
  if(el && el.tagName === 'IMG' && el.parentElement &&
     (el.parentElement.classList.contains('event-card__media') || el.parentElement.classList.contains('sheet__media'))){
    el.parentElement.classList.add('is-loaded');
  }
}
document.addEventListener('load', markMediaLoaded, true);
document.addEventListener('error', markMediaLoaded, true);

function eventStartTime(ev){
  return new Date(ev.date + 'T' + (ev.time || '22:00')).getTime();
}
function formatStartsIn(ms){
  if(ms <= 0) return 'Tonight';
  const totalMinutes = Math.max(1, Math.floor(ms / 60000));
  const d = Math.floor(totalMinutes / 1440);
  const h = Math.floor((totalMinutes % 1440) / 60);
  const m = totalMinutes % 60;
  if(d > 0) return 'Starts in ' + d + 'd ' + h + 'h';
  if(h > 0) return 'Starts in ' + h + 'h ' + m + 'm';
  return 'Starts in ' + m + 'm';
}
function updateStartCountdowns(){
  document.querySelectorAll('.js-starts-in').forEach(function(el){
    el.textContent = formatStartsIn(parseInt(el.dataset.start, 10) - Date.now());
  });
}
setInterval(updateStartCountdowns, 30000);

function revealCardsOnScroll(){
  // All parties show straight away (no fade-in while scrolling).
  document.querySelectorAll('#eventList .event-card.will-reveal').forEach(function(c){ c.classList.remove('will-reveal'); });
  return;
  if(!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.remove('will-reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin:'0px 0px -6% 0px' });
  document.querySelectorAll('#eventList .event-card').forEach(function(card, i){
    if(i === 0) return; // the featured card is on screen straight away
    card.classList.add('will-reveal');
    observer.observe(card);
  });
}

// Flyers are served as WebP (about half the size); the original is the fallback.
function webpOf(src){ return /^events\/[^?#]+\.(jpe?g|png)$/i.test(String(src || '')) ? String(src).replace(/\.(jpe?g|png)$/i, '.webp') : ''; }
function imgTag(src, alt, attrs){
  const w = webpOf(src);
  return '<img src="' + (w || src) + '"' + (w ? ' data-fallback="' + src + '" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute(\'data-fallback\');}"' : '') +
    ' alt="' + String(alt || '').replace(/"/g, '&quot;') + '"' + (attrs || '') + '>';
}
function eventMedia(ev, attrs){
  if((ev.flyerPending && !isPastEvent(ev)) || !ev.image){
    return autoPoster(ev);
  }
  return imgTag(ev.image, ev.name, attrs);
}
// A designed AGS poster for nights whose flyer isn't in yet, so the
// app never shows an empty block.
function autoPoster(ev){
  const d = new Date(ev.date + 'T00:00:00');
  const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  const month = ['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  return '<div class="auto-poster" role="img" aria-label="' + esc(ev.name) + '">' +
    '<span class="auto-poster__light auto-poster__light--a"></span><span class="auto-poster__light auto-poster__light--b"></span>' +
    '<span class="auto-poster__beam"></span>' +
    '<div class="auto-poster__inner">' +
      '<img class="auto-poster__logo" src="icon-192.png" alt="">' +
      '<div class="auto-poster__presents">AGS presents</div>' +
      '<div class="auto-poster__name">' + esc(ev.name) + '</div>' +
      '<div class="auto-poster__rule"></div>' +
      '<div class="auto-poster__date">' + day + ' ' + d.getDate() + ' ' + month + (ev.time ? ' · ' + esc(ev.time) : '') + '</div>' +
      '<div class="auto-poster__venue">' + esc(eventVenueName(ev)) + '</div>' +
      '<div class="auto-poster__soon">Line-up dropping soon</div>' +
    '</div>' +
  '</div>';
}
// Lets the flyer's own colours glow around it (CSS var used by ::after).
function flyerStyle(ev){
  if(!ev || !ev.image || (ev.flyerPending && !isPastEvent(ev))) return '';
  return ' style="--flyer:url(\'' + String(webpOf(ev.image) || ev.image).replace(/'/g, '%27') + '\')"';
}
function guestlistBadge(status, label){
  if(status === 'limited') return '<span class="event-card__badge">Limited Guestlist</span>';
  if(status === 'closed') return '<span class="event-card__badge is-closed">' + (label || 'Guestlist Closed') + '</span>';
  if(status === 'soon') return '<span class="event-card__badge">Guestlist Coming Soon</span>';
  if(status === 'none') return label === '' ? '' : '<span class="event-card__badge">' + (label || 'Tickets Only') + '</span>';
  return '';
}
function buildTableBookingLink(ev){
  const message = 'Hi, ik wil graag een tafel reserveren voor ' + ev.name +
    ' op ' + formatDateDutchShort(ev.date) + ' bij ' + eventVenueName(ev) +
    '. Kunnen jullie mij de mogelijkheden en prijzen sturen?';
  return 'https://wa.me/31644948562?text=' + encodeURIComponent(message);
}
function buildTicketWhatsappLink(ev){
  const message = 'Hi, ik wil graag kortingstickets kopen voor ' + ev.name +
    ' op ' + formatDateDutchShort(ev.date) + ' bij ' + eventVenueName(ev) + '.';
  return 'https://wa.me/31644948562?text=' + encodeURIComponent(message);
}
function isPastEvent(ev){
  return new Date(ev.date + 'T' + (ev.time || '22:00')).getTime() < Date.now();
}
/* ---- Members (Silver+, 50 points): secret parties + 48h early access ----
   ev.secret     → only members see it (loaded from Supabase, never in this file)
   ev.publicFrom → ISO time; before it only members see the party (early access) */
let IS_MEMBER = false;
let SECRET_COUNT = 0;
function isEarlyOnly(ev){ return !!(ev && ev.publicFrom && Date.now() < Date.parse(ev.publicFrom)); }
function eventVisible(ev){ return (ev.secret || isEarlyOnly(ev)) ? IS_MEMBER : true; }
function memberTag(ev){
  if(ev.secret) return '<div class="event-card__members">🔒 Secret party · members only</div>';
  if(isEarlyOnly(ev)){
    const h = Math.max(1, Math.round((Date.parse(ev.publicFrom) - Date.now()) / 36e5));
    return '<div class="event-card__members">⚡ Early access · public in ' + (h >= 24 ? Math.round(h / 24) + 'd' : h + 'h') + '</div>';
  }
  return '';
}
function memberTeaserHtml(){
  if(IS_MEMBER) return '';
  const early = EVENTS.filter(function(ev){ return isEarlyOnly(ev) && !isPastEvent(ev); }).length;
  const n = SECRET_COUNT + early;
  if(!n) return '';
  return '<div class="member-teaser"><div class="member-teaser__lock">🔒</div>' +
    '<div><b>' + n + ' members-only ' + (n === 1 ? 'party' : 'parties') + '</b>' +
    '<span>Reach Silver (50 points) to unlock secret parties and see new parties 48 hours before everyone else. +10 points for every night you’re on the list.</span></div></div>';
}
async function loadMemberAccess(){
  if(!supabaseClient) return;
  try{
    const { data, error } = await supabaseClient.rpc('member_access');
    if(error || !data) return;
    IS_MEMBER = !!data.member;
    SECRET_COUNT = Number(data.secret_count) || 0;
    (data.events || []).forEach(function(ev){
      if(!ev || !ev.id || EVENTS.some(function(x){ return x.id === ev.id; })) return;
      ev.secret = true;
      EVENTS.push(ev);
    });
    renderEventList();
    try{ renderVenueFilter(); } catch(e){}
  } catch(e){}
}

/* ---- Music genres per party series (16). Add a name here once and every
   date of that party gets the genre; ev.genres on one event overrides. ---- */
const GENRES_BY_NAME = {
  'Amajoyo': ['Afro house'],
  'NEMA': ['Afro house'],
  'Club Fair': ['Hits', 'House'],
  'Behind Closed Doors': ['Amapiano', 'House', 'Afro house', 'New wave'],
  'House of Zenda': ['Afro house', 'Amapiano'],
  'Huisfissa': ['House', 'New wave'],
  'Roza': ['Hits', 'House']
};
function eventGenres(ev){ return (ev && (ev.genres || GENRES_BY_NAME[ev.name])) || []; }

/* ---- For you (15): parties like the ones you went to, opened or follow ---- */
let MY_PREFS = null; // { names:{}, venues:{}, genres:{}, follows:Set }
let MY_FOLLOWS = new Set();
async function loadMyPrefs(){
  if(!supabaseClient || !currentUser) return;
  try{
    const [reqs, views, follows] = await Promise.all([
      supabaseClient.from('guestlist_requests').select('event_name, event_venue, status').limit(200),
      supabaseClient.from('event_views').select('event_name, venue, views').limit(300),
      supabaseClient.from('venue_follows').select('venue')
    ]);
    const prefs = { names:{}, venues:{}, genres:{} };
    const add = function(map, k, n){ if(k) map[k] = (map[k] || 0) + n; };
    (reqs.data || []).forEach(function(r){
      const w = String(r.status || '').toLowerCase() === 'approved' ? 3 : 2;
      add(prefs.names, r.event_name, w); add(prefs.venues, String(r.event_venue || '').split(' · ')[0], w);
      (GENRES_BY_NAME[r.event_name] || []).forEach(function(g){ add(prefs.genres, g, w); });
    });
    (views.data || []).forEach(function(v){
      add(prefs.names, v.event_name, 1); add(prefs.venues, String(v.venue || '').split(' · ')[0], 1);
      (GENRES_BY_NAME[v.event_name] || []).forEach(function(g){ add(prefs.genres, g, 1); });
    });
    MY_FOLLOWS = new Set((follows.data || []).map(function(f){ return f.venue; }));
    try{
      const { data: mp } = await supabaseClient.from('member_profiles').select('genres').eq('user_id', currentUser.id).maybeSingle();
      ((mp && mp.genres) || []).forEach(function(g){ add(prefs.genres, g, 3); });
    } catch(e){}
    MY_PREFS = prefs;
    renderEventList();
    try{ renderVenueFilter(); } catch(e){}
  } catch(e){}
}
function forYouScore(ev){
  if(!MY_PREFS) return 0;
  const venue = eventVenueName(ev);
  let score = 0;
  if(MY_FOLLOWS.has(venue)) score += 4;
  score += Math.min(4, MY_PREFS.names[ev.name] || 0);
  score += Math.min(2, MY_PREFS.venues[venue] || 0);
  eventGenres(ev).forEach(function(g){ score += Math.min(3, MY_PREFS.genres[g] || 0); });
  return score;
}
function isForYou(ev){ return forYouScore(ev) >= 3; }
// Social proof (4): real ratings per party and today's interest.
let PROOF = { ratings: {}, trending: {} };
async function loadProof(){
  if(!supabaseClient) return;
  try{
    const { data } = await supabaseClient.rpc('party_proof');
    if(data){ PROOF = { ratings: data.ratings || {}, trending: data.trending || {} }; renderEventList(); }
  } catch(e){}
}
function proofHtml(ev){
  const r = PROOF.ratings[ev.name], t = PROOF.trending[ev.id];
  const out = [];
  if(r && r.n >= 3) out.push('<span class="is-star">★ ' + Number(r.avg).toFixed(1) + ' · ' + r.n + ' guests</span>');
  if(t) out.push('<span class="is-hot">🔥 ' + t + ' looking today</span>');
  return out.length ? '<div class="event-card__proof">' + out.join('') + '</div>' : '';
}
function cardTags(ev){
  const tags = [];
  if(ev.sponsored) tags.push('<span class="event-card__tag is-sponsored">Sponsored</span>');
  if(isForYou(ev)) tags.push('<span class="event-card__tag is-foryou">✨ For you</span>');
  eventGenres(ev).forEach(function(g){ tags.push('<span class="event-card__tag">' + g + '</span>'); });
  return tags.length ? '<div class="event-card__tags">' + tags.join('') + '</div>' : '';
}

function getSortedEvents(){
  return EVENTS.filter(function(ev){ return !isPastEvent(ev) && eventVisible(ev); }).sort(function(a, b){
    return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time);
  });
}
function getPastEvents(){
  return EVENTS.filter(isPastEvent).sort(function(a, b){
    return new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time);
  });
}

/* ================================================================
   TAB NAVIGATION
   ================================================================ */
function switchTab(name){
  document.querySelectorAll('.tab-panel').forEach(function(el){
    el.classList.toggle('is-active', el.id === 'tab-' + name);
  });
  const tabName = name === 'contact' ? 'account' : name; // Contact lives under Account
  document.querySelectorAll('.app-tabbar button').forEach(function(btn){
    btn.classList.toggle('is-active', btn.dataset.tab === tabName);
  });
  window.scrollTo(0, 0);
  document.body.classList.toggle('feed-mode', name === 'feed');
  if(name === 'feed'){ try{ renderFeed(); } catch(e){} } else { try{ pauseFeed(); } catch(e){} }
  // Keep "My Requests" fresh whenever the Account tab is opened while
  // signed in — e.g. right after submitting a new request elsewhere.
  if(name === 'account' && typeof currentUser !== 'undefined' && currentUser){
    loadMyRequests();
  }
}
document.querySelectorAll('.app-tabbar button').forEach(function(btn){
  btn.addEventListener('click', function(){
    if(btn.dataset.tab === 'guestlist'){
      document.getElementById('glSpotNotice').style.display = 'none';
      if(typeof resetGuestlistFormForNext === 'function'){ resetGuestlistFormForNext(); prefillGuestlistForm(); }
    }
    switchTab(btn.dataset.tab);
  });
});

// Venue filter pills above the full event list — lets a visitor
// narrow the list to one club. Pills are built from whichever venues
// actually appear in EVENTS, so a new venue shows up automatically.
function renderVenueFilter(){
  const wrap = document.getElementById('venueFilter');
  if(!wrap) return;

  const venues = [];
  getSortedEvents().forEach(function(ev){
    const name = eventVenueName(ev);
    if(venues.indexOf(name) === -1) venues.push(name);
  });
  if(venues.length < 2){ wrap.style.display = 'none'; return; }

  const genres = [];
  getSortedEvents().forEach(function(ev){ eventGenres(ev).forEach(function(g){ if(genres.indexOf(g) === -1) genres.push(g); }); });
  const anyForYou = getSortedEvents().some(isForYou);
  const pills = [{ kind:'all', val:'All', label:'All' }]
    .concat(anyForYou ? [{ kind:'foryou', val:'1', label:'✨ For you' }] : [])
    .concat(genres.map(function(g){ return { kind:'genre', val:g, label:'♫ ' + g }; }))
    .concat(venues.map(function(v){ return { kind:'venue', val:v, label:v }; }));
  const active = wrap.dataset.active || 'all|All';
  wrap.innerHTML = pills.map(function(p){
    const key = p.kind + '|' + p.val;
    return '<button type="button" class="venue-filter__pill' + (p.kind === 'genre' ? ' is-genre' : '') + (p.kind === 'foryou' ? ' is-foryou' : '') +
      (key === active ? ' is-active' : '') + '" data-kind="' + p.kind + '" data-venue="' + p.val + '">' + p.label + '</button>';
  }).join('');
  if(!wrap.querySelector('.is-active')){ wrap.dataset.active = 'all|All'; wrap.querySelector('.venue-filter__pill').classList.add('is-active'); }

  wrap.querySelectorAll('.venue-filter__pill').forEach(function(btn){
    btn.addEventListener('click', function(){
      wrap.querySelectorAll('.venue-filter__pill').forEach(function(p){ p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      wrap.dataset.active = btn.dataset.kind + '|' + btn.dataset.venue;
      filterEventsByVenue(btn.dataset.venue, btn.dataset.kind);
    });
  });
  const parts = (wrap.dataset.active || 'all|All').split('|');
  if(parts[0] !== 'all') filterEventsByVenue(parts.slice(1).join('|'), parts[0]);
}

function filterEventsByVenue(venueName, kind){
  kind = kind || (venueName === 'All' ? 'all' : 'venue');
  document.querySelectorAll('#eventList .event-card').forEach(function(card){
    const matches = kind === 'all' ? true
      : kind === 'foryou' ? card.dataset.foryou === '1'
      : kind === 'genre' ? (card.dataset.genres || '').split('|').indexOf(venueName) >= 0
      : card.dataset.venue === venueName;
    card.classList.toggle('is-filtered-out', !matches);
  });
  document.querySelectorAll('#eventList .night-head').forEach(function(head){
    let el = head.nextElementSibling, any = false;
    while(el && !el.classList.contains('night-head')){
      if(el.classList.contains('event-card') && !el.classList.contains('is-filtered-out')){ any = true; break; }
      el = el.nextElementSibling;
    }
    head.style.display = any ? '' : 'none';
  });
}

// "Tonight" / "Tomorrow" / "This Friday" / "Coming up" for an event date.
function nightGroupLabel(dateStr){
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr + 'T00:00:00');
  const diff = Math.round((d - today) / 86400000);
  if(diff <= 0) return 'Tonight';
  if(diff === 1) return 'Tomorrow';
  if(diff <= 6) return 'This ' + ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  return 'Coming up';
}
// Personal greeting on the home screen: "Good evening, Keurten" + what's next for you.
function myFirstName(){
  const pick = function(v){ v = String(v || '').trim(); return v ? v.split(/\s+/)[0] : ''; };
  if(typeof currentUser === 'undefined' || !currentUser) return '';
  const meta = currentUser.user_metadata || {};
  return pick(MY_PROFILE && MY_PROFILE.display_name) || pick(meta.first_name) ||
    pick(((typeof nextNightRows !== 'undefined' && nextNightRows[0]) || {}).first_name) || pick(window.__agsLastFirstName);
}
function greetingWord(){
  const h = Number(new Date().toLocaleString('en-GB', { timeZone: 'Europe/Amsterdam', hour: '2-digit', hour12: false }));
  if(h >= 5 && h < 12) return 'Good morning';
  if(h >= 12 && h < 18) return 'Good afternoon';
  if(h >= 18 && h < 23) return 'Good evening';
  return 'Late night';
}
function personalSubline(){
  const rows = (typeof nextNightRows !== 'undefined' && nextNightRows) || [];
  const r = rows[0];
  if(r){
    const st = String(r.status || '').trim().toLowerCase();
    const label = nightGroupLabel(r.event_date);
    const when = label === 'Tonight' ? 'tonight' : label === 'Tomorrow' ? 'tomorrow' : label === 'Coming up' ? 'on ' + formatDate(r.event_date) : label.replace('This ', 'this ');
    if(st === 'approved') return 'You\u2019re on the list for <strong>' + escHtml(r.event_name) + '</strong> ' + when + ' 🔑';
    return 'Your request for <strong>' + escHtml(r.event_name) + '</strong> is in review ⏳';
  }
  const week = getSortedEvents().filter(function(ev){ return nightGroupLabel(ev.date) !== 'Coming up'; }).length;
  return week ? week + ' parties this week. Where are we going?' : 'New parties are coming. Stay tuned 🔑';
}
function updateEventsHeadline(){
  const h = document.getElementById('eventsHeadline');
  const sub = document.getElementById('eventsSub');
  let name = '';
  try{ name = myFirstName(); } catch(e){ name = ''; } // early on start-up, before login state exists
  if(h && name){
    h.textContent = greetingWord() + ', ' + name;
    try{ if(sub) sub.innerHTML = personalSubline(); } catch(e){}
    return;
  }
  if(sub) sub.textContent = 'Amsterdam nightlife, curated.';
  const first = getSortedEvents()[0];
  if(!h || !first) return;
  const label = nightGroupLabel(first.date);
  h.textContent = label === 'Tonight' ? 'Tonight in Amsterdam'
    : label === 'Coming up' ? 'Upcoming in Amsterdam' : 'This week in Amsterdam';
}
function renderEventList(){
  const list = document.getElementById('eventList');
  try{ renderFeaturedHero(); } catch(e){}
  try{ renderStoryBar(); } catch(e){}
  let lastGroup = '';
  updateEventsHeadline();
  list.innerHTML = getSortedEvents().map(function(ev, i){
    const featured = i === 0;
    const mediaContent = eventMedia(ev, ' decoding="async"');
    const nextUp = featured
      ? '<div class="event-card__next"><span>Next up</span><span class="js-starts-in" data-start="' + eventStartTime(ev) + '">' + formatStartsIn(eventStartTime(ev) - Date.now()) + '</span></div>'
      : '';
    const group = nightGroupLabel(ev.date);
    const groupHead = group !== lastGroup ? '<div class="night-head" data-group="' + group + '"><span>' + group + '</span>' + (group === 'Coming up' ? '' : '<em>' + formatDate(ev.date) + '</em>') + '</div>' : '';
    lastGroup = group;
    return groupHead + (
      '<article class="event-card' + (featured ? ' is-featured' : '') + '" data-index="' + i + '" data-event-id="' + (ev.id || '') + '" data-venue="' + eventVenueName(ev) + '" data-genres="' + eventGenres(ev).join('|') + '" data-foryou="' + (isForYou(ev) ? '1' : '') + '">' + nextUp +
        '<div class="event-card__media"' + flyerStyle(ev) + '>' + mediaContent + '</div>' +
        '<div class="event-card__body">' +
          '<div class="event-card__meta"><div class="event-card__date">' + formatDate(ev.date) + '</div>' + guestlistBadge(ev.guestlistStatus, ev.badgeLabel) + '</div>' +
          '<h3 class="event-card__name">' + ev.name + '</h3>' +
          '<div class="event-card__venue">' + ev.venue + '</div>' + memberTag(ev) + proofHtml(ev) + cardTags(ev) +
          '<button type="button" class="event-card__cta">View Details</button>' +
        '</div>' +
        '<div class="glive" style="display:none;"></div>' +
      '</article>'
    );
  }).join('') + memberTeaserHtml();

  list.querySelectorAll('.event-card').forEach(function(card){
    card.querySelector('.event-card__cta').addEventListener('click', function(){
      openEventSheet(getSortedEvents()[parseInt(card.dataset.index, 10)]);
    });
    card.querySelector('.event-card__media').addEventListener('click', function(){
      openEventSheet(getSortedEvents()[parseInt(card.dataset.index, 10)]);
    });
  });

  revealCardsOnScroll();
  setTimeout(refreshCardBadges, 0);
  loadLiveGuestlists();
  // Keep the chosen filter (club / genre / For you) after a re-render.
  const vf = document.getElementById('venueFilter');
  const act = vf && vf.dataset.active;
  if(act && act !== 'all|All'){ const parts = act.split('|'); filterEventsByVenue(parts.slice(1).join('|'), parts[0]); }
}

function renderPastEventList(){
  const wrap = document.getElementById('pastEventsWrap');
  const list = document.getElementById('pastEventList');
  const pastEvents = getPastEvents();

  if(!pastEvents.length){ wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  list.innerHTML = pastEvents.map(function(ev){
    const mediaContent = ev.image ? '<img src="' + (webpOf(ev.image) || ev.image) + '"' + (webpOf(ev.image) ? ' data-fallback="' + ev.image + '" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;this.removeAttribute(\'data-fallback\');}"' : '') + ' alt="' + ev.name + '" loading="lazy" decoding="async">' : '';
    return (
      '<article class="past-event-card" data-event-id="' + (ev.id || '') + '">' +
        '<div class="past-event-card__media">' + mediaContent + '</div>' +
        '<div class="past-event-card__body">' +
          '<div class="past-event-card__date">' + formatDate(ev.date) + '</div>' +
          '<h4 class="past-event-card__name">' + ev.name + '</h4>' +
          '<div class="past-event-card__venue">' + ev.venue + '</div>' +
        '</div>' +
      '</article>'
    );
  }).join('');

  list.querySelectorAll('.past-event-card').forEach(function(card){
    card.addEventListener('click', function(){
      const ev = EVENTS.find(function(e){ return e.id === card.dataset.eventId; });
      if(ev) openEventSheet(ev);
    });
  });
}

/* ================================================================
   LIMITED GUESTLIST — capacity + live countdown + atomic claiming
   ================================================================ */
const GUESTLIST_STATE = {}; // event_id -> { enabled, capacity, claimed_count, deadline }
let guestlistTickHandle = null;

async function loadLiveGuestlists(){
  if(!supabaseClient) return;
  try{
    const { data, error } = await supabaseClient.from('event_guestlists').select('*');
    if(error || !data) return;
    data.forEach(function(row){ GUESTLIST_STATE[row.event_id] = row; });
    await loadGuestCounts();
    await loadMyWaitlist();
    renderAllGuestlistPanels();
    startGuestlistTicker();
  } catch(err){
    console.warn('Could not load live guestlists.', err);
  }
}

// Real number of people already on the list per event (name|date -> guests),
// from an aggregate-only RPC — never any personal data.
const GUEST_COUNTS = {};
const SOCIAL_PROOF_MIN = 10;   // only show "X people on the list" from this many
const SCARCITY_SHOW_BELOW = 15; // only show "Only X spots left" below this many
async function loadGuestCounts(){
  try{
    const { data, error } = await supabaseClient.rpc('event_guest_counts');
    if(error || !data) return;
    data.forEach(function(row){ GUEST_COUNTS[row.event_name + '|' + row.event_date] = Number(row.guests) || 0; });
  } catch(err){ /* social proof is optional */ }
}
// Waitlist positions for the logged-in guest (event_id -> position).
const MY_WAITLIST = {};
async function loadMyWaitlist(){
  if(!supabaseClient || !currentUser) return;
  try{
    const { data } = await supabaseClient.rpc('my_waitlist');
    Object.keys(MY_WAITLIST).forEach(function(k){ delete MY_WAITLIST[k]; });
    (data || []).forEach(function(r){ MY_WAITLIST[r.event_id] = r.pos; });
  } catch(err){ /* optional */ }
}
function guestsOnList(ev){
  return ev ? (GUEST_COUNTS[ev.name + '|' + ev.date] || 0) : 0;
}

function guestlistUrgencyInfo(state){
  const spotsLeft = Math.max(state.capacity - state.claimed_count, 0);
  const deadlinePassed = new Date(state.deadline).getTime() <= Date.now();
  if(!state.enabled || deadlinePassed || spotsLeft <= 0){
    return { locked: true, label: 'Guestlist full', spotsLeft: spotsLeft };
  }
  if(spotsLeft < 4) return { locked: false, label: 'Last spots', spotsLeft: spotsLeft };
  if(spotsLeft < 10) return { locked: false, label: 'Almost full', spotsLeft: spotsLeft };
  return { locked: false, label: '', spotsLeft: spotsLeft };
}

function formatCountdown(ms){
  if(ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const s = String(totalSeconds % 60).padStart(2, '0');
  return h + ':' + m + ':' + s;
}

// Separate waitlist for the full Age OK list (18-20) of an event.
// Stored as its own guestlist row "<event id>-ageok" (capacity 0 = full).
function ageOkWaitlistHtml(ev){
  if(!ev || !ev.ageOkWaitlist) return '';
  const id = ev.id + '-ageok';
  const pos = MY_WAITLIST[id];
  return '<div class="glive__ageok">' +
    '<div class="glive__spots">' + (pos
      ? 'You\u2019re <strong>#' + pos + '</strong> on the Age OK waitlist. We\u2019ll ping you if a spot opens.'
      : '<strong>18\u201320?</strong> The Age OK list is full. Join the waitlist and we\u2019ll ping you if a spot opens.') + '</div>' +
    '<button type="button" class="glive__wait-btn" data-event-id="' + id + '" data-base-id="' + ev.id + '" data-wait-name="' + ev.name + ' \u2013 Age OK (18-20)"' + (pos ? ' disabled' : '') + '>' +
      (pos ? 'On the Age OK waitlist \u2713' : 'Join Age OK waitlist') + '</button>' +
  '</div>';
}

function renderGuestlistPanel(panelEl, eventId){
  const state = GUESTLIST_STATE[eventId];
  if(!state){ panelEl.style.display = 'none'; return; }

  const ev = EVENTS.find(function(x){ return x.id === eventId; });
  const urgency = guestlistUrgencyInfo(state);
  if(ev && ev.guestlistStatus === 'closed') urgency.locked = true;
  const pct = Math.min(100, Math.round((state.claimed_count / state.capacity) * 100));
  const msLeft = new Date(state.deadline).getTime() - Date.now();

  panelEl.style.display = 'block';
  if(urgency.locked){
    // Full or closed: no spot counter, bar or countdown — just say it's full.
    const closedText = msLeft <= 0 ? 'Guestlist closed' : 'Guestlist full';
    const canWait = msLeft > 0 && state.enabled && urgency.spotsLeft <= 0 && !(ev && (ev.guestlistStatus === 'closed' || ev.ticketsSoldOut));
    if(canWait){
      const pos = MY_WAITLIST[eventId];
      panelEl.className = 'glive is-locked is-waitlist';
      panelEl.innerHTML =
        '<div class="glive__label">Guestlist full</div>' +
        '<div class="glive__spots">' + (pos ? 'You\u2019re <strong>#' + pos + '</strong> on the waitlist. We\u2019ll ping you the moment a spot opens.' : 'Spots open up when guests cancel. Join the waitlist and we\u2019ll ping you first.') + '</div>' +
        '<button type="button" class="glive__wait-btn" data-event-id="' + eventId + '"' + (pos ? ' disabled' : '') + '>' + (pos ? 'On the waitlist ✓' : 'Join the waitlist') + '</button>' + ageOkWaitlistHtml(ev);
      return;
    }
    panelEl.className = 'glive is-locked';
    panelEl.innerHTML =
      '<div class="glive__label">' + closedText + '</div>' +
      '<div class="glive__spots">' + (ev && ev.ticketsSoldOut
        ? 'This event is completely sold out.'
        : 'There are no guestlist spots left.') + '</div>' +
      '<button type="button" class="glive__claim-btn" data-event-id="' + eventId + '" disabled>' + closedText + '</button>';
    return;
  }
  // Scarcity only when it's real (few spots left); otherwise show how many
  // people are already on the list — "47 of 50 available" reads as empty.
  const scarce = urgency.spotsLeft < SCARCITY_SHOW_BELOW;
  const onList = guestsOnList(ev);
  let spotsLine = '';
  if(scarce){
    spotsLine = '<div class="glive__spots">Only ' + urgency.spotsLeft + ' spot' + (urgency.spotsLeft === 1 ? '' : 's') + ' left</div>' +
      '<div class="glive__bar"><div class="glive__bar-fill" style="width:' + pct + '%;"></div></div>';
  } else if(onList >= SOCIAL_PROOF_MIN){
    spotsLine = '<div class="glive__spots"><strong>' + onList + ' people</strong> already on the list</div>';
  } else {
    spotsLine = '<div class="glive__spots">Spots are limited — request yours early</div>';
  }
  panelEl.className = 'glive' + (urgency.label ? ' is-urgent' : '');
  panelEl.innerHTML =
    '<div class="glive__label">Guestlist live' + (urgency.label ? ' · ' + urgency.label : '') + '</div>' +
    spotsLine +
    '<div class="glive__countdown">Closes in <span class="glive__timer">' + formatCountdown(msLeft) + '</span></div>' +
    '<button type="button" class="glive__claim-btn" data-event-id="' + eventId + '"' + (urgency.locked ? ' disabled' : '') + '>' +
      (urgency.locked ? (msLeft <= 0 ? 'Guestlist closed' : 'Guestlist full') : 'Request access') +
    '</button>' + (msLeft > 0 ? ageOkWaitlistHtml(ev) : '');
}

// Upgrade each card's small grey status into a gold label with real
// numbers once live counts are in ("23 on the list", "Only 9 left").
function refreshCardBadges(){
  document.querySelectorAll('#eventList .event-card').forEach(function(card){
    const ev = EVENTS.find(function(x){ return x.id === card.dataset.eventId; });
    const meta = card.querySelector('.event-card__meta');
    if(!ev || !meta) return;
    let badge = meta.querySelector('.event-card__badge');
    if(!badge){ badge = document.createElement('span'); badge.className = 'event-card__badge'; meta.appendChild(badge); }
    const state = GUESTLIST_STATE[ev.id];
    const onList = guestsOnList(ev);
    let text = '', cls = '';
    if(ev.guestlistStatus === 'closed' || ev.ticketsSoldOut){ text = ev.badgeLabel || ev.closedLabel || 'Guestlist full'; cls = 'is-closed'; }
    else if(ev.guestlistStatus === 'none'){ text = ev.badgeLabel === '' ? '' : (ev.badgeLabel || 'Tickets only'); cls = 'is-tickets'; }
    else if(ev.guestlistStatus === 'soon'){ text = 'Guestlist soon'; cls = 'is-soon'; }
    else if(state){
      const u = guestlistUrgencyInfo(state);
      if(u.locked){
        const open = new Date(state.deadline).getTime() > Date.now() && state.enabled;
        text = open ? (MY_WAITLIST[ev.id] ? 'Waitlist #' + MY_WAITLIST[ev.id] : 'Waitlist open') : 'Guestlist full';
        cls = open ? 'is-open' : 'is-closed';
      }
      else if(u.spotsLeft < SCARCITY_SHOW_BELOW){ text = 'Only ' + u.spotsLeft + ' left'; cls = 'is-hot'; }
      else if(onList >= SOCIAL_PROOF_MIN){ text = onList + ' on the list'; cls = 'is-hot'; }
      else { text = 'Guestlist open'; cls = 'is-open'; }
    } else if(onList >= SOCIAL_PROOF_MIN){ text = onList + ' on the list'; cls = 'is-hot'; }
    else if(ev.guestlistStatus === 'limited' || ev.guestlistStatus === 'open'){ text = 'Guestlist open'; cls = 'is-open'; }
    badge.className = 'event-card__badge' + (cls ? ' ' + cls : '');
    badge.textContent = text;
    badge.style.display = text ? '' : 'none';
  });
}

function renderAllGuestlistPanels(){
  refreshCardBadges();
  document.querySelectorAll('#eventList .event-card').forEach(function(card){
    const eventId = card.dataset.eventId;
    const panel = card.querySelector('.glive');
    if(eventId && panel) renderGuestlistPanel(panel, eventId);
  });
}

function startGuestlistTicker(){
  if(guestlistTickHandle) return;
  guestlistTickHandle = setInterval(function(){
    document.querySelectorAll('#eventList .glive .glive__timer').forEach(function(el){
      const btn = el.closest('.glive').querySelector('.glive__claim-btn');
      const eventId = btn && btn.dataset.eventId;
      const state = eventId && GUESTLIST_STATE[eventId];
      if(!state) return;
      const msLeft = new Date(state.deadline).getTime() - Date.now();
      el.textContent = formatCountdown(msLeft);
      // Deadline just passed — re-render that one panel to lock it.
      if(msLeft <= 0 && !btn.disabled){
        renderGuestlistPanel(btn.closest('.glive'), eventId);
      }
    });
  }, 1000);

  // Refresh actual spot counts periodically, so a spot someone else just
  // claimed shows up here too — the countdown itself ticks locally above.
  // Skip the refresh while the app is in the background, and catch up when it comes back.
  setInterval(function(){ if(!document.hidden) loadLiveGuestlists(); }, 20000);
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) loadLiveGuestlists(); });
}

document.getElementById('eventList').addEventListener('click', async function(e){
  const btn = e.target.closest('.glive__claim-btn');
  if(!btn || btn.disabled) return;
  e.stopPropagation();

  if(!currentUser){
    rememberEventAndLogin(EVENTS.find(function(x){ return x.id === btn.dataset.eventId; }));
    return;
  }

  const eventId = btn.dataset.eventId;
  const ev = EVENTS.find(function(x){ return x.id === eventId; });
  btn.disabled = true;
  btn.textContent = 'CLAIMING…';

  try{
    const { data, error } = await supabaseClient.rpc('claim_guestlist_spot', { p_event_id: eventId });
    if(error){ throw error; }

    if(data && data.success){
      AppSound.play('success');
      GUESTLIST_STATE[eventId].claimed_count = data.claimed_count;
      renderAllGuestlistPanels();
      closeEventSheet();
      resetGuestlistFormForNext();
      switchTab('guestlist');
      if(ev) preselectEvent(ev);
      prefillGuestlistForm();
      document.getElementById('glSpotNotice').style.display = 'block';
    } else {
      const reasons = {
        full: 'Sorry, the guestlist has just filled up.',
        deadline_passed: 'Sorry, the guestlist has closed.',
        disabled: 'The guestlist for this event is not active.',
        not_authenticated: 'Log in to claim a spot.',
        not_found: 'This guestlist no longer exists.'
      };
      alert(reasons[data && data.reason] || 'Your spot could not be claimed. Please try again.');
      await loadLiveGuestlists();
    }
  } catch(err){
    console.warn('Claim failed.', err);
    alert('Something went wrong while claiming your spot. Please try again.');
    btn.disabled = false;
    btn.textContent = 'Request access';
  }
});

/* ---- Add to calendar (.ics) ---- */
function pad2(n){ return (n < 10 ? '0' : '') + n; }
function icsStamp(d){
  return d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + 'T' + pad2(d.getHours()) + pad2(d.getMinutes()) + '00';
}
function icsEscape(t){
  return String(t || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}
function eventEndDate(ev, start){
  // Events don't store an end time, so read "till 04:00" / "tot 04:00" /
  // "17:00 - 22:00" from the description; otherwise assume 4 hours.
  const m = String(ev.description || '').match(/(?:till|tot|until|-|–)\s*(\d{1,2}):(\d{2})/i);
  if(m){
    const end = new Date(start.getTime());
    end.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
    if(end <= start) end.setDate(end.getDate() + 1);
    return end;
  }
  return new Date(start.getTime() + 4 * 60 * 60 * 1000);
}
function addEventToCalendar(ev){
  const start = new Date(ev.date + 'T' + (ev.time || '22:00'));
  const end = eventEndDate(ev, start);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Amsterdam Guestlist Service//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:' + (ev.id || ev.name.replace(/\W+/g, '-').toLowerCase() + '-' + ev.date) + '@amsterdamguestlistservice.website',
    'DTSTAMP:' + icsStamp(new Date()),
    'DTSTART:' + icsStamp(start),
    'DTEND:' + icsStamp(end),
    'SUMMARY:' + icsEscape(ev.name),
    'LOCATION:' + icsEscape(ev.venue),
    'DESCRIPTION:' + icsEscape(ev.description + ' — Amsterdam Guestlist Service'),
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (ev.name.replace(/\W+/g, '-').toLowerCase() || 'event') + '.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1500);
}

/* ---- Share an event ---- */
const APP_SHARE_URL = 'https://www.amsterdamguestlistservice.website/app/';
// Every share carries the member's referral code, so a friend who signs up
// from a shared event counts as their invite.
let MY_REF_CODE = null;
function shareUrlFor(ev){
  const q = [];
  if(ev && ev.id) q.push('event=' + encodeURIComponent(ev.id));
  if(MY_REF_CODE) q.push('ref=' + encodeURIComponent(MY_REF_CODE));
  return APP_SHARE_URL + (q.length ? '?' + q.join('&') : '');
}
function dataUrlToFile(dataUrl, filename){
  const parts = dataUrl.split(',');
  const mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
  const bin = atob(parts[1]);
  const arr = new Uint8Array(bin.length);
  for(let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new File([arr], filename, { type: mime });
}
// Posters live in app/events/ now; turn one into a File for the share
// sheet. It's already loaded on screen, so this comes from the cache.
async function eventImageFile(ev){
  try{
    if(ev.image.indexOf('data:') === 0){
      return dataUrlToFile(ev.image, ev.name.replace(/\W+/g, '-').toLowerCase() + '.jpg');
    }
    const res = await fetch(ev.image);
    if(!res.ok) return null;
    const blob = await res.blob();
    const ext = blob.type === 'image/png' ? '.png' : '.jpg';
    return new File([blob], ev.name.replace(/\W+/g, '-').toLowerCase() + ext, { type: blob.type || 'image/jpeg' });
  } catch(err){
    return null;
  }
}
// Links like /app/?event=<id> (shared events, "last spots" pushes) open
// that event straight away.
function openEventFromLink(urlish){
  try{
    const q = String(urlish || '');
    const id = new URLSearchParams(q.indexOf('?') >= 0 ? q.slice(q.indexOf('?')) : q).get('event');
    if(!id) return;
    const ev = EVENTS.find(function(x){ return x.id === id; });
    if(ev && !isPastEvent(ev)) setTimeout(function(){ try{ switchTab('events'); } catch(e){} openEventSheet(ev); }, 400);
  } catch(e){}
}
// Invite a friend to a night you're going to: share link carries your code.
async function inviteFriendTo(ev){
  const url = shareUrlFor(ev);
  const text = 'I’m going to ' + ev.name + ' on ' + formatDateReadable(ev.date) + '. Get on the guestlist with me via AGS — sign up with my link and you get bonus points 🖤';
  try{
    if(navigator.share){ await navigator.share({ title: ev.name, text: text, url: url }); return; }
  } catch(err){ if(err && err.name === 'AbortError') return; }
  window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url), '_blank', 'noopener');
}
async function shareEvent(ev){
  const text = ev.name + ' — ' + formatDateReadable(ev.date) + ' · ' + ev.venue +
    '\nGet on the guestlist via Amsterdam Guestlist Service 🖤';
  const shareUrl = shareUrlFor(ev);
  const data = { title: ev.name, text: text, url: shareUrl };
  try{
    if(navigator.share){
      // Try to include the poster; fall back to text + link if the device
      // can't share files.
      const file = ev.image && window.File ? await eventImageFile(ev) : null;
      if(file){
        if(navigator.canShare && navigator.canShare({ files: [file] })){
          await navigator.share({ title: data.title, text: text + '\n' + shareUrl, files: [file] });
          return;
        }
      }
      await navigator.share(data);
      return;
    }
  } catch(err){
    if(err && err.name === 'AbortError') return; // user closed the share sheet
  }
  // Desktop / no share support: open WhatsApp with the text + link.
  window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + shareUrl), '_blank', 'noopener');
}

function openEventSheet(ev){
  if(typeof AppSound !== 'undefined') AppSound.play('open');
  const heroClip = document.querySelector('#featuredHero video');
  if(heroClip){ try{ heroClip.pause(); } catch(e){} } // never two videos with sound at once
  const sheetMedia = document.getElementById('sheetMedia');
  sheetMedia.classList.remove('has-clip', 'is-loaded');
  if(ev.clip && ev.clip.mp4){
    // Promo video in the sheet: autoplays muted in a loop; tap for sound.
    sheetMedia.classList.add('has-clip', 'is-loaded');
    sheetMedia.innerHTML = '<video class="sheet__clip" src="' + ev.clip.mp4 + '"' + (ev.clip.poster ? ' poster="' + ev.clip.poster + '"' : '') +
      ' autoplay muted loop playsinline preload="metadata"></video>' +
      '<button type="button" class="sheet__sound" aria-label="Sound on">🔇</button>';
    const v = sheetMedia.querySelector('video'), btn = sheetMedia.querySelector('.sheet__sound');
    const toggle = function(e){ if(e) e.stopPropagation(); v.muted = !v.muted; btn.textContent = v.muted ? '🔇' : '🔊'; btn.setAttribute('aria-label', v.muted ? 'Sound on' : 'Sound off'); if(v.paused) v.play().catch(function(){}); };
    btn.addEventListener('click', toggle);
    v.addEventListener('click', toggle);
    v.play().catch(function(){});
  } else {
    sheetMedia.innerHTML = eventMedia(ev);
  }
  sheetMedia.setAttribute('style', flyerStyle(ev).replace(/^ style="|"$/g, ''));
  document.getElementById('sheetDate').textContent = formatDate(ev.date);
  document.getElementById('sheetName').textContent = ev.name;
  document.getElementById('sheetVenue').textContent = ev.venue;
  renderSheetExtras(ev);
  applyPartyColor(ev);
  renderSheetMusic(ev);
  if(supabaseClient && currentUser && ev.id){
    supabaseClient.rpc('log_event_view', { p_event_id: ev.id, p_event_name: ev.name, p_event_date: ev.date, p_venue: eventVenueName(ev) }).then(function(){}, function(){});
  }
  document.getElementById('sheetDesc').textContent = ev.description;

  const noGuestlist = ev.guestlistStatus === 'none';
  const closed = ev.guestlistStatus === 'closed';
  const soon = ev.guestlistStatus === 'soon';
  const past = isPastEvent(ev);
  let actions = '';
  if(past){
    actions += '<div class="sheet__past-note">This event has already taken place — thanks to everyone who was on the list.</div>';
  } else {
    const sheetOnList = guestsOnList(ev);
    if(!noGuestlist && !soon && !closed && sheetOnList >= SOCIAL_PROOF_MIN){
      actions += '<div class="sheet__social-proof"><strong>' + sheetOnList + ' people</strong> already on the list</div>';
    }
    if(!noGuestlist){
      actions += soon
        ? '<button type="button" class="btn" disabled>Guestlist Coming Soon</button>'
        : closed
        ? '<button type="button" class="btn" disabled>' + (ev.closedLabel || 'Guestlist Closed') + '</button>'
        : '<button type="button" class="btn btn--solid" id="sheetGuestlistBtn">Get on the Guestlist</button>';
    }
    const ticketHref = ev.ticketWhatsapp ? buildTicketWhatsappLink(ev) : ev.ticketUrl;
    const hasTicketLink = ticketHref && ticketHref !== '#';
    // One gold primary action: the guestlist, or tickets when there's no open guestlist.
    const ticketsPrimary = ev.ticketWhatsapp || noGuestlist || soon || closed;
    if(ev.ticketsSoldOut){
      actions += '<button type="button" class="btn" disabled>Tickets Sold Out</button>';
    } else if(hasTicketLink){
      actions += '<a class="btn' + (ticketsPrimary ? ' btn--solid' : '') + '" href="' + ticketHref + '" target="_blank" rel="noopener" data-track="tickets" data-event-id="' + (ev.id || '') + '">' + (ev.ticketButtonLabel || 'Buy Tickets') + '</a>';
    }
    actions += '<a class="btn btn--table" href="' + buildTableBookingLink(ev) + '" target="_blank" rel="noopener" data-track="table" data-event-id="' + (ev.id || '') + '">Book a Table</a>';
    actions += '<div class="sheet__quiet-actions">' +
      '<button type="button" class="sheet__quiet" id="sheetCalendarBtn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Add to calendar</button>' +
      '<button type="button" class="sheet__quiet" id="sheetShareBtn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5M5 13v8h14v-8"/></svg>Share</button>' +
    '</div>';
  }
  document.getElementById('sheetActions').innerHTML = actions;

  const calBtn = document.getElementById('sheetCalendarBtn');
  if(calBtn){ calBtn.addEventListener('click', function(){ addEventToCalendar(ev); }); }
  const shareBtn = document.getElementById('sheetShareBtn');
  if(shareBtn){ shareBtn.addEventListener('click', function(){ shareEvent(ev); }); }

  const glBtn = document.getElementById('sheetGuestlistBtn');
  if(glBtn){
    glBtn.addEventListener('click', async function(){
      glBtn.disabled = true;
      await startGuestlistFor(ev, true);
      glBtn.disabled = false;
    });
  }

  document.getElementById('sheetOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
// Straight to the guestlist for one party (event sheet button, featured video).
async function startGuestlistFor(ev, fromSheet){
  const handled = await tryQuickRequest(ev);
  if(fromSheet) closeEventSheet();
  if(handled){ openQuickSheet(); return; }
  resetGuestlistFormForNext();
  switchTab('guestlist');
  preselectEvent(ev);
  prefillGuestlistForm();
  document.getElementById('glSpotNotice').style.display = 'none';
}

/* ---- Follow a club (17): heart in the party sheet; push on new parties ---- */
function renderSheetExtras(ev){
  const box = document.getElementById('sheetExtras');
  if(!box) return;
  const venue = eventVenueName(ev);
  const on = MY_FOLLOWS.has(venue);
  box.innerHTML = '<button type="button" class="follow-btn' + (on ? ' is-on' : '') + '" id="followBtn">' +
    (on ? '♥ Following ' : '♡ Follow ') + venue + '</button>' +
    eventGenres(ev).map(function(g){ return '<span class="event-card__tag">♫ ' + g + '</span>'; }).join('') +
    '<div class="going" id="sheetGoing" style="width:100%;margin:4px 0 0" hidden></div>';
  document.getElementById('followBtn').addEventListener('click', function(){ toggleFollowVenue(venue, this); });
  loadGoing(ev).then(function(g){ const box = document.getElementById('sheetGoing'); if(box && g){ const h = goingHtml(g); if(h){ box.innerHTML = h; box.hidden = false; bindGoingFaces(box); } } });
}

/* ---- Who's going (3): total on the list + members who chose to be shown ---- */
const GOING_CACHE = {};
async function loadGoing(ev){
  const k = ev.name + '|' + ev.date;
  if(GOING_CACHE[k] && Date.now() - GOING_CACHE[k].at < 60000) return GOING_CACHE[k].data;
  if(!supabaseClient) return null;
  try{
    const { data, error } = await supabaseClient.rpc('event_going', { p_event_name: ev.name, p_event_date: ev.date });
    if(error) return null;
    GOING_CACHE[k] = { at: Date.now(), data: data };
    return data;
  } catch(e){ return null; }
}
function initialsOf(name){ return String(name || '?').trim().split(/\s+/).slice(0, 2).map(function(w){ return w[0]; }).join('').toUpperCase(); }
function goingHtml(g){
  const n = Number(g && g.count) || 0;
  if(n < 3) return '';
  const people = (g.people || []).slice(0, 5);
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const faces = people.map(function(p){
    return '<button type="button" class="going__face" data-uid="' + esc(p.user_id) + '" data-public="' + (p.is_public ? '1' : '') + '"' +
      (p.avatar ? ' style="background-image:url(\'' + esc(p.avatar).replace(/'/g, '%27') + '\')">' : '>' + esc(initialsOf(p.name))) + '</button>';
  }).join('');
  const names = people.slice(0, 2).map(function(p){ return esc(String(p.name).split(' ')[0]); });
  const rest = n - names.length;
  const text = names.length ? names.join(', ') + (rest > 0 ? ' +' + rest : '') + ' going' : n + ' people going';
  return (faces ? '<span class="going__faces">' + faces + '</span>' : '<span>👥</span>') + '<span>' + text + '</span>';
}
function bindGoingFaces(box){
  box.querySelectorAll('.going__face').forEach(function(f){
    f.addEventListener('click', function(e){ e.stopPropagation(); if(f.dataset.public) openMemberProfile(f.dataset.uid); });
  });
}

/* ---- Profiles (4) ---- */
let MY_PROFILE = null;
async function loadMyProfileCard(){
  const card = document.getElementById('profileCard');
  if(!card || !supabaseClient || !currentUser) return;
  const { data } = await supabaseClient.from('member_profiles').select('*').eq('user_id', currentUser.id).maybeSingle();
  let p = data;
  if(!p){
    // Sensible defaults from what we already know.
    let name = '', ig = '';
    try{
      const { data: sm } = await supabaseClient.from('salon_members').select('display_name').eq('user_id', currentUser.id).maybeSingle();
      if(sm && sm.display_name) name = sm.display_name;
      const { data: rq } = await supabaseClient.from('guestlist_requests').select('first_name, instagram').order('created_at', { ascending: false }).limit(1);
      if(rq && rq[0]){ if(!name) name = rq[0].first_name || ''; if(rq[0].instagram && rq[0].instagram !== 'None') ig = rq[0].instagram; }
    } catch(e){}
    p = { display_name: name, instagram: ig, bio: '', avatar_url: '', is_public: false, show_going: false, _new: true };
  }
  MY_PROFILE = p;
  try{ updateEventsHeadline(); } catch(e){}
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  card.innerHTML =
    '<div class="profile-card__top">' +
      '<button type="button" class="avatar-btn" id="pcAvatar" aria-label="Change profile photo"' + (p.avatar_url ? ' style="background-image:url(\'' + esc(p.avatar_url) + '\')">' : '>' + esc(initialsOf(p.display_name || '?'))) + '<em>＋</em></button>' +
      '<div><div class="profile-card__title">Your profile</div><div class="profile-card__sub">Show who you are on the list. You choose what others see.</div></div>' +
    '</div>' +
    '<input type="file" id="pcFile" accept="image/*" hidden>' +
    '<input type="text" id="pcName" maxlength="40" placeholder="Your name" value="' + esc(p.display_name) + '">' +
    '<input type="text" id="pcIg" maxlength="40" placeholder="@instagram" value="' + esc(p.instagram) + '">' +
    '<textarea id="pcBio" maxlength="120" placeholder="Short bio (optional)">' + esc(p.bio) + '</textarea>' +
    '<label class="pc-toggle"><span>Public profile<small>Other members can open your profile</small></span><input type="checkbox" id="pcPublic"' + (p.is_public ? ' checked' : '') + '></label>' +
    '<label class="pc-toggle"><span>Show me on “who’s going”<small>Your photo appears on parties you’re on the list for</small></span><input type="checkbox" id="pcGoing"' + (p.show_going ? ' checked' : '') + '></label>' +
    '<div class="pc-actions"><button type="button" class="btn btn--solid" id="pcSave">Save profile</button><button type="button" class="btn" id="pcView">Preview</button></div>' +
    '<div class="pc-saved" id="pcSaved"></div>';
  card.hidden = false;
  const file = document.getElementById('pcFile');
  document.getElementById('pcAvatar').addEventListener('click', function(){ file.click(); });
  file.addEventListener('change', function(){ if(file.files && file.files[0]) uploadAvatar(file.files[0]); });
  document.getElementById('pcSave').addEventListener('click', saveMyProfile);
  document.getElementById('pcView').addEventListener('click', async function(){ await saveMyProfile(); openMemberProfile(currentUser.id); });
}
async function saveMyProfile(){
  const out = document.getElementById('pcSaved');
  const name = (document.getElementById('pcName').value || '').trim().slice(0, 40);
  if(!name){ out.style.color = '#ff8a80'; out.textContent = 'Please add your name.'; return false; }
  let ig = (document.getElementById('pcIg').value || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/[\/?#].*$/, '').replace(/^@+/, '').slice(0, 40);
  const row = {
    user_id: currentUser.id, display_name: name, instagram: ig || null,
    bio: (document.getElementById('pcBio').value || '').trim().slice(0, 120) || null,
    avatar_url: (MY_PROFILE && MY_PROFILE.avatar_url) || null,
    is_public: document.getElementById('pcPublic').checked,
    show_going: document.getElementById('pcGoing').checked,
    updated_at: new Date().toISOString()
  };
  const { error } = await supabaseClient.from('member_profiles').upsert(row);
  if(error){ out.style.color = '#ff8a80'; out.textContent = 'Could not save right now. Please try again.'; return false; }
  MY_PROFILE = row;
  Object.keys(GOING_CACHE).forEach(function(k){ delete GOING_CACHE[k]; });
  out.style.color = ''; out.textContent = 'Saved ✓';
  setTimeout(function(){ if(out.textContent === 'Saved ✓') out.textContent = ''; }, 2500);
  return true;
}
async function uploadAvatar(f){
  const out = document.getElementById('pcSaved');
  out.style.color = ''; out.textContent = 'Uploading photo…';
  try{
    // Square-crop and shrink to 512px so it loads fast everywhere.
    const blob = await new Promise(function(resolve, reject){
      const img = new Image(); const url = URL.createObjectURL(f);
      img.onload = function(){
        const size = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement('canvas');
        c.width = c.height = 512;
        c.getContext('2d').drawImage(img, (img.naturalWidth - size) / 2, (img.naturalHeight - size) / 2, size, size, 0, 0, 512, 512);
        URL.revokeObjectURL(url);
        c.toBlob(function(b){ b ? resolve(b) : reject(new Error('blob')); }, 'image/jpeg', 0.85);
      };
      img.onerror = reject; img.src = url;
    });
    const path = currentUser.id + '/avatar-' + Date.now() + '.jpg';
    const { error } = await supabaseClient.storage.from('avatars').upload(path, blob, { contentType: 'image/jpeg', upsert: true });
    if(error) throw error;
    const pub = supabaseClient.storage.from('avatars').getPublicUrl(path);
    MY_PROFILE = Object.assign({}, MY_PROFILE || {}, { avatar_url: pub.data.publicUrl });
    const btn = document.getElementById('pcAvatar');
    btn.style.backgroundImage = 'url(\'' + pub.data.publicUrl + '\')'; btn.firstChild && btn.firstChild.nodeType === 3 && btn.removeChild(btn.firstChild);
    await saveMyProfile();
  } catch(e){ out.style.color = '#ff8a80'; out.textContent = 'Photo upload failed. Try another photo.'; }
}
async function openMemberProfile(uid){
  if(!supabaseClient || !uid) return;
  const { data: p } = await supabaseClient.rpc('member_profile', { p_uid: uid });
  const body = document.getElementById('quickBody');
  if(!body) return;
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  if(!p){
    body.innerHTML = '<div class="quick-sheet__title" id="quickTitle">This profile is private</div><div class="quick-sheet__btns"><button type="button" class="btn" id="pvClose">Close</button></div>';
  } else {
    body.innerHTML = '<div class="profile-view">' +
      '<div class="profile-view__avatar"' + (p.avatar ? ' style="background-image:url(\'' + esc(p.avatar) + '\')">' : '>' + esc(initialsOf(p.name))) + '</div>' +
      '<h3 id="quickTitle">' + esc(p.name) + '</h3>' +
      (p.instagram ? '<a class="ig" href="https://instagram.com/' + encodeURIComponent(p.instagram) + '" target="_blank" rel="noopener">@' + esc(p.instagram) + '</a>' : '') +
      (p.bio ? '<p>' + esc(p.bio) + '</p>' : '') +
      '<div class="profile-view__stats"><div><b>' + (p.nights || 0) + '</b><span>Nights</span></div><div><b>' + ((p.badges || []).length) + '</b><span>Badges</span></div>' + (p.club ? '<div><b style="font-size:18px;line-height:30px">' + esc(p.club) + '</b><span>Favourite club</span></div>' : '') + '</div>' +
      ((p.badges || []).length ? '<div class="profile-view__badges">' + p.badges.map(function(b){ return '<span title="' + esc(b.name) + '">' + b.icon + '</span>'; }).join('') + '</div>' : '') +
      ((p.history || []).length ? '<div class="profile-view__label">Nights out</div><div class="profile-view__grid">' + p.history.map(function(h){
        const ev = EVENTS.find(function(e){ return e.name === h.event_name && e.date === h.event_date; }) || EVENTS.find(function(e){ return e.name === h.event_name && e.image; });
        const img = ev && ev.image ? ' style="background-image:url(\'' + esc(ev.image) + '\')"' : '';
        return '<div' + img + '><span>' + esc(h.event_name) + '<br>' + formatDate(h.event_date) + '</span></div>';
      }).join('') + '</div>' : '') +
      (p.me ? '<p style="font-size:12px;color:rgba(255,255,255,.5)">' + (p.is_public ? 'This is how other members see you.' : 'Only you can see this. Turn on “Public profile” to share it.') + '</p>' : '') +
      '<div class="quick-sheet__btns"><button type="button" class="btn" id="pvClose">Close</button></div>' +
      (p.me ? '' : '<div class="profile-view__mod"><button type="button" id="pvReport">Report</button><button type="button" id="pvBlock">Block</button></div>') +
    '</div>';
  }
  openQuickSheet();
  document.getElementById('pvClose').addEventListener('click', closeQuickSheet);
  const rep = document.getElementById('pvReport'), blk = document.getElementById('pvBlock');
  if(rep) rep.addEventListener('click', async function(){
    const r = await supabaseClient.from('salon_reports').insert({ reporter_id: currentUser.id, reported_id: uid, reason: 'Profile reported from who’s going' });
    rep.textContent = r.error ? 'Could not report' : 'Reported ✓'; rep.disabled = true;
  });
  if(blk) blk.addEventListener('click', async function(){
    const r = await supabaseClient.from('salon_blocks').insert({ blocker_id: currentUser.id, blocked_id: uid });
    blk.textContent = r.error && !/duplicate/i.test(r.error.message || '') ? 'Could not block' : 'Blocked ✓'; blk.disabled = true;
    Object.keys(GOING_CACHE).forEach(function(k){ delete GOING_CACHE[k]; });
  });
}

/* ---- Feed tab (1): full-screen, swipe up through party videos and flyers ---- */
let FEED_OBSERVER = null, FEED_MUTED = true;
function feedEntries(){
  // One item per party (its video if it has one, otherwise the flyer), in date order.
  const out = [];
  getSortedEvents().forEach(function(ev){
    const items = storyItems(ev);
    if(!items.length) return;
    const it = items.find(function(x){ return x.video; }) || items[0];
    out.push({ ev: ev, it: it, key: ev.id + ':0' });
  });
  return out;
}
function renderFeed(){
  const feed = document.getElementById('feed');
  if(!feed) return;
  if(feed.dataset.rendered === '1'){ resumeFeed(); return; }
  const entries = feedEntries();
  if(!entries.length){ feed.innerHTML = '<div class="feed-empty">' + emptyStateHtml('🎬', 'Videos coming soon', 'Party clips and aftermovies land here first.', '', '') + '</div>'; return; }
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  feed.innerHTML = entries.map(function(e, idx){
    const ev = e.ev, it = e.it, open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
    const media = it.video
      ? '<video src="' + it.video + '"' + (it.poster ? ' poster="' + it.poster + '"' : '') + ' loop playsinline muted preload="' + (idx < 2 ? 'auto' : 'none') + '"></video>'
      : '<div class="feed-bg" style="background-image:url(\'' + esc(it.image) + '\')"></div>' + imgTag(esc(it.image), '', ' decoding="async"');
    return '<section class="feed-item" data-idx="' + idx + '" data-event-id="' + esc(ev.id) + '">' +
      '<div class="feed-item__media">' + media + '</div><div class="feed-item__shade"></div>' +
      '<div class="feed-item__info"><small>' + formatDate(ev.date) + ' · ' + esc(eventVenueName(ev)) + (ev.sponsored ? ' · Sponsored' : '') + '</small>' +
        '<h3>' + esc(ev.name) + '</h3>' + (eventGenres(ev).length ? '<p>♫ ' + eventGenres(ev).join(' · ') + '</p>' : '') +
        '<div class="feed-item__going" data-going></div>' +
        '<button type="button" class="feed-item__cta" data-act="go">' + (open ? 'Request access' : 'View party') + '</button></div>' +
      '<div class="feed-rail">' +
        (it.video ? '<button type="button" data-act="sound"><i>' + (FEED_MUTED ? '🔇' : '🔊') + '</i>Sound</button>' : '') +
        '<button type="button" data-act="info"><i>ⓘ</i>Info</button>' +
        '<button type="button" data-act="share"><i>↗</i>Share</button>' +
      '</div></section>';
  }).join('');
  feed.dataset.rendered = '1';
  feed.addEventListener('click', function(e){
    const btn = e.target.closest('[data-act]'), item = e.target.closest('.feed-item');
    if(!item) return;
    const ev = EVENTS.find(function(x){ return x.id === item.dataset.eventId; });
    if(!ev) return;
    const act = btn ? btn.dataset.act : (e.target.tagName === 'VIDEO' ? 'sound' : null);
    if(act === 'go'){ pauseFeed(); const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0; if(open) startGuestlistFor(ev, false); else openEventSheet(ev); }
    else if(act === 'info'){ pauseFeed(); openEventSheet(ev); }
    else if(act === 'share'){ try{ shareEvent(ev); } catch(err){ if(navigator.share) navigator.share({ title: ev.name, url: SITE_URL + '/app/?event=' + ev.id }).catch(function(){}); } }
    else if(act === 'sound'){
      FEED_MUTED = !FEED_MUTED;
      feed.querySelectorAll('video').forEach(function(v){ v.muted = FEED_MUTED; });
      feed.querySelectorAll('[data-act="sound"] i').forEach(function(i){ i.textContent = FEED_MUTED ? '🔇' : '🔊'; });
      const v = item.querySelector('video'); if(v && v.paused) v.play().catch(function(){});
    }
  });
  if('IntersectionObserver' in window){
    FEED_OBSERVER = new IntersectionObserver(function(list){
      list.forEach(function(en){
        const v = en.target.querySelector('video');
        if(en.isIntersecting){
          if(v){ v.preload = 'auto'; v.muted = FEED_MUTED; v.play().catch(function(){ v.muted = true; v.play().catch(function(){}); }); }
          const next = en.target.nextElementSibling, nv = next && next.querySelector('video'); if(nv) nv.preload = 'auto';
          fillFeedGoing(en.target);
        } else if(v){ v.pause(); }
      });
    }, { root: feed, threshold: 0.6 });
    feed.querySelectorAll('.feed-item').forEach(function(el){ FEED_OBSERVER.observe(el); });
  }
}
function fillFeedGoing(item){
  const box = item.querySelector('[data-going]');
  if(!box || box.dataset.done) return;
  box.dataset.done = '1';
  const ev = EVENTS.find(function(x){ return x.id === item.dataset.eventId; });
  if(ev) loadGoing(ev).then(function(g){ const h = g && goingHtml(g); if(h){ box.innerHTML = h; bindGoingFaces(box); } });
}
function pauseFeed(){ document.querySelectorAll('#feed video').forEach(function(v){ try{ v.pause(); } catch(e){} }); }
function resumeFeed(){
  const feed = document.getElementById('feed'); if(!feed) return;
  const items = feed.querySelectorAll('.feed-item');
  const idx = Math.round(feed.scrollTop / Math.max(1, feed.clientHeight));
  const v = items[idx] && items[idx].querySelector('video');
  if(v){ v.muted = FEED_MUTED; v.play().catch(function(){}); }
}
async function toggleFollowVenue(venue, btn){
  if(!supabaseClient || !currentUser){
    if(typeof lockAppBehindGate === 'function'){ closeEventSheet(); lockAppBehindGate(); }
    return;
  }
  const was = MY_FOLLOWS.has(venue);
  if(was) MY_FOLLOWS.delete(venue); else MY_FOLLOWS.add(venue);
  btn.classList.toggle('is-on', !was);
  btn.textContent = (!was ? '♥ Following ' : '♡ Follow ') + venue;
  if(typeof AppSound !== 'undefined') try{ AppSound.play(!was ? 'success' : 'tap'); } catch(e){}
  const res = was
    ? await supabaseClient.from('venue_follows').delete().eq('user_id', currentUser.id).eq('venue', venue)
    : await supabaseClient.from('venue_follows').insert({ venue: venue });
  if(res.error && !/duplicate/i.test(res.error.message || '')){
    if(was) MY_FOLLOWS.add(venue); else MY_FOLLOWS.delete(venue);
    btn.classList.toggle('is-on', was);
    btn.textContent = (was ? '♥ Following ' : '♡ Follow ') + venue;
    return;
  }
  if(!was) showBadgeToast('❤️', 'You\u2019ll hear first when ' + venue + ' adds a party');
  loadMyBadges();
}

/* ---- Badges (24) ---- */
async function loadMyBadges(){
  const box = document.getElementById('badgeBox');
  if(!box || !supabaseClient || !currentUser) return;
  try{
    const { data, error } = await supabaseClient.rpc('my_badges');
    if(error || !Array.isArray(data)) return;
    const earned = data.filter(function(b){ return b.have >= b.need; });
    document.getElementById('badgeCount').textContent = earned.length + ' of ' + data.length;
    document.getElementById('badgeGrid').innerHTML = data.map(function(b){
      const got = b.have >= b.need;
      return '<div class="badge ' + (got ? 'is-earned' : 'is-locked') + '"><b>' + b.icon + '</b><span>' + b.name + '</span><small>' +
        (got ? b.desc : (b.need > 1 ? Math.min(b.have, b.need) + '/' + b.need + ' · ' : '') + b.desc) + '</small></div>';
    }).join('');
    box.hidden = false;
    // Celebrate badges earned since the last visit on this device.
    const k = 'ags_badges_' + currentUser.id;
    let seen = null; try{ seen = JSON.parse(localStorage.getItem(k) || 'null'); } catch(e){}
    const ids = earned.map(function(b){ return b.id; });
    if(Array.isArray(seen)){
      const fresh = earned.filter(function(b){ return seen.indexOf(b.id) < 0; });
      if(fresh.length) showBadgeToast(fresh[0].icon, 'New badge: <b>' + fresh[0].name + '</b>');
    }
    try{ localStorage.setItem(k, JSON.stringify(ids)); } catch(e){}
  } catch(e){}
}
function showBadgeToast(icon, html){
  const t = document.createElement('div'); t.className = 'badge-toast';
  t.innerHTML = icon + ' ' + html;
  document.body.appendChild(t);
  requestAnimationFrame(function(){ t.classList.add('is-in'); });
  setTimeout(function(){ t.classList.remove('is-in'); setTimeout(function(){ t.remove(); }, 500); }, 3200);
}

/* ---- Stories: a bubble per upcoming party; full-screen viewer ----
   Each party's story = ev.stories ([{video|image}]) if set, else its clip,
   else its flyer. Seen state is per device. */
const STORY_IMAGE_MS = 5000;
function storyItems(ev){
  if(Array.isArray(ev.stories) && ev.stories.length) return ev.stories;
  const items = [];
  if(ev.clip && ev.clip.mp4) items.push({ video: ev.clip.mp4, poster: ev.clip.poster });
  if(ev.image && !(ev.flyerPending && !isPastEvent(ev))) items.push({ image: ev.image });
  return items;
}
function storySeen(id){ try{ return !!localStorage.getItem('ags_story_' + id); } catch(e){ return false; } }
function storyEvents(){
  return getSortedEvents().filter(function(ev){ return storyItems(ev).length; }).slice(0, 12)
    .sort(function(a, b){ return (storySeen(a.id) - storySeen(b.id)) || ((b.sponsored ? 1 : 0) - (a.sponsored ? 1 : 0)) || (forYouScore(b) - forYouScore(a)); });
}
function renderStoryBar(){
  const bar = document.getElementById('storyBar');
  if(!bar) return;
  const list = storyEvents();
  const head = document.getElementById('storyHead');
  if(list.length < 2){ bar.hidden = true; bar.innerHTML = ''; if(head) head.hidden = true; return; }
  if(head) head.hidden = false;
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  bar.hidden = false;
  bar.innerHTML = list.map(function(ev){
    const thumb = (ev.clip && ev.clip.poster) || ev.image || '';
    const d = new Date(ev.date + 'T00:00:00');
    const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()] + ' ' + d.getDate();
    return '<button type="button" class="story-bubble' + (storySeen(ev.id) ? ' is-seen' : '') + '" data-story="' + esc(ev.id) + '">' +
      '<span class="story-bubble__ring"><span class="story-bubble__img" style="background-image:url(\'' + esc(thumb).replace(/'/g, '%27') + '\')"></span></span>' +
      '<span class="story-bubble__name">' + esc(ev.name) + '</span><span class="story-bubble__day">' + day + '</span></button>';
  }).join('');
  bar.querySelectorAll('.story-bubble').forEach(function(btn){
    btn.addEventListener('click', function(){
      const order = storyEvents();
      const idx = order.findIndex(function(e){ return e.id === btn.dataset.story; });
      openStoryViewer(order, Math.max(0, idx));
    });
  });
}
function openStoryViewer(events, startIndex){
  if(document.getElementById('storyViewer')) return;
  const heroClip = document.querySelector('#featuredHero video');
  if(heroClip){ try{ heroClip.pause(); } catch(e){} }
  const el = document.createElement('div');
  el.id = 'storyViewer';
  el.className = 'story-viewer';
  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';
  let evIdx = startIndex, itemIdx = 0, timer = null, raf = null, muted = false;

  function close(){
    clearTimeout(timer); cancelAnimationFrame(raf);
    const v = el.querySelector('video'); if(v){ try{ v.pause(); } catch(e){} }
    el.remove();
    document.body.style.overflow = '';
    renderStoryBar();
    if(heroClip && heroClip.getBoundingClientRect().height){ heroClip.play().catch(function(){}); }
  }
  function next(){ const items = storyItems(events[evIdx]); if(itemIdx < items.length - 1){ itemIdx++; show(); } else if(evIdx < events.length - 1){ evIdx++; itemIdx = 0; show(); } else close(); }
  function prev(){ if(itemIdx > 0){ itemIdx--; show(); } else if(evIdx > 0){ evIdx--; itemIdx = 0; show(); } else show(); }
  function show(){
    clearTimeout(timer); cancelAnimationFrame(raf);
    const ev = events[evIdx], items = storyItems(ev), it = items[itemIdx];
    try{ localStorage.setItem('ags_story_' + ev.id, '1'); } catch(e){}
    const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
    el.innerHTML =
      '<div class="story-viewer__media">' + (it.video
        ? '<video src="' + it.video + '"' + (it.poster ? ' poster="' + it.poster + '"' : '') + ' autoplay playsinline' + (muted ? ' muted' : '') + '></video>'
        : imgTag(it.image, '', ' class="is-flyer"')) + '</div>' +
      '<div class="story-viewer__bars">' + items.map(function(_, i){ return '<i><b style="width:' + (i < itemIdx ? 100 : 0) + '%"></b></i>'; }).join('') + '</div>' +
      '<div class="story-viewer__head" style="top:calc(env(safe-area-inset-top, 0px) + 22px)">' +
        '<span>' + ev.name + '<small>' + formatDate(ev.date) + ' · ' + eventVenueName(ev) + '</small></span>' +
        (it.video ? '<button type="button" class="story-viewer__btn" data-act="sound">' + (muted ? '🔇' : '🔊') + '</button>' : '') +
        '<button type="button" class="story-viewer__btn" data-act="close" aria-label="Close">✕</button></div>' +
      '<div class="story-viewer__tap story-viewer__tap--prev" data-act="prev"></div><div class="story-viewer__tap story-viewer__tap--next" data-act="next"></div>' +
      '<button type="button" class="story-viewer__cta" data-act="go">' + (open ? 'Request access →' : 'View party →') + '</button>';
    const bar = el.querySelectorAll('.story-viewer__bars b')[itemIdx];
    const v = el.querySelector('video');
    if(v){
      v.play().catch(function(){ muted = true; v.muted = true; const b = el.querySelector('[data-act="sound"]'); if(b) b.textContent = '🔇'; v.play().catch(function(){}); });
      const tick = function(){ if(v.duration) bar.style.width = Math.min(100, v.currentTime / v.duration * 100) + '%'; raf = requestAnimationFrame(tick); };
      tick();
      v.addEventListener('ended', next);
    } else {
      const t0 = Date.now();
      const tick = function(){ bar.style.width = Math.min(100, (Date.now() - t0) / STORY_IMAGE_MS * 100) + '%'; raf = requestAnimationFrame(tick); };
      tick();
      timer = setTimeout(next, STORY_IMAGE_MS);
    }
  }
  el.addEventListener('click', function(e){
    const act = e.target.closest('[data-act]'); if(!act) return;
    const a = act.dataset.act;
    if(a === 'close') close();
    else if(a === 'next') next();
    else if(a === 'prev') prev();
    else if(a === 'sound'){ const v = el.querySelector('video'); muted = !muted; if(v){ v.muted = muted; if(v.paused) v.play().catch(function(){}); } act.textContent = muted ? '🔇' : '🔊'; }
    else if(a === 'go'){
      const ev = events[evIdx]; const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
      close();
      if(open) startGuestlistFor(ev, false); else openEventSheet(ev);
    }
  });
  // Swipe down to close.
  let y0 = null;
  el.addEventListener('touchstart', function(e){ y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', function(e){ if(y0 !== null && e.changedTouches[0].clientY - y0 > 90) close(); y0 = null; });
  document.addEventListener('keydown', function onKey(e){
    if(!document.body.contains(el)){ document.removeEventListener('keydown', onKey); return; }
    if(e.key === 'Escape') close(); else if(e.key === 'ArrowRight') next(); else if(e.key === 'ArrowLeft') prev();
  });
  show();
}

/* ---- Featured video at the top of the home screen (ev.featuredHero + ev.clip) ---- */
function featuredHeroEvent(){
  const list = getSortedEvents().filter(function(ev){ return ev.clip && ev.clip.mp4; });
  return list.find(function(ev){ return ev.sponsored && ev.featuredHero; }) || list.find(function(ev){ return ev.featuredHero; }) || null;
}
function renderFeaturedHero(){
  const box = document.getElementById('featuredHero');
  if(!box) return;
  const ev = featuredHeroEvent();
  if(!ev){ box.hidden = true; box.innerHTML = ''; box.dataset.eventId = ''; return; }
  if(box.dataset.eventId === ev.id && box.innerHTML) { box.hidden = false; return; }
  const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
  box.dataset.eventId = ev.id;
  box.hidden = false;
  box.innerHTML =
    '<video class="featured-hero__video" src="' + ev.clip.mp4 + '"' + (ev.clip.poster ? ' poster="' + ev.clip.poster + '"' : '') +
      ' autoplay muted loop playsinline preload="metadata"></video>' +
    '<span class="featured-hero__tag">Featured · ' + formatDate(ev.date) + '</span>' +
    '<button type="button" class="featured-hero__sound" aria-label="Sound on">🔇</button>' +
    '<div class="featured-hero__cta">' + (open ? 'Request access →' : 'View party →') + '</div>';
  const v = box.querySelector('video'), snd = box.querySelector('.featured-hero__sound');
  snd.addEventListener('click', function(e){
    e.stopPropagation();
    v.muted = !v.muted; snd.textContent = v.muted ? '🔇' : '🔊';
    snd.setAttribute('aria-label', v.muted ? 'Sound on' : 'Sound off');
    if(v.paused) v.play().catch(function(){});
  });
  box.onclick = function(){
    v.muted = true; snd.textContent = '🔇';
    if(typeof AppSound !== 'undefined') AppSound.play('open');
    if(open) startGuestlistFor(ev, false); else openEventSheet(ev);
  };
  // Small home-screen version always starts without sound; only the
  // one-time full-screen intro (maybeShowHeroIntro) plays with sound.
  v.muted = true;
  v.play().catch(function(){});
  // Only play while it's on screen (saves battery and data).
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting && !document.body.classList.contains('hero-intro-open')) v.play().catch(function(){}); else v.pause(); });
    }, { threshold: 0.2 }).observe(v);
  }
}

function closeEventSheet(){
  const clip = document.querySelector('#sheetMedia video');
  if(clip){ try{ clip.pause(); clip.muted = true; } catch(e){} }
  document.getElementById('sheetOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
  if(document.body.classList.contains('feed-mode')) try{ resumeFeed(); } catch(e){}
  const hero = document.getElementById('featuredHero'), heroClip = hero && hero.querySelector('video');
  if(heroClip && !hero.hidden && hero.offsetHeight){ heroClip.play().catch(function(){}); }
}
document.getElementById('sheetClose').addEventListener('click', closeEventSheet);
document.getElementById('sheetOverlay').addEventListener('click', function(e){
  if(e.target === this) closeEventSheet();
});

/* ================================================================
   REWARDS & PERKS SHEET
   ================================================================ */
function openRewardsSheet(){
  document.querySelectorAll('.tier-perk').forEach(function(el){ el.classList.remove('is-current-tier'); });
  const memberCard = document.querySelector('.member-card');
  const tierClass = ['is-bronze', 'is-silver', 'is-gold', 'is-vip'].find(function(c){ return memberCard.classList.contains(c); });
  if(tierClass){
    const el = document.getElementById('tierPerk-' + tierClass.replace('is-', ''));
    if(el) el.classList.add('is-current-tier');
  }
  document.getElementById('rewardsOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeRewardsSheet(){
  document.getElementById('rewardsOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
}
document.getElementById('rewardsLinkBtn').addEventListener('click', openRewardsSheet);
document.getElementById('rewardsClose').addEventListener('click', closeRewardsSheet);
document.getElementById('rewardsOverlay').addEventListener('click', function(e){
  if(e.target === this) closeRewardsSheet();
});

/* ================================================================
   GUESTLIST FORM
   ================================================================ */
function populateGuestlistSelect(){
  const select = document.getElementById('glEvent');
  select.innerHTML = '<option value="" disabled selected>Choose an event…</option>' +
    getSortedEvents().map(function(ev){
      const originalIndex = EVENTS.indexOf(ev);
      const soon = ev.guestlistStatus === 'soon';
      const ticketsOnly = ev.guestlistStatus === 'none';
      const closed = ev.guestlistStatus === 'closed';
      const unavailable = soon || ticketsOnly || closed;
      return '<option value="' + originalIndex + '"' + (unavailable ? ' disabled' : '') + '>' + ev.name + ' — ' + eventVenueName(ev) + ' — ' + formatDate(ev.date) + (soon ? ' (guestlist coming soon)' : closed ? ' (' + (ev.closedLabel || 'guestlist closed').toLowerCase() + ')' : (ticketsOnly ? ' (tickets only)' : '')) + '</option>';
    }).join('');
}
// Takes the event object itself (or its name, for old callers). Several
// events share a name (e.g. weekly Behind Closed Doors), so matching by
// name alone picked an old, already-past date that isn't in the dropdown,
// leaving the form with no event and the submit button silently doing nothing.
function preselectEvent(evOrName){
  let idx = typeof evOrName === 'object' && evOrName ? EVENTS.indexOf(evOrName) : -1;
  if(idx === -1){
    const name = typeof evOrName === 'string' ? evOrName : (evOrName && evOrName.name);
    idx = EVENTS.findIndex(function(ev){ return ev.name === name && !isPastEvent(ev); });
  }
  if(idx !== -1){
    document.getElementById('glEvent').value = String(idx);
    if(typeof rebuildAdditionalGuests === 'function') rebuildAdditionalGuests();
  }
}

// The event currently picked in the guestlist form (or null).
function selectedGuestlistEvent(){
  const v = document.getElementById('glEvent').value;
  return v === '' ? null : (EVENTS[parseInt(v, 10)] || null);
}
function eventNeedsGuestEmails(ev){
  return !!(ev && ev.guestEmailRequired);
}
function eventNeedsGender(ev){
  return !!(ev && ev.guestGenderRequired);
}
function genderSelectHtml(cls, i, value){
  return '<select class="' + cls + '"' + (i ? ' data-i="' + i + '"' : '') + '>' +
    '<option value="">Select…</option>' +
    '<option value="man"' + (value === 'man' ? ' selected' : '') + '>Man</option>' +
    '<option value="woman"' + (value === 'woman' ? ' selected' : '') + '>Woman</option>' +
  '</select>';
}
function updateMainGenderField(){
  const wrap = document.getElementById('glGenderWrap');
  if(wrap) wrap.style.display = eventNeedsGender(selectedGuestlistEvent()) ? '' : 'none';
}

function rebuildAdditionalGuests(){
  const count = parseInt(document.getElementById('glGuestCount').value, 10) || 0;
  const wrap = document.getElementById('glAdditionalGuests');
  const needEmail = eventNeedsGuestEmails(selectedGuestlistEvent());
  const needGender = eventNeedsGender(selectedGuestlistEvent());
  updateMainGenderField();
  // Keep what was already typed when the list is rebuilt (e.g. event switched).
  const prev = {};
  wrap.querySelectorAll('input[data-i], select[data-i]').forEach(function(input){
    prev[input.className + '-' + input.dataset.i] = input.value;
  });
  function val(cls, i){ return (prev[cls + '-' + i] || '').replace(/"/g, '&quot;'); }
  let html = '';
  if(needEmail && count > 0){
    html += '<p class="guest-email-note">For this event every guest receives their own ticket by email to personalise. Please fill in first &amp; last name, age, ' + (needGender ? 'man/woman, ' : '') + 'and email for each guest.</p>';
  }
  for(let i = 1; i <= count; i++){
    html +=
      '<div class="guest-block">' +
        '<div class="guest-block__title">Guest ' + i + '</div>' +
        '<div class="field-row">' +
          '<div class="field"><label>First Name</label><input type="text" class="ag-first" data-i="' + i + '" value="' + val('ag-first', i) + '"></div>' +
          '<div class="field"><label>Last Name</label><input type="text" class="ag-last" data-i="' + i + '" value="' + val('ag-last', i) + '"></div>' +
        '</div>' +
        '<div class="field"><label>Age</label><input type="number" min="18" class="ag-age" data-i="' + i + '" value="' + val('ag-age', i) + '"></div>' +
        (needGender
          ? '<div class="field"><label>Man / Woman</label>' + genderSelectHtml('ag-gender', i, prev['ag-gender-' + i]) + '</div>'
          : '') +
        (needEmail
          ? '<div class="field"><label>Email</label><input type="email" class="ag-email" data-i="' + i + '" value="' + val('ag-email', i) + '"></div>'
          : '') +
        '<div class="err" id="errGuest' + i + '">' +
          (needEmail ? 'First name, last name, age (18+)' + (needGender ? ', man/woman' : '') + ' and a valid email are required.' : 'First name, last name and age (18+) are required.') +
        '</div>' +
      '</div>';
  }
  wrap.innerHTML = html;
}
document.getElementById('glGuestCount').addEventListener('change', rebuildAdditionalGuests);
document.getElementById('glEvent').addEventListener('change', rebuildAdditionalGuests);
document.getElementById('glEvent').addEventListener('change', updateMainGenderField);

function clearErr(id){ const el = document.getElementById(id); if(el) el.classList.remove('is-visible'); }
function showErr(id){ const el = document.getElementById(id); if(el) el.classList.add('is-visible'); }

['glFirstName','glLastName','glAge','glPhone','glEmail'].forEach(function(id){
  document.getElementById(id).addEventListener('input', function(){ clearErr('err' + id.slice(2)); });
});
document.getElementById('glEvent').addEventListener('change', function(){ this.style.borderColor = ''; clearErr('errEvent'); });
document.getElementById('glConsent').addEventListener('change', function(){ clearErr('errConsent'); });

/* ---------------------------------------------------------------
   EASY REPEAT REQUESTS
   Logged-in guests never retype their details: the form is filled
   from their most recent request (or their account for a first one).
   Only empty fields are filled, so nothing they typed is overwritten.
   --------------------------------------------------------------- */
let pendingGuestlistEvent = null; // event to return to after logging in
let lastRequestedEvent = null;   // for 'Share to your story' after a request

function setIfEmpty(id, value){
  const el = document.getElementById(id);
  if(el && !el.value && value !== undefined && value !== null && String(value).trim() !== '') el.value = String(value).trim();
}

async function prefillGuestlistForm(){
  if(!currentUser) return;
  const meta = currentUser.user_metadata || {};
  let last = null;
  try{
    const { data } = await supabaseClient
      .from('guestlist_requests')
      .select('first_name,last_name,age,instagram,phone,email,gender')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(1);
    last = data && data[0] ? data[0] : null;
  } catch(err){ /* fall back to account details */ }

  setIfEmpty('glFirstName', (last && last.first_name) || meta.first_name);
  setIfEmpty('glLastName', (last && last.last_name) || meta.last_name);
  setIfEmpty('glEmail', (last && last.email) || currentUser.email);
  if(last){
    setIfEmpty('glAge', last.age);
    if(last.instagram && last.instagram !== 'None') setIfEmpty('glInstagram', last.instagram);
    if(last.gender) setIfEmpty('glGender', last.gender);
    // Stored as "+31 612345678" -> country code + number.
    const m = String(last.phone || '').match(/^(\+\d{1,4})\s*(.*)$/);
    const phoneEl = document.getElementById('glPhone');
    if(m && phoneEl && !phoneEl.value){
      const codeEl = document.getElementById('glPhoneCode');
      if(codeEl && Array.prototype.some.call(codeEl.options, function(o){ return o.value === m[1]; })) codeEl.value = m[1];
      phoneEl.value = m[2].replace(/\s+/g, '');
    } else if(!m){
      setIfEmpty('glPhone', last.phone);
    }
  }
  ['FirstName','LastName','Age','Phone','Email'].forEach(function(f){ clearErr('err' + f); });
}

// After a request the form was hidden for good; bring it back for the next
// night, keeping the guest's own details and clearing the per-event parts.
function resetGuestlistFormForNext(){
  const success = document.getElementById('glSuccess');
  if(!success || !success.classList.contains('is-visible')) return;
  success.classList.remove('is-visible');
  document.getElementById('glForm').style.display = '';
  document.getElementById('glEvent').value = '';
  document.getElementById('glGuestCount').value = '0';
  document.getElementById('glConsent').checked = false;
  rebuildAdditionalGuests();
  prefillGuestlistForm();
}

// Logged-out guest picked an event: remember it, send them to log in, and
// bring them straight back to that event afterwards (see showAccountPanel).
function rememberEventAndLogin(ev){
  pendingGuestlistEvent = ev || null;
  switchTab('account');
}
function resumePendingGuestlistEvent(){
  if(!pendingGuestlistEvent) return;
  const ev = pendingGuestlistEvent;
  pendingGuestlistEvent = null;
  resetGuestlistFormForNext();
  switchTab('guestlist');
  preselectEvent(ev);
  prefillGuestlistForm();
}

document.getElementById('glForm').addEventListener('submit', async function(e){
  e.preventDefault();

  if(!currentUser){
    rememberEventAndLogin(selectedGuestlistEvent());
    showAuthError('loginError', 'Log in or create an account to send your request — your details are kept.');
    return;
  }

  let valid = true;

  const eventSelect = document.getElementById('glEvent');
  if(!eventSelect.value){ valid = false; showErr('errEvent'); eventSelect.style.borderColor = '#e57373'; } else { clearErr('errEvent'); }

  const firstName = document.getElementById('glFirstName').value.trim();
  const lastName = document.getElementById('glLastName').value.trim();
  const age = document.getElementById('glAge').value.trim();
  const phone = document.getElementById('glPhone').value.trim();
  const email = document.getElementById('glEmail').value.trim();
  const consent = document.getElementById('glConsent').checked;

  if(!firstName){ showErr('errFirstName'); valid = false; } else { clearErr('errFirstName'); }
  if(!lastName){ showErr('errLastName'); valid = false; } else { clearErr('errLastName'); }
  const evMain = EVENTS[parseInt(eventSelect.value, 10)];
  const minAgeMain = eventMinAge(evMain, document.getElementById('glGender').value);
  document.getElementById('errAge').textContent = (eventAgeRule(evMain).indexOf('men') === 0)
    ? 'Age limit for this event: ' + eventAgeRule(evMain) + '.'
    : 'Must be ' + minAgeMain + ' or older' + (minAgeMain > 18 ? ' for this event.' : '.');
  if(!age || parseInt(age, 10) < minAgeMain){ showErr('errAge'); valid = false; } else { clearErr('errAge'); }
  if(!phone){ showErr('errPhone'); valid = false; } else { clearErr('errPhone'); }
  if(!email || email.indexOf('@') === -1){ showErr('errEmail'); valid = false; } else { clearErr('errEmail'); }
  const genderEl = document.getElementById('glGender');
  const needMainGender = eventNeedsGender(EVENTS[parseInt(eventSelect.value, 10)]);
  if(needMainGender && !genderEl.value){ showErr('errGender'); valid = false; } else { clearErr('errGender'); }
  if(!consent){ showErr('errConsent'); valid = false; } else { clearErr('errConsent'); }

  if(!valid){
    const firstInvalid = document.querySelector('.err.is-visible');
    if(firstInvalid){ firstInvalid.scrollIntoView({ behavior:'smooth', block:'center' }); }
    return;
  }

  const ev = EVENTS[parseInt(eventSelect.value, 10)];
  lastRequestedEvent = ev;
  const phoneCode = document.getElementById('glPhoneCode').value;
  const fullPhone = phoneCode + ' ' + phone.replace(/^0/, '');

  const needGuestEmails = eventNeedsGuestEmails(ev);
  const additionalGuests = [];
  let guestsValid = true;
  document.querySelectorAll('.ag-first').forEach(function(input){
    const i = input.dataset.i;
    const gFirst = input.value.trim();
    const gLast = document.querySelector('.ag-last[data-i="' + i + '"]').value.trim();
    const gAge = document.querySelector('.ag-age[data-i="' + i + '"]').value.trim();
    const gEmailInput = document.querySelector('.ag-email[data-i="' + i + '"]');
    const gEmail = gEmailInput ? gEmailInput.value.trim() : '';
    const gGenderInput = document.querySelector('.ag-gender[data-i="' + i + '"]');
    const gGender = gGenderInput ? gGenderInput.value : '';
    if(needGuestEmails){
      // Every chosen guest must be complete: their ticket is emailed to them.
      const ok = gFirst && gLast && gAge && parseInt(gAge, 10) >= eventMinAge(ev, gGender) && gEmail.indexOf('@') > 0 && (!eventNeedsGender(ev) || gGender);
      if(!ok){ showErr('errGuest' + i); guestsValid = false; } else { clearErr('errGuest' + i); }
      const gObj = { firstName: gFirst, lastName: gLast, age: gAge, email: gEmail };
      if(gGender) gObj.gender = gGender;
      additionalGuests.push(gObj);
    } else if(gFirst || gLast){
      const gMin = eventMinAge(ev, gGender);
      if((eventNeedsGender(ev) && !gGender) || (gMin > 18 && (!gAge || parseInt(gAge, 10) < gMin))){
        const eg = document.getElementById('errGuest' + i);
        if(eg) eg.textContent = (eventNeedsGender(ev) && !gGender)
          ? 'Guest ' + i + ': please select man or woman.'
          : 'Guest ' + i + ' must be ' + gMin + ' or older for this event' + (eventAgeRule(ev).indexOf('men') === 0 ? ' (' + eventAgeRule(ev) + ').' : '.');
        showErr('errGuest' + i); guestsValid = false;
      } else { clearErr('errGuest' + i); }
      const g = { firstName: gFirst, lastName: gLast, age: gAge };
      if(gEmail) g.email = gEmail;
      additionalGuests.push(g);
    }
  });
  if(!guestsValid){
    const firstInvalid = document.querySelector('.err.is-visible');
    if(firstInvalid){ firstInvalid.scrollIntoView({ behavior:'smooth', block:'center' }); }
    return;
  }

  const payload = {
    event: { name: ev.name, venue: ev.venue, date: ev.date },
    mainGuest: { firstName: firstName, lastName: lastName, age: age, instagram: document.getElementById('glInstagram').value.trim() || 'None', phone: fullPhone, email: email, gender: needMainGender ? genderEl.value : '' },
    additionalGuests: additionalGuests,
    totalGuests: 1 + additionalGuests.length,
    consent: consent
  };

  // Save to the user's account so it shows up under "My Requests", and
  // is visible to you in the admin dashboard (admin/requests.html).
  const submitBtn = this.querySelector('button[type="submit"]');
  if(submitBtn){ submitBtn.disabled = true; }
  const saved = await saveRequestToAccount(payload);
  if(submitBtn){ submitBtn.disabled = false; }
  if(!saved){
    const errSubmitEl = document.getElementById('errSubmit');
    if(errSubmitEl){
      if(!errSubmitEl.dataset.defaultText) errSubmitEl.dataset.defaultText = errSubmitEl.textContent;
      errSubmitEl.textContent = lastSaveBlockMessage || errSubmitEl.dataset.defaultText;
    }
    showErr('errSubmit');
    document.getElementById('errSubmit').scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  clearErr('errSubmit');

  document.getElementById('glSuccessMsg').innerHTML =
    'Your request for <strong>' + ev.name + '</strong> has been submitted. We\'ll review it and update the status in your account.';
  document.getElementById('glForm').style.display = 'none';
  document.getElementById('glSpotNotice').style.display = 'none';
  document.getElementById('glSuccess').classList.add('is-visible');
  const askBox = document.getElementById('glPushAsk');
  if(askBox){ askBox.innerHTML = pushAskHtml(); bindPushAsk(askBox); }
  AppSound.play('success');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if(typeof loadNextNight === 'function') loadNextNight();
});

/* ================================================================
   SERVICE WORKER + INSTALL PROMPT
   ================================================================ */
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('service-worker.js').catch(function(err){
      console.warn('Service worker registration failed', err);
    });
  });
}

/* ================================================================
   PUSH NOTIFICATIONS
   Guests can opt in via the bell icon in the header. Their browser's
   push subscription is stored in Supabase (push_subscriptions table).
   Sending a notification happens from admin/notify.html, which calls
   the api/send-notification serverless function — nothing here ever
   sends a notification itself, this only manages the subscription.
   ================================================================ */
const VAPID_PUBLIC_KEY = 'BIVKXvJdm0cGWvBPQNhiKObGZbwZMVzMtixM7GkSdVQgvjxF-TbwtWE42N5TYagOYe-mhZaBaMbTIvVKFmE0Kyo';

function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for(let i = 0; i < rawData.length; ++i){ outputArray[i] = rawData.charCodeAt(i); }
  return outputArray;
}

const notifyBtn = document.getElementById('notifyBtn');
const NATIVE_PUSH = IS_NATIVE && window.Capacitor.Plugins && window.Capacitor.Plugins.PushNotifications;
const pushSupported = !!NATIVE_PUSH || (('serviceWorker' in navigator) && ('PushManager' in window) && (typeof Notification !== 'undefined'));

/* Native (App Store) notifications via Apple Push. The device token is stored
   in push_subscriptions as endpoint "apns:<token>"; api/_push.js sends it. */
let nativePushOn = false;
// The iPhone's own answer ("granted"/"denied"/"default"), read once at start
// so we never ask someone who already turned notifications on.
let nativePerm = 'default';
const nativePermReady = NATIVE_PUSH
  ? NATIVE_PUSH.checkPermissions().then(function(p){
      nativePerm = p.receive === 'granted' ? 'granted' : (p.receive === 'denied' ? 'denied' : 'default');
    }).catch(function(){})
  : Promise.resolve();
function pushPermission(){
  if(NATIVE_PUSH) return nativePushOn ? 'granted' : nativePerm;
  return (typeof Notification !== 'undefined') ? Notification.permission : 'denied';
}
let nativePushToken = '';
async function nativePushSubscribe(){
  try{
    let perm = await NATIVE_PUSH.checkPermissions();
    if(perm.receive !== 'granted') perm = await NATIVE_PUSH.requestPermissions();
    nativePerm = perm.receive === 'granted' ? 'granted' : (perm.receive === 'denied' ? 'denied' : 'default');
    if(perm.receive !== 'granted'){ nativePushOn = false; return false; }
    await new Promise(function(resolve){
      let done = false;
      NATIVE_PUSH.addListener('registration', async function(t){
        if(t && t.value) nativePushToken = t.value;
        if(supabaseClient && t && t.value){
          const row = { endpoint: 'apns:' + t.value, p256dh: 'native', auth: 'ios' };
          if(currentUser) row.user_id = currentUser.id;
          await supabaseClient.from('push_subscriptions').upsert(row, { onConflict: 'endpoint' });
        }
        nativePushOn = true; if(!done){ done = true; resolve(); }
      });
      NATIVE_PUSH.addListener('registrationError', function(){ if(!done){ done = true; resolve(); } });
      NATIVE_PUSH.register();
      setTimeout(function(){ if(!done){ done = true; resolve(); } }, 8000);
    });
    return nativePushOn;
  } catch(e){ return false; }
}
if(NATIVE_PUSH){
  NATIVE_PUSH.checkPermissions().then(function(p){ if(p.receive === 'granted'){ nativePushSubscribe(); } }).catch(function(){});
  NATIVE_PUSH.addListener('pushNotificationActionPerformed', function(action){
    try{ switchTab('events'); } catch(e){}
    try{
      const n = action && action.notification; const d = (n && n.data) || {};
      const url = d.url || (d.aps && d.aps.url) || '';
      if(d.pid && supabaseClient){
        supabaseClient.rpc('log_push_click', { p_pid: d.pid, p_title: (n && n.title) || null, p_body: (n && n.body) || null, p_endpoint: nativePushToken ? 'apns:' + nativePushToken : null }).then(function(){}, function(){});
      }
      if(url) openEventFromLink(url);
    } catch(e){}
  });
}

async function updateNotifyBtnState(){
  if(!notifyBtn || !pushSupported) return;
  if(NATIVE_PUSH){ notifyBtn.classList.toggle('is-active', nativePushOn); return; }
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  notifyBtn.classList.toggle('is-active', !!sub && Notification.permission === 'granted');
}

async function subscribeToPush(){
  if(NATIVE_PUSH){ await nativePushSubscribe(); await updateNotifyBtnState(); return; }
  try{
    const reg = await navigator.serviceWorker.ready;
    const permission = await Notification.requestPermission();
    if(permission !== 'granted'){ await updateNotifyBtnState(); return; }
    let sub = await reg.pushManager.getSubscription();
    if(!sub){
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    const subJson = sub.toJSON();
    if(supabaseClient){
      const payload = {
        endpoint: subJson.endpoint,
        p256dh: subJson.keys.p256dh,
        auth: subJson.keys.auth
      };
      if(typeof currentUser !== 'undefined' && currentUser){ payload.user_id = currentUser.id; }
      const { error } = await supabaseClient.from('push_subscriptions').upsert(payload, { onConflict: 'endpoint' });
      if(error) console.warn('Saving push subscription failed:', error.message);
    }
  } catch(err){
    console.warn('Push subscribe failed:', err);
  }
  await updateNotifyBtnState();
}

async function unsubscribeFromPush(){
  try{
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if(sub){
      if(supabaseClient){
        await supabaseClient.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
      }
      await sub.unsubscribe();
    }
  } catch(err){
    console.warn('Push unsubscribe failed:', err);
  }
  await updateNotifyBtnState();
}

// Push on/off (used by the switch inside the notifications inbox).
async function isPushOn(){
  if(NATIVE_PUSH) return nativePushOn;
  if(!pushSupported) return false;
  try{ const reg = await navigator.serviceWorker.ready; const ex = await reg.pushManager.getSubscription(); return !!ex && Notification.permission === 'granted'; } catch(e){ return false; }
}
async function togglePush(){
  if(NATIVE_PUSH){
    if(nativePushOn){ try{ await NATIVE_PUSH.unregister(); } catch(e){} nativePushOn = false; await updateNotifyBtnState(); }
    else { await subscribeToPush(); }
    return;
  }
  if(!pushSupported) return;
  if(await isPushOn()) await unsubscribeFromPush(); else await subscribeToPush();
}
if(notifyBtn && NATIVE_PUSH){ updateNotifyBtnState(); }
else if(notifyBtn && pushSupported){ navigator.serviceWorker.ready.then(updateNotifyBtnState); }
if(notifyBtn){ notifyBtn.addEventListener('click', function(){ openInbox(); }); }

/* ---- Notifications inbox (the bell): every push, saved per account ---- */
let INBOX = [];
async function loadInbox(){
  if(!supabaseClient || !currentUser) return [];
  try{
    const { data } = await supabaseClient.from('inbox').select('id, title, body, url, created_at, read_at').order('created_at', { ascending: false }).limit(60);
    INBOX = data || [];
  } catch(e){ INBOX = []; }
  updateInboxBadge();
  return INBOX;
}
function updateInboxBadge(){
  if(!notifyBtn) return;
  const n = INBOX.filter(function(x){ return !x.read_at; }).length;
  let dot = notifyBtn.querySelector('.notify-btn__count');
  if(!dot){ dot = document.createElement('span'); dot.className = 'notify-btn__count'; notifyBtn.appendChild(dot); }
  dot.textContent = n > 9 ? '9+' : String(n);
  dot.hidden = n === 0;
}
function timeAgo(iso){
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if(s < 60) return 'now';
  const m = Math.round(s / 60); if(m < 60) return m + 'm';
  const h = Math.round(m / 60); if(h < 24) return h + 'h';
  const d = Math.round(h / 24); if(d < 7) return d + 'd';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}
async function openInbox(){
  const body = document.getElementById('quickBody');
  if(!body) return;
  if(!currentUser){ if(typeof lockAppBehindGate === 'function') lockAppBehindGate(); return; }
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  body.innerHTML = '<div class="quick-sheet__eyebrow">Inbox</div><div class="quick-sheet__title" id="quickTitle">Notifications</div><div class="inbox" id="inboxList"><div class="skel skel--row"></div><div class="skel skel--row"></div><div class="skel skel--row"></div></div>';
  openQuickSheet();
  const pushOn = await isPushOn();
  await loadInbox();
  const list = document.getElementById('inboxList');
  if(!list) return;
  list.innerHTML =
    (pushSupported ? '<label class="inbox__push"><span>Push notifications<small>' + (pushOn ? 'On, you get them on this phone' : 'Off, turn on so you never miss a spot') + '</small></span><input type="checkbox" id="inboxPush"' + (pushOn ? ' checked' : '') + '></label>' : '') +
    (INBOX.length ? INBOX.map(function(x){
      return '<button type="button" class="inbox__item' + (x.read_at ? '' : ' is-unread') + '" data-url="' + esc(x.url) + '">' +
        '<span class="inbox__dot"></span><span class="inbox__text"><b>' + esc(x.title) + '</b><span>' + esc(x.body) + '</span></span><em>' + timeAgo(x.created_at) + '</em></button>';
    }).join('') : emptyStateHtml('🔔', 'All quiet', 'When you\u2019re approved, a party drops or a badge unlocks, it shows up here.', '', ''));
  const sw = document.getElementById('inboxPush');
  if(sw) sw.addEventListener('change', async function(){ sw.disabled = true; await togglePush(); sw.checked = await isPushOn(); sw.disabled = false; });
  list.querySelectorAll('.inbox__item').forEach(function(b){
    b.addEventListener('click', function(){ closeQuickSheet(); openInboxLink(b.dataset.url); });
  });
  // Opening the inbox marks everything as read.
  const unread = INBOX.filter(function(x){ return !x.read_at; }).map(function(x){ return x.id; });
  if(unread.length){
    supabaseClient.from('inbox').update({ read_at: new Date().toISOString() }).in('id', unread).then(function(){
      INBOX.forEach(function(x){ if(!x.read_at) x.read_at = new Date().toISOString(); }); updateInboxBadge();
    }, function(){});
  }
}
function openInboxLink(url){
  const u = String(url || '');
  if(/[?&]rate=1/.test(u)){ maybeAskForPartyRating(true); return; }
  if(/[?&]perks=1/.test(u)){ openRewardsSheet(); return; }
  if(/[?&]outfits=1/.test(u)){ openOutfits(); return; }
  if(/[?&]event=/.test(u)){ openEventFromLink(u); return; }
  switchTab(/guestlist|request/i.test(u) ? 'account' : 'events');
}
document.addEventListener('visibilitychange', function(){ if(document.visibilityState === 'visible' && currentUser) loadInbox(); });

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById('installBanner').classList.add('is-visible');
});
document.getElementById('installBtn').addEventListener('click', function(){
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(function(){
      deferredInstallPrompt = null;
      document.getElementById('installBanner').classList.remove('is-visible');
    });
  }
});

// Instagram, Facebook, TikTok, etc. open links in their own in-app
// browser, which can't install a PWA at all (no Share button that adds
// to the home screen, and "beforeinstallprompt" never fires). Detect
// that first and tell the guest to open in their real browser before
// showing the normal steps below.
const ua = window.navigator.userAgent.toLowerCase();
const isInAppBrowser = /instagram|fban|fbav|fb_iab|tiktok|musical_ly|bytedance|snapchat|linkedinapp|pinterest/.test(ua);

// iOS Safari has no beforeinstallprompt — show manual instructions instead,
// but only if not already running as an installed app.
const isIos = /iphone|ipad|ipod/.test(ua);
const isAndroid = /android/.test(ua);
const isStandalone = IS_NATIVE || window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
// The native iPhone app is live: iPhone visitors get the App Store instead
// of "Add to Home Screen" (also from Instagram's in-app browser).
const APP_STORE_URL = 'https://apps.apple.com/app/amsterdam-guestlist-service/id6835197252';
function appStoreDismissed(){ try{ return localStorage.getItem('ags_appstore_dismissed') === '1'; } catch(e){ return false; } }
function showAppStoreBar(){
  const banner = document.getElementById('installBanner');
  if(!banner || appStoreDismissed()) return;
  banner.innerHTML =
    '<div class="install-bar">' +
      '<img src="icon-192.png" alt="" width="28" height="28" style="border-radius:7px;flex:none">' +
      '<span class="install-bar__text"><strong>AGS is on the App Store</strong><br><span style="color:var(--muted)">Faster, with instant notifications</span></span>' +
      '<a class="install-bar__how" href="' + APP_STORE_URL + '" rel="noopener" style="text-decoration:none">Get</a>' +
      '<button type="button" class="install-bar__close" aria-label="Close">✕</button>' +
    '</div>';
  banner.classList.add('is-visible', 'is-slim');
  banner.querySelector('.install-bar__close').addEventListener('click', function(){
    try{ localStorage.setItem('ags_appstore_dismissed', '1'); } catch(e){}
    banner.classList.remove('is-visible');
  });
}

// Slim, dismissible "Add to Home Screen" bar: one line, steps on tap,
// and once closed it stays closed on this device.
function installDismissed(){ try{ return localStorage.getItem('ags_install_dismissed') === '1'; } catch(e){ return false; } }
function showSlimInstallBar(steps){
  const banner = document.getElementById('installBanner');
  if(!banner || installDismissed()) return;
  banner.innerHTML =
    '<div class="install-bar">' +
      '<span class="install-bar__icon" aria-hidden="true">＋</span>' +
      '<span class="install-bar__text">Add AGS to your Home Screen</span>' +
      '<button type="button" class="install-bar__how">How?</button>' +
      '<button type="button" class="install-bar__close" aria-label="Close">✕</button>' +
    '</div>' +
    '<div class="install-bar__steps" hidden>' + steps + '</div>';
  banner.classList.add('is-visible', 'is-slim');
  banner.querySelector('.install-bar__how').addEventListener('click', function(){
    const st = banner.querySelector('.install-bar__steps'); st.hidden = !st.hidden;
  });
  banner.querySelector('.install-bar__close').addEventListener('click', function(){
    try{ localStorage.setItem('ags_install_dismissed', '1'); } catch(e){}
    banner.classList.remove('is-visible');
  });
}
if(isIos && !IS_NATIVE){
  showAppStoreBar();
} else if(!isStandalone){
  if(isInAppBrowser){
    showSlimInstallBar('Tap the ••• menu, choose "Open in Safari" (or "Open in Browser"), then tap the Share icon and choose "Add to Home Screen".');
  } else if(isIos){
    showSlimInstallBar('Tap the Share icon at the bottom of Safari, then choose "Add to Home Screen".');
  } else if(isAndroid){
    // Android Chrome shows its own install banner via beforeinstallprompt
    // above — nothing extra needed here.
  }
}

/* ================================================================
   WELCOME TOUR — a short multi-step walkthrough shown the first time
   the app is opened. Skips itself on every visit after that.
   ================================================================ */
(function initWelcomeTour(){
  const overlay = document.getElementById('welcomeOverlay');
  const slides = Array.prototype.slice.call(overlay.querySelectorAll('.tour-slide'));
  const dots = Array.prototype.slice.call(document.querySelectorAll('.tour-dot'));
  const nextBtn = document.getElementById('tourNextBtn');
  const skipBtn = document.getElementById('tourSkipBtn');
  let index = 0;

  let alreadySeen = false;
  try{ alreadySeen = !!localStorage.getItem('ags_tour_seen'); } catch(e){}
  if(alreadySeen){ overlay.remove(); return; }

  function showSlide(i){
    slides.forEach(function(s, si){ s.classList.toggle('is-active', si === i); });
    dots.forEach(function(d, di){ d.classList.toggle('is-active', di === i); });
    nextBtn.textContent = (i === slides.length - 1) ? "Let's Go" : 'Next';
  }

  function closeTour(){
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    try{ localStorage.setItem('ags_tour_seen', '1'); } catch(e){}
  }

  nextBtn.addEventListener('click', function(){
    if(index < slides.length - 1){ index++; showSlide(index); }
    else { closeTour(); }
  });
  skipBtn.addEventListener('click', closeTour);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay){ closeTour(); }
  });

  showSlide(0);
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
})();

/* ================================================================
   INIT
   ================================================================ */
renderEventList();
renderVenueFilter();
renderPastEventList();
populateGuestlistSelect();
setTimeout(function(){ if(!currentUser) loadMemberAccess(); }, 1500);
setTimeout(loadProof, 900);
openEventFromLink(window.location.search);

/* ================================================================
   ACCOUNT — sign up, log in, sign out, my requests
   ================================================================ */
let currentUser = null;

function showAuthPanel(){
  if(typeof window.agsAdminHide === 'function') window.agsAdminHide();
  try{ const n = document.getElementById('pushNudge'); if(n){ n.hidden = true; n.innerHTML = ''; } } catch(e){}
  document.getElementById('authPanel').style.display = 'block';
  document.getElementById('accountPanel').style.display = 'none';
  document.getElementById('authHero').hidden = false;
  document.getElementById('accountHeading').textContent = 'Welcome';
  document.getElementById('accountSubhead').textContent = 'Log in or create an account to request guestlist access.';
}
// Google sign-ups can't pass the referral code at signup, so attach it
// right after the first login (the server only accepts it for new accounts).
async function claimReferralIfAny(){
  let code = null;
  try{ code = localStorage.getItem('ags_referral_code'); } catch(e){}
  if(!code || !supabaseClient) return;
  try{
    const { data } = await supabaseClient.rpc('claim_referral', { p_code: code });
    if(data && (data.success || ['already_referred', 'not_new', 'unknown_code', 'own_code'].indexOf(data.reason) >= 0)){
      try{ localStorage.removeItem('ags_referral_code'); } catch(e){}
    }
  } catch(e){}
}
// App Store rating: in the iPhone app, the morning after a night someone was
// on the list (and showed up), ask Apple's rating sheet. Apple decides whether
// it really appears (max 3x a year); we ask at most once every 120 days.
async function maybeAskForReview(afterGoodRating){
  try{
    const review = IS_NATIVE && window.Capacitor.Plugins && window.Capacitor.Plugins.InAppReview;
    if(!review || !supabaseClient || !currentUser) return;
    let last = 0; try{ last = Number(localStorage.getItem('ags_review_asked') || 0); } catch(e){}
    if(Date.now() - last < 120 * 864e5) return;
    if(afterGoodRating){
      // They just gave the night 4-5 stars: the best moment to ask.
      try{ localStorage.setItem('ags_review_asked', String(Date.now())); } catch(e){}
      setTimeout(function(){ try{ review.requestReview(); } catch(e){} }, 600);
      return;
    }
    const fmt = function(ms){ return new Date(ms).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
    const { data } = await supabaseClient.from('guestlist_requests')
      .select('status, event_date, missing_guests')
      .gte('event_date', fmt(Date.now() - 14 * 864e5)).lte('event_date', fmt(Date.now() - 864e5));
    const goodNight = (data || []).some(function(r){
      return String(r.status || '').trim().toLowerCase() === 'approved' && !(Number(r.missing_guests) > 0);
    });
    if(!goodNight) return;
    try{ localStorage.setItem('ags_review_asked', String(Date.now())); } catch(e){}
    setTimeout(function(){ try{ review.requestReview(); } catch(e){} }, 4000);
  } catch(e){}
}
/* ---- Rate your night: the day after a party you were on the list for ----
   1-5 stars + optional comment, stored in party_ratings (one per party).
   A 4-5 star night is the moment to ask for an App Store rating. */
async function maybeAskForPartyRating(force){
  try{
    if(!supabaseClient || !currentUser) return false;
    const fmt = function(ms){ return new Date(ms).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); };
    const { data: reqs } = await supabaseClient.from('guestlist_requests')
      .select('event_name, event_date, status, missing_guests')
      .gte('event_date', fmt(Date.now() - 7 * 864e5)).lte('event_date', fmt(Date.now() - 864e5 + 6 * 36e5));
    const nights = (reqs || []).filter(function(r){ return String(r.status || '').trim().toLowerCase() === 'approved'; })
      .sort(function(a, b){ return a.event_date < b.event_date ? 1 : -1; });
    if(!nights.length) return false;
    const { data: done } = await supabaseClient.from('party_ratings').select('event_name, event_date');
    const doneKeys = new Set((done || []).map(function(r){ return r.event_name + '|' + r.event_date; }));
    const night = nights.find(function(r){
      const k = r.event_name + '|' + r.event_date;
      if(doneKeys.has(k)) return false;
      let skipped = false; try{ skipped = !!localStorage.getItem('ags_rate_skip_' + k); } catch(e){}
      if(skipped && !force) return false;
      // Only once the night is really over (default 05:00 the next morning).
      const ev = EVENTS.find(function(e){ return e.name === r.event_name && e.date === r.event_date; });
      const end = ev && ev.endTime ? ev.endTime : '05:00';
      const endMs = new Date(r.event_date + 'T' + end + ':00').getTime() + (parseInt(end, 10) < 12 ? 864e5 : 0);
      return Date.now() > endMs + 3 * 36e5;
    });
    if(!night) return false;
    showPartyRatingSheet(night);
    return true;
  } catch(e){ return false; }
}
function showPartyRatingSheet(night){
  const body = document.getElementById('quickBody');
  if(!body) return;
  const key = night.event_name + '|' + night.event_date;
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  body.innerHTML =
    '<div class="quick-sheet__eyebrow">Rate your night</div>' +
    '<div class="quick-sheet__title" id="quickTitle">How was ' + esc(night.event_name) + '?</div>' +
    '<p class="quick-sheet__note" style="margin-top:6px;">' + formatDate(night.event_date) + '. Your rating helps us pick the best parties.</p>' +
    '<div class="rate-stars" role="radiogroup" aria-label="Rating">' +
      [1,2,3,4,5].map(function(n){ return '<button type="button" class="rate-star" data-n="' + n + '" aria-label="' + n + ' star' + (n > 1 ? 's' : '') + '">★</button>'; }).join('') +
    '</div>' +
    '<textarea id="rateComment" class="rate-comment" maxlength="500" placeholder="Anything to share? (optional)"></textarea>' +
    '<div class="err" id="rateErr"></div>' +
    '<div class="quick-sheet__btns">' +
      '<button type="button" class="btn btn--solid" id="rateSend" disabled>Send rating</button>' +
      '<button type="button" class="btn" id="rateLater">Not now</button>' +
    '</div>';
  openQuickSheet();
  let stars = 0;
  const btns = body.querySelectorAll('.rate-star'), send = document.getElementById('rateSend');
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      stars = Number(b.dataset.n);
      btns.forEach(function(x){ x.classList.toggle('is-on', Number(x.dataset.n) <= stars); });
      send.disabled = false;
      if(typeof AppSound !== 'undefined') try{ AppSound.play('tap'); } catch(e){}
    });
  });
  document.getElementById('rateLater').addEventListener('click', function(){
    try{ localStorage.setItem('ags_rate_skip_' + key, '1'); } catch(e){}
    closeQuickSheet();
  });
  send.addEventListener('click', async function(){
    send.disabled = true; send.textContent = 'Sending…';
    const comment = (document.getElementById('rateComment').value || '').trim().slice(0, 500);
    const { error } = await supabaseClient.from('party_ratings').insert({
      event_name: night.event_name, event_date: night.event_date, rating: stars, comment: comment || null
    });
    if(error && !/duplicate|unique/i.test(error.message || '')){
      send.disabled = false; send.textContent = 'Send rating';
      document.getElementById('rateErr').textContent = 'Could not send right now. Please try again.';
      return;
    }
    body.innerHTML =
      '<div class="quick-sheet__eyebrow">Thank you</div>' +
      '<div class="quick-sheet__title" id="quickTitle">' + (stars >= 4 ? 'Glad you had a great night 🖤' : 'Thanks for the honest feedback 🖤') + '</div>' +
      '<p class="quick-sheet__note" style="margin-top:10px;">' + (stars >= 4 ? 'See you on the list again soon.' : 'We read every rating and use it to choose our parties.') + '</p>' +
      '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="rateDone">Close</button></div>';
    document.getElementById('rateDone').addEventListener('click', function(){
      closeQuickSheet();
      if(stars >= 4) maybeAskForReview(true);
    });
  });
}

function showAccountPanel(user){
  try{ setTimeout(loadMemberMeta, 0); } catch(e){}
  claimReferralIfAny();
  maybeShowGroupJoin().then(async function(joined){
    if(joined) return;
    if(await maybeShowOnboarding()) return;
    maybeAskForPartyRating(/[?&]rate=1/.test(window.location.search)).then(function(shown){ if(!shown) maybeAskForReview(); });
  }).catch(function(){});
  document.getElementById('authPanel').style.display = 'none';
  document.getElementById('accountPanel').style.display = 'block';
  document.getElementById('authHero').hidden = true;
  document.getElementById('accountHeading').textContent = 'Welcome Back';
  document.getElementById('accountSubhead').textContent = 'Here are your guestlist requests.';
  const meta = user.user_metadata || {};
  const fullName = ((meta.first_name || '') + ' ' + (meta.last_name || '')).trim();
  document.getElementById('accountUserName').textContent = fullName || 'Your Account';
  document.getElementById('accountUserEmail').textContent = user.email;
  if(user.created_at){
    const since = new Date(user.created_at);
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    document.getElementById('accountUserSince').textContent = 'Member since ' + monthNames[since.getMonth()] + ' ' + since.getFullYear();
  }
  if(user.id){
    document.getElementById('accountUserId').textContent = '•••• ' + user.id.replace(/-/g, '').slice(-6).toUpperCase();
  }
  loadMyRequests();
  loadMyPoints();
  loadMemberAccess();
  loadMyPrefs();
  loadMyBadges();
  loadMyProfileCard();
  setTimeout(logOpen, 800);
  if(notifyBtn) notifyBtn.hidden = false;
  loadInbox();
  linkPushSubscriptionToAccount();
  if(typeof salonInit === 'function') salonInit(user);
  if(typeof window.agsAdminCheck === 'function') window.agsAdminCheck();
  setTimeout(renderPushNudges, 600);
  prefillGuestlistForm();
  resumePendingGuestlistEvent();
  loadNextNight();
}

// Tiers are purely derived from the points total — no extra database
// column needed. Adjust the thresholds here if you want different cutoffs.
const TIERS = [
  { name: 'Bronze', className: 'is-bronze', min: 0 },
  { name: 'Silver', className: 'is-silver', min: 50 },
  { name: 'Gold', className: 'is-gold', min: 150 },
  { name: 'VIP', className: 'is-vip', min: 300 }
];

function getTierInfo(points){
  let current = TIERS[0];
  let next = null;
  for(let i = 0; i < TIERS.length; i++){
    if(points >= TIERS[i].min){ current = TIERS[i]; next = TIERS[i + 1] || null; }
  }
  return { current: current, next: next };
}

async function loadMyPoints(){
  const valueEl = document.getElementById('accountUserPointsValue');
  const tierBadge = document.getElementById('accountUserTierBadge');
  const tierProgress = document.getElementById('accountUserTierProgress');
  if(!supabaseClient || !currentUser) return;
  try{
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('points, referral_code')
      .eq('user_id', currentUser.id)
      .maybeSingle();
    if(error) return;
    const points = (data && typeof data.points === 'number') ? data.points : 0;
    valueEl.textContent = points;
    if(typeof renderPointsStrip === 'function') renderPointsStrip(points);

    const tierInfo = getTierInfo(points);
    document.querySelector('.member-card').className = 'member-card ' + tierInfo.current.className;
    tierBadge.textContent = tierInfo.current.name;
    const tierBar = document.getElementById('accountUserTierBar');
    if(tierBar){
      tierBar.style.width = (tierInfo.next
        ? Math.max(0, Math.min(100, Math.round((points - tierInfo.current.min) / (tierInfo.next.min - tierInfo.current.min) * 100)))
        : 100) + '%';
    }
    tierProgress.textContent = tierInfo.next
      ? (tierInfo.next.min - points) + ' pts to ' + tierInfo.next.name
      : 'Top tier';

    if(data && data.referral_code){
      MY_REF_CODE = data.referral_code;
      if(typeof renderNextNight === 'function') try{ renderNextNight(); } catch(e){}
      const referralCard = document.getElementById('referralCard');
      const linkText = document.getElementById('referralLinkText');
      const link = SITE_URL + '/app/?ref=' + data.referral_code;
      linkText.textContent = link;
      referralCard.dataset.link = link;
      referralCard.style.display = 'block';
    }
  } catch(err){
    console.warn('Could not load points.', err);
  }
}

document.getElementById('referralCopyBtn').addEventListener('click', async function(){
  const link = document.getElementById('referralCard').dataset.link;
  if(!link) return;
  const btn = this;
  try{
    if(navigator.share){
      await navigator.share({ title: 'Amsterdam Guestlist Service', text: 'Join me on the guestlist:', url: link });
      return;
    }
    await navigator.clipboard.writeText(link);
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('is-copied');
    setTimeout(function(){ btn.textContent = original; btn.classList.remove('is-copied'); }, 1800);
  } catch(err){
    console.warn('Could not share/copy referral link.', err);
  }
});

// If the guest already enabled push notifications anonymously (before
// signing in, or on a shared device), attach their current subscription
// to their account so points/status push notifications can reach them.
async function linkPushSubscriptionToAccount(){
  if(!supabaseClient || !currentUser || !pushSupported) return;
  if(NATIVE_PUSH){ if(nativePushOn) nativePushSubscribe(); return; }
  try{
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if(!sub) return;
    const subJson = sub.toJSON();
    await supabaseClient.from('push_subscriptions').update({
      user_id: currentUser.id
    }).eq('endpoint', subJson.endpoint);
  } catch(err){
    console.warn('Could not link push subscription to account.', err);
  }
}

document.getElementById('authTabLogin').addEventListener('click', function(){
  this.classList.add('is-active');
  document.getElementById('authTabSignup').classList.remove('is-active');
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
});
document.getElementById('authTabSignup').addEventListener('click', function(){
  this.classList.add('is-active');
  document.getElementById('authTabLogin').classList.remove('is-active');
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
});

// ---- Forgot / reset password ----
// Captured before supabase-js has a chance to clean the URL: a reset link
// from the email lands here with #...&type=recovery in the hash.
let isPasswordRecovery = /type=recovery/.test(window.location.hash || '');

function showAuthView(view){
  // view: 'login' | 'forgot' | 'newPassword'
  document.getElementById('loginForm').style.display = view === 'login' ? 'block' : 'none';
  document.getElementById('forgotForm').style.display = view === 'forgot' ? 'block' : 'none';
  document.getElementById('newPasswordForm').style.display = view === 'newPassword' ? 'block' : 'none';
  const codeFormEl = document.getElementById('codeForm');
  if(codeFormEl) codeFormEl.style.display = view === 'code' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = 'none';
  document.querySelector('.auth-switch').style.display = view === 'login' ? 'flex' : 'none';
  document.getElementById('authTabLogin').classList.add('is-active');
  document.getElementById('authTabSignup').classList.remove('is-active');
}
document.getElementById('forgotPasswordLink').addEventListener('click', function(){
  document.getElementById('forgotEmail').value = document.getElementById('loginEmail').value.trim();
  document.getElementById('forgotError').style.display = 'none';
  document.getElementById('forgotOk').style.display = 'none';
  showAuthView('forgot');
});
document.getElementById('forgotBackLink').addEventListener('click', function(){ showAuthView('login'); });

document.getElementById('forgotForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const errEl = document.getElementById('forgotError');
  const okEl = document.getElementById('forgotOk');
  errEl.style.display = 'none'; okEl.style.display = 'none';
  if(!supabaseClient){ errEl.textContent = 'Accounts are not set up yet. Please try again later.'; errEl.style.display = 'block'; return; }
  const email = document.getElementById('forgotEmail').value.trim();
  if(!email){ errEl.textContent = 'Please enter your email address.'; errEl.style.display = 'block'; return; }
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: (API_BASE ? SITE_URL : window.location.origin) + '/app/'
  });
  if(error){ errEl.textContent = error.message; errEl.style.display = 'block'; return; }
  okEl.textContent = 'If there is an account with this email, a reset link is on its way. Check your inbox (and spam).';
  okEl.style.display = 'block';
});

function enterPasswordRecovery(){
  isPasswordRecovery = true;
  document.body.classList.add('is-gated');
  switchTab('account');
  document.getElementById('authPanel').style.display = 'block';
  document.getElementById('accountPanel').style.display = 'none';
  showAuthView('newPassword');
}
document.getElementById('newPasswordForm').addEventListener('submit', async function(e){
  e.preventDefault();
  const errEl = document.getElementById('newPasswordError');
  errEl.style.display = 'none';
  const password = document.getElementById('newPassword').value;
  if(password.length < 6){ errEl.textContent = 'Password must be at least 6 characters.'; errEl.style.display = 'block'; return; }
  const { data, error } = await supabaseClient.auth.updateUser({ password: password });
  if(error){ errEl.textContent = error.message; errEl.style.display = 'block'; return; }
  isPasswordRecovery = false;
  try{ history.replaceState(null, '', window.location.pathname); } catch(err){}
  currentUser = data.user;
  showAccountPanel(currentUser);
  unlockAppFromGate();
  // Reset links from email always open in the phone's browser, never in the
  // installed home-screen app, so point people back to the app.
  if(!isStandaloneApp()){
    alert('Your password has been changed! Have you added AGS to your home screen? Open the app from there and log in with your new password.');
  }
  checkNotificationGate();
});
if(supabaseClient){
  supabaseClient.auth.onAuthStateChange(function(event, session){
    if(event === 'PASSWORD_RECOVERY') enterPasswordRecovery();
    if(event === 'SIGNED_IN' && session && session.user) fillNamesFromProvider(session.user);
  });
}

/* ---------- Sign in with Apple / Google ----------
   The buttons only appear once the provider is switched on in Supabase
   (Authentication → Providers), so nothing breaks before that. Not shown in
   the App Store build yet: native OAuth needs its own redirect setup. */
(function(){
  const wrap = document.getElementById('socialAuth');
  if(!wrap || !supabaseClient || IS_NATIVE) return;
  const buttons = { apple: document.getElementById('appleLoginBtn'), google: document.getElementById('googleLoginBtn') };
  fetch(SUPABASE_URL + '/auth/v1/settings', { headers: { apikey: SUPABASE_ANON_KEY } })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(cfg){
      const ext = (cfg && cfg.external) || {};
      let any = false;
      Object.keys(buttons).forEach(function(p){ if(ext[p] && buttons[p]){ buttons[p].hidden = false; any = true; } });
      wrap.hidden = !any;
      if(ext.google) setupGoogleOneTap(buttons.google);
    }).catch(function(){});
  Object.keys(buttons).forEach(function(provider){
    const btn = buttons[provider];
    if(!btn) return;
    btn.addEventListener('click', async function(){
      btn.disabled = true;
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: provider,
        options: { redirectTo: window.location.origin + '/app/' }
      });
      if(error){
        btn.disabled = false;
        showAuthError('socialError', 'Could not sign in with ' + (provider === 'apple' ? 'Apple' : 'Google') + '. Please try again or use email.');
      }
    });
  });
})();

/* Google's own sign-in button (Google Identity Services). Google then shows
   "Sign in to amsterdamguestlistservice.website" instead of the Supabase
   address that the redirect flow shows. If Google's script can't load, the
   plain redirect button above stays as a fallback. */
const GOOGLE_CLIENT_ID = '278817499077-ovuca4sqrsoe4nrt0dl1nhckjmm4352d.apps.googleusercontent.com';
function setupGoogleOneTap(fallbackBtn){
  const slot = document.getElementById('googleGisSlot');
  if(!slot || !window.crypto || !crypto.subtle) return;
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.defer = true;
  s.onload = async function(){
    try{
      const raw = Array.from(crypto.getRandomValues(new Uint8Array(16)), function(b){ return b.toString(16).padStart(2, '0'); }).join('');
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
      const hashed = Array.from(new Uint8Array(digest), function(b){ return b.toString(16).padStart(2, '0'); }).join('');
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        nonce: hashed,
        itp_support: true,
        use_fedcm_for_button: true,
        callback: async function(resp){
          clearAuthError('socialError');
          const { data, error } = await supabaseClient.auth.signInWithIdToken({ provider: 'google', token: resp.credential, nonce: raw });
          if(error || !data || !data.user){
            showAuthError('socialError', 'Could not sign in with Google. Please try again or use email.');
            return;
          }
          currentUser = data.user;
          await fillNamesFromProvider(currentUser);
          if(typeof AppSound !== 'undefined') AppSound.play('success');
          showAccountPanel(currentUser);
          unlockAppFromGate();
          checkNotificationGate();
        }
      });
      slot.hidden = false;
      google.accounts.id.renderButton(slot, {
        type: 'standard', theme: 'outline', size: 'large', text: 'continue_with',
        shape: 'rectangular', logo_alignment: 'center',
        width: Math.min(400, Math.max(240, (slot.parentElement.clientWidth || 320)))
      });
      if(fallbackBtn) fallbackBtn.hidden = true;
    } catch(e){ slot.hidden = true; if(fallbackBtn) fallbackBtn.hidden = false; }
  };
  s.onerror = function(){ slot.hidden = true; };
  document.head.appendChild(s);
}

// Apple/Google accounts carry the name differently; store it the way the
// rest of the app (and the admin emails) expect: first_name / last_name.
async function fillNamesFromProvider(user){
  const m = user.user_metadata || {};
  if(m.first_name) return;
  const full = String(m.full_name || m.name || '').trim();
  const first = m.given_name || full.split(' ')[0] || '';
  const last = m.family_name || full.split(' ').slice(1).join(' ') || '';
  if(!first) return;
  try{
    const { data } = await supabaseClient.auth.updateUser({ data: { first_name: first, last_name: last } });
    if(data && data.user && typeof currentUser !== 'undefined' && currentUser && currentUser.id === data.user.id){
      currentUser = data.user;
      if(typeof showAccountPanel === 'function' && document.body.classList.contains('is-gated') === false) showAccountPanel(currentUser);
    }
  } catch(e){}
}

function showAuthError(id, message){
  const el = document.getElementById(id);
  el.textContent = message;
  el.style.display = 'block';
}
function clearAuthError(id){
  document.getElementById(id).style.display = 'none';
}

function lockAppBehindGate(){
  document.body.classList.add('is-gated');
  showAuthPanel();
  switchTab('account');
}
function unlockAppFromGate(){
  document.body.classList.remove('is-gated');
  setTimeout(maybeShowHeroIntro, 400);
}

/* ---- Full-screen featured video, once per person per featured party ----
   Shown when the app opens (after login and the welcome tour). ✕ closes it;
   a tap on the video or the button goes straight to the guestlist. */
function maybeShowHeroIntro(){
  if(document.getElementById('heroIntro') || document.body.classList.contains('is-gated')) return;
  const ev = featuredHeroEvent();
  if(!ev) return;
  const key = 'ags_intro_seen_' + ev.id;
  try{ if(localStorage.getItem(key)) return; } catch(e){}
  const tour = document.getElementById('welcomeOverlay');
  if((tour && tour.classList.contains('is-open')) || document.getElementById('onboarding') || document.getElementById('approvedMoment')){ setTimeout(maybeShowHeroIntro, 800); return; }
  try{ localStorage.setItem(key, '1'); } catch(e){}

  const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
  const inline = document.querySelector('#featuredHero video');
  if(inline){ try{ inline.pause(); inline.muted = true; } catch(e){} }
  const inlineSnd = document.querySelector('#featuredHero .featured-hero__sound');
  if(inlineSnd) inlineSnd.textContent = '🔇';

  const el = document.createElement('div');
  el.id = 'heroIntro';
  el.className = 'hero-intro';
  el.innerHTML =
    '<video class="hero-intro__video" src="' + ev.clip.mp4 + '"' + (ev.clip.poster ? ' poster="' + ev.clip.poster + '"' : '') + ' autoplay loop playsinline preload="auto"></video>' +
    '<button type="button" class="hero-intro__close" aria-label="Close">✕</button>' +
    '<button type="button" class="hero-intro__sound" aria-label="Sound off">🔊</button>' +
    '<div class="hero-intro__bottom"><span class="hero-intro__tag">Featured · ' + formatDate(ev.date) + ' · ' + eventVenueName(ev) + '</span>' +
    '<button type="button" class="hero-intro__cta">' + (open ? 'Request access →' : 'View party →') + '</button></div>';
  document.body.appendChild(el);
  document.body.classList.add('hero-intro-open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function(){ el.classList.add('is-open'); });

  const v = el.querySelector('video'), snd = el.querySelector('.hero-intro__sound');
  const setIcon = function(){ snd.textContent = v.muted ? '🔇' : '🔊'; snd.setAttribute('aria-label', v.muted ? 'Sound on' : 'Sound off'); };
  v.muted = false;
  v.play().then(setIcon).catch(function(){ v.muted = true; setIcon(); v.play().catch(function(){}); });

  const close = function(){
    try{ v.pause(); } catch(e){}
    el.classList.remove('is-open');
    document.body.classList.remove('hero-intro-open');
    document.body.style.overflow = '';
    setTimeout(function(){ el.remove(); }, 300);
    if(inline && inline.getBoundingClientRect().height){ inline.play().catch(function(){}); }
  };
  el.querySelector('.hero-intro__close').addEventListener('click', function(e){ e.stopPropagation(); close(); });
  snd.addEventListener('click', function(e){ e.stopPropagation(); v.muted = !v.muted; setIcon(); if(v.paused) v.play().catch(function(){}); });
  const go = function(e){
    if(e) e.stopPropagation();
    close();
    if(typeof AppSound !== 'undefined') AppSound.play('open');
    if(open) startGuestlistFor(ev, false); else openEventSheet(ev);
  };
  el.querySelector('.hero-intro__cta').addEventListener('click', go);
  v.addEventListener('click', go);
}

// Shown right after signing in/up, and again on every fresh visit,
// until the guest actually grants notification permission — otherwise
// they'd never find out their request was approved or that they
// earned points. Skipped entirely if the browser can't do push at all.
function isIosDevice(){
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
function isStandaloneApp(){
  return IS_NATIVE || window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
function setNotifyGateMode(mode){
  // mode: 'ask' (default) | 'install' (iPhone, not added to home screen yet)
  //     | 'blocked' (permission denied in the browser/phone settings)
  const title = document.getElementById('notifyGateTitle');
  const sub = document.getElementById('notifyGateSub');
  const benefits = document.getElementById('notifyGateBenefits');
  const enableBtn = document.getElementById('notifyGateEnableBtn');
  const laterBtn = document.getElementById('notifyGateLaterBtn');
  if(mode === 'install'){
    title.textContent = 'Get the App for Notifications';
    sub.innerHTML = 'On iPhone, notifications work in the AGS app. Download it free from the App Store, log in with this account and turn on notifications.<br><br>' +
      '<a class="btn btn--solid" href="' + APP_STORE_URL + '" rel="noopener" style="display:inline-flex;text-decoration:none">Download on the App Store</a>';
    benefits.style.display = 'none';
    enableBtn.style.display = 'none';
    laterBtn.textContent = 'Got it';
  } else if(mode === 'blocked'){
    title.textContent = 'Notifications Are Blocked';
    sub.innerHTML = "You'd miss your approval message. Turn them back on in your phone settings: " +
      '<strong>Settings → Notifications → Amsterdam Guestlist Service</strong> (or the site settings of your browser).';
    benefits.style.display = 'none';
    enableBtn.style.display = 'none';
    laterBtn.textContent = 'Got it';
  } else {
    title.textContent = "Don't Miss Your Spot";
    sub.textContent = "Turn on notifications and we'll tell you the moment you're approved. Without them you won't know until you check the app.";
    benefits.style.display = '';
    enableBtn.style.display = '';
    laterBtn.textContent = 'Maybe later';
  }
}
// "Maybe later" is remembered for 3 days, so the question doesn't come back
// every time the app opens.
const NOTIFY_SNOOZE_MS = 3 * 24 * 60 * 60 * 1000;
function notifyGateSnoozed(){
  try{ return Date.now() - Number(localStorage.getItem('ags_notify_later') || 0) < NOTIFY_SNOOZE_MS; } catch(e){ return false; }
}
async function checkNotificationGate(){
  const overlay = document.getElementById('notifyGateOverlay');
  await nativePermReady;
  if(notifyGateSnoozed()){ switchTab('events'); return; }
  // iPhone Safari can't do push until the app is installed to the home
  // screen — explain that instead of silently skipping the prompt.
  if(!pushSupported && isIosDevice() && !isStandaloneApp()){
    setNotifyGateMode('install');
  } else if(!pushSupported || pushPermission() === 'granted'){
    switchTab('events');
    return;
  } else if(pushPermission() === 'denied'){
    setNotifyGateMode('blocked');
  } else {
    setNotifyGateMode('ask');
  }
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeNotifyGate(){
  document.getElementById('notifyGateOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
  switchTab('events');
}
document.getElementById('notifyGateEnableBtn').addEventListener('click', async function(){
  await subscribeToPush();
  closeNotifyGate();
});
document.getElementById('notifyGateLaterBtn').addEventListener('click', function(){
  try{ localStorage.setItem('ags_notify_later', String(Date.now())); } catch(e){}
  closeNotifyGate();
});

document.getElementById('loginForm').addEventListener('submit', async function(e){
  e.preventDefault();
  clearAuthError('loginError');
  if(!supabaseClient){
    showAuthError('loginError', 'Accounts are not set up yet. Please try again later.');
    return;
  }
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
  if(error){
    showAuthError('loginError', error.message);
    return;
  }
  currentUser = data.user;
  showAccountPanel(currentUser);
  unlockAppFromGate();
  checkNotificationGate();
});

document.getElementById('signupForm').addEventListener('submit', async function(e){
  e.preventDefault();
  clearAuthError('signupError');
  if(!supabaseClient){
    showAuthError('signupError', 'Accounts are not set up yet. Please try again later.');
    return;
  }
  const firstName = document.getElementById('signupFirstName').value.trim();
  const lastName = document.getElementById('signupLastName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  if(!firstName || !lastName){ showAuthError('signupError', 'Please enter your first and last name.'); return; }
  if(password.length < 6){ showAuthError('signupError', 'Password must be at least 6 characters.'); return; }

  let referralCodeUsed = null;
  try{ referralCodeUsed = localStorage.getItem('ags_referral_code'); } catch(e){}

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: { data: { first_name: firstName, last_name: lastName, referral_code_used: referralCodeUsed || null } }
  });
  if(error){
    showAuthError('signupError', error.message);
    return;
  }
  if(data.user && !data.session){
    // Email confirmation required before a session exists.
    showAuthError('signupError', 'Account created — check your email to confirm before logging in.');
    return;
  }
  currentUser = data.user;
  showAccountPanel(currentUser);
  unlockAppFromGate();
  checkNotificationGate();
});

document.getElementById('signOutBtn').addEventListener('click', async function(){
  if(supabaseClient){ await supabaseClient.auth.signOut(); }
  currentUser = null;
  IS_MEMBER = false;
  MY_PREFS = null; MY_FOLLOWS = new Set(); MY_PROFILE = null; INBOX = []; try{ updateInboxBadge(); } catch(e){}
  const pc = document.getElementById('profileCard'); if(pc){ pc.hidden = true; pc.innerHTML = ''; }
  const bb = document.getElementById('badgeBox'); if(bb) bb.hidden = true;
  for(let i = EVENTS.length - 1; i >= 0; i--){ if(EVENTS[i].secret) EVENTS.splice(i, 1); }
  try{ renderEventList(); } catch(e){}
  if(typeof loadNextNight === 'function') loadNextNight();
  if(typeof salonStop === 'function') salonStop();
  lockAppBehindGate();
});

/* ---------- Delete account (App Store 5.1.1(v), GDPR) ---------- */
(function(){
  const btn = document.getElementById('deleteAccountBtn');
  if(!btn) return;
  btn.addEventListener('click', function(){
    if(!currentUser) return;
    const body = document.getElementById('quickBody');
    body.innerHTML =
      '<div class="quick-sheet__eyebrow">Account</div>' +
      '<div class="quick-sheet__title" id="quickTitle">Delete your account?</div>' +
      '<p class="quick-sheet__note" style="margin-top:10px;">This permanently deletes your account, points, waitlist spots and Backroom chats. Upcoming guestlist requests are cancelled and the spots are released. This can’t be undone.</p>' +
      '<label for="delConfirm" class="quick-sheet__note" style="display:block;margin:14px 0 0;">Type <strong>DELETE</strong> to confirm</label>' +
      '<input id="delConfirm" class="del-input" autocomplete="off" autocapitalize="characters" spellcheck="false">' +
      '<div class="err" id="delErr" style="margin-bottom:12px;"></div>' +
      '<div class="quick-sheet__btns">' +
        '<button type="button" class="btn btn--solid btn--danger" id="delGo" disabled>Delete my account</button>' +
        '<button type="button" class="btn" id="delCancel">Keep my account</button>' +
      '</div>';
    openQuickSheet();
    const input = document.getElementById('delConfirm'), go = document.getElementById('delGo');
    input.addEventListener('input', function(){ go.disabled = input.value.trim().toUpperCase() !== 'DELETE'; });
    document.getElementById('delCancel').addEventListener('click', closeQuickSheet);
    go.addEventListener('click', async function(){
      go.disabled = true; go.textContent = 'Deleting…';
      const err = document.getElementById('delErr');
      try {
        const { data } = await supabaseClient.auth.getSession();
        const token = data && data.session && data.session.access_token;
        const r = await fetch(API_BASE + '/api/delete-account', { method:'POST', headers:{ 'Authorization': 'Bearer ' + token } });
        const j = await r.json().catch(function(){ return {}; });
        if(!r.ok || !j.ok) throw new Error(j.error || 'failed');
        try { await supabaseClient.auth.signOut(); } catch(e){}
        try { localStorage.removeItem('ags_points_seen_' + currentUser.id); } catch(e){}
        currentUser = null;
        if(typeof salonStop === 'function') salonStop();
        body.innerHTML =
          '<div class="quick-sheet__eyebrow">Account deleted</div>' +
          '<div class="quick-sheet__title" id="quickTitle">Your account is gone</div>' +
          '<p class="quick-sheet__note" style="margin-top:10px;">All your personal data has been removed. Thanks for partying with us — you’re always welcome back.</p>' +
          '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="delDone">Close</button></div>';
        document.getElementById('delDone').addEventListener('click', function(){ closeQuickSheet(); lockAppBehindGate(); });
      } catch(e){
        go.disabled = false; go.textContent = 'Delete my account';
        err.textContent = 'Your account could not be deleted right now. Please try again, or contact us via the Support page.';
        err.classList.add('is-visible');
      }
    });
  });
})();

let myRequestsCache = {};
async function loadMyRequests(silent){
  const list = document.getElementById('myRequestsList');
  if(!supabaseClient || !currentUser){ list.innerHTML = ''; return; }

  if(!silent) list.innerHTML = '<div class="skel skel--card"></div><div class="skel skel--card"></div>';
  try {
    const { data, error } = await supabaseClient
      .from('guestlist_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if(error){
      list.innerHTML = '<p class="my-requests__empty">Could not load your requests.</p>';
      return;
    }
    if(!data || data.length === 0){
      list.innerHTML = emptyStateHtml('🔑', 'No requests yet', 'Pick a party and request access in one tap.', 'See parties', 'events');
      bindEmptyState(list);
      return;
    }
    list.innerHTML = data.map(function(r){
      const statusRaw = (r.status || 'Pending').trim();
      const statusLower = statusRaw.toLowerCase();
      let statusClass = '';
      let note = '';
      if(statusLower === 'approved'){
        statusClass = ' is-approved';
        note = "You're on the list — see you there! Approved requests can't be changed here; message us if something is wrong.";
        const missing = Number(r.missing_guests) || 0;
        if(missing > 0){
          note = (missing === 1 ? '1 person' : missing + ' people') + ' from your group did not show up. -' + (missing * 2) + ' points.';
        }
      } else if(statusLower === 'declined'){
        statusClass = ' is-declined';
        note = 'This request could not be approved this time.';
      } else if(statusLower === 'no-show'){
        statusClass = ' is-no-show';
        const key = String(r.event_name || '').trim().toLowerCase();
        const sameParty = data.filter(function(x){
          return String(x.status || '').trim().toLowerCase() === 'no-show' &&
            String(x.event_name || '').trim().toLowerCase() === key;
        });
        const lastDate = sameParty.map(function(x){ return x.event_date; }).sort().pop();
        const until = lastDate ? new Date(lastDate + 'T00:00:00') : null;
        if(until) until.setDate(until.getDate() + 14);
        if(sameParty.length >= 2 && until && until > new Date()){
          note = 'You were marked as a no-show for this event. Because of 2 no-shows you can\'t request the guestlist for ' +
            r.event_name + ' until ' + formatDate(until.getFullYear() + '-' + String(until.getMonth() + 1).padStart(2, '0') + '-' + String(until.getDate()).padStart(2, '0')) + '. You can still buy tickets.';
        } else if(sameParty.length === 1){
          note = 'You were marked as a no-show for this event. Warning: one more no-show for ' + r.event_name +
            ' and you can\'t request its guestlist for 2 weeks.';
        } else {
          note = 'You were marked as a no-show for this event.';
        }
      } else {
        note = "Every request is personally reviewed. We'll let you know as soon as you're in.";
      }
      const openUntil = new Date(r.event_date + 'T23:00:00').getTime();
      const stillOpen = Date.now() < openUntil;
      const canEdit = (statusLower === 'pending' || statusLower === 'approved') && stillOpen;
      if(statusLower === 'approved' && stillOpen) note = "You're on the list — see you there! Friend can't make it? Swap names until the party starts.";
      const canInvite = canEdit;
      return (
        '<div class="request-card">' +
          '<div class="request-card__event">' + r.event_name + '</div>' +
          '<div class="request-card__meta">' + r.event_venue + ' · ' + formatDate(r.event_date) + ' · ' + (r.total_guests > 1 ? r.total_guests + ' people' : 'just you') + '</div>' +
          '<span class="request-card__status' + statusClass + '">' + statusLabel(statusRaw) + '</span>' +
          requestTimeline(r) +
          '<div class="request-card__note">' + note + '</div>' +
          ((canEdit || canInvite) ? '<div class="request-card__actions">' +
            (canEdit ? '<button type="button" class="request-card__edit" data-edit-id="' + r.id + '">' + (statusLower === 'approved' ? 'Change names' : 'Edit request') + '</button>' : '') +
            (canInvite ? '<button type="button" class="request-card__edit is-invite" data-invite-id="' + r.id + '">🔗 Invite friends</button>' : '') +
          '</div>' : '') +
        '</div>'
      );
    }).join('');
    myRequestsCache = {};
    data.forEach(function(r){ myRequestsCache[r.id] = r; });
    list.querySelectorAll('[data-edit-id]').forEach(function(btn){
      btn.addEventListener('click', function(){ openEditRequest(btn.getAttribute('data-edit-id')); });
    });
    list.querySelectorAll('[data-invite-id]').forEach(function(btn){
      btn.addEventListener('click', function(){ shareGroupInvite(myRequestsCache[btn.getAttribute('data-invite-id')], btn); });
    });
    // Keep the live status fresh while there's something still in review.
    clearTimeout(window.__agsReqPoll);
    if(data.some(function(r){ return String(r.status || 'pending').trim().toLowerCase() === 'pending'; })){
      window.__agsReqPoll = setTimeout(function(){
        const acc = document.getElementById('tab-account');
        if(acc && acc.classList.contains('is-active') && document.visibilityState === 'visible') loadMyRequests(true);
      }, 30000);
    }
  } catch(err){
    console.warn('Could not load requests.', err);
    list.innerHTML = '<p class="my-requests__empty">Could not load your requests.</p>';
  }
}


/* ---- Live status of a request (2): Received → In review → On the list ---- */
function requestTimeline(r){
  const st = String(r.status || 'pending').trim().toLowerCase();
  const t = function(iso){ if(!iso) return ''; const d = new Date(iso); return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' }) + (new Date().toDateString() === d.toDateString() ? '' : ' · ' + d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })); };
  let steps;
  if(st === 'declined') steps = [['Received', t(r.created_at), 'done'], ['Reviewed', t(r.status_changed_at), 'done'], ['Not this time', '', 'bad']];
  else if(st === 'cancelled') steps = [['Received', t(r.created_at), 'done'], ['Cancelled', t(r.status_changed_at), 'bad']];
  else if(st === 'pending') steps = [['Received', t(r.created_at), 'done'], ['In review', 'usually within a few hours', 'now'], ['On the list', '', '']];
  else steps = [['Received', t(r.created_at), 'done'], ['Reviewed', '', 'done'], [st === 'no-show' ? 'No-show' : 'On the list ✅', t(r.approved_at || r.status_changed_at), st === 'no-show' ? 'bad' : 'done']];
  return '<ol class="req-steps">' + steps.map(function(s){
    return '<li class="' + s[2] + '"><i></i><b>' + s[0] + '</b>' + (s[1] ? '<span>' + s[1] + '</span>' : '') + '</li>';
  }).join('') + '</ol>';
}

/* ---- Group invite link (4): friends add their own details to your request ---- */
async function shareGroupInvite(r, btn){
  if(!r || !supabaseClient) return;
  const label = btn ? btn.textContent : '';
  if(btn){ btn.disabled = true; btn.textContent = 'Creating link…'; }
  try{
    const { data: token, error } = await supabaseClient.rpc('create_group_invite', { p_request_id: r.id });
    if(error || !token) throw error || new Error('no token');
    const link = SITE_URL + '/app/?join=' + token + (MY_REF_CODE ? '&ref=' + MY_REF_CODE : '');
    const text = 'Join my group for ' + r.event_name + ' on ' + formatDate(r.event_date) + ' 🔑 Add your name in 10 seconds and you\u2019re on the guestlist with us:';
    if(navigator.share){
      try{ await navigator.share({ title: r.event_name + ' · guestlist', text: text, url: link }); } catch(e){}
    } else {
      try{ await navigator.clipboard.writeText(text + ' ' + link); if(btn) btn.textContent = 'Link copied ✓'; setTimeout(function(){ if(btn) btn.textContent = label; }, 2200); if(btn) btn.disabled = false; return; }
      catch(e){ window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + link), '_blank', 'noopener'); }
    }
  } catch(e){
    if(btn){ btn.textContent = 'Could not create link'; setTimeout(function(){ btn.textContent = label; }, 2200); }
  }
  if(btn){ btn.disabled = false; if(btn.textContent === 'Creating link…') btn.textContent = label; }
}
// Opening /app/?join=<token>: remember it, and after login show the join sheet.
(function(){
  try{
    const tok = new URLSearchParams(window.location.search).get('join');
    if(tok && /^[a-f0-9]{8,40}$/.test(tok)) localStorage.setItem('ags_join_token', tok);
  } catch(e){}
})();
async function maybeShowGroupJoin(){
  let tok = null; try{ tok = localStorage.getItem('ags_join_token'); } catch(e){}
  if(!tok || !supabaseClient || !currentUser) return false;
  const { data: info } = await supabaseClient.rpc('group_invite_info', { p_token: tok });
  const body = document.getElementById('quickBody');
  if(!body) return false;
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const done = function(){ try{ localStorage.removeItem('ags_join_token'); } catch(e){} };
  if(!info || info.is_host){ done(); return false; }
  if(!info.open){
    body.innerHTML = '<div class="quick-sheet__eyebrow">Group invite</div><div class="quick-sheet__title" id="quickTitle">This group is closed</div>' +
      '<p class="quick-sheet__note" style="margin-top:8px;">The guestlist for ' + esc(info.event_name) + ' is closed for changes. Check the app for other parties.</p>' +
      '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="gjClose">OK</button></div>';
    openQuickSheet(); document.getElementById('gjClose').addEventListener('click', closeQuickSheet); done(); return true;
  }
  const meta = currentUser.user_metadata || {};
  const ev = EVENTS.find(function(e){ return e.name === info.event_name && e.date === info.event_date; });
  const minA = eventMinAge(ev);
  body.innerHTML =
    '<div class="quick-sheet__eyebrow">Group invite</div>' +
    '<div class="quick-sheet__title" id="quickTitle">Join ' + esc(info.host || 'your friend') + '\u2019s group</div>' +
    '<p class="quick-sheet__note" style="margin-top:6px;">' + esc(info.event_name) + ' · ' + formatDate(info.event_date) + ' · ' + esc(String(info.event_venue || '').split(' · ')[0]) + '. Add your details and you\u2019re on the list with them.</p>' +
    '<div class="gj-form">' +
      '<input type="text" id="gjFirst" placeholder="First name" value="' + esc(meta.first_name || (MY_PROFILE && MY_PROFILE.display_name ? String(MY_PROFILE.display_name).split(' ')[0] : '')) + '">' +
      '<input type="text" id="gjLast" placeholder="Last name" value="' + esc(meta.last_name || '') + '">' +
      '<input type="number" id="gjAge" placeholder="Age (' + minA + '+)" inputmode="numeric">' +
      '<input type="text" id="gjIg" placeholder="@instagram (optional)" value="' + esc(MY_PROFILE && MY_PROFILE.instagram ? MY_PROFILE.instagram : '') + '">' +
      '<select id="gjGender"><option value="">Man / woman (optional)</option><option value="man">Man</option><option value="woman">Woman</option></select>' +
    '</div><div class="err" id="gjErr"></div>' +
    '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="gjGo">Join the group</button><button type="button" class="btn" id="gjNo">Not now</button></div>';
  openQuickSheet();
  document.getElementById('gjNo').addEventListener('click', function(){ done(); closeQuickSheet(); });
  document.getElementById('gjGo').addEventListener('click', async function(){
    const go = this, err = document.getElementById('gjErr');
    const first = document.getElementById('gjFirst').value.trim(), last = document.getElementById('gjLast').value.trim(), age = document.getElementById('gjAge').value.trim();
    if(!first || !last){ err.textContent = 'Please fill in your first and last name.'; return; }
    if(!age || parseInt(age, 10) < minA){ err.textContent = 'You must be ' + minA + ' or older for this party.'; return; }
    go.disabled = true; go.textContent = 'Joining…'; err.textContent = '';
    const { data, error } = await supabaseClient.rpc('join_group_invite', { p_token: tok, p_first: first, p_last: last, p_age: age,
      p_instagram: document.getElementById('gjIg').value.trim().replace(/^@+/, ''), p_gender: document.getElementById('gjGender').value });
    if(error || !data || !data.ok){
      go.disabled = false; go.textContent = 'Join the group';
      err.textContent = (error && noShowBlockMessage(error)) || (error && /AGS_BLOCKED\|([^\n]+)/.test(error.message || '') ? error.message.split('AGS_BLOCKED|')[1] : '') ||
        (data && data.reason === 'full' ? 'This group is full.' : data && data.reason === 'closed' ? 'This group is closed for changes.' : 'Could not join right now. Please try again.');
      return;
    }
    done();
    body.innerHTML = '<div class="quick-sheet__eyebrow">You\u2019re in</div><div class="quick-sheet__title" id="quickTitle">You joined ' + esc(info.host || 'the') + '\u2019s group ✅</div>' +
      '<p class="quick-sheet__note" style="margin-top:8px;">You\u2019re on the request for ' + esc(info.event_name) + ' · ' + formatDate(info.event_date) + '. ' +
      (String(info.status).toLowerCase() === 'approved' ? 'The group is already on the list. Bring your ID!' : 'You\u2019ll be on the list as soon as the group is approved.') + '</p>' +
      '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="gjDone">Nice</button></div>';
    if(typeof AppSound !== 'undefined') try{ AppSound.play('success'); } catch(e){}
    document.getElementById('gjDone').addEventListener('click', closeQuickSheet);
  });
  return true;
}

/* ================================================================
   EDIT A PENDING REQUEST — only while its status is still Pending.
   (The database enforces this too: once approved, updates are refused.)
   ================================================================ */
let editingRequest = null;
let editGuests = [];

// Some nights have a different minimum age for men and women
// (minAgeMen / minAgeWomen). Without a gender, the lowest one applies.
function eventMinAge(ev, gender){
  const base = (ev && ev.minAge) || 18;
  if(!ev || (!ev.minAgeMen && !ev.minAgeWomen)) return base;
  const men = ev.minAgeMen || base, women = ev.minAgeWomen || base;
  if(gender === 'man') return men;
  if(gender === 'woman') return women;
  return Math.min(men, women);
}
function eventAgeRule(ev){
  if(ev && (ev.minAgeMen || ev.minAgeWomen) && eventMinAge(ev, 'man') !== eventMinAge(ev, 'woman')){
    return 'men ' + eventMinAge(ev, 'man') + '+, women ' + eventMinAge(ev, 'woman') + '+';
  }
  return eventMinAge(ev) + '+';
}
function editEventFor(r){
  for(let i = 0; i < EVENTS.length; i++){
    if(EVENTS[i].name === r.event_name && EVENTS[i].date === r.event_date) return EVENTS[i];
  }
  return null;
}
function editFlags(){
  const ev = editingRequest ? editEventFor(editingRequest) : null;
  return { email: !!(ev && ev.guestEmailRequired), gender: !!(ev && ev.guestGenderRequired) };
}
function openEditRequest(id){
  const r = myRequestsCache[id];
  if(!r) return;
  editingRequest = r;
  document.getElementById('editReqEvent').textContent = r.event_name;
  document.getElementById('erFirst').value = r.first_name || '';
  document.getElementById('erLast').value = r.last_name || '';
  document.getElementById('erAge').value = r.age || '';
  document.getElementById('erInstagram').value = (r.instagram && r.instagram !== 'None') ? r.instagram : '';
  document.getElementById('erPhone').value = r.phone || '';
  document.getElementById('erEmail').value = r.email || '';
  const flags = editFlags();
  document.getElementById('erGenderWrap').style.display = (flags.gender || r.gender) ? '' : 'none';
  document.getElementById('erGender').value = r.gender || '';
  editGuests = (Array.isArray(r.additional_guests) ? r.additional_guests : []).map(function(g){
    return { firstName: g.firstName || '', lastName: g.lastName || '', age: g.age || '', email: g.email || '', gender: g.gender || '', _orig: g };
  });
  // Approved: only the friends can change (swap names); your own details are locked.
  const approvedMode = String(r.status || '').trim().toLowerCase() === 'approved';
  editingRequest._approvedMode = approvedMode;
  ['erFirst','erLast','erAge','erInstagram','erPhone','erEmail','erGender'].forEach(function(id){ const el = document.getElementById(id); if(el) el.disabled = approvedMode; });
  const t = document.getElementById('editReqEvent');
  if(t && approvedMode) t.textContent = r.event_name + ' · swap or add friends';
  // Adding or renaming a friend sends the list back to AGS for a quick re-check.
  let rn = document.getElementById('erReviewNote');
  if(!rn && t){ rn = document.createElement('p'); rn.id = 'erReviewNote'; rn.className = 'quick-sheet__note'; rn.style.margin = '6px 0 0'; t.insertAdjacentElement('afterend', rn); }
  if(rn){ rn.textContent = 'New or changed names are checked by AGS again. You\u2019ll get a message once your updated list is approved.'; rn.hidden = !approvedMode; }
  renderEditGuests();
  document.getElementById('erError').style.display = 'none';
  document.getElementById('editReqOverlay').classList.add('is-open');
}
function closeEditRequest(){
  ['erFirst','erLast','erAge','erInstagram','erPhone','erEmail','erGender'].forEach(function(id){ const el = document.getElementById(id); if(el) el.disabled = false; });
  document.getElementById('editReqOverlay').classList.remove('is-open');
  editingRequest = null;
}
function syncEditGuests(){
  document.querySelectorAll('#erGuests .edit-guest').forEach(function(box, i){
    if(!editGuests[i]) return;
    box.querySelectorAll('[data-f]').forEach(function(inp){ editGuests[i][inp.getAttribute('data-f')] = inp.value; });
  });
}
function renderEditGuests(){
  const wrap = document.getElementById('erGuests');
  wrap.innerHTML = '';
  const flags = editFlags();
  editGuests.forEach(function(g, i){
    const box = document.createElement('div');
    box.className = 'edit-guest';
    const head = document.createElement('div');
    head.className = 'edit-guest__head';
    const title = document.createElement('span'); title.textContent = 'Guest ' + (i + 1);
    const rm = document.createElement('button'); rm.type = 'button'; rm.className = 'edit-guest__remove'; rm.textContent = 'Remove';
    rm.addEventListener('click', function(){ syncEditGuests(); editGuests.splice(i, 1); renderEditGuests(); });
    head.appendChild(title); head.appendChild(rm); box.appendChild(head);
    function field(label, key, type, extra){
      const f = document.createElement('div'); f.className = 'field';
      const l = document.createElement('label'); l.textContent = label; f.appendChild(l);
      let inp;
      if(type === 'gender'){
        inp = document.createElement('select');
        [['', 'Select…'], ['man', 'Man'], ['woman', 'Woman']].forEach(function(o){
          const op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; inp.appendChild(op);
        });
      } else {
        inp = document.createElement('input'); inp.type = type;
        if(extra) inp.min = extra;
      }
      inp.setAttribute('data-f', key);
      inp.value = g[key] || '';
      f.appendChild(inp);
      return f;
    }
    const row = document.createElement('div'); row.className = 'field-row';
    row.appendChild(field('First Name', 'firstName', 'text'));
    row.appendChild(field('Last Name', 'lastName', 'text'));
    box.appendChild(row);
    box.appendChild(field('Age', 'age', 'number', '18'));
    if(flags.gender || g.gender) box.appendChild(field('Man / Woman', 'gender', 'gender'));
    if(flags.email || g.email) box.appendChild(field('Email', 'email', 'email'));
    wrap.appendChild(box);
  });
  document.getElementById('erAddGuest').style.display = editGuests.length >= 10 ? 'none' : 'block';
}
function editError(msg){
  const el = document.getElementById('erError');
  el.textContent = msg; el.style.display = 'block';
}
async function saveEditRequest(){
  if(!editingRequest || !supabaseClient || !currentUser) return;
  syncEditGuests();
  const flags = editFlags();
  const first = document.getElementById('erFirst').value.trim();
  const last = document.getElementById('erLast').value.trim();
  const age = document.getElementById('erAge').value.trim();
  const phone = document.getElementById('erPhone').value.trim();
  const email = document.getElementById('erEmail').value.trim();
  const gender = document.getElementById('erGender').value;
  const insta = document.getElementById('erInstagram').value.trim();
  if(!first || !last){ editError('Please fill in your first and last name.'); return; }
  const editMin = eventMinAge(editEventFor(editingRequest), gender || editingRequest.gender);
  if(!age || parseInt(age, 10) < editMin){ editError('You must be ' + editMin + ' or older for this event.'); return; }
  if(!phone){ editError('Please fill in your phone number.'); return; }
  if(!email || email.indexOf('@') < 1){ editError('Please enter a valid email address.'); return; }
  if((flags.gender || editingRequest.gender) && document.getElementById('erGenderWrap').style.display !== 'none' && !gender){ editError('Please select man or woman.'); return; }
  const guests = [];
  for(let i = 0; i < editGuests.length; i++){
    const g = editGuests[i];
    const gf = (g.firstName || '').trim(), gl = (g.lastName || '').trim(), ga = String(g.age || '').trim();
    const gMinE = eventMinAge(editEventFor(editingRequest), g.gender);
    if(!gf || !gl || !ga || parseInt(ga, 10) < gMinE){ editError('Guest ' + (i + 1) + ': first name, last name and age (' + gMinE + '+) are required.'); return; }
    const out = { firstName: gf, lastName: gl, age: ga };
    if(flags.email || g.email){
      const ge = (g.email || '').trim();
      if(ge.indexOf('@') < 1){ editError('Guest ' + (i + 1) + ': a valid email is required.'); return; }
      out.email = ge;
    }
    if(flags.gender || g.gender){
      if(!g.gender){ editError('Guest ' + (i + 1) + ': please select man or woman.'); return; }
      out.gender = g.gender;
    }
    // Keep what we don't edit here (Instagram, joined-by-link marker) when the name stays the same.
    const o = g._orig;
    if(o && String(o.firstName || '').trim().toLowerCase() === gf.toLowerCase() && String(o.lastName || '').trim().toLowerCase() === gl.toLowerCase()){
      ['instagram', 'uid', 'joined'].forEach(function(k){ if(o[k] !== undefined && out[k] === undefined) out[k] = o[k]; });
    }
    guests.push(out);
  }
  const btn = document.getElementById('erSave'); btn.disabled = true;
  if(editingRequest._approvedMode){
    const { data, error } = await supabaseClient.rpc('update_my_guests', { p_request_id: editingRequest.id, p_guests: guests });
    btn.disabled = false;
    if(error){ editError(noShowBlockMessage(error) || ((error.message || '').indexOf('AGS_BLOCKED|') >= 0 ? error.message.split('AGS_BLOCKED|')[1] : 'Could not save right now. Please try again.')); return; }
    if(!data || !data.ok){ editError(data && data.reason === 'too_late' ? 'The party has started, names can\u2019t change anymore.' : 'Could not save right now. Please try again.'); return; }
    closeEditRequest();
    await loadMyRequests();
    return;
  }
  const upd = {
    first_name: first, last_name: last, age: age, instagram: insta || 'None', phone: phone, email: email,
    additional_guests: guests, total_guests: 1 + guests.length
  };
  if(document.getElementById('erGenderWrap').style.display !== 'none' && gender) upd.gender = gender;
  const res = await supabaseClient.from('guestlist_requests').update(upd).eq('id', editingRequest.id).select('id');
  btn.disabled = false;
  if(res.error){ editError(noShowBlockMessage(res.error) || 'Could not save right now. Please try again.'); return; }
  if(!res.data || res.data.length === 0){
    closeEditRequest();
    await loadMyRequests();
    window.alert("This request was already approved, so it can't be changed anymore.");
    return;
  }
  closeEditRequest();
  await loadMyRequests();
}
document.getElementById('editReqClose').addEventListener('click', closeEditRequest);
document.getElementById('erCancel').addEventListener('click', closeEditRequest);
document.getElementById('erSave').addEventListener('click', saveEditRequest);
document.getElementById('erAddGuest').addEventListener('click', function(){
  syncEditGuests();
  editGuests.push({ firstName: '', lastName: '', age: '', email: '', gender: '' });
  renderEditGuests();
});
document.getElementById('editReqOverlay').addEventListener('click', function(e){
  if(e.target === this) closeEditRequest();
});

// The database blocks guestlist requests after repeated no-shows and
// returns a readable reason prefixed with "AGS_BLOCKED|".
function noShowBlockMessage(error){
  const msg = error && error.message ? String(error.message) : '';
  const i = msg.indexOf('AGS_BLOCKED|');
  return i === -1 ? '' : msg.slice(i + 'AGS_BLOCKED|'.length).trim();
}
let lastSaveBlockMessage = '';

// Saves a submitted guestlist request to the signed-in user's account.
// Never blocks or breaks the WhatsApp flow if it fails.
async function saveRequestToAccount(payload){
  lastSaveBlockMessage = '';
  if(!supabaseClient || !currentUser) return false;
  try {
    const { error } = await supabaseClient.from('guestlist_requests').insert({
      user_id: currentUser.id,
      event_name: payload.event.name,
      event_venue: payload.event.venue,
      event_date: payload.event.date,
      first_name: payload.mainGuest.firstName,
      last_name: payload.mainGuest.lastName,
      age: payload.mainGuest.age,
      instagram: payload.mainGuest.instagram,
      phone: payload.mainGuest.phone,
      email: payload.mainGuest.email,
      gender: payload.mainGuest.gender || null,
      additional_guests: payload.additionalGuests,
      total_guests: payload.totalGuests
    });
    if(error){
      lastSaveBlockMessage = noShowBlockMessage(error);
      console.warn('Could not save request to account.', error);
      return false;
    }
    return true;
  } catch(err){
    console.warn('Could not save request to account.', err);
    return false;
  }
}

// Restore session on load (e.g. returning visitor who's still logged in).
// If there's no session, the app is gated behind sign up / log in —
// nobody browses events or requests guestlist access anonymously.
(async function initAuth(){
  if(!supabaseClient){ lockAppBehindGate(); return; }
  const { data } = await supabaseClient.auth.getSession();
  if(isPasswordRecovery && data.session){
    enterPasswordRecovery();
    return;
  }
  if(data.session && data.session.user){
    currentUser = data.session.user;
    showAccountPanel(currentUser);
    unlockAppFromGate();
    checkNotificationGate();
  } else {
    lockAppBehindGate();
  }
})();

// "Request another night" on the success screen.
(function(){
  const btn = document.getElementById('glAnotherBtn');
  if(btn) btn.addEventListener('click', function(){
    resetGuestlistFormForNext();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ---------------------------------------------------------------
   LOG IN WITH AN EMAIL CODE (no password)
   A 6-digit code instead of a magic link, because on iPhone a link
   opens Safari, not the home-screen app — a code works everywhere.
   Needs {{ .Token }} in Supabase → Auth → Email Templates → Magic Link.
   --------------------------------------------------------------- */
(function(){
  const form = document.getElementById('codeForm');
  if(!form) return;
  let codeSentTo = '';
  const emailEl = document.getElementById('codeEmail');
  const tokenEl = document.getElementById('codeToken');
  const errEl = document.getElementById('codeError');
  const btn = document.getElementById('codeSubmitBtn');
  const resend = document.getElementById('codeResendLink');

  function setStep(step){
    const codeStep = step === 'code';
    document.getElementById('codeEmailField').style.display = codeStep ? 'none' : '';
    document.getElementById('codeTokenField').style.display = codeStep ? '' : 'none';
    resend.style.display = codeStep ? '' : 'none';
    document.getElementById('codeHelpers').style.display = codeStep ? 'flex' : 'none';
    if(codeStep) setupMailButton(codeSentTo);
    btn.textContent = codeStep ? 'Log In' : 'Send Code';
    document.getElementById('codeNote').textContent = codeStep
      ? 'We sent a login code to ' + codeSentTo + '. Enter it below — it can take a minute, check your spam too.'
      : 'No password needed. Enter your email and we\'ll send you a login code.';
    if(codeStep){ tokenEl.value = ''; setTimeout(function(){ tokenEl.focus(); }, 50); }
  }
  function showErr(msg){ errEl.textContent = msg; errEl.style.display = 'block'; }

  // One tap to the right mail app, based on the email address.
  function setupMailButton(email){
    const a = document.getElementById('codeOpenMail');
    const domain = String(email.split('@')[1] || '').toLowerCase();
    const ua = navigator.userAgent || '';
    const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const android = /Android/.test(ua);
    let label = 'Open Mail', href = ios ? 'message://' : 'mailto:';
    if(/^(gmail|googlemail)\.com$/.test(domain)){
      label = 'Open Gmail';
      href = ios ? 'googlegmail://' : android ? 'intent://#Intent;package=com.google.android.gm;end' : 'https://mail.google.com/';
    } else if(/^(outlook|hotmail|live|msn)\./.test(domain)){
      label = 'Open Outlook';
      href = ios ? 'ms-outlook://' : android ? 'intent://#Intent;package=com.microsoft.office.outlook;end' : 'https://outlook.live.com/mail/';
    } else if(/^(icloud|me|mac)\.com$/.test(domain)){
      label = 'Open Mail';
      href = ios ? 'message://' : 'https://www.icloud.com/mail';
    }
    a.textContent = label;
    a.setAttribute('href', href);
    if(/^https?:/.test(href)) a.setAttribute('target', '_blank'); else a.removeAttribute('target');
  }

  // Paste straight from the clipboard (iOS shows a small "Paste" bubble).
  document.getElementById('codePaste').addEventListener('click', async function(){
    try{
      const txt = await navigator.clipboard.readText();
      const digits = String(txt || '').replace(/\D/g, '').slice(0, 8);
      if(digits.length >= 6){ tokenEl.value = digits; maybeAutoSubmit(); }
      else { showErr('Copy the code from the email first, then tap Paste code.'); }
    } catch(err){
      tokenEl.focus();
      showErr('Tap the code field and choose Paste.');
    }
  });

  // Log in automatically as soon as the full code is in (Supabase sends
  // 8-digit codes for this project; CODE_LENGTH must match its setting).
  const CODE_LENGTH = 8;
  function maybeAutoSubmit(){
    const digits = tokenEl.value.replace(/\D/g, '');
    if(codeSentTo && digits.length === CODE_LENGTH && !btn.disabled){
      if(form.requestSubmit) form.requestSubmit(); else btn.click();
    }
  }
  tokenEl.addEventListener('input', function(){ errEl.style.display = 'none'; maybeAutoSubmit(); });

  async function sendCode(){
    const email = emailEl.value.trim();
    if(!email || email.indexOf('@') < 1){ showErr('Enter the email you signed up with.'); return; }
    btn.disabled = true;
    const { error } = await supabaseClient.auth.signInWithOtp({ email: email, options: { shouldCreateUser: false } });
    btn.disabled = false;
    if(error){
      const msg = String(error.message || '');
      if(/signup|not allowed|not found|user/i.test(msg)) showErr('There is no account with this email yet. Go back and tap Sign Up to create one.');
      else if(/rate|seconds|too many/i.test(msg)) showErr('Please wait a minute before asking for a new code.');
      else showErr(msg || 'The code could not be sent. Please try again.');
      return;
    }
    codeSentTo = email;
    setStep('code');
  }

  document.getElementById('codeLoginLink').addEventListener('click', function(){
    emailEl.value = document.getElementById('loginEmail').value.trim();
    errEl.style.display = 'none';
    codeSentTo = '';
    setStep('email');
    showAuthView('code');
  });
  document.getElementById('codeBackLink').addEventListener('click', function(){ showAuthView('login'); });
  resend.addEventListener('click', function(){ errEl.style.display = 'none'; setStep('email'); emailEl.value = codeSentTo; sendCode(); });

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    errEl.style.display = 'none';
    if(!supabaseClient){ showErr('Accounts are not set up yet. Please try again later.'); return; }
    if(!codeSentTo){ await sendCode(); return; }
    const token = tokenEl.value.replace(/\D/g, '');
    if(token.length < 6){ showErr('Enter the code from the email.'); return; }
    btn.disabled = true;
    const { data, error } = await supabaseClient.auth.verifyOtp({ email: codeSentTo, token: token, type: 'email' });
    btn.disabled = false;
    if(error || !data || !data.user){
      showErr('That code is not valid or has expired. Check the email or send a new code.');
      return;
    }
    currentUser = data.user;
    AppSound.play('success');
    showAuthView('login');
    showAccountPanel(currentUser);
    unlockAppFromGate();
    checkNotificationGate();
  });
})();

/* ================================================================
   YOUR NEXT NIGHT — the guest's next request, right on the home screen
   ================================================================ */
function escHtml(v){
  return String(v === null || v === undefined ? '' : v).replace(/[&<>"']/g, function(ch){
    return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch];
  });
}
function todayAmsterdam(){
  try{ return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }); }
  catch(e){ return new Date().toISOString().slice(0, 10); }
}
function findEventFor(name, date){
  return EVENTS.find(function(e){ return e.name === name && e.date === String(date).slice(0, 10); }) || null;
}
// Tonight screen extras (9): your group, dresscode and line-up from the party info.
function tonightGroupHtml(r){
  const g = Array.isArray(r.additional_guests) ? r.additional_guests : [];
  if(!g.length) return '';
  return '<div class="tonight__group">' + g.map(function(x){ return '<span>' + escHtml(((x.firstName || '') + ' ' + (x.lastName || '')).trim()) + '</span>'; }).join('') + '</div>';
}
function tonightInfoHtml(ev){
  if(!ev) return '';
  const d = String(ev.description || '');
  const dress = ev.dresscode || ((d.match(/dress\s*code[:\s]+([^.]+)/i) || [])[1] || '');
  const line = ev.lineup || ((d.match(/\bwith ([^.]+)/i) || [])[1] || '');
  const until = (d.match(/(\d{1,2}:\d{2})\s*(?:till|until|-|–)\s*(\d{1,2}:\d{2})/i) || []);
  const rows = [];
  if(until[1]) rows.push(['Time', until[1] + ' – ' + until[2]]);
  if(line) rows.push(['Line-up', line.trim()]);
  if(dress) rows.push(['Dresscode', dress.trim()]);
  if(eventGenres(ev).length) rows.push(['Music', eventGenres(ev).join(' · ')]);
  if(!rows.length) return '';
  return '<dl class="tonight__info">' + rows.map(function(x){ return '<div><dt>' + x[0] + '</dt><dd>' + escHtml(x[1]) + '</dd></div>'; }).join('') + '</dl>';
}
function uberLinkFor(venue){
  const parts = String(venue || '').split('·');
  const place = (parts[0] || '').trim() + ', ' + ((parts[1] || 'Amsterdam').trim());
  return 'https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=' + encodeURIComponent(place) + '&dropoff[nickname]=' + encodeURIComponent((parts[0] || '').trim());
}
function mapsLinkFor(venue){
  const parts = String(venue || '').split('·');
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((parts[0] || '').trim() + ', ' + ((parts[1] || 'Amsterdam').trim()));
}
let nextNightRows = [];

async function loadNextNight(){
  const box = document.getElementById('nextNight');
  if(!box) return;
  if(!supabaseClient || !currentUser){ box.hidden = true; box.innerHTML = ''; return; }
  try{
    const { data } = await supabaseClient
      .from('guestlist_requests')
      .select('id,event_name,event_venue,event_date,status,total_guests,first_name,last_name,additional_guests,approved_at')
      .eq('user_id', currentUser.id)
      .gte('event_date', todayAmsterdam())
      .order('event_date', { ascending: true });
    if(!data) throw new Error('offline');
    nextNightRows = (data || []).filter(function(r){
      const st = String(r.status || 'Pending').trim().toLowerCase();
      return st === 'pending' || st === 'approved';
    });
    // Keep tonight's pass on the phone, so it also opens without signal at the door.
    try{ localStorage.setItem('ags_next_cache_' + currentUser.id, JSON.stringify(nextNightRows.slice(0, 3))); } catch(e){}
  } catch(err){
    let cached = []; try{ cached = JSON.parse(localStorage.getItem('ags_next_cache_' + currentUser.id) || '[]'); } catch(e){}
    nextNightRows = (cached || []).filter(function(r){ return String(r.event_date).slice(0, 10) >= todayAmsterdam(); });
  }
  renderNextNight();
  try{ updateEventsHeadline(); } catch(e){}
  try{ maybeCelebrateApproval(); } catch(e){}
  if(typeof openTonight === 'function') openTonight(false);
}

function renderNextNight(){
  const box = document.getElementById('nextNight');
  if(!box) return;
  const r = nextNightRows[0];
  if(!r){ box.hidden = true; box.innerHTML = ''; return; }
  const ev = findEventFor(r.event_name, r.event_date);
  const approved = String(r.status || '').trim().toLowerCase() === 'approved';
  const tonight = approved && String(r.event_date).slice(0, 10) === todayAmsterdam();
  const pill = tonight ? '<span class="next-night__pill is-tonight">Tonight</span>'
    : approved ? '<span class="next-night__pill is-confirmed">On the list</span>'
    : '<span class="next-night__pill">Under review</span>';
  const guests = (r.total_guests || 1) > 1 ? r.total_guests + ' people' : 'Just you';
  const meta = formatDate(String(r.event_date).slice(0, 10)) + (ev && ev.time ? ' · ' + ev.time : '') + ' · ' + escHtml(String(r.event_venue || '').split('·')[0].trim()) + ' · ' + guests;
  box.innerHTML =
    '<div class="next-night__eyebrow"><span>Your next night</span>' + pill + '</div>' +
    '<div class="next-night__name" id="nextNightName">' + escHtml(r.event_name) + '</div>' +
    '<div class="next-night__meta">' + meta + '</div>' +
    (approved ? '' : '<div class="next-night__meta" style="margin-top:-8px;">We’ll notify you as soon as you’re approved.</div>') +
    (tonight ? '<button type="button" class="btn btn--solid next-night__pass" id="nextNightPass">Open tonight\u2019s pass</button>' : '') +
    (tonight ? hostButtonHtml(r) : '') +
    '<div class="next-night__actions">' +
      '<a class="btn" href="' + mapsLinkFor(r.event_venue) + '" target="_blank" rel="noopener">Route</a>' +
      (ev ? '<button type="button" class="btn" id="nextNightCal">Calendar</button>' : '') +
      (ev ? '<button type="button" class="btn" id="nextNightDetails">Details</button>' : '') +
    '</div>' +
    (approved && walletAvailable() ? '<button type="button" class="wallet-btn" id="nextNightWallet" aria-label="Add to Apple Wallet"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="#fff"/><rect x="2.5" y="7.5" width="19" height="3" fill="#36a7e0"/><rect x="2.5" y="10" width="19" height="3" fill="#f6b63c"/><rect x="2.5" y="12.5" width="19" height="3" fill="#ef5a5a"/><path d="M2.5 15h6.5a3 3 0 006 0h6.5v1a3 3 0 01-3 3h-13a3 3 0 01-3-3z" fill="#fff"/></svg><span><small>Add to</small>Apple Wallet</span></button>' : '') +
    (ev ? '<button type="button" class="next-night__share" id="nextNightShare">Share to your story ↗</button>' : '') +
    (approved && ev && MY_REF_CODE ? '<button type="button" class="next-night__share" id="nextNightInvite">Bring a friend · you both get bonus points ↗</button>' : '') +
    '<button type="button" class="next-night__release" id="nextNightRelease">Can’t make it? Release your spot</button>' +
    (nextNightRows.length > 1 ? '<div class="next-night__more">+ ' + (nextNightRows.length - 1) + ' more upcoming request' + (nextNightRows.length > 2 ? 's' : '') + ' in your account</div>' : '');
  box.hidden = false;

  const inviteBtn = document.getElementById('nextNightInvite');
  if(inviteBtn && ev) inviteBtn.addEventListener('click', function(){ inviteFriendTo(ev); });
  const shareBtn2 = document.getElementById('nextNightShare');
  if(shareBtn2 && ev) shareBtn2.addEventListener('click', function(){ shareStory(ev, shareBtn2); });
  const passBtn = document.getElementById('nextNightPass');
  if(passBtn) passBtn.addEventListener('click', function(){ openTonight(true); });
  const walletBtn = document.getElementById('nextNightWallet');
  if(walletBtn) walletBtn.addEventListener('click', function(){ addToWallet(r.id, walletBtn); });
  if(ev){
    document.getElementById('nextNightCal').addEventListener('click', function(){ addEventToCalendar(ev); });
    document.getElementById('nextNightDetails').addEventListener('click', function(){ openEventSheet(ev); });
    document.getElementById('nextNightName').addEventListener('click', function(){ openEventSheet(ev); });
  }
  // Two taps to release, so it never happens by accident.
  const rel = document.getElementById('nextNightRelease');
  rel.addEventListener('click', async function(){
    if(!rel.classList.contains('is-armed')){
      rel.classList.add('is-armed');
      rel.textContent = 'Tap again to release your spot';
      setTimeout(function(){ if(rel.isConnected && rel.classList.contains('is-armed')){ rel.classList.remove('is-armed'); rel.textContent = 'Can’t make it? Release your spot'; } }, 5000);
      return;
    }
    rel.disabled = true; rel.textContent = 'Releasing…';
    try{
      const { data, error } = await supabaseClient.rpc('cancel_guestlist_request', { p_request_id: r.id, p_event_id: ev ? ev.id : null });
      if(error || !data || !data.success) throw error || new Error((data && data.reason) || 'failed');
      rel.textContent = 'Spot released — thanks for letting us know';
      if(ev){ try{ fetch(API_BASE + '/api/waitlist-notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_id: ev.id }) }); } catch(e){} }
      AppSound.play('release');
      setTimeout(function(){ loadNextNight(); if(typeof loadMyRequests === 'function') loadMyRequests(); if(typeof loadLiveGuestlists === 'function') loadLiveGuestlists(); }, 1200);
    } catch(err){
      rel.disabled = false; rel.classList.remove('is-armed');
      rel.textContent = 'Could not release — try again';
    }
  });
}

/* ================================================================
   ONE-TAP GUESTLIST REQUEST
   Guests whose details we already have confirm in one tap instead of
   filling in the form. Anything unusual (extra guests, events that need
   per-guest emails, missing details) goes to the normal form.
   ================================================================ */
async function savedGuestDetails(){
  if(!supabaseClient || !currentUser) return null;
  try{
    const { data } = await supabaseClient
      .from('guestlist_requests')
      .select('first_name,last_name,age,instagram,phone,email,gender')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(1);
    const d = data && data[0];
    if(!d || !d.first_name || !d.last_name || !d.age || !d.phone || !d.email) return null;
    return d;
  } catch(err){ return null; }
}

// The sheet markup sits after this script in index.html, so bind lazily.
function quickOverlayEl(){
  const el = document.getElementById('quickOverlay');
  if(el && !el.dataset.bound){
    el.dataset.bound = '1';
    el.addEventListener('click', function(e){ if(e.target === el) closeQuickSheet(); });
  }
  return el;
}
function openQuickSheet(){ const el = quickOverlayEl(); if(!el) return; el.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
function closeQuickSheet(){ const el = quickOverlayEl(); if(!el) return; el.classList.remove('is-open'); document.body.style.overflow = ''; }

function goToFullForm(ev, guestCount){
  closeQuickSheet();
  resetGuestlistFormForNext();
  switchTab('guestlist');
  preselectEvent(ev);
  if(guestCount){ document.getElementById('glGuestCount').value = String(guestCount); rebuildAdditionalGuests(); }
  prefillGuestlistForm();
  document.getElementById('glSpotNotice').style.display = 'none';
}

// Returns true when the one-tap sheet took over; false -> use the form.
async function tryQuickRequest(ev){
  if(!currentUser || !ev || eventNeedsGuestEmails(ev)) return false;
  const d = await savedGuestDetails();
  if(!d) return false;
  if(parseInt(d.age, 10) < eventMinAge(ev, d.gender)) return false;
  if(eventNeedsGender(ev) && !d.gender) return false;

  // Already requested this night? Show that instead of a duplicate.
  const dup = (nextNightRows || []).find(function(r){ return r.event_name === ev.name && String(r.event_date).slice(0, 10) === ev.date; });
  const body = document.getElementById('quickBody');
  const head =
    '<div class="quick-sheet__eyebrow">Guestlist</div>' +
    '<div class="quick-sheet__title" id="quickTitle">' + escHtml(ev.name) + '</div>' +
    '<div class="quick-sheet__meta">' + formatDate(ev.date) + (ev.time ? ' · ' + escHtml(ev.time) : '') + ' · ' + escHtml(eventVenueName(ev)) + '</div>';
  if(dup){
    const approved = String(dup.status || '').toLowerCase() === 'approved';
    body.innerHTML = head +
      '<p class="quick-sheet__note">You already requested this night' + (approved ? ' and you’re on the list.' : ' — it’s under review.') + '</p>' +
      '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="quickClose">OK</button></div>';
    openQuickSheet();
    document.getElementById('quickClose').addEventListener('click', closeQuickSheet);
    return true;
  }

  const name = escHtml(d.first_name + ' ' + d.last_name);
  body.innerHTML = head +
    '<div class="quick-sheet__details">' +
      '<div class="quick-sheet__row"><span>Name on the list</span><span>' + name + '</span></div>' +
      '<div class="quick-sheet__row"><span>Phone</span><span>' + escHtml(d.phone) + '</span></div>' +
      '<div class="quick-sheet__row"><span>Guests</span><span>Just you</span></div>' +
    '</div>' +
    '<p class="quick-sheet__review">Every request is personally reviewed by AGS.</p>' +
    '<p class="quick-sheet__note">By requesting you confirm you are ' + eventMinAge(ev, d.gender) + '+ and agree to be contacted about this request.</p>' +
    '<div class="err" id="quickErr" style="margin-bottom:12px;"></div>' +
    '<div class="quick-sheet__btns">' +
      '<button type="button" class="btn btn--solid" id="quickConfirm">Request access</button>' +
      '<button type="button" class="btn" id="quickAddGuests">Bringing friends? Add guests</button>' +
    '</div>' +
    '<button type="button" class="quick-sheet__link" id="quickEdit">Change my details</button>';
  openQuickSheet();

  document.getElementById('quickAddGuests').addEventListener('click', function(){ goToFullForm(ev, 1); });
  document.getElementById('quickEdit').addEventListener('click', function(){ goToFullForm(ev, 0); });
  document.getElementById('quickConfirm').addEventListener('click', async function(){
    const btn = this;
    btn.disabled = true; btn.textContent = 'Sending…';
    const payload = {
      event: { name: ev.name, venue: ev.venue, date: ev.date },
      mainGuest: {
        firstName: d.first_name, lastName: d.last_name, age: String(d.age),
        instagram: d.instagram || 'None', phone: d.phone, email: d.email,
        gender: eventNeedsGender(ev) ? (d.gender || '') : ''
      },
      additionalGuests: [],
      totalGuests: 1,
      consent: true
    };
    const ok = await saveRequestToAccount(payload);
    if(!ok){
      btn.disabled = false; btn.textContent = 'Request access';
      const e = document.getElementById('quickErr');
      e.textContent = lastSaveBlockMessage || 'Your request could not be sent. Check your connection and try again.';
      e.classList.add('is-visible');
      return;
    }
    AppSound.play('success');
    body.innerHTML = head +
      '<div class="quick-sheet__done"><div class="gl-success__mark">✓</div>' +
      '<p class="quick-sheet__note">Request sent. We’ll review it and let you know as soon as you’re on the list.</p></div>' +
      pushAskHtml() +
      '<div class="quick-sheet__btns"><button type="button" class="btn btn--solid" id="quickShare">Share to your story</button><button type="button" class="btn" id="quickDone">Done</button></div>';
    document.getElementById('quickDone').addEventListener('click', closeQuickSheet);
    const qs = document.getElementById('quickShare'); qs.addEventListener('click', function(){ shareStory(ev, qs); });
    bindPushAsk(body);
    loadNextNight();
    if(typeof loadMyRequests === 'function') loadMyRequests();
    if(typeof loadGuestCounts === 'function') loadGuestCounts().then(function(){ if(typeof renderAllGuestlistPanels === 'function') renderAllGuestlistPanels(); });
  });
  return true;
}

/* ================================================================
   APP SOUNDS — small, premium UI sounds made with Web Audio
   (no audio files). Off switch in Account; remembered per device.
   ================================================================ */
var AppSound = (function(){
  let ctx = null;
  let enabled = true;
  try{ enabled = localStorage.getItem('ags_sounds') !== 'off'; } catch(e){}

  function ac(){
    if(!enabled) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;
    if(!ctx){ try{ ctx = new AC(); } catch(e){ return null; } }
    if(ctx.state === 'suspended'){ try{ ctx.resume(); } catch(e){} }
    return ctx;
  }
  // One soft bell-like note: sine + quiet octave, quick attack, smooth decay.
  function note(freq, start, dur, vol, type){
    const c = ac(); if(!c) return;
    const t = c.currentTime + (start || 0);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(c.destination);
    [[freq, type || 'sine', 1], [freq * 2, 'sine', 0.25]].forEach(function(p){
      const o = c.createOscillator(); const og = c.createGain();
      o.type = p[1]; o.frequency.setValueAtTime(p[0], t); og.gain.value = p[2];
      o.connect(og); og.connect(g); o.start(t); o.stop(t + dur + 0.05);
    });
  }
  function buzz(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms); } catch(e){} }

  const sounds = {
    tap: function(){ note(1760, 0, 0.06, 0.035); buzz(8); },
    open: function(){
      const c = ac(); if(!c) return;
      const t = c.currentTime, len = 0.32;
      const buf = c.createBuffer(1, Math.floor(c.sampleRate * len), c.sampleRate);
      const d = buf.getChannelData(0); for(let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 0.8;
      f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3200, t + len);
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      src.connect(f); f.connect(g); g.connect(c.destination); src.start(t); src.stop(t + len);
    },
    success: function(){ note(659.25, 0, 0.5, 0.09); note(987.77, 0.11, 0.9, 0.08); note(1318.5, 0.22, 1.1, 0.05); buzz([12, 40, 18]); },
    release: function(){ note(783.99, 0, 0.35, 0.06); note(523.25, 0.12, 0.6, 0.05); buzz(15); },
    error: function(){ note(220, 0, 0.14, 0.07, 'triangle'); note(196, 0.16, 0.22, 0.07, 'triangle'); buzz([30, 50, 30]); }
  };
  return {
    play: function(name){ try{ haptic(name === 'success' ? 'success' : 'light'); } catch(e){} if(enabled && sounds[name]){ try{ sounds[name](); } catch(e){} } },
    isOn: function(){ return enabled; },
    set: function(on){ enabled = !!on; try{ localStorage.setItem('ags_sounds', on ? 'on' : 'off'); } catch(e){} }
  };
})();


// Error messages appearing anywhere -> soft low double note.
(function(){
  let last = 0;
  const obs = new MutationObserver(function(muts){
    for(const m of muts){
      const el = m.target;
      if(!(el instanceof HTMLElement)) continue;
      const shown = el.classList.contains('err') && (el.classList.contains('is-visible') && el.style.display !== 'none');
      if(shown && el.textContent.trim() && Date.now() - last > 600){ last = Date.now(); AppSound.play('error'); break; }
    }
  });
  obs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
})();

// Sound on/off in Account.
(function(){
  const btn = document.getElementById('soundToggle');
  if(!btn) return;
  function paint(){
    const on = AppSound.isOn();
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    document.getElementById('soundToggleLabel').textContent = 'App sounds: ' + (on ? 'On' : 'Off');
  }
  btn.addEventListener('click', function(){ AppSound.set(!AppSound.isOn()); paint(); if(AppSound.isOn()) AppSound.play('success'); });
  paint();
})();

// Contact now lives under Account (four tabs instead of five).
(function(){
  const open = document.getElementById('openContactBtn');
  const back = document.getElementById('contactBackBtn');
  if(open) open.addEventListener('click', function(){ switchTab('contact'); });
  if(back) back.addEventListener('click', function(){ switchTab('account'); });
})();

// Join the waitlist (card panel button).
document.getElementById('eventList').addEventListener('click', async function(e){
  const btn = e.target.closest('.glive__wait-btn');
  if(!btn || btn.disabled) return;
  e.stopPropagation();
  const eventId = btn.dataset.eventId;
  const ev = EVENTS.find(function(x){ return x.id === (btn.dataset.baseId || eventId); });
  if(!currentUser){ rememberEventAndLogin(ev); return; }
  btn.disabled = true; btn.textContent = 'Joining…';
  try{
    const { data, error } = await supabaseClient.rpc('join_guestlist_waitlist', { p_event_id: eventId, p_event_name: btn.dataset.waitName || (ev ? ev.name : null) });
    if(error) throw error;
    if(data && data.success){
      MY_WAITLIST[eventId] = data.position;
      AppSound.play('success');
    } else if(data && data.reason === 'not_full'){
      await loadLiveGuestlists();
      return;
    } else if(data && data.reason === 'already_claimed'){
      btn.textContent = 'You already have a spot';
      return;
    } else { throw new Error((data && data.reason) || 'failed'); }
  } catch(err){
    btn.disabled = false; btn.textContent = 'Try again';
    AppSound.play('error');
    return;
  }
  renderAllGuestlistPanels();
});

/* ================================================================
   STORY SHARE CARD — a 1080×1920 image for Instagram/Snapchat stories
   ("I'm on the list"), drawn on a canvas in the AGS look.
   ================================================================ */
function loadImg(src){
  return new Promise(function(resolve){
    if(!src){ resolve(null); return; }
    const img = new Image();
    img.onload = function(){ resolve(img); };
    img.onerror = function(){ resolve(null); };
    img.src = src;
  });
}
function wrapLines(ctx, text, maxW){
  const words = String(text).split(/\s+/); const lines = []; let line = '';
  words.forEach(function(w){ const t = line ? line + ' ' + w : w; if(ctx.measureText(t).width > maxW && line){ lines.push(line); line = w; } else { line = t; } });
  if(line) lines.push(line);
  return lines;
}
async function makeStoryImage(ev){
  const W = 1080, H = 1920;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  try{ await Promise.all([document.fonts.load('600 120px "Cormorant Garamond"'), document.fonts.load('500 italic 60px "Cormorant Garamond"')]); } catch(e){}
  const serif = '"Cormorant Garamond", Georgia, serif';
  const sans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';

  // Club-light background
  x.fillStyle = '#050505'; x.fillRect(0, 0, W, H);
  [[180, 320, 700, 'rgba(230,180,70,0.55)'], [980, 980, 760, 'rgba(210,20,60,0.5)'], [300, 1700, 720, 'rgba(120,50,230,0.45)']].forEach(function(b){
    const g = x.createRadialGradient(b[0], b[1], 0, b[0], b[1], b[2]); g.addColorStop(0, b[3]); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.globalCompositeOperation = 'screen'; x.fillStyle = g; x.fillRect(0, 0, W, H);
  });
  x.globalCompositeOperation = 'source-over';

  const gold = x.createLinearGradient(0, 0, 0, 160); gold.addColorStop(0, '#fff3cf'); gold.addColorStop(0.5, '#e6c875'); gold.addColorStop(1, '#b88a2e');

  // Top: brand
  const logo = await loadImg('icon-192.png');
  if(logo){ x.save(); x.beginPath(); x.arc(W / 2, 170, 62, 0, Math.PI * 2); x.clip(); x.drawImage(logo, W / 2 - 66, 104, 132, 132); x.restore(); }
  x.textAlign = 'center'; x.fillStyle = '#C9A24A'; x.font = '600 26px ' + sans;
  x.fillText('A M S T E R D A M   G U E S T L I S T   S E R V I C E', W / 2, 290);

  // Middle: flyer (or a designed poster)
  const flyer = (!ev.flyerPending && ev.image) ? await loadImg(ev.image) : null;
  const boxTop = 350, boxH = 1000, boxW = 820;
  if(flyer){
    const r = Math.min(boxW / flyer.width, boxH / flyer.height);
    const w = flyer.width * r, h = flyer.height * r, fx = (W - w) / 2, fy = boxTop + (boxH - h) / 2;
    x.save(); x.shadowColor = 'rgba(201,162,74,0.55)'; x.shadowBlur = 70; x.fillStyle = '#000'; x.fillRect(fx, fy, w, h); x.restore();
    x.drawImage(flyer, fx, fy, w, h);
    x.strokeStyle = 'rgba(230,200,117,0.85)'; x.lineWidth = 3; x.strokeRect(fx - 1.5, fy - 1.5, w + 3, h + 3);
  } else {
    x.fillStyle = '#C9A24A'; x.font = '600 30px ' + sans; x.fillText('A G S   P R E S E N T S', W / 2, boxTop + 300);
    x.font = '600 150px ' + serif; x.fillStyle = gold;
    const lines = wrapLines(x, ev.name, 900);
    const startY = boxTop + 560 - (lines.length - 1) * 75;
    lines.forEach(function(l, i){ x.fillText(l, W / 2, startY + i * 150); });
  }

  // Bottom: "I'm on the list"
  x.font = '500 italic 60px ' + serif; x.fillStyle = '#F5F5F5';
  x.fillText('See you there —', W / 2, 1450);
  x.font = '600 128px ' + serif;
  const g2 = x.createLinearGradient(0, 1470, 0, 1600); g2.addColorStop(0, '#fff3cf'); g2.addColorStop(0.5, '#e6c875'); g2.addColorStop(1, '#b88a2e');
  x.fillStyle = g2; x.fillText('I’m on the list', W / 2, 1585);
  const d = new Date(ev.date + 'T00:00:00');
  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()] + ' ' + d.getDate() + ' ' + ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  x.font = '600 34px ' + sans; x.fillStyle = '#F5F5F5';
  x.fillText((ev.name + '  ·  ' + day + '  ·  ' + eventVenueName(ev)).toUpperCase(), W / 2, 1665, W - 120);
  x.strokeStyle = '#C9A24A'; x.lineWidth = 2; x.strokeRect(W / 2 - 360, 1712, 720, 128);
  x.font = '700 34px ' + sans; x.fillStyle = '#E6C875';
  x.fillText('GET ON THE LIST  →', W / 2, 1763);
  x.font = '500 28px ' + sans; x.fillStyle = '#F5F5F5';
  x.fillText('amsterdamguestlistservice.website/app', W / 2, 1810);

  return new Promise(function(resolve){ c.toBlob(function(b){ resolve(b); }, 'image/png'); });
}
async function shareStory(ev, btn){
  if(!ev) return;
  const label = btn ? btn.textContent : '';
  if(btn){ btn.disabled = true; btn.textContent = 'Making your story…'; }
  try{
    const blob = await makeStoryImage(ev);
    const file = new File([blob], 'ags-' + ev.id + '.png', { type: 'image/png' });
    if(navigator.canShare && navigator.canShare({ files: [file] })){
      await navigator.share({ files: [file], title: ev.name, text: 'I’m on the list for ' + ev.name + ' 🔑 ' + shareUrlFor(ev) });
    } else {
      showStoryPreview(URL.createObjectURL(blob), file.name);
    }
  } catch(err){ /* share sheet closed */ }
  if(btn){ btn.disabled = false; btn.textContent = label; }
}
function showStoryPreview(url, name){
  let ov = document.getElementById('storyPreview');
  if(!ov){
    ov = document.createElement('div'); ov.id = 'storyPreview'; ov.className = 'story-preview';
    document.body.appendChild(ov);
    ov.addEventListener('click', function(e){ if(e.target === ov || e.target.closest('.story-preview__close')) ov.classList.remove('is-open'); });
  }
  ov.innerHTML = '<div class="story-preview__inner"><img src="' + url + '" alt="Your story">' +
    '<p>Press and hold the image to save it, then post it to your story.</p>' +
    '<a class="btn btn--solid" href="' + url + '" download="' + name + '">Save image</a>' +
    '<button type="button" class="story-preview__close">Close</button></div>';
  ov.classList.add('is-open');
}

/* ================================================================
   TONIGHT MODE — on the night itself, a full-screen pass for guests
   who are on the list.
   ================================================================ */
function tonightRow(){
  const r = (nextNightRows || [])[0];
  if(!r) return null;
  const approved = String(r.status || '').trim().toLowerCase() === 'approved';
  return approved && String(r.event_date).slice(0, 10) === todayAmsterdam() ? r : null;
}
let tonightTimer = null;
function openTonight(force){
  const r = tonightRow(); if(!r) return;
  const key = 'ags_tonight_seen_' + r.id;
  if(!force){ try{ if(sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch(e){} }
  const ev = findEventFor(r.event_name, r.event_date);
  let ov = document.getElementById('tonightOverlay');
  if(!ov){ ov = document.createElement('div'); ov.id = 'tonightOverlay'; ov.className = 'tonight'; document.body.appendChild(ov); }
  const meta = currentUser && currentUser.user_metadata || {};
  const name = ((meta.first_name || '') + ' ' + (meta.last_name || '')).trim() || (currentUser && currentUser.email) || '';
  ov.innerHTML =
    '<div class="tonight__glow"></div>' +
    '<button type="button" class="tonight__close" aria-label="Close">✕</button>' +
    '<div class="tonight__inner">' +
      '<div class="tonight__eyebrow"><span class="tonight__dot"></span>Tonight · You’re on the list</div>' +
      '<div class="tonight__name">' + escHtml(r.event_name) + '</div>' +
      '<div class="tonight__venue">' + escHtml(String(r.event_venue || '').split('·')[0].trim()) + (ev && ev.time ? ' · from ' + escHtml(ev.time) : '') + '</div>' +
      '<div class="tonight__count" id="tonightCount"></div>' +
      '<div class="tonight__pass">' +
        '<div class="tonight__label">Name on the list</div>' +
        '<div class="tonight__guest">' + escHtml(((r.first_name || '') + ' ' + (r.last_name || '')).trim() || name) + '</div>' +
        '<div class="tonight__label">' + ((r.total_guests || 1) > 1 ? r.total_guests + ' people' : 'Just you') + '</div>' +
        tonightGroupHtml(r) +
      '</div>' +
      tonightInfoHtml(ev) +
      hostButtonHtml(r) +
      '<ul class="tonight__rules"><li>Bring a valid photo ID for everyone</li><li>' + (ev && ev.entryUntil ? 'Be inside before <strong>' + escHtml(ev.entryUntil) + '</strong>' : 'Arrive on time — the list closes when the room is full') + '</li><li>Give the name above at the door</li></ul>' +
      '<div class="tonight__btns">' +
        '<a class="btn btn--solid" href="' + mapsLinkFor(r.event_venue) + '" target="_blank" rel="noopener">Route to the club</a>' +
        '<a class="btn" href="' + uberLinkFor(r.event_venue) + '" target="_blank" rel="noopener">Get a ride 🚕</a>' +
        '<button type="button" class="btn" id="tonightInvite">🔗 Add a friend</button>' +
        (ev ? '<button type="button" class="btn" id="tonightShare">Share to your story</button>' : '') +
        '<button type="button" class="btn safe-btn" id="tonightSafe">🛡️ Safe night</button>' +
      '</div>' +
    '</div>';
  // A points celebration already on screen waits until the pass closes.
  document.querySelectorAll('.points-toast').forEach(function(t){ pendingPointsToast += Number(t.dataset.n) || 0; t.remove(); });
  ov.classList.add('is-open'); document.body.style.overflow = 'hidden';
  AppSound.play('open');
  ov.querySelector('.tonight__close').addEventListener('click', closeTonight);
  const sh = document.getElementById('tonightShare'); if(sh) sh.addEventListener('click', function(){ shareStory(ev, sh); });
  const inv = document.getElementById('tonightInvite'); if(inv) inv.addEventListener('click', function(){ shareGroupInvite(r, inv); });
  const sf = document.getElementById('tonightSafe'); if(sf) sf.addEventListener('click', function(){ openSafeNight(r.event_venue); });
  function tick(){
    const el = document.getElementById('tonightCount'); if(!el) return;
    const ms = ev ? eventStartTime(ev) - Date.now() : 0;
    if(ms > 0){ const h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000); el.innerHTML = 'Doors in <strong>' + (h ? h + 'h ' : '') + m + 'm</strong>'; }
    else el.innerHTML = '<strong>Doors are open</strong> — enjoy your night';
  }
  tick(); clearInterval(tonightTimer); tonightTimer = setInterval(tick, 30000);
}
function closeTonight(){
  const ov = document.getElementById('tonightOverlay'); if(ov) ov.classList.remove('is-open');
  document.body.style.overflow = ''; clearInterval(tonightTimer);
  if(pendingPointsToast){ const n = pendingPointsToast; pendingPointsToast = 0; setTimeout(function(){ showPointsToast(n); }, 350); }
}

/* ================================================================
   POINTS — tier progress on the home screen + "+N points" moment
   ================================================================ */
function renderPointsStrip(points){
  const box = document.getElementById('pointsStrip'); if(!box) return;
  if(!currentUser){ box.hidden = true; return; }
  const t = getTierInfo(points);
  const pct = t.next ? Math.max(4, Math.min(100, Math.round((points - t.current.min) / (t.next.min - t.current.min) * 100))) : 100;
  box.innerHTML =
    '<div class="points-strip__top"><span class="points-strip__tier ' + t.current.className + '">' + t.current.name + '</span>' +
    '<span class="points-strip__pts"><strong>' + points + '</strong> pts</span></div>' +
    '<div class="points-strip__bar"><div style="width:' + pct + '%"></div></div>' +
    '<div class="points-strip__next">' + (t.next ? (t.next.min - points) + ' pts to ' + t.next.name + ' · +10 for every night you’re on the list' : 'Top tier reached — VIP treatment') + '</div>';
  box.hidden = false;
  box.onclick = function(){ switchTab('account'); };
  // Celebrate new points since the last visit on this device.
  let seen = null;
  try{ seen = localStorage.getItem('ags_points_seen_' + currentUser.id); } catch(e){}
  if(seen !== null && points > Number(seen)) showPointsToast(points - Number(seen));
  try{ localStorage.setItem('ags_points_seen_' + currentUser.id, String(points)); } catch(e){}
}
let pendingPointsToast = 0;
function showPointsToast(n){
  // Never on top of the Tonight pass — show it once that closes.
  if(document.querySelector('#tonightOverlay.is-open')){ pendingPointsToast += n; return; }
  const t = document.createElement('div'); t.className = 'points-toast';
  t.dataset.n = String(n);
  t.innerHTML = '<span>+' + n + '</span> points';
  document.body.appendChild(t);
  AppSound.play('success');
  requestAnimationFrame(function(){ t.classList.add('is-in'); });
  setTimeout(function(){ t.classList.remove('is-in'); setTimeout(function(){ t.remove(); }, 600); }, 2600);
}

// "Share to your story" on the form success screen.
(function(){
  const btn = document.getElementById('glShareBtn');
  if(btn) btn.addEventListener('click', function(){ const ev = selectedGuestlistEvent() || lastRequestedEvent; shareStory(ev, btn); });
})();

/* ================================================================
   NOTIFICATION ASK — right after a request, when it's obviously useful.
   ================================================================ */
function pushAskHtml(){
  try{
    if(typeof pushSupported !== 'undefined' && pushSupported && pushPermission() === 'default'){
      return '<div class="push-ask"><div class="push-ask__title">Know the second you’re in</div>' +
        '<p class="push-ask__text">Turn on notifications and we’ll tell you the moment you’re approved, remind you on the night, and ping you when a spot opens up.</p>' +
        '<button type="button" class="btn btn--solid push-ask__btn">Turn on notifications</button></div>';
    }
    if(isIosDevice() && !isStandaloneApp()){
      return '<div class="push-ask"><div class="push-ask__title">Get notified when you’re in</div>' +
        '<p class="push-ask__text">On iPhone, notifications work in the AGS app. Download it free and log in with this account.</p>' +
        '<a class="btn btn--solid push-ask__store" href="' + APP_STORE_URL + '" rel="noopener" style="text-decoration:none">Download on the App Store</a></div>';
    }
  } catch(e){}
  return '';
}
// ----------------------------------------------------------------
// "Notifications are off" nudge: a slim card above the events and in
// Account for logged-in members who don't get our pushes yet. Dismiss
// hides the one above the events for 5 days; Account always shows it.
// ----------------------------------------------------------------
const PUSH_NUDGE_SNOOZE = 5 * 864e5;
function pushNudgeState(){
  try{
    if(pushSupported){
      const p = pushPermission();
      if(p === 'granted') return null;
      if(p === 'denied') return 'denied';
      return 'ask';
    }
    if(isIosDevice() && !isStandaloneApp()) return 'store';
  } catch(e){}
  return null;
}
function pushNudgeHtml(state, place){
  const close = place === 'events' ? '<button type="button" class="push-nudge__x" aria-label="Dismiss">✕</button>' : '';
  if(state === 'ask') return '<div class="push-nudge__bell">🔔</div><div class="push-nudge__txt"><b>Turn on notifications</b>Hear first about new parties, when you’re on the list and when spots open up.</div><button type="button" class="push-nudge__go" data-push-on>Turn on</button>' + close;
  if(state === 'store') return '<div class="push-nudge__bell">🔔</div><div class="push-nudge__txt"><b>Get notified on iPhone</b>Notifications work in the free AGS app. Log in with this account.</div><a class="push-nudge__go" href="' + APP_STORE_URL + '" rel="noopener">Get app</a>' + close;
  if(state === 'denied') return '<div class="push-nudge__bell">🔕</div><div class="push-nudge__txt"><b>Notifications are blocked</b>' +
    (IS_NATIVE ? 'Open your iPhone <strong>Settings → AGS → Notifications</strong> and turn on Allow Notifications.' : 'Allow notifications for this site in your browser settings, then reload.') + '</div>' + close;
  return '';
}
async function renderPushNudges(){
  try{ await nativePermReady; } catch(e){}
  const state = currentUser ? pushNudgeState() : null;
  // above the events
  const ev = document.getElementById('pushNudge');
  if(ev){
    let snoozed = false;
    try{ snoozed = Date.now() - Number(localStorage.getItem('ags_push_nudge_x') || 0) < PUSH_NUDGE_SNOOZE; } catch(e){}
    if(state && !snoozed){ ev.innerHTML = pushNudgeHtml(state, 'events'); ev.hidden = false; bindPushNudge(ev, 'events'); }
    else { ev.hidden = true; ev.innerHTML = ''; }
  }
  // in Account
  const panel = document.getElementById('accountPanel');
  if(panel){
    let box = document.getElementById('pushNudgeAccount');
    if(!box){
      box = document.createElement('div'); box.id = 'pushNudgeAccount'; box.className = 'push-nudge push-nudge--account'; box.hidden = true;
      const adminBtn = document.getElementById('adminOpenBtn');
      if(adminBtn && adminBtn.parentNode === panel) panel.insertBefore(box, adminBtn.nextSibling); else panel.insertBefore(box, panel.firstChild);
    }
    if(state){ box.innerHTML = pushNudgeHtml(state, 'account'); box.hidden = false; bindPushNudge(box, 'account'); }
    else { box.hidden = true; box.innerHTML = ''; }
  }
}
function bindPushNudge(root, place){
  const on = root.querySelector('[data-push-on]');
  if(on) on.addEventListener('click', async function(){
    on.disabled = true; on.textContent = '…';
    await subscribeToPush();
    if(pushPermission() === 'granted'){
      root.innerHTML = '<div class="push-nudge__bell">✓</div><div class="push-nudge__txt"><b>Notifications on</b>You’ll hear it first.</div>';
      AppSound.play('success');
      setTimeout(renderPushNudges, 2500);
    } else { renderPushNudges(); }
  });
  const x = root.querySelector('.push-nudge__x');
  if(x) x.addEventListener('click', function(){
    try{ localStorage.setItem('ags_push_nudge_x', String(Date.now())); } catch(e){}
    root.hidden = true;
  });
}

function bindPushAsk(root){
  const btn = root && root.querySelector('.push-ask__btn');
  if(!btn) return;
  btn.addEventListener('click', async function(){
    btn.disabled = true; btn.textContent = 'One moment…';
    await subscribeToPush();
    const box = btn.closest('.push-ask');
    if(pushPermission() === 'granted'){
      box.classList.add('is-done');
      box.innerHTML = '<div class="push-ask__title">Notifications on ✓</div>';
      AppSound.play('success');
      if(typeof renderPushNudges === 'function') renderPushNudges();
    } else {
      box.innerHTML = '<p class="push-ask__text">No problem — you can turn them on later with the bell icon at the top.</p>';
    }
  });
}

/* ================================================================
   LINK CLICKS — count "Buy Tickets" / "Book a Table" per event
   (sales happen on Fourvenues/Celebratix, so this is AGS's proof).
   ================================================================ */
document.addEventListener('click', function(e){
  const a = e.target.closest('a[data-track]');
  if(!a || !supabaseClient) return;
  const ev = EVENTS.find(function(x){ return x.id === a.dataset.eventId; });
  try{
    supabaseClient.rpc('log_link_click', { p_event_id: a.dataset.eventId, p_event_name: ev ? ev.name : null, p_kind: a.dataset.track })
      .then(function(){}, function(){});
  } catch(err){ /* never block the link */ }
}, true);


/* =====================================================================
   DESIGN v3 — behaviour (splash, haptics, party colour, celebrations,
   metal card tilt, pull to refresh, empty states, card taps)
   ===================================================================== */
// 1. Splash fades once the app is ready (max ~1.4s).
(function(){
  const sp = document.getElementById('splash');
  if(!sp) return;
  const t0 = Date.now();
  const hide = function(){ const wait = Math.max(0, 1100 - (Date.now() - t0)); setTimeout(function(){ sp.classList.add('is-gone'); setTimeout(function(){ sp.remove(); }, 600); }, wait); };
  if(document.readyState === 'complete') hide(); else window.addEventListener('load', hide);
  setTimeout(hide, 2500);
})();

// 7. Haptics: native plugin when the iPhone app has it; vibration on Android;
// the iOS 18 "switch" tick in Safari/WebView otherwise.
var hapticSwitch = null;
function haptic(kind){
  try{
    const H = IS_NATIVE && window.Capacitor.Plugins && window.Capacitor.Plugins.Haptics;
    if(H){ kind === 'success' ? H.notification({ type: 'SUCCESS' }) : H.impact({ style: 'LIGHT' }); return; }
    if(navigator.vibrate){ navigator.vibrate(kind === 'success' ? [12, 60, 18] : 8); return; }
    if(!hapticSwitch){
      const label = document.createElement('label');
      label.style.cssText = 'position:fixed;left:-99px;top:-99px;opacity:0;pointer-events:none';
      label.innerHTML = '<input type="checkbox" switch>';
      document.body.appendChild(label); hapticSwitch = label;
    }
    hapticSwitch.click();
    if(kind === 'success') setTimeout(function(){ hapticSwitch.click(); }, 90);
  } catch(e){}
}

// 4. Party colour: the sheet takes the main colour of the flyer.
const PARTY_RGB = {};
function applyPartyColor(ev){
  const sheet = document.querySelector('#sheetOverlay .sheet');
  if(!sheet) return;
  sheet.classList.remove('has-party-color');
  const src = (ev.clip && ev.clip.poster) || ev.image;
  if(!src) return;
  const set = function(c){ if(!c) return; sheet.style.setProperty('--party-rgb', c.join(',')); sheet.style.setProperty('--party-rgb-light', c.map(function(v){ return Math.min(255, Math.round(v + (255 - v) * 0.55)); }).join(',')); sheet.classList.add('has-party-color'); };
  if(PARTY_RGB[src]){ set(PARTY_RGB[src]); return; }
  const img = new Image();
  img.onload = function(){
    try{
      const c = document.createElement('canvas'); c.width = c.height = 32;
      const x = c.getContext('2d'); x.drawImage(img, 0, 0, 32, 32);
      const d = x.getImageData(0, 0, 32, 32).data;
      let best = null, bestScore = -1;
      // Most colourful bright-ish pixel cluster, not black or white.
      const buckets = {};
      for(let i = 0; i < d.length; i += 4){
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const max = Math.max(r, g, b), min = Math.min(r, g, b), sat = max ? (max - min) / max : 0;
        if(max < 50 || sat < 0.35) continue;
        const k = (r >> 5) + ',' + (g >> 5) + ',' + (b >> 5);
        const o = buckets[k] || (buckets[k] = { n: 0, r: 0, g: 0, b: 0, s: 0 });
        o.n++; o.r += r; o.g += g; o.b += b; o.s += sat;
      }
      Object.keys(buckets).forEach(function(k){ const o = buckets[k]; const score = o.n * (o.s / o.n); if(score > bestScore){ bestScore = score; best = [Math.round(o.r / o.n), Math.round(o.g / o.n), Math.round(o.b / o.n)]; } });
      PARTY_RGB[src] = best || [201, 162, 74];
      set(PARTY_RGB[src]);
    } catch(e){}
  };
  img.src = src;
}

// 6. "You're on the list" moment: once per approval, within 3 days of it.
function maybeCelebrateApproval(){
  if(!currentUser || document.getElementById('approvedMoment')) return;
  const key = 'ags_celebrated_' + currentUser.id;
  let seen = []; try{ seen = JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){}
  const r = (nextNightRows || []).find(function(x){
    return String(x.status || '').trim().toLowerCase() === 'approved' && x.approved_at &&
      Date.now() - new Date(x.approved_at).getTime() < 3 * 864e5 && seen.indexOf(x.id) < 0;
  });
  if(!r) return;
  seen.push(r.id); try{ localStorage.setItem(key, JSON.stringify(seen.slice(-50))); } catch(e){}
  const label = nightGroupLabel(r.event_date);
  const el = document.createElement('div');
  el.id = 'approvedMoment'; el.className = 'approved-moment approved-moment--card';
  const evA = findEventFor(r.event_name, r.event_date);
  const first = String(r.first_name || '').trim();
  el.innerHTML = '<small class="approved-moment__kicker">Your name is on the list</small>' +
    '<div class="vip-card"><div class="vip-card__sheen"></div>' +
      '<div class="vip-card__top"><span>AGS</span><span>' + (MY_MEMBER_NO ? 'Nº ' + String(MY_MEMBER_NO).padStart(4, '0') : 'Guestlist') + '</span></div>' +
      '<h2>You’re in' + (first ? ', ' + escHtml(first) : '') + '.</h2>' +
      '<div class="vip-card__ev">' + escHtml(r.event_name) + '</div>' +
      '<div class="vip-card__row"><span>' + (label === 'Tonight' ? 'Tonight' : label === 'Tomorrow' ? 'Tomorrow' : formatDate(r.event_date)) + (evA && evA.time ? ' · ' + escHtml(evA.time) : '') + '</span><span>' + escHtml(String(r.event_venue || '').split('·')[0].trim()) + '</span></div>' +
      '<div class="vip-card__row"><span>' + (r.total_guests > 1 ? r.total_guests + ' guests' : '1 guest') + '</span><span>Valid ID required</span></div>' +
    '</div>' +
    '<button type="button" class="btn btn--solid" data-a="share">Share to your story</button><button type="button" class="btn" data-a="close">Close</button>';
  document.body.appendChild(el);
  requestAnimationFrame(function(){ el.classList.add('is-in'); });
  haptic('success');
  try{ AppSound.play('success'); } catch(e){}
  el.addEventListener('click', function(e){
    const a = e.target.closest('[data-a]'); if(!a) return;
    const ev = findEventFor(r.event_name, r.event_date);
    el.classList.remove('is-in'); setTimeout(function(){ el.remove(); }, 400);
    if(a.dataset.a === 'share' && ev) shareStory(ev, null);
  });
}
function confetti(canvas){
  if(!canvas || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = canvas.width = innerWidth * dpr, H = canvas.height = innerHeight * dpr;
  const x = canvas.getContext('2d');
  const cols = ['#f1dc9c', '#c9a24a', '#fff3cf', '#e6c875', '#ffffff', '#8a6a24'];
  const parts = Array.from({ length: 140 }, function(){
    return { x: W / 2 + (Math.random() - 0.5) * W * 0.2, y: H * 0.42, vx: (Math.random() - 0.5) * 16 * dpr, vy: (-Math.random() * 15 - 6) * dpr,
      w: (5 + Math.random() * 6) * dpr, h: (8 + Math.random() * 8) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[(Math.random() * cols.length) | 0] };
  });
  const t0 = performance.now();
  (function frame(t){
    if(!document.body.contains(canvas)) return;
    x.clearRect(0, 0, W, H);
    parts.forEach(function(p){ p.vy += 0.45 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); x.restore(); });
    if(t - t0 < 4200) requestAnimationFrame(frame); else x.clearRect(0, 0, W, H);
  })(t0);
}

// 8. Metal card follows your finger / phone tilt.
(function(){
  const card = document.querySelector('.member-card');
  if(!card) return;
  const setT = function(px, py){ // px,py in 0..1
    card.style.setProperty('--ry', ((px - 0.5) * 14).toFixed(2) + 'deg');
    card.style.setProperty('--rx', ((0.5 - py) * 12).toFixed(2) + 'deg');
    card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  };
  const reset = function(){ card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); };
  const fromEvent = function(e){
    const t = e.touches ? e.touches[0] : e, b = card.getBoundingClientRect();
    setT(Math.min(1, Math.max(0, (t.clientX - b.left) / b.width)), Math.min(1, Math.max(0, (t.clientY - b.top) / b.height)));
  };
  card.addEventListener('pointermove', fromEvent);
  card.addEventListener('touchmove', fromEvent, { passive: true });
  card.addEventListener('pointerleave', reset);
  card.addEventListener('touchend', reset);
  // Phone tilt where the browser allows it without asking (Android, iPhone app).
  window.addEventListener('deviceorientation', function(e){
    if(e.gamma == null || !card.offsetParent) return;
    setT(Math.min(1, Math.max(0, 0.5 + e.gamma / 60)), Math.min(1, Math.max(0, 0.5 + (e.beta - 45) / 80)));
  });
  // Gentle shimmer while idle.
  let a = 0; setInterval(function(){ if(!card.offsetParent || document.hidden) return; a += 0.05; card.style.setProperty('--mx', (50 + Math.sin(a) * 35).toFixed(1) + '%'); }, 120);
})();

// 10. Empty states.
function emptyStateHtml(icon, title, text, btn, tab){
  return '<div class="empty-state"><div class="empty-state__icon">' + icon + '</div><b>' + title + '</b><p>' + text + '</p>' +
    (btn ? '<button type="button" class="btn btn--solid" data-empty-tab="' + tab + '">' + btn + '</button>' : '') + '</div>';
}
function bindEmptyState(root){
  (root || document).querySelectorAll('[data-empty-tab]').forEach(function(b){ b.addEventListener('click', function(){ switchTab(b.dataset.emptyTab); }); });
}

// 3. Whole card is tappable (the text sits on top of the flyer now).
(function(){
  const list = document.getElementById('eventList');
  if(!list) return;
  list.addEventListener('click', function(e){
    if(e.target.closest('button, a, input, .glive')) return;
    const body = e.target.closest('.event-card__body'); if(!body) return;
    const media = body.parentElement && body.parentElement.querySelector('.event-card__media');
    if(media) media.click();
  });
})();

// 11. Pull to refresh on the parties screen.
(function(){
  const ptr = document.createElement('div'); ptr.className = 'ptr'; ptr.innerHTML = '<img src="icon-192.png" alt="">';
  document.body.appendChild(ptr);
  let y0 = null, pull = 0, busy = false;
  const active = function(){ const t = document.getElementById('tab-events'); return t && t.classList.contains('is-active') && !document.body.classList.contains('is-gated') && !document.querySelector('.sheet-overlay.is-open, .story-viewer, .hero-intro'); };
  document.addEventListener('touchstart', function(e){ y0 = (active() && window.scrollY <= 0 && !busy) ? e.touches[0].clientY : null; pull = 0; }, { passive: true });
  document.addEventListener('touchmove', function(e){
    if(y0 === null) return;
    pull = Math.max(0, e.touches[0].clientY - y0);
    const p = Math.min(1, pull / 90);
    ptr.style.opacity = p; ptr.style.transform = 'translateY(' + (p * 70 - 60) + 'px) rotate(' + (pull * 3) + 'deg)';
  }, { passive: true });
  document.addEventListener('touchend', async function(){
    if(y0 === null) return; y0 = null;
    if(pull < 90){ ptr.style.opacity = 0; ptr.style.transform = 'translateY(-60px)'; return; }
    busy = true; ptr.classList.add('is-spinning'); ptr.style.transform = 'translateY(10px)';
    haptic('light');
    try{
      renderEventList(); renderVenueFilter();
      const jobs = [];
      if(typeof loadNextNight === 'function') jobs.push(loadNextNight());
      if(currentUser){ jobs.push(loadInbox()); jobs.push(loadMyPrefs()); }
      await Promise.race([Promise.all(jobs), new Promise(function(r){ setTimeout(r, 2500); })]);
      await new Promise(function(r){ setTimeout(r, 500); });
    } catch(e){}
    ptr.classList.remove('is-spinning'); ptr.style.opacity = 0; ptr.style.transform = 'translateY(-60px)'; busy = false;
  });
})();


/* ---- Onboarding (1): your vibe → your profile → notifications ---- */
async function maybeShowOnboarding(){
  if(!supabaseClient || !currentUser) return false;
  const key = 'ags_onboarded_' + currentUser.id;
  try{ if(localStorage.getItem(key)) return false; } catch(e){}
  const { data: mp } = await supabaseClient.from('member_profiles').select('user_id, genres, display_name').eq('user_id', currentUser.id).maybeSingle();
  if(mp && mp.genres && mp.genres.length){ try{ localStorage.setItem(key, '1'); } catch(e){} return false; }
  showOnboarding(mp || null, key);
  return true;
}
function showOnboarding(existing, key){
  const genres = []; Object.keys(GENRES_BY_NAME).forEach(function(n){ GENRES_BY_NAME[n].forEach(function(g){ if(genres.indexOf(g) < 0) genres.push(g); }); });
  const clubs = []; getSortedEvents().forEach(function(ev){ const v = eventVenueName(ev); if(clubs.indexOf(v) < 0) clubs.push(v); });
  const pickG = new Set(), pickC = new Set(MY_FOLLOWS);
  const meta = currentUser.user_metadata || {};
  let step = 0, name = (existing && existing.display_name) || meta.first_name || '', photo = '';
  const el = document.createElement('div'); el.className = 'onb'; el.id = 'onboarding';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const finish = function(){ try{ localStorage.setItem(key, '1'); } catch(e){} el.classList.remove('is-in'); document.body.style.overflow = ''; setTimeout(function(){ el.remove(); }, 400); try{ loadMyPrefs(); loadMyProfileCard(); updateEventsHeadline(); } catch(e){} };
  async function save(){
    try{
      await supabaseClient.from('member_profiles').upsert({ user_id: currentUser.id, display_name: (name || 'Guest').slice(0, 40), genres: Array.from(pickG),
        avatar_url: photo || (MY_PROFILE && MY_PROFILE.avatar_url) || null, is_public: !!document.querySelector('#onbPublic:checked') || !!(MY_PROFILE && MY_PROFILE.is_public),
        show_going: !!document.querySelector('#onbPublic:checked') || !!(MY_PROFILE && MY_PROFILE.show_going), updated_at: new Date().toISOString() });
      const add = Array.from(pickC).filter(function(v){ return !MY_FOLLOWS.has(v); });
      if(add.length) await supabaseClient.from('venue_follows').upsert(add.map(function(v){ return { user_id: currentUser.id, venue: v }; }), { onConflict: 'user_id,venue', ignoreDuplicates: true });
      add.forEach(function(v){ MY_FOLLOWS.add(v); });
    } catch(e){}
  }
  function render(){
    const dots = '<div class="onb__dots">' + [0,1,2].map(function(i){ return '<i class="' + (i === step ? 'on' : '') + '"></i>'; }).join('') + '</div>';
    if(step === 0){
      el.innerHTML = '<div class="onb__inner">' + dots + '<small>Step 1 of 3</small><h2>What’s your vibe?</h2><p>Pick your music and clubs. We’ll put the right parties first.</p>' +
        '<div class="onb__label">Music</div><div class="onb__chips">' + genres.map(function(g){ return '<button type="button" class="onb__chip' + (pickG.has(g) ? ' on' : '') + '" data-g="' + esc(g) + '">♫ ' + esc(g) + '</button>'; }).join('') + '</div>' +
        '<div class="onb__label">Clubs</div><div class="onb__chips">' + clubs.map(function(c){ return '<button type="button" class="onb__chip' + (pickC.has(c) ? ' on' : '') + '" data-c="' + esc(c) + '">♡ ' + esc(c) + '</button>'; }).join('') + '</div>' +
        '<div class="onb__btns"><button type="button" class="btn btn--solid" data-n>Next</button><button type="button" class="onb__skip" data-skip>Skip</button></div></div>';
    } else if(step === 1){
      el.innerHTML = '<div class="onb__inner">' + dots + '<small>Step 2 of 3</small><h2>Show who you are</h2><p>Your name and photo appear when you’re on the list. You choose who sees it.</p>' +
        '<button type="button" class="onb__avatar" id="onbAvatar"' + ((photo || (MY_PROFILE && MY_PROFILE.avatar_url)) ? ' style="background-image:url(\'' + esc(photo || MY_PROFILE.avatar_url) + '\')">' : '>📷') + '</button><input type="file" id="onbFile" accept="image/*" hidden>' +
        '<input type="text" class="onb__input" id="onbName" maxlength="40" placeholder="Your name" value="' + esc(name) + '">' +
        '<label class="pc-toggle"><span>Show me on “who’s going”<small>Your photo and first name on parties you’re on the list for</small></span><input type="checkbox" id="onbPublic"></label>' +
        '<div class="onb__err" id="onbErr"></div>' +
        '<div class="onb__btns"><button type="button" class="btn btn--solid" data-n>Next</button><button type="button" class="onb__skip" data-n>Skip</button></div></div>';
      const f = el.querySelector('#onbFile');
      el.querySelector('#onbAvatar').addEventListener('click', function(){ f.click(); });
      f.addEventListener('change', async function(){
        if(!f.files || !f.files[0]) return;
        const a = el.querySelector('#onbAvatar'); a.textContent = '…';
        try{
          const blob = await new Promise(function(res, rej){ const img = new Image(), url = URL.createObjectURL(f.files[0]); img.onload = function(){ const sz = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement('canvas'); c.width = c.height = 512; c.getContext('2d').drawImage(img, (img.naturalWidth - sz) / 2, (img.naturalHeight - sz) / 2, sz, sz, 0, 0, 512, 512); URL.revokeObjectURL(url); c.toBlob(function(b){ b ? res(b) : rej(); }, 'image/jpeg', 0.85); }; img.onerror = rej; img.src = url; });
          const path = currentUser.id + '/avatar-' + Date.now() + '.jpg';
          const up = await supabaseClient.storage.from('avatars').upload(path, blob, { contentType: 'image/jpeg', upsert: true });
          if(up.error) throw up.error;
          photo = supabaseClient.storage.from('avatars').getPublicUrl(path).data.publicUrl;
          a.textContent = ''; a.style.backgroundImage = 'url(\'' + photo + '\')';
        } catch(e){ a.textContent = '📷'; el.querySelector('#onbErr').textContent = 'Photo upload failed. Try another one.'; }
      });
    } else {
      el.innerHTML = '<div class="onb__inner">' + dots + '<small>Step 3 of 3</small><div class="onb__bell">🔔</div><h2>Know when you’re in</h2><p>Get a notification the moment you’re on the list, when spots open up and when your clubs drop a party.</p>' +
        '<div class="onb__btns"><button type="button" class="btn btn--solid" id="onbPush">Turn on notifications</button><button type="button" class="onb__skip" data-done>Maybe later</button></div></div>';
      el.querySelector('#onbPush').addEventListener('click', async function(){ this.disabled = true; try{ if(typeof subscribeToPush === 'function') await subscribeToPush(); } catch(e){} finish(); });
    }
  }
  el.addEventListener('click', async function(e){
    const g = e.target.closest('[data-g]'), c = e.target.closest('[data-c]');
    if(g){ const v = g.dataset.g; pickG.has(v) ? pickG.delete(v) : pickG.add(v); g.classList.toggle('on'); haptic('light'); return; }
    if(c){ const v = c.dataset.c; pickC.has(v) ? pickC.delete(v) : pickC.add(v); c.classList.toggle('on'); haptic('light'); return; }
    if(e.target.closest('[data-skip]')){ step = 1; render(); return; }
    if(e.target.closest('[data-done]')){ await save(); finish(); return; }
    if(e.target.closest('[data-n]')){
      if(step === 1){ const n = el.querySelector('#onbName'); name = (n && n.value.trim()) || name; }
      if(step >= 1) await save();
      if(step === 1 && pushSupported && typeof isPushOn === 'function' && await isPushOn()){ finish(); return; }
      if(step === 1 && !pushSupported){ finish(); return; }
      step++; render();
    }
  });
  render();
  requestAnimationFrame(function(){ el.classList.add('is-in'); });
}


/* ---- Smooth (5): swipe down to close sheets, soft tab transitions ---- */
(function(){
  function swipeToClose(overlayId, close){
    const ov = document.getElementById(overlayId);
    const sheet = ov && ov.querySelector('.sheet');
    if(!sheet) return;
    let y0 = null, dy = 0, scroller = null;
    sheet.addEventListener('touchstart', function(e){
      scroller = e.target.closest('.inbox, textarea, input, .feed, video');
      if(scroller && scroller.tagName !== 'VIDEO' && scroller.scrollTop > 0){ y0 = null; return; }
      if(sheet.scrollTop > 0){ y0 = null; return; }
      y0 = e.touches[0].clientY; dy = 0; sheet.style.transition = 'none';
    }, { passive: true });
    sheet.addEventListener('touchmove', function(e){
      if(y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      if(dy > 4) sheet.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    sheet.addEventListener('touchend', function(){
      if(y0 === null) return; y0 = null;
      sheet.style.transition = 'transform .25s ease';
      if(dy > 120){ sheet.style.transform = 'translateY(100%)'; setTimeout(function(){ close(); sheet.style.transform = ''; sheet.style.transition = ''; }, 220); }
      else { sheet.style.transform = ''; setTimeout(function(){ sheet.style.transition = ''; }, 260); }
    });
  }
  swipeToClose('sheetOverlay', closeEventSheet);
  swipeToClose('quickOverlay', closeQuickSheet);
})();


/* =====================================================================
   SAFE NIGHT — share your location, a ride home, your trusted contact
   and 112, one tap away. The trusted contact stays on this phone only.
   ===================================================================== */
function safeContact(){ try{ return JSON.parse(localStorage.getItem('ags_safe_contact') || 'null'); } catch(e){ return null; } }
function openSafeNight(venue){
  const old = document.getElementById('safeNight'); if(old) old.remove();
  const el = document.createElement('div'); el.className = 'safe'; el.id = 'safeNight';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const telOf = function(n){ return String(n || '').replace(/[^0-9+]/g, ''); };
  function render(){
    const c = safeContact();
    el.innerHTML = '<div class="safe__inner">' +
      '<button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
      '<div class="safe__shield">🛡️</div><h2>Safe night</h2><p>Everything to get home safe, one tap away.</p>' +
      '<div class="safe__grid">' +
        '<button type="button" class="safe__tile" data-a="loc"><b>📍</b><span>Share my location</span><small>Send where you are to a friend</small></button>' +
        '<a class="safe__tile" href="https://m.uber.com/ul/?action=setPickup&pickup=my_location" target="_blank" rel="noopener"><b>🚕</b><span>Ride home</span><small>Uber from where you are</small></a>' +
        '<button type="button" class="safe__tile" data-a="home"><b>🏠</b><span>I’m home safe</span><small>Let your friends know</small></button>' +
        (venue ? '<a class="safe__tile" href="' + mapsLinkFor(venue) + '" target="_blank" rel="noopener"><b>🗺️</b><span>Back to the club</span><small>Lost your group? Route there</small></a>' : '<button type="button" class="safe__tile" data-a="friends"><b>👯</b><span>Stay together</span><small>Agree a meeting point</small></button>') +
      '</div>' +
      '<div class="safe__contact">' + (c && c.phone
        ? '<div><small>Trusted contact</small><b>' + esc(c.name || 'My contact') + '</b></div><a class="btn btn--solid" href="tel:' + telOf(c.phone) + '">Call</a><button type="button" class="btn" data-a="textc">Text location</button><button type="button" class="safe__edit" data-a="edit">Edit</button>'
        : '<div><small>Trusted contact</small><b>Not set yet</b><em>Someone you can always call. Saved on this phone only.</em></div><button type="button" class="btn btn--solid" data-a="edit">Add contact</button>') +
      '</div>' +
      '<div class="safe__form" id="safeForm" hidden><input type="text" id="safeName" placeholder="Name (e.g. Mom, Lisa)" value="' + esc(c && c.name) + '"><input type="tel" id="safePhone" placeholder="Phone number" value="' + esc(c && c.phone) + '"><button type="button" class="btn btn--solid" data-a="savec">Save</button></div>' +
      '<a class="safe__sos" href="tel:112"><b>Emergency · 112</b><span>Police, ambulance, fire</span></a>' +
      '<a class="safe__non" href="tel:09008844">Police, no emergency · 0900 8844</a>' +
      '<ul class="safe__tips"><li>Watch your drink, never take one from a stranger.</li><li>Feeling unwell or unsafe inside? Tell security or the bar staff right away.</li><li>Agree a meeting point with your group in case phones die.</li></ul>' +
    '</div>';
  }
  function getLink(cb){
    if(!navigator.geolocation){ cb(null); return; }
    navigator.geolocation.getCurrentPosition(function(p){ cb('https://maps.google.com/?q=' + p.coords.latitude.toFixed(5) + ',' + p.coords.longitude.toFixed(5)); },
      function(){ cb(null); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  }
  function shareText(text, phone){
    if(phone){ window.location.href = 'sms:' + telOf(phone) + (/iPhone|iPad/.test(navigator.userAgent) ? '&' : '?') + 'body=' + encodeURIComponent(text); return; }
    if(navigator.share){ navigator.share({ text: text }).catch(function(){}); return; }
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
  }
  el.addEventListener('click', function(e){
    const b = e.target.closest('[data-a]'); if(!b) return;
    const a = b.dataset.a, c = safeContact();
    if(a === 'close'){ el.remove(); document.body.style.overflow = ''; return; }
    if(a === 'loc' || a === 'textc'){
      const label = b.innerHTML; b.classList.add('is-busy');
      getLink(function(link){
        b.classList.remove('is-busy');
        const text = link ? 'Here’s where I am right now 📍 ' + link : 'I’m out tonight' + (venue ? ' at ' + String(venue).split(' · ')[0] : '') + '. Can you keep an eye on your phone? 🖤';
        shareText(text, a === 'textc' && c ? c.phone : null);
        b.innerHTML = label;
      });
      return;
    }
    if(a === 'home'){ shareText('Home safe 🏠🖤 Thanks for tonight!', null); return; }
    if(a === 'friends'){ shareText('Let’s agree: if we lose each other or phones die, we meet at the entrance at 03:00 🖤', null); return; }
    if(a === 'edit'){ const f = el.querySelector('#safeForm'); f.hidden = false; el.querySelector('#safeName').focus(); return; }
    if(a === 'savec'){
      const n = el.querySelector('#safeName').value.trim(), ph = el.querySelector('#safePhone').value.trim();
      try{ if(ph) localStorage.setItem('ags_safe_contact', JSON.stringify({ name: n, phone: ph })); else localStorage.removeItem('ags_safe_contact'); } catch(err){}
      render(); return;
    }
  });
  render();
}

/* =====================================================================
   NEW YEAR'S EVE — home banner with countdown, full page with the NYE
   parties, and "notify me" so they hear first when a NYE party drops.
   ===================================================================== */
const NYE = { year: 2026, topic: 'nye-2026' };
function nyeDates(){ return [NYE.year + '-12-31', (NYE.year + 1) + '-01-01']; }
function nyeEvents(){ const d = nyeDates(); return EVENTS.filter(function(ev){ return d.indexOf(ev.date) >= 0 && eventVisible(ev); }); }
function nyeMidnight(){ return new Date((NYE.year + 1) + '-01-01T00:00:00+01:00').getTime(); }
function nyeActive(){ const now = Date.now(); return now > new Date(NYE.year + '-11-15T00:00:00+01:00').getTime() && now < nyeMidnight() + 8 * 36e5; }
function nyeCountdown(){
  const ms = nyeMidnight() - Date.now();
  if(ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60, done: false };
}
function renderNyeBanner(){
  let b = document.getElementById('nyeBanner');
  if(!nyeActive()){ if(b) b.remove(); return; }
  if(!b){
    b = document.createElement('button'); b.type = 'button'; b.id = 'nyeBanner'; b.className = 'nye-banner';
    const anchor = document.getElementById('featuredHero');
    if(!anchor || !anchor.parentNode) return;
    anchor.parentNode.insertBefore(b, anchor);
    b.addEventListener('click', openNye);
  }
  const c = nyeCountdown(), n = nyeEvents().length;
  b.innerHTML = '<span class="nye-banner__fx">🎆</span><span class="nye-banner__txt"><small>New Year’s Eve</small><b>' +
    (c.done ? 'Happy New Year! 🥂' : c.d + ' days to go') + '</b><em>' + (n ? n + ' NYE ' + (n === 1 ? 'party' : 'parties') + ' · discounted tickets' : 'Discounted NYE tickets, hear it first') + '</em></span><span class="nye-banner__go">→</span>';
}
let NYE_TIMER = null;
async function openNye(){
  if(document.getElementById('nyePage')) return;
  const el = document.createElement('div'); el.className = 'nye'; el.id = 'nyePage';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  let subscribed = false, count = 0;
  try{
    if(supabaseClient && currentUser){
      const { data } = await supabaseClient.from('alert_signups').select('topic').eq('user_id', currentUser.id).eq('topic', NYE.topic).maybeSingle();
      subscribed = !!data;
    }
    if(supabaseClient){ const r = await supabaseClient.rpc('alert_count', { p_topic: NYE.topic }); count = Number(r.data) || 0; }
  } catch(e){}
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  function render(){
    const list = nyeEvents(), c = nyeCountdown();
    el.innerHTML = '<div class="nye__sky"></div><div class="nye__inner">' +
      '<button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
      '<small class="nye__kicker">Amsterdam · ' + NYE.year + ' → ' + (NYE.year + 1) + '</small><h2>New Year’s Eve</h2>' +
      '<div class="nye__count">' + [['d', 'days'], ['h', 'hrs'], ['m', 'min'], ['s', 'sec']].map(function(u){ return '<div><b data-u="' + u[0] + '">' + String(c[u[0]]).padStart(2, '0') + '</b><span>' + u[1] + '</span></div>'; }).join('') + '</div>' +
      (list.length
        ? '<div class="nye__list">' + list.map(function(ev){
            const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0;
            const tix = ev.ticketUrl && ev.ticketUrl !== '#';
            return '<div class="nye__item" data-id="' + esc(ev.id) + '">' + (ev.image ? '<div class="nye__img" style="background-image:url(\'' + esc(webpOf(ev.image) || ev.image) + '\')"></div>' : '<div class="nye__img nye__img--fx">🎆</div>') +
              '<div class="nye__meta"><b>' + esc(ev.name) + '</b><span>' + esc(eventVenueName(ev)) + (ev.time ? ' · ' + esc(ev.time) : '') + '</span>' +
              (tix ? '<a class="btn btn--solid" href="' + esc(ev.ticketUrl) + '" target="_blank" rel="noopener">🎟️ Discounted tickets</a>' : '') +
              (open ? '<button type="button" class="btn' + (tix ? '' : ' btn--solid') + '" data-a="go" data-id="' + esc(ev.id) + '">🔑 Get on the list</button>' : (tix ? '' : '<button type="button" class="btn btn--solid" data-a="go" data-id="' + esc(ev.id) + '">View party</button>')) +
              '</div></div>';
          }).join('') + '</div>'
        : '<div class="nye__soon"><b>The NYE line-up drops soon</b><p>The best New Year’s Eve parties in Amsterdam, with discounted tickets through AGS and early access for members. Get a notification the moment they’re live.</p></div>') +
      '<button type="button" class="btn ' + (subscribed ? '' : 'btn--solid') + ' nye__notify" data-a="notify"' + (subscribed ? ' disabled' : '') + '>' + (subscribed ? '✓ You’ll hear first' : '🔔 Notify me first') + '</button>' +
      (count >= 10 ? '<div class="nye__count-note">' + count + ' people are waiting for the NYE line-up</div>' : '') +
      '<ul class="nye__perks"><li><b>⚡ Members first</b>Silver members see NYE parties 48 hours early.</li><li><b>🎟️ Discounted tickets</b>NYE tickets for less, only through AGS.</li><li><b>🛡️ Safe night</b>Ride home and your trusted contact, one tap away.</li></ul>' +
    '</div>';
  }
  render();
  clearInterval(NYE_TIMER);
  NYE_TIMER = setInterval(function(){
    if(!document.body.contains(el)){ clearInterval(NYE_TIMER); return; }
    const c = nyeCountdown();
    el.querySelectorAll('[data-u]').forEach(function(b){ b.textContent = String(c[b.dataset.u]).padStart(2, '0'); });
  }, 1000);
  el.addEventListener('click', async function(e){
    const b = e.target.closest('[data-a]'); if(!b) return;
    const a = b.dataset.a;
    if(a === 'close'){ el.remove(); document.body.style.overflow = ''; clearInterval(NYE_TIMER); return; }
    if(a === 'go'){ const ev = EVENTS.find(function(x){ return x.id === b.dataset.id; }); el.remove(); document.body.style.overflow = ''; clearInterval(NYE_TIMER);
      if(ev){ const open = ['open', 'limited'].indexOf(ev.guestlistStatus) >= 0; if(open) startGuestlistFor(ev, false); else openEventSheet(ev); } return; }
    if(a === 'notify'){
      if(!currentUser){ el.remove(); document.body.style.overflow = ''; lockAppBehindGate(); return; }
      b.disabled = true;
      const r = await supabaseClient.from('alert_signups').upsert({ user_id: currentUser.id, topic: NYE.topic }, { onConflict: 'user_id,topic', ignoreDuplicates: true });
      if(r.error){ b.disabled = false; return; }
      subscribed = true; count++; haptic('success');
      try{ if(pushSupported && !(await isPushOn())) await subscribeToPush(); } catch(err){}
      render();
    }
  });
}
// Banner on the home screen; deep link ./?nye=1 opens the page.
(function(){
  try{ renderNyeBanner(); } catch(e){}
  setInterval(function(){ try{ renderNyeBanner(); } catch(e){} }, 60000);
  try{ if(/[?&]nye=1/.test(location.search)) setTimeout(openNye, 1200); } catch(e){}
})();

(function(){ const b = document.getElementById('openSafeBtn'); if(b) b.addEventListener('click', function(){ openSafeNight(null); }); })();


/* =====================================================================
   MUSIC PER PARTY — hear the vibe before you go.
   A Spotify / SoundCloud / YouTube link per party series (MUSIC_BY_NAME)
   or per date (ev.music) plays inline; every DJ in the line-up gets a
   quick link to their music.
   ===================================================================== */
const MUSIC_BY_NAME = {
  // 'Amajoyo': 'https://open.spotify.com/playlist/…',
};
function partyMusicUrl(ev){ return (ev && (ev.music || MUSIC_BY_NAME[ev.name])) || ''; }
function musicEmbed(url){
  const u = String(url || '');
  let m = u.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(playlist|album|track|artist|episode|show)\/([A-Za-z0-9]+)/);
  if(m) return { src: 'https://open.spotify.com/embed/' + m[1] + '/' + m[2] + '?theme=0', h: m[1] === 'track' ? 152 : 232 };
  if(/soundcloud\.com\//.test(u)) return { src: 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(u) + '&color=%23c9a24a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true', h: 180 };
  m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/);
  if(m) return { src: 'https://www.youtube-nocookie.com/embed/' + m[1], h: 200 };
  return null;
}
function partyLineup(ev){
  if(ev && Array.isArray(ev.lineup)) return ev.lineup;
  const d = String((ev && ev.description) || '');
  const m = d.match(/\bwith (.+?\S)\.(?:\s|$)/i);
  if(!m) return [];
  return m[1].replace(/\([^)]*\)/g, '').split(/\s*(?:,|&|\band\b|\s\.\s)\s*/i)
    .map(function(x){ return x.trim(); }).filter(function(x){ return x && x.length < 40 && !/^more$/i.test(x); });
}
function renderSheetMusic(ev){
  const host = document.getElementById('sheetExtras');
  if(!host) return;
  const old = document.getElementById('sheetMusic'); if(old) old.remove();
  const url = partyMusicUrl(ev), emb = musicEmbed(url), djs = partyLineup(ev);
  if(!emb && !djs.length) return;
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const box = document.createElement('div'); box.id = 'sheetMusic'; box.className = 'music';
  box.innerHTML = '<div class="music__head"><span>🎧 Hear the vibe</span>' + (url && !emb ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">Open ↗</a>' : '') + '</div>' +
    (emb ? '<div class="music__player"><button type="button" class="music__load" data-src="' + esc(emb.src) + '" data-h="' + emb.h + '">▶ Play the ' + esc(ev.name) + ' set</button></div>' : '') +
    (djs.length ? '<div class="music__djs">' + djs.map(function(n){
      return '<div class="music__dj"><b>' + esc(n) + '</b>' +
        '<a href="https://open.spotify.com/search/' + encodeURIComponent(n) + '" target="_blank" rel="noopener" aria-label="' + esc(n) + ' on Spotify">Spotify</a>' +
        '<a href="https://soundcloud.com/search?q=' + encodeURIComponent(n) + '" target="_blank" rel="noopener" aria-label="' + esc(n) + ' on SoundCloud">SoundCloud</a></div>';
    }).join('') + '</div>' : '');
  host.parentNode.insertBefore(box, host.nextSibling);
  const load = box.querySelector('.music__load');
  // The player only loads on tap: keeps the sheet fast and nothing plays by itself.
  if(load) load.addEventListener('click', function(){
    const f = document.createElement('iframe');
    f.src = load.dataset.src; f.height = load.dataset.h; f.loading = 'lazy';
    f.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    f.setAttribute('frameborder', '0'); f.className = 'music__frame';
    load.replaceWith(f);
    const clip = document.querySelector('#sheetMedia video'); if(clip){ clip.muted = true; }
  });
}

// Deep link ./?perks=1 (from the perks push) opens Rewards & Perks; also from the inbox.
// Deep link ./?invite=1 (from the invite push) opens Account and scrolls to the invite card.
(function(){ try{ if(/[?&]invite=1/.test(location.search)) setTimeout(function(){
  if(document.body.classList.contains('is-gated')) return;
  try{ switchTab('account'); } catch(e){}
  setTimeout(function(){ const c = document.getElementById('referralCard'); if(c && c.offsetParent){ c.scrollIntoView({ behavior:'smooth', block:'center' }); c.classList.add('is-flash'); setTimeout(function(){ c.classList.remove('is-flash'); }, 2200); } }, 700);
}, 1500); } catch(e){} })();
(function(){ try{ if(/[?&]perks=1/.test(location.search)) setTimeout(function(){ if(!document.body.classList.contains('is-gated')) openRewardsSheet(); }, 1500); } catch(e){} })();


/* ---- Daily actives: one ping per person per day (for the admin chart) ---- */
function logOpen(){
  try{
    if(!supabaseClient) return;
    const day = todayAmsterdam();
    const who = currentUser ? currentUser.id : 'anon';
    const k = 'ags_open_' + day + '_' + who;
    if(localStorage.getItem(k)) return;
    let vid = localStorage.getItem('ags_vid');
    if(!vid){ vid = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('ags_vid', vid); }
    supabaseClient.rpc('log_open', { p_visitor: vid }).then(function(r){ if(!r.error) try{ localStorage.setItem(k, '1'); } catch(e){} }, function(){});
  } catch(e){}
}
setTimeout(logOpen, 3000);
/* Presence heartbeat: lets AGS see how many people are in the app right now. */
(function(){
  function vid(){ try{ let v = localStorage.getItem('ags_vid'); if(!v){ v = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('ags_vid', v); } return v; } catch(e){ return 'nostore'; } }
  function screen(){ const a = document.querySelector('.tab-panel.is-active'); return a ? a.id.replace('tab-', '') : 'app'; }
  function ping(){ try{ if(!supabaseClient || document.hidden) return; supabaseClient.rpc('ping_presence', { p_visitor: vid(), p_screen: screen() }).then(function(){}, function(){}); } catch(e){} }
  setTimeout(ping, 2500);
  setInterval(ping, 60000);
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) ping(); });
})();
document.addEventListener('visibilitychange', function(){ if(document.visibilityState === 'visible') setTimeout(logOpen, 1500); });


/* =====================================================================
   OUTFIT CHECK — members post their fit, everyone gives 🔥, the most
   🔥 of the week wins 👑. Every photo is approved by AGS first.
   ===================================================================== */
function renderOutfitEntry(){
  let b = document.getElementById('outfitEntry');
  if(!b){
    b = document.createElement('button'); b.type = 'button'; b.id = 'outfitEntry'; b.className = 'outfit-entry';
    const anchor = document.getElementById('featuredHero');
    if(!anchor || !anchor.parentNode) return;
    anchor.parentNode.insertBefore(b, anchor);
    b.addEventListener('click', openOutfits);
  }
  b.innerHTML = '<span class="outfit-entry__icon">👗</span><span class="outfit-entry__txt"><small>Outfit check</small><b>Vote the fit of the week 🔥</b><em>Post yours, the winner gets featured on AGS</em></span><span class="outfit-entry__go">→</span>';
}
async function openOutfits(){
  if(document.getElementById('outfitPage')) return;
  const el = document.createElement('div'); el.className = 'outfits'; el.id = 'outfitPage';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v || '').replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  let wall = [], mine = [];
  async function load(){
    try{ const r = await supabaseClient.rpc('outfit_wall'); wall = r.data || []; } catch(e){ wall = []; }
    mine = [];
    if(currentUser){ try{ const r = await supabaseClient.from('outfits').select('id, image_url, status, created_at').eq('user_id', currentUser.id).eq('status', 'pending').order('created_at', { ascending: false }); mine = r.data || []; } catch(e){} }
  }
  function render(){
    el.innerHTML = '<div class="outfits__inner">' +
      '<button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
      '<small class="nye__kicker">This week</small><h2>Outfit check</h2>' +
      '<p class="outfits__intro">Give 🔥 to the best fits. Most 🔥 by Sunday wins 👑 and gets featured on AGS Instagram.</p>' +
      '<button type="button" class="btn btn--solid outfits__post" data-a="post">📸 Post your outfit</button>' +
      '<input type="file" id="ofFile" accept="image/*" hidden>' +
      '<div id="ofForm"></div>' +
      (mine.length ? '<div class="outfits__pending">⏳ ' + (mine.length > 1 ? mine.length + ' of your outfits are' : 'Your outfit is') + ' waiting for approval</div>' : '') +
      (wall.length ? '<div class="outfits__grid">' + wall.map(function(o, i){
        return '<div class="ofit" data-id="' + esc(o.id) + '">' +
          '<div class="ofit__img" style="background-image:url(\'' + esc(o.image_url) + '\')">' + (i === 0 && o.fires > 0 ? '<span class="ofit__crown">👑</span>' : '') + '</div>' +
          '<div class="ofit__meta"><span class="ofit__name">' + esc(o.name) + '</span>' +
          '<button type="button" class="ofit__fire' + (o.fired ? ' on' : '') + '" data-a="fire" data-id="' + esc(o.id) + '">🔥 <b>' + o.fires + '</b></button></div>' +
          (o.caption ? '<div class="ofit__cap">' + esc(o.caption) + '</div>' : '') +
          (o.mine ? '' : '<button type="button" class="ofit__more" data-a="report" data-id="' + esc(o.id) + '">Report</button>') +
        '</div>';
      }).join('') + '</div>' : emptyStateHtml('👗', 'Be the first', 'No outfits yet this week. Post yours and set the bar.', '', '')) +
    '</div>';
  }
  function showForm(previewUrl, blob){
    el.querySelector('#ofForm').innerHTML = '<div class="ofform"><div class="ofform__img" style="background-image:url(\'' + previewUrl + '\')"></div>' +
      '<input type="text" id="ofCap" maxlength="80" placeholder="Caption (optional) e.g. Black & gold for Roza">' +
      '<label class="ofform__ok"><input type="checkbox" id="ofOk"> AGS may feature this photo on Instagram and in the app</label>' +
      '<div class="onb__err" id="ofErr"></div>' +
      '<button type="button" class="btn btn--solid" data-a="send">Send for approval</button><button type="button" class="onb__skip" data-a="cancel">Cancel</button></div>';
    el._blob = blob;
  }
  render();
  await load(); render();
  const file = el.querySelector('#ofFile');
  el.addEventListener('change', async function(e){
    if(e.target.id !== 'ofFile' || !e.target.files || !e.target.files[0]) return;
    try{
      const blob = await new Promise(function(res, rej){ const img = new Image(), url = URL.createObjectURL(e.target.files[0]); img.onload = function(){
        const sc = Math.min(1, 1080 / img.naturalWidth), c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * sc); c.height = Math.round(img.naturalHeight * sc);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url); c.toBlob(function(b){ b ? res(b) : rej(); }, 'image/jpeg', 0.85); }; img.onerror = rej; img.src = url; });
      showForm(URL.createObjectURL(blob), blob);
    } catch(err){}
  });
  el.addEventListener('click', async function(e){
    const b = e.target.closest('[data-a]'); if(!b) return;
    const a = b.dataset.a;
    if(a === 'close'){ el.remove(); document.body.style.overflow = ''; return; }
    if(!currentUser && a !== 'close'){ el.remove(); document.body.style.overflow = ''; lockAppBehindGate(); return; }
    if(a === 'post'){ el.querySelector('#ofFile').click(); return; }
    if(a === 'cancel'){ el.querySelector('#ofForm').innerHTML = ''; el._blob = null; return; }
    if(a === 'send'){
      const err = el.querySelector('#ofErr');
      if(!el.querySelector('#ofOk').checked){ err.textContent = 'Please tick the box to post.'; return; }
      b.disabled = true; b.textContent = 'Uploading…';
      try{
        const path = currentUser.id + '/outfit-' + Date.now() + '.jpg';
        const up = await supabaseClient.storage.from('outfits').upload(path, el._blob, { contentType: 'image/jpeg' });
        if(up.error) throw up.error;
        const url = supabaseClient.storage.from('outfits').getPublicUrl(path).data.publicUrl;
        const ins = await supabaseClient.from('outfits').insert({ image_url: url, caption: (el.querySelector('#ofCap').value || '').trim().slice(0, 80) || null });
        if(ins.error) throw ins.error;
        haptic('success');
        await load(); render();
        const p = el.querySelector('.outfits__pending'); if(p) p.textContent = '✅ Sent! We’ll put it live after a quick check.';
      } catch(x){ b.disabled = false; b.textContent = 'Send for approval'; err.textContent = /row-level/i.test((x && x.message) || '') ? 'You can post 3 outfits per day.' : 'Upload failed. Please try again.'; }
      return;
    }
    if(a === 'fire'){
      const r = await supabaseClient.rpc('toggle_fire', { p_outfit: b.dataset.id });
      if(r.data && r.data.ok){ b.classList.toggle('on', r.data.fired); b.querySelector('b').textContent = r.data.fires; if(r.data.fired) haptic('light'); }
      return;
    }
    if(a === 'report'){
      const o = wall.find(function(x){ return x.id === b.dataset.id; });
      if(o && o.user_id){ try{ await supabaseClient.from('salon_reports').insert({ reporter_id: currentUser.id, reported_id: o.user_id, reason: 'Outfit check photo ' + o.id }); } catch(x){} }
      b.textContent = 'Reported ✓'; b.disabled = true;
      return;
    }
  });
}
(function(){
  try{ renderOutfitEntry(); } catch(e){}
  try{ if(/[?&]outfits=1/.test(location.search)) setTimeout(openOutfits, 1300); } catch(e){}
})();


/* ---------- Apple Wallet pass ----------
   Approved guests on an iPhone get "Add to Apple Wallet". The server checks
   the request belongs to them and returns a signed .pkpass link; Safari then
   shows Apple's "Add pass" sheet. The pass pops up on the lock screen on the
   night itself. Hidden until AGS has set up the pass certificate. */
var WALLET_ON = false;
function walletAvailable(){ return WALLET_ON && isIosDevice(); }
(function(){
  try{
    if(!isIosDevice()) return;
    fetch(API_BASE + '/api/ags?fn=wallet-status').then(function(r){ return r.json(); }).then(function(d){
      if(d && d.enabled){ WALLET_ON = true; try{ renderNextNight(); } catch(e){} }
    }).catch(function(){});
  } catch(e){}
})();
async function addToWallet(requestId, btn){
  if(!supabaseClient || !requestId) return;
  const label = btn ? btn.innerHTML : '';
  if(btn){ btn.disabled = true; btn.classList.add('is-busy'); }
  try{
    const { data } = await supabaseClient.auth.getSession();
    const token = data && data.session && data.session.access_token;
    const res = await fetch(API_BASE + '/api/ags?fn=wallet-link', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ id: requestId })
    });
    const j = await res.json();
    if(!j || !j.ok || !j.url) throw new Error(j && j.reason || 'failed');
    try{ haptic('light'); } catch(e){}
    window.location.href = j.url;
  } catch(e){
    window.alert(String(e && e.message) === 'not_approved' ? 'Your spot isn’t confirmed yet. You can add it to Wallet once you’re approved.' : 'Could not create your Wallet pass right now. Please try again.');
  } finally {
    if(btn){ setTimeout(function(){ btn.disabled = false; btn.classList.remove('is-busy'); }, 1500); }
  }
}

/* ---------- Weekend planner ----------
   "Plan your weekend": the parties of the coming Fri/Sat/Sun with an open
   guestlist, grouped per night. Pick one per night and request them all in
   one tap with your saved details (just you). Bringing friends, or no saved
   details yet, goes through the normal form. Card on the home screen from
   Wednesday till Saturday; push on Thursday evening; deep link ./?plan=1. */
function weekendDates(){
  const today = todayAmsterdam();
  const d = new Date(today + 'T12:00:00Z');
  const dow = d.getUTCDay(); // 0 Sun .. 6 Sat
  const toFri = dow === 0 ? -2 : dow === 6 ? -1 : 5 - dow;
  const out = [];
  for(let i = 0; i < 3; i++){
    const x = new Date(d.getTime() + (toFri + i) * 864e5).toISOString().slice(0, 10);
    if(x >= today) out.push(x);
  }
  return out;
}
function plannerEvents(date){
  return EVENTS.filter(function(ev){
    if(ev.date !== date || !eventVisible(ev) || isPastEvent(ev)) return false;
    if(ev.guestlistStatus === 'none' || ev.guestlistStatus === 'closed' || ev.flyerPending) return false;
    const st = GUESTLIST_STATE[ev.id];
    if(st && guestlistUrgencyInfo(st).locked) return false;
    return true;
  });
}
function plannerDayLabel(iso){
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' });
}
function renderPlannerEntry(){
  const dow = new Date(todayAmsterdam() + 'T12:00:00Z').getUTCDay();
  const days = weekendDates();
  const n = days.reduce(function(s, d){ return s + plannerEvents(d).length; }, 0);
  let b = document.getElementById('plannerEntry');
  if(!(dow >= 3 && dow <= 6) || !n){ if(b) b.remove(); return; }
  if(!b){
    const anchor = document.getElementById('outfitEntry') || document.getElementById('featuredHero');
    if(!anchor || !anchor.parentNode) return;
    b = document.createElement('button'); b.type = 'button'; b.id = 'plannerEntry'; b.className = 'outfit-entry planner-entry';
    anchor.parentNode.insertBefore(b, anchor);
    b.addEventListener('click', openPlanner);
  }
  b.innerHTML = '<span class="outfit-entry__icon">🗓️</span><span class="outfit-entry__txt"><small>This weekend</small><b>Plan your weekend</b><em>' + n + ' parties · pick your nights, one tap for all</em></span><span class="outfit-entry__go">→</span>';
}
async function openPlanner(){
  if(document.getElementById('plannerPage')) return;
  const el = document.createElement('div'); el.className = 'outfits planner'; el.id = 'plannerPage';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v == null ? '' : v).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const days = weekendDates();
  const pick = {}; // date -> event id
  let details = null, sent = null;
  if(currentUser){ try{ details = await savedGuestDetails(); } catch(e){} }
  const mine = function(ev){ return (nextNightRows || []).find(function(r){ return r.event_name === ev.name && String(r.event_date).slice(0, 10) === ev.date; }); };
  function tag(ev){
    const st = GUESTLIST_STATE[ev.id];
    const info = st ? guestlistUrgencyInfo(st) : null;
    return info && info.label ? info.label : 'Limited places';
  }
  function card(ev){
    const r = mine(ev), on = pick[ev.date] === ev.id;
    const state = r ? (String(r.status || '').toLowerCase() === 'approved' ? '✓ You’re on the list' : '⏳ Requested') : '';
    return '<button type="button" class="pl-card' + (on ? ' on' : '') + (r ? ' is-mine' : '') + '" data-a="pick" data-id="' + esc(ev.id) + '"' + (r ? ' disabled' : '') + '>' +
      '<span class="pl-card__img" style="background-image:url(\'' + esc(webpOf(ev.image) || ev.image || '') + '\')">' + (on ? '<i class="pl-card__tick">✓</i>' : '') + '</span>' +
      '<span class="pl-card__txt"><b>' + esc(ev.name) + '</b><span>' + esc(eventVenueName(ev)) + (ev.time ? ' · ' + esc(ev.time) : '') + '</span>' +
      '<em class="' + (state ? 'is-state' : '') + '">' + esc(state || tag(ev)) + '</em></span></button>';
  }
  function render(){
    const chosen = days.map(function(d){ return pick[d] ? EVENTS.find(function(e){ return e.id === pick[d]; }) : null; }).filter(Boolean);
    if(sent){
      el.innerHTML = '<div class="outfits__inner"><button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
        '<small class="nye__kicker">This weekend</small><h2>You’re set 🔑</h2>' +
        '<p class="outfits__intro">We review your requests and let you know per night as soon as you’re on the list.</p>' +
        '<div class="pl-done">' + sent.map(function(s){ return '<div class="pl-done__row ' + (s.ok ? 'ok' : 'err') + '"><b>' + esc(s.ev.name) + '</b><span>' + esc(plannerDayLabel(s.ev.date)) + '</span><em>' + (s.ok ? 'Requested ✓' : esc(s.msg || 'Could not send')) + '</em></div>'; }).join('') + '</div>' +
        '<button type="button" class="btn btn--solid pl-cta" data-a="close">Done</button></div>';
      return;
    }
    const any = days.some(function(d){ return plannerEvents(d).length; });
    el.innerHTML = '<div class="outfits__inner"><button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
      '<small class="nye__kicker">This weekend</small><h2>Plan your weekend</h2>' +
      '<p class="outfits__intro">Pick one party per night. One tap and you’re requested for all of them.</p>' +
      (any ? days.map(function(d){
        const list = plannerEvents(d);
        if(!list.length) return '';
        return '<div class="pl-day"><div class="pl-day__head"><b>' + esc(plannerDayLabel(d)) + '</b>' + (pick[d] ? '<button type="button" class="pl-day__skip" data-a="skip" data-d="' + d + '">Skip this night</button>' : '<span>' + list.length + ' part' + (list.length > 1 ? 'ies' : 'y') + '</span>') + '</div>' +
          '<div class="pl-row">' + list.map(card).join('') + '</div></div>';
      }).join('') : emptyStateHtml('🗓️', 'Nothing open yet', 'No guestlists open for this weekend yet. We’ll let you know when they drop.', '', '')) +
      '<div class="pl-bar">' +
        (chosen.length
          ? '<div class="pl-bar__sum">' + chosen.map(function(e){ return '<span>' + esc(plannerDayLabel(e.date).split(' ')[0].slice(0, 3)) + ' · ' + esc(e.name) + '</span>'; }).join('') + '</div>'
          : '<div class="pl-bar__sum is-empty">Tap a party to add it to your weekend</div>') +
        '<button type="button" class="btn btn--solid pl-cta" data-a="send"' + (chosen.length ? '' : ' disabled') + '>' +
          (chosen.length ? 'Request ' + (chosen.length === 1 ? '1 night' : chosen.length + ' nights') : 'Request') + '</button>' +
        '<div class="pl-bar__who">' + (details ? 'As ' + esc(details.first_name + ' ' + details.last_name) + ' · just you · <button type="button" class="pl-link" data-a="friends">Bringing friends?</button>' : 'We’ll ask your details once, then it’s one tap.') + '</div>' +
        '<div class="err" id="plErr"></div>' +
      '</div></div>';
  }
  async function send(btn){
    const chosen = days.map(function(d){ return pick[d] ? EVENTS.find(function(e){ return e.id === pick[d]; }) : null; }).filter(Boolean);
    if(!chosen.length) return;
    if(!currentUser){ closePlanner(); switchTab('account'); return; }
    if(!details){ closePlanner(); goToFullForm(chosen[0], 0); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    const res = [];
    for(const ev of chosen){
      if(parseInt(details.age, 10) < eventMinAge(ev, details.gender) || (eventNeedsGender(ev) && !details.gender) || eventNeedsGuestEmails(ev)){
        res.push({ ev: ev, ok: false, msg: 'Needs the full form' }); continue;
      }
      const ok = await saveRequestToAccount({
        event: { name: ev.name, venue: ev.venue, date: ev.date },
        mainGuest: { firstName: details.first_name, lastName: details.last_name, age: String(details.age), instagram: details.instagram || 'None', phone: details.phone, email: details.email, gender: eventNeedsGender(ev) ? (details.gender || '') : '' },
        additionalGuests: [], totalGuests: 1, consent: true
      });
      res.push({ ev: ev, ok: !!ok, msg: ok ? '' : (lastSaveBlockMessage || 'Could not send') });
    }
    if(res.some(function(x){ return x.ok; })){ try{ AppSound.play('success'); } catch(e){} try{ haptic('success'); } catch(e){} }
    sent = res; render();
    try{ loadNextNight(); } catch(e){}
    try{ if(typeof loadMyRequests === 'function') loadMyRequests(); } catch(e){}
  }
  function closePlanner(){ el.remove(); document.body.style.overflow = ''; }
  el.addEventListener('click', function(e){
    const t = e.target.closest('[data-a]'); if(!t) return;
    const a = t.getAttribute('data-a');
    if(a === 'close') return closePlanner();
    if(a === 'pick'){ const ev = EVENTS.find(function(x){ return x.id === t.getAttribute('data-id'); }); if(!ev) return; pick[ev.date] = pick[ev.date] === ev.id ? null : ev.id; try{ haptic('light'); } catch(x){} render(); return; }
    if(a === 'skip'){ pick[t.getAttribute('data-d')] = null; render(); return; }
    if(a === 'friends'){ const ev = days.map(function(d){ return pick[d] && EVENTS.find(function(x){ return x.id === pick[d]; }); }).filter(Boolean)[0] || plannerEvents(days[0])[0]; closePlanner(); if(ev) goToFullForm(ev, 1); return; }
    if(a === 'send') return send(t);
  });
  render();
}
(function(){
  try{ setTimeout(renderPlannerEntry, 1500); } catch(e){}
  try{ if(/[?&]plan=1/.test(location.search)) setTimeout(openPlanner, 1400); } catch(e){}
})();


/* ---------- High-end guestlist ----------
   Status wording, member number, host contact on the night, verified guests. */
function statusLabel(raw){
  const s = String(raw || 'Pending').trim().toLowerCase();
  if(s === 'pending') return 'Under review';
  if(s === 'approved') return 'On the list';
  if(s === 'declined') return 'Not this time';
  if(s === 'cancelled') return 'Cancelled';
  return raw;
}
var MY_MEMBER_NO = null, MY_VERIFIED = false;
async function loadMemberMeta(){
  if(!supabaseClient || !currentUser) return;
  try{
    const { data } = await supabaseClient.rpc('my_member_meta');
    const row = Array.isArray(data) ? data[0] : data;
    if(row){ MY_MEMBER_NO = row.member_no || null; MY_VERIFIED = !!row.verified; }
    renderVerifiedBadge();
  } catch(e){}
}
function renderVerifiedBadge(){
  const host = document.getElementById('accountUserName');
  if(!host) return;
  let b = document.getElementById('verifiedBadge');
  if(!MY_VERIFIED && !MY_MEMBER_NO){ if(b) b.remove(); return; }
  if(!b){ b = document.createElement('div'); b.id = 'verifiedBadge'; b.className = 'verified-badge'; host.insertAdjacentElement('afterend', b); }
  b.innerHTML = (MY_MEMBER_NO ? '<span class="verified-badge__no">AGS Nº ' + String(MY_MEMBER_NO).padStart(4, '0') + '</span>' : '') +
    (MY_VERIFIED ? '<span class="verified-badge__v">✓ Verified guest</span>' : '');
}
function hostButtonHtml(r){
  const name = [r.first_name, r.last_name].filter(Boolean).join(' ');
  const msg = 'Hi AGS, I’m on the list for ' + r.event_name + ' tonight' + (name ? ' (' + name + (r.total_guests > 1 ? ' +' + (r.total_guests - 1) : '') + ')' : '') + '.';
  return '<a class="host-btn" href="https://wa.me/31644948562?text=' + encodeURIComponent(msg) + '" target="_blank" rel="noopener">' +
    '<span class="host-btn__dot"></span><span class="host-btn__txt"><small>Your host tonight</small>Message AGS on WhatsApp</span><span class="host-btn__go">→</span></a>';
}

/* ---------- Concierge ----------
   "Not sure where to go?" Three quick questions (when, vibe, who) and the
   best 3 parties with an open guestlist, explained, with one tap to request.
   No AI: scores parties on date, music, the clubs you follow, what you went
   to before (forYouScore) and whether there is room for your group. */
const CONCIERGE_GENRES = ['Afro house', 'Amapiano', 'House', 'Hits', 'New wave'];
const KEURTEN_AVATAR = 'concierge-avatar.png';
function renderConciergeEntry(){
  let b = document.getElementById('conciergeEntry');
  if(b) return;
  const anchor = document.getElementById('plannerEntry') || document.getElementById('outfitEntry') || document.getElementById('featuredHero');
  if(!anchor || !anchor.parentNode) return;
  b = document.createElement('button'); b.type = 'button'; b.id = 'conciergeEntry'; b.className = 'outfit-entry concierge-entry';
  b.innerHTML = '<span class="cc-face" style="background-image:url(\'' + KEURTEN_AVATAR + '\')"></span><span class="outfit-entry__txt"><small>Ask Keurten · Founder of AGS</small><b>Not sure where to go?</b><em>Tell me your vibe, I’ll pick your night</em></span><span class="outfit-entry__go">→</span>';
  anchor.parentNode.insertBefore(b, anchor);
  b.addEventListener('click', openConcierge);
}
function conciergeDates(when){
  const today = todayAmsterdam();
  const add = function(n){ return new Date(new Date(today + 'T12:00:00Z').getTime() + n * 864e5).toISOString().slice(0, 10); };
  if(when === 'tonight') return [today];
  if(when === 'tomorrow') return [add(1)];
  if(when === 'weekend') return weekendDates();
  return null; // any night (next 3 weeks)
}
function conciergePick(ans){
  const dates = conciergeDates(ans.when);
  const today = todayAmsterdam();
  const limit = new Date(Date.now() + 21 * 864e5).toISOString().slice(0, 10);
  const size = ans.size || 1;
  const list = EVENTS.filter(function(ev){
    if(!eventVisible(ev) || isPastEvent(ev) || ev.flyerPending) return false;
    if(ev.guestlistStatus === 'none' || ev.guestlistStatus === 'closed') return false;
    if(dates ? dates.indexOf(ev.date) < 0 : (ev.date < today || ev.date > limit)) return false;
    return true;
  }).map(function(ev){
    const st = GUESTLIST_STATE[ev.id], info = st ? guestlistUrgencyInfo(st) : null;
    if(info && info.locked) return null;
    const fits = !info || info.spotsLeft >= size;
    const g = eventGenres(ev);
    const match = ans.genres.length ? g.filter(function(x){ return ans.genres.indexOf(x) >= 0; }) : [];
    if(ans.genres.length && !match.length) return null;
    const venue = eventVenueName(ev);
    let score = match.length * 4 + forYouScore(ev) + (MY_FOLLOWS.has(venue) ? 3 : 0) + (fits ? 3 : -6);
    score -= (new Date(ev.date) - new Date(today)) / 864e5 * 0.15; // sooner is a little better
    const why = [];
    if(match.length) why.push(match.join(' & '));
    else if(g.length) why.push(g.slice(0, 2).join(' & '));
    if(MY_FOLLOWS.has(venue)) why.push('you follow ' + venue);
    else if(MY_PREFS && MY_PREFS.names[ev.name]) why.push('you’ve been before');
    if(size > 1) why.push(fits ? 'room for ' + size : 'tight for ' + size);
    if(info && info.label) why.push(info.label.toLowerCase());
    return { ev: ev, score: score, why: why, fits: fits };
  }).filter(Boolean).sort(function(a, b){ return b.score - a.score; });
  if(list.length) return list.slice(0, 3);
  // Nothing fits? Always name a party:
  // 1) Behind Closed Doors on that night, 2) any party that night,
  // 3) the next Behind Closed Doors, 4) the next party at all.
  const live = function(ev){ return eventVisible(ev) && !isPastEvent(ev) && !ev.flyerPending; };
  const inRange = function(ev){ return dates ? dates.indexOf(ev.date) >= 0 : (ev.date >= today && ev.date <= limit); };
  const soonest = function(arr){ return arr.sort(function(a, b){ return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; })[0]; };
  const isBcd = function(ev){ return ev.name === 'Behind Closed Doors'; };
  let fb = soonest(EVENTS.filter(function(ev){ return live(ev) && isBcd(ev) && inRange(ev); }));
  let other = false;
  if(!fb) fb = soonest(EVENTS.filter(function(ev){ return live(ev) && inRange(ev); }));
  if(!fb){ other = true; fb = soonest(EVENTS.filter(function(ev){ return live(ev) && isBcd(ev) && ev.date >= today; })) || soonest(EVENTS.filter(function(ev){ return live(ev) && ev.date >= today; })); }
  if(!fb) return [];
  const st = GUESTLIST_STATE[fb.id], info = st ? guestlistUrgencyInfo(st) : null;
  const noList = fb.guestlistStatus === 'none' || fb.guestlistStatus === 'closed' || (info && info.locked);
  const why = [isBcd(fb) ? 'our go-to night' : 'the best option ' + (other ? 'coming up' : 'that night')];
  if(eventGenres(fb).length) why.push(eventGenres(fb).slice(0, 2).join(' & '));
  if(noList) why.push(fb.ticketUrl ? 'tickets available' : 'guestlist full');
  return [{ ev: fb, score: 0, why: why, fits: !noList, fallback: true, otherNight: other }];
}
function openConcierge(){
  if(document.getElementById('conciergePage')) return;
  const el = document.createElement('div'); el.className = 'outfits concierge'; el.id = 'conciergePage';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v == null ? '' : v).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const first = (currentUser && currentUser.user_metadata && currentUser.user_metadata.first_name) || '';
  const ans = { when: null, genres: [], size: null };
  let step = 0, sessionId = null, asked = false, lastPicks = [];
  // Every finished session is logged (the AGS team gets a notification).
  async function logSession(picks, message){
    if(!supabaseClient || !currentUser) return null;
    try{
      const { data } = await supabaseClient.rpc('concierge_log', { p_answers: { when: ans.when, genres: ans.genres, size: ans.size }, p_picks: picks.map(function(p){ return p.ev.name + ' (' + p.ev.date.slice(5) + ')'; }), p_message: message || null });
      return data || null;
    } catch(e){ return null; }
  }
  const bot = function(t){ return '<div class="cc-msg cc-msg--bot"><span class="cc-av" style="background-image:url(\'' + KEURTEN_AVATAR + '\')"></span><p>' + t + '</p></div>'; };
  const me = function(t){ return '<div class="cc-msg cc-msg--me"><p>' + esc(t) + '</p></div>'; };
  const WHEN = [['tonight', 'Tonight'], ['tomorrow', 'Tomorrow'], ['weekend', 'This weekend'], ['any', 'Any night']];
  const SIZE = [[1, 'Just me'], [2, 'With 1 friend'], [3, '3–4 of us'], [5, '5 or more']];
  function chips(list, key, multi){
    return '<div class="cc-chips">' + list.map(function(o){
      const on = multi ? ans.genres.indexOf(o[0]) >= 0 : false;
      return '<button type="button" class="cc-chip' + (on ? ' on' : '') + '" data-' + key + '="' + esc(o[0]) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function render(){
    let h = '<div class="outfits__inner"><button type="button" class="safe__close" data-a="close" aria-label="Close">✕</button>' +
      '<div class="cc-host"><span class="cc-face cc-face--lg" style="background-image:url(\'' + KEURTEN_AVATAR + '\')"></span><span><b>Keurten</b><small>Founder of Amsterdam Guestlist Service</small></span></div>' +
      '<h2>Your night, sorted</h2><div class="cc-thread">' +
      bot('Hey' + (first ? ' ' + esc(first) : '') + ', Keurten here 👋 Let me find your night. When are you going out?');
    if(step === 0) h += chips(WHEN, 'when');
    else {
      h += me(WHEN.find(function(w){ return w[0] === ans.when; })[1]) + bot('What’s the vibe? Pick as many as you like.');
      if(step === 1) h += chips(CONCIERGE_GENRES.map(function(g){ return [g, g]; }), 'genre', true) +
        '<div class="cc-row"><button type="button" class="cc-link" data-a="anyvibe">Anything good</button><button type="button" class="btn btn--solid cc-next" data-a="vibe"' + (ans.genres.length ? '' : ' disabled') + '>Next</button></div>';
      else {
        h += me(ans.genres.length ? ans.genres.join(', ') : 'Anything good') + bot('Who’s coming?');
        if(step === 2) h += chips(SIZE, 'size');
        else {
          h += me(SIZE.find(function(s){ return s[0] === ans.size; })[1]);
          const picks = conciergePick(ans);
          if(!sessionId && !asked){ asked = true; lastPicks = picks; logSession(picks).then(function(id){ sessionId = id; }); }
          if(!picks.length){
            h += bot('Nothing open that matches right now. Try another night or vibe, or ask me below. Turn on notifications so you hear first when new parties drop.') +
              '<button type="button" class="btn cc-next" data-a="restart">Start over</button>';
          } else {
            h += bot(picks[0].fallback ? (picks[0].otherNight ? 'Nothing on that night, but this is where I’d be next:' : 'Nothing matches exactly, but this is where I’d be:') : picks.length === 1 ? 'This is the one I’d go to:' : 'Here’s where I’d go' + (picks[0].fits ? '' : ' (lists are filling up)') + ':');
            h += '<div class="cc-picks">' + picks.map(function(p, i){
              const ev = p.ev;
              return '<div class="cc-pick' + (i === 0 ? ' is-top' : '') + '">' +
                '<span class="cc-pick__img" style="background-image:url(\'' + esc(webpOf(ev.image) || ev.image || '') + '\')">' + (i === 0 ? '<i>Top pick</i>' : '') + '</span>' +
                '<div class="cc-pick__tx"><b>' + esc(ev.name) + '</b><span>' + esc(plannerDayLabel(ev.date)) + (ev.time ? ' · ' + esc(ev.time) : '') + ' · ' + esc(eventVenueName(ev)) + '</span>' +
                '<em>' + esc(p.why.join(' · ')) + '</em>' +
                '<div class="cc-pick__act">' + (p.fallback && !p.fits && ev.ticketUrl ? '<a class="btn btn--solid" href="' + esc(ev.ticketUrl) + '" target="_blank" rel="noopener">Tickets</a>' : '<button type="button" class="btn btn--solid" data-a="req" data-id="' + esc(ev.id) + '">Request access</button>') + '<button type="button" class="cc-link" data-a="view" data-id="' + esc(ev.id) + '">View party</button></div></div></div>';
            }).join('') + '</div><button type="button" class="cc-link cc-again" data-a="restart">Ask again</button>';
          }
          h += askBox();
        }
      }
    }
    el.innerHTML = h + '</div></div>';
    const last = el.querySelector('.cc-thread > :last-child'); if(last && step > 0) last.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  let sentQ = null;
  function askBox(){
    if(sentQ) return me(sentQ) + bot('Got it! I’ll answer you personally in your inbox' + (('Notification' in window && Notification.permission === 'granted') ? ' and you’ll get a notification.' : '.'));
    return '<div class="cc-ask"><b>Still unsure? Ask me directly.</b><span>A birthday, a big group, a table, a dress code question… I answer personally.</span>' +
      (currentUser
        ? '<textarea id="ccQ" maxlength="600" rows="3" placeholder="Type your question…"></textarea><button type="button" class="btn btn--solid" data-a="ask">Send to Keurten</button>'
        : '<button type="button" class="btn" data-a="login">Log in to ask</button>') + '</div>';
  }
  function close(){ el.remove(); document.body.style.overflow = ''; }
  el.addEventListener('click', function(e){
    const w = e.target.closest('[data-when]'); if(w){ ans.when = w.getAttribute('data-when'); step = 1; try{ haptic('light'); } catch(x){} return render(); }
    const g = e.target.closest('[data-genre]'); if(g){ const v = g.getAttribute('data-genre'), i = ans.genres.indexOf(v); if(i >= 0) ans.genres.splice(i, 1); else ans.genres.push(v); return render(); }
    const s = e.target.closest('[data-size]'); if(s){ ans.size = Number(s.getAttribute('data-size')); step = 3; try{ haptic('success'); } catch(x){} return render(); }
    const t = e.target.closest('[data-a]'); if(!t) return;
    const a = t.getAttribute('data-a');
    if(a === 'close') return close();
    if(a === 'anyvibe'){ ans.genres = []; step = 2; return render(); }
    if(a === 'vibe'){ step = 2; return render(); }
    if(a === 'restart'){ ans.when = null; ans.genres = []; ans.size = null; step = 0; sessionId = null; asked = false; sentQ = null; return render(); }
    if(a === 'login'){ close(); switchTab('account'); return; }
    if(a === 'ask'){
      const q = (document.getElementById('ccQ') || {}).value || '';
      if(!q.trim()) return;
      t.disabled = true; t.textContent = 'Sending…';
      logSession(lastPicks, q.trim()).then(function(id){
        if(!id){ t.disabled = false; t.textContent = 'Send to Keurten'; return; }
        sentQ = q.trim(); try{ haptic('success'); } catch(x){} render();
      });
      return;
    }
    const ev = EVENTS.find(function(x){ return x.id === t.getAttribute('data-id'); }); if(!ev) return;
    close();
    if(a === 'view') return openEventSheet(ev);
    if(a === 'req'){
      if(!currentUser){ switchTab('account'); return; }
      if(sessionId){ try{ supabaseClient.rpc('concierge_choose', { p_id: sessionId, p_event: ev.name + ' (' + ev.date.slice(5) + ')' }); } catch(x){} }
      if(ans.size > 1) return goToFullForm(ev, ans.size === 3 ? 2 : ans.size === 5 ? 4 : 1);
      tryQuickRequest(ev).then(function(took){ if(!took) goToFullForm(ev, 0); });
    }
  });
  render();
}
(function(){
  try{ setTimeout(renderConciergeEntry, 1700); } catch(e){}
  try{ if(/[?&]concierge=1/.test(location.search)) setTimeout(openConcierge, 1500); } catch(e){}
})();


/* ---------- Tab bar hides on scroll down, returns on scroll up ---------- */
(function(){
  let lastY = window.scrollY || 0, acc = 0, ticking = false;
  function show(){ document.body.classList.remove('tabbar-hidden'); }
  function update(){
    ticking = false;
    const y = Math.max(0, window.scrollY || 0);
    const dy = y - lastY; lastY = y;
    const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 40;
    if(y < 80 || atBottom){ acc = 0; return show(); }
    // only react after a small amount of movement in the same direction
    acc = (acc > 0) === (dy > 0) ? acc + dy : dy;
    if(acc > 24) document.body.classList.add('tabbar-hidden');
    else if(acc < -16) show();
  }
  window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive: true });
  // Always visible again after switching tabs or opening an overlay
  document.addEventListener('click', function(e){ if(e.target.closest && e.target.closest('.app-tabbar button')) show(); }, true);
})();

/* ---------- AGS Wrapped 2026 ----------
   "Your first season with AGS": story-style slides from my_wrapped(), ending
   in a 1080x1920 card to share. Works for brand-new members too (founding
   member + "your first night is still ahead"). Open from the home card in
   December, the push, or ./?wrapped=1. */
const WRAPPED_FROM = '2026-12-27';
function wrappedAvailable(){ return todayAmsterdam() >= WRAPPED_FROM || /[?&]wrapped=1/.test(location.search); }
function renderWrappedEntry(){
  let b = document.getElementById('wrappedEntry');
  if(!currentUser || !wrappedAvailable()){ if(b) b.remove(); return; }
  if(b) return;
  const anchor = document.getElementById('conciergeEntry') || document.getElementById('plannerEntry') || document.getElementById('featuredHero');
  if(!anchor || !anchor.parentNode) return;
  b = document.createElement('button'); b.type = 'button'; b.id = 'wrappedEntry'; b.className = 'outfit-entry wrapped-entry';
  b.innerHTML = '<span class="outfit-entry__icon">🎁</span><span class="outfit-entry__txt"><small>AGS Wrapped 2026</small><b>Your first season with us</b><em>Tap to see your year · share it to your story</em></span><span class="outfit-entry__go">→</span>';
  anchor.parentNode.insertBefore(b, anchor);
  b.addEventListener('click', openWrapped);
}
function wrappedSound(w){
  const g = (w.genres && w.genres[0]) || (w.top_party && eventGenres({ name: w.top_party })[0]) || (w.top_viewed && eventGenres({ name: w.top_viewed })[0]) || '';
  return g;
}
function wrappedTier(p){ return p >= 300 ? 'VIP' : p >= 150 ? 'Gold' : p >= 50 ? 'Silver' : 'Member'; }
async function openWrapped(){
  if(!supabaseClient || !currentUser){ switchTab('account'); return; }
  if(document.getElementById('wrappedPage')) return;
  const el = document.createElement('div'); el.className = 'wrapped'; el.id = 'wrappedPage';
  el.innerHTML = '<div class="wrapped__loading">Loading your year…</div>';
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  const esc = function(v){ return String(v == null ? '' : v).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  let w = null;
  try{ const { data } = await supabaseClient.rpc('my_wrapped'); w = data; } catch(e){}
  if(!w){ el.innerHTML = '<div class="wrapped__loading">Couldn’t load your Wrapped. Try again later.<br><br><button type="button" class="btn" data-w="close">Close</button></div>'; el.addEventListener('click', function(e){ if(e.target.closest('[data-w="close"]')){ el.remove(); document.body.style.overflow = ''; } }); return; }
  const first = (currentUser.user_metadata && currentUser.user_metadata.first_name) || '';
  const no = w.member_no ? 'Nº ' + String(w.member_no).padStart(4, '0') : '';
  const sound = wrappedSound(w);
  const fmtDay = function(d){ return new Date(String(d) + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }); };
  const slides = [];
  slides.push({ cls: 'w-intro', html: '<small>AGS Wrapped</small><h1>2026</h1><p>' + (first ? esc(first) + ', this' : 'This') + ' was your first season with Amsterdam Guestlist Service.</p><span class="w-tap">Tap to start</span>' });
  if(no) slides.push({ cls: 'w-no', html: '<small>Founding member</small><div class="w-big">' + esc(no) + '</div><p>You’re one of the first ' + (w.members > 300 ? Math.ceil(w.members / 100) * 100 : w.members) + ' members of AGS. Remember that number.</p>' });
  if(w.nights > 0){
    slides.push({ cls: 'w-nights', html: '<small>Nights on the list</small><div class="w-big">' + w.nights + '</div><p>' + (w.nights === 1 ? 'night' : 'nights') + ' out with AGS.' + (w.first_night ? ' It started with ' + esc(w.first_night.name) + ' on ' + esc(fmtDay(w.first_night.date)) + '.' : '') + '</p>' + (w.guests_brought > 0 ? '<p class="w-sub">And you brought ' + w.guests_brought + ' friend' + (w.guests_brought > 1 ? 's' : '') + ' along.</p>' : '') });
  } else {
    slides.push({ cls: 'w-nights', html: '<small>Nights on the list</small><div class="w-big">0</div><p>Your first night with AGS is still ahead. 2027 starts on the list.</p>' + (w.viewed > 0 ? '<p class="w-sub">You already checked out ' + w.viewed + ' part' + (w.viewed > 1 ? 'ies' : 'y') + (w.top_viewed ? ', ' + esc(w.top_viewed) + ' the most' : '') + '.</p>' : '') });
  }
  if(w.top_venue || w.top_party || sound){
    slides.push({ cls: 'w-spot', html: '<small>Your spot</small>' +
      (w.top_venue ? '<div class="w-mid">' + esc(w.top_venue) + '</div><p>was your club.</p>' : w.top_viewed ? '<div class="w-mid">' + esc(w.top_viewed) + '</div><p>caught your eye the most.</p>' : '') +
      (sound ? '<div class="w-mid w-mid--2">' + esc(sound) + '</div><p>was your sound.</p>' : '') });
  }
  if(w.top_pct){
    slides.push({ cls: 'w-rank', html: '<small>Your rank</small><div class="w-big">Top ' + w.top_pct + '%</div><p>of AGS guests this year.</p>' });
  }
  const extras = [];
  if(w.friends_invited > 0) extras.push(['👥', w.friends_invited + ' friend' + (w.friends_invited > 1 ? 's' : '') + ' joined through you']);
  if(w.fires > 0) extras.push(['🔥', w.fires + ' fire' + (w.fires > 1 ? 's' : '') + ' on your outfits']);
  if(w.points > 0) extras.push(['★', w.points + ' points · ' + wrappedTier(w.points)]);
  if(w.requests > 0) extras.push(['🔑', w.requests + ' request' + (w.requests > 1 ? 's' : '') + ' sent']);
  if(extras.length) slides.push({ cls: 'w-extra', html: '<small>Also this year</small><ul>' + extras.map(function(x){ return '<li><span>' + x[0] + '</span>' + esc(x[1]) + '</li>'; }).join('') + '</ul>' });
  const summary = [
    ['Member', no || 'AGS'],
    ['Nights', String(w.nights || 0)],
    ['Club', w.top_venue || (w.top_viewed ? w.top_viewed : '—')],
    ['Sound', sound || '—'],
    ['Rank', w.top_pct ? 'Top ' + w.top_pct + '%' : 'Founding member']
  ];
  slides.push({ cls: 'w-card', html: '<small>Your 2026</small><div class="w-card__box"><div class="w-card__top"><span>AGS WRAPPED</span><span>2026</span></div><h3>' + esc(first || 'My year') + '</h3>' +
    summary.map(function(r){ return '<div class="w-card__row"><span>' + esc(r[0]) + '</span><b>' + esc(r[1]) + '</b></div>'; }).join('') + '</div>' +
    '<button type="button" class="btn btn--solid" data-w="share">Share to your story</button><button type="button" class="btn" data-w="close">Close</button>' });
  let i = 0, timer = null;
  function render(){
    clearTimeout(timer);
    if(i < slides.length - 1) timer = setTimeout(function(){ if(document.getElementById('wrappedPage')){ i++; render(); } }, 5000);
    const s = slides[i];
    el.innerHTML = '<div class="wrapped__bars">' + slides.map(function(_, k){ return '<i class="' + (k < i ? 'done' : k === i ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      '<button type="button" class="wrapped__x" data-w="close" aria-label="Close">✕</button>' +
      '<div class="wrapped__slide ' + s.cls + '">' + s.html + '</div>';
  }
  function close(){ clearTimeout(timer); el.remove(); document.body.style.overflow = ''; }
  el.addEventListener('click', function(e){
    const a = e.target.closest('[data-w]');
    if(a){
      const k = a.getAttribute('data-w');
      if(k === 'close') return close();
      if(k === 'share') return shareWrapped(first, summary, a);
      return;
    }
    if(i === slides.length - 1) return;
    const left = e.clientX < window.innerWidth * 0.3;
    i = left ? Math.max(0, i - 1) : Math.min(slides.length - 1, i + 1);
    try{ haptic('light'); } catch(x){}
    render();
  });
  render();
}
async function makeWrappedImage(name, rows){
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(540, 700, 80, 540, 900, 1200); g.addColorStop(0, '#2a1f0c'); g.addColorStop(1, '#050403');
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920);
  try{ await document.fonts.ready; } catch(e){}
  const gold = x.createLinearGradient(0, 0, 1080, 0); gold.addColorStop(0, '#f3dc97'); gold.addColorStop(1, '#b98f32');
  x.textAlign = 'center';
  x.fillStyle = '#d4b25c'; x.font = '700 34px Inter, -apple-system, sans-serif';
  x.fillText('A G S   W R A P P E D', 540, 300);
  x.fillStyle = gold; x.font = '400 220px "Cormorant Garamond", Georgia, serif'; x.fillText('2026', 540, 520);
  x.fillStyle = '#fff'; x.font = '600 64px Inter, -apple-system, sans-serif'; x.fillText(name || 'My year', 540, 660);
  // card
  x.strokeStyle = 'rgba(233,209,139,.55)'; x.lineWidth = 3;
  const top = 760, h = 820; if(x.roundRect){ x.beginPath(); x.roundRect(110, top, 860, h, 40); x.stroke(); } else x.strokeRect(110, top, 860, h);
  rows.forEach(function(r, k){
    const y = top + 120 + k * 150;
    x.textAlign = 'left'; x.fillStyle = 'rgba(246,236,208,.6)'; x.font = '600 34px Inter, -apple-system, sans-serif'; x.fillText(r[0].toUpperCase(), 170, y);
    x.textAlign = 'right'; x.fillStyle = '#fff'; x.font = '600 54px Inter, -apple-system, sans-serif'; x.fillText(r[1], 910, y + 4);
    if(k < rows.length - 1){ x.fillStyle = 'rgba(233,209,139,.18)'; x.fillRect(170, y + 50, 740, 2); }
  });
  x.textAlign = 'center'; x.fillStyle = '#d4b25c'; x.font = '600 36px Inter, -apple-system, sans-serif';
  x.fillText('Amsterdam Guestlist Service', 540, 1730);
  x.fillStyle = 'rgba(255,255,255,.55)'; x.font = '400 30px Inter, -apple-system, sans-serif'; x.fillText('Get yours in the AGS app', 540, 1790);
  return await new Promise(function(res){ c.toBlob(res, 'image/png'); });
}
async function shareWrapped(name, rows, btn){
  const label = btn.textContent; btn.disabled = true; btn.textContent = 'Making your story…';
  try{
    const blob = await makeWrappedImage(name, rows);
    const file = new File([blob], 'ags-wrapped-2026.png', { type: 'image/png' });
    if(navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title: 'AGS Wrapped 2026', text: 'My 2026 with Amsterdam Guestlist Service 🔑' });
    else showStoryPreview(URL.createObjectURL(blob), file.name);
  } catch(e){}
  btn.disabled = false; btn.textContent = label;
}
(function(){
  try{ setTimeout(renderWrappedEntry, 1900); } catch(e){}
  try{ if(/[?&]wrapped=1/.test(location.search)) setTimeout(openWrapped, 1800); } catch(e){}
})();

/* ---------- Daily drop ----------
   Every day at 16:00 one small perk drops in the app, for the first few who
   claim it: bonus points, priority review for a party, a free +1… The card
   on the home screen counts down to the drop, then shows how many are left.
   AGS sets the drop in the admin dashboard; on days without one there is an
   automatic small points drop. Data: today_drop() / claim_drop(id). */
let DROP = null, DROP_TIMER = null;
function dropIcon(kind){ return kind === 'points' ? '★' : kind === 'priority' ? '⚡' : kind === 'plusone' ? '+1' : '🎁'; }
async function loadDrop(){
  if(!supabaseClient) return;
  try{ const { data } = await supabaseClient.rpc('today_drop'); DROP = data || null; } catch(e){ DROP = null; }
  renderDropCard();
}
function renderDropCard(){
  let b = document.getElementById('dropCard');
  if(!DROP){ if(b) b.remove(); return; }
  if(!b){
    const anchor = document.getElementById('wrappedEntry') || document.getElementById('conciergeEntry') || document.getElementById('plannerEntry') || document.getElementById('featuredHero');
    if(!anchor || !anchor.parentNode) return;
    b = document.createElement('div'); b.id = 'dropCard'; b.className = 'drop-card';
    anchor.parentNode.insertBefore(b, anchor);
    b.addEventListener('click', function(e){
      const c = e.target.closest('[data-drop]'); if(c) return claimDrop(c);
      if(e.target.closest('[data-dropreq]')) dropRequest();
    });
  }
  const esc = function(v){ return String(v == null ? '' : v).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  const d = DROP;
  if(d.upcoming){
    const when = new Date(d.starts_at);
    const day = when.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'Europe/Amsterdam' });
    const tomorrow = new Date(Date.now() + 864e5).toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' }) === when.toLocaleDateString('en-CA', { timeZone: 'Europe/Amsterdam' });
    b.className = 'drop-card is-next';
    b.innerHTML = '<div class="drop-card__icon">🎁</div><div class="drop-card__tx"><small>The drop</small><b>Next drop ' + (tomorrow ? 'tomorrow' : day) + ' at 16:00</b><em>Every Monday, Wednesday and Friday. A perk for the first few who claim it.</em></div>';
    clearTimeout(DROP_TIMER); return;
  }
  const left = Math.max(0, (d.max_claims || 0) - (d.claimed || 0));
  const startMs = Date.parse(d.starts_at), live = Date.now() >= startMs;
  let state, action = '';
  const held = d.claim_state === 'held' && d.hold_until && Date.parse(d.hold_until) > Date.now();
  if(held){
    const ms = Date.parse(d.hold_until) - Date.now(), m = Math.floor(ms / 6e4), s2 = Math.floor(ms % 6e4 / 1e3);
    state = '<span class="drop-card__state is-held">Spot held for you · request within <b>' + m + ':' + String(s2).padStart(2, '0') + '</b> or it goes to the next person</span>';
    action = '<button type="button" class="btn btn--solid drop-card__btn" data-dropreq="1">Request now</button>';
  }
  else if(d.claim_state === 'confirmed' || (d.i_claimed && d.claim_state !== 'held')){ state = '<span class="drop-card__state is-won">✓ You got it' + (d.kind === 'priority' ? ' · your request is first in line' : d.kind === 'plusone' ? ' · your +1 is on us' : '') + '</span>'; }
  else if(!live){
    const ms = startMs - Date.now(), h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
    state = '<span class="drop-card__state">Drops in <b>' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0') + '</b></span>';
  } else if(left <= 0){ state = '<span class="drop-card__state is-gone">All gone · next drop ' + (new Date().getDay() === 5 ? 'Monday' : 'in two days') + ' at 16:00</span>'; }
  else {
    state = '<span class="drop-card__state is-live"><i></i>Live · ' + left + ' of ' + d.max_claims + ' left</span>';
    action = '<button type="button" class="btn btn--solid drop-card__btn" data-drop="' + esc(d.id) + '">' + (currentUser ? 'Claim it' : 'Log in to claim') + '</button>';
  }
  b.className = 'drop-card' + ((live && !d.i_claimed && left > 0) || held ? ' is-live' : '') + (d.i_claimed && !held ? ' is-won' : '');
  b.innerHTML = '<div class="drop-card__icon">' + esc(live || d.i_claimed ? dropIcon(d.kind) : '🎁') + '</div><div class="drop-card__tx"><small>Today’s drop</small>' +
    '<b>' + esc(live || d.i_claimed ? d.title : 'Something drops at 16:00') + '</b>' +
    '<em>' + esc(live || d.i_claimed ? (d.body || '') : 'First come, first served. Be quick.') + '</em>' + state + '</div>' + action;
  clearTimeout(DROP_TIMER);
  if((!live && !d.i_claimed) || held) DROP_TIMER = setTimeout(renderDropCard, 1000);
  else if(d.claim_state === 'held') DROP_TIMER = setTimeout(loadDrop, 500); // hold ran out: refresh
}
async function claimDrop(btn){
  if(!currentUser){ switchTab('account'); return; }
  btn.disabled = true; btn.textContent = 'Claiming…';
  let r = null;
  try{ const { data } = await supabaseClient.rpc('claim_drop', { p_id: Number(DROP.id) }); r = data; } catch(e){}
  if(r && r.ok){
    if(!r.already) DROP.claimed = (DROP.claimed || 0) + 1;
    DROP.i_claimed = true; DROP.claim_state = r.state || 'confirmed'; DROP.hold_until = r.hold_until || null;
    try{ haptic('success'); } catch(e){} try{ AppSound.play('success'); } catch(e){}
    renderDropCard();
    // Priority / +1 only count once they actually request the party: open it right away.
    if(DROP.claim_state === 'held') dropRequest();
    try{ if(DROP.kind === 'points' && typeof loadPoints === 'function') loadPoints(); } catch(e){}
  } else {
    if(r && r.reason === 'gone'){ DROP.claimed = DROP.max_claims; }
    renderDropCard();
  }
}
(function(){
  try{ setTimeout(loadDrop, 1500); } catch(e){}
  // refresh when the app comes back to the front (the drop may have gone live or sold out)
  document.addEventListener('visibilitychange', function(){ if(!document.hidden) loadDrop(); });
})();

function dropRequest(){
  if(!DROP || !DROP.event_name) return;
  const ev = EVENTS.find(function(e){ return e.name === DROP.event_name && e.date === String(DROP.event_date).slice(0, 10); });
  if(!ev){ switchTab('events'); return; }
  const after = function(){ setTimeout(loadDrop, 1500); };
  if(DROP.kind === 'plusone'){ goToFullForm(ev, 1); return; }
  tryQuickRequest(ev).then(function(took){ if(!took) goToFullForm(ev, 0); after(); }, function(){ goToFullForm(ev, 0); });
}
// After any request is sent, re-check the drop (a held spot becomes confirmed).
(function(){
  try{
    const orig = saveRequestToAccount;
    saveRequestToAccount = async function(){ const r = await orig.apply(this, arguments); if(r && DROP && DROP.claim_state === 'held') setTimeout(loadDrop, 1200); return r; };
  } catch(e){}
})();
