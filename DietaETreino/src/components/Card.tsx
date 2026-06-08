import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
  as?: 'article' | 'section' | 'div';
}>;

export function Card({ children, className = '', as: Component = 'section' }: CardProps) {
  return <Component className={`rounded-lg border border-slate-200 bg-white p-4 shadow-soft ${className}`}>{children}</Component>;
}
