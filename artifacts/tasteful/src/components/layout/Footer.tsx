import { Link } from "wouter";
import { UtensilsCrossed, Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/">
              <a className="flex items-center gap-2 mb-4">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-full">
                  <UtensilsCrossed size={18} />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight">
                  Tasteful
                </span>
              </a>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              A contemporary kitchen crafting memorable meals from honest ingredients. Delivered to your door with care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-serif">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/menu"><a className="hover:text-primary transition-colors">Full Menu</a></Link>
              </li>
              <li>
                <Link href="/about"><a className="hover:text-primary transition-colors">Our Story</a></Link>
              </li>
              <li>
                <Link href="/orders"><a className="hover:text-primary transition-colors">Recent Orders</a></Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-serif">Hours</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>11am - 9pm</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>11am - 10pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>12pm - 8pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 font-serif">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>123 Culinary Ave</li>
              <li>San Francisco, CA 94103</li>
              <li>hello@tasteful.kitchen</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Tasteful Kitchen. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
