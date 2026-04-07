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
    price: 33.0,
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
    featured: true,
    badge: "Popular",
  },
  {
    id: 2,
    name: "Nitrile Examination Gloves (All Sizes)",
    category: "gloves",
    price: 35.0,
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
    image: "assets/images/products/Nitrile Examination Gloves.jpeg",
    featured: true,
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Surgical Gloves (All Sizes)",
    category: "gloves",
    price: 110.0,
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
    image: "assets/images/products/11.jpeg",
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
    price: 115.0,
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
    image: "assets/images/products/IV.jpg",
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
    image: "assets/images/products/IV.jpg",
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
    featured: false,
    badge: null,
  },
  {
    id: 7,
    name: "5ml Syringes",
    category: "syringes",
    price: 40.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 9,
    name: "20ml Syringes",
    category: "syringes",
    price: 65.0,
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
    image: "assets/images/products/freen.jpg",
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
    image: "assets/images/products/fooley.gif",
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
    image: "assets/images/products/urinebag1.jpg",
    featured: false,
    badge: null,
  },
  {
    id: 13,
    name: "Infusion Set",
    category: "syringes",
    price: 2.6,
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
    image: "assets/images/products/infusion.jpg",
    featured: false,
    badge: null,
  },
  {
    id: 14,
    name: "Blood Transfusion Set",
    category: "syringes",
    price: 5.0,
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
    image: "assets/images/products/blood-transfusion-set.jpg",
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
    price: 55.0,
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
    image: "assets/images/products/17.jpeg",
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
    featured: false,
    badge: null,
  },
  {
    id: 17,
    name: "Plain Tubes",
    category: "lab-supplies",
    price: 65.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 18,
    name: "Urine Container 30ml",
    category: "lab-supplies",
    price: 1.5,
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
    featured: false,
    badge: null,
  },
  {
    id: 19,
    name: "Stool Container 30ml",
    category: "lab-supplies",
    price: 1.6,
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
    image: "assets/images/products/20.jpeg",
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
    featured: false,
    badge: null,
  },
  {
    id: 23,
    name: "ESR Pipette",
    category: "lab-supplies",
    price: 335.0,
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
    image: "assets/images/products/esr.jpeg",
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
    featured: false,
    badge: null,
  },
  {
    id: 27,
    name: "Blood Lancet",
    category: "lab-supplies",
    price: 13.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 28,
    name: "Ultrasound Gel 5L",
    category: "lab-supplies",
    price: 110.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 29,
    name: "Ultrasound Paper Type 1",
    category: "lab-supplies",
    price: 95.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 30,
    name: "Ultrasound Paper Type 5",
    category: "lab-supplies",
    price: 145.0,
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
    image: "assets/images/products/type 5.jpeg",
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
    price: 28.0,
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
    image: "assets/images/products/cotton.jpg",
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
    image: "assets/images/products/6.jpeg",
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
    image: "assets/images/products/9.jpeg",
    featured: false,
    badge: null,
  },
  {
    id: 34,
    name: "Vaseline Gauze",
    category: "wound-care",
    price: 26.0,
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
    image: "assets/images/products/gauze.jpeg",
    featured: false,
    badge: null,
  },
  {
    id: 35,
    name: "Alcohol Pads",
    category: "wound-care",
    price: 14.0,
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
    image: "assets/images/4.jpeg",
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
    price: 10.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 39,
    name: "Non-Rebreather Mask (All Sizes)",
    category: "respiratory",
    price: 13.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 40,
    name: "Nebulizer Mask (All Sizes)",
    category: "respiratory",
    price: 13.0,
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
    image: "assets/images/products/5.jpeg",
    featured: false,
    badge: null,
  },
  {
    id: 41,
    name: "Nasal Cannula (All Sizes)",
    category: "respiratory",
    price: 5.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 43,
    name: "Suction Tubes with Yankauer",
    category: "respiratory",
    price: 16.5,
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
    image: "assets/images/products/25.jpeg",
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
    featured: true,
    badge: null,
  },
  {
    id: 48,
    name: "Tourniquet",
    category: "diagnostics",
    price: 17.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 49,
    name: "Vaginal Speculum",
    category: "diagnostics",
    price: 4.5,
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
    image: "assets/images/products/vagina.jpg",
    featured: false,
    badge: null,
  },
  {
    id: 50,
    name: "Colostomy Bag",
    category: "diagnostics",
    price: 20.0,
    quantity: "1pc",
    description:
      "Drainable one-piece colostomy pouch with odour-proof film and comfort backing. Suitable for irregular stoma output.",
    specs: [
      "Type: One-piece drainable",
      "Film: Odour-proof",
      "Backing: Soft comfort fabric",
      "Sizes: Various stoma sizes",
      "Use: Post colostomy care",
    ],
    image: "assets/images/products/colostomy-bag.jpg",
    featured: false,
    badge: null,
  },

  /* ══════════════════════════════════
     CONSUMABLES
  ══════════════════════════════════ */
  {
    id: 51,
    name: "Nurses Cap",
    category: "consumables",
    price: 22.0,
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
    featured: false,
    badge: null,
  },
  {
    id: 52,
    name: "Face Mask",
    category: "consumables",
    price: 6.0,
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
    image: "assets/images/products/armpit.jpeg",
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
    featured: false,
    badge: null,
  },
  {
    id: 57,
    name: "Commode Seat",
    category: "furniture",
    price: 380.0,
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
    image: "assets/images/products/drip.png",
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
    featured: false,
    badge: null,
  },
  {
    id: 60,
    name: "Examination Bed",
    category: "furniture",
    price: 1950.0,
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
    image: "assets/images/products/exambed.jpg",
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
    price: 10500.0,
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
    image: "assets/images/products/monitor.jpeg",
    featured: true,
    badge: "Premium",
  },
  {
    id: 64,
    name: "Anaesthia Machine",
    category: "equipment",
    price: 130000.0,
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
    featured: true,
    badge: "Popular",
  },
  {
    id: 66,
    name: "Microscope",
    category: "equipment",
    price: 27000.0,
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
    featured: false,
    badge: null,
  },
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
  return [...NTLF_PRODUCTS, ...adminProds];
}
