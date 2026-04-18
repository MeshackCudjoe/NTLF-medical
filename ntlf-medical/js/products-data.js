/**
 * ============================================================
 *  NTLF MEDICAL – Central Data Store
 *  products-data.js
 *
 *  All company info, product categories, products, and shared
 *  utility functions live here. Every page loads this file
 *  first so data is always available.
 *
 *  TO ADD / EDIT PRODUCTS: simply modify the NTLF_PRODUCTS
 *  array below. IDs must be unique integers.
 * ============================================================
 */

/* ── Company Information ───────────────────────────────────── */
const NTLF_COMPANY = {
  name: "NTLF Medical",
  tagline: "Your Trusted Medical & Laboratory Supplies Partner",
  phone1: "054 140 6489",
  phone2: "020 415 4456",
  phone1Raw: "+233541406489",
  phone2Raw: "+233204154456",
  email: "meshackcudjoe2001@gmail.com",
  address: "Broadcasting Junction, Off the Accra-Winneba Rd",
  city: "Accra, Ghana",
  waNumber: "233541406489",
  waGreeting: "Hello%2C%20I%27m%20interested%20in%20your%20medical%20supplies.",
  hours: "Mon – Sat: 8am – 6pm  |  Sat: 9am – 4pm",
  note: "Goods are not sold on credit",
  mapsQuery: "Broadcasting+Junction+Accra+Ghana",
};

/* ── Product Categories ────────────────────────────────────── */
const NTLF_CATEGORIES = [
  { id: "all", label: "All Products", icon: "fas fa-grid-2", color: "#1a56db" },
  {
    id: "gloves",
    label: "Gloves & PPE",
    icon: "fas fa-hand-dots",
    color: "#0d9e6e",
  },
  {
    id: "syringes",
    label: "Syringes & Cannula",
    icon: "fas fa-syringe",
    color: "#7c3aed",
  },
  {
    id: "lab-supplies",
    label: "Lab Supplies",
    icon: "fas fa-flask-vial",
    color: "#0891b2",
  },
  {
    id: "wound-care",
    label: "Wound Care",
    icon: "fas fa-bandage",
    color: "#dc2626",
  },
  {
    id: "respiratory",
    label: "Respiratory",
    icon: "fas fa-lungs",
    color: "#0891b2",
  },
  {
    id: "diagnostics",
    label: "Diagnostics",
    icon: "fas fa-stethoscope",
    color: "#1a56db",
  },
  {
    id: "consumables",
    label: "Consumables",
    icon: "fas fa-boxes-stacked",
    color: "#f59e0b",
  },
  {
    id: "furniture",
    label: "Hospital Furniture",
    icon: "fas fa-bed-pulse",
    color: "#0d9e6e",
  },
  {
    id: "equipment",
    label: "Medical Equipment",
    icon: "fas fa-heart-pulse",
    color: "#dc2626",
  },
  {
    id: "first-aid",
    label: "First Aid & Emergency",
    icon: "fas fa-kit-medical",
    color: "#ef4444",
  },
  {
    id: "refrigeration",
    label: "Medical Refrigeration",
    icon: "fas fa-temperature-low",
    color: "#0891b2",
  },
];

