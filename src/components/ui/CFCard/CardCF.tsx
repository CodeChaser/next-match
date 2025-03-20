import clsx from 'clsx';

export function CardCF({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-gray-300 shadow-sm bg-white overflow-hidden', className)}>
      {children}
    </div>
  );
}
