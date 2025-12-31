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
    brand?: string;
    sku?: string;
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  noindex?: boolean;
}

const SEO = ({
  title = "ARTLUX8 | World's Premier Biohacking & Longevity Lifestyle Store",
  description = "Discover premium biohacking technology and longevity lifestyle tools. Hydrogen water bottles, red light therapy, cold plunge systems, organic supplements, and advanced performance optimization. Technology-driven human optimization without pharmaceuticals.",
  keywords = "biohacking lifestyle, longevity optimization, hydrogen water bottle, red light therapy, cold plunge, grounding mat, organic supplements, performance optimization, elite wellness technology, premium biohacking brand, luxury longevity store",
  image = "https://artlux8.com/og-image.jpg",
  url = "https://artlux8.com",
  type = "website",
  article,
  product,
  faq,
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes("ARTLUX") ? title : `${title} | ARTLUX8`;
  
  // Organization Schema - Always present
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ARTLUX8",
    "alternateName": ["ARTLUX∞", "ARTLUX LTD"],
    "url": "https://artlux8.com",
    "logo": "https://artlux8.com/og-image.jpg",
    "description": "World's premier biohacking and longevity lifestyle store. Premium technology-driven human optimization tools and organic supplements.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "92 Markby Road",
      "addressLocality": "Birmingham",
      "addressRegion": "West Midlands",
      "postalCode": "B18 4PN",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "artlux.ltd@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://twitter.com/artlux8",
      "https://www.tiktok.com/@artlux_88"
    ]
  };

  // WebSite Schema for sitelinks search box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ARTLUX8",
    "alternateName": "ARTLUX∞",
    "url": "https://artlux8.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://artlux8.com/shop?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Product Schema
  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "ARTLUX8"
    },
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": product.currency || "GBP",
      "price": product.price,
      "availability": product.availability === 'in stock' 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "ARTLUX8"
      }
    }
  } : null;

  // FAQ Schema
  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Article Schema
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": article.author || "ARTLUX8"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ARTLUX8",
      "logo": {
        "@type": "ImageObject",
        "url": "https://artlux8.com/og-image.jpg"
      }
    },
    "datePublished": article.publishedTime,
    "articleSection": article.section
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Author & Publisher */}
      <meta name="author" content="ARTLUX8" />
      <meta name="publisher" content="ARTLUX LTD" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="ARTLUX8" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@artlux8" />
      <meta name="twitter:creator" content="@artlux8" />
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
          <meta property="product:price:currency" content={product.currency || 'GBP'} />
          <meta property="product:availability" content={product.availability || 'in stock'} />
          <meta property="product:brand" content={product.brand || 'ARTLUX8'} />
        </>
      )}

      {/* Structured Data - Organization (always) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - WebSite (always) */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Structured Data - Product (when applicable) */}
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}

      {/* Structured Data - FAQ (when applicable) */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Structured Data - Article (when applicable) */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
