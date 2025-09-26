import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  DollarSign,
  Users,
  Leaf,
  Star,
  Eye,
  ShoppingCart,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

const ProjectMarketplace = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const marketplaceData = {
    totalCreditsListed: 15600,
    averagePrice: 19.5,
    totalViews: 2340,
    interestedBuyers: 45,
    marketTrend: 8.5 // percentage increase
  };

  const listedProjects = [
    {
      id: 1,
      name: "Sundarbans Mangrove Restoration",
      status: "active",
      creditsListed: 2400,
      pricePerCredit: 20,
      totalViews: 890,
      interestedBuyers: 12,
      salesThisMonth: 800,
      rating: 4.8,
      reviews: 156,
      ecosystem: "mangrove",
      location: "West Bengal, India",
      listedDate: "2024-02-15",
      marketPerformance: {
        trend: "up",
        changePercent: 12.5
      },
      potentialBuyers: [
        { company: "EcoTech Industries", interest: "high", quantity: 500 },
        { company: "GreenTech Solutions", interest: "medium", quantity: 300 },
        { company: "Sustainable Corp", interest: "high", quantity: 700 }
      ]
    },
    {
      id: 2,
      name: "Gulf of Mannar Seagrass Conservation",
      status: "pending_verification",
      creditsListed: 1700,
      pricePerCredit: 18,
      totalViews: 650,
      interestedBuyers: 8,
      salesThisMonth: 0,
      rating: 4.9,
      reviews: 203,
      ecosystem: "seagrass",
      location: "Tamil Nadu, India",
      listedDate: "2024-03-01",
      marketPerformance: {
        trend: "neutral",
        changePercent: 0
      },
      potentialBuyers: [
        { company: "Marine Solutions Ltd", interest: "high", quantity: 400 },
        { company: "Blue Ocean Corp", interest: "medium", quantity: 250 }
      ]
    },
    {
      id: 3,
      name: "Kerala Backwater Restoration",
      status: "active",
      creditsListed: 1900,
      pricePerCredit: 19,
      totalViews: 720,
      interestedBuyers: 15,
      salesThisMonth: 600,
      rating: 4.6,
      reviews: 89,
      ecosystem: "mangrove",
      location: "Kerala, India",
      listedDate: "2024-01-20",
      marketPerformance: {
        trend: "up",
        changePercent: 7.8
      },
      potentialBuyers: [
        { company: "Coastal Industries", interest: "high", quantity: 600 },
        { company: "Tourism Development Co", interest: "low", quantity: 150 }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-nature-green text-white">Active</Badge>;
      case 'pending_verification':
        return <Badge variant="secondary">Pending Verification</Badge>;
      case 'sold_out':
        return <Badge variant="outline">Sold Out</Badge>;
      default:
        return <Badge variant="outline">Draft</Badge>;
    }
  };

  const getEcosystemIcon = (ecosystem: string) => {
    return <Leaf className="h-4 w-4" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="eco-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Credits Listed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ocean-blue">
              {marketplaceData.totalCreditsListed.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total available</p>
          </CardContent>
        </Card>

        <Card className="eco-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-nature-green">
              ${marketplaceData.averagePrice}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Per credit</p>
          </CardContent>
        </Card>

        <Card className="eco-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {marketplaceData.totalViews.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="eco-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-forest-green flex items-center gap-1">
              <TrendingUp className="h-5 w-5" />
              +{marketplaceData.marketTrend}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Listed Projects */}
      <Card className="eco-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ocean-blue" />
            Your Projects in Marketplace
          </CardTitle>
          <CardDescription>
            Track performance and manage your listed carbon credit projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {listedProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-nature transition-eco">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      {getStatusBadge(project.status)}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-nature-green">
                      ${project.pricePerCredit}
                    </div>
                    <p className="text-sm text-muted-foreground">per credit</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Credits Listed</p>
                    <p className="font-semibold text-ocean-blue">{project.creditsListed.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold">{project.totalViews}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interested Buyers</p>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold">{project.interestedBuyers}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales This Month</p>
                    <div className="flex items-center gap-1">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold text-nature-green">{project.salesThisMonth}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <p className="font-semibold">{project.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(project.marketPerformance.trend)}
                    <span className="text-sm font-medium">
                      Market Performance: {project.marketPerformance.changePercent > 0 ? '+' : ''}{project.marketPerformance.changePercent}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Listed: {new Date(project.listedDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Potential Buyers */}
                {project.potentialBuyers.length > 0 && (
                  <div className="bg-muted/30 rounded-lg p-3 mb-4">
                    <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-ocean-blue" />
                      Potential Buyers
                    </h5>
                    <div className="space-y-2">
                      {project.potentialBuyers.map((buyer, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{buyer.company}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getInterestColor(buyer.interest)}`}
                            >
                              {buyer.interest} interest
                            </Badge>
                          </div>
                          <span className="text-muted-foreground">
                            {buyer.quantity} credits
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Listing
                    </Button>
                    <Button variant="outline" size="sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Adjust Price
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    {project.status === 'pending_verification' && (
                      <Button variant="outline" size="sm" className="text-yellow-600">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Pending Verification
                      </Button>
                    )}
                    {project.status === 'active' && (
                      <Button size="sm" className="gradient-nature text-white hover:opacity-90">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Active Listing
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-nature-green" />
              Performance Insights
            </CardTitle>
            <CardDescription>Key metrics for your marketplace presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Conversion Rate</span>
              <div className="text-right">
                <span className="font-semibold text-nature-green">24.5%</span>
                <div className="text-xs text-muted-foreground">views to sales</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Market Share</span>
                <span>18.5%</span>
              </div>
              <Progress value={18.5} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Avg. Time to Sale</span>
              <span className="font-semibold">12 days</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Repeat Buyers</span>
              <span className="font-semibold text-ocean-blue">67%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="eco-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-ocean-blue" />
              Market Recommendations
            </CardTitle>
            <CardDescription>AI-powered suggestions to optimize sales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-nature-green/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-nature-green mt-0.5" />
              <div>
                <p className="font-medium text-sm">Competitive Pricing</p>
                <p className="text-xs text-muted-foreground">Your prices are 5% below market average - good for quick sales</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Increase Visibility</p>
                <p className="text-xs text-muted-foreground">Add more project images to increase buyer engagement by 30%</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Seasonal Demand</p>
                <p className="text-xs text-muted-foreground">Q4 typically sees 40% higher demand for mangrove credits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectMarketplace;