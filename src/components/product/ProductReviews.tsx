import { Star, BadgeCheck, ThumbsUp } from 'lucide-react';
import { ProductReview, getAverageRating } from '@/data/productReviews';

interface Props {
  reviews: ProductReview[];
}

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'}
        />
      ))}
    </div>
  );
};

const RatingSummary = ({ reviews }: { reviews: ProductReview[] }) => {
  const average = getAverageRating(reviews);
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-secondary/20 rounded-2xl border border-border">
      <div className="flex flex-col items-center justify-center md:pr-8 md:border-r border-border">
        <span className="text-5xl font-bold text-foreground">{average}</span>
        <StarRating rating={Math.round(average)} size={20} />
        <span className="text-sm text-muted-foreground mt-2">
          Based on {reviews.length} reviews
        </span>
      </div>
      <div className="flex-1 space-y-2">
        {distribution.map(({ rating, count, percentage }) => (
          <div key={rating} className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-6">{rating}★</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-8">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: ProductReview }) => {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="p-6 bg-secondary/10 rounded-xl border border-border hover:border-accent/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{review.author}</span>
            {review.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                <BadgeCheck size={12} />
                Verified Purchase
              </span>
            )}
          </div>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      
      <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
      
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
          <ThumbsUp size={14} />
          Helpful ({review.helpful})
        </button>
      </div>
    </div>
  );
};

const ProductReviews = ({ reviews }: Props) => {
  if (reviews.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-display text-2xl font-bold text-foreground mb-8">
        Customer Reviews
      </h2>
      
      <RatingSummary reviews={reviews} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;
