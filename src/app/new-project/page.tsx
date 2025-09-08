"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  ChevronLeft,
  Users,
  User,
  Edit,
  UserCheck,
} from "lucide-react";

export default function ProjectBudgetForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    department: "advertising",
    category: "adv",
    projectCode: "ASADV-6805-0001",
    projectName: "",
    totalBudget: "",
    owner: "",
    collaborators: "",
    team: "",
    marketingTeam: "",
    deadline: "2025-07-30",
    startDate: "",
    endDate: "",
    approver: "Jorjae Charong (Cheif Executive Officer)",
  });

  const [kpiMetrics, setKpiMetrics] = useState([
    {
      id: 1,
      name: "",
      targetValue: "",
      unit: "Percent (%)",
      measurementMethod: "",
    },
  ]);

  const [objectives, setObjectives] = useState([
    {
      id: 1,
      name: "Increase brand awareness",
      description: "Reach 500k impressions on social media.",
      budgetName: "",
      allocatedBudget: "",
      category: "",
      budgetDescription: "",
      startDate: "",
      endDate: "",
      followUpDate: "",
    },
  ]);

  const [budgetLineItems, setBudgetLineItems] = useState([
    {
      id: 1,
      budgetName: "Facebook Ads Campaign - Spring Campaign",
      category: "Advertising",
      budget: "150000",
      dueDate: "2025-03-15",
      approver: "Boss Phatchara",
    },
    {
      id: 2,
      budgetName: "Instagram Influencer Partnership",
      category: "Marketing",
      budget: "75000",
      dueDate: "2025-03-30",
      approver: "Moo Phruetthanan",
    },
    {
      id: 3,
      budgetName: "Google Search Ads - Brand Keywords",
      category: "Advertising",
      budget: "100000",
      dueDate: "2025-04-15",
      approver: "Boss Phatchara",
    },
    {
      id: 4,
      budgetName: "Line Official Account Push Message",
      category: "Marketing",
      budget: "50000",
      dueDate: "2025-04-30",
      approver: "Moo Phruetthanan",
    },
  ]);

  const steps = [
    { id: 1, title: "Project Info", completed: currentStep > 1 },
    { id: 2, title: "Objectives, KPI, & Budget", completed: currentStep > 2 },
    { id: 3, title: "Budget Details", completed: currentStep > 3 },
    { id: 4, title: "Preview All Parts", completed: currentStep > 4 },
  ];

  const addKPI = () => {
    setKpiMetrics([
      ...kpiMetrics,
      {
        id: Date.now(),
        name: "",
        targetValue: "",
        unit: "Percent (%)",
        measurementMethod: "",
      },
    ]);
  };

  const removeKPI = (id:any) => {
    setKpiMetrics(kpiMetrics.filter((kpi) => kpi.id !== id));
  };

  const addObjective = () => {
    setObjectives([
      ...objectives,
      {
        id: Date.now(),
        name: "",
        description: "",
        budgetName: "",
        allocatedBudget: "",
        category: "",
        budgetDescription: "",
        startDate: "",
        endDate: "",
        followUpDate: "",
      },
    ]);
  };

  const addBudgetLineItem = () => {
    setBudgetLineItems([
      ...budgetLineItems,
      {
        id: Date.now(),
        budgetName: "",
        category: "",
        budget: "",
        dueDate: "",
        approver: "",
      },
    ]);
  };

  const removeBudgetLineItem = (id:any) => {
    setBudgetLineItems(budgetLineItems.filter((item) => item.id !== id));
  };

  const updateBudgetLineItem = (id:any, field:any, value:any) => {
    setBudgetLineItems(
      budgetLineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotalAllocated = () => {
    return budgetLineItems.reduce(
      (sum, item) => sum + (parseFloat(item.budget) || 0),
      0
    );
  };

  const calculateRemaining = () => {
    const totalBudget = parseFloat(formData.totalBudget) || 0;
    const allocated = calculateTotalAllocated();
    return totalBudget - allocated;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="bg-white">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Project Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="department"
                      className="text-sm font-medium text-gray-700"
                    >
                      ประเภทโครงการ
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData({ ...formData, department: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advertising">Advertising</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
                      ประเภทโครงการย่อย
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adv">โฆษณา (ADV)</SelectItem>
                        <SelectItem value="pr">PR</SelectItem>
                        <SelectItem value="digital">
                          Digital Marketing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="projectCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      เลขโครงการ
                    </Label>
                    <Input
                      id="projectCode"
                      value={formData.projectCode}
                      className="mt-1 bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="projectName"
                      className="text-sm font-medium text-gray-700"
                    >
                      ชื่อโครงการ <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectName: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="totalBudget"
                      className="text-sm font-medium text-gray-700"
                    >
                      Total Budget (THB) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="totalBudget"
                        value={formData.totalBudget}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            totalBudget: e.target.value,
                          })
                        }
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        THB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="owner"
                      className="text-sm font-medium text-gray-700"
                    >
                      ผู้รับผิดชอบหลัก <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="owner"
                        placeholder="Type to search employee..."
                        value={formData.owner}
                        onChange={(e) =>
                          setFormData({ ...formData, owner: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="collaborators"
                      className="text-sm font-medium text-gray-700"
                    >
                      Collaborators (CC)
                    </Label>
                    <div className="relative mt-1">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="collaborators"
                        placeholder="Type to search employee..."
                        value={formData.collaborators}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            collaborators: e.target.value,
                          })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="team"
                      className="text-sm font-medium text-gray-700"
                    >
                      ทีม <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.team}
                      onValueChange={(value) =>
                        setFormData({ ...formData, team: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <SelectValue placeholder="Select Team" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">
                          Marketing Team
                        </SelectItem>
                        <SelectItem value="development">
                          Development Team
                        </SelectItem>
                        <SelectItem value="sales">Sales Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="marketingTeam"
                      className="text-sm font-medium text-gray-700"
                    >
                      Marketing Team
                    </Label>
                    <Select
                      value={formData.marketingTeam}
                      onValueChange={(value) =>
                        setFormData({ ...formData, marketingTeam: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <SelectValue placeholder="Select Marketing Team" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital">
                          Digital Marketing
                        </SelectItem>
                        <SelectItem value="traditional">
                          Traditional Marketing
                        </SelectItem>
                        <SelectItem value="content">
                          Content Marketing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="deadline"
                      className="text-sm font-medium text-gray-700"
                    >
                      วันที่ส่งงาน <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({ ...formData, deadline: e.target.value })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="approver"
                      className="text-sm font-medium text-gray-700"
                    >
                      ผู้อนุมัติ <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.approver}
                      onValueChange={(value) =>
                        setFormData({ ...formData, approver: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Jorjae Charong (Cheif Executive Officer)">
                          Jorjae Charong (Cheif Executive Officer)
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Please select 1 approver
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="startDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      วันเริ่มต้นโครงการ <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            startDate: e.target.value,
                          })
                        }
                        className="pl-10"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="endDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      วันสิ้นสุดโครงการ <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        className="pl-10"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Must be on or after start date
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Objectives & KPIs
                </h2>
                <Button
                  className="bg-black"
                  size="sm"
                  onClick={addObjective}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Objective
                </Button>
              </div>

              {objectives.map((objective, objectiveIndex) => (
                <div
                  key={objective.id}
                  className="bg-gray-50 rounded-lg p-6 mb-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                      {objectiveIndex + 1}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Objective {objectiveIndex + 1}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Objective Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={objective.name}
                          className="mt-1"
                          placeholder="Enter objective name"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Objective Description{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={objective.description}
                          className="mt-1"
                          placeholder="Enter objective description"
                        />
                      </div>
                    </div>

                    {/* KPI Metrics Section */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          KPI Metrics
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-black text-white"
                          onClick={addKPI}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add KPI
                        </Button>
                      </div>

                      {kpiMetrics.map((kpi, index) => (
                        <div
                          key={kpi.id}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
                        >
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              KPI Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              placeholder="Enter KPI name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Target Value{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              placeholder="Enter target"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">
                              Unit <span className="text-red-500">*</span>
                            </Label>
                            <Select defaultValue="percent">
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percent">
                                  Percent (%)
                                </SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="currency">
                                  Currency
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-end">
                            {kpiMetrics.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                                onClick={() => removeKPI(kpi.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <Label className="text-sm font-medium text-gray-700">
                          Measurement Method{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          placeholder="How will this KPI be measured?"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Budget Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Budget Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Enter budget name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Allocated Budget (THB){" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Enter budget amount"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="advertising">
                            Advertising
                          </SelectItem>
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Budget Description{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        placeholder="Enter detailed budget description..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    {/* Date Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Start Date <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input type="date" className="pr-10" />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          End Date <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input type="date" className="pr-10" />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Follow Up Date <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input type="date" className="pr-10" />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Budget Details
                </h2>
                <Button
                  className="bg-black"
                  size="sm"
                  onClick={addBudgetLineItem}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Budget Line
                </Button>
              </div>

              {/* Budget Line Items Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Budget Line Items
                  </h3>
                  <Edit className="h-4 w-4 text-gray-400" />
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 text-sm font-medium text-gray-700">
                  <div className="col-span-3">Budget Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Budget</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-2">Approver</div>
                  <div className="col-span-1">Actions</div>
                </div>

                {/* Table Rows */}
                <div className="border-2 border-grey-200 rounded-lg ">
                  {budgetLineItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 py-4 px-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="col-span-3">
                        <Input
                          value={item.budgetName}
                          onChange={(e) =>
                            updateBudgetLineItem(
                              item.id,
                              "budgetName",
                              e.target.value
                            )
                          }
                          placeholder="Enter budget name"
                          className="text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <Select
                          value={item.category}
                          onValueChange={(value) =>
                            updateBudgetLineItem(item.id, "category", value)
                          }
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select Project Subtype" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Advertising">
                              Advertising
                            </SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Development">
                              Development
                            </SelectItem>
                            <SelectItem value="Operations">
                              Operations
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Input
                          value={item.budget}
                          onChange={(e) =>
                            updateBudgetLineItem(
                              item.id,
                              "budget",
                              e.target.value
                            )
                          }
                          placeholder="Amount"
                          className="text-sm text-right"
                          type="number"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          value={item.dueDate}
                          onChange={(e) =>
                            updateBudgetLineItem(
                              item.id,
                              "dueDate",
                              e.target.value
                            )
                          }
                          type="date"
                          className="text-sm text-gray-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <Select
                          value={item.approver}
                          onValueChange={(value) =>
                            updateBudgetLineItem(item.id, "approver", value)
                          }
                        >
                          <SelectTrigger className="text-sm">
                            <div className="flex items-center">
                              <UserCheck className="h-3 w-3 text-blue-500 mr-2" />
                              <SelectValue placeholder="Select Approver" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Boss Phatchara">
                              Boss Phatchara
                            </SelectItem>
                            <SelectItem value="Moo Phruetthanan">
                              Moo Phruetthanan
                            </SelectItem>
                            <SelectItem value="Jorjae Charong">
                              Jorjae Charong
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-red-600 p-1"
                          onClick={() => removeBudgetLineItem(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Summary Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Budget Summary
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Total Budget
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ฿20,000.00
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Allocated</div>
                    <div className="text-2xl font-bold text-blue-600">
                      ฿{calculateTotalAllocated().toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Remaining</div>
                    <div
                      className={`text-2xl font-bold ${
                        calculateRemaining() >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ฿{calculateRemaining().toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    {/* <span>Budget Allocation</span> */}
                    <span>
                      {formData.totalBudget
                        ? Math.round(
                            (calculateTotalAllocated() /
                              parseFloat(formData.totalBudget)) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        calculateRemaining() >= 0 ? "bg-blue-600" : "bg-red-600"
                      }`}
                      style={{
                        width: `${Math.min(
                          formData.totalBudget
                            ? (calculateTotalAllocated() /
                                parseFloat(formData.totalBudget)) *
                                100
                            : 0,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  {/* {calculateRemaining() < 0 && (
                    <div className="text-red-600 text-sm mt-2">
                      ⚠️ Budget exceeded by ฿
                      {Math.abs(calculateRemaining()).toLocaleString()}
                    </div>
                  )} */}
                </div>
              </div>
            </CardContent>
          </Card>
        );

     case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Review Your Project Budget Submission
              </h2>
            </div>

            {/* Project Information */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project Information
                  </h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Section
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Project Name:</span>
                    <span className="text-sm text-gray-900">
                      {formData.projectName || "Digital Campaign for New Product Launch - Q3 2025 (Mock)"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Project Type:</span>
                    <span className="text-sm text-gray-900 capitalize">{formData.department}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Sub Type:</span>
                    <span className="text-sm text-gray-900">{formData.category}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Project No:</span>
                    <span className="text-sm text-gray-900">{formData.projectCode}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Owner:</span>
                    <span className="text-sm text-gray-900">
                      {formData.owner || "John Doe (Marketing Lead)"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Team:</span>
                    <span className="text-sm text-gray-900 capitalize">
                      {formData.team || "Marketing Team"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Request Date:</span>
                    <span className="text-sm text-gray-900">2025-07-30</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Start Date:</span>
                    <span className="text-sm text-gray-900">{formData.startDate || "2025-08-30"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">End Date:</span>
                    <span className="text-sm text-gray-900">{formData.endDate || "2025-09-30"}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Follow-up Date:</span>
                    <span className="text-sm text-gray-900">2025-10-30</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-sm font-medium text-gray-600">Approvers:</span>
                    <span className="text-sm text-gray-900">{formData.approver}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Objectives & KPIs */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Objectives & KPIs
                  </h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Section
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Project Objectives:</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-4">
                    <li><strong>Increase brand awareness</strong> - Reach 500k impressions on social media.</li>
                    <li><strong>Drive product sales</strong> - Achieve 10% sales growth in Q3 2025.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Project KPIs:</h4>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">KPI Name</th>
                          <th className="text-left py-2 text-gray-600">Target Value</th>
                          <th className="text-left py-2 text-gray-600">Unit</th>
                          <th className="text-left py-2 text-gray-600">Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Impressions</td>
                          <td className="py-2">500,000</td>
                          <td className="py-2">Impressions</td>
                          <td className="py-2">Social Media Analytics</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Sales Growth</td>
                          <td className="py-2">10%</td>
                          <td className="py-2">%</td>
                          <td className="py-2">CRM Data</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Details */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Budget Details
                  </h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Section
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Budget Line Items</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">Budget Name</th>
                          <th className="text-left py-2 text-gray-600">Category</th>
                          <th className="text-left py-2 text-gray-600">Quantity</th>
                          <th className="text-left py-2 text-gray-600">Unit Cost</th>
                          <th className="text-left py-2 text-gray-600">Total</th>
                          <th className="text-left py-2 text-gray-600">Due Date</th>
                          <th className="text-left py-2 text-gray-600">Approver</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Facebook Ad Spend</td>
                          <td className="py-2">Online Advertising</td>
                          <td className="py-2">1</td>
                          <td className="py-2">฿50,000.00</td>
                          <td className="py-2">฿50,000.00</td>
                          <td className="py-2">2025-08-30</td>
                          <td className="py-2">Patchara Waran</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Google Search Ads</td>
                          <td className="py-2">Online Advertising</td>
                          <td className="py-2">1</td>
                          <td className="py-2">฿30,000.00</td>
                          <td className="py-2">฿30,000.00</td>
                          <td className="py-2">2025-08-30</td>
                          <td className="py-2">Patchara Waran</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Event Venue Rental</td>
                          <td className="py-2">Offline Events</td>
                          <td className="py-2">1</td>
                          <td className="py-2">฿25,000.00</td>
                          <td className="py-2">฿25,000.00</td>
                          <td className="py-2">2025-08-30</td>
                          <td className="py-2">Yos Ratana</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-2">Influencer A Fee</td>
                          <td className="py-2">Influencer Collaboration</td>
                          <td className="py-2">1</td>
                          <td className="py-2">฿15,000.00</td>
                          <td className="py-2">฿15,000.00</td>
                          <td className="py-2">2025-08-30</td>
                          <td className="py-2">Patchara Waran</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Budget Summary</h4>
                  <div className="grid grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Total Budget</div>
                      <div className="text-lg font-bold text-gray-900">฿150</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Allocated</div>
                      <div className="text-lg font-bold text-blue-600">฿120</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Remaining</div>
                      <div className="text-lg font-bold text-green-600">฿30</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments & Notes */}
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attachments & Notes
                  </h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Section
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Attached Files</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 underline cursor-pointer">Campaign_Brief.pdf</span>
                      <span className="text-gray-500">(500 KB)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 underline cursor-pointer">Budget_Breakdown.xlsx</span>
                      <span className="text-gray-500">(700 KB)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Additional Notes</h4>
                  <p className="text-sm text-gray-600">
                    This project aims to leverage digital channels heavily. Need to closely monitor ROI from social media ads. Event logistics require careful planning.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Form Link */}
            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-blue-600">
                ← Back to Form
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Create New Project Budget
        </h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-blue-600 text-white"
                        : step.id === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.completed ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <span className="mt-2 text-xs text-gray-600 text-center max-w-20">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 relative -top-8 ${
                      step.completed ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Budget Cap Card - Only show on steps 2+ */}
        {currentStep >= 2 && (
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <div className="text-sm text-blue-600 mb-1">
                Total Budget Cap:
              </div>
              <div className="text-2xl font-bold text-blue-600">
                ฿{formData.totalBudget || "0"}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Render Current Step */}
        {renderStep()}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <div>
            {currentStep > 1 ? (
              <Button variant="outline" className="px-6" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Button variant="outline" className="px-6">
                Cancel
              </Button>
            )}
          </div>

          <Button
            className="px-6 bg-black"
            onClick={nextStep}
            disabled={currentStep === 4}
          >
            {currentStep === 4 ? "Submit" : "Continue"}
            {currentStep < 4 && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
