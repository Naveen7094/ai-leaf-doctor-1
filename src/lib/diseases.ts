export type Disease = {
  id: string;
  name: string;
  crop: string;
  pathogen: string;
  severity: "Low" | "Moderate" | "High";
  symptoms: string[];
  organic: string[];
  chemical: string[];
  prevention: string;
};

export const DISEASES: Disease[] = [
  { id: "tomato-early-blight", name: "Early Blight", crop: "Tomato", pathogen: "Alternaria solani (fungus)", severity: "Moderate",
    symptoms: ["Brown spots with concentric rings", "Yellowing around lesions", "Lower leaves affected first"],
    organic: ["Remove infected lower leaves", "Spray neem oil every 7 days", "Apply Bacillus subtilis bio-fungicide"],
    chemical: ["Chlorothalonil 75% WP @ 2 g/L", "Mancozeb 75% WP @ 2.5 g/L"],
    prevention: "Rotate crops for 2–3 years, mulch soil, water at the base." },
  { id: "tomato-late-blight", name: "Late Blight", crop: "Tomato", pathogen: "Phytophthora infestans (oomycete)", severity: "High",
    symptoms: ["Water-soaked grey-green patches", "White mold under leaves in humidity", "Rapid plant collapse"],
    organic: ["Destroy infected plants immediately", "Copper hydroxide spray (organic-approved)"],
    chemical: ["Metalaxyl + Mancozeb @ 2.5 g/L", "Cymoxanil 8% + Mancozeb 64% @ 3 g/L"],
    prevention: "Use resistant varieties, avoid overhead irrigation, ensure airflow." },
  { id: "potato-late-blight", name: "Late Blight", crop: "Potato", pathogen: "Phytophthora infestans", severity: "High",
    symptoms: ["Dark lesions on leaf tips", "Brown rot on tubers", "Foul smell in fields"],
    organic: ["Hill soil around plants", "Copper-based sprays at first sign"],
    chemical: ["Dimethomorph 50% WP @ 1 g/L", "Mancozeb @ 2.5 g/L preventive"],
    prevention: "Plant certified seed tubers and remove volunteer plants." },
  { id: "rice-blast", name: "Rice Blast", crop: "Rice", pathogen: "Magnaporthe oryzae (fungus)", severity: "High",
    symptoms: ["Diamond-shaped lesions with grey centre", "Neck rot of panicles", "Empty grains"],
    organic: ["Pseudomonas fluorescens seed treatment @ 10 g/kg", "Silica-rich amendments"],
    chemical: ["Tricyclazole 75% WP @ 0.6 g/L", "Isoprothiolane 40% EC @ 1.5 ml/L"],
    prevention: "Avoid excess nitrogen, keep fields flooded evenly." },
  { id: "wheat-rust", name: "Leaf Rust", crop: "Wheat", pathogen: "Puccinia triticina (fungus)", severity: "Moderate",
    symptoms: ["Orange-brown pustules on leaves", "Powdery spores rub off", "Reduced grain fill"],
    organic: ["Sulphur dust @ 25 kg/ha", "Remove volunteer wheat"],
    chemical: ["Propiconazole 25% EC @ 1 ml/L", "Tebuconazole 25.9% EC @ 1 ml/L"],
    prevention: "Grow rust-resistant varieties and sow on time." },
  { id: "corn-leaf-blight", name: "Northern Leaf Blight", crop: "Maize", pathogen: "Exserohilum turcicum", severity: "Moderate",
    symptoms: ["Long cigar-shaped grey lesions", "Lesions merge to blight leaves"],
    organic: ["Trichoderma soil application", "Deep plough crop residue"],
    chemical: ["Azoxystrobin 23% SC @ 1 ml/L", "Mancozeb @ 2.5 g/L"],
    prevention: "Rotate with legumes, choose tolerant hybrids." },
  { id: "grape-powdery", name: "Powdery Mildew", crop: "Grape", pathogen: "Erysiphe necator (fungus)", severity: "Moderate",
    symptoms: ["White powdery coating", "Curled, distorted leaves", "Cracked berries"],
    organic: ["Milk spray (1:9 with water)", "Potassium bicarbonate @ 5 g/L", "Wettable sulphur"],
    chemical: ["Hexaconazole 5% EC @ 1 ml/L", "Myclobutanil 10% WP @ 0.4 g/L"],
    prevention: "Prune for sunlight penetration and airflow." },
  { id: "citrus-canker", name: "Citrus Canker", crop: "Citrus", pathogen: "Xanthomonas citri (bacteria)", severity: "High",
    symptoms: ["Raised corky lesions with yellow halo", "Premature fruit drop"],
    organic: ["Prune and burn infected twigs", "Copper oxychloride (organic grade)"],
    chemical: ["Streptocycline 100 ppm + Copper oxychloride 3 g/L"],
    prevention: "Use windbreaks, disinfect tools, control leaf miners." },
  { id: "healthy", name: "Healthy Leaf", crop: "Any", pathogen: "None detected", severity: "Low",
    symptoms: ["Uniform green colour", "No lesions or spots"],
    organic: ["Continue compost feeding", "Monitor weekly"],
    chemical: ["No treatment needed"],
    prevention: "Keep balanced nutrition and good field hygiene." },
];
