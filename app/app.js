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
    description: "BCD x Habits. Club: Salie, Rivaldo, Esma Zavina, hosted by Giac Orpheo. Lounge: Merlu, Devøra.",
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
    description: "Roox & Friends: Mannus, Dua Cultura, Kosta, Roox. 23:00 till 04:00. VIP tables: +31 6 53 29 19 95.",
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
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
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
    description: "House of Zenda at Chin Chin Club. 21+.",
    guestlistStatus: "none",
    ticketUrl: "#",
    badgeLabel: "", // empty = no badge on the card
    guestlistUrl: "#guestlist",
    minAge: 21,
    featured: false,
    countdownEnabled: false
  },
  {
    id: "club-fair-2026-11-20",
    name: "Club Fair",
    date: "2026-11-20",
    time: "23:00",
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
    description: "Roza at Chin Chin Club with Brayen, Djay, Mick Moscou and Pequeno. 23:00 till 05:00. Dresscode: black, white, red.",
    guestlistStatus: "limited",
    ticketUrl: "#",
    guestlistUrl: "#guestlist",
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
    description: "Amajoyo at Soul Kitchen with De La Noise, Terrie T (Afroholic), Pascal Morais, Dems . Rezaie and Noah Staal. 23:00 till 04:00. 23+.",
    guestlistStatus: "limited",
    minAge: 23,
    ticketUrl: "https://site.fourvenues.com/en/amsterdam-guestlist-service/events/amajoyo-27-11-2026-XBHW",
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

function eventMedia(ev, attrs){
  if((ev.flyerPending && !isPastEvent(ev)) || !ev.image){
    return autoPoster(ev);
  }
  return '<img src="' + ev.image + '" alt="' + ev.name + '"' + (attrs || '') + '>';
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
  return ' style="--flyer:url(\'' + String(ev.image).replace(/'/g, '%27') + '\')"';
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
  return new Date(ev.date + 'T' + ev.time).getTime() < Date.now();
}
function getSortedEvents(){
  return EVENTS.filter(function(ev){ return !isPastEvent(ev); }).sort(function(a, b){
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

  const pills = ['All'].concat(venues);
  wrap.innerHTML = pills.map(function(name, i){
    return '<button type="button" class="venue-filter__pill' + (i === 0 ? ' is-active' : '') + '" data-venue="' + name + '">' + name + '</button>';
  }).join('');

  wrap.querySelectorAll('.venue-filter__pill').forEach(function(btn){
    btn.addEventListener('click', function(){
      wrap.querySelectorAll('.venue-filter__pill').forEach(function(p){ p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      filterEventsByVenue(btn.dataset.venue);
    });
  });
}

function filterEventsByVenue(venueName){
  document.querySelectorAll('#eventList .event-card').forEach(function(card){
    const matches = venueName === 'All' || card.dataset.venue === venueName;
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
function updateEventsHeadline(){
  const h = document.getElementById('eventsHeadline');
  const first = getSortedEvents()[0];
  if(!h || !first) return;
  const label = nightGroupLabel(first.date);
  h.textContent = label === 'Tonight' ? 'Tonight in Amsterdam'
    : label === 'Coming up' ? 'Upcoming in Amsterdam' : 'This week in Amsterdam';
}
function renderEventList(){
  const list = document.getElementById('eventList');
  let lastGroup = '';
  updateEventsHeadline();
  list.innerHTML = getSortedEvents().map(function(ev, i){
    const featured = i === 0;
    const mediaContent = eventMedia(ev, featured ? ' decoding="async"' : ' loading="lazy" decoding="async"');
    const nextUp = featured
      ? '<div class="event-card__next"><span>Next up</span><span class="js-starts-in" data-start="' + eventStartTime(ev) + '">' + formatStartsIn(eventStartTime(ev) - Date.now()) + '</span></div>'
      : '';
    const group = nightGroupLabel(ev.date);
    const groupHead = group !== lastGroup ? '<div class="night-head" data-group="' + group + '"><span>' + group + '</span>' + (group === 'Coming up' ? '' : '<em>' + formatDate(ev.date) + '</em>') + '</div>' : '';
    lastGroup = group;
    return groupHead + (
      '<article class="event-card' + (featured ? ' is-featured' : '') + '" data-index="' + i + '" data-event-id="' + (ev.id || '') + '" data-venue="' + eventVenueName(ev) + '">' + nextUp +
        '<div class="event-card__media"' + flyerStyle(ev) + '>' + mediaContent + '</div>' +
        '<div class="event-card__body">' +
          '<div class="event-card__meta"><div class="event-card__date">' + formatDate(ev.date) + '</div>' + guestlistBadge(ev.guestlistStatus, ev.badgeLabel) + '</div>' +
          '<h3 class="event-card__name">' + ev.name + '</h3>' +
          '<div class="event-card__venue">' + ev.venue + '</div>' +
          '<button type="button" class="event-card__cta">View Details</button>' +
        '</div>' +
        '<div class="glive" style="display:none;"></div>' +
      '</article>'
    );
  }).join('');

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
}

function renderPastEventList(){
  const wrap = document.getElementById('pastEventsWrap');
  const list = document.getElementById('pastEventList');
  const pastEvents = getPastEvents();

  if(!pastEvents.length){ wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';

  list.innerHTML = pastEvents.map(function(ev){
    const mediaContent = ev.image ? '<img src="' + ev.image + '" alt="' + ev.name + '" loading="lazy" decoding="async">' : '';
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
        '<button type="button" class="glive__wait-btn" data-event-id="' + eventId + '"' + (pos ? ' disabled' : '') + '>' + (pos ? 'On the waitlist ✓' : 'Join the waitlist') + '</button>';
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
      (urgency.locked ? (msLeft <= 0 ? 'Guestlist closed' : 'Guestlist full') : 'Claim your spot') +
    '</button>';
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
  setInterval(loadLiveGuestlists, 20000);
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
    btn.textContent = 'Claim your spot';
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
  document.getElementById('sheetMedia').innerHTML = eventMedia(ev);
  document.getElementById('sheetMedia').setAttribute('style', flyerStyle(ev).replace(/^ style="|"$/g, ''));
  document.getElementById('sheetDate').textContent = formatDate(ev.date);
  document.getElementById('sheetName').textContent = ev.name;
  document.getElementById('sheetVenue').textContent = ev.venue;
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
      const handled = await tryQuickRequest(ev);
      glBtn.disabled = false;
      closeEventSheet();
      if(handled){ openQuickSheet(); return; }
      resetGuestlistFormForNext();
      switchTab('guestlist');
      preselectEvent(ev);
      prefillGuestlistForm();
      document.getElementById('glSpotNotice').style.display = 'none';
    });
  }

  document.getElementById('sheetOverlay').classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeEventSheet(){
  document.getElementById('sheetOverlay').classList.remove('is-open');
  document.body.style.overflow = '';
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
function pushPermission(){
  if(NATIVE_PUSH) return nativePushOn ? 'granted' : 'default';
  return (typeof Notification !== 'undefined') ? Notification.permission : 'denied';
}
async function nativePushSubscribe(){
  try{
    let perm = await NATIVE_PUSH.checkPermissions();
    if(perm.receive !== 'granted') perm = await NATIVE_PUSH.requestPermissions();
    if(perm.receive !== 'granted'){ nativePushOn = false; return false; }
    await new Promise(function(resolve){
      let done = false;
      NATIVE_PUSH.addListener('registration', async function(t){
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

if(notifyBtn && NATIVE_PUSH){
  notifyBtn.hidden = false;
  updateNotifyBtnState();
  notifyBtn.addEventListener('click', async function(){
    if(nativePushOn){
      try{ await NATIVE_PUSH.unregister(); } catch(e){}
      nativePushOn = false; await updateNotifyBtnState();
    } else { await subscribeToPush(); }
  });
} else if(notifyBtn && pushSupported){
  notifyBtn.hidden = false;
  navigator.serviceWorker.ready.then(updateNotifyBtnState);
  notifyBtn.addEventListener('click', async function(){
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if(existing && Notification.permission === 'granted'){
      await unsubscribeFromPush();
    } else {
      await subscribeToPush();
    }
  });
}

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
const APP_STORE_URL = 'https://apps.apple.com/app/id6835197252';
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
openEventFromLink(window.location.search);

/* ================================================================
   ACCOUNT — sign up, log in, sign out, my requests
   ================================================================ */
let currentUser = null;

function showAuthPanel(){
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
function showAccountPanel(user){
  claimReferralIfAny();
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
  linkPushSubscriptionToAccount();
  if(typeof salonInit === 'function') salonInit(user);
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
function checkNotificationGate(){
  const overlay = document.getElementById('notifyGateOverlay');
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
document.getElementById('notifyGateLaterBtn').addEventListener('click', closeNotifyGate);

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
async function loadMyRequests(){
  const list = document.getElementById('myRequestsList');
  if(!supabaseClient || !currentUser){ list.innerHTML = ''; return; }

  list.innerHTML = '<p class="my-requests__empty">Loading…</p>';
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
      list.innerHTML = '<p class="my-requests__empty">No requests yet — get on a guestlist to see it here.</p>';
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
        note = "We'll confirm your spot soon.";
      }
      const canEdit = statusLower === 'pending' && !(new Date(r.event_date + 'T23:59:59') < new Date());
      return (
        '<div class="request-card">' +
          '<div class="request-card__event">' + r.event_name + '</div>' +
          '<div class="request-card__meta">' + r.event_venue + ' · ' + formatDate(r.event_date) + '</div>' +
          '<span class="request-card__status' + statusClass + '">' + statusRaw + '</span>' +
          '<div class="request-card__note">' + note + '</div>' +
          (canEdit ? '<button type="button" class="request-card__edit" data-edit-id="' + r.id + '">Edit request</button>' : '') +
        '</div>'
      );
    }).join('');
    myRequestsCache = {};
    data.forEach(function(r){ myRequestsCache[r.id] = r; });
    list.querySelectorAll('[data-edit-id]').forEach(function(btn){
      btn.addEventListener('click', function(){ openEditRequest(btn.getAttribute('data-edit-id')); });
    });
  } catch(err){
    console.warn('Could not load requests.', err);
    list.innerHTML = '<p class="my-requests__empty">Could not load your requests.</p>';
  }
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
    return { firstName: g.firstName || '', lastName: g.lastName || '', age: g.age || '', email: g.email || '', gender: g.gender || '' };
  });
  renderEditGuests();
  document.getElementById('erError').style.display = 'none';
  document.getElementById('editReqOverlay').classList.add('is-open');
}
function closeEditRequest(){
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
    guests.push(out);
  }
  const btn = document.getElementById('erSave'); btn.disabled = true;
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
      .select('id,event_name,event_venue,event_date,status,total_guests')
      .eq('user_id', currentUser.id)
      .gte('event_date', todayAmsterdam())
      .order('event_date', { ascending: true });
    nextNightRows = (data || []).filter(function(r){
      const st = String(r.status || 'Pending').trim().toLowerCase();
      return st === 'pending' || st === 'approved';
    });
  } catch(err){ nextNightRows = []; }
  renderNextNight();
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
    : approved ? '<span class="next-night__pill is-confirmed">Confirmed</span>'
    : '<span class="next-night__pill">Under review</span>';
  const guests = (r.total_guests || 1) > 1 ? r.total_guests + ' people' : 'Just you';
  const meta = formatDate(String(r.event_date).slice(0, 10)) + (ev && ev.time ? ' · ' + ev.time : '') + ' · ' + escHtml(String(r.event_venue || '').split('·')[0].trim()) + ' · ' + guests;
  box.innerHTML =
    '<div class="next-night__eyebrow"><span>Your next night</span>' + pill + '</div>' +
    '<div class="next-night__name" id="nextNightName">' + escHtml(r.event_name) + '</div>' +
    '<div class="next-night__meta">' + meta + '</div>' +
    (approved ? '' : '<div class="next-night__meta" style="margin-top:-8px;">We’ll notify you as soon as you’re approved.</div>') +
    (tonight ? '<button type="button" class="btn btn--solid next-night__pass" id="nextNightPass">Open tonight\u2019s pass</button>' : '') +
    '<div class="next-night__actions">' +
      '<a class="btn" href="' + mapsLinkFor(r.event_venue) + '" target="_blank" rel="noopener">Route</a>' +
      (ev ? '<button type="button" class="btn" id="nextNightCal">Calendar</button>' : '') +
      (ev ? '<button type="button" class="btn" id="nextNightDetails">Details</button>' : '') +
    '</div>' +
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
    '<p class="quick-sheet__note">By confirming you confirm you are ' + eventMinAge(ev, d.gender) + '+ and agree to be contacted about this request.</p>' +
    '<div class="err" id="quickErr" style="margin-bottom:12px;"></div>' +
    '<div class="quick-sheet__btns">' +
      '<button type="button" class="btn btn--solid" id="quickConfirm">Confirm request</button>' +
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
      btn.disabled = false; btn.textContent = 'Confirm request';
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
    play: function(name){ if(enabled && sounds[name]){ try{ sounds[name](); } catch(e){} } },
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
  const ev = EVENTS.find(function(x){ return x.id === eventId; });
  if(!currentUser){ rememberEventAndLogin(ev); return; }
  btn.disabled = true; btn.textContent = 'Joining…';
  try{
    const { data, error } = await supabaseClient.rpc('join_guestlist_waitlist', { p_event_id: eventId, p_event_name: ev ? ev.name : null });
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
        '<div class="tonight__guest">' + escHtml(name) + '</div>' +
        '<div class="tonight__label">' + ((r.total_guests || 1) > 1 ? r.total_guests + ' people' : 'Just you') + '</div>' +
      '</div>' +
      '<ul class="tonight__rules"><li>Bring a valid photo ID for everyone</li><li>Arrive on time — the list closes when the room is full</li><li>Give the name above at the door</li></ul>' +
      '<div class="tonight__btns">' +
        '<a class="btn btn--solid" href="' + mapsLinkFor(r.event_venue) + '" target="_blank" rel="noopener">Route to the club</a>' +
        (ev ? '<button type="button" class="btn" id="tonightShare">Share to your story</button>' : '') +
      '</div>' +
    '</div>';
  // A points celebration already on screen waits until the pass closes.
  document.querySelectorAll('.points-toast').forEach(function(t){ pendingPointsToast += Number(t.dataset.n) || 0; t.remove(); });
  ov.classList.add('is-open'); document.body.style.overflow = 'hidden';
  AppSound.play('open');
  ov.querySelector('.tonight__close').addEventListener('click', closeTonight);
  const sh = document.getElementById('tonightShare'); if(sh) sh.addEventListener('click', function(){ shareStory(ev, sh); });
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
