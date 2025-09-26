import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator,
  Download,
  Target,
  Truck,
  Factory,
  Zap,
  Package,
} from "lucide-react";
import { SuggestionsPanel } from "./SuggestionsPanel";

// Emission factors (kg CO2e per unit)
const EMISSION_FACTORS = {
  fuels: {
    diesel: 2.68,
    gasoline: 2.31,
    biodiesel: 1.51,
    lpg: 1.51,
    naturalGas: 2.0,
  },
  electricity: {
    grid: 0.82,
    renewable: 0.02,
    coal: 1.05,
    nuclear: 0.012,
  },
  transport: {
    truck: 0.089,
    rail: 0.014,
    ship: 0.011,
    air: 0.255,
  },
  materials: {
    cardboard: 0.7,
    plastic: 6.0,
    paper: 1.32,
  },
  commute: 0.12,
  waste: 0.5,
};

interface EmissionData {
  transportation: {
    fuelType: string;
    fuelConsumption: number;
    distance: number;
    vehicleCount: number;
    employeeCommute: number;
  };
  manufacturing: {
    electricitySource: string;
    energyConsumption: number;
    naturalGas: number;
    rawMaterials: number;
    processEmissions: number;
  };
  operations: {
    electricityUsage: number;
    heatingType: string;
    heatingAmount: number;
    refrigerants: number;
    wasteGenerated: number;
  };
  logistics: {
    shippingMode: string;
    shippingDistance: number;
    packagingType: string;
    packagingMaterials: number;
    warehouseEnergy: number;
  };
}

interface CalculatedEmissions {
  scope1: {
    transportation: number;
    manufacturing: number;
    operations: number;
    total: number;
  };
  scope2: {
    electricity: number;
    heating: number;
    total: number;
  };
  scope3: {
    logistics: number;
    commute: number;
    waste: number;
    total: number;
  };
  total: number;
  breakdown: {
    transportation: number;
    manufacturing: number;
    operations: number;
    logistics: number;
  };
}

