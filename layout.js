import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Wrench, Home, User, CreditCard, MessageSquare, Star, PlusCircle, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
  },
  {
    title: "Post a Job",
    url: createPageUrl("PostJob"),
    icon: PlusCircle,
  },
  {
    title: "Find Work",
    url: createPageUrl("FindWork"),
    icon: Search,
  },
  {
    title: "Messages",
    url: createPageUrl("Messages"),
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SidebarProvider>
        <div className="flex w-full">
          <Sidebar className="border-r border-gray-200 bg-white/80 backdrop-blur-sm">
            <SidebarHeader className="border-b border-gray-100 p-4">
              <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-xl text-gray-900">Hireground</h2>
                  <p className="text-xs text-gray-500">Connect. Work. Grow.</p>
                </div>
              </Link>
            </SidebarHeader>
            
            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                            location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-3 py-3">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-3">
                  Quick Actions
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-3">
                    <Link to={createPageUrl("PostJob")} className="block">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-sm font-medium text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                        Post New Job
                      </div>
                    </Link>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Trust Score</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-900">4.9</span>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-gray-100 p-4 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">Welcome</p>
                  <p className="text-xs text-gray-500 truncate">Ready to connect</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col">
            {/* Mobile header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-3 md:hidden shadow-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
                <h1 className="text-lg font-bold text-gray-900">Hireground</h1>
              </div>
            </header>

            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