/* ── Products List ─────────────────────────────────────────── */
/*
   Each product object has:
     id          – unique number
     name        – product name shown to customers
     category    – must match an id in NTLF_CATEGORIES
     price       – price in GH₵ (number)
     quantity    – pack size shown on the price list
     description – 1–2 sentence product description
     specs       – array of "Label: Value" spec strings
     image       – path to image (add your own .jpg files here)
     images      – array of multiple images for gallery
     featured    – true = shows in homepage slider
     badge       – optional label shown on the card (e.g. "Popular")
*/
const NTLF_PRODUCTS = [
  /* ══════════════════════════════════
     GLOVES & PPE
  ══════════════════════════════════ */
  {
    id: 1,
    name: "Latex Examination Gloves (All Sizes)",
    category: "gloves",
    price: 29.0,
    quantity: "100pcs",
    description:
      "High-quality natural latex examination gloves available in all sizes — XS, S, M, L, XL. Ideal for clinical examinations, laboratory work, and general healthcare procedures.",
    specs: [
      "Material: Natural Latex",
      "Sizes: XS / S / M / L / XL",
      "Quantity: 100 pcs per box",
      "Use: Single-use examination",
      "Standard: Medical Grade",
    ],
    image: "assets/images/products/mediglove_white_background.jpeg",
    images: [
      "assets/images/products/mediglove_white_background.jpeg",
      "assets/images/products/mediglove_white_background.jpeg",
      "assets/images/products/mediglove_white_background.jpeg",
      "assets/images/products/mediglove_white_background.jpeg",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: 2,
    name: "Nitrile Examination Gloves (All Sizes)",
    category: "gloves",
    price: 33.0,
    quantity: "100pcs",
    description:
      "Latex-free nitrile gloves offering superior chemical and puncture resistance. Ideal for healthcare workers with latex sensitivities.",
    specs: [
      "Material: Nitrile (Latex-Free)",
      "Sizes: XS / S / M / L / XL",
      "Quantity: 100 pcs per box",
      "Use: Single-use examination",
      "Standard: Medical Grade",
    ],
    image: "assets/images/products/nit1.jpg",
    images: [
      "assets/images/products/nit4.jpg",
      "assets/images/products/nit2.jpg",
      "assets/images/products/nit3.jpg",
      "assets/images/products/nit1.jpg",
    ],
    featured: true,
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Surgical Gloves (All Sizes)",
    category: "gloves",
    price: 100.0,
    quantity: "50pairs",
    description:
      "Sterile surgical gloves for operating theatre use. Pre-powdered for easy donning. All sizes available for every surgical team member.",
    specs: [
      "Material: Natural Latex",
      "Sterile: Yes",
      "Sizes: All",
      "Quantity: 50 pairs per box",
      "Use: Single-use surgical",
    ],
    image: "assets/images/products/surg1.jpg",
    images: [
      "assets/images/products/surg1.jpg",
      "assets/images/products/surg2.jpg",
      "assets/images/products/surg3.jpg",
      "assets/images/products/surg4.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     SYRINGES & CANNULA
  ══════════════════════════════════ */
  {
    id: 4,
    name: "IV Cannula – Blue, Pink, Yellow, Green",
    category: "syringes",
    price: 99.0,
    quantity: "100pcs",
    description:
      "Peripheral IV cannulas available in all colour-coded sizes: blue (22G), pink (20G), yellow (24G), and green (18G). Smooth insertion with safety flashback chamber.",
    specs: [
      "Sizes: 18G / 20G / 22G / 24G",
      "Colour coded for size",
      "Quantity: 100 pcs per box",
      "Sterile: Yes (single use)",
      "Material: Medical-grade polyurethane",
    ],
    image: "assets/images/products/IV1.jpg",
    images: [
      "assets/images/products/IV1.jpg",
      "assets/images/products/IV2.jpg",
      "assets/images/products/IV3.jpg",
      "assets/images/products/IV4.jpg",
    ],
    featured: true,
    badge: "New Stock",
  },
  {
    id: 5,
    name: "IV Cannula – Purple and Gray",
    category: "syringes",
    price: 170.0,
    quantity: "100pcs",
    description:
      "Large bore IV cannulas in purple (16G) and gray (16G/14G) for rapid fluid administration. Suitable for trauma and surgical cases.",
    specs: [
      "Sizes: 14G / 16G",
      "Colour coded for size",
      "Quantity: 100 pcs per box",
      "Sterile: Yes (single use)",
      "Application: Trauma / Surgery",
    ],
    image: "assets/images/products/IVP1.jpg",
    images: [
      "assets/images/products/IVP1.jpg",
      "assets/images/products/IVP2.jpg",
      "assets/images/products/IVP3.jpg",
      "assets/images/products/IVP4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 6,
    name: "2ml Syringes",
    category: "syringes",
    price: 35.0,
    quantity: "100pcs",
    description:
      "Single-use sterile 2ml syringes with clear barrel for accurate volume reading. Compatible with all standard Luer-lock needles.",
    specs: [
      "Volume: 2 ml",
      "Tip: Luer-lock",
      "Sterile: Yes",
      "Quantity: 100 pcs per box",
      "Use: Single use",
    ],
    image: "assets/images/products/23.jpeg",
    images: [
      "assets/images/products/23.jpeg",
      "assets/images/products/syringe1.jpg",
      "assets/images/products/syringe2.jpg",
      "assets/images/products/syringe3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 7,
    name: "5ml Syringes",
    category: "syringes",
    price: 39.0,
    quantity: "100pcs",
    description:
      "Sterile 5ml syringes with precise graduation markings. Suitable for injections, aspirations, and medication administration.",
    specs: [
      "Volume: 5 ml",
      "Tip: Luer-lock",
      "Sterile: Yes",
      "Quantity: 100 pcs per box",
      "Use: Single use",
    ],
    image: "assets/images/products/27.jpeg",
    images: [
      "assets/images/products/27.jpeg",
      "assets/images/products/syringe2.jpg",
      "assets/images/products/syringe3.jpg",
      "assets/images/products/syringe4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 8,
    name: "10ml Syringes",
    category: "syringes",
    price: 55.0,
    quantity: "100pcs",
    description:
      "Sterile 10ml syringes with smooth plunger action for easy operation. Widely used for IV medication administration and flushing.",
    specs: [
      "Volume: 10 ml",
      "Tip: Luer-lock",
      "Sterile: Yes",
      "Quantity: 100 pcs per box",
      "Use: Single use",
    ],
    image: "assets/images/products/2.jpeg",
    images: [
      "assets/images/products/2.jpeg",
      "assets/images/products/syringe4.jpg",
      "assets/images/products/syringe5.jpg",
      "assets/images/products/syringe6.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 9,
    name: "20ml Syringes",
    category: "syringes",
    price: 60.0,
    quantity: "50pcs",
    description:
      "Large capacity 20ml syringes suitable for wound irrigation, aspirations, and enteral feeding. Clear barrel with clear graduation markings.",
    specs: [
      "Volume: 20 ml",
      "Tip: Luer-lock",
      "Sterile: Yes",
      "Quantity: 50 pcs per box",
      "Use: Single use",
    ],
    image: "assets/images/products/8.jpeg",
    images: [
      "assets/images/products/syringe5.jpg",
      "assets/images/products/syringe6.jpg",
      "assets/images/products/syringe6.jpg",
      "assets/images/products/syringe2.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 10,
    name: "Free Needle (All Sizes)",
    category: "syringes",
    price: 17.0,
    quantity: "100pcs",
    description:
      "Sterile hypodermic needles in all gauge sizes. Sharp tri-bevel tip for minimally traumatic injections. Individually packaged.",
    specs: [
      "Available Gauges: 18G – 27G",
      "Sterile: Yes",
      "Quantity: 100 pcs per box",
      "Tip: Tri-bevel",
      "Use: Single use",
    ],
    image: "assets/images/products/free1.jpg",
    images: [
      "assets/images/products/free1.jpg",
      "assets/images/products/free2.jpg",
      "assets/images/products/free3.jpg",
      "assets/images/products/free4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 11,
    name: "Foley Catheter (All Sizes)",
    category: "syringes",
    price: 6.5,
    quantity: "1pc",
    description:
      "Latex Foley catheter with silicone coating for comfortable long-term urinary drainage. Available in sizes 12Fr – 26Fr.",
    specs: [
      "Sizes: 12Fr – 26Fr",
      "Material: Latex with silicone coat",
      "Balloon: 5–30 ml",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/fooley1.jpg",
    images: [
      "assets/images/products/fooley1.jpg",
      "assets/images/products/fooley2.jpg",
      "assets/images/products/fooley3.jpg",
      "assets/images/products/fooley4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 12,
    name: "Urine Drainage Bag",
    category: "syringes",
    price: 3.5,
    quantity: "1pc",
    description:
      "Sterile closed-system urine drainage bag with anti-reflux valve and sampling port. 2000ml capacity.",
    specs: [
      "Capacity: 2000 ml",
      "Anti-reflux valve: Yes",
      "Tubing length: 90 cm",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/ubag1.jpg",
    images: [
      "assets/images/products/ubag1.jpg",
      "assets/images/products/ubag2.jpg",
      "assets/images/products/ubag3.jpg",
      "assets/images/products/ubag4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 13,
    name: "Infusion Set",
    category: "syringes",
    price: 2.0,
    quantity: "1pc",
    description:
      "Standard IV infusion set with 15 drops/ml drip chamber, latex injection port and roller clamp for flow control.",
    specs: [
      "Drop factor: 15 drops/ml",
      "Needle: 21G",
      "Tubing length: 150 cm",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/infus1.jpg",
    images: [
      "assets/images/products/infus1.jpg",
      "assets/images/products/infus2.jpg",
      "assets/images/products/infus3.jpg",
      "assets/images/products/infus4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 14,
    name: "Blood Transfusion Set",
    category: "syringes",
    price: 3.5,
    quantity: "1pc",
    description:
      "Blood administration set with 200-micron filter and drip chamber for safe blood product transfusion.",
    specs: [
      "Filter: 200 micron",
      "Drop factor: 15 drops/ml",
      "Tubing: 150 cm PVC",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/bset1.jpg",
    images: [
      "assets/images/products/bset1.jpg",
      "assets/images/products/bset2.jpg",
      "assets/images/products/bset3.jpg",
      "assets/images/products/bset4.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     LAB SUPPLIES
  ══════════════════════════════════ */
  {
    id: 15,
    name: "EDTA Tubes",
    category: "lab-supplies",
    price: 54.0,
    quantity: "100pcs",
    description:
      "EDTA vacuum blood collection tubes (purple/lavender top) for haematology tests including CBC and blood grouping.",
    specs: [
      "Anticoagulant: K2EDTA or K3EDTA",
      "Cap Colour: Purple/Lavender",
      "Quantity: 100 pcs per box",
      "Sterile: Yes",
      "Use: Haematology testing",
    ],
    image: "assets/images/products/tubes1.jpg",
    images: [
      "assets/images/products/tubes1.jpg",
      "assets/images/products/tubes2.jpg",
      "assets/images/products/tubes3.jpg",
      "assets/images/products/tubes4.jpg",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: 16,
    name: "Gel Tubes",
    category: "lab-supplies",
    price: 80.0,
    quantity: "100pcs",
    description:
      "Serum separator gel tubes (SST) with clot activator for biochemistry and immunology testing. Gold/yellow cap.",
    specs: [
      "Additive: Gel + Clot activator",
      "Cap Colour: Gold/Yellow",
      "Quantity: 100 pcs per box",
      "Sterile: Yes",
      "Use: Biochemistry / Immunology",
    ],
    image: "assets/images/products/12.jpeg",
    images: [
      "assets/images/products/12.jpeg",
      "assets/images/products/12.jpeg",
      "assets/images/products/12.jpeg",
      "assets/images/products/12.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 17,
    name: "Plain Tubes",
    category: "lab-supplies",
    price: 60.0,
    quantity: "100pcs",
    description:
      "Plain red-top vacuum tubes with no additive for serum collection. Suitable for chemistry and serology tests.",
    specs: [
      "Additive: None",
      "Cap Colour: Red",
      "Quantity: 100 pcs per box",
      "Sterile: Yes",
      "Use: Serum / Serology",
    ],
    image: "assets/images/products/15.jpeg",
    images: [
      "assets/images/products/15.jpeg",
      "assets/images/products/15.jpeg",
      "assets/images/products/15.jpeg",
      "assets/images/products/15.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 18,
    name: "Urine Container 30ml",
    category: "lab-supplies",
    price: 1.7,
    quantity: "1pc",
    description:
      "Sterile 30ml urine specimen collection container with secure screw-top lid. Leak-proof and transparent for sample inspection.",
    specs: [
      "Volume: 30 ml",
      "Material: Polypropylene",
      "Lid: Screw-top (leak-proof)",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/30.jpeg",
    images: [
      "assets/images/products/30.jpeg",
      "assets/images/products/30.jpeg",
      "assets/images/products/30.jpeg",
      "assets/images/products/30.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 19,
    name: "Stool Container 30ml",
    category: "lab-supplies",
    price: 1.8,
    quantity: "1pc",
    description:
      "Sterile stool specimen container with integrated scoop spoon and screw-top lid for safe faecal sample collection.",
    specs: [
      "Volume: 30 ml",
      "Includes: Built-in scoop spoon",
      "Lid: Screw-top",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/scont1.jpg",
    images: [
      "assets/images/products/scont1.jpg",
      "assets/images/products/scont2.jpg",
      "assets/images/products/scont3.jpg",
      "assets/images/products/scont4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 20,
    name: "Frosted Slides",
    category: "lab-supplies",
    price: 15.0,
    quantity: "50pcs",
    description:
      "Premium frosted-end microscope slides for easy labelling. Suitable for blood films, cytology, histology, and other laboratory preparations.",
    specs: [
      "Size: 25 × 75 mm",
      "Thickness: 1.0–1.2 mm",
      "Frosted end: One side",
      "Quantity: 50 pcs per box",
      "Material: Borosilicate glass",
    ],
    image: "assets/images/products/22.jpeg",
    images: [
      "assets/images/products/22.jpeg",
      "assets/images/products/22.jpeg",
      "assets/images/products/22.jpeg",
      "assets/images/products/22.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 21,
    name: "Cover Glass",
    category: "lab-supplies",
    price: 13.0,
    quantity: "100pcs",
    description:
      "Precision-cut cover glass slips for microscopy. Uniform thickness ensures consistent optical clarity.",
    specs: [
      "Size: 18 × 18 mm",
      "Thickness: 0.13–0.17 mm",
      "Quantity: 100 pcs per box",
      "Material: Borosilicate glass",
      "Use: Microscopy",
    ],
    image: "assets/images/products/glass.jpg",
    images: [
      "assets/images/products/glass.jpg",
      "assets/images/products/glass.jpg",
      "assets/images/products/glass.jpg",
      "assets/images/products/glass.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 22,
    name: "Petri Dish",
    category: "lab-supplies",
    price: 2.0,
    quantity: "1pc",
    description:
      "Standard 90mm polystyrene Petri dish for microbiology culture work. Clear base for easy colony observation.",
    specs: [
      "Diameter: 90 mm",
      "Height: 14 mm",
      "Material: Polystyrene",
      "Sterile: Yes",
      "Use: Microbiology culture",
    ],
    image: "assets/images/products/petri.jpg",
    images: [
      "assets/images/products/petri.jpg",
      "assets/images/products/petri.jpg",
      "assets/images/products/petri.jpg",
      "assets/images/products/petri.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 23,
    name: "ESR Pipette",
    category: "lab-supplies",
    price: 345.0,
    quantity: "100pcs",
    description:
      "Westergren ESR pipettes for erythrocyte sedimentation rate testing. Clearly graduated from 0–200mm.",
    specs: [
      "Method: Westergren",
      "Graduation: 0–200 mm",
      "Quantity: 100 pcs per box",
      "Material: Borosilicate glass",
      "Use: ESR testing",
    ],
    image: "assets/images/products/pipette1.jpg",
    images: [
      "assets/images/products/pipette1.jpg",
      "assets/images/products/pipette2.jpg",
      "assets/images/products/pipette2.jpg",
      "assets/images/products/pipette1.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 24,
    name: "Pipette Tips – Yellow and Blue",
    category: "lab-supplies",
    price: 25.0,
    quantity: "1000pcs",
    description:
      "Universal pipette tips for micropipettes. Yellow tips (2–200µl) and blue tips (200–1000µl) for full volume range coverage.",
    specs: [
      "Yellow: 2–200 µl",
      "Blue: 100–1000 µl",
      "Quantity: 1000 pcs per bag",
      "Sterile: Optional",
      "Fit: Universal micropipettes",
    ],
    image: "assets/images/products/pipette.png",
    images: [
      "assets/images/products/pipette.png",
      "assets/images/products/pipette.png",
      "assets/images/products/pipette.png",
      "assets/images/products/pipette.png",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 25,
    name: "Centrifuge Tubes – 10ml and 15ml",
    category: "lab-supplies",
    price: 110.0,
    quantity: "100pcs",
    description:
      "Conical bottom centrifuge tubes in 10ml and 15ml sizes. Leak-proof screw caps and clear graduation marks.",
    specs: [
      "Sizes: 10 ml and 15 ml",
      "Material: Polypropylene",
      "Cap: Screw-top (leak-proof)",
      "Quantity: 100 pcs per pack",
      "Centrifuge speed: Up to 12,000 rpm",
    ],
    image: "assets/images/products/centrifuge.jpg",
    images: [
      "assets/images/products/centrifuge.jpg",
      "assets/images/products/centrifuge.jpg",
      "assets/images/products/centrifuge.jpg",
      "assets/images/products/centrifuge.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 26,
    name: "Phlebotomy Plaster",
    category: "lab-supplies",
    price: 20.0,
    quantity: "200pcs",
    description:
      "Adhesive phlebotomy plasters for post-venepuncture site protection. Hypoallergenic and breathable.",
    specs: [
      "Quantity: 200 pcs per box",
      "Material: Breathable fabric",
      "Adhesive: Hypoallergenic",
      "Size: Standard",
      "Use: Post-venepuncture",
    ],
    image: "assets/images/products/29.jpeg",
    images: [
      "assets/images/products/29.jpeg",
      "assets/images/products/29.jpeg",
      "assets/images/products/29.jpeg",
      "assets/images/products/29.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 27,
    name: "Blood Lancet",
    category: "lab-supplies",
    price: 10.0,
    quantity: "100pcs",
    description:
      "Safety blood lancets for capillary blood sampling. Retractable needle prevents re-use and accidental needle-stick injuries.",
    specs: [
      "Needle: 28G / 1.5 mm depth",
      "Safety: Retractable (single use)",
      "Quantity: 100 pcs per box",
      "Sterile: Yes",
      "Use: Capillary blood sampling",
    ],
    image: "assets/images/products/blood.jpg",
    images: [
      "assets/images/products/blood.jpg",
      "assets/images/products/blood.jpg",
      "assets/images/products/blood.jpg",
      "assets/images/products/blood.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 28,
    name: "Ultrasound Gel 5L",
    category: "lab-supplies",
    price: 100.0,
    quantity: "1 Gallon",
    description:
      "Water-based, hypoallergenic ultrasound transmission gel. Excellent acoustic coupling for sonography and ECG procedures.",
    specs: [
      "Volume: 5 L (1 Gallon)",
      "Type: Water-based",
      "Conductivity: High",
      "Colour: Clear blue",
      "Application: Ultrasound / ECG",
    ],
    image: "assets/images/products/24.jpeg",
    images: [
      "assets/images/products/24.jpeg",
      "assets/images/products/24.jpeg",
      "assets/images/products/24.jpeg",
      "assets/images/products/24.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 29,
    name: "Ultrasound Paper Type 1",
    category: "lab-supplies",
    price: 90.0,
    quantity: "1pc",
    description:
      "High-quality ultrasound thermal paper Type 1 (110mm × 20m) for Sony and compatible ultrasound printers.",
    specs: [
      "Width: 110 mm",
      "Length: 20 m per roll",
      "Type: Thermal",
      "Compatible: Sony ultrasound printers",
      "Image quality: High resolution",
    ],
    image: "assets/images/products/28.jpeg",
    images: [
      "assets/images/products/28.jpeg",
      "assets/images/products/28.jpeg",
      "assets/images/products/28.jpeg",
      "assets/images/products/28.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 30,
    name: "Ultrasound Paper Type 5",
    category: "lab-supplies",
    price: 140.0,
    quantity: "1pc",
    description:
      "Premium ultrasound thermal paper Type 5 for Kontron, Aloka, and other compatible ultrasound units. High contrast and fade-resistant.",
    specs: [
      "Width: 110 mm",
      "Length: 20 m per roll",
      "Type: Thermal",
      "Compatible: Kontron / Aloka printers",
      "Image quality: High contrast",
    ],
    image: "assets/images/products/type51.jpg",
    images: [
      "assets/images/products/type51.jpg",
      "assets/images/products/type52.jpg",
      "assets/images/products/type53.jpg",
      "assets/images/products/type54.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     WOUND CARE
  ══════════════════════════════════ */
  {
    id: 31,
    name: "Cotton 500g",
    category: "wound-care",
    price: 23.0,
    quantity: "1pc",
    description:
      "Absorbent medical cotton wool roll for wound cleaning, dressing, and general clinical use. High absorbency and soft texture.",
    specs: [
      "Weight: 500 g per roll",
      "Material: 100% Cotton",
      "Absorbency: High",
      "Use: Wound cleaning & dressing",
      "Sterilisation: Available on request",
    ],
    image: "assets/images/products/cotton1.jpg",
    images: [
      "assets/images/products/cotton1.jpg",
      "assets/images/products/cotton2.jpg",
      "assets/images/products/cotton3.jpg",
      "assets/images/products/cotton4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 32,
    name: "Crepe Bandage 4 Inches",
    category: "wound-care",
    price: 5.0,
    quantity: "1pc",
    description:
      "Conforming crepe bandage 4 inches wide for compression dressings, support bandaging, and wound management.",
    specs: [
      "Width: 4 inches (10 cm)",
      "Length: 4 m stretched",
      "Material: Cotton crepe",
      "Elasticity: Good",
      "Use: Compression / support",
    ],
    image: "assets/images/products/crepe1.jpg",
    images: [
      "assets/images/products/crepe1.jpg",
      "assets/images/products/crepe2.jpg",
      "assets/images/products/crepe3.jpg",
      "assets/images/products/crepe4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 33,
    name: "Crepe Bandage 6 Inches",
    category: "wound-care",
    price: 7.0,
    quantity: "1pc",
    description:
      "Wide 6-inch crepe bandage for larger limb support, compression therapy, and orthopaedic applications.",
    specs: [
      "Width: 6 inches (15 cm)",
      "Length: 4 m stretched",
      "Material: Cotton crepe",
      "Elasticity: Good",
      "Use: Orthopaedic support",
    ],
    image: "assets/images/products/crepe61.jpg",
    images: [
      "assets/images/products/crepe61.jpg",
      "assets/images/products/crepe62.jpg",
      "assets/images/products/crepe63.jpg",
      "assets/images/products/crepe64.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 34,
    name: "Vaseline Gauze",
    category: "wound-care",
    price: 23.0,
    quantity: "10pcs",
    description:
      "Non-adherent petroleum-impregnated gauze dressings for burns, skin grafts, and traumatic wounds. Prevents dressing from sticking.",
    specs: [
      "Impregnant: Petroleum (Vaseline)",
      "Quantity: 10 pcs per pack",
      "Size: 10 × 10 cm",
      "Non-adherent: Yes",
      "Sterile: Yes",
    ],
    image: "assets/images/products/gauze1.jpg",
    images: [
      "assets/images/products/gauze1.jpg",
      "assets/images/products/gauze2.jpg",
      "assets/images/products/gauze3.jpg",
      "assets/images/products/gauze4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 35,
    name: "Alcohol Pads",
    category: "wound-care",
    price: 15.0,
    quantity: "100pcs",
    description:
      "Individually wrapped 70% isopropyl alcohol swabs for skin antisepsis before injections and venepuncture.",
    specs: [
      "Alcohol concentration: 70% Isopropyl",
      "Quantity: 100 pcs per box",
      "Size: 6 × 3 cm",
      "Sterile: Yes",
      "Use: Skin antisepsis",
    ],
    image: "assets/images/products/alcohol.jpeg",
    images: [
      "assets/images/products/alcohol.jpeg",
      "assets/images/products/alcohol.jpeg",
      "assets/images/products/alcohol.jpeg",
      "assets/images/products/alcohol.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 36,
    name: "Cord Clamp",
    category: "wound-care",
    price: 60.0,
    quantity: "100pcs",
    description:
      "Disposable umbilical cord clamps for newborn care. Secure lock mechanism prevents accidental opening.",
    specs: [
      "Quantity: 100 pcs per box",
      "Material: Medical-grade plastic",
      "Lock: Secure ratchet",
      "Sterile: Yes",
      "Use: Neonatal umbilical clamping",
    ],
    image: "assets/images/products/cord1.jpg",
    images: [
      "assets/images/products/cord1.jpg",
      "assets/images/products/cord2.jpg",
      "assets/images/products/cord3.jpg",
      "assets/images/products/cord4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 37,
    name: "Sterile Tongue Depressor",
    category: "wound-care",
    price: 18.0,
    quantity: "100pcs",
    description:
      "Individually wrapped sterile wooden tongue depressors for oral examination and specimen collection.",
    specs: [
      "Quantity: 100 pcs per box",
      "Material: Medical-grade birch wood",
      "Size: 150 × 18 mm",
      "Sterile: Yes",
      "Use: Single use oral exam",
    ],
    image: "assets/images/products/18.jpeg",
    images: [
      "assets/images/products/18.jpeg",
      "assets/images/products/18.jpeg",
      "assets/images/products/18.jpeg",
      "assets/images/products/18.jpeg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     RESPIRATORY
  ══════════════════════════════════ */
  {
    id: 38,
    name: "Oxygen Mask (All Sizes)",
    category: "respiratory",
    price: 12.0,
    quantity: "1pc",
    description:
      "Simple face mask for oxygen therapy. Soft PVC construction with adjustable nose clip and elastic headband. Pediatric and adult sizes available.",
    specs: [
      "Sizes: Pediatric / Adult",
      "Material: Soft PVC",
      "Oxygen flow: 5–10 L/min",
      "FiO₂: 35–55%",
      "Sterile: Yes (single use)",
    ],
    image: "assets/images/products/5.jpeg",
    images: [
      "assets/images/products/5.jpeg",
      "assets/images/products/5.jpeg",
      "assets/images/products/5.jpeg",
      "assets/images/products/5.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 39,
    name: "Non-Rebreather Mask (All Sizes)",
    category: "respiratory",
    price: 12.0,
    quantity: "1pc",
    description:
      "Non-rebreather oxygen mask with reservoir bag for high-flow oxygen therapy. Delivers up to 95% FiO₂.",
    specs: [
      "FiO₂: Up to 90–95%",
      "Oxygen flow: 10–15 L/min",
      "Reservoir bag: 1 L",
      "Sizes: Pediatric / Adult",
      "Sterile: Yes (single use)",
    ],
    image: "assets/images/products/20.jpeg",
    images: [
      "assets/images/products/20.jpeg",
      "assets/images/products/20.jpeg",
      "assets/images/products/20.jpeg",
      "assets/images/products/20.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 40,
    name: "Nebulizer Mask (All Sizes)",
    category: "respiratory",
    price: 11.0,
    quantity: "1pc",
    description:
      "Nebulizer kit with mask, T-piece, mouthpiece, and drug cup for aerosol medication delivery. All sizes.",
    specs: [
      "Kit includes: Mask, T-piece, mouthpiece, drug cup",
      "Cup capacity: 6 ml",
      "Sizes: Pediatric / Adult",
      "Sterile: Yes",
      "Use: Single use",
    ],
    image: "assets/images/products/nebu1.jpg",
    images: [
      "assets/images/products/nebu1.jpg",
      "assets/images/products/nebu2.jpg",
      "assets/images/products/nebu3.jpg",
      "assets/images/products/nebu4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 41,
    name: "Nasal Cannula (All Sizes)",
    category: "respiratory",
    price: 7.0,
    quantity: "1pc",
    description:
      "Soft nasal cannula for low-flow oxygen therapy. Flexible prongs for patient comfort during prolonged oxygen use.",
    specs: [
      "FiO₂: 24–44%",
      "Oxygen flow: 1–6 L/min",
      "Sizes: Neonatal / Pediatric / Adult",
      "Material: Soft PVC",
      "Sterile: Yes (single use)",
    ],
    image: "assets/images/products/21.jpeg",
    images: [
      "assets/images/products/21.jpeg",
      "assets/images/products/21.jpeg",
      "assets/images/products/21.jpeg",
      "assets/images/products/21.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 42,
    name: "Oxygen Flowmeter",
    category: "respiratory",
    price: 250.0,
    quantity: "1pc",
    description:
      "Medical oxygen flowmeter with DISS outlet for accurate flow rate measurement from 0–15 L/min. Pin-index compatible.",
    specs: [
      "Flow range: 0–15 L/min",
      "Outlet: DISS standard",
      "Connection: Pin-index / DISS",
      "Accuracy: ±5%",
      "Pressure: Up to 4500 psi",
    ],
    image: "assets/images/products/oxygen.png",
    images: [
      "assets/images/products/oxygen.png",
      "assets/images/products/oxygen.png",
      "assets/images/products/oxygen.png",
      "assets/images/products/oxygen.png",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 43,
    name: "Suction Tubes with Yankauer",
    category: "respiratory",
    price: 17.0,
    quantity: "1pc",
    description:
      "Yankauer rigid suction catheter with soft-tipped handle and vent hole for oral and pharyngeal suction.",
    specs: [
      "Type: Rigid Yankauer",
      "Material: Clear PVC",
      "Vent hole: Yes",
      "Connector: 15 mm / 22 mm",
      "Sterile: Yes (single use)",
    ],
    image: "assets/images/products/31.jpeg",
    images: [
      "assets/images/products/31.jpeg",
      "assets/images/products/31.jpeg",
      "assets/images/products/31.jpeg",
      "assets/images/products/31.jpeg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     DIAGNOSTICS
  ══════════════════════════════════ */
  {
    id: 44,
    name: "Digital Thermometer",
    category: "diagnostics",
    price: 22.0,
    quantity: "1pc",
    description:
      "Fast-read digital clinical thermometer with LCD display and audible beep alert. Waterproof tip for axillary or oral use.",
    specs: [
      "Range: 32–42.9°C",
      "Accuracy: ±0.1°C",
      "Display: LCD digital",
      "Read time: 60 seconds",
      "Memory: Last reading recall",
    ],
    image: "assets/images/products/thermo1.jpg",
    images: [
      "assets/images/products/thermo1.jpg",
      "assets/images/products/thermo2.jpg",
      "assets/images/products/thermo3.jpg",
      "assets/images/products/thermo3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 45,
    name: "Clinical Thermometer",
    category: "diagnostics",
    price: 14.0,
    quantity: "1pc",
    description:
      "Classic mercury-free clinical thermometer for oral, axillary, and rectal temperature measurement.",
    specs: [
      "Type: Mercury-free",
      "Range: 35–42°C",
      "Reading time: 3–5 minutes",
      "Scale: Celsius and Fahrenheit",
      "Use: Oral / Axillary / Rectal",
    ],
    image: "assets/images/products/13.jpeg",
    images: [
      "assets/images/products/13.jpeg",
      "assets/images/products/13.jpeg",
      "assets/images/products/13.jpeg",
      "assets/images/products/13.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 46,
    name: "Yuwell BP Monitor",
    category: "diagnostics",
    price: 360.0,
    quantity: "1pc",
    description:
      "Yuwell automatic upper arm blood pressure monitor with large LCD display, irregular heartbeat detection, and memory for 60 readings.",
    specs: [
      "Type: Upper arm automatic",
      "Display: Large LCD",
      "Memory: 60 readings",
      "Irregular heartbeat detection: Yes",
      "Power: 4 × AA batteries or adapter",
    ],
    image: "assets/images/products/yuell.jpg",
    images: [
      "assets/images/products/yuell.jpg",
      "assets/images/products/yuell.jpg",
      "assets/images/products/yuell.jpg",
      "assets/images/products/yuell.jpg",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: 47,
    name: "Littmann Stethoscope",
    category: "diagnostics",
    price: 140.0,
    quantity: "1pc",
    description:
      "3M Littmann Classic stethoscope with dual-sided chestpiece for both adult and pediatric auscultation. Excellent acoustic performance.",
    specs: [
      "Brand: 3M Littmann",
      "Type: Dual-head (adult & pediatric)",
      "Tubing length: 69 cm",
      "Weight: 145 g",
      "Use: Cardiac / Pulmonary auscultation",
    ],
    image: "assets/images/products/lithman.png",
    images: [
      "assets/images/products/lithman.png",
      "assets/images/products/lithman.png",
      "assets/images/products/lithman.png",
      "assets/images/products/lithman.png",
    ],
    featured: true,
    badge: null,
  },
  {
    id: 48,
    name: "Tourniquet",
    category: "diagnostics",
    price: 13.0,
    quantity: "1pc",
    description:
      "Latex-free rubber tourniquet for venepuncture. Easy single-hand release mechanism. Durable and reusable.",
    specs: [
      "Material: Latex-free rubber",
      "Width: 2.5 cm",
      "Length: 45 cm",
      "Release: One-hand pull-tab",
      "Reusable: Yes",
    ],
    image: "assets/images/products/Tourniquet.jpg",
    images: [
      "assets/images/products/Tourniquet.jpg",
      "assets/images/products/Tourniquet.jpg",
      "assets/images/products/Tourniquet.jpg",
      "assets/images/products/Tourniquet.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 49,
    name: "Vaginal Speculum",
    category: "diagnostics",
    price: 4.0,
    quantity: "1pc",
    description:
      "Single-use disposable Cusco vaginal speculum with smooth edges for patient comfort during gynaecological examination.",
    specs: [
      "Type: Cusco bivalve",
      "Sizes: Small / Medium / Large",
      "Material: Clear polystyrene",
      "Sterile: Yes",
      "Use: Single use gynaecological exam",
    ],
    image: "assets/images/products/vagi1.jpg",
    images: [
      "assets/images/products/vagi1.jpg",
      "assets/images/products/vagi2.jpg",
      "assets/images/products/vagi3.jpg",
      "assets/images/products/vagi4.jpg",
    ],
    featured: false,
    badge: null,
  },
  // {
  //   id: 50,
  //   name: "Colostomy Bag",
  //   category: "diagnostics",
  //   price: 20.0,
  //   quantity: "1pc",
  //   description:
  //     "Drainable one-piece colostomy pouch with odour-proof film and comfort backing. Suitable for irregular stoma output.",
  //   specs: [
  //     "Type: One-piece drainable",
  //     "Film: Odour-proof",
  //     "Backing: Soft comfort fabric",
  //     "Sizes: Various stoma sizes",
  //     "Use: Post colostomy care",
  //   ],
  //   image: "assets/images/products/colostomy-bag.jpg",
  //   images: [
  //     "assets/images/products/colostomy-bag.jpg",
  //     "assets/images/products/colostomy-bag.jpg",
  //     "assets/images/products/colostomy-bag.jpg",
  //     "assets/images/products/colostomy-bag.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },

  /* ══════════════════════════════════
     CONSUMABLES
  ══════════════════════════════════ */
  {
    id: 51,
    name: "Nurses Cap",
    category: "consumables",
    price: 25.0,
    quantity: "100pcs",
    description:
      "Disposable non-woven nurses caps for infection control and hygiene in clinical settings. Light and comfortable.",
    specs: [
      "Material: Non-woven fabric",
      "Quantity: 100 pcs per box",
      "Size: One size fits all",
      "Colour: White",
      "Use: Single use",
    ],
    image: "assets/images/products/10.jpeg",
    images: [
      "assets/images/products/10.jpeg",
      "assets/images/products/nurse1.jpg",
      "assets/images/products/nurse2.jpg",
      "assets/images/products/nurse3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 52,
    name: "Face Mask",
    category: "consumables",
    price: 16.0,
    quantity: "50pcs",
    description:
      "3-ply disposable surgical face masks with adjustable nose wire and ear loops. Effective bacterial filtration for clinical environments.",
    specs: [
      "Layers: 3-ply",
      "BFE: ≥95%",
      "Ear loops: Elastic",
      "Nose wire: Adjustable",
      "Quantity: 50 pcs per box",
    ],
    image: "assets/images/products/face.jpg",
    images: [
      "assets/images/products/face.jpg",
      "assets/images/products/face.jpg",
      "assets/images/products/face.jpg",
      "assets/images/products/face.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     HOSPITAL FURNITURE
  ══════════════════════════════════ */
  {
    id: 53,
    name: "Wheelchair",
    category: "furniture",
    price: 1100.0,
    quantity: "1pc",
    description:
      "Foldable manual wheelchair with padded seat, removable armrests, footrests, and anti-tip wheels. Suitable for adults.",
    specs: [
      "Frame: Steel (foldable)",
      "Seat width: 46 cm",
      "Load capacity: 100 kg",
      "Armrests: Removable",
      "Footrests: Swing-away removable",
    ],
    image: "assets/images/products/wheelchair.jpg",
    images: [
      "assets/images/products/wheelchair.jpg",
      "assets/images/products/wheelc1.jpg",
      "assets/images/products/wheelc2.jpg",
      "assets/images/products/wheelc3.jpg",
    ],
    featured: true,
    badge: null,
  },
  {
    id: 54,
    name: "Armpit Crutches",
    category: "furniture",
    price: 190.0,
    quantity: "1pc",
    description:
      "Adjustable axillary crutches with soft padded underarm and hand grip. Height adjustable for adults. Pair available.",
    specs: [
      "Type: Axillary (armpit)",
      "Material: Aluminium",
      "Height adjustable: Yes",
      "Grip: Padded foam",
      "Load capacity: 100 kg",
    ],
    image: "assets/images/products/armpit1.jpg",
    images: [
      "assets/images/products/armpit1.jpg",
      "assets/images/products/armpit2.jpg",
      "assets/images/products/armpit3.jpg",
      "assets/images/products/armpit4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 55,
    name: "Walker with Wheels",
    category: "furniture",
    price: 330.0,
    quantity: "1pc",
    description:
      "Four-wheel rollator walker with hand brakes, padded seat, and storage bag. Provides stability and mobility assistance for elderly patients.",
    specs: [
      "Wheels: 4",
      "Brakes: Loop hand brakes",
      "Seat: Padded with backrest",
      "Frame: Lightweight aluminium",
      "Height adjustable: Yes",
    ],
    image: "assets/images/products/walking.jpg",
    images: [
      "assets/images/products/walking.jpg",
      "assets/images/products/walking.jpg",
      "assets/images/products/walking.jpg",
      "assets/images/products/walking.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 56,
    name: "Walker without Wheels",
    category: "furniture",
    price: 310.0,
    quantity: "1pc",
    description:
      "Standard lightweight aluminium walking frame without wheels for stable gait support in rehabilitation and elderly care.",
    specs: [
      "Type: Standard frame walker",
      "Material: Aluminium",
      "Non-slip rubber feet: Yes",
      "Height adjustable: Yes",
      "Weight: Approx. 1.5 kg",
    ],
    image: "assets/images/products/without.jpeg",
    images: [
      "assets/images/products/without.jpeg",
      "assets/images/products/without.jpeg",
      "assets/images/products/without.jpeg",
      "assets/images/products/without.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 57,
    name: "Commode Seat",
    category: "furniture",
    price: 2500.0,
    quantity: "1pc",
    description:
      "Freestanding steel commode chair with removable bucket, padded seat, and armrests for patients unable to use standard toilets.",
    specs: [
      "Frame: Steel powder-coated",
      "Bucket: Removable with lid",
      "Seat: Padded",
      "Armrests: Yes",
      "Height adjustable: Yes",
    ],
    image: "assets/images/products/commode.jpg",
    images: [
      "assets/images/products/commode.jpg",
      "assets/images/products/commode.jpg",
      "assets/images/products/commode.jpg",
      "assets/images/products/commode.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 58,
    name: "Drip Stand",
    category: "furniture",
    price: 240.0,
    quantity: "1pc",
    description:
      "Height-adjustable IV drip stand with 5-caster base for smooth movement. Supports up to 4 IV bags simultaneously.",
    specs: [
      "Height: 90–200 cm (adjustable)",
      "Base: 5-caster stainless steel",
      "Hooks: 4 IV bag hooks",
      "Material: Stainless steel",
      "Weight capacity: 5 kg",
    ],
    image: "assets/images/products/dripstand1.jpg",
    images: [
      "assets/images/products/dripstand1.jpg",
      "assets/images/products/dripstand2.jpg",
      "assets/images/products/dripstand3.jpg",
      "assets/images/products/dripstand4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 59,
    name: "Ward Screen 4-Fold",
    category: "furniture",
    price: 800.0,
    quantity: "1pc",
    description:
      "Four-panel folding hospital ward screen for patient privacy during examinations and dressing changes. Washable fabric panels.",
    specs: [
      "Panels: 4",
      "Frame: Powder-coated steel",
      "Fabric: Washable nylon",
      "Wheels: Castors with locks",
      "Height: 180 cm",
    ],
    image: "assets/images/products/ward.jpg",
    images: [
      "assets/images/products/ward.jpg",
      "assets/images/products/screen1.jpg",
      "assets/images/products/screen2.jpg",
      "assets/images/products/screen3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 60,
    name: "Examination Bed",
    category: "furniture",
    price: 1500.0,
    quantity: "1pc",
    description:
      "Adjustable examination couch with padded vinyl upholstery, paper roll holder, and foot-operated height adjustment.",
    specs: [
      "Surface: Padded vinyl (easy clean)",
      "Height: Adjustable",
      "Paper roll holder: Yes",
      "Load capacity: 200 kg",
      "Frame: Powder-coated steel",
    ],
    image: "assets/images/products/exambed1.jpg",
    images: [
      "assets/images/products/exambed1.jpg",
      "assets/images/products/exambed2.jpg",
      "assets/images/products/exambed3.jpg",
      "assets/images/products/exambed2.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 61,
    name: "Trolley 3 Steps",
    category: "furniture",
    price: 1100.0,
    quantity: "1pc",
    description:
      "Three-tier stainless steel medical instrument trolley with lockable castors and smooth push handles for theatre and ward use.",
    specs: [
      "Tiers: 3",
      "Material: 304 Stainless Steel",
      "Castors: Lockable",
      "Dimensions: 90 × 50 × 90 cm",
      "Load per tier: 30 kg",
    ],
    image: "assets/images/products/trolley.jpg",
    images: [
      "assets/images/products/trolley.jpg",
      "assets/images/products/trolley3s1.jpg",
      "assets/images/products/trolley3s2.jpg",
      "assets/images/products/trolley3s3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 62,
    name: "Trolley 2 Steps",
    category: "furniture",
    price: 850.0,
    quantity: "1pc",
    description:
      "Two-tier stainless steel medical trolley for wound dressing carts, medication trolleys, and ward rounds.",
    specs: [
      "Tiers: 2",
      "Material: 304 Stainless Steel",
      "Castors: Lockable",
      "Dimensions: 80 × 45 × 80 cm",
      "Load per tier: 30 kg",
    ],
    image: "assets/images/products/t2.jpg",
    images: [
      "assets/images/products/t2.jpg",
      "assets/images/products/trolley2s1.jpg",
      "assets/images/products/trolley2s2.jpg",
      "assets/images/products/trolley2s3.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     MEDICAL EQUIPMENT
  ══════════════════════════════════ */
  {
    id: 63,
    name: "Patient Monitor",
    category: "equipment",
    price: 10000.0,
    quantity: "1pc",
    description:
      "Multi-parameter bedside patient monitor tracking ECG, SpO₂, NIBP, temperature, and respiration rate. 12.1-inch colour TFT display.",
    specs: [
      'Display: 12.1" TFT colour',
      "Parameters: ECG, SpO₂, NIBP, Temp, RR",
      "Alarms: Configurable",
      "Recorder: Built-in thermal",
      "Battery: 4-hour backup",
    ],
    image: "assets/images/products/pmonitor1.jpg",
    images: [
      "assets/images/products/pmonitor1.jpg",
      "assets/images/products/pmonitor2.jpg",
      "assets/images/products/pmonitor3.jpg",
      "assets/images/products/pmonitor1.jpg",
    ],
    featured: true,
    badge: "Premium",
  },
  {
    id: 64,
    name: "Anaesthesia Machine",
    category: "equipment",
    price: 150000.0,
    quantity: "1pc",
    description:
      "Advanced anaesthesia workstation with integrated ventilator, precision vaporiser, and comprehensive patient monitoring.",
    specs: [
      "Ventilator: Integrated",
      "Vaporisers: 2 (isoflurane/sevoflurane)",
      'Display: 10" touchscreen',
      "Gas: O₂, N₂O, Air",
      "Standard: ISO 80601",
    ],
    image: "assets/images/products/ana.jpeg",
    images: [
      "assets/images/products/ana.jpeg",
      "assets/images/products/ana.jpeg",
      "assets/images/products/ana.jpeg",
      "assets/images/products/ana.jpeg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 65,
    name: "ECG Machine",
    category: "equipment",
    price: 21000.0,
    quantity: "1pc",
    description:
      "12-lead ECG machine with automatic interpretation, large LCD display, and built-in thermal printer. Stores 200 ECG records.",
    specs: [
      "Leads: 12-lead",
      "Display: Large LCD",
      "Printer: Thermal (built-in)",
      "Memory: 200 ECG records",
      "Interpretation: Auto analysis",
    ],
    image: "assets/images/products/ecg.jpg",
    images: [
      "assets/images/products/ecg.jpg",
      "assets/images/products/ecg.jpg",
      "assets/images/products/ecg.jpg",
      "assets/images/products/ecg.jpg",
    ],
    featured: true,
    badge: "Popular",
  },
  {
    id: 66,
    name: "Microscope",
    category: "equipment",
    price: 25000.0,
    quantity: "1pc",
    description:
      "Binocular laboratory microscope with 4×, 10×, 40× and 100× objectives, Abbe condenser, and coaxial coarse/fine focus.",
    specs: [
      "Eyepiece: 10× wide-field",
      "Objectives: 4×, 10×, 40×, 100× (oil)",
      "Condenser: Abbe N.A.1.25",
      "Illumination: 6V/20W halogen",
      "Stage: Mechanical",
    ],
    image: "assets/images/products/mic.jpg",
    images: [
      "assets/images/products/mic.jpg",
      "assets/images/products/microscope1.jpg",
      "assets/images/products/microscope2.jpg",
      "assets/images/products/microscope3.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 67,
    name: "X-Ray Machine",
    category: "equipment",
    price: 310000.0,
    quantity: "1pc",
    description:
      "High-frequency digital radiography X-ray unit with DR flat-panel detector and DICOM 3.0 connectivity for digital imaging.",
    specs: [
      "Type: High-frequency DR",
      "Detector: Flat-panel digital",
      "kV range: 40–150 kV",
      "DICOM: 3.0 compatible",
      "Radiation dose: Low",
    ],
    image: "assets/images/products/xray.jpg",
    images: [
      "assets/images/products/xray.jpg",
      "assets/images/products/xray.jpg",
      "assets/images/products/xray.jpg",
      "assets/images/products/xray.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     NEW PRODUCTS (IDs 68-82)
  ══════════════════════════════════ */
  // {
  //   id: 68,
  //   name: "Thermometer Gun (Infrared)",
  //   category: "diagnostics",
  //   price: 33.0,
  //   quantity: "1pc",
  //   description:
  //     "Non-contact infrared forehead thermometer for fast, hygienic temperature measurement. Ideal for clinical screening and home use. Provides accurate reading in 1 second with backlit LCD display.",
  //   specs: [
  //     "Type: Infrared (Non-contact)",
  //     "Measurement range: 32°C – 42.5°C",
  //     "Response time: 1 second",
  //     "Memory: 32 readings",
  //     "Battery: 2 × AAA",
  //   ],
  //   image: "assets/images/products/thermometer-gun-1.jpg",
  //   images: [
  //     "assets/images/products/thermometer-gun-1.jpg",
  //     "assets/images/products/thermometer-gun-2.jpg",
  //     "assets/images/products/thermometer-gun-3.jpg",
  //     "assets/images/products/thermometer-gun-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  {
    id: 69,
    name: "Typhoid Test Kit (Viva Test Blood)",
    category: "diagnostics",
    price: 80.0,
    quantity: "1 pack",
    description:
      "Rapid immunochromatographic test kit for qualitative detection of Typhoid IgG/IgM antibodies in whole blood, serum, or plasma. Results in 15 minutes.",
    specs: [
      "Method: Immunochromatography",
      "Sample: Whole blood / Serum / Plasma",
      "Time to result: 15 minutes",
      "Storage: 2°C – 30°C",
      "Use: Single-use test kit",
    ],
    image: "assets/images/products/typhoid1.jpg",
    images: [
      "assets/images/products/typhoid1.jpg",
      "assets/images/products/typhoid2.jpg",
      "assets/images/products/typhoid3.jpg",
      "assets/images/products/typhoid4.jpg",
    ],
    featured: false,
    badge: null,
  },
  //

  // {
  //   id: 71,
  //   name: "Gauze Rolls",
  //   category: "wound-care",
  //   price: 190.0,
  //   quantity: "100 yards",
  //   description:
  //     "High-quality absorbent cotton gauze roll for wound dressing, packing, and surgical use. Soft, lint-free, and highly absorbent. Sterile and individually wrapped.",
  //   specs: [
  //     "Material: 100% Cotton",
  //     "Length: 100 yards per roll",
  //     "Width: Standard",
  //     "Absorbency: High",
  //     "Use: Wound dressing / Packing",
  //   ],
  //   image: "assets/images/products/gauze-roll-1.jpg",
  //   images: [
  //     "assets/images/products/gauze-roll-1.jpg",
  //     "assets/images/products/gauze-roll-2.jpg",
  //     "assets/images/products/gauze-roll-3.jpg",
  //     "assets/images/products/gauze-roll-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  {
    id: 72,
    name: "Syphilis Test Kit (Viva Test)",
    category: "diagnostics",
    price: 80.0,
    quantity: "1 pack",
    description:
      "Rapid syphilis antibody test kit for qualitative detection of Treponema pallidum antibodies in whole blood. Simple procedure with clear visual results.",
    specs: [
      "Method: Immunochromatography",
      "Sample: Whole blood / Serum / Plasma",
      "Time to result: 15 minutes",
      "Sensitivity: 99.5%",
      "Use: Single-use test kit",
    ],
    image: "assets/images/products/syphtest1.jpg",
    images: [
      "assets/images/products/syphtest1.jpg",
      "assets/images/products/syphtest2.jpg",
      "assets/images/products/syphtest3.jpg",
      "assets/images/products/syphtest4.jpg",
    ],
    featured: false,
    badge: null,
  },
  // {
  //   id: 73,
  //   name: "Digital Timer",
  //   category: "lab-supplies",
  //   price: 140.0,
  //   quantity: "1pc",
  //   description:
  //     "Multi-function digital laboratory timer with large LCD display. Count up/down capability with alarm. Ideal for labs, clinics, and pharmacies.",
  //   specs: [
  //     "Type: Digital",
  //     "Range: 99 minutes 59 seconds",
  //     "Display: Large LCD",
  //     "Alarm: Yes (audible)",
  //     "Use: Laboratory / Clinical timing",
  //   ],
  //   image: "assets/images/products/digital-timer-1.jpg",
  //   images: [
  //     "assets/images/products/digital-timer-1.jpg",
  //     "assets/images/products/digital-timer-2.jpg",
  //     "assets/images/products/digital-timer-3.jpg",
  //     "assets/images/products/digital-timer-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  // {
  //   id: 74,
  //   name: "Breast Watch (Metallic)",
  //   category: "diagnostics",
  //   price: 25.0,
  //   quantity: "1pc",
  //   description:
  //     "Classic metallic breast watch (pocket watch) for medical professionals. Features second hand, easy-to-read dial, and durable metal casing with chain clip.",
  //   specs: [
  //     "Material: Metallic casing",
  //     "Display: Analogue with second hand",
  //     "Attachment: Chain clip",
  //     "Use: Pulse measurement / Clinical",
  //     "Type: Mechanical / Quartz",
  //   ],
  //   image: "assets/images/products/breast-watch-1.jpg",
  //   images: [
  //     "assets/images/products/breast-watch-1.jpg",
  //     "assets/images/products/breast-watch-2.jpg",
  //     "assets/images/products/breast-watch-3.jpg",
  //     "assets/images/products/breast-watch-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  {
    id: 75,
    name: "Pulse Oximeter Finger",
    category: "diagnostics",
    price: 120.0,
    quantity: "1pc",
    description:
      "Finger-tip pulse oximeter for non-invasive measurement of blood oxygen saturation (SpO₂) and pulse rate. OLED display with adjustable brightness and plethysmograph.",
    specs: [
      "Parameters: SpO₂ / Pulse rate",
      "Display: OLED",
      "Battery: 2 × AAA",
      "Range: 70–100% SpO₂",
      "Use: Home / Clinical monitoring",
    ],
    image: "assets/images/products/pulsefin1.jpg",
    images: [
      "assets/images/products/pulsefin1.jpg",
      "assets/images/products/pulsefin2.jpg",
      "assets/images/products/pulsefin3.jpg",
      "assets/images/products/pulsefin4.jpg",
    ],
    featured: false,
    badge: null,
  },
  // {
  //   id: 76,
  //   name: "Urine Strips Combi (Multiparameter)",
  //   category: "lab-supplies",
  //   price: 55.0,
  //   quantity: "1 pc",
  //   description:
  //     "Multiparameter urinalysis reagent strips for rapid testing of glucose, protein, pH, blood, ketones, bilirubin, urobilinogen, nitrite, and specific gravity.",
  //   specs: [
  //     "Parameters: 10+ parameters",
  //     "Reading time: 60–120 seconds",
  //     "Storage: Cool dry place (2°C–30°C)",
  //     "Shelf life: 24 months",
  //     "Use: Single-use dipstick",
  //   ],
  //   image: "assets/images/products/urine-strips-1.jpg",
  //   images: [
  //     "assets/images/products/urine-strips-1.jpg",
  //     "assets/images/products/urine-strips-2.jpg",
  //     "assets/images/products/urine-strips-3.jpg",
  //     "assets/images/products/urine-strips-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  {
    id: 77,
    name: "Hepatitis B Test Kit (HBsAg)",
    category: "diagnostics",
    price: 80.0,
    quantity: "1 pack",
    description:
      "Rapid immunochromatographic test for qualitative detection of Hepatitis B surface antigen (HBsAg) in whole blood. Fast screening for HBV infection.",
    specs: [
      "Method: Immunochromatography",
      "Sample: Whole blood / Serum / Plasma",
      "Time to result: 15 minutes",
      "Sensitivity: 99.8%",
      "Use: Single-use test kit",
    ],
    image: "assets/images/products/hb1.jpg",
    images: [
      "assets/images/products/hb1.jpg",
      "assets/images/products/hb2.jpg",
      "assets/images/products/hb3.jpg",
      "assets/images/products/hb4.jpg",
    ],
    featured: false,
    badge: null,
  },
  // {
  //   id: 78,
  //   name: "4-in-1 Machine Sugar Strips (Glucose Test Strips)",
  //   category: "diagnostics",
  //   price: 150.0,
  //   quantity: "1 pc",
  //   description:
  //     "Glucose test strips compatible with 4-in-1 multi-parameter monitoring systems. For accurate blood glucose measurement in diabetic care.",
  //   specs: [
  //     "Compatible: 4-in-1 multi-parameter meters",
  //     "Sample: Capillary blood",
  //     "Reading time: 5 seconds",
  //     "Storage: 2°C–30°C",
  //     "Use: Single-use test strips",
  //   ],
  //   image: "assets/images/products/sugar-strips-1.jpg",
  //   images: [
  //     "assets/images/products/sugar-strips-1.jpg",
  //     "assets/images/products/sugar-strips-2.jpg",
  //     "assets/images/products/sugar-strips-3.jpg",
  //     "assets/images/products/sugar-strips-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  // {
  //   id: 79,
  //   name: "Savlon 2L (Antiseptic Liquid)",
  //   category: "wound-care",
  //   price: 245.0,
  //   quantity: "1pc",
  //   description:
  //     "Chlorhexidine and cetrimide antiseptic liquid for wound cleansing, surgical skin preparation, and general antisepsis. 2-litre bottle for clinical use.",
  //   specs: [
  //     "Active ingredients: Chlorhexidine + Cetrimide",
  //     "Volume: 2 Litres",
  //     "Use: Wound cleaning / Skin antisepsis",
  //     "Dilution: As directed",
  //     "Storage: Cool dry place",
  //   ],
  //   image: "assets/images/products/savlon-1.jpg",
  //   images: [
  //     "assets/images/products/savlon-1.jpg",
  //     "assets/images/products/savlon-2.jpg",
  //     "assets/images/products/savlon-3.jpg",
  //     "assets/images/products/savlon-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  // {
  //   id: 80,
  //   name: "Doppler (Fetal Doppler)",
  //   category: "equipment",
  //   price: 1100.0,
  //   quantity: "1pc",
  //   description:
  //     "Handheld fetal Doppler for detecting fetal heartbeat from 12 weeks gestation. Built-in speaker and headphone jack for clear auscultation.",
  //   specs: [
  //     "Type: Handheld fetal Doppler",
  //     "Probe frequency: 2–3 MHz",
  //     "Display: LCD with heart rate",
  //     "Audio: Built-in speaker + headphone jack",
  //     "Power: Rechargeable battery",
  //   ],
  //   image: "assets/images/products/doppler-1.jpg",
  //   images: [
  //     "assets/images/products/doppler-1.jpg",
  //     "assets/images/products/doppler-2.jpg",
  //     "assets/images/products/doppler-3.jpg",
  //     "assets/images/products/doppler-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  // {
  //   id: 81,
  //   name: "Wooden Spatula (Tongue Depressor)",
  //   category: "wound-care",
  //   price: 25.0,
  //   quantity: "100pcs",
  //   description:
  //     "Individually wrapped sterile wooden tongue depressors for oral examination, specimen collection, and throat swabs. Smooth splinter-free finish.",
  //   specs: [
  //     "Material: Medical-grade birch wood",
  //     "Quantity: 100 pcs per box",
  //     "Size: 150 × 18 mm",
  //     "Sterile: Yes (individual wrap)",
  //     "Use: Single use oral exam",
  //   ],
  //   image: "assets/images/products/wooden-spatula-1.jpg",
  //   images: [
  //     "assets/images/products/wooden-spatula-1.jpg",
  //     "assets/images/products/wooden-spatula-2.jpg",
  //     "assets/images/products/wooden-spatula-3.jpg",
  //     "assets/images/products/wooden-spatula-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  {
    id: 82,
    name: "Pregnancy Test Kit (Strip - Viva Test Urine)",
    category: "diagnostics",
    price: 80.0,
    quantity: "50pcs",
    description:
      "Highly sensitive HCG pregnancy test strips for early detection of pregnancy. Simple dip-and-read format with clear visual results.",
    specs: [
      "Method: Immunochromatography (HCG)",
      "Sensitivity: 25 mIU/ml",
      "Time to result: 3–5 minutes",
      "Quantity: 50 strips per pack",
      "Use: Single-use test strip",
    ],
    image: "assets/images/products/preg1.jpg",
    images: [
      "assets/images/products/preg1.jpg",
      "assets/images/products/preg2.jpg",
      "assets/images/products/preg3.jpg",
      "assets/images/products/preg4.jpg",
    ],
    featured: false,
    badge: null,
  },

  /* ═══════════════════════════════════════════════════════════
     NEW PRODUCTS ADDED (IDs 83-101)
     First Aid, Emergency, Furniture, Equipment & Refrigeration
  ═══════════════════════════════════════════════════════════ */
  {
    id: 83,
    name: "First Aid Kit (Complete Set)",
    category: "first-aid",
    price: 250.0,
    quantity: "1 kit",
    description:
      "Comprehensive first aid kit containing essential medical supplies for emergency response. Includes bandages, antiseptics, scissors, gloves, and more. Ideal for clinics, schools, and workplaces.",
    specs: [
      "Includes: Bandages, gauze, plasters, scissors, gloves",
      "Antiseptics: Alcohol pads, iodine swabs",
      "Case: Durable zip bag",
      "Use: Emergency first response",
      "Standard: WHO recommended",
    ],
    image: "assets/images/products/aid1.jpg",
    images: [
      "assets/images/products/aid1.jpg",
      "assets/images/products/aid2.jpg",
      "assets/images/products/aid3.jpg",
      "assets/images/products/aid4.jpg",
    ],
    featured: true,
    badge: "Essential",
  },
  {
    id: 84,
    name: "Ambulance Bed (Stretcher)",
    category: "furniture",
    price: 2800.0,
    quantity: "1pc",
    description:
      "Heavy-duty ambulance stretcher bed with adjustable backrest, foldable side rails, and 4 swivel wheels with brakes. Designed for emergency medical transport.",
    specs: [
      "Material: Aluminium alloy frame",
      "Backrest: Adjustable (0–75°)",
      "Wheels: 4 swivel castors with brakes",
      "Load capacity: 200 kg",
      "Use: Ambulance / Emergency transport",
    ],
    image: "assets/images/products/ambbed1.jpg",
    images: [
      "assets/images/products/ambbed1.jpg",
      "assets/images/products/ambbed2.jpg",
      "assets/images/products/ambbed3.jpg",
      "assets/images/products/ambbed4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 85,
    name: "Ambulance Trolley (Stretcher Trolley)",
    category: "furniture",
    price: 2200.0,
    quantity: "1pc",
    description:
      "Lightweight ambulance stretcher trolley with folding legs, adjustable height, and lockable wheels. Easy loading into ambulances with telescopic handles.",
    specs: [
      "Frame: Aluminium alloy",
      "Height: Adjustable (multiple positions)",
      "Wheels: 4 lockable castors",
      "Folding: Yes (collapsible legs)",
      "Load capacity: 180 kg",
    ],
    image: "assets/images/products/ambtrolley1.jpg",
    images: [
      "assets/images/products/ambtrolley1.jpg",
      "assets/images/products/ambtrolley2.jpg",
      "assets/images/products/ambtrolley3.jpg",
      "assets/images/products/ambtrolley4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 86,
    name: "Autoclave (Steam Sterilizer)",
    category: "equipment",
    price: 4500.0,
    quantity: "1pc",
    description:
      "Tabletop autoclave for sterilizing medical instruments, laboratory glassware, and surgical equipment. Uses high-pressure saturated steam for effective sterilization.",
    specs: [
      "Capacity: 18 litres",
      "Temperature range: 121°C – 134°C",
      "Timer: Digital (0–60 min)",
      "Safety: Automatic pressure release",
      "Use: Instrument sterilization",
    ],
    image: "assets/images/products/autoclave1.jpg",
    images: [
      "assets/images/products/autoclave1.jpg",
      "assets/images/products/autoclave2.jpg",
      "assets/images/products/autoclave3.jpg",
      "assets/images/products/autoclave4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 87,
    name: "Bubble Mat (Anti-Decubitus Mattress)",
    category: "furniture",
    price: 650.0,
    quantity: "1pc",
    description:
      "Alternating pressure bubble mattress for preventing and treating pressure ulcers (bedsores). Ideal for bedridden patients.",
    specs: [
      "Type: Alternating pressure",
      "Material: Medical-grade PVC",
      "Pump: Silent, continuous operation",
      "Weight capacity: 150 kg",
      "Use: Pressure sore prevention",
    ],
    image: "assets/images/products/bubblemat1.jpg",
    images: [
      "assets/images/products/bubblemat1.jpg",
      "assets/images/products/bubblemat2.jpg",
      "assets/images/products/bubblemat3.jpg",
      "assets/images/products/bubblemat4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 88,
    name: "Cool Box (Medical Vaccine Carrier)",
    category: "refrigeration",
    price: 350.0,
    quantity: "1pc",
    description:
      "Insulated medical cool box for transporting vaccines, insulin, and temperature-sensitive medications. Maintains 2°C–8°C with ice packs.",
    specs: [
      "Capacity: 10 litres",
      "Temperature: 2°C – 8°C",
      "Insulation: Thick polyurethane foam",
      "Includes: Ice packs (4 pcs)",
      "Use: Vaccine / Medicine transport",
    ],
    image: "assets/images/products/cool box 1.jpg",
    images: [
      "assets/images/products/cool box 1.jpg",
      "assets/images/products/cool box 2.jpg",
      "assets/images/products/cool box 3.jpg",
      "assets/images/products/cool box 4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 89,
    name: "Doctors Chair (Adjustable Stool)",
    category: "furniture",
    price: 450.0,
    quantity: "1pc",
    description:
      "Ergonomic adjustable doctor's stool with 360° swivel, pneumatic height adjustment, and padded seat. Ideal for consultation rooms and clinics.",
    specs: [
      "Height: Adjustable (45–60 cm)",
      "Swivel: 360° rotation",
      "Material: PU leather seat",
      "Base: Chrome steel with castors",
      "Use: Medical consultation",
    ],
    image: "assets/images/products/dchair1.jpg",
    images: [
      "assets/images/products/dchair1.jpg",
      "assets/images/products/dchair2.jpg",
      "assets/images/products/dchair3.jpg",
      "assets/images/products/dchair4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 90,
    name: "Dentist Chair (Dental Unit)",
    category: "furniture",
    price: 12500.0,
    quantity: "1pc",
    description:
      "Professional dental chair with integrated dental unit, including saliva ejector, dental light, and instrument tray. Fully adjustable for patient comfort.",
    specs: [
      "Recline: 0–75°",
      "Height: Electric adjustment",
      "Includes: Dental light, instrument tray",
      "Material: Premium upholstery",
      "Use: Dental examination / treatment",
    ],
    image: "assets/images/products/dentchair1.jpg",
    images: [
      "assets/images/products/dentchair1.jpg",
      "assets/images/products/dentchair2.jpg",
      "assets/images/products/dentchair3.jpg",
      "assets/images/products/dentchair4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 91,
    name: "Electronic Bed (ICU Bed)",
    category: "furniture",
    price: 4500.0,
    quantity: "1pc",
    description:
      "Full-electric ICU bed with backrest, knee rest, and height adjustment via remote control. Includes side rails and lockable castors.",
    specs: [
      "Controls: Electric remote",
      "Functions: Backrest, knee rest, height",
      "Side rails: Foldable",
      "Castors: 4 lockable wheels",
      "Use: ICU / Critical care",
    ],
    image: "assets/images/products/ebed1.jpg",
    images: [
      "assets/images/products/ebed1.jpg",
      "assets/images/products/ebed2.jpg",
      "assets/images/products/ebed3.jpg",
      "assets/images/products/ebed4.jpg",
    ],
    featured: true,
    badge: "Premium",
  },
  {
    id: 92,
    name: "Electronic Wheelchair (Power Wheelchair)",
    category: "furniture",
    price: 5500.0,
    quantity: "1pc",
    description:
      "Battery-powered electric wheelchair with joystick control, comfortable padded seat, and long battery life. Ideal for patients with limited mobility.",
    specs: [
      "Motor: Brushless DC motor",
      "Control: Joystick",
      "Range: 20 km per charge",
      "Speed: 6 km/h max",
      "Battery: Lithium-ion (rechargeable)",
    ],
    image: "assets/images/products/ewheelc1.jpg",
    images: [
      "assets/images/products/ewheelc1.jpg",
      "assets/images/products/ewheelc2.jpg",
      "assets/images/products/ewheelc3.jpg",
      "assets/images/products/ewheelc4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 93,
    name: "Pharmacy Refrigerator (Medical Fridge)",
    category: "refrigeration",
    price: 2800.0,
    quantity: "1pc",
    description:
      "Pharmaceutical refrigerator with digital temperature display and locking mechanism. Maintains stable temperature for vaccines and medicines.",
    specs: [
      "Capacity: 150 litres",
      "Temperature range: 2°C – 8°C",
      "Display: Digital LED",
      "Lock: Yes (key included)",
      "Use: Vaccine / Medicine storage",
    ],
    image: "assets/images/products/fridge1.jpg",
    images: [
      "assets/images/products/fridge1.jpg",
      "assets/images/products/fridge2.jpg",
      "assets/images/products/fridge3.jpg",
      "assets/images/products/fridge4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 94,
    name: "Hot Air Sterilizer (Dry Heat Sterilizer)",
    category: "equipment",
    price: 3200.0,
    quantity: "1pc",
    description:
      "Laboratory hot air oven for dry heat sterilization of glassware, metal instruments, and powders. Digital temperature control.",
    specs: [
      "Capacity: 50 litres",
      "Temperature range: 50°C – 250°C",
      "Timer: Digital (0–99 hours)",
      "Interior: Stainless steel",
      "Use: Dry heat sterilization",
    ],
    image: "assets/images/products/hotair1.jpg",
    images: [
      "assets/images/products/hotair1.jpg",
      "assets/images/products/hotair2.jpg",
      "assets/images/products/hotair3.jpg",
      "assets/images/products/hotair4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 95,
    name: "Medical Compressor Nebulizer",
    category: "respiratory",
    price: 450.0,
    quantity: "1pc",
    description:
      "Compressor nebulizer for aerosol medication delivery to treat respiratory conditions like asthma, bronchitis, and COPD.",
    specs: [
      "Type: Compressor",
      "Particle size: 1–5 microns",
      "Reservoir capacity: 6 ml",
      "Noise level: < 50 dB",
      "Use: Respiratory medication delivery",
    ],
    image: "assets/images/products/mednebu1.jpg",
    images: [
      "assets/images/products/mednebu1.jpg",
      "assets/images/products/mednebu2.jpg",
      "assets/images/products/mednebu3.jpg",
      "assets/images/products/mednebu4.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 96,
    name: "Operation Bed (Surgical Table)",
    category: "furniture",
    price: 8500.0,
    quantity: "1pc",
    description:
      "Multi-functional hydraulic operating table with adjustable height, backrest, leg rest, and Trendelenburg position. Ideal for surgical procedures.",
    specs: [
      "Operation: Hydraulic",
      "Positions: Backrest, leg rest, Trendelenburg",
      "Height: Adjustable (65–95 cm)",
      "Material: Stainless steel frame",
      "Use: Surgical / Operating theatre",
    ],
    image: "assets/images/products/opbed1.jpg",
    images: [
      "assets/images/products/opbed1.jpg",
      "assets/images/products/opbed2.jpg",
      "assets/images/products/opbed3.jpg",
      "assets/images/products/opbed4.jpg",
    ],
    featured: true,
    badge: "Premium",
  },
  {
    id: 97,
    name: "Oxygen Cylinder (Medical Oxygen Tank)",
    category: "respiratory",
    price: 950.0,
    quantity: "1pc",
    description:
      "Medical-grade oxygen cylinder with regulator and flow meter. Essential for oxygen therapy in hospitals, clinics, and home care.",
    specs: [
      "Capacity: 680 litres",
      "Material: Aluminium / Steel",
      "Includes: Regulator + flow meter",
      "Pressure: 2000 psi",
      "Use: Medical oxygen therapy",
    ],
    image: "assets/images/products/oxygencylinder1.jpg",
    images: [
      "assets/images/products/oxygencylinder1.jpg",
      "assets/images/products/oxygencylinder2.jpg",
      "assets/images/products/oxygencylinder3.jpg",
      "assets/images/products/oxygencylinder2.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 98,
    name: "Theatre Lamps (Surgical Light)",
    category: "equipment",
    price: 3500.0,
    quantity: "1pc",
    description:
      "LED surgical theatre lamp with adjustable intensity and shadow-free illumination. Ideal for operating rooms and procedure rooms.",
    specs: [
      "Type: LED surgical light",
      "Intensity: Adjustable (0–160,000 lux)",
      "Shadow control: Yes",
      "Mount: Ceiling or floor stand",
      "Use: Operating theatre illumination",
    ],
    image: "assets/images/products/tlabs1.jpg",
    images: [
      "assets/images/products/tlabs1.jpg",
      "assets/images/products/tlabs2.jpg",
      "assets/images/products/tlabs3.jpg",
      "assets/images/products/tlabs2.jpg",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 99,
    name: "Weighing Scale (Medical Digital Scale)",
    category: "diagnostics",
    price: 280.0,
    quantity: "1pc",
    description:
      "Digital medical weighing scale with BMI calculation and large LCD display. High capacity for bariatric patients.",
    specs: [
      "Type: Digital",
      "Capacity: 200 kg",
      "Accuracy: ±0.1 kg",
      "Functions: BMI calculation",
      "Display: Large LCD",
    ],
    image: "assets/images/products/wescale1.jpg",
    images: [
      "assets/images/products/wescale1.jpg",
      "assets/images/products/wescale2.jpg",
      "assets/images/products/wescale3.jpg",
      "assets/images/products/wescale4.jpg",
    ],
    featured: false,
    badge: null,
  },
  // {
  //   id: 100,
  //   name: "Infant Incubator (Neonatal Incubator)",
  //   category: "equipment",
  //   price: 8500.0,
  //   quantity: "1pc",
  //   description:
  //     "Neonatal incubator with temperature and humidity control for premature or ill newborns. Provides a controlled environment for infant care.",
  //   specs: [
  //     "Temperature range: 25°C – 39°C",
  //     "Humidity control: Yes (up to 95%)",
  //     "Display: Digital touchscreen",
  //     "Alarms: Audio/visual",
  //     "Use: Neonatal intensive care",
  //   ],
  //   image: "assets/images/products/infant-incubator.jpg",
  //   images: [
  //     "assets/images/products/infant-incubator-1.jpg",
  //     "assets/images/products/infant-incubator-2.jpg",
  //     "assets/images/products/infant-incubator-3.jpg",
  //     "assets/images/products/infant-incubator-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
  // {
  //   id: 101,
  //   name: "Suction Machine (Medical Aspirator)",
  //   category: "equipment",
  //   price: 1200.0,
  //   quantity: "1pc",
  //   description:
  //     "Portable medical suction machine for removing secretions, blood, and fluids from airways. Essential for emergency and critical care.",
  //   specs: [
  //     "Type: Portable",
  //     "Vacuum range: 0–600 mmHg",
  //     "Collection bottle: 1 litre",
  //     "Power: AC/DC (rechargeable)",
  //     "Use: Airway suctioning",
  //   ],
  //   image: "assets/images/products/suction-machine.jpg",
  //   images: [
  //     "assets/images/products/suction-machine-1.jpg",
  //     "assets/images/products/suction-machine-2.jpg",
  //     "assets/images/products/suction-machine-3.jpg",
  //     "assets/images/products/suction-machine-4.jpg",
  //   ],
  //   featured: false,
  //   badge: null,
  // },
];

/* ── Shared Utility Functions ──────────────────────────────── */

/**
 * Format a number as GH₵ currency string
 * @param {number} price
 * @returns {string}  e.g.  "GH₵ 1,100.00"
 */
function formatPrice(price) {
  return (
    "GH\u20B5\u00A0" +
    Number(price).toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

/**
 * Find a product by id (also checks admin-added products in localStorage)
 * @param {number} id
 * @returns {object|undefined}
 */
function getProductById(id) {
  const adminProds = JSON.parse(
    localStorage.getItem("ntlf-admin-products") || "[]",
  );
  return [...NTLF_PRODUCTS, ...adminProds].find((p) => p.id === Number(id));
}

/**
 * Get featured products (static list + any admin products marked featured)
 * @returns {object[]}
 */
function getFeaturedProducts() {
  const adminProds = JSON.parse(
    localStorage.getItem("ntlf-admin-products") || "[]",
  );
  return [...NTLF_PRODUCTS, ...adminProds].filter((p) => p.featured);
}

/**
 * Get all products (static + admin-added)
 * @returns {object[]}
 */
function getAllProducts() {
  const adminProds = JSON.parse(
    localStorage.getItem("ntlf-admin-products") || "[]",
  );
  const allProducts = [...NTLF_PRODUCTS, ...adminProds];

  // Add fallback images array for products that don't have one
  return allProducts.map(function (product) {
    if (!product.images || product.images.length === 0) {
      // If no images array exists, create one using the single image (repeated 4 times)
      product.images = [
        product.image,
        product.image,
        product.image,
        product.image,
      ];
    }
    return product;
  });
}
