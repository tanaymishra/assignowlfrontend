"use client";
import { motion } from "framer-motion";
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Users, 
  Award,
  Calendar,
  Plus,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/store";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Assignments",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Average Score",
      value: "87.5",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      title: "Pending Reviews",
      value: "3",
      change: "-2",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Completed",
      value: "21",
      change: "+8",
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ];

  const recentAssignments = [
    {
      id: 1,
      title: "React Component Analysis",
      subject: "Computer Science",
      score: 92,
      status: "Completed",
      dueDate: "2024-01-20",
      feedback: "Excellent understanding of React concepts and best practices."
    },
    {
      id: 2,
      title: "Database Design Project",
      subject: "Information Systems",
      score: 88,
      status: "Completed",
      dueDate: "2024-01-18",
      feedback: "Good normalization techniques, minor improvements needed."
    },
    {
      id: 3,
      title: "API Documentation",
      subject: "Software Engineering",
      score: null,
      status: "In Review",
      dueDate: "2024-01-22",
      feedback: "Currently being evaluated..."
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="px-1"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Here's an overview of your academic progress
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className={`bg-background/20 backdrop-blur-xl border ${stat.borderColor} rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl opacity-50`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-xl border ${stat.borderColor}`}>
                  <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                </div>
                <span className={`text-xs sm:text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-500' : 
                  stat.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
        >
          {/* Glassy overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Recent Assignments</h2>
              <Button variant="outline" size="sm" className="tap-target w-full sm:w-auto">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {recentAssignments.map((assignment, index) => (
                <motion.div
                  key={assignment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="bg-background/30 backdrop-blur-sm border border-border/20 rounded-xl p-4 hover:bg-background/40 transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                        <h3 className="font-medium text-foreground truncate">{assignment.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{assignment.subject}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                      <div className="flex items-center space-x-3">
                        {assignment.score && (
                          <div className="text-right">
                            <p className={`font-semibold ${
                              assignment.score >= 90 ? 'text-green-500' :
                              assignment.score >= 80 ? 'text-blue-500' :
                              assignment.score >= 70 ? 'text-orange-500' :
                              'text-red-500'
                            }`}>
                              {assignment.score}/100
                            </p>
                          </div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          assignment.status === 'Completed' 
                            ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                            : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start tap-target" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assignment
                </Button>
                <Button className="w-full justify-start tap-target" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start tap-target" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Score Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20">
                  <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Machine Learning Essay</p>
                    <p className="text-xs text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-background/30 backdrop-blur-sm rounded-xl border border-border/20">
                  <Calendar className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Data Structures Project</p>
                    <p className="text-xs text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 