import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Upload,
  Camera,
  FileText,
  MapPin,
  Calendar,
  Users,
  Leaf,
  CheckCircle,
  AlertCircle,
  Plus,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProjectUpload = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [projectData, setProjectData] = useState({
    // Basic Information
    name: '',
    description: '',
    ecosystem: '',
    location: '',
    coordinates: { lat: '', lng: '' },
    totalArea: '',
    startDate: '',
    endDate: '',
    
    // Plantation Data
    species: [],
    saplingCount: '',
    survivalRate: '',
    plantingDensity: '',
    
    // Community Impact
    communitiesInvolved: '',
    jobsCreated: '',
    localPartners: [],
    
    // MRV Data
    baselineData: '',
    monitoringFreq: '',
    verificationMethod: '',
    
    // Files
    images: [],
    droneData: [],
    reports: []
  });

  const ecosystemTypes = [
    { value: 'mangrove', label: 'Mangrove Forest' },
    { value: 'seagrass', label: 'Seagrass Meadow' },
    { value: 'wetland', label: 'Coastal Wetland' },
    { value: 'saltmarsh', label: 'Salt Marsh' }
  ];

  const speciesOptions = [
    'Rhizophora mucronata', 'Avicennia marina', 'Sonneratia alba',
    'Zostera marina', 'Halophila ovalis', 'Cymodocea serrulata',
    'Spartina alterniflora', 'Salicornia brachiata'
  ];

  const handleInputChange = (field: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field: string, value: string) => {
    if (value.trim()) {
      setProjectData(prev => ({
        ...prev,
        [field]: [...prev[field as keyof typeof prev] as any[], value.trim()]
      }));
    }
  };

  const handleArrayRemove = (field: string, index: number) => {
    setProjectData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          const fileArray = Array.from(files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file)
          }));
          
          setProjectData(prev => ({
            ...prev,
            [field]: [...prev[field as keyof typeof prev] as any[], ...fileArray]
          }));
          
          toast({
            title: "Upload Successful",
            description: `${files.length} file(s) uploaded successfully`
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const submitProject = () => {
    // Basic validation
    if (!projectData.name || !projectData.ecosystem || !projectData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Project Submitted",
      description: "Your project has been submitted for MRV verification"
    });

    // Reset form
    setProjectData({
      name: '', description: '', ecosystem: '', location: '',
      coordinates: { lat: '', lng: '' }, totalArea: '', startDate: '', endDate: '',
      species: [], saplingCount: '', survivalRate: '', plantingDensity: '',
      communitiesInvolved: '', jobsCreated: '', localPartners: [],
      baselineData: '', monitoringFreq: '', verificationMethod: '',
      images: [], droneData: [], reports: []
    });
    setActiveTab("basic");
  };

  const getTabStatus = (tab: string) => {
    switch (tab) {
      case 'basic':
        return projectData.name && projectData.ecosystem && projectData.location ? 'complete' : 'incomplete';
      case 'plantation':
        return projectData.species.length > 0 && projectData.saplingCount ? 'complete' : 'incomplete';
      case 'community':
        return projectData.communitiesInvolved ? 'complete' : 'incomplete';
      case 'mrv':
        return projectData.baselineData && projectData.monitoringFreq ? 'complete' : 'incomplete';
      case 'files':
        return projectData.images.length > 0 ? 'complete' : 'incomplete';
      default:
        return 'incomplete';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card className="eco-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-nature-green" />
            New Project Submission
          </CardTitle>
          <CardDescription>
            Upload your blue carbon restoration project data for MRV verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {['basic', 'plantation', 'community', 'mrv', 'files'].map((tab, index) => {
              const status = getTabStatus(tab);
              return (
                <div key={tab} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === 'complete' ? 'bg-nature-green text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {status === 'complete' ? <CheckCircle className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-sm capitalize hidden md:inline">{tab}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="eco-card border-ocean-blue/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5 text-ocean-blue animate-pulse" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading files...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Form */}
      <Card className="eco-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">Basic</span>
            </TabsTrigger>
            <TabsTrigger value="plantation" className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              <span className="hidden md:inline">Plantation</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Community</span>
            </TabsTrigger>
            <TabsTrigger value="mrv" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">MRV</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-1">
              <Camera className="h-4 w-4" />
              <span className="hidden md:inline">Files</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name"
                  value={projectData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="eco-input"
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your restoration project..."
                  value={projectData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="eco-input min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ecosystem">Ecosystem Type *</Label>
                  <Select value={projectData.ecosystem} onValueChange={(value) => handleInputChange('ecosystem', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ecosystem type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ecosystemTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Kerala, India"
                    value={projectData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="eco-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="e.g., 9.9312"
                    value={projectData.coordinates.lat}
                    onChange={(e) => handleInputChange('coordinates', { ...projectData.coordinates, lat: e.target.value })}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="e.g., 76.2673"
                    value={projectData.coordinates.lng}
                    onChange={(e) => handleInputChange('coordinates', { ...projectData.coordinates, lng: e.target.value })}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="totalArea">Total Area (hectares)</Label>
                  <Input
                    id="totalArea"
                    type="number"
                    placeholder="e.g., 50"
                    value={projectData.totalArea}
                    onChange={(e) => handleInputChange('totalArea', e.target.value)}
                    className="eco-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Project Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={projectData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Expected End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={projectData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="eco-input"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plantation" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Species Planted</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => handleArrayAdd('species', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        {speciesOptions.map((species) => (
                          <SelectItem key={species} value={species}>
                            {species}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {projectData.species.map((species, index) => (
                      <div key={index} className="flex items-center gap-1 bg-nature-green/10 px-2 py-1 rounded">
                        <span className="text-sm">{species}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleArrayRemove('species', index)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="saplingCount">Total Saplings Planted</Label>
                  <Input
                    id="saplingCount"
                    type="number"
                    placeholder="e.g., 10000"
                    value={projectData.saplingCount}
                    onChange={(e) => handleInputChange('saplingCount', e.target.value)}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="survivalRate">Survival Rate (%)</Label>
                  <Input
                    id="survivalRate"
                    type="number"
                    max="100"
                    placeholder="e.g., 85"
                    value={projectData.survivalRate}
                    onChange={(e) => handleInputChange('survivalRate', e.target.value)}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="plantingDensity">Planting Density (per hectare)</Label>
                  <Input
                    id="plantingDensity"
                    type="number"
                    placeholder="e.g., 200"
                    value={projectData.plantingDensity}
                    onChange={(e) => handleInputChange('plantingDensity', e.target.value)}
                    className="eco-input"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="communities">Communities Involved</Label>
                  <Input
                    id="communities"
                    type="number"
                    placeholder="Number of communities"
                    value={projectData.communitiesInvolved}
                    onChange={(e) => handleInputChange('communitiesInvolved', e.target.value)}
                    className="eco-input"
                  />
                </div>
                <div>
                  <Label htmlFor="jobs">Jobs Created</Label>
                  <Input
                    id="jobs"
                    type="number"
                    placeholder="Number of jobs created"
                    value={projectData.jobsCreated}
                    onChange={(e) => handleInputChange('jobsCreated', e.target.value)}
                    className="eco-input"
                  />
                </div>
              </div>

              <div>
                <Label>Local Partners</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add partner organization"
                      className="eco-input"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          handleArrayAdd('localPartners', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleArrayAdd('localPartners', input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {projectData.localPartners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted/50 px-3 py-2 rounded">
                        <span className="text-sm">{partner}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleArrayRemove('localPartners', index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mrv" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="baseline">Baseline Data</Label>
                <Textarea
                  id="baseline"
                  placeholder="Describe baseline measurements and methodology..."
                  value={projectData.baselineData}
                  onChange={(e) => handleInputChange('baselineData', e.target.value)}
                  className="eco-input min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="monitoring">Monitoring Frequency</Label>
                  <Select value={projectData.monitoringFreq} onValueChange={(value) => handleInputChange('monitoringFreq', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="biannual">Bi-annual</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="verification">Verification Method</Label>
                  <Select value={projectData.verificationMethod} onValueChange={(value) => handleInputChange('verificationMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drone">Drone Surveys</SelectItem>
                      <SelectItem value="satellite">Satellite Imagery</SelectItem>
                      <SelectItem value="field">Field Measurements</SelectItem>
                      <SelectItem value="combined">Combined Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <div className="space-y-6">
              {/* Images Upload */}
              <div>
                <Label>Project Images</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload project photos</p>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload('images', e.target.files)}
                    className="max-w-xs mx-auto"
                  />
                </div>
                {projectData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                    {projectData.images.map((image: any, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => handleArrayRemove('images', index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drone Data Upload */}
              <div>
                <Label>Drone Survey Data</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload drone imagery and data files</p>
                  <Input
                    type="file"
                    multiple
                    accept=".zip,.rar,.jpg,.png,.tiff,.csv,.json"
                    onChange={(e) => handleFileUpload('droneData', e.target.files)}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>

              {/* Reports Upload */}
              <div>
                <Label>MRV Reports & Documentation</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload MRV reports and supporting documents</p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={(e) => handleFileUpload('reports', e.target.files)}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>All data will be verified before credit issuance</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={submitProject} className="gradient-nature text-white hover:opacity-90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit for Verification
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectUpload;