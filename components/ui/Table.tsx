import { cn } from '@/lib/utils'

interface TableProps {
  headers: string[]
  children: React.ReactNode
  className?: string
  emptyMessage?: string
  isEmpty?: boolean
}

export function Table({ headers, children, className, emptyMessage = 'No data found', isEmpty }: TableProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-100 dark:border-surface-700">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 font-medium text-surface-500 dark:text-surface-400 text-xs uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-50 dark:divide-surface-700/50">
          {isEmpty ? (
            <tr>
              <td
                colSpan={headers.length}
                className="py-10 text-center text-surface-400 text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  )
}

export function Tr({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'hover:bg-surface-50 dark:hover:bg-surface-700/30 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

export function Td({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return (
    <td
      className={cn('py-3 px-4 text-surface-700 dark:text-surface-300', className)}
      {...props}
    >
      {children}
    </td>
  )
}
