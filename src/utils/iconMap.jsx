import {
  Bath,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  CloudSun,
  Droplets,
  Flower2,
  Heart,
  Home,
  Leaf,
  Lightbulb,
  Moon,
  Package,
  RefreshCw,
  Sparkles,
  SprayCan,
  Waves,
  Wind
} from "lucide-react";

const icons = {
  bath: Bath,
  bottle: Package,
  calendar: CalendarDays,
  check: CheckCircle2,
  checkMark: Check,
  chevron: ChevronRight,
  circle: Circle,
  cloud: CloudSun,
  droplets: Droplets,
  flower: Flower2,
  heart: Heart,
  home: Home,
  leaf: Leaf,
  lightbulb: Lightbulb,
  moon: Moon,
  refresh: RefreshCw,
  sparkles: Sparkles,
  spray: SprayCan,
  waves: Waves,
  wind: Wind
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  const Component = icons[name] ?? Sparkles;
  return <Component aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
