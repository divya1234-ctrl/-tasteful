import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Star, ChefHat, Clock, Truck, Leaf } from "lucide-react";
import { useListCategories, useListDishes, useGetPopularDishes, useGetStatsSummary } from "@workspace/api-client-react";
import { DishCard } from "@/components/DishCard";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const { data: popularDishes } = useGetPopularDishes();
  const { data: featuredDishes } = useListDishes({ featured: true });
  const { data: categories } = useListCategories();
  const { data: stats } = useGetStatsSummary();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-10 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop" 
            alt="Beautiful plated food" 
            className="w-full h-full object-cover object-right"
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 animate-in slide-in-from-bottom-4 duration-500">
              Modern Comfort Food
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 text-foreground leading-[1.1] animate-in slide-in-from-bottom-8 duration-700">
              Honest ingredients,<br />
              <span className="text-primary italic">crafted</span> with care.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed animate-in slide-in-from-bottom-10 duration-700 delay-150">
              Experience restaurant-quality meals delivered to your door. Bold flavors, thoughtful presentation, zero compromises.
            </p>
            <div className="flex flex-wrap gap-4 animate-in slide-in-from-bottom-12 duration-700 delay-300">
              <Link href="/menu">
                <Button size="lg" className="group text-base h-14 px-8 rounded-full shadow-lg tf-shine tf-press transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                  Explore Menu
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full bg-background/50 backdrop-blur-sm tf-press transition-all hover:bg-background hover:border-primary hover:text-primary">
                  Our Story
                </Button>
              </Link>
            </div>
            
            {stats && (
              <div className="mt-16 flex gap-8 items-center animate-in fade-in duration-1000 delay-500">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-serif">{stats.averageRating.toFixed(1)}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>Average Rating</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-border"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold font-serif">{stats.averagePrepMinutes}m</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Avg. Prep Time</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredDishes && featuredDishes.length > 0 && (
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Chef's Selections</h2>
                <p className="text-muted-foreground">Curated dishes highlighting seasonal ingredients.</p>
              </div>
              <Link href="/menu?featured=true">
                <Button variant="ghost" className="hidden md:flex group">
                  View all <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDishes.slice(0, 4).map((dish, i) => (
                <div key={dish.id} className="animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 100}ms` }}>
                  <DishCard dish={dish} />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link href="/menu?featured=true">
                <Button variant="outline" className="w-full">
                  View all selections
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-center">Browse by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <Link key={cat.id} href={`/menu?category=${cat.id}`}>
                  <a
                    className="relative overflow-hidden group flex flex-col items-center justify-center p-6 bg-card rounded-2xl border hover:border-primary/60 hover:shadow-lg transition-all duration-300 text-center gap-3 animate-in zoom-in-95 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <span className="font-serif italic text-3xl text-primary transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6">{cat.name.charAt(0)}</span>
                    <div className="relative">
                      <h3 className="font-bold text-sm md:text-base transition-colors group-hover:text-primary">{cat.name}</h3>
                      <span className="text-xs text-muted-foreground">{cat.dishCount} items</span>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular List / Menu preview */}
      {popularDishes && popularDishes.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Crowd Favorites</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Our most ordered dishes this week. Don't miss out on what everyone is talking about.
                </p>
                <Link href="/menu">
                  <Button size="lg" className="rounded-full">
                    See Full Menu
                  </Button>
                </Link>
              </div>
              
              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {popularDishes.slice(0, 4).map((dish) => (
                  <Link key={dish.dishId} href={`/dishes/${dish.dishId}`}>
                    <a className="flex items-center gap-4 p-4 bg-card rounded-xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 tf-shine">
                        <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold font-serif truncate transition-colors group-hover:text-primary">{dish.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                          <span>{dish.rating.toFixed(1)}</span>
                          <span>•</span>
                          <span>{dish.ordersCount} ordered</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-1 shrink-0">
                        <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust Strip */}
      <section className="py-16 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x">
            <div className="group flex flex-col items-center p-4 cursor-default">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                <ChefHat size={26} className="tf-bounce" />
              </div>
              <h3 className="font-bold text-lg mb-2 transition-colors group-hover:text-primary">Master Chefs</h3>
              <p className="text-muted-foreground text-sm">Prepared by culinary experts with decades of high-end restaurant experience.</p>
            </div>
            <div className="group flex flex-col items-center p-4 pt-8 md:pt-4 cursor-default">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                <Leaf size={26} className="tf-wiggle" />
              </div>
              <h3 className="font-bold text-lg mb-2 transition-colors group-hover:text-primary">Sourced Locally</h3>
              <p className="text-muted-foreground text-sm">We partner with local farms to bring you the freshest seasonal ingredients.</p>
            </div>
            <div className="group flex flex-col items-center p-4 pt-8 md:pt-4 cursor-default">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30">
                <Truck size={26} className="tf-bounce transition-transform duration-500 group-hover:translate-x-1" />
              </div>
              <h3 className="font-bold text-lg mb-2 transition-colors group-hover:text-primary">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">Optimized routing ensures your food arrives hot, fresh, and exactly on time.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
