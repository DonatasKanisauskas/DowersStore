import Star from "../assets/Star";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1 rtl:space-x-reverse">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill={`${i < Math.round(rating) ? "yellow" : "gray"}`} />
      ))}
    </div>
  );
}
