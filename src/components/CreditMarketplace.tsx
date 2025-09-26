import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart,
  MapPin,
  Star,
  Users,
  Leaf,
  Award,
  Filter,
  Search,
  Heart,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreditMarketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEcosystem, setSelectedEcosystem] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("price");

  const projects = [
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      ngo: "Coastal Conservation Alliance",
      location: "West Bengal, India",
      ecosystem: "mangrove",
      description: "Large-scale mangrove restoration project protecting coastal communities and biodiversity",
      hectares: 120,
      creditsAvailable: 2400,
      pricePerCredit: 20,
      rating: 4.8,
      reviews: 156,
      verification: "Gold Standard",
      cobenefits: ["Biodiversity", "Community Jobs", "Coastal Protection"],
      images: ["https://images.unsplash.com/photo-1571768804099-3fb1ec5d2bfa?w=400&q=80"],
      communities: 8,
      jobsCreated: 145,
      speciesProtected: 23,
      established: "2022",
      nextHarvest: "Q2 2024"
    },
    {
      id: 2,
      name: "Gulf of Mannar Seagrass Conservation",
      ngo: "Marine Ecosystem Foundation",
      location: "Tamil Nadu, India",
      ecosystem: "seagrass",
      description: "Seagrass meadow restoration creating marine sanctuaries for endangered species",
      hectares: 85,
      creditsAvailable: 1700,
      pricePerCredit: 18,
      rating: 4.9,
      reviews: 203,
      verification: "Verified Carbon Standard",
      cobenefits: ["Marine Biodiversity", "Fisheries Recovery", "Research"],
      images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"],
      communities: 5,
      jobsCreated: 89,
      speciesProtected: 41,
      established: "2021",
      nextHarvest: "Q3 2024"
    },
    {
      id: 3,
      name: "Chilika Wetland Protection Initiative",
      ngo: "Wetland Warriors",
      location: "Odisha, India",
      ecosystem: "wetland",
      description: "Protecting Asia's largest brackish water lagoon and its unique ecosystem",
      hectares: 200,
      creditsAvailable: 4000,
      pricePerCredit: 22,
      rating: 4.7,
      reviews: 127,
      verification: "Climate Action Reserve",
      cobenefits: ["Migratory Birds", "Fisheries", "Ecotourism"],
      images: ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80"],
      communities: 12,
      jobsCreated: 234,
      speciesProtected: 67,
      established: "2020",
      nextHarvest: "Q1 2024"
    },
    {
      id: 4,
      name: "Kerala Backwater Restoration",
      ngo: "Backwater Biodiversity Trust",
      location: "Kerala, India",
      ecosystem: "mangrove",
      description: "Restoring traditional backwater ecosystems and supporting local fishing communities",
      hectares: 95,
      creditsAvailable: 1900,
      pricePerCredit: 19,
      rating: 4.6,
      reviews: 89,
      verification: "Gold Standard",
      cobenefits: ["Traditional Livelihoods", "Water Quality", "Tourism"],
      images: ["https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400&q=80"],
      communities: 7,
      jobsCreated: 167,
      speciesProtected: 34,
      established: "2023",
      nextHarvest: "Q4 2024"
    }
  ];

  const [cart, setCart] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEcosystem = selectedEcosystem === "all" || project.ecosystem === selectedEcosystem;
    const matchesRegion = selectedRegion === "all" || project.location.includes(selectedRegion);
    
    return matchesSearch && matchesEcosystem && matchesRegion;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.pricePerCredit - b.pricePerCredit;
      case 'rating': return b.rating - a.rating;
      case 'credits': return b.creditsAvailable - a.creditsAvailable;
      default: return 0;
    }
  });

  const addToCart = (project: any, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === project.id);
      if (existing) {
        return prev.map(item => 
          item.id === project.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...project, quantity }];
    });

    toast({
      title: "Added to Cart",
      description: `${quantity} credits from ${project.name} added to cart`
    });
  };

  const toggleFavorite = (projectId: number) => {
    setFavorites(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getEcosystemColor = (ecosystem: string) => {
    switch (ecosystem) {
      case 'mangrove': return 'bg-green-500';
      case 'seagrass': return 'bg-blue-500';
      case 'wetland': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const totalCartValue = cart.reduce((sum, item) => sum + (item.pricePerCredit * item.quantity), 0);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="eco-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-ocean-blue" />
            Blue Carbon Credit Marketplace
          </CardTitle>
          <CardDescription>
            Purchase verified blue carbon credits from restoration projects across India
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 eco-input"
              />
            </div>
            
            <Select value={selectedEcosystem} onValueChange={setSelectedEcosystem}>
              <SelectTrigger>
                <SelectValue placeholder="Ecosystem Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ecosystems</SelectItem>
                <SelectItem value="mangrove">Mangrove</SelectItem>
                <SelectItem value="seagrass">Seagrass</SelectItem>
                <SelectItem value="wetland">Wetland</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                <SelectItem value="West Bengal">West Bengal</SelectItem>
                <SelectItem value="Odisha">Odisha</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="rating">Rating (High to Low)</SelectItem>
                <SelectItem value="credits">Credits Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="eco-card border-ocean-blue/50 bg-ocean-blue/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Cart Summary</h3>
                <p className="text-sm text-muted-foreground">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} credits from {cart.length} projects
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-ocean-blue">
                  ${totalCartValue.toLocaleString()}
                </div>
                <Button className="gradient-ocean text-white hover:opacity-90">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedProjects.map((project) => (
          <Card key={project.id} className="eco-card hover:shadow-nature transition-eco">
            <div className="relative">
              <img 
                src={project.images[0]} 
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80";
                }}
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => toggleFavorite(project.id)}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favorites.includes(project.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`} 
                  />
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={`${getEcosystemColor(project.ecosystem)} text-white capitalize`}>
                  {project.ecosystem}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-ocean-blue">
                    ${project.pricePerCredit}
                  </div>
                  <p className="text-sm text-muted-foreground">per credit</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{project.rating}</span>
                  <span className="text-muted-foreground">({project.reviews})</span>
                </div>
                <Badge variant="outline" className="text-nature-green border-nature-green">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {project.verification}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{project.description}</p>
              
              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="font-semibold text-nature-green">{project.hectares}</div>
                  <div className="text-xs text-muted-foreground">Hectares</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-ocean-blue">{project.creditsAvailable.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Credits Available</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-forest-green">{project.communities}</div>
                  <div className="text-xs text-muted-foreground">Communities</div>
                </div>
              </div>

              {/* Co-benefits */}
              <div>
                <p className="text-sm font-medium mb-2">Co-benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {project.cobenefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{project.jobsCreated} jobs created</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <span>{project.speciesProtected} species protected</span>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Credits"
                    min="1"
                    max={project.creditsAvailable}
                    className="eco-input"
                    id={`credits-${project.id}`}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById(`credits-${project.id}`) as HTMLInputElement;
                      const quantity = parseInt(input.value) || 1;
                      addToCart(project, quantity);
                      input.value = '';
                    }}
                    className="gradient-ocean text-white hover:opacity-90"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Award className="h-4 w-4 mr-1" />
                    Verification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <Card className="eco-card">
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No projects found matching your criteria</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedEcosystem('all');
                setSelectedRegion('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreditMarketplace;