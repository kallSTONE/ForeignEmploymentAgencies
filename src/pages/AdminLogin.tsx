import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { isAdmin, loading, signIn, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="section-padding text-center"><p className="text-body">Loading...</p></div>;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background px-4 sm:px-6 py-10 md:py-16">
      <div className="card-corporate max-w-sm w-full p-5 sm:p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-body-sm mt-1">Sign in to access the admin dashboard</p>
        </div>

        {user && !isAdmin && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 font-body">
            Your account does not have admin privileges.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground font-body mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-corporate" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground font-body mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-corporate" required />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary-corporate w-full py-3">
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
