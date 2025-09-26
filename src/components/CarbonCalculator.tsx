import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Zap, 
  Factory, 
  Building2, 
  Plane, 
  Recycle,
  Calculator,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CarbonCalculator = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("transportation");
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    // Transportation
    fuelDiesel: '',
    fuelPetrol: '',
    fuelCNG: '',
    electricKm: '',
    fleetDistance: '',
    
    // Energy
    electricityConsumption: '',
    renewablePercent: '',
    dieselGeneration: '',
    
    // Manufacturing
    rawMaterials: '',
    energyPerUnit: '',
    wasteHeatRecovery: '',
    
    // Buildings
    officeEnergy: '',
    hvacType: '',
    waterUsage: '',
    
    // Travel
    domesticFlights: '',
    internationalFlights: '',
    hotelNights: '',
    
    // Waste
    plasticWaste: '',
    organicWaste: '',
    recyclingPercent: ''
  });

  const categories = [
    { id: 'transportation', label: 'Transportation', icon: Truck, color: 'text-red-500' },
    { id: 'energy', label: 'Energy Use', icon: Zap, color: 'text-orange-500' },
    { id: 'manufacturing', label: 'Manufacturing', icon: Factory, color: 'text-yellow-600' },
    { id: 'buildings', label: 'Buildings', icon: Building2, color: 'text-blue-500' },
    { id: 'travel', label: 'Business Travel', icon: Plane, color: 'text-purple-500' },
    { id: 'waste', label: 'Waste & Recycling', icon: Recycle, color: 'text-green-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEmissions = () => {
    // Simplified emission factors (tCO2e)
    const emissionFactors = {
      diesel: 2.68, // per liter
      petrol: 2.31, // per liter
      cng: 1.87, // per kg
      electricity: 0.0008, // per kWh (grid average)
      flight_domestic: 0.255, // per km
      flight_international: 0.195, // per km
      plastic_waste: 3.1, // per tonne
      organic_waste: 0.5 // per tonne
    };

    let totalEmissions = 0;
    const breakdown: Record<string, number> = {};

    // Transportation calculations
    const dieselEmissions = (parseFloat(formData.fuelDiesel) || 0) * emissionFactors.diesel;
    const petrolEmissions = (parseFloat(formData.fuelPetrol) || 0) * emissionFactors.petrol;
    const cngEmissions = (parseFloat(formData.fuelCNG) || 0) * emissionFactors.cng;
    breakdown.transportation = dieselEmissions + petrolEmissions + cngEmissions;

    // Energy calculations
    const electricityEmissions = (parseFloat(formData.electricityConsumption) || 0) * emissionFactors.electricity;
    const renewableReduction = electricityEmissions * ((parseFloat(formData.renewablePercent) || 0) / 100);
    breakdown.energy = Math.max(0, electricityEmissions - renewableReduction);

    // Manufacturing calculations
    const manufacturingBase = (parseFloat(formData.rawMaterials) || 0) * 0.5; // simplified factor
    breakdown.manufacturing = manufacturingBase;

    // Buildings calculations
    const buildingEmissions = (parseFloat(formData.officeEnergy) || 0) * emissionFactors.electricity;
    breakdown.buildings = buildingEmissions;

    // Travel calculations
    const domesticFlightEmissions = (parseFloat(formData.domesticFlights) || 0) * emissionFactors.flight_domestic;
    const internationalFlightEmissions = (parseFloat(formData.internationalFlights) || 0) * emissionFactors.flight_international;
    breakdown.travel = domesticFlightEmissions + internationalFlightEmissions;

    // Waste calculations
    const plasticWasteEmissions = (parseFloat(formData.plasticWaste) || 0) * emissionFactors.plastic_waste;
    const organicWasteEmissions = (parseFloat(formData.organicWaste) || 0) * emissionFactors.organic_waste;
    const recyclingReduction = plasticWasteEmissions * ((parseFloat(formData.recyclingPercent) || 0) / 100);
    breakdown.waste = Math.max(0, plasticWasteEmissions + organicWasteEmissions - recyclingReduction);

    totalEmissions = Object.values(breakdown).reduce((sum: number, value: unknown) => sum + (value as number), 0);

    setCalculationResults({
      total: totalEmissions,
      breakdown,
      recommendations: generateRecommendations(breakdown)
    });

    toast({
      title: "Calculation Complete",
      description: `Total emissions: ${totalEmissions.toFixed(2)} tCO₂e`
    });
  };

  const generateRecommendations = (breakdown: any) => {
    const recommendations = [];
    
    if (breakdown.transportation > breakdown.energy) {
      recommendations.push("Consider transitioning to electric vehicles for your fleet");
    }
    if (breakdown.energy > 100) {
      recommendations.push("Invest in renewable energy sources like solar panels");
    }
    if (breakdown.travel > 50) {
      recommendations.push("Implement virtual meeting policies to reduce business travel");
    }
    
    return recommendations;
  };

  const renderTransportationForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fuelDiesel">Diesel Consumption (Liters/year)</Label>
          <Input
            id="fuelDiesel"
            type="number"
            placeholder="Enter diesel usage"
            value={formData.fuelDiesel}
            onChange={(e) => handleInputChange('fuelDiesel', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="fuelPetrol">Petrol Consumption (Liters/year)</Label>
          <Input
            id="fuelPetrol"
            type="number"
            placeholder="Enter petrol usage"
            value={formData.fuelPetrol}
            onChange={(e) => handleInputChange('fuelPetrol', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="fuelCNG">CNG Consumption (Kg/year)</Label>
          <Input
            id="fuelCNG"
            type="number"
            placeholder="Enter CNG usage"
            value={formData.fuelCNG}
            onChange={(e) => handleInputChange('fuelCNG', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="electricKm">Electric Vehicle Distance (Km/year)</Label>
          <Input
            id="electricKm"
            type="number"
            placeholder="Enter EV distance"
            value={formData.electricKm}
            onChange={(e) => handleInputChange('electricKm', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderEnergyForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="electricityConsumption">Electricity Consumption (kWh/year)</Label>
          <Input
            id="electricityConsumption"
            type="number"
            placeholder="Enter electricity usage"
            value={formData.electricityConsumption}
            onChange={(e) => handleInputChange('electricityConsumption', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="renewablePercent">Renewable Energy (%)</Label>
          <Input
            id="renewablePercent"
            type="number"
            max="100"
            placeholder="% of renewable energy"
            value={formData.renewablePercent}
            onChange={(e) => handleInputChange('renewablePercent', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderManufacturingForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rawMaterials">Raw Materials (Tonnes/year)</Label>
          <Input
            id="rawMaterials"
            type="number"
            placeholder="Enter raw material usage"
            value={formData.rawMaterials}
            onChange={(e) => handleInputChange('rawMaterials', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="energyPerUnit">Energy per Unit (kWh/unit)</Label>
          <Input
            id="energyPerUnit"
            type="number"
            placeholder="Energy consumption per unit"
            value={formData.energyPerUnit}
            onChange={(e) => handleInputChange('energyPerUnit', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderBuildingsForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="officeEnergy">Office Energy (kWh/year)</Label>
          <Input
            id="officeEnergy"
            type="number"
            placeholder="Enter office energy usage"
            value={formData.officeEnergy}
            onChange={(e) => handleInputChange('officeEnergy', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="waterUsage">Water Usage (Liters/year)</Label>
          <Input
            id="waterUsage"
            type="number"
            placeholder="Enter water consumption"
            value={formData.waterUsage}
            onChange={(e) => handleInputChange('waterUsage', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderTravelForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="domesticFlights">Domestic Flight Distance (Km/year)</Label>
          <Input
            id="domesticFlights"
            type="number"
            placeholder="Enter domestic flight distance"
            value={formData.domesticFlights}
            onChange={(e) => handleInputChange('domesticFlights', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="internationalFlights">International Flight Distance (Km/year)</Label>
          <Input
            id="internationalFlights"
            type="number"
            placeholder="Enter international flight distance"
            value={formData.internationalFlights}
            onChange={(e) => handleInputChange('internationalFlights', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderWasteForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="plasticWaste">Plastic Waste (Tonnes/year)</Label>
          <Input
            id="plasticWaste"
            type="number"
            placeholder="Enter plastic waste generated"
            value={formData.plasticWaste}
            onChange={(e) => handleInputChange('plasticWaste', e.target.value)}
            className="eco-input"
          />
        </div>
        <div>
          <Label htmlFor="recyclingPercent">Recycling Rate (%)</Label>
          <Input
            id="recyclingPercent"
            type="number"
            max="100"
            placeholder="% of waste recycled"
            value={formData.recyclingPercent}
            onChange={(e) => handleInputChange('recyclingPercent', e.target.value)}
            className="eco-input"
          />
        </div>
      </div>
    </div>
  );

  const renderFormContent = () => {
    switch (activeCategory) {
      case 'transportation': return renderTransportationForm();
      case 'energy': return renderEnergyForm();
      case 'manufacturing': return renderManufacturingForm();
      case 'buildings': return renderBuildingsForm();
      case 'travel': return renderTravelForm();
      case 'waste': return renderWasteForm();
      default: return null;
    }
  };

  return (
    <Card className="eco-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-ocean-blue" />
          Carbon Emission Calculator
        </CardTitle>
        <CardDescription>
          Input your operational data to calculate carbon footprint with AI-powered analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-1 p-3"
                >
                  <IconComponent className={`h-4 w-4 ${category.color}`} />
                  <span className="text-xs">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg border-l-4 border-l-ocean-blue">
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  <h3 className="font-semibold">{category.label} Emissions</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your {category.label.toLowerCase()} data for accurate emission calculations
                </p>
              </div>
              {renderFormContent()}
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>All calculations use IPCC emission factors</span>
          </div>
          <Button 
            onClick={calculateEmissions}
            className="gradient-ocean text-white hover:opacity-90"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Emissions
          </Button>
        </div>

        {calculationResults && (
          <div className="mt-6 p-6 bg-gradient-to-r from-ocean-blue/5 to-nature-green/5 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-ocean-blue" />
              <h3 className="text-lg font-semibold">Calculation Results</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-ocean-blue mb-2">
                  {calculationResults.total.toFixed(2)} tCO₂e
                </div>
                <p className="text-sm text-muted-foreground mb-4">Total Annual Emissions</p>
                
                <div className="space-y-2">
                  {Object.entries(calculationResults.breakdown).map(([key, value]: [string, number]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize text-sm">{key}:</span>
                      <Badge variant="outline" className="text-ocean-blue">
                        {value.toFixed(2)} tCO₂e
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-nature-green">AI Recommendations</h4>
                <div className="space-y-2">
                  {calculationResults.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-nature-green rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonCalculator;