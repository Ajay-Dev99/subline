import React from "react"
import { Link } from "react-router-dom"

interface ArtworkCardProps {
  id: string
  title: string
  category: string
  image: string
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  id,
  title,
  category,
  image
}) => {
  return (
    <Link
      to={`/artwork/${id}`}
      className="block rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold font-serif mb-1 group-hover:text-primary transition">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground tracking-wide">
          {category}
        </p>
      </div>
    </Link>
  )
}

export default ArtworkCard
