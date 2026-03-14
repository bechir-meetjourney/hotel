/**
 * Testimonial Card Component
 */
interface TestimonialCardProps {
  testimonial: {
    id: number
    name: string
    rating: number
    comment: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < testimonial.rating ? 'text-amber-500' : 'text-gray-300'}>
            ⭐
          </span>
        ))}
      </div>

      {/* Comment */}
      <p className="mb-4 italic" style={{ color: 'var(--madina-testimonial-text-color, var(--madina-text-body))' }}>
        "{testimonial.comment}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-amber-600"></div>
        <div>
          <p className="font-bold" style={{ color: 'var(--madina-testimonial-name-color, var(--madina-text-primary))' }}>{testimonial.name}</p>
          <p className="text-sm" style={{ color: 'var(--madina-testimonial-text-color, var(--madina-text-body))' }}>ضيف معتمد</p>
        </div>
      </div>
    </div>
  )
}
