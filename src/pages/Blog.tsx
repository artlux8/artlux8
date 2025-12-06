import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles, blogCategories } from "@/data/blogArticles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Clock, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  TrendingUp
} from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = blogArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = blogArticles.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-secondary/50 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold text-sm tracking-widest uppercase font-medium">
                Longevity Science Blog
              </span>
            </div>
            
            <h1 className="font-logo text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ARTLUX<span className="logo-infinity">∞</span> Knowledge Hub
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Science-backed insights on longevity, autophagy, NAD+, and natural health optimization. 
              No pharma propaganda — just truth.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-full border-border bg-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-gold" />
            <h2 className="font-logo text-2xl font-bold text-foreground">Featured Articles</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-gold/20 via-secondary to-secondary flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gold/50 group-hover:text-gold transition-colors" />
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-3 text-gold border-gold/30">
                    {article.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} read
                    </span>
                    <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gold hover:bg-gold/90 text-primary" 
                  : "border-border hover:border-gold/50 hover:text-gold"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-logo text-2xl font-bold text-foreground">
              All Articles ({filteredArticles.length})
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:border-gold/50 transition-all duration-300"
              >
                <Badge variant="outline" className="mb-3 text-xs text-gold border-gold/30">
                  {article.category}
                </Badge>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.keywords.slice(0, 2).map(keyword => (
                      <span key={keyword} className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-logo text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Longevity Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands who are optimizing their health with science-backed protocols.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-primary">
              <Link to="/free-protocol">
                Start Free Protocol
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold/50 hover:bg-gold/10">
              <Link to="/shop">
                Explore Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
