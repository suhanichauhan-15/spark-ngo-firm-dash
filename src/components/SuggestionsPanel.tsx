import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lightbulb,
  TrendingDown,
  Zap,
  Truck,
  Leaf,
  DollarSign,
  Clock,
  Target,
  ChevronRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface SuggestionsPanelProps {
  calculatedEmissions?: any;
  emissionData?: any;
}

export const SuggestionsPanel = ({ calculatedEmissions, emissionData }: SuggestionsPanelProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const suggestions = [
    {
      id: 1,
      category: "Transportation",
      title: "Fleet Electrification",
      description: "Transition 50% of your delivery fleet to electric vehicles",
      impact: {
        reduction: 2200,
        percentage: 18,
        cost: 450000,
        payback: 3.2,
        roi: 15
      },
      priority: "high",
      implementation: {
        timeline: "6-12 months",
        steps: [
          "Conduct fleet audit and identify suitable vehicles for replacement",
          "Partner with EV manufacturers for bulk procurement discounts",
          "Install charging infrastructure at distribution centers",
          "Train drivers on EV operation and maintenance",
          "Monitor performance and optimize routes for EV efficiency"
        ],
        partners: ["Tata Motors", "Mahindra Electric", "Charging Infrastructure Providers"]
      },
      benefits: [
        "Significant reduction in fuel costs",
        "Lower maintenance requirements",
        "Improved brand image and ESG scores",
        "Government incentives and tax benefits"
      ]
    },
    {
      id: 2,
      category: "Energy",
      title: "Solar Power Implementation",
      description: "Install rooftop solar panels to cover 70% of energy needs",
      impact: {
        reduction: 1800,
        percentage: 14,
        cost: 320000,
        payback: 2.8,
        roi: 22
      },
      priority: "high",
      implementation: {
        timeline: "4-8 months",
        steps: [
          "Conduct solar potential assessment of facilities",
          "Obtain necessary permits and grid connection approvals",
          "Select certified solar installer and equipment",
          "Install monitoring systems for performance tracking",
          "Set up net metering for excess energy sales"
        ],
        partners: ["Tata Power Solar", "NTPC Solar", "Local Solar Installers"]
      },
      benefits: [
        "Predictable energy costs for 25+ years",
        "Reduced grid dependency",
        "Carbon footprint reduction",
        "Potential revenue from excess energy sales"
      ]
    },
    {
      id: 3,
      category: "Manufacturing",
      title: "Energy Efficiency Upgrades",
      description: "Implement LED lighting and smart HVAC systems",
      impact: {
        reduction: 950,
        percentage: 8,
        cost: 180000,
        payback: 2.1,
        roi: 28
      },
      priority: "medium",
      implementation: {
        timeline: "3-6 months",
        steps: [
          "Energy audit to identify inefficiencies",
          "Replace all lighting with LED systems",
          "Install smart thermostats and HVAC controls",
          "Implement building automation systems",
          "Regular monitoring and optimization"
        ],
        partners: ["Philips Lighting", "Johnson Controls", "Siemens"]
      },
      benefits: [
        "Immediate energy cost savings",
        "Improved workplace comfort",
        "Lower maintenance costs",
        "Smart monitoring capabilities"
      ]
    },
    {
      id: 4,
      category: "Waste Management",
      title: "Circular Economy Initiative",
      description: "Implement comprehensive recycling and waste-to-energy program",
      impact: {
        reduction: 720,
        percentage: 6,
        cost: 95000,
        payback: 1.8,
        roi: 35
      },
      priority: "medium",
      implementation: {
        timeline: "2-4 months",
        steps: [
          "Waste audit and categorization",
          "Set up segregation systems at source",
          "Partner with certified recycling facilities",
          "Implement waste-to-energy solutions",
          "Employee training and awareness programs"
        ],
        partners: ["Waste Management Companies", "Recycling Facilities", "Local NGOs"]
      },
      benefits: [
        "Revenue from recyclable materials",
        "Reduced landfill costs",
        "Compliance with environmental regulations",
        "Enhanced sustainability credentials"
      ]
    },
    {
      id: 5,
      category: "Supply Chain",
      title: "Local Sourcing Strategy",
      description: "Shift 60% of raw materials to local suppliers within 500km",
      impact: {
        reduction: 1100,
        percentage: 9,
        cost: 75000,
        payback: 1.2,
        roi: 45
      },
      priority: "low",
      implementation: {
        timeline: "6-18 months",
        steps: [
          "Map current supply chain and identify local alternatives",
          "Qualify local suppliers for quality and capacity",
          "Negotiate contracts with cost and sustainability clauses",
          "Gradually transition procurement to local sources",
          "Monitor quality and delivery performance"
        ],
        partners: ["Local Suppliers", "Industry Associations", "Government Trade Bodies"]
      },
      benefits: [
        "Reduced transportation emissions",
        "Lower logistics costs",
        "Support for local economy",
        "Improved supply chain resilience"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Transportation': return Truck;
      case 'Energy': return Zap;
      case 'Manufacturing': return Target;
      case 'Waste Management': return Leaf;
      case 'Supply Chain': return TrendingDown;
      default: return Lightbulb;
    }
  };

  const totalPotentialReduction = suggestions.reduce((sum, s) => sum + s.impact.reduction, 0);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="eco-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-nature-green" />
            AI-Powered Reduction Suggestions
          </CardTitle>
          <CardDescription>
            Personalized recommendations based on your emission profile and industry best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-nature-green/10 rounded-lg">
              <div className="text-2xl font-bold text-nature-green">
                {totalPotentialReduction.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">tCO₂e Potential Reduction</p>
            </div>
            <div className="text-center p-4 bg-ocean-blue/10 rounded-lg">
              <div className="text-2xl font-bold text-ocean-blue">55%</div>
              <p className="text-sm text-muted-foreground">Total Emission Reduction</p>
            </div>
            <div className="text-center p-4 bg-forest-green/10 rounded-lg">
              <div className="text-2xl font-bold text-forest-green">$2.1M</div>
              <p className="text-sm text-muted-foreground">Annual Cost Savings</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions List */}
      <div className="grid grid-cols-1 gap-4">
        {suggestions.map((suggestion) => {
          const IconComponent = getCategoryIcon(suggestion.category);
          const isSelected = selectedSuggestion === suggestion.id;
          
          return (
            <Card 
              key={suggestion.id} 
              className={`eco-card cursor-pointer transition-eco ${
                isSelected ? 'ring-2 ring-ocean-blue shadow-nature' : 'hover:shadow-nature'
              }`}
              onClick={() => setSelectedSuggestion(isSelected ? null : suggestion.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-ocean-blue/10">
                      <IconComponent className="h-5 w-5 text-ocean-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      <CardDescription>{suggestion.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(suggestion.priority)}`}></div>
                    <Badge variant="outline" className="capitalize">
                      {suggestion.priority} Priority
                    </Badge>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isSelected ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reduction</p>
                    <p className="font-semibold text-nature-green">
                      {suggestion.impact.reduction.toLocaleString()} tCO₂e
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-semibold text-ocean-blue">
                      {suggestion.impact.percentage}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Investment</p>
                    <p className="font-semibold">
                      ${suggestion.impact.cost.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payback</p>
                    <p className="font-semibold text-forest-green">
                      {suggestion.impact.payback} years
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Emission Reduction Progress</span>
                    <span>{suggestion.impact.percentage}%</span>
                  </div>
                  <Progress value={suggestion.impact.percentage} className="h-2" />
                </div>

                {isSelected && (
                  <div className="space-y-6 pt-4 border-t animate-fade-in-up">
                    {/* Implementation Timeline */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-ocean-blue" />
                        Implementation Plan ({suggestion.implementation.timeline})
                      </h4>
                      <div className="space-y-2">
                        {suggestion.implementation.steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="bg-ocean-blue/10 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-ocean-blue" />
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-nature-green" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestion.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-nature-green rounded-full mt-2"></div>
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Partners */}
                    <div>
                      <h4 className="font-semibold mb-3">Recommended Partners</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.implementation.partners.map((partner, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button className="gradient-ocean text-white hover:opacity-90">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Start Implementation
                      </Button>
                      <Button variant="outline">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Get Detailed Quote
                      </Button>
                      <Button variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Risk Assessment
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestionsPanel;