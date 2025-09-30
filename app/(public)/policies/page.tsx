"use client";
import { motion } from "framer-motion";
import { Shield, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            AssignOwl Policies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Learn about our privacy practices and payment policies
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Privacy Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Privacy Policy</h2>
                  <p className="text-sm text-muted-foreground">Effective Date: [Insert Date]</p>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  AssignOwl ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform to upload assignments, receive reports, and make payments.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><strong>Assignment Data:</strong> When you upload an assignment, we process the content solely to generate your evaluation report.</li>
                      <li><strong>Account Information:</strong> If you create an account, we may collect your name, email address, and password.</li>
                      <li><strong>Payment Information:</strong> Payments are processed securely through third-party providers (e.g., Stripe, PayPal). We do not store your full card details on our servers.</li>
                      <li><strong>Usage Data:</strong> We may collect anonymized data such as device type, browser type, and interaction logs for analytics and performance improvement.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• To generate assignment evaluation reports.</li>
                      <li>• To provide customer support.</li>
                      <li>• To process payments.</li>
                      <li>• To improve the accuracy and quality of AssignOwl.</li>
                      <li>• To comply with legal obligations.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Data Storage & Retention</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Assignment files are stored temporarily for report generation and then deleted within 30 days, unless you request otherwise.</li>
                      <li>• Account and payment records are retained as required for legal and financial compliance.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Data Sharing</h3>
                    <p className="text-muted-foreground mb-2">We do not sell or rent your personal data. We may share limited information only with:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li><strong>Service Providers:</strong> For payment processing and cloud storage.</li>
                      <li><strong>Legal Authorities:</strong> If required by law.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Security</h3>
                    <p className="text-muted-foreground">
                      We use encryption, secure servers, and access controls to protect your data. While no system is 100% secure, we continuously monitor and improve our practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Your Rights</h3>
                    <p className="text-muted-foreground mb-2">Depending on your jurisdiction, you may have the right to:</p>
                    <ul className="space-y-1 text-muted-foreground mb-3">
                      <li>• Request access to or deletion of your data.</li>
                      <li>• Correct inaccurate information.</li>
                      <li>• Withdraw consent for certain processing.</li>
                    </ul>
                    <p className="text-muted-foreground">
                      You can reach us anytime at: <span className="text-primary">[insert contact email]</span>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">7. Changes to This Policy</h3>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. Updates will be posted on this page with a new 'Effective Date.'
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Policy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-background/20 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Glassy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/30 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent rounded-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Payment Policy</h2>
                  <p className="text-sm text-muted-foreground">Effective Date: [Insert Date]</p>
                </div>
              </div>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This Payment Policy explains how payments work when you use AssignOwl's services.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">1. Pricing</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Each assignment evaluation costs <strong>$2 USD</strong>.</li>
                      <li>• Prices are displayed before you confirm payment.</li>
                      <li>• Taxes (if applicable) will be shown at checkout.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">2. Payment Methods</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• We accept payments via secure third-party payment providers (e.g., Stripe, PayPal, or other gateways).</li>
                      <li>• AssignOwl does not store your complete credit card or bank details.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">3. Refunds & Cancellations</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Payments are non-refundable once a report has been generated and delivered.</li>
                      <li>• If a payment was made in error or you did not receive your report due to a technical issue, please contact us within 7 days for resolution.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">4. Failed or Disputed Payments</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• If your payment fails, the assignment will not be processed.</li>
                      <li>• In case of chargebacks or disputes, we may temporarily suspend your account until the issue is resolved.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">5. Currency & Conversion</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• All charges are made in USD.</li>
                      <li>• If you are outside the United States, your bank or provider may charge conversion fees.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">6. Updates</h3>
                    <p className="text-muted-foreground">
                      We may update this Payment Policy from time to time. The latest version will always be available on our website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">
              Have questions about our policies?
            </p>
            <Link href="/">
              <Button className="gap-2">
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}