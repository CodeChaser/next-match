import clsx from 'clsx';

export function CardHeaderCF({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('px-6 py-4 border-b border-gray-200 text-xl font-semibold', className)}>{children}</div>;
}
