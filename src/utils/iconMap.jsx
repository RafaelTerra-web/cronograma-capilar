import {
  ArrowLeft,
  Bath,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  CloudSun,
  Droplets,
  Edit3,
  Flower2,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  Moon,
  Package,
  RefreshCw,
  RotateCcw,
  Sparkles,
  SprayCan,
  Waves,
  Wind,
  X
} from "lucide-react";

const icons = {
  arrowLeft: ArrowLeft,
  bath: Bath,
  bottle: Package,
  calendar: CalendarDays,
  check: CheckCircle2,
  checkMark: Check,
  chevron: ChevronRight,
  circle: Circle,
  cloud: CloudSun,
  droplets: Droplets,
  edit: Edit3,
  flower: Flower2,
  heart: Heart,
  home: Home,
  leaf: Leaf,
  lightbulb: Lightbulb,
  moon: Moon,
  refresh: RefreshCw,
  reset: RotateCcw,
  sparkles: Sparkles,
  spray: SprayCan,
  waves: Waves,
  wind: Wind,
  x: X
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  const Component = icons[name] ?? Sparkles;
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
