import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
  };
  product?: {
    price?: string;
    currency?: string;
    availability?: 'in stock' | 'out of stock';
  };
}

const SEO = ({
  title = "ARTLUX∞ - The Luxury Longevity",
  description = "Science-backed longevity supplements and protocols. Premium NAD+, NMN, autophagy activators, and personalized health optimization.",
  keywords = "longevity supplements, NAD+ booster, NMN, autophagy, anti-aging, biohacking",
  image = "https://artlux8.com/og-image.jpg",
  url = "https://artlux8.com",
  type = "website",
  article,
  product,
}: SEOProps) => {
  const fullTitle = title.includes("ARTLUX") ? title : `${title} | ARTLUX∞`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
        </>
      )}

      {/* Product specific */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price} />
          <meta property="product:price:currency" content={product.currency || 'USD'} />
          <meta property="product:availability" content={product.availability || 'in stock'} />
        </>
      )}
    </Helmet>
  );
};

export default SEO;
