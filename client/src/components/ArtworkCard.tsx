import { Link } from "react-router-dom";

interface ArtworkCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
}

const ArtworkCard = ({ id, title, category, image }: ArtworkCardProps) => {
  return (
    <Link to={`/artwork/${id}`} className="group block">
      <div className="relative overflow-hidden bg-muted rounded-sm">
        <img 
          src={image} 
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-serif font-medium group-hover:text-muted-foreground transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground uppercase tracking-wider">
          {category}
        </p>
      </div>
    </Link>
  );
};

export default ArtworkCard;
