const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2025-07';

export const shopifyConfigured = Boolean(domain && token);

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate?: number,
): Promise<T> {
  if (!shopifyConfigured) throw new Error('Shopify no está configurado');

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined ? { next: { revalidate } } : {}),
  });

  if (!res.ok) throw new Error(`Shopify respondió ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

// ---------- Productos ----------

export interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: number;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  image: { url: string; alt: string } | null;
  price: number;
  currency: string;
  variants: Variant[];
}

const PRODUCTS_QUERY = `
  query Products {
    products(first: 24) {
      edges {
        node {
          id
          handle
          title
          featuredImage { url altText }
          variants(first: 20) {
            edges { node { id title availableForSale price { amount currencyCode } } }
          }
        }
      }
    }
  }
`;

type ProductsResponse = {
  products: {
    edges: {
      node: {
        id: string;
        handle: string;
        title: string;
        featuredImage: { url: string; altText: string | null } | null;
        variants: {
          edges: {
            node: {
              id: string;
              title: string;
              availableForSale: boolean;
              price: { amount: string; currencyCode: string };
            };
          }[];
        };
      };
    }[];
  };
};

export async function getProducts(): Promise<Product[]> {
  if (!shopifyConfigured) return [];
  try {
    const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, {}, 60);
    return data.products.edges.map(({ node }) => {
      const variants = node.variants.edges.map(({ node: v }) => ({
        id: v.id,
        title: v.title,
        availableForSale: v.availableForSale,
        price: parseFloat(v.price.amount),
      }));
      return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        image: node.featuredImage
          ? { url: node.featuredImage.url, alt: node.featuredImage.altText ?? node.title }
          : null,
        price: variants.length ? Math.min(...variants.map((v) => v.price)) : 0,
        currency: node.variants.edges[0]?.node.price.currencyCode ?? 'MXN',
        variants,
      };
    });
  } catch (e) {
    console.error('getProducts falló:', e);
    return [];
  }
}

// ---------- Detalle de producto ----------

export interface ProductDetail extends Product {
  description: string;
  images: { url: string; alt: string }[];
}

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      featuredImage { url altText }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 50) {
        edges { node { id title availableForSale price { amount currencyCode } } }
      }
    }
  }
`;

type ProductResponse = {
  product: {
    id: string;
    handle: string;
    title: string;
    description: string;
    featuredImage: { url: string; altText: string | null } | null;
    images: { edges: { node: { url: string; altText: string | null } }[] };
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price: { amount: string; currencyCode: string };
        };
      }[];
    };
  } | null;
};

export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  if (!shopifyConfigured) return null;
  try {
    const data = await shopifyFetch<ProductResponse>(PRODUCT_QUERY, { handle }, 60);
    const p = data.product;
    if (!p) return null;
    const variants = p.variants.edges.map(({ node: v }) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: parseFloat(v.price.amount),
    }));
    const images = p.images.edges.map(({ node }) => ({ url: node.url, alt: node.altText ?? p.title }));
    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      description: p.description,
      image: images[0] ?? null,
      images,
      price: variants.length ? Math.min(...variants.map((v) => v.price)) : 0,
      currency: p.variants.edges[0]?.node.price.currencyCode ?? 'USD',
      variants,
    };
  } catch (e) {
    console.error('getProductByHandle falló:', e);
    return null;
  }
}

// ---------- Carrito ----------

export interface CartLine {
  id: string;
  quantity: number;
  title: string;
  variantTitle: string;
  price: number;
  image: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currency: string;
  lines: CartLine[];
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            title
            price { amount }
            image { url }
            product { title featuredImage { url } }
          }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          title: string;
          price: { amount: string };
          image: { url: string } | null;
          product: { title: string; featuredImage: { url: string } | null };
        };
      };
    }[];
  };
};

function mapCart(c: RawCart): Cart {
  return {
    id: c.id,
    checkoutUrl: c.checkoutUrl,
    totalQuantity: c.totalQuantity,
    subtotal: parseFloat(c.cost.subtotalAmount.amount),
    currency: c.cost.subtotalAmount.currencyCode,
    lines: c.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      title: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      price: parseFloat(node.merchandise.price.amount),
      image: node.merchandise.image?.url ?? node.merchandise.product.featuredImage?.url ?? null,
    })),
  };
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(
    `query GetCart($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`,
    { id: cartId },
  );
  return data.cart ? mapCart(data.cart) : null;
}

export async function createCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: RawCart } }>(
    `mutation CartCreate($lines: [CartLineInput!]) {
       cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } }
     }`,
    { lines: [{ merchandiseId: variantId, quantity }] },
  );
  return mapCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: RawCart } }>(
    `mutation CartAdd($cartId: ID!, $lines: [CartLineInput!]!) {
       cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
     }`,
    { cartId, lines: [{ merchandiseId: variantId, quantity }] },
  );
  return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: RawCart } }>(
    `mutation CartUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
       cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
     }`,
    { cartId, lines: [{ id: lineId, quantity }] },
  );
  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: RawCart } }>(
    `mutation CartRemove($cartId: ID!, $lineIds: [ID!]!) {
       cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
     }`,
    { cartId, lineIds: [lineId] },
  );
  return mapCart(data.cartLinesRemove.cart);
}

export function formatPrice(amount: number, currency = 'USD') {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} ${currency}`;
}
