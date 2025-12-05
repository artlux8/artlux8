import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Upload,
  XCircle,
  Trophy,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface DayProof {
  day_number: number;
  status: string;
  submitted_at: string | null;
}

interface Enrollment {
  id: string;
  status: string;
  completed_days: number;
  start_date: string;
}

const ChallengeProgress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [proofs, setProofs] = useState<DayProof[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch enrollment
        const { data: enrollmentData, error: enrollmentError } = await supabase
          .from("challenge_enrollments")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (enrollmentError || !enrollmentData) {
          toast.error("You haven't joined the challenge yet");
          navigate("/free-protocol");
          return;
        }

        setEnrollment(enrollmentData);

        // Fetch proofs
        const { data: proofsData } = await supabase
          .from("daily_proofs")
          .select("day_number, status, submitted_at")
          .eq("enrollment_id", enrollmentData.id)
          .order("day_number");

        if (proofsData) {
          setProofs(proofsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!enrollment) return null;

  const getProofForDay = (dayNumber: number) => {
    return proofs.find((p) => p.day_number === dayNumber);
  };

  const getDayStatus = (dayNumber: number) => {
    const proof = getProofForDay(dayNumber);
    if (!proof) return "not_submitted";
    return proof.status;
  };

  const approvedDays = proofs.filter((p) => p.status === "approved").length;
  const progressPercent = (approvedDays / 7) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/dashboard"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-gold" />
                <span className="text-gold text-sm tracking-widest uppercase font-medium">
                  Challenge Progress
                </span>
              </div>
              <h1 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                My 7-Day Journey
              </h1>
              <p className="text-muted-foreground">
                Track your daily progress and upload your proofs.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-foreground">
                  {approvedDays}/7 Days Completed
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Days Grid */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7].map((dayNumber) => {
                const status = getDayStatus(dayNumber);
                const proof = getProofForDay(dayNumber);

                return (
                  <div
                    key={dayNumber}
                    className={`p-6 rounded-2xl border transition-all ${
                      status === "approved"
                        ? "bg-emerald-500/5 border-emerald-500/30"
                        : status === "pending"
                        ? "bg-amber-500/5 border-amber-500/30"
                        : status === "rejected"
                        ? "bg-red-500/5 border-red-500/30"
                        : "bg-card border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            status === "approved"
                              ? "bg-emerald-500/20"
                              : status === "pending"
                              ? "bg-amber-500/20"
                              : status === "rejected"
                              ? "bg-red-500/20"
                              : "bg-secondary"
                          }`}
                        >
                          {status === "approved" ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                          ) : status === "pending" ? (
                            <Clock className="w-6 h-6 text-amber-500" />
                          ) : status === "rejected" ? (
                            <XCircle className="w-6 h-6 text-red-500" />
                          ) : (
                            <span className="text-lg font-bold text-muted-foreground">
                              {dayNumber}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Day {dayNumber}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {status === "approved" && "Completed & Approved ✓"}
                            {status === "pending" && "Submitted - Pending Review"}
                            {status === "rejected" && "Rejected - Please Resubmit"}
                            {status === "not_submitted" && "Not yet submitted"}
                          </p>
                        </div>
                      </div>

                      {(status === "not_submitted" || status === "rejected") && (
                        <Button
                          asChild
                          className="bg-gold hover:bg-gold/90 text-primary"
                        >
                          <Link to={`/dashboard/upload?day=${dayNumber}`}>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Proof
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Completion Message */}
            {approvedDays === 7 && (
              <div className="mt-12 p-8 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-2xl border border-gold/30 text-center">
                <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-logo text-2xl font-bold text-foreground mb-2">
                  Congratulations! 🎉
                </h3>
                <p className="text-muted-foreground mb-4">
                  You've completed the 7-Day ARTLUX Protocol! Your hydrogen water bottle reward is being processed.
                </p>
                <p className="text-sm text-gold">
                  We'll notify you once your reward ships.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChallengeProgress;
