export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        {/* Placeholder for Logo */}
        <div className="w-12 h-12 bg-brand-500 rounded-xl mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-xl">EC</span>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-surface-900 dark:text-surface-100">
          Elder Care Companion
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-surface-900 py-8 px-4 shadow-card-lg border border-surface-200 dark:border-surface-800 sm:rounded-2xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
