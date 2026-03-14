/**
 * Gallery Grid Component
 */
import { madinaGalleryData } from '@/data/templates/madina/gallery-data'

export default function GalleryGrid() {
  const images = madinaGalleryData

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div 
          key={image.id}
          className="group relative h-64 bg-gradient-to-br from-green-600 to-amber-600 rounded-xl overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="text-white font-bold text-lg">{image.title}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
