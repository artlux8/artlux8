import { toast } from 'sonner';

// Shopify Configuration - Storefront API tokens are designed for client-side use
// See: https://shopify.dev/docs/api/storefront#authentication
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'artlux8-ypxf4.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
// Storefront Access Token is a publishable key meant for client-side use (read-only product data)
const SHOPIFY_STOREFRONT_TOKEN = '33e073344fd0491eb2329ec9d56269b8';

// Types
export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    vendor?: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// Use Cart API (cartCreate) for 2025-07 API version
// checkoutCreate is deprecated - Cart API returns checkoutUrl
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront API helper
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  if (!SHOPIFY_STOREFRONT_TOKEN) {
    console.error('Shopify Storefront Token not configured');
    toast.error("Shopify not configured", {
      description: "Please configure VITE_SHOPIFY_STOREFRONT_TOKEN environment variable.",
    });
    return null;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch all products
export async function fetchProducts(limit: number = 50, query?: string): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: limit, query });
    if (!data) return [];
    return data.data.products.edges || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  try {
    const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!data) return null;
    return data.data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create checkout using Cart API (cartCreate mutation) - for 2025-07 API
export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  console.log('=== CHECKOUT DEBUG START ===');
  console.log('Items received:', JSON.stringify(items, null, 2));
  
  // Validate items before proceeding
  if (!items || items.length === 0) {
    throw new Error('No items to checkout');
  }

  // Validate each item has required fields
  for (const item of items) {
    if (!item.variantId) {
      throw new Error('Invalid cart item: missing variant ID');
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error('Invalid cart item: invalid quantity');
    }
  }

  try {
    // Format lines for cartCreate mutation (uses merchandiseId, not variantId)
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId, // Cart API uses merchandiseId
    }));

    console.log('Creating cart with lines:', JSON.stringify(lines, null, 2));
    console.log('Using mutation: CART_CREATE_MUTATION');

    const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
    });

    console.log('Shopify API raw response:', JSON.stringify(data, null, 2));

    if (!data) {
      throw new Error('Failed to create cart - no response from Shopify');
    }

    if (data.data?.cartCreate?.userErrors?.length > 0) {
      const errorMessages = data.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ');
      console.error('Shopify cart creation errors:', errorMessages);
      throw new Error(`Cart creation failed: ${errorMessages}`);
    }

    const cart = data.data?.cartCreate?.cart;
    console.log('Cart object:', cart);
    
    if (!cart || !cart.checkoutUrl) {
      console.error('No checkout URL in response:', data);
      throw new Error('No checkout URL returned from Shopify');
    }

    console.log('Raw checkoutUrl from Shopify:', cart.checkoutUrl);
    
    // CRITICAL: Replace custom domain with myshopify.com domain
    // Shopify returns URLs with custom domain (artlux8.com) but cart paths only work on myshopify.com
    let checkoutUrl = cart.checkoutUrl;
    
    // Replace artlux8.com (custom domain) with the permanent myshopify.com domain
    checkoutUrl = checkoutUrl.replace(/https?:\/\/(www\.)?artlux8\.com/gi, `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`);
    checkoutUrl = checkoutUrl.replace(/https?:\/\/(www\.)?artlux8\.co\.uk/gi, `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}`);
    
    console.log('After domain replacement:', checkoutUrl);
    
    // Add channel=online_store parameter for headless checkout
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    checkoutUrl = url.toString();
    
    console.log('FINAL CHECKOUT URL:', checkoutUrl);
    console.log('Domain used:', SHOPIFY_STORE_PERMANENT_DOMAIN);
    console.log('=== CHECKOUT DEBUG END ===');
    
    return checkoutUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
}

// Helper to redirect to checkout URL - instant redirect, no popups
export function redirectToCheckout(url: string): void {
  if (!url) {
    console.error('No checkout URL provided');
    return;
  }
  
  // CRITICAL DEBUG: Log the final URL before redirect
  console.log('=== FINAL CHECKOUT REDIRECT ===');
  console.log('FINAL CHECKOUT URL:', url);
  console.log('Contains /checkouts/:', url.includes('/checkouts/'));
  console.log('Contains /cart/:', url.includes('/cart/'));
  
  if (url.includes('/cart/')) {
    console.error('ERROR: URL still contains /cart/ - checkout will fail!');
  }
  
  // Use location.assign for instant redirect to myshopify.com checkout
  window.location.assign(url);
}
