interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  count?: number
}

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  ))

  return count === 1 ? skeletons[0] : <>{skeletons}</>
}

// Skeleton presets para tablas
export const TableRowSkeleton = () => (
  <tr className="border-b border-gray-200">
    <td className="px-6 py-4"><Skeleton variant="text" width={40} /></td>
    <td className="px-6 py-4"><Skeleton variant="text" width={120} /></td>
    <td className="px-6 py-4"><Skeleton variant="text" width={100} /></td>
    <td className="px-6 py-4">
      <Skeleton variant="text" width={100} className="mb-1" />
      <Skeleton variant="text" width={60} height={12} />
    </td>
    <td className="px-6 py-4"><Skeleton variant="text" width={180} /></td>
    <td className="px-6 py-4"><Skeleton variant="rectangular" width={60} height={24} /></td>
    <td className="px-6 py-4"><Skeleton variant="rectangular" width={80} height={24} /></td>
    <td className="px-6 py-4"><Skeleton variant="text" width={80} /></td>
    <td className="px-6 py-4"><Skeleton variant="rectangular" width={90} height={32} /></td>
  </tr>
)

// Skeleton para cards de estadísticas
export const StatCardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-xl">
    <Skeleton variant="text" className="h-8 w-16 mb-2" />
    <Skeleton variant="text" className="h-4 w-24" />
  </div>
)

export default Skeleton
