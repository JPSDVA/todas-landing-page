import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetail from '@/components/ProductDetail';
import { getProductByHandle } from '@/lib/shopify';

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: 'Todas' };
  const description = product.description.slice(0, 160);
  return {
    title: `${product.title} — Todas`,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.image ? [product.image.url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <main>
      <Navbar solid />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
