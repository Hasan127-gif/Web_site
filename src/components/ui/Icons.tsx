import { 
  Home, 
  Search, 
  Map, 
  MessageCircle, 
  Shield,
  Heart,
  Star,
  Filter,
  SlidersHorizontal,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Settings,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Upload,
  Download,
  Share,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Bookmark,
  Bell,
  Navigation,
  Zap,
  Award,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

// Main navigation icons
export const NavIcons = {
  Home,
  Search,
  Map,
  Chat: MessageCircle,
  Shield,
} as const;

// Action icons
export const ActionIcons = {
  Heart,
  Star,
  Filter,
  Settings: SlidersHorizontal,
  Location: MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  Settings,
  Moon,
  Sun,
  Menu,
  Close: X,
  Plus,
  Minus,
  Check,
  Edit,
  Delete: Trash2,
  Share,
  More: MoreHorizontal,
  External: ExternalLink,
  Bookmark,
  Bell,
  Navigation,
  Upload,
  Download,
} as const;

// Directional icons  
export const DirectionalIcons = {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} as const;

// Status icons
export const StatusIcons = {
  Alert: AlertCircle,
  Info,
  Success: Check,
  Warning: AlertCircle,
  Error: X,
  Eye,
  EyeOff,
  Zap,
  Award,
  TrendingUp,
  GraduationCap,
} as const;

// Export all icons for easy access
export const Icons = {
  ...NavIcons,
  ...ActionIcons,
  ...DirectionalIcons,
  ...StatusIcons,
} as const;