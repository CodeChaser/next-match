import clsx from 'clsx';

export function CardBodyCF({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('px-6 py-4 text-base text-gray-800', className)}>{children}</div>;
}
