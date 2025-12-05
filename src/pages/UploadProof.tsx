import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Upload, Image, Video, Link as LinkIcon, CheckCircle2 } from "lucide-react";

const UploadProof = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get("day");

  const [enrollment, setEnrollment] = useState<{ id: string } | null>(null);
  const [selectedDay, setSelectedDay] = useState(dayParam ? parseInt(dayParam) : 1);
  const [proofType, setProofType] = useState<"image" | "video" | "link">("image");
  const [proofUrl, setProofUrl] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchEnrollment = async () => {
      try {
        const { data, error } = await supabase
          .from("challenge_enrollments")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (error || !data) {
          toast.error("Please join the challenge first");
          navigate("/free-protocol");
          return;
        }

        setEnrollment(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enrollment || !user) return;

    if (!proofUrl.trim()) {
      toast.error("Please provide a proof URL or link");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("daily_proofs").upsert(
        {
          enrollment_id: enrollment.id,
          user_id: user.id,
          day_number: selectedDay,
          proof_type: proofType,
          proof_url: proofUrl,
          wake_time: wakeTime,
          notes: notes,
          status: "pending",
          submitted_at: new Date().toISOString(),
        },
        {
          onConflict: "enrollment_id,day_number",
        }
      );

      if (error) throw error;

      toast.success(`Day ${selectedDay} proof submitted successfully!`);
      navigate("/dashboard/challenge");
    } catch (error) {
      console.error("Error submitting proof:", error);
      toast.error("Failed to submit proof. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Link */}
            <Link
              to="/dashboard/challenge"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Challenge Progress
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Upload className="w-6 h-6 text-gold" />
                <span className="text-gold text-sm tracking-widest uppercase font-medium">
                  Daily Submission
                </span>
              </div>
              <h1 className="font-logo text-3xl md:text-4xl font-bold text-foreground mb-4">
                Upload Today's Proof
              </h1>
              <p className="text-muted-foreground">
                Submit your daily challenge evidence for verification.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8">
              <div className="space-y-6">
                {/* Day Selection */}
                <div>
                  <Label>Select Day</Label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          selectedDay === day
                            ? "bg-gold text-primary border-gold"
                            : "bg-secondary border-border hover:border-gold/50"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Proof Type */}
                <div>
                  <Label>Proof Type</Label>
                  <RadioGroup
                    value={proofType}
                    onValueChange={(value) => setProofType(value as "image" | "video" | "link")}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="image" />
                      <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                        <Image className="w-4 h-4" />
                        Image
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                        <Video className="w-4 h-4" />
                        Video
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="link" id="link" />
                      <Label htmlFor="link" className="flex items-center gap-2 cursor-pointer">
                        <LinkIcon className="w-4 h-4" />
                        External Link
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Proof URL */}
                <div>
                  <Label htmlFor="proofUrl">
                    {proofType === "link" ? "External Link (YouTube, Google Drive, etc.)" : "Image/Video URL"}
                  </Label>
                  <Input
                    id="proofUrl"
                    type="url"
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    placeholder={
                      proofType === "link"
                        ? "https://youtube.com/watch?v=..."
                        : "https://example.com/your-proof.jpg"
                    }
                    required
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload your file to a cloud service and paste the link here.
                  </p>
                </div>

                {/* Wake Time */}
                <div>
                  <Label htmlFor="wakeTime">What time did you wake up today?</Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Today's Experience (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How did today's protocol feel? Any observations?"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                {/* Checklist Reminder */}
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Today's Protocol Checklist:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Woke up before sunrise at consistent time",
                      "3 minutes cold exposure",
                      "30×30×30 breathwork",
                      "3 minutes barefoot grounding",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold h-12"
                >
                  {isSubmitting ? "Submitting..." : `Submit Day ${selectedDay} Proof`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadProof;
