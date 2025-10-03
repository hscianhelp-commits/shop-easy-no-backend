import React, { useState, useMemo } from 'react';
import { TopNavigation, BottomNavigation } from '@/components/Navigation';
import { CategoryScroll } from '@/components/CategoryScroll';
import { ProductCard } from '@/components/ProductCard';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { BannerCarousel } from '@/components/BannerCarousel';
import { HomeSearchBox } from '@/components/HomeSearchBox';
import { products, categories } from '@/data/products';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation showSearch={false} />
      
      <main className="pb-20 md:pb-8">
        {/* Desktop: Banner Left, Categories Right | Mobile: Stacked */}
        <div className="md:grid md:grid-cols-2 md:gap-6 md:container md:mx-auto md:px-4 md:py-6">
          {/* Banner Section */}
          <div className="md:order-1">
            <BannerCarousel />
            
            {/* Search Box - stays below banner */}
            <div className="px-4 py-4 md:px-0">
              <HomeSearchBox />
            </div>
          </div>

          {/* Categories Section - Desktop Only on Right */}
          <div className="hidden md:block md:order-2">
            <CategoryScroll
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Mobile Categories - Full Width */}
        <section className="py-2 md:hidden">
          <CategoryScroll
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4">
          <h2 className="font-inter font-semibold text-xl mb-4">
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <ScrollToTopButton />
      <BottomNavigation />
    </div>
  );
};

export default Home;
