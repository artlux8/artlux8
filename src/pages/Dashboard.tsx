import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  User,
  Trophy,
  Upload,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Profile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_country: string | null;
}

interface Enrollment {
  id: string;
  status: string;
  completed_days: number;
  start_date: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }

        // Fetch enrollment
        const { data: enrollmentData } = await supabase
          .from("challenge_enrollments")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (enrollmentData) {
          setEnrollment(enrollmentData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user) return null;

  const firstName = profile?.full_name?.split(" ")[0] || user.email?.split("@")[0] || "Member";

  const dashboardLinks = [
    {
      icon: Sparkles,
      title: "FREE ARTLUX PROTOCOL",
      description: "Join our 7-day luxury longevity challenge",
      href: "/free-protocol",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      icon: Trophy,
      title: "My Challenge Progress",
      description: enrollment ? `Day ${enrollment.completed_days + 1} of 7` : "Start your journey",
      href: "/dashboard/challenge",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: Upload,
      title: "Upload Today's Proof",
      description: "Submit your daily challenge evidence",
      href: "/dashboard/upload",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MapPin,
      title: "My Shipping Details",
      description: "Manage your delivery address",
      href: "/dashboard/shipping",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <User className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Welcome back,</p>
                  <h1 className="font-logo text-2xl md:text-3xl font-bold text-foreground">
                    {firstName}
                  </h1>
                </div>
              </div>
            </div>

            {/* Challenge Status */}
            {enrollment && (
              <div className="mb-8 p-6 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-2xl border border-gold/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">ARTLUX Protocol Active</h3>
                      <p className="text-sm text-muted-foreground">
                        {enrollment.status === "completed" ? (
                          <span className="text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Challenge Completed!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> Day {enrollment.completed_days + 1} of 7
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button asChild className="bg-gold hover:bg-gold/90 text-primary">
                    <Link to="/dashboard/challenge">
                      View Progress
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Dashboard Links */}
            <div className="grid sm:grid-cols-2 gap-6">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group p-6 bg-card rounded-2xl border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <link.icon className={`w-6 h-6 ${link.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            {!enrollment && (
              <div className="mt-12 text-center p-8 bg-secondary/30 rounded-2xl">
                <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  Start Your Longevity Journey
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join the FREE ARTLUX Protocol and earn a hydrogen water bottle!
                </p>
                <Button asChild className="bg-gold hover:bg-gold/90 text-primary font-semibold">
                  <Link to="/free-protocol">
                    Join the Free Protocol
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
