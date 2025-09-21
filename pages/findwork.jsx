import React, { useState, useEffect } from "react";
import { Job } from "@/entities/Job";
import { Contractor } from "@/entities/Contractor";
import { JobResponse } from "@/entities/JobResponse";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Search, 
  Filter,
  CreditCard,
  Star
} from "lucide-react";

import JobFilters from "../components/findwork/JobFilters";
import JobCard from "../components/findwork/JobCard";
import ResponseModal from "../components/findwork/ResponseModal";

export default function FindWork() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [location, setLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedBudget !== "all") {
      filtered = filtered.filter(job => job.budget_range === selectedBudget);
    }

    if (selectedUrgency !== "all") {
      filtered = filtered.filter(job => job.urgency === selectedUrgency);
    }

    if (location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedBudget, selectedUrgency, location]);

  const loadJobs = async () => {
    try {
      const jobsData = await Job.filter({status: 'open'}, '-created_date', 50);
      setJobs(jobsData);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
    setIsLoading(false);
  };

  const handleRespond = (job) => {
    setSelectedJob(job);
    setShowResponseModal(true);
  };

  const handleResponseSubmitted = () => {
    setShowResponseModal(false);
    setSelectedJob(null);
    loadJobs(); // Reload to update response counts
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Work</h1>
          <p className="text-gray-600">Browse available jobs and submit your proposals</p>
        </div>

        {/* Credit Balance Card */}
        <Card className="mb-8 border-l-4 border-l-blue-500 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Available Credits</h3>
                  <p className="text-gray-600 text-sm">Credits are used to respond to jobs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">5</p>
                <Button size="sm" className="mt-2">Buy More Credits</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
              location={location}
              setLocation={setLocation}
            />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="budget_high">Highest Budget</SelectItem>
                  <SelectItem value="budget_low">Lowest Budget</SelectItem>
                  <SelectItem value="responses">Fewest Responses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : filteredJobs.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more results</p>
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onRespond={handleRespond}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && (
        <ResponseModal
          job={selectedJob}
          onClose={() => setShowResponseModal(false)}
          onSubmitted={handleResponseSubmitted}
        />
      )}
    </div>
  );
}
