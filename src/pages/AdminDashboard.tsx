import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Package,
  Truck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Participant {
  id: string;
  user_id: string;
  status: string;
  completed_days: number;
  start_date: string;
  shipping_status: string;
  profile: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
    shipping_address: string | null;
    shipping_city: string | null;
    shipping_country: string | null;
    shipping_postal_code: string | null;
  } | null;
}

interface DailyProof {
  id: string;
  day_number: number;
  status: string;
  proof_url: string | null;
  proof_type: string | null;
  notes: string | null;
  wake_time: string | null;
  submitted_at: string | null;
  admin_notes: string | null;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [proofs, setProofs] = useState<DailyProof[]>([]);
  const [proofsModalOpen, setProofsModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<DailyProof | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [reviewStatus, setReviewStatus] = useState<string>("approved");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const checkAdminAndFetch = async () => {
      try {
        // Check if user is admin using the has_role function
        const { data: hasRole, error: roleError } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "admin",
        });

        if (roleError || !hasRole) {
          toast.error("Access denied. Admin privileges required.");
          navigate("/dashboard");
          return;
        }

        setIsAdmin(true);
        await fetchParticipants();
      } catch (error) {
        console.error("Error checking admin status:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [user, navigate]);

  const fetchParticipants = async () => {
    const { data, error } = await supabase
      .from("challenge_enrollments")
      .select(`
        *,
        profile:profiles!challenge_enrollments_user_id_fkey(
          full_name,
          email,
          phone,
          shipping_address,
          shipping_city,
          shipping_country,
          shipping_postal_code
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      // Fallback: fetch without join if FK doesn't exist
      const { data: enrollments } = await supabase
        .from("challenge_enrollments")
        .select("*")
        .order("created_at", { ascending: false });

      if (enrollments) {
        // Fetch profiles separately
        const userIds = enrollments.map((e) => e.user_id);
        const { data: profiles } = await supabase
          .from("profiles")
          .select("*")
          .in("id", userIds);

        const enrichedData = enrollments.map((enrollment) => ({
          ...enrollment,
          shipping_status: enrollment.status === "completed" ? "pending" : "n/a",
          profile: profiles?.find((p) => p.id === enrollment.user_id) || null,
        }));

        setParticipants(enrichedData);
      }
    } else if (data) {
      const enrichedData = data.map((d) => ({
        ...d,
        shipping_status: d.status === "completed" ? "pending" : "n/a",
        profile: Array.isArray(d.profile) ? d.profile[0] : d.profile,
      }));
      setParticipants(enrichedData);
    }
  };

  const fetchProofs = async (userId: string, enrollmentId: string) => {
    const { data, error } = await supabase
      .from("daily_proofs")
      .select("*")
      .eq("enrollment_id", enrollmentId)
      .order("day_number", { ascending: true });

    if (!error && data) {
      setProofs(data);
    }
  };

  const openProofsModal = async (participant: Participant) => {
    setSelectedParticipant(participant);
    await fetchProofs(participant.user_id, participant.id);
    setProofsModalOpen(true);
  };

  const openReviewModal = (proof: DailyProof) => {
    setSelectedProof(proof);
    setAdminNotes(proof.admin_notes || "");
    setReviewStatus(proof.status === "pending" ? "approved" : proof.status);
    setReviewModalOpen(true);
  };

  const submitReview = async () => {
    if (!selectedProof || !user) return;

    const { error } = await supabase
      .from("daily_proofs")
      .update({
        status: reviewStatus,
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq("id", selectedProof.id);

    if (error) {
      toast.error("Failed to update proof status");
      return;
    }

    toast.success(`Proof ${reviewStatus === "approved" ? "approved" : "rejected"}`);
    setReviewModalOpen(false);

    // Refresh proofs
    if (selectedParticipant) {
      await fetchProofs(selectedParticipant.user_id, selectedParticipant.id);
      
      // Update completed days if approved
      if (reviewStatus === "approved") {
        const approvedCount = proofs.filter(
          (p) => p.status === "approved" || p.id === selectedProof.id
        ).length;

        await supabase
          .from("challenge_enrollments")
          .update({
            completed_days: approvedCount,
            status: approvedCount >= 7 ? "completed" : "active",
          })
          .eq("id", selectedParticipant.id);

        await fetchParticipants();
      }
    }
  };

  const updateShippingStatus = async (participantId: string, status: string) => {
    // For now, we'll update a local state since shipping_status isn't in DB
    // In production, you'd add this column to challenge_enrollments
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, shipping_status: status } : p
      )
    );
    toast.success(`Shipping status updated to: ${status}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500">Completed</Badge>;
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProofStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = {
    total: participants.length,
    active: participants.filter((p) => p.status === "active").length,
    completed: participants.filter((p) => p.status === "completed").length,
    pendingShipping: participants.filter(
      (p) => p.status === "completed" && p.shipping_status === "pending"
    ).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-gold" />
            </div>
            <div>
              <h1 className="font-logo text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage challenge participants and proofs
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Participants</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-amber-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active Challenges</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stats.pendingShipping}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Shipping</p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-semibold text-lg text-foreground">
                Challenge Participants
              </h2>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Shipping</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No participants yet</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">
                          {participant.profile?.full_name || "—"}
                        </TableCell>
                        <TableCell>{participant.profile?.email || "—"}</TableCell>
                        <TableCell>
                          {participant.profile?.shipping_country || "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold transition-all"
                                style={{
                                  width: `${(participant.completed_days / 7) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {participant.completed_days}/7
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(participant.status)}</TableCell>
                        <TableCell>
                          {participant.status === "completed" ? (
                            <Select
                              value={participant.shipping_status}
                              onValueChange={(value) =>
                                updateShippingStatus(participant.id, value)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openProofsModal(participant)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Proofs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      {/* Proofs Modal */}
      <Dialog open={proofsModalOpen} onOpenChange={setProofsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Daily Proofs - {selectedParticipant?.profile?.full_name || "Participant"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const proof = proofs.find((p) => p.day_number === day);
              return (
                <div
                  key={day}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold">
                      {day}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Day {day}</p>
                      {proof ? (
                        <p className="text-sm text-muted-foreground">
                          {proof.wake_time && `Wake: ${proof.wake_time}`}
                          {proof.notes && ` • ${proof.notes.substring(0, 50)}...`}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Not submitted</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {proof ? (
                      <>
                        {getProofStatusBadge(proof.status || "pending")}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openReviewModal(proof)}
                        >
                          Review
                        </Button>
                      </>
                    ) : (
                      <Badge variant="secondary">Awaiting</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Proof - Day {selectedProof?.day_number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProof?.proof_url && (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Proof Link:</p>
                <a
                  href={selectedProof.proof_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:underline break-all"
                >
                  {selectedProof.proof_url}
                </a>
              </div>
            )}
            {selectedProof?.notes && (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">User Notes:</p>
                <p className="text-foreground">{selectedProof.notes}</p>
              </div>
            )}
            {selectedProof?.wake_time && (
              <div className="p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Wake Time:</p>
                <p className="text-foreground">{selectedProof.wake_time}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Status
              </label>
              <Select value={reviewStatus} onValueChange={setReviewStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approve</SelectItem>
                  <SelectItem value="rejected">Reject</SelectItem>
                  <SelectItem value="pending">Keep Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Admin Notes
              </label>
              <Textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add notes for this submission..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview} className="bg-gold hover:bg-gold/90 text-primary">
              Save Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
