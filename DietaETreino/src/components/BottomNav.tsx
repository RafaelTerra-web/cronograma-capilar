import { Activity, Dumbbell, Home, Settings, Utensils } from 'lucide-react';
import type { AppTab } from '../types';

type BottomNavProps = {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
};

const items: Array<{ id: AppTab; label: string; icon: typeof Home }> = [
  { id: 'today', label: 'Hoje', icon: Home },
  { id: 'workout', label: 'Treino', icon: Dumbbell },
  { id: 'diet', label: 'Dieta', icon: Utensils },
  { id: 'progress', label: 'Progresso', icon: Activity },
  { id: 'settings', label: 'Ajustes', icon: Settings },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[0.72rem] font-semibold transition ${
                isActive ? 'bg-rose-50 text-rose-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
              type="button"
              data-testid={`nav-${item.id}`}
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