export function EnhancedCarbonCalculator() {
  const [emissionData, setEmissionData] = useState<EmissionData>({
    transportation: { fuelType: "diesel", fuelConsumption: 0, distance: 0, vehicleCount: 0, employeeCommute: 0 },
    manufacturing: { electricitySource: "grid", energyConsumption: 0, naturalGas: 0, rawMaterials: 0, processEmissions: 0 },
    operations: { electricityUsage: 0, heatingType: "naturalGas", heatingAmount: 0, refrigerants: 0, wasteGenerated: 0 },
    logistics: { shippingMode: "truck", shippingDistance: 0, packagingType: "cardboard", packagingMaterials: 0, warehouseEnergy: 0 }
  });

  const [calculatedEmissions, setCalculatedEmissions] = useState<CalculatedEmissions | null>(null);

  const calculateEmissions = () => {
    // Scope 1 (Direct emissions)
    const scope1Transportation = emissionData.transportation.fuelConsumption * EMISSION_FACTORS.fuels[emissionData.transportation.fuelType as keyof typeof EMISSION_FACTORS.fuels];
    const scope1Manufacturing = emissionData.manufacturing.naturalGas * EMISSION_FACTORS.fuels.naturalGas + emissionData.manufacturing.processEmissions;
    const scope1Operations = emissionData.operations.heatingAmount * (emissionData.operations.heatingType === 'naturalGas' ? EMISSION_FACTORS.fuels.naturalGas : 0) + emissionData.operations.refrigerants;

    // Scope 2 (Indirect emissions from purchased energy)
    const scope2Electricity = (emissionData.manufacturing.energyConsumption + emissionData.operations.electricityUsage + emissionData.logistics.warehouseEnergy) * EMISSION_FACTORS.electricity[emissionData.manufacturing.electricitySource as keyof typeof EMISSION_FACTORS.electricity];
    const scope2Heating = emissionData.operations.heatingType === 'electricity' ? emissionData.operations.heatingAmount * EMISSION_FACTORS.electricity[emissionData.manufacturing.electricitySource as keyof typeof EMISSION_FACTORS.electricity] : 0;

    // Scope 3 (Other indirect emissions)
    const scope3Logistics = emissionData.logistics.shippingDistance * EMISSION_FACTORS.transport[emissionData.logistics.shippingMode as keyof typeof EMISSION_FACTORS.transport] + emissionData.logistics.packagingMaterials * EMISSION_FACTORS.materials[emissionData.logistics.packagingType as keyof typeof EMISSION_FACTORS.materials];
    const scope3Commute = emissionData.transportation.employeeCommute * EMISSION_FACTORS.commute;
    const scope3Waste = emissionData.operations.wasteGenerated * EMISSION_FACTORS.waste;

    const scope1Total = scope1Transportation + scope1Manufacturing + scope1Operations;
    const scope2Total = scope2Electricity + scope2Heating;
    const scope3Total = scope3Logistics + scope3Commute + scope3Waste;
    const total = scope1Total + scope2Total + scope3Total;

    setCalculatedEmissions({
      scope1: { transportation: scope1Transportation, manufacturing: scope1Manufacturing, operations: scope1Operations, total: scope1Total },
      scope2: { electricity: scope2Electricity, heating: scope2Heating, total: scope2Total },
      scope3: { logistics: scope3Logistics, commute: scope3Commute, waste: scope3Waste, total: scope3Total },
      total,
      breakdown: {
        transportation: scope1Transportation + (emissionData.transportation.employeeCommute * EMISSION_FACTORS.commute),
        manufacturing: scope1Manufacturing + (emissionData.manufacturing.energyConsumption * EMISSION_FACTORS.electricity[emissionData.manufacturing.electricitySource as keyof typeof EMISSION_FACTORS.electricity]),
        operations: scope1Operations + scope2Electricity + scope2Heating + scope3Waste,
        logistics: scope3Logistics + (emissionData.logistics.warehouseEnergy * EMISSION_FACTORS.electricity[emissionData.manufacturing.electricitySource as keyof typeof EMISSION_FACTORS.electricity])
      }
    });
  };

  const updateEmissionData = (category: keyof EmissionData, field: string, value: number | string) => {
    setEmissionData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const resetCalculator = () => {
    setEmissionData({
      transportation: { fuelType: "diesel", fuelConsumption: 0, distance: 0, vehicleCount: 0, employeeCommute: 0 },
      manufacturing: { electricitySource: "grid", energyConsumption: 0, naturalGas: 0, rawMaterials: 0, processEmissions: 0 },
      operations: { electricityUsage: 0, heatingType: "naturalGas", heatingAmount: 0, refrigerants: 0, wasteGenerated: 0 },
      logistics: { shippingMode: "truck", shippingDistance: 0, packagingType: "cardboard", packagingMaterials: 0, warehouseEnergy: 0 }
    });
    setCalculatedEmissions(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-carbon-success" />
          <h1 className="text-2xl font-bold text-foreground">Corporate Carbon Calculator</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetCalculator}>Reset</Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {calculatedEmissions && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Monthly Carbon Footprint</h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-carbon-success">{calculatedEmissions.total.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">kg CO₂e/month</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-carbon-scope1">{calculatedEmissions.scope1.total.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Scope 1 (Direct)</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-carbon-scope2">{calculatedEmissions.scope2.total.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Scope 2 (Energy)</div>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border">
                <div className="text-xl font-bold text-carbon-scope3">{calculatedEmissions.scope3.total.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Scope 3 (Indirect)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="transportation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transportation" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Transport
          </TabsTrigger>
          <TabsTrigger value="manufacturing" className="flex items-center gap-2">
            <Factory className="w-4 h-4" />
            Manufacturing
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="logistics" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Logistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transportation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Transportation Emissions
              </CardTitle>
              <CardDescription>Fleet vehicles, fuel consumption, and employee commuting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select value={emissionData.transportation.fuelType} onValueChange={(value) => updateEmissionData('transportation', 'fuelType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="gasoline">Gasoline</SelectItem>
                      <SelectItem value="biodiesel">Biodiesel</SelectItem>
                      <SelectItem value="lpg">LPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fuel Consumption (L/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.transportation.fuelConsumption}
                    onChange={(e) => updateEmissionData('transportation', 'fuelConsumption', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Count</Label>
                  <Input
                    type="number"
                    value={emissionData.transportation.vehicleCount}
                    onChange={(e) => updateEmissionData('transportation', 'vehicleCount', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employee Commute (person-km/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.transportation.employeeCommute}
                    onChange={(e) => updateEmissionData('transportation', 'employeeCommute', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manufacturing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="w-5 h-5" />
                Manufacturing Emissions
              </CardTitle>
              <CardDescription>Production processes, energy use, and raw materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Electricity Source</Label>
                  <Select value={emissionData.manufacturing.electricitySource} onValueChange={(value) => updateEmissionData('manufacturing', 'electricitySource', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Average</SelectItem>
                      <SelectItem value="renewable">Renewable</SelectItem>
                      <SelectItem value="coal">Coal</SelectItem>
                      <SelectItem value="nuclear">Nuclear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Energy Consumption (kWh/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.manufacturing.energyConsumption}
                    onChange={(e) => updateEmissionData('manufacturing', 'energyConsumption', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Natural Gas (kWh/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.manufacturing.naturalGas}
                    onChange={(e) => updateEmissionData('manufacturing', 'naturalGas', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Process Emissions (kg CO₂e/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.manufacturing.processEmissions}
                    onChange={(e) => updateEmissionData('manufacturing', 'processEmissions', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Operations Emissions
              </CardTitle>
              <CardDescription>Office facilities, heating, cooling, and waste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Electricity Usage (kWh/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.operations.electricityUsage}
                    onChange={(e) => updateEmissionData('operations', 'electricityUsage', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Heating Type</Label>
                  <Select value={emissionData.operations.heatingType} onValueChange={(value) => updateEmissionData('operations', 'heatingType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="naturalGas">Natural Gas</SelectItem>
                      <SelectItem value="electricity">Electric</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Heating Amount (kWh or m³/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.operations.heatingAmount}
                    onChange={(e) => updateEmissionData('operations', 'heatingAmount', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waste Generated (kg/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.operations.wasteGenerated}
                    onChange={(e) => updateEmissionData('operations', 'wasteGenerated', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logistics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Logistics Emissions
              </CardTitle>
              <CardDescription>Shipping, packaging, and distribution activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Shipping Mode</Label>
                  <Select value={emissionData.logistics.shippingMode} onValueChange={(value) => updateEmissionData('logistics', 'shippingMode', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="rail">Rail</SelectItem>
                      <SelectItem value="ship">Ship</SelectItem>
                      <SelectItem value="air">Air</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Shipping Distance (km/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.logistics.shippingDistance}
                    onChange={(e) => updateEmissionData('logistics', 'shippingDistance', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Packaging Type</Label>
                  <Select value={emissionData.logistics.packagingType} onValueChange={(value) => updateEmissionData('logistics', 'packagingType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardboard">Cardboard</SelectItem>
                      <SelectItem value="plastic">Plastic</SelectItem>
                      <SelectItem value="paper">Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Packaging Materials (kg/month)</Label>
                  <Input
                    type="number"
                    value={emissionData.logistics.packagingMaterials}
                    onChange={(e) => updateEmissionData('logistics', 'packagingMaterials', Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-4">
        <Button onClick={calculateEmissions} size="lg" className="px-8">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Carbon Footprint
        </Button>
        <Button variant="outline" size="lg" disabled={!calculatedEmissions}>
          <Target className="w-4 h-4 mr-2" />
          Set Reduction Targets
        </Button>
      </div>

      {calculatedEmissions && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Detailed Emission Breakdown</CardTitle>
              <CardDescription>Your carbon footprint by category and scope</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-carbon-scope1/10 rounded-lg border border-carbon-scope1/20">
                  <div className="text-2xl font-bold text-carbon-scope1">{calculatedEmissions.breakdown.transportation.toFixed(1)}</div>
                  <div className="text-sm text-carbon-scope1">Transport</div>
                  <div className="text-xs text-muted-foreground">kg CO₂e</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">{calculatedEmissions.breakdown.manufacturing.toFixed(1)}</div>
                  <div className="text-sm text-primary">Manufacturing</div>
                  <div className="text-xs text-muted-foreground">kg CO₂e</div>
                </div>
                <div className="text-center p-4 bg-carbon-warning/10 rounded-lg border border-carbon-warning/20">
                  <div className="text-2xl font-bold text-carbon-warning">{calculatedEmissions.breakdown.operations.toFixed(1)}</div>
                  <div className="text-sm text-carbon-warning">Operations</div>
                  <div className="text-xs text-muted-foreground">kg CO₂e</div>
                </div>
                <div className="text-center p-4 bg-carbon-scope3/10 rounded-lg border border-carbon-scope3/20">
                  <div className="text-2xl font-bold text-carbon-scope3">{calculatedEmissions.breakdown.logistics.toFixed(1)}</div>
                  <div className="text-sm text-carbon-scope3">Logistics</div>
                  <div className="text-xs text-muted-foreground">kg CO₂e</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Scope Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-carbon-scope1/10 rounded">
                    <span className="text-sm font-medium text-carbon-scope1">Scope 1 (Direct)</span>
                    <span className="font-bold text-carbon-scope1">{calculatedEmissions.scope1.total.toFixed(1)} kg CO₂e</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-carbon-scope2/10 rounded">
                    <span className="text-sm font-medium text-carbon-scope2">Scope 2 (Energy)</span>
                    <span className="font-bold text-carbon-scope2">{calculatedEmissions.scope2.total.toFixed(1)} kg CO₂e</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-carbon-scope3/10 rounded">
                    <span className="text-sm font-medium text-carbon-scope3">Scope 3 (Indirect)</span>
                    <span className="font-bold text-carbon-scope3">{calculatedEmissions.scope3.total.toFixed(1)} kg CO₂e</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SuggestionsPanel calculatedEmissions={calculatedEmissions} emissionData={emissionData} />
        </>
      )}
    </div>
  );
}