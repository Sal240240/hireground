import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Star, Users, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Find the Perfect
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                Professional
              </span>
              for Any Job
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl">
              Connect with trusted contractors, handymen, and service professionals in your area. 
              Post jobs for free and get competitive quotes in minutes.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={createPageUrl("PostJob")}>
                <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Post a Job - Free
                </Button>
              </Link>
              <Link to={createPageUrl("FindWork")}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
                  <Search className="w-5 h-5 mr-2" />
                  Find Work
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-2xl font-bold text-white">4.9</span>
                </div>
                <p className="text-blue-200 text-sm mt-1">Average Rating</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-bold text-white">50k+</span>
                </div>
                <p className="text-blue-200 text-sm mt-1">Contractors</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-2xl font-bold text-white">500k+</span>
                </div>
                <p className="text-blue-200 text-sm mt-1">Jobs Completed</p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/20 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <PlusCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Kitchen Renovation</p>
                    <p className="text-blue-200 text-sm">3 contractors interested</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/20 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Plumbing Repair</p>
                    <p className="text-blue-200 text-sm">Completed - $150</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/20 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">House Cleaning</p>
                    <p className="text-blue-200 text-sm">5 quotes received</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
