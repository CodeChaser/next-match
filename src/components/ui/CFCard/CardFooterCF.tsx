import clsx from 'clsx';

export function CardFooterCF({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('px-6 py-3 border-t border-gray-200 text-sm text-gray-500', className)}>{children}</div>;
}
