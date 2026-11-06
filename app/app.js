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
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
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
    description: "An intimate late-night set in one of Amsterdam's most exclusive rooms.",
    guestlistStatus: "limited",
    ticketUrl: "https://shop.celebratix.io/?t=2trbkg",
    guestlistUrl: "#guestlist",
    flyerPending: true, // show the "line-up coming soon" card until the flyer is in
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
    id: "amajoyo-2026-11-27",
    name: "Amajoyo",
    date: "2026-11-27",
    time: "23:00",
    venue: "Soul Kitchen · Amsterdam",
    image: "events/amajoyo-2026-11-27.jpg",
    description: "Amajoyo at Soul Kitchen with De La Noise, Terrie T (Afroholic), Pascal Morais, Dems . Rezaie and Noah Staal. 23:00 till 04:00.",
    guestlistStatus: "limited",
    ticketUrl: "https://site.fourvenues.com/en/amsterdam-guestlist-service/events/amajoyo-27-11-2026-XBHW",
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
  if(ev.flyerPending && !isPastEvent(ev)){
    return '<div class="flyer-placeholder"><img src="icon-192.png" alt=""><span>Line-up coming soon</span></div>';
  }
  return ev.image ? '<img src="' + ev.image + '" alt="' + ev.name + '"' + (attrs || '') + '>' : '';
}
function guestlistBadge(status, label){
  if(status === 'limited') return '<span class="event-card__badge">Limited Guestlist</span>';
  if(status === 'closed') return '<span class="event-card__badge is-closed">' + (label || 'Guestlist Closed') + '</span>';
  if(status === 'soon') return '<span class="event-card__badge">Guestlist Coming Soon</span>';
  if(status === 'none') return '<span class="event-card__badge">' + (label || 'Tickets Only') + '</span>';
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
  document.querySelectorAll('.app-tabbar button').forEach(function(btn){
    btn.classList.toggle('is-active', btn.dataset.tab === name);
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
    if(btn.dataset.tab === 'guestlist'){ document.getElementById('glSpotNotice').style.display = 'none'; }
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
}

function renderEventList(){
  const list = document.getElementById('eventList');
  list.innerHTML = getSortedEvents().map(function(ev, i){
    const featured = i === 0;
    const mediaContent = eventMedia(ev, featured ? ' decoding="async"' : ' loading="lazy" decoding="async"');
    const nextUp = featured
      ? '<div class="event-card__next"><span>Next up</span><span class="js-starts-in" data-start="' + eventStartTime(ev) + '">' + formatStartsIn(eventStartTime(ev) - Date.now()) + '</span></div>'
      : '';
    return (
      '<article class="event-card' + (featured ? ' is-featured' : '') + '" data-index="' + i + '" data-event-id="' + (ev.id || '') + '" data-venue="' + eventVenueName(ev) + '">' + nextUp +
        '<div class="event-card__media">' + mediaContent + '</div>' +
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
    renderAllGuestlistPanels();
    startGuestlistTicker();
  } catch(err){
    console.warn('Could not load live guestlists.', err);
  }
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
    panelEl.className = 'glive is-locked';
    panelEl.innerHTML =
      '<div class="glive__label">' + closedText + '</div>' +
      '<div class="glive__spots">' + (ev && ev.ticketsSoldOut
        ? 'This event is completely sold out.'
        : 'There are no guestlist spots left.') + '</div>' +
      '<button type="button" class="glive__claim-btn" data-event-id="' + eventId + '" disabled>' + closedText + '</button>';
    return;
  }
  panelEl.className = 'glive' + (urgency.label ? ' is-urgent' : '');
  panelEl.innerHTML =
    '<div class="glive__label">Guestlist live' + (urgency.label ? ' · ' + urgency.label : '') + '</div>' +
    '<div class="glive__spots">' + urgency.spotsLeft + ' of ' + state.capacity + ' spots available</div>' +
    '<div class="glive__bar"><div class="glive__bar-fill" style="width:' + pct + '%;"></div></div>' +
    '<div class="glive__countdown">Closes in <span class="glive__timer">' + formatCountdown(msLeft) + '</span></div>' +
    '<button type="button" class="glive__claim-btn" data-event-id="' + eventId + '"' + (urgency.locked ? ' disabled' : '') + '>' +
      (urgency.locked ? (msLeft <= 0 ? 'Guestlist closed' : 'Guestlist full') : 'Claim your spot') +
    '</button>';
}

function renderAllGuestlistPanels(){
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
    switchTab('account');
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
      GUESTLIST_STATE[eventId].claimed_count = data.claimed_count;
      renderAllGuestlistPanels();
      closeEventSheet();
      switchTab('guestlist');
      if(ev) preselectEvent(ev);
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
async function shareEvent(ev){
  const text = ev.name + ' — ' + formatDateReadable(ev.date) + ' · ' + ev.venue +
    '\nGet on the guestlist via Amsterdam Guestlist Service 🖤';
  const data = { title: ev.name, text: text, url: APP_SHARE_URL };
  try{
    if(navigator.share){
      // Try to include the poster; fall back to text + link if the device
      // can't share files.
      const file = ev.image && window.File ? await eventImageFile(ev) : null;
      if(file){
        if(navigator.canShare && navigator.canShare({ files: [file] })){
          await navigator.share({ title: data.title, text: text + '\n' + APP_SHARE_URL, files: [file] });
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
  window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + APP_SHARE_URL), '_blank', 'noopener');
}

function openEventSheet(ev){
  document.getElementById('sheetMedia').innerHTML = eventMedia(ev);
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
      actions += '<a class="btn' + (ticketsPrimary ? ' btn--solid' : '') + '" href="' + ticketHref + '" target="_blank" rel="noopener">' + (ev.ticketButtonLabel || 'Buy Tickets') + '</a>';
    }
    actions += '<a class="btn btn--table" href="' + buildTableBookingLink(ev) + '" target="_blank" rel="noopener">Book a Table</a>';
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
    glBtn.addEventListener('click', function(){
      closeEventSheet();
      switchTab('guestlist');
      preselectEvent(ev);
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

document.getElementById('glForm').addEventListener('submit', async function(e){
  e.preventDefault();

  if(!currentUser){
    switchTab('account');
    showAuthError('loginError', 'Please log in or create an account to submit a guestlist request.');
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
  if(!age || parseInt(age, 10) < 18){ showErr('errAge'); valid = false; } else { clearErr('errAge'); }
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
      const ok = gFirst && gLast && gAge && parseInt(gAge, 10) >= 18 && gEmail.indexOf('@') > 0 && (!eventNeedsGender(ev) || gGender);
      if(!ok){ showErr('errGuest' + i); guestsValid = false; } else { clearErr('errGuest' + i); }
      const gObj = { firstName: gFirst, lastName: gLast, age: gAge, email: gEmail };
      if(gGender) gObj.gender = gGender;
      additionalGuests.push(gObj);
    } else if(gFirst || gLast){
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
const pushSupported = ('serviceWorker' in navigator) && ('PushManager' in window) && (typeof Notification !== 'undefined');

async function updateNotifyBtnState(){
  if(!notifyBtn || !pushSupported) return;
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  notifyBtn.classList.toggle('is-active', !!sub && Notification.permission === 'granted');
}

async function subscribeToPush(){
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
      if(error){ alert('Opslaan mislukt: ' + error.message); }
      else { alert('Gelukt! Abonnement opgeslagen.'); }
    } else {
      alert('supabaseClient bestaat niet — supabase-config.js is niet goed geladen.');
    }
  } catch(err){
    console.warn('Push subscribe failed:', err);
    alert('Fout bij aanmelden voor meldingen: ' + (err && err.message ? err.message : err));
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

if(notifyBtn && pushSupported){
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
const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

if(!isStandalone){
  const banner = document.getElementById('installBanner');
  if(isInAppBrowser){
    banner.innerHTML = '<strong>Add to Home Screen</strong> — tap the ••• menu above, choose "Open in Safari" (or "Open in Browser"), then tap the Share icon and choose "Add to Home Screen".';
    banner.classList.add('is-visible');
  } else if(isIos){
    banner.innerHTML = '<strong>Add to Home Screen</strong> — tap the Share icon, then "Add to Home Screen".';
    banner.classList.add('is-visible');
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
function showAccountPanel(user){
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

    const tierInfo = getTierInfo(points);
    document.querySelector('.member-card').className = 'member-card ' + tierInfo.current.className;
    tierBadge.textContent = tierInfo.current.name;
    const tierBar = document.getElementById('accountUserTierBar');
    if(tierBar){
      tierBar.style.width = (tierInfo.next
        ? Math.min(100, Math.round((points - tierInfo.current.min) / (tierInfo.next.min - tierInfo.current.min) * 100))
        : 100) + '%';
    }
    tierProgress.textContent = tierInfo.next
      ? (tierInfo.next.min - points) + ' pts to ' + tierInfo.next.name
      : 'Top tier';

    if(data && data.referral_code){
      const referralCard = document.getElementById('referralCard');
      const linkText = document.getElementById('referralLinkText');
      const link = window.location.origin + window.location.pathname + '?ref=' + data.referral_code;
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
    redirectTo: window.location.origin + '/app/'
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
  supabaseClient.auth.onAuthStateChange(function(event){
    if(event === 'PASSWORD_RECOVERY') enterPasswordRecovery();
  });
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
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
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
    title.textContent = 'Add the App to Get Notifications';
    sub.innerHTML = 'On iPhone, notifications only work once the app is on your home screen:<br><br>' +
      '1. Tap the <strong>Share</strong> button in Safari<br>' +
      '2. Choose <strong>Add to Home Screen</strong><br>' +
      '3. Open the app from your home screen and turn on notifications';
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
  } else if(!pushSupported || Notification.permission === 'granted'){
    switchTab('events');
    return;
  } else if(Notification.permission === 'denied'){
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
  if(typeof salonStop === 'function') salonStop();
  lockAppBehindGate();
});

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
      } else if(statusLower === 'declined'){
        statusClass = ' is-declined';
        note = 'This request could not be approved this time.';
      } else if(statusLower === 'no-show'){
        statusClass = ' is-no-show';
        note = 'You were marked as a no-show for this event.';
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
  if(!age || parseInt(age, 10) < 18){ editError('You must be 18 or older.'); return; }
  if(!phone){ editError('Please fill in your phone number.'); return; }
  if(!email || email.indexOf('@') < 1){ editError('Please enter a valid email address.'); return; }
  if((flags.gender || editingRequest.gender) && document.getElementById('erGenderWrap').style.display !== 'none' && !gender){ editError('Please select man or woman.'); return; }
  const guests = [];
  for(let i = 0; i < editGuests.length; i++){
    const g = editGuests[i];
    const gf = (g.firstName || '').trim(), gl = (g.lastName || '').trim(), ga = String(g.age || '').trim();
    if(!gf || !gl || !ga || parseInt(ga, 10) < 18){ editError('Guest ' + (i + 1) + ': first name, last name and age (18+) are required.'); return; }
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
  if(res.error){ editError('Could not save right now. Please try again.'); return; }
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

// Saves a submitted guestlist request to the signed-in user's account.
// Never blocks or breaks the WhatsApp flow if it fails.
async function saveRequestToAccount(payload){
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
    if(error){ console.warn('Could not save request to account.', error); return false; }
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
