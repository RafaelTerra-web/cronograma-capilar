import { RotateCcw, Save } from 'lucide-react';
import { Card } from '../components/Card';
import type { AppData, Goals, Profile, ThemeName } from '../types';
import { estimateProtein } from '../utils/calculations';

type SettingsProps = {
  data: AppData;
  onProfileChange: (profile: Partial<Profile>) => void;
  onGoalsChange: (goals: Partial<Goals>) => void;
  onResetData: () => void;
};

export function Settings({ data, onProfileChange, onGoalsChange, onResetData }: SettingsProps) {
  const proteinRange = estimateProtein(data.profile.weightKg);

  return (
    <div className="space-y-5">
      <header className="pt-2">
        <p className="text-sm font-semibold text-rose-700">Preferencias e metas</p>
        <h1 className="page-title mt-1">Ajustes</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Dados locais salvos no navegador, sem login e sem backend.</p>
      </header>

      <Card>
        <h2 className="section-title">Perfil</h2>
        <div className="mt-4 grid gap-3">
          <label className="block space-y-1 text-sm font-medium text-slate-700">
            <span>Nome</span>
            <input className="input" value={data.profile.name} onChange={(event) => onProfileChange({ name: event.target.value })} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 text-sm font-medium text-slate-700">
              <span>Peso atual</span>
              <input
                className="input"
                inputMode="decimal"
                value={data.profile.weightKg}
                onChange={(event) => onProfileChange({ weightKg: Number(event.target.value) || 0 })}
              />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              <span>Altura cm</span>
              <input
                className="input"
                inputMode="numeric"
                value={data.profile.heightCm}
                onChange={(event) => onProfileChange({ heightCm: Number(event.target.value) || 0 })}
              />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              <span>Dias treino</span>
              <input
                className="input"
                inputMode="numeric"
                value={data.profile.trainingDays}
                onChange={(event) => onProfileChange({ trainingDays: Number(event.target.value) || 0 })}
              />
            </label>
            <label className="space-y-1 text-sm font-medium text-slate-700">
              <span>Dias cardio</span>
              <input
                className="input"
                inputMode="numeric"
                value={data.profile.cardioDays}
                onChange={(event) => onProfileChange({ cardioDays: Number(event.target.value) || 0 })}
              />
            </label>
          </div>
        </div>
        <p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm font-medium text-teal-800">
          Proteina estimada para o peso atual: {proteinRange.low} a {proteinRange.high} g/dia.
        </p>
      </Card>

      <Card>
        <h2 className="section-title">Metas</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Calorias</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.calories}
              onChange={(event) => onGoalsChange({ calories: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Proteina</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.protein}
              onChange={(event) => onGoalsChange({ protein: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Gorduras</span>
            <input
              className="input"
              inputMode="numeric"
              value={data.goals.fat}
              onChange={(event) => onGoalsChange({ fat: Number(event.target.value) || 0 })}
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            <span>Agua</span>
            <input
              className="input"
              inputMode="decimal"
              value={data.goals.waterLiters}
              onChange={(event) => onGoalsChange({ waterLiters: Number(event.target.value) || 0 })}
            />
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="section-title">Alimentos</h2>
        <div className="mt-4 space-y-3">
          <label className="block space-y-1 text-sm font-medium text-slate-700">
            <span>Preferidos</span>
            <textarea
              className="input min-h-28 resize-none"
              value={data.profile.preferredFoods.join('\n')}
              onChange={(event) =>
                onProfileChange({
                  preferredFoods: event.target.value
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
          <label className="block space-y-1 text-sm font-medium text-slate-700">
            <span>Nao come</span>
            <textarea
              className="input min-h-24 resize-none"
              value={data.profile.avoidedFoods.join('\n')}
              onChange={(event) =>
                onProfileChange({
                  avoidedFoods: event.target.value
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),
                })
              }
            />
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="section-title">Tema visual</h2>
        <select
          className="input mt-4"
          value={data.profile.theme}
          onChange={(event) => onProfileChange({ theme: event.target.value as ThemeName })}
        >
          <option value="rose">Rose</option>
          <option value="teal">Teal</option>
          <option value="plum">Plum</option>
        </select>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <button className="secondary-button" type="button" onClick={onResetData}>
          <RotateCcw size={18} aria-hidden="true" />
          Reiniciar
        </button>
        <button className="primary-button" type="button">
          <Save size={18} aria-hidden="true" />
          Salvo local
        </button>
      </div>
    </div>
  );
}
