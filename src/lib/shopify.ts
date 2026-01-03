import { toast } from 'sonner';

// Shopify Configuration - Storefront API tokens are designed for client-side use
// See: https://shopify.dev/docs/api/storefront#authentication
const SHOPIFY_API_VERSION = '2024-10';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'artlux8.myshopify.com';
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

// Use checkoutCreate mutation for direct checkout URL (returns /checkouts/ path)
// Cart API's checkoutUrl returns /cart/c/ which causes issues with SPA routing
const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
        code
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

// Create checkout using checkoutCreate mutation - returns /checkouts/ URL
export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  console.log('[Checkout] Starting checkout with items:', items.length);
  
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
    // Format line items for checkoutCreate mutation
    const lineItems = items.map(item => ({
      quantity: item.quantity,
      variantId: item.variantId,
    }));

    console.log('[Checkout] Calling Shopify checkoutCreate with lineItems:', JSON.stringify(lineItems));

    const data = await storefrontApiRequest(CHECKOUT_CREATE_MUTATION, {
      input: { lineItems },
    });

    console.log('[Checkout] Shopify response:', JSON.stringify(data));

    if (!data) {
      throw new Error('Failed to create checkout - no response from Shopify');
    }

    if (data.data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
      const errorMessages = data.data.checkoutCreate.checkoutUserErrors.map((e: { message: string; code?: string }) => 
        e.code ? `${e.code}: ${e.message}` : e.message
      ).join(', ');
      console.error('[Checkout] User errors:', errorMessages);
      throw new Error(`Checkout creation failed: ${errorMessages}`);
    }

    const checkout = data.data?.checkoutCreate?.checkout;
    
    if (!checkout || !checkout.webUrl) {
      console.error('[Checkout] No checkout URL:', checkout);
      throw new Error('No checkout URL returned from Shopify');
    }

    // webUrl from checkoutCreate is the correct /checkouts/ URL
    let rawUrl = checkout.webUrl;
    console.log('RAW CHECKOUT URL:', rawUrl);
    
    // Normalize to ensure correct Shopify domain
    const normalizedUrl = normalizeCheckoutUrl(rawUrl);
    
    // Add channel parameter for headless checkout
    const url = new URL(normalizedUrl);
    url.searchParams.set('channel', 'online_store');
    
    const finalUrl = url.toString();
    console.log('FINAL CHECKOUT URL:', finalUrl);
    
    // Verify URL contains /checkouts/
    if (!finalUrl.includes('/checkouts/')) {
      console.error('[Checkout] URL does not contain /checkouts/:', finalUrl);
      throw new Error('Invalid checkout URL format');
    }
    
    return finalUrl;
  } catch (error) {
    console.error('[Checkout] Error creating checkout:', error);
    throw error;
  }
}

/**
 * Normalize checkout URL to always use artlux8.myshopify.com domain
 * Handles both relative URLs ("/cart/c/...") and absolute URLs
 */
export function normalizeCheckoutUrl(rawUrl: string): string {
  const SHOPIFY_CHECKOUT_DOMAIN = 'https://artlux8.myshopify.com';
  
  if (!rawUrl) {
    throw new Error('No checkout URL provided');
  }
  
  // If relative URL, prepend Shopify domain
  if (rawUrl.startsWith('/')) {
    return SHOPIFY_CHECKOUT_DOMAIN + rawUrl;
  }
  
  // If absolute URL, force hostname to Shopify domain
  try {
    const url = new URL(rawUrl);
    url.hostname = 'artlux8.myshopify.com';
    url.protocol = 'https:';
    return url.toString();
  } catch {
    // Fallback: treat as path
    return SHOPIFY_CHECKOUT_DOMAIN + '/' + rawUrl.replace(/^\/+/, '');
  }
}

// Helper to redirect to checkout URL
export function redirectToCheckout(url: string): void {
  if (!url) {
    console.error('[Checkout] No checkout URL provided');
    return;
  }
  
  const finalUrl = normalizeCheckoutUrl(url);
  console.log('FINAL CHECKOUT URL:', finalUrl);
  window.location.assign(finalUrl);
}
