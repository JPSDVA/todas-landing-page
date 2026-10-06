import { getProducts } from '@/lib/shopify';
import ShopGrid from './ShopGrid';

// Server component: trae los productos de Shopify (se refrescan cada 60 s).
export default async function Shop() {
  const products = await getProducts();
  if (products.length === 0) return null;
  return <ShopGrid products={products} />;
}
