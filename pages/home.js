import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Job } from "@/entities/Job";
import { Contractor } from "@/entities/Contractor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  Search, 
  CheckCircle, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Hammer,
  Palette,
  Zap,
  Droplets,
  GraduationCap,
  Home as HomeIcon
} from "lucide-react";

import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import RecentJobs from "../components/home/RecentJobs";
import FeaturedContractors from "../components/home/FeaturedContractors";

export default function Home() {
  const [recentJobs, setRecentJobs] = useState([]);
  const [featuredContractors, setFeaturedContractors] = useState([]);
  const [stats, setStats] = useState({ jobs: 0, contractors: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [jobs, contractors] = await Promise.all([
        Job.list('-created_date', 6),
        Contractor.list('-rating', 4)
      ]);
      
      setRecentJobs(jobs);
      setFeaturedContractors(contractors);
      setStats({
        jobs: jobs.length,
        contractors: contractors.length,
        completed: jobs.filter(j => j.status === 'completed').length
      });
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection stats={stats} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <RecentJobs jobs={recentJobs} isLoading={isLoading} />
          <FeaturedContractors contractors={featuredContractors} isLoading={isLoading} />
        </div>
        
        {/* How it Works Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Hireground Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with trusted professionals in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Post Your Job</h3>
                <p className="text-gray-600">
                  Describe what you need done. It's free and takes less than 2 minutes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
                <p className="text-gray-600">
                  Qualified contractors in your area will send you quotes and proposals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose & Hire</h3>
                <p className="text-gray-600">
                  Compare options and hire the best contractor for your project.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of homeowners and contractors who trust Hireground
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("PostJob")}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
                  Post a Job - It's Free
                </Button>
              </Link>
              <Link to={createPageUrl("FindWork")}>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3">
                  Find Work as a Contractor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
