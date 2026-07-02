// Card timeline data — defines when and where each card appears during video scrub
// Progress: 0 = video start, 1 = video end

export interface CardTimelineEntry {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  stat?: string;
  statLabel?: string;
  enterAt: number; // 0-1 progress when card fades in
  exitAt: number;  // 0-1 progress when card fades out
  // Position as % of viewport
  position: (progress: number) => { x: number; y: number };
  pointerTarget: (progress: number) => { x: number; y: number };
}

export const cardTimeline: CardTimelineEntry[] = [
  {
    id: "welcome",
    title: "Chhab Chhaba Chhab",
    description: "Gujarat's premier cinematic water park experience. 25 acres of thrilling adventures, pristine pools, and lifelong memories at Chhab Chhaba Chhab Water Fun Park.",
    icon: "Waves",
    stat: "25 Acres",
    statLabel: "Adventure Park",
    enterAt: 0.08, // Fades in only after main title starts fading out
    exitAt: 0.22,
    position: () => ({ x: 12, y: 32 }), // Safely positioned higher up
    pointerTarget: () => ({ x: 50, y: 50 }),
  },
  {
    id: "rides",
    title: "World Class Rides",
    description: "Plunge down high-velocity slides designed by global waterpark engineers. Thrills that challenge your limits.",
    icon: "Compass",
    stat: "24+",
    statLabel: "World Class Rides",
    enterAt: 0.24,
    exitAt: 0.38,
    position: () => ({ x: 74, y: 32 }), // Safely positioned higher up
    pointerTarget: () => ({ x: 75, y: 50 }),
  },
  {
    id: "purity",
    title: "Olympic-Grade Purity",
    description: "100% UV-filtered and recirculated water. Crystal-clear, hypoallergenic, and checked hourly for absolute safety.",
    icon: "Droplets",
    stat: "100%",
    statLabel: "Filtered Water",
    enterAt: 0.40,
    exitAt: 0.54,
    position: () => ({ x: 12, y: 32 }), // Left side, higher up
    pointerTarget: () => ({ x: 50, y: 70 }),
  },
  {
    id: "safety",
    title: "Safety Certified",
    description: "Over 50 Red Cross certified lifeguards monitoring all pools and slides. Your safety is our obsession.",
    icon: "ShieldCheck",
    stat: "50+",
    statLabel: "Certified Lifeguards",
    enterAt: 0.56,
    exitAt: 0.70,
    position: () => ({ x: 74, y: 32 }), // Right side, higher up
    pointerTarget: () => ({ x: 35, y: 45 }),
  },
  {
    id: "visitors",
    title: "Happy Visitors",
    description: "Creating unforgettable, magical moments for families, friends, and couples from across India.",
    icon: "Users",
    stat: "150K+",
    statLabel: "Happy Visitors",
    enterAt: 0.72,
    exitAt: 0.86,
    position: () => ({ x: 12, y: 32 }), // Left side, higher up
    pointerTarget: () => ({ x: 60, y: 30 }),
  },
  {
    id: "cta",
    title: "Book Your Adventure",
    description: "Secure your tickets online now to get priority access, exclusive packages, and start your summer adventure today.",
    icon: "Ticket",
    stat: "₹799",
    statLabel: "starting from",
    enterAt: 0.88,
    exitAt: 1.0,
    position: () => ({ x: 50, y: 50 }), // Pinned to the center at the end
    pointerTarget: () => ({ x: 50, y: 50 }),
  },
];
